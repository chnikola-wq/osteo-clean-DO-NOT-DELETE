exports.handler = async function(event, context) {
    // 1. Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY; // This keeps your key secret

        // 2. The System Prompt (Telling the AI who it is)
        const systemMessage = {
            role: "system",
            content: "You are an expert orthopaedic biomechanics tutor. You assist surgeons with a calculator that models open-gap vs closed-gap mechanics and the P-Delta effect. Answer concisely and professionally. If the user asks about the stress on a plate, ALWAYS use the 'calculate_bridging_stress' tool to find the exact answer before replying. Never guess the maths."
        };

        // 3. Define the Tool (Your app's maths)
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

        // 4. Send the first request to OpenAI
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Fast, cheap, capable model
                messages: [systemMessage, ...messages],
                tools: tools,
                tool_choice: "auto"
            })
        });

        let data = await response.json();
        let aiMessage = data.choices[0].message;

        // 5. Tool Execution Logic (If the AI decides it needs to use the calculator)
        if (aiMessage.tool_calls) {
            const toolCall = aiMessage.tool_calls[0];
            const args = JSON.parse(toolCall.function.arguments);
            
            // Execute your actual physics formula here
            const L = args.workingLength;
            const I_p = args.plateAMI || 25;
            const P = args.axialLoad || 1000;
            const e = args.offset || 5;
            const E = 114500; // Titanium
            const y = 1.5; // Distance to neutral axis
            
            const EI = E * I_p;
            const k = Math.sqrt(P / EI);
            const secant = 1 / Math.cos((L / 2) * k);
            const deflection = e * (secant - 1);
            const moment = P * (e + deflection);
            const calculatedStress = (moment * y) / I_p;

            // Send the exact calculated number back to the AI
            const toolMessage = {
                role: "tool",
                tool_call_id: toolCall.id,
                name: toolCall.function.name,
                content: JSON.stringify({ calculated_stress_MPa: calculatedStress })
            };

            // Second request to OpenAI to get the final conversational answer
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
            aiMessage = data.choices[0].message;
        }

        // 6. Return the final answer to your frontend
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiMessage.content })
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};