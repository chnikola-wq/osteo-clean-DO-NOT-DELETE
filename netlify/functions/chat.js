const fs = require('fs');
const path = require('path');

// ============================================================
// LOAD APP KNOWLEDGE FROM EXTERNAL MARKDOWN FILE
// Read once when the function cold-starts. Netlify keeps the
// function warm for a while, so this file read does not happen
// on every request — it's effectively cached in memory.
// ============================================================
let appKnowledge = '';
try {
    // The file lives next to chat.js in the functions folder.
    const knowledgePath = path.join(__dirname, 'app-knowledge.md');
    appKnowledge = fs.readFileSync(knowledgePath, 'utf-8');
} catch (err) {
    console.error('Could not load app-knowledge.md:', err);
    appKnowledge = '(Knowledge file failed to load — please contact the app maintainer.)';
}

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.ANTHROPIC_API_KEY;

        // ============================================================
        // SYSTEM PROMPT — emphasises reasoning over recall.
        // The big knowledge dump comes from app-knowledge.md.
        // ============================================================
        const systemPrompt = `You are an expert orthopaedic biomechanics tutor embedded inside the "Locked Plating: Clinical Guidelines & Biomechanics" surgical teaching app.

<app_documentation>
${appKnowledge}
</app_documentation>

HOW YOU MUST ANSWER (this is the most important instruction):

Your answers must be DERIVED from the formulas and models in <app_documentation> — not from your general training intuition. General engineering intuition (e.g. "stiffer is stronger", "more rigid means lower stress") is frequently WRONG inside this app's models, because the app deliberately teaches counter-intuitive composite behaviour. When your intuition disagrees with what the formulas predict, the formulas win.

For every substantive question, internally walk through these steps before writing your answer:

1. IDENTIFY THE MODEL. Which of the three models applies to this question — Composite AMI (Model 1), Parallel Spring (Model 2), or P-Delta (Model 3)? Use Section D as the decision rule. If the question crosses models (e.g., "what happens to L?"), note that the answer depends on which clinical scenario the user is in, and address both regimes.

2. WORK FROM THE FORMULA. Look at the relevant formula in Section B. Identify which variables in the formula change as a result of the user's question, and trace through what happens to plate stress. State this reasoning briefly so the surgeon can follow it.

3. REPORT THE PREDICTION. Tell the user what the model predicts and why — anchored in the formula, not in general intuition.

4. IF SPECIFIC NUMBERS ARE REQUESTED FOR A BRIDGING SCENARIO, call the calculate_bridging_stress tool. Never estimate numbers yourself.

5. CHECK FOR REGIME-DEPENDENT ANSWERS. Some parameters (working length, material choice) have opposite effects in different models. If the user hasn't specified the clinical scenario, briefly cover both — closed-gap vs bridging — rather than picking one.

ANSWER STRUCTURE — use on every substantive question:

**From the app:** State which model applies and why, then walk through the formula-based reasoning to reach the answer. Cite the relevant tab and concept (e.g. "Tab 1, Concept 5 — Parallel Spring"). If the app does not cover the question, say so plainly here.

**Broader context:** Add a short second section drawing on wider biomechanics and orthopaedic literature — clinical caveats, alternative considerations, related work. Make clear this is your general knowledge, not from the app.

For trivial messages (greetings, thanks, one-word clarifications), skip the structure and reply naturally in 1-2 sentences.

Be concise and professional. Surgeons are time-poor. The "From the app" section should be the substantive core; "Broader context" should be brief.

FORMATTING RULE — FORMULAS MUST BE PLAIN TEXT:
Never use LaTeX notation. Do not use dollar signs ($), backslashes (\\), or any LaTeX commands (e.g. \\frac, \\sigma, \\sqrt). Write every formula in plain natural text exactly as it appears in <app_documentation> — for example: sigma = M * y / I_p, or k = sqrt(P / EI). Use standard keyboard characters only.`;

        // ============================================================
        // TOOL DEFINITION — Tab 3 / Model 3 P-Delta calculator
        // ============================================================
        const tools = [
            {
                name: "calculate_bridging_stress",
                description: "Calculates max plate stress in MPa for a bridging construct using the P-Delta (secant) effect, exactly matching the live calculator on Tab 3 of the app. Use this whenever the user asks for a specific stress value in a bridging scenario — never estimate numbers yourself.",
                input_schema: {
                    type: "object",
                    properties: {
                        workingLength: { type: "number", description: "Unsupported working length L in mm (e.g., 60)." },
                        plateAMI: { type: "number", description: "Plate Area Moment of Inertia I_p in mm^4. Default 25." },
                        axialLoad: { type: "number", description: "Axial load P in Newtons. Default 1000." },
                        offset: { type: "number", description: "Initial bone-plate offset e in mm. Default 5." }
                    },
                    required: ["workingLength"]
                }
            }
        ];

        async function callClaude(messageHistory) {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: "claude-opus-4-7",
                    max_tokens: 1024,
                    system: systemPrompt,
                    tools: tools,
                    messages: messageHistory
                })
            });
            return res.json();
        }

        let data = await callClaude(messages);

        // Tool execution loop
        if (data.stop_reason === "tool_use") {
            const toolUseBlock = data.content.find(block => block.type === "tool_use");
            const args = toolUseBlock.input;

            const L = args.workingLength;
            const I_p = args.plateAMI || 25;
            const P = args.axialLoad || 1000;
            const e = args.offset || 5;
            const E = 114500; // Titanium Ti-6Al-4V
            const y = 1.5;    // Distance to outer fibre

            const EI = E * I_p;
            const k = Math.sqrt(P / EI);
            const secant = 1 / Math.cos((L / 2) * k);
            const deflection = e * (secant - 1);
            const moment = P * (e + deflection);
            const calculatedStress = (moment * y) / I_p;

            const followUpMessages = [
                ...messages,
                { role: "assistant", content: data.content },
                {
                    role: "user",
                    content: [
                        {
                            type: "tool_result",
                            tool_use_id: toolUseBlock.id,
                            content: JSON.stringify({
                                calculated_stress_MPa: calculatedStress,
                                deflection_mm: deflection,
                                moment_Nmm: moment,
                                inputs_used: { L, I_p, P, e, E, y }
                            })
                        }
                    ]
                }
            ];

            data = await callClaude(followUpMessages);
        }

        const replyText = data.content
            .filter(block => block.type === "text")
            .map(block => block.text)
            .join("\n");

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: replyText })
        };

     } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};
