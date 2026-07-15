const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || '';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/latest';

const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR "crop yield" OR mandi',
    schemes: '"PM-Kisan" OR "farmer scheme" OR subsidy OR yojana',
    weather: 'monsoon OR rainfall OR "IMD weather"',
    prices: '"mandi price" OR "MSP crop" OR "crop price"'
};

// Persistent global fallback storage across warm lambda functions
global.lastKnownNewsCache = global.lastKnownNewsCache || {};

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (req, res) => {
    // 1. Force instant clean JSON & Strict Anti-Cache Headers
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
    
    // Unique cache key combined by category and language
    const cacheKey = `${category}_${lang}`;

    // Setup an Abort Controller to kill hanging API calls at 8 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        if (!NEWSDATA_API_KEY) {
            clearTimeout(timeoutId);
            throw new Error('API key variable missing in system environment');
        }

        // Fetch fresh data with a timestamp cache-buster
        const url = `${NEWSDATA_BASE_URL}?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=${lang}&country=in&_cb=${Date.now()}`;
        
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        
        clearTimeout(timeoutId);

        let freshArticles = [];

        // Parse matching payload only if HTTP status is OK and API returns a success message
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

        // 2. If fresh news exists, store it as the absolute baseline and return it
        if (freshArticles.length > 0) {
            const shuffledArticles = shuffle(freshArticles);
            global.lastKnownNewsCache[cacheKey] = shuffledArticles;
            return res.status(200).json({ success: true, articles: shuffledArticles });
        } 
        
        // 3. Fallback: API is empty/rate-limited -> Repeat the previously saved news
        if (global.lastKnownNewsCache[cacheKey] && global.lastKnownNewsCache[cacheKey].length > 0) {
            return res.status(200).json({ 
                success: true, 
                articles: shuffle(global.lastKnownNewsCache[cacheKey]) 
            });
        }

        // Extreme backup in case memory is totally empty (e.g. initial start failure)
        return res.status(200).json({ success: true, articles: [] });

    } catch (error) {
        clearTimeout(timeoutId);
        console.error('API Fetch Failure Intercepted:', error);

        // 4. Fallback on network drops, script timeout or crash -> Serve historical memory state
        if (global.lastKnownNewsCache[cacheKey] && global.lastKnownNewsCache[cacheKey].length > 0) {
            return res.status(200).json({ 
                success: true, 
                articles: shuffle(global.lastKnownNewsCache[cacheKey]) 
            });
        }

        return res.status(200).json({ 
            success: false, 
            reason: `Connection error: ${error.message}`, 
            articles: [] 
        });
    }
};
