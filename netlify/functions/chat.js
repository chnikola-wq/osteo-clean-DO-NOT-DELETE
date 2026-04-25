exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY; 

        const systemMessage = {
            role: "system",
            content: "You are an expert orthopaedic biomechanics tutor. You assist surgeons with a calculator that models open-gap vs closed-gap mechanics and the P-Delta effect. Answer concisely and professionally. If the user asks about the stress on a plate, ALWAYS use the 'calculate_bridging_stress' tool to find the exact answer before replying. Never guess the maths."
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

        // --- NEW SAFETY NET ---
        // If OpenAI sends an error (like insufficient quota), send it straight to the chat window!
        if (data.error) {
            return { statusCode: 200, body: JSON.stringify({ reply: `OpenAI says: ${data.error.message}` }) };
        }
        // ----------------------

        let aiMessage = data.choices[0].message;

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
