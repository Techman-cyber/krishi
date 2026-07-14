const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || '';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/news';

const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR "crop yield" OR mandi',
    schemes: '"PM-Kisan" OR "farmer scheme" OR subsidy OR yojana',
    weather: 'monsoon OR rainfall OR IMD weather',
    prices: '"mandi price" OR "MSP crop" OR "crop price"'
};

const CATEGORY_KEYWORDS = {
    agri: ['agri', 'farm', 'crop', 'mandi', 'monsoon', 'harvest', 'irrigation', 'sowing', 'kisan'],
    schemes: ['kisan', 'scheme', 'subsidy', 'yojana', 'msp', 'farmer'],
    weather: ['monsoon', 'rainfall', 'weather', 'imd', 'forecast'],
    prices: ['mandi', 'price', 'msp', 'rate', 'crop']
};

const seenUrls = new Set();
const MAX_SEEN_URLS = 5000;

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

        if (!NEWSDATA_API_KEY) {
            res.status(200).json({ success: false, reason: 'NEWSDATA_API_KEY not configured.', articles: [] });
            return;
        }

        // NewsData cleanly filters by country=in and accepts standard boolean OR logic
        const url = `${NEWSDATA_BASE_URL}?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=${lang}&country=in`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.status === 'error') {
            res.status(200).json({
                success: false,
                reason: data.results?.message || 'Failed to fetch news from NewsData engines.',
                articles: []
            });
            return;
        }

        const rawArticles = (data.results || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.link,             // NewsData wraps links in 'link'
            image: a.image_url,      // NewsData uses 'image_url'
            source: a.source_id || 'News Source',
            publishedAt: a.pubDate
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

        res.status(200).json({ success: true, cached: false, articles: shuffle(articles) });
    } catch (error) {
        console.error('News fetch error:', error);
        res.status(200).json({ success: false, reason: `Server Exception: ${error.message}`, articles: [] });
    }
};
