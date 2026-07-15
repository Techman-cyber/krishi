const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || '';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/latest';

// Refined target query strings to maximize NewsData Boolean matching
const CATEGORY_QUERIES = {
    agri: 'agriculture OR farmer OR "crop yield" OR mandi',
    schemes: '"PM-Kisan" OR "farmer scheme" OR subsidy OR yojana',
    weather: 'monsoon OR rainfall OR "IMD weather"',
    prices: '"mandi price" OR "MSP crop" OR "crop price"'
};

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (req, res) => {
    // Force clean JSON response type instantly
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, reason: 'Method not allowed', articles: [] });
    }

    // Abort controller to kill hanging connections before Vercel kills the execution context
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const category = String(req.query.category || 'agri').toLowerCase();
        const lang = String(req.query.lang || 'en');
        const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.agri;

        if (!NEWSDATA_API_KEY) {
            clearTimeout(timeoutId);
            return res.status(200).json({
                success: false,
                reason: 'NEWSDATA_API_KEY environment variable is empty or missing in Vercel settings.',
                articles: []
            });
        }

        // Newsdata parameter guidelines require URL encoding values precisely
        const url = `${NEWSDATA_BASE_URL}?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=${lang}&country=in`;
        
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        
        clearTimeout(timeoutId);

        if (!response.ok || data.status === 'error') {
            return res.status(200).json({
                success: false,
                reason: data.results?.message || data.message || `NewsData API returned HTTP status code: ${response.status}`,
                articles: []
            });
        }

        // Map data directly into your frontend interface properties
        const articles = (data.results || []).map(a => ({
            title: a.title || '',
            description: a.description || '',
            url: a.link || '',             
            image: a.image_url || null,      
            source: a.source_id || 'News Source',
            publishedAt: a.pubDate || ''
        }));

        // Removed heavy local post-filtering since API Boolean rules handled the exact extraction
        return res.status(200).json({ 
            success: true, 
            articles: shuffle(articles) 
        });

    } catch (error) {
        clearTimeout(timeoutId);
        console.error('News microservice exception:', error);
        
        let errorMessage = error.message;
        if (error.name === 'AbortError') {
            errorMessage = 'NewsData API response timed out after 8 seconds.';
        }

        return res.status(200).json({ 
            success: false, 
            reason: `Backend Exception: ${errorMessage}`, 
            articles: [] 
        });
    }
};
