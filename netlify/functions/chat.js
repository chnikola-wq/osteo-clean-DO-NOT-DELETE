exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY; 

        // Format messages for Gemini
        const contents = messages.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
        }));

        // The Hybrid Knowledge Base specifically for osteo-clean
        const systemInstruction = {
            parts: [{ text: `ROLE: Lead Orthopaedic Biomechanics Expert.
STRICT PROTOCOL: You are anchored to the 'Locked Plating: Pre-Operative Primer' app.
1. CORE RULES: Focus strictly on the Material Paradox (why Steel pulls the neutral axis closer but spikes stress compared to Titanium), Load Sharing (parallel springs), and Basic Bridging Mechanics (P-Delta effects).
2. HYBRID INTELLIGENCE: First, answer using the App's mechanical rules. Second, augment the answer with broader clinical insights from general literature (e.g., biological healing, Perren's strain theory).
3. OUTPUT: Always use UK English (e.g., orthopaedics, conceptualise). Clearly distinguish between "App Logic" and "General Clinical Context."` }]
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: contents,
                system_instruction: systemInstruction,
                generationConfig: {
                    temperature: 0.1, // Keeps the AI highly logical and focused
                    maxOutputTokens: 1024,
                }
            })
        });

        const data = await response.json();
        
        // Safety net if Google API throws an error
        if (data.error) {
            return { statusCode: 200, body: JSON.stringify({ reply: `Gemini Error: ${data.error.message}` }) };
        }

        const aiReply = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiReply })
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
