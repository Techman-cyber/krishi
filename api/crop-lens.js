// /api/crop-lens.js
// Vercel serverless function. Keeps the Pl@ntNet API key secure on the server.
// Deploy as-is on Vercel; no extra dependencies needed (Node 18+ has global fetch and FormData).
//
// SETUP:
// 1. Get an API key at https://my.plantnet.org/
// 2. In your Vercel project: Settings -> Environment Variables
//    Add: PLANTNET_API_KEY = <your key>

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const apiKey = process.env.PLANTNET_API_KEY;
    if (!apiKey) {
        return res.status(200).json({ success: false, reason: 'not_configured' });
    }

    const { image } = req.body || {};
    if (!image) {
        return res.status(400).json({ success: false, reason: 'no_image' });
    }

    try {
        // Handle cases where frontend sends the data URI prefix (e.g., data:image/jpeg;base64,...)
        let base64Image = image;
        if (base64Image.startsWith('data:')) {
            base64Image = base64Image.split(',')[1];
        }

        // Pl@ntNet expects binary files via multipart/form-data.
        // Convert the base64 string into a binary Blob entirely on the server.
        const buffer = Buffer.from(base64Image, 'base64');
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('images', blob, 'crop.jpg');
        formData.append('organs', 'leaf'); // Directs the scanner to look at foliage anomalies

        // Construct the official Pl@ntNet disease API path
        const plantNetUrl = `https://my-api.plantnet.org/v2/diseases/identify?api-key=${apiKey}&lang=${req.body.language || 'en'}`;
        
        const plantNetRes = await fetch(plantNetUrl, {
            method: 'POST',
            body: formData
        });

        if (!plantNetRes.ok) {
            const errText = await plantNetRes.text();
            console.error('Pl@ntNet API error:', plantNetRes.status, errText);
            return res.status(200).json({
                success: false,
                reason: 'provider_error',
                debug: { status: plantNetRes.status, message: errText.slice(0, 500) }
            });
        }

        const data = await plantNetRes.json();
        const results = data.results || [];
        const topResult = results[0];

        // Pl@ntNet score represents the confidence rating. 
        // If a known disease pattern falls below a solid threshold, flag the crop as healthy.
        const isHealthy = !topResult || topResult.score < 0.25;

        return res.status(200).json({
            success: true,
            isHealthy,
            crop: topResult 
                ? { name: topResult.species?.scientificNameWithoutAuthor || topResult.label || 'Crop Specimen', probability: topResult.score }
                : null,
            disease: (!isHealthy && topResult)
                ? {
                    name: topResult.label || 'Unknown Disease',
                    probability: topResult.score,
                    commonNames: topResult.species?.commonNames || [],
                    description: `Identified pathological configuration matching international standard EPPO index [${topResult.name || 'N/A'}].`,
                    symptoms: "Visible tissue deterioration matching localized fungal, pest, or physiological disorders.",
                    severity: topResult.score > 0.7 ? "Critical" : (topResult.score > 0.4 ? "High" : "Medium"),
                    treatment: null // Pl@ntNet focuses purely on identification; mapping handles fallback gracefully
                  }
                : null,
            secondaryDiseases: results.slice(1, 3).map(d => ({
                name: d.label || 'Alternative Pathenogen Profile',
                probability: d.score
            }))
        });
    } catch (err) {
        console.error('crop-lens proxy error:', err);
        return res.status(200).json({ 
            success: false, 
            reason: 'request_failed', 
            debug: String(err && err.message || err) 
        });
    }
}
