// ============================================================================
// /api/news.js — Vercel Serverless Function
// ----------------------------------------------------------------------------
// Drop this file directly into your repo's /api folder, next to weather.js
// and crop-lens.js. Vercel automatically turns it into the endpoint:
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
// ============================================================================

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4/search';

// Category -> search query mapping. Keeps the feed agriculture-focused
// instead of pulling in general/national/world news.
const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR crop OR mandi OR monsoon India',
    schemes: 'farmer scheme OR agriculture subsidy OR PM-Kisan OR rural India',
    weather: 'monsoon India OR rainfall forecast India agriculture',
    prices: 'crop prices India OR mandi rates OR MSP India'
};

// Simple in-memory cache so repeated section opens don't burn through the
// 100 req/day free quota. NOTE: on Vercel this resets whenever the function
// "cold starts" (new instance) — it's a bonus, not a guarantee.
const cache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

module.exports = async (req, res) => {
    // Basic method guard
    if (req.method !== 'GET') {
        res.status(405).json({ success: false, reason: 'Method not allowed' });
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

        const response = await fetch(url); // Node 18+ runtime on Vercel has global fetch
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
