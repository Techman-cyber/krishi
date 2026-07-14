const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const NEWS_BASE_URL = 'https://newsapi.org/v2/everything';

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

// Simple rotating page index based on time (changes every ~10 minutes)
function getRotatingPage() {
    const block = Math.floor(Date.now() / (10 * 60 * 1000)); // 10-min blocks
    // Cycle page between 1 and 4 (NewsAPI free limits deep pagination results)
    return (block % 4) + 1;
}

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

        // Get a rotating page number to fetch different results each time
        const page = getRotatingPage();

        if (!NEWS_API_KEY) {
            res.status(200).json({
                success: false,
                reason: 'NEWS_API_KEY not configured. Add it in Vercel -> Settings -> Environment Variables.',
                articles: []
            });
            return;
        }

        // Note: NewsAPI uses 'language' and 'pageSize' parameters
        const url = `${NEWS_BASE_URL}?q=${encodeURIComponent(query)}&language=${lang}&pageSize=25&page=${page}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
        
        const response = await fetch(url, {
            headers: { 'User-Agent': 'PatuKrishiApp/1.0' } // NewsAPI requires a User-Agent header
        });
        const data = await response.json();

        if (!response.ok || data.status === 'error') {
            res.status(200).json({
                success: false,
                reason: data.message || 'Failed to fetch news from NewsAPI arrays.',
                articles: []
            });
            return;
        }

        const rawArticles = (data.articles || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.urlToImage, // NewsAPI returns 'urlToImage' instead of 'image'
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
                // Avoid articles we've already seen
                if (seenUrls.has(a.url)) return false;
                
                // Track this URL
                if (seenUrls.size >= MAX_SEEN_URLS) {
                    // Remove oldest 10% to keep memory bounded
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
        res.status(200).json({ success: false, reason: 'Server error fetching news', articles: [] });
    }
};
