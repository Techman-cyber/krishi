const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4/search';

// ===== FALLBACK NEWS (repeated ONLY when no real news is available) =====
const FALLBACK_NEWS = [
  {
    title: "Agriculture Update: No new reports at this time",
    description: "We are currently retrieving the latest agriculture news. Please check again shortly.",
    url: "https://example.com/agri-update",
    source: { name: "System" },
    publishedAt: new Date().toISOString()
  },
  {
    title: "Crop Advisory: Regularly check local weather for sowing updates",
    description: "Farmers are advised to monitor regional weather forecasts and soil conditions before planning new sowing operations.",
    url: "https://example.com/crop-advisory",
    source: { name: "System" },
    publishedAt: new Date().toISOString()
  },
  {
    title: "Market Insight: Stay updated on local mandi prices",
    description: "Check daily mandi prices in your area to make informed decisions about selling your produce.",
    url: "https://example.com/mandi-prices",
    source: { name: "System" },
    publishedAt: new Date().toISOString()
  }
];

// ===== CATEGORY QUERIES =====
const CATEGORY_QUERIES = {
  agri: `"Indian agriculture" OR "farm news India" OR "crop advisory" OR "mandi prices" OR "kisan news"`,
  crops: `"crop prices India" OR "paddy price" OR "wheat price" OR "cotton price" OR "soybean price"`,
  weather: `"weather forecast India" OR "rainfall update" OR "monsoon update India"`,
  market: `"agricultural market India" OR "commodity prices India" OR "农 market news"`,
  policy: `"agricultural policy India" OR "farm scheme India" OR "kisan scheme"`
};

// ===== ROTATING PAGE TO AVOID REPETITION =====
// This changes the page number over time so you get different slices of results
function getRotatingPage(category) {
  // Use category + time bucket (e.g., every 10 minutes) to rotate page
  const bucket = Math.floor(Date.now() / (10 * 60 * 1000)); // 10-min buckets
  const base = 1;
  const offset = (bucket % 5) + 1; // pages 2–6 over time
  return base + offset;
}

// ===== SHUFFLE HELPER =====
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ===== MAIN EXPORT =====
module.exports = async (req, res) => {
  try {
    const category = req.query.category || 'agri';
    const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.agri;
    const page = getRotatingPage(category);

    const apiUrl = `${GNEWS_BASE_URL}?q=${encodeURIComponent(query)}&language=en&country=in&apikey=${GNEWS_API_KEY}&max=25&page=${page}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    let articles = [];

    // If real news exists → use them
    if (data.success && Array.isArray(data.records) && data.records.length > 0) {
      articles = data.records;
    } else {
      // NO REAL NEWS → repeat fallback news
      articles = FALLBACK_NEWS;
    }

    res.status(200).json({
      success: true,
      cached: false,
      articles: shuffle(articles)
    });
  } catch (error) {
    console.error('News fetch error:', error);

    // On error too, show fallback instead of empty
    res.status(200).json({
      success: false,
      reason: 'Server error fetching news',
      articles: FALLBACK_NEWS
    });
  }
};
