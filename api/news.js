const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4/search';

const CATEGORY_QUERIES = {
    agri: '"Indian agriculture" OR "farmer" OR "crop yield" OR "mandi" OR "monsoon crop"',
    schemes: '"PM-Kisan" OR "farmer scheme" OR "agriculture subsidy" OR "kisan yojana"',
    weather: '"monsoon forecast" OR "rainfall India" OR "IMD weather"',
    prices: '"mandi price" OR "MSP crop" OR "crop price India"'
};

// NEW: hard keyword requirement — an article MUST contain at least one
// of these in its title or description, or it gets dropped, regardless
// of what GNews's own relevance ranking thinks.
const CATEGORY_KEYWORDS = {
    agri: ['agri', 'farm', 'crop', 'mandi', 'monsoon', 'harvest', 'irrigation', 'sowing', 'kisan'],
    schemes: ['kisan', 'scheme', 'subsidy', 'yojana', 'msp', 'farmer'],
    weather: ['monsoon', 'rainfall', 'weather', 'imd', 'forecast'],
    prices: ['mandi', 'price', 'msp', 'rate', 'crop']
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

        // NOTE: max bumped from 10 -> 25 since filtering below will drop
        // some results; this keeps the final filtered count healthier.
        const url = `${GNEWS_BASE_URL}?q=${encodeURIComponent(query)}&lang=${lang}&country=in&max=25&apikey=${GNEWS_API_KEY}`;
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

        const rawArticles = (data.articles || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.image,
            source: a.source ? a.source.name : 'Unknown',
            publishedAt: a.publishedAt
        }));

        // THIS is the actual fix — filter out anything not matching a
        // real agri/scheme/weather/price keyword in title or description.
        const keywords = CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS.agri;
        const articles = rawArticles.filter(a => {
            const text = `${a.title || ''} ${a.description || ''}`.toLowerCase();
            return keywords.some(k => text.includes(k));
        });

        cache.set(cacheKey, { articles, timestamp: Date.now() });
        res.status(200).json({ success: true, cached: false, articles });
    } catch (error) {
        console.error('News fetch error:', error);
        res.status(200).json({ success: false, reason: 'Server error fetching news', articles: [] });
    }
};
