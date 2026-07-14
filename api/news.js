const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4/search';

const CATEGORY_QUERIES = {
    agri: '"Indian agriculture" OR "farmer" OR "crop yield" OR "mandi" OR "monsoon crop"',
    schemes: '"PM-Kisan" OR "farmer scheme" OR "agriculture subsidy" OR "kisan yojana"',
    weather: '"monsoon forecast" OR "rainfall India" OR "IMD weather"',
    prices: '"mandi price" OR "MSP crop" OR "crop price India"'
};

const CATEGORY_KEYWORDS = {
    agri: ['agri', 'farm', 'crop', 'mandi', 'monsoon', 'harvest', 'irrigation', 'sowing', 'kisan'],
    schemes: ['kisan', 'scheme', 'subsidy', 'yojana', 'msp', 'farmer'],
    weather: ['monsoon', 'rainfall', 'weather', 'imd', 'forecast'],
    prices: ['mandi', 'price', 'msp', 'rate', 'crop']
};

// Track seen article URLs to avoid repetition across requests
const seenUrls = new Set();
const MAX_SEEN_URLS = 5000; // keep memory usage bounded

// Fisher-Yates shuffle
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ success: false, reason: 'Method not allowed', articles: [] });
        return;
    }

    try {
        const category = String(req.query.category || 'agri').toLowerCase();
        const lang = String(req.query.lang || 'en');
        const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.agri;

        if (!GNEWS_API_KEY) {
            res.status(200).json({
                success: false,
                reason: 'GNEWS_API_KEY not configured. Add it back in Vercel -> Settings -> Environment Variables.',
                articles: []
            });
            return;
        }

        // ====================================================================
        // THE CREDIT SAVER: VERCEL EDGE NETWORK CONTROL HEADERS
        // --------------------------------------------------------------------
        // s-maxage=1800 cache data on Vercel's global CDN layers for 30 minutes.
        // stale-while-revalidate=600 lets background workers update content seamlessly.
        // ====================================================================
        res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=600');

        // Removed the token-wasting page rotator so GNews pulls high-quality matches instantly
        const url = `${GNEWS_BASE_URL}?q=${encodeURIComponent(query)}&lang=${lang}&country=in&max=25&sortby=publishedAt&apikey=${GNEWS_API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            res.status(200).json({
                success: false,
                reason: (data.errors && data.errors.join(', ')) || 'Failed to fetch news from GNews layers.',
                articles: []
            });
            return;
        }

        const rawArticles = (data.articles || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.image, // Maps cleanly back to your frontend image keys
            source: a.source ? a.source.name : 'Unknown',
            publishedAt: a.publishedAt
        }));

        const keywords = CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS.agri;
        const articles = rawArticles
            .filter(a => {
                const text = `${a.title || ''} ${a.description || ''}`.toLowerCase();
                return keywords.some(k => text.includes(k));
            })
            .filter(a => {
                if (seenUrls.has(a.url)) return false;
                
                if (seenUrls.size >= MAX_SEEN_URLS) {
                    const toRemove = Math.floor(MAX_SEEN_URLS * 0.1);
                    let count = 0;
                    for (const u of seenUrls) {
                        if (count++ >= toRemove) break;
                        seenUrls.delete(u);
                    }
                }
                seenUrls.add(a.url);
                return true;
            });

        res.status(200).json({ success: true, cached: true, articles: shuffle(articles) });
    } catch (error) {
        console.error('News fetch error:', error);
        res.status(200).json({ success: false, reason: 'Server error fetching news', articles: [] });
    }
};
