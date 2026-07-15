const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || '';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/latest';

// Indian Agriculture Target Match Queries
const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR "crop yield" OR mandi',
    schemes: '"PM-Kisan" OR "farmer scheme" OR subsidy OR yojana',
    weather: 'monsoon OR rainfall OR "IMD weather"',
    prices: '"mandi price" OR "MSP crop" OR "crop price"'
};

// Global Fallback Memory Cache (Preserved across warm serverless functions)
global.newsCache = global.newsCache || {};

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (req, res) => {
    // 1. Force instant clean JSON & Strict Anti-Cache Headers to ensure fresh client pulls
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, reason: 'Method not allowed', articles: [] });
    }

    const category = String(req.query.category || 'agri').toLowerCase();
    const lang = String(req.query.lang || 'en');
    const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.agri;
    
    // Unique identifier for fallback lookup
    const cacheKey = `${category}_${lang}`;

    // Setup an Abort Controller to kill hanging API calls at 8 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        if (!NEWSDATA_API_KEY) {
            clearTimeout(timeoutId);
            throw new Error('API key variable missing in system environment');
        }

        // 2. Fetch with a Cache-Buster timestamp parameter to force NewsData.io to fetch fresh
        const url = `${NEWSDATA_BASE_URL}?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=${lang}&country=in&_cb=${Date.now()}`;
        
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        
        clearTimeout(timeoutId);

        let freshArticles = [];

        // 3. Process Response safely
        if (response.ok && data.status === 'success' && Array.isArray(data.results) && data.results.length > 0) {
            freshArticles = data.results.map(a => ({
                title: a.title || '',
                description: a.description || '',
                url: a.link || '',             
                image: a.image_url || null,      
                source: a.source_id || 'News Source',
                publishedAt: a.pubDate || ''
            }));
        }

        // 4. Decisive Fallback logic (Preventing "No News Available" screens)
        if (freshArticles.length > 0) {
            const finalArticles = shuffle(freshArticles);
            // Save this success batch as the fallback state
            global.newsCache[cacheKey] = finalArticles;
            return res.status(200).json({ success: true, articles: finalArticles });
        } else {
            // No new articles returned or rate limit hit. Silently return cached backup
            if (global.newsCache[cacheKey] && global.newsCache[cacheKey].length > 0) {
                return res.status(200).json({ success: true, articles: shuffle(global.newsCache[cacheKey]) });
            }
            // Absolute critical fallback array if the serverless function is fresh and has zero state
            return res.status(200).json({ success: true, articles: [] });
        }

    } catch (error) {
        clearTimeout(timeoutId);
        console.error('API Interceptor Exception:', error);

        // Fail-Safe: On timeout, network drop, or script crash, serve the fallback data instantly
        if (global.newsCache[cacheKey] && global.newsCache[cacheKey].length > 0) {
            return res.status(200).json({ success: true, articles: shuffle(global.newsCache[cacheKey]) });
        }

        return res.status(200).json({ 
            success: false, 
            reason: `Connection error: ${error.message}`, 
            articles: [] 
        });
    }
};
