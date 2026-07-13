// ============================================================================
// /api/news.js — Vercel Serverless Function
// ----------------------------------------------------------------------------
// Drop this file directly into your repo's /api folder, next to weather.js,
// crop-lens.js, and mandi.js. Vercel automatically turns it into the endpoint:
//   GET /api/news?category=agri
//
// Uses GNews.io (https://gnews.io) — unlike NewsAPI.org's free tier, GNews's
// free tier works on a live deployed domain, not just localhost.
//
// SETUP:
// 1. Sign up free at https://gnews.io -> copy your API key
// 2. In your Vercel project: Settings -> Environment Variables
//    Add:  GNEWS_API_KEY = your_key_here
//    (Redeploy after adding it so the function picks it up)
// 3. That's it — no app.use(), no router wiring needed. Vercel handles routing.
//
// NOTE: this file only defines the *server* endpoint. The errors you saw for
// "currentNewsCategory is not defined" and "loadNewsSection is not defined"
// are in your *frontend* script (itzmee_here.js) — this file can't fix those,
// since it never runs in the browser. You need a small client-side module
// that calls fetch('/api/news?category=...') and renders the result. See the
// loadNewsSection() snippet from the previous message for that piece.
// ============================================================================

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4/search';

const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR crop OR mandi OR monsoon India',
    schemes: 'farmer scheme OR agriculture subsidy OR PM-Kisan OR rural India',
    weather: 'monsoon India OR rainfall forecast India agriculture',
    prices: 'crop prices India OR mandi rates OR MSP India'
};

const cache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ success: false, reason: 'Method not allowed', articles: [] });
        return;
    }

    try {
        const category = String(req.query.category || 'agri').toLowerCase();
        const lang = String(req.query.lang || 'en');
        const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.agri;

        const cacheKey = `${category}_${lang}`;
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            res.status(200).json({ success: true, cached: true, articles: cached.articles });
            return;
        }

        if (!GNEWS_API_KEY) {
            res.status(200).json({
                success: false,
                reason: 'GNEWS_API_KEY not configured. Add it in Vercel -> Settings -> Environment Variables.',
                articles: []
            });
            return;
        }

        const url = `${GNEWS_BASE_URL}?q=${encodeURIComponent(query)}&lang=${lang}&country=in&max=10&apikey=${GNEWS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            res.status(200).json({
                success: false,
                reason: (data.errors && data.errors.join(', ')) || 'Failed to fetch news',
                articles: []
            });
            return;
        }

        const articles = (data.articles || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.image,
            source: a.source ? a.source.name : 'Unknown',
            publishedAt: a.publishedAt
        }));

        cache.set(cacheKey, { articles, timestamp: Date.now() });
        res.status(200).json({ success: true, cached: false, articles });
    } catch (error) {
        console.error('News fetch error:', error);
        res.status(200).json({ success: false, reason: 'Server error fetching news', articles: [] });
    }
};
