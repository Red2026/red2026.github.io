const { OpenAI } = require('openai');

exports.handler = async (event, context) => {
    const { messages, new_message } = JSON.parse(event.body);

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        base_url: 'https://api.deepseek.com'
    });

    try {
        const response1 = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: [...messages, { role: "user", content: new_message }]
        });

        const response2 = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                ...messages,
                { role: "user", content: new_message },
                { role: "assistant", content: response1.choices[0].message.content }
            ]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                response1: response1.choices[0].message.content,
                response2: response2.choices[0].message.content
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};