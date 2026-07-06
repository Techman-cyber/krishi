// /api/crop-lens.js
// Vercel serverless function. Keeps the Plant.id API key on the server so it
// never appears in browser-visible JS. Deploy as-is on Vercel; no extra
// dependencies needed (Node 18+ has global fetch built in).
//
// SETUP:
// 1. Get a free API key at https://admin.kindwise.com (product: plant.id)
// 2. In your Vercel project: Settings -> Environment Variables (Production!)
//    Add: PLANTID_API_KEY = <your key>
// 3. Redeploy. That's it - the frontend already calls this endpoint.
//
// If the key isn't set yet, this returns { success: false, reason: 'not_configured' }
// so the frontend can fall back to the built-in simulated Crop Lens instead of breaking.

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const apiKey = process.env.PLANTID_API_KEY;
    if (!apiKey) {
        return res.status(200).json({ success: false, reason: 'not_configured' });
    }

    const { image } = req.body || {};
    if (!image) {
        return res.status(400).json({ success: false, reason: 'no_image' });
    }

    try {
        const plantIdRes = await fetch(
            'https://api.plant.id/v3/identification?details=description,treatment,symptoms,severity,common_names&health=all',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey
                },
                body: JSON.stringify({ images: [image] })
            }
        );

        if (!plantIdRes.ok) {
            const errText = await plantIdRes.text();
            console.error('Plant.id API error:', plantIdRes.status, errText);
            return res.status(200).json({
                success: false,
                reason: 'provider_error',
                debug: { status: plantIdRes.status, message: errText.slice(0, 500) }
            });
        }

        const data = await plantIdRes.json();
        const result = data.result || {};

        const cropSuggestions = (result.classification && result.classification.suggestions) || [];
        const diseaseSuggestions = (result.disease && result.disease.suggestions) || [];
        const topDisease = diseaseSuggestions[0];

        // Prefer Plant.id's own is_healthy verdict when present; otherwise
        // fall back to a probability threshold on the top disease suggestion.
        const isHealthy = result.is_healthy
            ? result.is_healthy.binary
            : (!topDisease || topDisease.probability < 0.3);

        return res.status(200).json({
            success: true,
            isHealthy,
            crop: cropSuggestions[0]
                ? { name: cropSuggestions[0].name, probability: cropSuggestions[0].probability }
                : null,
            disease: (!isHealthy && topDisease)
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
