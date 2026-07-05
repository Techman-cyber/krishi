// /api/chatbot.js
// Vercel serverless function. Keeps the Gemini API key on the server.

const GEMINI_MODEL = 'gemini-2.0-flash';

const LANGUAGE_NAMES = {
    en: 'English', hi: 'Hindi', bn: 'Bengali', te: 'Telugu', mr: 'Marathi',
    gu: 'Gujarati', mwr: 'Marwadi', pa: 'Punjabi', ta: 'Tamil', ml: 'Malayalam',
    ur: 'Urdu', kn: 'Kannada', or: 'Odia', sa: 'Sanskrit'
};

module.exports = async function handler(req, res) {
    // 1. Handle CORS Headers so your frontend can communicate securely
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Handle the browser's automatic preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Strictly enforce that the actual request must be a POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
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
        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemPrompt }] },
                    contents: [{ role: 'user', parts: [{ text: message }] }],
                    generationConfig: { maxOutputTokens: 300, temperature: 0.6 }
                })
            }
        );

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            console.error('Gemini API error:', geminiRes.status, errText);
            return res.status(200).json({ success: false, reason: 'provider_error' });
        }

        const data = await geminiRes.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(200).json({ success: false, reason: 'empty_response' });
        }

        return res.status(200).json({ success: true, reply: reply.trim() });
    } catch (err) {
        console.error('chatbot proxy error:', err);
        return res.status(200).json({ success: false, reason: 'request_failed' });
    }
};
