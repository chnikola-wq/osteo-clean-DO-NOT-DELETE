exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY; 

        // --- THE UPDATED KNOWLEDGE BASE ---
        const systemMessage = {
            role: "system",
            content: `You are an expert orthopaedic biomechanics tutor integrated into the 'Locked Plating: Pre-Operative Primer' app. 
You MUST base your answers strictly on the following specific rules taught in this app, rather than generic internet knowledge:

1. THE MATERIAL PARADOX (Closed-Gap): Modular ratio (n) = E_implant / E_bone. Titanium (n≈6.4), Steel (n≈10.4). Steel pulls the neutral axis closer, but its high 'n' multiplier drastically spikes plate stress compared to Ti.
2. GEOMETRIC CONTRAST: Increasing plate thickness increases AMI and drops stress, but yields diminishing returns because the geometric shift pulls the neutral axis away from the bone.
3. LOAD SHARING (Closed-Gap): Plate and bone act as parallel springs. Stiffness K = (E * I)/L. Increasing working length (L) softens the plate, shifting load to the bone, which safely REDUCES plate stress.
4. BRIDGING / OPEN-GAP: The P-Delta effect applies. Deflection increases the lever arm. Bending moment M = P * (e + deflection). Therefore, increasing working length exponentially INCREASES plate stress.
5. PLATE OFFSET: Offset (e) acts as a baseline lever arm. It directly compounds the P-Delta effect.
6. DCP vs LCP: DCPs rely on screw-tightening preload, causing destructive 360-degree strain in osteoporotic bone. LCPs lock rigidly with no clamping force.

When answering:
- If the user asks for a specific open-gap/bridging calculation, ALWAYS use the 'calculate_bridging_stress' tool to find the exact number.
- If they ask for closed-gap calculations or material shifts, explain the concept using the rules above and guide them to use the interactive sliders in the app.
- Be concise, professional, and always use UK English spelling (e.g., behaviour, conceptualise).`
        };

        const tools = [
            {
                type: "function",
                function: {
                    name: "calculate_bridging_stress",
                    description: "Calculates the maximum plate stress in MPa for a bridging construct using the P-Delta effect.",
                    parameters: {
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
            }
        ];

        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [systemMessage, ...messages],
                tools: tools,
                tool_choice: "auto"
            })
        });

        let data = await response.json();

        // Safety net for OpenAI errors
        if (data.error) {
            return { statusCode: 200, body: JSON.stringify({ reply: `OpenAI says: ${data.error.message}` }) };
        }

        let aiMessage = data.choices[0].message;

        // Execute the maths tool if the AI calls it
        if (aiMessage.tool_calls) {
            const toolCall = aiMessage.tool_calls[0];
            const args = JSON.parse(toolCall.function.arguments);
            
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

            const toolMessage = {
                role: "tool",
                tool_call_id: toolCall.id,
                name: toolCall.function.name,
                content: JSON.stringify({ calculated_stress_MPa: calculatedStress })
            };

            const secondResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [systemMessage, ...messages, aiMessage, toolMessage]
                })
            });

            data = await secondResponse.json();
            
            if (data.error) {
                return { statusCode: 200, body: JSON.stringify({ reply: `OpenAI says: ${data.error.message}` }) };
            }

            aiMessage = data.choices[0].message;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiMessage.content })
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
