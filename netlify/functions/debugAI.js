const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return { statusCode: 500, body: 'API_KEY missing' };

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // We can't easily list models with the high-level SDK in a serverless function without extra setup
        // but we can try a few more specific variations

        const modelsToTry = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.0-pro"
        ];

        const results = {};

        for (const name of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: name });
                const result = await model.generateContent("test");
                results[name] = "SUCCESS";
            } catch (err) {
                results[name] = err.message;
            }
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                message: "Model Test Results",
                results,
                hint: "If all 404, check if the API key is correctly restricted or if the project has the Generative Language API enabled."
            })
        };
    } catch (error) {
        return { statusCode: 500, body: error.message };
    }
};
