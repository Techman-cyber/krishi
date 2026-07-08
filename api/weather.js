// /api/weather.js
// Secure backend serverless proxy connecting to Open-Meteo (No API Key Required)

module.exports = async function handler(req, res) {
    // CORS & Method Safety Check
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    // Accept parameters from either GET query or POST body safely
    const params = req.method === 'POST' ? req.body : req.query;
    let { city, lat, lon } = params || {};

    // Open-Meteo strictly uses Coordinates. If a user types a city string, we translate it using a free geocoding query.
    if (city && (!lat || !lon)) {
        try {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();
            
            if (geoData.results && geoData.results.length > 0) {
                lat = geoData.results[0].latitude;
                lon = geoData.results[0].longitude;
                city = geoData.results[0].name; // Normalized clean city name (e.g. "Delhi")
            } else {
                return res.status(404).json({ success: false, reason: 'city_not_found' });
            }
        } catch (err) {
            return res.status(500).json({ success: false, reason: 'geocoding_failed' });
        }
    }

    if (!lat || !lon) {
        return res.status(400).json({ success: false, reason: 'missing_location_parameters' });
    }

    try {
        // Query Open-Meteo forecast coordinates (Grabbing Current conditions + Daily arrays)
        // Note: The frontend data.daily.slice(0, 5) handles limiting it down to a 5-day view perfectly!
        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const response = await fetch(meteoUrl);
        if (!response.ok) throw new Error('Open-Meteo server down');
        
        const data = await response.json();

        // Return clean structured telemetry data back down to the browser context payload
        return res.status(200).json({
            success: true,
            locationName: city || `Coords: ${parseFloat(lat).toFixed(2)}, ${parseFloat(lon).toFixed(2)}`,
            current: {
                temp: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                wind: data.current.wind_speed_10m,
                code: data.current.weather_code
            },
            daily: data.daily.time.map((time, index) => ({
                date: time,
                maxTemp: data.daily.temperature_2m_max[index],
                minTemp: data.daily.temperature_2m_min[index],
                code: data.daily.weather_code[index]
            }))
        });

    } catch (error) {
        console.error('Server side Open-Meteo execution failed:', error);
        return res.status(500).json({ success: false, reason: 'weather_fetch_failed' });
    }
};
