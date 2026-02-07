const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        if (!prompt) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Prompt is required' }) };
        }

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: 'API_KEY not configured in environment' }) };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const aiPrompt = `Generate a professional blog post about: "${prompt}". 
        Return ONLY a JSON object (no markdown formatting like \`\`\`json) with these exact keys:
        - title: A catchy and SEO-friendly title
        - excerpt: A short 2-3 sentence summary (max 150 characters)
        - bodyMarkdown: The main content in markdown format. Use headings, lists, and bold text where appropriate. Focus on quality and engagement.
        Target audience: Customers of "Terrivo" (a brand for high-quality electronics/lifestyle products).`;

        const result = await model.generateContent(aiPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code block wrappers
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : text;
        const data = JSON.parse(jsonStr);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Gemini Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to generate content: ' + error.message }),
        };
    }
};
