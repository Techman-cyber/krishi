// /api/weather.js
module.exports = async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const params = req.method === 'POST' ? req.body : req.query;
    let { city, lat, lon } = params || {};
    let resolvedPlaceName = '';

    // Advanced Local Search System
    if (city && (!lat || !lon)) {
        const cleanInput = city.trim();
        const isPinCode = /^[1-9][0-9]{5}$/.test(cleanInput);

        try {
            let geoUrl = '';
            if (isPinCode) {
                // If the user types a 6-digit PIN code, use openstreetmap postal search
                geoUrl = `https://nominatim.openstreetmap.org/search?postalcode=${cleanInput}&country=india&format=json&limit=1`;
            } else {
                // Regular city search optimized with an Indian focus area
                geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanInput)}&count=3&language=en&format=json`;
            }

            const geoRes = await fetch(geoUrl, { headers: { 'User-Agent': 'PatuKrishiAgriApp/1.0' } });
            const geoData = await geoRes.json();

            if (isPinCode && geoData && geoData.length > 0) {
                lat = geoData[0].lat;
                lon = geoData[0].lon;
                resolvedPlaceName = `PIN: ${cleanInput} (${geoData[0].display_name.split(',')[0]})`;
            } else if (!isPinCode && geoData.results && geoData.results.length > 0) {
                lat = geoData.results[0].latitude;
                lon = geoData.results[0].longitude;
                const name = geoData.results[0].name;
                const region = geoData.results[0].admin1 ? `, ${geoData.results[0].admin1}` : '';
                resolvedPlaceName = `${name}${region}`;
            } else {
                // Fallback: If it's a micro-location name, query OpenStreetMap directly
                const osmRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanInput + ', India')}&format=json&limit=1`, { headers: { 'User-Agent': 'PatuKrishiAgriApp/1.0' } });
                const osmData = await osmRes.json();
                if (osmData && osmData.length > 0) {
                    lat = osmData[0].lat;
                    lon = osmData[0].lon;
                    resolvedPlaceName = osmData[0].display_name.split(',')[0] + ", TS";
                } else {
                    return res.status(404).json({ success: false, reason: 'location_not_found' });
                }
            }
        } catch (err) {
            return res.status(500).json({ success: false, reason: 'geocoding_failed' });
        }
    }

    // Reverse Geocoding for "My Location" GPS button
    if (lat && lon && !resolvedPlaceName) {
        try {
            const reverseGeoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            if (reverseGeoRes.ok) {
                const geoData = await reverseGeoRes.json();
                const localSpot = geoData.locality || geoData.city || '';
                resolvedPlaceName = localSpot ? `${localSpot}, India` : 'Your Farm Location';
            }
        } catch (e) {
            resolvedPlaceName = `${parseFloat(lat).toFixed(2)}°N, ${parseFloat(lon).toFixed(2)}°E`;
        }
    }

    if (!lat || !lon) {
        return res.status(400).json({ success: false, reason: 'missing_location_parameters' });
    }

    try {
        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await fetch(meteoUrl);
        const data = await response.json();

        return res.status(200).json({
            success: true,
            locationName: resolvedPlaceName,
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
        return res.status(500).json({ success: false, reason: 'weather_fetch_failed' });
    }
};
