// ============================================================================
// /api/mandi.js — Vercel Serverless Function
// ----------------------------------------------------------------------------
// Drop this file directly into your repo's /api folder, next to weather.js,
// crop-lens.js, and news.js. Vercel automatically turns it into the endpoint:
//   GET /api/mandi?state=...&district=...&commodity=...
//
// This exists because the previous client-side code called
// https://api.ceda.ashoka.edu.in directly from the browser with a hardcoded
// key. That failed for two reasons:
//   1. CORS — that endpoint doesn't send Access-Control-Allow-Origin, so the
//      browser blocks the response no matter what.
//   2. The query params being sent (filters[state], filters[district], etc.)
//      are data.gov.in / AGMARKNET resource-API format, not CEDA's — a
//      mismatch that's the likely cause of the 500 you were also seeing.
//
// This proxy calls the correct data.gov.in AGMARKNET resource endpoint from
// the server, so the key never reaches the browser and CORS isn't an issue
// (server-to-server requests aren't subject to CORS).
//
// SETUP:
// 1. Get a free API key at https://data.gov.in/user/register (or use an
//    existing data.gov.in key you already have).
// 2. In your Vercel project: Settings -> Environment Variables
//    Add:  MANDI_API_KEY = your_key_here
//    (Redeploy after adding it so the function picks it up)
// 3. Update your frontend to call /api/mandi instead of the CEDA URL
//    directly (see fetchRealMandiPricesFromAPI in your main script).
// ============================================================================

const MANDI_API_KEY = process.env.MANDI_API_KEY || '';

// Official AGMARKNET "Variety-wise Daily Market Prices" resource on data.gov.in
const MANDI_API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes — mandi prices don't change that often intraday

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ success: false, reason: 'Method not allowed', records: [] });
        return;
    }

    try {
        const state = String(req.query.state || '').trim();
        const district = String(req.query.district || '').trim();
        const commodity = String(req.query.commodity || '').trim();

        if (!state || !district || !commodity) {
            res.status(200).json({
                success: false,
                reason: 'Missing required query params: state, district, commodity',
                records: []
            });
            return;
        }

        const cacheKey = `${state}_${district}_${commodity}`.toLowerCase();
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            res.status(200).json({ success: true, cached: true, records: cached.records });
            return;
        }

        if (!MANDI_API_KEY) {
            res.status(200).json({
                success: false,
                reason: 'MANDI_API_KEY not configured. Add it in Vercel -> Settings -> Environment Variables.',
                records: []
            });
            return;
        }

        const url = `${MANDI_API_URL}?api-key=${MANDI_API_KEY}&format=json` +
            `&filters[state]=${encodeURIComponent(state)}` +
            `&filters[district]=${encodeURIComponent(district)}` +
            `&filters[commodity]=${encodeURIComponent(commodity)}` +
            `&limit=20`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            res.status(200).json({
                success: false,
                reason: `Upstream API returned ${response.status}`,
                records: []
            });
            return;
        }

        const records = Array.isArray(data.records) ? data.records : [];
        cache.set(cacheKey, { records, timestamp: Date.now() });

        res.status(200).json({ success: true, cached: false, records });
    } catch (error) {
        console.error('Mandi fetch error:', error);
        res.status(200).json({ success: false, reason: 'Server error fetching mandi prices', records: [] });
    }
};
