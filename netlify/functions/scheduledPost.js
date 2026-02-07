const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@sanity/client");

// Netlify Scheduled Function (Runs at 8:00 AM every day)
// Note: You need to set SANITY_AUTH_TOKEN in Netlify Environment Variables
exports.handler = async function (event, context) {
    console.log('=== Scheduled Blog Post Started ===');

    const apiKey = process.env.API_KEY;
    const sanityToken = process.env.SANITY_AUTH_TOKEN;
    const projectId = process.env.SANITY_PROJECT_ID || 'zvazmyez';
    const dataset = process.env.SANITY_DATASET || 'production';

    if (!apiKey || !sanityToken) {
        console.error('Missing API_KEY or SANITY_AUTH_TOKEN');
        return { statusCode: 500, body: 'Configuration missing' };
    }

    const client = createClient({
        projectId,
        dataset,
        token: sanityToken,
        useCdn: false,
        apiVersion: '2023-05-03',
    });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        // 1. Generate a random interesting topic for Terrivo
        const topicPrompt = `Suggest 1 interesting blog post topic for "Terrivo" (a premium electronics and lifestyle brand). 
        Return ONLY the topic title.`;
        const topicResult = await model.generateContent(topicPrompt);
        const topic = topicResult.response.text().trim();

        console.log('Selected Topic:', topic);

        // 2. Generate the full post
        const fullPrompt = `Generate a professional blog post about: "${topic}". 
        Return ONLY a JSON object with these exact keys:
        - title: A catchy and SEO-friendly title
        - excerpt: A short 2-3 sentence summary
        - bodyMarkdown: The main content in markdown format (use # for h1, ## for h2, etc.)
        Target audience: Customers of Terrivo.`;

        const contentResult = await model.generateContent(fullPrompt);
        const contentText = contentResult.response.text();
        const jsonMatch = contentText.match(/\{[\s\S]*\}/);
        const data = JSON.parse(jsonMatch ? jsonMatch[0] : contentText);

        // 3. Convert Markdown to Sanity Blocks
        const lines = data.bodyMarkdown.split('\n');
        const blocks = lines.filter(l => l.trim()).map(line => {
            let style = 'normal';
            let text = line.trim();
            if (text.startsWith('### ')) { style = 'h3'; text = text.replace('### ', ''); }
            else if (text.startsWith('## ')) { style = 'h2'; text = text.replace('## ', ''); }
            else if (text.startsWith('# ')) { style = 'h1'; text = text.replace('# ', ''); }

            return {
                _type: 'block',
                style,
                children: [{ _type: 'span', text }],
            };
        });

        // 4. Create the post in Sanity
        const newPost = {
            _type: 'post',
            title: data.title,
            slug: {
                _type: 'slug',
                current: data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
            },
            excerpt: data.excerpt,
            body: blocks,
            publishedAt: new Date().toISOString(),
            author: 'AI Assistant', // You can change this
        };

        const result = await client.create(newPost);
        console.log('Post created successfully:', result._id);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created', id: result._id }),
        };
    } catch (error) {
        console.error('Error in scheduled post:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Netlify Schedule Expression
// exports.config = {
//   schedule: "0 8 * * *"
// };
