const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@sanity/client");

exports.handler = async function (event, context) {
    const apiKey = process.env.API_KEY;
    const sanityToken = process.env.SANITY_AUTH_TOKEN;
    const projectId = process.env.SANITY_PROJECT_ID || 'zvazmyez';
    const dataset = process.env.SANITY_DATASET || 'production';

    if (!apiKey || !sanityToken) return { statusCode: 500, body: 'Configuration missing' };

    const client = createClient({ projectId, dataset, token: sanityToken, useCdn: false, apiVersion: '2023-05-03' });
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];

    try {
        let blogData = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Scheduled post: Trying model ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const topicResult = await model.generateContent('Suggest 1 interesting blog post topic for "Terrivo" (Premium electronics brand). Return ONLY the topic title.');
                const selectedTopic = topicResult.response.text().trim();

                const contentResult = await model.generateContent(`Generate a blog about: "${selectedTopic}". Return ONLY JSON with: title, excerpt, bodyMarkdown.`);
                const text = contentResult.response.text();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                blogData = JSON.parse(jsonMatch ? jsonMatch[0] : text);

                if (blogData) {
                    console.log(`Scheduled post: Success with ${modelName}`);
                    break;
                }
            } catch (err) {
                console.warn(`Scheduled post: model ${modelName} failed:`, err.message);
            }
        }

        if (!blogData) throw new Error("Could not generate blog data with any available model");

        const blocks = blogData.bodyMarkdown.split('\n').filter(l => l.trim()).map(line => ({
            _type: 'block',
            style: line.startsWith('###') ? 'h3' : line.startsWith('##') ? 'h2' : line.startsWith('#') ? 'h1' : 'normal',
            children: [{ _type: 'span', text: line.replace(/^#+\s/, '').trim() }],
        }));

        await client.create({
            _type: 'post',
            title: blogData.title,
            slug: { _type: 'slug', current: blogData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') },
            excerpt: blogData.excerpt,
            body: blocks,
            publishedAt: new Date().toISOString(),
            author: 'AI Assistant',
        });

        return { statusCode: 200, body: 'Post created successfully' };
    } catch (error) {
        console.error('Scheduled Post Error:', error.message);
        return { statusCode: 500, body: error.message };
    }
};
