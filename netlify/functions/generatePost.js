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
        let apiKey = process.env.API_KEY;

        if (!apiKey) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: 'API_KEY is missing in Netlify settings.' }) };
        }

        // Clean the key (remove any accidental spaces or quotes)
        apiKey = apiKey.trim().replace(/^["']|["']$/g, '');

        const genAI = new GoogleGenerativeAI(apiKey);
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

        let lastError = "";
        let data = null;

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(`Generate a professional blog post about: "${prompt}". Return ONLY a JSON object with keys: title, excerpt, bodyMarkdown. Target audience: Customers of "Terrivo".`);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                data = JSON.parse(jsonMatch ? jsonMatch[0] : text);

                if (data) break;
            } catch (err) {
                lastError = err.message;
            }
        }

        if (!data) {
            // Include the first 4 characters of the key in error for verification
            const keyPreview = apiKey.substring(0, 4) + "****";
            throw new Error(`Google rejected the key (${keyPreview}). Error: ${lastError}`);
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
            body: JSON.stringify({
                error: error.message,
                tip: "If it says 'expired', your Netlify might be stuck using an old key. Try 'Clear cache and deploy' again."
            }),
        };
    }
};
