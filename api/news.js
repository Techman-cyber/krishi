const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY || '';
const CURRENTS_BASE_URL = 'https://api.currentsapi.services/v1/search';

const CATEGORY_QUERIES = {
    agri: '(Indian agriculture) OR (farmer) OR (crop yield) OR (mandi) OR (monsoon crop)',
    schemes: '(PM-Kisan) OR (farmer scheme) OR (agriculture subsidy) OR (kisan yojana)',
    weather: '(monsoon forecast) OR (rainfall India) OR (IMD weather)',
    prices: '(mandi price) OR (MSP crop) OR (crop price India)'
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

        if (!CURRENTS_API_KEY) {
            res.status(200).json({
                success: false,
                reason: 'CURRENTS_API_KEY is missing or empty. Please check your environment variables.',
                articles: []
            });
            return;
        }

        // Cleaned the query formatting brackets to adhere to strict Currents logic rules
        const url = `${CURRENTS_BASE_URL}?query=${encodeURIComponent(query)}&language=${lang}&country=IN&page_size=30&apiKey=${CURRENTS_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': CURRENTS_API_KEY, // Pass via standard authorization header map
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();

        // If the server rejects the request, show the exact message sent back by Currents
        if (!response.ok || data.status === 'error') {
            res.status(200).json({
                success: false,
                reason: data.message || `Currents API responded with status code: ${response.status}`,
                articles: []
            });
            return;
        }

        const rawArticles = (data.news || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.image, 
            source: a.author || 'News Source', 
            publishedAt: a.published 
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
