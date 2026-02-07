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

        if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'API_KEY missing in environment' }) };

        // Log short preview of key for debugging
        console.log(`Using API Key starting with: ${apiKey.substring(0, 7)}... and ending with ...${apiKey.slice(-4)}`);

        const genAI = new GoogleGenerativeAI(apiKey);

        // Extended list of models to try
        const modelsToTry = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.0-pro",
            "gemini-pro"
        ];

        let lastError = "";
        let data = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const aiPrompt = `Generate a professional blog post about: "${prompt}". 
                Return ONLY a JSON object (no markdown formatting like \`\`\`json) with these exact keys:
                - title: A catchy and SEO-friendly title
                - excerpt: A short 2-3 sentence summary
                - bodyMarkdown: The main content in markdown format. Use headings, lists, and bold text.
                Target audience: Customers of "Terrivo".`;

                const result = await model.generateContent(aiPrompt);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                const jsonStr = jsonMatch ? jsonMatch[0] : text;
                data = JSON.parse(jsonStr);

                if (data) {
                    console.log(`Success with model: ${modelName}`);
                    break;
                }
            } catch (err) {
                console.warn(`Model ${modelName} failed:`, err.message);
                lastError += `[${modelName}: ${err.message}] `;
            }
        }

        if (!data) {
            throw new Error(`All models failed. Details: ${lastError}`);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Final Generation Error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message,
                tip: "Make sure you enabled 'Generative Language API' in Google Cloud Console for the project this key belongs to."
            }),
        };
    }
};
