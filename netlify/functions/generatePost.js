const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

    try {
        const { prompt } = JSON.parse(event.body);
        const apiKey = process.env.API_KEY;

        if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'API_KEY missing' }) };

        const genAI = new GoogleGenerativeAI(apiKey);

        // List of models to try in order of preference
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
        let lastError = null;
        let data = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting generation with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const aiPrompt = `Generate a professional blog post about: "${prompt}". 
                Return ONLY a JSON object with these exact keys:
                - title: A catchy and SEO-friendly title
                - excerpt: A short 2-3 sentence summary (max 150 characters)
                - bodyMarkdown: The main content in markdown format. Use headings, lists, and bold text.
                Target audience: Customers of "Terrivo".`;

                const result = await model.generateContent(aiPrompt);
                const text = result.response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                data = JSON.parse(jsonMatch ? jsonMatch[0] : text);

                if (data) {
                    console.log(`Success with model: ${modelName}`);
                    break;
                }
            } catch (err) {
                console.error(`Failed with ${modelName}:`, err.message);
                lastError = err;
            }
        }

        if (!data) {
            throw new Error(`All models failed. Last error: ${lastError?.message}`);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
