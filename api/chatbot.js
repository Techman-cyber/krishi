// /api/chatbot.js
// Vercel serverless function. Keeps the OpenRouter API key on the server.
// Node 18+ has global fetch built in - no extra dependencies needed.
//
// SETUP:
// 1. Get an API key at https://openrouter.ai/
// 2. In your Vercel project: Settings -> Environment Variables
//    Add: OPENROUTER_API_KEY = <your openrouter key>
// 3. Redeploy.

const MODEL_NAME = 'openai/gpt-4o';

const LANGUAGE_NAMES = {
    en: 'English', hi: 'Hindi', bn: 'Bengali', te: 'Telugu', mr: 'Marathi',
    gu: 'Gujarati', mwr: 'Marwadi', pa: 'Punjabi', ta: 'Tamil', ml: 'Malayalam',
    ur: 'Urdu', kn: 'Kannada', or: 'Odia', sa: 'Sanskrit'
};

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(200).json({ success: false, reason: 'not_configured' });
    }

    const { message, language } = req.body || {};
    if (!message || !message.trim()) {
        return res.status(400).json({ success: false, reason: 'no_message' });
    }

    const languageName = LANGUAGE_NAMES[language] || 'Hindi and English mixed (Hinglish)';

    const systemPrompt = `You are Krishi Bot, a friendly farming assistant inside the PatuKrishi app for Indian farmers.
Answer in ${languageName}. Keep answers short (2-4 sentences), practical, and specific to Indian farming
conditions (crops, mandi/market prices, weather, government schemes, pest and disease management).
If a question is outside farming, gently redirect back to farming topics. Never invent government
scheme names, exact prices, or statistics you are not certain about - speak in general, safe guidance
if unsure, and suggest the farmer check the app's Mandi Prices, Advisory, or Government Schemes sections
for exact figures.`;

    try {
        const openRouterRes = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://krishi-18o0jqwtd-techman-cybers-projects.vercel.app', // Optional: Replace with your actual domain
                    'X-Title': 'PatuKrishi App', // Optional: Replace with your actual app name
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: MODEL_NAME,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    max_tokens: 300,
                    temperature: 0.6
                })
            }
        );

        if (!openRouterRes.ok) {
            const errText = await openRouterRes.text();
            console.error('OpenRouter API error:', openRouterRes.status, errText);
            return res.status(200).json({
                success: false,
                reason: 'provider_error',
                debug: { status: openRouterRes.status, message: errText.slice(0, 500) }
            });
        }

        const data = await openRouterRes.json();
        const reply = data?.choices?.[0]?.message?.content;

        if (!reply) {
            return res.status(200).json({ success: false, reason: 'empty_response' });
        }

        return res.status(200).json({ success: true, reply: reply.trim() });
    } catch (err) {
        console.error('chatbot proxy error:', err);
        return res.status(200).json({ success: false, reason: 'request_failed', debug: String(err && err.message || err) });
    }
}
