exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY; 

        const systemMessage = {
            role: "system",
            content: `ROLE: Lead Orthopaedic Biomechanics Expert.
STRICT PROTOCOL: You are anchored to the 'Locked Plating: Pre-Operative Primer' app.
1. CORE RULES: Focus strictly on the Material Paradox (why Steel pulls the neutral axis closer but spikes stress compared to Titanium), Load Sharing (parallel springs), and Basic Bridging Mechanics (P-Delta effects).
2. HYBRID INTELLIGENCE: First, answer using the App's mechanical rules. Second, augment the answer with broader clinical insights from general literature (e.g., biological healing, Perren's strain theory).
3. OUTPUT: Always use UK English (e.g., orthopaedics, conceptualise). Clearly distinguish between "App Logic" and "General Clinical Context."`
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
                            workingLength: { type: "number", description: "The unsupported working length (L) in mm." },
                            plateAMI: { type: "number", description: "The Area Moment of Inertia (I_p) of the plate. Default is 25." },
                            axialLoad: { type: "number", description: "Axial load (P) in Newtons. Default is 1000." },
                            offset: { type: "number", description: "Initial bone-plate offset (e) in mm. Default is 5." }
                        },
                        required: ["workingLength"]
                    }
                }
            }
        ];

        // Call the flagship gpt-4o model
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o", // The heavyweight flagship model!
                messages: [systemMessage, ...messages],
                tools: tools,
                tool_choice: "auto",
                temperature: 0.2 // Keeps the logic highly strict and analytical
            })
        });

        let data = await response.json();
        
        if (data.error) {
            return { statusCode: 200, body: JSON.stringify({ reply: `OpenAI Error: ${data.error.message}` }) };
        }

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
                    model: "gpt-4o",
                    messages: [systemMessage, ...messages, aiMessage, toolMessage]
                })
            });

            data = await secondResponse.json();
            if (data.error) {
                return { statusCode: 200, body: JSON.stringify({ reply: `OpenAI Error: ${data.error.message}` }) };
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
