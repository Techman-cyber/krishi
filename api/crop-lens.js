// /api/crop-lens.js
// Vercel serverless function. Keeps the Kindwise crop.health API key on the
// server so it never appears in browser-visible JS. Deploy as-is on Vercel;
// no extra dependencies needed (Node 18+ has global fetch built in).
//
// SETUP:
// 1. Get a free API key at https://admin.kindwise.com (product: crop.health)
// 2. In your Vercel project: Settings -> Environment Variables
//    Add: KINDWISE_API_KEY = <your key>
// 3. Redeploy. That's it - the frontend already calls this endpoint.
//
// If the key isn't set yet, this returns { success: false, reason: 'not_configured' }
// so the frontend can fall back to the built-in simulated Crop Lens instead of breaking.

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const apiKey = process.env.KINDWISE_API_KEY;
    if (!apiKey) {
        return res.status(200).json({ success: false, reason: 'not_configured' });
    }

    const { image } = req.body || {};
    if (!image) {
        return res.status(400).json({ success: false, reason: 'no_image' });
    }

    try {
        const kindwiseRes = await fetch(
            'https://crop.kindwise.com/api/v1/identification?details=description,treatment,symptoms,severity,common_names',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey
                },
                body: JSON.stringify({ images: [image] })
            }
        );

        if (!kindwiseRes.ok) {
            const errText = await kindwiseRes.text();
            console.error('Kindwise API error:', kindwiseRes.status, errText);
            return res.status(200).json({
                success: false,
                reason: 'provider_error',
                debug: { status: kindwiseRes.status, message: errText.slice(0, 500) }
            });
        }

        const data = await kindwiseRes.json();
        const result = data.result || {};

        const cropSuggestions = (result.crop && result.crop.suggestions) || [];
        const diseaseSuggestions = (result.disease && result.disease.suggestions) || [];

        // Treat as healthy if no disease suggestion clears a reasonable confidence bar
        const topDisease = diseaseSuggestions[0];
        const isHealthy = !topDisease || topDisease.probability < 0.3;

        return res.status(200).json({
            success: true,
            isHealthy,
            crop: cropSuggestions[0]
                ? { name: cropSuggestions[0].name, probability: cropSuggestions[0].probability }
                : null,
            disease: topDisease
                ? {
                      name: topDisease.name,
                      probability: topDisease.probability,
                      commonNames: topDisease.details?.common_names || [],
                      description: topDisease.details?.description || '',
                      symptoms: topDisease.details?.symptoms || '',
                      severity: topDisease.details?.severity || '',
                      treatment: topDisease.details?.treatment || null
                  }
                : null,
            secondaryDiseases: diseaseSuggestions.slice(1, 3).map(d => ({
                name: d.name,
                probability: d.probability
            }))
        });
    } catch (err) {
        console.error('crop-lens proxy error:', err);
        return res.status(200).json({ success: false, reason: 'request_failed', debug: String(err && err.message || err) });
    }
}
