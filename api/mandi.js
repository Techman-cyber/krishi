// /api/mandi.js
// Vercel serverless function for fetching live government Mandi prices.

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    // Pulls your API key securely from Vercel Environment Variables
    const apiKey = process.env.MANDI_API_KEY || '579b464db66ec23bdd000001f753570ef99342734fba2fcd9d53e80e';
    const { state, district, crop } = req.body || {};

    if (!state || !district || !crop) {
        return res.status(400).json({ success: false, reason: 'missing_parameters' });
    }

    try {
        const govMandiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070` +
            `?api-key=${apiKey}` +
            `&format=json` +
            `&filters[state]=${encodeURIComponent(state)}` +
            `&filters[district]=${encodeURIComponent(district)}` +
            `&filters[commodity]=${encodeURIComponent(crop)}` +
            `&limit=20`;

        const govRes = await fetch(govMandiUrl);
        
        if (!govRes.ok) {
            return res.status(200).json({ success: false, reason: 'government_api_down' });
        }

        const data = await govRes.json();
        
        // Sends clean, formatted data back to your frontend UI
        return res.status(200).json({
            success: true,
            records: data.records || []
        });

    } catch (err) {
        return res.status(200).json({ success: false, reason: 'server_error', debug: err.message });
    }
}
