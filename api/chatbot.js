// /api/chatbot.js
// Vercel serverless function. Keeps the Gemini API key on the server.
// Node 18+ has global fetch built in - no extra dependencies needed.
//
// SETUP:
// 1. Get a free API key at https://aistudio.google.com/app/apikey
// 2. In your Vercel project: Settings -> Environment Variables
//    Add: GEMINI_API_KEY = <your key>
// 3. Redeploy. That's it - the frontend already calls this endpoint.
//
// If the key isn't set yet, this returns { success: false, reason: 'not_configured' }
// so the frontend falls back to the existing rule-based Krishi Bot instead of breaking.
//
// Model name note: Google updates Gemini model IDs over time. If this stops
// working, check https://ai.google.dev/gemini-api/docs/models for the current
// recommended "flash" model name and swap it into GEMINI_MODEL below.

const GEMINI_MODEL = 'gemini-2.0-flash';

const LANGUAGE_NAMES = {
    en: 'English', hi: 'Hindi', bn: 'Bengali', te: 'Telugu', mr: 'Marathi',
    gu: 'Gujarati', mwr: 'Marwadi', pa: 'Punjabi', ta: 'Tamil', ml: 'Malayalam',
    ur: 'Urdu', kn: 'Kannada', or: 'Odia', sa: 'Sanskrit'
};

module.exports = async function handler(req, res) {
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
}
