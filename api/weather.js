// /api/weather.js
module.exports = async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    const params = req.method === 'POST' ? req.body : req.query;
    let { city, lat, lon } = params || {};
    let resolvedPlaceName = '';

    // Case 1: Searching via City Text String Input
    if (city && (!lat || !lon)) {
        try {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();
            
            if (geoData.results && geoData.results.length > 0) {
                lat = geoData.results[0].latitude;
                lon = geoData.results[0].longitude;
                // Capture clean name, state/region, and country if available
                const name = geoData.results[0].name || city;
                const region = geoData.results[0].admin1 ? `, ${geoData.results[0].admin1}` : '';
                const country = geoData.results[0].country_code ? ` (${geoData.results[0].country_code.toUpperCase()})` : '';
                resolvedPlaceName = name + region + country;
            } else {
                return res.status(404).json({ success: false, reason: 'city_not_found' });
            }
        } catch (err) {
            return res.status(500).json({ success: false, reason: 'geocoding_failed' });
        }
    }

    // Case 2: Searching via My Location GPS coordinates
    if (lat && lon && !resolvedPlaceName) {
        try {
            // Reverse geocode the raw coordinates to find the place name
            const reverseGeoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            if (reverseGeoRes.ok) {
                const geoData = await reverseGeoRes.json();
                const cityPart = geoData.city || geoData.locality || geoData.principalSubdivision || '';
                const countryPart = geoData.countryCode ? ` (${geoData.countryCode.toUpperCase()})` : '';
                resolvedPlaceName = cityPart ? `${cityPart}${countryPart}` : '';
            }
        } catch (e) {
            console.warn("Reverse lookup failed, falling back to raw coordinates display string");
        }
        
        if (!resolvedPlaceName) {
            resolvedPlaceName = `${parseFloat(lat).toFixed(2)}°N, ${parseFloat(lon).toFixed(2)}°E`;
        }
    }

    if (!lat || !lon) {
        return res.status(400).json({ success: false, reason: 'missing_location_parameters' });
    }

    try {
        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const response = await fetch(meteoUrl);
        if (!response.ok) throw new Error('Open-Meteo server down');
        
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
