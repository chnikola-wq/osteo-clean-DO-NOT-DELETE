exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.ANTHROPIC_API_KEY;

        // ============================================================
        // APP KNOWLEDGE BASE
        // This is what makes the AI an expert on YOUR app specifically.
        // Add/edit anything the AI should treat as authoritative truth
        // about how your calculator and models work.
        // ============================================================
        const appKnowledge = `
<app_documentation>
APP NAME: Orthopaedic Bridging Construct Calculator

PURPOSE:
This calculator models the biomechanics of bridge plating in long-bone
fracture fixation, comparing open-gap vs closed-gap constructs and
quantifying the P-Delta (secondary bending) effect.

KEY CONCEPTS IN THIS APP:
- Working Length (L): The unsupported span of the plate between the
  innermost screws on either side of the fracture, in mm.
- Plate Area Moment of Inertia (I_p): Geometric stiffness property of
  the plate cross-section. Default 25 mm^4 (typical for a small-fragment
  locking plate).
- Axial Load (P): Compressive load through the construct in Newtons.
  Default 1000 N (approx. partial weight-bearing on a lower limb).
- Offset (e): Initial perpendicular distance from the load axis to the
  plate's neutral axis, in mm. Default 5 mm.
- Modulus (E): Fixed at 114,500 MPa (Ti-6Al-4V titanium alloy).
- y: Distance from neutral axis to outer fibre, fixed at 1.5 mm.

GOVERNING EQUATIONS USED IN THIS APP:
- Bending stiffness: EI = E * I_p
- Buckling parameter: k = sqrt(P / EI)
- Secant amplification: sec(kL/2) = 1 / cos(kL/2)
- Total deflection: delta = e * (sec(kL/2) - 1)
- Peak moment: M = P * (e + delta)
- Peak stress: sigma = M * y / I_p

OPEN-GAP vs CLOSED-GAP:
- Closed-gap: Cortical contact across the fracture shares load with
  the plate. The plate sees a fraction of P.
- Open-gap: No cortical contact. The plate carries 100% of P, and the
  P-Delta effect dominates - small increases in L produce large
  increases in peak stress.

CLINICAL DEFAULTS / SAFETY THRESHOLDS THIS APP USES:
- Titanium yield stress reference: ~880 MPa
- A calculated stress > 50% of yield is flagged as high-risk for fatigue.
</app_documentation>
        `.trim();

        // ============================================================
        // SYSTEM PROMPT
        // Tells Claude WHO it is, gives it the app knowledge,
        // and instructs the two-part answer structure.
        // ============================================================
        const systemPrompt = `You are an expert orthopaedic biomechanics tutor embedded inside a surgical calculator app. You assist surgeons using the app.

${appKnowledge}

ANSWER STRUCTURE - follow this on every substantive question:

1. **From the app:** Start by answering using ONLY the information in <app_documentation> above and any tool results. This part must be grounded in the app's own definitions, formulas, and defaults. If the app doesn't cover the question, say so explicitly in this section.

2. **Broader context:** Then add a second short section drawing on your wider biomechanics and orthopaedic knowledge - related considerations, alternative approaches, recent literature, clinical caveats, or anything a surgeon should know that the app itself doesn't model. Make it clear this is general knowledge, not from the app.

Use these exact section headers in bold so the user can see the distinction:
**From the app:** ...
**Broader context:** ...

For trivial questions (greetings, clarifications, single-number lookups) you can skip the two-part structure and just answer directly.

If the user asks about plate stress, ALWAYS call the 'calculate_bridging_stress' tool first - never guess the maths. Then present the result under "From the app:" and add wider considerations under "Broader context:".

Be concise and professional. Surgeons are time-poor.`;

        const tools = [
            {
                name: "calculate_bridging_stress",
                description: "Calculates the maximum plate stress in MPa for a bridging construct using the P-Delta effect.",
                input_schema: {
                    type: "object",
                    properties: {
                        workingLength: { type: "number", description: "The unsupported working length (L) in mm. e.g., 60" },
                        plateAMI: { type: "number", description: "The Area Moment of Inertia (I_p) of the plate. Default is 25." },
                        axialLoad: { type: "number", description: "Axial load (P) in Newtons. Default is 1000." },
                        offset: { type: "number", description: "Initial bone-plate offset (e) in mm. Default is 5." }
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

        if (data.stop_reason === "tool_use") {
            const toolUseBlock = data.content.find(block => block.type === "tool_use");
            const args = toolUseBlock.input;

            const L = args.workingLength;
            const I_p = args.plateAMI || 25;
            const P = args.axialLoad || 1000;
            const e = args.offset || 5;
            const E = 114500;
            const y = 1.5;

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
                            content: JSON.stringify({ calculated_stress_MPa: calculatedStress })
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
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
