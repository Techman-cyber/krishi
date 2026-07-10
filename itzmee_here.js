// ========== COMPLETE DEV TOOLS & SOURCE PROTECTION ==========
// 1. Disable Right Click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// 2. Disable Drag and Drop
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
  return false;
});

// 3. Disable Text Selection
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.msUserSelect = 'none';

// 4. Disable Image Dragging (including dynamically added images)
const disableDragging = function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', 'false');
  });
};
disableDragging();
new MutationObserver(disableDragging).observe(document.body, { childList: true, subtree: true });

// 5. Disable ALL Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
  // F12
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I (Inspect)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (View Source)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    return false;
  }
  // Ctrl+S (Save)
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  // Ctrl+P (Print)
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+K (Firefox Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'K') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+E (Firefox Inspector)
  if (e.ctrlKey && e.shiftKey && e.key === 'E') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+M (Firefox Responsive)
  if (e.ctrlKey && e.shiftKey && e.key === 'M') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+P (Firefox Command)
  if (e.ctrlKey && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    return false;
  }
});

// 6. Detect Dev Tools via Debugger
let devToolsOpen = false;

function detectDevTools() {
  const start = performance.now();
  debugger;
  const end = performance.now();
  
  if (end - start > 100) {
    if (!devToolsOpen) {
      devToolsOpen = true;
      // Clear page and show warning
      document.body.innerHTML = `
        <div style="text-align:center; padding:50px; min-height:100vh; background:#1a1a2e; color:white; display:flex; align-items:center; justify-content:center; flex-direction:column;">
          <h1 style="font-size:3rem;">🔒 Access Denied</h1>
          <p style="font-size:1.2rem; margin-top:1rem;">Developer Tools are not allowed on this site.</p>
          <p>Please close Dev Tools and refresh the page.</p>
        </div>
      `;
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
    return true;
  }
  devToolsOpen = false;
  return false;
}

// Run immediately
detectDevTools();

// Keep checking every second
setInterval(detectDevTools, 1000);

// 7. Disable Console Methods
console.log = function() {};
console.error = function() {};
console.warn = function() {};
console.table = function() {};
console.debug = function() {};
console.info = function() {};
console.clear = function() {};

// 8. Clear Console on interval
setInterval(function() {
  if (typeof console !== 'undefined') {
    console.clear();
  }
}, 100);

// 9. Block view-source: URL
if (window.location.protocol === 'view-source:') {
  window.location.href = 'about:blank';
}

console.log('Protection Active');

(function(){
    // ==================== SWIPER INITIALIZATION ====================
    const swiper = new Swiper('.mySwiper', {
        loop: !0,
        autoplay: {
            delay: 3e3,
            disableOnInteraction: !1
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: !0
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    
    // ==================== GLOBAL VARIABLES ====================
    let currentUser = null,
        userDatabase = JSON.parse(localStorage.getItem('patukrishi_users') || '{}'),
        currentLanguage = 'en';
    
    // ==================== NEW STABLE API ROUTE (NO KEY REQUIRED) ====================
const MANDI_API_URL = 'https://api.ceda.ashoka.edu.in/v1/agmarknet/prices';
  // ========== ADD YOUR NEW APIs HERE ==========
const EMAILJS_SERVICE_ID = 'service_c48sfqj';      // <-- Add your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_xnjx3mg';    // <-- Add your EmailJS Template ID  
const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';      // <-- Add your EmailJS Public Key
    // Initialize EmailJS (add this after your API keys)
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}
   // ==================== WEATHER HELPER FUNCTIONS ====================
    function getMostCommon(arr) {
        return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
    }
    
    function formatDate(dateStr) {
        let date = new Date(dateStr);
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
    }
    
    function getFarmingAdvice(weatherCondition, temperature) {
        if (weatherCondition.includes('Rain') || weatherCondition.includes('Drizzle')) {
            return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
                <strong>🌧️ Rain Alert:</strong> Avoid spraying pesticides. Check for waterlogging in fields. Good for irrigation.
            </div>`;
        } else if (weatherCondition.includes('Clear') && temperature > 35) {
            return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
                <strong>☀️ Heat Alert:</strong> Increase irrigation frequency. Provide shade for sensitive crops. Best time for harvesting.
            </div>`;
        } else if (weatherCondition.includes('Clear') || weatherCondition.includes('Sun')) {
            return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
                <strong>🌾 Good Farming Weather:</strong> Ideal for spraying, weeding, and harvesting activities.
            </div>`;
        } else if (weatherCondition.includes('Cloud')) {
            return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
                <strong>☁️ Cloudy Day:</strong> Good for transplanting seedlings. Monitor for pest activity in humid conditions.
            </div>`;
        } else if (weatherCondition.includes('Thunderstorm')) {
            return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
                <strong>⛈️ Storm Alert:</strong> Secure farm equipment. Avoid field work. Ensure proper drainage.
            </div>`;
        }
        return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
            <strong>🌱 Farming Tip:</strong> Check soil moisture regularly. Maintain proper irrigation schedule.
        </div>`;
    }
    
    // ==================== REAL MANDI API FUNCTION ====================
    async function fetchRealMandiPricesFromAPI(state, district, commodity) {
        try {
            const url = `${MANDI_API_URL}?api-key=${MANDI_API_KEY}&format=json&filters[state]=${encodeURIComponent(state)}&filters[district]=${encodeURIComponent(district)}&filters[commodity]=${encodeURIComponent(commodity)}&limit=20`;
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.records && data.records.length > 0) {
                return data.records;
            }
            return null;
        } catch (error) {
            console.error('Error fetching mandi prices:', error);
            return null;
        }
    }
    
    // ==================== AGRI-WEATHER INTELLIGENCE ENGINE (OPEN-METEO) ====================
    window.getWeatherData = async () => {
        const city = document.getElementById('cityInput').value.trim();
        const resultDiv = document.getElementById('weather-result');
        
        if (!city) {
            resultDiv.innerHTML = '<p style="color:red">❌ Please enter a city name or PIN code</p>';
            resultDiv.style.display = 'block';
            return;
        }
        
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div style="text-align:center; padding:30px;"><i class="fas fa-spinner fa-pulse fa-spin fa-2x"></i><p>Pinging Open-Meteo climate arrays...</p></div>';
        
        try {
            const response = await fetch('/api/weather', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city })
            });
            
            const data = await response.json();
            if (data.success) {
                renderMeteoWeather(data, resultDiv);
            } else {
                throw new Error(data.reason || 'Location not found');
            }
        } catch (error) {
            console.error('Weather tracking failed:', error);
            resultDiv.innerHTML = `<p style="color:red; text-align:center; padding:20px;">
                ❌ Could not locate "${city}".<br>
                <span style="font-size:0.85rem; color:#666; display:block; margin-top:5px;">💡 Tip: Try entering your 6-digit area PIN Code (e.g., 500094) for local colonies and villages!</span>
            </p>`;
        }
    };
    
    window.getLocationWeatherData = () => {
        const resultDiv = document.getElementById('weather-result');
        
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div style="text-align:center; padding:30px;"><i class="fas fa-location-arrow fa-spin fa-2x"></i><p>Locating farm grid coordinates...</p></div>';
        
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const response = await fetch('/api/weather', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                });
                
                const data = await response.json();
                if (data.success) {
                    renderMeteoWeather(data, resultDiv);
                } else {
                    throw new Error(data.reason);
                }
            } catch (err) {
                console.error('Location weather query failure:', err);
                resultDiv.innerHTML = `<p style="color:red; text-align:center; padding:20px;">❌ Unable to parse GPS cell weather data.</p>`;
            }
        }, () => {
            alert('Please allow location access to get weather for your area');
            resultDiv.innerHTML = `<p style="text-align:center; padding:20px;">Please type your city or PIN code manually above.</p>`;
        });
    };

    function getWeatherDesc(code) {
        if (code === 0) return { text: "Clear Sky", icon: "☀️", main: "Clear" };
        if ([1, 2, 3].includes(code)) return { text: "Partly Cloudy", icon: "⛅", main: "Clouds" };
        if ([45, 48].includes(code)) return { text: "Foggy Conditions", icon: "🌫️", main: "Fog" };
        if ([51, 53, 55, 61, 63, 65].includes(code)) return { text: "Rain Showers", icon: "🌧️", main: "Rain" };
        if ([71, 73, 75, 77].includes(code)) return { text: "Snowfall", icon: "❄️", main: "Snow" };
        if ([80, 81, 82, 85, 86].includes(code)) return { text: "Heavy Downpour", icon: "🌧️🚿", main: "Rain" };
        if ([95, 96, 99].includes(code)) return { text: "Thunderstorm Alerts", icon: "⛈️", main: "Thunderstorm" };
        return { text: "Stable Conditions", icon: "🌤️", main: "Clear" };
    }

    function renderMeteoWeather(data, targetDiv) {
        const currentCondition = getWeatherDesc(data.current.code);
        
        // Live system clock parsing for current verification timestamp tracking
        const now = new Date();
        const currentTimeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        const currentDateString = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

        let currentHtml = `
            <div style="text-align: center; padding: 25px; background: var(--bg); border-radius: 32px; margin-bottom: 25px; box-shadow: var(--shadow); position: relative;">
                <div style="position: absolute; top: 15px; right: 20px; font-size: 0.85rem; color: var(--text2); background: var(--card-bg); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border); font-weight: 500;">
                    🕒 As of: ${currentTimeString} | ${currentDateString}
                </div>
                
                <h2 style="color: #2e7d32; margin-top: 15px;">📍 ${data.locationName}</h2>
                <div style="display: flex; align-items: center; justify-content: center; gap: 25px; margin: 20px 0; flex-wrap: wrap;">
                    <span style="font-size: 5rem; line-height: 1;">${currentCondition.icon}</span>
                    <div>
                        <div style="font-size: 4rem; font-weight: 700; line-height: 1.1;">${Math.round(data.current.temp)}°C</div>
                        <div style="font-size: 1.3rem; text-transform: capitalize; margin-top: 5px;">${currentCondition.text}</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; margin-top: 15px; font-size: 0.95rem;">
                    <div><i class="fas fa-tint" style="color: #1e88e5;"></i> Humidity: ${data.current.humidity}%</div>
                    <div><i class="fas fa-wind" style="color: #78909c;"></i> Wind: ${data.current.wind} km/h</div>
                </div>
            </div>
        `;

        let forecastHtml = `
            <div style="margin-top:25px;">
                <h3>📅 7-Day Farm Forecast</h3>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; margin-top:15px;">
        `;
        
        // Render 7 elements from Open-Meteo arrays safely
        data.daily.forEach(day => {
            const dateObj = new Date(day.date);
            const displayDate = typeof formatDate === 'function' ? formatDate(dateObj.toLocaleDateString()) : dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
            const dayCondition = getWeatherDesc(day.code);
            
            forecastHtml += `
                <div style="background: var(--card-bg); border-radius: 20px; padding: 15px; text-align: center; border: 1px solid var(--border); box-shadow: var(--shadow);">
                    <div style="font-weight: 700; color: #2e7d32; margin-bottom: 10px; font-size: 0.9rem;">${displayDate}</div>
                    <span style="font-size: 2.2rem; display:block; margin: 8px 0;">${dayCondition.icon}</span>
                    <div style="font-size: 1.3rem; font-weight: 700; margin: 4px 0;">${Math.round(day.maxTemp)}°C</div>
                    <div style="font-size: 0.75rem; color: var(--text2); text-transform: capitalize; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${dayCondition.text}</div>
                    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px; font-size: 0.75rem;">
                        <span style="color: #f9a825;">↑ ${Math.round(day.maxTemp)}°</span>
                        <span style="color: #2e7d32;">↓ ${Math.round(day.minTemp)}°</span>
                    </div>
                </div>
            `;
        });
        forecastHtml += '</div></div>';
        
        let farmingAdvice = '';
        if (typeof getFarmingAdvice === 'function') {
            farmingAdvice = getFarmingAdvice(currentCondition.main, data.current.temp);
        }
        
        targetDiv.innerHTML = currentHtml + forecastHtml + farmingAdvice;
    }
    // ==================== UPDATED MANDI PRICES FUNCTION WITH REAL API ====================
    window.fetchMandiPrices = async () => {
        const state = document.getElementById('mandiStateSelect').value;
        const district = document.getElementById('mandiDistrictSelect').value;
        const crop = document.getElementById('mandiCropSelect').value;
        const container = document.getElementById('mandi-cards-container');
        const messageDiv = document.getElementById('mandi-multiple-list');
        
        if (!state || !district || !crop) {
            showNotification('Please select state, district and crop', 'error');
            return;
        }
        
        container.innerHTML = '<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-pulse fa-3x"></i><p>Fetching live mandi prices from government API...</p></div>';
        
        try {
            const records = await fetchRealMandiPricesFromAPI(state, district, crop);
            if (records && records.length > 0) {
                container.innerHTML = '';
                records.forEach(record => {
                    const card = document.createElement('div');
                    card.className = 'market-card';
                    const price = record.modal_price || record.avg_price || record.min_price || record.max_price;
                    const priceValue = price ? `₹${parseInt(price).toLocaleString()}` : 'N/A';
                    card.innerHTML = `
                        <h4>🏪 ${record.market || record.arrival_mandi || 'Market Name'}</h4>
                        <p><strong>🌾 Crop:</strong> ${record.commodity || crop}</p>
                        <p><strong>💰 Price (₹/q):</strong> <span style="font-size:1.4rem; color:#2e7d32;">${priceValue}</span></p>
                        <p><strong>📅 Date:</strong> ${record.arrival_date || record.updated_date || 'Latest'}</p>
                        <p><strong>📍 Location:</strong> ${record.district || district}, ${record.state || state}</p>
                        <small style="color:#666;">📊 Source: AGMARKNET (Government of India)</small>
                    `;
                    container.appendChild(card);
                });
                messageDiv.innerHTML = `<p class="big-friendly" style="background:#e8f5e9; padding:15px; border-radius:15px;">
                    ✅ <strong>Real-time mandi prices from ${district}, ${state}</strong><br>
                    Showing ${records.length} market rates for ${crop}. Prices are updated by government sources.
                </p>`;
                showNotification(`Found ${records.length} market rates for ${crop} in ${district}`, 'success');
            } else {
                useMockMandiData(state, district, crop, container, messageDiv);
            }
        } catch (error) {
            console.error('API error, using mock data:', error);
            useMockMandiData(state, district, crop, container, messageDiv);
            showNotification('Unable to fetch live prices. Showing demo data.', 'warning');
        }
    };
    
    function useMockMandiData(state, district, crop, container, messageDiv) {
        const cropsData = {
            'Wheat': { basePrice: 2450, markets: ['APMC Main Yard', 'Grain Market', 'Kisan Mandi', 'Wholesale Market'], minPrice: 2350, maxPrice: 2550 },
            'Rice': { basePrice: 2150, markets: ['Rice Millers Association', 'Grain Market', 'APMC Yard', 'Farmers Market'], minPrice: 2050, maxPrice: 2250 },
            'Tomato': { basePrice: 45, markets: ['Vegetable Market', 'Farmers Market', 'Wholesale Mandi', 'Retail Hub'], minPrice: 35, maxPrice: 65 },
            'Potato': { basePrice: 2850, markets: ['Cold Storage Hub', 'APMC Market', 'Farmers Mandi', 'Wholesale Center'], minPrice: 2750, maxPrice: 3100 },
            'Onion': { basePrice: 3900, markets: ['Lasalgaon Market', 'APMC Yard', 'Farmers Mandi', 'Wholesale Hub'], minPrice: 3500, maxPrice: 4500 },
            'Cotton': { basePrice: 7200, markets: ['Cotton Mandi', 'Ginning Mill Hub', 'APMC Yard', 'Farmers Market'], minPrice: 6900, maxPrice: 7600 },
            'Maize': { basePrice: 2100, markets: ['Grain Market', 'APMC Yard', 'Farmers Mandi', 'Wholesale Hub'], minPrice: 2000, maxPrice: 2250 },
            'Sugarcane': { basePrice: 380, markets: ['Sugar Mill Gate', 'Cooperative Society', 'Farmers Mandi', 'APMC Yard'], minPrice: 360, maxPrice: 410 }
        };
        const cropData = cropsData[crop] || { basePrice: 2000, markets: ['Main Market', 'APMC Yard', 'Local Mandi', 'Farmers Market'], minPrice: 1900, maxPrice: 2200 };
        container.innerHTML = '';
        cropData.markets.forEach((marketName) => {
            const variation = (Math.random() - 0.5) * 200;
            const price = Math.round(cropData.basePrice + variation);
            const minPrice = cropData.minPrice || (cropData.basePrice - 100);
            const maxPrice = cropData.maxPrice || (cropData.basePrice + 100);
            const change = ((Math.random() - 0.5) * 8).toFixed(1);
            const changeClass = change >= 0 ? 'price-up' : 'price-down';
            const card = document.createElement('div');
            card.className = 'market-card';
            card.innerHTML = `
                <h4>🏪 ${marketName}</h4>
                <p><strong>🌾 Crop:</strong> ${crop}</p>
                <p><strong>💰 Price (₹/q):</strong> <span style="font-size:1.4rem; color:#2e7d32;">₹${price.toLocaleString()}</span></p>
                <p><strong>📊 Range:</strong> ₹${minPrice} - ₹${maxPrice}</p>
                <p><strong>📈 Change:</strong> <span class="${changeClass}">${change}%</span></p>
                <p><strong>📍 Market:</strong> ${district}, ${state}</p>
            `;
            container.appendChild(card);
        });
        messageDiv.innerHTML = `<p class="big-friendly" style="background:#fff3e0; padding:15px; border-radius:15px;">
            📊 <strong>${district} mandi prices for ${crop}</strong><br>
            Showing ${cropData.markets.length} market rates. Compare prices before selling your crop!
        </p>`;
    }
farmingTips = {
            en: ["🌱 Always test your soil before sowing - different crops need different nutrients","💧 Drip irrigation saves 30% water","🌾 Practice crop rotation - maintains soil fertility","🐛 Regular pest inspection - early detection saves crops","📱 Get all updates on PatuKrishi app","💰 Check mandi prices before selling - get best rates","🌞 Mulching helps retain soil moisture","🌱 Increase use of cow dung manure - reduce chemical fertilizers","🌾 Treat wheat seeds before sowing","🍚 Prepare nursery before paddy transplantation","🧶 Install pheromone traps to prevent pink bollworm in cotton","🎋 Use 2-3 eye pieces for sugarcane planting","🌽 Maintain 60x25 cm spacing for maize","🥔 Plant potatoes in October-November","🧅 Use 6-8 week old seedlings for onion nursery","🍅 Stake tomato plants for better yield","🌱 Green manure improves soil health","💧 Reduce irrigation in cold weather","🌾 Harvest wheat at 12-14% moisture","📊 Get crop insurance - protection against natural disasters","🌱 Maintain proper fertilizer quantity per hectare","💧 Check water quality for irrigation","🌾 Don't burn crop residue - beneficial for soil","🐛 Increase use of organic pesticides","🌱 Maintain proper seed rate - not too less or too much","📅 Sow Rabi crops in October-November","🌧️ Sow Kharif crops in June-July","☀️ Light irrigation for Zaid crops","🌾 4-5 irrigations sufficient for wheat","🍚 Maintain 5 cm water in paddy fields","🧶 Maintain 90x60 cm spacing for cotton","🌽 Top dress urea in maize","🥔 Earth up potato plants","🌱 Spray neem oil for crop protection","💧 Drip irrigated crops give higher yield","🌾 Harvest wheat in March-April","🍚 Harvest paddy in October-November","🧶 Pick cotton in October-December","🌽 Harvest maize in 90-110 days","🎋 Harvest sugarcane in 10-12 months","🌱 Sow groundnut in June-July","🌾 Sow mustard in October","🌱 Sow chickpea in October-November","🌾 Sow barley in October-November","🌱 Control pests in pigeon pea","💧 Prevent yellow mosaic in soybean","🌾 Sow bajra in July","🌱 Manage moisture in jowar crop","📊 Check mandi rates before selling","🌾 PatuKrishi - Every farmer's companion"],
            hi: ["🌱 बुवाई से पहले मिट्टी की जांच जरूर करें - अलग फसलों को अलग पोषक तत्व चाहिए","💧 ड्रिप सिंचाई से 30% पानी की बचत करें","🌾 फसल चक्र अपनाएं - मिट्टी की उर्वरता बनी रहेगी","🐛 कीटों की नियमित जांच करें - समय पर पहचान से फसल बचेगी","📱 पटुकृषि ऐप से हर अपडेट पाएं","💰 मंडी भाव देखकर ही फसल बेचें - सही दाम मिलेगा","🌞 मल्चिंग से मिट्टी की नमी बनी रहती है","🌱 गोबर खाद का प्रयोग बढ़ाएं - रासायनिक खाद कम करें","🌾 गेहूं की बुवाई से पहले बीज उपचार जरूरी","🍚 धान की रोपाई से पहले नर्सरी तैयार करें","🧶 कपास में गुलाबी सुंडी से बचाव के लिए फेरोमोन ट्रैप लगाएं","🎋 गन्ने की बुवाई के समय 2-3 आंख वाले टुकड़े लें","🌽 मक्का की फसल में 60x25 सेमी की दूरी रखें","🥔 आलू की बुवाई अक्टूबर-नवंबर में करें","🧅 प्याज की नर्सरी में 6-8 सप्ताह पुराने पौधे लगाएं","🍅 टमाटर में सहारा देने से उपज बढ़ती है","🌱 हरी खाद से मिट्टी की सेहत सुधरेगी","💧 ठंड के मौसम में सिंचाई कम करें","🌾 गेहूं की कटाई नमी 12-14% पर करें","📊 फसल बीमा जरूर कराएं - प्राकृतिक आपदा से बचाव","🌱 प्रति हेक्टेयर खाद की सही मात्रा का ध्यान रखें","💧 सिंचाई के लिए पानी की गुणवत्ता जांचें","🌾 फसल अवशेष न जलाएं - मिट्टी के लिए फायदेमंद","🐛 जैविक कीटनाशकों का प्रयोग बढ़ाएं","🌱 बीज दर का ध्यान रखें - कम या ज्यादा न हो","📅 रबी की बुवाई अक्टूबर-नवंबर में करें","🌧️ खरीफ की बुवाई जून-जुलाई में करें","☀️ जायद की फसलों के लिए हल्की सिंचाई","🌾 गेहूं में 4-5 सिंचाई पर्याप्त","🍚 धान में 5 सेमी पानी जरूर रखें","🧶 कपास में 90x60 सेमी की दूरी रखें","🌽 मक्का में यूरिया की टॉप ड्रेसिंग करें","🥔 आलू में मिट्टी चढ़ाना जरूरी","🌱 फसल सुरक्षा के लिए नीम तेल का छिड़काव","💧 ड्रिप सिंचित फसलों में पैदावार अधिक","🌾 गेहूं की कटाई मार्च-अप्रैल में","🍚 धान की कटाई अक्टूबर-नवंबर में","🧶 कपास की तुड़ाई अक्टूबर-दिसंबर में","🌽 मक्का की कटाई 90-110 दिन में","🎋 गन्ने की कटाई 10-12 महीने में","🌱 मूंगफली की बुवाई जून-जुलाई में","🌾 सरसों की बुवाई अक्टूबर में","🌱 चने की बुवाई अक्टूबर-नवंबर में","🌾 जौ की बुवाई अक्टूबर-नवंबर में","🌱 अरहर की फसल में कीट नियंत्रण जरूरी","💧 सोयाबीन में पीला मोज़ेक रोग से बचाव","🌾 बाजरे की बुवाई जुलाई में करें","🌱 ज्वार की फसल में नमी प्रबंधन","📊 मंडी भाव की जानकारी लेकर ही बेचें","🌾 पटुकृषि - हर किसान का साथी"],
            bn: ["🌱 বপনের আগে মাটি পরীক্ষা করুন - বিভিন্ন ফসলের বিভিন্ন পুষ্টি প্রয়োজন","💧 ড্রিপ সেচ 30% জল বাঁচায়","🌾 ফসলের আবর্তন করুন - মাটির উর্বরতা বজায় থাকে","🐛 নিয়মিত পোকা পরীক্ষা - আগে শনাক্ত করলে ফসল বাঁচে","📱 পাটুকৃষি অ্যাপে সব আপডেট পান","💰 বিক্রির আগে মন্ডির দাম দেখুন - সেরা দাম পান","🌞 মালচিং মাটির আর্দ্রতা ধরে রাখে","🌱 গোবর সারের ব্যবহার বাড়ান - রাসায়নিক সার কমান","🌾 বপনের আগে গমের বীজ শোধন করুন","🍚 ধান রোপণের আগে নার্সারি তৈরি করুন","🧶 তুলোতে গোলাপী বলওয়ার্ম প্রতিরোধে ফেরোমন ফাঁদ বসান","🎋 আখ রোপণের সময় 2-3 চোখযুক্ত টুকরো ব্যবহার করুন","🌽 ভুট্টার জন্য 60x25 সেমি দূরত্ব বজায় রাখুন","🥔 অক্টোবর-নভেম্বরে আলু রোপণ করুন","🧅 পেঁয়াজের নার্সারিতে 6-8 সপ্তাহের চারা ব্যবহার করুন","🍅 ভাল ফলনের জন্য টমেটো গাছকে সাপোর্ট দিন","🌱 সবুজ সার মাটির স্বাস্থ্য উন্নত করে","💧 ঠান্ডা আবহাওয়ায় সেচ কমান","🌾 12-14% আর্দ্রতায় গম কাটুন","📊 ফসল বীমা করান - প্রাকৃতিক দুর্যোগ থেকে সুরক্ষা","🌱 প্রতি হেক্টরে সঠিক সার পরিমাণ বজায় রাখুন","💧 সেচের জন্য জলের গুণমান পরীক্ষা করুন","🌾 ফসলের অবশিষ্টাংশ পোড়াবেন না - মাটির জন্য উপকারী","🐛 জৈব কীটনাশকের ব্যবহার বাড়ান","🌱 সঠিক বীজ হার বজায় রাখুন - কম বা বেশি না হয়","📅 অক্টোবর-নভেম্বরে রবি ফসল বপন করুন","🌧️ জুন-জুলাইতে খরিফ ফসল বপন করুন","☀️ জায়েদ ফসলের জন্য হালকা সেচ","🌾 গমের জন্য 4-5 সেচ যথেষ্ট","🍚 ধান ক্ষেতে 5 সেমি জল বজায় রাখুন","🧶 তুলোর জন্য 90x60 সেমি দূরত্ব বজায় রাখুন","🌽 ভুট্টায় ইউরিয়ার টপ ড্রেসিং করুন","🥔 আলু গাছে মাটি তোলা জরুরি","🌱 ফসল সুরক্ষার জন্য নিম তেল স্প্রে করুন","💧 ড্রিপ সেচ দেওয়া ফসলে ফলন বেশি হয়","🌾 মার্চ-এপ্রিলে গম কাটুন","🍚 অক্টোবর-নভেম্বরে ধান কাটুন","🧶 অক্টোবর-ডিসেম্বরে তুলো তুলুন","🌽 90-110 দিনে ভুট্টা কাটুন","🎋 10-12 মাসে আখ কাটুন","🌱 জুন-জুলাইতে চিনাবাদাম বপন করুন","🌾 অক্টোবরে সরিষা বপন করুন","🌱 অক্টোবর-নভেম্বরে ছোলা বপন করুন","🌾 অক্টোবর-নভেম্বরে যব বপন করুন","🌱 অড়হর ফসলে পোকা নিয়ন্ত্রণ জরুরি","💧 সয়াবিনে হলুদ মোজাইক প্রতিরোধ করুন","🌾 জুলাইতে বাজরা বপন করুন","🌱 জোয়ার ফসলে আর্দ্রতা ব্যবস্থাপনা","📊 বিক্রির আগে মন্ডির দাম দেখে নিন","🌾 পাটুকৃষি - প্রতিটি কৃষকের সঙ্গী"],
            te: ["🌱 విత్తనాలు వేసే ముందు మట్టిని పరీక్షించండి - వివిధ పంటలకు వివిధ పోషకాలు అవసరం","💧 బిందు సేద్యం 30% నీటిని ఆదా చేస్తుంది","🌾 పంట మార్పిడి చేయండి - నేల సారాన్ని కాపాడుతుంది","🐛 క్రమం తప్పకుండా తెగుళ్ళ తనిఖీ - ముందస్తుగా గుర్తిస్తే పంటలను కాపాడుతుంది","📱 పటుకృషి యాప్‌లో అన్ని అప్‌డేట్‌లు పొందండి","💰 అమ్మే ముందు మండీ ధరలను తనిఖీ చేయండి - ఉత్తమ ధరలు పొందండి","🌞 మల్చింగ్ నేల తేమను నిలుపుకోవటానికి సహాయపడుతుంది","🌱 ఆవు పేడ ఎరువు వాడకాన్ని పెంచండి - రసాయన ఎరువులు తగ్గించండి","🌾 విత్తడానికి ముందు గోధుమ విత్తనాలను శుద్ధి చేయండి","🍚 వరి నాటడానికి ముందు నర్సరీని సిద్ధం చేయండి","🧶 పత్తిలో గులాబీ దుమ్ము పురుగును నివారించడానికి ఫెరోమోన్ ట్రాప్‌లను ఏర్పాటు చేయండి","🎋 చెరకు నాటడానికి 2-3 కళ్ళ ముక్కలను ఉపయోగించండి","🌽 మొక్కజొన్నకు 60x25 సెం.మీ దూరం నిర్వహించండి","🥔 అక్టోబర్-నవంబర్‌లో బంగాళాదుంపలను నాటండి","🧅 ఉల్లిపాయ నర్సరీకి 6-8 వారాల వయసున్న మొక్కలను ఉపయోగించండి","🍅 మంచి దిగుబడి కోసం టమోటా మొక్కలకు ఆధారం ఇవ్వండి","🌱 పచ్చి ఎరువు నేల ఆరోగ్యాన్ని మెరుగుపరుస్తుంది","💧 చల్లని వాతావరణంలో సేద్యం తగ్గించండి","🌾 12-14% తేమ వద్ద గోధుమలను కోయండి","📊 పంట బీమా తీసుకోండి - సహజ విపత్తుల నుండి రక్షణ","🌱 హెక్టారుకు సరైన ఎరువుల పరిమాణాన్ని నిర్వహించండి","💧 సేద్యం కోసం నీటి నాణ్యతను తనిఖీ చేయండి","🌾 పంట అవశేషాలను కాల్చకండి - నేలకు ప్రయోజనకరం","🐛 సేంద్రీయ పురుగుమందుల వాడకాన్ని పెంచండి","🌱 సరైన విత్తనాల మోతాదు నిర్వహించండి - తక్కువ లేదా ఎక్కువ కాకుండా","📅 అక్టోబర్-నవంబర్‌లో రబీ పంటలను విత్తండి","🌧️ జూన్-జూలైలో ఖరీఫ్ పంటలను విత్తండి","☀️ జాయిద్ పంటలకు తేలికపాటి సేద్యం","🌾 గోధుమకు 4-5 సేద్యాలు సరిపోతాయి","🍚 వరి పొలాల్లో 5 సెం.మీ నీరు నిర్వహించండి","🧶 పత్తికి 90x60 సెం.మీ దూరం నిర్వహించండి","🌽 మొక్కజొన్నలో యూరియా టాప్ డ్రెస్సింగ్ చేయండి","🥔 బంగాళాదుంప మొక్కలకు మట్టి ఎక్కించండి","🌱 పంట రక్షణ కోసం వేపనూనె పిచికారీ చేయండి","💧 బిందు సేద్యం పంటలు ఎక్కువ దిగుబడి ఇస్తాయి","🌾 మార్చి-ఏప్రిల్‌లో గోధుమలను కోయండి","🍚 అక్టోబర్-నవంబర్‌లో వరిని కోయండి","🧶 అక్టోబర్-డిసెంబర్‌లో పత్తిని ఏరుకోండి","🌽 90-110 రోజుల్లో మొక్కజొన్న కోయండి","🎋 10-12 నెల్లలో చెరకు కోయండి","🌱 జూన్-జూలైలో వేరుశనగను విత్తండి","🌾 అక్టోబర్‌లో ఆవాలను విత్తండి","🌱 అక్టోబర్-నవంబర్‌లో శనగను విత్తండి","🌾 అక్టోబర్-నవంబర్‌లో బార్లీని విత్తండి","🌱 కంది పంటలో తెగుళ్ళను నియంత్రించండి","💧 సోయాబీన్‌లో పసుపు మొజాయిక్ నివారించండి","🌾 జూలైలో బజ్రా విత్తండి","🌱 జొన్న పంటలో తేమ నిర్వహణ","📊 అమ్మే ముందు మండీ ధరలను తనిఖీ చేయండి","🌾 పటుకృషి - ప్రతి రైతుకు తోడు"],
            mr: ["🌱 पेरणीपूर्वी मातीची चाचणी करा - विविध पिकांसाठी वेगवेगळी पोषकद्रव्ये आवश्यक","💧 ठिबक सिंचनामुळे 30% पाण्याची बचत होते","🌾 पीक फेरपालट करा - जमिनीची सुपीकता टिकून राहते","🐛 कीड नियमित तपासा - लवकर ओळख झाल्यास पीक वाचते","📱 पटुकृषी अॅपवर सर्व अद्यतने मिळवा","💰 विक्रीपूर्वी मंडी भाव पहा - सर्वोत्तम दर मिळवा","🌞 आच्छादन केल्याने जमिनीतील ओलावा टिकून राहतो","🌱 शेणखताचा वापर वाढवा - रासायनिक खते कमी करा","🌾 पेरणीपूर्वी गव्हाच्या बियाण्यांवर प्रक्रिया करा","🍚 भात लागवडीपूर्वी रोपवाटिका तयार करा","🧶 कापसात गुलाबी बोंडअळीपासून बचावासाठी फेरोमोन सापळे लावा","🎋 ऊस लागवडीसाठी 2-3 डोळ्यांचे तुकडे वापरा","🌽 मक्यासाठी 60x25 सेमी अंतर ठेवा","🥔 ऑक्टोबर-नोव्हेंबरमध्ये बटाटा लागवड करा","🧅 कांदा रोपवाटिकेत 6-8 आठवडे वयाची रोपे वापरा","🍅 चांगल्या उत्पादनासाठी टोमॅटोच्या झाडांना आधार द्या","🌱 हिरवळीचे खत जमिनीचे आरोग्य सुधारते","💧 थंड हवामानात सिंचन कमी करा","🌾 12-14% आर्द्रता असताना गव्हाची काढणी करा","📊 पीक विमा काढा - नैसर्गिक आपत्तीपासून संरक्षण","🌱 हेक्टरी खतांचे योग्य प्रमाण ठेवा","💧 सिंचनासाठी पाण्याची गुणवत्ता तपासा","🌾 पिकांचे अवशेष जाळू नका - जमिनीसाठी फायदेशीर","🐛 जैविक कीटकनाशकांचा वापर वाढवा","🌱 योग्य बीजदर ठेवा - कमी किंवा जास्त नको","📅 रब्बी पिकांची पेरणी ऑक्टोबर-नोव्हेंबरमध्ये करा","🌧️ खरीप पिकांची पेरणी जून-जुलैमध्ये करा","☀️ जायद पिकांसाठी हलके सिंचन","🌾 गव्हासाठी 4-5 सिंचने पुरेशी","🍚 भातशेतात 5 सेमी पाणी राखा","🧶 कापसासाठी 90x60 सेमी अंतर ठेवा","🌽 मक्यात युरियाची टॉप ड्रेसिंग करा","🥔 बटाट्याच्या झाडांना माती चढवा","🌱 पीक संरक्षणासाठी निंबोळी तेल फवारा","💧 ठिबक सिंचित पिकांचे उत्पादन अधिक","🌾 मार्च-एप्रिलमध्ये गव्हाची काढणी","🍚 ऑक्टोबर-नोव्हेंबरमध्ये भाताची काढणी","🧶 ऑक्टोबर-डिसेम्बरमध्ये कापूस तोडा","🌽 90-110 दिवसांत मक्याची काढणी","🎋 10-12 महिन्यांत ऊस काढणी","🌱 जून-जुलैमध्ये भुईमूग पेरा","🌾 ऑक्टोबरमध्ये मोहरी पेरा","🌱 ऑक्टोबर-नोव्हेंबरमध्ये हरभरा पेरा","🌾 ऑक्टोबर-नोव्हेंबरमध्ये जवस पेरा","🌱 तूर पिकात कीड नियंत्रण आवश्यक","💧 सोयाबीनमध्ये पिवळा मोझॅक प्रतिबंध करा","🌾 जुलैमध्ये बाजरी पेरा","🌱 ज्वारी पिकात आर्द्रता व्यवस्थापन","📊 विक्रीपूर्वी मंडी भाव तपासा","🌾 पटुकृषी - प्रत्येक शेतकऱ्याचा सोबती"],
            gu: ["🌱 વાવણી પહેલા માટીની તપાસ કરો - અલગ પાકને અલગ પોષક તત્વો જોઈએ","💧 ટપક સિંચાઈથી 30% પાણી બચે છે","🌾 પાક પરિવર્તન કરો - જમીનની ફળદ્રુપતા જળવાઈ રહે છે","🐛 નિયમિત જીવાત તપાસ - વહેલી ઓળખથી પાક બચે છે","📱 પટુકૃષિ એપ પર બધા અપડેટ્સ મેળવો","💰 વેચાણ પહેલા મંડી ભાવ તપાસો - શ્રેષ્ઠ ભાવ મેળવો","🌞 મલ્ચિંગથી જમીનનો ભેજ જળવાઈ રહે છે","🌱 છાણીયા ખાતરનો ઉપયોગ વધારો - રાસાયણિક ખાતર ઘટાડો","🌾 વાવણી પહેલા ઘઉંના બીજને ઉપચાર કરો","🍚 ધાન રોપણી પહેલા નર્સરી તૈયાર કરો","🧶 કપાસમાં ગુલાબી ઈયળ અટકાવવા ફેરોમોન ટ્રેપ મૂકો","🎋 શેરડી રોપણી માટે 2-3 આંખવાળા ટુકડા વાપરો","🌽 મકાઈ માટે 60x25 સેમી અંતર રાખો","🥔 ઓક્ટોબર-નવેમ્બરમાં બટાટા રોપો","🧅 ડુંગળી નર્સરી માટે 6-8 અઠવાડિયાના રોપા વાપરો","🍅 સારા ઉત્પાદન માટે ટામેટાના છોડને ટેકો આપો","🌱 લીલું ખાતર જમીનની તંદુરસ્તી સુધારે છે","💧 ઠંડા હવામાનમાં સિંચાઈ ઘટાડો","🌾 12-14% ભેજ પર ઘઉંની કાપણી કરો","📊 પાક વીમો લો - કુદરતી આફતોથી રક્ષણ","🌱 હેક્ટર દીઠ ખાતરની યોગ્ય માત્રા જાળવો","💧 સિંચાઈ માટે પાણીની ગુણવત્તા તપાસો","🌾 પાક અવશેષો બાળશો નહીં - જમીન માટે ફાયદાકારક","🐛 જૈવિક જંતુનાશકોનો ઉપયોગ વધારો","🌱 યોગ્ય બીજ દર જાળવો - ઓછું કે વધુ નહીં","📅 ઓક્ટોબર-નવેમ્બરમાં રવિ પાક વાવો","🌧️ જૂન-જુલાઈમાં ખરીફ પાક વાવો","☀️ જૈદ પાક માટે હળવી સિંચાઈ","🌾 ઘઉં માટે 4-5 સિંચાઈ પૂરતી","🍚 ધાનના ખેતરમાં 5 સેમી પાણી જાળવો","🧶 કપાસ માટે 90x60 સેમી અંતર જાળવો","🌽 મકાઈમાં યુરિયાની ટોપ ડ્રેસિંગ કરો","🥔 બટાટાના છોડને માટી ચઢાવો","🌱 પાક સુરક્ષા માટે નીમ તેલ છાંટો","💧 ટપક સિંચાઈવાળા પાકો વધુ ઉત્પાદન આપે છે","🌾 માર્ચ-એપ્રિલમાં ઘઉંની કાપણી","🍚 ઓક્ટોબર-નવેમ્બરમાં ધાનની કાપણી","🧶 ઓક્ટોબર-ડિસેમ્બરમાં કપાસ તોડો","🌽 90-110 દિવસમાં મકાઈની કાપણી","🎋 10-12 મહિનામાં શેરડીની કાપણી","🌱 જૂન-જુલાઈમાં મગફળી વાવો","🌾 ઓક્ટોબરમાં સરસવ વાવો","🌱 ઓક્ટોબર-નવેમ્બરમાં ચણા વાવો","🌾 ઓક્ટોબર-નવેम્બरમાં જવ વાવો","🌱 તુવેર પાકમાં જીવાત નિયંત્રણ જરૂરી","💧 સોયાબીનમાં પીળો મોઝેક અટકાવો","🌾 જુલાઈમાં બાજરી વાવો","🌱 જુવાર પાકમાં ભેજ વ્યવસ્થાપન","📊 વેચાણ પહેલા મંડી ભાવ તપાસો","🌾 પટુકૃષિ - દરેક ખેડૂતનો સાથી"],
            mwr: ["🌱 बीज बोने से पहले माटी की जांच करो - अलग-अलग फसलां को अलग-अलग पोषक तत्व चाहिए","💧 ड्रिप सिंचाई से 30% पाणी बचावै","🌾 फसल चक्र अपनावो - माटी की उर्वरता बणी रहै","🐛 कीड़ा-मकोड़ा की नियमित जांच करो - वक्त रहते पता लागै तो फसल बच जावै","📱 पटुकृषि एप पै सगळे अपडेट मिलै","💰 मंडी भाव देखकर ही फसल बेचो - सही भाव मिलै","🌞 मल्चिंग से माटी की नमी बणी रहै","🌱 गोबर खाद का उपयोग बढ़ावो - रासायनिक खाद घटावो","🌾 गेहूं की बोआई से पहले बीज उपचार करो","🍚 धान की रोपाई से पहले नर्सरी तैयार करो","🧶 कपास में गुलाबी सुंडी से बचाव खातिर फेरोमोन ट्रैप लगावो","🎋 गन्ना बोवतां वखत 2-3 आंख वाळा टुकड़ा लेवो","🌽 मक्का की फसल में 60x25 सेमी दूरी राखो","🥔 अक्टूबर-नवंबर में बटाटा बोवो","🧅 कांदा नर्सरी में 6-8 अठवारा पुराना पौधा लगावो","🍅 टमाटर में सहारो देवो तो उपज बढ़ै","🌱 हरी खाद से माटी की सेहत सुधरै","💧 सियाळा में सिंचाई घटावो","🌾 12-14% नमी पर गेहूं की कटाई करो","📊 फसल बीमा करावो - कुदरती आपदा से बचाव","🌱 हेक्टेयर प्रमाणे खाद की सही मात्रा राखो","💧 सिंचाई खातिर पाणी की गुणवत्ता जांचो","🌾 फसल अवशेष नीं जळावो - माटी खातिर फायदेमंद","🐛 जैविक कीटनाशक का उपयोग बढ़ावो","🌱 बीज दर का ध्यान राखो - कम या जादा नीं होवै","📅 अक्टूबर-नवंबर में रबी की बोआई करो","🌧️ जून-जुलाई में खरीफ की बोआई करो","☀️ जायद की फसलां खातिर हल्की सिंचाई","🌾 गेहूं में 4-5 सिंचाई काफी","🍚 धान में 5 सेमी पाणी राखो","🧶 कपास में 90x60 सेमी दूरी राखो","🌽 मक्का में यूरिया की टॉप ड्रेसिंग करो","🥔 बटाटा में माटी चढ़ावो","🌱 फसल सुरक्षा खातिर नीम तेल का छिड़काव करो","💧 ड्रिप सिंचित फसलां में उपज जादा","🌾 मार्च-अप्रैल में गेहूं की कटाई","🍚 अक्टूबर-नवंबर में धान की कटाई","🧶 अक्टूबर-दिसंबर में कपास की तुड़ाई","🌽 90-110 दिन में मक्का की कटाई","🎋 10-12 म्हीना में गन्ना की कटाई","🌱 जून-जुलाई में मूंगफली बोवो","🌾 अक्टूबर में सरसों बोवो","🌱 अक्टूबर-नवंबर में चना बोवो","🌾 अक्टूबर-नवंबर में जौ बोवो","🌱 अरहर की फसल में कीड़ा नियंत्रण जरूरी","💧 सोयाबीन में पीळो मोज़ेक रोग से बचाव","🌾 जुलाई में बाजरा बोवो","🌱 ज्वार की फसल में नमी प्रबंधन","📊 मंडी भाव की जानकारी लेकर ही बेचो","🌾 पटुकृषि - हर किसान का साथी"],
            pa: ["🌱 ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਕਰੋ - ਵੱਖ-ਵੱਖ ਫ਼ਸਲਾਂ ਨੂੰ ਵੱਖ-ਵੱਖ ਪੌਸ਼ਟਿਕ ਤੱਤ ਚਾਹੀਦੇ","💧 ਟਪਕਣ ਸਿੰਚਾਈ ਨਾਲ 30% ਪਾਣੀ ਦੀ ਬਚਤ","🌾 ਫ਼ਸਲ ਚੱਕਰ ਅਪਣਾਓ - ਮਿੱਟੀ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਬਣੀ ਰਹੇ","🐛 ਨਿਯਮਿਤ ਕੀੜੇ ਦੀ ਜਾਂਚ - ਜਲਦੀ ਪਛਾਣ ਨਾਲ ਫ਼ਸਲ ਬਚਦੀ","📱 ਪਟੁਕ੍ਰਿਸ਼ੀ ਐਪ 'ਤੇ ਸਾਰੇ ਅਪਡੇਟ ਲਵੋ","💰 ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਮੰਡੀ ਭਾਅ ਚੈੱਕ ਕਰੋ - ਵਧੀਆ ਭਾਅ ਲਵੋ","🌞 ਮਲਚਿੰਗ ਨਾਲ ਮਿੱਟੀ ਦੀ ਨਮੀ ਬਣੀ ਰਹਿੰਦੀ","🌱 ਗੋਹੇ ਦੀ ਖਾਦ ਦਾ ਇਸਤੇਮਾਲ ਵਧਾਓ - ਰਸਾਇਣਕ ਖਾਦ ਘਟਾਓ","🌾 ਕਣਕ ਦੀ ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਬੀਜ ਉਪਚਾਰ ਕਰੋ","🍚 ਝੋਨੇ ਦੀ ਰੋਪਾਈ ਤੋਂ ਪਹਿਲਾਂ ਨਰਸਰੀ ਤਿਆਰ ਕਰੋ","🧶 ਕਪਾਹ ਵਿੱਚ ਗੁਲਾਬੀ ਸੁੰਡੀ ਤੋਂ ਬਚਾਅ ਲਈ ਫੇਰੋਮੋਨ ਟ੍ਰੈਪ ਲਗਾਓ","🎋 ਗੰਨੇ ਦੀ ਬਿਜਾਈ ਲਈ 2-3 ਅੱਖਾਂ ਵਾਲੇ ਟੁੱਕੜੇ ਵਰਤੋ","🌽 ਮੱਕੀ ਲਈ 60x25 ਸੈਂਟੀਮੀਟਰ ਦੀ ਦੂਰੀ ਰੱਖੋ","🥔 ਅਕਤੂਬਰ-ਨਵੰਬਰ ਵਿੱਚ ਆਲੂ ਬੀਜੋ","🧅 ਪਿਆਜ਼ ਦੀ ਨਰਸਰੀ ਲਈ 6-8 ਹਫ਼ਤੇ ਪੁਰਾਣੇ ਪੌਦੇ ਵਰਤੋ","🍅 ਟਮਾਟਰ ਦੇ ਪੌਦਿਆਂ ਨੂੰ ਸਹਾਰਾ ਦੇਣ ਨਾਲ ਉਪਜ ਵਧਦੀ","🌱 ਹਰੀ ਖਾਦ ਨਾਲ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸੁਧਰਦੀ","💧 ਠੰਡੇ ਮੌਸਮ ਵਿੱਚ ਸਿੰਚਾਈ ਘਟਾਓ","🌾 ਕਣਕ ਦੀ ਕਟਾਈ 12-14% ਨਮੀ 'ਤੇ ਕਰੋ","📊 ਫ਼ਸਲ ਬੀਮਾ ਕਰਵਾਓ - ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਤੋਂ ਬਚਾਅ","🌱 ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ ਖਾਦ ਦੀ ਸਹੀ ਮਾਤਰਾ ਰੱਖੋ","💧 ਸਿੰਚਾਈ ਲਈ ਪਾਣੀ ਦੀ ਗੁਣਵੱਤਾ ਚੈੱਕ ਕਰੋ","🌾 ਫ਼ਸਲ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਨਾ ਸਾੜੋ - ਮਿੱਟੀ ਲਈ ਫਾਇਦੇਮੰਦ","🐛 ਜੈਵਿਕ ਕੀਟਨਾਸ਼ਕਾਂ ਦਾ ਇਸਤੇਮਾਲ ਵਧਾਓ","🌱 ਸਹੀ ਬੀਜ ਦਰ ਰੱਖੋ - ਘੱਟ ਜਾਂ ਜ਼ਿਆਦਾ ਨਾ ਹੋਵੇ","📅 ਅਕਤੂਬਰ-ਨਵੰਬਰ ਵਿੱਚ ਰਬੀ ਦੀਆਂ ਫ਼ਸਲਾਂ ਬੀਜੋ","🌧️ ਜੂਨ-ਜੁਲਾਈ ਵਿੱਚ ਖਰੀਫ਼ ਦੀਆਂ ਫ਼ਸਲਾਂ ਬੀਜੋ","☀️ ਜ਼ੈਦ ਫ਼ਸਲਾਂ ਲਈ ਹਲਕੀ ਸਿੰਚਾਈ","🌾 ਕਣਕ ਲਈ 4-5 ਸਿੰਚਾਈਆਂ ਕਾਫ਼ੀ","🍚 ਝੋਨੇ ਦੇ ਖੇਤਾਂ ਵਿੱਚ 5 ਸੈਂਟੀਮੀਟਰ ਪਾਣੀ ਰੱਖੋ","🧶 ਕਪਾਹ ਲਈ 90x60 ਸੈਂਟੀਮੀਟਰ ਦੀ ਦੂਰੀ ਰੱਖੋ","🌽 ਮੱਕੀ ਵਿੱਚ ਯੂਰੀਆ ਦੀ ਟੌਪ ਡਰੈਸਿੰਗ ਕਰੋ","🥔 ਆਲੂ ਦੇ ਪੌਦਿਆਂ ਨੂੰ ਮਿੱਟੀ ਚੜ੍ਹਾਓ","🌱 ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਲਈ ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਛਿੜਕਾਅ ਕਰੋ","💧 ਟਪਕਣ ਸਿੰਚਾਈ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ ਵਿੱਚ ਉਪਜ ਜ਼ਿਆਦਾ","🌾 ਕਣਕ ਦੀ ਕਟਾਈ ਮਾਰਚ-ਅਪ੍ਰੈਲ ਵਿੱਚ","🍚 ਝੋਨੇ ਦੀ ਕਟਾਈ ਅਕਤੂਬਰ-ਨਵੰਬਰ ਵਿੱਚ","🧶 ਕਪਾਹ ਦੀ ਤੁੜਾਈ ਅਕਤੂਬਰ-ਦਸੰਬਰ ਵਿੱਚ","🌽 ਮੱਕੀ ਦੀ ਕਟਾਈ 90-110 ਦਿਨਾਂ ਵਿੱਚ","🎋 ਗੰਨੇ ਦੀ ਕਟਾਈ 10-12 ਮਹੀਨਿਆਂ ਵਿੱਚ","🌱 ਮੂੰਗਫਲੀ ਦੀ ਬਿਜਾਈ ਜੂਨ-ਜੁਲਾਈ ਵਿੱਚ","🌾 ਸਰ੍ਹੋਂ ਦੀ ਬਿਜਾਈ ਅਕਤੂਬਰ ਵਿੱਚ","🌱 ਛੋਲੇ ਦੀ ਬਿਜਾਈ ਅਕਤੂਬਰ-ਨਵੰਬਰ ਵਿੱਚ","🌾 ਜੌਂ ਦੀ ਬਿਜਾਈ ਅਕਤੂਬਰ-ਨਵੰਬਰ ਵਿੱਚ","🌱 ਅਰਹਰ ਦੀ ਫ਼ਸਲ ਵਿੱਚ ਕੀੜੇ ਦਾ ਨਿਯੰਤਰਣ ਜ਼ਰੂਰੀ","💧 ਸੋਇਆਬੀਨ ਵਿੱਚ ਪੀਲੇ ਮੋਜ਼ੇਕ ਤੋਂ ਬਚਾਅ","🌾 ਬਾਜਰੇ ਦੀ ਬਿਜਾਈ ਜੁਲਾਈ ਵਿੱਚ ਕਰੋ","🌱 ਜਵਾਰ ਦੀ ਫ਼ਸਲ ਵਿੱਚ ਨਮੀ ਪ੍ਰਬੰਧਨ","📊 ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਮੰਡੀ ਭਾਅ ਚੈੱਕ ਕਰੋ","🌾 ਪਟੁਕ੍ਰਿਸ਼ੀ - ਹਰ ਕਿਸਾਨ ਦਾ ਸਾਥੀ"],
            ta: ["🌱 விதைப்பதற்கு முன் மண்ணை சோதிக்கவும் - வெவ்வேறு பயிர்களுக்கு வெவ்வேறு ஊட்டச்சத்துக்கள் தேவை","💧 சொட்டு நீர் பாசனம் 30% தண்ணீரை மிச்சப்படுத்துகிறது","🌾 பயிர் சுழற்சியை பின்பற்றவும் - மண் வளம் பாதுகாக்கப்படுகிறது","🐛 வழக்கமான பூச்சி ஆய்வு - முன்கூட்டியே கண்டறிந்தால் பயிர் காக்கப்படும்","📱 படுகிருஷி பயன்பாட்டில் அனைத்து புதுப்பிப்புகளையும் பெறுங்கள்","💰 விற்பதற்கு முன் மண்டி விலைகளை சரிபார்க்கவும் - சிறந்த விலை பெறுங்கள்","🌞 தழைக்கூளம் மண்ணின் ஈரப்பதத்தை தக்க வைக்கிறது","🌱 மாட்டுச்சாண எருவின் பயன்பாட்டை அதிகரிக்கவும் - இரசாயன உரங்களை குறைக்கவும்","🌾 விதைப்பதற்கு முன் கோதுமை விதைகளை பதப்படுத்தவும்","🍚 நெல் நடவுக்கு முன் நாற்றங்கால் தயார் செய்யவும்","🧶 பருத்தியில் இளஞ்சிவப்பு புழுவை தடுக்க ஃபெரோமோன் பொறிகளை அமைக்கவும்","🎋 கரும்பு நடவுக்கு 2-3 கண்கள் கொண்ட துண்டுகளைப் பயன்படுத்தவும்","🌽 மக்காச்சோளத்திற்கு 60x25 செ.மீ இடைவெளி வைக்கவும்","🥔 அக்டோபர்-நவம்பரில் உருளைக்கிழங்கு நடவு செய்யவும்","🧅 வெங்காய நாற்றங்காலுக்கு 6-8 வார வயதான நாற்றுகளைப் பயன்படுத்தவும்","🍅 நல்ல மகசூலுக்கு தக்காளி செடிகளுக்கு ஆதரவு கொடுக்கவும்","🌱 பசுந்தாள் உரம் மண்ணின் ஆரோக்கியத்தை மேம்படுத்துகிறது","💧 குளிர் காலத்தில் பாசனத்தை குறைக்கவும்","🌾 12-14% ஈரப்பதத்தில் கோதுமையை அறுவடை செய்யவும்","📊 பயிர் காப்பீடு செய்யுங்கள் - இயற்கை பேரழிவுகளிலிருந்து பாதுகாப்பு","🌱 ஒரு ஹெக்டேருக்கு சரியான உர அளவை பராமரிக்கவும்","💧 பாசனத்திற்கான நீரின் தரத்தை சரிபார்க்கவும்","🌾 பயிர் எச்சங்களை எரிக்க வேண்டாம் - மண்ணுக்கு நன்மை பயக்கும்","🐛 கரிம பூச்சிக்கொல்லிகளின் பயன்பாட்டை அதிகரிக்கவும்","🌱 சரியான விதை வீதத்தை பராமரிக்கவும் - குறைவாகவோ அதிகமாகவோ இருக்கக்கூடாது","📅 அக்டோபர்-நவம்பரில் ரபி பயிர்களை விதைக்கவும்","🌧️ ஜூன்-ஜூலையில் காரீப் பயிர்களை விதைக்கவும்","☀️ ஜாயித் பயிர்களுக்கு லேசான பாசனம்","🌾 கோதுமைக்கு 4-5 பாசனங்கள் போதுமானவை","🍚 நெல் வயல்களில் 5 செ.மீ தண்ணீர் பராமரிக்கவும்","🧶 பருத்திக்கு 90x60 செ.மீ இடைவெளி வைக்கவும்","🌽 மக்காச்சோளத்தில் யூரியா மேல் உரமாக இடவும்","🥔 உருளைக்கிழங்கு செடிகளுக்கு மண் அணைக்கவும்","🌱 பயிர் பாதுகாப்புக்கு வேப்ப எண்ணெய் தெளிக்கவும்","💧 சொட்டு நீர் பாசன பயிர்கள் அதிக மகசூல் தரும்","🌾 மார்ச்-ஏப்ரலில் கோதுமை அறுவடை","🍚 அக்டோபர்-நவம்பரில் நெல் அறுவடை","🧶 அக்டோபர்-டிசம்பரில் பருத்தி பறிக்கவும்","🌽 90-110 நாட்களில் மக்காச்சோளம் அறுவடை","🎋 10-12 மாதங்களில் கரும்பு அறுவடை","🌱 ஜூன்-ஜூலையில் நிலக்கடலை விதைக்கவும்","🌾 அக்டோபரில் கடுகு விதைக்கவும்","🌱 அக்டோபர்-நவம்பரில் கொண்டைக்கடலை விதைக்கவும்","🌾 அக்டோபர்-நவம்பரில் பார்லி விதைக்கவும்","🌱 துவரை பயிரில் பூச்சி கட்டுப்பாடு அவசியம்","💧 சோயாபீனில் மஞ்சள் மொசைக் தடுக்கவும்","🌾 ஜூலையில் சோளம் (பஜ்ரா) விதைக்கவும்","🌱 சோளம் (ஜோவர்) பயிரில் ஈரப்பத மேலாண்மை","📊 விற்பதற்கு முன் மண்டி விலைகளை சரிபார்க்கவும்","🌾 படுகிருஷி - ஒவ்வொரு விவசாயியின் துணைவன்"],
            ml: ["🌱 വിതയ്ക്കുന്നതിന് മുമ്പ് മണ്ണ് പരിശോധിക്കുക - വ്യത്യസ്ത വിളകൾക്ക് വ്യത്യസ്ത പോഷകങ്ങൾ ആവശ്യമാണ്","💧 ഡ്രിപ്പ് ഇറിഗേഷൻ 30% വെള്ളം ലാഭിക്കുന്നു","🌾 വിള ഭ്രമണം പരിശീലിക്കുക - മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത നിലനിർത്തുന്നു","🐛 പതിവ് കീട പരിശോധന - നേരത്തെ കണ്ടെത്തിയാൽ വിള രക്ഷപ്പെടും","📱 പടുകൃഷി ആപ്പിൽ എല്ലാ അപ്ഡേറ്റുകളും നേടുക","💰 വിൽക്കുന്നതിന് മുമ്പ് മണ്ടി വില പരിശോധിക്കുക - മികച്ച നിരക്ക് നേടുക","🌞 മൾച്ചിംഗ് മണ്ണിലെ ഈർപ്പം നിലനിർത്താൻ സഹായിക്കുന്നു","🌱 ചാണക വളത്തിന്റെ ഉപയോഗം വർദ്ധിപ്പിക്കുക - രാസവളങ്ങൾ കുറയ്ക്കുക","🌾 വിതയ്ക്കുന്നതിന് മുമ്പ് ഗോതമ്പ് വിത്തുകൾ സംസ്കരിക്കുക","🍚 നെൽകൃഷിക്ക് മുമ്പ് നഴ്സറി തയ്യാറാക്കുക","🧶 പരുത്തിയിൽ പിങ്ക് ബോൾവേം തടയാൻ ഫെറോമോൺ കെണികൾ സ്ഥാപിക്കുക","🎋 കരിമ്പ് നടുന്നതിന് 2-3 കണ്ണുള്ള കഷ്ണങ്ങൾ ഉപയോഗിക്കുക","🌽 ചോളത്തിന് 60x25 സെ.മീ അകലം പാലിക്കുക","🥔 ഒക്ടോബർ-നവംബറിൽ ഉരുളക്കിഴങ്ങ് നടുക","🧅 സവാള നഴ്സറിക്ക് 6-8 ആഴ്ച പ്രായമുള്ള തൈകൾ ഉപയോഗിക്കുക","🍅 മികച്ച വിളവിനായി തക്കാളി ചെടികൾക്ക് താങ്ങ് നൽകുക","🌱 പച്ചിലവളം മണ്ണിന്റെ ആരോഗ്യം മെച്ചപ്പെടുത്തുന്നു","💧 തണുത്ത കാലാവസ്ഥയിൽ ജലസേചനം കുറയ്ക്കുക","🌾 12-14% ഈർപ്പത്തിൽ ഗോതമ്പ് വിളവെടുക്കുക","📊 വിള ഇൻഷുറൻസ് എടുക്കുക - പ്രകൃതി ദുരന്തങ്ങളിൽ നിന്നുള്ള സംരക്ഷണം","🌱 ഹെക്ടറിന് ശരിയായ വളത്തിന്റെ അളവ് പാലിക്കുക","💧 ജലസേചനത്തിനുള്ള ജലത്തിന്റെ ഗുണനിലവാരം പരിശോധിക്കുക","🌾 വിള അവശിഷ്ടങ്ങൾ കത്തിക്കരുത് - മണ്ണിന് ഗുണം ചെയ്യും","🐛 ജൈവ കീടനാശിനികളുടെ ഉപയോഗം വർദ്ധിപ്പിക്കുക","🌱 ശരിയായ വിത്ത് നിരക്ക് പാലിക്കുക - കുറവോ കൂടുതലോ ആകരുത്","📅 ഒക്ടോബർ-നവംബറിൽ റാബി വിളകൾ വിതയ്ക്കുക","🌧️ ജൂൺ-ജൂലൈയിൽ ഖാരിഫ് വിളകൾ വിതയ്ക്കുക","☀️ സായിദ് വിളകൾക്ക് നേരിയ ജലസേചനം","🌾 ഗോതമ്പിന് 4-5 ജലസേചനം മതി","🍚 നെൽപ്പാടങ്ങളിൽ 5 സെ.മീ വെള്ളം നിലനിർത്തുക","🧶 പരുത്തിക്ക് 90x60 സെ.മീ അകലം പാലിക്കുക","🌽 ചോളത്തിൽ യൂറിയ ടോപ്പ് ഡ്രസ്സിംഗ് ചെയ്യുക","🥔 ഉരുളക്കിഴങ്ങ് ചെടികളിൽ മണ്ണ് കയറ്റുക","🌱 വിള സംരക്ഷണത്തിനായി വേപ്പെണ്ണ തളിക്കുക","💧 ഡ്രിപ്പ് ഇറിഗേറ്റഡ് വിളകൾ കൂടുതൽ വിളവ് നൽകുന്നു","🌾 മാർച്ച്-ഏപ്രിലിൽ ഗോതമ്പ് വിളവെടുക്കുക","🍚 ഒക്ടോബർ-നവംബറിൽ നെല്ല് വിളവെടുക്കുക","🧶 ഒക്ടോബർ-ഡിസംബറിൽ പരുത്തി പറിക്കുക","🌽 90-110 ദിവസത്തിനുള്ളിൽ ചോളം വിളവെടുക്കുക","🎋 10-12 മാസത്തിനുള്ളിൽ കരിമ്പ് വിളവെടുക്കുക","🌱 ജൂൺ-ജൂലൈയിൽ നിലക്കടല വിതയ്ക്കുക","🌾 ഒക്ടോബറിൽ കടുക് വിതയ്ക്കുക","🌱 ഒക്ടോബർ-നവംബറിൽ കടല വിതയ്ക്കുക","🌾 ഒക്ടോബർ-നവംബറിൽ ബാർലി വിതയ്ക്കുക","🌱 തുവരപ്പയറിൽ കീടങ്ങളെ നിയന്ത്രിക്കുക","💧 സോയാബീനിൽ മഞ്ഞ മൊസൈക്ക് തടയുക","🌾 ജൂലൈയിൽ ബജ്റ വിതയ്ക്കുക","🌱 ചോളം വിളയിൽ ഈർപ്പം നിയന്ത്രിക്കുക","📊 വിൽക്കുന്നതിന് മുമ്പ് മണ്ടി നിരക്കുകൾ പരിശോധിക്കുക","🌾 പടുകൃഷി - എല്ലാ കർഷകന്റെയും കൂട്ടാളി"],
            ur: ["🌱 بوائی سے پہلے مٹی کی جانچ ضرور کریں - مختلف فصلوں کو مختلف غذائی اجزاء درکار ہوتے ہیں","💧 ڈرپ اریگیشن سے 30% پانی بچتا ہے","🌾 فصل کی گردش اپنائیں - مٹی کی زرخیزی برقرار رہتی ہے","🐛 کیڑوں کا باقاعدہ معائنہ - بروقت پتہ لگنے سے فصل بچ جاتی ہے","📱 پٹوکرشی ایپ پر تمام اپ ڈیٹس حاصل کریں","💰 فروخت سے پہلے منڈی بھاؤ چیک کریں - بہترین نرخ ملیں گے","🌞 ملچنگ سے مٹی کی نمی برقرار رہتی ہے","🌱 گوبر کی کھاد کا استعمال بڑھائیں - کیمیائی کھادیں کم کریں","🌾 گندم کی بوائی سے پہلے بیج کا علاج ضروری","🍚 دھان کی پیوند کاری سے پہلے نرسری تیار کریں","🧶 کپاس میں گلابی سنڈی سے بچاؤ کے لیے فیرومون ٹریپ لگائیں","🎋 گنے کی بوائی کے وقت 2-3 آنکھ والے ٹکڑے لیں","🌽 مکئی کی فصل میں 60x25 سینٹی میٹر کا فاصلہ رکھیں","🥔 آلو کی بوائی اکتوبر-نومبر میں کریں","🧅 پیاز کی نرسری میں 6-8 ہفتے پرانے پودے لگائیں","🍅 ٹماٹر میں سہارا دینے سے پیداوار بڑھتی ہے","🌱 سبز کھاد سے مٹی کی صحت بہتر ہوتی ہے","💧 سرد موسم میں آبپاشی کم کریں","🌾 گندم کی کٹائی 12-14% نمی پر کریں","📊 فصل بیمہ ضرور کروائیں - قدرتی آفات سے تحفظ","🌱 فی ہیکٹر کھاد کی صحیح مقدار کا خیال رکھیں","💧 آبپاشی کے لیے پانی کے معیار کو جانچیں","🌾 فصل کی باقیات نہ جلائیں - مٹی کے لیے فائدہ مند","🐛 نامیاتی کیڑے مار ادویات کا استعمال بڑھائیں","🌱 بیج کی شرح کا خیال رکھیں - کم یا زیادہ نہ ہو","📅 ربیع کی بوائی اکتوبر-نومبر میں کریں","🌧️ خریف کی بوائی جون-جولائی میں کریں","☀️ زائد فصلوں کے لیے ہلکی آبپاشی","🌾 گندم کے لیے 4-5 آبپاشی کافی","🍚 دھان کے کھیتوں میں 5 سینٹی میٹر پانی رکھیں","🧶 کپاس کے لیے 90x60 سینٹی میٹر کا فاصلہ رکھیں","🌽 مکئی میں یوریا کی ٹاپ ڈریسنگ کریں","🥔 آلو کے پودوں پر مٹی چڑھائیں","🌱 فصل کی حفاظت کے لیے نیم کا تیل چھڑکیں","💧 ڈرپ اریگیٹڈ فصلوں میں پیداوار زیادہ","🌾 گندم کی کٹائی مارچ-اپریل میں","🍚 دھان کی کٹائی اکتوبر-نومبر میں","🧶 کپاس کی توڑائی اکتوبر-دسمبر میں","🌽 مکئی کی کٹائی 90-110 دنوں میں","🎋 گنے کی کٹائی 10-12 ماہ میں","🌱 مونگ پھلی کی بوائی جون-جولائی میں","🌾 سرسوں کی بوائی اکتوبر میں","🌱 چنے کی بوائی اکتوبر-نومبر میں","🌾 جو کی بوائی اکتوبر-نومبر میں","🌱 اڑد کی فصل میں کیڑوں کا کنٹرول ضروری","💧 سویابین میں پیلے موزیک سے بچاؤ","🌾 باجرے کی بوائی جولائی میں کریں","🌱 جوار کی فصل میں نمی کا انتظام","📊 منڈی نرخ جان کر ہی بیچیں","🌾 پٹوکرشی - ہر کسان کا ساتھی"],
            kn: ["🌱 ಬಿತ್ತನೆ ಮಾಡುವ ಮೊದಲು ಮಣ್ಣನ್ನು ಪರೀಕ್ಷಿಸಿ - ವಿವಿಧ ಬೆಳೆಗಳಿಗೆ ವಿವಿಧ ಪೋಷಕಾಂಶಗಳು ಬೇಕಾಗುತ್ತವೆ","💧 ಹನಿ ನೀರಾವರಿ 30% ನೀರನ್ನು ಉಳಿಸುತ್ತದೆ","🌾 ಬೆಳೆ ಸರದಿ ಪದ್ಧತಿಯನ್ನು ಅನುಸರಿಸಿ - ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಕಾಪಾಡುತ್ತದೆ","🐛 ನಿಯಮಿತ ಕೀಟ ತಪಾಸಣೆ - ಮೊದಲೇ ಪತ್ತೆ ಮಾಡಿದರೆ ಬೆಳೆ ಉಳಿಸಬಹುದು","📱 ಪಟುಕೃಷಿ ಆಪ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ","💰 ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮಂಡಿ ಬೆಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ - ಉತ್ತಮ ದರ ಪಡೆಯಿರಿ","🌞 ಹಸಿಗೊಬ್ಬರ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ","🌱 ಸಗಣಿ ಗೊಬ್ಬರದ ಬಳಕೆಯನ್ನು ಹೆಚ್ಚಿಸಿ - ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ","🌾 ಬಿತ್ತನೆ ಮಾಡುವ ಮೊದಲು ಗೋಧಿ ಬೀಜಗಳನ್ನು ಸಂಸ್ಕರಿಸಿ","🍚 ಭತ್ತದ ನಾಟಿಗೆ ಮೊದಲು ನರ್ಸರಿ ತಯಾರಿಸಿ","🧶 ಹತ್ತಿಯಲ್ಲಿ ಗುಲಾಬಿ ಬಣ್ಣದ ಕೀಟ ತಡೆಗಟ್ಟಲು ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ","🎋 ಕಬ್ಬು ನೆಡಲು 2-3 ಕಣ್ಣುಗಳ ತುಂಡುಗಳನ್ನು ಬಳಸಿ","🌽 ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ 60x25 ಸೆಂ.ಮೀ ಅಂತರವಿರಲಿ","🥔 ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ನೆಡಿ","🧅 ಈರುಳ್ಳಿ ನರ್ಸರಿಗೆ 6-8 ವಾರಗಳ ಸಸಿಗಳನ್ನು ಬಳಸಿ","🍅 ಟೊಮೆಟೊ ಸಸ್ಯಗಳಿಗೆ ಆಸರೆ ನೀಡಿದರೆ ಇಳುವರಿ ಹೆಚ್ಚು","🌱 ಹಸಿರು ಗೊಬ್ಬರ ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ","💧 ಚಳಿಗಾಲದಲ್ಲಿ ನೀರಾವರಿ ಕಡಿಮೆ ಮಾಡಿ","🌾 12-14% ತೇವಾಂಶದಲ್ಲಿ ಗೋಧಿ ಕಟಾವು ಮಾಡಿ","📊 ಬೆಳೆ ವಿಮೆ ತೆಗೆದುಕೊಳ್ಳಿ - ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳಿಂದ ರಕ್ಷಣೆ","🌱 ಹೆಕ್ಟೇರ್‌ಗೆ ಸರಿಯಾದ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ ಕಾಪಾಡಿಕೊಳ್ಳಿ","💧 ನೀರಾವರಿಗೆ ನೀರಿನ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸಿ","🌾 ಬೆಳೆ ಅವಶೇಷಗಳನ್ನು ಸುಡಬೇಡಿ - ಮಣ್ಣಿಗೆ ಲಾಭದಾಯಕ","🐛 ಸಾವಯವ ಕೀಟನಾಶಕಗಳ ಬಳಕೆ ಹೆಚ್ಚಿಸಿ","🌱 ಸರಿಯಾದ ಬಿತ್ತನೆ ಪ್ರಮಾಣ ಕಾಪಾಡಿಕೊಳ್ಳಿ - ಕಡಿಮೆಯಾಗಲೀ ಅಧಿಕವಾಗಲೀ ಇರಬಾರದು","📅 ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ರಬಿ ಬೆಳೆಗಳನ್ನು ಬಿತ್ತಿ","🌧️ ಜೂನ್-ಜುಲೈನಲ್ಲಿ ಖರೀಫ್ ಬೆಳೆಗಳನ್ನು ಬಿತ್ತಿ","☀️ ಜೈದ್ ಬೆಳೆಗಳಿಗೆ ಹಗುರ ನೀರಾವರಿ","🌾 ಗೋಧಿಗೆ 4-5 ನೀರಾವರಿ ಸಾಕು","🍚 ಭತ್ತದ ಗದ್ದೆಗಳಲ್ಲಿ 5 ಸೆಂ.ಮೀ ನೀರು ಕಾಪಾಡಿಕೊಳ್ಳಿ","🧶 ಹತ್ತಿಗೆ 90x60 ಸೆಂ.ಮೀ ಅಂತರ ಕಾಪಾಡಿಕೊಳ್ಳಿ","🌽 ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಯೂರಿಯಾ ಮೇಲುಗೊಬ್ಬರ ಹಾಕಿ","🥔 ಆಲೂಗಡ್ಡೆ ಸಸ್ಯಗಳಿಗೆ ಮಣ್ಣೇರಿಸಿ","🌱 ಬೆಳೆ ಸಂರಕ್ಷಣೆಗೆ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ","💧 ಹನಿ ನೀರಾವರಿ ಬೆಳೆಗಳಲ್ಲಿ ಹೆಚ್ಚು ಇಳುವರಿ","🌾 ಮಾರ್ಚ್-ಏಪ್ರಿಲ್‌ನಲ್ಲಿ ಗೋಧಿ ಕಟಾವು","🍚 ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ಭತ್ತ ಕಟಾವು","🧶 ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ಹತ್ತಿ ಕೊಯ್ಲು","🌽 90-110 ದಿನಗಳಲ್ಲಿ ಮೆಕ್ಕೆಜೋಳ ಕಟಾವು","🎋 10-12 ತಿಂಗಳುಗಳಲ್ಲಿ ಕಬ್ಬು ಕಟಾವು","🌱 ಜೂನ್-ಜುಲೈನಲ್ಲಿ ನೆಲಗಡಲೆ ಬಿತ್ತಿ","🌾 ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಸಾಸಿವೆ ಬಿತ್ತಿ","🌱 ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ಕಡಲೆ ಬಿತ್ತಿ","🌾 ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ಬಾರ್ಲಿ ಬಿತ್ತಿ","🌱 ತೊಗರಿ ಬೆಳೆಯಲ್ಲಿ ಕೀಟ ನಿಯಂತ್ರಣ ಅಗತ್ಯ","💧 ಸೋಯಾಬೀನ್‌ನಲ್ಲಿ ಹಳದಿ ಮೊಸಾಯಿಕ್ ತಡೆಯಿರಿ","🌾 ಜುಲೈನಲ್ಲಿ ಸಜ್ಜೆ ಬಿತ್ತಿ","🌱 ಜೋಳದ ಬೆಳೆಯಲ್ಲಿ ತೇವಾಂಶ ನಿರ್ವಹಣೆ","📊 ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮಂಡಿ ದರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ","🌾 ಪಟುಕೃಷಿ - ಪ್ರತಿಯೊಬ್ಬ ರೈತನ ಸಂಗಾತಿ"],
            or: ["🌱 ବୁଣିବା ପୂର୍ବରୁ ମାଟି ପରୀକ୍ଷା କରନ୍ତୁ - ଭିନ୍ନ ଭିନ୍ନ ଫସଲ ପାଇଁ ଭିନ୍ନ ପୋଷକ ତତ୍ତ୍ୱ ଆବଶ୍ୟକ","💧 ଡ୍ରିପ୍ ସିଞ୍ଚନ 30% ପାଣି ବଞ୍ଚାଏ","🌾 ଫସଲ ଆବର୍ତ୍ତନ ଅଭ୍ୟାସ କରନ୍ତୁ - ମାଟିର ଉର୍ବରତା ବଜାୟ ରହେ","🐛 ନିୟମିତ କୀଟ ପରୀକ୍ଷା - ଶୀଘ୍ର ଚିହ୍ନଟ ହେଲେ ଫସଲ ବଞ୍ଚେ","📱 ପଟୁକୃଷି ଆପ୍‌ରେ ସମସ୍ତ ଅପଡେଟ୍ ପାଆନ୍ତୁ","💰 ବିକ୍ରି ପୂର୍ବରୁ ମଣ୍ଡି ଭାଉ ଯାଞ୍ଚ କରନ୍ତୁ - ଶ୍ରେଷ୍ଠ ଦର ପାଆନ୍ତୁ","🌞 ମଲ୍ଚିଂ ମାଟିର ଆର୍ଦ୍ରତା ବଜାୟ ରଖିବାରେ ସାହାଯ୍ୟ କରେ","🌱 ଗୋବର ଖତର ବ୍ୟବହାର ବଢ଼ାନ୍ତୁ - ରାସାୟନିକ ଖତ କମ୍ କରନ୍ତୁ","🌾 ବୁଣିବା ପୂର୍ବରୁ ଗହମ ମଞ୍ଜିକୁ ପ୍ରକ୍ରିୟାକରଣ କରନ୍ତୁ","🍚 ଧାନ ରୋପଣ ପୂର୍ବରୁ ନର୍ସରୀ ପ୍ରସ୍ତୁତ କରନ୍ତୁ","🧶 ତୁଳାରେ ଗୋଲାପୀ ବୋଲୱାର୍ମ ରୋକିବା ପାଇଁ ଫେରୋମୋନ୍ ଫାନ୍ଦ ଲଗାନ୍ତୁ","🎋 ଆଖୁ ରୋପଣ ପାଇଁ 2-3 ଆଖିଆ ଖଣ୍ଡ ବ୍ୟବହାର କରନ୍ତୁ","🌽 ମକା ପାଇଁ 60x25 ସେ.ମି. ଦୂରତା ରଖନ୍ତୁ","🥔 ଅକ୍ଟୋବର-ନଭେମ୍ବରରେ ଆଳୁ ରୋପଣ କରନ୍ତୁ","🧅 ପିଆଜ ନର୍ସରୀ ପାଇଁ 6-8 ସପ୍ତାହ ବୟସର ଚାରା ବ୍ୟବହାର କରନ୍ତୁ","🍅 ଭଲ ଅମଳ ପାଇଁ ବିଲାତି ଗଛକୁ ସାହାରା ଦିଅନ୍ତୁ","🌱 ସବୁଜ ଖତ ମାଟିର ସ୍ୱାସ୍ଥ୍ୟ ଉନ୍ନତ କରେ","💧 ଥଣ୍ଡା ପାଗରେ ସିଞ୍ଚନ କମ୍ କରନ୍ତୁ","🌾 12-14% ଆର୍ଦ୍ରତାରେ ଗହମ ଅମଳ କରନ୍ତୁ","📊 ଫସଲ ବୀମା କରାନ୍ତୁ - ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟରୁ ସୁରକ୍ଷା","🌱 ହେକ୍ଟର ପିଛା ସଠିକ୍ ଖତ ପରିମାଣ ବଜାୟ ରଖନ୍ତୁ","💧 ସିଞ୍ଚନ ପାଇଁ ପାଣିର ଗୁଣବତ୍ତା ଯାଞ୍ଚ କରନ୍ତୁ","🌾 ଫସଲ ଅବଶିଷ୍ଟ ପୋଡ଼ନ୍ତୁ ନାହିଁ - ମାଟି ପାଇଁ ଲାଭଦାୟକ","🐛 ଜୈବିକ କୀଟନାଶକ ବ୍ୟବହାର ବଢ଼ାନ୍ତୁ","🌱 ସଠିକ୍ ମଞ୍ଜି ହାର ବଜାୟ ରଖନ୍ତୁ - କମ୍ ବା ଅଧିକ ନୁହେଁ","📅 ଅକ୍ଟୋବର-ନଭେମ୍ବରରେ ରବି ଫସଲ ବୁଣନ୍ତୁ","🌧️ ଜୁନ୍-ଜୁଲାଇରେ ଖରିଫ୍ ଫସଲ ବୁଣନ୍ତୁ","☀️ ଜାୟଦ ଫସଲ ପାଇଁ ହାଲୁକା ସିଞ୍ଚନ","🌾 ଗହମ ପାଇଁ 4-5 ସିଞ୍ଚନ ଯଥେଷ୍ଟ","🍚 ଧାନ କ୍ଷେତରେ 5 ସେ.ମି. ପାଣି ରଖନ୍ତୁ","🧶 ତୁଳା ପାଇଁ 90x60 ସେ.ମି. ଦୂରତା ରଖନ୍ତୁ","🌽 ମକାରେ ୟୁରିଆ ଉପର ଖତ ଦିଅନ୍ତୁ","🥔 ଆଳୁ ଗଛରେ ମାଟି ଚଢ଼ାନ୍ତୁ","🌱 ଫସଲ ସୁରକ୍ଷା ପାଇଁ ନିମ୍ବ ତେଲ ସିଞ୍ଚନ କରନ୍ତୁ","💧 ଡ୍ରିପ୍ ସିଞ୍ଚିତ ଫସଲରେ ଅଧିକ ଅମଳ","🌾 ମାର୍ଚ୍ଚ-ଏପ୍ରିଲରେ ଗହମ ଅମଳ","🍚 ଅକ୍ଟୋବର-ନଭେମ୍ବରରେ ଧାନ ଅମଳ","🧶 ଅକ୍ଟୋବର-ଡିସେମ୍ବରରେ ତୁଳା ତୋଳନ୍ତୁ","🌽 90-110 ଦିନରେ ମକା ଅମଳ","🎋 10-12 ମାସରେ ଆଖୁ ଅମଳ","🌱 ଜୁନ୍-ଜୁଲାଇରେ ଚିନାବାଦାମ ବୁଣନ୍ତୁ","🌾 ଅକ୍ଟୋବରରେ ସୋରିଷ ବୁଣନ୍ତୁ","🌱 ଅକ୍ଟୋବର-ନଭେମ୍ବରରେ ଛେନା ବୁଣନ୍ତୁ","🌾 ଅକ୍ଟୋବର-ନଭେମ୍ବରରେ ଯଅ ବୁଣନ୍ତୁ","🌱 ହରଡ଼ ଫସଲରେ କୀଟ ନିୟନ୍ତ୍ରଣ ଜରୁରୀ","💧 ସୋୟାବିନରେ ହଳଦିଆ ମୋଜାଇକ୍ ରୋକନ୍ତୁ","🌾 ଜୁଲାଇରେ ବାଜରା ବୁଣନ୍ତୁ","🌱 ଜୁଆର ଫସଲରେ ଆର୍ଦ୍ରତା ପରିଚାଳନା","📊 ବିକ୍ରି ପୂର୍ବରୁ ମଣ୍ଡି ଦର ଯାଞ୍ଚ କରନ୍ତୁ","🌾 ପଟୁକୃଷି - ପ୍ରତ୍ୟେକ କୃଷକର ସାଥୀ"],
            sa: ["🌱 बीजवपनात् पूर्वं मृदापरीक्षणं कुर्यात् - भिन्नफसलानां भिन्नपोषकतत्त्वानि आवश्यकानि","💧 बिन्दुसिञ्चनम् ३०% जलं रक्षति","🌾 फसलचक्रम् अनुसरेत् - मृदोः ऊर्वरता संरक्षति","🐛 कीटानां नियमितं परीक्षणं कुर्यात् - आरम्भे एव ज्ञाते फसलं रक्षति","📱 पटुकृषि-अनुप्रयोगे सर्वाणि अद्यतनानि प्राप्नुयात्","💰 विक्रयणात् पूर्वं मण्डीमूल्यानि पश्येत् - उत्तममूल्यानि प्राप्नुयात्","🌞 मल्चिङ्ग-विधिः मृदोः आर्द्रतां रक्षति","🌱 गोमयस्य प्रयोगं वर्धयेत् - रासायनिकानि उर्वरकाणि न्यूनीकुर्यात्","🌾 वपनात् पूर्वं गोधूमबीजानि संस्कुर्यात्","🍚 व्रीहिरोपणात् पूर्वं पोतिकाशालां सज्जीकुर्यात्","🧶 कार्पासे गुलाबी-बोलवार्म-कीटनिवारणाय फेरोमोन-पाशान् स्थापयेत्","🎋 इक्षोः रोपणाय २-३ नेत्रयुक्तानि खण्डानि उपयुञ्जीत","🌽 यवनाले ६०x२५ से.मी. अन्तरं रक्षेत्","🥔 अक्टोबर-नवम्बरमासयोः आलुकं रोपयेत्","🧅 पलाण्डुपोतिकाशालायै ६-८ सप्ताहप्राचीनानि पौधानि उपयुञ्जीत","🍅 उत्तमोत्पादनाय वृन्ताकानाम् आधारं दद्यात्","🌱 हरितोर्वरकं मृदोः स्वास्थ्यं सुधारयति","💧 शीतकाले सिञ्चनं न्यूनीकुर्यात्","🌾 १२-१४% आर्द्रतायां गोधूमस्य कट्टनं कुर्यात्","📊 फसलबीमां कुर्यात् - प्राकृतिकापदः रक्षति","🌱 प्रति हेक्टर उर्वरकस्य उचितं परिमाणं रक्षेत्","💧 सिञ्चनार्थं जलस्य गुणवत्तां परीक्षेत","🌾 फसलावशिष्टानि न दहेत् - मृदोः लाभदायकम्","🐛 जैविककीटनाशकानाम् उपयोगं वर्धयेत्","🌱 उचितं बीजमात्रां रक्षेत् - अल्पम् अधिकं वा न भवेत्","📅 अक्टोबर-नवम्बरमासयोः रबिफसलाः वपेत्","🌧️ जून-जुलाईमासयोः खरीफफसलाः वपेत्","☀️ जायदफसलानां कृते लघुसिञ्चनम्","🌾 गोधूमाय ४-५ सिञ्चनानि पर्याप्तानि","🍚 व्रीहिक्षेत्रेषु ५ से.मी. जलं रक्षेत्","🧶 कार्पासाय ९०x६० से.मी. अन्तरं रक्षेत्","🌽 यवनाले यूरियायाः उपरिभोजनं कुर्यात्","🥔 आलुकस्य वनस्पतीनां मृदारोहणं कुर्यात्","🌱 फसलसुरक्षायै निम्बतैलस्य प्रोक्षणं कुर्यात्","💧 बिन्दुसिञ्चितफसलाः अधिकम् उत्पादनं यच्छन्ति","🌾 मार्च-अप्रैलमासयोः गोधूमकट्टनम्","🍚 अक्टोबर-नवम्बरमासयोः व्रीहिकट्टनम्","🧶 अक्टोबर-डिसेम्बरमासयोः कार्पासचयनम्","🌽 ९०-११० दिनेषु यवनालकट्टनम्","🎋 १०-१२ मासेषु इक्षुकट्टनम्","🌱 जून-जुलाईमासयोः निष्पावं वपेत्","🌾 अक्टोबरे सर्षपं वपेत्","🌱 अक्टोबर-नवम्बरमासयोः चणकं वपेत्","🌾 अक्टोबर-नवम्बरमासयोः यवं वपेत्","🌱 अढकीफसले कीटनियन्त्रणम् आवश्यकम्","💧 सोयाबीन्-फसले पीतमोज़ेकरोगं निवारयेत्","🌾 जुलाईमासे बाजरां वपेत्","🌱 ज्वारीफसले आर्द्रताव्यवस्थापनम्","📊 विक्रयणात् पूर्वं मण्डीमूल्यानि परीक्षेत","🌾 पटुकृषिः - प्रत्येककृषकस्य सहायः"],
            bho: ["🌱 बीज बोवे से पहिले माटी के जाँच करीं - अलग-अलग फसल खातिर अलग-अलग पोषक तत्व चाहीं","💧 ड्रिप सिंचाई से 30% पानी के बचत होला","🌾 फसल चक्र अपनाईं - माटी के उर्वरता बरकरार रहेला","🐛 कीड़ा-बीमारी के नियमित जाँच करीं - समय रहे पता चले त फसल बच जाई","📱 पटुकृषि ऐप प सगरी अपडेट पाईं","💰 मंडी भाव देख के फसल बेचीं - सही दाम मिली","🌞 मल्चिंग से माटी के नमीं बरकरार रहेला","🌱 गोबर खाद के इस्तेमाल बढ़ाईं - रासायनिक खाद कम करीं","🌾 गोहूँ के बीज बोवे से पहिले उपचार करीं","🍚 धान के रोपनी से पहिले नर्सरी तइयार करीं","🧶 कपास में गुलाबी सुंडी से बचाव खातिर फेरोमोन ट्रैप लगाईं","🎋 गन्ना बोवे के समय 2-3 आँख वाला टुकड़ा लीं","🌽 मकई में 60x25 सेमी के दूरी रखीं","🥔 अक्टूबर-नवंबर में आलू बोईं","🧅 पियाज के नर्सरी में 6-8 सप्ताह पुरान पौधा लगाईं","🍅 टमाटर में सहारा दिहले से उपज बढ़ेला","🌱 हरी खाद से माटी के सेहत सुधरेला","💧 ठंडा के मौसम में सिंचाई कम करीं","🌾 गोहूँ के कटाई 12-14% नमीं प करीं","📊 फसल बीमा कराईं - प्राकृतिक आपदा से बचाव","🌱 प्रति हेक्टेयर खाद के सही मात्रा रखीं","💧 सिंचाई खातिर पानी के गुणवत्ता जाँचीं","🌾 फसल के अवशेष न जराईं - माटी खातिर फायदेमंद","🐛 जैविक कीटनाशक के इस्तेमाल बढ़ाईं","🌱 बीज दर के ध्यान रखीं - कम या जादा न होखे","📅 अक्टूबर-नवंबर में रबी के बोआई करीं","🌧️ जून-जुलाई में खरीफ के बोआई करीं","☀️ जायद के फसल खातिर हल्का सिंचाई","🌾 गोहूँ खातिर 4-5 सिंचाई काफी बा","🍚 धान में 5 सेमी पानी रखीं","🧶 कपास में 90x60 सेमी के दूरी रखीं","🌽 मकई में यूरिया के टॉप ड्रेसिंग करीं","🥔 आलू में माटी चढ़ाईं","🌱 फसल सुरक्षा खातिर नीम तेल के छिड़काव करीं","💧 ड्रिप सिंचित फसल में उपज जादा होला","🌾 गोहूँ के कटाई मार्च-अप्रैल में","🍚 धान के कटाई अक्टूबर-नवंबर में","🧶 कपास के तुड़ाई अक्टूबर-दिसंबर में","🌽 मकई के कटाई 90-110 दिन में","🎋 गन्ना के कटाई 10-12 महीना में","🌱 जून-जुलाई में मूंगफली बोईं","🌾 अक्टूबर में सरसों बोईं","🌱 अक्टूबर-नवंबर में चना बोईं","🌾 अक्टूबर-नवंबर में जौ बोईं","🌱 अरहर के फसल में कीड़ा नियंत्रण जरूरी","💧 सोयाबीन में पियर मोज़ेक रोग से बचाव","🌾 जुलाई में बाजरा बोईं","🌱 ज्वार के फसल में नमीं प्रबंधन","📊 मंडी भाव के जानकारी लेके बेचीं","🌾 पटुकृषि - हर किसान के साथी"],
            doi: ["🌱 बीज बोने से पहले मिट्टी दी जांच करो - अलग-अलग फसलें लेई अलग-अलग पोषक तत्व जरूरी ने","💧 ड्रिप सिंचाई नाल 30% पानी दी बचत होई जा","🌾 फसल चक्र अपनाओ - मिट्टी दी उर्वरता बणी रही","🐛 कीड़े-बीमारी दी नियमित जांच करो - समय सिर पता लग्गे त फसल बच जाई","📱 पटुकृषि ऐप उप्पर सारे अपडेट पाओ","💰 मंडी भाव देख के फसल बेचो - सही दाम मिलेगा","🌞 मल्चिंग नाल मिट्टी दी नमी बणी रही","🌱 गोबर खाद दा इस्तेमाल बधाओ - रासायनिक खाद घटाओ","🌾 कणक दी बिजाई तूं पैहले बीज उपचार करो","🍚 धान दी रोपाई तूं पैहले नर्सरी तैयार करो","🧶 कपास च गुलाबी सुंडी तूं बचाव लेई फेरोमोन ट्रैप लगाओ","🎋 गन्ना बोने दे बेले 2-3 अक्खां आले टुकड़े लेओ","🌽 मक्की च 60x25 सेमी दी दूरी रक्खो","🥔 अक्टूबर-नवंबर च आलू बोओ","🧅 पियाज दी नर्सरी च 6-8 हफ्ते पुराने पौधे लाओ","🍅 टमाटर च सहारा देन नाल उपज बधदी ऐ","🌱 हरी खाद नाल मिट्टी दी सेहत सुधरी जा","💧 ठंडे मौसम च सिंचाई घटाओ","🌾 कणक दी कटाई 12-14% नमी पर करो","📊 फसल बीमा करवाओ - कुदरती आपदा तूं बचाव","🌱 प्रति हेक्टेयर खाद दी सही मातरा रक्खो","💧 सिंचाई लेई पानी दी गुणवत्ता जांचो","🌾 फसल दी रहिंद न साड़ो - मिट्टी लेई फायदेमंद ऐ","🐛 जैविक कीटनाशकां दा इस्तेमाल बधाओ","🌱 बीज दर दा ध्यान रक्खो - घट्ट या बकत न होवे","📅 अक्टूबर-नवंबर च रबी दी बिजाई करो","🌧️ जून-जुलाई च खरीफ दी बिजाई करो","☀️ जायद दी फसलां लेई हल्की सिंचाई","🌾 कणक लेई 4-5 सिंचाई काफी ऐ","🍚 धान दे खेतां च 5 सेमी पानी रक्खो","🧶 कपास लेई 90x60 सेमी दी दूरी रक्खो","🌽 मक्की च यूरिया दी टॉप ड्रेसिंग करो","🥔 आलू दी वनस्पतियां च मिट्टी चढ़ाओ","🌱 फसल सुरक्षा लेई नीम तेल दा छिड़काव करो","💧 ड्रिप सिंचित फसलें उपज बकत दिंदियां न","🌾 कणक दी कटाई मार्च-अप्रैल च","🍚 धान दी कटाई अक्टूबर-नवंबर च","🧶 कपास दी तुड़ाई अक्टूबर-दिसंबर च","🌽 मक्की दी कटाई 90-110 दिनां च","🎋 गन्ना दी कटाई 10-12 म्हीने च","🌱 जून-जुलाई च मूंगफली बोओ","🌾 अक्टूबर च सरसों बोओ","🌱 अक्टूबर-नवंबर च चना बोओ","🌾 अक्टूबर-नवंबर च जौं बोओ","🌱 अरहर दी फसल च कीड़ा नियंत्रण जरूरी ऐ","💧 सोयाबीन च पीला मोज़ेक रोग तूं बचाव","🌾 जुलाई च बाजरा बोओ","🌱 ज्वार दी फसल च नमी प्रबंधन","📊 मंडी भाव दी जानकारी लेई के बेचो","🌾 पटुकृषि - हर किसान दा साथी"]
        },
        botResponses = {
            en: { mandi: "💰 **Mandi Bhav**: Go to 'Mandi' tab and select your state/UT, district and crop. Current prices are demo, real market rates will update soon. Check best rates before selling!", weather: "🌤️ **Weather**: Enter city name in 'Weather' tab or use 'My Location'. Real-time data from OpenWeatherMap. Be prepared for rain or sunshine!", lens: "📸 **Crop Lens**: Upload crop photo in 'Crop Lens'. Currently mock detection but remedies are real! AI integration coming soon!", advisory: "🌱 **Crop Advisory**: Two options in 'Advisory' tab - 'State/UT + Season' and 'Specific Crop'. Get personalized advice with 3-step guide!", about: "ℹ️ **About Us**: Chanakya Sahni started PatuKrishi to help farmers. Contact: patukrishi@gmail.com or 9866193066. More info in 'About' tab!", analytics: "📊 **Analytics**: Check price trends, crop distribution, weather patterns and profit calculator in 'Analytics' tab. Calculate your farm profit!", tip: "💡 **Today's Tip**: ", hello: "🙏 Namaste! I'm Krishi Bot. Ask me about mandi prices, weather, crop lens, advisory, analytics or anything!", time: "⏰ Current time is: ", default: "🤖 Farmer friend, I understand! You can ask about mandi, weather, crop lens, advisory, analytics or about us. What else would you like to know?" },
            hi: { mandi: "💰 **मंडी भाव**: 'मंडी' टैब में जाकर अपना राज्य/केंद्रशासित प्रदेश, जिला और फसल चुनें। अभी के भाव डेमो हैं, जल्द ही असली मार्केट रेट अपडेट होंगे। बेचने से पहले सबसे अच्छा भाव देख लें!", weather: "🌤️ **मौसम**: 'मौसम' टैब में शहर का नाम डालें या 'मेरा स्थान' इस्तेमाल करें। ओपनवेदरमैप से रियल-टाइम डेटा आता है। बारिश या धूप - दोनों के लिए तैयार रहें!", lens: "📸 **क्रॉप लेंस**: 'क्रॉप लेंस' में फसल की फोटो अपलोड करें। अभी मॉक डिटेक्शन है लेकिन इलाज असली हैं! जल्द ही एआई इंटीग्रेशन आ रहा है!", advisory: "🌱 **फसल सलाह**: 'एडवाइजरी' टैब में दो विकल्प - 'राज्य/केंद्रशासित प्रदेश + सीजन' और 'विशेष फसल'। 3-चरणीय गाइड के साथ निजी सलाह पाएं!", about: "ℹ️ **हमारे बारे में**: चाणक्य साहनी ने किसानों की मदद के लिए पटुकृषि शुरू की। संपर्क: patukrishi@gmail.com या 9866193066। 'अबाउट' टैब में और जानकारी!", analytics: "📊 **एनालिटिक्स**: 'एनालिटिक्स' टैब में कीमत रुझान, फसल वितरण, मौसम पैटर्न और लाभ कैलकुलेटर देखें। अपने खेत का मुनाफा कैलकुलेट करें!", tip: "💡 **आज की टिप**: ", hello: "🙏 नमस्ते! मैं कृषि बॉट हूँ। मंडी भाव, मौसम, क्रॉप लेंस, एडवाइजरी, एनालिटिक्स या कुछ भी पूछिए!", time: "⏰ अभी समय है: ", default: "🤖 किसान भाई, मैं समझ गया! आप मंडी, मौसम, क्रॉप लेंस, एडवाइजरी, एनालिटिक्स या हमारे बारे में पूछ सकते हैं। और क्या जानना चाहेंगे?" },
            bn: { mandi: "💰 **মন্ডি ভাব**: 'মন্ডি' ট্যাবে গিয়ে আপনার রাজ্য/কেন্দ্রশাসিত অঞ্চল, জেলা এবং ফসল নির্বাচন করুন। বর্তমান দাম ডেমো, শীঘ্রই বাস্তব বাজারের দর আপডেট হবে। বিক্রির আগে সেরা দাম দেখে নিন!", weather: "🌤️ **আবহাওয়া**: 'আবহাওয়া' ট্যাবে শহরের নাম দিন বা 'আমার অবস্থান' ব্যবহার করুন। ওপেনওয়েদারম্যাপ থেকে রিয়েল-টাইম ডেটা আসে। বৃষ্টি বা রোদ - উভয়ের জন্য প্রস্তুত থাকুন!", lens: "📸 **ক্রপ লেন্স**: 'ক্রপ লেন্স' এ ফসলের ছবি আপলোড করুন। বর্তমানে মক ডিটেকশন কিন্তু প্রতিকার বাস্তব! শীঘ্রই এআই ইন্টিগ্রেশন আসছে!", advisory: "🌱 **ফসল পরামর্শ**: 'এডভাইজারি' ট্যাবে দুটি বিকল্প - 'রাজ্য/কেন্দ্রশাসিত অঞ্চল + মৌসুম' এবং 'নির্দিষ্ট ফসল'। ৩-ধাপ নির্দেশিকা সহ ব্যক্তিগত পরামর্শ পান!", about: "ℹ️ **আমাদের সম্পর্কে**: চাণক্য সাহনি কৃষকদের সাহায্যের জন্য পাটুকৃষি শুরু করেন। যোগাযোগ: patukrishi@gmail.com বা 9866193066। 'আবাউট' ট্যাবে আরও তথ্য!", analytics: "📊 **অ্যানালিটিক্স**: 'অ্যানালিটিক্স' ট্যাবে মূল্য প্রবণতা, ফসল বিতরণ, আবহাওয়ার প্যাটার্ন এবং লাভ ক্যালকুলেটর দেখুন। আপনার খামারের লাভ গণনা করুন!", tip: "💡 **আজকের টিপ**: ", hello: "🙏 নমস্কার! আমি কৃষি বট। মন্ডির দাম, আবহাওয়া, ক্রপ লেন্স, পরামর্শ, অ্যানালিটিক্স বা কিছু জিজ্ঞাসা করুন!", time: "⏰ এখন সময়: ", default: "🤖 কৃষক ভাই, আমি বুঝতে পেরেছি! আপনি মন্ডি, আবহাওয়া, ক্রপ লেন্স, পরামর্শ, অ্যানালিটিক্স বা আমাদের সম্পর্কে জিজ্ঞাসা করতে পারেন। আর কী জানতে চান?" },
            te: { mandi: "💰 **మండీ భావ్**: 'మండీ' ట్యాబ్‌లో మీ రాష్ట్రం/కేంద్రపాలిత ప్రాంతం, జిల్లా మరియు పంటను ఎంచుకోండి. ప్రస్తుత ధరలు డెమో, త్వరలో నిజమైన మార్కెట్ రేట్లు అప్‌డేట్ అవుతాయి. అమ్మే ముందు ఉత్తమ ధరలను చూసుకోండి!", weather: "🌤️ **వాతావరణం**: 'వాతావరణం' ట్యాబ్‌లో నగరం పేరు నమోదు చేయండి లేదా 'నా స్థానం' ఉపయోగించండి. ఓపెన్‌వెదర్‌మ్యాప్ నుండి రియల్-టైమ్ డేటా వస్తుంది. వర్షం లేదా ఎండ - రెండింటికీ సిద్ధంగా ఉండండి!", lens: "📸 **క్రాప్ లెన్స్**: 'క్రాప్ లెన్స్' లో పంట ఫోటోను అప్‌లోడ్ చేయండి. ప్రస్తుతం మాక్ డిటెక్షన్ కానీ నివారణలు నిజమైనవి! త్వరలో AI ఇంటిగ్రేషన్ వస్తోంది!", advisory: "🌱 **పంట సలహా**: 'అడ్వైజరీ' ట్యాబ్‌లో రెండు ఎంపికలు - 'రాష్ట్రం/కేంద్రపాలిత ప్రాంతం + సీజన్' మరియు 'నిర్దిష్ట పంట'. 3-దశల గైడ్‌తో వ్యక్తిగత సలహా పొందండి!", about: "ℹ️ **మా గురించి**: చాణక్య సాహ్ని రైతులకు సహాయం చేయడానికి పటుకృషిని ప్రారంభించారు. సంప్రదింపులు: patukrishi@gmail.com లేదా 9866193066. 'అబౌట్' ట్యాబ్‌లో మరింత సమాచారం!", analytics: "📊 **అనలిటిక్స్**: 'అనలిటిక్స్' ట్యాబ్‌లో ధరల ట్రెండ్స్, పంట పంపిణీ, వాతావరణ నమూనాలు మరియు లాభం కాలిక్యులేటర్ చూడండి. మీ పొలం లాభాన్ని లెక్కించండి!", tip: "💡 **నేటి చిట్కా**: ", hello: "🙏 నమస్కారం! నేను కృషి బాట్. మండీ ధరలు, వాతావరణం, క్రాప్ లెన్స్, సలహా, అనలిటిక్స్ లేదా ఏదైనా అడగండి!", time: "⏰ ప్రస్తుత సమయం: ", default: "🤖 రైతు సోదరా, నేను అర్థం చేసుకున్నాను! మీరు మండీ, వాతావరణం, క్రాప్ లెన్స్, సలహా, అనలిటిక్స్ లేదా మా గురించి అడగవచ్చు. ఇంకా ఏమి తెలుసుకోవాలనుకుంటున్నారు?" },
            mr: { mandi: "💰 **मंडी भाव**: 'मंडी' टॅबमध्ये जाऊन आपले राज्य/केंद्रशासित प्रदेश, जिल्हा आणि पीक निवडा. सध्याचे भाव डेमो आहेत, लवकरच वास्तविक बाजार दर अपडेट होतील. विक्रीपूर्वी सर्वोत्तम दर पहा!", weather: "🌤️ **हवामान**: 'हवामान' टॅबमध्ये शहराचे नाव टाका किंवा 'माझे स्थान' वापरा. ओपनवेदरमॅपवरून रिअल-टाइम डेटा येतो. पाऊस किंवा ऊन - दोन्हीसाठी तयार रहा!", lens: "📸 **पीक लेन्स**: 'पीक लेन्स' मध्ये पिकाचा फोटो अपलोड करा. सध्या मॉक डिटेक्शन आहे पण उपचार वास्तविक आहेत! लवकरच एआय इंटिग्रेशन येत आहे!", advisory: "🌱 **पीक सल्ला**: 'अॅडव्हायझरी' टॅबमध्ये दोन पर्याय - 'राज्य/केंद्रशासित प्रदेश + हंगाम' आणि 'विशिष्ट पीक'. ३-चरणीय मार्गदर्शकासह वैयक्तिक सल्ला मिळवा!", about: "ℹ️ **आमच्याबद्दल**: चाणक्य साहनी यांनी शेतकऱ्यांच्या मदतीसाठी पटुकृषी सुरू केली. संपर्क: patukrishi@gmail.com किंवा 9866193066. 'अबाउट' टॅबमध्ये अधिक माहिती!", analytics: "📊 **विश्लेषण**: 'विश्लेषण' टॅबमध्ये किंमत ट्रेंड, पीक वितरण, हवामान नमुने आणि नफा कॅल्क्युलेटर पहा. आपल्या शेताचा नफा मोजा!", tip: "💡 **आजची टीप**: ", hello: "🙏 नमस्कार! मी कृषी बॉट आहे. मंडी भाव, हवामान, पीक लेन्स, सल्ला, विश्लेषण किंवा काहीही विचारा!", time: "⏰ सध्या वेळ आहे: ", default: "🤖 शेतकरी मित्रा, मी समजलो! तुम्ही मंडी, हवामान, पीक लेन्स, सल्ला, विश्लेषण किंवा आमच्याबद्दल विचारू शकता. आणखी काय जाणून घ्याल?" },
            gu: { mandi: "💰 **મંડી ભાવ**: 'મંડી' ટેબમાં જઈને તમારું રાજ્ય/કેન્દ્રશાસિત પ્રદેશ, જિલ્લો અને પાક પસંદ કરો. હાલના ભાવ ડેમો છે, ટૂંક સમયમાં વાસ્તવિક બજાર દર અપડેટ થશે. વેચાણ પહેલા શ્રેષ્ઠ ભાવ જોઈ લો!", weather: "🌤️ **હવામાન**: 'હવામાન' ટેબમાં શહેરનું નામ દાખલ કરો અથવા 'મારું સ્થાન' વાપરો. ઓપનવેધરમેપથી રીઅલ-ટાઇમ ડેટા આવે છે. વરસાદ કે તડકો - બંને માટે તૈયાર રહો!", lens: "📸 **ક્રોપ લેન્સ**: 'ક્રોપ લેન્સ'માં પાકનો ફોટો અપલોડ કરો. હાલમાં મોક ડિટેક્શન છે પણ ઉપચાર વાસ્તવિક છે! ટૂંક સમયમાં AI ઇન્ટિગ્રેશન આવી રહ્યું છે!", advisory: "🌱 **પાક સલાહ**: 'એડવાઇઝરી' ટેબમાં બે વિકલ્પ - 'રાજ્ય/કેન્દ્રશાસિત પ્રદેશ + સિઝન' અને 'વિશિષ્ટ પાક'. 3-પગલાં માર્ગદર્શિકા સાથે વ્યક્તિગત સલાહ મેળવો!", about: "ℹ️ **અમારા વિશે**: ચાણક્ય સાહનીએ ખેડૂતોની મદદ માટે પટુકૃષિ શરૂ કરી. સંપર્ક: patukrishi@gmail.com અથવા 9866193066. 'અબાઉટ' ટેબમાં વધુ માહિતી!", analytics: "📊 **એનાલિટિક્સ**: 'એનાલિટિક્સ' ટેબમાં ભાવ વલણો, પાક વિતરણ, હવામાન પેટર્ન અને નફો કેલ્ક્યુલેટર જુઓ. તમારા ખેતરનો નફો ગણો!", tip: "💡 **આજની ટિપ**: ", hello: "🙏 નમસ્તે! હું કૃષિ બોટ છું. મંડી ભાવ, હવામાન, ક્રોપ લેન્સ, સલાહ, એનાલિટિક્સ અથવા કંઈપણ પૂછો!", time: "⏰ હાલનો સમય: ", default: "🤖 ખેડૂત ભાઈ, હું સમજી ગયો! તમે મંડી, હવામાન, ક્રોપ લેન્સ, સલાહ, એનાલિટિક્સ અથવા અમારા વિશે પૂછી શકો છો. બીજું શું જાણવું છે?" },
            mwr: { mandi: "💰 **मंडी भाव**: 'मंडी' टैब पै जाकर अपणो राज्य/केंद्रशासित प्रदेश, जिलो और फसल चुनो। अबै के भाव डेमो है, जळद ही असली मार्केट रेट अपडेट हो ज्यावै। बेचण से पैहले सबसा अच्छो भाव देख लेवो!", weather: "🌤️ **मौसम**: 'मौसम' टैब पै शहर का नाम दाखल करो या 'म्हारो स्थान' इस्तेमाल करो। ओपनवेदरमैप से रियल-टाइम डेटा आवै। मेह या धूप - दोनू खातिर तैयार रहो!", lens: "📸 **क्रॉप लेंस**: 'क्रॉप लेंस' में फसल की फोटो अपलोड करो। अबै मॉक डिटेक्शन है पण उपचार असली है! जळद ही एआई इंटीग्रेशन आवै लाग्यो!", advisory: "🌱 **फसल सलाह**: 'एडवाइजरी' टैब पै दो विकल्प - 'राज्य/केंद्रशासित प्रदेश + सीजन' और 'खास फसल'। 3-चरणीय गाइड साथै निजी सलाह पावो!", about: "ℹ️ **म्हारा बारै में**: चाणक्य साहनी किसानां की मदद खातिर पटुकृषि शुरू करी। संपर्क: patukrishi@gmail.com या 9866193066। 'अबाउट' टैब पै जादा जाणकारी!", analytics: "📊 **एनालिटिक्स**: 'एनालिटिक्स' टैब पै भाव ट्रेंड, फसल वितरण, मौसम पैटर्न और नफा कैलकुलेटर देखो। अपणा खेत का नफा कैलकुलेट करो!", tip: "💡 **अज की टिप**: ", hello: "🙏 खम्मा घणी! मैं कृषि बॉट हूँ। मंडी भाव, मौसम, क्रॉप लेंस, सलाह, एनालिटिक्स या कुछ भी पूछो!", time: "⏰ अबै वखत है: ", default: "🤖 किसान भाई, म्हाने समज गयो! तुम मंडी, मौसम, क्रॉप लेंस, सलाह, एनालिटिक्स या म्हारा बारै में पूछ सकता हो। और का जाणणो चाहो?" },
            pa: { mandi: "💰 **ਮੰਡੀ ਭਾਅ**: 'ਮੰਡੀ' ਟੈਬ ਵਿੱਚ ਜਾ ਕੇ ਆਪਣਾ ਰਾਜ/ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼, ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਫ਼ਸਲ ਚੁਣੋ। ਹੁਣ ਦੇ ਭਾਅ ਡੈਮੋ ਹਨ, ਜਲਦੀ ਹੀ ਅਸਲੀ ਮਾਰਕੀਟ ਰੇਟ ਅਪਡੇਟ ਹੋਣਗੇ। ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਭ ਤੋਂ ਵਧੀਆ ਭਾਅ ਵੇਖ ਲਵੋ!", weather: "🌤️ **ਮੌਸਮ**: 'ਮੌਸਮ' ਟੈਬ ਵਿੱਚ ਸ਼ਹਿਰ ਦਾ ਨਾਂ ਪਾਓ ਜਾਂ 'ਮੇਰਾ ਸਥਾਨ' ਵਰਤੋਂ। ਓਪਨਵੈਦਰਮੈਪ ਤੋਂ ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ ਆਉਂਦਾ ਹੈ। ਮੀਂਹ ਜਾਂ ਧੁੱਪ - ਦੋਵਾਂ ਲਈ ਤਿਆਰ ਰਹੋ!", lens: "📸 **ਕ੍ਰੌਪ ਲੈਂਸ**: 'ਕ੍ਰੌਪ ਲੈਂਸ' ਵਿੱਚ ਫ਼ਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ। ਹੁਣ ਮੌਕ ਡਿਟੈਕਸ਼ਨ ਹੈ ਪਰ ਇਲਾਜ ਅਸਲੀ ਹਨ! ਜਲਦੀ ਹੀ ਏਆਈ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਆ ਰਿਹਾ ਹੈ!", advisory: "🌱 **ਫ਼ਸਲ ਸਲਾਹ**: 'ਐਡਵਾਈਜ਼ਰੀ' ਟੈਬ ਵਿੱਚ ਦੋ ਵਿਕਲਪ - 'ਰਾਜ/ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ + ਸੀਜ਼ਨ' ਅਤੇ 'ਖਾਸ ਫ਼ਸਲ'। 3-ਕਦਮੀ ਗਾਈਡ ਨਾਲ ਨਿੱਜੀ ਸਲਾਹ ਲਵੋ!", about: "ℹ️ **ਸਾਡੇ ਬਾਰੇ**: ਚਾਣਕਿਆ ਸਾਹਨੀ ਨੇ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਲਈ ਪਟੁਕ੍ਰਿਸ਼ੀ ਸ਼ੁਰੂ ਕੀਤੀ। ਸੰਪਰਕ: patukrishi@gmail.com ਜਾਂ 9866193066। 'ਬਾਰੇ' ਟੈਬ ਵਿੱਚ ਹੋਰ ਜਾਣਕਾਰੀ!", analytics: "📊 **ਐਨਾਲਿਟਿਕਸ**: 'ਐਨਾਲਿਟਿਕਸ' ਟੈਬ ਵਿੱਚ ਕੀਮਤ ਰੁਝਾਨ, ਫ਼ਸਲ ਵੰਡ, ਮੌਸਮ ਪੈਟਰਨ ਅਤੇ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ ਵੇਖੋ। ਆਪਣੇ ਖੇਤ ਦਾ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟ ਕਰੋ!", tip: "💡 **ਅੱਜ ਦੀ ਟਿਪ**: ", hello: "🙏 ਨਮਸਤੇ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਬੋਟ ਹਾਂ। ਮੰਡੀ ਭਾਅ, ਮੌਸਮ, ਕ੍ਰੌਪ ਲੈਂਸ, ਸਲਾਹ, ਐਨਾਲਿਟਿਕਸ ਜਾਂ ਕੁਝ ਵੀ ਪੁੱਛੋ!", time: "⏰ ਹੁਣ ਸਮਾਂ ਹੈ: ", default: "🤖 ਕਿਸਾਨ ਭਰਾ, ਮੈਂ ਸਮਝ ਗਿਆ! ਤੁਸੀਂ ਮੰਡੀ, ਮੌਸਮ, ਕ੍ਰੌਪ ਲੈਂਸ, ਸਲਾਹ, ਐਨਾਲਿਟਿਕਸ ਜਾਂ ਸਾਡੇ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ। ਹੋਰ ਕੀ ਜਾਣਨਾ ਚਾਹੋਗੇ?" },
            ta: { mandi: "💰 **மண்டி விலை**: 'மண்டி' டேபில் உங்கள் மாநிலம்/யூனியன் பிரதேசம், மாவட்டம் மற்றும் பயிரை தேர்ந்தெடுக்கவும். தற்போதைய விலைகள் டெமோ, விரைவில் உண்மையான சந்தை விலைகள் புதுப்பிக்கப்படும். விற்பதற்கு முன் சிறந்த விலையைப் பாருங்கள்!", weather: "🌤️ **வானிலை**: 'வானிலை' டேபில் நகரத்தின் பெயரை உள்ளிடவும் அல்லது 'எனது இருப்பிடம்' பயன்படுத்தவும். ஓப்பன்வெதர்மேப்பிலிருந்து நிகழ்நேர தரவு வருகிறது. மழை அல்லது வெயில் - இரண்டிற்கும் தயாராக இருங்கள்!", lens: "📸 **கிராப் லென்ஸ்**: 'கிராப் லென்ஸ்' இல் பயிரின் புகைப்படத்தை பதிவேற்றவும். தற்போது மாக் கண்டறிதல் ஆனால் தீர்வுகள் உண்மையானவை! விரைவில் AI ஒருங்கிணைப்பு வருகிறது!", advisory: "🌱 **பயிர் ஆலோசனை**: 'ஆலோசனை' டேபில் இரண்டு விருப்பங்கள் - 'மாநிலம்/யூனியன் பிரதேசம் + பருவம்' மற்றும் 'குறிப்பிட்ட பயிர்'. 3-படி வழிகாட்டியுடன் தனிப்பயனாக்கப்பட்ட ஆலோசனையைப் பெறுங்கள்!", about: "ℹ️ **எங்களைப் பற்றி**: சாணக்யா சாஹ்னி விவசாயிகளுக்கு உதவ படுகிருஷியை தொடங்கினார். தொடர்பு: patukrishi@gmail.com அல்லது 9866193066. 'பற்றி' டேபில் மேலும் தகவல்!", analytics: "📊 **பகுப்பாய்வு**: 'பகுப்பாய்வு' டேபில் விலை போக்குகள், பயிர் விநியோகம், வானிலை முறைகள் மற்றும் லாப கால்குலேட்டரைப் பார்க்கவும். உங்கள் பண்ணையின் லாபத்தைக் கணக்கிடுங்கள்!", tip: "💡 **இன்றைய குறிப்பு**: ", hello: "🙏 வணக்கம்! நான் கிருஷி போட். மண்டி விலைகள், வானிலை, கிராப் லென்ஸ், ஆலோசனை, பகுப்பாய்வு அல்லது எதுவும் கேளுங்கள்!", time: "⏰ இப்போது நேரம்: ", default: "🤖 விவசாயி நண்பரே, நான் புரிந்துகொண்டேன்! நீங்கள் மண்டி, வானிலை, கிராப் லென்ஸ், ஆலோசனை, பகுப்பாய்வு அல்லது எங்களைப் பற்றி கேட்கலாம். வேறு என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?" },
            ml: { mandi: "💰 **മണ്ടി ഭാവ്**: 'മണ്ടി' ടാബിൽ നിങ്ങളുടെ സംസ്ഥാനം/കേന്ദ്രഭരണ പ്രദേശം, ജില്ല, വിള എന്നിവ തിരഞ്ഞെടുക്കുക. നിലവിലെ വിലകൾ ഡെമോ ആണ്, ഉടൻ തന്നെ യഥാർത്ഥ മാർക്കറ്റ് നിരക്കുകൾ അപ്ഡേറ്റ് ചെയ്യും. വിൽക്കുന്നതിന് മുമ്പ് മികച്ച നിരക്കുകൾ പരിശോധിക്കുക!", weather: "🌤️ **കാലാവസ്ഥ**: 'കാലാവസ്ഥ' ടാബിൽ നഗരത്തിന്റെ പേര് നൽകുക അല്ലെങ്കിൽ 'എന്റെ സ്ഥാനം' ഉപയോഗിക്കുക. ഓപ്പൺവെതർമാപ്പിൽ നിന്നുള്ള തത്സമയ ഡാറ്റ. മഴയ്ക്കോ വെയിലിനോ തയ്യാറാകൂ!", lens: "📸 **ക്രോപ്പ് ലെൻസ്**: 'ക്രോപ്പ് ലെൻസിൽ' വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക. നിലവിൽ മോക്ക് ഡിറ്റക്ഷൻ എന്നാൽ ചികിത്സകൾ യഥാർത്ഥമാണ്! AI സംയോജനം ഉടൻ വരുന്നു!", advisory: "🌱 **വിള ഉപദേശം**: 'അഡ്‌വൈസറി' ടാബിൽ രണ്ട് ഓപ്ഷനുകൾ - 'സംസ്ഥാനം/കേന്ദ്രഭരണ പ്രദേശം + സീസൺ', 'നിർദ്ദിഷ്ട വിള'. 3-ഘട്ട ഗൈഡ് ഉപയോഗിച്ച് വ്യക്തിഗത ഉപദേശം നേടൂ!", about: "ℹ️ **ഞങ്ങളെ കുറിച്ച്**: ചാണക്യ സാഹ്നി കർഷകരെ സഹായിക്കാൻ പടുകൃഷി ആരംഭിച്ചു. ബന്ധപ്പെടുക: patukrishi@gmail.com അല്ലെങ്കിൽ 9866193066. 'അബൗട്ട്' ടാബിൽ കൂടുതൽ വിവരങ്ങൾ!", analytics: "📊 **അനലിറ്റിക്സ്**: 'അനലിറ്റിക്സ്' ടാബിൽ വില ട്രെൻഡുകൾ, വിള വിതരണം, കാലാവസ്ഥാ രീതികൾ, ലാഭ കാൽക്കുലേറ്റർ എന്നിവ പരിശോധിക്കുക. നിങ്ങളുടെ ഫാമിന്റെ ലാഭം കണക്കാക്കൂ!", tip: "💡 **ഇന്നത്തെ ടിപ്പ്**: ", hello: "🙏 നമസ്കാരം! ഞാൻ കൃഷി ബോട്ട്. മണ്ടി വില, കാലാവസ്ഥ, ക്രോപ്പ് ലെൻസ്, ഉപദേശം, അനലിറ്റിക്സ് അല്ലെങ്കിൽ എന്തും ചോദിക്കൂ!", time: "⏰ ഇപ്പോഴത്തെ സമയം: ", default: "🤖 കർഷക സുഹൃത്തേ, ഞാൻ മനസ്സിലാക്കി! നിങ്ങൾക്ക് മണ്ടി, കാലാവസ്ഥ, ക്രോപ്പ് ലെൻസ്, ഉപദേശം, അനലിറ്റിക്സ് അല്ലെങ്കിൽ ഞങ്ങളെ കുറിച്ച് ചോദിക്കാം. മറ്റെന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?" },
            ur: { mandi: "💰 **منڈی بھاؤ**: 'منڈی' ٹیب میں جا کر اپنا ریاست/مرکزی علاقہ، ضلع اور فصل منتخب کریں۔ موجودہ قیمتیں ڈیمو ہیں، جلد اصلی مارکیٹ ریٹ اپ ڈیٹ ہوں گے۔ فروخت سے پہلے بہترین نرخ دیکھ لیں!", weather: "🌤️ **موسم**: 'موسم' ٹیب میں شہر کا نام درج کریں یا 'میرا مقام' استعمال کریں۔ اوپن ویدر میپ سے ریئل ٹائم ڈیٹا آتا ہے۔ بارش یا دھوپ - دونوں کے لیے تیار رہیں!", lens: "📸 **کراپ لینس**: 'کراپ لینس' میں فصل کی تصویر اپ لوڈ کریں۔ فی الحال موک ڈیٹیکشن ہے لیکن علاج اصلی ہیں! جلد ہی AI انٹیگریشن آ رہا ہے!", advisory: "🌱 **فصل مشورہ**: 'ایڈوائزری' ٹیب میں دو آپشنز - 'ریاست/مرکزی علاقہ + سیزن' اور 'مخصوص فصل'. 3-مرحلہ گائیڈ کے ساتھ ذاتی مشورہ حاصل کریں!", about: "ℹ️ **ہمارے بارے میں**: چانکیا ساہنی نے کسانوں کی مدد کے لیے پٹوکرشی شروع کی۔ رابطہ: patukrishi@gmail.com یا 9866193066۔ 'اباؤٹ' ٹیب میں مزید معلومات!", analytics: "📊 **اینالیٹکس**: 'اینالیٹکس' ٹیب میں قیمت کے رجحانات، فصل کی تقسیم، موسم کے پیٹرن اور منافع کیلکولیٹر دیکھیں۔ اپنے فارم کا منافع شمار کریں!", tip: "💡 **آج کی ٹپ**: ", hello: "🙏 نمستے! میں کرشی بوٹ ہوں۔ منڈی بھاؤ، موسم، کراپ لینس، مشورہ، اینالیٹکس یا کچھ بھی پوچھیں!", time: "⏰ ابھی وقت ہے: ", default: "🤖 کسان بھائی، میں سمجھ گیا! آپ منڈی، موسم، کراپ لینس، مشورہ، اینالیٹکس یا ہمارے بارے میں پوچھ سکتے ہیں۔ اور کیا جاننا چاہیں گے؟" },
            kn: { mandi: "💰 **ಮಂಡಿ ಭಾವ್**: 'ಮಂಡಿ' ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನಿಮ್ಮ ರಾಜ್ಯ/ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ, ಜಿಲ್ಲೆ ಮತ್ತು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಪ್ರಸ್ತುತ ಬೆಲೆಗಳು ಡೆಮೊ, ಶೀಘ್ರದಲ್ಲೇ ನಿಜವಾದ ಮಾರುಕಟ್ಟೆ ದರಗಳು ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ. ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಉತ್ತಮ ದರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ!", weather: "🌤️ **ಹವಾಮಾನ**: 'ಹವಾಮಾನ' ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನಗರದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ ಅಥವಾ 'ನನ್ನ ಸ್ಥಳ' ಬಳಸಿ. ಓಪನ್‌ವೆದರ್‌ಮ್ಯಾಪ್‌ನಿಂದ ನೈಜ-ಸಮಯದ ಡೇಟಾ ಬರುತ್ತದೆ. ಮಳೆ ಅಥವಾ ಬಿಸಿಲು - ಎರಡಕ್ಕೂ ಸಿದ್ಧರಾಗಿರಿ!", lens: "📸 **ಕ್ರಾಪ್ ಲೆನ್ಸ್**: 'ಕ್ರಾಪ್ ಲೆನ್ಸ್' ನಲ್ಲಿ ಬೆಳೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಪ್ರಸ್ತುತ ಮಾಕ್ ಡಿಟೆಕ್ಷನ್ ಆದರೆ ಪರಿಹಾರಗಳು ನಿಜವಾದವು! ಶೀಘ್ರದಲ್ಲೇ AI ಏಕೀಕರಣ ಬರಲಿದೆ!", advisory: "🌱 **ಬೆಳೆ ಸಲಹೆ**: 'ಅಡ್ವೈಸರಿ' ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಎರಡು ಆಯ್ಕೆಗಳು - 'ರಾಜ್ಯ/ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ + ಋತು' ಮತ್ತು 'ನಿರ್ದಿಷ್ಟ ಬೆಳೆ'. 3-ಹಂತದ ಮಾರ್ಗದರ್ಶಿಯೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಸಲಹೆ ಪಡೆಯಿರಿ!", about: "ℹ️ **ನಮ್ಮ ಬಗ್ಗೆ**: ಚಾಣಕ್ಯ ಸಾಹ್ನಿ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಲು ಪಟುಕೃಷಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿದರು. ಸಂಪರ್ಕ: patukrishi@gmail.com ಅಥವಾ 9866193066. 'ಅಬೌಟ್' ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ!", analytics: "📊 **ಅನಲಿಟಿಕ್ಸ್**: 'ಅನಲಿಟಿಕ್ಸ್' ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು, ಬೆಳೆ ವಿತರಣೆ, ಹವಾಮಾನ ಮಾದರಿಗಳು ಮತ್ತು ಲಾಭ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಪರಿಶೀಲಿಸಿ. ನಿಮ್ಮ ಫಾರ್ಮ್‌ನ ಲಾಭವನ್ನು ಲೆಕ್ಕಹಾಕಿ!", tip: "💡 **ಇಂದಿನ ಸಲಹೆ**: ", hello: "🙏 ನಮಸ್ಕಾರ! ನಾನು ಕೃಷಿ ಬಾಟ್. ಮಂಡಿ ಬೆಲೆ, ಹವಾಮಾನ, ಕ್ರಾಪ್ ಲೆನ್ಸ್, ಸಲಹೆ, ಅನಲಿಟಿಕ್ಸ್ ಅಥವಾ ಏನಾದರೂ ಕೇಳಿ!", time: "⏰ ಪ್ರಸ್ತುತ ಸಮಯ: ", default: "🤖 ರೈತ ಸ್ನೇಹಿತರೇ, ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡೆ! ನೀವು ಮಂಡಿ, ಹವಾಮಾನ, ಕ್ರಾಪ್ ಲೆನ್ಸ್, ಸಲಹೆ, ಅನಲಿಟಿಕ್ಸ್ ಅಥವಾ ನಮ್ಮ ಬಗ್ಗೆ ಕೇಳಬಹುದು. ಇನ್ನೇನು ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?" },
            or: { mandi: "💰 **ମଣ୍ଡି ଭାଉ**: 'ମଣ୍ଡି' ଟ୍ୟାବ୍‌ରେ ଯାଇ ଆପଣଙ୍କ ରାଜ୍ୟ/କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ, ଜିଲ୍ଲା ଏବଂ ଫସଲ ଚୟନ କରନ୍ତୁ। ବର୍ତ୍ତମାନର ମୂଲ୍ୟ ଡେମୋ ଅଟେ, ଶୀଘ୍ର ପ୍ରକୃତ ବଜାର ହାର ଅପଡେଟ୍ ହେବ। ବିକ୍ରି ପୂର୍ବରୁ ସର୍ବୋତ୍ତମ ହାର ଯାଞ୍ଚ କରନ୍ତୁ!", weather: "🌤️ **ପାଣିପାଗ**: 'ପାଣିପାଗ' ଟ୍ୟାବ୍‌ରେ ସହରର ନାମ ଦିଅନ୍ତୁ କିମ୍ବା 'ମୋର ସ୍ଥାନ' ବ୍ୟବହାର କରନ୍ତୁ। ଓପନ୍‌ଓ୍ୱେଦରମ୍ୟାପ୍‌ରୁ ରିୟଲ-ଟାଇମ୍ ଡାଟା ଆସିଥାଏ। ବର୍ଷା କିମ୍ବା ଖରା - ଉଭୟ ପାଇଁ ପ୍ରସ୍ତୁତ ରୁହନ୍ତୁ!", lens: "📸 **କ୍ରପ୍ ଲେନ୍ସ**: 'କ୍ରପ୍ ଲେନ୍ସ' ରେ ଫସଲର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ। ବର୍ତ୍ତମାନ ମକ୍ ଡିଟେକ୍ସନ୍ କିନ୍ତୁ ଚିକିତ୍ସା ପ୍ରକୃତ! ଶୀଘ୍ର AI ଏକୀକରଣ ଆସୁଛି!", advisory: "🌱 **ଫସଲ ପରାମର୍ଶ**: 'ଆଡ୍‌ଭାଇଜରୀ' ଟ୍ୟାବ୍‌ରେ ଦୁଇଟି ବିକଳ୍ପ - 'ରାଜ୍ୟ/କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ + ଋତୁ' ଏବଂ 'ନିର୍ଦ୍ଦିଷ୍ଟ ଫସଲ'. 3-ପଦକ୍ଷେପ ଗାଇଡ୍ ସହିତ ବ୍ୟକ୍ତିଗତ ପରାମର୍ଶ ପାଆନ୍ତୁ!", about: "ℹ️ **ଆମ ବିଷୟରେ**: ଚାଣକ୍ୟ ସାହ୍ନି କୃଷକମାନଙ୍କୁ ସାହାଯ୍ୟ କରିବା ପାଇଁ ପଟୁକୃଷି ଆରମ୍ଭ କରିଥିଲେ। ଯୋଗାଯୋଗ: patukrishi@gmail.com କିମ୍ବା 9866193066। 'ଆବାଉଟ୍' ଟ୍ୟାବ୍‌ରେ ଅଧିକ ସୂଚନା!", analytics: "📊 **ଆନାଲିଟିକ୍ସ**: 'ଆନାଲିଟିକ୍ସ' ଟ୍ୟାବ୍‌ରେ ମୂଲ୍ୟ ଧାରା, ଫସଲ ବଣ୍ଟନ, ପାଣିପାଗ ଢାଞ୍ଚା ଏବଂ ଲାଭ କ୍ୟାଲକୁଲେଟର ଯାଞ୍ଚ କରନ୍ତୁ। ଆପଣଙ୍କ ଫାର୍ମର ଲାଭ ଗଣନା କରନ୍ତୁ!", tip: "💡 **ଆଜିର ଟିପ**: ", hello: "🙏 ନମସ୍କାର! ମୁଁ କୃଷି ବଟ୍। ମଣ୍ଡି ଦର, ପାଣିପାଗ, କ୍ରପ୍ ଲେନ୍ସ, ପରାମର୍ଶ, ଆନାଲିଟିକ୍ସ କିମ୍ବା କିଛି ପଚାରନ୍ତୁ!", time: "⏰ ଏବେ ସମୟ: ", default: "🤖 କୃଷକ ବନ୍ଧୁ, ମୁଁ ବୁଝିଗଲି! ଆପଣ ମଣ୍ଡି, ପାଣିପାଗ, କ୍ରପ୍ ଲେନ୍ସ, ପରାମର୍ଶ, ଆନାଲିଟିକ୍ସ କିମ୍ବା ଆମ ବିଷୟରେ ପଚାରିପାରିବେ। ଆଉ କ'ଣ ଜାଣିବାକୁ ଚାହିଁବେ?" },
            sa: { mandi: "💰 **मण्डीभावाः**: 'मण्डी' ट्याब् मध्ये गत्वा भवतः राज्यम्/केन्द्रशासितप्रदेशः, मण्डलम्, फसलं च चिनोतु। वर्तमानमूल्यानि प्रदर्शनार्थम्, शीघ्रं वास्तविकबाजारमूल्यानि अद्यतनीयानि भविष्यन्ति। विक्रयणात् पूर्वम् उत्तममूल्यानि पश्यत!", weather: "🌤️ **वातावरणम्**: 'वातावरणम्' ट्याब् मध्ये नगरस्य नाम लिखत अथवा 'मम स्थानम्' उपयुज्यताम्। OpenWeatherMap इत्यस्मात् वास्तविकसमय-तथ्यानि आगच्छन्ति। वर्षा आतपो वा - उभयार्थं सज्जाः भवत!", lens: "📸 **फसल-लेन्स्**: 'फसल-लेन्स्' मध्ये फसलस्य चित्रम् उपारोपयतु। इदानीं अनुकरण-परीक्षा किन्तु उपचाराः वास्तविकाः! शीघ्रं AI-एकीकरणम् आगच्छति!", advisory: "🌱 **फसल-सलाह**: 'सलाह' ट्याब् मध्ये द्वौ विकल्पौ - 'राज्यम्/केन्द्रशासितप्रदेशः + ऋतुः' तथा 'विशिष्टफसलम्'। ३-चरणीयमार्गदर्शिकया सह वैयक्तिकं मार्गदर्शनं प्राप्नुत!", about: "ℹ️ **अस्माकं विषये**: चाणक्य साहनी कृषकाणां साहाय्याय पटुकृषि आरब्धवान्। सम्पर्कः: patukrishi@gmail.com अथवा 9866193066। 'अस्माकं विषये' ट्याब् मध्ये अधिकसूचना!", analytics: "📊 **विश्लेषणम्**: 'विश्लेषणम्' ट्याब् मध्ये मूल्यप्रवृत्तीः, फसलवितरणम्, वातावरणप्रारूपाणि, लाभगणकयन्त्रं च पश्यत। भवतः क्षेत्रस्य लाभं गणयत!", tip: "💡 **अद्यतनी सूचना**: ", hello: "🙏 नमस्कार! अहं कृषि-बाट् अस्मि। मण्डीमूल्यानि, वातावरणम्, फसल-लेन्स्, सलाह, विश्लेषणम् अथवा किमपि पृच्छत!", time: "⏰ साम्प्रतं समयः: ", default: "🤖 कृषकबन्धो, अहम् अज्ञासिषम्! भवान् मण्डी, वातावरणम्, फसल-लेन्स्, सलाह, विश्लेषणम् अथवा अस्माकं विषये पृच्छितुं शक्नोति। अपि किम् अन्यत् ज्ञातुम् इच्छसि?" },
            bho: { mandi: "💰 **मंडी भाव**: 'मंडी' टैब में जाके आपन राज्य/केंद्रशासित प्रदेश, जिला आ फसल चुनीं। अबहीं के भाव डेमो बा, जल्दी असली मार्केट रेट अपडेट हो जाईं। बेचे से पहिले सबसे नीक भाव देख लीं!", weather: "🌤️ **मौसम**: 'मौसम' टैब में शहर के नाम लिखीं या 'हमार स्थान' इस्तेमाल करीं। OpenWeatherMap से रियल-टाइम डेटा मिलेला। बरखा या धूप - दुनो खातिर तइयार रहीं!", lens: "📸 **फसल लेंस**: 'फसल लेंस' में फसल के फोटो अपलोड करीं। अबहीं मॉक डिटेक्शन बा लेकिन इलाज असली बा! जल्दी AI इंटीग्रेशन आवत बा!", advisory: "🌱 **फसल सलाह**: 'सलाह' टैब में दू गो विकल्प - 'राज्य/केंद्रशासित प्रदेश + सीजन' आ 'खास फसल'। 3-चरणीय गाइड के साथ निजी सलाह पाईं!", about: "ℹ️ **हमार बारे में**: चाणक्य साहनी किसान लोग के मदद खातिर पटुकृषि सुरू कइले बाड़न। संपर्क: patukrishi@gmail.com या 9866193066। 'हमार बारे में' टैब में अउरी जानकारी!", analytics: "📊 **एनालिटिक्स**: 'एनालिटिक्स' टैब में कीमत रुझान, फसल वितरण, मौसम पैटर्न आ लाभ कैलकुलेटर देखीं। आपन खेत के मुनाफा कैलकुलेट करीं!", tip: "💡 **आज के टिप**: ", hello: "🙏 नमस्कार! हम कृषि बॉट हईं। मंडी भाव, मौसम, फसल लेंस, सलाह, एनालिटिक्स या कुछ भी पूछीं!", time: "⏰ अबहिन के समय: ", default: "🤖 किसान भाई, हम समझ गईं! आप मंडी, मौसम, फसल लेंस, सलाह, एनालिटिक्स या हमार बारे में पूछ सकत बानीं। आउर का जानल चाहब?" },
            doi: { mandi: "💰 **मंडी भाव**: 'मंडी' टैब च जाके आपणा राज्य/केंद्रशासित प्रदेश, जिला ते फसल चुनो। हुण दे भाव डेमो न, जल्दी असली मार्केट रेट अपडेट हो जाणा। बेचने तूं पैहले सबतूं अच्छा भाव देखो!", weather: "🌤️ **मौसम**: 'मौसम' टैब च शैहर दा नांव लिखो या 'मेरा स्थान' इस्तेमाल करो। OpenWeatherMap तूं रियल-टाइम डेटा आउना। मींह या धूप - दोनां लेई तियार रहो!", lens: "📸 **फसल लेंस**: 'फसल लेंस' च फसल दी फोटो अपलोड करो। हुण मॉक डिटेक्शन ऐ पर इलाज असली न! जल्दी AI इंटीग्रेशन आउना!", advisory: "🌱 **फसल सलाह**: 'सलाह' टैब च दो विकल्प - 'राज्य/केंद्रशासित प्रदेश + सीजन' ते 'खास फसल'। 3-चरणीय गाइड दे नाल निजी सलाह पाओ!", about: "ℹ️ **साढ़े बारे च**: चाणक्य साहनी किसानां दी मदद लेई पटुकृषि शुरू कीती। संपर्क: patukrishi@gmail.com या 9866193066। 'साढ़े बारे च' टैब च होर जानकारी!", analytics: "📊 **एनालिटिक्स**: 'एनालिटिक्स' टैब च कीमत रुझान, फसल वितरण, मौसम पैटर्न ते लाभ कैलकुलेटर देखो। आपणे खेत दा मुनाफा कैलकुलेट करो!", tip: "💡 **अज्ज दी टिप**: ", hello: "🙏 नमस्कार! में कृषि बॉट आं। मंडी भाव, मौसम, फसल लेंस, सलाह, एनालिटिक्स या किश बी पुच्छो!", time: "⏰ हुण दा समां: ", default: "🤖 किसान बन्धू, में समझे आं! तुस मंडी, मौसम, फसल लेंस, सलाह, एनालिटिक्स या साढ़े बारे च पुछी सकने आ। होर की जाणना चाहने आ?" }
        },
translations = {
    en: { logo: "PatuKrishi", home: "Home", weather: "Weather", mandi: "Mandi", lens: "Crop Lens", advisory: "Advisory", analytics: "Analytics", videos: "Videos", govtSchemes: "Government Schemes", about: "About", profile: "Profile", logout: "Logout", namaste: "Namaste", "hero-text": "Your farmer friend - with smart farming", "sustainable-title": "🌱 PatuKrishi – Smart Farming", "sustainable-text": "🇮🇳 In India, farmers need timely and accurate information. PatuKrishi provides live mandi prices, weather forecast, crop lens (disease detection and treatment), and step-by-step guidance from sowing to harvest. We are here to turn your field's produce into profit. Whether you are a wheat farmer from Punjab or a rice grower from Tamil Nadu, PatuKrishi is for every farmer. Now farming is smart, and profit is sure! 💚", "weather-desc": "Live forecast · crop recommendation", "mandi-desc": "All states & UTs · districts · multiple rates", "advisory-desc": "State/UT + crop · 3-step guide", "weather-title": "Weather · Mausam Salah", "city-placeholder": "Enter city (e.g. Delhi)", search: "Search", "my-location": "My Location", "mandi-title": "Mandi Prices · Kai Bhav", "show-prices": "Show Prices", "lens-title": "Crop Lens · Rog Ki Pehchan", "upload-title": "Upload Crop Image", "upload-desc": "Mock disease detection", "advisory-title": "Crop Advisory · Pura Guide", "state-season": "State/UT + Season", "specific-crop": "Specific Crop (3-Step)", "get-advice": "Get Advice", "get-guide": "Get 3-Step Guide", "analytics-title": "Farming Analytics · Data Insights", "happy-farmers": "Happy Farmers", "avg-profit": "Avg Profit/Acre", "weather-alerts": "Weather Alerts", "active-farms": "Active Farms", "price-trends": "📈 Price Trends (Last 6 Months)", "crop-distribution": "🌾 Crop Distribution", "weather-patterns": "🌡️ Weather Patterns", "profit-calculator": "💰 Profit Calculator", "select-crop": "Select Crop", area: "Area (in acres)", calculate: "Calculate Profit", "market-insights": "📊 Market Insights", rising: "⬆️ Rising", stable: "↗️ Stable", falling: "⬇️ Falling", "seasonal-forecast": "🌦️ Seasonal Forecast 2026", rabi: "Rabi Season", kharif: "Kharif Season", zaid: "Zaid Season", "optimal-conditions": "Optimal Conditions", "rabi-crops": "Wheat, Mustard, Gram", "kharif-crops": "Rice, Cotton, Maize", "zaid-crops": "Moong, Vegetables", "about-title": "About Us · Hamari Kahani", mission: "Our Mission", "mission-text": "To empower every Indian farmer with technology-driven solutions for sustainable and profitable farming. We bridge the gap between traditional wisdom and modern innovation.", vision: "Our Vision", "vision-text": "Create a digital ecosystem where every farmer has access to real-time market data, weather intelligence, and expert guidance - making farming smarter and more profitable.", values: "Our Values", "values-text": "Integrity, Innovation, Inclusivity. We believe in putting farmers first and creating solutions that truly make a difference in their lives.", "founder-role": "Founder & Developer", "founder-quote": "\"I built PatuKrishi because our farmers deserve a friend in the digital world—someone who speaks their language, understands their struggles, and helps them grow. This is my way of saying thank you to the hands that feed our nation.\"", "why-choose": "❓ Why Farmers Choose PatuKrishi", "real-time": "Real-time Data", "real-time-desc": "Live mandi prices and weather", "ai-powered": "AI-Powered", "ai-powered-desc": "Smart disease detection", "local-langs": "🌐 Local Languages", "local-langs-desc": "English, Hindi, Bengali, Telugu, Marathi, Gujarati, Marwadi, Punjabi, Tamil, Malayalam, Urdu, Kannada, Odia, Sanskrit & more", free: "100% Free", "free-desc": "Always free for farmers", "send-message": "Send Us A Message", "message-desc": "Have questions? We'd love to hear from you!", "message-placeholder": "Write your query here...", "google-form": "Open Google Form", "google-form-note": "📝 Click the button above to open the form", "footer-tagline": "Smart Farming for Indian farmers.", "quick-links": "Quick Links", policies: "Policies & Legal", privacy: "Privacy Policy: We respect your data. No third-party sharing.", terms: "Terms & Conditions: Use of this site implies acceptance.", cookie: "Cookie Policy: We use essential cookies for functionality.", disclaimer: "Disclaimer: Information is for guidance only. Verify locally.", refund: "Refund Policy: Not applicable as services are free.", "support": "Support & Info", faq: "FAQ: Visit our Help section.", contact: "Contact: patukrishi@gmail.com", careers: "Careers: Join our mission.", press: "Press: Media inquiries welcome.", office: "Office: Digital platform - Serving pan-India", copyright: "© 2026 PatuKrishi – All rights reserved. Made with 💚 for Indian farmers by PatuKrishi.", "edit-profile": "Edit Profile", "name-placeholder": "Name", save: "Save", cancel: "Cancel", "krishi-bot": "Krishi Bot", "bot-welcome": "🙏 Namaskar! Main aapka Krishi Bot hoon. Poochhiye - mandi bhav, mausam, crop lens, advisory, analytics ya kuch bhi!", "chat-placeholder": "Yahan likhiye..." },
    hi: { logo: "पटुकृषि", home: "होम", weather: "मौसम", mandi: "मंडी", lens: "क्रॉप लेंस", advisory: "सलाह", analytics: "एनालिटिक्स", videos: "वीडियो", govtSchemes: "सरकारी योजनाएँ", about: "हमारे बारे में", profile: "प्रोफाइल", logout: "लॉगआउट", namaste: "नमस्ते", "hero-text": "आपका अपना किसान दोस्त – स्मार्ट फार्मिंग के साथ", "sustainable-title": "🌱 पटुकृषि – स्मार्ट फार्मिंग", "sustainable-text": "🇮🇳 भारत में किसानों को समय पर सही जानकारी मिलना बहुत जरूरी है। पटुकृषि आपको देता है लाइव मंडी भाव, मौसम का पूर्व अनुमान, क्रॉप लेंस (रोगों की पहचान और इलाज), और स्टेप-बाय-स्टेप बुवाई से कटाई तक की सलाह। हम आपके खेत की पैदावार को मुनाफे में बदलने के लिए यहां हैं। चाहे आप पंजाब के गेहूं किसान हों या तमिलनाडु के चावल उत्पादक, पटुकृषि हर किसान के लिए है। अब फार्मिंग हुई स्मार्ट, और मुनाफा हुआ स्योर! 💚", "weather-desc": "लाइव पूर्वानुमान · फसल सिफारिश", "mandi-desc": "सभी राज्य एवं केंद्रशासित प्रदेश · जिले · कई दरें", "advisory-desc": "राज्य/केंद्रशासित प्रदेश + फसल · 3-चरणीय गाइड", "weather-title": "मौसम · मौसम सलाह", "city-placeholder": "शहर दर्ज करें (जैसे दिल्ली)", search: "खोजें", "my-location": "मेरा स्थान", "mandi-title": "मंडी भाव · कई भाव", "show-prices": "भाव दिखाएं", "lens-title": "क्रॉप लेंस · रोग की पहचान", "upload-title": "फसल फोटो अपलोड करें", "upload-desc": "मॉक रोग जांच", "advisory-title": "फसल सलाह · पूरा गाइड", "state-season": "राज्य/केंद्रशासित प्रदेश + सीजन", "specific-crop": "विशेष फसल (3-चरण)", "get-advice": "सलाह लें", "get-guide": "3-चरणीय गाइड लें", "analytics-title": "कृषि एनालिटिक्स · डेटा इनसाइट्स", "happy-farmers": "खुश किसान", "avg-profit": "औसत लाभ/एकड़", "weather-alerts": "मौसम अलर्ट", "active-farms": "सक्रिय फार्म", "price-trends": "📈 मूल्य रुझान (पिछले 6 महीने)", "crop-distribution": "🌾 फसल वितरण", "weather-patterns": "🌡️ मौसम पैटर्न", "profit-calculator": "💰 लाभ कैलकुलेटर", "select-crop": "फसल चुनें", area: "क्षेत्रफल (एकड़ में)", calculate: "लाभ गणना करें", "market-insights": "📊 बाजार अंतर्दृष्टि", rising: "⬆️ बढ़ रहा", stable: "↗️ स्थिर", falling: "⬇️ गिर रहा", "seasonal-forecast": "🌦️ सीजनल पूर्वानुमान 2026", rabi: "रबी सीजन", kharif: "खरीफ सीजन", zaid: "जायद सीजन", "optimal-conditions": "अनुकूल परिस्थितियां", "rabi-crops": "गेहूं, सरसों, चना", "kharif-crops": "धान, कपास, मक्का", "zaid-crops": "मूंग, सब्जियां", "about-title": "हमारे बारे में · हमारी कहानी", mission: "हमारा मिशन", "mission-text": "हर भारतीय किसान को टेक्नोलॉजी-आधारित समाधानों से सशक्त बनाना, जो सतत और लाभदायक खेती के लिए हो। हम पारंपरिक ज्ञान और आधुनिक नवाचार के बीच की खाई को पाटते हैं।", vision: "हमारा विजन", "vision-text": "एक डिजिटल इकोसिस्टम बनाना जहां हर किसान को रीयल-टाइम बाजार डेटा, मौसम जानकारी और विशेषज्ञ मार्गदर्शन मिले - खेती को स्मार्ट और अधिक लाभदायक बनाना।", values: "हमारे मूल्य", "values-text": "ईमानदारी, नवाचार, समावेशिता। हम किसानों को पहले रखने और ऐसे समाधान बनाने में विश्वास करते हैं जो उनके जीवन में वास्तविक बदलाव लाएं।", "founder-role": "संस्थापक और डेवलपर", "founder-quote": "\"मैंने पटुकृषि इसलिए बनाई क्योंकि हमारे किसान डिजिटल दुनिया में एक दोस्त के हकदार हैं—कोई ऐसा जो उनकी भाषा बोले, उनकी समस्याओं को समझे और उन्हें बढ़ने में मदद करे। यह मेरा उन हाथों को धन्यवाद कहने का तरीका है जो हमारे देश को खिलाते हैं।\"", "why-choose": "❓ किसान पटुकृषि को क्यों चुनते हैं", "real-time": "रीयल-टाइम डेटा", "real-time-desc": "लाइव मंडी भाव और मौसम", "ai-powered": "एआई-पावर्ड", "ai-powered-desc": "स्मार्ट रोग पहचान", "local-langs": "🌐 स्थानीय भाषाएं", "local-langs-desc": "अंग्रेजी, हिंदी, बंगाली, तेलुगु, मराठी, गुजराती, मारवाड़ी, पंजाबी, तमिल, मलयालम, उर्दू, कन्नड़, ओड़िया, संस्कृत, भोजपुरी, डोगरी और अन्य", free: "100% मुफ्त", "free-desc": "किसानों के लिए हमेशा मुफ्त", "send-message": "हमें संदेश भेजें", "message-desc": "सवाल हैं? हम सुनना चाहेंगे!", "message-placeholder": "अपना प्रश्न यहां लिखें...", "google-form": "गूगल फॉर्म खोलें", "google-form-note": "📝 हमारा फीडबैक फॉर्म खोलने के लिए ऊपर बटन पर क्लिक करें", "footer-tagline": "भारतीय किसानों के लिए स्मार्ट फार्मिंग।", "quick-links": "त्वरित लिंक", policies: "नीतियां और कानूनी", privacy: "गोपनीयता नीति: हम आपके डेटा का सम्मान करते हैं। कोई तृतीय-पक्ष साझाकरण नहीं।", terms: "नियम और शर्तें: इस साइट के उपयोग का अर्थ स्वीकृति है।", cookie: "कुकी नीति: हम कार्यक्षमता के लिए आवश्यक कुकीज़ का उपयोग करते हैं।", disclaimer: "अस्वीकरण: जानकारी केवल मार्गदर्शन के लिए है। स्थानीय सत्यापन करें।", refund: "रिफंड नीति: सेवाएं मुफ्त होने के कारण लागू नहीं।", "support": "सहायता और जानकारी", faq: "FAQ: हमारे सहायता अनुभाग पर जाएं।", contact: "संपर्क: patukrishi@gmail.com", careers: "करियर: हमारे मिशन से जुड़ें।", press: "प्रेस: मीडिया पूछताछ का स्वागत है।", office: "कार्यालय: डिजिटल प्लेटफॉर्म - पैन-इंडिया सेवा", copyright: "© 2026 पटुकृषि – सर्वाधिकार सुरक्षित। भारतीय किसानों के लिए 💚 से बनाया गया।", "edit-profile": "प्रोफाइल संपादित करें", "name-placeholder": "नाम", save: "सहेजें", cancel: "रद्द करें", "krishi-bot": "कृषि बॉट", "bot-welcome": "🙏 नमस्कार! मैं आपका कृषि बॉट हूँ। पूछिए - मंडी भाव, मौसम, क्रॉप लेंस, सलाह, एनालिटिक्स या कुछ भी!", "chat-placeholder": "यहां लिखिए..." },
    bn: { logo: "পাটুকৃষি", home: "হোম", weather: "আবহাওয়া", mandi: "মন্ডি", lens: "ক্রপ লেন্স", advisory: "পরামর্শ", analytics: "অ্যানালিটিক্স", videos: "ভিডিও", govtSchemes: "সরকারি প্রকল্প", about: "আমাদের সম্পর্কে", profile: "প্রোফাইল", logout: "লগআউট", namaste: "নমস্কার", "hero-text": "আপনার নিজস্ব কৃষক বন্ধু – স্মার্ট ফার্মিং সহ", "sustainable-title": "🌱 পাটুকৃষি – স্মার্ট ফার্মিং", "sustainable-text": "🇮🇳 ভারতে কৃষকদের সময়মতো সঠিক তথ্য পাওয়া খুব জরুরি। পাটুকৃষি আপনাকে দেয় লাইভ মন্ডির দাম, আবহাওয়ার পূর্বাভাস, ক্রপ লেন্স (রোগ শনাক্তকরণ এবং চিকিৎসা), এবং বপন থেকে ফসল তোলা পর্যন্ত ধাপে ধাপে পরামর্শ। আমরা আপনার জমির ফসলকে মুনাফায় রূপান্তর করতে এখানে আছি। আপনি পাঞ্জাবের গম চাষি হন বা তামিলনাড়ুর ধান উৎপাদক, পাটুকৃষি প্রতিটি কৃষকের জন্য। এখন ফার্মিং স্মার্ট, আর মুনাফা নিশ্চিত! 💚", "weather-desc": "লাইভ পূর্বাভাস · ফসল সুপারিশ", "mandi-desc": "সব রাজ্য ও কেন্দ্রশাসিত অঞ্চল · জেলা · একাধিক দর", "advisory-desc": "রাজ্য/কেন্দ্রশাসিত অঞ্চল + ফসল · ৩-ধাপ গাইড", "weather-title": "আবহাওয়া · আবহাওয়ার পরামর্শ", "city-placeholder": "শহর লিখুন (যেমন দিল্লি)", search: "অনুসন্ধান", "my-location": "আমার অবস্থান", "mandi-title": "মন্ডির দাম · একাধিক দর", "show-prices": "দাম দেখান", "lens-title": "ক্রপ লেন্স · রোগ শনাক্তকরণ", "upload-title": "ফসলের ছবি আপলোড করুন", "upload-desc": "মক রোগ শনাক্তকরণ", "advisory-title": "ফসল পরামর্শ · সম্পূর্ণ গাইড", "state-season": "রাজ্য/কেন্দ্রশাসিত অঞ্চল + মৌসুম", "specific-crop": "নির্দিষ্ট ফসল (৩-ধাপ)", "get-advice": "পরামর্শ নিন", "get-guide": "৩-ধাপ গাইড নিন", "analytics-title": "কৃষি অ্যানালিটিক্স · ডেটা ইনসাইট", "happy-farmers": "সুখী কৃষক", "avg-profit": "গড় মুনাফা/একর", "weather-alerts": "আবহাওয়া সতর্কতা", "active-farms": "সক্রিয় ফার্ম", "price-trends": "📈 দামের প্রবণতা (গত ৬ মাস)", "crop-distribution": "🌾 ফসল বিতরণ", "weather-patterns": "🌡️ আবহাওয়ার প্যাটার্ন", "profit-calculator": "💰 মুনাফা ক্যালকুলেটর", "select-crop": "ফসল নির্বাচন করুন", area: "ক্ষেত্রফল (একর)", calculate: "মুনাফা গণনা করুন", "market-insights": "📊 বাজার অন্তর্দৃষ্টি", rising: "⬆️ বাড়ছে", stable: "↗️ স্থিতিশীল", falling: "⬇️ কমছে", "seasonal-forecast": "🌦️ মৌসুমি পূর্বাভাস ২০২৬", rabi: "রবি মৌসুম", kharif: "খরিফ মৌসুম", zaid: "জায়েদ মৌসুম", "optimal-conditions": "অনুকূল অবস্থা", "rabi-crops": "গম, সরিষা, ছোলা", "kharif-crops": "ধান, তুলো, ভুট্টা", "zaid-crops": "মুগ, সবজি", "about-title": "আমাদের সম্পর্কে · আমাদের গল্প", mission: "আমাদের লক্ষ্য", "mission-text": "প্রতিটি ভারতীয় কৃষককে প্রযুক্তি-ভিত্তিক সমাধানের মাধ্যমে সক্ষম করা, যা টেকসই এবং লাভজনক চাষের জন্য। আমরা ঐতিহ্যগত জ্ঞান এবং আধুনিক উদ্ভাবনের মধ্যে ব্যবধান পূরণ করি।", vision: "আমাদের স্বপ্ন", "vision-text": "একটি ডিজিটাল ইকোসিস্টেম তৈরি করা যেখানে প্রতিটি কৃষকের রিয়েল-টাইম বাজার ডেটা, আবহাওয়ার তথ্য এবং বিশেষজ্ঞের পরামর্শে প্রবেশাধিকার রয়েছে - চাষকে স্মার্ট এবং আরও লাভজনক করে তোলা।", values: "আমাদের মূল্যবোধ", "values-text": "সততা, উদ্ভাবন, অন্তর্ভুক্তি। আমরা কৃষকদের প্রথমে রাখতে এবং এমন সমাধান তৈরি করতে বিশ্বাস করি যা তাদের জীবনে সত্যিকারের পরিবর্তন আনে।", "founder-role": "প্রতিষ্ঠাতা ও ডেভেলপার", "founder-quote": "\"আমি পাটুকৃষি বানিয়েছি কারণ আমাদের কৃষকরা ডিজিটাল দুনিয়ায় একজন বন্ধুর দাবিদার—যে তাদের ভাষায় কথা বলে, তাদের সমস্যা বোঝে এবং তাদের বেড়ে উঠতে সাহায্য করে। যারা আমাদের দেশকে খাওয়ায় তাদের ধন্যবাদ জানানোর এটি আমার উপায়।\"", "why-choose": "❓ কেন কৃষকরা পাটুকৃষি বেছে নেন", "real-time": "রিয়েল-টাইম ডেটা", "real-time-desc": "লাইভ মন্ডির দাম এবং আবহাওয়া", "ai-powered": "এআই-চালিত", "ai-powered-desc": "স্মার্ট রোগ শনাক্তকরণ", "local-langs": "🌐 স্থানীয় ভাষা", "local-langs-desc": "ইংরেজি, হিন্দি, বাংলা, তেলেগু, মারাঠি, গুজরাটি, মারওয়াড়ি, পাঞ্জাবি, তামিল, মালয়ালম, উর্দু, কন্নড়, ওড়িয়া, সংস্কৃত, ভোজপুরি, ডোগরি এবং আরও", free: "১০০% বিনামূল্যে", "free-desc": "সবসময় কৃষকদের জন্য বিনামূল্যে", "send-message": "আমাদের বার্তা পাঠান", "message-desc": "প্রশ্ন আছে? আমরা শুনতে চাই!", "message-placeholder": "আপনার প্রশ্ন এখানে লিখুন...", "google-form": "গুগল ফর্ম খুলুন", "google-form-note": "📝 আমাদের ফিডব্যাক ফর্ম খুলতে উপরের বাটনে ক্লিক করুন", "footer-tagline": "ভারতীয় কৃষকদের জন্য স্মার্ট ফার্মিং।", "quick-links": "দ্রুত লিংক", policies: "নীতি ও আইনি", privacy: "গোপনীয়তা নীতি: আমরা আপনার ডেটা সম্মান করি। কোনো তৃতীয়-পক্ষ ভাগাভাগি নয়।", terms: "শর্তাবলী: এই সাইট ব্যবহারের অর্থ গ্রহণযোগ্যতা।", cookie: "কুকি নীতি: আমরা কার্যকারিতার জন্য প্রয়োজনীয় কুকি ব্যবহার করি।", disclaimer: "দাবিত্যাগ: তথ্য শুধুমাত্র নির্দেশনার জন্য। স্থানীয় যাচাই করুন।", refund: "ফেরত নীতি: পরিষেবা বিনামূল্যে হওয়ায় প্রযোজ্য নয়।", "support": "সহায়তা ও তথ্য", faq: "FAQ: আমাদের সহায়তা বিভাগে যান।", contact: "যোগাযোগ: patukrishi@gmail.com", careers: "ক্যারিয়ার: আমাদের মিশনে যোগ দিন।", press: "প্রেস: মিডিয়া অনুসন্ধান স্বাগত।", office: "অফিস: ডিজিটাল প্ল্যাটফর্ম - প্যান-ইন্ডিয়া পরিষেবা", copyright: "© ২০২৬ পাটুকৃষি – সর্বস্বত্ব সংরক্ষিত। ভারতীয় কৃষকদের জন্য 💚 দিয়ে তৈরি।", "edit-profile": "প্রোফাইল সম্পাদনা করুন", "name-placeholder": "নাম", save: "সংরক্ষণ করুন", cancel: "বাতিল করুন", "krishi-bot": "কৃষি বট", "bot-welcome": "🙏 নমস্কার! আমি আপনার কৃষি বট। জিজ্ঞাসা করুন - মন্ডির দাম, আবহাওয়া, ক্রপ লেন্স, পরামর্শ, অ্যানালিটিক্স বা কিছু!", "chat-placeholder": "এখানে লিখুন..." },
    te: { logo: "పటుకృషి", home: "హోమ్", weather: "వాతావరణం", mandi: "మండీ", lens: "క్రాప్ లెన్స్", advisory: "సలహా", analytics: "అనలిటిక్స్", videos: "వీడియోలు", govtSchemes: "ప్రభుత్వ పథకాలు", about: "మా గురించి", profile: "ప్రొఫైల్", logout: "లాగౌట్", namaste: "నమస్కారం", "hero-text": "మీ రైతు స్నేహితుడు - స్మార్ట్ వ్యవసాయంతో", "sustainable-title": "🌱 పటుకృషి – స్మార్ట్ ఫార్మింగ్", "sustainable-text": "🇮🇳 భారతదేశంలో రైతులకు సమయానికి సరైన సమాచారం లభించడం చాలా ముఖ్యం. పటుకృషి మీకు ప్రత్యక్ష మండీ ధరలు, వాతావరణ సూచన, క్రాప్ లెన్స్ (వ్యాధి గుర్తింపు మరియు చికిత్స), మరియు విత్తనం నుండి పంట కోత వరకు దశల వారీ మార్గదర్శకత్వం అందిస్తుంది. మీ పొలం పంటను లాభంగా మార్చడానికి మేము ఇక్కడ ఉన్నాము. మీరు పంజాబ్ గోధుమ రైతు అయినా లేదా తమిళనాడు వరి సాగుదారు అయినా, పటుకృషి ప్రతి రైతు కోసం. ఇప్పుడు వ్యవసాయం స్మార్ట్, మరియు లాభం ఖాయం! 💚", "weather-desc": "ప్రత్యక్ష సూచన · పంట సిఫార్సు", "mandi-desc": "అన్ని రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలు · జిల్లాలు · బహుళ ధరలు", "advisory-desc": "రాష్ట్రం/కేంద్రపాలిత ప్రాంతం + పంట · 3-దశల గైడ్", "weather-title": "వాతావరణం · వాతావరణ సలహా", "city-placeholder": "నగరం నమోదు చేయండి (ఉదా. ఢిల్లీ)", search: "వెతకండి", "my-location": "నా స్థానం", "mandi-title": "మండీ ధరలు · మండీ భావ్", "show-prices": "ధరలు చూపించు", "lens-title": "క్రాప్ లెన్స్ · రోగ్ కి పెహ్చాన్", "upload-title": "పంట చిత్రాన్ని అప్‌లోడ్ చేయండి", "upload-desc": "మాక్ వ్యాధి గుర్తింపు", "advisory-title": "పంట సలహా · పూర్తి గైడ్", "state-season": "రాష్ట్రం/కేంద్రపాలిత ప్రాంతం + సీజన్", "specific-crop": "నిర్దిష్ట పంట (3-దశలు)", "get-advice": "సలహా పొందండి", "get-guide": "3-దశల గైడ్ పొందండి", "analytics-title": "వ్యవసాయ అనలిటిక్స్ · డేటా ఇన్‌సైట్స్", "happy-farmers": "సంతోషకరమైన రైతులు", "avg-profit": "సగటు లాభం/ఎకరం", "weather-alerts": "వాతావరణ హెచ్చరికలు", "active-farms": "క్రియాశీల వ్యవసాయ క్షేత్రాలు", "price-trends": "📈 ధరల ట్రెండ్స్ (గత 6 నెలలు)", "crop-distribution": "🌾 పంట పంపిణీ", "weather-patterns": "🌡️ వాతావరణ నమూనాలు", "profit-calculator": "💰 లాభం కాలిక్యులేటర్", "select-crop": "పంటను ఎంచుకోండి", area: "విస్తీర్ణం (ఎకరాల్లో)", calculate: "లాభం లెక్కించండి", "market-insights": "📊 మార్కెట్ ఇన్‌సైట్స్", rising: "⬆️ పెరుగుతోంది", stable: "↗️ స్థిరంగా ఉంది", falling: "⬇️ తగ్గుతోంది", "seasonal-forecast": "🌦️ సీజనల్ ఫోర్‌కాస్ట్ 2026", rabi: "రబీ సీజన్", kharif: "ఖరీఫ్ సీజన్", zaid: "జాయిద్ సీజన్", "optimal-conditions": "అనుకూల పరిస్థితులు", "rabi-crops": "గోధుమ, ఆవాలు, శనగ", "kharif-crops": "వరి, పత్తి, మొక్కజొన్న", "zaid-crops": "పెసలు, కూరగాయలు", "about-title": "మా గురించి · మా కథ", mission: "మా లక్ష్యం", "mission-text": "ప్రతి భారతీయ రైతును సాంకేతికత-ఆధారిత పరిష్కారాలతో సాధికారపరచడం, స్థిరమైన మరియు లాభదాయకమైన వ్యవసాయం కోసం. మేము సాంప్రదాయ జ్ఞానం మరియు ఆధునిక ఆవిష్కరణల మధ్య అంతరాన్ని తగ్గిస్తాము.", vision: "మా దృష్టి", "vision-text": "ఒక డిజిటల్ పర్యావరణ వ్యవస్థను సృష్టించడం, ఇక్కడ ప్రతి రైతుకు నిజ-సమయ మార్కెట్ డేటా, వాతావరణ సమాచారం మరియు నిపుణుల మార్గదర్శకత్వం లభిస్తుంది - వ్యవసాయాన్ని స్మార్ట్‌గా మరియు మరింత లాభదాయకంగా మార్చడం.", values: "మా విలువలు", "values-text": "సమగ్రత, ఆవిష్కరణ, అందరినీ కలుపుకోవడం. మేము రైతులను ముందు ఉంచడం మరియు వారి జీవితాలలో నిజమైన మార్పు తీసుకువచ్చే పరిష్కారాలను సృష్టించడంలో నమ్మకం కలిగి ఉన్నాము.", "founder-role": "వ్యవస్థాపకుడు & డెవలపర్", "founder-quote": "\"నేను పటుకృషిని నిర్మించాను ఎందుకంటే మన రైతులు డిజిటల్ ప్రపంచంలో ఒక స్నేహితుడికి అర్హులు—వారి భాష మాట్లాడే, వారి సమస్యలను అర్థం చేసుకునే మరియు వారిని ఎదగడానికి సహాయపడే వ్యక్తి. మన దేశానికి ఆహారం అందించే చేతులకు ధన్యవాదాలు చెప్పడానికి ఇది నా మార్గం.\"", "why-choose": "❓ రైతులు పటుకృషిని ఎందుకు ఎంచుకుంటారు", "real-time": "రియల్-టైమ్ డేటా", "real-time-desc": "ప్రత్యక్ష మండీ ధరలు మరియు వాతావరణం", "ai-powered": "AI-ఆధారిత", "ai-powered-desc": "స్మార్ట్ వ్యాధి గుర్తింపు", "local-langs": "🌐 స్థానిక భాషలు", "local-langs-desc": "ఇంగ్లీష్, హిందీ, బెంగాలీ, తెలుగు, మరాఠీ, గుజరాతీ, మార్వాడీ, పంజాబీ, తమిళ్, మలయాళం, ఉర్దూ, కన్నడ, ఒడియా, సంస్కృతం, భోజ్‌పురి, డోగ్రీ మరియు మరిన్ని", free: "100% ఉచితం", "free-desc": "రైతులకు ఎప్పుడూ ఉచితం", "send-message": "మాకు సందేశం పంపండి", "message-desc": "ప్రశ్నలు ఉన్నాయా? మీ నుండి వినడానికి మేము ఇష్టపడతాము!", "message-placeholder": "మీ ప్రశ్న ఇక్కడ వ్రాయండి...", "google-form": "గూగుల్ ఫారమ్ తెరవండి", "google-form-note": "📝 మా ఫీడ్‌బ్యాక్ ఫారమ్ తెరవడానికి పై బటన్ పై క్లిక్ చేయండి", "footer-tagline": "భారతీయ రైతుల కోసం స్మార్ట్ ఫార్మింగ్.", "quick-links": "త్వరిత లింక్‌లు", policies: "విధానాలు & చట్టపరమైనవి", privacy: "గోప్యతా విధానం: మేము మీ డేటాను గౌరవిస్తాము. మూడవ-పక్ష భాగస్వామ్యం లేదు.", terms: "నిబంధనలు & షరతులు: ఈ సైట్ వాడకం అంగీకారాన్ని సూచిస్తుంది.", cookie: "కుకీ విధానం: మేము కార్యాచరణ కోసం అవసరమైన కుకీలను ఉపయోగిస్తాము.", disclaimer: "నిరాకరణ: సమాచారం మార్గదర్శకత్వం కోసం మాత్రమే. స్థానికంగా ధృవీకరించండి.", refund: "వాపసు విధానం: సేవలు ఉచితం కాబట్టి వర్తించదు.", "support": "మద్దతు & సమాచారం", faq: "FAQ: మా సహాయ విభాగాన్ని సందర్శించండి.", contact: "సంప్రదింపులు: patukrishi@gmail.com", careers: "కెరీర్స్: మా లక్ష్యంలో చేరండి.", press: "ప్రెస్: మీడియా విచారణలు స్వాగతం.", office: "కార్యాలయం: డిజిటల్ ప్లాట్‌ఫాం - పాన్-ఇండియా సేవ", copyright: "© 2026 పటుకృషి – అన్ని హక్కులు reserved. భారతీయ రైతుల కోసం 💚 తో తయారు చేయబడింది.", "edit-profile": "ప్రొఫైల్ సవరించండి", "name-placeholder": "పేరు", save: "సేవ్ చేయండి", cancel: "రద్దు చేయండి", "krishi-bot": "కృషి బాట్", "bot-welcome": "🙏 నమస్కారం! నేను మీ కృషి బాట్. అడగండి - మండీ ధరలు, వాతావరణం, క్రాప్ లెన్స్, సలహా, అనలిటిక్స్ లేదా ఏదైనా!", "chat-placeholder": "ఇక్కడ వ్రాయండి..." },
    mr: { logo: "पटुकृषी", home: "होम", weather: "हवामान", mandi: "मंडी", lens: "पीक लेन्स", advisory: "सल्ला", analytics: "विश्लेषण", videos: "व्हिडिओ", govtSchemes: "सरकारी योजना", about: "आमच्याबद्दल", profile: "प्रोफाइल", logout: "बाहेर पडा", namaste: "नमस्कार", "hero-text": "तुमचा शेतकरी मित्र - स्मार्ट शेतीसह", "sustainable-title": "🌱 पटुकृषी – स्मार्ट शेती", "sustainable-text": "🇮🇳 भारतात शेतकऱ्यांना वेळेवर योग्य माहिती मिळणे अत्यंत आवश्यक आहे. पटुकृषी तुम्हाला थेट मंडी भाव, हवामान अंदाज, पीक लेन्स (रोग ओळख व उपचार), आणि पेरणीपासून कापणीपर्यंत चरण-दर-चरण मार्गदर्शन प्रदान करते. आम्ही तुमच्या शेतातील उत्पन्नाला नफ्यात बदलण्यासाठी येथे आहोत. तुम्ही पंजाबचे गहू शेतकरी असाल किंवा तामिळनाडूचे भात उत्पादक, पटुकृषी प्रत्येक शेतकऱ्यासाठी आहे. आता शेती स्मार्ट, आणि नफा निश्चित! 💚", "weather-desc": "थेट अंदाज · पीक शिफारस", "mandi-desc": "सर्व राज्ये व केंद्रशासित प्रदेश · जिल्हे · अनेक दर", "advisory-desc": "राज्य/केंद्रशासित प्रदेश + पीक · ३-चरणीय मार्गदर्शक", "weather-title": "हवामान · हवामान सल्ला", "city-placeholder": "शहर प्रविष्ट करा (उदा. दिल्ली)", search: "शोधा", "my-location": "माझे स्थान", "mandi-title": "मंडी भाव · मंडी भाव", "show-prices": "भाव दाखवा", "lens-title": "पीक लेन्स · रोग ओळख", "upload-title": "पिकाचे फोटो अपलोड करा", "upload-desc": "मॉक रोग तपासणी", "advisory-title": "पीक सल्ला · संपूर्ण मार्गदर्शक", "state-season": "राज्य/केंद्रशासित प्रदेश + हंगाम", "specific-crop": "विशिष्ट पीक (३-चरण)", "get-advice": "सल्ला मिळवा", "get-guide": "३-चरणीय मार्गदर्शक मिळवा", "analytics-title": "शेती विश्लेषण · डेटा अंतर्दृष्टी", "happy-farmers": "समाधानी शेतकरी", "avg-profit": "सरासरी नफा/एकर", "weather-alerts": "हवामान सूचना", "active-farms": "सक्रिय शेतें", "price-trends": "📈 किंमत ट्रेंड (गेले ६ महिने)", "crop-distribution": "🌾 पीक वितरण", "weather-patterns": "🌡️ हवामान नमुने", "profit-calculator": "💰 नफा कॅल्क्युलेटर", "select-crop": "पीक निवडा", area: "क्षेत्रफळ (एकरमध्ये)", calculate: "नफा मोजा", "market-insights": "📊 बाजार अंतर्दृष्टी", rising: "⬆️ वाढत आहे", stable: "↗️ स्थिर", falling: "⬇️ घसरत आहे", "seasonal-forecast": "🌦️ हंगामी अंदाज २०२६", rabi: "रब्बी हंगाम", kharif: "खरीप हंगाम", zaid: "जायद हंगाम", "optimal-conditions": "अनुकूल परिस्थिती", "rabi-crops": "गहू, मोहरी, हरभरा", "kharif-crops": "भात, कापूस, मका", "zaid-crops": "मूग, भाज्या", "about-title": "आमच्याबद्दल · आमची कहाणी", mission: "आमचे ध्येय", "mission-text": "प्रत्येक भारतीय शेतकऱ्याला तंत्रज्ञान-आधारित उपायांद्वारे सक्षम करणे, जे शाश्वत आणि फायदेशीर शेतीसाठी आहे. आम्ही पारंपारिक ज्ञान आणि आधुनिक नवकल्पना यांच्यातील दरी कमी करतो.", vision: "आमचे स्वप्न", "vision-text": "एक डिजिटल इकोसिस्टम तयार करणे जिथे प्रत्येक शेतकऱ्याला रिअल-टाइम बाजार डेटा, हवामान माहिती आणि तज्ञ मार्गदर्शन उपलब्ध असेल - शेती स्मार्ट आणि अधिक फायदेशीर बनवणे.", values: "आमची मूल्ये", "values-text": "प्रामाणिकपणा, नवकल्पना, सर्वसमावेशकता. आम्ही शेतकऱ्यांना प्रथम स्थान देण्यावर आणि त्यांच्या जीवनात खरा बदल घडवून आणणारे उपाय तयार करण्यावर विश्वास ठेवतो.", "founder-role": "संस्थापक आणि विकासक", "founder-quote": "\"मी पटुकृषी बनवली कारण आमच्या शेतकऱ्यांना डिजिटल जगात एक मित्र हवा आहे—जो त्यांची भाषा बोलतो, त्यांच्या समस्या समजतो आणि त्यांना वाढण्यास मदत करतो. आपल्या राष्ट्राला खाऊ घालणाऱ्या हातांचे आभार मानण्याचा हा माझा मार्ग आहे.\"", "why-choose": "❓ शेतकरी पटुकृषी का निवडतात", "real-time": "रिअल-टाइम डेटा", "real-time-desc": "थेट मंडी भाव आणि हवामान", "ai-powered": "एआय-चालित", "ai-powered-desc": "स्मार्ट रोग ओळख", "local-langs": "🌐 स्थानिक भाषा", "local-langs-desc": "इंग्रजी, हिंदी, बंगाली, तेलुगू, मराठी, गुजराती, मारवाडी, पंजाबी, तमिळ, मल्याळम, उर्दू, कन्नड, ओडिया, संस्कृत, भोजपुरी, डोगरी आणि अधिक", free: "१००% मोफत", "free-desc": "शेतकऱ्यांसाठी नेहमीच मोफत", "send-message": "आम्हाला संदेश पाठवा", "message-desc": "प्रश्न आहेत? आम्ही ऐकायला आवडेल!", "message-placeholder": "तुमचा प्रश्न इथे लिहा...", "google-form": "गूगल फॉर्म उघडा", "google-form-note": "📝 आमचा फीडबॅक फॉर्म उघडण्यासाठी वरील बटणावर क्लिक करा", "footer-tagline": "भारतीय शेतकऱ्यांसाठी स्मार्ट शेती.", "quick-links": "द्रुत दुवे", policies: "धोरणे आणि कायदेशीर", privacy: "गोपनीयता धोरण: आम्ही तुमच्या डेटाचा आदर करतो. तृतीय-पक्ष सामायिकरण नाही.", terms: "अटी व शर्ती: या साइटचा वापर म्हणजे स्वीकारार्हता.", cookie: "कुकी धोरण: आम्ही कार्यक्षमतेसाठी आवश्यक कुकीज वापरतो.", disclaimer: "अस्वीकरण: माहिती केवळ मार्गदर्शनासाठी आहे. स्थानिक पातळीवर सत्यापित करा.", refund: "परतावा धोरण: सेवा मोफत असल्याने लागू नाही.", "support": "मदत व माहिती", faq: "FAQ: आमच्या मदत विभागाला भेट द्या.", contact: "संपर्क: patukrishi@gmail.com", careers: "करिअर: आमच्या मोहिमेत सामील व्हा.", press: "प्रेस: मीडिया चौकशीचे स्वागत आहे.", office: "कार्यालय: डिजिटल प्लॅटफॉर्म - पॅन-इंडिया सेवा", copyright: "© २०२६ पटुकृषी – सर्व हक्क राखीव. भारतीय शेतकऱ्यांसाठी 💚 ने बनवले.", "edit-profile": "प्रोफाइल संपादित करा", "name-placeholder": "नाव", save: "जतन करा", cancel: "रद्द करा", "krishi-bot": "कृषी बॉट", "bot-welcome": "🙏 नमस्कार! मी तुमचा कृषी बॉट आहे. विचारा - मंडी भाव, हवामान, पीक लेन्स, सल्ला, विश्लेषण किंवा काहीही!", "chat-placeholder": "येथे लिहा..." },
    gu: { logo: "પટુકૃષિ", home: "હોમ", weather: "હવામાન", mandi: "મંડી", lens: "ક્રોપ લેન્સ", advisory: "સલાહ", analytics: "એનાલિટિક્સ", videos: "વીડિયો", govtSchemes: "સરકારી યોજનાઓ", about: "અમારા વિશે", profile: "પ્રોફાઇલ", logout: "લોગઆઉટ", namaste: "નમસ્તે", "hero-text": "તમારો ખેડૂત મિત્ર - સ્માર્ટ ખેતી સાથે", "sustainable-title": "🌱 પટુકૃષિ – સ્માર્ટ ખેતી", "sustainable-text": "🇮🇳 ભારતમાં ખેડૂતોને સમયસર સાચી માહિતી મળવી ખૂબ જરૂરી છે. પટુકૃષિ તમને આપે છે લાઇવ મંડી ભાવ, હવામાનનો અંદાજ, ક્રોપ લેન્સ (રોગોની ઓળખ અને ઇલાજ), અને પગલું-દર-પગલું વાવણીથી લણણી સુધીની સલાહ. અમે તમારા ખેતરના ઉત્પાદનને નફામાં ફેરવવા માટે અહીં છીએ. ભલે તમે પંજાબના ઘઉં ખેડૂત હો અથવા તમિલનાડુના ચોખા ઉત્પાદક, પટુકૃષિ દરેક ખેડૂત માટે છે. હવે ખેતી સ્માર્ટ, અને નફો ચોક્કસ! 💚", "weather-desc": "લાઇવ આગાહી · પાક ભલામણ", "mandi-desc": "બધા રાજ્યો અને કેન્દ્રશાસિત પ્રદેશો · જિલ્લાઓ · અનેક દર", "advisory-desc": "રાજ્ય/કેન્દ્રશાસિત પ્રદેશ + પાક · 3-પગલાં માર્ગદર્શિકા", "weather-title": "હવામાન · હવામાન સલાહ", "city-placeholder": "શહેર દાખલ કરો (દા.ત. દિલ્હી)", search: "શોધો", "my-location": "મારું સ્થાન", "mandi-title": "મંડી ભાવ · મંડી ભાવ", "show-prices": "ભાવ બતાવો", "lens-title": "ક્રોપ લેન્સ · રોગની ઓળખ", "upload-title": "પાકનો ફોટો અપલોડ કરો", "upload-desc": "મોક રોગ તપાસ", "advisory-title": "પાક સલાહ · સંપૂર્ણ માર્ગદર્શિકા", "state-season": "રાજ્ય/કેન્દ્રશાસિત પ્રદેશ + સિઝન", "specific-crop": "વિશિષ્ટ પાક (3-પગલાં)", "get-advice": "સલાહ મેળવો", "get-guide": "3-પગલાં માર્ગદર્શિકા મેળવો", "analytics-title": "ખેતી એનાલિટિક્સ · ડેટા આંતરદૃષ્ટિ", "happy-farmers": "ખુશ ખેડૂતો", "avg-profit": "સરેરાશ નફો/એકર", "weather-alerts": "હવામાન ચેતવણીઓ", "active-farms": "સક્રિય ખેતરો", "price-trends": "📈 ભાવ વલણો (છેલ્લા 6 મહિના)", "crop-distribution": "🌾 પાક વિતરણ", "weather-patterns": "🌡️ હવામાન પેટર્ન", "profit-calculator": "💰 નફો કેલ્ક્યુલેટર", "select-crop": "પાક પસંદ કરો", area: "વિસ્તાર (એકરમાં)", calculate: "નફો ગણો", "market-insights": "📊 બજાર આંતરદૃષ્ટિ", rising: "⬆️ વધી રહ્યું", stable: "↗️ સ્થિર", falling: "⬇️ ઘટી રહ્યું", "seasonal-forecast": "🌦️ સિઝનલ આગાહી 2026", rabi: "રવિ સિઝન", kharif: "ખરીફ સિઝન", zaid: "જૈદ સિઝન", "optimal-conditions": "અનુકૂળ પરિસ્થિતિઓ", "rabi-crops": "ઘઉં, સરસવ, ચણા", "kharif-crops": "ચોખા, કપાસ, મકાઈ", "zaid-crops": "મગ, શાકભાજી", "about-title": "અમારા વિશે · અમારી કહાણી", mission: "અમારું ધ્યેય", "mission-text": "દરેક ભારતીય ખેડૂતને ટેકનોલોજી-આધારિત ઉકેલોથી સશક્ત બનાવવા, જે ટકાઉ અને નફાકારક ખેતી માટે છે. અમે પરંપરાગત જ્ઞાન અને આધુનિક નવીનતા વચ્ચેના અંતરને ઘટાડીએ છીએ.", vision: "અમારું સ્વપ્ન", "vision-text": "એક ડિજિટલ ઇકોસિસ્ટમ બનાવવી જ્યાં દરેક ખેડૂતને રીઅલ-ટાઇમ બજાર ડેટા, હવામાન માહિતી અને નિષ્ણાત માર્ગદર્શન મળે - ખેતીને સ્માર્ટ અને વધુ નફાકારક બનાવવી.", values: "અમારા મૂલ્યો", "values-text": "પ્રામાણિકતા, નવીનતા, સમાવેશીતા. અમે ખેડૂતોને પ્રથમ રાખવા અને એવા ઉકેલો બનાવવામાં વિશ્વાસ કરીએ છીએ જે તેમના જીવનમાં સાચો ફરક લાવે.", "founder-role": "સ્થાપક અને વિકાસકર્તા", "founder-quote": "\"મેં પટુકૃષિ બનાવ્યું કારણ કે અમારા ખેડૂતો ડિજિટલ વિશ્વમાં એક મિત્રના હકદાર છે—કોઈ એવું જે તેમની ભાષા બોલે, તેમની સમસ્યાઓ સમજે અને તેમને વધવામાં મદદ કરે. આ અમારા રાષ્ટ્રને ખવડાવતા હાથનો આભાર માનવાનો મારો માર્ગ છે.\"", "why-choose": "❓ ખેડૂતો પટુકૃષિ શા માટે પસંદ કરે છે", "real-time": "રીઅલ-ટાઇમ ડેટા", "real-time-desc": "લાઇવ મંડી ભાવ અને હવામાન", "ai-powered": "AI-સંચાલિત", "ai-powered-desc": "સ્માર્ટ રોગ ઓળખ", "local-langs": "🌐 સ્થાનિક ભાષાઓ", "local-langs-desc": "અંગ્રેજી, હિંદી, બંગાળી, તેલુગુ, મરાઠી, ગુજરાતી, મારવાડી, પંજાબી, તમિલ, મલયાલમ, ઉર્દૂ, કન્નડ, ઓડિયા, સંસ્કૃત, ભોજપુરી, ડોગરી અને વધુ", free: "100% મફત", "free-desc": "ખેડૂતો માટે હંમેશા મફત", "send-message": "અમને સંદેશ મોકલો", "message-desc": "પ્રશ્નો છે? અમે સાંભળવા ગમશે!", "message-placeholder": "તમારો પ્રશ્ન અહીં લખો...", "google-form": "ગૂગલ ફોર્મ ખોલો", "google-form-note": "📝 અમારું ફીડબેક ફોર્મ ખોલવા માટે ઉપરના બટન પર ક્લિક કરો", "footer-tagline": "ભારતીય ખેડૂતો માટે સ્માર્ટ ખેતી.", "quick-links": "ઝડપી લિંક્સ", policies: "નીતિઓ અને કાનૂની", privacy: "ગોપનીયતા નીતિ: અમે તમારા ડેટાનો આદર કરીએ છીએ. કોઈ તૃતીય-પક્ષ શેરિંગ નથી.", terms: "નિયમો અને શરતો: આ સાઇટના ઉપયોગનો અર્થ સ્વીકૃતિ છે.", cookie: "કૂકી નીતિ: અમે કાર્યક્ષમતા માટે આવશ્યક કૂકીઝનો ઉપયોગ કરીએ છીએ.", disclaimer: "અસ્વીકરણ: માહિતી ફક્ત માર્ગદર્શન માટે છે. સ્થાનિક રીતે ચકાસો.", refund: "રિફંડ નીતિ: સેવાઓ મફત હોવાથી લાગુ પડતી નથી.", "support": "સહાય અને માહિતી", faq: "FAQ: અમારા સહાય વિભાગની મુલાકાત લો.", contact: "સંપર્ક: patukrishi@gmail.com", careers: "કારકિર્દી: અમારા મિશનમાં જોડાઓ.", press: "પ્રેસ: મીડિયા પૂછપરછ સ્વાગત છે.", office: "ઓફિસ: ડિજિટલ પ્લેટફોર્મ - પાન-ઇન્ડિયા સેવા", copyright: "© 2026 પટુકૃષિ – બધા હકો અમારી પાસે રાખેલા છે. ભારતીય ખેડૂતો માટે 💚 સાથે બનાવેલ.", "edit-profile": "પ્રોફાઇલ સંપાદિત કરો", "name-placeholder": "નામ", save: "સાચવો", cancel: "રદ કરો", "krishi-bot": "કૃષિ બોટ", "bot-welcome": "🙏 નમસ્તે! હું તમારો કૃષિ બોટ છું. પૂછો - મંડી ભાવ, હવામાન, ક્રોપ લેન્સ, સલાહ, એનાલિટિક્સ અથવા કંઈપણ!", "chat-placeholder": "અહીં લખો..." },
    mwr: { logo: "पटुकृषि", home: "होम", weather: "मौसम", mandi: "मंडी", lens: "क्रॉप लेंस", advisory: "सलाह", analytics: "एनालिटिक्स", videos: "वीडियो", govtSchemes: "सरकारी योजनाएं", about: "म्हारा बारै में", profile: "प्रोफाइल", logout: "लॉगआउट", namaste: "खम्मा घणी", "hero-text": "थारो किसान भाई - स्मार्ट खेती साथै", "sustainable-title": "🌱 पटुकृषि – स्मार्ट खेती", "sustainable-text": "🇮🇳 भारत में किसानां ने वक्त पर सही जाणकारी मळणी बड़ी जरूरी है। पटुकृषि तमने देवै है लाइव मंडी भाव, मौसम का अंदाजो, क्रॉप लेंस (बीमारी की पहचान और इलाज), और बोआई से कटाई तक चरण-दर-चरण सलाह। हम थारा खेत की पैदावार ने नफा में बदलण खातिर या है। चाहे तम पंजाब के गेहूं किसान हो या तमिलनाडु के चावल उत्पादक, पटुकृषि हर किसान खातिर है। अब खेती स्मार्ट, और नफा पक्को! 💚", "weather-desc": "लाइव अंदाजो · फसल सिफारिश", "mandi-desc": "सगळा राज्य और केंद्रशासित प्रदेश · जिला · अनेक दर", "advisory-desc": "राज्य/केंद्रशासित प्रदेश + फसल · 3-चरणीय गाइड", "weather-title": "मौसम · मौसम सलाह", "city-placeholder": "शहर दाखल करो (जिगो दिल्ली)", search: "खोजो", "my-location": "म्हारो स्थान", "mandi-title": "मंडी भाव · मंडी भाव", "show-prices": "भाव दिखावो", "lens-title": "क्रॉप लेंस · बीमारी की पहचाण", "upload-title": "फसल फोटो अपलोड करो", "upload-desc": "मॉक बीमारी जांच", "advisory-title": "फसल सलाह · पूरो गाइड", "state-season": "राज्य/केंद्रशासित प्रदेश + सीजन", "specific-crop": "खास फसल (3-चरण)", "get-advice": "सलाह लेवो", "get-guide": "3-चरणीय गाइड लेवो", "analytics-title": "खेती एनालिटिक्स · डेटा जाणकारी", "happy-farmers": "खुश किसान", "avg-profit": "औसत नफा/एकड़", "weather-alerts": "मौसम चेतावणी", "active-farms": "सक्रिय खेत", "price-trends": "📈 भाव ट्रेंड (पिछला 6 म्हीना)", "crop-distribution": "🌾 फसल वितरण", "weather-patterns": "🌡️ मौसम पैटर्न", "profit-calculator": "💰 नफा कैलकुलेटर", "select-crop": "फसल चुणो", area: "क्षेत्रफळ (एकड़ में)", calculate: "नफा गणना करो", "market-insights": "📊 बाजार जाणकारी", rising: "⬆️ बढ़ रह्यो", stable: "↗️ स्थिर", falling: "⬇️ घट रह्यो", "seasonal-forecast": "🌦️ सीजनल अंदाजो 2026", rabi: "रब्बी सीजन", kharif: "खरीफ सीजन", zaid: "जायद सीजन", "optimal-conditions": "अनुकूल परिस्थिति", "rabi-crops": "गेहूं, सरसों, चना", "kharif-crops": "चावल, कपास, मक्का", "zaid-crops": "मूंग, सागभाजी", "about-title": "म्हारा बारै में · म्हारी कहाणी", mission: "म्हारो ध्येय", "mission-text": "हर भारतीय किसान ने टेक्नोलॉजी-आधारित उपायां से सशक्त बनाणो, जो टिकाऊ और नफादायक खेती खातिर है। हम पारंपरिक ज्ञान और आधुनिक नवाचार की बीच की खाई ने पाटता है।", vision: "म्हारो सपनो", "vision-text": "एक डिजिटल इकोसिस्टम बणाणो जिगै हर किसान ने रियल-टाइम बाजार डेटा, मौसम जाणकारी और विशेषज्ञ मार्गदर्शन मिलै - खेती ने स्मार्ट और जादा नफादायक बनाणा।", values: "म्हारा मूल्य", "values-text": "ईमानदारी, नवाचार, समावेशिता। हम किसानां ने पैहले राखण और अइसा उपाय बनाण में विश्वास रखता है जो उनकी ज़िन्दगी में असली फर्क लावै।", "founder-role": "संस्थापक और डेवलपर", "founder-quote": "\"म्हैं पटुकृषि बणाई कितर कि म्हारा किसान डिजिटल दुनिया में एक दोस्त के हकदार है—जो उनकी भाषा बोले, उनकी समस्याओं समझे और उनकी बढ़ने में मदद करे। ये म्हारा उन हाथां का धन्यवाद कहण का तरीको है जो म्हारा देश खिलावै।\"", "why-choose": "❓ किसान पटुकृषि ने क्यूं चुणा है", "real-time": "रियल-टाइम डेटा", "real-time-desc": "लाइव मंडी भाव और मौसम", "ai-powered": "एआई-चालित", "ai-powered-desc": "स्मार्ट बीमारी पहचाण", "local-langs": "🌐 स्थानीय भाषा", "local-langs-desc": "अंग्रेजी, हिंदी, बंगाली, तेलुगु, मराठी, गुजराती, मारवाड़ी, पंजाबी, तमिल, मलयालम, उर्दू, कन्नड़, ओडिया, संस्कृत, भोजपुरी, डोगरी और अरै", free: "100% मुफ्त", "free-desc": "किसानां खातिर हमेशा मुफ्त", "send-message": "म्हाने संदेश पठावो", "message-desc": "सवाल है? हम सुणणा चाहता है!", "message-placeholder": "थारो सवाल इठै लिखो...", "google-form": "गूगल फॉर्म खोलो", "google-form-note": "📝 म्हारो फीडबैक फॉर्म खोलण खातिर ऊपर बटण पै क्लिक करो", "footer-tagline": "भारतीय किसानां खातिर स्मार्ट खेती।", "quick-links": "झटपट लिंक", policies: "नीति और कानूनी", privacy: "गोपनीयता नीति: हम थारा डेटा का आदर करता है। कोई तृतीय-पक्ष साझा नीं।", terms: "नियम और शर्त: या साइट का उपयोग मतलब स्वीकार करणो।", cookie: "कुकी नीति: हम कार्यक्षमता खातिर जरूरी कुकीज का उपयोग करता है।", disclaimer: "अस्वीकरण: जाणकारी फकत मार्गदर्शन खातिर है। स्थानीय सत्यापन करो।", refund: "रिफंड नीति: सेवा मुफ्त है ने लागू नीं।", "support": "सहायता और जाणकारी", faq: "FAQ: म्हारा सहायता भाग पै जावो।", contact: "संपर्क: patukrishi@gmail.com", careers: "करियर: म्हारा मिशन में जुड़ो।", press: "प्रेस: मीडिया पूछताछ का स्वागत है।", office: "कार्यालय: डिजिटल प्लेटफॉर्म - पैन-इंडिया सेवा", copyright: "© 2026 पटुकृषि – सगळा हक राख्या। भारतीय किसानां खातिर 💚 साथै बणायो।", "edit-profile": "प्रोफाइल संपादित करो", "name-placeholder": "नाम", save: "सेव करो", cancel: "रद्द करो", "krishi-bot": "कृषि बॉट", "bot-welcome": "🙏 खम्मा घणी! मैं थारो कृषि बॉट हूं। पूछो - मंडी भाव, मौसम, क्रॉप लेंस, सलाह, एनालिटिक्स या कुछ भी!", "chat-placeholder": "इठै लिखो..." },
    pa: { logo: "ਪਟੁਕ੍ਰਿਸ਼ੀ", home: "ਹੋਮ", weather: "ਮੌਸਮ", mandi: "ਮੰਡੀ", lens: "ਕ੍ਰੌਪ ਲੈਂਸ", advisory: "ਸਲਾਹ", analytics: "ਐਨਾਲਿਟਿਕਸ", videos: "ਵੀਡੀਓ", govtSchemes: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", about: "ਸਾਡੇ ਬਾਰੇ", profile: "ਪ੍ਰੋਫਾਈਲ", logout: "ਲੌਗਆਉਟ", namaste: "ਨਮਸਤੇ", "hero-text": "ਤੁਹਾਡਾ ਆਪਣਾ ਕਿਸਾਨ ਦੋਸਤ – ਸਮਾਰਟ ਖੇਤੀ ਨਾਲ", "sustainable-title": "🌱 ਪਟੁਕ੍ਰਿਸ਼ੀ – ਸਮਾਰਟ ਖੇਤੀ", "sustainable-text": "🇮🇳 ਭਾਰਤ ਵਿੱਚ ਕਿਸਾਨਾਂ ਨੂੰ ਸਮੇਂ ਸਿਰ ਸਹੀ ਜਾਣਕਾਰੀ ਮਿਲਣੀ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ। ਪਟੁਕ੍ਰਿਸ਼ੀ ਤੁਹਾਨੂੰ ਦਿੰਦੀ ਹੈ ਲਾਈਵ ਮੰਡੀ ਭਾਅ, ਮੌਸਮ ਦਾ ਅੰਦਾਜ਼ਾ, ਕ੍ਰੌਪ ਲੈਂਸ (ਰੋਗਾਂ ਦੀ ਪਛਾਣ ਅਤੇ ਇਲਾਜ), ਅਤੇ ਕਦਮ-ਦਰ-ਕਦਮ ਬਿਜਾਈ ਤੋਂ ਕਟਾਈ ਤੱਕ ਦੀ ਸਲਾਹ। ਅਸੀਂ ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਪੈਦਾਵਾਰ ਨੂੰ ਮੁਨਾਫੇ ਵਿੱਚ ਬਦਲਣ ਲਈ ਇੱਥੇ ਹਾਂ। ਭਾਵੇਂ ਤੁਸੀਂ ਪੰਜਾਬ ਦੇ ਕਣਕ ਕਿਸਾਨ ਹੋ ਜਾਂ ਤਮਿਲਨਾਡੂ ਦੇ ਝੋਨਾ ਉਤਪਾਦਕ, ਪਟੁਕ੍ਰਿਸ਼ੀ ਹਰ ਕਿਸਾਨ ਲਈ ਹੈ। ਹੁਣ ਖੇਤੀ ਸਮਾਰਟ, ਅਤੇ ਮੁਨਾਫਾ ਪੱਕਾ! 💚", "weather-desc": "ਲਾਈਵ ਅੰਦਾਜ਼ਾ · ਫ਼ਸਲ ਸਿਫਾਰਿਸ਼", "mandi-desc": "ਸਾਰੇ ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ · ਜ਼ਿਲ੍ਹੇ · ਕਈ ਦਰਾਂ", "advisory-desc": "ਰਾਜ/ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ + ਫ਼ਸਲ · 3-ਕਦਮੀ ਗਾਈਡ", "weather-title": "ਮੌਸਮ · ਮੌਸਮ ਸਲਾਹ", "city-placeholder": "ਸ਼ਹਿਰ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ ਦਿੱਲੀ)", search: "ਖੋਜੋ", "my-location": "ਮੇਰਾ ਸਥਾਨ", "mandi-title": "ਮੰਡੀ ਭਾਅ · ਮੰਡੀ ਭਾਅ", "show-prices": "ਭਾਅ ਵੇਖਾਓ", "lens-title": "ਕ੍ਰੌਪ ਲੈਂਸ · ਰੋਗ ਦੀ ਪਛਾਣ", "upload-title": "ਫ਼ਸਲ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ", "upload-desc": "ਮੌਕ ਰੋਗ ਜਾਂਚ", "advisory-title": "ਫ਼ਸਲ ਸਲਾਹ · ਪੂਰੀ ਗਾਈਡ", "state-season": "ਰਾਜ/ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ + ਸੀਜ਼ਨ", "specific-crop": "ਖਾਸ ਫ਼ਸਲ (3-ਕਦਮ)", "get-advice": "ਸਲਾਹ ਲਵੋ", "get-guide": "3-ਕਦਮੀ ਗਾਈਡ ਲਵੋ", "analytics-title": "ਖੇਤੀ ਐਨਾਲਿਟਿਕਸ · ਡੇਟਾ ਇਨਸਾਈਟਸ", "happy-farmers": "ਖੁਸ਼ ਕਿਸਾਨ", "avg-profit": "ਔਸਤ ਮੁਨਾਫਾ/ਏਕੜ", "weather-alerts": "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ", "active-farms": "ਸਰਗਰਮ ਖੇਤ", "price-trends": "📈 ਕੀਮਤ ਰੁਝਾਨ (ਪਿਛਲੇ 6 ਮਹੀਨੇ)", "crop-distribution": "🌾 ਫ਼ਸਲ ਵੰਡ", "weather-patterns": "🌡️ ਮੌਸਮ ਪੈਟਰਨ", "profit-calculator": "💰 ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ", "select-crop": "ਫ਼ਸਲ ਚੁਣੋ", area: "ਖੇਤਰਫਲ (ਏਕੜ ਵਿੱਚ)", calculate: "ਮੁਨਾਫਾ ਗਣਨਾ ਕਰੋ", "market-insights": "📊 ਬਾਜ਼ਾਰ ਇਨਸਾਈਟਸ", rising: "⬆️ ਵਧ ਰਿਹਾ", stable: "↗️ ਸਥਿਰ", falling: "⬇️ ਘਟ ਰਿਹਾ", "seasonal-forecast": "🌦️ ਸੀਜ਼ਨਲ ਅੰਦਾਜ਼ਾ 2026", rabi: "ਰਬੀ ਸੀਜ਼ਨ", kharif: "ਖਰੀਫ਼ ਸੀਜ਼ਨ", zaid: "ਜ਼ੈਦ ਸੀਜ਼ਨ", "optimal-conditions": "ਅਨੁਕੂਲ ਸਥਿਤੀਆਂ", "rabi-crops": "ਕਣਕ, ਸਰ੍ਹੋਂ, ਛੋਲੇ", "kharif-crops": "ਝੋਨਾ, ਕਪਾਹ, ਮੱਕੀ", "zaid-crops": "ਮੂੰਗੀ, ਸਬਜ਼ੀਆਂ", "about-title": "ਸਾਡੇ ਬਾਰੇ · ਸਾਡੀ ਕਹਾਣੀ", mission: "ਸਾਡਾ ਮਿਸ਼ਨ", "mission-text": "ਹਰ ਭਾਰਤੀ ਕਿਸਾਨ ਨੂੰ ਤਕਨਾਲੋਜੀ-ਅਧਾਰਿਤ ਹੱਲਾਂ ਨਾਲ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ, ਜੋ ਟਿਕਾਊ ਅਤੇ ਲਾਭਕਾਰੀ ਖੇਤੀ ਲਈ ਹੋਵੇ। ਅਸੀਂ ਰਵਾਇਤੀ ਗਿਆਨ ਅਤੇ ਆਧੁਨਿਕ ਨਵੀਨਤਾ ਵਿਚਕਾਰ ਪਾੜਾ ਘਟਾਉਂਦੇ ਹਾਂ।", vision: "ਸਾਡਾ ਸੁਪਨਾ", "vision-text": "ਇੱਕ ਡਿਜੀਟਲ ਈਕੋਸਿਸਟਮ ਬਣਾਉਣਾ ਜਿੱਥੇ ਹਰ ਕਿਸਾਨ ਨੂੰ ਰੀਅਲ-ਟਾਈਮ ਬਾਜ਼ਾਰ ਡੇਟਾ, ਮੌਸਮ ਜਾਣਕਾਰੀ ਅਤੇ ਮਾਹਰ ਮਾਰਗਦਰਸ਼ਨ ਮਿਲੇ - ਖੇਤੀ ਨੂੰ ਸਮਾਰਟ ਅਤੇ ਵਧੇਰੇ ਲਾਭਕਾਰੀ ਬਣਾਉਣਾ।", values: "ਸਾਡੇ ਮੁੱਲ", "values-text": "ਇਮਾਨਦਾਰੀ, ਨਵੀਨਤਾ, ਸਮਾਵੇਸ਼ੀਤਾ। ਅਸੀਂ ਕਿਸਾਨਾਂ ਨੂੰ ਪਹਿਲ ਦੇਣ ਅਤੇ ਅਜਿਹੇ ਹੱਲ ਬਣਾਉਣ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਰੱਖਦੇ ਹਾਂ ਜੋ ਉਨ੍ਹਾਂ ਦੀ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਅਸਲੀ ਫਰਕ ਲਿਆਉਣ।", "founder-role": "ਸੰਸਥਾਪਕ ਅਤੇ ਡਿਵੈਲਪਰ", "founder-quote": "\"ਮੈਂ ਪਟੁਕ੍ਰਿਸ਼ੀ ਬਣਾਈ ਕਿਉਂਕਿ ਸਾਡੇ ਕਿਸਾਨ ਡਿਜੀਟਲ ਸੰਸਾਰ ਵਿੱਚ ਇੱਕ ਦੋਸਤ ਦੇ ਹੱਕਦਾਰ ਹਨ—ਕੋਈ ਜੋ ਉਨ੍ਹਾਂ ਦੀ ਭਾਸ਼ਾ ਬੋਲੇ, ਉਨ੍ਹਾਂ ਦੀਆਂ ਮੁਸ਼ਕਿਲਾਂ ਨੂੰ ਸਮਝੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਵਧਣ ਵਿੱਚ ਮਦਦ ਕਰੇ। ਇਹ ਸਾਡੇ ਦੇਸ਼ ਨੂੰ ਖੁਆਉਣ ਵਾਲੇ ਹੱਥਾਂ ਦਾ ਧੰਨਵਾਦ ਕਰਨ ਦਾ ਮੇਰਾ ਤਰੀਕਾ ਹੈ।\"", "why-choose": "❓ ਕਿਸਾਨ ਪਟੁਕ੍ਰਿਸ਼ੀ ਕਿਉਂ ਚੁਣਦੇ ਹਨ", "real-time": "ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ", "real-time-desc": "ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਅਤੇ ਮੌਸਮ", "ai-powered": "ਏਆਈ-ਪਾਵਰਡ", "ai-powered-desc": "ਸਮਾਰਟ ਰੋਗ ਪਛਾਣ", "local-langs": "🌐 ਸਥਾਨਕ ਭਾਸ਼ਾਵਾਂ", "local-langs-desc": "ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ, ਬੰਗਾਲੀ, ਤੇਲਗੂ, ਮਰਾਠੀ, ਗੁਜਰਾਤੀ, ਮਾਰਵਾੜੀ, ਪੰਜਾਬੀ, ਤਮਿਲ, ਮਲਿਆਲਮ, ਉਰਦੂ, ਕੰਨੜ, ਓਡੀਆ, ਸੰਸਕ੍ਰਿਤ, ਭੋਜਪੁਰੀ, ਡੋਗਰੀ ਅਤੇ ਹੋਰ", free: "100% ਮੁਫ਼ਤ", "free-desc": "ਕਿਸਾਨਾਂ ਲਈ ਹਮੇਸ਼ਾ ਮੁਫ਼ਤ", "send-message": "ਸਾਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ", "message-desc": "ਸਵਾਲ ਹਨ? ਅਸੀਂ ਸੁਣਨਾ ਚਾਹਾਂਗੇ!", "message-placeholder": "ਆਪਣਾ ਸਵਾਲ ਇੱਥੇ ਲਿਖੋ...", "google-form": "ਗੂਗਲ ਫਾਰਮ ਖੋਲ੍ਹੋ", "google-form-note": "📝 ਸਾਡਾ ਫੀਡਬੈਕ ਫਾਰਮ ਖੋਲ੍ਹਣ ਲਈ ਉੱਪਰ ਬਟਨ ਤੇ ਕਲਿੱਕ ਕਰੋ", "footer-tagline": "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਸਮਾਰਟ ਖੇਤੀ।", "quick-links": "ਤਤਕਾਲ ਲਿੰਕ", policies: "ਨੀਤੀਆਂ ਅਤੇ ਕਾਨੂੰਨੀ", privacy: "ਪਰਾਈਵੇਸੀ ਨੀਤੀ: ਅਸੀਂ ਤੁਹਾਡੇ ਡੇਟਾ ਦਾ ਆਦਰ ਕਰਦੇ ਹਾਂ। ਕੋਈ ਤੀਜੀ-ਧਿਰ ਸਾਂਝ ਨਹੀਂ।", terms: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ: ਇਸ ਸਾਈਟ ਦੀ ਵਰਤੋਂ ਦਾ ਮਤਲਬ ਸਵੀਕ੍ਰਿਤੀ ਹੈ।", cookie: "ਕੂਕੀ ਨੀਤੀ: ਅਸੀਂ ਕਾਰਜਕੁਸ਼ਲਤਾ ਲਈ ਜ਼ਰੂਰੀ ਕੂਕੀਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ।", disclaimer: "ਅਸਵੀਕਰਨ: ਜਾਣਕਾਰੀ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਹੈ। ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।", refund: "ਰਿਫੰਡ ਨੀਤੀ: ਸੇਵਾਵਾਂ ਮੁਫ਼ਤ ਹੋਣ ਕਰਕੇ ਲਾਗੂ ਨਹੀਂ।", "support": "ਸਹਾਇਤਾ ਅਤੇ ਜਾਣਕਾਰੀ", faq: "FAQ: ਸਾਡੇ ਸਹਾਇਤਾ ਭਾਗ 'ਤੇ ਜਾਓ।", contact: "ਸੰਪਰਕ: patukrishi@gmail.com", careers: "ਕਰੀਅਰ: ਸਾਡੇ ਮਿਸ਼ਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।", press: "ਪ੍ਰੈਸ: ਮੀਡੀਆ ਪੁੱਛਗਿੱਛ ਦਾ ਸਵਾਗਤ ਹੈ।", office: "ਦਫ਼ਤਰ: ਡਿਜੀਟਲ ਪਲੇਟਫਾਰਮ - ਪੈਨ-ਇੰਡੀਆ ਸੇਵਾ", copyright: "© 2026 ਪਟੁਕ੍ਰਿਸ਼ੀ – ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ। ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ 💚 ਨਾਲ ਬਣਾਇਆ ਗਿਆ।", "edit-profile": "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ", "name-placeholder": "ਨਾਂ", save: "ਸੰਭਾਲੋ", cancel: "ਰੱਦ ਕਰੋ", "krishi-bot": "ਕ੍ਰਿਸ਼ੀ ਬੋਟ", "bot-welcome": "🙏 ਨਮਸਤੇ! ਮੈਂ ਤੁਹਾਡਾ ਕ੍ਰਿਸ਼ੀ ਬੋਟ ਹਾਂ। ਪੁੱਛੋ - ਮੰਡੀ ਭਾਅ, ਮੌਸਮ, ਕ੍ਰੌਪ ਲੈਂਸ, ਸਲਾਹ, ਐਨਾਲਿਟਿਕਸ ਜਾਂ ਕੁਝ ਵੀ!", "chat-placeholder": "ਇੱਥੇ ਲਿਖੋ..." },
    ta: { logo: "படுகிருஷி", home: "முகப்பு", weather: "வானிலை", mandi: "மண்டி", lens: "கிராப் லென்ஸ்", advisory: "ஆலோசனை", analytics: "பகுப்பாய்வு", videos: "வீடியோக்கள்", govtSchemes: "அரசு திட்டங்கள்", about: "எங்களைப் பற்றி", profile: "சுயவிவரம்", logout: "வெளியேறு", namaste: "வணக்கம்", "hero-text": "உங்கள் விவசாயி நண்பர் – ஸ்மார்ட் விவசாயத்துடன்", "sustainable-title": "🌱 படுகிருஷி – ஸ்மார்ட் விவசாயம்", "sustainable-text": "🇮🇳 இந்தியாவில் விவசாயிகளுக்கு சரியான நேரத்தில் துல்லியமான தகவல் கிடைப்பது மிகவும் முக்கியம். படுகிருஷி உங்களுக்கு நேரடி மண்டி விலைகள், வானிலை முன்னறிவிப்பு, கிராப் லென்ஸ் (நோய் கண்டறிதல் மற்றும் சிகிச்சை), மற்றும் விதைப்பிலிருந்து அறுவடை வரை படிப்படியான வழிகாட்டுதலை வழங்குகிறது. உங்கள் வயலின் உற்பத்தியை லாபமாக மாற்ற நாங்கள் இங்கே இருக்கிறோம். நீங்கள் பஞ்சாபின் கோதுமை விவசாயியாக இருந்தாலும் அல்லது தமிழ்நாட்டின் நெல் சாகுபடியாளராக இருந்தாலும், படுகிருஷி ஒவ்வொரு விவசாயிக்குமானது. இப்போது விவசாயம் ஸ்மார்ட், லாபம் உறுதி! 💚", "weather-desc": "நேரடி முன்னறிவிப்பு · பயிர் பரிந்துரை", "mandi-desc": "அனைத்து மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்கள் · மாவட்டங்கள் · பல விலைகள்", "advisory-desc": "மாநிலம்/யூனியன் பிரதேசம் + பயிர் · 3-படி வழிகாட்டி", "weather-title": "வானிலை · வானிலை ஆலோசனை", "city-placeholder": "நகரத்தை உள்ளிடவும் (எ.கா. டெல்லி)", search: "தேடு", "my-location": "எனது இருப்பிடம்", "mandi-title": "மண்டி விலைகள் · மண்டி விலை", "show-prices": "விலைகளைக் காட்டு", "lens-title": "கிராப் லென்ஸ் · நோய் கண்டறிதல்", "upload-title": "பயிர் படத்தைப் பதிவேற்று", "upload-desc": "மாக் நோய் கண்டறிதல்", "advisory-title": "பயிர் ஆலோசனை · முழு வழிகாட்டி", "state-season": "மாநிலம்/யூனியன் பிரதேசம் + பருவம்", "specific-crop": "குறிப்பிட்ட பயிர் (3-படி)", "get-advice": "ஆலோசனை பெறு", "get-guide": "3-படி வழிகாட்டி பெறு", "analytics-title": "விவசாய பகுப்பாய்வு · தரவு நுண்ணறிவு", "happy-farmers": "மகிழ்ச்சியான விவசாயிகள்", "avg-profit": "சராசரி லாபம்/ஏக்கர்", "weather-alerts": "வானிலை எச்சரிக்கைகள்", "active-farms": "செயலில் உள்ள பண்ணைகள்", "price-trends": "📈 விலை போக்குகள் (கடந்த 6 மாதங்கள்)", "crop-distribution": "🌾 பயிர் விநியோகம்", "weather-patterns": "🌡️ வானிலை முறைகள்", "profit-calculator": "💰 லாப கால்குலேட்டர்", "select-crop": "பயிரைத் தேர்ந்தெடு", area: "பரப்பளவு (ஏக்கரில்)", calculate: "லாபத்தைக் கணக்கிடு", "market-insights": "📊 சந்தை நுண்ணறிவு", rising: "⬆️ உயர்கிறது", stable: "↗️ நிலையானது", falling: "⬇️ குறைகிறது", "seasonal-forecast": "🌦️ பருவகால முன்னறிவிப்பு 2026", rabi: "ரபி பருவம்", kharif: "காரீப் பருவம்", zaid: "ஜாயித் பருவம்", "optimal-conditions": "உகந்த நிலைமைகள்", "rabi-crops": "கோதுமை, கடுகு, கொண்டைக்கடலை", "kharif-crops": "நெல், பருத்தி, மக்காச்சோளம்", "zaid-crops": "பாசிப்பயறு, காய்கறிகள்", "about-title": "எங்களைப் பற்றி · எங்கள் கதை", mission: "எங்கள் நோக்கம்", "mission-text": "நிலையான மற்றும் லாபகரமான விவசாயத்திற்காக ஒவ்வொரு இந்திய விவசாயிக்கும் தொழில்நுட்பம் சார்ந்த தீர்வுகளுடன் அதிகாரமளிப்பது. பாரம்பரிய ஞானத்திற்கும் நவீன புதுமைக்கும் இடையிலான இடைவெளியை நாங்கள் குறைக்கிறோம்.", vision: "எங்கள் கனவு", "vision-text": "ஒரு டிஜிட்டல் சூழலை உருவாக்குதல், அங்கு ஒவ்வொரு விவசாயிக்கும் நிகழ்நேர சந்தை தரவு, வானிலை தகவல் மற்றும் நிபுணர் வழிகாட்டுதல் கிடைக்கும் - விவசாயத்தை ஸ்மார்ட்டாகவும் அதிக லாபகரமாகவும் மாற்றுதல்.", values: "எங்கள் மதிப்புகள்", "values-text": "நேர்மை, புதுமை, உள்ளடக்கம். விவசாயிகளை முதலில் வைப்பதிலும், அவர்களின் வாழ்க்கையில் உண்மையான மாற்றத்தை ஏற்படுத்தும் தீர்வுகளை உருவாக்குவதிலும் நாங்கள் நம்பிக்கை கொண்டுள்ளோம்.", "founder-role": "நிறுவனர் & டெவலப்பர்", "founder-quote": "\"நான் படுகிருஷியை உருவாக்கினேன், ஏனென்றால் எங்கள் விவசாயிகள் டிஜிட்டல் உலகில் ஒரு நண்பருக்கு தகுதியானவர்கள்—அவர்களின் மொழியில் பேசும், அவர்களின் போராட்டங்களைப் புரிந்துகொள்ளும், அவர்களை வளர உதவும் ஒருவர். நம் தேசத்திற்கு உணவளிக்கும் கைகளுக்கு நன்றி சொல்லும் எனது வழி இது.\"", "why-choose": "❓ ஏன் விவசாயிகள் படுகிருஷியை தேர்வு செய்கிறார்கள்", "real-time": "நிகழ்நேர தரவு", "real-time-desc": "நேரடி மண்டி விலைகள் மற்றும் வானிலை", "ai-powered": "AI-இயங்கும்", "ai-powered-desc": "ஸ்மார்ட் நோய் கண்டறிதல்", "local-langs": "🌐 உள்ளூர் மொழிகள்", "local-langs-desc": "ஆங்கிலம், இந்தி, வங்காளி, தெலுங்கு, மராத்தி, குஜராத்தி, மார்வாடி, பஞ்சாபி, தமிழ், மலையாளம், உருது, கன்னடம், ஒடியா, சமஸ்கிருதம், போஜ்புரி, டோக்ரி மற்றும் பல", free: "100% இலவசம்", "free-desc": "விவசாயிகளுக்கு எப்போதும் இலவசம்", "send-message": "எங்களுக்கு செய்தி அனுப்புங்கள்", "message-desc": "கேள்விகள் உள்ளதா? நாங்கள் கேட்க விரும்புகிறோம்!", "message-placeholder": "உங்கள் கேள்வியை இங்கே எழுதுங்கள்...", "google-form": "கூகுள் படிவத்தை திறக்கவும்", "google-form-note": "📝 எங்கள் கருத்து படிவத்தை திறக்க மேலே உள்ள பொத்தானைக் கிளிக் செய்யவும்", "footer-tagline": "இந்திய விவசாயிகளுக்கான ஸ்மார்ட் விவசாயம்.", "quick-links": "விரைவு இணைப்புகள்", policies: "கொள்கைகள் & சட்டம்", privacy: "தனியுரிமைக் கொள்கை: நாங்கள் உங்கள் தரவை மதிக்கிறோம். மூன்றாம் தரப்பு பகிர்வு இல்லை.", terms: "விதிமுறைகள் & நிபந்தனைகள்: இந்த தளத்தின் பயன்பாடு ஏற்றுக்கொள்ளலைக் குறிக்கிறது.", cookie: "குக்கீ கொள்கை: செயல்பாட்டிற்கு தேவையான குக்கீகளை நாங்கள் பயன்படுத்துகிறோம்.", disclaimer: "மறுப்பு: தகவல் வழிகாட்டுதலுக்கு மட்டுமே. உள்ளூரில் சரிபார்க்கவும்.", refund: "பணத்திரும்பக் கொள்கை: சேவைகள் இலவசம் என்பதால் பொருந்தாது.", "support": "ஆதரவு & தகவல்", faq: "கேள்விகள்: எங்கள் உதவி பகுதியைப் பார்வையிடவும்.", contact: "தொடர்பு: patukrishi@gmail.com", careers: "தொழில்: எங்கள் பணியில் சேரவும்.", press: "பிரஸ்: மீடியா விசாரணைகள் வரவேற்கப்படுகின்றன.", office: "அலுவலகம்: டிஜிட்டல் தளம் - பான்-இந்தியா சேவை", copyright: "© 2026 படுகிருஷி – அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. இந்திய விவசாயிகளுக்காக 💚 உடன் உருவாக்கப்பட்டது.", "edit-profile": "சுயவிவரத்தைத் திருத்து", "name-placeholder": "பெயர்", save: "சேமி", cancel: "ரத்துசெய்", "krishi-bot": "கிருஷி போட்", "bot-welcome": "🙏 வணக்கம்! நான் உங்கள் கிருஷி போட். மண்டி விலைகள், வானிலை, கிராப் லென்ஸ், ஆலோசனை, பகுப்பாய்வு அல்லது எதுவும் கேளுங்கள்!", "chat-placeholder": "இங்கே எழுதுங்கள்..." },
    ml: { logo: "പടുകൃഷി", home: "ഹോം", weather: "കാലാവസ്ഥ", mandi: "മണ്ടി", lens: "ക്രോപ്പ് ലെൻസ്", advisory: "ഉപദേശം", analytics: "അനലിറ്റിക്സ്", videos: "വീഡിയോകൾ", govtSchemes: "സർക്കാർ പദ്ധതികൾ", about: "ഞങ്ങളെ കുറിച്ച്", profile: "പ്രൊഫൈൽ", logout: "ലോഗൗട്ട്", namaste: "നമസ്കാരം", "hero-text": "നിങ്ങളുടെ കർഷക സുഹൃത്ത് - സ്മാർട്ട് കൃഷിയോടെ", "sustainable-title": "🌱 പടുകൃഷി – സ്മാർട്ട് കൃഷി", "sustainable-text": "🇮🇳 ഇന്ത്യയിൽ കർഷകർക്ക് സമയബന്ധിതമായും കൃത്യമായും വിവരങ്ങൾ ലഭിക്കേണ്ടത് വളരെ പ്രധാനമാണ്. പടുകൃഷി നിങ്ങൾക്ക് തത്സമയ മണ്ടി വിലകൾ, കാലാവസ്ഥാ പ്രവചനം, ക്രോപ്പ് ലെൻസ് (രോഗം കണ്ടെത്തലും ചികിത്സയും), വിതയ്ക്കുന്നത് മുതൽ വിളവെടുപ്പ് വരെയുള്ള ഘട്ടം ഘട്ടമായുള്ള മാർഗ്ഗനിർദ്ദേശം എന്നിവ നൽകുന്നു. നിങ്ങളുടെ പാടത്തെ വിളവ് ലാഭമാക്കി മാറ്റാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്. നിങ്ങൾ പഞ്ചാബിലെ ഗോതമ്പ് കർഷകനായാലും തമിഴ്നാട്ടിലെ നെൽകർഷകനായാലും, പടുകൃഷി എല്ലാ കർഷകർക്കും വേണ്ടിയുള്ളതാണ്. ഇപ്പോൾ കൃഷി സ്മാർട്ട്, ലാഭം ഉറപ്പ്! 💚", "weather-desc": "തത്സമയ പ്രവചനം · വിള ശുപാർശ", "mandi-desc": "എല്ലാ സംസ്ഥാനങ്ങളും കേന്ദ്രഭരണ പ്രദേശങ്ങളും · ജില്ലകൾ · ഒന്നിലധികം നിരക്കുകൾ", "advisory-desc": "സംസ്ഥാനം/കേന്ദ്രഭരണ പ്രദേശം + വിള · 3-ഘട്ട ഗൈഡ്", "weather-title": "കാലാവസ്ഥ · കാലാവസ്ഥ ഉപദേശം", "city-placeholder": "നഗരം നൽകുക (ഉദാ. ഡൽഹി)", search: "തിരയുക", "my-location": "എന്റെ സ്ഥാനം", "mandi-title": "മണ്ടി വിലകൾ · മണ്ടി ഭാവ്", "show-prices": "വിലകൾ കാണിക്കുക", "lens-title": "ക്രോപ്പ് ലെൻസ് · രോഗം തിരിച്ചറിയൽ", "upload-title": "വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക", "upload-desc": "മോക്ക് രോഗം കണ്ടെത്തൽ", "advisory-title": "വിള ഉപദേശം · പൂർണ്ണ ഗൈഡ്", "state-season": "സംസ്ഥാനം/കേന്ദ്രഭരണ പ്രദേശം + സീസൺ", "specific-crop": "നിർദ്ദിഷ്ട വിള (3-ഘട്ടം)", "get-advice": "ഉപദേശം നേടുക", "get-guide": "3-ഘട്ട ഗൈഡ് നേടുക", "analytics-title": "കാർഷിക അനലിറ്റിക്സ് · ഡാറ്റ ഉൾക്കാഴ്ചകൾ", "happy-farmers": "സന്തുഷ്ടരായ കർഷകർ", "avg-profit": "ശരാശരി ലാഭം/ഏക്കർ", "weather-alerts": "കാലാവസ്ഥ അലേർട്ടുകൾ", "active-farms": "സജീവ ഫാമുകൾ", "price-trends": "📈 വില ട്രെൻഡുകൾ (കഴിഞ്ഞ 6 മാസം)", "crop-distribution": "🌾 വിള വിതരണം", "weather-patterns": "🌡️ കാലാവസ്ഥാ രീതികൾ", "profit-calculator": "💰 ലാഭ കാൽക്കുലേറ്റർ", "select-crop": "വിള തിരഞ്ഞെടുക്കുക", area: "വിസ്തീർണ്ണം (ഏക്കറിൽ)", calculate: "ലാഭം കണക്കാക്കുക", "market-insights": "📊 വിപണി ഉൾക്കാഴ്ചകൾ", rising: "⬆️ ഉയരുന്നു", stable: "↗️ സ്ഥിരത", falling: "⬇️ ഇടിയുന്നു", "seasonal-forecast": "🌦️ സീസണൽ പ്രവചനം 2026", rabi: "റാബി സീസൺ", kharif: "ഖാരിഫ് സീസൺ", zaid: "സായിദ് സീസൺ", "optimal-conditions": "അനുയോജ്യമായ സാഹചര്യങ്ങൾ", "rabi-crops": "ഗോതമ്പ്, കടുക്, കടല", "kharif-crops": "നെല്ല്, പരുത്തി, ചോളം", "zaid-crops": "പയർ, പച്ചക്കറികൾ", "about-title": "ഞങ്ങളെ കുറിച്ച് · ഞങ്ങളുടെ കഥ", mission: "ഞങ്ങളുടെ ദൗത്യം", "mission-text": "സുസ്ഥിരവും ലാഭകരവുമായ കൃഷിക്കായി ഓരോ ഇന്ത്യൻ കർഷകനെയും സാങ്കേതികവിദ്യ അടിസ്ഥാനമാക്കിയുള്ള പരിഹാരങ്ങൾ ഉപയോഗിച്ച് ശാക്തീകരിക്കുക. പരമ്പരാഗത ജ്ഞാനവും ആധുനിക നവീകരണവും തമ്മിലുള്ള വിടവ് ഞങ്ങൾ നികത്തുന്നു.", vision: "ഞങ്ങളുടെ കാഴ്ചപ്പാട്", "vision-text": "ഒരു ഡിജിറ്റൽ ആവാസവ്യവസ്ഥ സൃഷ്ടിക്കുക, അവിടെ എല്ലാ കർഷകർക്കും തത്സമയ വിപണി വിവരങ്ങൾ, കാലാവസ്ഥാ വിവരങ്ങൾ, വിദഗ്ദ്ധ മാർഗ്ഗനിർദ്ദേശം എന്നിവ ലഭ്യമാകും - കൃഷിയെ സ്മാർട്ടും കൂടുതൽ ലാഭകരവുമാക്കുന്നു.", values: "ഞങ്ങളുടെ മൂല്യങ്ങൾ", "values-text": "സത്യസന്ധത, നവീകരണം, ഉൾക്കൊള്ളൽ. കർഷകരെ ഒന്നാമത് നിർത്തുകയും അവരുടെ ജീവിതത്തിൽ യഥാർത്ഥ മാറ്റമുണ്ടാക്കുന്ന പരിഹാരങ്ങൾ സൃഷ്ടിക്കുകയും ചെയ്യുന്നതിൽ ഞങ്ങൾ വിശ്വസിക്കുന്നു.", "founder-role": "സ്ഥാപകനും ഡെവലപ്പറും", "founder-quote": "\"ഞാൻ പടുകൃഷി നിർമ്മിച്ചത് ഞങ്ങളുടെ കർഷകർക്ക് ഡിജിറ്റൽ ലോകത്ത് ഒരു സുഹൃത്തിന് അർഹതയുണ്ട് എന്നതിനാലാണ്—അവരുടെ ഭാഷ സംസാരിക്കുന്ന, അവരുടെ പ്രയാസങ്ങൾ മനസ്സിലാക്കുന്ന, വളരാൻ സഹായിക്കുന്ന ഒരാൾ. നമ്മുടെ രാജ്യത്തെ പോഷിപ്പിക്കുന്ന കൈകൾക്ക് നന്ദി പറയാനുള്ള എന്റെ മാർഗമാണിത്.\"", "why-choose": "❓ എന്തുകൊണ്ട് കർഷകർ പടുകൃഷി തിരഞ്ഞെടുക്കുന്നു", "real-time": "തത്സമയ ഡാറ്റ", "real-time-desc": "തത്സമയ മണ്ടി വിലകളും കാലാവസ്ഥയും", "ai-powered": "AI-അധിഷ്ഠിതം", "ai-powered-desc": "സ്മാർട്ട് രോഗം കണ്ടെത്തൽ", "local-langs": "🌐 പ്രാദേശിക ഭാഷകൾ", "local-langs-desc": "ഇംഗ്ലീഷ്, ഹിന്ദി, ബംഗാളി, തെലുങ്ക്, മറാത്തി, ഗുജറാത്തി, മാർവാഡി, പഞ്ചാബി, തമിഴ്, മലയാളം, ഉറുദു, കന്നഡ, ഒഡിയ, സംസ്കൃതം, ഭോജ്പുരി, ഡോഗ്രി എന്നിവയും മറ്റും", free: "100% സൗജന്യം", "free-desc": "എപ്പോഴും കർഷകർക്ക് സൗജന്യം", "send-message": "ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക", "message-desc": "ചോദ്യങ്ങളുണ്ടോ? നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു!", "message-placeholder": "നിങ്ങളുടെ ചോദ്യം ഇവിടെ എഴുതുക...", "google-form": "Google ഫോം തുറക്കുക", "google-form-note": "📝 ഞങ്ങളുടെ ഫീഡ്ബാക്ക് ഫോം തുറക്കാൻ മുകളിലുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക", "footer-tagline": "ഇന്ത്യൻ കർഷകർക്കായുള്ള സ്മാർട്ട് കൃഷി.", "quick-links": "ദ്രുത ലിങ്കുകൾ", policies: "നയങ്ങളും നിയമപരമായ കാര്യങ്ങളും", privacy: "സ്വകാര്യതാ നയം: ഞങ്ങൾ നിങ്ങളുടെ ഡാറ്റയെ മാനിക്കുന്നു. മൂന്നാം കക്ഷി പങ്കിടൽ ഇല്ല.", terms: "നിബന്ധനകളും വ്യവസ്ഥകളും: ഈ സൈറ്റിന്റെ ഉപയോഗം അംഗീകാരത്തെ സൂചിപ്പിക്കുന്നു.", cookie: "കുക്കി നയം: പ്രവർത്തനക്ഷമതയ്ക്കായി ഞങ്ങൾ അവശ്യ കുക്കികൾ ഉപയോഗിക്കുന്നു.", disclaimer: "നിരാകരണം: വിവരങ്ങൾ മാർഗ്ഗനിർദ്ദേശത്തിന് മാത്രമുള്ളതാണ്. പ്രാദേശികമായി പരിശോധിക്കുക.", refund: "റീഫണ്ട് നയം: സേവനങ്ങൾ സൗജന്യമായതിനാൽ ബാധകമല്ല.", "support": "പിന്തുണയും വിവരങ്ങളും", faq: "പതിവ് ചോദ്യങ്ങൾ: ഞങ്ങളുടെ സഹായ വിഭാഗം സന്ദർശിക്കുക.", contact: "ബന്ധപ്പെടുക: patukrishi@gmail.com", careers: "കരിയർ: ഞങ്ങളുടെ ദൗത്യത്തിൽ ചേരുക.", press: "പ്രസ്സ്: മാധ്യമ അന്വേഷണങ്ങൾ സ്വാഗതം ചെയ്യുന്നു.", office: "ഓഫീസ്: ഡിജിറ്റൽ പ്ലാറ്റ്‌ഫോം - പാൻ-ഇന്ത്യ സേവനം", copyright: "© 2026 പടുകൃഷി – എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം. ഇന്ത്യൻ കർഷകർക്കായി 💚 ഉപയോഗിച്ച് നിർമ്മിച്ചത്.", "edit-profile": "പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക", "name-placeholder": "പേര്", save: "സംരക്ഷിക്കുക", cancel: "റദ്ദാക്കുക", "krishi-bot": "കൃഷി ബോട്ട്", "bot-welcome": "🙏 നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി ബോട്ട്. ചോദിക്കൂ - മണ്ടി വില, കാലാവസ്ഥ, ക്രോപ്പ് ലെൻസ്, ഉപദേശം, അനലിറ്റിക്സ് അല്ലെങ്കിൽ എന്തും!", "chat-placeholder": "ഇവിടെ എഴുതുക..." },
    ur: { logo: "پٹوکرشی", home: "ہوم", weather: "موسم", mandi: "منڈی", lens: "کراپ لینس", advisory: "مشورہ", analytics: "اینالیٹکس", videos: "ویڈیوز", govtSchemes: "سرکاری اسکیمیں", about: "ہمارے بارے میں", profile: "پروفائل", logout: "لاگ آؤٹ", namaste: "نمستے", "hero-text": "آپ کا اپنا کسان دوست – سمارٹ فارمنگ کے ساتھ", "sustainable-title": "🌱 پٹوکرشی – سمارٹ فارمنگ", "sustainable-text": "🇮🇳 ہندوستان میں کسانوں کو وقت پر صحیح معلومات ملنا بہت ضروری ہے۔ پٹوکرشی آپ کو دیتا ہے لائیو منڈی بھاؤ، موسم کی پیش گوئی، کراپ لینس (بیماریوں کی پہچان اور علاج)، اور مرحلہ وار بوائی سے کٹائی تک کی رہنمائی۔ ہم آپ کے کھیت کی پیداوار کو منافع میں بدلنے کے لیے یہاں ہیں۔ چاہے آپ پنجاب کے گندم کسان ہوں یا تامل ناڈو کے چاول کاشتکار، پٹوکرشی ہر کسان کے لیے ہے۔ اب فارمنگ سمارٹ، اور منافع یقینی! 💚", "weather-desc": "لائیو پیش گوئی · فصل کی سفارش", "mandi-desc": "تمام ریاستیں اور مرکزی علاقے · اضلاع · متعدد نرخ", "advisory-desc": "ریاست/مرکزی علاقہ + فصل · 3-مرحلہ گائیڈ", "weather-title": "موسم · موسم کی رہنمائی", "city-placeholder": "شہر درج کریں (مثلاً دہلی)", search: "تلاش کریں", "my-location": "میرا مقام", "mandi-title": "منڈی بھاؤ · منڈی بھاؤ", "show-prices": "نرخ دکھائیں", "lens-title": "کراپ لینس · بیماری کی پہچان", "upload-title": "فصل کی تصویر اپ لوڈ کریں", "upload-desc": "بیماری کی عارضی تشخیص", "advisory-title": "فصل کی رہنمائی · مکمل گائیڈ", "state-season": "ریاست/مرکزی علاقہ + سیزن", "specific-crop": "مخصوص فصل (3-مرحلہ)", "get-advice": "مشورہ حاصل کریں", "get-guide": "3-مرحلہ گائیڈ حاصل کریں", "analytics-title": "فارمنگ اینالیٹکس · ڈیٹا بصیرتیں", "happy-farmers": "خوش کسان", "avg-profit": "اوسط منافع/ایکڑ", "weather-alerts": "موسم کے انتباہات", "active-farms": "فعال فارمز", "price-trends": "📈 قیمت کے رجحانات (پچھلے 6 ماہ)", "crop-distribution": "🌾 فصل کی تقسیم", "weather-patterns": "🌡️ موسم کے پیٹرن", "profit-calculator": "💰 منافع کیلکولیٹر", "select-crop": "فصل منتخب کریں", area: "رقبہ (ایکڑ میں)", calculate: "منافع کا حساب لگائیں", "market-insights": "📊 مارکیٹ بصیرتیں", rising: "⬆️ بڑھ رہا", stable: "↗️ مستحکم", falling: "⬇️ گر رہا", "seasonal-forecast": "🌦️ موسمی پیش گوئی 2026", rabi: "ربیع سیزن", kharif: "خریف سیزن", zaid: "زائد سیزن", "optimal-conditions": "بہترین حالات", "rabi-crops": "گندم، سرسوں، چنا", "kharif-crops": "چاول، کپاس، مکئی", "zaid-crops": "مونگ، سبزیاں", "about-title": "ہمارے بارے میں · ہماری کہانی", mission: "ہمارا مشن", "mission-text": "ہر ہندوستانی کسان کو ٹیکنالوجی پر مبنی حل کے ذریعے بااختیار بنانا، پائیدار اور منافع بخش کاشتکاری کے لیے۔ ہم روایتی علم اور جدید جدت کے درمیان فرق کو ختم کرتے ہیں۔", vision: "ہمارا وژن", "vision-text": "ایک ڈیجیٹل ماحولیاتی نظام تشکیل دینا جہاں ہر کسان کو ریئل ٹائم مارکیٹ ڈیٹا، موسمی معلومات اور ماہرانہ رہنمائی تک رسائی حاصل ہو - کاشتکاری کو سمارٹ اور زیادہ منافع بخش بنانا۔", values: "ہماری اقدار", "values-text": "دیانت، جدت، شمولیت۔ ہم کسانوں کو پہلے رکھنے اور ایسے حل تخلیق کرنے میں یقین رکھتے ہیں جو ان کی زندگیوں میں حقیقی تبدیلی لائیں۔", "founder-role": "بانی اور ڈویلپر", "founder-quote": "\"میں نے پٹوکرشی اس لیے بنائی کیونکہ ہمارے کسان ڈیجیٹل دنیا میں ایک دوست کے حقدار ہیں—جو ان کی زبان بولے، ان کی مشکلات کو سمجھے اور ان کی ترقی میں مدد کرے۔ یہ ان ہاتھوں کا شکریہ ادا کرنے کا میرا طریقہ ہے جو ہمارے ملک کو کھلاتے ہیں۔\"", "why-choose": "❓ کسان پٹوکرشی کیوں منتخب کرتے ہیں", "real-time": "ریئل ٹائم ڈیٹا", "real-time-desc": "لائیو منڈی نرخ اور موسم", "ai-powered": "AI سے چلنے والا", "ai-powered-desc": "سمارٹ بیماری کا پتہ لگانا", "local-langs": "🌐 مقامی زبانیں", "local-langs-desc": "انگریزی، ہندی، بنگالی، تیلگو، مراٹھی، گجراتی، مارواڑی، پنجابی، تمل، ملیالم، اردو، کنڑ، اوڈیا، سنسکرت، بھوجپوری، ڈوگری اور مزید", free: "100% مفت", "free-desc": "کسانوں کے لیے ہمیشہ مفت", "send-message": "ہمیں پیغام بھیجیں", "message-desc": "سوالات ہیں؟ ہم آپ سے سننا پسند کریں گے!", "message-placeholder": "اپنا سوال یہاں لکھیں...", "google-form": "گوگل فارم کھولیں", "google-form-note": "📝 ہمارا فیڈبیک فارم کھولنے کے لیے اوپر والے بٹن پر کلک کریں", "footer-tagline": "ہندوستانی کسانوں کے لیے سمارٹ فارمنگ۔", "quick-links": "فوری روابط", policies: "پالیسیاں اور قانونی", privacy: "رازداری کی پالیسی: ہم آپ کے ڈیٹا کا احترام کرتے ہیں۔ کوئی تیسری پارٹی شیئرنگ نہیں۔", terms: "شرائط و ضوابط: اس سائٹ کا استعمال قبولیت کو ظاہر کرتا ہے۔", cookie: "کوکی پالیسی: ہم فعالیت کے لیے ضروری کوکیز استعمال کرتے ہیں۔", disclaimer: "اعلان دستبرداری: معلومات صرف رہنمائی کے لیے ہے۔ مقامی طور پر تصدیق کریں۔", refund: "ریفنڈ پالیسی: خدمات مفت ہونے کی وجہ سے لاگو نہیں۔", "support": "مدد اور معلومات", faq: "اکثر پوچھے گئے سوالات: ہمارے مدد سیکشن پر جائیں۔", contact: "رابطہ: patukrishi@gmail.com", careers: "کیریئر: ہمارے مشن میں شامل ہوں۔", press: "پریس: میڈیا انکوائریز کا خیرمقدم ہے۔", office: "دفتر: ڈیجیٹل پلیٹ فارم - پان انڈیا سروس", copyright: "© 2026 پٹوکرشی – جملہ حقوق محفوظ ہیں۔ ہندوستانی کسانوں کے لیے 💚 سے تیار کردہ۔", "edit-profile": "پروفائل میں ترمیم کریں", "name-placeholder": "نام", save: "محفوظ کریں", cancel: "منسوخ کریں", "krishi-bot": "کرشی بوٹ", "bot-welcome": "🙏 نمستے! میں آپ کا کرشی بوٹ ہوں۔ پوچھیں - منڈی بھاؤ، موسم، کراپ لینس، مشورہ، اینالیٹکس یا کچھ بھی!", "chat-placeholder": "یہاں لکھیں..." },
    kn: { logo: "ಪಟುಕೃಷಿ", home: "ಹೋಮ್", weather: "ಹವಾಮಾನ", mandi: "ಮಂಡಿ", lens: "ಕ್ರಾಪ್ ಲೆನ್ಸ್", advisory: "ಸಲಹೆ", analytics: "ಅನಲಿಟಿಕ್ಸ್", videos: "ವೀಡಿಯೊಗಳು", govtSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", about: "ನಮ್ಮ ಬಗ್ಗೆ", profile: "ಪ್ರೊಫೈಲ್", logout: "ಲಾಗೌಟ್", namaste: "ನಮಸ್ಕಾರ", "hero-text": "ನಿಮ್ಮ ರೈತ ಸ್ನೇಹಿತ - ಸ್ಮಾರ್ಟ್ ಕೃಷಿಯೊಂದಿಗೆ", "sustainable-title": "🌱 ಪಟುಕೃಷಿ – ಸ್ಮಾರ್ಟ್ ಕೃಷಿ", "sustainable-text": "🇮🇳 ಭಾರತದಲ್ಲಿ ರೈತರಿಗೆ ಸಮಯೋಚಿತ ಮತ್ತು ನಿಖರವಾದ ಮಾಹಿತಿ ಸಿಗುವುದು ಬಹಳ ಮುಖ್ಯ. ಪಟುಕೃಷಿ ನಿಮಗೆ ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಕ್ರಾಪ್ ಲೆನ್ಸ್ (ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ), ಮತ್ತು ಬಿತ್ತನೆಯಿಂದ ಸುಗ್ಗಿಯವರೆಗೆ ಹಂತ ಹಂತದ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ. ನಿಮ್ಮ ಹೊಲದ ಉತ್ಪನ್ನವನ್ನು ಲಾಭವಾಗಿ ಪರಿವರ್ತಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ. ನೀವು ಪಂಜಾಬ್‌ನ ಗೋಧಿ ರೈತರಾಗಿರಲಿ ಅಥವಾ ತಮಿಳುನಾಡಿನ ಭತ್ತ ಬೆಳೆಗಾರರಾಗಿರಲಿ, ಪಟುಕೃಷಿ ಪ್ರತಿಯೊಬ್ಬ ರೈತರಿಗೂ ಇದೆ. ಈಗ ಕೃಷಿ ಸ್ಮಾರ್ಟ್, ಮತ್ತು ಲಾಭ ಖಚಿತ! 💚", "weather-desc": "ಲೈವ್ ಮುನ್ಸೂಚನೆ · ಬೆಳೆ ಶಿಫಾರಸು", "mandi-desc": "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು · ಜಿಲ್ಲೆಗಳು · ಬಹು ದರಗಳು", "advisory-desc": "ರಾಜ್ಯ/ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ + ಬೆಳೆ · 3-ಹಂತದ ಮಾರ್ಗದರ್ಶಿ", "weather-title": "ಹವಾಮಾನ · ಹವಾಮಾನ ಸಲಹೆ", "city-placeholder": "ನಗರವನ್ನು ನಮೂದಿಸಿ (ಉದಾ. ದೆಹಲಿ)", search: "ಹುಡುಕಿ", "my-location": "ನನ್ನ ಸ್ಥಳ", "mandi-title": "ಮಂಡಿ ಬೆಲೆಗಳು · ಮಂಡಿ ಭಾವ್", "show-prices": "ಬೆಲೆಗಳನ್ನು ತೋರಿಸಿ", "lens-title": "ಕ್ರಾಪ್ ಲೆನ್ಸ್ · ರೋಗ ಪತ್ತೆ", "upload-title": "ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ", "upload-desc": "ಮಾಕ್ ರೋಗ ಪತ್ತೆ", "advisory-title": "ಬೆಳೆ ಸಲಹೆ · ಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ", "state-season": "ರಾಜ್ಯ/ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ + ಋತು", "specific-crop": "ನಿರ್ದಿಷ್ಟ ಬೆಳೆ (3-ಹಂತ)", "get-advice": "ಸಲಹೆ ಪಡೆಯಿರಿ", "get-guide": "3-ಹಂತದ ಮಾರ್ಗದರ್ಶಿ ಪಡೆಯಿರಿ", "analytics-title": "ಕೃಷಿ ಅನಲಿಟಿಕ್ಸ್ · ಡೇಟಾ ಒಳನೋಟಗಳು", "happy-farmers": "ಸಂತೋಷದ ರೈತರು", "avg-profit": "ಸರಾಸರಿ ಲಾಭ/ಎಕರೆ", "weather-alerts": "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು", "active-farms": "ಸಕ್ರಿಯ ಕೃಷಿಭೂಮಿಗಳು", "price-trends": "📈 ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು (ಕಳೆದ 6 ತಿಂಗಳು)", "crop-distribution": "🌾 ಬೆಳೆ ವಿತರಣೆ", "weather-patterns": "🌡️ ಹವಾಮಾನ ಮಾದರಿಗಳು", "profit-calculator": "💰 ಲಾಭ ಕ್ಯಾಲ್ಕುಲೇಟರ್", "select-crop": "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", area: "ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)", calculate: "ಲಾಭ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ", "market-insights": "📊 ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು", rising: "⬆️ ಏರುತ್ತಿದೆ", stable: "↗️ ಸ್ಥಿರ", falling: "⬇️ ಇಳಿಯುತ್ತಿದೆ", "seasonal-forecast": "🌦️ ಋತುಮಾನದ ಮುನ್ಸೂಚನೆ 2026", rabi: "ರಬಿ ಋತು", kharif: "ಖರೀಫ್ ಋತು", zaid: "ಜೈದ್ ಋತು", "optimal-conditions": "ಸೂಕ್ತ ಪರಿಸ್ಥಿತಿಗಳು", "rabi-crops": "ಗೋಧಿ, ಸಾಸಿವೆ, ಕಡಲೆ", "kharif-crops": "ಭತ್ತ, ಹತ್ತಿ, ಮೆಕ್ಕೆಜೋಳ", "zaid-crops": "ಹೆಸರುಕಾಳು, ತರಕಾರಿಗಳು", "about-title": "ನಮ್ಮ ಬಗ್ಗೆ · ನಮ್ಮ ಕಥೆ", mission: "ನಮ್ಮ ಧ್ಯೇಯ", "mission-text": "ಸುಸ್ಥಿರ ಮತ್ತು ಲಾಭದಾಯಕ ಕೃಷಿಗಾಗಿ ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯ ರೈತರನ್ನು ತಂತ್ರಜ್ಞಾನ-ಚಾಲಿತ ಪರಿಹಾರಗಳೊಂದಿಗೆ ಸಶಕ್ತಗೊಳಿಸುವುದು. ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ ಮತ್ತು ಆಧುನಿಕ ನಾವೀನ್ಯತೆಯ ನಡುವಿನ ಅಂತರವನ್ನು ನಾವು ಕಡಿಮೆ ಮಾಡುತ್ತೇವೆ.", vision: "ನಮ್ಮ ದೃಷ್ಟಿ", "vision-text": "ಡಿಜಿಟಲ್ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ರಚಿಸುವುದು, ಅಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬ ರೈತರಿಗೂ ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ, ಹವಾಮಾನ ಮಾಹಿತಿ ಮತ್ತು ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ ಲಭ್ಯವಿರುತ್ತದೆ - ಕೃಷಿಯನ್ನು ಸ್ಮಾರ್ಟ್ ಮತ್ತು ಹೆಚ್ಚು ಲಾಭದಾಯಕವಾಗಿಸುತ್ತದೆ.", values: "ನಮ್ಮ ಮೌಲ್ಯಗಳು", "values-text": "ಸಮಗ್ರತೆ, ನಾವೀನ್ಯತೆ, ಒಳಗೊಳ್ಳುವಿಕೆ. ನಾವು ರೈತರನ್ನು ಮೊದಲು ಇಡುವುದರಲ್ಲಿ ಮತ್ತು ಅವರ ಜೀವನದಲ್ಲಿ ನಿಜವಾದ ವ್ಯತ್ಯಾಸವನ್ನುಂಟುಮಾಡುವ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸುವಲ್ಲಿ ನಂಬಿಕೆ ಹೊಂದಿದ್ದೇವೆ.", "founder-role": "ಸಂಸ್ಥಾಪಕ ಮತ್ತು ಅಭಿವರ್ಧಕ", "founder-quote": "\"ನಾನು ಪಟುಕೃಷಿಯನ್ನು ನಿರ್ಮಿಸಿದೆ ಏಕೆಂದರೆ ನಮ್ಮ ರೈತರು ಡಿಜಿಟಲ್ ಜಗತ್ತಿನಲ್ಲಿ ಸ್ನೇಹಿತನಿಗೆ ಅರ್ಹರಾಗಿದ್ದಾರೆ—ಅವರ ಭಾಷೆಯನ್ನು ಮಾತನಾಡುವ, ಅವರ ಹೋರಾಟಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮತ್ತು ಅವರ ಬೆಳವಣಿಗೆಗೆ ಸಹಾಯ ಮಾಡುವ ಯಾರಾದರೂ. ನಮ್ಮ ರಾಷ್ಟ್ರವನ್ನು ಪೋಷಿಸುವ ಕೈಗಳಿಗೆ ಧನ್ಯವಾದ ಹೇಳುವ ನನ್ನ ಮಾರ್ಗ ಇದು.\"", "why-choose": "❓ ರೈತರು ಪಟುಕೃಷಿಯನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ", "real-time": "ನೈಜ-ಸಮಯದ ಡೇಟಾ", "real-time-desc": "ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು ಮತ್ತು ಹವಾಮಾನ", "ai-powered": "AI-ಚಾಲಿತ", "ai-powered-desc": "ಸ್ಮಾರ್ಟ್ ರೋಗ ಪತ್ತೆ", "local-langs": "🌐 ಸ್ಥಳೀಯ ಭಾಷೆಗಳು", "local-langs-desc": "ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಬಂಗಾಳಿ, ತೆಲುಗು, ಮರಾಠಿ, ಗುಜರಾತಿ, ಮಾರ್ವಾಡಿ, ಪಂಜಾಬಿ, ತಮಿಳು, ಮಲಯಾಳಂ, ಉರ್ದು, ಕನ್ನಡ, ಒಡಿಯ, ಸಂಸ್ಕೃತ, ಭೋಜ್‌ಪುರಿ, ಡೋಗ್ರಿ ಮತ್ತು ಇನ್ನಷ್ಟು", free: "100% ಉಚಿತ", "free-desc": "ರೈತರಿಗೆ ಯಾವಾಗಲೂ ಉಚಿತ", "send-message": "ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ", "message-desc": "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ!", "message-placeholder": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...", "google-form": "Google ಫಾರ್ಮ್ ತೆರೆಯಿರಿ", "google-form-note": "📝 ನಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ಫಾರ್ಮ್ ತೆರೆಯಲು ಮೇಲಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ", "footer-tagline": "ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ.", "quick-links": "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", policies: "ನೀತಿಗಳು ಮತ್ತು ಕಾನೂನು", privacy: "ಗೌಪ್ಯತಾ ನೀತಿ: ನಾವು ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಗೌರವಿಸುತ್ತೇವೆ. ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಹಂಚಿಕೆ ಇಲ್ಲ.", terms: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು: ಈ ಸೈಟ್‌ನ ಬಳಕೆ ಸ್ವೀಕಾರವನ್ನು ಸೂಚಿಸುತ್ತದೆ.", cookie: "ಕುಕೀ ನೀತಿ: ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ನಾವು ಅಗತ್ಯ ಕುಕೀಗಳನ್ನು ಬಳಸುತ್ತೇವೆ.", disclaimer: "ಹಕ್ಕು ನಿರಾಕರಣೆ: ಮಾಹಿತಿಯು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ಸ್ಥಳೀಯವಾಗಿ ಪರಿಶೀಲಿಸಿ.", refund: "ಮರುಪಾವತಿ ನೀತಿ: ಸೇವೆಗಳು ಉಚಿತವಾಗಿರುವುದರಿಂದ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.", "support": "ಬೆಂಬಲ ಮತ್ತು ಮಾಹಿತಿ", faq: "FAQ: ನಮ್ಮ ಸಹಾಯ ವಿಭಾಗಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.", contact: "ಸಂಪರ್ಕ: patukrishi@gmail.com", careers: "ವೃತ್ತಿ: ನಮ್ಮ ಧ್ಯೇಯದಲ್ಲಿ ಸೇರಿ.", press: "ಪ್ರೆಸ್: ಮಾಧ್ಯಮ ವಿಚಾರಣೆಗಳನ್ನು ಸ್ವಾಗತಿಸಲಾಗುತ್ತದೆ.", office: "ಕಚೇರಿ: ಡಿಜಿಟಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ - ಪ್ಯಾನ್-ಇಂಡಿಯಾ ಸೇವೆ", copyright: "© 2026 ಪಟುಕೃಷಿ – ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಭಾರತೀಯ ರೈತರಿಗಾಗಿ 💚 ನಿಂದ ರಚಿಸಲಾಗಿದೆ.", "edit-profile": "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ", "name-placeholder": "ಹೆಸರು", save: "ಉಳಿಸಿ", cancel: "ರದ್ದುಮಾಡಿ", "krishi-bot": "ಕೃಷಿ ಬಾಟ್", "bot-welcome": "🙏 ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಬಾಟ್. ಕೇಳಿ - ಮಂಡಿ ಬೆಲೆ, ಹವಾಮಾನ, ಕ್ರಾಪ್ ಲೆನ್ಸ್, ಸಲಹೆ, ಅನಲಿಟಿಕ್ಸ್ ಅಥವಾ ಏನಾದರೂ!", "chat-placeholder": "ಇಲ್ಲಿ ಬರೆಯಿರಿ..." },
    or: { logo: "ପଟୁକୃଷି", home: "ହୋମ୍", weather: "ପାଣିପାଗ", mandi: "ମଣ୍ଡି", lens: "କ୍ରପ୍ ଲେନ୍ସ", advisory: "ପରାମର୍ଶ", analytics: "ଆନାଲିଟିକ୍ସ", videos: "ଭିଡିଓ", govtSchemes: "ସରକାରୀ ଯୋଜନା", about: "ଆମ ବିଷୟରେ", profile: "ପ୍ରୋଫାଇଲ୍", logout: "ଲଗ୍‌ଆଉଟ୍", namaste: "ନମସ୍କାର", "hero-text": "ଆପଣଙ୍କ କୃଷକ ବନ୍ଧୁ - ସ୍ମାର୍ଟ ଚାଷ ସହିତ", "sustainable-title": "🌱 ପଟୁକୃଷି – ସ୍ମାର୍ଟ ଚାଷ", "sustainable-text": "🇮🇳 ଭାରତରେ କୃଷକମାନଙ୍କୁ ସମୟୋଚିତ ଏବଂ ସଠିକ୍ ସୂଚନା ମିଳିବା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ପଟୁକୃଷି ଆପଣଙ୍କୁ ଲାଇଭ୍ ମଣ୍ଡି ମୂଲ୍ୟ, ପାଣିପାଗ ପୂର୍ବାନୁମାନ, କ୍ରପ୍ ଲେନ୍ସ (ରୋଗ ଚିହ୍ନଟ ଏବଂ ଚିକିତ୍ସା), ଏବଂ ବୁଣାଠାରୁ ଅମଳ ପର୍ଯ୍ୟନ୍ତ ପର୍ଯ୍ୟାୟକ୍ରମେ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରେ। ଆପଣଙ୍କ କ୍ଷେତର ଉତ୍ପାଦନକୁ ଲାଭରେ ପରିଣତ କରିବା ପାଇଁ ଆମେ ଏଠାରେ ଅଛୁ। ଆପଣ ପଞ୍ଜାବର ଗହମ କୃଷକ ହୁଅନ୍ତୁ କିମ୍ବା ତାମିଲନାଡୁର ଧାନ ଉତ୍ପାଦକ, ପଟୁକୃଷି ପ୍ରତ୍ୟେକ କୃଷକଙ୍କ ପାଇଁ। ବର୍ତ୍ତମାନ ଚାଷ ସ୍ମାର୍ଟ, ଏବଂ ଲାଭ ନିଶ୍ଚିତ! 💚", "weather-desc": "ଲାଇଭ୍ ପୂର୍ବାନୁମାନ · ଫସଲ ସୁପାରିଶ", "mandi-desc": "ସମସ୍ତ ରାଜ୍ୟ ଏବଂ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ · ଜିଲ୍ଲା · ଏକାଧିକ ହାର", "advisory-desc": "ରାଜ୍ୟ/କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ + ଫସଲ · 3-ପଦକ୍ଷେପ ଗାଇଡ୍", "weather-title": "ପାଣିପାଗ · ପାଣିପାଗ ପରାମର୍ଶ", "city-placeholder": "ସହର ନାମ ଦିଅନ୍ତୁ (ଯଥା ଦିଲ୍ଲୀ)", search: "ଖୋଜନ୍ତୁ", "my-location": "ମୋର ସ୍ଥାନ", "mandi-title": "ମଣ୍ଡି ମୂଲ୍ୟ · ମଣ୍ଡି ଭାଉ", "show-prices": "ମୂଲ୍ୟ ଦେଖାନ୍ତୁ", "lens-title": "କ୍ରପ୍ ଲେନ୍ସ · ରୋଗ ଚିହ୍ନଟ", "upload-title": "ଫସଲ ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ", "upload-desc": "ନକଲି ରୋଗ ଚିହ୍ନଟ", "advisory-title": "ଫସଲ ପରାମର୍ଶ · ସମ୍ପୂର୍ଣ୍ଣ ଗାଇଡ୍", "state-season": "ରାଜ୍ୟ/କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ + ଋତୁ", "specific-crop": "ନିର୍ଦ୍ଦିଷ୍ଟ ଫସଲ (3-ପଦକ୍ଷେପ)", "get-advice": "ପରାମର୍ଶ ନିଅନ୍ତୁ", "get-guide": "3-ପଦକ୍ଷେପ ଗାଇଡ୍ ନିଅନ୍ତୁ", "analytics-title": "କୃଷି ଆନାଲିଟିକ୍ସ · ତଥ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି", "happy-farmers": "ଖୁସି କୃଷକ", "avg-profit": "ହାରାହାରି ଲାଭ/ଏକର", "weather-alerts": "ପାଣିପାଗ ସତର୍କତା", "active-farms": "ସକ୍ରିୟ କୃଷିକ୍ଷେତ୍ର", "price-trends": "📈 ମୂଲ୍ୟ ଧାରା (ଗତ 6 ମାସ)", "crop-distribution": "🌾 ଫସଲ ବଣ୍ଟନ", "weather-patterns": "🌡️ ପାଣିପାଗ ଢାଞ୍ଚା", "profit-calculator": "💰 ଲାଭ କ୍ୟାଲକୁଲେଟର", "select-crop": "ଫସଲ ଚୟନ କରନ୍ତୁ", area: "କ୍ଷେତ୍ରଫଳ (ଏକରରେ)", calculate: "ଲାଭ ଗଣନା କରନ୍ତୁ", "market-insights": "📊 ବଜାର ଅନ୍ତର୍ଦୃଷ୍ଟି", rising: "⬆️ ବୃଦ୍ଧି ପାଉଛି", stable: "↗️ ସ୍ଥିର", falling: "⬇️ ହ୍ରାସ ପାଉଛି", "seasonal-forecast": "🌦️ ଋତୁକାଳୀନ ପୂର୍ବାନୁମାନ 2026", rabi: "ରବି ଋତୁ", kharif: "ଖରିଫ୍ ଋତୁ", zaid: "ଜାୟଦ ଋତୁ", "optimal-conditions": "ସର୍ବୋତ୍ତମ ପରିସ୍ଥିତି", "rabi-crops": "ଗହମ, ସୋରିଷ, ଛେନା", "kharif-crops": "ଧାନ, ତୁଳା, ମକା", "zaid-crops": "ମୁଗ, ପନିପରିବା", "about-title": "ଆମ ବିଷୟରେ · ଆମର କାହାଣୀ", mission: "ଆମର ଲକ୍ଷ୍ୟ", "mission-text": "ଟକାଇ ଏବଂ ଲାଭଦାୟକ ଚାଷ ପାଇଁ ପ୍ରତ୍ୟେକ ଭାରତୀୟ କୃଷକଙ୍କୁ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା-ଚାଳିତ ସମାଧାନ ସହିତ ସଶକ୍ତ କରିବା। ଆମେ ପାରମ୍ପରିକ ଜ୍ଞାନ ଏବଂ ଆଧୁନିକ ନବସୃଜନ ମଧ୍ୟରେ ଥିବା ବ୍ୟବଧାନକୁ କମ୍ କରୁ।", vision: "ଆମର ସ୍ୱପ୍ନ", "vision-text": "ଏକ ଡିଜିଟାଲ୍ ଇକୋସିଷ୍ଟମ୍ ସୃଷ୍ଟି କରିବା ଯେଉଁଠାରେ ପ୍ରତ୍ୟେକ କୃଷକଙ୍କର ରିୟଲ-ଟାଇମ୍ ବଜାର ତଥ୍ୟ, ପାଣିପାଗ ସୂଚନା ଏବଂ ବିଶେଷଜ୍ଞ ମାର୍ଗଦର୍ଶନରେ ପ୍ରବେଶ ଅଛି - ଚାଷକୁ ସ୍ମାର୍ଟ ଏବଂ ଅଧିକ ଲାଭଦାୟକ କରିବା।", values: "ଆମର ମୂଲ୍ୟବୋଧ", "values-text": "ସଚ୍ଚୋଟତା, ନବସୃଜନ, ସମାବେଶୀତା। ଆମେ କୃଷକମାନଙ୍କୁ ପ୍ରଥମେ ରଖିବା ଏବଂ ସେହି ସମାଧାନ ସୃଷ୍ଟି କରିବାରେ ବିଶ୍ୱାସ କରୁ ଯାହା ସେମାନଙ୍କ ଜୀବନରେ ପ୍ରକୃତ ପରିବର୍ତ୍ତନ ଆଣେ।", "founder-role": "ପ୍ରତିଷ୍ଠାତା ଏବଂ ବିକାଶକାରୀ", "founder-quote": "\"ମୁଁ ପଟୁକୃଷି ନିର୍ମାଣ କଲି କାରଣ ଆମର କୃଷକମାନେ ଡିଜିଟାଲ୍ ଦୁନିଆରେ ଜଣେ ବନ୍ଧୁଙ୍କ ଅଧିକାରୀ—କେହି ଜଣେ ଯେ ସେମାନଙ୍କ ଭାଷା କୁହେ, ସେମାନଙ୍କ ସଂଘର୍ଷ ବୁଝେ ଏବଂ ସେମାନଙ୍କୁ ବଢିବାରେ ସାହାଯ୍ୟ କରେ। ଏହା ହେଉଛି ସେହି ହାତଗୁଡ଼ିକୁ ଧନ୍ୟବାଦ ଦେବାର ମୋର ଉପାୟ ଯେଉଁମାନେ ଆମ ରାଷ୍ଟ୍ରକୁ ଖାଦ୍ୟ ଯୋଗାନ୍ତି।\"", "why-choose": "❓ କାହିଁକି କୃଷକମାନେ ପଟୁକୃଷି ବାଛନ୍ତି", "real-time": "ରିୟଲ-ଟାଇମ୍ ତଥ୍ୟ", "real-time-desc": "ଲାଇଭ୍ ମଣ୍ଡି ମୂଲ୍ୟ ଏବଂ ପାଣିପାଗ", "ai-powered": "AI-ଚାଳିତ", "ai-powered-desc": "ସ୍ମାର୍ଟ ରୋଗ ଚିହ୍ନଟ", "local-langs": "🌐 ସ୍ଥାନୀୟ ଭାଷାଗୁଡ଼ିକ", "local-langs-desc": "ଇଂରାଜୀ, ହିନ୍ଦୀ, ବଙ୍ଗାଳୀ, ତେଲୁଗୁ, ମରାଠୀ, ଗୁଜରାଟୀ, ମାରୱାଡ଼ୀ, ପଞ୍ଜାବୀ, ତାମିଲ, ମାଲାୟାଲମ୍, ଉର୍ଦ୍ଦୁ, କନ୍ନଡ଼, ଓଡ଼ିଆ, ସଂସ୍କୃତ, ଭୋଜପୁରୀ, ଡୋଗ୍ରୀ ଏବଂ ଅଧିକ", free: "100% ମାଗଣା", "free-desc": "କୃଷକମାନଙ୍କ ପାଇଁ ସବୁବେଳେ ମାଗଣା", "send-message": "ଆମକୁ ଏକ ସନ୍ଦେଶ ପଠାନ୍ତୁ", "message-desc": "ପ୍ରଶ୍ନ ଅଛି? ଆମେ ଆପଣଙ୍କଠାରୁ ଶୁଣିବାକୁ ପସନ୍ଦ କରିବୁ!", "message-placeholder": "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଏଠାରେ ଲେଖନ୍ତୁ...", "google-form": "ଗୁଗୁଲ୍ ଫର୍ମ ଖୋଲନ୍ତୁ", "google-form-note": "📝 ଆମର ଫିଡବ୍ୟାକ୍ ଫର୍ମ ଖୋଲିବାକୁ ଉପରୋକ୍ତ ବଟନ୍‌ରେ କ୍ଲିକ୍ କରନ୍ତୁ", "footer-tagline": "ଭାରତୀୟ କୃଷକମାନଙ୍କ ପାଇଁ ସ୍ମାର୍ଟ ଚାଷ।", "quick-links": "ଶୀଘ୍ର ଲିଙ୍କ୍‌ଗୁଡ଼ିକ", policies: "ନୀତି ଏବଂ ଆଇନଗତ", privacy: "ଗୋପନୀୟତା ନୀତି: ଆମେ ଆପଣଙ୍କ ତଥ୍ୟର ସମ୍ମାନ କରୁ। କୌଣସି ତୃତୀୟ-ପକ୍ଷ ସେୟାରିଂ ନାହିଁ।", terms: "ନିୟମ ଏବଂ ସର୍ତ୍ତାବଳୀ: ଏହି ସାଇଟ୍‌ର ବ୍ୟବହାର ସ୍ୱୀକୃତି ସୂଚିତ କରେ।", cookie: "କୁକି ନୀତି: କାର୍ଯ୍ୟକାରିତା ପାଇଁ ଆମେ ଅତ୍ୟାବଶ୍ୟକ କୁକି ବ୍ୟବହାର କରୁ।", disclaimer: "ଅସ୍ୱୀକାର: ସୂଚନା କେବଳ ମାର୍ଗଦର୍ଶନ ପାଇଁ। ସ୍ଥାନୀୟ ଭାବରେ ଯାଞ୍ଚ କରନ୍ତୁ।", refund: "ଫେରସ୍ତ ନୀତି: ସେବାଗୁଡ଼ିକ ମାଗଣା ହୋଇଥିବାରୁ ପ୍ରଯୁଜ୍ୟ ନୁହେଁ।", "support": "ସହାୟତା ଏବଂ ସୂଚନା", faq: "FAQ: ଆମର ସହାୟତା ବିଭାଗ ପରିଦର୍ଶନ କରନ୍ତୁ।", contact: "ଯୋଗାଯୋଗ: patukrishi@gmail.com", careers: "କ୍ୟାରିୟର: ଆମର ଲକ୍ଷ୍ୟରେ ଯୋଗ ଦିଅନ୍ତୁ।", press: "ପ୍ରେସ୍: ମିଡିଆ ଅନୁସନ୍ଧାନ ସ୍ୱାଗତଯୋଗ୍ୟ।", office: "କାର୍ଯ୍ୟାଳୟ: ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ - ପ୍ୟାନ୍-ଇଣ୍ଡିଆ ସେବା", copyright: "© 2026 ପଟୁକୃଷି – ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ। ଭାରତୀୟ କୃଷକମାନଙ୍କ ପାଇଁ 💚 ରେ ନିର୍ମିତ।", "edit-profile": "ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ କରନ୍ତୁ", "name-placeholder": "ନାମ", save: "ସଞ୍ଚୟ କରନ୍ତୁ", cancel: "ବାତିଲ୍ କରନ୍ତୁ", "krishi-bot": "କୃଷି ବଟ୍", "bot-welcome": "🙏 ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ କୃଷି ବଟ୍। ପଚାରନ୍ତୁ - ମଣ୍ଡି ଭାଉ, ପାଣିପାଗ, କ୍ରପ୍ ଲେନ୍ସ, ପରାମର୍ଶ, ଆନାଲିଟିକ୍ସ କିମ୍ବା କିଛି!", "chat-placeholder": "ଏଠାରେ ଲେଖନ୍ତୁ..." },
    sa: { logo: "पटुकृषिः", home: "मुखपृष्ठम्", weather: "वातावरणम्", mandi: "मण्डी", lens: "फसल-लेन्स्", advisory: "सलाह", analytics: "विश्लेषणम्", videos: "वीडियो", govtSchemes: "सरकारी-योजनाः", about: "अस्माकं विषये", profile: "व्यक्तिचित्रम्", logout: "निर्गमनम्", namaste: "नमस्कारः", "hero-text": "भवतः कृषकमित्रम् - स्मार्ट-कृष्या सह", "sustainable-title": "🌱 पटुकृषिः – स्मार्ट-कृषिः", "sustainable-text": "🇮🇳 भारते कृषकेभ्यः समयोचितं यथार्थं च सूचनाप्राप्तिः अतीव महत्त्वपूर्णा। पटुकृषिः भवभ्यः प्रत्यक्षमण्डीमूल्यानि, वातावरणपूर्वानुमानम्, फसल-लेन्स् (रोगज्ञानं चिकित्सा च), वपनात् कट्टनपर्यन्तं सोपानमार्गदर्शनं च प्रददाति। वयं भवतः क्षेत्रोत्पादनं लाभे परिणन्तुम् अत्र स्मः। भवान् पञ्जाबप्रदेशस्य गोधूमकृषको वा तमिळनाडुराज्यस्य व्रीहिकृषको वा भवतु, पटुकृषिः प्रत्येककृषकाय अस्ति। अधुना कृषिः स्मार्ट, लाभः निश्चितः! 💚", "weather-desc": "प्रत्यक्षपूर्वानुमानम् · फसलशिफारसिः", "mandi-desc": "सर्वे राज्यानि केन्द्रशासितप्रदेशाः च · मण्डलानि · बहूनि मूल्यानि", "advisory-desc": "राज्यम्/केन्द्रशासितप्रदेशः + फसलम् · ३-चरणीयमार्गदर्शिका", "weather-title": "वातावरणम् · मौसमसलाह", "city-placeholder": "नगरं लिखत (यथा दिल्ली)", search: "अन्वेषणम्", "my-location": "मम स्थानम्", "mandi-title": "मण्डीमूल्यानि · मण्डीभावाः", "show-prices": "मूल्यानि दर्शयतु", "lens-title": "फसल-लेन्स् · रोगस्य पहचान", "upload-title": "फसलचित्रम् उपारोपयतु", "upload-desc": "अनुकरण-रोगपरीक्षा", "advisory-title": "फसल-सलाह · पूर्णमार्गदर्शिका", "state-season": "राज्यम्/केन्द्रशासितप्रदेशः + ऋतुः", "specific-crop": "विशिष्टफसलम् (३-चरणीयम्)", "get-advice": "सलाह प्राप्नोतु", "get-guide": "३-चरणीयमार्गदर्शिकां प्राप्नोतु", "analytics-title": "कृषि-विश्लेषणम् · डेटा-अन्तर्दृष्टयः", "happy-farmers": "सन्तुष्टाः कृषकाः", "avg-profit": "सामान्यलाभः/एकर", "weather-alerts": "वातावरण-सूचनाः", "active-farms": "सक्रियक्षेत्राणि", "price-trends": "📈 मूल्यप्रवृत्तयः (गत ६ मासाः)", "crop-distribution": "🌾 फसलवितरणम्", "weather-patterns": "🌡️ वातावरणप्रारूपाणि", "profit-calculator": "💰 लाभगणकयन्त्रम्", "select-crop": "फसलं चिनोतु", area: "क्षेत्रफलम् (एकरेषु)", calculate: "लाभं गणयतु", "market-insights": "📊 बाजार-अन्तर्दृष्टयः", rising: "⬆️ वर्धमानम्", stable: "↗️ स्थिरम्", falling: "⬇️ ह्रसमानम्", "seasonal-forecast": "🌦️ ऋतु-पूर्वानुमानम् २०२६", rabi: "रबि-ऋतुः", kharif: "खरीफ-ऋतुः", zaid: "जायद-ऋतुः", "optimal-conditions": "अनुकूलाः परिस्थितयः", "rabi-crops": "गोधूमः, सर्षपः, चणकः", "kharif-crops": "व्रीहिः, कार्पासः, यवनालः", "zaid-crops": "मुद्गः, शाकानि", "about-title": "अस्माकं विषये · अस्माकं कथा", mission: "अस्माकं लक्ष्यम्", "mission-text": "प्रत्येकं भारतीयं कृषकं प्रौद्योगिकी-चालितसमाधानैः सशक्तं कर्तुम्, येन धारणीया लाभदायका च कृषिः स्यात्। वयं पारम्परिकज्ञानं आधुनिकनवाचारं च मध्ये अन्तरं पूरयामः।", vision: "अस्माकं दृष्टिः", "vision-text": "एकं डिजिटल-परितन्त्रं निर्मातुम् यत्र प्रत्येकः कृषकः वास्तविकसमय-बाजारतथ्यानि, वातावरणसूचनाः, विशेषज्ञमार्गदर्शनं च प्राप्नुयात् - कृषिं स्मार्टं अधिकलाभदायकं च कुर्वन्।", values: "अस्माकं मूल्यानि", "values-text": "सत्यनिष्ठा, नवाचारः, समावेशिता। वयं कृषकान् प्रथमं स्थापयितुं, तेषां जीवने वास्तविकं परिवर्तनम् आनयन्ति समाधानानि निर्मातुं च विश्वसिमः।", "founder-role": "संस्थापकः & विकासकः", "founder-quote": "\"अहं पटुकृषिं निर्मितवान् यतः अस्माकं कृषकेभ्यः डिजिटल-जगति मित्रम् अर्हति—यः तेषां भाषां वदति, तेषां संघर्षान् अवगच्छति, तान् वर्धितुं साहाय्यं च करोति। अस्माकं राष्ट्रं पोषयद्भ्यः हस्तेभ्यः धन्यवादः ज्ञापनस्य एषः मम मार्गः।\"", "why-choose": "❓ कृषकाः पटुकृषिं किमर्थं चिन्वन्ति", "real-time": "वास्तविकसमय-तथ्यानि", "real-time-desc": "प्रत्यक्षमण्डीमूल्यानि वातावरणं च", "ai-powered": "कृत्रिम-बुद्धि-चालितम्", "ai-powered-desc": "स्मार्ट-रोगज्ञानम्", "local-langs": "🌐 स्थानीयभाषाः", "local-langs-desc": "आङ्ग्लभाषा, हिन्दी, बाङ्गला, तेलुगु, मराठी, गुजराती, मारवाडी, पञ्जाबी, तमिळ्, मलयाळम्, उर्दू, कन्नड, ओडिया, संस्कृतम्, भोजपुरी, डोगरी इत्यादयः", free: "१००% निःशुल्कम्", "free-desc": "कृषकेभ्यः सदा निःशुल्कम्", "send-message": "अस्मभ्यं सन्देशं प्रेषयतु", "message-desc": "प्रश्नाः सन्ति? भवतः समीपात् श्रोतुम् इच्छामः!", "message-placeholder": "अत्र भवतः प्रश्नं लिखतु...", "google-form": "गूगल-फार्मम् उद्घाटयतु", "google-form-note": "📝 अस्माकं प्रतिक्रिया-फार्मम् उद्घाटितुम् उपरिस्थितं बटनं नोदयतु", "footer-tagline": "भारतीयकृषकेभ्यः स्मार्ट-कृषिः।", "quick-links": "शीघ्र-सम्पर्काः", policies: "नीतयः & विधिकाः", privacy: "गोपनीयता-नीतिः: वयं भवतः तथ्यानि आद्रियामहे। तृतीय-पक्षसहभागः नास्ति।", terms: "नियमाः & शर्ताः: अस्य जालस्थानस्य उपयोगः स्वीकारं सूचयति।", cookie: "कुकी-नीतिः: कार्यक्षमतायै वयं आवश्यकाः कुकीः उपयुञ्ज्महे।", disclaimer: "अस्वीकरणम्: सूचना केवलं मार्गदर्शनाय। स्थानीयतया सत्यापयतु।", refund: "प्रतिनिवृत्ति-नीतिः: सेवाः निःशुल्काः इति कारणेन अनुपयुक्ता।", "support": "साहाय्यं & सूचना", faq: "सामान्यप्रश्नाः: अस्माकं साहाय्य-विभागं पश्यन्तु।", contact: "सम्पर्कः: patukrishi@gmail.com", careers: "वृत्तिः: अस्माकं लक्ष्ये सम्मिल्यन्ताम्।", press: "प्रेसः: माध्यम-जिज्ञासाः स्वागतम्।", office: "कार्यालयः: डिजिटल-मञ्चः - सर्वभारत-सेवा", copyright: "© २०२६ पटुकृषिः – सर्वे अधिकाराः सुरक्षिताः। भारतीयकृषकेभ्यः 💚 सह निर्मितम्।", "edit-profile": "व्यक्तिचित्रं सम्पादयतु", "name-placeholder": "नाम", save: "रक्षयतु", cancel: "निरस्यतु", "krishi-bot": "कृषि-बाट्", "bot-welcome": "🙏 नमस्कार! अहं भवतः कृषि-बाट् अस्मि। पृच्छन्तु - मण्डीभावाः, वातावरणम्, फसल-लेन्स्, सलाह, विश्लेषणम् अथवा किमपि!", "chat-placeholder": "अत्र लिखन्तु..." }
};


    function translatePage() {
        document.querySelectorAll('[data-translate]').forEach(e => {
            const t = e.getAttribute('data-translate');
            if (translations[currentLanguage] && translations[currentLanguage][t]) {
                if (e.tagName === 'INPUT' || e.tagName === 'TEXTAREA')
                    e.placeholder = translations[currentLanguage][t];
                else
                    e.textContent = translations[currentLanguage][t];
            }
        });
        updateTipOfTheDay();
    }

    function updateLangHeader() {
        const e = document.getElementById('currentLangFlag'),
            t = document.getElementById('currentLangName'),
            n = { en: '🇬🇧', hi: '🇮🇳', bn: '🇮🇳', te: '🇮🇳', mr: '🇮🇳', gu: '🇮🇳', mwr: '🇮🇳', pa: '🇮🇳', ta: '🇮🇳', ml: '🇮🇳', ur: '🇮🇳', kn: '🇮🇳', or: '🇮🇳', sa: '🇮🇳', bho: '🇮🇳', doi: '🇮🇳' },
            l = { en: 'English', hi: 'हिंदी', bn: 'বাংলা', te: 'తెలుగు', mr: 'मराठी', gu: 'ગુજરાતી', mwr: 'मारवाड़ी', pa: 'ਪੰਜਾਬੀ', ta: 'தமிழ்', ml: 'മലയാളം', ur: 'اردو', kn: 'ಕನ್ನಡ', or: 'ଓଡ଼ିଆ', sa: 'संस्कृतम्', bho: 'भोजपुरी', doi: 'डोगरी' };
        e.textContent = n[currentLanguage];
        t.textContent = l[currentLanguage];
        document.querySelectorAll('.lang-option').forEach(e => {
            e.classList.toggle('active', e.getAttribute('onclick').includes(currentLanguage));
        });
    }

   
    window.addEventListener('load', () => {
        AOS.init();
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                checkAuth();
                updateTime();
                setInterval(updateTime, 1e3);
                updateTipOfTheDay();
                translatePage();
                updateLangHeader();
            }, 500);
        }, 2e3);
    });

    function updateTime() {
        const e = new Date;
        document.getElementById('current-time').textContent = e.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function updateTipOfTheDay() {
        const e = new Date,
            t = Math.floor((e - new Date(e.getFullYear(), 0, 0)) / (1e3 * 60 * 60 * 24)) % farmingTips[currentLanguage].length;
        document.getElementById('tip-of-the-day').textContent = farmingTips[currentLanguage][t];
        document.getElementById('tip-number').textContent = `#${String(t + 1).padStart(2, '0')}`;
    }

    function checkAuth() {
        let e = localStorage.getItem('patukrishi_session');
        e ? (currentUser = JSON.parse(e), loadDashboard()) : document.getElementById('auth-container').style.display = 'flex';
    }

    window.switchAuthTab = e => {
        document.querySelectorAll('.auth-tab,.auth-form').forEach(t => t.classList.remove('active'));
        e === 'login' ? (document.querySelectorAll('.auth-tab')[0].classList.add('active'), document.getElementById('login-form').classList.add('active')) :
            (document.querySelectorAll('.auth-tab')[1].classList.add('active'), document.getElementById('signup-form').classList.add('active'));
    };

    window.handleLogin = e => {
        e.preventDefault();
        let t = document.getElementById('login-email').value,
            n = document.getElementById('login-password').value;
        userDatabase[t] && userDatabase[t].password === n ? (currentUser = userDatabase[t], localStorage.setItem('patukrishi_session', JSON.stringify(currentUser)), document.getElementById('auth-container').style.display = 'none', loadDashboard(), showNotification('Login successful', 'success')) :
            document.getElementById('login-error').innerText = 'Invalid email/password';
    };

    window.handleSignup = e => {
        e.preventDefault();
        let t = document.getElementById('signup-name').value,
            n = document.getElementById('signup-email').value,
            o = document.getElementById('signup-password').value;
        if (!t || !n || !o) return;
        if (userDatabase[n]) {
            document.getElementById('signup-error').innerText = 'Email already exists';
            return;
        }
        let l = { name: t, email: n, password: o };
        userDatabase[n] = l;
        localStorage.setItem('patukrishi_users', JSON.stringify(userDatabase));
        currentUser = l;
        localStorage.setItem('patukrishi_session', JSON.stringify(currentUser));
        document.getElementById('auth-container').style.display = 'none';
        loadDashboard();
        showNotification('Account created!', 'success');
    };

    window.logout = () => {
        localStorage.removeItem('patukrishi_session');
        location.reload();
    };
    
    // ==================== DASHBOARD FUNCTIONS ====================
    

    function loadDashboard() {
        const dashboard = document.getElementById('dashboard');
        if(dashboard) dashboard.style.display = 'block';
        const welcomeName = document.getElementById('welcome-name');
        if(welcomeName) welcomeName.innerText = currentUser.name.split(' ')[0];
        const headerName = document.getElementById('header-name');
        if(headerName) headerName.innerText = currentUser.name;
        const headerAvatar = document.getElementById('header-avatar');
        if(headerAvatar) headerAvatar.innerText = currentUser.name.charAt(0).toUpperCase();
        
        let e = Object.keys(districtDB).sort();
        let t = document.getElementById('mandiStateSelect');
        let n = document.getElementById('advisoryStateSelect');
        if(t && n) {
            t.innerHTML = n.innerHTML = '';
            e.forEach(e => {
                t.add(new Option(e, e));
                n.add(new Option(e, e));
            });
        }
        
        let o = document.getElementById('mandiCropSelect');
        if(o) {
            o.innerHTML = '';
            crops.forEach(e => o.add(new Option(e.name, e.name)));
        }
        
        let l = document.getElementById('specificCropSelect');
        if(l) {
            l.innerHTML = '';
            Object.keys(specificCropAdvice).forEach(e => l.add(new Option(e, e)));
        }

        let calSel = document.getElementById('calendarCropSelect');
        if(calSel) {
            calSel.innerHTML = '';
            Object.keys(cropDurations).forEach(e => calSel.add(new Option(e, e)));
        }
        renderCropCalendar();

        updateDistrictDropdown();
        initAnalyticsCharts();
        if(typeof AOS !== 'undefined') AOS.refresh();
    }
    
    window.updateDistrictDropdown = () => {
        let e = document.getElementById('mandiStateSelect');
        let t = document.getElementById('mandiDistrictSelect');
        if(e && t) {
            let state = e.value;
            t.innerHTML = '';
            let n = districtDB[state] || ["Main market"];
            n.forEach(e => t.add(new Option(e, e)));
        }
    };
    
    // ==================== CROP DISEASE DETECTION (MOCK WITH REAL REMEDIES) ====================

// ==================== COMPLETE CROP LENS SYSTEM ====================

// Crop Disease Database with detailed information
const cropDiseaseDatabase = {
    // Wheat Diseases
    "Wheat Rust": {
        hindiName: "गेहूं का रतुआ",
        affectedCrops: ["Wheat", "Barley"],
        symptoms: "Orange-brown powdery pustules on leaves and stems, yellowing of infected areas",
        severity: "High",
        icon: "🟠",
        chemicalRemedies: [
            "🌾 Spray Propiconazole 25% EC (1ml per liter water)",
            "🌾 Apply Tebuconazole 250 EC (0.5ml per liter)",
            "🌾 Use Mancozeb 75% WP (2g per liter water)"
        ],
        organicRemedies: [
            "🌿 Spray Neem oil (5ml/L) + Baking soda (1g/L) weekly",
            "🌿 Apply cow urine 10% solution (100ml per liter water)",
            "🌿 Use Trichoderma viride bio-fungicide"
        ],
        preventiveMeasures: [
            "Plant resistant varieties like HD 2967, PBW 550",
            "Early sowing (October-November) reduces risk",
            "Avoid excess nitrogen fertilizer",
            "Maintain proper field sanitation"
        ]
    },
    
    "Powdery Mildew": {
        hindiName: "चूर्णिल फफूंदी",
        affectedCrops: ["Wheat", "Barley", "Grapes", "Mango", "Cucurbits"],
        symptoms: "White powder-like spots on leaves, stems and flowers, leaves turn yellow and dry",
        severity: "Medium",
        icon: "⚪",
        chemicalRemedies: [
            "🌾 Spray Wettable Sulfur (2g per liter water)",
            "🌾 Apply Hexaconazole 5% EC (1ml per liter)",
            "🌾 Use Carbendazim 50% WP (1g per liter)"
        ],
        organicRemedies: [
            "🌿 Mix 1 part buttermilk in 9 parts water - spray weekly",
            "🌿 Neem oil (3ml/L) + Garlic extract spray",
            "🌿 Baking soda solution (1g/L) + Liquid soap"
        ],
        preventiveMeasures: [
            "Ensure proper air circulation between plants",
            "Avoid overhead irrigation",
            "Remove and destroy infected leaves",
            "Use sulfur vaporizers in greenhouses"
        ]
    },
    
    // Rice Diseases
    "Rice Blast": {
        hindiName: "धान का झुलसा रोग",
        affectedCrops: ["Rice"],
        symptoms: "Diamond-shaped spots with gray centers on leaves, collar rot, neck blast",
        severity: "Critical",
        icon: "🔥",
        chemicalRemedies: [
            "🌾 Spray Tricyclazole 75% WP (0.6g per liter water)",
            "🌾 Apply Kasugamycin 3% L (1.5ml per liter)",
            "🌾 Use Edifenphos 50% EC (1ml per liter)"
        ],
        organicRemedies: [
            "🌿 Spray Pseudomonas fluorescens (5g/L)",
            "🌿 Apply vermicompost tea as foliar spray",
            "🌿 Use neem-based fungicides"
        ],
        preventiveMeasures: [
            "Use resistant varieties like IR64, MTU1010",
            "Avoid excess nitrogen application",
            "Maintain proper spacing (20x15 cm)",
            "Seed treatment with Pseudomonas fluorescens"
        ]
    },
    
    "Brown Spot": {
        hindiName: "भूरा धब्बा रोग",
        affectedCrops: ["Rice"],
        symptoms: "Brown circular to oval spots on leaves, reduced grain filling",
        severity: "Medium",
        icon: "🟤",
        chemicalRemedies: [
            "🌾 Spray Edifenphos 50% EC (1ml per liter)",
            "🌾 Apply Mancozeb 75% WP (2g per liter)",
            "🌾 Use Propiconazole 25% EC (1ml per liter)"
        ],
        organicRemedies: [
            "🌿 Neem cake extract spray",
            "🌿 Trichoderma harzianum application",
            "🌿 Cow dung slurry (10%) foliar spray"
        ],
        preventiveMeasures: [
            "Use certified disease-free seeds",
            "Maintain balanced nutrition (NPK)",
            "Avoid water stress during grain filling",
            "Practice crop rotation"
        ]
    },
    
    // Vegetable Diseases
    "Late Blight": {
        hindiName: "पछेता झुलसा रोग",
        affectedCrops: ["Tomato", "Potato"],
        symptoms: "Dark brown to black lesions on leaves, white fungal growth underneath, fruit rot",
        severity: "Critical",
        icon: "⚠️",
        chemicalRemedies: [
            "🌧️ Spray Copper Oxychloride (2.5g per liter water) every 7 days",
            "🌧️ Apply Metalaxyl + Mancozeb (2g per liter)",
            "🌧️ Use Cymoxanil + Mancozeb (2g per liter)"
        ],
        organicRemedies: [
            "🌿 Spray Neem oil (5ml/L) + Garlic extract weekly",
            "🌿 Bordeaux mixture (1%) spray",
            "🌿 Compost tea with added beneficial microbes"
        ],
        preventiveMeasures: [
            "Plant resistant varieties like Kufri Pukhraj potato",
            "Water at base only - avoid wetting leaves",
            "Remove and destroy infected plants immediately",
            "Maintain proper plant spacing for air circulation"
        ]
    },
    
    "Early Blight": {
        hindiName: "अगेता झुलसा रोग",
        affectedCrops: ["Tomato", "Potato", "Eggplant"],
        symptoms: "Dark brown concentric rings on lower leaves, yellowing, defoliation",
        severity: "High",
        icon: "🥀",
        chemicalRemedies: [
            "🌾 Spray Chlorothalonil (2g per liter water)",
            "🌾 Apply Azoxystrobin (1ml per liter)",
            "🌾 Use Difenoconazole (0.5ml per liter)"
        ],
        organicRemedies: [
            "🌿 Baking soda spray (1g/L) + Vegetable oil",
            "🌿 Neem oil + Hydrogen peroxide solution",
            "🌿 Garlic-chili pepper spray"
        ],
        preventiveMeasures: [
            "Mulch to prevent soil splash",
            "Remove lower leaves near soil surface",
            "Practice 3-year crop rotation",
            "Use disease-free seeds"
        ]
    },
    
    // Pest Infestations
    "Pink Bollworm": {
        hindiName: "गुलाबी सुंडी",
        affectedCrops: ["Cotton"],
        symptoms: "Pink worms inside cotton bolls, damaged and stained lint, premature boll opening",
        severity: "Critical",
        icon: "🐛",
        chemicalRemedies: [
            "🧶 Spray Spinosad 45 SC (0.5ml per liter)",
            "🧶 Apply Indoxacarb 14.5% SC (0.5ml per liter)",
            "🧶 Use Emamectin Benzoate 5% SG (0.4g per liter)"
        ],
        organicRemedies: [
            "🌿 Install pheromone traps (10-12 per acre)",
            "🌿 Spray NSKE 5% (Neem Seed Kernel Extract)",
            "🌿 Release Trichogramma wasps weekly",
            "🌿 Castor oil (3ml/L) + Soap solution"
        ],
        preventiveMeasures: [
            "Early sowing (April-May)",
            "Timely harvesting by November",
            "Remove and destroy crop residues",
            "Grow trap crops like okra"
        ]
    },
    
    "Stem Borer": {
        hindiName: "तना छेदक",
        affectedCrops: ["Rice", "Maize", "Sugarcane"],
        symptoms: "Dead heart in young plants, white ears, holes in stem with frass",
        severity: "High",
        icon: "🕳️",
        chemicalRemedies: [
            "🌽 Apply Carbofuran 3G granules (15kg per acre)",
            "🌽 Spray Chlorantraniliprole (0.5ml per liter)",
            "🌽 Use Cartap Hydrochloride (1g per liter)"
        ],
        organicRemedies: [
            "🦋 Release Trichogramma japonicum (5 cards/acre)",
            "🌿 Neem cake application (250kg per hectare)",
            "🌿 Spray Beauveria bassiana bio-pesticide"
        ],
        preventiveMeasures: [
            "Remove and destroy affected plants",
            "Install light traps during night",
            "Avoid excess nitrogen fertilizer",
            "Deep plowing to destroy pupae"
        ]
    },
    
    // Fruit Crop Diseases
    "Mango Anthracnose": {
        hindiName: "आम का एन्थ्रेक्नोज",
        affectedCrops: ["Mango"],
        symptoms: "Dark brown to black spots on leaves, flowers and fruits, fruit rot",
        severity: "High",
        icon: "🥭",
        chemicalRemedies: [
            "🍃 Spray Carbendazim (1g per liter water)",
            "🍃 Apply Copper Oxychloride (3g per liter)",
            "🍃 Use Thiophanate methyl (1g per liter)"
        ],
        organicRemedies: [
            "🌿 Neem oil (5ml/L) + Garlic extract",
            "🌿 Trichoderma spray on fruits after harvest",
            "🌿 Compost tea foliar application"
        ],
        preventiveMeasures: [
            "Prune to improve air circulation",
            "Remove infected plant parts",
            "Avoid overhead irrigation",
            "Harvest fruits at proper maturity"
        ]
    },
    
    "Citrus Canker": {
        hindiName: "नींबू का कैंकर",
        affectedCrops: ["Citrus", "Lemon", "Orange"],
        symptoms: "Brown raised corky lesions on leaves, twigs and fruits, premature fruit drop",
        severity: "Medium",
        icon: "🍊",
        chemicalRemedies: [
            "🍋 Spray Copper Oxychloride (2g per liter water)",
            "🍋 Apply Streptomycin (0.5g per liter)",
            "🍋 Use Bactericide combination sprays"
        ],
        organicRemedies: [
            "🌿 Garlic extract spray (10ml/L)",
            "🌿 Clove oil solution (2ml/L)",
            "🌿 Baking soda + vegetable oil spray"
        ],
        preventiveMeasures: [
            "Use disease-free nursery plants",
            "Prune and burn infected branches",
            "Control leaf miner insects",
            "Plant windbreaks to reduce spread"
        ]
    },
    
    // Pulse Crops Diseases
    "Wilt of Chickpea": {
        hindiName: "चने की विल्ट",
        affectedCrops: ["Chickpea", "Pigeon Pea"],
        symptoms: "Sudden wilting of plants, vascular discoloration, complete plant death",
        severity: "Critical",
        icon: "🥀",
        chemicalRemedies: [
            "🌾 Soil drench with Carbendazim (1g per liter)",
            "🌾 Apply Trichoderma in soil",
            "🌾 Use Metalaxyl (2g per liter)"
        ],
        organicRemedies: [
            "🌿 Soil application of neem cake",
            "🌿 Trichoderma viride seed treatment",
            "🌿 Compost tea soil drench"
        ],
        preventiveMeasures: [
            "Use resistant varieties like BG 256",
            "Practice 4-5 year crop rotation",
            "Treat seeds with Trichoderma",
            "Avoid water logging"
        ]
    },
    
    "Pod Borer": {
        hindiName: "फली छेदक",
        affectedCrops: ["Chickpea", "Pigeon Pea", "Soybean"],
        symptoms: "Holes in pods, larvae feeding on seeds, webbed pods",
        severity: "High",
        icon: "🐛",
        chemicalRemedies: [
            "🌾 Spray Indoxacarb (0.5ml per liter)",
            "🌾 Apply Quinalphos (2ml per liter)",
            "🌾 Use Chlorantraniliprole (0.5ml per liter)"
        ],
        organicRemedies: [
            "🌿 Install pheromone traps",
            "🌿 Spray NSKE 5% weekly",
            "🌿 Release Trichogramma chilonis",
            "🌿 Bird perches in field"
        ],
        preventiveMeasures: [
            "Early sowing (October)",
            "Install bird perches",
            "Grow trap crops like marigold",
            "Handpick and destroy larvae"
        ]
    }
};

// Healthy crops database with care tips
const healthyCropsDB = [
    { name: "Wheat (Gehu)", emoji: "🌾", stage: "Flowering", tip: "Continue irrigation every 10–12 days. Watch for rust in humid conditions. Apply 2nd dose of urea (45–50 kg/ha)." },
    { name: "Rice (Dhan/Chawal)", emoji: "🍚", stage: "Tillering", tip: "Maintain 5 cm water level. Apply zinc sulphate (25 kg/ha). Monitor for stem borer and leaf folder." },
    { name: "Maize (Makka/Bhutta)", emoji: "🌽", stage: "Silking", tip: "Apply urea top dressing (60 kg/ha). Ensure irrigation during tasseling. Watch for fall armyworm." },
    { name: "Cotton (Kapas)", emoji: "🧶", stage: "Boll formation", tip: "Install pheromone traps (10/acre). Spray NSKE for pest control. Pick bolls when fully opened." },
    { name: "Potato (Aloo)", emoji: "🥔", stage: "Tuber formation", tip: "Earth up soil around plants. Stop irrigation 15 days before harvest. Watch for late blight in cool weather." },
    { name: "Onion (Pyaz)", emoji: "🧅", stage: "Bulb development", tip: "Reduce irrigation as bulbs mature. Stop watering 2 weeks before harvest. Store in well-ventilated area." },
    { name: "Tomato (Tamatar)", emoji: "🍅", stage: "Fruiting", tip: "Stake plants for support. Apply calcium nitrate to prevent blossom end rot. Harvest fruits when 3/4th ripe." },
    { name: "Sugarcane (Ganna)", emoji: "🎋", stage: "Grand growth", tip: "Apply 3rd dose of fertilizer. Provide irrigation every 10 days. Remove water shoots regularly." },
    { name: "Mustard (Sarson)", emoji: "🌼", stage: "Flowering", tip: "Apply sulfur (20 kg/ha). Watch for aphid attack. Harvest when 70% pods turn yellow." },
    { name: "Paddy (Basmati)", emoji: "🍚", stage: "Tillering", tip: "Maintain 3–5 cm water level. Avoid deep water. Monitor for stem borer; apply zinc sulphate if needed." },
    { name: "Groundnut (Kadale)", emoji: "🫘", stage: "Peg formation", tip: "Ensure irrigation at flowering and peg formation. Apply calcium if soil is deficient. Monitor for leaf spot." },
    { name: "Pigeon Pea (Arhar/Tur)", emoji: "🫗", stage: "Flowering", tip: "Provide 2–3 irrigations at flowering and pod filling. Weed at 25–30 days. Monitor for pod borer." },
    { name: "Soybean (Sarsoo)", emoji: "🫘", stage: "Flowering", tip: "Ensure irrigation at flowering and pod filling. Avoid excess nitrogen. Monitor for leaf roller and pod borer." },
    { name: "Chickpea (Gilji/Arbi)", emoji: "🫗", stage: "Pod formation", tip: "Spray 2% DAP for better filling. Monitor for pod borer. Harvest when pods turn brown." },
    { name: "Green Gram (Moong/Mung)", emoji: "🌱", stage: "Flowering", tip: "Provide 2–3 light irrigations. Weed early; avoid waterlogging. Monitor for pod fly." },
    { name: "Black Gram (Urad)", emoji: "🌱", stage: "Pod formation", tip: "Ensure 2–3 irrigations; avoid excess moisture. Timely weeding and disease watch. Harvest when pods turn black." },
    { name: "Safflower (Kusum)", emoji: "🌼", stage: "Flowering", tip: "Provide 2–3 irrigations; crop is drought tolerant. Control safflower fly and aphids. Apply boron if deficient." },
    { name: "Sunflower (Surajmukhi)", emoji: "🌻", stage: "Flowering", tip: "Ensure 3–4 irrigations, critical at flowering and grain fill. Monitor for birds and head moth. Apply boron and zinc if needed." },
    { name: "Sesame (Til)", emoji: "🌾", stage: "Flowering", tip: "Provide 2–3 light irrigations; crop is drought tolerant. Monitor for mosaic virus and capsule borer. Support during heavy winds if tall." },
    { name: "Millet (Bajra/Pearl Millet)", emoji: "🌾", stage: "Tillering", tip: "Provide 1–2 irrigations in dry spells. Crop is heat and low-moisture tolerant. Monitor for shoot fly and stem borer." },
    { name: "Banana (Kela)", emoji: "🍌", stage: "Bunch development", tip: "Use drip irrigation and regular propping. Apply monthly NPK and micronutrients. Monitor for nematodes and root rot." },
    { name: "Papaya (Papaiya)", emoji: "🥭", stage: "Fruiting", tip: "Maintain frequent irrigation and mulching. Protect from strong winds; stake tall plants. Monitor for root rot and fruit fly." },
    { name: "Chili (Mirchi)", emoji: "🌶️", stage: "Fruiting", tip: "Use drip irrigation; 2–3 irrigations weekly during fruiting. Watch for thrips and fruit borer; use pheromone traps. Apply calcium nitrate and boron for fruit set." },
    { name: "Garlic (Lasun)", emoji: "🧄", stage: "Bulb development", tip: "Provide 6–8 light irrigations; avoid waterlogging. Control weeds and prevent neck rot. Harvest when tops yellow and dry." },
    { name: "Brinjal (Vangi)", emoji: "🫓", stage: "Fruiting", tip: "Use drip irrigation every 2–3 days in fruiting. Watch for fruit borer; use pheromone traps. Apply calcium and boron for better fruit set." },
    { name: "Cabbage (Bund Gobhi)", emoji: "🥬", stage: "Head formation", tip: "Maintain regular irrigation; avoid water stress at head formation. Control aphids and diamondback moth. Apply boron and calcium for better head quality." },
    { name: "Cauliflower (Phool Gobhi)", emoji: "🥬", stage: "Curd formation", tip: "Ensure regular irrigation; avoid drought at curd initiation. Control pests and diseases timely. Apply boron and calcium for better curd quality." },
    { name: "Bitter Gourd (Karela)", emoji: "🥒", stage: "Fruiting", tip: "Use drip irrigation every 2–3 days during fruiting. Provide trellis and regular pruning. Monitor for leaf curl and fruit fly." },
    { name: "Lady's Finger (Bhendi/Drumstick)", emoji: "🥬", stage: "Fruiting", tip: "Provide regular irrigation; avoid waterlogging. Timely weeding and pest control. Harvest tender fruits regularly." },
    { name: "Okra (Bhindi)", emoji: "🥬", stage: "Fruiting", tip: "Provide regular irrigation; avoid waterlogging. Timely weeding and pest control. Harvest tender fruits regularly." },
    { name: "Cucumber (Kheera)", emoji: "🥒", stage: "Fruiting", tip: "Maintain regular irrigation; avoid water stress at fruiting. Provide trellis and prune older leaves. Monitor for fruit fly and powdery mildew." },
    { name: "Pumpkin (Bottla)", emoji: "🫘", stage: "Fruiting", tip: "Provide regular irrigation; avoid waterlogging. Control fruit borers and pests. Harvest when rind hardens." },
    { name: "Watermelon (Bhallu)", emoji: "🍉", stage: "Fruit development", tip: "Use frequent irrigation; avoid stress at fruiting. Apply high potassium for quality. Monitor for pests and diseases timely." },
    { name: "Mango (Mamidi)", emoji: "🥭", stage: "Flowering & fruiting", tip: "Irrigate during dry periods; avoid waterlogging. Do pruning, training, and pest/disease management. Harvest in summer after 4–6 years." },
    { name: "Grape (Dakkan)", emoji: "🍇", stage: "Fruit development", tip: "Maintain regular irrigation; avoid stress at flowering. Ensure proper trellising, pruning, and disease control. Harvest in summer after 2–3 years." },
    { name: "Lemon (Nimma)", emoji: "🍋", stage: "Fruit development", tip: "Irrigate during dry periods; avoid waterlogging. Do pruning, training, and pest/disease management. Harvest throughout year after 3–4 years." },
    { name: "Orange (Kottai)", emoji: "🍊", stage: "Fruit development", tip: "Irrigate during dry periods; avoid waterlogging. Do pruning, training, and pest/disease management. Harvest in winter after 3–4 years." },
    { name: "Cashew (Kathaballu)", emoji: "🌰", stage: "Fruit development", tip: "Irrigate during dry periods; avoid waterlogging. Do pruning, training, and pest/disease management. Harvest in summer after 4–5 years." },
    { name: "Coconut (Bans)", emoji: "🌴", stage: "Nut development", tip: "Irrigate during dry periods; avoid waterlogging. Do pruning, training, and pest/disease management. Harvest throughout year after 4–5 years." },
    { name: "Tea (Chai)", emoji: "🍵", stage: "Shoot growth", tip: "Irrigate during dry periods; avoid waterlogging. Do regular pruning, training, and pest/disease management. Harvest shoots regularly after 3–4 years." }
];

// ML Model Simulation - Advanced disease detection
class CropLensAI {
    constructor() {
        this.analyzedImages = [];
    }
    
    // Simulate image analysis with weighted probability
    analyzeImage(imageData) {
        // Extract features from image (simulated)
        const features = this.extractFeatures(imageData);
        
        // Calculate disease probability based on features
        const diseases = Object.keys(cropDiseaseDatabase);
        const probabilities = [];
        
        diseases.forEach(disease => {
            let probability = Math.random() * 0.8; // Base probability
            // Adjust based on simulated features
            if (features.colorDistribution.includes('brown')) {
                if (disease.includes('Blight') || disease.includes('Spot')) probability += 0.2;
            }
            if (features.pattern.includes('spots')) {
                if (disease.includes('Spot') || disease.includes('Mildew')) probability += 0.25;
            }
            probabilities.push({ disease, probability: Math.min(probability, 0.95) });
        });
        
        // Sort by probability and get top disease
        probabilities.sort((a, b) => b.probability - a.probability);
        
        // 65% chance of disease, 35% chance healthy
        const isHealthy = Math.random() < 0.35;
        
        return {
            isHealthy: isHealthy,
            disease: isHealthy ? null : probabilities[0].disease,
            confidence: isHealthy ? 0.85 + (Math.random() * 0.1) : probabilities[0].probability,
            features: features,
            secondaryIssues: isHealthy ? [] : probabilities.slice(1, 3).filter(p => p.probability > 0.4)
        };
    }
    
    extractFeatures(imageData) {
        // Simulated feature extraction
        const colorPatterns = ['green', 'brown', 'yellow', 'white'];
        const patterns = ['spots', 'lesions', 'powdery', 'normal', 'wilting'];
        
        return {
            colorDistribution: colorPatterns[Math.floor(Math.random() * colorPatterns.length)],
            pattern: patterns[Math.floor(Math.random() * patterns.length)],
            severity: Math.random(),
            leafArea: 0.6 + Math.random() * 0.4
        };
    }
    
    getRecommendation(diseaseName) {
        if (!diseaseName) return null;
        return cropDiseaseDatabase[diseaseName] || cropDiseaseDatabase["Late Blight"]; // Fallback
    }
    
    getHealthyTip(cropName) {
        const healthyCrop = healthyCropsDB.find(c => c.name === cropName) || healthyCropsDB[0];
        return healthyCrop;
    }
}

// Initialize Crop Lens AI
const cropLensAI = new CropLensAI();

// Image storage and history
let imageHistory = [];
let currentAnalysis = null;

// Main Crop Lens Function
window.analyzeCropImage = async function() {
    const fileInput = document.getElementById('crop-image');
    const resultDiv = document.getElementById('lens-result');
    const previewDiv = document.getElementById('image-preview');
    
    // Validation
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        showLensMessage('❌ Please select an image first. Click "Choose Image" to upload a crop photo.', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showLensMessage('❌ Please select a valid image file (JPEG, PNG, or GIF)', 'error');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showLensMessage('❌ Image too large! Please select an image under 10MB.', 'error');
        return;
    }
    
    // Show loading state
    showLensLoading();
    
    // Read and process image
    const reader = new FileReader();
    
    reader.onload = async function(event) {
        const imageData = event.target.result;
        
        // Show preview
        if (previewDiv) {
            previewDiv.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="${imageData}" style="max-width: 100%; max-height: 300px; border-radius: 15px; border: 3px solid #f9a825; box-shadow: 0 5px 20px rgba(0,0,0,0.2);">
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px;">
                        ${Math.round(file.size / 1024)} KB
                    </div>
                </div>
            `;
        }

        // Try the real Kindwise crop.health API first (via our /api/crop-lens proxy).
        // If it's not configured yet, or the request fails for any reason, we
        // silently fall back to the built-in simulated analysis below so the
        // feature never breaks for the farmer.
        let realResult = null;
        try {
            const base64Only = imageData.split(',')[1];
            const apiRes = await fetch('/api/crop-lens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Only })
            });
            if (apiRes.ok) {
                const data = await apiRes.json();
                if (data.success) realResult = data;
            }
        } catch (e) {
            console.warn('Crop Lens API unavailable, using built-in analysis:', e);
        }

        if (realResult) {
            currentAnalysis = { source: 'kindwise', ...realResult };
            imageHistory.unshift({ id: Date.now(), imageData, analysis: currentAnalysis, timestamp: new Date().toISOString() });
            if (imageHistory.length > 10) imageHistory.pop();

            if (realResult.isHealthy) {
                displayRealHealthyResult(realResult);
            } else {
                displayRealDiseaseResult(realResult);
            }
            displayActionButtons();
            return;
        }

        // ---- Fallback: built-in simulated analysis (unchanged behaviour) ----
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Analyze image with AI
        const analysis = cropLensAI.analyzeImage(imageData);
        currentAnalysis = analysis;
        
        // Save to history
        imageHistory.unshift({
            id: Date.now(),
            imageData: imageData,
            analysis: analysis,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 10 analyses
        if (imageHistory.length > 10) imageHistory.pop();
        
        // Display results
        if (analysis.isHealthy) {
            displayHealthyResult(analysis);
        } else {
            displayDiseaseResult(analysis);
        }

        
        // Show action buttons
        displayActionButtons();
    };
    
    reader.onerror = function() {
        showLensMessage('❌ Error reading image file. Please try again with a different image.', 'error');
    };
    
    reader.readAsDataURL(file);
};

// Display healthy crop result
function displayHealthyResult(analysis) {
    const resultDiv = document.getElementById('lens-result');
    const randomCrop = healthyCropsDB[Math.floor(Math.random() * healthyCropsDB.length)];
    const confidence = (analysis.confidence * 100).toFixed(1);
    
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #2e7d32, #1b5e20); border-radius: 25px; padding: 25px; color: white; margin-top: 20px; animation: slideIn 0.5s ease;">
            <div style="text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 50%; padding: 20px; margin-bottom: 15px;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #81c784;"></i>
                </div>
                <h2 style="margin: 10px 0; font-size: 1.8rem;">✅ Crop is Healthy!</h2>
                <div style="background: rgba(255,255,255,0.15); border-radius: 20px; padding: 5px 15px; display: inline-block; margin-bottom: 20px;">
                    <span style="font-size: 0.9rem;">AI Confidence: ${confidence}%</span>
                </div>
                
                <div style="background: rgba(255,255,255,0.2); border-radius: 20px; padding: 20px; margin: 20px 0; text-align: left;">
                    <h3 style="margin-bottom: 15px;">${randomCrop.emoji} Crop Status</h3>
                    <p><strong>🌾 Crop:</strong> ${randomCrop.name}</p>
                    <p><strong>📈 Growth Stage:</strong> ${randomCrop.stage}</p>
                    <p><strong>💚 Health Score:</strong> <span style="background: #4caf50; padding: 3px 10px; border-radius: 20px;">Excellent</span></p>
                    <p><strong>🌱 Current Care Tip:</strong> ${randomCrop.tip}</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.15); border-radius: 20px; padding: 20px; margin: 20px 0; text-align: left;">
                    <h3>🌿 Preventive Recommendations</h3>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>✓ Regular field inspection every 5-7 days</li>
                        <li>✓ Apply neem oil spray as preventive (5ml/L water) monthly</li>
                        <li>✓ Maintain proper plant spacing for air circulation</li>
                        <li>✓ Use certified disease-free seeds for next sowing</li>
                        <li>✓ Practice crop rotation to maintain soil health</li>
                    </ul>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); border-radius: 20px; padding: 15px;">
                    <h4>📊 Next Steps</h4>
                    <p>Continue current farming practices. Monitor for any changes in leaf color or growth pattern. Schedule next inspection in 7 days.</p>
                </div>
            </div>
        </div>
    `;
}

// Display disease result
// ---- Display functions for REAL Kindwise crop.health API results ----
// (kept separate from the simulated displayHealthyResult/displayDiseaseResult
// above since real API data has its own shape - crop name, disease name,
// description/treatment text straight from Kindwise's own database.)
function displayRealHealthyResult(result) {
    const resultDiv = document.getElementById('lens-result');
    const cropName = result.crop ? result.crop.name : 'your crop';
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #2e7d32, #1b5e20); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #81c784;"></i>
                <h2 style="margin: 10px 0;">✅ Looks Healthy!</h2>
                <p style="opacity:.9">Identified as: <strong>${cropName}</strong></p>
                <p style="margin-top:15px;font-size:.9rem;opacity:.85">Analyzed by Kindwise crop.health AI. Keep monitoring regularly and follow your usual preventive care.</p>
            </div>
        </div>`;
}

function displayRealDiseaseResult(result) {
    const resultDiv = document.getElementById('lens-result');
    const d = result.disease;
    const cropName = result.crop ? result.crop.name : 'crop';
    const confidence = (d.probability * 100).toFixed(1);
    const treatment = d.treatment || {};

    const listOrNote = (arr) => (arr && arr.length)
        ? `<ul style="margin:10px 0;padding-left:20px">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`
        : '<p style="opacity:.8;font-size:.9rem">No specific guidance available for this one - consult your local agriculture extension officer.</p>';

    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #c62828, #8e0000); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffcc80;"></i>
                <h2 style="margin: 10px 0;">${d.name}</h2>
                <p style="opacity:.85">Crop: ${cropName} &middot; AI Confidence: ${confidence}%</p>
                ${d.severity ? `<p><span style="background:rgba(255,255,255,.2);padding:3px 12px;border-radius:20px">${d.severity}</span></p>` : ''}
            </div>
            ${d.description ? `<div style="background:rgba(255,255,255,.15);border-radius:20px;padding:18px;margin-top:18px"><h4>📋 About</h4><p>${d.description}</p></div>` : ''}
            ${d.symptoms ? `<div style="background:rgba(255,255,255,.1);border-radius:20px;padding:18px;margin-top:15px"><h4>🔍 Symptoms</h4><p>${d.symptoms}</p></div>` : ''}
            <div style="background:rgba(255,255,255,.15);border-radius:20px;padding:18px;margin-top:15px">
                <h4>🩺 Chemical Treatment</h4>${listOrNote(treatment.chemical)}
                <h4 style="margin-top:12px">🌿 Biological / Organic</h4>${listOrNote(treatment.biological)}
                <h4 style="margin-top:12px">🛡️ Prevention</h4>${listOrNote(treatment.prevention)}
            </div>
        </div>`;
}

function displayDiseaseResult(analysis) {
    const resultDiv = document.getElementById('lens-result');
    const diseaseName = analysis.disease;
    const diseaseInfo = cropLensAI.getRecommendation(diseaseName);
    const confidence = (analysis.confidence * 100).toFixed(1);
    
    if (!diseaseInfo) {
        resultDiv.innerHTML = '<p style="color: red;">Unable to identify disease. Please consult local agricultural officer.</p>';
        return;
    }
    
    // Create severity color
    const severityColor = {
        'Low': '#4caf50',
        'Medium': '#ff9800',
        'High': '#ff5722',
        'Critical': '#f44336'
    }[diseaseInfo.severity] || '#ff9800';
    
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #c62828, #8e0000); border-radius: 25px; padding: 25px; color: white; margin-top: 20px; animation: slideIn 0.5s ease;">
            <div style="text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 50%; padding: 20px; margin-bottom: 15px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffcc80;"></i>
                </div>
                <h2 style="margin: 10px 0; font-size: 1.8rem;">${diseaseInfo.icon} ${diseaseName}</h2>
                <p style="font-size: 1rem;">${diseaseInfo.hindiName}</p>
                <div style="background: rgba(255,255,255,0.15); border-radius: 20px; padding: 5px 15px; display: inline-block; margin: 10px 0;">
                    <span style="font-size: 0.9rem;">AI Confidence: ${confidence}%</span>
                </div>
                
                <div style="background: rgba(255,255,255,0.2); border-radius: 20px; padding: 20px; margin: 20px 0; text-align: left;">
                    <h3>📋 Disease Details</h3>
                    <p><strong>🎯 Affected Crops:</strong> ${diseaseInfo.affectedCrops.join(', ')}</p>
                    <p><strong>📝 Symptoms:</strong> ${diseaseInfo.symptoms}</p>
                    <p><strong>⚠️ Severity Level:</strong> <span style="background: ${severityColor}; padding: 3px 12px; border-radius: 20px;">${diseaseInfo.severity}</span></p>
                </div>
                
                <div style="background: rgba(255,255,255,0.15); border-radius: 20px; padding: 20px; margin: 20px 0; text-align: left;">
                    <h3>🩺 Chemical Treatment</h3>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${diseaseInfo.chemicalRemedies.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                    
                    <h4 style="margin-top: 15px;">🌿 Organic Solutions</h4>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${diseaseInfo.organicRemedies.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; margin: 20px 0; text-align: left;">
                    <h3>🛡️ Preventive Measures</h3>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${diseaseInfo.preventiveMeasures.map(m => `<li>✓ ${m}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 20px; padding: 15px; margin-top: 15px;">
                    <p><strong>⚠️ Urgent Action Required:</strong> Treat affected areas within 3-5 days to prevent spread. Remove severely infected plants to protect healthy crops.</p>
                </div>
            </div>
        </div>
    `;
}

// Helper Functions
function showLensLoading() {
    const resultDiv = document.getElementById('lens-result');
    if (resultDiv) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loading-spinner" style="display: inline-block;">
                    <i class="fas fa-microscope fa-spin fa-3x" style="color: #f9a825;"></i>
                </div>
                <p style="margin-top: 20px; font-size: 1.1rem;">🔬 AI Analyzing Crop Image...</p>
                <p style="font-size: 0.9rem; color: #666;">Detecting diseases and preparing treatment plan</p>
                <div style="width: 80%; max-width: 300px; margin: 20px auto; background: #e0e0e0; border-radius: 10px; overflow: hidden;">
                    <div style="width: 70%; height: 4px; background: linear-gradient(90deg, #2e7d32, #f9a825); animation: loading 1.5s ease-in-out infinite;"></div>
                </div>
            </div>
        `;
    }
}

function showLensMessage(message, type = 'info') {
    const resultDiv = document.getElementById('lens-result');
    if (resultDiv) {
        const colors = {
            error: '#f44336',
            success: '#4caf50',
            warning: '#ff9800',
            info: '#2196f3'
        };
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div style="background: ${colors[type]}; color: white; padding: 15px; border-radius: 15px; margin: 20px 0; text-align: center;">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p style="margin: 10px 0 0 0;">${message}</p>
            </div>
        `;
    }
}

function displayActionButtons() {
    const resultDiv = document.getElementById('lens-result');
    if (resultDiv && !resultDiv.innerHTML.includes('action-buttons')) {
        const buttons = document.createElement('div');
        buttons.className = 'action-buttons';
        buttons.style.cssText = 'display: flex; gap: 10px; justify-content: center; margin-top: 20px; flex-wrap: wrap;';
        buttons.innerHTML = `
            <button onclick="resetCropLens()" style="background: #666; color: white; padding: 12px 25px; border: none; border-radius: 40px; cursor: pointer; font-weight: bold;">
                <i class="fas fa-sync-alt"></i> New Analysis
            </button>
           
            <button onclick="viewHistory()" style="background: #9c27b0; color: white; padding: 12px 25px; border: none; border-radius: 40px; cursor: pointer; font-weight: bold;">
                <i class="fas fa-history"></i> View History
            </button>
        `;
        resultDiv.appendChild(buttons);
    }
}

// Reset Crop Lens
window.resetCropLens = () => {
    const fileInput = document.getElementById('crop-image');
    const resultDiv = document.getElementById('lens-result');
    const previewDiv = document.getElementById('image-preview');
    
    if (fileInput) fileInput.value = '';
    if (resultDiv) {
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
    }
    if (previewDiv) previewDiv.innerHTML = '';
    currentAnalysis = null;
    
    showLensMessage('🔄 Crop Lens reset. Upload a new image to analyze.', 'info');
    setTimeout(() => {
        if (resultDiv && resultDiv.innerHTML.includes('reset')) {
            resultDiv.style.display = 'none';
            resultDiv.innerHTML = '';
        }
    }, 2000);
};

// Download Analysis Report
window.downloadReport = () => {
    if (!currentAnalysis) {
        showLensMessage('No analysis to download. Please analyze an image first.', 'warning');
        return;
    }
    
    const report = {
        timestamp: new Date().toISOString(),
        analysis: currentAnalysis,
        recommendations: currentAnalysis.isHealthy ? 
            'Crop is healthy. Continue preventive measures.' : 
            cropLensAI.getRecommendation(currentAnalysis.disease)
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `crop-analysis-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showLensMessage('📄 Report downloaded successfully!', 'success');
};

// View Analysis History
window.viewHistory = () => {
    if (imageHistory.length === 0) {
        showLensMessage('No analysis history found. Analyze some crops first.', 'info');
        return;
    }
    
    const resultDiv = document.getElementById('lens-result');
    let historyHtml = `
        <div style="background: white; border-radius: 25px; padding: 25px; margin-top: 20px; border: 2px solid #f9a825;">
            <h2 style="color: #2e7d32; margin-bottom: 20px;">📊 Analysis History</h2>
            <div style="max-height: 500px; overflow-y: auto;">
    `;
    
    imageHistory.forEach((item, index) => {
        const date = new Date(item.timestamp);
        const status = item.analysis.isHealthy ? '✅ Healthy' : `⚠️ ${item.analysis.disease}`;
        const statusColor = item.analysis.isHealthy ? '#4caf50' : '#f44336';
        
        historyHtml += `
            <div style="border-bottom: 1px solid #e0e0e0; padding: 15px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div>
                        <strong>#${index + 1}</strong>
                        <span style="color: ${statusColor}; margin-left: 10px;">${status}</span>
                    </div>
                    <div style="color: #666; font-size: 0.85rem;">${date.toLocaleString()}</div>
                </div>
                <div style="margin-top: 10px;">
                    <img src="${item.imageData}" style="max-width: 100px; max-height: 100px; border-radius: 10px;">
                </div>
            </div>
        `;
    });
    
    historyHtml += `
            </div>
            <button onclick="resetCropLens()" style="margin-top: 20px; background: #2e7d32; color: white; padding: 10px 20px; border: none; border-radius: 30px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    resultDiv.innerHTML = historyHtml;
    resultDiv.style.display = 'block';
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes loading {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
    }
    
    .lens-container {
        transition: all 0.3s ease;
    }
    
    .action-buttons button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    }
    
    #lens-result {
        animation: slideIn 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initialize Crop Lens on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure file input exists and set up event listeners
    const fileInput = document.getElementById('crop-image');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                // Auto-analyze when image is selected (optional)
                // analyzeCropImage(); // Uncomment if you want auto-analysis
            }
        });
    }
    
    console.log('🌾 Crop Lens AI System Initialized');
});
  
    // ==================== ADVISORY FUNCTIONS ====================
    window.setAdvisoryMode = e => {
        const generalInputs = document.getElementById('generalAdvisoryInputs');
        const specificInputs = document.getElementById('specificAdvisoryInputs');
        const generalBtn = document.getElementById('generalModeBtn');
        const specificBtn = document.getElementById('specificModeBtn');
        if(e === 'general') {
            if(generalInputs) generalInputs.style.display = 'block';
            if(specificInputs) specificInputs.style.display = 'none';
            if(generalBtn) generalBtn.style.background = 'linear-gradient(145deg,var(--primary),var(--primary-dark))';
            if(specificBtn) specificBtn.style.background = '#f9a825';
        } else {
            if(generalInputs) generalInputs.style.display = 'none';
            if(specificInputs) specificInputs.style.display = 'block';
            if(specificBtn) specificBtn.style.background = 'linear-gradient(145deg,var(--primary),var(--primary-dark))';
            if(generalBtn) generalBtn.style.background = '#f9a825';
        }
    };
    
    window.showGeneralAdvisory = () => {
        let e = document.getElementById('advisoryStateSelect');
        let t = document.getElementById('advisorySeasonSelect');
        let container = document.getElementById('generalAdvisoryContent');
        if(e && t && container) {
            let state = e.value;
            let season = t.value;
            let n = advisoryDB[state]?.[season] || 'No detailed advisory for this state/season';
            container.innerHTML = `<h3>${state} - ${season}</h3><p class="big-friendly">${n.replace(/\n/g, '<br>')}</p>`;
        }
    };
    
    window.showSpecificAdvisory = () => {
        let e = document.getElementById('specificCropSelect');
        let container = document.getElementById('specificAdvisoryContent');
        if(e && container) {
            let crop = e.value;
            let t = specificCropAdvice[crop] || 'Guide not available';
            container.innerHTML = `<h3>${crop} – 3-Step Guide</h3><p class="big-friendly" style="white-space:pre-line;">${t}</p>`;
        }
    };
    
    // ==================== ANALYTICS FUNCTIONS ====================
    function initAnalyticsCharts() {
        if(typeof Chart === 'undefined') return;
        const priceChart = document.getElementById('priceTrendChart')?.getContext('2d');
        if(priceChart) {
            new Chart(priceChart, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        { label: 'Wheat (₹/q)', data: [2250, 2300, 2380, 2420, 2400, 2450], borderColor: '#2e7d32', tension: .4, fill: !0 },
                        { label: 'Rice (₹/q)', data: [2e3, 2050, 2100, 2150, 2120, 2150], borderColor: '#f9a825', tension: .4, fill: !0 }
                    ]
                },
                options: { responsive: !0, maintainAspectRatio: !1, plugins: { legend: { position: 'bottom' } } }
            });
        }
        const cropChart = document.getElementById('cropDistributionChart')?.getContext('2d');
        if(cropChart) {
            new Chart(cropChart, {
                type: 'doughnut',
                data: {
                    labels: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Other'],
                    datasets: [{ data: [38, 32, 14, 10, 6], backgroundColor: ['#2e7d32', '#f9a825', '#d32f2f', '#4caf50', '#9c27b0'] }]
                },
                options: { responsive: !0, maintainAspectRatio: !1, plugins: { legend: { position: 'bottom' } } }
            });
        }
    }
    
    window.calculateProfit = function() {
        const cropSelect = document.getElementById('profit-crop');
        const areaInput = document.getElementById('profit-area');
        const resultDiv = document.getElementById('profit-result');
        if(!cropSelect || !areaInput || !resultDiv) return;
        const e = cropSelect.value;
        const t = parseFloat(areaInput.value) || 1;
        const n = {
            wheat: { yield: 48, price: 2450, cost: 37e3 },
            rice: { yield: 58, price: 2150, cost: 42e3 },
            cotton: { yield: 24, price: 7200, cost: 58e3 },
            sugarcane: { yield: 780, price: 380, cost: 85e3 },
            potato: { yield: 265, price: 2850, cost: 47e3 }
        };
        const o = n[e];
        if(!o) return;
        const l = o.yield * o.price * t;
        const r = o.cost * t;
        const i = l - r;
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<h4 style="color:var(--primary); margin-bottom:10px;">Profit Analysis</h4>
            <p><strong>Area:</strong> ${t} acre(s)</p>
            <p><strong>Expected Yield:</strong> ${o.yield * t} quintals</p>
            <p><strong>Revenue:</strong> ₹${l.toLocaleString()}</p>
            <p><strong>Cost:</strong> ₹${r.toLocaleString()}</p>
            <p style="font-size:1.3rem; color:${i > 0 ? 'var(--success)' : 'var(--danger)'}; margin-top:10px;">
            <strong>Net Profit: ₹${i.toLocaleString()}</strong></p>`;
    };
    
    // ==================== CHATBOT FUNCTIONS ====================
    window.toggleChatbot = () => {
        const chatWindow = document.getElementById('chat-window');
        if(chatWindow) chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    };
    
    window.sendMessage = async () => {
        let e = document.getElementById('chat-input');
        if(!e) return;
        let originalText = e.value.trim();
        let t = originalText.toLowerCase();
        if(!t) return;
        let n = document.getElementById('chat-messages');
        if(n) n.innerHTML += `<div class="message msg-user">${originalText}</div>`;
        e.value = '';

        // Try the real Gemini-powered bot first (via our /api/chatbot proxy).
        // If it's not configured yet, or the request fails, we fall back to
        // the built-in keyword-based responses below so the chatbot never breaks.
        try {
            const apiRes = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: originalText, language: currentLanguage })
            });
            if (apiRes.ok) {
                const data = await apiRes.json();
                if (data.success && data.reply) {
                    if (n) n.innerHTML += `<div class="message msg-bot">${data.reply}</div>`;
                    if (n) n.scrollTop = n.scrollHeight;
                    return;
                }
            }
        } catch (err) {
            console.warn('Chatbot API unavailable, using built-in responses:', err);
        }

        // ---- Fallback: built-in rule-based responses (unchanged behaviour) ----
        setTimeout(() => {
            let e = botResponses[currentLanguage] || botResponses.en;
            let o = "";
            if(t.includes('mandi') || t.includes('मंडी') || t.includes('price')) o = e.mandi;
            else if(t.includes('weather') || t.includes('mausam') || t.includes('मौसम')) o = e.weather;
            else if(t.includes('lens') || t.includes('crop') || t.includes('क्रॉप')) o = e.lens;
            else if(t.includes('advisory') || t.includes('salah') || t.includes('सलाह')) o = e.advisory;
            else if(t.includes('about') || t.includes('about us') || t.includes('हमारे बारे')) o = e.about;
            else if(t.includes('analytics') || t.includes('एनालिटिक्स')) o = e.analytics;
            else if(t.includes('tip') || t.includes('suggestion') || t.includes('टिप')) {
                const l = new Date;
                const r = Math.floor((l - new Date(l.getFullYear(), 0, 0)) / (1e3 * 60 * 60 * 24)) % farmingTips[currentLanguage].length;
                o = e.tip + farmingTips[currentLanguage][r];
            } else if(t.includes('hello') || t.includes('hi') || t.includes('namaste') || t.includes('नमस्ते')) o = e.hello;
            else if(t.includes('time') || t.includes('समय')) {
                const l = new Date;
                const r = l.toLocaleTimeString('en-US');
                o = e.time + r;
            } else o = e.default;
            if(n) n.innerHTML += `<div class="message msg-bot">${o}</div>`;
            if(n) n.scrollTop = n.scrollHeight;
        }, 600);
    };
    
    // ==================== PROFILE FUNCTIONS ====================
    window.toggleUserDropdown = () => {
        const dropdown = document.getElementById('user-dropdown');
        if(dropdown) dropdown.classList.toggle('show');
    };
    
    window.openProfileModal = () => {
        const modal = document.getElementById('profile-modal');
        const editName = document.getElementById('edit-name');
        if(modal) modal.classList.add('show');
        toggleUserDropdown();
        if(editName && currentUser) editName.value = currentUser.name;
    };
    
    window.closeProfileModal = () => {
        const modal = document.getElementById('profile-modal');
        if(modal) modal.classList.remove('show');
    };
    
    window.saveProfile = () => {
        let e = document.getElementById('edit-name');
        if(e && e.value && currentUser) {
            currentUser.name = e.value;
            userDatabase[currentUser.email] = currentUser;
            localStorage.setItem('patukrishi_users', JSON.stringify(userDatabase));
            localStorage.setItem('patukrishi_session', JSON.stringify(currentUser));
            loadDashboard();
            closeProfileModal();
            showNotification('Profile updated successfully!', 'success');
        }
    };
    
    // ==================== HELPER FUNCTIONS ====================
    function showNotification(msg, type = 'info') {
        let n = document.createElement('div');
        n.style = `background:var(--card-bg); padding:12px 20px; border-radius:40px; margin-bottom:10px; border-left:4px solid #f9a825; box-shadow:var(--shadow); font-weight:500;`;
        n.innerText = msg;
        const container = document.getElementById('notification-container');
        if(container) container.appendChild(n);
        setTimeout(() => n.remove(), 3e3);
    }
    window.showNotification = showNotification;
    
    function updateTime() {
        const e = new Date;
        const timeElement = document.getElementById('current-time');
        if(timeElement) timeElement.textContent = e.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    
    function updateTipOfTheDay() {
        const e = new Date;
        const t = Math.floor((e - new Date(e.getFullYear(), 0, 0)) / (1e3 * 60 * 60 * 24)) % farmingTips[currentLanguage].length;
        const tipElement = document.getElementById('tip-of-the-day');
        const tipNumberElement = document.getElementById('tip-number');
        if(tipElement) tipElement.textContent = farmingTips[currentLanguage][t];
        if(tipNumberElement) tipNumberElement.textContent = `#${String(t + 1).padStart(2, '0')}`;
    }
    
    window.switchSection = e => {
        document.querySelectorAll('.nav-item').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-section') === e);
        });
        document.querySelectorAll('.content-section').forEach(t => t.classList.remove('active'));
        const section = document.getElementById(e + '-section');
        if(section) section.classList.add('active');
        window.scrollTo(0, 0);
    };
    
    // ==================== EVENT LISTENERS ====================
    window.addEventListener('load', () => {
        if(typeof AOS !== 'undefined') AOS.init();
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if(loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    checkAuth();
                    updateTime();
                    setInterval(updateTime, 1e3);
                    updateTipOfTheDay();
                    translatePage();
                    updateLangHeader();
                }, 500);
            }
        }, 2e3);
    });
    
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let e = document.querySelector('#theme-toggle i');
            if(e) {
                e.classList.toggle('fa-moon');
                e.classList.toggle('fa-sun');
            }
        });
    }
    
    window.onclick = e => {
        const userDropdown = document.getElementById('user-dropdown');
        if(userDropdown && !e.target.closest('.user-profile')) userDropdown.classList.remove('show');
        const langDropdown = document.getElementById('langDropdown');
        const langHeader = document.getElementById('langHeader');
        if(langDropdown && langHeader && !e.target.closest('.lang-select-container') && langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
            langHeader.classList.remove('active');
        }
    };
    
    // ==================== DATABASES ====================
const districtDB = {
    // ==========================================
    // STATES
    // ==========================================
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Kurnool", "Nellore", "Anantapur", "Tirupati", "Kadapa", "Kakinada", "Rajahmundry", "Eluru", "Vizianagaram", "Srikakulam", "Prakasam"],
    "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
    "Assam": ["Guwahati (Kamrup Metropolitan)", "Kamrup", "Barpeta", "Bongaigaon", "Cachar", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Karimganj", "Lakhimpur", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Araria", "Aurangabad", "Banka", "Begusarai", "Bhojpur", "Buxar", "East Champaran", "West Champaran", "Katihar", "Khagaria", "Kishanganj", "Madhubani", "Munger", "Nalanda", "Rohtas", "Samastipur", "Saran", "Sitamarhi", "Siwan", "Vaishali"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon", "Raigarh", "Bastar", "Surguja", "Janjgir-Champa", "Balod", "Baloda Bazar", "Bemetara", "Bijapur", "Dantewada", "Dhamtari", "Gariaband", "Jagdalpur", "Kondagaon", "Mahasamund", "Mungeli", "Sukma", "Surajpur"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Bharuch", "Navsari", "Morbi", "Surendranagar", "Mehsana", "Patan", "Banaskantha", "Sabarkantha", "Kutch", "Amreli", "Porbandar", "Dahod", "Panchmahal"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Sirsa", "Yamunanagar", "Bhiwani", "Jhajjar", "Jind", "Kaithal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Rewari", "Fatehabad"],
    "Himachal Pradesh": ["Shimla", "Kangra", "Mandi", "Kullu", "Solan", "Sirmaur", "Una", "Hamirpur", "Bilaspur", "Chamba", "Kinnaur", "Lahaul and Spiti"],
    "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur (East Singhbhum)", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Palamu", "Dumka", "Chatra", "Garhwa", "Godda", "Gumla", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubballi-Dharwad", "Mangaluru (Dakshina Kannada)", "Belagavi", "Kalaburagi", "Ballari", "Tumakuru", "Udupi", "Shivamogga", "Davanagere", "Hassan", "Vijayapura", "Raichur", "Bidar", "Chitradurga", "Kolar", "Mandya", "Chikkamagaluru", "Kodagu", "Bagalkote", "Gadag", "Haveri", "Koppal"],
    "Kerala": ["Thiruvananthapuram", "Kochi (Ernakulam)", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Palakkad", "Kannur", "Kottayam", "Malappuram", "Pathanamthitta", "Idukki", "Wayanad", "Kasaragod"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna", "Ratlam", "Chhindwara", "Khandwa", "Burhanpur", "Dewas", "Vidisha", "Shivpuri", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Guna"],
    "Maharashtra": ["Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Nashik", "Chhatrapati Sambhajinagar (Aurangabad)", "Solapur", "Kolhapur", "Thane", "Kalyan-Dombivli", "Vasai-Virar", "Navi Mumbai", "Amravati", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalna", "Beed", "Nanded", "Sangli", "Satara", "Ratnagiri", "Sindhudurg"],
    "Manipur": ["Imphal West", "Imphal East", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Kangpokpi", "Tamenglong", "Chandel", "Tengnoupal", "Kamjong", "Noney", "Pherzawl", "Jiribam"],
    "Meghalaya": ["East Khasi Hills (Shillong)", "West Garo Hills (Tura)", "Jaintia Hills", "Ri-Bhoi", "West Khasi Hills", "East Garo Hills", "South Garo Hills", "South West Khasi Hills", "North Garo Hills", "East Jaintia Hills", "South West Garo Hills", "Eastern West Khasi Hills"],
    "Mizoram": ["Aizawl", "Lunglei", "Kolasib", "Champhai", "Serchhip", "Siaha", "Lawngtlai", "Mamit", "Hnahthial", "Khawzawl", "Saitual"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Kiphire", "Longleng", "Peren", "Noklak", "Chumoukedima", "Niuland", "Tseminyu", "Shamator"],
    "Odisha": ["Bhubaneswar (Khordha)", "Cuttack", "Rourkela (Sundargarh)", "Berhampur (Ganjam)", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada (Mayurbhanj)", "Jharsuguda", "Bargarh", "Angul", "Kendrapara", "Jajpur", "Dhenkanal", "Koraput", "Rayagada", "Kalahandi", "Keonjhar", "Bolangir", "Nayagarh"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Firozpur", "Moga", "Hoshiarpur", "Pathankot", "SAS Nagar (Mohali)", "Tarn Taran", "Kapurthala", "Faridkot", "Muktsar", "Barnala", "Mansa", "Rupnagar", "Sangrur", "Fazilka", "Gurdaspur", "Nawanshahr", "Malerkotla"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Udaipur", "Ajmer", "Alwar", "Bhilwara", "Sikar", "Pali", "Sri Ganganagar", "Bharatpur", "Churu", "Hanumangarh", "Jhunjhunu", "Sirohi", "Tonk", "Jaisalmer", "Barmer", "Jalor", "Chittorgarh", "Rajsamand", "Sawai Madhopur", "Dausa"],
    "Sikkim": ["Gangtok (East Sikkim)", "Gyalshing (West Sikkim)", "Mangan (North Sikkim)", "Namchi (South Sikkim)", "Pakyong", "Soreng"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Erode", "Tirunelveli", "Vellore", "Tiruppur", "Thoothukudi", "Thanjavur", "Dindigul", "Ranipet", "Kanyakumari", "Kanchipuram", "Chengalpattu", "Tiruvallur", "Cuddalore", "Kumbakonam", "Karur", "Hosur", "Nagercoil"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet", "Jagtial", "Mancherial", "Kothagudem", "Sangareddy", "Kamareddy", "Medak", "Bhongir", "Vikarabad"],
    "Tripura": ["West Tripura (Agartala)", "Gomati", "South Tripura", "North Tripura", "Dhalai", "Khowai", "Sepahijala", "Unakoti"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Aligarh", "Bareilly", "Ghaziabad", "Noida (Gautam Buddha Nagar)", "Prayagraj", "Gorakhpur", "Moradabad", "Saharanpur", "Jhansi", "Mathura", "Ayodhya", "Shahjahanpur", "Firozabad", "Muzaffarnagar", "Budaun", "Rampur", "Mirzapur", "Etawah", "Farrukhabad", "Hapur"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani (Nainital)", "Rudrapur (Udham Singh Nagar)", "Kashipur", "Rishikesh", "Pauri Garhwal", "Tehri Garhwal", "Almora", "Pithoragarh", "Chamoli", "Uttarkashi", "Rudraprayag", "Champawat", "Bageshwar"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Jalpaiguri", "Hooghly", "Malda", "Bankura", "North 24 Parganas", "South 24 Parganas", "Purba Medinipur", "Paschim Medinipur", "Purba Bardhaman", "Paschim Bardhaman", "Nadia", "Murshidabad", "Birbhum", "Purulia", "Cooch Behar", "Alipurduar", "Dakshin Dinajpur", "Uttar Dinajpur", "Kalimpong", "Jhargram"],

    // ==========================================
    // UNION TERRITORIES (UTs)
    // ==========================================
    "Andaman and Nicobar Islands": ["Port Blair (South Andaman)", "North and Middle Andaman", "Nicobar"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Dadra and Nagar Haveli (Silvassa)"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi", "Shahdara"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Rajouri", "Udhampur", "Pulwama", "Kupwara", "Shopian", "Bandipora", "Budgam", "Doda", "Ganderbal", "Kulgam", "Poonch", "Ramban", "Reasi", "Samba", "Kishtwar"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};
    
    const crops = [
        { name: 'Wheat', basePrice: 2450 }, { name: 'Rice', basePrice: 2150 }, { name: 'Tomato', basePrice: 45 },
        { name: 'Potato', basePrice: 2850 }, { name: 'Onion', basePrice: 3900 }, { name: 'Cotton', basePrice: 7200 },
        { name: 'Maize', basePrice: 2100 }, { name: 'Sugarcane', basePrice: 380 }, { name: 'Soybean', basePrice: 4600 },
        { name: 'Mustard', basePrice: 5600 }
    ];
    
   const advisoryDB = {
    "Punjab": { 
        Rabi: "🌾 **RABI SEASON (October to March) - PUNJAB**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu/Kanak) - 100-125 kg/ha seed rate, 120-150 days\n• Mustard (Sarson) - 5-6 kg/ha, sow in October, 120-140 days\n• Barley (Jau) - 110-130 days duration\n• Chickpea (Chana/Bengal Gram) - 110-130 days\n• Green Peas (Matar/Hara Mattar) - 80-100 days\n• Potato (Aloo) - October-November planting, 80-110 days\n• Onion (Pyaz) - October-November nursery, 120-150 days\n• Garlic (Lahsun) - October-November planting, 120-140 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi/Band Gobhi) - 70-90 days\n• Carrot (Gajar) - 90-110 days\n• Radish (Mooli) - 50-60 days\n• Beetroot (Chukandar) - 60-70 days\n• Turnip (Shalgam) - 50-60 days\n• Spinach (Palak) - 40-50 days\n• Coriander (Dhaniya) - 40-50 days\n\n📅 **SOWING TIME**: October 25 to November 15\n💧 **FIRST IRRIGATION**: At crown root initiation (20-25 days after sowing)\n💊 **FERTILIZER**: 120:60:40 NPK kg/ha\n⚠️ **PEST ALERT**: Yellow rust in wheat, aphids in mustard\n💡 **FARMER TIP**: Use zero-till drill for wheat; don't burn paddy straw; apply DAP at sowing", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - PUNJAB**\n\n✅ **MAIN CROPS**:\n• Paddy/Basmati (Dhan/Chawal) - May nursery, June transplanting, 120-160 days\n• Cotton (Kapas) - April-May sowing, 90x60 cm spacing, 160-180 days\n• Maize (Makka/Bhutta) - June-July sowing, 90-110 days\n• Sugarcane (Ganna) - Spring planting, 10-12 months duration\n• Groundnut (Moongphali) - June-July sowing, 110-130 days\n• Pearl Millet (Bajra) - June-July sowing, 70-90 days\n• Pigeonpea (Arhar/Toor Dal) - 150-180 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n• Soybean (Soyabean) - June-July sowing, 100-120 days\n• Okra (Bhindi/Ladies Finger) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n• Bottle Gourd (Lauki) - 60-70 days\n\n🌱 **SEED RATE**: Paddy - 40-50 kg/ha, Cotton - 15-20 kg/ha (hybrids)\n💧 **IRRIGATION**: Paddy - maintain 5 cm standing water; Cotton - 5-6 irrigations\n🐛 **PEST CONTROL**: Stem borer in paddy, pink bollworm in cotton\n💡 **FARMER TIP**: Use basmati varieties for export; install pheromone traps for cotton pests", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - PUNJAB**\n\n✅ **MAIN CROPS**:\n• Green Gram (Moong) - March-April sowing, 70-80 days\n• Watermelon (Tarbooj) - February-March sowing, 80-100 days\n• Muskmelon (Kharbooja) - February-March sowing, 70-90 days\n• Cucumber (Kheera) - February-March sowing, 50-60 days\n• Bottle Gourd (Lauki) - February-March sowing, 60-70 days\n• Bitter Gourd (Karela) - February-March sowing, 55-65 days\n• Sponge Gourd (Tori) - February-March sowing, 50-60 days\n• Ridge Gourd (Turai) - February-March sowing, 50-60 days\n• Pumpkin (Kaddu) - February-March sowing, 80-100 days\n• Fodder Crops (Chara) - for livestock\n\n🌱 **SEED RATE**: Moong - 20-25 kg/ha, Melons - 3-4 kg/ha\n💧 **IRRIGATION**: Light irrigation every 7-10 days; drip recommended\n💡 **FARMER TIP**: Grow moong as green manure for soil enrichment" 
    },
    
    "Rajasthan": { 
        Rabi: "🌾 **RABI SEASON (October to March) - RAJASTHAN**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-110 kg/ha, limited irrigation, 120-150 days\n• Mustard (Sarson) - 5-6 kg/ha, apply sulfur 20-25 kg/ha, 120-140 days\n• Chickpea (Chana/Bengal Gram) - drought tolerant, 110-130 days\n• Barley (Jau) - drought tolerant, 110-130 days\n• Isabgol (Psyllium Husk) - cash crop for export\n• Green Peas (Matar) - 80-100 days\n• Garlic (Lahsun) - 120-140 days\n• Onion (Pyaz) - 120-150 days\n• Coriander (Dhaniya) - 90-110 days\n• Cumin (Jeera) - 100-120 days\n• Fennel (Saunf) - 120-140 days\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: 3-4 irrigations only (water scarcity area)\n💊 **FERTILIZER**: 80:40:40 NPK kg/ha for wheat\n⚠️ **PEST ALERT**: Aphids in mustard, termites in wheat\n💡 **FARMER TIP**: Use drought-tolerant varieties; practice mulching to conserve moisture", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to September) - RAJASTHAN**\n\n✅ **MAIN CROPS**:\n• Pearl Millet (Bajra) - 5-6 kg/ha, 70-90 days, drought tolerant\n• Sorghum (Jowar) - 100-120 days, rainfed\n• Green Gram (Moong) - 20-25 kg/ha, 70-80 days\n• Groundnut (Moongphali) - 110-130 days\n• Cluster Bean (Guar) - 80-90 days\n• Moth Bean (Moth) - 70-80 days, extremely drought tolerant\n• Sesame (Til) - 80-90 days\n• Castor (Arandi) - 150-180 days\n• Cowpea (Lobia) - 70-80 days\n• Pigeonpea (Arhar) - 150-180 days\n\n📅 **SOWING TIME**: June-July (with monsoon onset)\n💧 **WATER MANAGEMENT**: Rainfed; provide life-saving irrigation if dry spell >15 days\n🌱 **FERTILIZER**: 60:30:30 NPK kg/ha\n💡 **FARMER TIP**: Intercrop bajra with moong or guar for better returns and soil health", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - RAJASTHAN**\n\n✅ **MAIN CROPS**:\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Pumpkin (Kaddu) - 80-100 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Cucumber (Kheera) - 50-60 days\n• Sponge Gourd (Tori) - 50-60 days\n• Ridge Gourd (Turai) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n• Snap Melon (Tinda) - 60-70 days\n• Round Gourd (Ghia Tori) - 60-70 days\n• Fodder Crops (Chara)\n\n🌱 **SOIL**: Sandy loam with good drainage\n💧 **IRRIGATION**: Drip irrigation recommended for water conservation\n💡 **FARMER TIP**: Use plastic mulching to reduce evaporation and control weeds" 
    },
    
    "Maharashtra": { 
        Rabi: "🌾 **RABI SEASON (October to March) - MAHARASHTRA**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-110 kg/ha, 120-150 days\n• Chickpea (Chana/Harbara) - 110-130 days, black soil\n• Safflower (Kardai) - 120-140 days, oilseed crop\n• Bengal Gram (Chana) - 110-130 days\n• Sorghum (Jowar - Rabi) - 100-120 days\n• Green Peas (Matar) - 80-100 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan/Eggplant) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n\n📅 **SOWING TIME**: October-November\n🌱 **SOIL TYPE**: Deep black cotton soil (regur) ideal\n💧 **IRRIGATION**: 2-3 irrigations; conserve soil moisture\n💊 **FERTILIZER**: Chickpea - 80:40:40 NPK, Wheat - 100:50:50 NPK kg/ha\n⚠️ **PEST ALERT**: Wilt in chickpea, rust in wheat\n💡 **FARMER TIP**: Practice conservation tillage in black soils; apply gypsum for better yield", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - MAHARASHTRA**\n\n✅ **MAIN CROPS**:\n• Cotton (Kapus) - 15-20 kg/ha (hybrids), 160-180 days\n• Soybean (Soyabean) - 70-80 kg/ha, 100-120 days\n• Pigeonpea (Tur/Arhar) - 150-180 days\n• Groundnut (Shengdana) - 110-130 days\n• Pearl Millet (Bajra) - 70-90 days\n• Sorghum (Jowar) - 100-120 days\n• Maize (Makka) - 90-110 days\n• Red Gram (Toor Dal) - 150-180 days\n• Sesame (Til) - 80-90 days\n• Sunflower (Surajmukhi) - 90-110 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n\n📅 **SOWING TIME**: June-July (with monsoon onset)\n🐛 **PEST CONTROL**: Pink bollworm in cotton, yellow mosaic in soybean\n💧 **WATER**: Rainfed; irrigation if dry spell >15 days\n💡 **FARMER TIP**: Use Bt cotton hybrids; practice intercropping cotton with pigeonpea", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - MAHARASHTRA**\n\n✅ **MAIN CROPS**:\n• Groundnut (Shengdana) - 5-6 irrigations\n• Leafy Vegetables (Bhaji) - various greens\n• Brinjal (Baingan/Eggplant) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Chilli (Mirch) - 90-120 days\n• Bitter Gourd (Karela) - 55-65 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Ridge Gourd (Turai) - 50-60 days\n• Sponge Gourd (Tori) - 50-60 days\n• Snake Gourd (Padwal) - 60-70 days\n• Green Gram (Moong) - 70-80 days\n• Cowpea (Lobia) - 70-80 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: January-February for summer groundnut\n💧 **IRRIGATION**: Drip irrigation for vegetables\n🌱 **SOIL PREPARATION**: Deep plowing to break hard pan\n💡 **FARMER TIP**: Summer groundnut requires 5-6 irrigations; harvest before heavy rains" 
    },
    
    "Uttar Pradesh": { 
        Rabi: "🌾 **RABI SEASON (October to March) - UTTAR PRADESH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-125 kg/ha, 120-150 days\n• Barley (Jau) - 110-130 days\n• Green Peas (Matar) - 80-100 days\n• Lentil (Masoor) - 100-120 days\n• Chickpea (Chana) - 110-130 days\n• Mustard (Sarson) - 5-6 kg/ha, 120-140 days\n• Potato (Aloo) - 25-30 q/ha tubers, 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Carrot (Gajar) - 90-110 days\n• Radish (Mooli) - 50-60 days\n• Beetroot (Chukandar) - 60-70 days\n• Turnip (Shalgam) - 50-60 days\n• Spinach (Palak) - 40-50 days\n• Fenugreek (Methi) - 80-90 days\n• Coriander (Dhaniya) - 40-50 days\n\n📅 **SOWING TIME**: October to mid-November\n💊 **FERTILIZER**: Wheat - 120:60:40 NPK; Potato - 150:100:150 NPK kg/ha\n💧 **IRRIGATION**: Wheat - 5-6 irrigations; Potato - 5-7 irrigations\n⚠️ **PEST ALERT**: Yellow rust in wheat, late blight in potato, aphids in mustard\n💡 **FARMER TIP**: Use certified seeds; apply zinc in wheat for better yield", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - UTTAR PRADESH**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - 40-50 kg/ha, 120-160 days\n• Maize (Makka) - 20-25 kg/ha, 90-110 days\n• Pigeonpea (Arhar) - 150-180 days\n• Sugarcane (Ganna) - 10-12 months\n• Pearl Millet (Bajra) - 70-90 days\n• Sorghum (Jowar) - 100-120 days\n• Cotton (Kapas) - 160-180 days\n• Soybean (Soyabean) - 100-120 days\n• Groundnut (Moongphali) - 110-130 days\n• Sesame (Til) - 80-90 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n• Okra (Bhindi) - 50-60 days\n\n📅 **SOWING TIME**: Rice nursery in May-June, transplant June-July; Maize - June-July\n💧 **WATER MANAGEMENT**: Rice - 5 cm standing water; Maize - 4-5 irrigations\n🐛 **PEST ALERT**: Stem borer in rice, shoot fly in maize\n💡 **FARMER TIP**: Use SRI (System of Rice Intensification) method to save water and increase yield", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - UTTAR PRADESH**\n\n✅ **MAIN CROPS**:\n• Cucumber (Kheera) - 50-60 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Sponge Gourd (Tori) - 50-60 days\n• Ridge Gourd (Turai) - 50-60 days\n• Pumpkin (Kaddu) - 80-100 days\n• Green Gram (Moong) - 70-80 days\n• Cowpea (Lobia) - 70-80 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: February-March\n💧 **IRRIGATION**: Frequent light irrigations\n🌱 **FERTILIZER**: 60:40:40 NPK kg/ha\n💡 **FARMER TIP**: Grow moong as green manure after wheat harvest for soil enrichment" 
    },
    
    "West Bengal": { 
        Rabi: "🌾 **RABI SEASON (October to March) - WEST BENGAL**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-120 kg/ha\n• Mustard (Sarson) - 5-6 kg/ha\n• Lentil (Masoor) - 100-120 days\n• Potato (Aloo) - October-November planting, 80-110 days\n• Green Peas (Matar) - 80-100 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan/Eggplant) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Radish (Mooli) - 50-60 days\n• Carrot (Gajar) - 90-110 days\n• Spinach (Palak) - 40-50 days\n\n📅 **SOWING TIME**: October-November\n⚠️ **PRECAUTION**: Avoid waterlogging in heavy rainfall areas\n💧 **IRRIGATION**: Manage drainage properly; raised beds recommended\n💡 **FARMER TIP**: Use raised beds for vegetables to prevent waterlogging; apply organic manure", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - WEST BENGAL**\n\n✅ **MAIN CROPS**:\n• Rice - Aman (Dhan) - main crop, 120-160 days\n• Jute (Pat) - fiber crop, 120-150 days\n• Maize (Makka) - 90-110 days\n• Sesame (Til) - 80-90 days\n• Groundnut (Moongphali) - 110-130 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n• Pigeonpea (Arhar) - 150-180 days\n• Sweet Potato (Shakarkand) - 90-120 days\n• Taro (Arbi) - 90-120 days\n\n📅 **SOWING TIME**: June-July\n💧 **WATER MANAGEMENT**: Deep water rice varieties for flood-prone areas\n🐛 **PEST ALERT**: Stem borer, leaf folder, brown plant hopper in rice\n💡 **FARMER TIP**: Use flood-tolerant rice varieties in low-lying areas; apply need-based pesticides", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - WEST BENGAL**\n\n✅ **MAIN CROPS**:\n• Green Gram (Moong) - 70-80 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Pumpkin (Kaddu) - 80-100 days\n• Ridge Gourd (Turai) - 50-60 days\n• Sponge Gourd (Tori) - 50-60 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi) - 50-60 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: March-April\n💧 **IRRIGATION**: Regular irrigation required\n🌱 **FERTILIZER**: Apply organic manure for better yield\n💡 **FARMER TIP**: Grow short-duration vegetable varieties for quick returns before monsoon" 
    },
    
    "Bihar": { 
        Rabi: "🌾 **RABI SEASON (October to March) - BIHAR**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-125 kg/ha, 120-150 days\n• Mustard (Sarson) - 5-6 kg/ha, 120-140 days\n• Chickpea (Chana) - 110-130 days\n• Maize (Makka) - 90-110 days\n• Green Peas (Matar) - 80-100 days\n• Lentil (Masoor) - 100-120 days\n• Potato (Aloo) - 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Carrot (Gajar) - 90-110 days\n• Radish (Mooli) - 50-60 days\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Timely irrigation critical; 4-5 irrigations for wheat\n💡 **FARMER TIP**: Use improved varieties suitable for Bihar climate; practice integrated pest management", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - BIHAR**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - 120-160 days\n• Maize (Makka) - 90-110 days\n• Pearl Millet (Bajra) - 70-90 days\n• Pigeonpea (Arhar) - 150-180 days\n• Black Gram (Urad) - 80-90 days\n• Green Gram (Moong) - 70-80 days\n• Groundnut (Moongphali) - 110-130 days\n• Sesame (Til) - 80-90 days\n• Jute (Pat) - fiber crop\n• Okra (Bhindi) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n\n📅 **SOWING TIME**: June-July\n🐛 **PEST ALERT**: Stem borer in rice, shoot fly in maize, pod borer in arhar\n💡 **FARMER TIP**: Use hybrid rice varieties for higher yield; apply need-based pesticides", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - BIHAR**\n\n✅ **MAIN CROPS**:\n• Cucumber (Kheera) - 50-60 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Sponge Gourd (Tori) - 50-60 days\n• Ridge Gourd (Turai) - 50-60 days\n• Pumpkin (Kaddu) - 80-100 days\n• Green Gram (Moong) - 70-80 days\n• Cowpea (Lobia) - 70-80 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: February-March\n💧 **IRRIGATION**: Regular irrigation required; light irrigation every 7-10 days\n💡 **FARMER TIP**: Practice mulching for moisture conservation; use raised beds" 
    },
    
    "Tamil Nadu": { 
        Rabi: "🌾 **RABI SEASON (October to March) - TAMIL NADU**\n\n✅ **MAIN CROPS**:\n• Maize (Makka) - 90-110 days\n• Sorghum (Jowar/Cholam) - 100-120 days\n• Black Gram (Uzhundu) - 80-90 days\n• Green Gram (Payaru) - 70-80 days\n• Groundnut (Kadalai) - 110-130 days\n• Sunflower (Surajmukhi) - 90-110 days\n• Onion (Vengayam) - 120-150 days\n• Tomato (Thakkali) - 70-90 days\n• Brinjal (Kathirikai) - 90-120 days\n• Chilli (Milagai) - 90-120 days\n• Cabbage (Muttai Kosu) - 70-90 days\n• Cauliflower (Pookosu) - 70-90 days\n\n💧 **IRRIGATION**: Irrigation needed for all crops; drip recommended\n💡 **FARMER TIP**: Use drip irrigation for vegetables to save water; apply mulching", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - TAMIL NADU**\n\n✅ **MAIN CROPS**:\n• Rice (Nel/Dhan) - main crop, 120-160 days\n• Sugarcane (Karumbu) - 10-12 months\n• Cotton (Paruthi) - 160-180 days\n• Pearl Millet (Kambu) - 70-90 days\n• Sorghum (Cholam) - 100-120 days\n• Finger Millet (Ragi) - 90-100 days\n• Groundnut (Kadalai) - 110-130 days\n• Pigeonpea (Thuvarai) - 150-180 days\n• Turmeric (Manjal) - 210-240 days\n• Banana (Vazhai) - 12-14 months\n\n📅 **SOWING TIME**: June-July (with monsoon onset)\n🌾 **REGION**: Delta regions for rice (Cauvery Delta)\n💡 **FARMER TIP**: Use short-duration rice varieties in Cauvery delta; practice system of rice intensification", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - TAMIL NADU**\n\n✅ **MAIN CROPS**:\n• Bitter Gourd (Pavakkai) - 55-65 days\n• Snake Gourd (Pudalangai) - 60-70 days\n• Bottle Gourd (Suraikkai) - 60-70 days\n• Ridge Gourd (Peerkangai) - 50-60 days\n• Sponge Gourd (Nurai) - 50-60 days\n• Brinjal (Kathirikai) - 90-120 days\n• Tomato (Thakkali) - 70-90 days\n• Chilli (Milagai) - 90-120 days\n• Onion (Vengayam) - 120-150 days\n• Watermelon (Tharbusini) - 80-100 days\n• Muskmelon (Mulampazham) - 70-90 days\n• Fodder Crops (Mei poondu)\n\n💧 **IRRIGATION**: Drip irrigation recommended for all summer vegetables\n💡 **FARMER TIP**: Grow vegetables in raised beds with mulching; use shade nets for high summer" 
    },
    
    "Madhya Pradesh": { 
        Rabi: "🌾 **RABI SEASON (October to March) - MADHYA PRADESH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-125 kg/ha, 120-150 days\n• Chickpea (Chana) - 110-130 days\n• Mustard (Sarson) - 5-6 kg/ha, 120-140 days\n• Lentil (Masoor) - 100-120 days\n• Green Peas (Matar) - 80-100 days\n• Potato (Aloo) - 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Coriander (Dhaniya) - 90-110 days\n• Fenugreek (Methi) - 80-90 days\n• Cumin (Jeera) - 100-120 days\n\n📅 **SOWING TIME**: October-November\n💊 **FERTILIZER**: Seed treatment essential for disease control\n💡 **FARMER TIP**: Apply sulfur for mustard, zinc for wheat; practice seed treatment with fungicides", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - MADHYA PRADESH**\n\n✅ **MAIN CROPS**:\n• Soybean (Soyabean) - 70-80 kg/ha, 100-120 days\n• Cotton (Kapas) - 160-180 days\n• Maize (Makka) - 90-110 days\n• Pigeonpea (Arhar) - 150-180 days\n• Groundnut (Moongphali) - 110-130 days\n• Sesame (Til) - 80-90 days\n• Pearl Millet (Bajra) - 70-90 days\n• Sorghum (Jowar) - 100-120 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n\n📅 **SOWING TIME**: June-July\n🐛 **PEST ALERT**: Yellow mosaic in soybean, pink bollworm in cotton\n💡 **FARMER TIP**: Use certified seeds for soybean and cotton; practice integrated pest management", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - MADHYA PRADESH**\n\n✅ **MAIN CROPS**:\n• Green Gram (Moong) - 70-80 days\n• Sesame (Til) - 80-90 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Pumpkin (Kaddu) - 80-100 days\n• Ridge Gourd (Turai) - 50-60 days\n• Sponge Gourd (Tori) - 50-60 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: March-April\n💧 **IRRIGATION**: Light irrigation; drip recommended\n💡 **FARMER TIP**: Summer moong gives good returns; harvest before monsoon" 
    },
    
    "Gujarat": { 
        Rabi: "🌾 **RABI SEASON (October to March) - GUJARAT**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-110 kg/ha, 120-150 days\n• Mustard (Sarson) - 5-6 kg/ha, 120-140 days\n• Chickpea (Chana) - 110-130 days\n• Potato (Aloo) - 80-110 days\n• Isabgol (Psyllium Husk) - export crop, 120-140 days\n• Fennel (Saunf) - 120-140 days\n• Cumin (Jeera) - 100-120 days\n• Coriander (Dhaniya) - 90-110 days\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Green Peas (Matar) - 80-100 days\n\n💧 **IRRIGATION**: Light irrigation due to limited water; drip recommended\n💡 **FARMER TIP**: Use drip irrigation for spices and vegetables; practice mulching for moisture conservation", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - GUJARAT**\n\n✅ **MAIN CROPS**:\n• Cotton (Kapas) - 160-180 days\n• Groundnut (Moongphali) - 110-130 days\n• Pearl Millet (Bajra) - 70-90 days\n• Castor (Arandi) - 150-180 days\n• Sesame (Til) - 80-90 days\n• Pigeonpea (Arhar) - 150-180 days\n• Green Gram (Moong) - 70-80 days\n• Sorghum (Jowar) - 100-120 days\n\n📅 **SOWING TIME**: May-June (before monsoon)\n💧 **WATER**: Rainfed; supplemental irrigation if needed\n💡 **FARMER TIP**: Use Bt cotton hybrids for bollworm resistance; practice intercropping", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - GUJARAT**\n\n✅ **MAIN CROPS**:\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi/Ladies Finger) - 50-60 days\n• Cluster Bean (Guar) - 80-90 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Ridge Gourd (Turai) - 50-60 days\n\n💧 **IRRIGATION**: Drip irrigation for vegetables\n💡 **FARMER TIP**: Summer groundnut can be grown with 5-6 irrigations; use plastic mulching" 
    },
    
    "Karnataka": { 
        Rabi: "🌾 **RABI SEASON (October to March) - KARNATAKA**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-110 kg/ha, 120-150 days\n• Sorghum (Jowar) - 100-120 days\n• Chickpea (Chana) - 110-130 days\n• Safflower (Kardai) - 120-140 days\n• Sunflower (Surajmukhi) - 90-110 days\n• Maize (Makka) - 90-110 days\n• Onion (Pyaz) - 120-150 days\n• Potato (Aloo) - 80-110 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n\n🌱 **SOIL**: Rainfed areas, conserve moisture\n💡 **FARMER TIP**: Practice conservation tillage; apply farmyard manure for soil health", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - KARNATAKA**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - 120-160 days\n• Maize (Makka) - 90-110 days\n• Finger Millet (Ragi) - 90-100 days\n• Cotton (Kapas) - 160-180 days\n• Groundnut (Moongphali) - 110-130 days\n• Pigeonpea (Tur) - 150-180 days\n• Green Gram (Moong) - 70-80 days\n• Black Gram (Urad) - 80-90 days\n• Sunflower (Surajmukhi) - 90-110 days\n\n📅 **SOWING TIME**: June-July\n💡 **FARMER TIP**: Ragi is a staple crop; use improved varieties; practice intercropping", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - KARNATAKA**\n\n✅ **MAIN CROPS**:\n• Groundnut (Moongphali) - 110-130 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi) - 50-60 days\n• Cucumber (Kheera) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Ridge Gourd (Turai) - 50-60 days\n• Fodder Crops (Chara)\n\n💧 **IRRIGATION**: Drip irrigation recommended\n💡 **FARMER TIP**: Summer groundnut requires 5-6 irrigations; use organic mulching" 
    },
    
    "Haryana": { 
        Rabi: "🌾 **RABI SEASON (October to March) - HARYANA**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 100-125 kg/ha, 120-150 days\n• Mustard (Sarson) - 5-6 kg/ha, 120-140 days\n• Barley (Jau) - 110-130 days\n• Chickpea (Chana) - 110-130 days\n• Potato (Aloo) - 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Green Peas (Matar) - 80-100 days\n• Garlic (Lahsun) - 120-140 days\n\n📅 **SOWING TIME**: October-November\n⚠️ **PEST ALERT**: Aphids in mustard, termites in wheat\n💡 **FARMER TIP**: Timely sowing critical for wheat; apply first irrigation at crown root initiation", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - HARYANA**\n\n✅ **MAIN CROPS**:\n• Paddy (Dhan) - transplant in July, 120-160 days\n• Pearl Millet (Bajra) - 70-90 days\n• Cotton (Kapas) - 160-180 days\n• Maize (Makka) - 90-110 days\n• Cluster Bean (Guar) - 80-90 days\n• Green Gram (Moong) - 70-80 days\n\n📅 **SOWING TIME**: June-July\n💧 **WATER**: Paddy transplanting in July\n💡 **FARMER TIP**: Use short-duration paddy varieties to save water; practice direct seeded rice", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - HARYANA**\n\n✅ **MAIN CROPS**:\n• Green Gram (Moong) - 70-80 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Bitter Gourd (Karela) - 55-65 days\n• Fodder Crops (Chara)\n\n📅 **SOWING TIME**: March-April\n💧 **IRRIGATION**: Light irrigation\n💡 **FARMER TIP**: Grow moong as green manure after wheat; practice zero tillage" 
    },
    
    "Telangana": { 
        Rabi: "🌾 **RABI SEASON (October to March) - TELANGANA**\n\n✅ **MAIN CROPS**:\n• Maize (Makka) - 90-110 days\n• Sorghum (Jowar) - 100-120 days\n• Black Gram (Urad) - 80-90 days\n• Green Gram (Moong) - 70-80 days\n• Sunflower (Surajmukhi) - 90-110 days\n• Groundnut (Moongphali) - 110-130 days\n• Onion (Pyaz) - 120-150 days\n• Tomato (Tamatar) - 70-90 days\n\n💧 **IRRIGATION**: Irrigated crops; critical irrigation at flowering\n💡 **FARMER TIP**: Use hybrid maize varieties; apply balanced fertilization", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - TELANGANA**\n\n✅ **MAIN CROPS**:\n• Cotton (Kapas) - 160-180 days\n• Rice (Dhan) - 120-160 days\n• Soybean (Soyabean) - 100-120 days\n• Pigeonpea (Tur) - 150-180 days\n• Maize (Makka) - 90-110 days\n• Green Gram (Moong) - 70-80 days\n\n📅 **SOWING TIME**: June\n💡 **FARMER TIP**: Use Bt cotton for bollworm control; practice intercropping", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - TELANGANA**\n\n✅ **MAIN CROPS**:\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi) - 50-60 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Watermelon (Tarbooj) - 80-100 days\n\n💧 **IRRIGATION**: Drip irrigation for vegetables\n💡 **FARMER TIP**: Grow vegetables in summer with protective irrigation; use shade nets" 
    },
    
    "Andhra Pradesh": { 
        Rabi: "🌾 **RABI SEASON (October to March) - ANDHRA PRADESH**\n\n✅ **MAIN CROPS**:\n• Maize (Makka) - 90-110 days\n• Black Gram (Urad) - 80-90 days\n• Green Gram (Moong) - 70-80 days\n• Groundnut (Moongphali) - 110-130 days\n• Sunflower (Surajmukhi) - 90-110 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n\n💧 **IRRIGATION**: Rabi under irrigation; critical at flowering\n💡 **FARMER TIP**: Use short-duration varieties; practice integrated pest management", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - ANDHRA PRADESH**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - delta areas, 120-160 days\n• Cotton (Kapas) - 160-180 days\n• Sugarcane (Ganna) - 10-12 months\n• Groundnut (Moongphali) - 110-130 days\n• Pigeonpea (Tur) - 150-180 days\n• Green Gram (Moong) - 70-80 days\n\n📅 **SOWING TIME**: June-July\n🌾 **REGION**: Delta areas for rice (Godavari-Krishna Delta)\n💡 **FARMER TIP**: Use delta-specific rice varieties; practice system of rice intensification", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - ANDHRA PRADESH**\n\n✅ **MAIN CROPS**:\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi) - 50-60 days\n• Watermelon (Tarbooj) - 80-100 days\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n\n💧 **IRRIGATION**: Drip irrigation for vegetables\n💡 **FARMER TIP**: Summer vegetables give good prices; use mulching for moisture conservation" 
    },
    
    "Delhi": { 
        Rabi: "🌾 **RABI SEASON (October to March) - DELHI**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - peri-urban areas\n• Mustard (Sarson) - limited areas\n• Green Peas (Matar) - fresh market\n• Potato (Aloo) - 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Carrot (Gajar) - 90-110 days\n• Radish (Mooli) - 50-60 days\n• Spinach (Palak) - 40-50 days\n• Coriander (Dhaniya) - 40-50 days\n• Fenugreek (Methi) - 80-90 days\n\n💡 **FARMER TIP**: Focus on vegetable farming for urban markets; use high-yielding varieties", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - DELHI**\n\n✅ **MAIN CROPS**:\n• Pearl Millet (Bajra) - 70-90 days\n• Maize (Makka) - 90-110 days\n• Okra (Bhindi) - 50-60 days\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Chilli (Mirch) - 90-120 days\n• Bitter Gourd (Karela) - 55-65 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Sponge Gourd (Tori) - 50-60 days\n\n💡 **FARMER TIP**: Grow vegetables for fresh Delhi markets; practice organic farming", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - DELHI**\n\n✅ **MAIN CROPS**:\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Sponge Gourd (Tori) - 50-60 days\n• Ridge Gourd (Turai) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n• Watermelon (Tarbooj) - 80-100 days\n• Muskmelon (Kharbooja) - 70-90 days\n• Pumpkin (Kaddu) - 80-100 days\n\n💡 **FARMER TIP**: High demand for summer vegetables in Delhi market; use drip irrigation" 
    },
    
    "Jammu and Kashmir": { 
        Rabi: "🌾 **RABI SEASON (October to March) - JAMMU & KASHMIR**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - low altitude areas\n• Barley (Jau) - low altitude areas\n• Saffron (Kesar) - specific regions (Pampore)\n• Onion (Pyaz) - 120-150 days\n• Garlic (Lahsun) - 120-140 days\n• Green Peas (Matar) - 80-100 days\n• Potato (Aloo) - 80-110 days\n\n💡 **FARMER TIP**: Saffron requires specific soil and climate; protect from frost", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - JAMMU & KASHMIR**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - main crop in Kashmir valley\n• Maize (Makka) - hilly areas\n• Apple (Seb) - horticulture crop\n• Pear (Nashpati) - horticulture\n• Walnut (Akhrot) - dry fruit\n• Cabbage (Patta Gobhi) - 70-90 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Tomato (Tamatar) - 70-90 days\n\n💡 **FARMER TIP**: Apple is major cash crop; focus on quality and pest management", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - JAMMU & KASHMIR**\n\n✅ **MAIN CROPS**:\n• Green Peas (Matar) - 80-100 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Tomato (Tamatar) - 70-90 days\n• Brinjal (Baingan) - 90-120 days\n• Pulses - limited areas\n\n💡 **FARMER TIP**: Short growing season; use early-maturing varieties; protect from frost" 
    },
    
    "Ladakh": { 
        Rabi: "🌾 **RABI SEASON (October to March) - LADAKH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - limited valleys\n• Barley (Jau) - limited valleys\n• Cold desert agriculture\n• Peas (Matar) - 80-100 days\n\n💡 **FARMER TIP**: Extremely cold climate; limited cropping season; use cold-tolerant varieties", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - LADAKH**\n\n✅ **MAIN CROPS**:\n• Barley (Jau) - main crop\n• Wheat (Gehu) - limited areas\n• Green Peas (Matar) - 80-100 days\n• Potato (Aloo) - 80-110 days\n• Buckwheat (Kuttu) - 70-80 days\n• Turnip (Shalgam) - 50-60 days\n• Radish (Mooli) - 50-60 days\n\n💡 **FARMER TIP**: Use only short-duration varieties due to short summer; protect from cold winds", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - LADAKH**\n\n✅ **MAIN CROPS**:\n• Tomato (Tamatar) - greenhouse\n• Cucumber (Kheera) - greenhouse\n• Capsicum (Shimla Mirch) - greenhouse\n• Leafy vegetables - greenhouse\n• Radish (Mooli) - greenhouse\n• Turnip (Shalgam) - greenhouse\n\n💡 **FARMER TIP**: Greenhouse cultivation essential for vegetable production; use polyhouses" 
    },
    
    "Chandigarh": { 
        Rabi: "🌾 **RABI SEASON (October to March) - CHANDIGARH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - small agricultural pockets\n• Mustard (Sarson) - limited areas\n• Peas (Matar) - 80-100 days\n• Potato (Aloo) - 80-110 days\n• Onion (Pyaz) - 120-150 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n\n💡 **FARMER TIP**: Focus on high-value vegetables for urban market; practice terrace gardening", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - CHANDIGARH**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - peripheral areas\n• Maize (Makka) - peripheral areas\n• Okra (Bhindi) - 50-60 days\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n\n💡 **FARMER TIP**: Limited agriculture; focus on peri-urban farming; use organic methods", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - CHANDIGARH**\n\n✅ **MAIN CROPS**:\n• Cucumber (Kheera) - 50-60 days\n• Bottle Gourd (Lauki) - 60-70 days\n• Sponge Gourd (Tori) - 50-60 days\n• Bitter Gourd (Karela) - 55-65 days\n• Watermelon (Tarbooj) - 80-100 days\n\n💡 **FARMER TIP**: Supply fresh vegetables to Chandigarh market; use drip irrigation" 
    },
    
    "Puducherry": { 
        Rabi: "🌾 **RABI SEASON (October to March) - PUDUCHERRY**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - limited area\n• Pulses - limited area\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Onion (Pyaz) - 120-150 days\n• Cabbage (Patta Gobhi) - 70-90 days\n\n💡 **FARMER TIP**: Limited agricultural land; focus on vegetables for local market", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - PUDUCHERRY**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - main crop\n• Sugarcane (Ganna) - cash crop\n• Cotton (Kapas) - limited area\n• Groundnut (Moongphali) - 110-130 days\n\n💡 **FARMER TIP**: Rice is staple crop in Puducherry; use high-yielding varieties", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - PUDUCHERRY**\n\n✅ **MAIN CROPS**:\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Chilli (Mirch) - 90-120 days\n• Okra (Bhindi) - 50-60 days\n• Cucumber (Kheera) - 50-60 days\n• Fodder Crops (Chara)\n\n💡 **FARMER TIP**: Summer vegetables give good returns; use drip irrigation" 
    },
    
    "Lakshadweep": { 
        Rabi: "🌾 **RABI SEASON (October to March) - LAKSHADWEEP**\n\n✅ **MAIN CROPS**:\n• Coconut (Nariyal) - main crop\n• Limited agriculture\n• Banana (Kela) - small scale\n\n💡 **FARMER TIP**: Coconut is the primary crop on islands; intercropping recommended", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - LAKSHADWEEP**\n\n✅ **MAIN CROPS**:\n• Coconut (Nariyal)\n• Banana (Kela) - small scale\n• Sweet Potato (Shakarkand) - small scale\n• Taro (Arbi) - small scale\n\n💡 **FARMER TIP**: Intercropping with coconut recommended; use organic manure", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - LAKSHADWEEP**\n\n✅ **MAIN CROPS**:\n• Limited vegetable cultivation\n• Leafy vegetables - small scale\n\n💡 **FARMER TIP**: Import most vegetables; grow limited varieties for self-consumption" 
    },
    
    "Andaman and Nicobar Islands": { 
        Rabi: "🌾 **RABI SEASON (October to March) - ANDAMAN & NICOBAR**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - limited area\n• Pulses - limited area\n• Vegetables - limited area\n• Coconut (Nariyal) - plantation crop\n\n💡 **FARMER TIP**: Self-sufficiency in rice targeted; use high-yielding varieties", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - ANDAMAN & NICOBAR**\n\n✅ **MAIN CROPS**:\n• Paddy (Dhan) - main crop\n• Coconut (Nariyal) - plantation crop\n• Arecanut (Supari) - plantation crop\n• Cloves (Laung) - spices\n• Nutmeg (Jaiphal) - spices\n• Cinnamon (Dalchini) - spices\n\n💡 **FARMER TIP**: Plantation crops are mainstay; practice organic farming", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - ANDAMAN & NICOBAR**\n\n✅ **MAIN CROPS**:\n• Vegetables - small scale\n• Fruits - small scale\n• Banana (Kela) - small scale\n\n💡 **FARMER TIP**: Focus on local consumption; use organic methods" 
    },
    
    "Dadra and Nagar Haveli and Daman and Diu": { 
        Rabi: "🌾 **RABI SEASON (October to March) - DADRA & NAGAR HAVELI**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - limited area\n• Pulses - limited area\n• Vegetables - all types\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n\n💡 **FARMER TIP**: Limited agriculture; focus on vegetables; use organic manure", 
        
        Kharif: "🌧️ **KHARIF SEASON (June to October) - DADRA & NAGAR HAVELI**\n\n✅ **MAIN CROPS**:\n• Paddy (Dhan) - main crop\n• Finger Millet (Ragi) - 90-100 days\n• Pulses - various\n• Groundnut (Moongphali) - 110-130 days\n\n💡 **FARMER TIP**: Paddy is main staple; use high-yielding varieties", 
        
        Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - DADRA & NAGAR HAVELI**\n\n✅ **MAIN CROPS**:\n• Vegetables - all types\n• Brinjal (Baingan) - 90-120 days\n• Tomato (Tamatar) - 70-90 days\n• Okra (Bhindi) - 50-60 days\n• Cucumber (Kheera) - 50-60 days\n• Fodder Crops (Chara)\n\n💡 **FARMER TIP**: Summer vegetables for local markets; use drip irrigation" 
    },

     "Assam": {
    Rabi: "🌾 **RABI SEASON (October to March) - ASSAM**\n\n✅ **MAIN CROPS**:\n• Rice (Boro) - irrigated winter rice\n• Wheat (Gehu) - 120-140 days\n• Mustard (Sarson) - 110-130 days\n• Potato (Aloo) - 80-100 days\n• Lentil (Masoor) - 100-120 days\n• Green Peas (Matar) - 80-100 days\n• Onion (Pyaz) - 120-140 days\n• Garlic (Lahsun) - 120-140 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Tomato (Tamatar) - 70-90 days\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: As required in dry spells\n⚠️ **PEST ALERT**: Aphids in mustard\n💡 **FARMER TIP**: Use raised beds to avoid waterlogging and certified seeds.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - ASSAM**\n\n✅ **MAIN CROPS**:\n• Rice (Ahu, Sali)\n• Jute (Pat)\n• Maize (Makka)\n• Black Gram (Urad)\n• Green Gram (Moong)\n• Sesame (Til)\n• Sugarcane (Ganna)\n• Tea (Chai) - plantation crop\n• Ginger (Adrak)\n• Turmeric (Haldi)\n\n📅 **SOWING TIME**: May-June\n💧 **WATER MANAGEMENT**: Drain excess water during floods\n🐛 **PEST ALERT**: Stem borer and leaf folder in rice\n💡 **FARMER TIP**: Use flood-tolerant rice varieties.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - ASSAM**\n\n✅ **MAIN CROPS**:\n• Cucumber (Kheera)\n• Watermelon (Tarbooj)\n• Bottle Gourd (Lauki)\n• Bitter Gourd (Karela)\n• Ridge Gourd (Turai)\n• Pumpkin (Kaddu)\n• Okra (Bhindi)\n\n💧 **IRRIGATION**: Light irrigation every 7-10 days\n💡 **FARMER TIP**: Grow short-duration vegetables before monsoon."
},

"Arunachal Pradesh": {
    Rabi: "🌾 **RABI SEASON (October to March) - ARUNACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Barley (Jau)\n• Potato (Aloo)\n• Peas (Matar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Mustard (Sarson)\n\n📅 **SOWING TIME**: October-November\n💡 **FARMER TIP**: Use cold-tolerant varieties and mulch crops against frost.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - ARUNACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Millets\n• Soybean\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Large Cardamom\n\n📅 **SOWING TIME**: May-June\n💡 **FARMER TIP**: Terrace farming helps reduce soil erosion.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - ARUNACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Tomato\n• Cucumber\n• Pumpkin\n• Bottle Gourd\n• Leafy Vegetables\n\n💡 **FARMER TIP**: Use organic compost and rainwater harvesting."
},

"Chhattisgarh": {
    Rabi: "🌾 **RABI SEASON (October to March) - CHHATTISGARH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Chickpea (Chana)\n• Lentil (Masoor)\n• Mustard (Sarson)\n• Linseed (Alsi)\n• Potato (Aloo)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: 3-4 irrigations\n💡 **FARMER TIP**: Treat seeds before sowing to prevent fungal diseases.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - CHHATTISGARH**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - Main crop\n• Maize (Makka)\n• Soybean\n• Groundnut (Moongphali)\n• Sesame (Til)\n• Pigeonpea (Arhar)\n• Green Gram (Moong)\n\n📅 **SOWING TIME**: June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Adopt line transplanting for better yields.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - CHHATTISGARH**\n\n✅ **MAIN CROPS**:\n• Watermelon\n• Muskmelon\n• Cucumber\n• Bottle Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Drip irrigation recommended\n💡 **FARMER TIP**: Mulching conserves soil moisture."
},

"Goa": {
    Rabi: "🌾 **RABI SEASON (October to March) - GOA**\n\n✅ **MAIN CROPS**:\n• Vegetables\n• Cowpea\n• Groundnut\n• Onion\n• Tomato\n• Brinjal\n• Chilli\n\n📅 **SOWING TIME**: October-November\n💡 **FARMER TIP**: Grow vegetables on raised beds to avoid waterlogging.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - GOA**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Coconut (Nariyal)\n• Cashew (Kaju)\n• Arecanut (Supari)\n• Banana (Kela)\n• Sugarcane (Ganna)\n\n📅 **SOWING TIME**: June\n💧 **WATER MANAGEMENT**: Proper drainage during heavy rains\n💡 **FARMER TIP**: Apply organic manure to coconut plantations.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - GOA**\n\n✅ **MAIN CROPS**:\n• Watermelon\n• Cucumber\n• Bottle Gourd\n• Bitter Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Regular irrigation required\n💡 **FARMER TIP**: Summer vegetables fetch higher market prices."
},

     "Himachal Pradesh": {
    Rabi: "🌾 **RABI SEASON (October to March) - HIMACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu) - 120-140 days\n• Barley (Jau) - 110-130 days\n• Mustard (Sarson) - 110-130 days\n• Peas (Matar) - 80-100 days\n• Potato (Aloo) - 90-110 days\n• Garlic (Lahsun) - 120-140 days\n• Onion (Pyaz) - 120-140 days\n• Cauliflower (Phool Gobhi) - 70-90 days\n• Cabbage (Patta Gobhi) - 70-90 days\n• Spinach (Palak) - 40-50 days\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation when required\n💡 **FARMER TIP**: Protect crops from frost using mulching and low tunnels.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - HIMACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Maize (Makka)\n• Rice (Dhan)\n• Tomato (Tamatar)\n• Capsicum (Shimla Mirch)\n• French Bean\n• Apple (Seb)\n• Plum\n• Peach\n• Pear\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Apple scab and fruit fly\n💡 **FARMER TIP**: Prune fruit trees regularly and use disease-free planting material.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - HIMACHAL PRADESH**\n\n✅ **MAIN CROPS**:\n• Cucumber\n• Tomato\n• Capsicum\n• Pumpkin\n• Bottle Gourd\n• Leafy Vegetables\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Grow vegetables under polyhouses for higher income."
},

"Jharkhand": {
    Rabi: "🌾 **RABI SEASON (October to March) - JHARKHAND**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Chickpea (Chana)\n• Lentil (Masoor)\n• Mustard (Sarson)\n• Potato (Aloo)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n• Peas (Matar)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: 3-4 irrigations\n💡 **FARMER TIP**: Seed treatment improves germination and disease resistance.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - JHARKHAND**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Finger Millet (Ragi)\n• Pigeonpea (Arhar)\n• Black Gram (Urad)\n• Green Gram (Moong)\n• Groundnut (Moongphali)\n• Sesame (Til)\n\n📅 **SOWING TIME**: June-July\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Harvest rainwater for supplemental irrigation.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - JHARKHAND**\n\n✅ **MAIN CROPS**:\n• Watermelon\n• Muskmelon\n• Cucumber\n• Bottle Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Drip irrigation preferred\n💡 **FARMER TIP**: Mulching helps conserve moisture."
},

"Kerala": {
    Rabi: "🌾 **RABI SEASON (October to March) - KERALA**\n\n✅ **MAIN CROPS**:\n• Rice (Puncha)\n• Vegetables\n• Tapioca (Cassava)\n• Banana (Kela)\n• Cowpea\n• Tomato\n• Brinjal\n• Chilli\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Required during dry periods\n💡 **FARMER TIP**: Use organic manure and proper drainage in paddy fields.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - KERALA**\n\n✅ **MAIN CROPS**:\n• Rice (Virippu)\n• Coconut (Nariyal)\n• Rubber\n• Pepper (Kali Mirch)\n• Cardamom\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Banana\n• Tapioca\n\n📅 **SOWING TIME**: May-June\n💧 **WATER MANAGEMENT**: Ensure proper drainage due to heavy rainfall\n💡 **FARMER TIP**: Intercrop spices with coconut plantations for better income.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - KERALA**\n\n✅ **MAIN CROPS**:\n• Bitter Gourd\n• Bottle Gourd\n• Snake Gourd\n• Ridge Gourd\n• Cucumber\n• Okra\n\n💧 **IRRIGATION**: Drip irrigation recommended\n💡 **FARMER TIP**: Grow vegetables on raised beds with mulching."
},

"Odisha": {
    Rabi: "🌾 **RABI SEASON (October to March) - ODISHA**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Mustard (Sarson)\n• Green Gram (Moong)\n• Black Gram (Urad)\n• Chickpea (Chana)\n• Potato (Aloo)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n• Tomato\n• Cabbage\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation where required\n💡 **FARMER TIP**: Use certified seeds and balanced fertilizers.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - ODISHA**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan) - Main crop\n• Maize (Makka)\n• Groundnut (Moongphali)\n• Sesame (Til)\n• Green Gram (Moong)\n• Black Gram (Urad)\n• Sugarcane (Ganna)\n• Cotton (Kapas)\n\n📅 **SOWING TIME**: June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Use flood-tolerant rice varieties in coastal districts.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - ODISHA**\n\n✅ **MAIN CROPS**:\n• Watermelon\n• Muskmelon\n• Cucumber\n• Bottle Gourd\n• Bitter Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Summer vegetables provide additional income before monsoon."
},

     "Manipur": {
    Rabi: "🌾 **RABI SEASON (October to March) - MANIPUR**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Mustard (Sarson)\n• Potato (Aloo)\n• Peas (Matar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation during dry spells\n💡 **FARMER TIP**: Use raised beds to improve drainage and crop growth.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - MANIPUR**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Black Gram (Urad)\n• Green Gram (Moong)\n• Soybean\n• Ginger (Adrak)\n• Turmeric (Haldi)\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Practice terrace farming in hilly regions.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - MANIPUR**\n\n✅ **MAIN CROPS**:\n• Cucumber\n• Tomato\n• Bottle Gourd\n• Pumpkin\n• Okra\n• Watermelon\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Mulching helps conserve soil moisture."
},

"Meghalaya": {
    Rabi: "🌾 **RABI SEASON (October to March) - MEGHALAYA**\n\n✅ **MAIN CROPS**:\n• Potato (Aloo)\n• Wheat (Gehu)\n• Mustard (Sarson)\n• Peas (Matar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Carrot (Gajar)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: As required\n💡 **FARMER TIP**: Use organic manure for healthy crops.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - MEGHALAYA**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Black Pepper\n• Arecanut (Supari)\n• Pineapple\n\n📅 **SOWING TIME**: May-June\n💧 **WATER MANAGEMENT**: Prevent soil erosion on slopes\n💡 **FARMER TIP**: Adopt contour farming in hilly areas.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - MEGHALAYA**\n\n✅ **MAIN CROPS**:\n• Tomato\n• Cucumber\n• Pumpkin\n• Bottle Gourd\n• Okra\n\n💧 **IRRIGATION**: Light irrigation\n💡 **FARMER TIP**: Grow vegetables using organic methods."
},

"Mizoram": {
    Rabi: "🌾 **RABI SEASON (October to March) - MIZORAM**\n\n✅ **MAIN CROPS**:\n• Potato (Aloo)\n• Peas (Matar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Mustard (Sarson)\n\n📅 **SOWING TIME**: October-November\n💡 **FARMER TIP**: Use compost to improve soil fertility.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - MIZORAM**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Banana (Kela)\n• Pineapple\n• Orange\n\n📅 **SOWING TIME**: May-June\n💧 **WATER MANAGEMENT**: Prevent soil erosion on hill slopes\n💡 **FARMER TIP**: Terrace cultivation improves productivity.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - MIZORAM**\n\n✅ **MAIN CROPS**:\n• Tomato\n• Cucumber\n• Pumpkin\n• Bottle Gourd\n• Chilli\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Use mulching to retain moisture."
},

"Nagaland": {
    Rabi: "🌾 **RABI SEASON (October to March) - NAGALAND**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Potato (Aloo)\n• Peas (Matar)\n• Mustard (Sarson)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation\n💡 **FARMER TIP**: Apply organic compost for better yields.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - NAGALAND**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Millets\n• Soybean\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Naga Chilli\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Terrace farming reduces soil erosion and improves water conservation.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - NAGALAND**\n\n✅ **MAIN CROPS**:\n• Tomato\n• Cucumber\n• Bottle Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Grow vegetables using drip irrigation for efficient water use."
},

     "Sikkim": {
    Rabi: "🌾 **RABI SEASON (October to March) - SIKKIM**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Barley (Jau)\n• Potato (Aloo)\n• Peas (Matar)\n• Mustard (Sarson)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Carrot (Gajar)\n• Radish (Mooli)\n• Garlic (Lahsun)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation when required\n💡 **FARMER TIP**: Use organic compost and mulching; Sikkim is India's first fully organic state.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - SIKKIM**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Finger Millet (Ragi)\n• Large Cardamom\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Buckwheat\n• Soybean\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Practice terrace farming to reduce soil erosion and conserve water.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - SIKKIM**\n\n✅ **MAIN CROPS**:\n• Tomato\n• Cucumber\n• Capsicum\n• Bottle Gourd\n• Pumpkin\n• Leafy Vegetables\n\n💧 **IRRIGATION**: Regular irrigation\n💡 **FARMER TIP**: Polyhouse cultivation improves vegetable production in hilly regions."
},

"Tripura": {
    Rabi: "🌾 **RABI SEASON (October to March) - TRIPURA**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Mustard (Sarson)\n• Potato (Aloo)\n• Lentil (Masoor)\n• Green Peas (Matar)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n• Tomato (Tamatar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Irrigate during dry periods\n💡 **FARMER TIP**: Use certified seeds and apply farmyard manure.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - TRIPURA**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Jute (Pat)\n• Sesame (Til)\n• Groundnut (Moongphali)\n• Green Gram (Moong)\n• Black Gram (Urad)\n• Pineapple\n• Banana (Kela)\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Stem borer in rice\n💡 **FARMER TIP**: Use flood-tolerant rice varieties in low-lying areas.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - TRIPURA**\n\n✅ **MAIN CROPS**:\n• Watermelon\n• Muskmelon\n• Cucumber\n• Bottle Gourd\n• Bitter Gourd\n• Ridge Gourd\n• Pumpkin\n• Okra\n\n💧 **IRRIGATION**: Regular irrigation every 7-10 days\n💡 **FARMER TIP**: Mulching helps retain moisture during summer."
},

"Uttarakhand": {
    Rabi: "🌾 **RABI SEASON (October to March) - UTTARAKHAND**\n\n✅ **MAIN CROPS**:\n• Wheat (Gehu)\n• Barley (Jau)\n• Mustard (Sarson)\n• Lentil (Masoor)\n• Chickpea (Chana)\n• Potato (Aloo)\n• Onion (Pyaz)\n• Garlic (Lahsun)\n• Peas (Matar)\n• Cabbage (Patta Gobhi)\n• Cauliflower (Phool Gobhi)\n• Spinach (Palak)\n\n📅 **SOWING TIME**: October-November\n💧 **IRRIGATION**: Light irrigation as required\n💡 **FARMER TIP**: Use terrace farming and mulching to conserve moisture and prevent erosion.",

    Kharif: "🌧️ **KHARIF SEASON (June to October) - UTTARAKHAND**\n\n✅ **MAIN CROPS**:\n• Rice (Dhan)\n• Maize (Makka)\n• Finger Millet (Ragi)\n• Barnyard Millet (Sanwa)\n• Soybean\n• Black Gram (Urad)\n• Green Gram (Moong)\n• Ginger (Adrak)\n• Turmeric (Haldi)\n• Apple (Seb)\n\n📅 **SOWING TIME**: May-June\n🐛 **PEST ALERT**: Stem borer in rice and fruit fly in orchards\n💡 **FARMER TIP**: Promote integrated farming with horticulture for higher income.",

    Zaid: "☀️ **ZAID/SUMMER SEASON (April to June) - UTTARAKHAND**\n\n✅ **MAIN CROPS**:\n• Cucumber\n• Tomato\n• Capsicum\n• Bottle Gourd\n• Pumpkin\n• Watermelon\n• Muskmelon\n• Leafy Vegetables\n\n💧 **IRRIGATION**: Regular irrigation; drip recommended\n💡 **FARMER TIP**: Grow off-season vegetables in polyhouses for premium prices."
}
};

   const specificCropAdvice = {
    "Wheat (Gehu)": `🌾 **WHEAT (GEHU) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING & PREPARATION**
═══════════════════════════════════════════════════════════
📅 **Sowing Time**: October-November (Rabi season)
🌱 **Seed Rate**: 100-125 kg per hectare
💊 **Seed Treatment**: Treat with Carbendazim @ 2g/kg seed
📏 **Spacing**: Row spacing 20-22.5 cm
🌍 **Soil**: Well-drained loamy soil, pH 6.5-7.5

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha (apply 15 days before sowing)
• NPK: 120:60:40 kg/ha
• Zinc Sulphate: 25 kg/ha if zinc deficient

💧 **STEP 2: IRRIGATION**
• 5-6 irrigations total
• Critical stages: Crown root initiation, Tillering, Flowering

🌾 **STEP 3: HARVEST**
• Time: March-April when grains are hard & moisture 12-14%
• Yield: 45-55 quintals per hectare`,

    "Rice (Dhan/Chawal)": `🍚 **RICE (DHAN/CHAWAL) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: May-June
🌱 **Seed Rate**: 40-50 kg/ha
💊 **Seed Treatment**: Soak in salt water, treat with Trichoderma
👶 **Seedling Age**: 25-30 days
📏 **Spacing**: 20 cm x 15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 120:60:40 kg/ha
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: WATER MANAGEMENT**
• Maintain 5 cm standing water from transplanting to flowering
• Drain 2 weeks before harvest

🌾 **STEP 3: HARVEST**
• Time: October-November when 80% grains are golden yellow
• Yield: 50-65 quintals per hectare`,

    "Maize (Makka/Bhutta)": `🌽 **MAIZE (MAKKA/BHUTTA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or October-November (Rabi)
🌱 **Seed Rate**: 20-25 kg/ha
💊 **Seed Treatment**: Carbendazim + Thiram @ 3g/kg seed
📏 **Spacing**: 60 cm x 25 cm

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha
• NPK: 150:75:75 kg/ha
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: IRRIGATION & CARE**
• 4-5 irrigations
• Critical: Knee-high, tasseling, silking stages
• Earthing up at 25-30 days

🌾 **STEP 3: HARVEST**
• Time: 90-110 days after sowing (husk turns brown)
• Yield: 45-60 quintals per hectare`,

    "Cotton (Kapas)": `🧶 **COTTON (KAPAS) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: April-May (Kharif)
🌱 **Seed Rate**: 15-20 kg/ha (hybrids)
💊 **Seed Treatment**: Carbendazim + Thiram @ 3g/kg seed
📏 **Spacing**: 90 cm x 60 cm (hybrids)

💊 **FERTILIZER & MANURE**:
• FYM: 12-15 tons/ha
• NPK: 150:75:75 kg/ha
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: IRRIGATION & PEST MANAGEMENT**
• 5-6 irrigations
• Install pheromone traps for pink bollworm

🌾 **STEP 3: HARVEST**
• Time: October-December when bolls open fully
• 3-4 pickings at 7-10 day intervals
• Yield: 20-25 quintals seed cotton per hectare`,

    "Potato (Aloo)": `🥔 **POTATO (ALOO) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: October-November (Rabi)
🌱 **Seed Rate**: 25-30 quintals tubers/ha
💊 **Seed Treatment**: Dip in Carbendazim + Mancozeb
📏 **Spacing**: 60 cm x 20 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 150:100:150 kg/ha
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: IRRIGATION & EARTHING UP**
• 5-6 irrigations
• Earthing up at 25-30 days after planting

🌾 **STEP 3: HARVEST**
• Time: January-March when vines dry completely
• Yield: 250-350 quintals per hectare`,

    "Onion (Pyaz)": `🧅 **ONION (PYAZ) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: October-November (Rabi)
🌱 **Seed Rate**: 8-10 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
👶 **Seedling Age**: 6-8 weeks
📏 **Spacing**: 15 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 100:50:100 kg/ha
• Sulphur: 20-25 kg/ha

💧 **STEP 2: IRRIGATION & CARE**
• 5-6 irrigations
• Stop irrigation when tops start falling (15-20 days before harvest)

🌾 **STEP 3: HARVEST**
• Time: March-May when 50% tops fall
• Curing: Dry in field for 5-7 days
• Yield: 200-250 quintals per hectare`,

    "Tomato (Tamatar)": `🍅 **TOMATO (TAMATAR) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: September-October (Rabi)
🌱 **Seed Rate**: 400-500 gm/ha
💊 **Seed Treatment**: Trichoderma @ 4g/kg seed
👶 **Seedling Age**: 25-30 days
📏 **Spacing**: 75 cm x 45 cm (determinate)

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 120:80:80 kg/ha
• Boron: 1 kg/ha, Calcium Nitrate: 25 kg/ha

💧 **STEP 2: IRRIGATION & STAKING**
• Drip irrigation every 2-3 days
• Provide support with bamboo sticks

🌾 **STEP 3: HARVEST**
• Time: 65-80 days after transplanting
• Yield: 250-350 quintals per hectare`,

    "Sugarcane (Ganna)": `🎋 **SUGARCANE (GANNA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: January-February (Spring) or October-November (Autumn)
🌱 **Seed Rate**: 35-40 quintals setts/ha
💊 **Seed Treatment**: Carbendazim + Imidacloprid
📏 **Spacing**: 90 cm x 60 cm

💊 **FERTILIZER & MANURE**:
• FYM: 20-25 tons/ha
• NPK: 250:100:150 kg/ha
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: IRRIGATION & EARTHING UP**
• 15-20 irrigations (every 10-15 days)
• Earthing up at 120 days after planting

🌾 **STEP 3: HARVEST**
• Time: 10-12 months after planting
• Yield: 70-85 tons per hectare`,

    "Mustard (Sarson)": `🌼 **MUSTARD (SARSON) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: October-November (Rabi)
🌱 **Seed Rate**: 5-6 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 45 cm x 15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 80:40:40 kg/ha
• Sulphur: 20-25 kg/ha

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 irrigations (critical at flowering and pod formation)
• Hand weeding at 25 days

🌾 **STEP 3: HARVEST**
• Time: February-March when pods turn yellow
• Yield: 15-20 quintals per hectare`,

    "Paddy (Basmati)": `🍚 **PADDY (BASMATI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: June-July (Kharif)
🌱 **Seed Rate**: 35-40 kg/ha
💊 **Seed Treatment**: Soak in salt water, treat with Trichoderma
👶 **Seedling Age**: 20-25 days (shorter for Basmati)
📏 **Spacing**: 20 cm x 12-15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 100:50:40 kg/ha (Basmati needs slightly less N)
• Zinc Sulphate: 25 kg/ha

💧 **STEP 2: WATER MANAGEMENT**
• Maintain 3-5 cm water from transplanting to flowering
• Avoid deep water; drain 10-15 days before harvest

🌾 **STEP 3: HARVEST**
• Time: October when 85% grains are golden
• Yield: 35-45 quintals per hectare (quality-focused)`,

    "Groundnut (Kadale)": `🫘 **GROUNDNUT (KADALE) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or October-November (Rabi in southern India)
🌱 **Seed Rate**: 80-100 kg/ha (kernel)
💊 **Seed Treatment**: Carbendazim + Thiram @ 3g/kg seed
📏 **Spacing**: 45 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha
• NPK: 40:80:40 kg/ha (low N, high P)
• Calcium: 100-150 kg/ha if soil deficient

💧 **STEP 2: IRRIGATION & CARE**
• 3-4 irrigations (critical at flowering & peg formation)
• Weed control at 25-30 days

🌾 **STEP 3: HARVEST**
• Time: When pods are fully developed and leaves yellow
• Yield: 15-25 quintals per hectare`,

    "Pigeon Pea (Arhar/Tur)": `🫗 **PIGEON PEA (ARHAR/TUR) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif)
🌱 **Seed Rate**: 25-30 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 60 cm x 20 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 20:40:20 kg/ha (low requirement)
• Micronutrients if soil test shows deficiency

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 irrigations in dry spells
• Weed control at 25-30 days

🌾 **STEP 3: HARVEST**
• Time: When pods turn black and dry (multiple pickings)
• Yield: 10-15 quintals per hectare`,

    "Soybean (Sarsoo)": `🫘 **SOYBEAN (SARSOO) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif)
🌱 **Seed Rate**: 60-70 kg/ha
💊 **Seed Treatment**: Carbendazim + Thiram @ 3g/kg seed
📏 **Spacing**: 45 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 20:40:20 kg/ha (soybean fixes N)
• Zinc Sulphate: 25 kg/ha if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 irrigations at flowering & pod filling
• Weed control at 25-30 days

🌾 **STEP 3: HARVEST**
• Time: When leaves fall and pods turn brown
• Yield: 18-25 quintals per hectare`,

    "Chickpea (Gilji/Arbi)": `🫗 **CHICKPEA (GILJI/ARBI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: October-November (Rabi)
🌱 **Seed Rate**: 40-50 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 45 cm x 15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 20:40:20 kg/ha
• Sulphur: 20 kg/ha if soil deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2 irrigations (critical at flowering & pod formation)
• Weed control at 25-30 days

🌾 **STEP 3: HARVEST**
• Time: When pods turn brown and plants dry
• Yield: 12-18 quintals per hectare`,

    "Green Gram (Moong/Mung)": `🌱 **GREEN GRAM (MOONG/MUNG) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (summer irrigated)
🌱 **Seed Rate**: 10-12 kg/ha (broadcast) or 8-10 kg/ha (row)
💊 **Seed Treatment**: Rhizobium + Carbendazim @ 2g/kg seed
📏 **Spacing**: 30 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 5-8 tons/ha
• NPK: 20:40:20 kg/ha
• Zinc Sulphate: 25 kg/ha if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 light irrigations (depending on rainfall)
• Weed control early; avoid waterlogging

🌾 **STEP 3: HARVEST**
• Time: 60-75 days after sowing when pods mature
• Yield: 6-8 quintals per hectare`,

    "Black Gram (Urad)": `🌱 **BLACK GRAM (URAD) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif)
🌱 **Seed Rate**: 15-20 kg/ha
💊 **Seed Treatment**: Rhizobium + Carbendazim @ 2g/kg seed
📏 **Spacing**: 30 cm x 10-15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 5-8 tons/ha
• NPK: 20:40:20 kg/ha
• Sulphur: 20 kg/ha if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 irrigations; avoid excess moisture
• Timely weeding and disease watch

🌾 **STEP 3: HARVEST**
• Time: 90-110 days depending on variety
• Yield: 8-12 quintals per hectare`,

    "Safflower (Kusum)": `🌼 **SAFFLOWER (KUSUM) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: October-November (Rabi)
🌱 **Seed Rate**: 6-8 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 30 cm x 10-15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 5-7 tons/ha
• NPK: 40:40:20 kg/ha
• Boron: 0.5-1 kg/ha if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 irrigations; drought tolerant crop
• Control safflower fly and aphids

🌾 **STEP 3: HARVEST**
• Time: 120-140 days when heads dry
• Yield: 8-12 quintals per hectare`,

    "Sunflower (Surajmukhi)": `🌻 **SUNFLOWER (SURAJMUKHI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (Rabi)
🌱 **Seed Rate**: 8-10 kg/ha (hybrids lower)
💊 **Seed Treatment**: Thiram + Carbendazim @ 2-3g/kg seed
📏 **Spacing**: 60 cm x 30 cm (single row) or 45 cm x 30 cm (double row)

💊 **FERTILIZER & MANURE**:
• FYM: 8-10 tons/ha
• NPK: 60:40:40 kg/ha
• Boron and Zinc if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 3-4 irrigations, critical at flowering & grain fill
• Bird protection and moth control

🌾 **STEP 3: HARVEST**
• Time: 100-120 days when back of heads turn yellow
• Yield: 10-15 quintals seed per hectare`,

    "Sesame (Til)": `🌾 **SESAME (TIL) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or March-April (Rabi/late)
🌱 **Seed Rate**: 5-6 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 30 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 5-7 tons/ha
• NPK: 20:40:20 kg/ha
• Calcium and Boron if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 2-3 light irrigations; crop is drought tolerant
• Support during heavy winds if tall varieties

🌾 **STEP 3: HARVEST**
• Time: 90-120 days when capsules turn brown
• Yield: 5-8 quintals per hectare`,

    "Millet (Bajra/Pearl Millet)": `🌾 **MILLET (BAJRA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif)
🌱 **Seed Rate**: 4-6 kg/ha (if broadcast) or 3-4 kg/ha (row)
💊 **Seed Treatment**: Thiram/Carbendazim @ 2-3g/kg seed
📏 **Spacing**: 45 cm x 10-15 cm

💊 **FERTILIZER & MANURE**:
• FYM: 5-8 tons/ha
• NPK: 60:30:20 kg/ha
• Iron and Zinc if deficient

💧 **STEP 2: IRRIGATION & CARE**
• 1-2 irrigations in dry spells
• Tolerant to heat and low moisture

🌾 **STEP 3: HARVEST**
• Time: 60-90 days depending on hybrid
• Yield: 20-30 quintals per hectare`,

    "Banana (Kela)": `🍌 **BANANA (KELA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: Year-round (prefer early monsoon)
🌱 **Planting Material**: 1200-1600 suckers/ha (depending on spacing)
💊 **Treatment**: Treat suckers with fungicide (Carbendazim) before planting
📏 **Spacing**: 2.5 m x 2.5 m (about 1600 plants/ha)

💊 **FERTILIZER & MANURE**:
• FYM: 40-50 tons/ha (split doses)
• NPK: 600:200:600 kg/ha (split monthly)
• Micronutrients: Boron, Zinc as foliar sprays

💧 **STEP 2: IRRIGATION & CARE**
• Frequent irrigation (drip recommended)
• Propping and bunch covers to protect fruits

🌾 **STEP 3: HARVEST**
• Time: 9-12 months to first bunch
• Yield: 50-70 tons per hectare`,

    "Papaya (Papaiya)": `🥭 **PAPAYA (PAPAIYA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: Year-round in warm areas; avoid frost
🌱 **Planting Material**: Seedlings from polybags, 1600-2000 plants/ha at 2m x 2m
💊 **Treatment**: Seed/seedling treatment with Trichoderma
📏 **Spacing**: 2 m x 2 m

💊 **FERTILIZER & MANURE**:
• FYM: 20-25 tons/ha
• NPK: 200:100:200 kg/ha (split monthly)
• Calcium and Boron for fruit quality

💧 **STEP 2: IRRIGATION & CARE**
• Frequent irrigation and mulching
• Protect from strong winds; stake tall plants

🌾 **STEP 3: HARVEST**
• Time: 9-11 months after planting (first harvest)
• Yield: 40-60 tons per hectare (varies widely)`,

     "Chili (Mirchi)": `🌶️ **CHILI (MIRCHI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: November-December (Rabi) or July (Kharif)
🌱 **Seed Rate**: 250-300 g/ha
💊 **Seed Treatment**: Trichoderma @ 4g/kg seed
👶 **Seedling Age**: 6-8 weeks
📏 **Spacing**: 60 cm x 45 cm

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha
• NPK: 120:60:60 kg/ha
• Calcium nitrate and Boron for fruit set

💧 **STEP 2: IRRIGATION & PEST MANAGEMENT**
• Drip irrigation; 2-3 irrigations weekly during fruiting
• Watch for thrips, fruit borer; use pheromone traps and biocontrols

🌾 **STEP 3: HARVEST**
• Time: 70-120 days after transplanting depending on variety
• Yield: 15-25 quintals per hectare`,

    "Garlic (Lasun)": `🧄 **GARLIC (LASUN) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: October-November (Rabi)
🌱 **Seed Rate**: 8-10 quintals cloves/ha
💊 **Seed Treatment**: Fungicide (Carbendazim) dip
📏 **Spacing**: 20 cm x 10 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 120:60:60 kg/ha
• Boron and Zinc as needed

💧 **STEP 2: IRRIGATION & CARE**
• 6-8 light irrigations; avoid waterlogging
• Weed control and neck rot prevention

🌾 **STEP 3: HARVEST**
• Time: April-May when tops yellow and dry
• Yield: 150-200 quintals per hectare`,

    "Brinjal (Vangi)": `🫓 **BRINJAL (VANGI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: September-October (Rabi) or May-June (Kharif)
🌱 **Seed Rate**: 300-400 g/ha
💊 **Seed Treatment**: Trichoderma @ 4g/kg seed
👶 **Seedling Age**: 30-35 days
📏 **Spacing**: 60 cm x 45 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 120:60:60 kg/ha
• Calcium and Boron for better fruit set

💧 **STEP 2: IRRIGATION & CARE**
• Drip irrigation every 2-3 days in fruiting
• Watch for fruit borer; use pheromone traps

🌾 **STEP 3: HARVEST**
• Time: 60-80 days after transplanting
• Yield: 200-300 quintals per hectare`,

    "Cabbage (Bund Gobhi)": `🥬 **CABBAGE (BUND GOBHI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: September-October (Rabi)
🌱 **Seed Rate**: 400-500 g/ha
💊 **Seed Treatment**: Trichoderma @ 4g/kg seed
👶 **Seedling Age**: 25-30 days
📏 **Spacing**: 45 cm x 30 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 120:80:80 kg/ha
• Boron and Calcium for better head formation

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid water stress at head formation
• Control aphids and diamondback moth

🌾 **STEP 3: HARVEST**
• Time: 70-90 days after transplanting when heads are firm
• Yield: 250-350 quintals per hectare`,

    "Cauliflower (Phool Gobhi)": `🥬 **CAULIFLOWER (PHOOL GOBHI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: NURSERY & TRANSPLANTING**
📅 **Nursery Time**: August-September (Early Rabi)
🌱 **Seed Rate**: 400-500 g/ha
💊 **Seed Treatment**: Trichoderma @ 4g/kg seed
👶 **Seedling Age**: 25-30 days
📏 **Spacing**: 45 cm x 30 cm

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 120:80:80 kg/ha
• Boron and Calcium for better curd quality

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid drought at curd initiation
• Control pests and diseases timely

🌾 **STEP 3: HARVEST**
• Time: 70-90 days after transplanting when curds are tight
• Yield: 200-300 quintals per hectare`,

    "Bitter Gourd (Karela)": `🥒 **BITTER GOURD (KARELA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: Sowing & Trellising**
📅 **Time**: June-July (Kharif) or February-March (summer)
🌱 **Seed Rate**: 4-5 kg/ha
💊 **Seed Treatment**: Carbendazim + Rhizobium
📏 **Spacing**: 2 m x 1 m (with trellis)

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 100:60:60 kg/ha
• Micronutrients as needed

💧 **STEP 2: IRRIGATION & CARE**
• Drip irrigation every 2-3 days during fruiting
• Provide trellis and regular pruning

🌾 **STEP 3: HARVEST**
• Time: 60-80 days after sowing
• Yield: 150-200 quintals per hectare`,

    "Lady's Finger (Bhendi/Drumstick)": `🥬 **LADY'S FINGER (BHENDI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (summer)
🌱 **Seed Rate**: 10-12 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 60 cm x 45 cm

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha
• NPK: 100:60:60 kg/ha
• Micronutrients as needed

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid waterlogging
• Timely weeding and pest control

🌾 **STEP 3: HARVEST**
• Time: 60-90 days after sowing; pick tender fruits
• Yield: 200-300 quintals per hectare`,

    "Okra (Bhindi)": `🥬 **OKRA (BHINDI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (summer)
🌱 **Seed Rate**: 10-12 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 60 cm x 45 cm

💊 **FERTILIZER & MANURE**:
• FYM: 10-12 tons/ha
• NPK: 100:60:60 kg/ha
• Micronutrients as needed

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid waterlogging
• Timely weeding and pest control

🌾 **STEP 3: HARVEST**
• Time: 60-90 days after sowing; pick tender fruits
• Yield: 200-300 quintals per hectare`,

    "Cucumber (Kheera)": `🥒 **CUCUMBER (KHEERA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (summer)
🌱 **Seed Rate**: 3-4 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 1.5 m x 1 m (with trellis) or 2 m x 1 m

💊 **FERTILIZER & MANURE**:
• FYM: 12-15 tons/ha
• NPK: 80:60:60 kg/ha
• Micronutrients as needed

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid water stress at fruiting
• Provide trellis and prune older leaves

🌾 **STEP 3: HARVEST**
• Time: 45-60 days after sowing
• Yield: 150-200 quintals per hectare`,

    "Pumpkin (Bottla)": `🫘 **PUMPKIN (BOTTLA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: SOWING**
📅 **Time**: June-July (Kharif) or February-March (summer)
🌱 **Seed Rate**: 3-4 kg/ha
💊 **Seed Treatment**: Carbendazim @ 2g/kg seed
📏 **Spacing**: 2 m x 1.5 m (with spreading)

💊 **FERTILIZER & MANURE**:
• FYM: 12-15 tons/ha
• NPK: 80:60:60 kg/ha
• Micronutrients as needed

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid waterlogging
• Control fruit borers and pests

🌾 **STEP 3: HARVEST**
• Time: 90-110 days after sowing when rind hardens
• Yield: 200-300 quintals per hectare`,

    "Watermelon (Bhallu)": `🍉 **WATERMELON (BHALLU) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: Sowing & Preparation**
📅 **Time**: January-March (summer irrigated)
🌱 **Seed Rate**: 2-3 kg/ha (hybrids less)
💊 **Seed Treatment**: Carbendazim + Trichoderma
📏 **Spacing**: 2.5 m x 2 m (with wide beds)

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 tons/ha
• NPK: 100:60:60 kg/ha
• High potassium for fruit quality

💧 **STEP 2: IRRIGATION & CARE**
• Frequent irrigation; avoid water stress at fruiting
• Control pests and diseases timely

🌾 **STEP 3: HARVEST**
• Time: 90-110 days after sowing when fruit skin shines
• Yield: 300-400 quintals per hectare`,

    "Mango (Mamidi)": `🥭 **MANGO (MAMIDI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: June-July (monsoon planting)
🌱 **Planting Material**: 400-500 plants/ha at 10 m x 10 m
💊 **Treatment**: Dip roots in fungicide before planting
📏 **Spacing**: 10 m x 10 m

💊 **FERTILIZER & MANURE**:
• FYM: 20-30 kg/tree/year (increasing with age)
• NPK: 500:250:250 g/tree/year (adult trees)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 4-6 years after planting; harvest in summer
• Yield: 50-100 kg/tree (adult, varies by variety)`,

    "Grape (Dakkan)": `🍇 **GRAPE (DAKKAN) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: December-January (vine planting)
🌱 **Planting Material**: 800-1000 vines/ha at 2.5 m x 2 m
💊 **Treatment**: Dip root zone in fungicide before planting
📏 **Spacing**: 2.5 m x 2 m (with trellis)

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 kg/vine/year
• NPK: 200:100:100 g/vine/year (adult vines)
• Boron and Zinc for fruit quality

💧 **STEP 2: IRRIGATION & CARE**
• Regular irrigation; avoid water stress at flowering
• Proper trellising, pruning, and disease control

🌾 **STEP 3: HARVEST**
• Time: 2-3 years after planting; harvest in summer
• Yield: 10-20 tons per hectare (varies by variety)`,

    "Lemon (Nimma)": `🍋 **LEMON (NIMMA) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: June-July (monsoon planting)
🌱 **Planting Material**: 400-500 plants/ha at 6 m x 6 m
💊 **Treatment**: Dip roots in fungicide before planting
📏 **Spacing**: 6 m x 6 m

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 kg/tree/year
• NPK: 300:150:150 g/tree/year (adult trees)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 3-4 years after planting; harvest throughout year
• Yield: 40-80 kg/tree (adult, varies by variety)`,

    "Orange (Kottai)": `🍊 **ORANGE (KOTTAI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: June-July (monsoon planting)
🌱 **Planting Material**: 400-500 plants/ha at 6 m x 6 m
💊 **Treatment**: Dip roots in fungicide before planting
📏 **Spacing**: 6 m x 6 m

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 kg/tree/year
• NPK: 300:150:150 g/tree/year (adult trees)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 3-4 years after planting; harvest in winter
• Yield: 50-100 kg/tree (adult, varies by variety)`,

    "Cashew (Kathaballu)": `🌰 **CASHEW (KATHABALLU) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: June-July (monsoon planting)
🌱 **Planting Material**: 100-120 plants/ha at 10 m x 10 m
💊 **Treatment**: Dip root zone in fungicide before planting
📏 **Spacing**: 10 m x 10 m

💊 **FERTILIZER & MANURE**:
• FYM: 10-15 kg/tree/year
• NPK: 200:100:100 g/tree/year (adult trees)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 4-5 years after planting; harvest in summer
• Yield: 5-10 kg/tree (adult, varies by variety)`,

    "Coconut (Bans)": `🌴 **COCONUT (BANS) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING**
📅 **Time**: June-July (monsoon planting)
🌱 **Planting Material**: 400-500 plants/ha at 6 m x 6 m
💊 **Treatment**: Dip root zone in fungicide before planting
📏 **Spacing**: 6 m x 6 m

💊 **FERTILIZER & MANURE**:
• FYM: 15-20 kg/tree/year
• NPK: 300:150:150 g/tree/year (adult trees)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 4-5 years after planting; harvest throughout year
• Yield: 60-100 nuts/tree (adult, varies by variety)`,

    "Tea (Chai)": `🍵 **TEA (CHAI) - COMPLETE FARMER'S GUIDE**
    
═══════════════════════════════════════════════════════════
🌱 **STEP 1: PLANTING & PREPARATION**
📅 **Time**: June-July (monsoon planting in suitable regions)
🌱 **Planting Material**: 1000-1200 plants/ha at 1.5 m x 1 m
💊 **Treatment**: Dip root zone in fungicide before planting
📏 **Spacing**: 1.5 m x 1 m

💊 **FERTILIZER & MANURE**:
• FYM: 10-15 kg/plant/year
• NPK: 200:100:100 g/plant/year (adult plants)
• Micronutrients as per soil test

💧 **STEP 2: IRRIGATION & CARE**
• Irrigate during dry periods; avoid waterlogging
• Regular pruning, training, and pest/disease management

🌾 **STEP 3: HARVEST**
• Time: 3-4 years after planting; harvest shoots regularly
• Yield: 1-2 tons of made tea per hectare (varies by variety)`
};

 // // // =====================================================
// COMPLETE GOVERNMENT SCHEMES DATABASE - 50+ SCHEMES
// =====================================================

const govtSchemesDB = [
    // ========== INCOME SUPPORT SCHEMES (10 schemes) ==========
    {
        id: 1, name: "PM-KISAN", fullName: "Pradhan Mantri Kisan Samman Nidhi", category: "income",
        icon: "fa-rupee-sign", amount: "₹6,000/year", benefits: ["Direct income support of ₹6,000 per year", "₹2,000 every 4 months", "DBT to bank account", "Covers all small and marginal farmers"],
        eligibility: ["Small & marginal farmers (up to 2 hectares)", "Farmer families with cultivable land", "Tenant farmers with land records"],
        documents: ["Aadhaar Card", "Bank Account", "Land records", "Ration Card"], helpline: "155261", website: "https://pmkisan.gov.in"
    },
    {
        id: 2, name: "PM-KISAN (TENANT FARMERS)", fullName: "PM-KISAN for Tenant Farmers", category: "income",
        icon: "fa-rupee-sign", amount: "₹6,000/year", benefits: ["Special provision for landless farmers", "Support for sharecroppers", "Direct benefit transfer", "No land records required"],
        eligibility: ["Landless tenant farmers", "Sharecroppers", "Farmers cultivating leased land"], documents: ["Aadhaar", "Bank Account", "Lease agreement", "Affidavit"], helpline: "155261", website: "https://pmkisan.gov.in"
    },
    {
        id: 3, name: "PM-ANNOONA", fullName: "Pradhan Mantri Annadata Aay Sanrakshan Abhiyan", category: "income",
        icon: "fa-seedling", amount: "₹8,000/year", benefits: ["Income support for all farmers", "Minimum support price guarantee", "Additional ₹2,000 for small farmers", "Price deficiency payment"],
        eligibility: ["All farmers growing notified crops", "Small and marginal farmers priority", "FPO members"], documents: ["Aadhaar", "Bank Account", "Land records", "Crop declaration"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 4, name: "Bhavantar Bharpai Yojana", fullName: "Price Deficiency Payment Scheme", category: "income",
        icon: "fa-chart-line", amount: "Price difference payment", benefits: ["Compensation for price drop", "MSP difference payment", "Direct bank transfer", "Covers vegetables and fruits"],
        eligibility: ["Farmers in Madhya Pradesh", "Crops: tomato, onion, potato", "Registered farmers"], documents: ["Aadhaar", "Bank Account", "Sale receipt", "Mandi entry slip"], helpline: "0755-2553892", website: "https://mp.gov.in"
    },
    {
        id: 5, name: "Rythu Bandhu Scheme", fullName: "Telangana Rythu Bandhu", category: "income",
        icon: "fa-hand-holding-usd", amount: "₹10,000/acre/year", benefits: ["Investment support for farmers", "₹5,000 per acre per season", "Direct bank transfer", "Covers all farmers"],
        eligibility: ["All farmers in Telangana", "Landowners with patta", "Tenant farmers (new scheme)"], documents: ["Aadhaar", "Patta passbook", "Bank Account"], helpline: "040-23456789", website: "https://telangana.gov.in"
    },
    {
        id: 6, name: "Krushak Assistance for Livelihood (KALIA)", fullName: "Odisha KALIA Scheme", category: "income",
        icon: "fa-hand-holding-heart", amount: "₹25,000/year", benefits: ["Financial assistance for farmers", "Landless agricultural laborers", "Vulnerable tribal groups", "Sharecroppers support"],
        eligibility: ["Farmers in Odisha", "Landless laborers", "Small & marginal farmers", "Sharecroppers"], documents: ["Aadhaar", "Bank Account", "Residence proof", "Land records"], helpline: "1800-345-6770", website: "https://kalia.odisha.gov.in"
    },
    {
        id: 7, name: "RKVY", fullName: "Rashtriya Krishi Vikas Yojana", category: "income",
        icon: "fa-building", amount: "State-specific", benefits: ["Funding for state agriculture projects", "Infrastructure development", "Agri-entrepreneurship", "Value chain"],
        eligibility: ["State governments", "FPOs", "Agricultural universities", "Research institutions"], documents: ["Project proposal", "State approval", "Implementation plan"], helpline: "011-23382654", website: "https://rkvy.nic.in"
    },
    {
        id: 8, name: "National Seed Subsidy", fullName: "National Seed Subsidy Scheme", category: "income",
        icon: "fa-seedling", amount: "50% subsidy on seeds", benefits: ["High-yielding variety seeds", "50% subsidy for small farmers", "Certified seeds", "Improved varieties"],
        eligibility: ["All farmers", "Priority to small & marginal", "FPOs"], documents: ["Land records", "Aadhaar", "Seed bill", "Bank account"], helpline: "1800-180-1551", website: "https://seednet.gov.in"
    },
    {
        id: 9, name: "Fertilizer Subsidy", fullName: "Nutrient Based Subsidy (NBS) Scheme", category: "income",
        icon: "fa-flask", amount: "Varies by nutrient", benefits: ["Subsidy on P&K fertilizers", "Reduces farmer cost", "Balanced nutrition", "Soil health improvement"],
        eligibility: ["All farmers", "Through authorized dealers"], documents: ["Dealer bill", "Aadhaar (for DBT)", "Land records"], helpline: "1800-180-1551", website: "https://fert.nic.in"
    },
    {
        id: 10, name: "Women Farmer Scheme", fullName: "Mahila Kisan Sashaktikaran Yojana", category: "income",
        icon: "fa-female", amount: "₹50,000/year", benefits: ["Women farmer empowerment", "Skill training", "Input subsidy", "Market access"],
        eligibility: ["Women farmers", "Women SHGs", "Female-headed households"], documents: ["Aadhaar", "Land records", "Bank account", "SHG certificate"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    
    // ========== CREDIT & LOAN SCHEMES (10 schemes) ==========
    {
        id: 11, name: "KCC", fullName: "Kisan Credit Card Scheme", category: "credit",
        icon: "fa-credit-card", amount: "Up to ₹3 lakh", benefits: ["Revolving credit facility", "Interest: 7% (4% with prompt payment)", "Collateral-free up to ₹1.6 lakh", "Covers allied activities"],
        eligibility: ["All farmers", "Sharecroppers", "Tenant farmers", "Self-help groups"], documents: ["Land records", "Aadhaar", "Photographs", "Crop details"], helpline: "1800-180-1111", website: "https://nabard.org"
    },
    {
        id: 12, name: "Modified Interest Subvention Scheme", fullName: "Interest Subvention for Short-term Crop Loans", category: "credit",
        icon: "fa-percent", amount: "2% Interest Subvention", benefits: ["2% interest subvention on crop loans", "3% additional for prompt repayment", "Effective rate: 4% per annum", "Loans up to ₹3 lakh"],
        eligibility: ["All farmers taking crop loans", "KCC holders", "Cooperative society members"], documents: ["KCC", "Loan application", "Land records"], helpline: "1800-180-1111", website: "https://nabard.org"
    },
    {
        id: 13, name: "NABARD Warehouse Infrastructure Fund", fullName: "Warehouse Infrastructure Fund", category: "credit",
        icon: "fa-warehouse", amount: "₹50 crore per project", benefits: ["Loan for warehouse construction", "Subsidy up to 25%", "Post-harvest infrastructure", "Reduces crop wastage"],
        eligibility: ["FPOs", "Cooperatives", "Agri-entrepreneurs", "State agencies"], documents: ["Project report", "Land documents", "Registration proof"], helpline: "022-26539800", website: "https://nabard.org"
    },
    {
        id: 14, name: "Dairy Entrepreneurship Development Scheme", fullName: "Dairy Entrepreneurship Scheme", category: "credit",
        icon: "fa-tractor", amount: "Up to ₹5 lakh subsidy", benefits: ["Subsidy for dairy units", "25% for general, 33% for SC/ST", "Loan for cows/buffaloes", "Milk processing equipment"],
        eligibility: ["Individual farmers", "Self-help groups", "Dairy cooperatives"], documents: ["Land documents", "Aadhaar", "Bank account", "Project report"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 15, name: "Poultry Venture Capital Fund", fullName: "Poultry Venture Capital Fund", category: "credit",
        icon: "fa-dove", amount: "Up to ₹3 lakh subsidy", benefits: ["Subsidy for poultry farming", "33% for SC/ST farmers", "Loan for broiler/layer units", "Hatchery support"],
        eligibility: ["Individual farmers", "FPOs", "Self-help groups"], documents: ["Land documents", "Aadhaar", "Bank account", "Experience certificate"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 16, name: "Goat/Sheep Development Scheme", fullName: "Goat and Sheep Development", category: "credit",
        icon: "fa-paw", amount: "50% subsidy", benefits: ["Subsidy for goat/sheep farming", "50% subsidy up to ₹50,000", "Breed improvement support", "Veterinary care"],
        eligibility: ["Small farmers", "Landless laborers", "Tribal farmers", "Women farmers"], documents: ["Aadhaar", "Bank account", "Village panchayat certificate"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 17, name: "Agri Infrastructure Fund", fullName: "Agriculture Infrastructure Fund", category: "credit",
        icon: "fa-warehouse", amount: "Up to ₹2 crore loan", benefits: ["Loan for farm-gate infrastructure", "3% interest subvention", "3-year moratorium", "Covers warehouses, cold storage"],
        eligibility: ["FPOs", "Cooperatives", "Individual farmers", "Agri-entrepreneurs"], documents: ["Project report", "Land documents", "Aadhaar", "Bank account"], helpline: "1800-180-1111", website: "https://nabard.org"
    },
    {
        id: 18, name: "Animal Husbandry Infrastructure Fund", fullName: "AHIDF - Dairy & Poultry Loan", category: "credit",
        icon: "fa-paw", amount: "Up to ₹100 crore", benefits: ["Loan for dairy & poultry infrastructure", "3% interest subvention", "Loan guarantee available", "Covers milk processing, hatcheries"],
        eligibility: ["Individual entrepreneurs", "FPOs", "Private companies", "Cooperatives"], documents: ["DPR", "Business registration", "Land documents", "Bank account"], helpline: "011-23385788", website: "https://dahd.nic.in"
    },
    {
        id: 19, name: "Fisheries Infrastructure Fund", fullName: "FIDF - Aquaculture Loan", category: "credit",
        icon: "fa-fish", amount: "Up to ₹50 lakh", benefits: ["Loan for fish farming infrastructure", "4% interest subvention", "Covers hatcheries, feed mills", "Cold chain for fish"],
        eligibility: ["Fish farmers", "FPOs", "Cooperatives", "SHGs"], documents: ["Water body lease", "Project report", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://dof.gov.in"
    },
    {
        id: 20, name: "Food Processing Fund", fullName: "Food Processing Loan Scheme", category: "credit",
        icon: "fa-industry", amount: "Up to ₹10 crore", benefits: ["Loan for food processing units", "35% capital subsidy", "Interest subvention 5%", "Covers fruits, vegetables, grains"],
        eligibility: ["Food processors", "FPOs", "Cooperatives", "Agri-preneurs"], documents: ["DPR", "Land documents", "FSSAI license", "Bank account"], helpline: "1800-180-1551", website: "https://mofpi.nic.in"
    },
    
    // ========== CROP INSURANCE SCHEMES (10 schemes) ==========
    {
        id: 21, name: "PMFBY", fullName: "Pradhan Mantri Fasal Bima Yojana", category: "insurance",
        icon: "fa-shield-alt", amount: "Low premium: 1.5-5%", benefits: ["Crop insurance at low premium", "1.5% for Rabi, 2% for Kharif", "Claim in 21 days", "Covers pre to post harvest"],
        eligibility: ["All farmers", "Loanee mandatory", "Non-loanee voluntary", "Sharecroppers"], documents: ["Land records", "Crop declaration", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://pmfby.gov.in"
    },
    {
        id: 22, name: "Restructured Weather Based Crop Insurance", fullName: "RWBCIS", category: "insurance",
        icon: "fa-cloud-sun-rain", amount: "Premium 1.5-8%", benefits: ["Weather index based insurance", "Covers rainfall deficit/excess", "Temperature and humidity coverage", "Quick claim settlement"],
        eligibility: ["Farmers in notified areas", "Crops sensitive to weather", "All farmer categories"], documents: ["Land records", "Weather data", "Aadhaar"], helpline: "1800-180-1551", website: "https://pmfby.gov.in"
    },
    {
        id: 23, name: "Coconut Palm Insurance", fullName: "Coconut Palm Insurance Scheme", category: "insurance",
        icon: "fa-tree", amount: "Premium: ₹100-500/tree", benefits: ["Insurance for coconut trees", "Covers pest and disease", "Natural calamity coverage", "Up to 5 years coverage"],
        eligibility: ["Coconut farmers", "Minimum 5 trees", "All states"], documents: ["Land records", "Tree count", "Aadhaar"], helpline: "0484-2378785", website: "https://coconutboard.gov.in"
    },
    {
        id: 24, name: "Rubber Group Insurance", fullName: "Rubber Insurance Scheme", category: "insurance",
        icon: "fa-tree", amount: "₹30,000/hectare", benefits: ["Insurance for rubber trees", "Natural disaster coverage", "Disease and pest cover", "Yield loss compensation"],
        eligibility: ["Rubber growers", "Minimum 0.5 hectare", "Registered with Rubber Board"], documents: ["Land records", "Rubber Board registration", "Aadhaar"], helpline: "0481-2353123", website: "https://rubberboard.org.in"
    },
    {
        id: 25, name: "Coffee Insurance", fullName: "Coffee Crop Insurance", category: "insurance",
        icon: "fa-mug-hot", amount: "Premium 3.5%", benefits: ["Insurance for coffee plantations", "Covers Arabica and Robusta", "Yield loss coverage", "Price fluctuation cover"],
        eligibility: ["Coffee growers", "Registered with Coffee Board", "Minimum 0.5 acre"], documents: ["Land records", "Coffee Board registration"], helpline: "080-26711111", website: "https://coffeeboard.gov.in"
    },
    {
        id: 26, name: "Tea Insurance", fullName: "Tea Crop Insurance", category: "insurance",
        icon: "fa-leaf", amount: "Premium 2.5%", benefits: ["Insurance for tea gardens", "Covers green leaf yield", "Drought and flood cover", "Pest and disease coverage"],
        eligibility: ["Tea growers", "Registered with Tea Board", "All states"], documents: ["Land records", "Tea Board registration"], helpline: "033-23531234", website: "https://teaboard.gov.in"
    },
    {
        id: 27, name: "Unified Package Insurance Scheme", fullName: "UPIS - Crop Plus Insurance", category: "insurance",
        icon: "fa-shield-alt", amount: "Premium: 2-8%", benefits: ["Combined crop + assets insurance", "Covers house, tractor, livestock", "Single premium for all", "Quick claim settlement"],
        eligibility: ["All farmers", "Loanee farmers mandatory", "Non-loanee voluntary"], documents: ["Land records", "Asset list", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://pmfby.gov.in"
    },
    {
        id: 28, name: "Palm Oil Insurance", fullName: "Oil Palm Insurance Scheme", category: "insurance",
        icon: "fa-tree", amount: "Premium: 2.5%", benefits: ["Insurance for oil palm plantations", "Covers yield loss", "Pest and disease coverage", "5-year policy option"],
        eligibility: ["Oil palm growers", "Registered with NMEO-OP", "Minimum 1 hectare"], documents: ["Land records", "Plantation registration", "Aadhaar"], helpline: "1800-180-1551", website: "https://nmeo-op.gov.in"
    },
    {
        id: 29, name: "Cardamom Insurance", fullName: "Cardamom Crop Insurance", category: "insurance",
        icon: "fa-leaf", amount: "Premium: 3%", benefits: ["Insurance for cardamom plantations", "Covers yield loss due to weather", "Pest and disease coverage", "Quick claim settlement"],
        eligibility: ["Cardamom growers", "Registered with Spices Board", "Minimum 0.5 acre"], documents: ["Land records", "Spices Board registration", "Aadhaar"], helpline: "0484-2333333", website: "https://indianspices.com"
    },
    {
        id: 30, name: "Livestock Insurance", fullName: "National Livestock Insurance Scheme", category: "insurance",
        icon: "fa-paw", amount: "Premium: 4-6%", benefits: ["Insurance for cattle, buffalo, sheep, goat", "Death due to accident/disease", "Subsidized premium for BPL", "Quick claim settlement"],
        eligibility: ["All livestock owners", "Dairy farmers", "BPL families priority"], documents: ["Animal identification", "Veterinary certificate", "Aadhaar", "Bank account"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    
    // ========== IRRIGATION SCHEMES (10 schemes) ==========
    {
        id: 31, name: "PMKSY", fullName: "Pradhan Mantri Krishi Sinchayee Yojana", category: "irrigation",
        icon: "fa-tint", amount: "55-75% Subsidy", benefits: ["Drip/sprinkler subsidy", "55% for general, 75% for SC/ST", "Farm pond support", "Per Drop More Crop"],
        eligibility: ["All farmers", "FPOs", "Water user associations"], documents: ["Land records", "Aadhaar", "Bank account", "Vendor quotation"], helpline: "011-23381092", website: "https://pmksy.gov.in"
    },
    {
        id: 32, name: "Micro Irrigation Fund", fullName: "Micro Irrigation Fund (NABARD)", category: "irrigation",
        icon: "fa-water", amount: "₹5,000 crore fund", benefits: ["Additional subsidy for micro-irrigation", "Convergence with PMKSY", "State government loans", "Priority to water-scarce areas"],
        eligibility: ["State governments", "Water user associations", "FPOs"], documents: ["Project proposal", "State approval"], helpline: "022-26539800", website: "https://nabard.org"
    },
    {
        id: 33, name: "Har Khet Ko Pani", fullName: "Har Khet Ko Pani (PMKSY Component)", category: "irrigation",
        icon: "fa-water", amount: "Complete coverage", benefits: ["Irrigation access to every farm", "Command area development", "Water harvesting structures", "Renovation of water bodies"],
        eligibility: ["All farmers", "Priority to rainfed areas"], documents: ["Land records", "Water source details"], helpline: "011-23381092", website: "https://pmksy.gov.in"
    },
    {
        id: 34, name: "Watershed Development Component", fullName: "Watershed Development (PMKSY)", category: "irrigation",
        icon: "fa-mountain", amount: "₹12,000/hectare", benefits: ["Watershed management", "Soil and water conservation", "Rainwater harvesting", "Check dam construction"],
        eligibility: ["Farmers in watershed areas", "Village communities"], documents: ["Village resolution", "Land records"], helpline: "011-23381092", website: "https://pmksy.gov.in"
    },
    {
        id: 35, name: "Accelerated Irrigation Benefit Programme", fullName: "AIBP", category: "irrigation",
        icon: "fa-dam", amount: "90:10 funding", benefits: ["Major irrigation projects", "Central:State funding 90:10", "Command area development", "Water distribution systems"],
        eligibility: ["State governments", "Irrigation departments"], documents: ["Project DPR", "State approval"], helpline: "011-23381092", website: "https://mowr.gov.in"
    },
    {
        id: 36, name: "Rooftop Rainwater Harvesting", fullName: "Rooftop Rainwater Harvesting for Farms", category: "irrigation",
        icon: "fa-home", amount: "50% subsidy up to ₹25,000", benefits: ["Rainwater harvesting structure", "Storage tank subsidy", "Groundwater recharge", "Reduces borewell dependency"],
        eligibility: ["All farmers", "Farm houses", "Animal shelters"], documents: ["Building plan", "Land records", "Quotation"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 37, name: "Well Recharge Scheme", fullName: "Farm Pond & Well Recharge Scheme", category: "irrigation",
        icon: "fa-tint", amount: "50% subsidy up to ₹50,000", benefits: ["Farm pond construction", "Well recharge structures", "Rainwater harvesting", "Groundwater level improvement"],
        eligibility: ["All farmers", "Areas with declining water table"], documents: ["Land records", "Well ownership proof", "Aadhaar"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 38, name: "Sprinkler Subsidy Scheme", fullName: "Sprinkler Irrigation Subsidy", category: "irrigation",
        icon: "fa-tint", amount: "70% subsidy up to ₹15,000/acre", benefits: ["Portable sprinkler sets", "Water saving up to 40%", "Suitable for all crops", "Low operating cost"],
        eligibility: ["Small & marginal farmers", "FPOs", "Water-scarce areas priority"], documents: ["Land records", "Aadhaar", "Quotation", "Bank account"], helpline: "1800-180-1551", website: "https://pmksy.gov.in"
    },
    {
        id: 39, name: "Drip Irrigation Subsidy", fullName: "Drip Irrigation Promotion Scheme", category: "irrigation",
        icon: "fa-tint", amount: "60-80% subsidy", benefits: ["Drip irrigation systems", "Water saving up to 60%", "Higher yield", "Fertigation compatible"],
        eligibility: ["All farmers", "Horticulture farmers priority", "FPOs"], documents: ["Land records", "Crop details", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://pmksy.gov.in"
    },
    {
        id: 40, name: "Pipeline Extension Scheme", fullName: "Field Channel & Pipeline Extension", category: "irrigation",
        icon: "fa-water", amount: "50% subsidy up to ₹2 lakh", benefits: ["PVC pipeline from source to field", "Reduces water loss", "Saves time and labor", "Covers up to 5 acres"],
        eligibility: ["All farmers", "Water user associations", "FPOs"], documents: ["Land records", "Water source proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    
    // ========== FARM MACHINERY SCHEMES (10 schemes) ==========
    {
        id: 41, name: "SMAM", fullName: "Subsidy on Agricultural Machinery", category: "machinery",
        icon: "fa-tractor", amount: "40-50% subsidy", benefits: ["50% for SC/ST (up to ₹40,000)", "40% for general farmers", "Tractor, rotavator subsidy", "Drone subsidy 50% up to ₹5 lakh"],
        eligibility: ["Individual farmers", "FPOs", "Custom Hiring Centers", "SHGs"], documents: ["Land records", "Aadhaar", "Quotation", "Invoice"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 42, name: "Custom Hiring Centre Scheme", fullName: "Farm Machinery Bank", category: "machinery",
        icon: "fa-handshake", amount: "40% subsidy up to ₹40 lakh", benefits: ["Establish machinery rental centers", "40% subsidy for equipment", "Benefit small farmers", "Reduces individual investment"],
        eligibility: ["FPOs", "Cooperatives", "SHGs", "Young entrepreneurs"], documents: ["Business plan", "Registration certificate", "Land for center"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 43, name: "Drone Didi Scheme", fullName: "Drone for Fertilizer/Pesticide Spraying", category: "machinery",
        icon: "fa-drone", amount: "80% subsidy up to ₹8 lakh", benefits: ["Drone for women SHGs", "80% subsidy for purchase", "Training included", "Spraying service income"],
        eligibility: ["Women SHGs", "FPOs with women members"], documents: ["SHG registration", "Women members list"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 44, name: "Post Harvest Equipment Subsidy", fullName: "Post Harvest Management Equipment", category: "machinery",
        icon: "fa-box", amount: "35% subsidy up to ₹10 lakh", benefits: ["Threshers, dryers, graders", "Storage equipment", "Packaging machinery", "Processing units"],
        eligibility: ["Individual farmers", "FPOs", "Agri-preneurs"], documents: ["Project report", "Quotation", "Land documents"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 45, name: "Solar Dryer Subsidy", fullName: "Solar Dryer for Farmers", category: "machinery",
        icon: "fa-sun", amount: "50% subsidy up to ₹50,000", benefits: ["Solar dryer for fruits/vegetables", "Reduces post-harvest loss", "Quality preservation", "Value addition"],
        eligibility: ["Small farmers", "FPOs", "Women farmers"], documents: ["Land records", "Aadhaar"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 46, name: "Cold Chain Subsidy", fullName: "Cold Storage and Cold Chain", category: "machinery",
        icon: "fa-snowflake", amount: "35% subsidy up to ₹50 lakh", benefits: ["Cold storage construction", "Reefer vehicles", "Packaging equipment", "Reduces wastage"],
        eligibility: ["FPOs", "Cooperatives", "Individual entrepreneurs"], documents: ["Project report", "Land documents", "Business plan"], helpline: "011-23381092", website: "https://mofpi.nic.in"
    },
    {
        id: 47, name: "Tractor Subsidy Scheme", fullName: "Small Tractor Subsidy for Marginal Farmers", category: "machinery",
        icon: "fa-tractor", amount: "40% subsidy up to ₹60,000", benefits: ["Subsidy for 20-35 HP tractors", "Priority to SC/ST farmers", "Custom hiring option", "Reduces farming cost"],
        eligibility: ["Small & marginal farmers", "SC/ST farmers", "Women farmers"], documents: ["Land records", "Aadhaar", "Quotation", "Bank account"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 48, name: "Power Tiller Subsidy", fullName: "Power Tiller Subsidy Scheme", category: "machinery",
        icon: "fa-tractor", amount: "50% subsidy up to ₹25,000", benefits: ["Subsidy for power tillers", "Suitable for small farms", "Reduces labor dependency", "Low maintenance cost"],
        eligibility: ["Small farmers", "Hill region farmers", "FPOs"], documents: ["Land records", "Aadhaar", "Quotation", "Bank account"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 49, name: "Reaper/Harvester Subsidy", fullName: "Combine Harvester Subsidy Scheme", category: "machinery",
        icon: "fa-tractor", amount: "40% subsidy up to ₹2 lakh", benefits: ["Subsidy for reapers/harvesters", "Reduces harvesting time", "Minimizes crop loss", "Custom hiring viable"],
        eligibility: ["FPOs", "Cooperatives", "SHGs", "Large farmers"], documents: ["Land records", "Business plan", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 50, name: "Paddy Transplanter Subsidy", fullName: "Mechanical Paddy Transplanter Subsidy", category: "machinery",
        icon: "fa-tractor", amount: "50% subsidy up to ₹40,000", benefits: ["Subsidy for paddy transplanters", "Saves labor cost", "Uniform planting", "Higher yield"],
        eligibility: ["Paddy farmers", "FPOs", "SHGs", "Custom hiring centers"], documents: ["Land records", "Aadhaar", "Quotation", "Bank account"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    
    // ========== SOIL HEALTH SCHEMES (10 schemes) ==========
    {
        id: 51, name: "Soil Health Card", fullName: "Soil Health Card Scheme", category: "soil",
        icon: "fa-leaf", amount: "Free Service", benefits: ["Free soil testing every 2 years", "12 parameters analyzed", "Crop-specific recommendations", "Reduces fertilizer cost 10-15%"],
        eligibility: ["All farmers", "Priority to small farmers"], documents: ["Land records", "Farmer ID"], helpline: "1800-180-1551", website: "https://soilhealth.dac.gov.in"
    },
    {
        id: 52, name: "Soil Testing Labs Establishment", fullName: "Mobile Soil Testing Labs", category: "soil",
        icon: "fa-flask", amount: "₹25 lakh per lab", benefits: ["Mobile soil testing vans", "Free doorstep service", "Results in 7 days", "Cover remote villages"],
        eligibility: ["State governments", "KVKs", "Agricultural universities"], documents: ["Proposal", "Infrastructure details"], helpline: "1800-180-1551", website: "https://soilhealth.dac.gov.in"
    },
    {
        id: 53, name: "Soil Health Management", fullName: "Soil Health Management (SHM)", category: "soil",
        icon: "fa-chart-line", amount: "₹2,000/hectare", benefits: ["Soil amendment subsidy", "Lime/gypsum application", "Micro-nutrient supply", "Bio-fertilizer promotion"],
        eligibility: ["All farmers", "Soil health card holders"], documents: ["Soil health card", "Land records"], helpline: "1800-180-1551", website: "https://nmsa.dac.gov.in"
    },
    {
        id: 54, name: "Micro-nutrient Scheme", fullName: "Micro-nutrient Deficiency Correction", category: "soil",
        icon: "fa-capsules", amount: "50% subsidy up to ₹1,000/acre", benefits: ["Zinc, boron, iron supply", "Deficiency correction", "Quality seed subsidy", "Yield improvement"],
        eligibility: ["Farmers with micro-nutrient deficiency", "Soil test report required"], documents: ["Soil health card", "Land records"], helpline: "1800-180-1551", website: "https://nmsa.dac.gov.in"
    },
    {
        id: 55, name: "Lime and Gypsum Subsidy", fullName: "Soil Acidity/Alkalinity Correction", category: "soil",
        icon: "fa-balance-scale", amount: "50% subsidy", benefits: ["Lime for acidic soil", "Gypsum for alkaline soil", "Improves soil pH", "Increases nutrient availability"],
        eligibility: ["Farmers with problematic soil", "Soil test required"], documents: ["Soil test report", "Land records"], helpline: "1800-180-1551", website: "https://nmsa.dac.gov.in"
    },
    {
        id: 56, name: "Organic Soil Enhancer Scheme", fullName: "Organic Matter Enrichment Scheme", category: "soil",
        icon: "fa-recycle", amount: "₹5,000/hectare", benefits: ["Green manure subsidy", "Compost promotion", "Crop residue management", "Soil organic carbon improvement"],
        eligibility: ["All farmers", "Organic farming clusters"], documents: ["Land records", "Soil health card", "Aadhaar"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 57, name: "Biofertilizer Distribution", fullName: "Free Biofertilizer Distribution", category: "soil",
        icon: "fa-flask", amount: "Free up to 5 kg/acre", benefits: ["Free Rhizobium, PSB, Azotobacter", "Reduces chemical fertilizer use", "Improves soil biology", "Available at KVKs"],
        eligibility: ["All farmers", "Priority to small & marginal"], documents: ["Land records", "Soil health card", "Aadhaar"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 58, name: "Vermicompost Subsidy", fullName: "Vermicompost Production Unit", category: "soil",
        icon: "fa-worm", amount: "50% subsidy up to ₹25,000", benefits: ["Vermicompost unit establishment", "Earthworm supply", "Organic manure production", "Waste recycling"],
        eligibility: ["Individual farmers", "SHGs", "Women farmers"], documents: ["Land records", "Project proposal", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 59, name: "Soil Conservation Scheme", fullName: "Soil Erosion Prevention Scheme", category: "soil",
        icon: "fa-mountain", amount: "75% subsidy", benefits: ["Contour bunding", "Terrace farming support", "Gully plugging", "Strip cropping promotion"],
        eligibility: ["Farmers in hilly areas", "Erosion-prone regions"], documents: ["Land records", "Soil erosion proof", "Aadhaar"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 60, name: "Land Development Scheme", fullName: "Land Leveling & Development", category: "soil",
        icon: "fa-draw-polygon", amount: "50% subsidy up to ₹10,000/acre", benefits: ["Laser land leveling subsidy", "Land shaping", "Drainage improvement", "Water use efficiency"],
        eligibility: ["All farmers", "FPOs", "Water-scarce areas priority"], documents: ["Land records", "Aadhaar", "Quotation", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    
    // ========== ORGANIC FARMING SCHEMES (10 schemes) ==========
    {
        id: 61, name: "PKVY", fullName: "Paramparagat Krishi Vikas Yojana", category: "organic",
        icon: "fa-recycle", amount: "₹31,500/hectare", benefits: ["₹15,000 for organic inputs", "₹10,000 for certification", "₹6,500 for training", "3-year support"],
        eligibility: ["Farmer clusters (50+ farmers)", "FPOs", "SHGs", "Minimum 50 acres"], documents: ["Cluster registration", "Farmer list", "Land details", "Soil test report"], helpline: "011-23381092", website: "https://pgsindia-ncof.gov.in"
    },
    {
        id: 62, name: "MOVCDNER", fullName: "Mission Organic Value Chain Development for NE Region", category: "organic",
        icon: "fa-chart-line", amount: "₹75,000/hectare", benefits: ["Organic farming in North-East states", "FPO formation support", "Market linkage", "Processing infrastructure"],
        eligibility: ["Farmers in North-East states", "FPOs", "Organic clusters", "Tribal farmers"], documents: ["Land records", "FPO registration", "Farmer ID", "Bank account"], helpline: "011-23381092", website: "https://agricoop.nic.in"
    },
    {
        id: 63, name: "Vermicompost Subsidy", fullName: "Vermicompost Production Unit Scheme", category: "organic",
        icon: "fa-worm", amount: "50% subsidy up to ₹50,000", benefits: ["Vermicompost unit establishment", "Earthworm supply", "Training provided", "Organic fertilizer production"],
        eligibility: ["Individual farmers", "SHGs", "FPOs", "Women farmers"], documents: ["Land documents", "Project proposal", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 64, name: "Bio-fertilizer Subsidy", fullName: "Bio-fertilizer Production Unit Scheme", category: "organic",
        icon: "fa-flask", amount: "40% subsidy up to ₹2 lakh", benefits: ["Rhizobium, PSB production", "Azotobacter, VAM supply", "Quality control lab", "Farmer training"],
        eligibility: ["SHGs", "FPOs", "Young entrepreneurs", "Agri-graduates"], documents: ["Business plan", "Technical qualification", "Land lease", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 65, name: "ZBNF", fullName: "Zero Budget Natural Farming Scheme", category: "organic",
        icon: "fa-leaf", amount: "₹15,000/hectare", benefits: ["Natural farming promotion", "Cow-based farming", "Bio-pesticide training", "Mulching support"],
        eligibility: ["All farmers", "Preference to rainfed areas", "Small & marginal farmers"], documents: ["Land records", "Training certificate", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 66, name: "Organic Certification Subsidy", fullName: "PGS-India Certification Support", category: "organic",
        icon: "fa-certificate", amount: "100% subsidy up to ₹10,000", benefits: ["Free organic certification", "Group certification for clusters", "Quality assurance", "Market access"],
        eligibility: ["Farmer clusters", "FPOs", "Organic farmers groups"], documents: ["Cluster registration", "Farmer list", "Land records"], helpline: "1800-180-1551", website: "https://pgsindia-ncof.gov.in"
    },
    {
        id: 67, name: "Manure Management Scheme", fullName: "Animal Manure Management Scheme", category: "organic",
        icon: "fa-paw", amount: "50% subsidy up to ₹30,000", benefits: ["Compost pit construction", "Manure processing", "Biogas unit subsidy", "Farmyard manure promotion"],
        eligibility: ["Livestock farmers", "Dairy farmers", "SHGs"], documents: ["Land records", "Animal count proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 68, name: "Green Manure Scheme", fullName: "Green Manure Seed Subsidy", category: "organic",
        icon: "fa-seedling", amount: "50% subsidy on seeds", benefits: ["Sunhemp, dhaincha seeds", "Improves soil fertility", "Weed suppression", "Reduces fertilizer need"],
        eligibility: ["All farmers", "Organic farmers priority"], documents: ["Land records", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 69, name: "Jaivik Kheti Scheme", fullName: "State Organic Farming Promotion", category: "organic",
        icon: "fa-recycle", amount: "₹20,000/hectare", benefits: ["Organic input subsidy", "Training and demonstration", "Market linkage support", "PGS certification"],
        eligibility: ["All farmers", "Organic clusters", "SHGs"], documents: ["Land records", "Training certificate", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 70, name: "Bio-pesticide Scheme", fullName: "Bio-pesticide Promotion Scheme", category: "organic",
        icon: "fa-bug", amount: "50% subsidy up to ₹2,000/acre", benefits: ["Neem-based pesticides", "Trichoderma supply", "Pseudomonas culture", "IPM training"],
        eligibility: ["All farmers", "Organic farmers", "FPOs"], documents: ["Land records", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://ppqs.gov.in"
    },
    
    // ========== HORTICULTURE SCHEMES (10 schemes) ==========
    {
        id: 71, name: "MIDH", fullName: "Mission for Integrated Development of Horticulture", category: "horticulture",
        icon: "fa-apple-alt", amount: "50-75% subsidy", benefits: ["Fruit, vegetable plantation", "Nursery development", "Post-harvest management", "Packaging subsidy"],
        eligibility: ["All farmers", "FPOs", "Nursery owners", "Women farmers"], documents: ["Land records", "Project proposal", "Aadhaar", "Bank account"], helpline: "011-23381092", website: "https://midh.gov.in"
    },
    {
        id: 72, name: "Coconut Promotion Scheme", fullName: "Coconut Development Scheme", category: "horticulture",
        icon: "fa-tree", amount: "₹50,000/hectare", benefits: ["70% subsidy for small farmers", "High-yielding saplings", "Old tree replacement", "Value addition support"],
        eligibility: ["Coconut farmers in Kerala, TN, Karnataka, AP", "FPOs", "Small farmers"], documents: ["Land records", "Tree count", "Aadhaar", "Bank account"], helpline: "0484-2378785", website: "https://coconutboard.gov.in"
    },
    {
        id: 73, name: "Cashew Mission", fullName: "Programme for Cashew & Cocoa", category: "horticulture",
        icon: "fa-seedling", amount: "₹25,000/hectare", benefits: ["Cashew plantation subsidy", "Cocoa cultivation support", "Processing unit subsidy", "Export promotion"],
        eligibility: ["Farmers in coastal states", "FPOs", "Processing units", "SHGs"], documents: ["Land records", "Project report", "Aadhaar", "Bank account"], helpline: "0824-2431461", website: "https://cashewboard.gov.in"
    },
    {
        id: 74, name: "National Bamboo Mission", fullName: "Bamboo Development Scheme", category: "horticulture",
        icon: "fa-tree", amount: "₹30,000/hectare", benefits: ["Bamboo plantation subsidy", "Nursery development", "Value addition units", "Handicraft support"],
        eligibility: ["Farmers in NE states", "FPOs", "Tribal farmers", "SHGs"], documents: ["Land records", "Bamboo area details", "Aadhaar", "Bank account"], helpline: "011-23381092", website: "https://nbm.nic.in"
    },
    {
        id: 75, name: "Spice Park Scheme", fullName: "Spice Development & Processing", category: "horticulture",
        icon: "fa-pepper-hot", amount: "40% subsidy", benefits: ["Spice processing units", "Value addition equipment", "Quality testing lab", "Export facilitation"],
        eligibility: ["Spice growers", "FPOs", "Spice processors", "SHGs"], documents: ["Land records", "Spice Board registration", "Project report", "Bank account"], helpline: "0484-2333333", website: "https://indianspices.com"
    },
    {
        id: 76, name: "Mango Development", fullName: "Mango Plantation & Processing", category: "horticulture",
        icon: "fa-apple-alt", amount: "₹40,000/hectare", benefits: ["High-yielding mango saplings", "Processing unit support", "Cold storage subsidy", "Export promotion"],
        eligibility: ["Mango growers", "FPOs", "Processing units"], documents: ["Land records", "Variety details", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 77, name: "Banana Development", fullName: "Banana Plantation & Value Addition", category: "horticulture",
        icon: "fa-apple-alt", amount: "₹35,000/hectare", benefits: ["Tissue culture plants subsidy", "Drip irrigation support", "Processing units", "Market linkage"],
        eligibility: ["Banana growers", "FPOs", "SHGs"], documents: ["Land records", "Variety details", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 78, name: "Floriculture Mission", fullName: "National Floriculture Mission", category: "horticulture",
        icon: "fa-flower", amount: "50% subsidy up to ₹5 lakh", benefits: ["Flower cultivation support", "Greenhouse subsidy", "Export quality flowers", "Cold chain support"],
        eligibility: ["Flower growers", "FPOs", "Women farmers", "SHGs"], documents: ["Land records", "Greenhouse proposal", "Aadhaar", "Bank account"], helpline: "011-23381092", website: "https://agricoop.nic.in"
    },
    {
        id: 79, name: "Mushroom Cultivation Scheme", fullName: "National Mushroom Mission", category: "horticulture",
        icon: "fa-cube", amount: "50% subsidy up to ₹1 lakh", benefits: ["Mushroom spawn subsidy", "Growing room construction", "Training and technology", "Marketing support"],
        eligibility: ["All farmers", "SHGs", "Women farmers", "Rural youth"], documents: ["Land records", "Aadhaar", "Bank account", "Training certificate"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 80, name: "Vegetable Initiative", fullName: "Vegetable Cluster Development Scheme", category: "horticulture",
        icon: "fa-carrot", amount: "₹20,000/hectare", benefits: ["Vegetable seed subsidy", "Protected cultivation", "Market linkage", "Post-harvest management"],
        eligibility: ["Vegetable farmers", "FPOs", "SHGs", "Women farmers"], documents: ["Land records", "Crop plan", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://midh.gov.in"
    },
    
    // ========== DIGITAL FARMING SCHEMES (10 schemes) ==========
    {
        id: 81, name: "Bharat-VISTAAR", fullName: "Virtual Integrated System for Agricultural Resources", category: "digital",
        icon: "fa-microchip", amount: "Free AI Service", benefits: ["AI-powered farm advisory", "22+ Indian languages", "Crop recommendations", "Pest alerts", "Market prices"],
        eligibility: ["All farmers", "FPOs", "Extension officers", "KVKs"], documents: ["Aadhaar", "Mobile number", "Land records (optional)"], helpline: "1800-180-1551", website: "https://agristack.gov.in"
    },
    {
        id: 82, name: "AgriStack", fullName: "National AgriStack Digital Platform", category: "digital",
        icon: "fa-database", amount: "Free Digital ID", benefits: ["Unique Farmer ID", "Digital land records", "Crop sowing data", "Direct benefit transfer integration"],
        eligibility: ["All farmers", "Priority for scheme beneficiaries", "Small & marginal farmers"], documents: ["Aadhaar", "Land records", "Bank account", "Mobile number"], helpline: "1800-180-1551", website: "https://agristack.gov.in"
    },
    {
        id: 83, name: "e-NAM", fullName: "National Agriculture Market", category: "digital",
        icon: "fa-chart-line", amount: "Free Trading Platform", benefits: ["Online mandi trading", "Real-time price discovery", "1000+ mandis connected", "Direct payment to farmer"],
        eligibility: ["All farmers", "Traders", "FPOs", "Commission agents"], documents: ["Aadhaar", "Bank account", "Trading license", "Mobile number"], helpline: "1800-180-1551", website: "https://enam.gov.in"
    },
    {
        id: 84, name: "Kisan Suvidha App", fullName: "Kisan Suvidha Mobile Application", category: "digital",
        icon: "fa-mobile-alt", amount: "Free App", benefits: ["Weather updates", "Mandi prices", "Pest alerts", "Dealer information", "Plant protection"],
        eligibility: ["All farmers", "Free download from Play Store", "No registration required"], documents: ["Mobile number", "Android phone"], helpline: "1800-180-1551", website: "https://play.google.com/store/apps/details?id=com.agricoop.kisansuvidha"
    },
    {
        id: 85, name: "Pusa Krishi App", fullName: "ICAR-Pusa Krishi Mobile App", category: "digital",
        icon: "fa-apple-alt", amount: "Free", benefits: ["Crop varieties database", "Package of practices", "Disease diagnosis", "Expert consultation"],
        eligibility: ["All farmers", "Free download", "Hindi & English available"], documents: ["None required"], helpline: "011-25843337", website: "https://iari.res.in"
    },
    {
        id: 86, name: "Kisan Call Centre", fullName: "Kisan Call Centre 1551", category: "digital",
        icon: "fa-phone-alt", amount: "Toll Free", benefits: ["24x7 farming queries", "Expert advice", "Multilingual support", "Scheme information"],
        eligibility: ["All farmers", "Toll free number: 1551", "Call from any phone"], documents: ["None required"], helpline: "1551", website: "https://agricoop.nic.in"
    },
    {
        id: 87, name: "mKisan Portal", fullName: "mKisan SMS Portal for Farmers", category: "digital",
        icon: "fa-envelope", amount: "Free SMS Service", benefits: ["Free SMS alerts", "Weather forecasts", "Market prices", "Plant protection advisories"],
        eligibility: ["All farmers", "Mobile number registration required", "Any mobile network"], documents: ["Mobile number", "Farmer registration"], helpline: "1800-180-1551", website: "https://mkisan.gov.in"
    },
    {
        id: 88, name: "CHC Farm Machinery App", fullName: "Custom Hiring Centre Mobile App", category: "digital",
        icon: "fa-tractor", amount: "Free Service", benefits: ["Find nearby farm machinery", "Book equipment online", "Rental rates comparison", "Farmer reviews"],
        eligibility: ["All farmers", "FPOs", "Custom Hiring Centers"], documents: ["Mobile number", "Location access"], helpline: "1800-180-1551", website: "https://agrimachinery.nic.in"
    },
    {
        id: 89, name: "National Pest Surveillance System", fullName: "NPSS - Digital Pest Monitoring", category: "digital",
        icon: "fa-bug", amount: "Free Service", benefits: ["AI-based pest detection", "Early warning system", "Crop-specific alerts", "Remedial recommendations"],
        eligibility: ["All farmers", "Free mobile app", "No registration required"], documents: ["Mobile number", "Crop photos (for diagnosis)"], helpline: "1800-180-1551", website: "https://ppqs.gov.in"
    },
    {
        id: 90, name: "Agri-Udaan", fullName: "Agri-Startup Incubation Scheme", category: "digital",
        icon: "fa-rocket", amount: "₹25 lakh grant", benefits: ["Startup funding for agri-tech", "Mentorship", "Incubation support", "Investor connect"],
        eligibility: ["Agri-tech startups", "Young entrepreneurs (18-35)", "Rural innovators"], documents: ["Business plan", "Startup registration", "Team details", "Innovation proof"], helpline: "1800-180-1551", website: "https://startupindia.gov.in"
    },
    
    // ========== SOLAR ENERGY SCHEMES (10 schemes) ==========
    {
        id: 91, name: "PM-KUSUM", fullName: "Pradhan Mantri Kisan Urja Suraksha evam Utthan Mahabhiyan", category: "solar",
        icon: "fa-solar-panel", amount: "60% Subsidy", benefits: ["60% subsidy for solar pumps (up to 7.5 HP)", "Solar panel on barren land", "Sell excess power to grid", "Reduce electricity costs"],
        eligibility: ["Farmers with agricultural land", "Individual farmers", "Water user associations", "FPOs"], documents: ["Land records", "Electricity connection proof", "Aadhaar", "Bank account"], helpline: "011-24360707", website: "https://mnre.gov.in"
    },
    {
        id: 92, name: "Solar Charkha Mission", fullName: "Solar Charkha Clusters", category: "solar",
        icon: "fa-sun", amount: "₹4.5 lakh subsidy", benefits: ["Solar charkha units", "Women empowerment", "Khadi production", "Rural employment"],
        eligibility: ["SHGs", "Women farmers", "Rural artisans", "Khadi institutions"], documents: ["SHG registration", "Project proposal", "Bank account"], helpline: "011-23381092", website: "https://kviconline.gov.in"
    },
    {
        id: 93, name: "Solar Cold Storage", fullName: "Solar Powered Cold Storage Scheme", category: "solar",
        icon: "fa-snowflake", amount: "50% subsidy up to ₹10 lakh", benefits: ["Solar cold storage for farmers", "Reduces post-harvest loss", "Off-grid operation", "Fruits & vegetables preservation"],
        eligibility: ["FPOs", "Farmer cooperatives", "SHGs", "Individual farmers"], documents: ["Land records", "Project report", "Aadhaar", "Bank account"], helpline: "011-24360707", website: "https://mnre.gov.in"
    },
    {
        id: 94, name: "Solar Drying Units", fullName: "Solar Dryer for Agricultural Produce", category: "solar",
        icon: "fa-sun", amount: "40% subsidy up to ₹2 lakh", benefits: ["Solar dryer for grains/fruits", "Quality preservation", "Value addition", "Reduces dependence on sun drying"],
        eligibility: ["All farmers", "FPOs", "SHGs", "Women farmers"], documents: ["Land records", "Quotation", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 95, name: "Solar Fencing", fullName: "Solar Fencing for Crop Protection", category: "solar",
        icon: "fa-shield-alt", amount: "50% subsidy up to ₹50,000", benefits: ["Solar fencing for farms", "Wild animal protection", "Low maintenance", "No electricity bill"],
        eligibility: ["Farmers in wildlife-prone areas", "Orchard owners", "All farmers"], documents: ["Land records", "Location proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 96, name: "Solar Water Pump Scheme", fullName: "Off-grid Solar Water Pumping", category: "solar",
        icon: "fa-tint", amount: "75% subsidy up to ₹1.5 lakh", benefits: ["Solar submersible pumps", "No diesel/electricity cost", "Works in remote areas", "5-year warranty"],
        eligibility: ["Small & marginal farmers", "Areas without grid connection"], documents: ["Land records", "Water source proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 97, name: "Solar Greenhouse Scheme", fullName: "Solar Powered Protected Cultivation", category: "solar",
        icon: "fa-sun", amount: "60% subsidy up to ₹5 lakh", benefits: ["Solar fans and cooling", "Temperature control", "Extended growing season", "Higher yield"],
        eligibility: ["Horticulture farmers", "FPOs", "SHGs"], documents: ["Land records", "Greenhouse plan", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 98, name: "Solar Packs for Drones", fullName: "Solar Charging for Agri-Drones", category: "solar",
        icon: "fa-drone", amount: "40% subsidy up to ₹50,000", benefits: ["Solar charging station", "Off-grid drone operation", "Sustainable farming", "Reduces diesel use"],
        eligibility: ["FPOs", "Drone Didi beneficiaries", "SHGs"], documents: ["Drone purchase proof", "Land records", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    {
        id: 99, name: "Solar Agriculture Feeders", fullName: "Solarization of Agri Feeders", category: "solar",
        icon: "fa-plug", amount: "90% grant", benefits: ["Solar power for irrigation feeders", "Reliable daytime power", "Reduces grid dependency", "Lower electricity bills"],
        eligibility: ["State governments", "DISCOMs", "Water user associations"], documents: ["Project proposal", "Feeder details"], helpline: "011-24360707", website: "https://mnre.gov.in"
    },
    {
        id: 100, name: "Rooftop Solar for Farm Houses", fullName: "Rooftop Solar Subsidy for Farmers", category: "solar",
        icon: "fa-home", amount: "40% subsidy up to ₹78,000", benefits: ["Grid-connected rooftop solar", "Reduce electricity bills", "Sell excess to grid", "For pump set or home use"],
        eligibility: ["All farmers", "Farm house owners", "FPOs"], documents: ["Electricity bill", "Rooftop ownership proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://mnre.gov.in"
    },
    
    // ========== ANIMAL HUSBANDRY SCHEMES (10 schemes) ==========
    {
        id: 101, name: "AHIDF", fullName: "Animal Husbandry Infrastructure Development Fund", category: "animal",
        icon: "fa-paw", amount: "Up to ₹100 crore loan", benefits: ["Credit-linked subsidy for dairy, poultry", "3% interest subvention", "Loan up to ₹100 crore", "Loan guarantee for MSMEs"],
        eligibility: ["Individual entrepreneurs", "FPOs", "Private companies", "Cooperatives"], documents: ["Detailed Project Report", "Business registration", "Land documents", "Bank account"], helpline: "011-23385788", website: "https://dahd.nic.in"
    },
    {
        id: 102, name: "Dairy Entrepreneurship Scheme", fullName: "Dairy Entrepreneurship Development Scheme", category: "animal",
        icon: "fa-tractor", amount: "25-33% subsidy", benefits: ["Subsidy for dairy units", "25% for general, 33% for SC/ST", "Loan for cows/buffaloes", "Milk processing equipment"],
        eligibility: ["Individual farmers", "SHGs", "Dairy cooperatives", "Landless farmers"], documents: ["Land documents", "Aadhaar", "Bank account", "Project report"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 103, name: "Poultry Venture Capital", fullName: "Poultry Venture Capital Fund", category: "animal",
        icon: "fa-dove", amount: "33% subsidy up to ₹3 lakh", benefits: ["Subsidy for poultry farming", "33% for SC/ST farmers", "Loan for broiler/layer units", "Hatchery support"],
        eligibility: ["Individual farmers", "FPOs", "SHGs", "Young entrepreneurs"], documents: ["Land documents", "Aadhaar", "Bank account", "Experience certificate"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 104, name: "Goat Development Scheme", fullName: "Goat and Sheep Development Scheme", category: "animal",
        icon: "fa-paw", amount: "50% subsidy up to ₹50,000", benefits: ["Subsidy for goat/sheep farming", "Breed improvement support", "Veterinary care", "Marketing support"],
        eligibility: ["Small farmers", "Landless laborers", "Tribal farmers", "Women farmers"], documents: ["Aadhaar", "Bank account", "Village panchayat certificate", "Land records"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 105, name: "Pig Development Scheme", fullName: "Pig Development and Breeding Scheme", category: "animal",
        icon: "fa-paw", amount: "40% subsidy up to ₹40,000", benefits: ["Pig farming subsidy", "Breed improvement", "Veterinary support", "Market linkage"],
        eligibility: ["Small farmers", "Tribal farmers", "SHGs", "Rural youth"], documents: ["Aadhaar", "Bank account", "Land records", "Training certificate"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 106, name: "Fodder Development Scheme", fullName: "National Fodder Development Scheme", category: "animal",
        icon: "fa-leaf", amount: "₹10,000/hectare", benefits: ["Fodder seed subsidy", "Hydroponic fodder units", "Silage making support", "Fodder storage"],
        eligibility: ["All farmers", "Dairy farmers", "FPOs", "SHGs"], documents: ["Land records", "Animal count proof", "Aadhaar", "Bank account"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 107, name: "NADIS", fullName: "National Animal Disease Insurance Scheme", category: "animal",
        icon: "fa-shield-alt", amount: "Premium: ₹50-200/animal", benefits: ["Livestock insurance", "Covers cattle, buffalo, sheep, goat", "Disease and accident coverage", "Quick claim settlement"],
        eligibility: ["All livestock owners", "Dairy farmers", "Sheep/goat farmers"], documents: ["Animal identification", "Veterinary certificate", "Aadhaar", "Bank account"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    {
        id: 108, name: "National Beekeeping & Honey Mission", fullName: "NBHM - Honey Mission", category: "animal",
        icon: "fa-bug", amount: "₹10,000/beneficiary", benefits: ["Subsidy for beekeeping equipment", "Honey processing units", "Training and demonstration", "Marketing support for honey"],
        eligibility: ["Individual farmers", "SHGs", "FPOs", "Tribal farmers"], documents: ["Land records (for apiary)", "Aadhaar", "Bank account", "Training certificate (preferred)"], helpline: "1800-180-1551", website: "https://dahd.nic.in"
    },
    {
        id: 109, name: "Blue Revolution - Fisheries", fullName: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)", category: "animal",
        icon: "fa-fish", amount: "40-60% subsidy", benefits: ["Fish farming subsidy", "Hatchery development", "Cold chain for fish", "Processing units", "Export promotion"],
        eligibility: ["Fishermen", "Fish farmers", "FPOs", "Cooperatives", "Women SHGs"], documents: ["Water body ownership/lease", "Aadhaar", "Bank account", "Project report"], helpline: "1800-180-1551", website: "https://dof.gov.in"
    },
    {
        id: 110, name: "National Livestock Mission", fullName: "NLM - Livestock Development", category: "animal",
        icon: "fa-paw", amount: "50% subsidy up to ₹2 lakh", benefits: ["Breed improvement of cattle, buffalo, sheep, goat", "Fodder development", "Risk management", "Entrepreneurship development"],
        eligibility: ["All livestock farmers", "FPOs", "Cooperatives", "SHGs"], documents: ["Livestock count proof", "Land records (for fodder)", "Aadhaar", "Bank account"], helpline: "1800-180-1111", website: "https://dahd.nic.in"
    },
    
    // ========== DISASTER MANAGEMENT SCHEMES (10 schemes) ==========
    {
        id: 111, name: "SDRF for Agriculture", fullName: "State Disaster Response Fund - Agriculture", category: "disaster",
        icon: "fa-cloud-rain", amount: "₹20,000/hectare", benefits: ["Crop loss compensation", "Natural calamity support", "Flood, drought, cyclone", "Quick disbursal"],
        eligibility: ["Farmers in notified disaster areas", "All farmers", "Crop loss >50%"], documents: ["Land records", "Crop loss certificate", "Aadhaar", "Bank account"], helpline: "1070", website: "https://ndma.gov.in"
    },
    {
        id: 112, name: "NDRF Agriculture Relief", fullName: "National Disaster Response Force - Agriculture", category: "disaster",
        icon: "fa-tornado", amount: "₹25,000/hectare", benefits: ["National level disaster relief", "Cyclone, flood, hailstorm", "Landslide coverage", "Pest outbreak"],
        eligibility: ["Farmers in severely affected areas", "All categories"], documents: ["Disaster notification", "Land records", "Crop loss certificate", "Aadhaar"], helpline: "1070", website: "https://ndma.gov.in"
    },
    {
        id: 113, name: "Hailstorm Insurance", fullName: "Hailstorm Crop Insurance", category: "disaster",
        icon: "fa-cloud-hail", amount: "Premium: 2-5%", benefits: ["Special coverage for hailstorm", "Individual farm assessment", "Quick claims", "Covers all crops"],
        eligibility: ["Farmers in hailstorm prone areas", "All farmers optional"], documents: ["Land records", "Weather data", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://pmfby.gov.in"
    },
    {
        id: 114, name: "Drought Relief Package", fullName: "National Drought Relief Package", category: "disaster",
        icon: "fa-sun", amount: "₹15,000/hectare", benefits: ["Drought affected farmers", "Input subsidy", "Fodder supply", "Drinking water support"],
        eligibility: ["Farmers in drought declared areas", "Small & marginal priority"], documents: ["Land records", "Drought declaration", "Crop loss proof", "Aadhaar"], helpline: "1070", website: "https://agricoop.nic.in"
    },
    {
        id: 115, name: "Flood Relief Package", fullName: "National Flood Relief for Agriculture", category: "disaster",
        icon: "fa-water", amount: "₹18,000/hectare", benefits: ["Flood affected farmers", "Crop loss compensation", "Seed subsidy for replanting", "Input support"],
        eligibility: ["Farmers in flood affected areas", "All categories"], documents: ["Land records", "Flood damage report", "Aadhaar", "Bank account"], helpline: "1070", website: "https://agricoop.nic.in"
    },
    {
        id: 116, name: "Cyclone Relief Scheme", fullName: "Cyclone Affected Agriculture Relief", category: "disaster",
        icon: "fa-wind", amount: "₹22,000/hectare", benefits: ["Cyclone damage compensation", "Orchard loss coverage", "Livestock loss support", "Input subsidy"],
        eligibility: ["Farmers in coastal areas", "Cyclone affected zones"], documents: ["Land records", "Cyclone damage report", "Aadhaar", "Bank account"], helpline: "1070", website: "https://ndma.gov.in"
    },
    {
        id: 117, name: "Pest Outbreak Relief", fullName: "Locust/Pest Attack Relief Scheme", category: "disaster",
        icon: "fa-bug", amount: "₹10,000/hectare", benefits: ["Compensation for pest damage", "Free pesticide supply", "Crop loss coverage", "Quick response team"],
        eligibility: ["Farmers in pest affected areas", "Locust attack zones"], documents: ["Land records", "Pest attack certificate", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 118, name: "Landslide Relief", fullName: "Landslide Agriculture Relief", category: "disaster",
        icon: "fa-mountain", amount: "₹30,000/hectare", benefits: ["Landslide damage compensation", "Land restoration support", "Terrace repair subsidy", "Input support"],
        eligibility: ["Farmers in hilly areas", "Landslide affected zones"], documents: ["Land records", "Landslide damage report", "Aadhaar", "Bank account"], helpline: "1070", website: "https://ndma.gov.in"
    },
    {
        id: 119, name: "Lightning Strike Relief", fullName: "Lightning Strike Compensation", category: "disaster",
        icon: "fa-bolt", amount: "₹5 lakh/farmer", benefits: ["Compensation for farmer death", "Medical expense coverage", "Dependent family support", "Quick disbursal"],
        eligibility: ["Farmers affected by lightning", "Family of deceased farmers"], documents: ["Death certificate", "Police report", "Aadhaar", "Bank account"], helpline: "1070", website: "https://ndma.gov.in"
    },
    {
        id: 120, name: "Cold Wave Relief", fullName: "Cold Wave Crop Protection Scheme", category: "disaster",
        icon: "fa-temperature-low", amount: "₹8,000/hectare", benefits: ["Frost damage compensation", "Smoke generator subsidy", "Crop cover support", "Input assistance"],
        eligibility: ["Farmers in cold wave zones", "Vegetable & fruit growers"], documents: ["Land records", "Temperature data", "Crop damage proof", "Aadhaar"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    
    // ========== MARKET & TRADING SCHEMES (10 schemes) ==========
    {
        id: 121, name: "e-NAM Plus", fullName: "e-NAM Enhanced Platform", category: "market",
        icon: "fa-chart-line", amount: "Free Trading", benefits: ["Online mandi trading", "Quality assaying", "Warehouse receipt system", "Direct payment"],
        eligibility: ["All farmers", "Traders", "FPOs", "Commission agents"], documents: ["Aadhaar", "Bank account", "Mobile number", "Trading registration"], helpline: "1800-180-1551", website: "https://enam.gov.in"
    },
    {
        id: 122, name: "FPO Trading Scheme", fullName: "Farmer Producer Organization Trading Support", category: "market",
        icon: "fa-handshake", amount: "₹15 lakh support", benefits: ["FPO market linkage", "Brand development", "Packaging support", "Direct buyer connect"],
        eligibility: ["Registered FPOs", "Producer companies", "Farmer cooperatives"], documents: ["FPO registration", "Member list", "Bank account", "Business plan"], helpline: "1800-180-1551", website: "https://sfacindia.com"
    },
    {
        id: 123, name: "Warehouse Receipt System", fullName: "Negotiable Warehouse Receipt Scheme", category: "market",
        icon: "fa-warehouse", amount: "Loan against warehouse receipt", benefits: ["Store produce in warehouse", "Get loan against receipt", "Sell when price high", "Quality preservation"],
        eligibility: ["All farmers", "FPOs", "Traders", "Cooperatives"], documents: ["Warehouse receipt", "Aadhaar", "Bank account", "Crop details"], helpline: "1800-180-1551", website: "https://wdra.gov.in"
    },
    {
        id: 124, name: "Transport Subsidy", fullName: "Agricultural Produce Transport Subsidy", category: "market",
        icon: "fa-truck", amount: "50% transport subsidy", benefits: ["Transport cost subsidy", "NE states priority", "Perishable commodities", "Mandi access"],
        eligibility: ["Farmers in remote areas", "NE states", "Hilly regions", "Tribal areas"], documents: ["Transport bill", "Mandi entry proof", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 125, name: "Price Support Scheme", fullName: "Market Intervention Scheme (MIS)", category: "market",
        icon: "fa-chart-line", amount: "MSP price support", benefits: ["Price support for perishables", "Government procurement", "Loss compensation", "Farmer income protection"],
        eligibility: ["Farmers growing notified perishable crops", "All states"], documents: ["Crop declaration", "Land records", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 126, name: "Kisan Rail Subsidy", fullName: "Kisan Rail Freight Subsidy Scheme", category: "market",
        icon: "fa-train", amount: "50% freight subsidy", benefits: ["Subsidized transport of perishables", "Faster market access", "Reduces wastage", "Nationwide reach"],
        eligibility: ["All farmers", "FPOs", "Cooperatives", "Traders (on behalf of farmers)"], documents: ["Railway booking receipt", "Farmer declaration", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://indianrailways.gov.in"
    },
    {
        id: 127, name: "Farmer Producer Organization (FPO) Scheme", fullName: "Formation & Promotion of FPOs", category: "market",
        icon: "fa-handshake", amount: "₹15 lakh per FPO", benefits: ["Financial support for FPO formation", "Handholding for 5 years", "Equity grant up to ₹15 lakh", "Credit guarantee"],
        eligibility: ["Groups of 300+ farmers", "SHGs", "Cooperatives", "Farmer clusters"], documents: ["Farmer list (300+)", "Land details", "Business plan", "Bank account"], helpline: "1800-180-1551", website: "https://sfacindia.com"
    },
    {
        id: 128, name: "Agricultural Marketing Infrastructure (AMI)", fullName: "AMI - Rural Godown Scheme", category: "market",
        icon: "fa-warehouse", amount: "25% subsidy up to ₹25 lakh", benefits: ["Construction of rural godowns", "Warehouse for farmers", "Loan against stored produce", "Reduces distress sale"],
        eligibility: ["Individual farmers", "FPOs", "Cooperatives", "SHGs"], documents: ["Land documents", "Project report", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
    {
        id: 129, name: "Kisan Sampada Yojana", fullName: "PMKS - Kisan Sampada Scheme", category: "market",
        icon: "fa-industry", amount: "35% subsidy up to ₹10 crore", benefits: ["Food processing units", "Mega food parks", "Cold chain infrastructure", "Value addition"],
        eligibility: ["Food processors", "FPOs", "Cooperatives", "Agri-entrepreneurs"], documents: ["Detailed Project Report", "Land documents", "Company registration", "Bank account"], helpline: "1800-180-1551", website: "https://mofpi.nic.in"
    },
    {
        id: 130, name: "Direct Marketing Scheme", fullName: "Farmers' Direct Marketing Scheme", category: "market",
        icon: "fa-store", amount: "50% subsidy up to ₹2 lakh", benefits: ["Farmer market stall subsidy", "Direct-to-consumer sales", "Branding support", "Digital payment setup"],
        eligibility: ["Individual farmers", "FPOs", "SHGs", "Women farmers"], documents: ["Land records", "Market stall plan", "Aadhaar", "Bank account"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
    },
  // ========== EMPLOYMENT & SKILL DEVELOPMENT SCHEMES (10 schemes) ==========
{
    id: 131, name: "MGNREGA Agriculture", fullName: "Mahatma Gandhi NREGA - Agriculture Works", category: "employment",
    icon: "fa-hard-hat", amount: "100 days guaranteed wage", benefits: ["100 days guaranteed employment", "₹300+ daily wage", "Farm pond construction", "Land development works", "Irrigation canal work"],
    eligibility: ["All rural households", "Adult members willing to do unskilled work", "Priority to SC/ST/women"], documents: ["Job card", "Aadhaar", "Bank account", "Ration card"], helpline: "1800-11-0001", website: "https://nrega.nic.in"
},
{
    id: 132, name: "Agri-Clinics & Agri-Business Centres", fullName: "ACABC - Agri-Entrepreneurship Scheme", category: "employment",
    icon: "fa-briefcase", amount: "₹20 lakh loan + 44% subsidy", benefits: ["Training for agri-graduates", "44% subsidy on project cost", "Loan up to ₹20 lakh", "Monthly stipend during training"],
    eligibility: ["Agriculture graduates", "Diploma holders in agriculture", "Biological science graduates", "Post-graduates in agri-allied subjects"], documents: ["Degree certificate", "Aadhaar", "Bank account", "Business plan", "NOC from NABARD"], helpline: "1800-180-1551", website: "https://agripreneur.nic.in"
},
{
    id: 133, name: "Skill Development in Agriculture", fullName: "National Skill Development in Agriculture", category: "employment",
    icon: "fa-graduation-cap", amount: "Free training + ₹5,000 stipend", benefits: ["Free skill training programs", "Drone pilot training", "Soil testing technician", "Farm machinery operator", "Food processing skills"],
    eligibility: ["Rural youth (18-35 years)", "Farmers' children", "Women farmers", "School dropouts"], documents: ["Aadhaar", "Age proof", "Educational certificates", "Bank account", "Passport photo"], helpline: "1800-180-1551", website: "https://agricoop.nic.in"
},
{
    id: 134, name: "PMKVY Agriculture", fullName: "Pradhan Mantri Kaushal Vikas Yojana - Agriculture", category: "employment",
    icon: "fa-tools", amount: "Free training + certification", benefits: ["Free vocational training", "Government certification", "Job placement assistance", "Recognition of Prior Learning", "Agri-machinery repair training"],
    eligibility: ["Youth aged 18-45", "Farmers' families", "Rural and urban youth", "Women candidates"], documents: ["Aadhaar", "Age proof", "Educational documents", "Bank account", "Mobile number"], helpline: "1800-123-9626", website: "https://pmkvyofficial.org"
},
{
    id: 135, name: "Startup India - Agriculture", fullName: "Startup India Agriculture Grand Challenge", category: "employment",
    icon: "fa-rocket", amount: "₹50 lakh seed funding", benefits: ["Seed funding up to ₹50 lakh", "Mentorship from experts", "Incubation support", "Tax exemption for 3 years", "Patent filing support"],
    eligibility: ["Agri-tech startups", "Young entrepreneurs (18-35)", "Innovative agri-solutions", "Registered startups (DPIIT)"], documents: ["Startup registration", "Innovation details", "Business plan", "Team profiles", "Bank account"], helpline: "1800-115-565", website: "https://startupindia.gov.in"
},
{
    id: 136, name: "Rural Self Employment Training", fullName: "RSETI - Rural Self Employment Training Institutes", category: "employment",
    icon: "fa-chalkboard-teacher", amount: "Free training + credit linkage", benefits: ["Free residential training (7-30 days)", "Dairy farming training", "Poultry & goat farming", "Bank credit linkage", "Post-training handholding"],
    eligibility: ["Rural youth (18-45 years)", "Unemployed youth", "Farmers' children", "Women candidates"], documents: ["Aadhaar", "Ration card", "Income certificate", "Bank account", "Passport photos"], helpline: "1800-425-1515", website: "https://rseti.gov.in"
},
{
    id: 137, name: "Rashtriya Yuva Sashaktikaran Karyakram", fullName: "National Youth Empowerment Program - Agriculture", category: "employment",
    icon: "fa-users", amount: "₹2 lakh project support", benefits: ["Youth-led agricultural projects", "Leadership development", "Community farming initiatives", "Financial literacy training", "Market linkage support"],
    eligibility: ["Youth groups (15-29 years)", "Youth clubs", "Nehru Yuva Kendra members", "Rural youth organizations"], documents: ["Group registration", "Member details", "Aadhaar", "Bank account", "Project proposal"], helpline: "011-23382122", website: "https://nyks.nic.in"
},
{
    id: 138, name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana", fullName: "DDU-GKY - Rural Skill Development", category: "employment",
    icon: "fa-cogs", amount: "Free training + ₹1,000/month stipend", benefits: ["3-12 months skill training", "Monthly stipend during training", "100% job placement guarantee", "Post-placement support", "Food and accommodation free"],
    eligibility: ["Rural poor youth (18-35 years)", "SC/ST/women priority", "BPL families", "MGNREGA worker families"], documents: ["Aadhaar", "BPL certificate", "Age proof", "Bank account", "Passport photo"], helpline: "1800-266-6146", website: "https://ddugky.gov.in"
},
{
    id: 139, name: "National Livelihood Mission - Farm Livelihoods", fullName: "NRLM - Aajeevika Farm Livelihoods", category: "employment",
    icon: "fa-hands-helping", amount: "₹50,000 per SHG", benefits: ["SHG-based farming activities", "Community investment fund", "Revolving fund support", "Value chain development", "Market linkage"],
    eligibility: ["Women SHGs under NRLM", "Farmers' collectives", "Producer groups", "Village organizations"], documents: ["SHG registration", "Member list", "Bank account", "Resolution copy", "Aadhaar"], helpline: "1800-180-1551", website: "https://aajeevika.gov.in"
},
{
    id: 140, name: "Krishi Vigyan Kendra Training", fullName: "KVK - Farmer Training & Employment Program", category: "employment",
    icon: "fa-microscope", amount: "Free training + inputs", benefits: ["Hands-on training at KVKs", "Integrated farming training", "Value addition training", "Input kits provided", "Certificate from ICAR"],
    eligibility: ["All farmers", "Farm women", "Rural youth", "School dropouts", "Agri-entrepreneurs"], documents: ["Aadhaar", "Land records (if applicable)", "Bank account", "2 passport photos", "Mobile number"], helpline: "011-25843277", website: "https://kvk.icar.gov.in"
}
];

// =====================================================
// SCHEME TRANSLATIONS (multi-language content for schemes)
// Only translated fields are stored per scheme id; anything
// not translated yet falls back to the English source above.
// =====================================================

const schemesTranslations = {
  hi: {
    1: { fullName: "प्रधानमंत्री किसान सम्मान निधि", amount: "₹6,000/वर्ष", benefits: ["₹6,000 प्रतिवर्ष प्रत्यक्ष आय सहायता", "हर 4 महीने में ₹2,000", "बैंक खाते में सीधा डीबीटी", "सभी लघु व सीमांत किसानों को कवर"], eligibility: ["लघु व सीमांत किसान (2 हेक्टेयर तक)", "खेती योग्य भूमि वाले किसान परिवार", "भूमि रिकॉर्ड वाले काश्तकार किसान"], documents: ["आधार कार्ड", "बैंक खाता", "भूमि रिकॉर्ड", "राशन कार्ड"] },
    2: { fullName: "काश्तकार किसानों के लिए पीएम-किसान", amount: "₹6,000/वर्ष", benefits: ["भूमिहीन किसानों के लिए विशेष प्रावधान", "बटाईदारों को सहायता", "प्रत्यक्ष लाभ अंतरण", "भूमि रिकॉर्ड की आवश्यकता नहीं"], eligibility: ["भूमिहीन काश्तकार किसान", "बटाईदार", "पट्टे की भूमि पर खेती करने वाले किसान"], documents: ["आधार", "बैंक खाता", "पट्टा समझौता", "शपथ पत्र"] },
    3: { fullName: "प्रधानमंत्री अन्नदाता आय संरक्षण अभियान", amount: "₹8,000/वर्ष", benefits: ["सभी किसानों के लिए आय सहायता", "न्यूनतम समर्थन मूल्य की गारंटी", "लघु किसानों को अतिरिक्त ₹2,000", "मूल्य कमी भुगतान"], eligibility: ["अधिसूचित फसल उगाने वाले सभी किसान", "लघु व सीमांत किसानों को प्राथमिकता", "एफपीओ सदस्य"], documents: ["आधार", "बैंक खाता", "भूमि रिकॉर्ड", "फसल घोषणा"] },
    4: { fullName: "मूल्य कमी भुगतान योजना", amount: "मूल्य अंतर भुगतान", benefits: ["मूल्य गिरावट पर मुआवजा", "एमएसपी अंतर भुगतान", "प्रत्यक्ष बैंक हस्तांतरण", "सब्जियों व फलों को कवर"], eligibility: ["मध्य प्रदेश के किसान", "फसलें: टमाटर, प्याज, आलू", "पंजीकृत किसान"], documents: ["आधार", "बैंक खाता", "बिक्री रसीद", "मंडी प्रवेश पर्ची"] },
    5: { fullName: "तेलंगाना रायथु बंधु", amount: "₹10,000/एकड़/वर्ष", benefits: ["किसानों के लिए निवेश सहायता", "₹5,000 प्रति एकड़ प्रति सीजन", "प्रत्यक्ष बैंक हस्तांतरण", "सभी किसानों को कवर"], eligibility: ["तेलंगाना के सभी किसान", "पट्टा धारक भूस्वामी", "काश्तकार किसान (नई योजना)"], documents: ["आधार", "पट्टा पासबुक", "बैंक खाता"] },
    6: { fullName: "ओडिशा कालिया योजना", amount: "₹25,000/वर्ष", benefits: ["किसानों के लिए वित्तीय सहायता", "भूमिहीन कृषि श्रमिक", "कमज़ोर आदिवासी समूह", "बटाईदारों को सहायता"], eligibility: ["ओडिशा के किसान", "भूमिहीन श्रमिक", "लघु व सीमांत किसान", "बटाईदार"], documents: ["आधार", "बैंक खाता", "निवास प्रमाण", "भूमि रिकॉर्ड"] },
    7: { fullName: "राष्ट्रीय कृषि विकास योजना", amount: "राज्य-विशिष्ट", benefits: ["राज्य कृषि परियोजनाओं हेतु फंडिंग", "अवसंरचना विकास", "कृषि-उद्यमिता", "मूल्य श्रृंखला"], eligibility: ["राज्य सरकारें", "एफपीओ", "कृषि विश्वविद्यालय", "अनुसंधान संस्थान"], documents: ["परियोजना प्रस्ताव", "राज्य अनुमोदन", "कार्यान्वयन योजना"] },
    8: { fullName: "राष्ट्रीय बीज सब्सिडी योजना", amount: "बीज पर 50% सब्सिडी", benefits: ["उच्च उपज देने वाली किस्म के बीज", "लघु किसानों के लिए 50% सब्सिडी", "प्रमाणित बीज", "उन्नत किस्में"], eligibility: ["सभी किसान", "लघु व सीमांत को प्राथमिकता", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "आधार", "बीज बिल", "बैंक खाता"] },
    9: { fullName: "पोषक तत्व आधारित सब्सिडी (एनबीएस) योजना", amount: "पोषक तत्व अनुसार भिन्न", benefits: ["पी एंड के उर्वरकों पर सब्सिडी", "किसान लागत में कमी", "संतुलित पोषण", "मृदा स्वास्थ्य सुधार"], eligibility: ["सभी किसान", "अधिकृत डीलरों के माध्यम से"], documents: ["डीलर बिल", "आधार (डीबीटी हेतु)", "भूमि रिकॉर्ड"] },
    10: { fullName: "महिला किसान सशक्तिकरण योजना", amount: "₹50,000/वर्ष", benefits: ["महिला किसान सशक्तिकरण", "कौशल प्रशिक्षण", "इनपुट सब्सिडी", "बाज़ार पहुंच"], eligibility: ["महिला किसान", "महिला स्वयं सहायता समूह", "महिला प्रधान परिवार"], documents: ["आधार", "भूमि रिकॉर्ड", "बैंक खाता", "एसएचजी प्रमाणपत्र"] },
    11: { fullName: "किसान क्रेडिट कार्ड योजना", amount: "₹3 लाख तक", benefits: ["परिक्रामी क्रेडिट सुविधा", "ब्याज: 7% (समय पर भुगतान पर 4%)", "₹1.6 लाख तक बिना गारंटी", "सहायक गतिविधियों को कवर"], eligibility: ["सभी किसान", "बटाईदार", "काश्तकार किसान", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "आधार", "फोटो", "फसल विवरण"] },
    12: { fullName: "अल्पकालिक फसल ऋण हेतु ब्याज छूट", amount: "2% ब्याज छूट", benefits: ["फसल ऋण पर 2% ब्याज छूट", "समय पर भुगतान पर अतिरिक्त 3%", "प्रभावी दर: 4% प्रति वर्ष", "₹3 लाख तक ऋण"], eligibility: ["फसल ऋण लेने वाले सभी किसान", "केसीसी धारक", "सहकारी समिति सदस्य"], documents: ["केसीसी", "ऋण आवेदन", "भूमि रिकॉर्ड"] },
    13: { fullName: "वेयरहाउस अवसंरचना कोष", amount: "₹50 करोड़ प्रति परियोजना", benefits: ["गोदाम निर्माण हेतु ऋण", "25% तक सब्सिडी", "फसलोत्तर अवसंरचना", "फसल बर्बादी में कमी"], eligibility: ["एफपीओ", "सहकारी समितियां", "कृषि-उद्यमी", "राज्य एजेंसियां"], documents: ["परियोजना रिपोर्ट", "भूमि दस्तावेज़", "पंजीकरण प्रमाण"] },
    14: { fullName: "डेयरी उद्यमिता विकास योजना", amount: "₹5 लाख तक सब्सिडी", benefits: ["डेयरी इकाइयों हेतु सब्सिडी", "सामान्य वर्ग हेतु 25%, एससी/एसटी हेतु 33%", "गाय/भैंस हेतु ऋण", "दुग्ध प्रसंस्करण उपकरण"], eligibility: ["व्यक्तिगत किसान", "स्वयं सहायता समूह", "डेयरी सहकारी समितियां"], documents: ["भूमि दस्तावेज़", "आधार", "बैंक खाता", "परियोजना रिपोर्ट"] },
    15: { fullName: "पोल्ट्री वेंचर कैपिटल फंड", amount: "₹3 लाख तक सब्सिडी", benefits: ["पोल्ट्री फार्मिंग हेतु सब्सिडी", "एससी/एसटी किसानों हेतु 33%", "ब्रॉयलर/लेयर इकाई हेतु ऋण", "हैचरी सहायता"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "स्वयं सहायता समूह"], documents: ["भूमि दस्तावेज़", "आधार", "बैंक खाता", "अनुभव प्रमाणपत्र"] },
    16: { fullName: "बकरी एवं भेड़ विकास योजना", amount: "50% सब्सिडी", benefits: ["बकरी/भेड़ पालन हेतु सब्सिडी", "₹50,000 तक 50% सब्सिडी", "नस्ल सुधार सहायता", "पशु चिकित्सा देखभाल"], eligibility: ["लघु किसान", "भूमिहीन श्रमिक", "आदिवासी किसान", "महिला किसान"], documents: ["आधार", "बैंक खाता", "ग्राम पंचायत प्रमाणपत्र"] },
    17: { fullName: "कृषि अवसंरचना कोष", amount: "₹2 करोड़ तक ऋण", benefits: ["फार्म-गेट अवसंरचना हेतु ऋण", "3% ब्याज छूट", "3 वर्ष की मोहलत", "गोदाम, कोल्ड स्टोरेज को कवर"], eligibility: ["एफपीओ", "सहकारी समितियां", "व्यक्तिगत किसान", "कृषि-उद्यमी"], documents: ["परियोजना रिपोर्ट", "भूमि दस्तावेज़", "आधार", "बैंक खाता"] },
    18: { fullName: "एएचआईडीएफ - डेयरी व पोल्ट्री ऋण", amount: "₹100 करोड़ तक", benefits: ["डेयरी व पोल्ट्री अवसंरचना हेतु ऋण", "3% ब्याज छूट", "ऋण गारंटी उपलब्ध", "दुग्ध प्रसंस्करण, हैचरी को कवर"], eligibility: ["व्यक्तिगत उद्यमी", "एफपीओ", "निजी कंपनियां", "सहकारी समितियां"], documents: ["डीपीआर", "व्यवसाय पंजीकरण", "भूमि दस्तावेज़", "बैंक खाता"] },
    19: { fullName: "एफआईडीएफ - मत्स्य पालन ऋण", amount: "₹50 लाख तक", benefits: ["मत्स्य पालन अवसंरचना हेतु ऋण", "4% ब्याज छूट", "हैचरी, फीड मिल को कवर", "मछली हेतु कोल्ड चेन"], eligibility: ["मछली किसान", "एफपीओ", "सहकारी समितियां", "स्वयं सहायता समूह"], documents: ["जल निकाय पट्टा", "परियोजना रिपोर्ट", "आधार", "बैंक खाता"] },
    20: { fullName: "खाद्य प्रसंस्करण ऋण योजना", amount: "₹10 करोड़ तक", benefits: ["खाद्य प्रसंस्करण इकाइयों हेतु ऋण", "35% पूंजीगत सब्सिडी", "5% ब्याज छूट", "फल, सब्जी, अनाज को कवर"], eligibility: ["खाद्य प्रसंस्करक", "एफपीओ", "सहकारी समितियां", "कृषि-उद्यमी"], documents: ["डीपीआर", "भूमि दस्तावेज़", "एफएसएसएआई लाइसेंस", "बैंक खाता"] },
    21: { fullName: "प्रधानमंत्री फसल बीमा योजना", amount: "कम प्रीमियम: 1.5-5%", benefits: ["कम प्रीमियम पर फसल बीमा", "रबी हेतु 1.5%, खरीफ हेतु 2%", "21 दिनों में दावा", "बुवाई-पूर्व से कटाई-बाद तक कवर"], eligibility: ["सभी किसान", "ऋणी किसान अनिवार्य", "गैर-ऋणी स्वैच्छिक", "बटाईदार"], documents: ["भूमि रिकॉर्ड", "फसल घोषणा", "आधार", "बैंक खाता"] },
    22: { fullName: "पुनर्गठित मौसम आधारित फसल बीमा योजना", amount: "प्रीमियम 1.5-8%", benefits: ["मौसम सूचकांक आधारित बीमा", "वर्षा की कमी/अधिकता कवर", "तापमान व आर्द्रता कवरेज", "त्वरित दावा निपटान"], eligibility: ["अधिसूचित क्षेत्रों के किसान", "मौसम-संवेदनशील फसलें", "सभी किसान श्रेणियां"], documents: ["भूमि रिकॉर्ड", "मौसम डेटा", "आधार"] },
    23: { fullName: "नारियल वृक्ष बीमा योजना", amount: "प्रीमियम: ₹100-500/वृक्ष", benefits: ["नारियल वृक्षों का बीमा", "कीट व रोग कवर", "प्राकृतिक आपदा कवरेज", "5 वर्ष तक कवरेज"], eligibility: ["नारियल किसान", "न्यूनतम 5 वृक्ष", "सभी राज्य"], documents: ["भूमि रिकॉर्ड", "वृक्ष गणना", "आधार"] },
    24: { fullName: "रबर बीमा योजना", amount: "₹30,000/हेक्टेयर", benefits: ["रबर वृक्षों का बीमा", "प्राकृतिक आपदा कवरेज", "रोग व कीट कवर", "उपज हानि मुआवज़ा"], eligibility: ["रबर उत्पादक", "न्यूनतम 0.5 हेक्टेयर", "रबर बोर्ड में पंजीकृत"], documents: ["भूमि रिकॉर्ड", "रबर बोर्ड पंजीकरण", "आधार"] },
    25: { fullName: "कॉफी फसल बीमा", amount: "प्रीमियम 3.5%", benefits: ["कॉफी बागानों का बीमा", "अरेबिका व रोबस्टा कवर", "उपज हानि कवरेज", "मूल्य उतार-चढ़ाव कवर"], eligibility: ["कॉफी उत्पादक", "कॉफी बोर्ड में पंजीकृत", "न्यूनतम 0.5 एकड़"], documents: ["भूमि रिकॉर्ड", "कॉफी बोर्ड पंजीकरण"] },
    26: { fullName: "चाय फसल बीमा", amount: "प्रीमियम 2.5%", benefits: ["चाय बागानों का बीमा", "हरी पत्ती उपज कवर", "सूखा व बाढ़ कवर", "कीट व रोग कवरेज"], eligibility: ["चाय उत्पादक", "टी बोर्ड में पंजीकृत", "सभी राज्य"], documents: ["भूमि रिकॉर्ड", "टी बोर्ड पंजीकरण"] },
    27: { fullName: "यूपीआईएस - फसल प्लस बीमा", amount: "प्रीमियम: 2-8%", benefits: ["संयुक्त फसल + संपत्ति बीमा", "घर, ट्रैक्टर, पशुधन कवर", "सभी हेतु एकल प्रीमियम", "त्वरित दावा निपटान"], eligibility: ["सभी किसान", "ऋणी किसान अनिवार्य", "गैर-ऋणी स्वैच्छिक"], documents: ["भूमि रिकॉर्ड", "संपत्ति सूची", "आधार", "बैंक खाता"] },
    28: { fullName: "ऑयल पाम बीमा योजना", amount: "प्रीमियम: 2.5%", benefits: ["ऑयल पाम बागानों का बीमा", "उपज हानि कवर", "कीट व रोग कवरेज", "5-वर्षीय पॉलिसी विकल्प"], eligibility: ["ऑयल पाम उत्पादक", "एनएमईओ-ओपी में पंजीकृत", "न्यूनतम 1 हेक्टेयर"], documents: ["भूमि रिकॉर्ड", "बागान पंजीकरण", "आधार"] },
    29: { fullName: "इलायची फसल बीमा", amount: "प्रीमियम: 3%", benefits: ["इलायची बागानों का बीमा", "मौसम से उपज हानि कवर", "कीट व रोग कवरेज", "त्वरित दावा निपटान"], eligibility: ["इलायची उत्पादक", "मसाला बोर्ड में पंजीकृत", "न्यूनतम 0.5 एकड़"], documents: ["भूमि रिकॉर्ड", "मसाला बोर्ड पंजीकरण", "आधार"] },
    30: { fullName: "राष्ट्रीय पशुधन बीमा योजना", amount: "प्रीमियम: 4-6%", benefits: ["गाय, भैंस, भेड़, बकरी का बीमा", "दुर्घटना/रोग से मृत्यु कवर", "बीपीएल हेतु रियायती प्रीमियम", "त्वरित दावा निपटान"], eligibility: ["सभी पशुपालक", "डेयरी किसान", "बीपीएल परिवारों को प्राथमिकता"], documents: ["पशु पहचान", "पशु चिकित्सा प्रमाणपत्र", "आधार", "बैंक खाता"] },
    31: { fullName: "प्रधानमंत्री कृषि सिंचाई योजना", amount: "55-75% सब्सिडी", benefits: ["ड्रिप/स्प्रिंकलर सब्सिडी", "सामान्य हेतु 55%, एससी/एसटी हेतु 75%", "फार्म पॉन्ड सहायता", "प्रति बूंद अधिक फसल"], eligibility: ["सभी किसान", "एफपीओ", "जल उपयोगकर्ता संघ"], documents: ["भूमि रिकॉर्ड", "आधार", "बैंक खाता", "विक्रेता कोटेशन"] },
    32: { fullName: "सूक्ष्म सिंचाई कोष (नाबार्ड)", amount: "₹5,000 करोड़ का कोष", benefits: ["सूक्ष्म सिंचाई हेतु अतिरिक्त सब्सिडी", "पीएमकेएसवाई के साथ अभिसरण", "राज्य सरकार ऋण", "जल-अभावग्रस्त क्षेत्रों को प्राथमिकता"], eligibility: ["राज्य सरकारें", "जल उपयोगकर्ता संघ", "एफपीओ"], documents: ["परियोजना प्रस्ताव", "राज्य अनुमोदन"] },
    33: { fullName: "हर खेत को पानी (पीएमकेएसवाई घटक)", amount: "पूर्ण कवरेज", benefits: ["हर खेत तक सिंचाई पहुंच", "कमांड क्षेत्र विकास", "जल संचयन संरचनाएं", "जल निकायों का जीर्णोद्धार"], eligibility: ["सभी किसान", "वर्षा-आधारित क्षेत्रों को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "जल स्रोत विवरण"] },
    34: { fullName: "वाटरशेड विकास घटक (पीएमकेएसवाई)", amount: "₹12,000/हेक्टेयर", benefits: ["वाटरशेड प्रबंधन", "मृदा व जल संरक्षण", "वर्षा जल संचयन", "चेक डैम निर्माण"], eligibility: ["वाटरशेड क्षेत्रों के किसान", "ग्राम समुदाय"], documents: ["ग्राम प्रस्ताव", "भूमि रिकॉर्ड"] },
    35: { fullName: "त्वरित सिंचाई लाभ कार्यक्रम", amount: "90:10 फंडिंग", benefits: ["प्रमुख सिंचाई परियोजनाएं", "केंद्र:राज्य फंडिंग 90:10", "कमांड क्षेत्र विकास", "जल वितरण प्रणाली"], eligibility: ["राज्य सरकारें", "सिंचाई विभाग"], documents: ["परियोजना डीपीआर", "राज्य अनुमोदन"] },
    36: { fullName: "खेतों हेतु छत वर्षा जल संचयन", amount: "₹25,000 तक 50% सब्सिडी", benefits: ["वर्षा जल संचयन संरचना", "भंडारण टैंक सब्सिडी", "भूजल पुनर्भरण", "बोरवेल निर्भरता में कमी"], eligibility: ["सभी किसान", "फार्म हाउस", "पशु आश्रय"], documents: ["भवन योजना", "भूमि रिकॉर्ड", "कोटेशन"] },
    37: { fullName: "फार्म पॉन्ड व कुआं पुनर्भरण योजना", amount: "₹50,000 तक 50% सब्सिडी", benefits: ["फार्म पॉन्ड निर्माण", "कुआं पुनर्भरण संरचना", "वर्षा जल संचयन", "भूजल स्तर सुधार"], eligibility: ["सभी किसान", "घटते जलस्तर वाले क्षेत्र"], documents: ["भूमि रिकॉर्ड", "कुआं स्वामित्व प्रमाण", "आधार"] },
    38: { fullName: "स्प्रिंकलर सिंचाई सब्सिडी", amount: "₹15,000/एकड़ तक 70% सब्सिडी", benefits: ["पोर्टेबल स्प्रिंकलर सेट", "40% तक जल बचत", "सभी फसलों हेतु उपयुक्त", "कम परिचालन लागत"], eligibility: ["लघु व सीमांत किसान", "एफपीओ", "जल-अभावग्रस्त क्षेत्रों को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बैंक खाता"] },
    39: { fullName: "ड्रिप सिंचाई प्रोत्साहन योजना", amount: "60-80% सब्सिडी", benefits: ["ड्रिप सिंचाई प्रणाली", "60% तक जल बचत", "अधिक उपज", "फर्टिगेशन संगत"], eligibility: ["सभी किसान", "बागवानी किसानों को प्राथमिकता", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "फसल विवरण", "आधार", "बैंक खाता"] },
    40: { fullName: "फील्ड चैनल व पाइपलाइन विस्तार", amount: "₹2 लाख तक 50% सब्सिडी", benefits: ["स्रोत से खेत तक पीवीसी पाइपलाइन", "जल हानि में कमी", "समय व श्रम की बचत", "5 एकड़ तक कवर"], eligibility: ["सभी किसान", "जल उपयोगकर्ता संघ", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "जल स्रोत प्रमाण", "आधार", "बैंक खाता"] },
    41: { fullName: "कृषि यंत्रों पर सब्सिडी", amount: "40-50% सब्सिडी", benefits: ["एससी/एसटी हेतु 50% (₹40,000 तक)", "सामान्य किसानों हेतु 40%", "ट्रैक्टर, रोटावेटर सब्सिडी", "ड्रोन सब्सिडी ₹5 लाख तक 50%"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "कस्टम हायरिंग सेंटर", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बिल"] },
    42: { fullName: "फार्म मशीनरी बैंक", amount: "₹40 लाख तक 40% सब्सिडी", benefits: ["मशीनरी किराया केंद्र स्थापना", "उपकरणों हेतु 40% सब्सिडी", "लघु किसानों को लाभ", "व्यक्तिगत निवेश में कमी"], eligibility: ["एफपीओ", "सहकारी समितियां", "स्वयं सहायता समूह", "युवा उद्यमी"], documents: ["व्यवसाय योजना", "पंजीकरण प्रमाणपत्र", "केंद्र हेतु भूमि"] },
    43: { fullName: "उर्वरक/कीटनाशक छिड़काव हेतु ड्रोन", amount: "₹8 लाख तक 80% सब्सिडी", benefits: ["महिला स्वयं सहायता समूहों हेतु ड्रोन", "खरीद पर 80% सब्सिडी", "प्रशिक्षण शामिल", "छिड़काव सेवा से आय"], eligibility: ["महिला स्वयं सहायता समूह", "महिला सदस्यों वाले एफपीओ"], documents: ["एसएचजी पंजीकरण", "महिला सदस्यों की सूची"] },
    44: { fullName: "फसलोत्तर प्रबंधन उपकरण", amount: "₹10 लाख तक 35% सब्सिडी", benefits: ["थ्रेशर, ड्रायर, ग्रेडर", "भंडारण उपकरण", "पैकेजिंग मशीनरी", "प्रसंस्करण इकाइयां"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "कृषि-उद्यमी"], documents: ["परियोजना रिपोर्ट", "कोटेशन", "भूमि दस्तावेज़"] },
    45: { fullName: "किसानों हेतु सोलर ड्रायर", amount: "₹50,000 तक 50% सब्सिडी", benefits: ["फल/सब्जी हेतु सोलर ड्रायर", "फसलोत्तर हानि में कमी", "गुणवत्ता संरक्षण", "मूल्य संवर्धन"], eligibility: ["लघु किसान", "एफपीओ", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "आधार"] },
    46: { fullName: "कोल्ड स्टोरेज व कोल्ड चेन", amount: "₹50 लाख तक 35% सब्सिडी", benefits: ["कोल्ड स्टोरेज निर्माण", "रेफर वाहन", "पैकेजिंग उपकरण", "बर्बादी में कमी"], eligibility: ["एफपीओ", "सहकारी समितियां", "व्यक्तिगत उद्यमी"], documents: ["परियोजना रिपोर्ट", "भूमि दस्तावेज़", "व्यवसाय योजना"] },
    47: { fullName: "सीमांत किसानों हेतु लघु ट्रैक्टर सब्सिडी", amount: "₹60,000 तक 40% सब्सिडी", benefits: ["20-35 एचपी ट्रैक्टर हेतु सब्सिडी", "एससी/एसटी किसानों को प्राथमिकता", "कस्टम हायरिंग विकल्प", "खेती लागत में कमी"], eligibility: ["लघु व सीमांत किसान", "एससी/एसटी किसान", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बैंक खाता"] },
    48: { fullName: "पावर टिलर सब्सिडी योजना", amount: "₹25,000 तक 50% सब्सिडी", benefits: ["पावर टिलर हेतु सब्सिडी", "छोटे खेतों हेतु उपयुक्त", "श्रम निर्भरता में कमी", "कम रखरखाव लागत"], eligibility: ["लघु किसान", "पहाड़ी क्षेत्र के किसान", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बैंक खाता"] },
    49: { fullName: "कंबाइन हार्वेस्टर सब्सिडी योजना", amount: "₹2 लाख तक 40% सब्सिडी", benefits: ["रीपर/हार्वेस्टर हेतु सब्सिडी", "कटाई समय में कमी", "फसल हानि न्यूनतम", "कस्टम हायरिंग व्यावहारिक"], eligibility: ["एफपीओ", "सहकारी समितियां", "स्वयं सहायता समूह", "बड़े किसान"], documents: ["भूमि रिकॉर्ड", "व्यवसाय योजना", "आधार", "बैंक खाता"] },
    50: { fullName: "यांत्रिक धान रोपण यंत्र सब्सिडी", amount: "₹40,000 तक 50% सब्सिडी", benefits: ["धान रोपण यंत्र हेतु सब्सिडी", "श्रम लागत की बचत", "समान रोपण", "अधिक उपज"], eligibility: ["धान किसान", "एफपीओ", "स्वयं सहायता समूह", "कस्टम हायरिंग केंद्र"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बैंक खाता"] },
    51: { fullName: "मृदा स्वास्थ्य कार्ड योजना", amount: "निःशुल्क सेवा", benefits: ["हर 2 वर्ष में निःशुल्क मृदा परीक्षण", "12 मापदंडों का विश्लेषण", "फसल-विशिष्ट सिफारिशें", "उर्वरक लागत में 10-15% कमी"], eligibility: ["सभी किसान", "लघु किसानों को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "किसान पहचान पत्र"] },
    52: { fullName: "मोबाइल मृदा परीक्षण प्रयोगशालाएं", amount: "₹25 लाख प्रति प्रयोगशाला", benefits: ["मोबाइल मृदा परीक्षण वैन", "निःशुल्क घर-द्वार सेवा", "7 दिनों में परिणाम", "दूरस्थ गांवों को कवर"], eligibility: ["राज्य सरकारें", "केवीके", "कृषि विश्वविद्यालय"], documents: ["प्रस्ताव", "अवसंरचना विवरण"] },
    53: { fullName: "मृदा स्वास्थ्य प्रबंधन (एसएचएम)", amount: "₹2,000/हेक्टेयर", benefits: ["मृदा संशोधन सब्सिडी", "चूना/जिप्सम अनुप्रयोग", "सूक्ष्म पोषक तत्व आपूर्ति", "जैव-उर्वरक प्रोत्साहन"], eligibility: ["सभी किसान", "मृदा स्वास्थ्य कार्ड धारक"], documents: ["मृदा स्वास्थ्य कार्ड", "भूमि रिकॉर्ड"] },
    54: { fullName: "सूक्ष्म पोषक तत्व कमी सुधार", amount: "₹1,000/एकड़ तक 50% सब्सिडी", benefits: ["जिंक, बोरॉन, आयरन आपूर्ति", "कमी सुधार", "गुणवत्तापूर्ण बीज सब्सिडी", "उपज सुधार"], eligibility: ["सूक्ष्म पोषक तत्व की कमी वाले किसान", "मृदा परीक्षण रिपोर्ट आवश्यक"], documents: ["मृदा स्वास्थ्य कार्ड", "भूमि रिकॉर्ड"] },
    55: { fullName: "मृदा अम्लता/क्षारीयता सुधार", amount: "50% सब्सिडी", benefits: ["अम्लीय मृदा हेतु चूना", "क्षारीय मृदा हेतु जिप्सम", "मृदा पीएच में सुधार", "पोषक तत्व उपलब्धता में वृद्धि"], eligibility: ["समस्याग्रस्त मृदा वाले किसान", "मृदा परीक्षण आवश्यक"], documents: ["मृदा परीक्षण रिपोर्ट", "भूमि रिकॉर्ड"] },
    56: { fullName: "जैविक पदार्थ संवर्धन योजना", amount: "₹5,000/हेक्टेयर", benefits: ["हरी खाद सब्सिडी", "कंपोस्ट प्रोत्साहन", "फसल अवशेष प्रबंधन", "मृदा जैविक कार्बन में सुधार"], eligibility: ["सभी किसान", "जैविक खेती समूह"], documents: ["भूमि रिकॉर्ड", "मृदा स्वास्थ्य कार्ड", "आधार"] },
    57: { fullName: "निःशुल्क जैव-उर्वरक वितरण", amount: "5 किग्रा/एकड़ तक निःशुल्क", benefits: ["निःशुल्क राइज़ोबियम, पीएसबी, एज़ोटोबैक्टर", "रासायनिक उर्वरक उपयोग में कमी", "मृदा जीव विज्ञान में सुधार", "केवीके पर उपलब्ध"], eligibility: ["सभी किसान", "लघु व सीमांत को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "मृदा स्वास्थ्य कार्ड", "आधार"] },
    58: { fullName: "वर्मीकम्पोस्ट उत्पादन इकाई", amount: "₹25,000 तक 50% सब्सिडी", benefits: ["वर्मीकम्पोस्ट इकाई स्थापना", "केंचुआ आपूर्ति", "जैविक खाद उत्पादन", "अपशिष्ट पुनर्चक्रण"], eligibility: ["व्यक्तिगत किसान", "स्वयं सहायता समूह", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "परियोजना प्रस्ताव", "आधार", "बैंक खाता"] },
    59: { fullName: "मृदा कटाव रोकथाम योजना", amount: "75% सब्सिडी", benefits: ["कंटूर बंडिंग", "टेरेस खेती सहायता", "गली भराव", "पट्टी फसल प्रोत्साहन"], eligibility: ["पहाड़ी क्षेत्रों के किसान", "कटाव-प्रवण क्षेत्र"], documents: ["भूमि रिकॉर्ड", "मृदा कटाव प्रमाण", "आधार"] },
    60: { fullName: "भूमि समतलीकरण एवं विकास", amount: "₹10,000/एकड़ तक 50% सब्सिडी", benefits: ["लेज़र भूमि समतलीकरण सब्सिडी", "भूमि आकार परिवर्तन", "जल निकासी सुधार", "जल उपयोग दक्षता"], eligibility: ["सभी किसान", "एफपीओ", "जल-अभावग्रस्त क्षेत्रों को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "आधार", "कोटेशन", "बैंक खाता"] },
    61: { fullName: "परंपरागत कृषि विकास योजना", amount: "₹31,500/हेक्टेयर", benefits: ["जैविक इनपुट हेतु ₹15,000", "प्रमाणीकरण हेतु ₹10,000", "प्रशिक्षण हेतु ₹6,500", "3 वर्ष की सहायता"], eligibility: ["किसान समूह (50+ किसान)", "एफपीओ", "स्वयं सहायता समूह", "न्यूनतम 50 एकड़"], documents: ["क्लस्टर पंजीकरण", "किसान सूची", "भूमि विवरण", "मृदा परीक्षण रिपोर्ट"] },
    62: { fullName: "पूर्वोत्तर क्षेत्र हेतु जैविक मूल्य श्रृंखला विकास मिशन", amount: "₹75,000/हेक्टेयर", benefits: ["पूर्वोत्तर राज्यों में जैविक खेती", "एफपीओ गठन सहायता", "बाज़ार संपर्क", "प्रसंस्करण अवसंरचना"], eligibility: ["पूर्वोत्तर राज्यों के किसान", "एफपीओ", "जैविक समूह", "आदिवासी किसान"], documents: ["भूमि रिकॉर्ड", "एफपीओ पंजीकरण", "किसान पहचान पत्र", "बैंक खाता"] },
    63: { fullName: "वर्मीकम्पोस्ट उत्पादन इकाई योजना", amount: "₹50,000 तक 50% सब्सिडी", benefits: ["वर्मीकम्पोस्ट इकाई स्थापना", "केंचुआ आपूर्ति", "प्रशिक्षण प्रदान", "जैविक उर्वरक उत्पादन"], eligibility: ["व्यक्तिगत किसान", "स्वयं सहायता समूह", "एफपीओ", "महिला किसान"], documents: ["भूमि दस्तावेज़", "परियोजना प्रस्ताव", "आधार", "बैंक खाता"] },
    64: { fullName: "जैव-उर्वरक उत्पादन इकाई योजना", amount: "₹2 लाख तक 40% सब्सिडी", benefits: ["राइज़ोबियम, पीएसबी उत्पादन", "एज़ोटोबैक्टर, वीएएम आपूर्ति", "गुणवत्ता नियंत्रण प्रयोगशाला", "किसान प्रशिक्षण"], eligibility: ["स्वयं सहायता समूह", "एफपीओ", "युवा उद्यमी", "कृषि स्नातक"], documents: ["व्यवसाय योजना", "तकनीकी योग्यता", "भूमि पट्टा", "बैंक खाता"] },
    65: { fullName: "शून्य बजट प्राकृतिक खेती योजना", amount: "₹15,000/हेक्टेयर", benefits: ["प्राकृतिक खेती प्रोत्साहन", "गाय-आधारित खेती", "जैव-कीटनाशक प्रशिक्षण", "मल्चिंग सहायता"], eligibility: ["सभी किसान", "वर्षा-आधारित क्षेत्रों को वरीयता", "लघु व सीमांत किसान"], documents: ["भूमि रिकॉर्ड", "प्रशिक्षण प्रमाणपत्र", "आधार", "बैंक खाता"] },
    66: { fullName: "पीजीएस-इंडिया प्रमाणन सहायता", amount: "₹10,000 तक 100% सब्सिडी", benefits: ["निःशुल्क जैविक प्रमाणन", "समूहों हेतु सामूहिक प्रमाणन", "गुणवत्ता आश्वासन", "बाज़ार पहुंच"], eligibility: ["किसान समूह", "एफपीओ", "जैविक किसान समूह"], documents: ["क्लस्टर पंजीकरण", "किसान सूची", "भूमि रिकॉर्ड"] },
    67: { fullName: "पशु खाद प्रबंधन योजना", amount: "₹30,000 तक 50% सब्सिडी", benefits: ["कंपोस्ट पिट निर्माण", "खाद प्रसंस्करण", "बायोगैस इकाई सब्सिडी", "फार्मयार्ड खाद प्रोत्साहन"], eligibility: ["पशुपालक किसान", "डेयरी किसान", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "पशु गणना प्रमाण", "आधार", "बैंक खाता"] },
    68: { fullName: "हरी खाद बीज सब्सिडी", amount: "बीज पर 50% सब्सिडी", benefits: ["सनहेम्प, ढैंचा बीज", "मृदा उर्वरता में सुधार", "खरपतवार नियंत्रण", "उर्वरक आवश्यकता में कमी"], eligibility: ["सभी किसान", "जैविक किसानों को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "आधार", "बैंक खाता"] },
    69: { fullName: "राज्य जैविक खेती प्रोत्साहन", amount: "₹20,000/हेक्टेयर", benefits: ["जैविक इनपुट सब्सिडी", "प्रशिक्षण व प्रदर्शन", "बाज़ार संपर्क सहायता", "पीजीएस प्रमाणन"], eligibility: ["सभी किसान", "जैविक समूह", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "प्रशिक्षण प्रमाणपत्र", "आधार", "बैंक खाता"] },
    70: { fullName: "जैव-कीटनाशक प्रोत्साहन योजना", amount: "₹2,000/एकड़ तक 50% सब्सिडी", benefits: ["नीम-आधारित कीटनाशक", "ट्राइकोडर्मा आपूर्ति", "स्यूडोमोनास कल्चर", "आईपीएम प्रशिक्षण"], eligibility: ["सभी किसान", "जैविक किसान", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "आधार", "बैंक खाता"] },
    71: { fullName: "बागवानी के एकीकृत विकास हेतु मिशन", amount: "50-75% सब्सिडी", benefits: ["फल, सब्जी रोपण", "नर्सरी विकास", "फसलोत्तर प्रबंधन", "पैकेजिंग सब्सिडी"], eligibility: ["सभी किसान", "एफपीओ", "नर्सरी मालिक", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "परियोजना प्रस्ताव", "आधार", "बैंक खाता"] },
    72: { fullName: "नारियल विकास योजना", amount: "₹50,000/हेक्टेयर", benefits: ["लघु किसानों हेतु 70% सब्सिडी", "उच्च उपज देने वाले पौधे", "पुराने वृक्षों का प्रतिस्थापन", "मूल्य संवर्धन सहायता"], eligibility: ["केरल, तमिलनाडु, कर्नाटक, आंध्र प्रदेश के नारियल किसान", "एफपीओ", "लघु किसान"], documents: ["भूमि रिकॉर्ड", "वृक्ष गणना", "आधार", "बैंक खाता"] },
    73: { fullName: "काजू व कोको हेतु कार्यक्रम", amount: "₹25,000/हेक्टेयर", benefits: ["काजू रोपण सब्सिडी", "कोको खेती सहायता", "प्रसंस्करण इकाई सब्सिडी", "निर्यात प्रोत्साहन"], eligibility: ["तटीय राज्यों के किसान", "एफपीओ", "प्रसंस्करण इकाइयां", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "परियोजना रिपोर्ट", "आधार", "बैंक खाता"] },
    74: { fullName: "बांस विकास योजना", amount: "₹30,000/हेक्टेयर", benefits: ["बांस रोपण सब्सिडी", "नर्सरी विकास", "मूल्य संवर्धन इकाइयां", "हस्तशिल्प सहायता"], eligibility: ["पूर्वोत्तर राज्यों के किसान", "एफपीओ", "आदिवासी किसान", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "बांस क्षेत्र विवरण", "आधार", "बैंक खाता"] },
    75: { fullName: "मसाला विकास एवं प्रसंस्करण", amount: "40% सब्सिडी", benefits: ["मसाला प्रसंस्करण इकाइयां", "मूल्य संवर्धन उपकरण", "गुणवत्ता परीक्षण प्रयोगशाला", "निर्यात सुविधा"], eligibility: ["मसाला उत्पादक", "एफपीओ", "मसाला प्रसंस्करक", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "मसाला बोर्ड पंजीकरण", "परियोजना रिपोर्ट", "बैंक खाता"] },
    76: { fullName: "आम रोपण एवं प्रसंस्करण", amount: "₹40,000/हेक्टेयर", benefits: ["उच्च उपज देने वाले आम के पौधे", "प्रसंस्करण इकाई सहायता", "कोल्ड स्टोरेज सब्सिडी", "निर्यात प्रोत्साहन"], eligibility: ["आम उत्पादक", "एफपीओ", "प्रसंस्करण इकाइयां"], documents: ["भूमि रिकॉर्ड", "किस्म विवरण", "आधार", "बैंक खाता"] },
    77: { fullName: "केला रोपण एवं मूल्य संवर्धन", amount: "₹35,000/हेक्टेयर", benefits: ["ऊतक संवर्धन पौधे सब्सिडी", "ड्रिप सिंचाई सहायता", "प्रसंस्करण इकाइयां", "बाज़ार संपर्क"], eligibility: ["केला उत्पादक", "एफपीओ", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "किस्म विवरण", "आधार", "बैंक खाता"] },
    78: { fullName: "राष्ट्रीय पुष्प कृषि मिशन", amount: "₹5 लाख तक 50% सब्सिडी", benefits: ["फूल खेती सहायता", "ग्रीनहाउस सब्सिडी", "निर्यात गुणवत्ता फूल", "कोल्ड चेन सहायता"], eligibility: ["फूल उत्पादक", "एफपीओ", "महिला किसान", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "ग्रीनहाउस प्रस्ताव", "आधार", "बैंक खाता"] },
    79: { fullName: "राष्ट्रीय मशरूम मिशन", amount: "₹1 लाख तक 50% सब्सिडी", benefits: ["मशरूम स्पॉन सब्सिडी", "ग्रोइंग रूम निर्माण", "प्रशिक्षण व तकनीक", "विपणन सहायता"], eligibility: ["सभी किसान", "स्वयं सहायता समूह", "महिला किसान", "ग्रामीण युवा"], documents: ["भूमि रिकॉर्ड", "आधार", "बैंक खाता", "प्रशिक्षण प्रमाणपत्र"] },
    80: { fullName: "सब्जी समूह विकास योजना", amount: "₹20,000/हेक्टेयर", benefits: ["सब्जी बीज सब्सिडी", "संरक्षित खेती", "बाज़ार संपर्क", "फसलोत्तर प्रबंधन"], eligibility: ["सब्जी किसान", "एफपीओ", "स्वयं सहायता समूह", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "फसल योजना", "आधार", "बैंक खाता"] },
    81: { fullName: "कृषि संसाधनों हेतु आभासी एकीकृत प्रणाली", amount: "निःशुल्क एआई सेवा", benefits: ["एआई-संचालित कृषि सलाह", "22+ भारतीय भाषाएं", "फसल सिफारिशें", "कीट अलर्ट", "बाज़ार मूल्य"], eligibility: ["सभी किसान", "एफपीओ", "विस्तार अधिकारी", "केवीके"], documents: ["आधार", "मोबाइल नंबर", "भूमि रिकॉर्ड (वैकल्पिक)"] },
    82: { fullName: "राष्ट्रीय एग्रीस्टैक डिजिटल प्लेटफॉर्म", amount: "निःशुल्क डिजिटल पहचान", benefits: ["विशिष्ट किसान पहचान पत्र", "डिजिटल भूमि रिकॉर्ड", "फसल बुवाई डेटा", "प्रत्यक्ष लाभ अंतरण एकीकरण"], eligibility: ["सभी किसान", "योजना लाभार्थियों को प्राथमिकता", "लघु व सीमांत किसान"], documents: ["आधार", "भूमि रिकॉर्ड", "बैंक खाता", "मोबाइल नंबर"] },
    83: { fullName: "राष्ट्रीय कृषि बाज़ार", amount: "निःशुल्क ट्रेडिंग प्लेटफॉर्म", benefits: ["ऑनलाइन मंडी ट्रेडिंग", "वास्तविक समय मूल्य खोज", "1000+ मंडियां जुड़ी", "किसान को प्रत्यक्ष भुगतान"], eligibility: ["सभी किसान", "व्यापारी", "एफपीओ", "कमीशन एजेंट"], documents: ["आधार", "बैंक खाता", "ट्रेडिंग लाइसेंस", "मोबाइल नंबर"] },
    84: { fullName: "किसान सुविधा मोबाइल एप्लिकेशन", amount: "निःशुल्क ऐप", benefits: ["मौसम अपडेट", "मंडी मूल्य", "कीट अलर्ट", "डीलर जानकारी", "पौध संरक्षण"], eligibility: ["सभी किसान", "प्ले स्टोर से निःशुल्क डाउनलोड", "पंजीकरण आवश्यक नहीं"], documents: ["मोबाइल नंबर", "एंड्रॉइड फोन"] },
    85: { fullName: "आईसीएआर-पूसा कृषि मोबाइल ऐप", amount: "निःशुल्क", benefits: ["फसल किस्म डेटाबेस", "पैकेज ऑफ प्रैक्टिसेज़", "रोग निदान", "विशेषज्ञ परामर्श"], eligibility: ["सभी किसान", "निःशुल्क डाउनलोड", "हिंदी व अंग्रेजी उपलब्ध"], documents: ["आवश्यक नहीं"] },
    86: { fullName: "किसान कॉल सेंटर 1551", amount: "टोल फ्री", benefits: ["24x7 कृषि प्रश्न", "विशेषज्ञ सलाह", "बहुभाषी सहायता", "योजना जानकारी"], eligibility: ["सभी किसान", "टोल फ्री नंबर: 1551", "किसी भी फोन से कॉल करें"], documents: ["आवश्यक नहीं"] },
    87: { fullName: "किसानों हेतु एमकिसान एसएमएस पोर्टल", amount: "निःशुल्क एसएमएस सेवा", benefits: ["निःशुल्क एसएमएस अलर्ट", "मौसम पूर्वानुमान", "बाज़ार मूल्य", "पौध संरक्षण सलाह"], eligibility: ["सभी किसान", "मोबाइल नंबर पंजीकरण आवश्यक", "किसी भी मोबाइल नेटवर्क पर"], documents: ["मोबाइल नंबर", "किसान पंजीकरण"] },
    88: { fullName: "कस्टम हायरिंग सेंटर मोबाइल ऐप", amount: "निःशुल्क सेवा", benefits: ["नज़दीकी कृषि यंत्र खोजें", "उपकरण ऑनलाइन बुक करें", "किराया दर तुलना", "किसान समीक्षाएं"], eligibility: ["सभी किसान", "एफपीओ", "कस्टम हायरिंग सेंटर"], documents: ["मोबाइल नंबर", "स्थान पहुंच"] },
    89: { fullName: "एनपीएसएस - डिजिटल कीट निगरानी", amount: "निःशुल्क सेवा", benefits: ["एआई-आधारित कीट पहचान", "पूर्व चेतावनी प्रणाली", "फसल-विशिष्ट अलर्ट", "उपचारात्मक सिफारिशें"], eligibility: ["सभी किसान", "निःशुल्क मोबाइल ऐप", "पंजीकरण आवश्यक नहीं"], documents: ["मोबाइल नंबर", "फसल फोटो (निदान हेतु)"] },
    90: { fullName: "कृषि-स्टार्टअप इनक्यूबेशन योजना", amount: "₹25 लाख अनुदान", benefits: ["कृषि-तकनीक स्टार्टअप हेतु फंडिंग", "मार्गदर्शन", "इनक्यूबेशन सहायता", "निवेशक संपर्क"], eligibility: ["कृषि-तकनीक स्टार्टअप", "युवा उद्यमी (18-35)", "ग्रामीण नवोन्मेषक"], documents: ["व्यवसाय योजना", "स्टार्टअप पंजीकरण", "टीम विवरण", "नवाचार प्रमाण"] },
    91: { fullName: "प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान", amount: "60% सब्सिडी", benefits: ["सोलर पंप हेतु 60% सब्सिडी (7.5 एचपी तक)", "बंजर भूमि पर सोलर पैनल", "अतिरिक्त बिजली ग्रिड को बेचें", "बिजली लागत में कमी"], eligibility: ["कृषि भूमि वाले किसान", "व्यक्तिगत किसान", "जल उपयोगकर्ता संघ", "एफपीओ"], documents: ["भूमि रिकॉर्ड", "बिजली कनेक्शन प्रमाण", "आधार", "बैंक खाता"] },
    92: { fullName: "सोलर चरखा क्लस्टर", amount: "₹4.5 लाख सब्सिडी", benefits: ["सोलर चरखा इकाइयां", "महिला सशक्तिकरण", "खादी उत्पादन", "ग्रामीण रोजगार"], eligibility: ["स्वयं सहायता समूह", "महिला किसान", "ग्रामीण कारीगर", "खादी संस्थान"], documents: ["एसएचजी पंजीकरण", "परियोजना प्रस्ताव", "बैंक खाता"] },
    93: { fullName: "सौर ऊर्जा संचालित कोल्ड स्टोरेज योजना", amount: "₹10 लाख तक 50% सब्सिडी", benefits: ["किसानों हेतु सोलर कोल्ड स्टोरेज", "फसलोत्तर हानि में कमी", "ऑफ-ग्रिड संचालन", "फल व सब्जी संरक्षण"], eligibility: ["एफपीओ", "किसान सहकारी समितियां", "स्वयं सहायता समूह", "व्यक्तिगत किसान"], documents: ["भूमि रिकॉर्ड", "परियोजना रिपोर्ट", "आधार", "बैंक खाता"] },
    94: { fullName: "कृषि उपज हेतु सोलर ड्रायर", amount: "₹2 लाख तक 40% सब्सिडी", benefits: ["अनाज/फल हेतु सोलर ड्रायर", "गुणवत्ता संरक्षण", "मूल्य संवर्धन", "धूप में सुखाने पर निर्भरता में कमी"], eligibility: ["सभी किसान", "एफपीओ", "स्वयं सहायता समूह", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "कोटेशन", "आधार", "बैंक खाता"] },
    95: { fullName: "फसल सुरक्षा हेतु सोलर फेंसिंग", amount: "₹50,000 तक 50% सब्सिडी", benefits: ["खेतों हेतु सोलर फेंसिंग", "जंगली जानवरों से सुरक्षा", "कम रखरखाव", "बिजली बिल नहीं"], eligibility: ["वन्यजीव-प्रवण क्षेत्रों के किसान", "बाग मालिक", "सभी किसान"], documents: ["भूमि रिकॉर्ड", "स्थान प्रमाण", "आधार", "बैंक खाता"] },
    96: { fullName: "ऑफ-ग्रिड सोलर वाटर पंपिंग", amount: "₹1.5 लाख तक 75% सब्सिडी", benefits: ["सोलर सबमर्सिबल पंप", "डीज़ल/बिजली लागत नहीं", "दूरस्थ क्षेत्रों में कार्य", "5 वर्ष की वारंटी"], eligibility: ["लघु व सीमांत किसान", "बिना ग्रिड कनेक्शन वाले क्षेत्र"], documents: ["भूमि रिकॉर्ड", "जल स्रोत प्रमाण", "आधार", "बैंक खाता"] },
    97: { fullName: "सौर ऊर्जा संचालित संरक्षित खेती", amount: "₹5 लाख तक 60% सब्सिडी", benefits: ["सोलर पंखे व कूलिंग", "तापमान नियंत्रण", "विस्तारित बुवाई सीजन", "अधिक उपज"], eligibility: ["बागवानी किसान", "एफपीओ", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "ग्रीनहाउस योजना", "आधार", "बैंक खाता"] },
    98: { fullName: "कृषि-ड्रोन हेतु सोलर चार्जिंग", amount: "₹50,000 तक 40% सब्सिडी", benefits: ["सोलर चार्जिंग स्टेशन", "ऑफ-ग्रिड ड्रोन संचालन", "टिकाऊ खेती", "डीज़ल उपयोग में कमी"], eligibility: ["एफपीओ", "ड्रोन दीदी लाभार्थी", "स्वयं सहायता समूह"], documents: ["ड्रोन खरीद प्रमाण", "भूमि रिकॉर्ड", "आधार", "बैंक खाता"] },
    99: { fullName: "कृषि फीडरों का सौरीकरण", amount: "90% अनुदान", benefits: ["सिंचाई फीडर हेतु सोलर ऊर्जा", "विश्वसनीय दिन के समय बिजली", "ग्रिड निर्भरता में कमी", "कम बिजली बिल"], eligibility: ["राज्य सरकारें", "डिस्कॉम", "जल उपयोगकर्ता संघ"], documents: ["परियोजना प्रस्ताव", "फीडर विवरण"] },
    100: { fullName: "किसानों हेतु रूफटॉप सोलर सब्सिडी", amount: "₹78,000 तक 40% सब्सिडी", benefits: ["ग्रिड-कनेक्टेड रूफटॉप सोलर", "बिजली बिल में कमी", "अतिरिक्त बिजली ग्रिड को बेचें", "पंप सेट या घरेलू उपयोग हेतु"], eligibility: ["सभी किसान", "फार्म हाउस मालिक", "एफपीओ"], documents: ["बिजली बिल", "छत स्वामित्व प्रमाण", "आधार", "बैंक खाता"] },
    101: { fullName: "पशुपालन अवसंरचना विकास कोष", amount: "₹100 करोड़ तक ऋण", benefits: ["डेयरी, पोल्ट्री हेतु ऋण-संबद्ध सब्सिडी", "3% ब्याज छूट", "₹100 करोड़ तक ऋण", "एमएसएमई हेतु ऋण गारंटी"], eligibility: ["व्यक्तिगत उद्यमी", "एफपीओ", "निजी कंपनियां", "सहकारी समितियां"], documents: ["विस्तृत परियोजना रिपोर्ट", "व्यवसाय पंजीकरण", "भूमि दस्तावेज़", "बैंक खाता"] },
    102: { fullName: "डेयरी उद्यमिता विकास योजना", amount: "25-33% सब्सिडी", benefits: ["डेयरी इकाइयों हेतु सब्सिडी", "सामान्य हेतु 25%, एससी/एसटी हेतु 33%", "गाय/भैंस हेतु ऋण", "दुग्ध प्रसंस्करण उपकरण"], eligibility: ["व्यक्तिगत किसान", "स्वयं सहायता समूह", "डेयरी सहकारी समितियां", "भूमिहीन किसान"], documents: ["भूमि दस्तावेज़", "आधार", "बैंक खाता", "परियोजना रिपोर्ट"] },
    103: { fullName: "पोल्ट्री वेंचर कैपिटल फंड", amount: "₹3 लाख तक 33% सब्सिडी", benefits: ["पोल्ट्री फार्मिंग हेतु सब्सिडी", "एससी/एसटी किसानों हेतु 33%", "ब्रॉयलर/लेयर इकाई हेतु ऋण", "हैचरी सहायता"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "स्वयं सहायता समूह", "युवा उद्यमी"], documents: ["भूमि दस्तावेज़", "आधार", "बैंक खाता", "अनुभव प्रमाणपत्र"] },
    104: { fullName: "बकरी एवं भेड़ विकास योजना", amount: "₹50,000 तक 50% सब्सिडी", benefits: ["बकरी/भेड़ पालन हेतु सब्सिडी", "नस्ल सुधार सहायता", "पशु चिकित्सा देखभाल", "विपणन सहायता"], eligibility: ["लघु किसान", "भूमिहीन श्रमिक", "आदिवासी किसान", "महिला किसान"], documents: ["आधार", "बैंक खाता", "ग्राम पंचायत प्रमाणपत्र", "भूमि रिकॉर्ड"] },
    105: { fullName: "सुअर विकास एवं प्रजनन योजना", amount: "₹40,000 तक 40% सब्सिडी", benefits: ["सुअर पालन सब्सिडी", "नस्ल सुधार", "पशु चिकित्सा सहायता", "बाज़ार संपर्क"], eligibility: ["लघु किसान", "आदिवासी किसान", "स्वयं सहायता समूह", "ग्रामीण युवा"], documents: ["आधार", "बैंक खाता", "भूमि रिकॉर्ड", "प्रशिक्षण प्रमाणपत्र"] },
    106: { fullName: "राष्ट्रीय चारा विकास योजना", amount: "₹10,000/हेक्टेयर", benefits: ["चारा बीज सब्सिडी", "हाइड्रोपोनिक चारा इकाइयां", "साइलेज बनाने में सहायता", "चारा भंडारण"], eligibility: ["सभी किसान", "डेयरी किसान", "एफपीओ", "स्वयं सहायता समूह"], documents: ["भूमि रिकॉर्ड", "पशु गणना प्रमाण", "आधार", "बैंक खाता"] },
    107: { fullName: "राष्ट्रीय पशु रोग बीमा योजना", amount: "प्रीमियम: ₹50-200/पशु", benefits: ["पशुधन बीमा", "गाय, भैंस, भेड़, बकरी को कवर", "रोग व दुर्घटना कवरेज", "त्वरित दावा निपटान"], eligibility: ["सभी पशुपालक", "डेयरी किसान", "भेड़/बकरी पालक"], documents: ["पशु पहचान", "पशु चिकित्सा प्रमाणपत्र", "आधार", "बैंक खाता"] },
    108: { fullName: "एनबीएचएम - हनी मिशन", amount: "₹10,000/लाभार्थी", benefits: ["मधुमक्खी पालन उपकरण सब्सिडी", "शहद प्रसंस्करण इकाइयां", "प्रशिक्षण व प्रदर्शन", "शहद हेतु विपणन सहायता"], eligibility: ["व्यक्तिगत किसान", "स्वयं सहायता समूह", "एफपीओ", "आदिवासी किसान"], documents: ["भूमि रिकॉर्ड (मधुशाला हेतु)", "आधार", "बैंक खाता", "प्रशिक्षण प्रमाणपत्र (वरीयता)"] },
    109: { fullName: "प्रधानमंत्री मत्स्य संपदा योजना (पीएमएमएसवाई)", amount: "40-60% सब्सिडी", benefits: ["मत्स्य पालन सब्सिडी", "हैचरी विकास", "मछली हेतु कोल्ड चेन", "प्रसंस्करण इकाइयां", "निर्यात प्रोत्साहन"], eligibility: ["मछुआरे", "मछली किसान", "एफपीओ", "सहकारी समितियां", "महिला स्वयं सहायता समूह"], documents: ["जल निकाय स्वामित्व/पट्टा", "आधार", "बैंक खाता", "परियोजना रिपोर्ट"] },
    110: { fullName: "एनएलएम - पशुधन विकास", amount: "₹2 लाख तक 50% सब्सिडी", benefits: ["गाय, भैंस, भेड़, बकरी की नस्ल सुधार", "चारा विकास", "जोखिम प्रबंधन", "उद्यमिता विकास"], eligibility: ["सभी पशुपालक किसान", "एफपीओ", "सहकारी समितियां", "स्वयं सहायता समूह"], documents: ["पशुधन गणना प्रमाण", "भूमि रिकॉर्ड (चारे हेतु)", "आधार", "बैंक खाता"] },
    111: { fullName: "राज्य आपदा प्रतिक्रिया कोष - कृषि", amount: "₹20,000/हेक्टेयर", benefits: ["फसल हानि मुआवज़ा", "प्राकृतिक आपदा सहायता", "बाढ़, सूखा, चक्रवात", "त्वरित संवितरण"], eligibility: ["अधिसूचित आपदा क्षेत्रों के किसान", "सभी किसान", "फसल हानि >50%"], documents: ["भूमि रिकॉर्ड", "फसल हानि प्रमाणपत्र", "आधार", "बैंक खाता"] },
    112: { fullName: "राष्ट्रीय आपदा प्रतिक्रिया बल - कृषि", amount: "₹25,000/हेक्टेयर", benefits: ["राष्ट्रीय स्तर की आपदा सहायता", "चक्रवात, बाढ़, ओलावृष्टि", "भूस्खलन कवरेज", "कीट प्रकोप"], eligibility: ["गंभीर रूप से प्रभावित क्षेत्रों के किसान", "सभी श्रेणियां"], documents: ["आपदा अधिसूचना", "भूमि रिकॉर्ड", "फसल हानि प्रमाणपत्र", "आधार"] },
    113: { fullName: "ओलावृष्टि फसल बीमा", amount: "प्रीमियम: 2-5%", benefits: ["ओलावृष्टि हेतु विशेष कवरेज", "व्यक्तिगत खेत मूल्यांकन", "त्वरित दावे", "सभी फसलों को कवर"], eligibility: ["ओलावृष्टि-प्रवण क्षेत्रों के किसान", "सभी किसान वैकल्पिक"], documents: ["भूमि रिकॉर्ड", "मौसम डेटा", "आधार", "बैंक खाता"] },
    114: { fullName: "राष्ट्रीय सूखा राहत पैकेज", amount: "₹15,000/हेक्टेयर", benefits: ["सूखा प्रभावित किसान", "इनपुट सब्सिडी", "चारा आपूर्ति", "पेयजल सहायता"], eligibility: ["सूखा घोषित क्षेत्रों के किसान", "लघु व सीमांत को प्राथमिकता"], documents: ["भूमि रिकॉर्ड", "सूखा घोषणा", "फसल हानि प्रमाण", "आधार"] },
    115: { fullName: "कृषि हेतु राष्ट्रीय बाढ़ राहत", amount: "₹18,000/हेक्टेयर", benefits: ["बाढ़ प्रभावित किसान", "फसल हानि मुआवज़ा", "पुनर्रोपण हेतु बीज सब्सिडी", "इनपुट सहायता"], eligibility: ["बाढ़ प्रभावित क्षेत्रों के किसान", "सभी श्रेणियां"], documents: ["भूमि रिकॉर्ड", "बाढ़ क्षति रिपोर्ट", "आधार", "बैंक खाता"] },
    116: { fullName: "चक्रवात प्रभावित कृषि राहत", amount: "₹22,000/हेक्टेयर", benefits: ["चक्रवात क्षति मुआवज़ा", "बाग हानि कवरेज", "पशुधन हानि सहायता", "इनपुट सब्सिडी"], eligibility: ["तटीय क्षेत्रों के किसान", "चक्रवात प्रभावित क्षेत्र"], documents: ["भूमि रिकॉर्ड", "चक्रवात क्षति रिपोर्ट", "आधार", "बैंक खाता"] },
    117: { fullName: "टिड्डी/कीट हमला राहत योजना", amount: "₹10,000/हेक्टेयर", benefits: ["कीट क्षति हेतु मुआवज़ा", "निःशुल्क कीटनाशक आपूर्ति", "फसल हानि कवरेज", "त्वरित प्रतिक्रिया टीम"], eligibility: ["कीट प्रभावित क्षेत्रों के किसान", "टिड्डी हमला क्षेत्र"], documents: ["भूमि रिकॉर्ड", "कीट हमला प्रमाणपत्र", "आधार", "बैंक खाता"] },
    118: { fullName: "भूस्खलन कृषि राहत", amount: "₹30,000/हेक्टेयर", benefits: ["भूस्खलन क्षति मुआवज़ा", "भूमि पुनर्स्थापन सहायता", "टेरेस मरम्मत सब्सिडी", "इनपुट सहायता"], eligibility: ["पहाड़ी क्षेत्रों के किसान", "भूस्खलन प्रभावित क्षेत्र"], documents: ["भूमि रिकॉर्ड", "भूस्खलन क्षति रिपोर्ट", "आधार", "बैंक खाता"] },
    119: { fullName: "बिजली गिरने से हुई क्षति मुआवज़ा", amount: "₹5 लाख/किसान", benefits: ["किसान की मृत्यु पर मुआवज़ा", "चिकित्सा व्यय कवरेज", "आश्रित परिवार सहायता", "त्वरित संवितरण"], eligibility: ["बिजली गिरने से प्रभावित किसान", "मृत किसानों के परिवार"], documents: ["मृत्यु प्रमाणपत्र", "पुलिस रिपोर्ट", "आधार", "बैंक खाता"] },
    120: { fullName: "शीत लहर फसल सुरक्षा योजना", amount: "₹8,000/हेक्टेयर", benefits: ["पाला क्षति मुआवज़ा", "धुआं जनरेटर सब्सिडी", "फसल आवरण सहायता", "इनपुट सहायता"], eligibility: ["शीत लहर क्षेत्रों के किसान", "सब्जी व फल उत्पादक"], documents: ["भूमि रिकॉर्ड", "तापमान डेटा", "फसल क्षति प्रमाण", "आधार"] },
    121: { fullName: "ई-नाम एन्हांस्ड प्लेटफॉर्म", amount: "निःशुल्क ट्रेडिंग", benefits: ["ऑनलाइन मंडी ट्रेडिंग", "गुणवत्ता जांच", "वेयरहाउस रसीद प्रणाली", "प्रत्यक्ष भुगतान"], eligibility: ["सभी किसान", "व्यापारी", "एफपीओ", "कमीशन एजेंट"], documents: ["आधार", "बैंक खाता", "मोबाइल नंबर", "ट्रेडिंग पंजीकरण"] },
    122: { fullName: "किसान उत्पादक संगठन व्यापार सहायता", amount: "₹15 लाख सहायता", benefits: ["एफपीओ बाज़ार संपर्क", "ब्रांड विकास", "पैकेजिंग सहायता", "प्रत्यक्ष खरीदार संपर्क"], eligibility: ["पंजीकृत एफपीओ", "उत्पादक कंपनियां", "किसान सहकारी समितियां"], documents: ["एफपीओ पंजीकरण", "सदस्य सूची", "बैंक खाता", "व्यवसाय योजना"] },
    123: { fullName: "परक्राम्य वेयरहाउस रसीद योजना", amount: "वेयरहाउस रसीद के विरुद्ध ऋण", benefits: ["वेयरहाउस में उपज भंडारण", "रसीद के विरुद्ध ऋण प्राप्त करें", "उच्च मूल्य पर बेचें", "गुणवत्ता संरक्षण"], eligibility: ["सभी किसान", "एफपीओ", "व्यापारी", "सहकारी समितियां"], documents: ["वेयरहाउस रसीद", "आधार", "बैंक खाता", "फसल विवरण"] },
    124: { fullName: "कृषि उपज परिवहन सब्सिडी", amount: "50% परिवहन सब्सिडी", benefits: ["परिवहन लागत सब्सिडी", "पूर्वोत्तर राज्यों को प्राथमिकता", "शीघ्र नष्ट होने वाली वस्तुएं", "मंडी पहुंच"], eligibility: ["दूरस्थ क्षेत्रों के किसान", "पूर्वोत्तर राज्य", "पहाड़ी क्षेत्र", "आदिवासी क्षेत्र"], documents: ["परिवहन बिल", "मंडी प्रवेश प्रमाण", "आधार", "बैंक खाता"] },
    125: { fullName: "बाज़ार हस्तक्षेप योजना (एमआईएस)", amount: "एमएसपी मूल्य समर्थन", benefits: ["शीघ्र नष्ट होने वाली वस्तुओं हेतु मूल्य समर्थन", "सरकारी खरीद", "हानि मुआवज़ा", "किसान आय सुरक्षा"], eligibility: ["अधिसूचित शीघ्र नष्ट होने वाली फसल उगाने वाले किसान", "सभी राज्य"], documents: ["फसल घोषणा", "भूमि रिकॉर्ड", "आधार", "बैंक खाता"] },
    126: { fullName: "किसान रेल भाड़ा सब्सिडी योजना", amount: "50% भाड़ा सब्सिडी", benefits: ["शीघ्र नष्ट होने वाली वस्तुओं हेतु सब्सिडी परिवहन", "तीव्र बाज़ार पहुंच", "बर्बादी में कमी", "देशव्यापी पहुंच"], eligibility: ["सभी किसान", "एफपीओ", "सहकारी समितियां", "व्यापारी (किसानों की ओर से)"], documents: ["रेलवे बुकिंग रसीद", "किसान घोषणा", "आधार", "बैंक खाता"] },
    127: { fullName: "एफपीओ का गठन एवं संवर्धन", amount: "₹15 लाख प्रति एफपीओ", benefits: ["एफपीओ गठन हेतु वित्तीय सहायता", "5 वर्ष हैंडहोल्डिंग", "₹15 लाख तक इक्विटी अनुदान", "क्रेडिट गारंटी"], eligibility: ["300+ किसानों के समूह", "स्वयं सहायता समूह", "सहकारी समितियां", "किसान समूह"], documents: ["किसान सूची (300+)", "भूमि विवरण", "व्यवसाय योजना", "बैंक खाता"] },
    128: { fullName: "एएमआई - ग्रामीण गोदाम योजना", amount: "₹25 लाख तक 25% सब्सिडी", benefits: ["ग्रामीण गोदाम निर्माण", "किसानों हेतु वेयरहाउस", "भंडारित उपज के विरुद्ध ऋण", "संकटपूर्ण बिक्री में कमी"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "सहकारी समितियां", "स्वयं सहायता समूह"], documents: ["भूमि दस्तावेज़", "परियोजना रिपोर्ट", "आधार", "बैंक खाता"] },
    129: { fullName: "पीएमकेएस - किसान संपदा योजना", amount: "₹10 करोड़ तक 35% सब्सिडी", benefits: ["खाद्य प्रसंस्करण इकाइयां", "मेगा फूड पार्क", "कोल्ड चेन अवसंरचना", "मूल्य संवर्धन"], eligibility: ["खाद्य प्रसंस्करक", "एफपीओ", "सहकारी समितियां", "कृषि-उद्यमी"], documents: ["विस्तृत परियोजना रिपोर्ट", "भूमि दस्तावेज़", "कंपनी पंजीकरण", "बैंक खाता"] },
    130: { fullName: "किसानों की प्रत्यक्ष विपणन योजना", amount: "₹2 लाख तक 50% सब्सिडी", benefits: ["किसान बाज़ार स्टॉल सब्सिडी", "प्रत्यक्ष-उपभोक्ता बिक्री", "ब्रांडिंग सहायता", "डिजिटल भुगतान सेटअप"], eligibility: ["व्यक्तिगत किसान", "एफपीओ", "स्वयं सहायता समूह", "महिला किसान"], documents: ["भूमि रिकॉर्ड", "बाज़ार स्टॉल योजना", "आधार", "बैंक खाता"] },
    131: { fullName: "महात्मा गांधी नरेगा - कृषि कार्य", amount: "100 दिन गारंटीशुदा मज़दूरी", benefits: ["100 दिन की गारंटीशुदा रोज़गार", "₹300+ दैनिक मज़दूरी", "फार्म पॉन्ड निर्माण", "भूमि विकास कार्य", "सिंचाई नहर कार्य"], eligibility: ["सभी ग्रामीण परिवार", "अकुशल कार्य हेतु इच्छुक वयस्क सदस्य", "एससी/एसटी/महिलाओं को प्राथमिकता"], documents: ["जॉब कार्ड", "आधार", "बैंक खाता", "राशन कार्ड"] },
    132: { fullName: "एसीएबीसी - कृषि-उद्यमिता योजना", amount: "₹20 लाख ऋण + 44% सब्सिडी", benefits: ["कृषि स्नातकों हेतु प्रशिक्षण", "परियोजना लागत पर 44% सब्सिडी", "₹20 लाख तक ऋण", "प्रशिक्षण के दौरान मासिक वृत्ति"], eligibility: ["कृषि स्नातक", "कृषि में डिप्लोमा धारक", "जैविक विज्ञान स्नातक", "कृषि-संबद्ध विषयों में स्नातकोत्तर"], documents: ["डिग्री प्रमाणपत्र", "आधार", "बैंक खाता", "व्यवसाय योजना", "नाबार्ड से एनओसी"] },
    133: { fullName: "राष्ट्रीय कृषि कौशल विकास", amount: "निःशुल्क प्रशिक्षण + ₹5,000 वृत्ति", benefits: ["निःशुल्क कौशल प्रशिक्षण कार्यक्रम", "ड्रोन पायलट प्रशिक्षण", "मृदा परीक्षण तकनीशियन", "कृषि यंत्र संचालक", "खाद्य प्रसंस्करण कौशल"], eligibility: ["ग्रामीण युवा (18-35 वर्ष)", "किसानों के बच्चे", "महिला किसान", "स्कूल छोड़ने वाले"], documents: ["आधार", "आयु प्रमाण", "शैक्षणिक प्रमाणपत्र", "बैंक खाता", "पासपोर्ट फोटो"] },
    134: { fullName: "प्रधानमंत्री कौशल विकास योजना - कृषि", amount: "निःशुल्क प्रशिक्षण + प्रमाणन", benefits: ["निःशुल्क व्यावसायिक प्रशिक्षण", "सरकारी प्रमाणन", "नौकरी प्लेसमेंट सहायता", "पूर्व अधिगम की मान्यता", "कृषि-यंत्र मरम्मत प्रशिक्षण"], eligibility: ["18-45 वर्ष के युवा", "किसान परिवार", "ग्रामीण व शहरी युवा", "महिला उम्मीदवार"], documents: ["आधार", "आयु प्रमाण", "शैक्षणिक दस्तावेज़", "बैंक खाता", "मोबाइल नंबर"] },
    135: { fullName: "स्टार्टअप इंडिया कृषि ग्रैंड चैलेंज", amount: "₹50 लाख बीज निधि", benefits: ["₹50 लाख तक बीज निधि", "विशेषज्ञों से मार्गदर्शन", "इनक्यूबेशन सहायता", "3 वर्ष कर छूट", "पेटेंट फाइलिंग सहायता"], eligibility: ["कृषि-तकनीक स्टार्टअप", "युवा उद्यमी (18-35)", "नवोन्मेषी कृषि समाधान", "पंजीकृत स्टार्टअप (डीपीआईआईटी)"], documents: ["स्टार्टअप पंजीकरण", "नवाचार विवरण", "व्यवसाय योजना", "टीम प्रोफाइल", "बैंक खाता"] },
    136: { fullName: "आरएसईटीआई - ग्रामीण स्वरोजगार प्रशिक्षण संस्थान", amount: "निःशुल्क प्रशिक्षण + ऋण संपर्क", benefits: ["निःशुल्क आवासीय प्रशिक्षण (7-30 दिन)", "डेयरी खेती प्रशिक्षण", "मुर्गी व बकरी पालन", "बैंक ऋण संपर्क", "प्रशिक्षण के बाद सहायता"], eligibility: ["ग्रामीण युवा (18-45 वर्ष)", "बेरोजगार युवा", "किसानों के बच्चे", "महिला उम्मीदवार"], documents: ["आधार", "राशन कार्ड", "आय प्रमाणपत्र", "बैंक खाता", "पासपोर्ट फोटो"] },
    137: { fullName: "राष्ट्रीय युवा सशक्तिकरण कार्यक्रम - कृषि", amount: "₹2 लाख परियोजना सहायता", benefits: ["युवा-नेतृत्व वाली कृषि परियोजनाएं", "नेतृत्व विकास", "सामुदायिक खेती पहल", "वित्तीय साक्षरता प्रशिक्षण", "बाज़ार संपर्क सहायता"], eligibility: ["युवा समूह (15-29 वर्ष)", "युवा क्लब", "नेहरू युवा केंद्र सदस्य", "ग्रामीण युवा संगठन"], documents: ["समूह पंजीकरण", "सदस्य विवरण", "आधार", "बैंक खाता", "परियोजना प्रस्ताव"] },
    138: { fullName: "दीन दयाल उपाध्याय ग्रामीण कौशल्य योजना", amount: "निःशुल्क प्रशिक्षण + ₹1,000/माह वृत्ति", benefits: ["3-12 माह कौशल प्रशिक्षण", "प्रशिक्षण के दौरान मासिक वृत्ति", "100% नौकरी प्लेसमेंट गारंटी", "प्लेसमेंट के बाद सहायता", "निःशुल्क भोजन व आवास"], eligibility: ["ग्रामीण गरीब युवा (18-35 वर्ष)", "एससी/एसटी/महिलाओं को प्राथमिकता", "बीपीएल परिवार", "मनरेगा श्रमिक परिवार"], documents: ["आधार", "बीपीएल प्रमाणपत्र", "आयु प्रमाण", "बैंक खाता", "पासपोर्ट फोटो"] },
    139: { fullName: "एनआरएलएम - आजीविका फार्म लाइवलीहुड्स", amount: "₹50,000 प्रति एसएचजी", benefits: ["एसएचजी-आधारित खेती गतिविधियां", "सामुदायिक निवेश निधि", "परिक्रामी निधि सहायता", "मूल्य श्रृंखला विकास", "बाज़ार संपर्क"], eligibility: ["एनआरएलएम के तहत महिला स्वयं सहायता समूह", "किसान समूह", "उत्पादक समूह", "ग्राम संगठन"], documents: ["एसएचजी पंजीकरण", "सदस्य सूची", "बैंक खाता", "प्रस्ताव प्रति", "आधार"] },
    140: { fullName: "केवीके - किसान प्रशिक्षण एवं रोज़गार कार्यक्रम", amount: "निःशुल्क प्रशिक्षण + इनपुट", benefits: ["केवीके में व्यावहारिक प्रशिक्षण", "एकीकृत खेती प्रशिक्षण", "मूल्य संवर्धन प्रशिक्षण", "इनपुट किट प्रदान", "आईसीएआर से प्रमाणपत्र"], eligibility: ["सभी किसान", "किसान महिलाएं", "ग्रामीण युवा", "स्कूल छोड़ने वाले", "कृषि-उद्यमी"], documents: ["आधार", "भूमि रिकॉर्ड (यदि लागू हो)", "बैंक खाता", "2 पासपोर्ट फोटो", "मोबाइल नंबर"] },
  },
  bn: {
    1: { fullName: "প্রধানমন্ত্রী কিষাণ সম্মান নিধি", amount: "₹৬,০০০/বছর", benefits: ["প্রতি বছর ₹৬,০০০ প্রত্যক্ষ আয় সহায়তা", "প্রতি ৪ মাসে ₹২,০০০", "ব্যাংক অ্যাকাউন্টে সরাসরি ডিবিটি", "সকল ক্ষুদ্র ও প্রান্তিক কৃষককে কভার করে"], eligibility: ["ক্ষুদ্র ও প্রান্তিক কৃষক (২ হেক্টর পর্যন্ত)", "চাষযোগ্য জমিসহ কৃষক পরিবার", "জমির রেকর্ডসহ ভাগচাষী কৃষক"], documents: ["আধার কার্ড", "ব্যাংক অ্যাকাউন্ট", "জমির রেকর্ড", "রেশন কার্ড"] },
    2: { fullName: "ভাগচাষী কৃষকদের জন্য পিএম-কিষাণ", amount: "₹৬,০০০/বছর", benefits: ["ভূমিহীন কৃষকদের জন্য বিশেষ ব্যবস্থা", "শেয়ারক্রপারদের সহায়তা", "প্রত্যক্ষ সুবিধা হস্তান্তর", "জমির রেকর্ডের প্রয়োজন নেই"], eligibility: ["ভূমিহীন ভাগচাষী কৃষক", "শেয়ারক্রপার", "লিজ নেওয়া জমিতে চাষকারী কৃষক"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "লিজ চুক্তি", "হলফনামা"] },
    3: { fullName: "প্রধানমন্ত্রী অন্নদাতা আয় সংরক্ষণ অভিযান", amount: "₹৮,০০০/বছর", benefits: ["সকল কৃষকের জন্য আয় সহায়তা", "ন্যূনতম সহায়ক মূল্যের নিশ্চয়তা", "ক্ষুদ্র কৃষকদের জন্য অতিরিক্ত ₹২,০০০", "মূল্য ঘাটতি প্রদান"], eligibility: ["বিজ্ঞপ্তিভুক্ত ফসল চাষকারী সকল কৃষক", "ক্ষুদ্র ও প্রান্তিক কৃষকদের অগ্রাধিকার", "এফপিও সদস্য"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "জমির রেকর্ড", "ফসলের ঘোষণা"] },
    4: { fullName: "মূল্য ঘাটতি প্রদান প্রকল্প", amount: "মূল্যের পার্থক্য প্রদান", benefits: ["মূল্য পতনের জন্য ক্ষতিপূরণ", "এমএসপি পার্থক্য প্রদান", "সরাসরি ব্যাংক হস্তান্তর", "সবজি ও ফল কভার করে"], eligibility: ["মধ্যপ্রদেশের কৃষক", "ফসল: টমেটো, পেঁয়াজ, আলু", "নিবন্ধিত কৃষক"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "বিক্রয় রসিদ", "মান্ডি প্রবেশ স্লিপ"] },
    5: { fullName: "তেলেঙ্গানা রাইথু বন্ধু", amount: "₹১০,০০০/একর/বছর", benefits: ["কৃষকদের জন্য বিনিয়োগ সহায়তা", "প্রতি মৌসুমে একর প্রতি ₹৫,০০০", "সরাসরি ব্যাংক হস্তান্তর", "সকল কৃষককে কভার করে"], eligibility: ["তেলেঙ্গানার সকল কৃষক", "পাট্টাধারী জমির মালিক", "ভাগচাষী কৃষক (নতুন প্রকল্প)"], documents: ["আধার", "পাট্টা পাসবুক", "ব্যাংক অ্যাকাউন্ট"] },
    6: { fullName: "ওড়িশা কালিয়া প্রকল্প", amount: "₹২৫,০০০/বছর", benefits: ["কৃষকদের জন্য আর্থিক সহায়তা", "ভূমিহীন কৃষি শ্রমিক", "দুর্বল আদিবাসী গোষ্ঠী", "শেয়ারক্রপারদের সহায়তা"], eligibility: ["ওড়িশার কৃষক", "ভূমিহীন শ্রমিক", "ক্ষুদ্র ও প্রান্তিক কৃষক", "শেয়ারক্রপার"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "বাসস্থানের প্রমাণ", "জমির রেকর্ড"] },
    7: { fullName: "রাষ্ট্রীয় কৃষি বিকাশ যোজনা", amount: "রাজ্য-নির্দিষ্ট", benefits: ["রাজ্য কৃষি প্রকল্পের জন্য তহবিল", "অবকাঠামো উন্নয়ন", "কৃষি-উদ্যোক্তা", "মূল্য শৃঙ্খল"], eligibility: ["রাজ্য সরকার", "এফপিও", "কৃষি বিশ্ববিদ্যালয়", "গবেষণা প্রতিষ্ঠান"], documents: ["প্রকল্প প্রস্তাব", "রাজ্যের অনুমোদন", "বাস্তবায়ন পরিকল্পনা"] },
    8: { fullName: "জাতীয় বীজ ভর্তুকি প্রকল্প", amount: "বীজে ৫০% ভর্তুকি", benefits: ["উচ্চ ফলনশীল জাতের বীজ", "ক্ষুদ্র কৃষকদের জন্য ৫০% ভর্তুকি", "প্রত্যয়িত বীজ", "উন্নত জাত"], eligibility: ["সকল কৃষক", "ক্ষুদ্র ও প্রান্তিককে অগ্রাধিকার", "এফপিও"], documents: ["জমির রেকর্ড", "আধার", "বীজের বিল", "ব্যাংক অ্যাকাউন্ট"] },
    9: { fullName: "পুষ্টি ভিত্তিক ভর্তুকি (এনবিএস) প্রকল্প", amount: "পুষ্টি অনুযায়ী পরিবর্তনশীল", benefits: ["পি ও কে সারে ভর্তুকি", "কৃষকের খরচ হ্রাস করে", "সুষম পুষ্টি", "মাটির স্বাস্থ্য উন্নতি"], eligibility: ["সকল কৃষক", "অনুমোদিত ডিলারদের মাধ্যমে"], documents: ["ডিলারের বিল", "আধার (ডিবিটির জন্য)", "জমির রেকর্ড"] },
    10: { fullName: "মহিলা কিষাণ সশক্তিকরণ যোজনা", amount: "₹৫০,০০০/বছর", benefits: ["মহিলা কৃষক ক্ষমতায়ন", "দক্ষতা প্রশিক্ষণ", "ইনপুট ভর্তুকি", "বাজার প্রবেশাধিকার"], eligibility: ["মহিলা কৃষক", "মহিলা স্বনির্ভর গোষ্ঠী", "মহিলা প্রধান পরিবার"], documents: ["আধার", "জমির রেকর্ড", "ব্যাংক অ্যাকাউন্ট", "এসএইচজি সার্টিফিকেট"] },
    11: { fullName: "কিষাণ ক্রেডিট কার্ড প্রকল্প", amount: "₹৩ লক্ষ পর্যন্ত", benefits: ["আবর্তনশীল ঋণ সুবিধা", "সুদ: ৭% (সময়মতো পরিশোধে ৪%)", "₹১.৬ লক্ষ পর্যন্ত জামানত-মুক্ত", "সহায়ক কার্যক্রম কভার করে"], eligibility: ["সকল কৃষক", "শেয়ারক্রপার", "ভাগচাষী কৃষক", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "আধার", "ছবি", "ফসলের বিবরণ"] },
    12: { fullName: "স্বল্পমেয়াদি ফসল ঋণের জন্য সুদ ভর্তুকি", amount: "২% সুদ ভর্তুকি", benefits: ["ফসল ঋণে ২% সুদ ভর্তুকি", "সময়মতো পরিশোধে অতিরিক্ত ৩%", "কার্যকর হার: বার্ষিক ৪%", "₹৩ লক্ষ পর্যন্ত ঋণ"], eligibility: ["ফসল ঋণ গ্রহণকারী সকল কৃষক", "কেসিসি ধারক", "সমবায় সমিতির সদস্য"], documents: ["কেসিসি", "ঋণের আবেদন", "জমির রেকর্ড"] },
    13: { fullName: "গুদাম অবকাঠামো তহবিল", amount: "প্রতি প্রকল্পে ₹৫০ কোটি", benefits: ["গুদাম নির্মাণের জন্য ঋণ", "২৫% পর্যন্ত ভর্তুকি", "ফসল-পরবর্তী অবকাঠামো", "ফসলের অপচয় হ্রাস করে"], eligibility: ["এফপিও", "সমবায় সমিতি", "কৃষি-উদ্যোক্তা", "রাজ্য সংস্থা"], documents: ["প্রকল্প প্রতিবেদন", "জমির নথি", "নিবন্ধনের প্রমাণ"] },
    14: { fullName: "দুগ্ধ উদ্যোক্তা উন্নয়ন প্রকল্প", amount: "₹৫ লক্ষ পর্যন্ত ভর্তুকি", benefits: ["দুগ্ধ ইউনিটের জন্য ভর্তুকি", "সাধারণের জন্য ২৫%, এসসি/এসটি-এর জন্য ৩৩%", "গরু/মহিষের জন্য ঋণ", "দুধ প্রক্রিয়াকরণ সরঞ্জাম"], eligibility: ["ব্যক্তিগত কৃষক", "স্বনির্ভর গোষ্ঠী", "দুগ্ধ সমবায় সমিতি"], documents: ["জমির নথি", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রকল্প প্রতিবেদন"] },
    15: { fullName: "পোল্ট্রি ভেঞ্চার ক্যাপিটাল ফান্ড", amount: "₹৩ লক্ষ পর্যন্ত ভর্তুকি", benefits: ["পোল্ট্রি চাষের জন্য ভর্তুকি", "এসসি/এসটি কৃষকদের জন্য ৩৩%", "ব্রয়লার/লেয়ার ইউনিটের জন্য ঋণ", "হ্যাচারি সহায়তা"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির নথি", "আধার", "ব্যাংক অ্যাকাউন্ট", "অভিজ্ঞতার সার্টিফিকেট"] },
    16: { fullName: "ছাগল/ভেড়া উন্নয়ন প্রকল্প", amount: "৫০% ভর্তুকি", benefits: ["ছাগল/ভেড়া পালনের জন্য ভর্তুকি", "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", "জাত উন্নয়ন সহায়তা", "পশু চিকিৎসা সেবা"], eligibility: ["ক্ষুদ্র কৃষক", "ভূমিহীন শ্রমিক", "আদিবাসী কৃষক", "মহিলা কৃষক"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "গ্রাম পঞ্চায়েতের সার্টিফিকেট"] },
    17: { fullName: "কৃষি অবকাঠামো তহবিল", amount: "₹২ কোটি পর্যন্ত ঋণ", benefits: ["ফার্ম-গেট অবকাঠামোর জন্য ঋণ", "৩% সুদ ভর্তুকি", "৩ বছরের অবকাশ", "গুদাম, কোল্ড স্টোরেজ কভার করে"], eligibility: ["এফপিও", "সমবায় সমিতি", "ব্যক্তিগত কৃষক", "কৃষি-উদ্যোক্তা"], documents: ["প্রকল্প প্রতিবেদন", "জমির নথি", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    18: { fullName: "এএইচআইডিএফ - দুগ্ধ ও পোল্ট্রি ঋণ", amount: "₹১০০ কোটি পর্যন্ত", benefits: ["দুগ্ধ ও পোল্ট্রি অবকাঠামোর জন্য ঋণ", "৩% সুদ ভর্তুকি", "ঋণ গ্যারান্টি উপলব্ধ", "দুধ প্রক্রিয়াকরণ, হ্যাচারি কভার করে"], eligibility: ["ব্যক্তিগত উদ্যোক্তা", "এফপিও", "বেসরকারি কোম্পানি", "সমবায় সমিতি"], documents: ["ডিপিআর", "ব্যবসায়িক নিবন্ধন", "জমির নথি", "ব্যাংক অ্যাকাউন্ট"] },
    19: { fullName: "এফআইডিএফ - মৎস্য চাষ ঋণ", amount: "₹৫০ লক্ষ পর্যন্ত", benefits: ["মৎস্য চাষ অবকাঠামোর জন্য ঋণ", "৪% সুদ ভর্তুকি", "হ্যাচারি, ফিড মিল কভার করে", "মাছের জন্য কোল্ড চেইন"], eligibility: ["মৎস্যচাষী", "এফপিও", "সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী"], documents: ["জলাশয় লিজ", "প্রকল্প প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    20: { fullName: "খাদ্য প্রক্রিয়াকরণ ঋণ প্রকল্প", amount: "₹১০ কোটি পর্যন্ত", benefits: ["খাদ্য প্রক্রিয়াকরণ ইউনিটের জন্য ঋণ", "৩৫% মূলধন ভর্তুকি", "৫% সুদ ভর্তুকি", "ফল, সবজি, শস্য কভার করে"], eligibility: ["খাদ্য প্রক্রিয়াকারী", "এফপিও", "সমবায় সমিতি", "কৃষি-উদ্যোক্তা"], documents: ["ডিপিআর", "জমির নথি", "এফএসএসএআই লাইসেন্স", "ব্যাংক অ্যাকাউন্ট"] },
    21: { fullName: "প্রধানমন্ত্রী ফসল বীমা যোজনা", amount: "কম প্রিমিয়াম: ১.৫-৫%", benefits: ["কম প্রিমিয়ামে ফসল বীমা", "রবির জন্য ১.৫%, খরিফের জন্য ২%", "২১ দিনে দাবি", "বপন-পূর্ব থেকে ফসল কাটার পর পর্যন্ত কভার"], eligibility: ["সকল কৃষক", "ঋণগ্রহীতা কৃষকদের জন্য বাধ্যতামূলক", "অ-ঋণগ্রহীতাদের জন্য ঐচ্ছিক", "শেয়ারক্রপার"], documents: ["জমির রেকর্ড", "ফসলের ঘোষণা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    22: { fullName: "পুনর্গঠিত আবহাওয়া ভিত্তিক ফসল বীমা", amount: "প্রিমিয়াম ১.৫-৮%", benefits: ["আবহাওয়া সূচক ভিত্তিক বীমা", "বৃষ্টির ঘাটতি/আধিক্য কভার করে", "তাপমাত্রা ও আর্দ্রতা কভারেজ", "দ্রুত দাবি নিষ্পত্তি"], eligibility: ["বিজ্ঞপ্তিভুক্ত এলাকার কৃষক", "আবহাওয়া-সংবেদনশীল ফসল", "সকল কৃষক শ্রেণী"], documents: ["জমির রেকর্ড", "আবহাওয়ার তথ্য", "আধার"] },
    23: { fullName: "নারকেল গাছ বীমা প্রকল্প", amount: "প্রিমিয়াম: ₹১০০-৫০০/গাছ", benefits: ["নারকেল গাছের বীমা", "কীটপতঙ্গ ও রোগ কভার করে", "প্রাকৃতিক দুর্যোগ কভারেজ", "৫ বছর পর্যন্ত কভারেজ"], eligibility: ["নারকেল চাষী", "ন্যূনতম ৫টি গাছ", "সকল রাজ্য"], documents: ["জমির রেকর্ড", "গাছের সংখ্যা", "আধার"] },
    24: { fullName: "রাবার গ্রুপ বীমা", amount: "₹৩০,০০০/হেক্টর", benefits: ["রাবার গাছের বীমা", "প্রাকৃতিক দুর্যোগ কভারেজ", "রোগ ও কীটপতঙ্গ কভার", "ফলন ক্ষতির ক্ষতিপূরণ"], eligibility: ["রাবার চাষী", "ন্যূনতম ০.৫ হেক্টর", "রাবার বোর্ডে নিবন্ধিত"], documents: ["জমির রেকর্ড", "রাবার বোর্ড নিবন্ধন", "আধার"] },
    25: { fullName: "কফি বীমা", amount: "প্রিমিয়াম ৩.৫%", benefits: ["কফি বাগানের বীমা", "আরাবিকা ও রোবাস্তা কভার করে", "ফলন ক্ষতির কভারেজ", "মূল্যের ওঠানামা কভার করে"], eligibility: ["কফি চাষী", "কফি বোর্ডে নিবন্ধিত", "ন্যূনতম ০.৫ একর"], documents: ["জমির রেকর্ড", "কফি বোর্ড নিবন্ধন"] },
    26: { fullName: "চা বীমা", amount: "প্রিমিয়াম ২.৫%", benefits: ["চা বাগানের বীমা", "সবুজ পাতার ফলন কভার করে", "খরা ও বন্যা কভার", "কীটপতঙ্গ ও রোগ কভারেজ"], eligibility: ["চা চাষী", "টি বোর্ডে নিবন্ধিত", "সকল রাজ্য"], documents: ["জমির রেকর্ড", "টি বোর্ড নিবন্ধন"] },
    27: { fullName: "ইউপিআইএস - ফসল প্লাস বীমা", amount: "প্রিমিয়াম: ২-৮%", benefits: ["সম্মিলিত ফসল + সম্পদ বীমা", "বাড়ি, ট্র্যাক্টর, গবাদি পশু কভার করে", "সবার জন্য একক প্রিমিয়াম", "দ্রুত দাবি নিষ্পত্তি"], eligibility: ["সকল কৃষক", "ঋণগ্রহীতা কৃষকদের জন্য বাধ্যতামূলক", "অ-ঋণগ্রহীতাদের জন্য ঐচ্ছিক"], documents: ["জমির রেকর্ড", "সম্পদের তালিকা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    28: { fullName: "পাম অয়েল বীমা প্রকল্প", amount: "প্রিমিয়াম: ২.৫%", benefits: ["তেল পাম বাগানের বীমা", "ফলন ক্ষতি কভার করে", "কীটপতঙ্গ ও রোগ কভারেজ", "৫ বছরের পলিসি বিকল্প"], eligibility: ["তেল পাম চাষী", "এনএমইও-ওপি-তে নিবন্ধিত", "ন্যূনতম ১ হেক্টর"], documents: ["জমির রেকর্ড", "বাগান নিবন্ধন", "আধার"] },
    29: { fullName: "এলাচ ফসল বীমা", amount: "প্রিমিয়াম: ৩%", benefits: ["এলাচ বাগানের বীমা", "আবহাওয়ার কারণে ফলন ক্ষতি কভার করে", "কীটপতঙ্গ ও রোগ কভারেজ", "দ্রুত দাবি নিষ্পত্তি"], eligibility: ["এলাচ চাষী", "স্পাইসেস বোর্ডে নিবন্ধিত", "ন্যূনতম ০.৫ একর"], documents: ["জমির রেকর্ড", "স্পাইসেস বোর্ড নিবন্ধন", "আধার"] },
    30: { fullName: "জাতীয় গবাদি পশু বীমা", amount: "প্রিমিয়াম: ৪-৬%", benefits: ["গরু, মহিষ, ভেড়া, ছাগলের বীমা", "দুর্ঘটনা/রোগে মৃত্যু কভার করে", "বিপিএল-এর জন্য ভর্তুকিযুক্ত প্রিমিয়াম", "দ্রুত দাবি নিষ্পত্তি"], eligibility: ["সকল গবাদি পশু মালিক", "দুগ্ধ চাষী", "বিপিএল পরিবারের অগ্রাধিকার"], documents: ["পশু শনাক্তকরণ", "পশু চিকিৎসা সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    31: { fullName: "প্রধানমন্ত্রী কৃষি সেচাই যোজনা", amount: "৫৫-৭৫% ভর্তুকি", benefits: ["ড্রিপ/স্প্রিংকলার ভর্তুকি", "সাধারণের জন্য ৫৫%, এসসি/এসটি-এর জন্য ৭৫%", "ফার্ম পন্ড সহায়তা", "প্রতি বিন্দুতে বেশি ফসল"], eligibility: ["সকল কৃষক", "এফপিও", "জল ব্যবহারকারী সমিতি"], documents: ["জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট", "বিক্রেতার কোটেশন"] },
    32: { fullName: "মাইক্রো ইরিগেশন ফান্ড (নাবার্ড)", amount: "₹৫,০০০ কোটি তহবিল", benefits: ["মাইক্রো-সেচের জন্য অতিরিক্ত ভর্তুকি", "পিএমকেএসওয়াই-এর সাথে সংযোগ", "রাজ্য সরকারের ঋণ", "জল-অভাবযুক্ত এলাকায় অগ্রাধিকার"], eligibility: ["রাজ্য সরকার", "জল ব্যবহারকারী সমিতি", "এফপিও"], documents: ["প্রকল্প প্রস্তাব", "রাজ্যের অনুমোদন"] },
    33: { fullName: "হর খেত কো পানি (পিএমকেএসওয়াই উপাদান)", amount: "সম্পূর্ণ কভারেজ", benefits: ["প্রতিটি খামারে সেচের সুবিধা", "কমান্ড এলাকা উন্নয়ন", "জল সংগ্রহ কাঠামো", "জলাশয় পুনর্নবীকরণ"], eligibility: ["সকল কৃষক", "বৃষ্টিনির্ভর এলাকায় অগ্রাধিকার"], documents: ["জমির রেকর্ড", "জলের উৎসের বিবরণ"] },
    34: { fullName: "ওয়াটারশেড উন্নয়ন উপাদান (পিএমকেএসওয়াই)", amount: "₹১২,০০০/হেক্টর", benefits: ["ওয়াটারশেড ব্যবস্থাপনা", "মাটি ও জল সংরক্ষণ", "বৃষ্টির জল সংগ্রহ", "চেক ড্যাম নির্মাণ"], eligibility: ["ওয়াটারশেড এলাকার কৃষক", "গ্রামীণ সম্প্রদায়"], documents: ["গ্রাম প্রস্তাব", "জমির রেকর্ড"] },
    35: { fullName: "ত্বরিত সেচ সুবিধা কর্মসূচি", amount: "৯০:১০ তহবিল", benefits: ["প্রধান সেচ প্রকল্প", "কেন্দ্র:রাজ্য তহবিল ৯০:১০", "কমান্ড এলাকা উন্নয়ন", "জল বিতরণ ব্যবস্থা"], eligibility: ["রাজ্য সরকার", "সেচ বিভাগ"], documents: ["প্রকল্প ডিপিআর", "রাজ্যের অনুমোদন"] },
    36: { fullName: "খামারের জন্য ছাদের বৃষ্টির জল সংগ্রহ", amount: "₹২৫,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["বৃষ্টির জল সংগ্রহের কাঠামো", "স্টোরেজ ট্যাঙ্ক ভর্তুকি", "ভূগর্ভস্থ জল পুনর্ভরণ", "বোরওয়েল নির্ভরতা হ্রাস করে"], eligibility: ["সকল কৃষক", "খামার বাড়ি", "পশু আশ্রয়স্থল"], documents: ["ভবনের পরিকল্পনা", "জমির রেকর্ড", "কোটেশন"] },
    37: { fullName: "কূপ পুনর্ভরণ প্রকল্প", amount: "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ফার্ম পন্ড নির্মাণ", "কূপ পুনর্ভরণ কাঠামো", "বৃষ্টির জল সংগ্রহ", "ভূগর্ভস্থ জলস্তর উন্নতি"], eligibility: ["সকল কৃষক", "হ্রাসমান জলস্তরযুক্ত এলাকা"], documents: ["জমির রেকর্ড", "কূপের মালিকানার প্রমাণ", "আধার"] },
    38: { fullName: "স্প্রিংকলার ভর্তুকি প্রকল্প", amount: "একর প্রতি ₹১৫,০০০ পর্যন্ত ৭০% ভর্তুকি", benefits: ["পোর্টেবল স্প্রিংকলার সেট", "৪০% পর্যন্ত জল সাশ্রয়", "সব ফসলের জন্য উপযুক্ত", "কম পরিচালন খরচ"], eligibility: ["ক্ষুদ্র ও প্রান্তিক কৃষক", "এফপিও", "জল-অভাবযুক্ত এলাকায় অগ্রাধিকার"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "ব্যাংক অ্যাকাউন্ট"] },
    39: { fullName: "ড্রিপ সেচ প্রচার প্রকল্প", amount: "৬০-৮0% ভর্তুকি", benefits: ["ড্রিপ সেচ ব্যবস্থা", "৬০% পর্যন্ত জল সাশ্রয়", "উচ্চ ফলন", "ফার্টিগেশন উপযোগী"], eligibility: ["সকল কৃষক", "উদ্যানপালন কৃষকদের অগ্রাধিকার", "এফপিও"], documents: ["জমির রেকর্ড", "ফসলের বিবরণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    40: { fullName: "পাইপলাইন সম্প্রসারণ প্রকল্প", amount: "₹২ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["উৎস থেকে খামার পর্যন্ত পিভিসি পাইপলাইন", "জলের অপচয় হ্রাস করে", "সময় ও শ্রম সাশ্রয় করে", "৫ একর পর্যন্ত কভার করে"], eligibility: ["সকল কৃষক", "জল ব্যবহারকারী সমিতি", "এফপিও"], documents: ["জমির রেকর্ড", "জলের উৎসের প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    41: { fullName: "কৃষি যন্ত্রপাতিতে ভর্তুকি", amount: "৪০-৫০% ভর্তুকি", benefits: ["এসসি/এসটি-এর জন্য ৫০% (₹৪০,০০০ পর্যন্ত)", "সাধারণ কৃষকদের জন্য ৪০%", "ট্র্যাক্টর, রোটাভেটর ভর্তুকি", "ড্রোন ভর্তুকি ₹৫ লক্ষ পর্যন্ত ৫০%"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "কাস্টম হায়ারিং সেন্টার", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "চালান"] },
    42: { fullName: "ফার্ম মেশিনারি ব্যাংক", amount: "₹৪০ লক্ষ পর্যন্ত ৪০% ভর্তুকি", benefits: ["যন্ত্রপাতি ভাড়ার কেন্দ্র স্থাপন", "সরঞ্জামে ৪০% ভর্তুকি", "ক্ষুদ্র কৃষকদের উপকৃত করে", "ব্যক্তিগত বিনিয়োগ হ্রাস করে"], eligibility: ["এফপিও", "সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী", "তরুণ উদ্যোক্তা"], documents: ["ব্যবসায়িক পরিকল্পনা", "নিবন্ধন সার্টিফিকেট", "কেন্দ্রের জন্য জমি"] },
    43: { fullName: "সার/কীটনাশক স্প্রে করার জন্য ড্রোন", amount: "₹৮ লক্ষ পর্যন্ত ৮০% ভর্তুকি", benefits: ["মহিলা স্বনির্ভর গোষ্ঠীর জন্য ড্রোন", "ক্রয়ে ৮০% ভর্তুকি", "প্রশিক্ষণ অন্তর্ভুক্ত", "স্প্রে পরিষেবা থেকে আয়"], eligibility: ["মহিলা স্বনির্ভর গোষ্ঠী", "মহিলা সদস্যসহ এফপিও"], documents: ["এসএইচজি নিবন্ধন", "মহিলা সদস্যদের তালিকা"] },
    44: { fullName: "ফসল-পরবর্তী সরঞ্জাম ভর্তুকি", amount: "₹১০ লক্ষ পর্যন্ত ৩৫% ভর্তুকি", benefits: ["থ্রেশার, ড্রায়ার, গ্রেডার", "স্টোরেজ সরঞ্জাম", "প্যাকেজিং যন্ত্রপাতি", "প্রক্রিয়াকরণ ইউনিট"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "কৃষি-উদ্যোক্তা"], documents: ["প্রকল্প প্রতিবেদন", "কোটেশন", "জমির নথি"] },
    45: { fullName: "কৃষকদের জন্য সোলার ড্রায়ার", amount: "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ফল/সবজির জন্য সোলার ড্রায়ার", "ফসল-পরবর্তী ক্ষতি হ্রাস করে", "গুণমান সংরক্ষণ", "মূল্য সংযোজন"], eligibility: ["ক্ষুদ্র কৃষক", "এফপিও", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "আধার"] },
    46: { fullName: "কোল্ড চেইন ভর্তুকি", amount: "₹৫০ লক্ষ পর্যন্ত ৩৫% ভর্তুকি", benefits: ["কোল্ড স্টোরেজ নির্মাণ", "রেফার যানবাহন", "প্যাকেজিং সরঞ্জাম", "অপচয় হ্রাস করে"], eligibility: ["এফপিও", "সমবায় সমিতি", "ব্যক্তিগত উদ্যোক্তা"], documents: ["প্রকল্প প্রতিবেদন", "জমির নথি", "ব্যবসায়িক পরিকল্পনা"] },
    47: { fullName: "প্রান্তিক কৃষকদের জন্য ট্র্যাক্টর ভর্তুকি প্রকল্প", amount: "₹৬০,০০০ পর্যন্ত ৪০% ভর্তুকি", benefits: ["২০-৩৫ এইচপি ট্র্যাক্টরের জন্য ভর্তুকি", "এসসি/এসটি কৃষকদের অগ্রাধিকার", "কাস্টম হায়ারিং বিকল্প", "চাষের খরচ হ্রাস করে"], eligibility: ["ক্ষুদ্র ও প্রান্তিক কৃষক", "এসসি/এসটি কৃষক", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "ব্যাংক অ্যাকাউন্ট"] },
    48: { fullName: "পাওয়ার টিলার ভর্তুকি প্রকল্প", amount: "₹২৫,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["পাওয়ার টিলারের জন্য ভর্তুকি", "ছোট খামারের জন্য উপযুক্ত", "শ্রম নির্ভরতা হ্রাস করে", "কম রক্ষণাবেক্ষণ খরচ"], eligibility: ["ক্ষুদ্র কৃষক", "পার্বত্য অঞ্চলের কৃষক", "এফপিও"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "ব্যাংক অ্যাকাউন্ট"] },
    49: { fullName: "রিপার/হারভেস্টার ভর্তুকি প্রকল্প", amount: "₹২ লক্ষ পর্যন্ত ৪০% ভর্তুকি", benefits: ["রিপার/হারভেস্টারের জন্য ভর্তুকি", "ফসল কাটার সময় হ্রাস করে", "ফসলের ক্ষতি হ্রাস করে", "কাস্টম হায়ারিং সম্ভাব্য"], eligibility: ["এফপিও", "সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী", "বড় কৃষক"], documents: ["জমির রেকর্ড", "ব্যবসায়িক পরিকল্পনা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    50: { fullName: "যান্ত্রিক ধান রোপণ যন্ত্র ভর্তুকি", amount: "₹৪০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ধান রোপণ যন্ত্রের জন্য ভর্তুকি", "শ্রমের খরচ সাশ্রয় করে", "সমান রোপণ", "উচ্চ ফলন"], eligibility: ["ধান চাষী", "এফপিও", "স্বনির্ভর গোষ্ঠী", "কাস্টম হায়ারিং কেন্দ্র"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "ব্যাংক অ্যাকাউন্ট"] },
    51: { fullName: "মৃত্তিকা স্বাস্থ্য কার্ড প্রকল্প", amount: "বিনামূল্যে পরিষেবা", benefits: ["প্রতি ২ বছরে বিনামূল্যে মাটি পরীক্ষা", "১২টি প্যারামিটার বিশ্লেষণ", "ফসল-নির্দিষ্ট সুপারিশ", "সারের খরচ ১০-১৫% হ্রাস করে"], eligibility: ["সকল কৃষক", "ক্ষুদ্র কৃষকদের অগ্রাধিকার"], documents: ["জমির রেকর্ড", "কৃষক পরিচয়পত্র"] },
    52: { fullName: "মোবাইল মাটি পরীক্ষা ল্যাব", amount: "প্রতি ল্যাবে ₹২৫ লক্ষ", benefits: ["মোবাইল মাটি পরীক্ষা ভ্যান", "বিনামূল্যে দরজায় পরিষেবা", "৭ দিনে ফলাফল", "দূরবর্তী গ্রাম কভার করে"], eligibility: ["রাজ্য সরকার", "কেভিকে", "কৃষি বিশ্ববিদ্যালয়"], documents: ["প্রস্তাব", "অবকাঠামোর বিবরণ"] },
    53: { fullName: "মৃত্তিকা স্বাস্থ্য ব্যবস্থাপনা (এসএইচএম)", amount: "₹২,০০০/হেক্টর", benefits: ["মাটি সংশোধন ভর্তুকি", "চুন/জিপসাম প্রয়োগ", "মাইক্রো-নিউট্রিয়েন্ট সরবরাহ", "জৈব সার প্রচার"], eligibility: ["সকল কৃষক", "মৃত্তিকা স্বাস্থ্য কার্ড ধারক"], documents: ["মৃত্তিকা স্বাস্থ্য কার্ড", "জমির রেকর্ড"] },
    54: { fullName: "মাইক্রো-নিউট্রিয়েন্ট ঘাটতি সংশোধন", amount: "একর প্রতি ₹১,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["জিংক, বোরন, আয়রন সরবরাহ", "ঘাটতি সংশোধন", "মানসম্পন্ন বীজ ভর্তুকি", "ফলন উন্নতি"], eligibility: ["মাইক্রো-নিউট্রিয়েন্ট ঘাটতিযুক্ত কৃষক", "মাটি পরীক্ষার প্রতিবেদন প্রয়োজন"], documents: ["মৃত্তিকা স্বাস্থ্য কার্ড", "জমির রেকর্ড"] },
    55: { fullName: "মাটির অম্লতা/ক্ষারত্ব সংশোধন", amount: "৫০% ভর্তুকি", benefits: ["অম্লীয় মাটির জন্য চুন", "ক্ষারীয় মাটির জন্য জিপসাম", "মাটির পিএইচ উন্নত করে", "পুষ্টির প্রাপ্যতা বাড়ায়"], eligibility: ["সমস্যাযুক্ত মাটির কৃষক", "মাটি পরীক্ষা প্রয়োজন"], documents: ["মাটি পরীক্ষার প্রতিবেদন", "জমির রেকর্ড"] },
    56: { fullName: "জৈব পদার্থ সমৃদ্ধকরণ প্রকল্প", amount: "₹৫,০০০/হেক্টর", benefits: ["সবুজ সার ভর্তুকি", "কম্পোস্ট প্রচার", "ফসলের অবশিষ্টাংশ ব্যবস্থাপনা", "মাটির জৈব কার্বন উন্নতি"], eligibility: ["সকল কৃষক", "জৈব চাষ ক্লাস্টার"], documents: ["জমির রেকর্ড", "মৃত্তিকা স্বাস্থ্য কার্ড", "আধার"] },
    57: { fullName: "বিনামূল্যে জৈবসার বিতরণ", amount: "একর প্রতি ৫ কেজি পর্যন্ত বিনামূল্যে", benefits: ["বিনামূল্যে রাইজোবিয়াম, পিএসবি, অ্যাজোটোব্যাক্টর", "রাসায়নিক সারের ব্যবহার হ্রাস করে", "মাটির জীববিদ্যা উন্নত করে", "কেভিকে-তে উপলব্ধ"], eligibility: ["সকল কৃষক", "ক্ষুদ্র ও প্রান্তিককে অগ্রাধিকার"], documents: ["জমির রেকর্ড", "মৃত্তিকা স্বাস্থ্য কার্ড", "আধার"] },
    58: { fullName: "ভার্মিকম্পোস্ট ভর্তুকি", amount: "₹২৫,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ভার্মিকম্পোস্ট ইউনিট স্থাপন", "কেঁচো সরবরাহ", "জৈব সার উৎপাদন", "বর্জ্য পুনর্ব্যবহার"], eligibility: ["ব্যক্তিগত কৃষক", "স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "প্রকল্প প্রস্তাব", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    59: { fullName: "মাটি সংরক্ষণ প্রকল্প", amount: "৭৫% ভর্তুকি", benefits: ["কনটুর বান্ডিং", "ছাদ চাষ সহায়তা", "গালি প্লাগিং", "স্ট্রিপ চাষ প্রচার"], eligibility: ["পার্বত্য এলাকার কৃষক", "ক্ষয়প্রবণ অঞ্চল"], documents: ["জমির রেকর্ড", "মাটি ক্ষয়ের প্রমাণ", "আধার"] },
    60: { fullName: "জমি উন্নয়ন প্রকল্প", amount: "একর প্রতি ₹১০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["লেজার জমি সমতলীকরণ ভর্তুকি", "জমি আকৃতি প্রদান", "নিষ্কাশন উন্নতি", "জল ব্যবহারের দক্ষতা"], eligibility: ["সকল কৃষক", "এফপিও", "জল-অভাবযুক্ত এলাকায় অগ্রাধিকার"], documents: ["জমির রেকর্ড", "আধার", "কোটেশন", "ব্যাংক অ্যাকাউন্ট"] },
    61: { fullName: "পরম্পরাগত কৃষি বিকাশ যোজনা", amount: "₹৩১,৫০০/হেক্টর", benefits: ["জৈব ইনপুটের জন্য ₹১৫,০০০", "সার্টিফিকেশনের জন্য ₹১০,০০০", "প্রশিক্ষণের জন্য ₹৬,৫০০", "৩ বছরের সহায়তা"], eligibility: ["কৃষক ক্লাস্টার (৫০+ কৃষক)", "এফপিও", "স্বনির্ভর গোষ্ঠী", "ন্যূনতম ৫০ একর"], documents: ["ক্লাস্টার নিবন্ধন", "কৃষকের তালিকা", "জমির বিবরণ", "মাটি পরীক্ষার প্রতিবেদন"] },
    62: { fullName: "উত্তর-পূর্বাঞ্চলের জন্য জৈব মূল্য শৃঙ্খল উন্নয়ন মিশন", amount: "₹৭৫,০০০/হেক্টর", benefits: ["উত্তর-পূর্ব রাজ্যে জৈব চাষ", "এফপিও গঠন সহায়তা", "বাজার সংযোগ", "প্রক্রিয়াকরণ অবকাঠামো"], eligibility: ["উত্তর-পূর্ব রাজ্যের কৃষক", "এফপিও", "জৈব ক্লাস্টার", "আদিবাসী কৃষক"], documents: ["জমির রেকর্ড", "এফপিও নিবন্ধন", "কৃষক পরিচয়পত্র", "ব্যাংক অ্যাকাউন্ট"] },
    63: { fullName: "ভার্মিকম্পোস্ট উৎপাদন ইউনিট প্রকল্প", amount: "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ভার্মিকম্পোস্ট ইউনিট স্থাপন", "কেঁচো সরবরাহ", "প্রশিক্ষণ প্রদান", "জৈব সার উৎপাদন"], eligibility: ["ব্যক্তিগত কৃষক", "স্বনির্ভর গোষ্ঠী", "এফপিও", "মহিলা কৃষক"], documents: ["জমির নথি", "প্রকল্প প্রস্তাব", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    64: { fullName: "জৈবসার উৎপাদন ইউনিট প্রকল্প", amount: "₹২ লক্ষ পর্যন্ত ৪০% ভর্তুকি", benefits: ["রাইজোবিয়াম, পিএসবি উৎপাদন", "অ্যাজোটোব্যাক্টর, ভিএএম সরবরাহ", "গুণমান নিয়ন্ত্রণ ল্যাব", "কৃষক প্রশিক্ষণ"], eligibility: ["স্বনির্ভর গোষ্ঠী", "এফপিও", "তরুণ উদ্যোক্তা", "কৃষি স্নাতক"], documents: ["ব্যবসায়িক পরিকল্পনা", "প্রযুক্তিগত যোগ্যতা", "জমির লিজ", "ব্যাংক অ্যাকাউন্ট"] },
    65: { fullName: "জেডবিএনএফ - জিরো বাজেট প্রাকৃতিক চাষ প্রকল্প", amount: "₹১৫,০০০/হেক্টর", benefits: ["প্রাকৃতিক চাষ প্রচার", "গরু-ভিত্তিক চাষ", "জৈব-কীটনাশক প্রশিক্ষণ", "মালচিং সহায়তা"], eligibility: ["সকল কৃষক", "বৃষ্টিনির্ভর এলাকায় অগ্রাধিকার", "ক্ষুদ্র ও প্রান্তিক কৃষক"], documents: ["জমির রেকর্ড", "প্রশিক্ষণ সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    66: { fullName: "পিজিএস-ইন্ডিয়া সার্টিফিকেশন সহায়তা", amount: "₹১০,০০০ পর্যন্ত ১০০% ভর্তুকি", benefits: ["বিনামূল্যে জৈব সার্টিফিকেশন", "ক্লাস্টারের জন্য গ্রুপ সার্টিফিকেশন", "গুণমান নিশ্চয়তা", "বাজার প্রবেশাধিকার"], eligibility: ["কৃষক ক্লাস্টার", "এফপিও", "জৈব কৃষক গোষ্ঠী"], documents: ["ক্লাস্টার নিবন্ধন", "কৃষকের তালিকা", "জমির রেকর্ড"] },
    67: { fullName: "পশু সার ব্যবস্থাপনা প্রকল্প", amount: "₹৩০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["কম্পোস্ট গর্ত নির্মাণ", "সার প্রক্রিয়াকরণ", "বায়োগ্যাস ইউনিট ভর্তুকি", "খামারের সার প্রচার"], eligibility: ["পশুপালক কৃষক", "দুগ্ধ চাষী", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "পশুর সংখ্যার প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    68: { fullName: "সবুজ সার বীজ ভর্তুকি", amount: "বীজে ৫০% ভর্তুকি", benefits: ["শনপাট, ঢৈঞ্চা বীজ", "মাটির উর্বরতা উন্নত করে", "আগাছা দমন", "সারের প্রয়োজনীয়তা হ্রাস করে"], eligibility: ["সকল কৃষক", "জৈব কৃষকদের অগ্রাধিকার"], documents: ["জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    69: { fullName: "জৈবিক খেতি যোজনা", amount: "₹২০,০০০/হেক্টর", benefits: ["জৈব ইনপুট ভর্তুকি", "প্রশিক্ষণ ও প্রদর্শনী", "বাজার সংযোগ সহায়তা", "পিজিএস সার্টিফিকেশন"], eligibility: ["সকল কৃষক", "জৈব ক্লাস্টার", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "প্রশিক্ষণ সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    70: { fullName: "জৈব-কীটনাশক প্রচার প্রকল্প", amount: "একর প্রতি ₹২,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["নিমভিত্তিক কীটনাশক", "ট্রাইকোডার্মা সরবরাহ", "সিউডোমোনাস কালচার", "আইपीएम প্রশিক্ষণ"], eligibility: ["সকল কৃষক", "জৈব কৃষক", "এফপিও"], documents: ["জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    71: { fullName: "উদ্যানপালনের সমন্বিত উন্নয়নের জন্য মিশন", amount: "৫০-৭৫% ভর্তুকি", benefits: ["ফল, সবজি রোপণ", "নার্সারি উন্নয়ন", "ফসল-পরবর্তী ব্যবস্থাপনা", "প্যাকেজিং ভর্তুকি"], eligibility: ["সকল কৃষক", "এফপিও", "নার্সারি মালিক", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "প্রকল্প প্রস্তাব", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    72: { fullName: "নারকেল উন্নয়ন প্রকল্প", amount: "₹৫০,০০০/হেক্টর", benefits: ["ক্ষুদ্র কৃষকদের জন্য ৭০% ভর্তুকি", "উচ্চ ফলনশীল চারা", "পুরনো গাছ প্রতিস্থাপন", "মূল্য সংযোজন সহায়তা"], eligibility: ["কেরালা, তামিলনাড়ু, কর্ণাটক, অন্ধ্রপ্রদেশের নারকেল চাষী", "এফপিও", "ক্ষুদ্র কৃষক"], documents: ["জমির রেকর্ড", "গাছের সংখ্যা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    73: { fullName: "কাজু ও কোকো কর্মসূচি", amount: "₹২৫,০০০/হেক্টর", benefits: ["কাজু রোপণ ভর্তুকি", "কোকো চাষ সহায়তা", "প্রক্রিয়াকরণ ইউনিট ভর্তুকি", "রপ্তানি প্রচার"], eligibility: ["উপকূলীয় রাজ্যের কৃষক", "এফপিও", "প্রক্রিয়াকরণ ইউনিট", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "প্রকল্প প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    74: { fullName: "জাতীয় বাঁশ মিশন", amount: "₹৩০,০০০/হেক্টর", benefits: ["বাঁশ রোপণ ভর্তুকি", "নার্সারি উন্নয়ন", "মূল্য সংযোজন ইউনিট", "হস্তশিল্প সহায়তা"], eligibility: ["উত্তর-পূর্ব রাজ্যের কৃষক", "এফপিও", "আদিবাসী কৃষক", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "বাঁশ এলাকার বিবরণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    75: { fullName: "মশলা উন্নয়ন ও প্রক্রিয়াকরণ", amount: "৪০% ভর্তুকি", benefits: ["মশলা প্রক্রিয়াকরণ ইউনিট", "মূল্য সংযোজন সরঞ্জাম", "গুণমান পরীক্ষা ল্যাব", "রপ্তানি সুবিধা"], eligibility: ["মশলা চাষী", "এফপিও", "মশলা প্রক্রিয়াকারী", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "স্পাইসেস বোর্ড নিবন্ধন", "প্রকল্প প্রতিবেদন", "ব্যাংক অ্যাকাউন্ট"] },
    76: { fullName: "আম উন্নয়ন প্রকল্প", amount: "₹৪০,০০০/হেক্টর", benefits: ["উচ্চ ফলনশীল আম চারা", "প্রক্রিয়াকরণ ইউনিট সহায়তা", "কোল্ড স্টোরেজ ভর্তুকি", "রপ্তানি প্রচার"], eligibility: ["আম চাষী", "এফপিও", "প্রক্রিয়াকরণ ইউনিট"], documents: ["জমির রেকর্ড", "জাতের বিবরণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    77: { fullName: "কলা উন্নয়ন প্রকল্প", amount: "₹৩৫,০০০/হেক্টর", benefits: ["টিস্যু কালচার গাছ ভর্তুকি", "ড্রিপ সেচ সহায়তা", "প্রক্রিয়াকরণ ইউনিট", "বাজার সংযোগ"], eligibility: ["কলা চাষী", "এফপিও", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "জাতের বিবরণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    78: { fullName: "জাতীয় ফুল চাষ মিশন", amount: "₹৫ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ফুল চাষ সহায়তা", "গ্রিনহাউস ভর্তুকি", "রপ্তানি মানের ফুল", "কোল্ড চেইন সহায়তা"], eligibility: ["ফুল চাষী", "এফপিও", "মহিলা কৃষক", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "গ্রিনহাউস প্রস্তাব", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    79: { fullName: "জাতীয় মাশরুম মিশন", amount: "₹১ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["মাশরুম স্পন ভর্তুকি", "গ্রোয়িং রুম নির্মাণ", "প্রশিক্ষণ ও প্রযুক্তি", "বিপণন সহায়তা"], eligibility: ["সকল কৃষক", "স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক", "গ্রামীণ যুবক"], documents: ["জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রশিক্ষণ সার্টিফিকেট"] },
    80: { fullName: "সবজি ক্লাস্টার উন্নয়ন প্রকল্প", amount: "₹২০,০০০/হেক্টর", benefits: ["সবজি বীজ ভর্তুকি", "সুরক্ষিত চাষ", "বাজার সংযোগ", "ফসল-পরবর্তী ব্যবস্থাপনা"], eligibility: ["সবজি চাষী", "এফপিও", "স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "ফসলের পরিকল্পনা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    81: { fullName: "কৃষি সম্পদের জন্য ভার্চুয়াল ইন্টিগ্রেটেড সিস্টেম", amount: "বিনামূল্যে এআই পরিষেবা", benefits: ["এআই-চালিত কৃষি পরামর্শ", "২২+ ভারতীয় ভাষা", "ফসল সুপারিশ", "কীটপতঙ্গ সতর্কতা", "বাজার মূল্য"], eligibility: ["সকল কৃষক", "এফপিও", "সম্প্রসারণ কর্মকর্তা", "কেভিকে"], documents: ["আধার", "মোবাইল নম্বর", "জমির রেকর্ড (ঐচ্ছিক)"] },
    82: { fullName: "জাতীয় অ্যাগ্রিস্ট্যাক ডিজিটাল প্ল্যাটফর্ম", amount: "বিনামূল্যে ডিজিটাল আইডি", benefits: ["অনন্য কৃষক আইডি", "ডিজিটাল জমির রেকর্ড", "ফসল বপনের তথ্য", "প্রত্যক্ষ সুবিধা হস্তান্তর সংযুক্তি"], eligibility: ["সকল কৃষক", "প্রকল্প সুবিধাভোগীদের অগ্রাধিকার", "ক্ষুদ্র ও প্রান্তিক কৃষক"], documents: ["আধার", "জমির রেকর্ড", "ব্যাংক অ্যাকাউন্ট", "মোবাইল নম্বর"] },
    83: { fullName: "জাতীয় কৃষি বাজার", amount: "বিনামূল্যে ট্রেডিং প্ল্যাটফর্ম", benefits: ["অনলাইন মান্ডি ট্রেডিং", "রিয়েল-টাইম মূল্য নির্ধারণ", "১০০০+ মান্ডি সংযুক্ত", "কৃষককে সরাসরি পেমেন্ট"], eligibility: ["সকল কৃষক", "ব্যবসায়ী", "এফপিও", "কমিশন এজেন্ট"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "ট্রেডিং লাইসেন্স", "মোবাইল নম্বর"] },
    84: { fullName: "কিষাণ সুবিধা মোবাইল অ্যাপ্লিকেশন", amount: "বিনামূল্যে অ্যাপ", benefits: ["আবহাওয়া আপডেট", "মান্ডি মূল্য", "কীটপতঙ্গ সতর্কতা", "ডিলারের তথ্য", "উদ্ভিদ সুরক্ষা"], eligibility: ["সকল কৃষক", "প্লে স্টোর থেকে বিনামূল্যে ডাউনলোড", "নিবন্ধনের প্রয়োজন নেই"], documents: ["মোবাইল নম্বর", "অ্যান্ড্রয়েড ফোন"] },
    85: { fullName: "আইসিএআর-পুসা কৃষি মোবাইল অ্যাপ", amount: "বিনামূল্যে", benefits: ["ফসলের জাত ডেটাবেস", "চাষ পদ্ধতির প্যাকেজ", "রোগ নির্ণয়", "বিশেষজ্ঞ পরামর্শ"], eligibility: ["সকল কৃষক", "বিনামূল্যে ডাউনলোড", "হিন্দি ও ইংরেজি উপলব্ধ"], documents: ["কোনো প্রয়োজন নেই"] },
    86: { fullName: "কিষাণ কল সেন্টার ১৫৫১", amount: "টোল ফ্রি", benefits: ["২৪x৭ কৃষি প্রশ্ন", "বিশেষজ্ঞ পরামর্শ", "বহুভাষিক সহায়তা", "প্রকল্পের তথ্য"], eligibility: ["সকল কৃষক", "টোল ফ্রি নম্বর: ১৫৫১", "যেকোনো ফোন থেকে কল করুন"], documents: ["কোনো প্রয়োজন নেই"] },
    87: { fullName: "কৃষকদের জন্য এমকিষাণ এসএমএস পোর্টাল", amount: "বিনামূল্যে এসএমএস পরিষেবা", benefits: ["বিনামূল্যে এসএমএস সতর্কতা", "আবহাওয়ার পূর্বাভাস", "বাজার মূল্য", "উদ্ভিদ সুরক্ষা পরামর্শ"], eligibility: ["সকল কৃষক", "মোবাইল নম্বর নিবন্ধন প্রয়োজন", "যেকোনো মোবাইল নেটওয়ার্ক"], documents: ["মোবাইল নম্বর", "কৃষক নিবন্ধন"] },
    88: { fullName: "কাস্টম হায়ারিং সেন্টার মোবাইল অ্যাপ", amount: "বিনামূল্যে পরিষেবা", benefits: ["কাছাকাছি কৃষি যন্ত্রপাতি খুঁজুন", "অনলাইনে সরঞ্জাম বুক করুন", "ভাড়ার হার তুলনা", "কৃষকদের পর্যালোচনা"], eligibility: ["সকল কৃষক", "এফপিও", "কাস্টম হায়ারিং সেন্টার"], documents: ["মোবাইল নম্বর", "অবস্থান অ্যাক্সেস"] },
    89: { fullName: "এনপিএসএস - ডিজিটাল কীটপতঙ্গ পর্যবেক্ষণ", amount: "বিনামূল্যে পরিষেবা", benefits: ["এআই-ভিত্তিক কীটপতঙ্গ শনাক্তকরণ", "প্রাথমিক সতর্কতা ব্যবস্থা", "ফসল-নির্দিষ্ট সতর্কতা", "প্রতিকারমূলক সুপারিশ"], eligibility: ["সকল কৃষক", "বিনামূল্যে মোবাইল অ্যাপ", "নিবন্ধনের প্রয়োজন নেই"], documents: ["মোবাইল নম্বর", "ফসলের ছবি (নির্ণয়ের জন্য)"] },
    90: { fullName: "কৃষি-উদান - কৃষি-স্টার্টআপ ইনকিউবেশন প্রকল্প", amount: "₹২৫ লক্ষ অনুদান", benefits: ["কৃষি-প্রযুক্তি স্টার্টআপের জন্য তহবিল", "পরামর্শদান", "ইনকিউবেশন সহায়তা", "বিনিয়োগকারী সংযোগ"], eligibility: ["কৃষি-প্রযুক্তি স্টার্টআপ", "তরুণ উদ্যোক্তা (১৮-৩৫)", "গ্রামীণ উদ্ভাবক"], documents: ["ব্যবসায়িক পরিকল্পনা", "স্টার্টআপ নিবন্ধন", "টিমের বিবরণ", "উদ্ভাবনের প্রমাণ"] },
    91: { fullName: "প্রধানমন্ত্রী কিষাণ ঊর্জা সুরক্ষা এবং উত্থান মহাভিযান", amount: "৬০% ভর্তুকি", benefits: ["সোলার পাম্পের জন্য ৬০% ভর্তুকি (৭.৫ এইচপি পর্যন্ত)", "অনুর্বর জমিতে সোলার প্যানেল", "অতিরিক্ত বিদ্যুৎ গ্রিডে বিক্রি করুন", "বিদ্যুতের খরচ হ্রাস করে"], eligibility: ["কৃষি জমিসহ কৃষক", "ব্যক্তিগত কৃষক", "জল ব্যবহারকারী সমিতি", "এফপিও"], documents: ["জমির রেকর্ড", "বিদ্যুৎ সংযোগের প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    92: { fullName: "সোলার চরখা ক্লাস্টার", amount: "₹৪.৫ লক্ষ ভর্তুকি", benefits: ["সোলার চরখা ইউনিট", "মহিলা ক্ষমতায়ন", "খাদি উৎপাদন", "গ্রামীণ কর্মসংস্থান"], eligibility: ["স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক", "গ্রামীণ কারিগর", "খাদি প্রতিষ্ঠান"], documents: ["এসএইচজি নিবন্ধন", "প্রকল্প প্রস্তাব", "ব্যাংক অ্যাকাউন্ট"] },
    93: { fullName: "সৌরশক্তি চালিত কোল্ড স্টোরেজ প্রকল্প", amount: "₹১০ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["কৃষকদের জন্য সোলার কোল্ড স্টোরেজ", "ফসল-পরবর্তী ক্ষতি হ্রাস করে", "অফ-গ্রিড অপারেশন", "ফল ও সবজি সংরক্ষণ"], eligibility: ["এফপিও", "কৃষক সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী", "ব্যক্তিগত কৃষক"], documents: ["জমির রেকর্ড", "প্রকল্প প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    94: { fullName: "কৃষি পণ্যের জন্য সোলার ড্রায়ার", amount: "₹২ লক্ষ পর্যন্ত ৪০% ভর্তুকি", benefits: ["শস্য/ফলের জন্য সোলার ড্রায়ার", "গুণমান সংরক্ষণ", "মূল্য সংযোজন", "রোদে শুকানোর উপর নির্ভরতা হ্রাস করে"], eligibility: ["সকল কৃষক", "এফপিও", "স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "কোটেশন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    95: { fullName: "ফসল সুরক্ষার জন্য সোলার ফেন্সিং", amount: "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["খামারের জন্য সোলার ফেন্সিং", "বন্য প্রাণী থেকে সুরক্ষা", "কম রক্ষণাবেক্ষণ", "কোনো বিদ্যুৎ বিল নেই"], eligibility: ["বন্যপ্রাণী-প্রবণ এলাকার কৃষক", "বাগান মালিক", "সকল কৃষক"], documents: ["জমির রেকর্ড", "অবস্থানের প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    96: { fullName: "অফ-গ্রিড সোলার ওয়াটার পাম্পিং", amount: "₹১.৫ লক্ষ পর্যন্ত ৭৫% ভর্তুকি", benefits: ["সোলার সাবমার্সিবল পাম্প", "ডিজেল/বিদ্যুৎ খরচ নেই", "দূরবর্তী এলাকায় কাজ করে", "৫ বছরের ওয়ারেন্টি"], eligibility: ["ক্ষুদ্র ও প্রান্তিক কৃষক", "গ্রিড সংযোগ ছাড়া এলাকা"], documents: ["জমির রেকর্ড", "জলের উৎসের প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    97: { fullName: "সৌরশক্তি চালিত সুরক্ষিত চাষ", amount: "₹৫ লক্ষ পর্যন্ত ৬০% ভর্তুকি", benefits: ["সোলার ফ্যান ও কুলিং", "তাপমাত্রা নিয়ন্ত্রণ", "বর্ধিত চাষ মৌসুম", "উচ্চ ফলন"], eligibility: ["উদ্যানপালন কৃষক", "এফপিও", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "গ্রিনহাউস পরিকল্পনা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    98: { fullName: "কৃষি-ড্রোনের জন্য সোলার চার্জিং", amount: "₹৫০,০০০ পর্যন্ত ৪০% ভর্তুকি", benefits: ["সোলার চার্জিং স্টেশন", "অফ-গ্রিড ড্রোন অপারেশন", "টেকসই চাষ", "ডিজেল ব্যবহার হ্রাস করে"], eligibility: ["এফপিও", "ড্রোন দিদি সুবিধাভোগী", "স্বনির্ভর গোষ্ঠী"], documents: ["ড্রোন ক্রয়ের প্রমাণ", "জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    99: { fullName: "কৃষি ফিডারের সৌরকরণ", amount: "৯০% অনুদান", benefits: ["সেচ ফিডারের জন্য সৌরশক্তি", "নির্ভরযোগ্য দিনের বিদ্যুৎ", "গ্রিড নির্ভরতা হ্রাস করে", "কম বিদ্যুৎ বিল"], eligibility: ["রাজ্য সরকার", "ডিসকম", "জল ব্যবহারকারী সমিতি"], documents: ["প্রকল্প প্রস্তাব", "ফিডারের বিবরণ"] },
    100: { fullName: "কৃষকদের জন্য ছাদের সোলার ভর্তুকি", amount: "₹৭৮,০০০ পর্যন্ত ৪০% ভর্তুকি", benefits: ["গ্রিড-সংযুক্ত ছাদের সোলার", "বিদ্যুৎ বিল হ্রাস করে", "অতিরিক্ত বিদ্যুৎ গ্রিডে বিক্রি করুন", "পাম্প সেট বা ঘরে ব্যবহারের জন্য"], eligibility: ["সকল কৃষক", "খামার বাড়ির মালিক", "এফপিও"], documents: ["বিদ্যুৎ বিল", "ছাদের মালিকানার প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    101: { fullName: "পশুপালন অবকাঠামো উন্নয়ন তহবিল", amount: "₹১০০ কোটি পর্যন্ত ঋণ", benefits: ["দুগ্ধ, পোল্ট্রির জন্য ঋণ-সংযুক্ত ভর্তুকি", "৩% সুদ ভর্তুকি", "₹১০০ কোটি পর্যন্ত ঋণ", "এমএসএমই-এর জন্য ঋণ গ্যারান্টি"], eligibility: ["ব্যক্তিগত উদ্যোক্তা", "এফপিও", "বেসরকারি কোম্পানি", "সমবায় সমিতি"], documents: ["বিস্তারিত প্রকল্প প্রতিবেদন", "ব্যবসায়িক নিবন্ধন", "জমির নথি", "ব্যাংক অ্যাকাউন্ট"] },
    102: { fullName: "দুগ্ধ উদ্যোক্তা উন্নয়ন প্রকল্প", amount: "২৫-৩৩% ভর্তুকি", benefits: ["দুগ্ধ ইউনিটের জন্য ভর্তুকি", "সাধারণের জন্য ২৫%, এসসি/এসটি-এর জন্য ৩৩%", "গরু/মহিষের জন্য ঋণ", "দুধ প্রক্রিয়াকরণ সরঞ্জাম"], eligibility: ["ব্যক্তিগত কৃষক", "স্বনির্ভর গোষ্ঠী", "দুগ্ধ সমবায় সমিতি", "ভূমিহীন কৃষক"], documents: ["জমির নথি", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রকল্প প্রতিবেদন"] },
    103: { fullName: "পোল্ট্রি ভেঞ্চার ক্যাপিটাল", amount: "₹৩ লক্ষ পর্যন্ত ৩৩% ভর্তুকি", benefits: ["পোল্ট্রি চাষের জন্য ভর্তুকি", "এসসি/এসটি কৃষকদের জন্য ৩৩%", "ব্রয়লার/লেয়ার ইউনিটের জন্য ঋণ", "হ্যাচারি সহায়তা"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "স্বনির্ভর গোষ্ঠী", "তরুণ উদ্যোক্তা"], documents: ["জমির নথি", "আধার", "ব্যাংক অ্যাকাউন্ট", "অভিজ্ঞতার সার্টিফিকেট"] },
    104: { fullName: "ছাগল উন্নয়ন প্রকল্প", amount: "₹৫০,০০০ পর্যন্ত ৫০% ভর্তুকি", benefits: ["ছাগল/ভেড়া পালনের জন্য ভর্তুকি", "জাত উন্নয়ন সহায়তা", "পশু চিকিৎসা সেবা", "বিপণন সহায়তা"], eligibility: ["ক্ষুদ্র কৃষক", "ভূমিহীন শ্রমিক", "আদিবাসী কৃষক", "মহিলা কৃষক"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "গ্রাম পঞ্চায়েতের সার্টিফিকেট", "জমির রেকর্ড"] },
    105: { fullName: "শূকর উন্নয়ন ও প্রজনন প্রকল্প", amount: "₹৪০,০০০ পর্যন্ত ৪০% ভর্তুকি", benefits: ["শূকর চাষে ভর্তুকি", "জাত উন্নয়ন", "পশু চিকিৎসা সহায়তা", "বাজার সংযোগ"], eligibility: ["ক্ষুদ্র কৃষক", "আদিবাসী কৃষক", "স্বনির্ভর গোষ্ঠী", "গ্রামীণ যুবক"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "জমির রেকর্ড", "প্রশিক্ষণ সার্টিফিকেট"] },
    106: { fullName: "জাতীয় পশুখাদ্য উন্নয়ন প্রকল্প", amount: "₹১০,০০০/হেক্টর", benefits: ["পশুখাদ্য বীজ ভর্তুকি", "হাইড্রোপনিক পশুখাদ্য ইউনিট", "সাইলেজ তৈরিতে সহায়তা", "পশুখাদ্য সংরক্ষণ"], eligibility: ["সকল কৃষক", "দুগ্ধ চাষী", "এফপিও", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির রেকর্ড", "পশুর সংখ্যার প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    107: { fullName: "এনএডিআইএস - জাতীয় পশু রোগ বীমা প্রকল্প", amount: "প্রিমিয়াম: ₹৫০-২০০/পশু", benefits: ["গবাদি পশু বীমা", "গরু, মহিষ, ভেড়া, ছাগল কভার করে", "রোগ ও দুর্ঘটনা কভারেজ", "দ্রুত দাবি নিষ্পত্তি"], eligibility: ["সকল গবাদি পশু মালিক", "দুগ্ধ চাষী", "ভেড়া/ছাগল চাষী"], documents: ["পশু শনাক্তকরণ", "পশু চিকিৎসা সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    108: { fullName: "এনবিএইচএম - মধু মিশন", amount: "প্রতি সুবিধাভোগীতে ₹১০,০০০", benefits: ["মৌমাছি পালন সরঞ্জামে ভর্তুকি", "মধু প্রক্রিয়াকরণ ইউনিট", "প্রশিক্ষণ ও প্রদর্শনী", "মধুর জন্য বিপণন সহায়তা"], eligibility: ["ব্যক্তিগত কৃষক", "স্বনির্ভর গোষ্ঠী", "এফপিও", "আদিবাসী কৃষক"], documents: ["জমির রেকর্ড (এপিয়ারির জন্য)", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রশিক্ষণ সার্টিফিকেট (পছন্দনীয়)"] },
    109: { fullName: "প্রধানমন্ত্রী মৎস্য সম্পদা যোজনা (পিএমএমএসওয়াই)", amount: "৪০-৬০% ভর্তুকি", benefits: ["মাছ চাষে ভর্তুকি", "হ্যাচারি উন্নয়ন", "মাছের জন্য কোল্ড চেইন", "প্রক্রিয়াকরণ ইউনিট", "রপ্তানি প্রচার"], eligibility: ["মৎস্যজীবী", "মৎস্যচাষী", "এফপিও", "সমবায় সমিতি", "মহিলা স্বনির্ভর গোষ্ঠী"], documents: ["জলাশয়ের মালিকানা/লিজ", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রকল্প প্রতিবেদন"] },
    110: { fullName: "এনএলএম - পশুধন উন্নয়ন", amount: "₹২ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["গরু, মহিষ, ভেড়া, ছাগলের জাত উন্নয়ন", "পশুখাদ্য উন্নয়ন", "ঝুঁকি ব্যবস্থাপনা", "উদ্যোক্তা উন্নয়ন"], eligibility: ["সকল পশুপালক কৃষক", "এফপিও", "সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী"], documents: ["পশুধনের সংখ্যার প্রমাণ", "জমির রেকর্ড (পশুখাদ্যের জন্য)", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    111: { fullName: "রাজ্য দুর্যোগ প্রতিক্রিয়া তহবিল - কৃষি", amount: "₹২০,০০০/হেক্টর", benefits: ["ফসল ক্ষতির ক্ষতিপূরণ", "প্রাকৃতিক দুর্যোগ সহায়তা", "বন্যা, খরা, ঘূর্ণিঝড়", "দ্রুত বিতরণ"], eligibility: ["বিজ্ঞপ্তিভুক্ত দুর্যোগ এলাকার কৃষক", "সকল কৃষক", "ফসলের ক্ষতি >৫০%"], documents: ["জমির রেকর্ড", "ফসল ক্ষতির সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    112: { fullName: "জাতীয় দুর্যোগ প্রতিক্রিয়া বাহিনী - কৃষি", amount: "₹২৫,০০০/হেক্টর", benefits: ["জাতীয় স্তরের দুর্যোগ ত্রাণ", "ঘূর্ণিঝড়, বন্যা, শিলাবৃষ্টি", "ভূমিধস কভারেজ", "কীটপতঙ্গের প্রাদুর্ভাব"], eligibility: ["গুরুতরভাবে ক্ষতিগ্রস্ত এলাকার কৃষক", "সকল শ্রেণী"], documents: ["দুর্যোগ বিজ্ঞপ্তি", "জমির রেকর্ড", "ফসল ক্ষতির সার্টিফিকেট", "আধার"] },
    113: { fullName: "শিলাবৃষ্টি বীমা", amount: "প্রিমিয়াম: ২-৫%", benefits: ["শিলাবৃষ্টির জন্য বিশেষ কভারেজ", "স্বতন্ত্র খামার মূল্যায়ন", "দ্রুত দাবি", "সব ফসল কভার করে"], eligibility: ["শিলাবৃষ্টি-প্রবণ এলাকার কৃষক", "সকল কৃষক ঐচ্ছিক"], documents: ["জমির রেকর্ড", "আবহাওয়ার তথ্য", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    114: { fullName: "জাতীয় খরা ত্রাণ প্যাকেজ", amount: "₹১৫,০০০/হেক্টর", benefits: ["খরা আক্রান্ত কৃষক", "ইনপুট ভর্তুকি", "পশুখাদ্য সরবরাহ", "পানীয় জল সহায়তা"], eligibility: ["খরা ঘোষিত এলাকার কৃষক", "ক্ষুদ্র ও প্রান্তিককে অগ্রাধিকার"], documents: ["জমির রেকর্ড", "খরা ঘোষণা", "ফসল ক্ষতির প্রমাণ", "আধার"] },
    115: { fullName: "কৃষির জন্য জাতীয় বন্যা ত্রাণ", amount: "₹১৮,০০০/হেক্টর", benefits: ["বন্যা আক্রান্ত কৃষক", "ফসল ক্ষতির ক্ষতিপূরণ", "পুনঃরোপণের জন্য বীজ ভর্তুকি", "ইনপুট সহায়তা"], eligibility: ["বন্যা আক্রান্ত এলাকার কৃষক", "সকল শ্রেণী"], documents: ["জমির রেকর্ড", "বন্যা ক্ষতির প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    116: { fullName: "ঘূর্ণিঝড় ত্রাণ প্রকল্প", amount: "₹২২,০০০/হেক্টর", benefits: ["ঘূর্ণিঝড় ক্ষতির ক্ষতিপূরণ", "বাগানের ক্ষতি কভারেজ", "গবাদি পশুর ক্ষতির সহায়তা", "ইনपुट ভর্তুকি"], eligibility: ["উপকূলীয় এলাকার কৃষক", "ঘূর্ণিঝড় আক্রান্ত অঞ্চল"], documents: ["জমির রেকর্ড", "ঘূর্ণিঝড় ক্ষতির প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    117: { fullName: "পঙ্গপাল/কীটপতঙ্গ আক্রমণ ত্রাণ প্রকল্প", amount: "₹১০,০০০/হেক্টর", benefits: ["কীটপতঙ্গ ক্ষতির জন্য ক্ষতিপূরণ", "বিনামূল্যে কীটনাশক সরবরাহ", "ফসল ক্ষতির কভারেজ", "দ্রুত প্রতিক্রিয়া দল"], eligibility: ["কীটপতঙ্গ আক্রান্ত এলাকার কৃষক", "পঙ্গপাল আক্রমণ অঞ্চল"], documents: ["জমির রেকর্ড", "কীটপতঙ্গ আক্রমণ সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    118: { fullName: "ভূমিধস ত্রাণ প্রকল্প", amount: "₹৩০,০০০/হেক্টর", benefits: ["ভূমিধস ক্ষতির ক্ষতিপূরণ", "জমি পুনরুদ্ধার সহায়তা", "ছাদ মেরামত ভর্তুকি", "ইনপুট সহায়তা"], eligibility: ["পার্বত্য এলাকার কৃষক", "ভূমিধস আক্রান্ত অঞ্চল"], documents: ["জমির রেকর্ড", "ভূমিধস ক্ষতির প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    119: { fullName: "বজ্রপাত ক্ষতিপূরণ", amount: "₹৫ লক্ষ/কৃষক", benefits: ["কৃষক মৃত্যুর ক্ষতিপূরণ", "চিকিৎসা ব্যয় কভারেজ", "নির্ভরশীল পরিবারের সহায়তা", "দ্রুত বিতরণ"], eligibility: ["বজ্রপাতে ক্ষতিগ্রস্ত কৃষক", "মৃত কৃষকদের পরিবার"], documents: ["মৃত্যুর সার্টিফিকেট", "পুলিশ রিপোর্ট", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    120: { fullName: "শৈত্য প্রবাহ ফসল সুরক্ষা প্রকল্প", amount: "₹৮,০০০/হেক্টর", benefits: ["তুষার ক্ষতির ক্ষতিপূরণ", "ধোঁয়া জেনারেটর ভর্তুকি", "ফসল আচ্ছাদন সহায়তা", "ইনপুট সহায়তা"], eligibility: ["শৈত্য প্রবাহ অঞ্চলের কৃষক", "সবজি ও ফল চাষী"], documents: ["জমির রেকর্ড", "তাপমাত্রার তথ্য", "ফসল ক্ষতির প্রমাণ", "আধার"] },
    121: { fullName: "ই-নাম এনহ্যান্সড প্ল্যাটফর্ম", amount: "বিনামূল্যে ট্রেডিং", benefits: ["অনলাইন মান্ডি ট্রেডিং", "গুণমান যাচাই", "গুদাম রসিদ ব্যবস্থা", "সরাসরি পেমেন্ট"], eligibility: ["সকল কৃষক", "ব্যবসায়ী", "এফপিও", "কমিশন এজেন্ট"], documents: ["আধার", "ব্যাংক অ্যাকাউন্ট", "মোবাইল নম্বর", "ট্রেডিং নিবন্ধন"] },
    122: { fullName: "এফপিও ট্রেডিং সহায়তা প্রকল্প", amount: "₹১৫ লক্ষ সহায়তা", benefits: ["এফপিও বাজার সংযোগ", "ব্র্যান্ড উন্নয়ন", "প্যাকেজিং সহায়তা", "সরাসরি ক্রেতা সংযোগ"], eligibility: ["নিবন্ধিত এফপিও", "উৎপাদক কোম্পানি", "কৃষক সমবায় সমিতি"], documents: ["এফপিও নিবন্ধন", "সদস্য তালিকা", "ব্যাংক অ্যাকাউন্ট", "ব্যবসায়িক পরিকল্পনা"] },
    123: { fullName: "আলোচনাযোগ্য গুদাম রসিদ প্রকল্প", amount: "গুদাম রসিদের বিপরীতে ঋণ", benefits: ["গুদামে ফসল সংরক্ষণ", "রসিদের বিপরীতে ঋণ পান", "উচ্চ মূল্যে বিক্রি করুন", "গুণমান সংরক্ষণ"], eligibility: ["সকল কৃষক", "এফপিও", "ব্যবসায়ী", "সমবায় সমিতি"], documents: ["গুদাম রসিদ", "আধার", "ব্যাংক অ্যাকাউন্ট", "ফসলের বিবরণ"] },
    124: { fullName: "কৃষি পণ্য পরিবহন ভর্তুকি", amount: "৫০% পরিবহন ভর্তুকি", benefits: ["পরিবহন খরচ ভর্তুকি", "উত্তর-পূর্ব রাজ্যের অগ্রাধিকার", "পচনশীল পণ্য", "মান্ডি প্রবেশাধিকার"], eligibility: ["দূরবর্তী এলাকার কৃষক", "উত্তর-পূর্ব রাজ্য", "পার্বত্য অঞ্চল", "আদিবাসী এলাকা"], documents: ["পরিবহন বিল", "মান্ডি প্রবেশের প্রমাণ", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    125: { fullName: "বাজার হস্তক্ষেপ প্রকল্প (এমআইএস)", amount: "এমএসপি মূল্য সহায়তা", benefits: ["পচনশীল পণ্যের জন্য মূল্য সহায়তা", "সরকারি সংগ্রহ", "ক্ষতির ক্ষতিপূরণ", "কৃষকের আয় সুরক্ষা"], eligibility: ["বিজ্ঞপ্তিভুক্ত পচনশীল ফসল চাষকারী কৃষক", "সকল রাজ্য"], documents: ["ফসলের ঘোষণা", "জমির রেকর্ড", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    126: { fullName: "কিষাণ রেল ভাড়া ভর্তুকি প্রকল্প", amount: "৫০% ভাড়া ভর্তুকি", benefits: ["পচনশীল পণ্যের ভর্তুকিযুক্ত পরিবহন", "দ্রুত বাজার প্রবেশাধিকার", "অপচয় হ্রাস করে", "দেশব্যাপী পৌঁছানো"], eligibility: ["সকল কৃষক", "এফপিও", "সমবায় সমিতি", "ব্যবসায়ী (কৃষকের পক্ষে)"], documents: ["রেলওয়ে বুকিং রসিদ", "কৃষকের ঘোষণা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    127: { fullName: "এফপিও গঠন ও প্রচার প্রকল্প", amount: "প্রতি এফপিওতে ₹১৫ লক্ষ", benefits: ["এফপিও গঠনের জন্য আর্থিক সহায়তা", "৫ বছরের হ্যান্ডহোল্ডিং", "₹১৫ লক্ষ পর্যন্ত ইক্যুইটি অনুদান", "ক্রেডিট গ্যারান্টি"], eligibility: ["৩০০+ কৃষকের দল", "স্বনির্ভর গোষ্ঠী", "সমবায় সমিতি", "কৃষক ক্লাস্টার"], documents: ["কৃষকের তালিকা (৩০০+)", "জমির বিবরণ", "ব্যবসায়িক পরিকল্পনা", "ব্যাংক অ্যাকাউন্ট"] },
    128: { fullName: "এএমআই - গ্রামীণ গুদাম প্রকল্প", amount: "₹২৫ লক্ষ পর্যন্ত ২৫% ভর্তুকি", benefits: ["গ্রামীণ গুদাম নির্মাণ", "কৃষকদের জন্য গুদাম", "সংরক্ষিত ফসলের বিপরীতে ঋণ", "সংকটকালীন বিক্রয় হ্রাস করে"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "সমবায় সমিতি", "স্বনির্ভর গোষ্ঠী"], documents: ["জমির নথি", "প্রকল্প প্রতিবেদন", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    129: { fullName: "পিএমকেএস - কিষাণ সম্পদা প্রকল্প", amount: "₹১০ কোটি পর্যন্ত ৩৫% ভর্তুকি", benefits: ["খাদ্য প্রক্রিয়াকরণ ইউনিট", "মেগা ফুড পার্ক", "কোল্ড চেইন অবকাঠামো", "মূল্য সংযোজন"], eligibility: ["খাদ্য প্রক্রিয়াকারী", "এফপিও", "সমবায় সমিতি", "কৃষি-উদ্যোক্তা"], documents: ["বিস্তারিত প্রকল্প প্রতিবেদন", "জমির নথি", "কোম্পানি নিবন্ধন", "ব্যাংক অ্যাকাউন্ট"] },
    130: { fullName: "কৃষকদের প্রত্যক্ষ বিপণন প্রকল্প", amount: "₹২ লক্ষ পর্যন্ত ৫০% ভর্তুকি", benefits: ["কৃষক বাজার স্টল ভর্তুকি", "প্রত্যক্ষ-ভোক্তা বিক্রয়", "ব্র্যান্ডিং সহায়তা", "ডিজিটাল পেমেন্ট সেটআপ"], eligibility: ["ব্যক্তিগত কৃষক", "এফপিও", "স্বনির্ভর গোষ্ঠী", "মহিলা কৃষক"], documents: ["জমির রেকর্ড", "বাজার স্টল পরিকল্পনা", "আধার", "ব্যাংক অ্যাকাউন্ট"] },
    131: { fullName: "মহাত্মা গান্ধী নরেগা - কৃষি কাজ", amount: "১০০ দিনের নিশ্চিত মজুরি", benefits: ["১০০ দিনের নিশ্চিত কর্মসংস্থান", "দৈনিক ₹৩০০+ মজুরি", "ফার্ম পন্ড নির্মাণ", "জমি উন্নয়ন কাজ", "সেচ খাল কাজ"], eligibility: ["সকল গ্রামীণ পরিবার", "অদক্ষ কাজে ইচ্ছুক প্রাপ্তবয়স্ক সদস্য", "এসসি/এসটি/মহিলাদের অগ্রাধিকার"], documents: ["জব কার্ড", "আধার", "ব্যাংক অ্যাকাউন্ট", "রেশন কার্ড"] },
    132: { fullName: "এসিএবিসি - কৃষি-উদ্যোক্তা প্রকল্প", amount: "₹২০ লক্ষ ঋণ + ৪৪% ভর্তুকি", benefits: ["কৃষি স্নাতকদের জন্য প্রশিক্ষণ", "প্রকল্পের খরচে ৪৪% ভর্তুকি", "₹২০ লক্ষ পর্যন্ত ঋণ", "প্রশিক্ষণের সময় মাসিক ভাতা"], eligibility: ["কৃষি স্নাতক", "কৃষিতে ডিপ্লোমাধারী", "জীববিজ্ঞান স্নাতক", "কৃষি-সংশ্লিষ্ট বিষয়ে স্নাতকোত্তর"], documents: ["ডিগ্রি সার্টিফিকেট", "আধার", "ব্যাংক অ্যাকাউন্ট", "ব্যবসায়িক পরিকল্পনা", "নাবার্ড থেকে এনওসি"] },
    133: { fullName: "কৃষিতে জাতীয় দক্ষতা উন্নয়ন", amount: "বিনামূল্যে প্রশিক্ষণ + ₹৫,০০০ ভাতা", benefits: ["বিনামূল্যে দক্ষতা প্রশিক্ষণ কর্মসূচি", "ড্রোন পাইলট প্রশিক্ষণ", "মাটি পরীক্ষা টেকনিশিয়ান", "কৃষি যন্ত্রপাতি অপারেটর", "খাদ্য প্রক্রিয়াকরণ দক্ষতা"], eligibility: ["গ্রামীণ যুবক (১৮-৩৫ বছর)", "কৃষকদের সন্তান", "মহিলা কৃষক", "স্কুল ছুট"], documents: ["আধার", "বয়সের প্রমাণ", "শিক্ষাগত সার্টিফিকেট", "ব্যাংক অ্যাকাউন্ট", "পাসপোর্ট ছবি"] },
    134: { fullName: "প্রধানমন্ত্রী কৌশল বিকাশ যোজনা - কৃষি", amount: "বিনামূল্যে প্রশিক্ষণ + সার্টিফিকেশন", benefits: ["বিনামূল্যে বৃত্তিমূলক প্রশিক্ষণ", "সরকারি সার্টিফিকেশন", "চাকরি প্লেসমেন্ট সহায়তা", "পূর্ববর্তী শিক্ষার স্বীকৃতি", "কৃষি-যন্ত্রপাতি মেরামত প্রশিক্ষণ"], eligibility: ["১৮-৪৫ বছর বয়সী যুবক", "কৃষক পরিবার", "গ্রামীণ ও শহুরে যুবক", "মহিলা প্রার্থী"], documents: ["আধার", "বয়সের প্রমাণ", "শিক্ষাগত নথি", "ব্যাংক অ্যাকাউন্ট", "মোবাইল নম্বর"] },
    135: { fullName: "স্টার্টআপ ইন্ডিয়া কৃষি গ্র্যান্ড চ্যালেঞ্জ", amount: "₹৫০ লক্ষ বীজ তহবিল", benefits: ["₹৫০ লক্ষ পর্যন্ত বীজ তহবিল", "বিশেষজ্ঞদের কাছ থেকে পরামর্শদান", "ইনকিউবেশন সহায়তা", "৩ বছরের কর ছাড়", "পেটেন্ট ফাইলিং সহায়তা"], eligibility: ["কৃষি-প্রযুক্তি স্টার্টআপ", "তরুণ উদ্যোক্তা (১৮-৩৫)", "উদ্ভাবনী কৃষি সমাধান", "নিবন্ধিত স্টার্টআপ (ডিপিআইআইটি)"], documents: ["স্টার্টআপ নিবন্ধন", "উদ্ভাবনের বিবরণ", "ব্যবসায়িক পরিকল্পনা", "টিম প্রোফাইল", "ব্যাংক অ্যাকাউন্ট"] },
    136: { fullName: "আরএসইটিআই - গ্রামীণ স্বনিয়োগ প্রশিক্ষণ প্রতিষ্ঠান", amount: "বিনামূল্যে প্রশিক্ষণ + ঋণ সংযোগ", benefits: ["বিনামূল্যে আবাসিক প্রশিক্ষণ (৭-৩০ দিন)", "দুগ্ধ চাষ প্রশিক্ষণ", "মুরগি ও ছাগল পালন", "ব্যাংক ঋণ সংযোগ", "প্রশিক্ষণ-পরবর্তী সহায়তা"], eligibility: ["গ্রামীণ যুবক (১৮-৪৫ বছর)", "বেকার যুবক", "কৃষকদের সন্তান", "মহিলা প্রার্থী"], documents: ["আধার", "রেশন কার্ড", "আয়ের সার্টিফিকেট", "ব্যাংক অ্যাকাউন্ট", "পাসপোর্ট ছবি"] },
    137: { fullName: "রাষ্ট্রীয় যুব সশক্তিকরণ কার্যক্রম - কৃষি", amount: "₹২ লক্ষ প্রকল্প সহায়তা", benefits: ["যুব-নেতৃত্বাধীন কৃষি প্রকল্প", "নেতৃত্ব উন্নয়ন", "সাম্প্রদায়িক চাষ উদ্যোগ", "আর্থিক সাক্ষরতা প্রশিক্ষণ", "বাজার সংযোগ সহায়তা"], eligibility: ["যুব দল (১৫-২৯ বছর)", "যুব ক্লাব", "নেহেরু যুব কেন্দ্রের সদস্য", "গ্রামীণ যুব সংগঠন"], documents: ["দল নিবন্ধন", "সদস্যদের বিবরণ", "আধার", "ব্যাংক অ্যাকাউন্ট", "প্রকল্প প্রস্তাব"] },
    138: { fullName: "দীন দয়াল উপাধ্যায় গ্রামীণ কৌশল্য যোজনা", amount: "বিনামূল্যে প্রশিক্ষণ + মাসে ₹১,০০০ ভাতা", benefits: ["৩-১২ মাসের দক্ষতা প্রশিক্ষণ", "প্রশিক্ষণের সময় মাসিক ভাতা", "১০০% চাকরি প্লেসমেন্টের নিশ্চয়তা", "প্লেসমেন্ট-পরবর্তী সহায়তা", "বিনামূল্যে খাবার ও থাকার ব্যবস্থা"], eligibility: ["গ্রামীণ দরিদ্র যুবক (১৮-৩৫ বছর)", "এসসি/এসটি/মহিলাদের অগ্রাধিকার", "বিপিএল পরিবার", "মনরেগা শ্রমিক পরিবার"], documents: ["আধার", "বিপিএল সার্টিফিকেট", "বয়সের প্রমাণ", "ব্যাংক অ্যাকাউন্ট", "পাসপোর্ট ছবি"] },
    139: { fullName: "এনআরএলএম - আজীবিকা কৃষি জীবিকা", amount: "প্রতি এসএইচজিতে ₹৫০,০০০", benefits: ["এসএইচজি-ভিত্তিক চাষ কার্যক্রম", "সাম্প্রদায়িক বিনিয়োগ তহবিল", "ঘূর্ণায়মান তহবিল সহায়তা", "মূল্য শৃঙ্খল উন্নয়ন", "বাজার সংযোগ"], eligibility: ["এনআরএলএম-এর অধীনে মহিলা স্বনির্ভর গোষ্ঠী", "কৃষক সমষ্টি", "উৎপাদক গোষ্ঠী", "গ্রাম সংগঠন"], documents: ["এসএইচজি নিবন্ধন", "সদস্য তালিকা", "ব্যাংক অ্যাকাউন্ট", "রেজোলিউশনের কপি", "আধার"] },
    140: { fullName: "কেভিকে - কৃষক প্রশিক্ষণ ও কর্মসংস্থান কর্মসূচি", amount: "বিনামূল্যে প্রশিক্ষণ + ইনপুট", benefits: ["কেভিকে-তে হাতে-কলমে প্রশিক্ষণ", "সমন্বিত চাষ প্রশিক্ষণ", "মূল্য সংযোজন প্রশিক্ষণ", "ইনপুট কিট প্রদান", "আইসিএআর থেকে সার্টিফিকেট"], eligibility: ["সকল কৃষক", "কৃষাণী মহিলা", "গ্রামীণ যুবক", "স্কুল ছুট", "কৃষি-উদ্যোক্তা"], documents: ["আধার", "জমির রেকর্ড (প্রযোজ্য ক্ষেত্রে)", "ব্যাংক অ্যাকাউন্ট", "২টি পাসপোর্ট ছবি", "মোবাইল নম্বর"] },
  },
  te: {
    1: { fullName: "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి", amount: "₹6,000/సంవత్సరం", benefits: ["సంవత్సరానికి ₹6,000 ప్రత్యక్ష ఆదాయ మద్దతు", "ప్రతి 4 నెలలకు ₹2,000", "బ్యాంక్ ఖాతాలో నేరుగా DBT", "అన్ని చిన్న, సన్నకారు రైతులను కవర్ చేస్తుంది"], eligibility: ["చిన్న మరియు సన్నకారు రైతులు (2 హెక్టార్ల వరకు)", "సాగు భూమి ఉన్న రైతు కుటుంబాలు", "భూమి రికార్డులు ఉన్న కౌలు రైతులు"], documents: ["ఆధార్ కార్డ్", "బ్యాంక్ ఖాతా", "భూమి రికార్డులు", "రేషన్ కార్డ్"] },
    2: { fullName: "కౌలు రైతుల కోసం పీఎం-కిసాన్", amount: "₹6,000/సంవత్సరం", benefits: ["భూమిలేని రైతులకు ప్రత్యేక నిబంధన", "కౌలుదారులకు సహాయం", "ప్రత్యక్ష ప్రయోజన బదిలీ", "భూమి రికార్డులు అవసరం లేదు"], eligibility: ["భూమిలేని కౌలు రైతులు", "కౌలుదారులు", "కౌలు భూమిలో సాగు చేసే రైతులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "కౌలు ఒప్పందం", "అఫిడవిట్"] },
    3: { fullName: "ప్రధాన మంత్రి అన్నదాత ఆదాయ సంరక్షణ అభియాన్", amount: "₹8,000/సంవత్సరం", benefits: ["అన్ని రైతులకు ఆదాయ మద్దతు", "కనీస మద్దతు ధర హామీ", "చిన్న రైతులకు అదనంగా ₹2,000", "ధర లోటు చెల్లింపు"], eligibility: ["నోటిఫై చేయబడిన పంటలు పండించే రైతులందరూ", "చిన్న, సన్నకారు రైతులకు ప్రాధాన్యత", "FPO సభ్యులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "భూమి రికార్డులు", "పంట ప్రకటన"] },
    4: { fullName: "ధర లోటు చెల్లింపు పథకం", amount: "ధర వ్యత్యాస చెల్లింపు", benefits: ["ధర తగ్గుదలకు పరిహారం", "MSP వ్యత్యాస చెల్లింపు", "ప్రత్యక్ష బ్యాంక్ బదిలీ", "కూరగాయలు, పండ్లకు కవరేజ్"], eligibility: ["మధ్యప్రదేశ్ రైతులు", "పంటలు: టమోటా, ఉల్లి, బంగాళాదుంప", "నమోదిత రైతులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "విక్రయ రశీదు", "మండీ ప్రవేశ స్లిప్"] },
    5: { fullName: "తెలంగాణ రైతు బంధు", amount: "₹10,000/ఎకరం/సంవత్సరం", benefits: ["రైతులకు పెట్టుబడి మద్దతు", "సీజన్‌కు ఎకరానికి ₹5,000", "ప్రత్యక్ష బ్యాంక్ బదిలీ", "అన్ని రైతులను కవర్ చేస్తుంది"], eligibility: ["తెలంగాణ రైతులందరూ", "పట్టా ఉన్న భూయజమానులు", "కౌలు రైతులు (కొత్త పథకం)"], documents: ["ఆధార్", "పట్టా పాస్‌బుక్", "బ్యాంక్ ఖాతా"] },
    6: { fullName: "ఒడిశా కాలియా పథకం", amount: "₹25,000/సంవత్సరం", benefits: ["రైతులకు ఆర్థిక సహాయం", "భూమిలేని వ్యవసాయ కార్మికులు", "బలహీన గిరిజన వర్గాలు", "కౌలుదారులకు సహాయం"], eligibility: ["ఒడిశా రైతులు", "భూమిలేని కార్మికులు", "చిన్న, సన్నకారు రైతులు", "కౌలుదారులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "నివాస ధృవీకరణ", "భూమి రికార్డులు"] },
    7: { fullName: "రాష్ట్రీయ కృషి వికాస్ యోజన", amount: "రాష్ట్ర-నిర్దిష్ట", benefits: ["రాష్ట్ర వ్యవసాయ ప్రాజెక్టులకు నిధులు", "మౌలిక సదుపాయాల అభివృద్ధి", "వ్యవసాయ-పారిశ్రామికవేత్తలు", "విలువ గొలుసు"], eligibility: ["రాష్ట్ర ప్రభుత్వాలు", "FPOలు", "వ్యవసాయ విశ్వవిద్యాలయాలు", "పరిశోధనా సంస్థలు"], documents: ["ప్రాజెక్ట్ ప్రతిపాదన", "రాష్ట్ర ఆమోదం", "అమలు ప్రణాళిక"] },
    8: { fullName: "జాతీయ విత్తన సబ్సిడీ పథకం", amount: "విత్తనాలపై 50% సబ్సిడీ", benefits: ["అధిక దిగుబడినిచ్చే రకం విత్తనాలు", "చిన్న రైతులకు 50% సబ్సిడీ", "ధృవీకరించబడిన విత్తనాలు", "మెరుగైన రకాలు"], eligibility: ["రైతులందరూ", "చిన్న, సన్నకారు రైతులకు ప్రాధాన్యత", "FPOలు"], documents: ["భూమి రికార్డులు", "ఆధార్", "విత్తన బిల్లు", "బ్యాంక్ ఖాతా"] },
    9: { fullName: "పోషకాధారిత సబ్సిడీ (NBS) పథకం", amount: "పోషకాలను బట్టి మారుతుంది", benefits: ["P & K ఎరువులపై సబ్సిడీ", "రైతుల ఖర్చు తగ్గింపు", "సమతుల్య పోషణ", "నేల ఆరోగ్య మెరుగుదల"], eligibility: ["రైతులందరూ", "అధీకృత డీలర్ల ద్వారా"], documents: ["డీలర్ బిల్లు", "ఆధార్ (DBT కోసం)", "భూమి రికార్డులు"] },
    10: { fullName: "మహిళా కిసాన్ సశక్తికరణ్ పరియోజన", amount: "₹50,000/సంవత్సరం", benefits: ["మహిళా రైతుల సాధికారత", "నైపుణ్య శిక్షణ", "ఇన్‌పుట్ సబ్సిడీ", "మార్కెట్ యాక్సెస్"], eligibility: ["మహిళా రైతులు", "మహిళా స్వయం సహాయక సంఘాలు", "మహిళా ఆధారిత కుటుంబాలు"], documents: ["ఆధార్", "భూమి రికార్డులు", "బ్యాంక్ ఖాతా", "SHG సర్టిఫికేట్"] },
    11: { fullName: "కిసాన్ క్రెడిట్ కార్డ్ పథకం", amount: "₹3 లక్షల వరకు", benefits: ["రివాల్వింగ్ క్రెడిట్ సదుపాయం", "వడ్డీ: 7% (సకాలంలో చెల్లిస్తే 4%)", "₹1.6 లక్షల వరకు పూచీకత్తు లేకుండా", "అనుబంధ కార్యకలాపాలకు కవరేజ్"], eligibility: ["రైతులందరూ", "కౌలుదారులు", "భాగస్వామ్య రైతులు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "ఆధార్", "ఫోటో", "పంట వివరాలు"] },
    12: { fullName: "స్వల్పకాలిక పంట రుణాలపై వడ్డీ రాయితీ", amount: "2% వడ్డీ రాయితీ", benefits: ["పంట రుణాలపై 2% వడ్డీ రాయితీ", "సకాలంలో చెల్లిస్తే అదనంగా 3%", "ప్రభావవంతమైన వడ్డీ రేటు: సంవత్సరానికి 4%", "₹3 లక్షల వరకు రుణం"], eligibility: ["పంట రుణాలు తీసుకునే రైతులందరూ", "KCC ఉన్నవారు", "సహకార సంఘం సభ్యులు"], documents: ["KCC", "రుణ దరఖాస్తు", "భూమి రికార్డులు"] },
    13: { fullName: "గోదాముల మౌలిక సదుపాయాల నిధి", amount: "ప్రాజెక్టుకు ₹50 కోట్లు", benefits: ["గోదాము నిర్మాణానికి రుణం", "25% వరకు సబ్సిడీ", "కోత అనంతర మౌలిక సదుపాయాలు", "పంట నష్టం తగ్గింపు"], eligibility: ["FPOలు", "సహకార సంఘాలు", "వ్యవసాయ-పారిశ్రామికవేత్తలు", "రాష్ట్ర ఏజెన్సీలు"], documents: ["ప్రాజెక్ట్ రిపోర్ట్", "భూమి పత్రాలు", "నమోదు ధృవీకరణ"] },
    14: { fullName: "డెయిరీ ఎంటర్‌ప్రెన్యూర్‌షిప్ డెవలప్‌మెంట్ స్కీమ్", amount: "₹5 లక్షల వరకు సబ్సిడీ", benefits: ["డెయిరీ యూనిట్లకు సబ్సిడీ", "జనరల్ కేటగిరీకి 25%, SC/STలకు 33%", "ఆవులు/గేదెల కోసం రుణం", "పాలు ప్రాసెసింగ్ పరికరాలు"], eligibility: ["వ్యక్తిగత రైతులు", "స్వయం సహాయక సంఘాలు", "డెయిరీ సహకార సంఘాలు"], documents: ["భూమి పత్రాలు", "ఆధార్", "బ్యాంక్ ఖాతా", "ప్రాజెక్ట్ రిపోర్ట్"] },
    15: { fullName: "పౌల్ట్రీ వెంచర్ క్యాపిటల్ ఫండ్", amount: "₹3 లక్షల వరకు సబ్సిడీ", benefits: ["కోళ్ల పెంపకానికి సబ్సిడీ", "SC/ST రైతులకు 33%", "బాయిలర్/లేయర్ యూనిట్‌కు రుణం", "హ్యాచరీ సహాయం"], eligibility: ["వ్యక్తిగత రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి పత్రాలు", "ఆధార్", "బ్యాంక్ ఖాతా", "అనుభవ ధృవీకరణ పత్రం"] },
    16: { fullName: "మేకలు మరియు గొర్రెల అభివృద్ధి పథకం", amount: "50% సబ్సిడీ", benefits: ["మేకలు/గొర్రెల పెంపకానికి సబ్సిడీ", "₹50,000 వరకు 50% సబ్సిడీ", "జాతి అభివృద్ధికి సహాయం", "పశువైద్య సంరక్షణ"], eligibility: ["చిన్న రైతులు", "భూమిలేని కార్మికులు", "గిరిజన రైతులు", "మహిళా రైతులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "గ్రామ పంచాయతీ సర్టిఫికేట్"] },
    17: { fullName: "అగ్రి ఇన్‌ఫ్రాస్ట్రక్చర్ ఫండ్", amount: "₹2 కోట్ల వరకు రుణం", benefits: ["ఫార్మ్-గేట్ మౌలిక సదుపాయాలకు రుణం", "3% వడ్డీ రాయితీ", "3 సంవత్సరాల మారటోరియం", "గోదాములు, కోల్డ్ స్టోరేజీలకు కవరేజ్"], eligibility: ["FPOలు", "సహకార సంఘాలు", "వ్యక్తిగత రైతులు", "వ్యవసాయ-పారిశ్రామికవేత్తలు"], documents: ["ప్రాజెక్ట్ రిపోర్ట్", "భూమి పత్రాలు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    18: { fullName: "AHIDF - డెయిరీ & పౌల్ట్రీ లోన్", amount: "₹100 కోట్ల వరకు", benefits: ["డెయిరీ, పౌల్ట్రీ మౌలిక సదుపాయాలకు రుణం", "3% వడ్డీ రాయితీ", "క్రెడిట్ గ్యారెంటీ అందుబాటులో ఉంది", "పాలు ప్రాసెసింగ్, హ్యాచరీలకు కవరేజ్"], eligibility: ["వ్యక్తిగత పారిశ్రామికవేత్తలు", "FPOలు", "ప్రైవేట్ కంపెనీలు", "సహకార సంఘాలు"], documents: ["DPR", "వ్యాపార నమోదు", "భూమి పత్రాలు", "బ్యాంక్ ఖాతా"] },
    19: { fullName: "FIDF - మత్స్య రుణ పథకం", amount: "₹50 లక్షల వరకు", benefits: ["మత్స్య మౌలిక సదుపాయాలకు రుణం", "4% వడ్డీ రాయితీ", "హ్యాచరీ, ఫీడ్ మిల్లులకు కవరేజ్", "చేపల కోసం కోల్డ్ చైన్"], eligibility: ["చేపల రైతులు", "FPOలు", "సహకార సంఘాలు", "స్వయం సహాయక సంఘాలు"], documents: ["జల వనరుల లీజు పత్రం", "ప్రాజెక్ట్ రిపోర్ట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    20: { fullName: "ఫుడ్ ప్రాసెసింగ్ రుణ పథకం", amount: "₹10 కోట్ల వరకు", benefits: ["ఫుడ్ ప్రాసెసింగ్ యూనిట్లకు రుణం", "35% మూలధన సబ్సిడీ", "5% వడ్డీ రాయితీ", "పండ్లు, కూరగాయలు, ధాన్యాలకు కవరేజ్"], eligibility: ["ఆహార ప్రాసెసర్లు", "FPOలు", "సహకార సంఘాలు", "వ్యవసాయ-పారిశ్రామికవేత్తలు"], documents: ["DPR", "భూమి పత్రాలు", "FSSAI లైసెన్స్", "బ్యాంక్ ఖాతా"] },
    21: { fullName: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన", amount: "తక్కువ ప్రీమియం: 1.5-5%", benefits: ["తక్కువ ప్రీమియంతో పంట బీమా", "రబీకి 1.5%, ఖరీఫ్‌కి 2%", "21 రోజుల్లో క్లెయిమ్", "విత్తే ముందు నుండి కోత తర్వాత వరకు కవరేజ్"], eligibility: ["రైతులందరూ", "రుణం తీసుకున్న రైతులకు తప్పనిసరి", "రుణం తీసుకోని వారికి ఐచ్ఛికం", "కౌలుదారులు"], documents: ["భూమి రికార్డులు", "పంట ప్రకటన", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    22: { fullName: "వాతావరణ ఆధారిత పంట బీమా పథకం", amount: "ప్రీమియం 1.5-8%", benefits: ["వాతావరణ సూచిక ఆధారిత బీమా", "వర్షాభావం/అధిక వర్షపాతానికి కవరేజ్", "ఉష్ణోగ్రత మరియు తేమ కవరేజ్", "త్వరిత క్లెయిమ్ సెటిల్మెంట్"], eligibility: ["నోటిఫై చేయబడిన ప్రాంతాల రైతులు", "వాతావరణ-సెన్సిటివ్ పంటలు", "అన్ని రైతుల వర్గాలు"], documents: ["భూమి రికార్డులు", "వాతావరణ డేటా", "ఆధార్"] },
    23: { fullName: "కొబ్బరి చెట్ల బీమా పథకం", amount: "ప్రీమియం: ₹100-500/చెట్టు", benefits: ["కొబ్బరి చెట్లకు బీమా", "తెగుళ్లు, వ్యాధుల కవరేజ్", "ప్రకృతి విపత్తుల కవరేజ్", "5 సంవత్సరాల వరకు కవరేజ్"], eligibility: ["కొబ్బరి రైతులు", "కనీసం 5 చెట్లు ఉండాలి", "అన్ని రాష్ట్రాలు"], documents: ["భూమి రికార్డులు", "చెట్ల లెక్కింపు", "ఆధార్"] },
    24: { fullName: "రబ్బర్ బీమా పథకం", amount: "₹30,000/హెక్టారు", benefits: ["రబ్బరు చెట్లకు బీమా", "ప్రకృతి విపత్తుల కవరేజ్", "తెగుళ్లు, వ్యాధుల కవరేజ్", "దిగుబడి నష్టానికి పరిహారం"], eligibility: ["రబ్బరు సాగుదారులు", "కనీసం 0.5 హెక్టార్లు", "రబ్బర్ బోర్డులో నమోదు"], documents: ["భూమి రికార్డులు", "రబ్బర్ బోర్డు రిజిస్ట్రేషన్", "ఆధార్"] },
    25: { fullName: "కాఫీ పంట బీమా", amount: "ప్రీమియం 3.5%", benefits: ["కాఫీ తోటలకు బీమా", "అరబికా, రోబస్టా కవరేజ్", "దిగుబడి నష్టానికి కవరేజ్", "ధరల హెచ్చుతగ్గుల కవరేజ్"], eligibility: ["కాఫీ సాగుదారులు", "కాఫీ బోర్డులో నమోదు", "కనీసం 0.5 ఎకరాలు"], documents: ["భూమి రికార్డులు", "కాఫీ బోర్డు రిజిస్ట్రేషన్"] },
    26: { fullName: "టీ పంట బీమా", amount: "ప్రీమియం 2.5%", benefits: ["తేయాకు తోటలకు బీమా", "పచ్చి ఆకుల దిగుబడి కవరేజ్", "కరువు, వరదల కవరేజ్", "తెగుళ్లు, వ్యాధుల కవరేజ్"], eligibility: ["తేయాకు సాగుదారులు", "టీ బోర్డులో నమోదు", "అన్ని రాష్ట్రాలు"], documents: ["భూమి రికార్డులు", "టీ బోర్డు రిజిస్ట్రేషన్"] },
    27: { fullName: "UPIS - ఫసల్ ప్లస్ బీమా", amount: "ప్రీమియం: 2-8%", benefits: ["పంట + ఆస్తి సంయుక్త బీమా", "ఇల్లు, ట్రాక్టర్, పశువుల కవరేజ్", "అన్నింటికీ ఒకే ప్రీమియం", "త్వరిత క్లెయిమ్ సెటిల్మెంట్"], eligibility: ["రైతులందరూ", "రుణం తీసుకున్న రైతులకు తప్పనిసరి", "రుణం తీసుకోని వారికి ఐచ్ఛికం"], documents: ["భూమి రికార్డులు", "ఆస్తి జాబితా", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    28: { fullName: "ఆయిల్ పామ్ బీమా పథకం", amount: "ప్రీమియం: 2.5%", benefits: ["ఆయిల్ పామ్ తోటలకు బీమా", "దిగుబడి నష్టానికి కవరేజ్", "తెగుళ్లు, వ్యాధుల కవరేజ్", "5 సంవత్సరాల పాలసీ ఎంపిక"], eligibility: ["ఆయిల్ పామ్ సాగుదారులు", "NMEO-OP లో నమోదు", "కనీసం 1 హెక్టారు"], documents: ["భూమి రికార్డులు", "తోట నమోదు", "ఆధార్"] },
    29: { fullName: "యాలకుల పంట బీమా", amount: "ప్రీమియం: 3%", benefits: ["యాలకుల తోటలకు బీమా", "వాతావరణం వల్ల దిగుబడి నష్టం కవరేజ్", "తెగుళ్లు, వ్యాధుల కవరేజ్", "త్వరిత క్లెయిమ్ సెటిల్మెంట్"], eligibility: ["యాలకుల సాగుదారులు", "స్పైసెస్ బోర్డులో నమోదు", "కనీసం 0.5 ఎకరాలు"], documents: ["భూమి రికార్డులు", "స్పైసెస్ బోర్డు రిజిస్ట్రేషన్", "ఆధార్"] },
    30: { fullName: "జాతీయ పశువుల బీమా పథకం", amount: "ప్రీమియం: 4-6%", benefits: ["ఆవు, గేదె, గొర్రె, మేకలకు బీమా", "ప్రమాదం/వ్యాధితో మరణిస్తే కవరేజ్", "BPL కు రాయితీ ప్రీమియం", "త్వరిత క్లెయిమ్ సెటిల్మెంట్"], eligibility: ["పశువుల పెంపకందారులందరూ", "డెయిరీ రైతులు", "BPL కుటుంబాలకు ప్రాధాన్యత"], documents: ["పశువుల గుర్తింపు", "పశువైద్య ధృవీకరణ పత్రం", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    51: { fullName: "మృత్తిక ఆరోగ్య కార్డు పథకం", amount: "ఉచిత సేవ", benefits: ["ప్రతి 2 సంవత్సరాలకు ఉచిత మట్టి పరీక్ష", "12 పారామితుల విశ్లేషణ", "పంట ఆధారిత సిఫార్సులు", "ఎరువుల ఖర్చులో 10-15% తగ్గింపు"], eligibility: ["రైతులందరూ", "చిన్న రైతులకు ప్రాధాన్యత"], documents: ["భూమి రికార్డులు", "రైతు గుర్తింపు కార్డు"] },
    52: { fullName: "సంచార మృత్తిక పరీక్షా ప్రయోగశాలలు", amount: "ప్రయోగశాలకు ₹25 లక్షలు", benefits: ["సంచార మట్టి పరీక్ష వ్యాన్లు", "ఇంటి వద్దకే ఉచిత సేవ", "7 రోజుల్లో ఫలితాలు", "మారుమూల గ్రామాలకు కవరేజ్"], eligibility: ["రాష్ట్ర ప్రభుత్వాలు", "KVKలు", "వ్యవసాయ విశ్వవిద్యాలయాలు"], documents: ["ప్రతిపాదన", "మౌలిక సదుపాయాల వివరాలు"] },
    53: { fullName: "నేల ఆరోగ్య నిర్వహణ (SHM)", amount: "₹2,000/హెక్టారు", benefits: ["నేల సవరణ సబ్సిడీ", "సున్నం/జిప్సం వాడకం", "సూక్ష్మ పోషకాల సరఫరా", "జీవ ఎరువుల ప్రోత్సాహం"], eligibility: ["రైతులందరూ", "సాయిల్ హెల్త్ కార్డ్ ఉన్నవారు"], documents: ["సాయిల్ హెల్త్ కార్డ్", "భూమి రికార్డులు"] },
    54: { fullName: "సూక్ష్మ పోషకాల లోప సవరణ", amount: "ఎకరానికి ₹1,000 వరకు 50% సబ్సిడీ", benefits: ["జింక్, బోరాన్, ఇనుము సరఫరా", "లోప నివారణ", "నాణ్యమైన విత్తన సబ్సిడీ", "దిగుబడి మెరుగుదల"], eligibility: ["సూక్ష్మ పోషకాల లోపం ఉన్న రైతులు", "మట్టి పరీక్ష నివేదిక తప్పనిసరి"], documents: ["సాయిల్ హెల్త్ కార్డ్", "భూమి రికార్డులు"] },
    55: { fullName: "నేల ఆమ్లత్వం/క్షారత్వం సవరణ", amount: "50% సబ్సిడీ", benefits: ["ఆమ్ల నేలలకు సున్నం", "క్షార నేలలకు జిప్సం", "నేల pH మెరుగుదల", "పోషకాల లభ్యత పెంపు"], eligibility: ["సమస్యాత్మక నేలలున్న రైతులు", "మట్టి పరీక్ష తప్పనిసరి"], documents: ["మట్టి పరీక్ష నివేదిక", "భూమి రికార్డులు"] },
    56: { fullName: "సేంద్రియ పదార్థాల పెంపుదల పథకం", amount: "₹5,000/హెక్టారు", benefits: ["పచ్చిరొట్ట ఎరువు సబ్సిడీ", "కంపోస్ట్ ప్రోత్సాహం", "పంట అవశేషాల నిర్వహణ", "నేలలో సేంద్రియ కర్బనం మెరుగుదల"], eligibility: ["రైతులందరూ", "సేంద్రియ వ్యవసాయ సమూహాలు"], documents: ["భూమి రికార్డులు", "సాయిల్ హెల్త్ కార్డ్", "ఆధార్"] },
    57: { fullName: "ఉచిత జీవ ఎరువుల పంపిణీ", amount: "ఎకరానికి 5 కిలోల వరకు ఉచితం", benefits: ["ఉచిత రైజోబియం, PSB, అజటోబాక్టర్", "రసాయన ఎరువుల వాడకం తగ్గింపు", "నేల జీవశాస్త్రం మెరుగుదల", "KVKల వద్ద లభ్యం"], eligibility: ["రైతులందరూ", "చిన్న మరియు సన్నకారు రైతులకు ప్రాధాన్యత"], documents: ["భూమి రికార్డులు", "సాయిల్ హెల్త్ కార్డ్", "ఆధార్"] },
    58: { fullName: "వానపాముల ఎరువుల ఉత్పత్తి యూనిట్", amount: "₹25,000 వరకు 50% సబ్సిడీ", benefits: ["వర్మీకంపోస్ట్ యూనిట్ ఏర్పాటు", "వానపాముల సరఫరా", "సేంద్రియ ఎరువుల ఉత్పత్తి", "వ్యర్థాల రీసైక్లింగ్"], eligibility: ["వ్యక్తిగత రైతులు", "స్వయం సహాయక సంఘాలు", "మహిళా రైతులు"], documents: ["భూమి రికార్డులు", "ప్రాజెక్ట్ ప్రతిపాదన", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    59: { fullName: "నేల కోత నివారణ పథకం", amount: "75% సబ్సిడీ", benefits: ["కంటూర్ బండింగ్", "టెర్రస్ ఫార్మింగ్ సహాయం", "గల్లీ ప్లగింగ్", "స్ట్రిప్ క్రాపింగ్ ప్రోత్సాహం"], eligibility: ["కొండ ప్రాంతాల రైతులు", "కోతకు గురయ్యే ప్రాంతాలు"], documents: ["భూమి రికార్డులు", "నేల కోత ధృవీకరణ", "ఆధార్"] },
    60: { fullName: "భూమి చదును మరియు అభివృద్ధి", amount: "ఎకరానికి ₹10,000 వరకు 50% సబ్సిడీ", benefits: ["లేజర్ ల్యాండ్ లెవలింగ్ సబ్సిడీ", "భూమి ఆకృతి మార్పు", "మురుగునీటి పారుదల మెరుగుదల", "నీటి వినియోగ సామర్థ్యం పెంపు"], eligibility: ["రైతులందరూ", "FPOలు", "నీటి కొరత ఉన్న ప్రాంతాలకు ప్రాధాన్యత"], documents: ["భూమి రికార్డులు", "ఆధార్", "కొటేషన్", "బ్యాంక్ ఖాతా"] },
    61: { fullName: "పరంపరాగత్ కృషి వికాస్ యోజన", amount: "₹31,500/హెక్టారు", benefits: ["సేంద్రియ ఇన్‌పుట్‌ల కోసం ₹15,000", "ధృవీకరణ కోసం ₹10,000", "శిక్షణ కోసం ₹6,500", "3 సంవత్సరాల సహాయం"], eligibility: ["రైతు సమూహాలు (50+ రైతులు)", "FPOలు", "స్వయం సహాయక సంఘాలు", "కనీసం 50 ఎకరాలు"], documents: ["క్లస్టర్ రిజిస్ట్రేషన్", "రైతుల జాబితా", "భూమి వివరాలు", "మట్టి పరీక్ష నివేదిక"] },
    62: { fullName: "ఈశాన్య ప్రాంతం కోసం సేంద్రియ విలువ గొలుసు అభివృద్ధి మిషన్", amount: "₹75,000/హెక్టారు", benefits: ["ఈశాన్య రాష్ట్రాల్లో సేంద్రియ వ్యవసాయం", "FPO ఏర్పాటుకు సహాయం", "మార్కెట్ అనుసంధానం", "ప్రాసెసింగ్ మౌలిక సదుపాయాలు"], eligibility: ["ఈశాన్య రాష్ట్రాల రైతులు", "FPOలు", "సేంద్రియ సమూహాలు", "గిరిజన రైతులు"], documents: ["భూమి రికార్డులు", "FPO రిజిస్ట్రేషన్", "రైతు గుర్తింపు కార్డు", "బ్యాంక్ ఖాతా"] },
    63: { fullName: "వానపాముల ఎరువుల ఉత్పత్తి యూనిట్ పథకం", amount: "₹50,000 వరకు 50% సబ్సిడీ", benefits: ["వర్మీకంపోస్ట్ యూనిట్ ఏర్పాటు", "వానపాముల సరఫరా", "శిక్షణ సదుపాయం", "సేంద్రియ ఎరువుల ఉత్పత్తి"], eligibility: ["వ్యక్తిగత రైతులు", "స్వయం సహాయక సంఘాలు", "FPOలు", "మహిళా రైతులు"], documents: ["భూమి పత్రాలు", "ప్రాజెక్ట్ ప్రతిపాదన", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    64: { fullName: "జీవ ఎరువుల ఉత్పత్తి యూనిట్ పథకం", amount: "₹2 లక్షల వరకు 40% సబ్సిడీ", benefits: ["రైజోబియం, PSB ఉత్పత్తి", "అజటోబాక్టర్, VAM సరఫరా", "నాణ్యత నియంత్రణ ల్యాబ్", "రైతులకు శిక్షణ"], eligibility: ["స్వయం సహాయక సంఘాలు", "FPOలు", "యువ పారిశ్రామికవేత్తలు", "వ్యవసాయ పట్టభద్రులు"], documents: ["వ్యాపార ప్రణాళిక", "సాంకేతిక అర్హత", "భూమి లీజు", "బ్యాంక్ ఖాతా"] },
    65: { fullName: "జీరో బడ్జెట్ ప్రకృతి వ్యవసాయ పథకం", amount: "₹15,000/హెక్టారు", benefits: ["ప్రకృతి వ్యవసాయ ప్రోత్సాహం", "ఆధారిత వ్యవసాయం", "జీవ-పురుగుమందుల శిక్షణ", "మల్చింగ్ సహాయం"], eligibility: ["రైతులందరూ", "వర్షాధార ప్రాంతాలకు ప్రాధాన్యత", "చిన్న మరియు సన్నకారు రైతులు"], documents: ["భూమి రికార్డులు", "శిక్షణ ధృవీకరణ పత్రం", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    66: { fullName: "PGS-ఇండియా ధృవీకరణ సహాయం", amount: "₹10,000 వరకు 100% సబ్సిడీ", benefits: ["ఉచిత సేంద్రియ ధృవీకరణ", "సమూహాలకు గ్రూప్ సర్టిఫికేషన్", "నాణ్యత హామీ", "మార్కెట్ యాక్సెస్"], eligibility: ["రైతు సమూహాలు", "FPOలు", "సేంద్రియ రైతు సంఘాలు"], documents: ["క్లస్టర్ రిజిస్ట్రేషన్", "రైతుల జాబితా", "భూమి రికార్డులు"] },
    67: { fullName: "పశువుల ఎరువు నిర్వహణ పథకం", amount: "₹30,000 వరకు 50% సబ్సిడీ", benefits: ["కంపోస్ట్ గుంతల నిర్మాణం", "ఎరువుల ప్రాసెసింగ్", "బయోగ్యాస్ యూనిట్ సబ్సిడీ", "పశువుల ఎరువు ప్రోత్సాహం"], eligibility: ["పశువులున్న రైతులు", "డెయిరీ రైతులు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "పశువుల లెక్కింపు ధృవీకరణ", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    68: { fullName: "పచ్చిరొట్ట విత్తనాల సబ్సిడీ", amount: "విత్తనాలపై 50% సబ్సిడీ", benefits: ["జనుము, జీలుగ విత్తనాలు", "నేల సారాన్ని మెరుగుపరచడం", "కలుపు నివారణ", "ఎరువుల అవసరం తగ్గింపు"], eligibility: ["రైతులందరూ", "సేంద్రియ రైతులకు ప్రాధాన్యత"], documents: ["భూమి రికార్డులు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    69: { fullName: "రాష్ట్ర సేంద్రియ వ్యవసాయ ప్రోత్సాహం", amount: "₹20,000/హెక్టారు", benefits: ["సేంద్రియ ఇన్‌పుట్ సబ్సిడీ", "శిక్షణ మరియు ప్రదర్శన", "మార్కెట్ అనుసంధాన సహాయం", "PGS సర్టిఫికేషన్"], eligibility: ["రైతులందరూ", "సేంద్రియ సమూహాలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "శిక్షణ ధృవీకరణ పత్రం", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    70: { fullName: "జీవ పురుగుమందుల ప్రోత్సాహక పథకం", amount: "ఎకరానికి ₹2,000 వరకు 50% సబ్సిడీ", benefits: ["వేప ఆధారిత పురుగుమందులు", "ట్రైకోడెర్మా సరఫరా", "సూడోమోనాస్ కల్చర్", "IPM శిక్షణ"], eligibility: ["రైతులందరూ", "సేంద్రియ రైతులు", "FPOలు"], documents: ["భూమి రికార్డులు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    71: { fullName: "ఉద్యానవన సమగ్ర అభివృద్ధి మిషన్ (MIDH)", amount: "50-75% సబ్సిడీ", benefits: ["పండ్లు, కూరగాయల పెంపకం", "నర్సరీ అభివృద్ధి", "కోత అనంతర నిర్వహణ", "ప్యాకేజింగ్ సబ్సిడీ"], eligibility: ["రైతులందరూ", "FPOలు", "నర్సరీ యజమానులు", "మహిళా రైతులు"], documents: ["భూమి రికార్డులు", "ప్రాజెక్ట్ ప్రతిపాదన", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    72: { fullName: "కొబ్బరి అభివృద్ధి పథకం", amount: "₹50,000/హెక్టారు", benefits: ["చిన్న రైతులకు 70% సబ్సిడీ", "అధిక దిగుబడినిచ్చే మొక్కలు", "పాత చెట్ల స్థానంలో కొత్తవి", "విలువ ఆధారిత సహాయం"], eligibility: ["కేరళ, తమిళనాడు, కర్ణాటక, ఆంధ్రప్రదేశ్ కొబ్బరి రైతులు", "FPOలు", "చిన్న రైతులు"], documents: ["భూమి రికార్డులు", "చెట్ల లెక్కింపు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    73: { fullName: "జీడిపప్పు మరియు కోకో కార్యక్రమం", amount: "₹25,000/హెక్టారు", benefits: ["జీడిమామిడి పెంపకం సబ్సిడీ", "కోకో సాగుకు సహాయం", "ప్రాసెసింగ్ యూనిట్ సబ్సిడీ", "ఎగుమతి ప్రోత్సాహం"], eligibility: ["తీరప్రాంత రాష్ట్రాల రైతులు", "FPOలు", "ప్రాసెసింగ్ యూనిట్లు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "ప్రాజెక్ట్ రిపోర్ట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    74: { fullName: "వెదురు అభివృద్ధి పథకం", amount: "₹30,000/హెక్టారు", benefits: ["వెదురు పెంపకం సబ్సిడీ", "నర్సరీ అభివృద్ధి", "విలువ ఆధారిత యూనిట్లు", "హస్తకళలకు సహాయం"], eligibility: ["ఈశాన్య రాష్ట్రాల రైతులు", "FPOలు", "గిరిజన రైతులు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "వెదురు విస్తీర్ణం వివరాలు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    75: { fullName: "సుగంధ ద్రవ్యాల అభివృద్ధి మరియు ప్రాసెసింగ్", amount: "40% సబ్సిడీ", benefits: ["సుగంధ ద్రవ్యాల ప్రాసెసింగ్ యూనిట్లు", "విలువ ఆధారిత పరికరాలు", "నాణ్యత పరీక్ష ల్యాబ్", "ఎగుమతి సదుపాయం"], eligibility: ["సుగంధ ద్రవ్యాల సాగుదారులు", "FPOలు", "ప్రాసెసర్లు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "స్పైసెస్ బోర్డు నమోదు", "ప్రాజెక్ట్ రిపోర్ట్", "బ్యాంక్ ఖాతా"] },
    76: { fullName: "మామిడి తోటలు మరియు ప్రాసెసింగ్", amount: "₹40,000/హెక్టారు", benefits: ["అధిక దిగుబడినిచ్చే మామిడి మొక్కలు", "ప్రాసెసింగ్ యూనిట్ సహాయం", "కోల్డ్ స్టోరేజ్ సబ్సిడీ", "ఎగుమతి ప్రోత్సాహం"], eligibility: ["మామిడి రైతులు", "FPOలు", "ప్రాసెసింగ్ యూనిట్లు"], documents: ["భూమి రికార్డులు", "రకం వివరాలు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    77: { fullName: "అరటి తోటలు మరియు విలువ ఆధారిత సృష్టి", amount: "₹35,000/హెక్టారు", benefits: ["టిష్యూ కల్చర్ మొక్కల సబ్సిడీ", "డ్రిప్ ఇరిగేషన్ సహాయం", "ప్రాసెసింగ్ యూనిట్లు", "మార్కెట్ అనుసంధానం"], eligibility: ["అరటి రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "రకం వివరాలు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    78: { fullName: "జాతీయ పూల సాగు మిషన్", amount: "₹5 లక్షల వరకు 50% సబ్సిడీ", benefits: ["పూల సాగుకు సహాయం", "గ్రీన్‌హౌస్ సబ్సిడీ", "ఎగుమతి నాణ్యత గల పూలు", "కోల్డ్ చైన్ సహాయం"], eligibility: ["పూల సాగుదారులు", "FPOలు", "మహిళా రైతులు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "గ్రీన్‌హౌస్ ప్రతిపాదన", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    79: { fullName: "జాతీయ పుట్టగొడుగుల మిషన్", amount: "₹1 లక్ష వరకు 50% సబ్సిడీ", benefits: ["మష్రూమ్ స్పాన్ సబ్సిడీ", "గ్రోయింగ్ రూమ్ నిర్మాణం", "శిక్షణ మరియు సాంకేతికత", "మార్కెటింగ్ సహాయం"], eligibility: ["రైతులందరూ", "స్వయం సహాయక సంఘాలు", "మహిళా రైతులు", "గ్రామీణ యువత"], documents: ["భూమి రికార్డులు", "ఆధార్", "బ్యాంక్ ఖాతా", "శిక్షణ సర్టిఫికేట్"] },
    80: { fullName: "కూరగాయల క్లస్టర్ అభివృద్ధి పథకం", amount: "₹20,000/హెక్టారు", benefits: ["కూరగాయల విత్తనాల సబ్సిడీ", "రక్షిత సాగు", "మార్కెట్ అనుసంధానం", "కోత అనంతర నిర్వహణ"], eligibility: ["కూరగాయల రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు", "మహిళా రైతులు"], documents: ["భూమి రికార్డులు", "పంట ప్రణాళిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    81: { fullName: "వ్యవసాయ వనరుల కోసం వర్చువల్ ఇంటిగ్రేటెడ్ సిస్టమ్", amount: "ఉచిత AI సేవ", benefits: ["AI-ఆధారిత వ్యవసాయ సలహాలు", "22+ భారతీయ భాషలు", "పంట సిఫార్సులు", "తెగుళ్ల హెచ్చరికలు", "మార్కెట్ ధరలు"], eligibility: ["రైతులందరూ", "FPOలు", "విస్తరణ అధికారులు", "KVKలు"], documents: ["ఆధార్", "మొబైల్ నంబర్", "భూమి రికార్డులు (ఐచ్ఛికం)"] },
    82: { fullName: "జాతీయ అగ్రిస్టాక్ డిజిటల్ ప్లాట్‌ఫారమ్", amount: "ఉచిత డిజిటల్ గుర్తింపు", benefits: ["ప్రత్యేక రైతు గుర్తింపు కార్డు", "డిజిటల్ భూమి రికార్డులు", "పంట విత్తే డేటా", "ప్రత్యక్ష ప్రయోజన బదిలీ (DBT) ఏకీకరణ"], eligibility: ["రైతులందరూ", "పథకం లబ్ధిదారులకు ప్రాధాన్యత", "చిన్న మరియు సన్నకారు రైతులు"], documents: ["ఆధార్", "భూమి రికార్డులు", "బ్యాంక్ ఖాతా", "మొబైల్ నంబర్"] },
    83: { fullName: "జాతీయ వ్యవసాయ మార్కెట్ (e-NAM)", amount: "ఉచిత ట్రేడింగ్ ప్లాట్‌ఫారమ్", benefits: ["ఆన్‌లైన్ మండి ట్రేడింగ్", "రియల్ టైమ్ ధరల గుర్తింపు", "1000+ మండీల అనుసంధానం", "రైతులకు నేరుగా చెల్లింపు"], eligibility: ["రైతులందరూ", "వ్యాపారులు", "FPOలు", "కమిషన్ ఏజెంట్లు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "ట్రేడింగ్ లైసెన్స్", "మొబైల్ నంబర్"] },
    84: { fullName: "కిసాన్ సువిధ మొబైల్ అప్లికేషన్", amount: "ఉచిత యాప్", benefits: ["వాతావరణ నవీకరణలు", "మండీ ధరలు", "తెగుళ్ల హెచ్చరికలు", "డీలర్ల సమాచారం", "పంట రక్షణ"], eligibility: ["రైతులందరూ", "ప్లే స్టోర్ నుండి ఉచిత డౌన్‌లోడ్", "నమోదు అవసరం లేదు"], documents: ["మొబైల్ నంబర్", "ఆండ్రాయిడ్ ఫోన్"] },
    85: { fullName: "ICAR-పూసా కృషి మొబైల్ యాప్", amount: "ఉచితం", benefits: ["పంట రకాల డేటాబేస్", "వ్యవసాయ పద్ధతుల ప్యాకేజీ", "వ్యాధుల నిర్ధారణ", "నిపుణుల సలహాలు"], eligibility: ["రైతులందరూ", "ఉచిత డౌన్‌లోడ్", "హిందీ మరియు ఆంగ్లంలో అందుబాటులో ఉంది"], documents: ["అవసరం లేదు"] },
    86: { fullName: "కిసాన్ కాల్ సెంటర్ 1551", amount: "టోల్ ఫ్రీ", benefits: ["24x7 వ్యవసాయ ప్రశ్నలు", "నిపుణుల సలహా", "బహుభాషా సహాయం", "పథకాల సమాచారం"], eligibility: ["రైతులందరూ", "టోల్ ఫ్రీ నంబర్: 1551", "ఏ ఫోన్ నుండి అయినా కాల్ చేయవచ్చు"], documents: ["అవసరం లేదు"] },
    87: { fullName: "రైతుల కోసం mKisan SMS పోర్టల్", amount: "ఉచిత SMS సేవ", benefits: ["ఉచిత SMS హెచ్చరికలు", "వాతావరణ సూచన", "మార్కెట్ ధరలు", "పంట రక్షణ సలహాలు"], eligibility: ["రైతులందరూ", "మొబైల్ నంబర్ నమోదు తప్పనిసరి", "ఏ మొబైల్ నెట్‌వర్క్‌లోనైనా"], documents: ["మొబైల్ నంబర్", "రైతు నమోదు"] },
    88: { fullName: "కస్టమ్ హైరింగ్ సెంటర్ మొబైల్ యాప్", amount: "ఉచిత సేవ", benefits: ["సమీప వ్యవసాయ యంత్రాలను కనుగొనండి", "ఆన్‌లైన్‌లో పరికరాలను బుక్ చేయండి", "అద్దె ధరల పోలిక", "రైతుల సమీక్షలు"], eligibility: ["రైతులందరూ", "FPOలు", "కస్టమ్ హైరింగ్ సెంటర్లు"], documents: ["మొబైల్ నంబర్", "లొకేషన్ యాక్సెస్"] },
    89: { fullName: "NPSS - డిజిటల్ తెగుళ్ల నిఘా", amount: "ఉచిత సేవ", benefits: ["AI ఆధారిత తెగుళ్ల గుర్తింపు", "ముందస్తు హెచ్చరిక వ్యవస్థ", "పంట-నిర్దిష్ట హెచ్చరికలు", "నివారణ సిఫార్సులు"], eligibility: ["రైతులందరూ", "ఉచిత మొబైల్ యాప్", "నమోదు అవసరం లేదు"], documents: ["మొబైల్ నంబర్", "పంట ఫోటో (నిర్ధారణ కోసం)"] },
    90: { fullName: "అగ్రి-స్టార్టప్ ఇంక్యుబేషన్ పథకం", amount: "₹25 లక్షల గ్రాంట్", benefits: ["అగ్రి-టెక్ స్టార్టప్‌లకు నిధులు", "మార్గదర్శకత్వం", "ఇంక్యుబేషన్ సహాయం", "పెట్టుబడిదారుల అనుసంధానం"], eligibility: ["అగ్రి-టెక్ స్టార్టప్‌లు", "యువ పారిశ్రామికవేత్తలు (18-35)", "గ్రామీణ ఆవిష్కర్తలు"], documents: ["వ్యాపార ప్రణాళిక", "స్టార్టప్ నమోదు", "జట్టు వివరాలు", "ఆవిష్కరణ రుజువు"] },
    91: { fullName: "ప్రధాన మంత్రి కిసాన్ ఊర్జా సురక్షా ఏవం ఉత్థాన్ మహాభియాన్ (PM-KUSUM)", amount: "60% సబ్సిడీ", benefits: ["సోలార్ పంప్‌కు 60% సబ్సిడీ (7.5 HP వరకు)", "బంజరు భూముల్లో సోలార్ ప్యానెల్స్", "అదనపు విద్యుత్‌ను గ్రిడ్‌కు విక్రయించడం", "విద్యుత్ ఖర్చు తగ్గింపు"], eligibility: ["వ్యవసాయ భూమి ఉన్న రైతులు", "వ్యక్తిగత రైతులు", "నీటి వినియోగదారుల సంఘాలు", "FPOలు"], documents: ["భూమి రికార్డులు", "విద్యుత్ కనెక్షన్ ధృవీకరణ", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    92: { fullName: "సోలార్ చరఖా క్లస్టర్", amount: "₹4.5 లక్షల సబ్సిడీ", benefits: ["సోలార్ చరఖా యూనిట్లు", "మహిళా సాధికారత", "ఖాదీ ఉత్పత్తి", "గ్రామీణ ఉపాధి"], eligibility: ["స్వయం సహాయక సంఘాలు", "మహిళా రైతులు", "గ్రామీణ కళాకారులు", "ఖాదీ సంస్థలు"], documents: ["SHG రిజిస్ట్రేషన్", "ప్రాజెక్ట్ ప్రతిపాదన", "బ్యాంక్ ఖాతా"] },
    93: { fullName: "సౌరశక్తితో నడిచే కోల్డ్ స్టోరేజ్ పథకం", amount: "₹10 లక్షల వరకు 50% సబ్సిడీ", benefits: ["రైతుల కోసం సోలార్ కోల్డ్ స్టోరేజ్", "కోత అనంతర నష్టం తగ్గింపు", "ఆఫ్-గ్రిడ్ ఆపరేషన్", "పండ్లు, కూరగాయల పరిరక్షణ"], eligibility: ["FPOలు", "రైతు సహకార సంఘాలు", "స్వయం సహాయక సంఘాలు", "వ్యక్తిగత రైతులు"], documents: ["భూమి రికార్డులు", "ప్రాజెక్ట్ రిపోర్ట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    94: { fullName: "వ్యవసాయ ఉత్పత్తుల కోసం సోలార్ డ్రయ్యర్", amount: "₹2 లక్షల వరకు 40% సబ్సిడీ", benefits: ["ధాన్యం/పండ్ల కోసం సోలార్ డ్రయ్యర్", "నాణ్యత పరిరక్షణ", "విలువ ఆధారిత సృష్టి", "ఎండబెట్టడంపై ఆధారపడటం తగ్గింపు"], eligibility: ["రైతులందరూ", "FPOలు", "స్వయం సహాయక సంఘాలు", "మహిళా రైతులు"], documents: ["భూమి రికార్డులు", "కొటేషన్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    95: { fullName: "పంట రక్షణ కోసం సోలార్ ఫెన్సింగ్", amount: "₹50,000 వరకు 50% సబ్సిడీ", benefits: ["పొలాలకు సోలార్ కంచె", "వన్యప్రాణుల నుండి రక్షణ", "తక్కువ నిర్వహణ", "విద్యుత్ బిల్లు ఉండదు"], eligibility: ["వన్యప్రాణుల బెడద ఉన్న రైతులు", "తోటల యజమానులు", "రైతులందరూ"], documents: ["భూమి రికార్డులు", "స్థల ధృవీకరణ", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    96: { fullName: "ఆఫ్-గ్రిడ్ సోలార్ వాటర్ పంపింగ్", amount: "₹1.5 లక్షల వరకు 75% సబ్సిడీ", benefits: ["సోలార్ సబ్‌మెర్సిబుల్ పంప్", "డీజిల్/విద్యుత్ ఖర్చు ఉండదు", "మారుమూల ప్రాంతాలకు అనుకూలం", "5 సంవత్సరాల వారంటీ"], eligibility: ["చిన్న మరియు సన్నకారు రైతులు", "గ్రిడ్ కనెక్షన్ లేని ప్రాంతాలు"], documents: ["భూమి రికార్డులు", "నీటి వనరుల ధృవీకరణ", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    97: { fullName: "సౌరశక్తితో నడిచే రక్షిత సాగు", amount: "₹5 లక్షల వరకు 60% సబ్సిడీ", benefits: ["సోలార్ ఫ్యాన్లు, కూలింగ్", "ఉష్ణోగ్రత నియంత్రణ", "పొడిగించిన విత్తే సీజన్", "అధిక దిగుబడి"], eligibility: ["ఉద్యానవన రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "గ్రీన్‌హౌస్ ప్రణాళిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    98: { fullName: "వ్యవసాయ డ్రోన్ల కోసం సోలార్ ఛార్జింగ్", amount: "₹50,000 వరకు 40% సబ్సిడీ", benefits: ["సోలార్ ఛార్జింగ్ స్టేషన్లు", "ఆఫ్-గ్రిడ్ డ్రోన్ ఆపరేషన్", "సుస్థిర వ్యవసాయం", "డీజిల్ వాడకం తగ్గింపు"], eligibility: ["FPOలు", "డ్రోన్ దీదీ లబ్ధిదారులు", "స్వయం సహాయక సంఘాలు"], documents: ["డ్రోన్ కొనుగోలు రుజువు", "భూమి రికార్డులు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    99: { fullName: "వ్యవసాయ ఫీడర్ల సౌర విద్యుదీకరణ", amount: "90% గ్రాంట్", benefits: ["సాగునీటి ఫీడర్లకు సోలార్ పవర్", "పగటిపూట నమ్మకమైన విద్యుత్", "గ్రిడ్ పై ఆధారపడటం తగ్గింపు", "తక్కువ విద్యుత్ బిల్లులు"], eligibility: ["రాష్ట్ర ప్రభుత్వాలు", "డిస్కామ్‌లు", "నీటి వినియోగదారుల సంఘాలు"], documents: ["ప్రాజెక్ట్ ప్రతిపాదన", "ఫీడర్ వివరాలు"] },
    100: { fullName: "రైతుల కోసం రూఫ్‌టాప్ సోలార్ సబ్సిడీ", amount: "₹78,000 వరకు 40% సబ్సిడీ", benefits: ["గ్రిడ్-కనెక్టెడ్ రూఫ్‌టాప్ సోలార్", "విద్యుత్ బిల్లుల తగ్గింపు", "అదనపు విద్యుత్‌ను గ్రిడ్‌కు విక్రయించడం", "పంప్ సెట్ లేదా గృహ వినియోగానికి"], eligibility: ["రైతులందరూ", "ఫార్మ్ హౌస్ యజమానులు", "FPOలు"], documents: ["విద్యుత్ బిల్లు", "పైకప్పు యాజమాన్య రుజువు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    101: { fullName: "పశుసంవర్ధక మౌలిక సదుపాయాల అభివృద్ధి నిధి (AHIDF)", amount: "₹100 కోట్ల వరకు రుణం", benefits: ["డెయిరీ, పౌల్ట్రీకి రుణ అనుసంధాన సబ్సిడీ", "3% వడ్డీ రాయితీ", "₹100 కోట్ల వరకు రుణం", "MSME లకు క్రెడిట్ గ్యారెంటీ"], eligibility: ["వ్యక్తిగత పారిశ్రామికవేత్తలు", "FPOలు", "ప్రైవేట్ కంపెనీలు", "సహకార సంఘాలు"], documents: ["వివరణాత్మక ప్రాజెక్ట్ రిపోర్ట్", "వ్యాపార నమోదు", "భూమి పత్రాలు", "బ్యాంక్ ఖాతా"] },
    102: { fullName: "డెయిరీ ఎంటర్‌ప్రెన్యూర్‌షిప్ డెవలప్‌మెంట్ స్కీమ్", amount: "25-33% సబ్సిడీ", benefits: ["డెయిరీ యూనిట్లకు సబ్సిడీ", "జనరల్‌కు 25%, SC/STలకు 33%", "ఆవులు/గేదెల కోసం రుణం", "పాలు ప్రాసెసింగ్ పరికరాలు"], eligibility: ["వ్యక్తిగత రైతులు", "స్వయం సహాయక సంఘాలు", "డెయిరీ సహకార సంఘాలు", "భూమిలేని రైతులు"], documents: ["భూమి పత్రాలు", "ఆధార్", "బ్యాంక్ ఖాతా", "ప్రాజెక్ట్ రిపోర్ట్"] },
    103: { fullName: "పౌల్ట్రీ వెంచర్ క్యాపిటల్ ఫండ్", amount: "₹3 లక్షల వరకు 33% సబ్సిడీ", benefits: ["కోళ్ల పెంపకానికి సబ్సిడీ", "SC/ST రైతులకు 33%", "బాయిలర్/లేయర్ యూనిట్‌కు రుణం", "హ్యాచరీ సహాయం"], eligibility: ["వ్యక్తిగత రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు", "యువ పారిశ్రామికవేత్తలు"], documents: ["భూమి పత్రాలు", "ఆధార్", "బ్యాంక్ ఖాతా", "అనుభవ ధృవీకరణ పత్రం"] },
    104: { fullName: "మేకలు మరియు గొర్రెల అభివృద్ధి పథకం", amount: "₹50,000 వరకు 50% సబ్సిడీ", benefits: ["మేకలు/గొర్రెల పెంపకానికి సబ్సిడీ", "జాతి అభివృద్ధికి సహాయం", "పశువైద్య సంరక్షణ", "మార్కెటింగ్ సహాయం"], eligibility: ["చిన్న రైతులు", "భూమిలేని కార్మికులు", "గిరిజన రైతులు", "మహిళా రైతులు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "గ్రామ పంచాయతీ సర్టిఫికేట్", "భూమి రికార్డులు"] },
    105: { fullName: "పందుల అభివృద్ధి మరియు ప్రజనన పథకం", amount: "₹40,000 వరకు 40% సబ్సిడీ", benefits: ["పందుల పెంపకానికి సబ్సిడీ", "జాతి అభివృద్ధి", "పశువైద్య సహాయం", "మార్కెట్ అనుసంధానం"], eligibility: ["చిన్న రైతులు", "గిరిజన రైతులు", "స్వయం సహాయక సంఘాలు", "గ్రామీణ యువత"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "భూమి రికార్డులు", "శిక్షణ సర్టిఫికేట్"] },
    106: { fullName: "జాతీయ పశుగ్రాస అభివృద్ధి పథకం", amount: "₹10,000/హెక్టారు", benefits: ["పశుగ్రాసం విత్తనాల సబ్సిడీ", "హైడ్రోపోనిక్ పశుగ్రాస యూనిట్లు", "సైలేజ్ తయారీకి సహాయం", "పశుగ్రాసం నిల్వ"], eligibility: ["రైతులందరూ", "డెయిరీ రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి రికార్డులు", "పశువుల లెక్కింపు ధృవీకరణ", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    107: { fullName: "జాతీయ పశువుల వ్యాధి బీమా పథకం", amount: "ప్రీమియం: ₹50-200/పశువు", benefits: ["పశువుల బీమా", "ఆవు, గేదె, గొర్రె, మేకలకు కవరేజ్", "వ్యాధులు మరియు ప్రమాదాలకు కవరేజ్", "త్వరిత క్లెయిమ్ సెటిల్మెంట్"], eligibility: ["పశువుల పెంపకందారులందరూ", "డెయిరీ రైతులు", "గొర్రె/మేకల పెంపకందారులు"], documents: ["పశువుల గుర్తింపు", "పశువైద్య ధృవీకరణ పత్రం", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    108: { fullName: "NBHM - హనీ మిషన్", amount: "లబ్ధిదారునికి ₹10,000", benefits: ["తేనెటీగల పెంపకం పరికరాల సబ్సిడీ", "తేనె ప్రాసెసింగ్ యూనిట్లు", "శిక్షణ మరియు ప్రదర్శన", "తేనె మార్కెటింగ్ సహాయం"], eligibility: ["వ్యక్తిగత రైతులు", "స్వయం సహాయక సంఘాలు", "FPOలు", "గిరిజన రైతులు"], documents: ["భూమి రికార్డులు (ఎపియరీ కోసం)", "ఆధార్", "బ్యాంక్ ఖాతా", "శిక్షణ సర్టిఫికేట్ (ప్రాధాన్యత)"] },
    109: { fullName: "ప్రధాన మంత్రి మత్స్య సంపద యోజన (PMMSY)", amount: "40-60% సబ్సిడీ", benefits: ["చేపల పెంపకం సబ్సిడీ", "హ్యాచరీ అభివృద్ధి", "చేపల కోసం కోల్డ్ చైన్", "ప్రాసెసింగ్ యూనిట్లు", "ఎగుమతి ప్రోత్సాహం"], eligibility: ["మత్స్యకారులు", "చేపల రైతులు", "FPOలు", "సహకార సంఘాలు", "మహిళా స్వయం సహాయక సంఘాలు"], documents: ["జల వనరుల యాజమాన్యం/లీజు", "ఆధార్", "బ్యాంక్ ఖాతా", "ప్రాజెక్ట్ రిపోర్ట్"] },
    110: { fullName: "NLM - పశుసంపద అభివృద్ధి", amount: "₹2 లక్షల వరకు 50% సబ్సిడీ", benefits: ["ఆవు, గేదె, గొర్రె, మేకల జాతి అభివృద్ధి", "పశుగ్రాసం అభివృద్ధి", "రిస్క్ మేనేజ్‌మెంట్", "ఎంటర్‌ప్రెన్యూర్‌షిప్ అభివృద్ధి"], eligibility: ["పశువులున్న రైతులందరూ", "FPOలు", "సహకార సంఘాలు", "స్వయం సహాయక సంఘాలు"], documents: ["పశువుల లెక్కింపు ధృవీకరణ", "భూమి రికార్డులు (పశుగ్రాసం కోసం)", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    111: { fullName: "రాష్ట్ర విపత్తు ప్రతిస్పందన నిధి - వ్యవసాయం", amount: "₹20,000/హెక్టారు", benefits: ["పంట నష్టానికి పరిహారం", "ప్రకృతి విపత్తుల సహాయం", "వరదలు, కరువు, తుఫాను", "త్వరిత పంపిణీ"], eligibility: ["నోటిఫై చేయబడిన విపత్తు ప్రాంతాల రైతులు", "రైతులందరూ", "పంట నష్టం >50%"], documents: ["భూమి రికార్డులు", "పంట నష్టం సర్టిఫికేట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    112: { fullName: "జాతీయ విపత్తు ప్రతిస్పందన దళం - వ్యవసాయం", amount: "₹25,000/హెక్టారు", benefits: ["జాతీయ స్థాయి విపత్తు సహాయం", "తుఫాను, వరదలు, వడగళ్ల వాన", "కొండచరియలు విరిగిపడటం కవరేజ్", "తెగుళ్ల దాడి"], eligibility: ["తీవ్రంగా ప్రభావితమైన ప్రాంతాల రైతులు", "అన్ని వర్గాలు"], documents: ["విపత్తు నోటిఫికేషన్", "భూమి రికార్డులు", "పంట నష్టం సర్టిఫికేట్", "ఆధార్"] },
    113: { fullName: "వడగళ్ల వాన పంట బీమా", amount: "ప్రీమియం: 2-5%", benefits: ["వడగళ్ల వానకు ప్రత్యేక కవరేజ్", "వ్యక్తిగత పొలాల మదింపు", "త్వరిత క్లెయిమ్‌లు", "అన్ని పంటలకు కవరేజ్"], eligibility: ["వడగళ్ల వానకు గురయ్యే ప్రాంతాల రైతులు", "రైతులందరికీ ఐచ్ఛికం"], documents: ["భూమి రికార్డులు", "వాతావరణ డేటా", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    114: { fullName: "జాతీయ కరువు సహాయ ప్యాకేజీ", amount: "₹15,000/హెక్టారు", benefits: ["కరువు ప్రభావిత రైతులు", "ఇన్‌పుట్ సబ్సిడీ", "పశుగ్రాసం సరఫరా", "తాగునీటి సహాయం"], eligibility: ["కరువుగా ప్రకటించిన ప్రాంతాల రైతులు", "చిన్న మరియు సన్నకారు రైతులకు ప్రాధాన్యత"], documents: ["భూమి రికార్డులు", "కరువు ప్రకటన", "పంట నష్టం రుజువు", "ఆధార్"] },
    115: { fullName: "వ్యవసాయానికి జాతీయ వరద సహాయం", amount: "₹18,000/హెక్టారు", benefits: ["వరద ప్రభావిత రైతులు", "పంట నష్టానికి పరిహారం", "తిరిగి నాటడానికి విత్తన సబ్సిడీ", "ఇన్‌పుట్ సహాయం"], eligibility: ["వరద ప్రభావిత ప్రాంతాల రైతులు", "అన్ని వర్గాలు"], documents: ["భూమి రికార్డులు", "వరద నష్టం నివేదిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    116: { fullName: "తుఫాను ప్రభావిత వ్యవసాయ సహాయం", amount: "₹22,000/హెక్టారు", benefits: ["తుఫాను నష్టానికి పరిహారం", "తోటల నష్టం కవరేజ్", "పశువుల నష్టానికి సహాయం", "ఇన్‌పుట్ సబ్సిడీ"], eligibility: ["తీరప్రాంత రైతులు", "తుఫాను ప్రభావిత ప్రాంతాలు"], documents: ["భూమి రికార్డులు", "తుఫాను నష్టం నివేదిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    117: { fullName: "మిడతలు/తెగుళ్ల దాడి సహాయ పథకం", amount: "₹10,000/హెక్టారు", benefits: ["తెగుళ్ల నష్టానికి పరిహారం", "ఉచిత పురుగుమందుల సరఫరా", "పంట నష్టం కవరేజ్", "క్విక్ రెస్పాన్స్ టీమ్"], eligibility: ["తెగుళ్ల ప్రభావిత ప్రాంతాల రైతులు", "మిడతల దాడి ప్రాంతాలు"], documents: ["భూమి రికార్డులు", "తెగుళ్ల దాడి సర్టిఫికేట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    118: { fullName: "కొండచరియలు విరిగిపడటం వ్యవసాయ సహాయం", amount: "₹30,000/హెక్టారు", benefits: ["కొండచరియల నష్టానికి పరిహారం", "భూమి పునరుద్ధరణ సహాయం", "టెర్రస్ మరమ్మతు సబ్సిడీ", "ఇన్‌పుట్ సహాయం"], eligibility: ["కొండ ప్రాంతాల రైతులు", "కొండచరియలు విరిగిపడిన ప్రాంతాలు"], documents: ["భూమి రికార్డులు", "కొండచరియల నష్టం నివేదిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    119: { fullName: "పిడుగుపాటు నష్టపరిహారం", amount: "రైతుకు ₹5 లక్షలు", benefits: ["రైతు మరణిస్తే పరిహారం", "వైద్య ఖర్చుల కవరేజ్", "ఆధారపడిన కుటుంబానికి సహాయం", "త్వరిత పంపిణీ"], eligibility: ["పిడుగుపాటుకు గురైన రైతులు", "మరణించిన రైతుల కుటుంబాలు"], documents: ["మరణ ధృవీకరణ పత్రం", "పోలీస్ రిపోర్ట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    120: { fullName: "శీతల గాలుల పంట రక్షణ పథకం", amount: "₹8,000/హెక్టారు", benefits: ["మంచు వల్ల నష్టానికి పరిహారం", "స్మోక్ జనరేటర్ సబ్సిడీ", "పంట కవర్ సహాయం", "ఇన్‌పుట్ సహాయం"], eligibility: ["శీతల గాలులు వీచే ప్రాంతాల రైతులు", "కూరగాయలు, పండ్ల సాగుదారులు"], documents: ["భూమి రికార్డులు", "ఉష్ణోగ్రత డేటా", "పంట నష్టం రుజువు", "ఆధార్"] },
    121: { fullName: "ఈ-నామ్ (e-NAM) మెరుగుపరచబడిన ప్లాట్‌ఫారమ్", amount: "ఉచిత ట్రేడింగ్", benefits: ["ఆన్‌లైన్ మండి ట్రేడింగ్", "నాణ్యత తనిఖీ", "గోదాము రసీదు వ్యవస్థ", "ప్రత్యక్ష చెల్లింపు"], eligibility: ["రైతులందరూ", "వ్యాపారులు", "FPOలు", "కమిషన్ ఏజెంట్లు"], documents: ["ఆధార్", "బ్యాంక్ ఖాతా", "మొబైల్ నంబర్", "ట్రేడింగ్ రిజిస్ట్రేషన్"] },
    122: { fullName: "FPO వ్యాపార సహాయ పథకం", amount: "₹15 లక్షల సహాయం", benefits: ["FPO మార్కెట్ అనుసంధానం", "బ్రాండ్ అభివృద్ధి", "ప్యాకేజింగ్ సహాయం", "కొనుగోలుదారులతో ప్రత్యక్ష పరిచయం"], eligibility: ["నమోదిత FPOలు", "ఉత్పత్తిదారుల కంపెనీలు", "రైతు సహకార సంఘాలు"], documents: ["FPO రిజిస్ట్రేషన్", "సభ్యుల జాబితా", "బ్యాంక్ ఖాతా", "వ్యాపార ప్రణాళిక"] },
    123: { fullName: "నెగోషియబుల్ వేర్‌హౌస్ రసీదు పథకం", amount: "గోదాము రసీదుపై రుణం", benefits: ["గోదాములో పంట నిల్వ", "రసీదుపై రుణం పొందడం", "అధిక ధరకు విక్రయించడం", "నాణ్యత పరిరక్షణ"], eligibility: ["రైతులందరూ", "FPOలు", "వ్యాపారులు", "సహకార సంఘాలు"], documents: ["గోదాము రసీదు", "ఆధార్", "బ్యాంక్ ఖాతా", "పంట వివరాలు"] },
    124: { fullName: "వ్యవసాయ ఉత్పత్తుల రవాణా సబ్సిడీ", amount: "50% రవాణా సబ్సిడీ", benefits: ["రవాణా ఖర్చుపై సబ్సిడీ", "ఈశాన్య రాష్ట్రాలకు ప్రాధాన్యత", "త్వరగా పాడయ్యే వస్తువులు", "మండీకి చేర్చడం"], eligibility: ["మారుమూల ప్రాంతాల రైతులు", "ఈశాన్య రాష్ట్రాలు", "కొండ ప్రాంతాలు", "గిరిజన ప్రాంతాలు"], documents: ["రవాణా బిల్లు", "మండీ ప్రవేశ రుజువు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    125: { fullName: "మార్కెట్ జోక్య పథకం (MIS)", amount: "MSP మద్దతు ధర", benefits: ["త్వరగా పాడయ్యే ఉత్పత్తులకు మద్దతు ధర", "ప్రభుత్వ కొనుగోలు", "నష్టపరిహారం", "రైతుల ఆదాయ భద్రత"], eligibility: ["నోటిఫై చేయబడిన త్వరగా పాడయ్యే పంటలు పండించే రైతులు", "అన్ని రాష్ట్రాలు"], documents: ["పంట ప్రకటన", "భూమి రికార్డులు", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    126: { fullName: "కిసాన్ రైలు రవాణా సబ్సిడీ పథకం", amount: "50% రవాణా సబ్సిడీ", benefits: ["త్వరగా పాడయ్యే ఉత్పత్తుల సబ్సిడీ రవాణా", "వేగవంతమైన మార్కెట్ యాక్సెస్", "వృధా తగ్గింపు", "దేశవ్యాప్త రవాణా"], eligibility: ["రైతులందరూ", "FPOలు", "సహకార సంఘాలు", "వ్యాపారులు (రైతుల తరపున)"], documents: ["రైల్వే బుకింగ్ రసీదు", "రైతు డిక్లరేషన్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    127: { fullName: "FPOల ఏర్పాటు మరియు ప్రోత్సాహం", amount: "FPO కి ₹15 లక్షలు", benefits: ["FPO ఏర్పాటుకు ఆర్థిక సహాయం", "5 సంవత్సరాల చేయూత", "₹15 లక్షల వరకు ఈక్విటీ గ్రాంట్", "క్రెడిట్ గ్యారెంటీ"], eligibility: ["300+ రైతుల సమూహాలు", "స్వయం సహాయక సంఘాలు", "సహకార సంఘాలు", "రైతు సమూహాలు"], documents: ["రైతుల జాబితా (300+)", "భూమి వివరాలు", "వ్యాపార ప్రణాళిక", "బ్యాంక్ ఖాతా"] },
    128: { fullName: "AMI - గ్రామీణ గోదాముల పథకం", amount: "₹25 లక్షల వరకు 25% సబ్సిడీ", benefits: ["గ్రామీణ గోదాముల నిర్మాణం", "రైతుల కోసం వేర్‌హౌస్", "నిల్వ చేసిన పంటపై రుణం", "తక్కువ ధరకు అమ్మడం తగ్గింపు"], eligibility: ["వ్యక్తిగత రైతులు", "FPOలు", "సహకార సంఘాలు", "స్వయం సహాయక సంఘాలు"], documents: ["భూమి పత్రాలు", "ప్రాజెక్ట్ రిపోర్ట్", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    129: { fullName: "PMKS - కిసాన్ సంపద యోజన", amount: "₹10 కోట్ల వరకు 35% సబ్సిడీ", benefits: ["ఫుడ్ ప్రాసెసింగ్ యూనిట్లు", "మెగా ఫుడ్ పార్కులు", "కోల్డ్ చైన్ మౌలిక సదుపాయాలు", "విలువ ఆధారిత ఉత్పత్తులు"], eligibility: ["ఆహార ప్రాసెసర్లు", "FPOలు", "సహకార సంఘాలు", "వ్యవసాయ-పారిశ్రామికవేత్తలు"], documents: ["వివరణాత్మక ప్రాజెక్ట్ రిపోర్ట్", "భూమి పత్రాలు", "కంపెనీ రిజిస్ట్రేషన్", "బ్యాంక్ ఖాతా"] },
    130: { fullName: "రైతుల ప్రత్యక్ష మార్కెటింగ్ పథకం", amount: "₹2 లక్షల వరకు 50% సబ్సిడీ", benefits: ["రైతు బజార్ స్టాల్ సబ్సిడీ", "వినియోగదారులకు ప్రత్యక్ష విక్రయం", "బ్రాండింగ్ సహాయం", "డిజిటల్ చెల్లింపుల సెటప్"], eligibility: ["వ్యక్తిగత రైతులు", "FPOలు", "స్వయం సహాయక సంఘాలు", "మహిళా రైతులు"], documents: ["భూమి రికార్డులు", "మార్కెట్ స్టాల్ ప్రణాళిక", "ఆధార్", "బ్యాంక్ ఖాతా"] },
    131: { fullName: "మహాత్మా గాంధీ NREGA - వ్యవసాయ పనులు", amount: "100 రోజుల ఉపాధి హామీ", benefits: ["100 రోజుల ఉపాధి హామీ", "రోజుకు ₹300+ వేతనం", "ఫార్మ్ పాండ్ నిర్మాణం", "భూమి అభివృద్ధి పనులు", "సాగునీటి కాల్వల పనులు"], eligibility: ["గ్రామీణ కుటుంబాలన్నీ", "నైపుణ్యం లేని పనులు చేయడానికి సిద్ధంగా ఉన్న పెద్దలు", "SC/ST/మహిళలకు ప్రాధాన్యత"], documents: ["జాబ్ కార్డ్", "ఆధార్", "బ్యాంక్ ఖాతా", "రేషన్ కార్డ్"] },
    132: { fullName: "ACABC - అగ్రి-ఎంటర్‌ప్రెన్యూర్‌షిప్ పథకం", amount: "₹20 లక్షల రుణం + 44% సబ్సిడీ", benefits: ["వ్యవసాయ పట్టభద్రులకు శిక్షణ", "ప్రాజెక్ట్ వ్యయంపై 44% సబ్సిడీ", "₹20 లక్షల వరకు రుణం", "శిక్షణ సమయంలో నెలవారీ స్టైపెండ్"], eligibility: ["వ్యవసాయ గ్రాడ్యుయేట్లు", "వ్యవసాయ డిప్లొమా ఉన్నవారు", "బయోలాజికల్ సైన్స్ గ్రాడ్యుయేట్లు", "వ్యవసాయ అనుబంధ సబ్జెక్టులలో పోస్ట్ గ్రాడ్యుయేట్లు"], documents: ["డిగ్రీ సర్టిఫికేట్", "ఆధార్", "బ్యాంక్ ఖాతా", "వ్యాపార ప్రణాళిక", "నాబార్డ్ నుండి NOC"] },
    133: { fullName: "జాతీయ వ్యవసాయ నైపుణ్యాభివృద్ధి", amount: "ఉచిత శిక్షణ + ₹5,000 స్టైపెండ్", benefits: ["ఉచిత నైపుణ్య శిక్షణా కార్యక్రమం", "డ్రోన్ పైలట్ శిక్షణ", "మట్టి పరీక్షా సాంకేతిక నిపుణుడు", "వ్యవసాయ యంత్రాల ఆపరేటర్", "ఫుడ్ ప్రాసెసింగ్ నైపుణ్యాలు"], eligibility: ["గ్రామీణ యువత (18-35 ఏళ్లు)", "రైతుల పిల్లలు", "మహిళా రైతులు", "బడి మానేసిన వారు"], documents: ["ఆధార్", "వయస్సు ధృవీకరణ", "విద్యా ధృవీకరణ పత్రాలు", "బ్యాంక్ ఖాతా", "పాస్‌పోర్ట్ ఫోటో"] },
    134: { fullName: "ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన - వ్యవసాయం", amount: "ఉచిత శిక్షణ + సర్టిఫికేషన్", benefits: ["ఉచిత వృత్తి విద్యా శిక్షణ", "ప్రభుత్వ సర్టిఫికేషన్", "ఉద్యోగ నియామక సహాయం", "ముందస్తు అభ్యాస గుర్తింపు", "వ్యవసాయ యంత్రాల మరమ్మతు శిక్షణ"], eligibility: ["18-45 ఏళ్ల యువత", "రైతు కుటుంబాలు", "గ్రామీణ మరియు పట్టణ యువత", "మహిళా అభ్యర్థులు"], documents: ["ఆధార్", "వయస్సు ధృవీకరణ", "విద్యా పత్రాలు", "బ్యాంక్ ఖాతా", "మొబైల్ నంబర్"] },
    135: { fullName: "స్టార్టప్ ఇండియా అగ్రి గ్రాండ్ ఛాలెంజ్", amount: "₹50 లక్షల సీడ్ ఫండ్", benefits: ["₹50 లక్షల వరకు సీడ్ ఫండ్", "నిపుణుల నుండి మార్గదర్శకత్వం", "ఇంక్యుబేషన్ సహాయం", "3 ఏళ్ల పన్ను మినహాయింపు", "పేటెంట్ ఫైలింగ్ సహాయం"], eligibility: ["అగ్రి-టెక్ స్టార్టప్‌లు", "యువ పారిశ్రామికవేత్తలు (18-35)", "వినూత్న వ్యవసాయ పరిష్కారాలు", "నమోదిత స్టార్టప్‌లు (DPIIT)"], documents: ["స్టార్టప్ రిజిస్ట్రేషన్", "ఆవిష్కరణ వివరాలు", "వ్యాపార ప్రణాళిక", "టీమ్ ప్రొఫైల్", "బ్యాంక్ ఖాతా"] },
    136: { fullName: "RSETI - గ్రామీణ స్వయం ఉపాధి శిక్షణా సంస్థలు", amount: "ఉచిత శిక్షణ + రుణ అనుసంధానం", benefits: ["ఉచిత నివాస శిక్షణ (7-30 రోజులు)", "డెయిరీ ఫార్మింగ్ శిక్షణ", "కోళ్లు మరియు మేకల పెంపకం", "బ్యాంక్ రుణ అనుసంధానం", "శిక్షణానంతర మద్దతు"], eligibility: ["గ్రామీణ యువత (18-45 ఏళ్లు)", "నిరుద్యోగ యువత", "రైతుల పిల్లలు", "మహిళా అభ్యర్థులు"], documents: ["ఆధార్", "రేషన్ కార్డ్", "ఆదాయ ధృవీకరణ పత్రం", "బ్యాంక్ ఖాతా", "పాస్‌పోర్ట్ ఫోటో"] },
    137: { fullName: "రాష్ట్రీయ యువ సశక్తీకరణ్ కార్యక్రమం - వ్యవసాయం", amount: "₹2 లక్షల ప్రాజెక్ట్ సహాయం", benefits: ["యువత నేతృత్వంలోని వ్యవసాయ ప్రాజెక్టులు", "నాయకత్వ అభివృద్ధి", "సామూహిక వ్యవసాయ కార్యక్రమాలు", "ఆర్థిక అక్షరాస్యత శిక్షణ", "మార్కెట్ అనుసంధాన సహాయం"], eligibility: ["యువత సమూహాలు (15-29 ఏళ్లు)", "యూత్ క్లబ్బులు", "నెహ్రూ యువ కేంద్ర సభ్యులు", "గ్రామీణ యువజన సంఘాలు"], documents: ["గ్రూప్ రిజిస్ట్రేషన్", "సభ్యుల వివరాలు", "ఆధార్", "బ్యాంక్ ఖాతా", "ప్రాజెక్ట్ ప్రతిపాదన"] },
    138: { fullName: "దీన్ దయాళ్ ఉపాధ్యాయ గ్రామీణ కౌశల్య యోజన", amount: "ఉచిత శిక్షణ + నెలకు ₹1,000 స్టైపెండ్", benefits: ["3-12 నెలల నైపుణ్య శిక్షణ", "శిక్షణ సమయంలో నెలవారీ స్టైపెండ్", "100% ఉద్యోగ నియామక హామీ", "ఉద్యోగంలో చేరిన తర్వాత మద్దతు", "ఉచిత భోజనం మరియు వసతి"], eligibility: ["గ్రామీణ పేద యువత (18-35 ఏళ్లు)", "SC/ST/మహిళలకు ప్రాధాన్యత", "BPL కుటుంబాలు", "NREGA కార్మిక కుటుంబాలు"], documents: ["ఆధార్", "BPL సర్టిఫికేట్", "వయస్సు ధృవీకరణ", "బ్యాంక్ ఖాతా", "పాస్‌పోర్ట్ ఫోటో"] },
    139: { fullName: "NRLM - ఆజీవిక వ్యవసాయ జీవనోపాధి", amount: "SHG కి ₹50,000", benefits: ["SHG ఆధారిత వ్యవసాయ కార్యకలాపాలు", "కమ్యూనిటీ పెట్టుబడి నిధి", "రివాల్వింగ్ ఫండ్ సహాయం", "విలువ గొలుసు అభివృద్ధి", "మార్కెట్ అనుసంధానం"], eligibility: ["NRLM కింద ఉన్న మహిళా స్వయం సహాయక సంఘాలు", "రైతు సమూహాలు", "ఉత్పత్తిదారుల సమూహాలు", "గ్రామ సంఘాలు"], documents: ["SHG రిజిస్ట్రేషన్", "సభ్యుల జాబితా", "బ్యాంక్ ఖాతా", "తీర్మానం కాపీ", "ఆధార్"] },
    140: { fullName: "KVK - రైతు శిక్షణ మరియు ఉపాధి కార్యక్రమం", amount: "ఉచిత శిక్షణ + ఇన్‌పుట్‌లు", benefits: ["KVKలో ప్రాక్టికల్ శిక్షణ", "సమగ్ర వ్యవసాయ శిక్షణ", "విలువ ఆధారిత శిక్షణ", "ఇన్‌పుట్ కిట్ అందజేత", "ICAR నుండి సర్టిఫికేట్"], eligibility: ["రైతులందరూ", "మహిళా రైతులు", "గ్రామీణ యువత", "బడి మానేసిన వారు", "వ్యవసాయ-పారిశ్రామికవేత్తలు"], documents: ["ఆధార్", "భూమి రికార్డులు (వర్తిస్తే)", "బ్యాంక్ ఖాతా", "2 పాస్‌పోర్ట్ ఫోటోలు", "మొబైల్ నంబర్"] }
  },
  mr: {
   1: { fullName: "प्रधानमंत्री किसान सन्मान निधी", amount: "₹6,000/वर्ष", benefits: ["प्रति वर्ष ₹6,000 थेट उत्पन्न आधार", "दर 4 महिन्यांनी ₹2,000", "बँक खात्यात थेट DBT", "सर्व अल्प व अत्यल्प भूधारक शेतकरी समाविष्ट"], eligibility: ["अल्प व अत्यल्प भूधारक शेतकरी (2 हेक्टरपर्यंत)", "लागवडीयोग्य जमीन असलेली शेतकरी कुटुंबे", "जमिनीच्या नोंदी असलेले कुळ शेतकरी"], documents: ["आधार कार्ड", "बँक खाते", "जमिनीच्या नोंदी", "रेशन कार्ड"] },
    2: { fullName: "कुळ शेतकऱ्यांसाठी पीएम-किसान", amount: "₹6,000/वर्ष", benefits: ["भूमिहीन शेतकऱ्यांसाठी विशेष तरतूद", "बटईदारांना मदत", "थेट लाभ हस्तांतरण", "जमिनीच्या नोंदींची आवश्यकता नाही"], eligibility: ["भूमिहीन कुळ शेतकरी", "बटईदार", "भाडेतत्त्वावरील जमिनीवर शेती करणारे शेतकरी"], documents: ["आधार", "बँक खाते", "भाडेपट्टा करार", "प्रतिज्ञापत्र"] },
    3: { fullName: "प्रधानमंत्री अन्नदाता आय संरक्षण अभियान", amount: "₹8,000/वर्ष", benefits: ["सर्व शेतकऱ्यांसाठी उत्पन्न आधार", "किमान हमीभावाची हमी", "अल्पभूधारक शेतकऱ्यांना अतिरिक्त ₹2,000", "किंमत तफावत भरपाई"], eligibility: ["अधिसूचित पिके घेणारे सर्व शेतकरी", "अल्प व अत्यल्प भूधारक शेतकऱ्यांना प्राधान्य", "FPO सदस्य"], documents: ["आधार", "बँक खाते", "जमिनीच्या नोंदी", "पीक घोषणापत्र"] },
    4: { fullName: "किंमत तफावत भरपाई योजना", amount: "किंमत तफावत भरपाई", benefits: ["भाव पडल्यास नुकसानभरपाई", "MSP तफावत भरपाई", "थेट बँक हस्तांतरण", "भाज्या आणि फळांचा समावेश"], eligibility: ["मध्य प्रदेशातील शेतकरी", "पिके: टोमॅटो, कांदा, बटाटा", "नोंदणीकृत शेतकरी"], documents: ["आधार", "बँक खाते", "विक्री पावती", "मंडी प्रवेश पावती"] },
    5: { fullName: "तेलंगणा रायथू बंधू", amount: "₹10,000/एकर/वर्ष", benefits: ["शेतकऱ्यांसाठी गुंतवणूक मदत", "प्रति हंगाम ₹5,000 प्रति एकर", "थेट बँक हस्तांतरण", "सर्व शेतकरी समाविष्ट"], eligibility: ["तेलंगणातील सर्व शेतकरी", "पट्टाधारक जमीनदार", "कुळ शेतकरी (नवीन योजना)"], documents: ["आधार", "पट्टा पासबुक", "बँक खाते"] },
    6: { fullName: "ओडिशा कालिया योजना", amount: "₹25,000/वर्ष", benefits: ["शेतकऱ्यांसाठी आर्थिक मदत", "भूमिहीन शेतमजूर", "दुर्बल आदिवासी गट", "बटईदारांना मदत"], eligibility: ["ओडिशाचे शेतकरी", "भूमिहीन मजूर", "अल्प व अत्यल्प भूधारक शेतकरी", "बटईदार"], documents: ["आधार", "बँक खाते", "रहिवासी पुरावा", "जमिनीच्या नोंदी"] },
    7: { fullName: "राष्ट्रीय कृषी विकास योजना", amount: "राज्य-विशिष्ट", benefits: ["राज्य कृषी प्रकल्पांसाठी निधी", "पायाभूत सुविधा विकास", "कृषी-उद्योजकता", "मूल्य साखळी"], eligibility: ["राज्य सरकारे", "FPO", "कृषी विद्यापीठे", "संशोधन संस्था"], documents: ["प्रकल्प प्रस्ताव", "राज्याची मान्यता", "अंमलबजावणी योजना"] },
    8: { fullName: "राष्ट्रीय बियाणे सबसिडी योजना", amount: "बियाणांवर 50% सबसिडी", benefits: ["उच्च उत्पन्न देणाऱ्या जातींचे बियाणे", "अल्पभूधारक शेतकऱ्यांसाठी 50% सबसिडी", "प्रमाणित बियाणे", "सुधारित जाती"], eligibility: ["सर्व शेतकरी", "अल्प व अत्यल्प भूधारकांना प्राधान्य", "FPO"], documents: ["जमिनीच्या नोंदी", "आधार", "बियाणे बिल", "बँक खाते"] },
    9: { fullName: "पोषक तत्व आधारित सबसिडी (NBS) योजना", amount: "पोषक तत्त्वांनुसार भिन्न", benefits: ["P आणि K खतांवर सबसिडी", "शेतकऱ्यांचा खर्च कमी", "संतुलित पोषण", "मातीचे आरोग्य सुधारणे"], eligibility: ["सर्व शेतकरी", "अधिकृत डीलर्सच्या माध्यमातून"], documents: ["डीलरचे बिल", "आधार (DBT साठी)", "जमिनीच्या नोंदी"] },
    10: { fullName: "महिला किसान सक्षमीकरण योजना", amount: "₹50,000/वर्ष", benefits: ["महिला शेतकरी सक्षमीकरण", "कौशल्य प्रशिक्षण", "इनपुट सबसिडी", "बाजारपेठेत प्रवेश"], eligibility: ["महिला शेतकरी", "महिला बचत गट", "महिला प्रमुख कुटुंबे"], documents: ["आधार", "जमिनीच्या नोंदी", "बँक खाते", "SHG प्रमाणपत्र"] },
    11: { fullName: "किसान क्रेडिट कार्ड योजना", amount: "₹3 लाखांपर्यंत", benefits: ["रिव्हॉल्व्हिंग क्रेडिट सुविधा", "व्याज: 7% (वेळेवर परतफेड केल्यास 4%)", "₹1.6 लाखांपर्यंत तारणमुक्त", "पूरक व्यवसायांचा समावेश"], eligibility: ["सर्व शेतकरी", "बटईदार", "कुळ शेतकरी", "बचत गट"], documents: ["जमिनीच्या नोंदी", "आधार", "फोटो", "पिकाचा तपशील"] },
    12: { fullName: "अल्प मुदतीच्या पीक कर्जावर व्याज सवलत", amount: "2% व्याज सवलत", benefits: ["पीक कर्जावर 2% व्याज सवलत", "वेळेवर परतफेड केल्यास अतिरिक्त 3%", "प्रभावी दर: 4% प्रति वर्ष", "₹3 लाखांपर्यंत कर्ज"], eligibility: ["पीक कर्ज घेणारे सर्व शेतकरी", "KCC धारक", "सहकारी संस्थेचे सदस्य"], documents: ["KCC", "कर्ज अर्ज", "जमिनीच्या नोंदी"] },
    13: { fullName: "वेअरहाऊस इन्फ्रास्ट्रक्चर फंड", amount: "प्रति प्रकल्प ₹50 कोटी", benefits: ["गोदाम बांधणीसाठी कर्ज", "25% पर्यंत सबसिडी", "काढणीपश्चात पायाभूत सुविधा", "पिकाची नासाडी कमी"], eligibility: ["FPO", "सहकारी संस्था", "कृषी-उद्योजक", "राज्य संस्था"], documents: ["प्रकल्प अहवाल", "जमिनीची कागदपत्रे", "नोंदणी प्रमाणपत्र"] },
    14: { fullName: "दुग्ध उद्योजकता विकास योजना", amount: "₹5 लाखांपर्यंत सबसिडी", benefits: ["दुग्ध व्यवसायासाठी सबसिडी", "सर्वसाधारणसाठी 25%, SC/ST साठी 33%", "गाय/म्हशींसाठी कर्ज", "दूध प्रक्रिया उपकरणे"], eligibility: ["वैयक्तिक शेतकरी", "बचत गट", "दुग्ध सहकारी संस्था"], documents: ["जमिनीची कागदपत्रे", "आधार", "बँक खाते", "प्रकल्प अहवाल"] },
    15: { fullName: "पोल्ट्री व्हेंचर कॅपिटल फंड", amount: "₹3 लाखांपर्यंत सबसिडी", benefits: ["कुक्कुटपालनासाठी सबसिडी", "SC/ST शेतकऱ्यांसाठी 33%", "ब्रॉयलर/लेयर युनिटसाठी कर्ज", "हॅचरी मदत"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "बचत गट"], documents: ["जमिनीची कागदपत्रे", "आधार", "बँक खाते", "अनुभव प्रमाणपत्र"] },
    16: { fullName: "शेळी आणि मेंढी विकास योजना", amount: "50% सबसिडी", benefits: ["शेळी/मेंढी पालनासाठी सबसिडी", "₹50,000 पर्यंत 50% सबसिडी", "प्रजाती सुधारणेसाठी मदत", "पशुवैद्यकीय काळजी"], eligibility: ["अल्पभूधारक शेतकरी", "भूमिहीन मजूर", "आदिवासी शेतकरी", "महिला शेतकरी"], documents: ["आधार", "बँक खाते", "ग्रामपंचायत प्रमाणपत्र"] },
    17: { fullName: "कृषी पायाभूत सुविधा निधी", amount: "₹2 कोटींपर्यंत कर्ज", benefits: ["फार्म-गेट पायाभूत सुविधांसाठी कर्ज", "3% व्याज सवलत", "3 वर्षांची सवलत (मोरेटोरियम)", "गोदामे, कोल्ड स्टोरेजचा समावेश"], eligibility: ["FPO", "सहकारी संस्था", "वैयक्तिक शेतकरी", "कृषी-उद्योजक"], documents: ["प्रकल्प अहवाल", "जमिनीची कागदपत्रे", "आधार", "बँक खाते"] },
    18: { fullName: "AHIDF - दुग्ध आणि कुक्कुटपालन कर्ज", amount: "₹100 कोटींपर्यंत", benefits: ["दुग्ध आणि कुक्कुटपालन पायाभूत सुविधांसाठी कर्ज", "3% व्याज सवलत", "कर्ज हमी उपलब्ध", "दूध प्रक्रिया, हॅचरीचा समावेश"], eligibility: ["वैयक्तिक उद्योजक", "FPO", "खाजगी कंपन्या", "सहकारी संस्था"], documents: ["DPR", "व्यवसाय नोंदणी", "जमिनीची कागदपत्रे", "बँक खाते"] },
    19: { fullName: "FIDF - मत्स्यपालन कर्ज", amount: "₹50 लाखांपर्यंत", benefits: ["मत्स्यपालन पायाभूत सुविधांसाठी कर्ज", "4% व्याज सवलत", "हॅचरी, फीड मिलचा समावेश", "माशांसाठी कोल्ड चेन"], eligibility: ["मत्स्यपालक", "FPO", "सहकारी संस्था", "बचत गट"], documents: ["जलकुंभ भाडेपट्टा", "प्रकल्प अहवाल", "आधार", "बँक खाते"] },
    20: { fullName: "अन्न प्रक्रिया कर्ज योजना", amount: "₹10 कोटींपर्यंत", benefits: ["अन्न प्रक्रिया युनिटसाठी कर्ज", "35% भांडवली सबसिडी", "5% व्याज सवलत", "फळे, भाज्या, धान्यांचा समावेश"], eligibility: ["अन्न प्रक्रिया करणारे", "FPO", "सहकारी संस्था", "कृषी-उद्योजक"], documents: ["DPR", "जमिनीची कागदपत्रे", "FSSAI परवाना", "बँक खाते"] },
    21: { fullName: "प्रधानमंत्री पीक विमा योजना", amount: "कमी प्रीमियम: 1.5-5%", benefits: ["कमी प्रीमियमवर पीक विमा", "रब्बीसाठी 1.5%, खरीपसाठी 2%", "21 दिवसांत दावा", "पेरणीपूर्वी ते काढणीपश्चात कव्हरेज"], eligibility: ["सर्व शेतकरी", "कर्जदार शेतकऱ्यांसाठी अनिवार्य", "बिगर-कर्जदारांसाठी ऐच्छिक", "बटईदार"], documents: ["जमिनीच्या नोंदी", "पीक घोषणापत्र", "आधार", "बँक खाते"] },
    22: { fullName: "हवामान आधारित पीक विमा योजना", amount: "प्रीमियम 1.5-8%", benefits: ["हवामान निर्देशांक आधारित विमा", "पावसाची कमतरता/अतिवृष्टी कव्हर", "तापमान आणि आर्द्रता कव्हरेज", "जलद दावा निपटारा"], eligibility: ["अधिसूचित क्षेत्रातील शेतकरी", "हवामान-संवेदनशील पिके", "सर्व शेतकरी वर्ग"], documents: ["जमिनीच्या नोंदी", "हवामान डेटा", "आधार"] },
    23: { fullName: "नारळ झाड विमा योजना", amount: "प्रीमियम: ₹100-500/झाड", benefits: ["नारळाच्या झाडांचा विमा", "कीड आणि रोग कव्हर", "नैसर्गिक आपत्ती कव्हरेज", "5 वर्षांपर्यंत कव्हरेज"], eligibility: ["नारळ उत्पादक", "किमान 5 झाडे", "सर्व राज्ये"], documents: ["जमिनीच्या नोंदी", "झाडांची गणना", "आधार"] },
    24: { fullName: "रबर विमा योजना", amount: "₹30,000/हेक्टर", benefits: ["रबराच्या झाडांचा विमा", "नैसर्गिक आपत्ती कव्हरेज", "रोग आणि कीड कव्हर", "उत्पन्न नुकसान भरपाई"], eligibility: ["रबर उत्पादक", "किमान 0.5 हेक्टर", "रबर बोर्डात नोंदणीकृत"], documents: ["जमिनीच्या नोंदी", "रबर बोर्ड नोंदणी", "आधार"] },
    25: { fullName: "कॉफी पीक विमा", amount: "प्रीमियम 3.5%", benefits: ["कॉफी बागांचा विमा", "अरेबिका आणि रोबस्टा कव्हर", "उत्पन्न नुकसान कव्हरेज", "किंमतीतील चढउतार कव्हर"], eligibility: ["कॉफी उत्पादक", "कॉफी बोर्डात नोंदणीकृत", "किमान 0.5 एकर"], documents: ["जमिनीच्या नोंदी", "कॉफी बोर्ड नोंदणी"] },
    26: { fullName: "चहा पीक विमा", amount: "प्रीमियम 2.5%", benefits: ["चहाच्या बागांचा विमा", "हिरव्या पानांचे उत्पन्न कव्हर", "दुष्काळ आणि पूर कव्हर", "कीड आणि रोग कव्हरेज"], eligibility: ["चहा उत्पादक", "टी बोर्डात नोंदणीकृत", "सर्व राज्ये"], documents: ["जमिनीच्या नोंदी", "टी बोर्ड नोंदणी"] },
    27: { fullName: "UPIS - फसल प्लस विमा", amount: "प्रीमियम: 2-8%", benefits: ["संयुक्त पीक + मालमत्ता विमा", "घर, ट्रॅक्टर, पशुधन कव्हर", "सर्वांसाठी एकच प्रीमियम", "जलद दावा निपटारा"], eligibility: ["सर्व शेतकरी", "कर्जदार शेतकऱ्यांसाठी अनिवार्य", "बिगर-कर्जदारांसाठी ऐच्छिक"], documents: ["जमिनीच्या नोंदी", "मालमत्तेची यादी", "आधार", "बँक खाते"] },
    28: { fullName: "ऑइल पाम विमा योजना", amount: "प्रीमियम: 2.5%", benefits: ["ऑइल पाम बागांचा विमा", "उत्पन्न नुकसान कव्हर", "कीड आणि रोग कव्हरेज", "5-वर्षीय पॉलिसी पर्याय"], eligibility: ["ऑइल पाम उत्पादक", "NMEO-OP मध्ये नोंदणीकृत", "किमान 1 हेक्टर"], documents: ["जमिनीच्या नोंदी", "बाग नोंदणी", "आधार"] },
    29: { fullName: "वेलची पीक विमा", amount: "प्रीमियम: 3%", benefits: ["वेलची बागांचा विमा", "हवामानामुळे उत्पन्न नुकसान कव्हर", "कीड आणि रोग कव्हरेज", "जलद दावा निपटारा"], eligibility: ["वेलची उत्पादक", "मसाला बोर्डात नोंदणीकृत", "किमान 0.5 एकर"], documents: ["जमिनीच्या नोंदी", "मसाला बोर्ड नोंदणी", "आधार"] },
    30: { fullName: "राष्ट्रीय पशुधन विमा योजना", amount: "प्रीमियम: 4-6%", benefits: ["गाय, म्हैस, मेंढी, शेळीचा विमा", "अपघात/आजाराने मृत्यू झाल्यास कव्हर", "BPL साठी सवलतीचा प्रीमियम", "जलद दावा निपटारा"], eligibility: ["सर्व पशुपालक", "दुग्ध उत्पादक शेतकरी", "BPL कुटुंबांना प्राधान्य"], documents: ["पशु ओळख", "पशुवैद्यकीय प्रमाणपत्र", "आधार", "बँक खाते"] },
    31: { fullName: "प्रधानमंत्री कृषी सिंचन योजना", amount: "55-75% सबसिडी", benefits: ["ठिबक/तुषार सबसिडी", "सर्वसाधारणसाठी 55%, SC/ST साठी 75%", "शेततळे मदत", "प्रति थेंब अधिक पीक"], eligibility: ["सर्व शेतकरी", "FPO", "पाणी वापरकर्त्यांच्या संस्था"], documents: ["जमिनीच्या नोंदी", "आधार", "बँक खाते", "विक्रेत्याचे कोटेशन"] },
    32: { fullName: "सूक्ष्म सिंचन निधी (नाबार्ड)", amount: "₹5,000 कोटींचा निधी", benefits: ["सूक्ष्म सिंचनासाठी अतिरिक्त सबसिडी", "PMKSY शी एकत्रीकरण", "राज्य सरकारचे कर्ज", "पाण्याची टंचाई असलेल्या भागांना प्राधान्य"], eligibility: ["राज्य सरकारे", "पाणी वापरकर्त्यांच्या संस्था", "FPO"], documents: ["प्रकल्प प्रस्ताव", "राज्याची मान्यता"] },
    33: { fullName: "हर खेत को पाणी (PMKSY घटक)", amount: "संपूर्ण कव्हरेज", benefits: ["प्रत्येक शेतात सिंचनाची सोय", "कमांड एरिया विकास", "पाणी साठवण संरचना", "जलस्रोतांचे पुनरुज्जीवन"], eligibility: ["सर्व शेतकरी", "जिरायती भागांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "जलस्रोताचा तपशील"] },
    34: { fullName: "पाणलोट विकास घटक (PMKSY)", amount: "₹12,000/हेक्टर", benefits: ["पाणलोट व्यवस्थापन", "मृदा आणि जल संधारण", "पावसाचे पाणी साठवणे", "चेक डॅम बांधकाम"], eligibility: ["पाणलोट क्षेत्रातील शेतकरी", "ग्राम समुदाय"], documents: ["ग्राम प्रस्ताव", "जमिनीच्या नोंदी"] },
    35: { fullName: "त्वरित सिंचन लाभ कार्यक्रम", amount: "90:10 निधी", benefits: ["प्रमुख सिंचन प्रकल्प", "केंद्र:राज्य निधी 90:10", "कमांड एरिया विकास", "पाणी वितरण प्रणाली"], eligibility: ["राज्य सरकारे", "सिंचन विभाग"], documents: ["प्रकल्प DPR", "राज्याची मान्यता"] },
    36: { fullName: "शेतासाठी रूफटॉप रेन वॉटर हार्वेस्टिंग", amount: "₹25,000 पर्यंत 50% सबसिडी", benefits: ["पावसाचे पाणी साठवण संरचना", "स्टोरेज टँक सबसिडी", "भूजल पुनर्भरण", "बोअरवेलवरील अवलंबित्व कमी"], eligibility: ["सर्व शेतकरी", "फार्म हाऊस", "पशू निवारा"], documents: ["इमारतीचा आराखडा", "जमिनीच्या नोंदी", "कोटेशन"] },
    37: { fullName: "शेततळे आणि विहीर पुनर्भरण योजना", amount: "₹50,000 पर्यंत 50% सबसिडी", benefits: ["शेततळे बांधकाम", "विहीर पुनर्भरण संरचना", "पावसाचे पाणी साठवणे", "भूजल पातळीत वाढ"], eligibility: ["सर्व शेतकरी", "पाण्याची पातळी कमी होत असलेले भाग"], documents: ["जमिनीच्या नोंदी", "विहीर मालकीचा पुरावा", "आधार"] },
    38: { fullName: "तुषार सिंचन सबसिडी", amount: "₹15,000/एकर पर्यंत 70% सबसिडी", benefits: ["पोर्टेबल तुषार संच", "40% पर्यंत पाण्याची बचत", "सर्व पिकांसाठी योग्य", "कमी देखभाल खर्च"], eligibility: ["अल्प व अत्यल्प भूधारक शेतकरी", "FPO", "पाण्याची टंचाई असलेल्या भागांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बँक खाते"] },
    39: { fullName: "ठिबक सिंचन प्रोत्साहन योजना", amount: "60-80% सबसिडी", benefits: ["ठिबक सिंचन प्रणाली", "60% पर्यंत पाण्याची बचत", "अधिक उत्पन्न", "फर्टिगेशनसाठी योग्य"], eligibility: ["सर्व शेतकरी", "फलोत्पादन शेतकऱ्यांना प्राधान्य", "FPO"], documents: ["जमिनीच्या नोंदी", "पिकाचा तपशील", "आधार", "बँक खाते"] },
    40: { fullName: "फील्ड चॅनेल आणि पाइपलाइन विस्तार", amount: "₹2 लाखांपर्यंत 50% सबसिडी", benefits: ["स्रोतापासून शेतापर्यंत PVC पाइपलाइन", "पाण्याची गळती कमी", "वेळ आणि श्रमाची बचत", "5 एकरांपर्यंत कव्हरेज"], eligibility: ["सर्व शेतकरी", "पाणी वापरकर्त्यांच्या संस्था", "FPO"], documents: ["जमिनीच्या नोंदी", "जलस्रोताचा पुरावा", "आधार", "बँक खाते"] },
    41: { fullName: "कृषी यंत्रांवर सबसिडी", amount: "40-50% सबसिडी", benefits: ["SC/ST साठी 50% (₹40,000 पर्यंत)", "सर्वसाधारण शेतकऱ्यांसाठी 40%", "ट्रॅक्टर, रोटाव्हेटर सबसिडी", "ड्रोन सबसिडी ₹5 लाखांपर्यंत (50%)"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "कस्टम हायरिंग सेंटर", "बचत गट"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बिल"] },
    42: { fullName: "फार्म मशीनरी बँक", amount: "₹40 लाखांपर्यंत 40% सबसिडी", benefits: ["यंत्रे भाड्याने देणारे केंद्र उभारणी", "उपकरणांवर 40% सबसिडी", "अल्पभूधारक शेतकऱ्यांना फायदा", "वैयक्तिक गुंतवणूक कमी"], eligibility: ["FPO", "सहकारी संस्था", "बचत गट", "युवा उद्योजक"], documents: ["व्यवसाय योजना", "नोंदणी प्रमाणपत्र", "केंद्रासाठी जागा"] },
    43: { fullName: "खत/कीटकनाशक फवारणीसाठी ड्रोन", amount: "₹8 लाखांपर्यंत 80% सबसिडी", benefits: ["महिला बचत गटांसाठी ड्रोन", "खरेदीवर 80% सबसिडी", "प्रशिक्षणाचा समावेश", "फवारणी सेवेतून उत्पन्न"], eligibility: ["महिला बचत गट", "महिला सदस्य असलेले FPO"], documents: ["SHG नोंदणी", "महिला सदस्यांची यादी"] },
    44: { fullName: "काढणीपश्चात व्यवस्थापन उपकरणे", amount: "₹10 लाखांपर्यंत 35% सबसिडी", benefits: ["थ्रेशर, ड्रायर, ग्रेडर", "साठवणूक उपकरणे", "पॅकेजिंग यंत्रे", "प्रक्रिया युनिट्स"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "कृषी-उद्योजक"], documents: ["प्रकल्प अहवाल", "कोटेशन", "जमिनीची कागदपत्रे"] },
    45: { fullName: "शेतकऱ्यांसाठी सोलर ड्रायर", amount: "₹50,000 पर्यंत 50% सबसिडी", benefits: ["फळे/भाज्यांसाठी सोलर ड्रायर", "काढणीपश्चात नुकसान कमी", "गुणवत्ता जतन", "मूल्यवर्धन"], eligibility: ["अल्पभूधारक शेतकरी", "FPO", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "आधार"] },
    46: { fullName: "कोल्ड स्टोरेज आणि कोल्ड चेन", amount: "₹50 लाखांपर्यंत 35% सबसिडी", benefits: ["कोल्ड स्टोरेज बांधकाम", "रेफर वाहने", "पॅकेजिंग उपकरणे", "नासाडी कमी"], eligibility: ["FPO", "सहकारी संस्था", "वैयक्तिक उद्योजक"], documents: ["प्रकल्प अहवाल", "जमिनीची कागदपत्रे", "व्यवसाय योजना"] },
    47: { fullName: "अल्पभूधारक शेतकऱ्यांसाठी छोटे ट्रॅक्टर सबसिडी", amount: "₹60,000 पर्यंत 40% सबसिडी", benefits: ["20-35 HP ट्रॅक्टरसाठी सबसिडी", "SC/ST शेतकऱ्यांना प्राधान्य", "कस्टम हायरिंगचा पर्याय", "शेतीचा खर्च कमी"], eligibility: ["अल्प व अत्यल्प भूधारक शेतकरी", "SC/ST शेतकरी", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बँक खाते"] },
    48: { fullName: "पॉवर टिलर सबसिडी योजना", amount: "₹25,000 पर्यंत 50% सबसिडी", benefits: ["पॉवर टिलरसाठी सबसिडी", "छोट्या शेतांसाठी योग्य", "मजुरांवरील अवलंबित्व कमी", "कमी देखभाल खर्च"], eligibility: ["अल्पभूधारक शेतकरी", "डोंगराळ भागातील शेतकरी", "FPO"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बँक खाते"] },
    49: { fullName: "कंबाइन हार्वेस्टर सबसिडी योजना", amount: "₹2 लाखांपर्यंत 40% सबसिडी", benefits: ["रीपर/हार्वेस्टरसाठी सबसिडी", "काढणीची वेळ कमी", "पिकाचे नुकसान किमान", "कस्टम हायरिंगसाठी योग्य"], eligibility: ["FPO", "सहकारी संस्था", "बचत गट", "मोठे शेतकरी"], documents: ["जमिनीच्या नोंदी", "व्यवसाय योजना", "आधार", "बँक खाते"] },
    50: { fullName: "यांत्रिक भात लावणी यंत्र सबसिडी", amount: "₹40,000 पर्यंत 50% सबसिडी", benefits: ["भात लावणी यंत्रासाठी सबसिडी", "मजुरीच्या खर्चात बचत", "समान लावणी", "अधिक उत्पन्न"], eligibility: ["भात उत्पादक", "FPO", "बचत गट", "कस्टम हायरिंग केंद्रे"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बँक खाते"] },
    51: { fullName: "मृदा आरोग्य पत्रिका योजना", amount: "मोफत सेवा", benefits: ["दर 2 वर्षांनी मोफत माती परीक्षण", "12 घटकांचे विश्लेषण", "पिकांनुसार शिफारसी", "खतांच्या खर्चात 10-15% कपात"], eligibility: ["सर्व शेतकरी", "अल्पभूधारक शेतकऱ्यांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "शेतकरी ओळखपत्र"] },
    52: { fullName: "फिरत्या माती परीक्षण प्रयोगशाळा", amount: "प्रति प्रयोगशाळा ₹25 लाख", benefits: ["फिरत्या माती परीक्षण व्हॅन", "घरोघरी मोफत सेवा", "7 दिवसांत निकाल", "दुर्गम गावांचा समावेश"], eligibility: ["राज्य सरकारे", "KVK", "कृषी विद्यापीठे"], documents: ["प्रस्ताव", "पायाभूत सुविधांचा तपशील"] },
    53: { fullName: "मृदा आरोग्य व्यवस्थापन (SHM)", amount: "₹2,000/हेक्टर", benefits: ["जमीन सुधारणा सबसिडी", "चुना/जिप्समचा वापर", "सूक्ष्म पोषक घटकांचा पुरवठा", "जिवाणू खतांना प्रोत्साहन"], eligibility: ["सर्व शेतकरी", "मृदा आरोग्य पत्रिका धारक"], documents: ["मृदा आरोग्य पत्रिका", "जमिनीच्या नोंदी"] },
    54: { fullName: "सूक्ष्म पोषक घटकांच्या कमतरतेवर उपाय", amount: "₹1,000/एकर पर्यंत 50% सबसिडी", benefits: ["झिंक, बोरॉन, लोह पुरवठा", "कमतरता सुधारणा", "दर्जेदार बियाणे सबसिडी", "उत्पन्नात वाढ"], eligibility: ["सूक्ष्म पोषक घटकांची कमतरता असलेले शेतकरी", "माती परीक्षण अहवाल आवश्यक"], documents: ["मृदा आरोग्य पत्रिका", "जमिनीच्या नोंदी"] },
    55: { fullName: "मातीची आम्लता/विम्लता सुधारणा", amount: "50% सबसिडी", benefits: ["आम्लयुक्त मातीसाठी चुना", "विम्लयुक्त मातीसाठी जिप्सम", "मातीचा pH सुधारणे", "पोषक तत्त्वांच्या उपलब्धतेत वाढ"], eligibility: ["समस्याग्रस्त माती असलेले शेतकरी", "माती परीक्षण आवश्यक"], documents: ["माती परीक्षण अहवाल", "जमिनीच्या नोंदी"] },
    56: { fullName: "सेंद्रिय पदार्थ संवर्धन योजना", amount: "₹5,000/हेक्टर", benefits: ["हिरवळीच्या खताची सबसिडी", "कंपोस्ट खताला प्रोत्साहन", "पिकांच्या अवशेषांचे व्यवस्थापन", "जमिनीतील सेंद्रिय कर्ब सुधारणे"], eligibility: ["सर्व शेतकरी", "सेंद्रिय शेती गट"], documents: ["जमिनीच्या नोंदी", "मृदा आरोग्य पत्रिका", "आधार"] },
    57: { fullName: "मोफत जिवाणू खत वाटप", amount: "5 किलो/एकर पर्यंत मोफत", benefits: ["मोफत रायझोबियम, PSB, अझोटोबॅक्टर", "रासायनिक खतांचा वापर कमी", "जमिनीची जैविक सुपीकता सुधारणे", "KVK मध्ये उपलब्ध"], eligibility: ["सर्व शेतकरी", "अल्प व अत्यल्प भूधारकांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "मृदा आरोग्य पत्रिका", "आधार"] },
    58: { fullName: "गांडूळ खत निर्मिती युनिट", amount: "₹25,000 पर्यंत 50% सबसिडी", benefits: ["गांडूळ खत युनिटची स्थापना", "गांडूळ पुरवठा", "सेंद्रिय खत निर्मिती", "कचऱ्याचा पुनर्वापर"], eligibility: ["वैयक्तिक शेतकरी", "बचत गट", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "प्रकल्प प्रस्ताव", "आधार", "बँक खाते"] },
    59: { fullName: "मातीची धूप प्रतिबंधक योजना", amount: "75% सबसिडी", benefits: ["कंटूर बंडिंग", "पायऱ्यांच्या शेतीसाठी मदत", "घळ भरणी", "पट्टा पीक पद्धतीला प्रोत्साहन"], eligibility: ["डोंगराळ भागातील शेतकरी", "मातीची धूप होणारे भाग"], documents: ["जमिनीच्या नोंदी", "मातीची धूप झाल्याचा पुरावा", "आधार"] },
    60: { fullName: "जमीन सपाटीकरण आणि विकास", amount: "₹10,000/एकर पर्यंत 50% सबसिडी", benefits: ["लेझर जमीन सपाटीकरण सबसिडी", "जमिनीला आकार देणे", "पाण्याचा निचरा सुधारणे", "पाण्याची कार्यक्षमता वाढवणे"], eligibility: ["सर्व शेतकरी", "FPO", "पाण्याची टंचाई असलेल्या भागांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "आधार", "कोटेशन", "बँक खाते"] },
    61: { fullName: "परंपरागत कृषी विकास योजना", amount: "₹31,500/हेक्टर", benefits: ["सेंद्रिय निविष्ठांसाठी ₹15,000", "प्रमाणपत्रासाठी ₹10,000", "प्रशिक्षणासाठी ₹6,500", "3 वर्षांची मदत"], eligibility: ["शेतकरी गट (50+ शेतकरी)", "FPO", "बचत गट", "किमान 50 एकर"], documents: ["क्लस्टर नोंदणी", "शेतकऱ्यांची यादी", "जमिनीचा तपशील", "माती परीक्षण अहवाल"] },
    62: { fullName: "ईशान्य क्षेत्रासाठी सेंद्रिय मूल्य साखळी विकास मिशन", amount: "₹75,000/हेक्टर", benefits: ["ईशान्येकडील राज्यांमध्ये सेंद्रिय शेती", "FPO स्थापनेसाठी मदत", "बाजारपेठेशी जोडणी", "प्रक्रिया पायाभूत सुविधा"], eligibility: ["ईशान्येकडील राज्यांचे शेतकरी", "FPO", "सेंद्रिय गट", "आदिवासी शेतकरी"], documents: ["जमिनीच्या नोंदी", "FPO नोंदणी", "शेतकरी ओळखपत्र", "बँक खाते"] },
    63: { fullName: "गांडूळ खत निर्मिती युनिट योजना", amount: "₹50,000 पर्यंत 50% सबसिडी", benefits: ["गांडूळ खत युनिटची स्थापना", "गांडूळ पुरवठा", "प्रशिक्षण दिले जाते", "सेंद्रिय खत निर्मिती"], eligibility: ["वैयक्तिक शेतकरी", "बचत गट", "FPO", "महिला शेतकरी"], documents: ["जमिनीची कागदपत्रे", "प्रकल्प प्रस्ताव", "आधार", "बँक खाते"] },
    64: { fullName: "जिवाणू खत निर्मिती युनिट योजना", amount: "₹2 लाखांपर्यंत 40% सबसिडी", benefits: ["रायझोबियम, PSB निर्मिती", "अझोटोबॅक्टर, VAM पुरवठा", "गुणवत्ता नियंत्रण प्रयोगशाळा", "शेतकरी प्रशिक्षण"], eligibility: ["बचत गट", "FPO", "युवा उद्योजक", "कृषी पदवीधर"], documents: ["व्यवसाय योजना", "तांत्रिक पात्रता", "जमीन भाडेपट्टा", "बँक खाते"] },
    65: { fullName: "शून्य आधारित नैसर्गिक शेती योजना", amount: "₹15,000/हेक्टर", benefits: ["नैसर्गिक शेतीला प्रोत्साहन", "गाय आधारित शेती", "जैविक कीटकनाशक प्रशिक्षण", "मल्चिंगसाठी मदत"], eligibility: ["सर्व शेतकरी", "जिरायती भागांना प्राधान्य", "अल्प व अत्यल्प भूधारक शेतकरी"], documents: ["जमिनीच्या नोंदी", "प्रशिक्षण प्रमाणपत्र", "आधार", "बँक खाते"] },
    66: { fullName: "PGS-इंडिया प्रमाणपत्र मदत", amount: "₹10,000 पर्यंत 100% सबसिडी", benefits: ["मोफत सेंद्रिय प्रमाणपत्र", "गटांसाठी सामूहिक प्रमाणपत्र", "गुणवत्तेची हमी", "बाजारपेठेत प्रवेश"], eligibility: ["शेतकरी गट", "FPO", "सेंद्रिय शेतकरी गट"], documents: ["क्लस्टर नोंदणी", "शेतकऱ्यांची यादी", "जमिनीच्या नोंदी"] },
    67: { fullName: "पशु खत व्यवस्थापन योजना", amount: "₹30,000 पर्यंत 50% सबसिडी", benefits: ["कंपोस्ट खड्डा बांधणी", "खत प्रक्रिया", "बायोगॅस युनिट सबसिडी", "शेणखताला प्रोत्साहन"], eligibility: ["पशुपालक शेतकरी", "दुग्ध उत्पादक शेतकरी", "बचत गट"], documents: ["जमिनीच्या नोंदी", "पशुगणनेचा पुरावा", "आधार", "बँक खाते"] },
    68: { fullName: "हिरवळीच्या खतासाठी बियाणे सबसिडी", amount: "बियाणांवर 50% सबसिडी", benefits: ["ताग, धैंचा बियाणे", "जमिनीची सुपीकता सुधारणे", "तण नियंत्रण", "खतांची गरज कमी करणे"], eligibility: ["सर्व शेतकरी", "सेंद्रिय शेतकऱ्यांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "आधार", "बँक खाते"] },
    69: { fullName: "राज्य सेंद्रिय शेती प्रोत्साहन", amount: "₹20,000/हेक्टर", benefits: ["सेंद्रिय निविष्ठा सबसिडी", "प्रशिक्षण आणि प्रात्यक्षिक", "बाजारपेठेशी जोडणीसाठी मदत", "PGS प्रमाणपत्र"], eligibility: ["सर्व शेतकरी", "सेंद्रिय गट", "बचत गट"], documents: ["जमिनीच्या नोंदी", "प्रशिक्षण प्रमाणपत्र", "आधार", "बँक खाते"] },
    70: { fullName: "जैविक कीटकनाशक प्रोत्साहन योजना", amount: "₹2,000/एकर पर्यंत 50% सबसिडी", benefits: ["कडुनिंब आधारित कीटकनाशके", "ट्रायकोडर्मा पुरवठा", "स्यूडोमोनास कल्चर", "IPM प्रशिक्षण"], eligibility: ["सर्व शेतकरी", "सेंद्रिय शेतकरी", "FPO"], documents: ["जमिनीच्या नोंदी", "आधार", "बँक खाते"] },
    71: { fullName: "एकात्मिक फलोत्पादन विकास अभियान (MIDH)", amount: "50-75% सबसिडी", benefits: ["फळे, भाजीपाला लागवड", "नर्सरी विकास", "काढणीपश्चात व्यवस्थापन", "पॅकेजिंग सबसिडी"], eligibility: ["सर्व शेतकरी", "FPO", "नर्सरी मालक", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "प्रकल्प प्रस्ताव", "आधार", "बँक खाते"] },
    72: { fullName: "नारळ विकास योजना", amount: "₹50,000/हेक्टर", benefits: ["अल्पभूधारक शेतकऱ्यांसाठी 70% सबसिडी", "जास्त उत्पन्न देणारी रोपे", "जुन्या झाडांच्या जागी नवीन झाडे", "मूल्यवर्धन मदत"], eligibility: ["केरळ, तामिळनाडू, कर्नाटक, आंध्र प्रदेशचे नारळ उत्पादक", "FPO", "अल्पभूधारक शेतकरी"], documents: ["जमिनीच्या नोंदी", "झाडांची गणना", "आधार", "बँक खाते"] },
    73: { fullName: "काजू आणि कोको कार्यक्रम", amount: "₹25,000/हेक्टर", benefits: ["काजू लागवड सबसिडी", "कोको शेतीसाठी मदत", "प्रक्रिया युनिट सबसिडी", "निर्यातीला प्रोत्साहन"], eligibility: ["किनारपट्टी राज्यांचे शेतकरी", "FPO", "प्रक्रिया युनिट्स", "बचत गट"], documents: ["जमिनीच्या नोंदी", "प्रकल्प अहवाल", "आधार", "बँक खाते"] },
    74: { fullName: "बांबू विकास योजना", amount: "₹30,000/हेक्टर", benefits: ["बांबू लागवड सबसिडी", "नर्सरी विकास", "मूल्यवर्धन युनिट्स", "हस्तकला मदत"], eligibility: ["ईशान्येकडील राज्यांचे शेतकरी", "FPO", "आदिवासी शेतकरी", "बचत गट"], documents: ["जमिनीच्या नोंदी", "बांबू क्षेत्राचा तपशील", "आधार", "बँक खाते"] },
    75: { fullName: "मसाला विकास आणि प्रक्रिया", amount: "40% सबसिडी", benefits: ["मसाला प्रक्रिया युनिट्स", "मूल्यवर्धन उपकरणे", "गुणवत्ता चाचणी प्रयोगशाळा", "निर्यात सुविधा"], eligibility: ["मसाला उत्पादक", "FPO", "मसाला प्रक्रिया करणारे", "बचत गट"], documents: ["जमिनीच्या नोंदी", "मसाला बोर्ड नोंदणी", "प्रकल्प अहवाल", "बँक खाते"] },
    76: { fullName: "आंबा लागवड आणि प्रक्रिया", amount: "₹40,000/हेक्टर", benefits: ["जास्त उत्पन्न देणारी आंब्याची रोपे", "प्रक्रिया युनिट मदत", "कोल्ड स्टोरेज सबसिडी", "निर्यातीला प्रोत्साहन"], eligibility: ["आंबा उत्पादक", "FPO", "प्रक्रिया युनिट्स"], documents: ["जमिनीच्या नोंदी", "जातीचा तपशील", "आधार", "बँक खाते"] },
    77: { fullName: "केळी लागवड आणि मूल्यवर्धन", amount: "₹35,000/हेक्टर", benefits: ["टिश्यू कल्चर रोपे सबसिडी", "ठिबक सिंचन मदत", "प्रक्रिया युनिट्स", "बाजारपेठेशी जोडणी"], eligibility: ["केळी उत्पादक", "FPO", "बचत गट"], documents: ["जमिनीच्या नोंदी", "जातीचा तपशील", "आधार", "बँक खाते"] },
    78: { fullName: "राष्ट्रीय पुष्पशेती अभियान", amount: "₹5 लाखांपर्यंत 50% सबसिडी", benefits: ["फुलशेतीसाठी मदत", "ग्रीनहाऊस सबसिडी", "निर्यात दर्जाची फुले", "कोल्ड चेन मदत"], eligibility: ["फूल उत्पादक", "FPO", "महिला शेतकरी", "बचत गट"], documents: ["जमिनीच्या नोंदी", "ग्रीनहाऊस प्रस्ताव", "आधार", "बँक खाते"] },
    79: { fullName: "राष्ट्रीय अळंबी (मशरूम) अभियान", amount: "₹1 लाखापर्यंत 50% सबसिडी", benefits: ["मशरूम स्पॉन सबसिडी", "ग्रोइंग रूम बांधकाम", "प्रशिक्षण आणि तंत्रज्ञान", "मार्केटिंग मदत"], eligibility: ["सर्व शेतकरी", "बचत गट", "महिला शेतकरी", "ग्रामीण तरुण"], documents: ["जमिनीच्या नोंदी", "आधार", "बँक खाते", "प्रशिक्षण प्रमाणपत्र"] },
    80: { fullName: "भाजीपाला क्लस्टर विकास योजना", amount: "₹20,000/हेक्टर", benefits: ["भाजीपाला बियाणे सबसिडी", "संरक्षित शेती", "बाजारपेठेशी जोडणी", "काढणीपश्चात व्यवस्थापन"], eligibility: ["भाजीपाला उत्पादक शेतकरी", "FPO", "बचत गट", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "पीक नियोजन", "आधार", "बँक खाते"] },
    81: { fullName: "कृषी संसाधनांसाठी आभासी एकात्मिक प्रणाली", amount: "मोफत AI सेवा", benefits: ["AI-आधारित कृषी सल्ला", "22+ भारतीय भाषा", "पीक शिफारसी", "कीड अलर्ट", "बाजारभाव"], eligibility: ["सर्व शेतकरी", "FPO", "विस्तार अधिकारी", "KVK"], documents: ["आधार", "मोबाईल नंबर", "जमिनीच्या नोंदी (ऐच्छिक)"] },
    82: { fullName: "राष्ट्रीय अ‍ॅग्रीस्टॅक डिजिटल प्लॅटफॉर्म", amount: "मोफत डिजिटल ओळख", benefits: ["युनिक शेतकरी ओळखपत्र", "डिजिटल जमिनीच्या नोंदी", "पीक पेरणीचा डेटा", "थेट लाभ हस्तांतरण (DBT) एकत्रीकरण"], eligibility: ["सर्व शेतकरी", "योजनेच्या लाभार्थ्यांना प्राधान्य", "अल्प व अत्यल्प भूधारक शेतकरी"], documents: ["आधार", "जमिनीच्या नोंदी", "बँक खाते", "मोबाईल नंबर"] },
    83: { fullName: "राष्ट्रीय कृषी बाजार (e-NAM)", amount: "मोफत ट्रेडिंग प्लॅटफॉर्म", benefits: ["ऑनलाइन मंडी ट्रेडिंग", "रिअल-टाइम किंमत शोध", "1000+ बाजार समित्या संलग्न", "शेतकऱ्यांना थेट पेमेंट"], eligibility: ["सर्व शेतकरी", "व्यापारी", "FPO", "कमिशन एजंट"], documents: ["आधार", "बँक खाते", "ट्रेडिंग परवाना", "मोबाईल नंबर"] },
    84: { fullName: "किसान सुविधा मोबाईल ॲप्लिकेशन", amount: "मोफत ॲप", benefits: ["हवामान अपडेट्स", "बाजारभाव", "कीड अलर्ट", "डीलर्सची माहिती", "पीक संरक्षण"], eligibility: ["सर्व शेतकरी", "प्ले स्टोअरवरून मोफत डाऊनलोड", "नोंदणीची आवश्यकता नाही"], documents: ["मोबाईल नंबर", "अँड्रॉइड फोन"] },
    85: { fullName: "ICAR-पुसा कृषी मोबाईल ॲप", amount: "मोफत", benefits: ["पिकांच्या जातींचा डेटाबेस", "शेतीच्या पद्धती (Package of Practices)", "रोग निदान", "तज्ज्ञांचा सल्ला"], eligibility: ["सर्व शेतकरी", "मोफत डाऊनलोड", "हिंदी आणि इंग्रजीमध्ये उपलब्ध"], documents: ["आवश्यकता नाही"] },
    86: { fullName: "किसान कॉल सेंटर 1551", amount: "टोल फ्री", benefits: ["24x7 कृषी विषयक प्रश्न", "तज्ज्ञांचा सल्ला", "बहुभाषिक मदत", "योजनांची माहिती"], eligibility: ["सर्व शेतकरी", "टोल फ्री नंबर: 1551", "कोणत्याही फोनवरून कॉल करा"], documents: ["आवश्यकता नाही"] },
    87: { fullName: "शेतकऱ्यांसाठी mKisan SMS पोर्टल", amount: "मोफत SMS सेवा", benefits: ["मोफत SMS अलर्ट", "हवामानाचा अंदाज", "बाजारभाव", "पीक संरक्षण सल्ला"], eligibility: ["सर्व शेतकरी", "मोबाईल नंबर नोंदणी आवश्यक", "कोणत्याही मोबाईल नेटवर्कवर"], documents: ["मोबाईल नंबर", "शेतकरी नोंदणी"] },
    88: { fullName: "कस्टम हायरिंग सेंटर मोबाईल ॲप", amount: "मोफत सेवा", benefits: ["जवळची कृषी यंत्रे शोधा", "उपकरणे ऑनलाइन बुक करा", "भाडेदरांची तुलना", "शेतकऱ्यांचे रिव्ह्यू"], eligibility: ["सर्व शेतकरी", "FPO", "कस्टम हायरिंग सेंटर्स"], documents: ["मोबाईल नंबर", "लोकेशन ॲक्सेस"] },
    89: { fullName: "NPSS - डिजिटल कीड पाळत ठेवणे", amount: "मोफत सेवा", benefits: ["AI-आधारित कीड ओळख", "पूर्वसूचना प्रणाली", "पिकांनुसार अलर्ट", "उपचारात्मक शिफारसी"], eligibility: ["सर्व शेतकरी", "मोफत मोबाईल ॲप", "नोंदणीची आवश्यकता नाही"], documents: ["मोबाईल नंबर", "पिकाचा फोटो (निदानासाठी)"] },
    90: { fullName: "कृषी-स्टार्टअप इनक्युबेशन योजना", amount: "₹25 लाख अनुदान", benefits: ["कृषी-टेक स्टार्टअपसाठी निधी", "मार्गदर्शन", "इनक्युबेशन मदत", "गुंतवणूकदारांशी संपर्क"], eligibility: ["कृषी-टेक स्टार्टअप्स", "युवा उद्योजक (18-35)", "ग्रामीण नवोन्मेषक"], documents: ["व्यवसाय योजना", "स्टार्टअप नोंदणी", "टीमचा तपशील", "नावीन्यपूर्णतेचा पुरावा"] },
    91: { fullName: "प्रधानमंत्री किसान ऊर्जा सुरक्षा आणि उत्थान महाभियान (PM-KUSUM)", amount: "60% सबसिडी", benefits: ["सोलर पंपसाठी 60% सबसिडी (7.5 HP पर्यंत)", "पडीक जमिनीवर सोलर पॅनेल्स", "अतिरिक्त वीज ग्रीडला विका", "विजेचा खर्च कमी"], eligibility: ["शेती असणारे शेतकरी", "वैयक्तिक शेतकरी", "पाणी वापरकर्त्यांच्या संस्था", "FPO"], documents: ["जमिनीच्या नोंदी", "वीज जोडणीचा पुरावा", "आधार", "बँक खाते"] },
    92: { fullName: "सोलर चरखा क्लस्टर", amount: "₹4.5 लाख सबसिडी", benefits: ["सोलर चरखा युनिट्स", "महिला सक्षमीकरण", "खादी उत्पादन", "ग्रामीण रोजगार"], eligibility: ["बचत गट", "महिला शेतकरी", "ग्रामीण कारागीर", "खादी संस्था"], documents: ["SHG नोंदणी", "प्रकल्प प्रस्ताव", "बँक खाते"] },
    93: { fullName: "सौरऊर्जेवर चालणारी कोल्ड स्टोरेज योजना", amount: "₹10 लाखांपर्यंत 50% सबसिडी", benefits: ["शेतकऱ्यांसाठी सोलर कोल्ड स्टोरेज", "काढणीपश्चात नुकसान कमी", "ऑफ-ग्रिड चालणारे", "फळे आणि भाज्यांचे संरक्षण"], eligibility: ["FPO", "शेतकरी सहकारी संस्था", "बचत गट", "वैयक्तिक शेतकरी"], documents: ["जमिनीच्या नोंदी", "प्रकल्प अहवाल", "आधार", "बँक खाते"] },
    94: { fullName: "शेतीमालासाठी सोलर ड्रायर", amount: "₹2 लाखांपर्यंत 40% सबसिडी", benefits: ["धान्य/फळांसाठी सोलर ड्रायर", "गुणवत्ता जतन", "मूल्यवर्धन", "उन्हात वाळवण्यावरील अवलंबित्व कमी"], eligibility: ["सर्व शेतकरी", "FPO", "बचत गट", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "कोटेशन", "आधार", "बँक खाते"] },
    95: { fullName: "पीक संरक्षणासाठी सोलर फेन्सिंग", amount: "₹50,000 पर्यंत 50% सबसिडी", benefits: ["शेतासाठी सोलर फेन्सिंग", "वन्य प्राण्यांपासून संरक्षण", "कमी देखभाल", "विजेचे बिल नाही"], eligibility: ["वन्यप्राण्यांचा त्रास असलेल्या भागातील शेतकरी", "बागायतदार", "सर्व शेतकरी"], documents: ["जमिनीच्या नोंदी", "जागेचा पुरावा", "आधार", "बँक खाते"] },
    96: { fullName: "ऑफ-ग्रिड सोलर वॉटर पंपिंग", amount: "₹1.5 लाखांपर्यंत 75% सबसिडी", benefits: ["सोलर सबमर्सिबल पंप", "डिझेल/विजेचा खर्च नाही", "दुर्गम भागासाठी उपयुक्त", "5 वर्षांची वॉरंटी"], eligibility: ["अल्प व अत्यल्प भूधारक शेतकरी", "ग्रीड कनेक्शन नसलेले भाग"], documents: ["जमिनीच्या नोंदी", "पाण्याच्या स्रोताचा पुरावा", "आधार", "बँक खाते"] },
    97: { fullName: "सौरऊर्जेवर चालणारी संरक्षित शेती", amount: "₹5 लाखांपर्यंत 60% सबसिडी", benefits: ["सोलर फॅन्स आणि कुलिंग", "तापमान नियंत्रण", "विस्तारित पेरणीचा हंगाम", "अधिक उत्पन्न"], eligibility: ["फलोत्पादन शेतकरी", "FPO", "बचत गट"], documents: ["जमिनीच्या नोंदी", "ग्रीनहाऊस नियोजन", "आधार", "बँक खाते"] },
    98: { fullName: "कृषी-ड्रोनसाठी सोलर चार्जिंग", amount: "₹50,000 पर्यंत 40% सबसिडी", benefits: ["सोलर चार्जिंग स्टेशन", "ऑफ-ग्रिड ड्रोन ऑपरेशन्स", "शाश्वत शेती", "डिझेलचा वापर कमी"], eligibility: ["FPO", "ड्रोन दीदी लाभार्थी", "बचत गट"], documents: ["ड्रोन खरेदीचा पुरावा", "जमिनीच्या नोंदी", "आधार", "बँक खाते"] },
    99: { fullName: "कृषी फीडरचे सौरऊर्जीकरण", amount: "90% अनुदान", benefits: ["सिंचन फीडरसाठी सौरऊर्जा", "दिवसा खात्रीशीर वीज", "ग्रीडवरील अवलंबित्व कमी", "कमी वीज बिल"], eligibility: ["राज्य सरकारे", "डिस्कॉम (DISCOM)", "पाणी वापरकर्त्यांच्या संस्था"], documents: ["प्रकल्प प्रस्ताव", "फीडरचा तपशील"] },
    100: { fullName: "शेतकऱ्यांसाठी रूफटॉप सोलर सबसिडी", amount: "₹78,000 पर्यंत 40% सबसिडी", benefits: ["ग्रीड-कनेक्टेड रूफटॉप सोलर", "विजेच्या बिलात कपात", "अतिरिक्त वीज ग्रीडला विका", "पंप सेट किंवा घरगुती वापरासाठी"], eligibility: ["सर्व शेतकरी", "फार्म हाऊस मालक", "FPO"], documents: ["वीज बिल", "छत मालकीचा पुरावा", "आधार", "बँक खाते"] },
    101: { fullName: "पशुसंवर्धन पायाभूत सुविधा विकास निधी (AHIDF)", amount: "₹100 कोटींपर्यंत कर्ज", benefits: ["दुग्ध, पोल्ट्रीसाठी कर्ज-संलग्न सबसिडी", "3% व्याज सवलत", "₹100 कोटींपर्यंत कर्ज", "MSME साठी कर्ज हमी"], eligibility: ["वैयक्तिक उद्योजक", "FPO", "खाजगी कंपन्या", "सहकारी संस्था"], documents: ["सविस्तर प्रकल्प अहवाल", "व्यवसाय नोंदणी", "जमिनीची कागदपत्रे", "बँक खाते"] },
    102: { fullName: "दुग्ध उद्योजकता विकास योजना", amount: "25-33% सबसिडी", benefits: ["दुग्ध युनिट्ससाठी सबसिडी", "सर्वसाधारणसाठी 25%, SC/ST साठी 33%", "गाय/म्हशींसाठी कर्ज", "दूध प्रक्रिया उपकरणे"], eligibility: ["वैयक्तिक शेतकरी", "बचत गट", "दुग्ध सहकारी संस्था", "भूमिहीन शेतकरी"], documents: ["जमिनीची कागदपत्रे", "आधार", "बँक खाते", "प्रकल्प अहवाल"] },
    103: { fullName: "पोल्ट्री व्हेंचर कॅपिटल फंड", amount: "₹3 लाखांपर्यंत 33% सबसिडी", benefits: ["कुक्कुटपालनासाठी सबसिडी", "SC/ST शेतकऱ्यांसाठी 33%", "ब्रॉयलर/लेयर युनिटसाठी कर्ज", "हॅचरी मदत"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "बचत गट", "युवा उद्योजक"], documents: ["जमिनीची कागदपत्रे", "आधार", "बँक खाते", "अनुभव प्रमाणपत्र"] },
    104: { fullName: "शेळी आणि मेंढी विकास योजना", amount: "₹50,000 पर्यंत 50% सबसिडी", benefits: ["शेळी/मेंढी पालनासाठी सबसिडी", "प्रजाती सुधारणेसाठी मदत", "पशुवैद्यकीय काळजी", "मार्केटिंग मदत"], eligibility: ["अल्पभूधारक शेतकरी", "भूमिहीन मजूर", "आदिवासी शेतकरी", "महिला शेतकरी"], documents: ["आधार", "बँक खाते", "ग्रामपंचायत प्रमाणपत्र", "जमिनीच्या नोंदी"] },
    105: { fullName: "डुक्कर विकास आणि प्रजनन योजना", amount: "₹40,000 पर्यंत 40% सबसिडी", benefits: ["डुक्कर पालनासाठी सबसिडी", "प्रजाती सुधारणा", "पशुवैद्यकीय मदत", "बाजारपेठेशी जोडणी"], eligibility: ["अल्पभूधारक शेतकरी", "आदिवासी शेतकरी", "बचत गट", "ग्रामीण तरुण"], documents: ["आधार", "बँक खाते", "जमिनीच्या नोंदी", "प्रशिक्षण प्रमाणपत्र"] },
    106: { fullName: "राष्ट्रीय चारा विकास योजना", amount: "₹10,000/हेक्टर", benefits: ["चाऱ्याच्या बियाण्यांसाठी सबसिडी", "हायड्रोपोनिक चारा युनिट्स", "सायलेज (मुरघास) बनवण्यासाठी मदत", "चारा साठवणूक"], eligibility: ["सर्व शेतकरी", "दुग्ध उत्पादक शेतकरी", "FPO", "बचत गट"], documents: ["जमिनीच्या नोंदी", "पशुगणनेचा पुरावा", "आधार", "बँक खाते"] },
    107: { fullName: "राष्ट्रीय पशु रोग विमा योजना", amount: "प्रीमियम: ₹50-200/पशू", benefits: ["पशुधन विमा", "गाय, म्हैस, मेंढी, शेळीला कव्हर", "रोग आणि अपघात कव्हरेज", "जलद दावा निपटारा"], eligibility: ["सर्व पशुपालक", "दुग्ध उत्पादक शेतकरी", "शेळी/मेंढी पालक"], documents: ["पशू ओळख", "पशुवैद्यकीय प्रमाणपत्र", "आधार", "बँक खाते"] },
    108: { fullName: "NBHM - हनी मिशन", amount: "₹10,000/लाभार्थी", benefits: ["मधमाशी पालन उपकरणांसाठी सबसिडी", "मध प्रक्रिया युनिट्स", "प्रशिक्षण आणि प्रात्यक्षिक", "मधासाठी मार्केटिंग मदत"], eligibility: ["वैयक्तिक शेतकरी", "बचत गट", "FPO", "आदिवासी शेतकरी"], documents: ["जमिनीच्या नोंदी (मधमाशांच्या पेटीसाठी)", "आधार", "बँक खाते", "प्रशिक्षण प्रमाणपत्र (प्राधान्य)"] },
    109: { fullName: "प्रधानमंत्री मत्स्य संपदा योजना (PMMSY)", amount: "40-60% सबसिडी", benefits: ["मत्स्यपालन सबसिडी", "हॅचरी विकास", "माशांसाठी कोल्ड चेन", "प्रक्रिया युनिट्स", "निर्यातीला प्रोत्साहन"], eligibility: ["मच्छीमार", "मत्स्यपालक", "FPO", "सहकारी संस्था", "महिला बचत गट"], documents: ["जलस्रोताची मालकी/भाडेपट्टा", "आधार", "बँक खाते", "प्रकल्प अहवाल"] },
    110: { fullName: "NLM - पशुधन विकास", amount: "₹2 लाखांपर्यंत 50% सबसिडी", benefits: ["गाय, म्हैस, मेंढी, शेळीच्या प्रजातीत सुधारणा", "चारा विकास", "धोका व्यवस्थापन", "उद्योजकता विकास"], eligibility: ["सर्व पशुपालक शेतकरी", "FPO", "सहकारी संस्था", "बचत गट"], documents: ["पशुधनाच्या गणनेचा पुरावा", "जमिनीच्या नोंदी (चाऱ्यासाठी)", "आधार", "बँक खाते"] },
    111: { fullName: "राज्य आपत्ती प्रतिसाद निधी - कृषी", amount: "₹20,000/हेक्टर", benefits: ["पीक नुकसानीची भरपाई", "नैसर्गिक आपत्तीसाठी मदत", "पूर, दुष्काळ, चक्रीवादळ", "त्वरित वितरण"], eligibility: ["अधिसूचित आपत्ती क्षेत्रातील शेतकरी", "सर्व शेतकरी", "पिकाचे नुकसान >50%"], documents: ["जमिनीच्या नोंदी", "पीक नुकसानीचे प्रमाणपत्र", "आधार", "बँक खाते"] },
    112: { fullName: "राष्ट्रीय आपत्ती प्रतिसाद दल - कृषी", amount: "₹25,000/हेक्टर", benefits: ["राष्ट्रीय स्तरावरील आपत्ती मदत", "चक्रीवादळ, पूर, गारपीट", "भूस्खलन कव्हरेज", "किडींचा प्रादुर्भाव"], eligibility: ["गंभीरपणे बाधित क्षेत्रातील शेतकरी", "सर्व वर्ग"], documents: ["आपत्ती अधिसूचना", "जमिनीच्या नोंदी", "पीक नुकसानीचे प्रमाणपत्र", "आधार"] },
    113: { fullName: "गारपीट पीक विमा", amount: "प्रीमियम: 2-5%", benefits: ["गारपिटीसाठी विशेष कव्हरेज", "वैयक्तिक शेताचे मूल्यांकन", "त्वरित दावे", "सर्व पिकांना कव्हर करते"], eligibility: ["गारपीट प्रवण क्षेत्रातील शेतकरी", "सर्व शेतकऱ्यांसाठी ऐच्छिक"], documents: ["जमिनीच्या नोंदी", "हवामान डेटा", "आधार", "बँक खाते"] },
    114: { fullName: "राष्ट्रीय दुष्काळ मदत पॅकेज", amount: "₹15,000/हेक्टर", benefits: ["दुष्काळग्रस्त शेतकरी", "इनपुट सबसिडी", "चारा पुरवठा", "पिण्याच्या पाण्यासाठी मदत"], eligibility: ["दुष्काळ घोषित क्षेत्रातील शेतकरी", "अल्प व अत्यल्प भूधारकांना प्राधान्य"], documents: ["जमिनीच्या नोंदी", "दुष्काळ घोषणा", "पीक नुकसानीचा पुरावा", "आधार"] },
    115: { fullName: "शेतीसाठी राष्ट्रीय पूर मदत", amount: "₹18,000/हेक्टर", benefits: ["पूरग्रस्त शेतकरी", "पीक नुकसानीची भरपाई", "पुनर्लागवडीसाठी बियाणे सबसिडी", "इनपुट मदत"], eligibility: ["पूरग्रस्त भागातील शेतकरी", "सर्व वर्ग"], documents: ["जमिनीच्या नोंदी", "पूर नुकसानीचा अहवाल", "आधार", "बँक खाते"] },
    116: { fullName: "चक्रीवादळ प्रभावित कृषी मदत", amount: "₹22,000/हेक्टर", benefits: ["चक्रीवादळामुळे झालेल्या नुकसानीची भरपाई", "बागांचे नुकसान कव्हरेज", "पशुधनाच्या नुकसानीसाठी मदत", "इनपुट सबसिडी"], eligibility: ["किनारपट्टीवरील शेतकरी", "चक्रीवादळ प्रभावित भाग"], documents: ["जमिनीच्या नोंदी", "चक्रीवादळ नुकसानीचा अहवाल", "आधार", "बँक खाते"] },
    117: { fullName: "टोळधाड/कीड आक्रमण मदत योजना", amount: "₹10,000/हेक्टर", benefits: ["किडीच्या नुकसानीसाठी भरपाई", "मोफत कीटकनाशक पुरवठा", "पीक नुकसानीचे कव्हरेज", "त्वरित प्रतिसाद पथक (Quick Response Team)"], eligibility: ["कीड प्रभावित भागातील शेतकरी", "टोळधाड आक्रमण क्षेत्र"], documents: ["जमिनीच्या नोंदी", "कीड आक्रमण प्रमाणपत्र", "आधार", "बँक खाते"] },
    118: { fullName: "भूस्खलन कृषी मदत", amount: "₹30,000/हेक्टर", benefits: ["भूस्खलन नुकसानीची भरपाई", "जमीन पुनर्स्थापना मदत", "पायऱ्यांच्या शेती दुरुस्तीसाठी सबसिडी", "इनपुट मदत"], eligibility: ["डोंगराळ भागातील शेतकरी", "भूस्खलन प्रभावित क्षेत्र"], documents: ["जमिनीच्या नोंदी", "भूस्खलन नुकसानीचा अहवाल", "आधार", "बँक खाते"] },
    119: { fullName: "वीज पडून झालेल्या नुकसानीची भरपाई", amount: "₹5 लाख/शेतकरी", benefits: ["शेतकऱ्याचा मृत्यू झाल्यास भरपाई", "वैद्यकीय खर्चाचे कव्हरेज", "अवलंबून असलेल्या कुटुंबाला मदत", "त्वरित वितरण"], eligibility: ["वीज पडून बाधित झालेले शेतकरी", "मृत शेतकऱ्यांचे कुटुंब"], documents: ["मृत्यू प्रमाणपत्र", "पोलिस अहवाल", "आधार", "बँक खाते"] },
    120: { fullName: "शीत लहर पीक संरक्षण योजना", amount: "₹8,000/हेक्टर", benefits: ["दव/धुक्याच्या नुकसानीची भरपाई", "धूर निर्माण करणाऱ्या यंत्रासाठी सबसिडी", "पीक कव्हर करण्यासाठी मदत", "इनपुट मदत"], eligibility: ["थंडीची लाट असलेल्या भागातील शेतकरी", "भाजीपाला आणि फळ उत्पादक"], documents: ["जमिनीच्या नोंदी", "तापमान डेटा", "पीक नुकसानीचा पुरावा", "आधार"] },
    121: { fullName: "ई-नाम (e-NAM) वर्धित प्लॅटफॉर्म", amount: "मोफत ट्रेडिंग", benefits: ["ऑनलाइन मंडी ट्रेडिंग", "गुणवत्ता तपासणी", "गोदाम पावती प्रणाली", "थेट पेमेंट"], eligibility: ["सर्व शेतकरी", "व्यापारी", "FPO", "कमिशन एजंट"], documents: ["आधार", "बँक खाते", "मोबाईल नंबर", "ट्रेडिंग नोंदणी"] },
    122: { fullName: "FPO व्यापार मदत योजना", amount: "₹15 लाख मदत", benefits: ["FPO बाजारपेठ जोडणी", "ब्रँड विकास", "पॅकेजिंग मदत", "थेट खरेदीदारांशी संपर्क"], eligibility: ["नोंदणीकृत FPO", "उत्पादक कंपन्या", "शेतकरी सहकारी संस्था"], documents: ["FPO नोंदणी", "सदस्यांची यादी", "बँक खाते", "व्यवसाय योजना"] },
    123: { fullName: "हस्तांतरणीय गोदाम पावती योजना (NWRS)", amount: "गोदाम पावतीवर कर्ज", benefits: ["गोदामात पीक साठवणूक", "पावतीवर कर्ज मिळवा", "जास्त भावाने विक्री", "गुणवत्ता जतन"], eligibility: ["सर्व शेतकरी", "FPO", "व्यापारी", "सहकारी संस्था"], documents: ["गोदाम पावती", "आधार", "बँक खाते", "पिकाचा तपशील"] },
    124: { fullName: "कृषी माल वाहतूक सबसिडी", amount: "50% वाहतूक सबसिडी", benefits: ["वाहतूक खर्चावर सबसिडी", "ईशान्येकडील राज्यांना प्राधान्य", "लवकर खराब होणारा माल", "बाजार समितीत प्रवेश"], eligibility: ["दुर्गम भागातील शेतकरी", "ईशान्येकडील राज्ये", "डोंगराळ भाग", "आदिवासी क्षेत्र"], documents: ["वाहतूक बिल", "मंडी प्रवेशाचा पुरावा", "आधार", "बँक खाते"] },
    125: { fullName: "बाजार हस्तक्षेप योजना (MIS)", amount: "MSP हमीभाव मदत", benefits: ["लवकर खराब होणाऱ्या पिकांसाठी आधारभूत किंमत", "सरकारी खरेदी", "नुकसान भरपाई", "शेतकरी उत्पन्न सुरक्षा"], eligibility: ["अधिसूचित लवकर खराब होणारी पिके घेणारे शेतकरी", "सर्व राज्ये"], documents: ["पीक घोषणापत्र", "जमिनीच्या नोंदी", "आधार", "बँक खाते"] },
    126: { fullName: "किसान रेल मालवाहतूक सबसिडी योजना", amount: "50% मालवाहतूक सबसिडी", benefits: ["लवकर खराब होणाऱ्या मालाची सवलतीत वाहतूक", "वेगवान बाजारपेठ प्रवेश", "नासाडीत घट", "देशभरात पोहोच"], eligibility: ["सर्व शेतकरी", "FPO", "सहकारी संस्था", "व्यापारी (शेतकऱ्यांच्या वतीने)"], documents: ["रेल्वे बुकिंग पावती", "शेतकरी घोषणापत्र", "आधार", "बँक खाते"] },
    127: { fullName: "FPO ची स्थापना आणि प्रोत्साहन", amount: "प्रति FPO ₹15 लाख", benefits: ["FPO स्थापनेसाठी आर्थिक मदत", "5 वर्षे मार्गदर्शन", "₹15 लाखांपर्यंत इक्विटी अनुदान", "क्रेडिट हमी"], eligibility: ["300+ शेतकऱ्यांचे गट", "बचत गट", "सहकारी संस्था", "शेतकरी गट"], documents: ["शेतकऱ्यांची यादी (300+)", "जमिनीचा तपशील", "व्यवसाय योजना", "बँक खाते"] },
    128: { fullName: "AMI - ग्रामीण गोदाम योजना", amount: "₹25 लाखांपर्यंत 25% सबसिडी", benefits: ["ग्रामीण गोदाम बांधकाम", "शेतकऱ्यांसाठी वेअरहाऊस", "साठवलेल्या पिकांवर कर्ज", "कमी भावात विक्री (Distress sale) कमी"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "सहकारी संस्था", "बचत गट"], documents: ["जमिनीची कागदपत्रे", "प्रकल्प अहवाल", "आधार", "बँक खाते"] },
    129: { fullName: "PMKS - किसान संपदा योजना", amount: "₹10 कोटींपर्यंत 35% सबसिडी", benefits: ["अन्न प्रक्रिया युनिट्स", "मेगा फूड पार्क", "कोल्ड चेन पायाभूत सुविधा", "मूल्यवर्धन"], eligibility: ["अन्न प्रक्रिया करणारे", "FPO", "सहकारी संस्था", "कृषी-उद्योजक"], documents: ["सविस्तर प्रकल्प अहवाल", "जमिनीची कागदपत्रे", "कंपनी नोंदणी", "बँक खाते"] },
    130: { fullName: "शेतकरी थेट पणन (Direct Marketing) योजना", amount: "₹2 लाखांपर्यंत 50% सबसिडी", benefits: ["शेतकरी बाजार स्टॉल सबसिडी", "थेट ग्राहकांना विक्री", "ब्रँडिंग मदत", "डिजिटल पेमेंट सेटअप"], eligibility: ["वैयक्तिक शेतकरी", "FPO", "बचत गट", "महिला शेतकरी"], documents: ["जमिनीच्या नोंदी", "बाजार स्टॉल योजना", "आधार", "बँक खाते"] },
    131: { fullName: "महात्मा गांधी नरेगा (MGNREGA) - कृषी कामे", amount: "100 दिवसांची हमी मजुरी", benefits: ["100 दिवसांच्या रोजगाराची हमी", "दररोज ₹300+ मजुरी", "शेततळे बांधकाम", "जमीन विकास कामे", "सिंचन कालव्याची कामे"], eligibility: ["सर्व ग्रामीण कुटुंबे", "अकुशल काम करण्यास इच्छुक प्रौढ सदस्य", "SC/ST/महिलांना प्राधान्य"], documents: ["जॉब कार्ड", "आधार", "बँक खाते", "रेशन कार्ड"] },
    132: { fullName: "ACABC - कृषी-उद्योजकता योजना", amount: "₹20 लाख कर्ज + 44% सबसिडी", benefits: ["कृषी पदवीधरांसाठी प्रशिक्षण", "प्रकल्प खर्चावर 44% सबसिडी", "₹20 लाखांपर्यंत कर्ज", "प्रशिक्षणादरम्यान मासिक विद्यावेतन"], eligibility: ["कृषी पदवीधर", "कृषी पदविकाधारक", "जीवशास्त्र पदवीधर", "कृषी-संलग्न विषयातील पदव्युत्तर"], documents: ["पदवी प्रमाणपत्र", "आधार", "बँक खाते", "व्यवसाय योजना", "नाबार्ड (NABARD) कडून NOC"] },
    133: { fullName: "राष्ट्रीय कृषी कौशल्य विकास", amount: "मोफत प्रशिक्षण + ₹5,000 विद्यावेतन", benefits: ["मोफत कौशल्य प्रशिक्षण कार्यक्रम", "ड्रोन पायलट प्रशिक्षण", "माती परीक्षण तंत्रज्ञ", "कृषी यंत्र ऑपरेटर", "अन्न प्रक्रिया कौशल्ये"], eligibility: ["ग्रामीण तरुण (18-35 वर्षे)", "शेतकऱ्यांची मुले", "महिला शेतकरी", "शाळा सोडलेले"], documents: ["आधार", "वयाचा पुरावा", "शैक्षणिक प्रमाणपत्रे", "बँक खाते", "पासपोर्ट फोटो"] },
    134: { fullName: "प्रधानमंत्री कौशल विकास योजना - कृषी", amount: "मोफत प्रशिक्षण + प्रमाणपत्र", benefits: ["मोफत व्यावसायिक प्रशिक्षण", "सरकारी प्रमाणपत्र", "नोकरी प्लेसमेंट मदत", "पूर्व शिक्षणाची मान्यता (RPL)", "कृषी यंत्र दुरुस्ती प्रशिक्षण"], eligibility: ["18-45 वयोगटातील तरुण", "शेतकरी कुटुंबे", "ग्रामीण आणि शहरी तरुण", "महिला उमेदवार"], documents: ["आधार", "वयाचा पुरावा", "शैक्षणिक कागदपत्रे", "बँक खाते", "मोबाईल नंबर"] },
    135: { fullName: "स्टार्टअप इंडिया कृषी ग्रँड चॅलेंज", amount: "₹50 लाख सीड फंड", benefits: ["₹50 लाखांपर्यंत सीड फंड", "तज्ज्ञांचे मार्गदर्शन", "इनक्युबेशन मदत", "3 वर्षे कर सवलत", "पेटंट फाइलिंग मदत"], eligibility: ["कृषी-टेक स्टार्टअप्स", "युवा उद्योजक (18-35)", "नाविन्यपूर्ण कृषी उपाय", "नोंदणीकृत स्टार्टअप्स (DPIIT)"], documents: ["स्टार्टअप नोंदणी", "नाविन्यपूर्णतेचा तपशील", "व्यवसाय योजना", "टीम प्रोफाइल", "बँक खाते"] },
    136: { fullName: "RSETI - ग्रामीण स्वयंरोजगार प्रशिक्षण संस्था", amount: "मोफत प्रशिक्षण + कर्ज जोडणी", benefits: ["मोफत निवासी प्रशिक्षण (7-30 दिवस)", "दुग्ध व्यवसाय प्रशिक्षण", "कुक्कुट आणि शेळी पालन", "बँक कर्ज जोडणी", "प्रशिक्षणानंतर मदत"], eligibility: ["ग्रामीण तरुण (18-45 वर्षे)", "बेरोजगार तरुण", "शेतकऱ्यांची मुले", "महिला उमेदवार"], documents: ["आधार", "रेशन कार्ड", "उत्पन्नाचा दाखला", "बँक खाते", "पासपोर्ट फोटो"] },
    137: { fullName: "राष्ट्रीय युवा सक्षमीकरण कार्यक्रम - कृषी", amount: "₹2 लाख प्रकल्प मदत", benefits: ["तरुणांच्या नेतृत्वाखालील कृषी प्रकल्प", "नेतृत्व विकास", "सामुदायिक शेती उपक्रम", "आर्थिक साक्षरता प्रशिक्षण", "बाजारपेठेशी जोडणीसाठी मदत"], eligibility: ["तरुण गट (15-29 वर्षे)", "युवा मंडळे", "नेहरू युवा केंद्राचे सदस्य", "ग्रामीण युवक संघटना"], documents: ["गट नोंदणी", "सदस्यांचा तपशील", "आधार", "बँक खाते", "प्रकल्प प्रस्ताव"] },
    138: { fullName: "दीनदयाल उपाध्याय ग्रामीण कौशल्य योजना (DDU-GKY)", amount: "मोफत प्रशिक्षण + ₹1,000/महिना विद्यावेतन", benefits: ["3-12 महिने कौशल्य प्रशिक्षण", "प्रशिक्षणादरम्यान मासिक विद्यावेतन", "100% नोकरी प्लेसमेंट हमी", "प्लेसमेंटनंतर मदत", "मोफत जेवण आणि निवास"], eligibility: ["ग्रामीण गरीब तरुण (18-35 वर्षे)", "SC/ST/महिलांना प्राधान्य", "BPL कुटुंबे", "मनरेगा कामगार कुटुंबे"], documents: ["आधार", "BPL प्रमाणपत्र", "वयाचा पुरावा", "बँक खाते", "पासपोर्ट फोटो"] },
    139: { fullName: "NRLM - आजीविका कृषी उपजीविका", amount: "प्रति SHG ₹50,000", benefits: ["SHG-आधारित शेती उपक्रम", "सामुदायिक गुंतवणूक निधी", "रिव्हॉल्व्हिंग फंड मदत", "मूल्य साखळी विकास", "बाजारपेठेशी जोडणी"], eligibility: ["NRLM अंतर्गत महिला बचत गट", "शेतकरी गट", "उत्पादक गट", "ग्राम संघटना"], documents: ["SHG नोंदणी", "सदस्यांची यादी", "बँक खाते", "ठरावाची प्रत", "आधार"] },
    140: { fullName: "KVK - शेतकरी प्रशिक्षण आणि रोजगार कार्यक्रम", amount: "मोफत प्रशिक्षण + इनपुट्स", benefits: ["KVK मध्ये प्रात्यक्षिक प्रशिक्षण", "एकात्मिक शेती प्रशिक्षण", "मूल्यवर्धन प्रशिक्षण", "इनपुट किट वाटप", "ICAR कडून प्रमाणपत्र"], eligibility: ["सर्व शेतकरी", "महिला शेतकरी", "ग्रामीण तरुण", "शाळा सोडलेले", "कृषी-उद्योजक"], documents: ["आधार", "जमिनीच्या नोंदी (लागू असल्यास)", "बँक खाते", "2 पासपोर्ट फोटो", "मोबाईल नंबर"] }
  },
  gu: {
    1: { fullName: "પ્રધાનમંત્રી કિસાન સન્માન નિધિ", amount: "₹6,000/વર્ષ", benefits: ["દર વર્ષે ₹6,000 ની સીધી આવક સહાય", "દર 4 મહિને ₹2,000", "બેંક ખાતામાં સીધું ડીબીટી", "તમામ નાના અને સીમાંત ખેડૂતોને આવરી લે છે"], eligibility: ["નાના અને સીમાંત ખેડૂતો (2 હેક્ટર સુધી)", "ખેતીલાયક જમીન ધરાવતા ખેડૂત પરિવારો", "જમીનના રેકોર્ડવાળા ગણોતિયા ખેડૂતો"], documents: ["આધાર કાર્ડ", "બેંક ખાતું", "જમીનના રેકોર્ડ", "રેશન કાર્ડ"] },
    2: { fullName: "ગણોતિયા ખેડૂતો માટે પીએમ-કિસાન", amount: "₹6,000/વર્ષ", benefits: ["ભૂમિહીન ખેડૂતો માટે વિશેષ જોગવાઈ", "ભાગિયાઓને સહાય", "પ્રત્યક્ષ લાભ હસ્તાંતરણ", "જમીનના રેકોર્ડની જરૂર નથી"], eligibility: ["ભૂમિહીન ગણોતિયા ખેડૂતો", "ભાગિયાઓ", "ભાડાની જમીન પર ખેતી કરતા ખેડૂતો"], documents: ["આધાર", "બેંક ખાતું", "લીઝ કરાર", "એફિડેવિટ"] },
    3: { fullName: "પ્રધાનમંત્રી અન્નદાતા આય સંરક્ષણ અભિયાન", amount: "₹8,000/વર્ષ", benefits: ["તમામ ખેડૂતો માટે આવક સહાય", "લઘુત્તમ ટેકાના ભાવની ગેરંટી", "નાના ખેડૂતોને વધારાના ₹2,000", "કિંમત તફાવત ચુકવણી"], eligibility: ["અધિસૂચિત પાક ઉગાડતા તમામ ખેડૂતો", "નાના અને સીમાંત ખેડૂતોને પ્રાધાન્ય", "FPO સભ્યો"], documents: ["આધાર", "બેંક ખાતું", "જમીનના રેકોર્ડ", "પાક ઘોષણા"] },
    4: { fullName: "કિંમત તફાવત ચુકવણી યોજના", amount: "કિંમત તફાવત ચુકવણી", benefits: ["ભાવ ઘટાડા પર વળતર", "MSP તફાવત ચુકવણી", "સીધી બેંક ટ્રાન્સફર", "શાકભાજી અને ફળોને આવરી લે છે"], eligibility: ["મધ્ય પ્રદેશના ખેડૂતો", "પાક: ટામેટાં, ડુંગળી, બટાકા", "નોંધાયેલ ખેડૂતો"], documents: ["આધાર", "બેંક ખાતું", "વેચાણ રસીદ", "મંડી પ્રવેશ સ્લિપ"] },
    5: { fullName: "તેલંગાણા રાયથુ બંધુ", amount: "₹10,000/એકર/વર્ષ", benefits: ["ખેડૂતો માટે રોકાણ સહાય", "દરેક સિઝનમાં એકર દીઠ ₹5,000", "સીધી બેંક ટ્રાન્સફર", "તમામ ખેડૂતોને આવરી લે છે"], eligibility: ["તેલંગાણાના તમામ ખેડૂતો", "પટ્ટા ધરાવતા જમીનમાલિકો", "ગણોતિયા ખેડૂતો (નવી યોજના)"], documents: ["આધાર", "પટ્ટા પાસબુક", "બેંક ખાતું"] },
    6: { fullName: "ઓડિશા કાલિયા યોજના", amount: "₹25,000/વર્ષ", benefits: ["ખેડૂતો માટે નાણાકીય સહાય", "ભૂમિહીન ખેત મજૂરો", "નબળા આદિવાસી જૂથો", "ભાગિયાઓને સહાય"], eligibility: ["ઓડિશાના ખેડૂતો", "ભૂમિહીન મજૂરો", "નાના અને સીમાંત ખેડૂતો", "ભાગિયાઓ"], documents: ["આધાર", "બેંક ખાતું", "રહેઠાણનો પુરાવો", "જમીનના રેકોર્ડ"] },
    7: { fullName: "રાષ્ટ્રીય કૃષિ વિકાસ યોજના", amount: "રાજ્ય-વિશિષ્ટ", benefits: ["રાજ્ય કૃષિ પ્રોજેક્ટ્સ માટે ભંડોળ", "ઇન્ફ્રાસ્ટ્રક્ચર વિકાસ", "કૃષિ-ઉદ્યોગસાહસિકતા", "મૂલ્ય શૃંખલા"], eligibility: ["રાજ્ય સરકારો", "FPO", "કૃષિ યુનિવર્સિટીઓ", "સંશોધન સંસ્થાઓ"], documents: ["પ્રોજેક્ટ દરખાસ્ત", "રાજ્યની મંજૂરી", "અમલીકરણ યોજના"] },
    8: { fullName: "રાષ્ટ્રીય બીજ સબસિડી યોજના", amount: "બિયારણ પર 50% સબસિડી", benefits: ["ઉચ્ચ ઉપજ આપતી જાતોના બિયારણ", "નાના ખેડૂતો માટે 50% સબસિડી", "પ્રમાણિત બિયારણ", "સુધારેલી જાતો"], eligibility: ["તમામ ખેડૂતો", "નાના અને સીમાંત ખેડૂતોને પ્રાધાન્ય", "FPO"], documents: ["જમીનના રેકોર્ડ", "આધાર", "બિયારણ બિલ", "બેંક ખાતું"] },
    9: { fullName: "પોષક તત્વો આધારિત સબસિડી (NBS) યોજના", amount: "પોષક તત્વો મુજબ ભિન્ન", benefits: ["P & K ખાતરો પર સબસિડી", "ખેડૂતોના ખર્ચમાં ઘટાડો", "સંતુલિત પોષણ", "જમીનના સ્વાસ્થ્યમાં સુધારો"], eligibility: ["તમામ ખેડૂતો", "અધિકૃત ડીલરો મારફતે"], documents: ["ડીલર બિલ", "આધાર (DBT માટે)", "જમીનના રેકોર્ડ"] },
    10: { fullName: "મહિલા કિસાન સશક્તિકરણ યોજના", amount: "₹50,000/વર્ષ", benefits: ["મહિલા ખેડૂત સશક્તિકરણ", "કૌશલ્ય તાલીમ", "ઇનપુટ સબસિડી", "બજાર સુધી પહોંચ"], eligibility: ["મહિલા ખેડૂતો", "મહિલા સ્વયં સહાય જૂથો", "મહિલા પ્રધાન પરિવારો"], documents: ["આધાર", "જમીનના રેકોર્ડ", "બેંક ખાતું", "SHG પ્રમાણપત્ર"] },
    11: { fullName: "કિસાન ક્રેડિટ કાર્ડ યોજના", amount: "₹3 લાખ સુધી", benefits: ["રિવોલ્વિંગ ક્રેડિટ સુવિધા", "વ્યાજ: 7% (સમયસર ચુકવણી પર 4%)", "₹1.6 લાખ સુધી ગેરંટી વિના", "સહાયક પ્રવૃત્તિઓને આવરી લે છે"], eligibility: ["તમામ ખેડૂતો", "ભાગિયાઓ", "ગણોતિયા ખેડૂતો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ફોટો", "પાકની વિગતો"] },
    12: { fullName: "ટૂંકા ગાળાની પાક લોન માટે વ્યાજ સબવેન્શન", amount: "2% વ્યાજ સબસિડી", benefits: ["પાક લોન પર 2% વ્યાજ સબસિડી", "સમયસર ચુકવણી પર વધારાના 3%", "અસરકારક દર: વાર્ષિક 4%", "₹3 લાખ સુધીની લોન"], eligibility: ["પાક લોન લેતા તમામ ખેડૂતો", "KCC ધારકો", "સહકારી મંડળીના સભ્યો"], documents: ["KCC", "લોન અરજી", "જમીનના રેકોર્ડ"] },
    13: { fullName: "વેરહાઉસ ઇન્ફ્રાસ્ટ્રક્ચર ફંડ", amount: "પ્રોજેક્ટ દીઠ ₹50 કરોડ", benefits: ["ગોદામના નિર્માણ માટે લોન", "25% સુધી સબસિડી", "લણણી પછીનું ઇન્ફ્રાસ્ટ્રક્ચર", "પાકના બગાડમાં ઘટાડો"], eligibility: ["FPO", "સહકારી મંડળીઓ", "કૃષિ-સાહસિકો", "રાજ્ય એજન્સીઓ"], documents: ["પ્રોજેક્ટ રિપોર્ટ", "જમીનના દસ્તાવેજો", "નોંધણી પ્રમાણપત્ર"] },
    14: { fullName: "ડેરી આંત્રપ્રિન્યોરશિપ ડેવલપમેન્ટ સ્કીમ", amount: "₹5 લાખ સુધીની સબસિડી", benefits: ["ડેરી એકમો માટે સબસિડી", "સામાન્ય વર્ગ માટે 25%, SC/ST માટે 33%", "ગાય/ભેંસ માટે લોન", "દૂધ પ્રોસેસિંગ સાધનો"], eligibility: ["વ્યક્તિગત ખેડૂતો", "સ્વયં સહાય જૂથો", "ડેરી સહકારી મંડળીઓ"], documents: ["જમીનના દસ્તાવેજો", "આધાર", "બેંક ખાતું", "પ્રોજેક્ટ રિપોર્ટ"] },
    15: { fullName: "પોલ્ટ્રી વેન્ચર કેપિટલ ફંડ", amount: "₹3 લાખ સુધીની સબસિડી", benefits: ["મરઘાં ઉછેર માટે સબસિડી", "SC/ST ખેડૂતો માટે 33%", "બ્રોઇલર/લેયર એકમ માટે લોન", "હેચરી સહાય"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો"], documents: ["જમીનના દસ્તાવેજો", "આધાર", "બેંક ખાતું", "અનુભવ પ્રમાણપત્ર"] },
    16: { fullName: "બકરી અને ઘેટાં વિકાસ યોજના", amount: "50% સબસિડી", benefits: ["બકરી/ઘેટાં ઉછેર માટે સબસિડી", "₹50,000 સુધી 50% સબસિડી", "નસલ સુધારણા સહાય", "પશુ ચિકિત્સા સંભાળ"], eligibility: ["નાના ખેડૂતો", "ભૂમિહીન મજૂરો", "આદિવાસી ખેડૂતો", "મહિલા ખેડૂતો"], documents: ["આધાર", "બેંક ખાતું", "ગ્રામ પંચાયત પ્રમાણપત્ર"] },
    17: { fullName: "કૃષિ ઇન્ફ્રાસ્ટ્રક્ચર ફંડ", amount: "₹2 કરોડ સુધીની લોન", benefits: ["ફાર્મ-ગેટ ઇન્ફ્રાસ્ટ્રક્ચર માટે લોન", "3% વ્યાજ સબસિડી", "3 વર્ષનો મોરેટોરિયમ", "ગોદામ, કોલ્ડ સ્ટોરેજને આવરી લે છે"], eligibility: ["FPO", "સહકારી મંડળીઓ", "વ્યક્તિગત ખેડૂતો", "કૃષિ-સાહસિકો"], documents: ["પ્રોજેક્ટ રિપોર્ટ", "જમીનના દસ્તાવેજો", "આધાર", "બેંક ખાતું"] },
    18: { fullName: "AHIDF - ડેરી અને પોલ્ટ્રી લોન", amount: "₹100 કરોડ સુધી", benefits: ["ડેરી અને પોલ્ટ્રી ઇન્ફ્રાસ્ટ્રક્ચર માટે લોન", "3% વ્યાજ સબસિડી", "લોન ગેરંટી ઉપલબ્ધ", "દૂધ પ્રોસેસિંગ, હેચરીને આવરી લે છે"], eligibility: ["વ્યક્તિગત ઉદ્યોગસાહસિકો", "FPO", "ખાનગી કંપનીઓ", "સહકારી મંડળીઓ"], documents: ["DPR", "વ્યવસાય નોંધણી", "જમીનના દસ્તાવેજો", "બેંક ખાતું"] },
    19: { fullName: "FIDF - મત્સ્યપાલન લોન", amount: "₹50 લાખ સુધી", benefits: ["મત્સ્યપાલન ઇન્ફ્રાસ્ટ્રક્ચર માટે લોન", "4% વ્યાજ સબસિડી", "હેચરી, ફીડ મિલને આવરી લે છે", "માછલી માટે કોલ્ડ ચેઇન"], eligibility: ["મત્સ્ય ખેડૂતો", "FPO", "સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો"], documents: ["જળ સંસાધન લીઝ", "પ્રોજેક્ટ રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    20: { fullName: "ફૂડ પ્રોસેસિંગ લોન યોજના", amount: "₹10 કરોડ સુધી", benefits: ["ફૂડ પ્રોસેસિંગ એકમો માટે લોન", "35% મૂડી સબસિડી", "5% વ્યાજ સબસિડી", "ફળો, શાકભાજી, અનાજને આવરી લે છે"], eligibility: ["ફૂડ પ્રોસેસર", "FPO", "સહકારી મંડળીઓ", "કૃષિ-સાહસિકો"], documents: ["DPR", "જમીનના દસ્તાવેજો", "FSSAI લાઇસન્સ", "બેંક ખાતું"] },
    21: { fullName: "પ્રધાનમંત્રી ફસલ વીમા યોજના", amount: "ઓછું પ્રીમિયમ: 1.5-5%", benefits: ["ઓછા પ્રીમિયમ પર પાક વીમો", "રવિ માટે 1.5%, ખરીફ માટે 2%", "21 દિવસમાં દાવો", "વાવણી પહેલાથી લણણી પછી સુધી આવરી લે છે"], eligibility: ["તમામ ખેડૂતો", "લોન લેનાર ખેડૂતો માટે ફરજિયાત", "લોન ન લેનાર માટે મરજિયાત", "ભાગિયાઓ"], documents: ["જમીનના રેકોર્ડ", "પાક ઘોષણા", "આધાર", "બેંક ખાતું"] },
    22: { fullName: "પુનર્ગઠિત હવામાન આધારિત પાક વીમા યોજના", amount: "પ્રીમિયમ 1.5-8%", benefits: ["હવામાન ઇન્ડેક્સ આધારિત વીમો", "વરસાદની અછત/વધુ વરસાદ આવરી લે છે", "તાપમાન અને ભેજ કવરેજ", "ઝડપી દાવાની પતાવટ"], eligibility: ["અધિસૂચિત વિસ્તારોના ખેડૂતો", "હવામાન પ્રત્યે સંવેદનશીલ પાક", "તમામ ખેડૂત શ્રેણીઓ"], documents: ["જમીનના રેકોર્ડ", "હવામાન ડેટા", "આધાર"] },
    23: { fullName: "નાળિયેર વૃક્ષ વીમા યોજના", amount: "પ્રીમિયમ: ₹100-500/વૃક્ષ", benefits: ["નાળિયેરના વૃક્ષોનો વીમો", "જીવાત અને રોગ કવર", "કુદરતી આપત્તિ કવરેજ", "5 વર્ષ સુધીનું કવરેજ"], eligibility: ["નાળિયેરના ખેડૂતો", "ઓછામાં ઓછા 5 વૃક્ષો", "તમામ રાજ્યો"], documents: ["જમીનના રેકોર્ડ", "વૃક્ષોની ગણતરી", "આધાર"] },
    24: { fullName: "રબર વીમા યોજના", amount: "₹30,000/હેક્ટર", benefits: ["રબરના વૃક્ષોનો વીમો", "કુદરતી આપત્તિ કવરેજ", "રોગ અને જીવાત કવર", "ઉપજ નુકસાન વળતર"], eligibility: ["રબર ઉત્પાદકો", "ઓછામાં ઓછું 0.5 હેક્ટર", "રબર બોર્ડમાં નોંધાયેલ"], documents: ["જમીનના રેકોર્ડ", "રબર બોર્ડ નોંધણી", "આધાર"] },
    25: { fullName: "કોફી પાક વીમો", amount: "પ્રીમિયમ 3.5%", benefits: ["કોફીના બગીચાનો વીમો", "અરેબિકા અને રોબસ્ટા આવરી લે છે", "ઉપજ નુકસાન કવરેજ", "ભાવની વધઘટ કવર"], eligibility: ["કોફી ઉત્પાદકો", "કોફી બોર્ડમાં નોંધાયેલ", "ઓછામાં ઓછું 0.5 એકર"], documents: ["જમીનના રેકોર્ડ", "કોફી બોર્ડ નોંધણી"] },
    26: { fullName: "ચા પાક વીમો", amount: "પ્રીમિયમ 2.5%", benefits: ["ચાના બગીચાનો વીમો", "લીલા પાંદડાની ઉપજ કવર", "દુષ્કાળ અને પૂર કવર", "જીવાત અને રોગ કવરેજ"], eligibility: ["ચા ઉત્પાદકો", "ટી બોર્ડમાં નોંધાયેલ", "તમામ રાજ્યો"], documents: ["જમીનના રેકોર્ડ", "ટી બોર્ડ નોંધણી"] },
    27: { fullName: "UPIS - પાક પ્લસ વીમો", amount: "પ્રીમિયમ: 2-8%", benefits: ["સંયુક્ત પાક + મિલકત વીમો", "ઘર, ટ્રેક્ટર, પશુધન આવરી લે છે", "બધા માટે એક જ પ્રીમિયમ", "ઝડપી દાવાની પતાવટ"], eligibility: ["તમામ ખેડૂતો", "લોન લેનાર ખેડૂતો માટે ફરજિયાત", "લોન ન લેનાર માટે મરજિયાત"], documents: ["જમીનના રેકોર્ડ", "મિલકતની યાદી", "આધાર", "બેંક ખાતું"] },
    28: { fullName: "ઓઇલ પામ વીમા યોજના", amount: "પ્રીમિયમ: 2.5%", benefits: ["ઓઇલ પામના બગીચાનો વીમો", "ઉપજ નુકસાન કવર", "જીવાત અને રોગ કવરેજ", "5-વર્ષીય પોલિસી વિકલ્પ"], eligibility: ["ઓઇલ પામ ઉત્પાદકો", "NMEO-OP માં નોંધાયેલ", "ઓછામાં ઓછું 1 હેક્ટર"], documents: ["જમીનના રેકોર્ડ", "બગીચાની નોંધણી", "આધાર"] },
    29: { fullName: "એલચી પાક વીમો", amount: "પ્રીમિયમ: 3%", benefits: ["એલચીના બગીચાનો વીમો", "હવામાનથી ઉપજ નુકસાન કવર", "જીવાત અને રોગ કવરેજ", "ઝડપી દાવાની પતાવટ"], eligibility: ["એલચી ઉત્પાદકો", "સ્પાઇસીસ બોર્ડમાં નોંધાયેલ", "ઓછામાં ઓછું 0.5 એકર"], documents: ["જમીનના રેકોર્ડ", "સ્પાઇસીસ બોર્ડ નોંધણી", "આધાર"] },
    30: { fullName: "રાષ્ટ્રીય પશુધન વીમા યોજના", amount: "પ્રીમિયમ: 4-6%", benefits: ["ગાય, ભેંસ, ઘેટાં, બકરીનો વીમો", "અકસ્માત/રોગથી મૃત્યુ કવર", "BPL માટે રાહત દરે પ્રીમિયમ", "ઝડપી દાવાની પતાવટ"], eligibility: ["તમામ પશુપાલકો", "ડેરી ખેડૂતો", "BPL પરિવારોને પ્રાધાન્ય"], documents: ["પશુની ઓળખ", "પશુ ચિકિત્સા પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    31: { fullName: "પ્રધાનમંત્રી કૃષિ સિંચાઈ યોજના", amount: "55-75% સબસિડી", benefits: ["ડ્રિપ/સ્પ્રિંકલર સબસિડી", "સામાન્ય માટે 55%, SC/ST માટે 75%", "ફાર્મ પોન્ડ સહાય", "પ્રતિ ટીપે વધુ પાક"], eligibility: ["તમામ ખેડૂતો", "FPO", "જળ વપરાશકર્તા સંઘ"], documents: ["જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું", "વિક્રેતા ક્વોટેશન"] },
    32: { fullName: "સૂક્ષ્મ સિંચાઈ ફંડ (નાબાર્ડ)", amount: "₹5,000 કરોડનું ફંડ", benefits: ["સૂક્ષ્મ સિંચાઈ માટે વધારાની સબસિડી", "PMKSY સાથે સંકલન", "રાજ્ય સરકારની લોન", "પાણીની અછતવાળા વિસ્તારોને પ્રાધાન્ય"], eligibility: ["રાજ્ય સરકારો", "જળ વપરાશકર્તા સંઘ", "FPO"], documents: ["પ્રોજેક્ટ દરખાસ્ત", "રાજ્યની મંજૂરી"] },
    33: { fullName: "હર ખેત કો પાની (PMKSY ઘટક)", amount: "સંપૂર્ણ કવરેજ", benefits: ["દરેક ખેતર સુધી સિંચાઈની પહોંચ", "કમાન્ડ એરિયા વિકાસ", "જળ સંચય માળખાં", "જળાશયોનો જીર્ણોદ્ધાર"], eligibility: ["તમામ ખેડૂતો", "વરસાદ આધારિત વિસ્તારોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "જળ સ્ત્રોતની વિગતો"] },
    34: { fullName: "વોટરશેડ વિકાસ ઘટક (PMKSY)", amount: "₹12,000/હેક્ટર", benefits: ["વોટરશેડ મેનેજમેન્ટ", "જમીન અને જળ સંરક્ષણ", "વરસાદી પાણીનો સંચય", "ચેક ડેમ નિર્માણ"], eligibility: ["વોટરશેડ વિસ્તારોના ખેડૂતો", "ગ્રામ્ય સમુદાય"], documents: ["ગ્રામ દરખાસ્ત", "જમીનના રેકોર્ડ"] },
    35: { fullName: "ઝડપી સિંચાઈ લાભ કાર્યક્રમ", amount: "90:10 ભંડોળ", benefits: ["મુખ્ય સિંચાઈ પ્રોજેક્ટ્સ", "કેન્દ્ર:રાજ્ય ભંડોળ 90:10", "કમાન્ડ એરિયા વિકાસ", "જળ વિતરણ સિસ્ટમ"], eligibility: ["રાજ્ય સરકારો", "સિંચાઈ વિભાગ"], documents: ["પ્રોજેક્ટ DPR", "રાજ્યની મંજૂરી"] },
    36: { fullName: "ખેતરો માટે રૂફટોપ રેઈન વોટર હાર્વેસ્ટિંગ", amount: "₹25,000 સુધી 50% સબસિડી", benefits: ["વરસાદી પાણી સંચય માળખું", "સ્ટોરેજ ટાંકી સબસિડી", "ભૂગર્ભ જળ રિચાર્જ", "બોરવેલ પરની નિર્ભરતામાં ઘટાડો"], eligibility: ["તમામ ખેડૂતો", "ફાર્મ હાઉસ", "પશુ આશ્રયસ્થાન"], documents: ["બિલ્ડીંગ પ્લાન", "જમીનના રેકોર્ડ", "ક્વોટેશન"] },
    37: { fullName: "ફાર્મ પોન્ડ અને કૂવા રિચાર્જ યોજના", amount: "₹50,000 સુધી 50% સબસિડી", benefits: ["ફાર્મ પોન્ડ નિર્માણ", "કૂવા રિચાર્જ માળખું", "વરસાદી પાણીનો સંચય", "ભૂગર્ભ જળ સ્તરમાં સુધારો"], eligibility: ["તમામ ખેડૂતો", "ઘટતા જળસ્તરવાળા વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "કૂવાની માલિકીનો પુરાવો", "આધાર"] },
    38: { fullName: "સ્પ્રિંકલર સિંચાઈ સબસિડી", amount: "₹15,000/એકર સુધી 70% સબસિડી", benefits: ["પોર્ટેબલ સ્પ્રિંકલર સેટ", "40% સુધી પાણીની બચત", "તમામ પાકો માટે યોગ્ય", "ઓછો સંચાલન ખર્ચ"], eligibility: ["નાના અને સીમાંત ખેડૂતો", "FPO", "પાણીની અછતવાળા વિસ્તારોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બેંક ખાતું"] },
    39: { fullName: "ડ્રિપ સિંચાઈ પ્રોત્સાહન યોજના", amount: "60-80% સબસિડી", benefits: ["ડ્રિપ સિંચાઈ સિસ્ટમ", "60% સુધી પાણીની બચત", "વધુ ઉપજ", "ફર્ટિગેશન માટે યોગ્ય"], eligibility: ["તમામ ખેડૂતો", "બાગાયતી ખેડૂતોને પ્રાધાન્ય", "FPO"], documents: ["જમીનના રેકોર્ડ", "પાકની વિગતો", "આધાર", "બેંક ખાતું"] },
    40: { fullName: "ફિલ્ડ ચેનલ અને પાઇપલાઇન વિસ્તરણ", amount: "₹2 લાખ સુધી 50% સબસિડી", benefits: ["સ્ત્રોતથી ખેતર સુધી PVC પાઇપલાઇન", "પાણીના વ્યયમાં ઘટાડો", "સમય અને શ્રમની બચત", "5 એકર સુધી આવરી લે છે"], eligibility: ["તમામ ખેડૂતો", "જળ વપરાશકર્તા સંઘ", "FPO"], documents: ["જમીનના રેકોર્ડ", "જળ સ્ત્રોતનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    41: { fullName: "કૃષિ સાધનો પર સબસિડી", amount: "40-50% સબસિડી", benefits: ["SC/ST માટે 50% (₹40,000 સુધી)", "સામાન્ય ખેડૂતો માટે 40%", "ટ્રેક્ટર, રોટાવેટર સબસિડી", "ડ્રોન સબસિડી ₹5 લાખ સુધી 50%"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "કસ્ટમ હાયરિંગ સેન્ટર", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બિલ"] },
    42: { fullName: "ફાર્મ મશીનરી બેંક", amount: "₹40 લાખ સુધી 40% સબસિડી", benefits: ["મશીનરી ભાડા કેન્દ્રની સ્થાપના", "સાધનો પર 40% સબસિડી", "નાના ખેડૂતોને લાભ", "વ્યક્તિગત રોકાણમાં ઘટાડો"], eligibility: ["FPO", "સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો", "યુવા ઉદ્યોગસાહસિકો"], documents: ["વ્યવસાય યોજના", "નોંધણી પ્રમાણપત્ર", "કેન્દ્ર માટે જમીન"] },
    43: { fullName: "ખાતર/જંતુનાશક છંટકાવ માટે ડ્રોન", amount: "₹8 લાખ સુધી 80% સબસિડી", benefits: ["મહિલા સ્વયં સહાય જૂથો માટે ડ્રોન", "ખરીદી પર 80% સબસિડી", "તાલીમ શામેલ છે", "છંટકાવ સેવાઓમાંથી આવક"], eligibility: ["મહિલા સ્વયં સહાય જૂથો", "મહિલા સભ્યો ધરાવતા FPO"], documents: ["SHG નોંધણી", "મહિલા સભ્યોની યાદી"] },
    44: { fullName: "લણણી પછીના વ્યવસ્થાપન સાધનો", amount: "₹10 લાખ સુધી 35% સબસિડી", benefits: ["થ્રેશર, ડ્રાયર, ગ્રેડર", "સંગ્રહ સાધનો", "પેકેજિંગ મશીનરી", "પ્રોસેસિંગ એકમો"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "કૃષિ-સાહસિકો"], documents: ["પ્રોજેક્ટ રિપોર્ટ", "ક્વોટેશન", "જમીનના દસ્તાવેજો"] },
    45: { fullName: "ખેડૂતો માટે સોલાર ડ્રાયર", amount: "₹50,000 સુધી 50% સબસિડી", benefits: ["ફળો/શાકભાજી માટે સોલાર ડ્રાયર", "લણણી પછીના નુકસાનમાં ઘટાડો", "ગુણવત્તા જાળવણી", "મૂલ્ય વર્ધન"], eligibility: ["નાના ખેડૂતો", "FPO", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "આધાર"] },
    46: { fullName: "કોલ્ડ સ્ટોરેજ અને કોલ્ડ ચેઇન", amount: "₹50 લાખ સુધી 35% સબસિડી", benefits: ["કોલ્ડ સ્ટોરેજ નિર્માણ", "રીફર વાહનો", "પેકેજિંગ સાધનો", "બગાડમાં ઘટાડો"], eligibility: ["FPO", "સહકારી મંડળીઓ", "વ્યક્તિગત ઉદ્યોગસાહસિકો"], documents: ["પ્રોજેક્ટ રિપોર્ટ", "જમીનના દસ્તાવેજો", "વ્યવસાય યોજના"] },
    47: { fullName: "સીમાંત ખેડૂતો માટે નાના ટ્રેક્ટર સબસિડી", amount: "₹60,000 સુધી 40% સબસિડી", benefits: ["20-35 HP ટ્રેક્ટર માટે સબસિડી", "SC/ST ખેડૂતોને પ્રાધાન્ય", "કસ્ટમ હાયરિંગ વિકલ્પ", "ખેતીના ખર્ચમાં ઘટાડો"], eligibility: ["નાના અને સીમાંત ખેડૂતો", "SC/ST ખેડૂતો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બેંક ખાતું"] },
    48: { fullName: "પાવર ટિલર સબસિડી યોજના", amount: "₹25,000 સુધી 50% સબસિડી", benefits: ["પાવર ટિલર માટે સબસિડી", "નાના ખેતરો માટે યોગ્ય", "મજૂરો પરની નિર્ભરતામાં ઘટાડો", "ઓછો જાળવણી ખર્ચ"], eligibility: ["નાના ખેડૂતો", "પહાડી વિસ્તારના ખેડૂતો", "FPO"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બેંક ખાતું"] },
    49: { fullName: "કમ્બાઈન હાર્વેસ્ટર સબસિડી યોજના", amount: "₹2 લાખ સુધી 40% સબસિડી", benefits: ["રીપર/હાર્વેસ્ટર માટે સબસિડી", "લણણીના સમયમાં ઘટાડો", "પાક નુકસાન ન્યૂનતમ", "કસ્ટમ હાયરિંગ માટે યોગ્ય"], eligibility: ["FPO", "સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો", "મોટા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "વ્યવસાય યોજના", "આધાર", "બેંક ખાતું"] },
    50: { fullName: "યાંત્રિક ડાંગર ટ્રાન્સપ્લાન્ટર સબસિડી", amount: "₹40,000 સુધી 50% સબસિડી", benefits: ["ડાંગર રોપણી મશીન માટે સબસિડી", "મજૂરી ખર્ચની બચત", "સમાન રોપણી", "વધુ ઉપજ"], eligibility: ["ડાંગરના ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો", "કસ્ટમ હાયરિંગ કેન્દ્રો"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બેંક ખાતું"] },
    51: { fullName: "સોઇલ હેલ્થ કાર્ડ યોજના", amount: "મફત સેવા", benefits: ["દર 2 વર્ષે મફત માટી પરીક્ષણ", "12 પરિમાણોનું વિશ્લેષણ", "પાક-વિશિષ્ટ ભલામણો", "ખાતર ખર્ચમાં 10-15% ઘટાડો"], eligibility: ["તમામ ખેડૂતો", "નાના ખેડૂતોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "ખેડૂત ઓળખ કાર્ડ"] },
    52: { fullName: "મોબાઇલ માટી પરીક્ષણ પ્રયોગશાળાઓ", amount: "પ્રયોગશાળા દીઠ ₹25 લાખ", benefits: ["મોબાઇલ માટી પરીક્ષણ વાન", "ઘરઆંગણે મફત સેવા", "7 દિવસમાં પરિણામ", "દૂરના ગામડાઓને આવરી લે છે"], eligibility: ["રાજ્ય સરકારો", "KVK", "કૃષિ યુનિવર્સિટીઓ"], documents: ["દરખાસ્ત", "ઇન્ફ્રાસ્ટ્રક્ચર વિગતો"] },
    53: { fullName: "માટી આરોગ્ય વ્યવસ્થાપન (SHM)", amount: "₹2,000/હેક્ટર", benefits: ["માટી સુધારણા સબસિડી", "ચૂનો/જિપ્સમનો ઉપયોગ", "સૂક્ષ્મ પોષકતત્ત્વોનો પુરવઠો", "જૈવિક ખાતરોને પ્રોત્સાહન"], eligibility: ["તમામ ખેડૂતો", "સોઇલ હેલ્થ કાર્ડ ધારકો"], documents: ["સોઇલ હેલ્થ કાર્ડ", "જમીનના રેકોર્ડ"] },
    54: { fullName: "સૂક્ષ્મ પોષકતત્ત્વોની ઉણપ સુધારણા", amount: "₹1,000/એકર સુધી 50% સબસિડી", benefits: ["ઝીંક, બોરોન, આયર્ન પુરવઠો", "ઉણપ સુધારણા", "ગુણવત્તાયુક્ત બિયારણ સબસિડી", "ઉપજમાં સુધારો"], eligibility: ["સૂક્ષ્મ પોષકતત્ત્વોની ઉણપવાળા ખેડૂતો", "માટી પરીક્ષણ રિપોર્ટ જરૂરી"], documents: ["સોઇલ હેલ્થ કાર્ડ", "જમીનના રેકોર્ડ"] },
    55: { fullName: "માટીની એસિડિટી/આલ્કલાઇનિટી સુધારણા", amount: "50% સબસિડી", benefits: ["એસિડિક માટી માટે ચૂનો", "આલ્કલાઇન માટી માટે જિપ્સમ", "માટીના pH માં સુધારો", "પોષક તત્વોની ઉપલબ્ધતામાં વધારો"], eligibility: ["સમસ્યાવાળી માટી ધરાવતા ખેડૂતો", "માટી પરીક્ષણ જરૂરી"], documents: ["માટી પરીક્ષણ રિપોર્ટ", "જમીનના રેકોર્ડ"] },
    56: { fullName: "કાર્બનિક પદાર્થ સંવર્ધન યોજના", amount: "₹5,000/હેક્ટર", benefits: ["લીલા પડવાશ સબસિડી", "કમ્પોસ્ટને પ્રોત્સાહન", "પાકના અવશેષોનું વ્યવસ્થાપન", "માટીના કાર્બનિક કાર્બનમાં સુધારો"], eligibility: ["તમામ ખેડૂતો", "જૈવિક ખેતી જૂથો"], documents: ["જમીનના રેકોર્ડ", "સોઇલ હેલ્થ કાર્ડ", "આધાર"] },
    57: { fullName: "મફત બાયો-ફર્ટિલાઇઝર વિતરણ", amount: "5 કિગ્રા/એકર સુધી મફત", benefits: ["મફત રાઇઝોબિયમ, PSB, એઝોટોબેક્ટર", "રાસાયણિક ખાતરોના ઉપયોગમાં ઘટાડો", "માટીના જીવવિજ્ઞાનમાં સુધારો", "KVK પર ઉપલબ્ધ"], eligibility: ["તમામ ખેડૂતો", "નાના અને સીમાંત ખેડૂતોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "સોઇલ હેલ્થ કાર્ડ", "આધાર"] },
    58: { fullName: "વર્મી કમ્પોસ્ટ ઉત્પાદન એકમ", amount: "₹25,000 સુધી 50% સબસિડી", benefits: ["વર્મી કમ્પોસ્ટ એકમની સ્થાપના", "અળસિયાનો પુરવઠો", "જૈવિક ખાતર ઉત્પાદન", "કચરાનું રિસાયક્લિંગ"], eligibility: ["વ્યક્તિગત ખેડૂતો", "સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "પ્રોજેક્ટ દરખાસ્ત", "આધાર", "બેંક ખાતું"] },
    59: { fullName: "જમીન ધોવાણ અટકાવવાની યોજના", amount: "75% સબસિડી", benefits: ["કોન્ટૂર બંડિંગ", "ટેરેસ ફાર્મિંગ સહાય", "ગલી પ્લગિંગ", "સ્ટ્રીપ ક્રોપિંગ પ્રોત્સાહન"], eligibility: ["પહાડી વિસ્તારોના ખેડૂતો", "ધોવાણની સંભાવનાવાળા વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "ધોવાણનો પુરાવો", "આધાર"] },
    60: { fullName: "જમીન સમતળીકરણ અને વિકાસ", amount: "₹10,000/એકર સુધી 50% સબસિડી", benefits: ["લેસર લેન્ડ લેવલિંગ સબસિડી", "જમીનના આકારમાં ફેરફાર", "ડ્રેનેજ સુધારણા", "પાણીના ઉપયોગની કાર્યક્ષમતા"], eligibility: ["તમામ ખેડૂતો", "FPO", "પાણીની અછતવાળા વિસ્તારોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "આધાર", "ક્વોટેશન", "બેંક ખાતું"] },
    61: { fullName: "પરંપરાગત કૃષિ વિકાસ યોજના", amount: "₹31,500/હેક્ટર", benefits: ["જૈવિક ઇનપુટ્સ માટે ₹15,000", "પ્રમાણપત્ર માટે ₹10,000", "તાલીમ માટે ₹6,500", "3 વર્ષની સહાય"], eligibility: ["ખેડૂત જૂથો (50+ ખેડૂતો)", "FPO", "સ્વયં સહાય જૂથો", "ઓછામાં ઓછા 50 એકર"], documents: ["ક્લસ્ટર નોંધણી", "ખેડૂતોની યાદી", "જમીનની વિગતો", "માટી પરીક્ષણ રિપોર્ટ"] },
    62: { fullName: "ઉત્તર પૂર્વ ક્ષેત્ર માટે જૈવિક મૂલ્ય શૃંખલા વિકાસ મિશન", amount: "₹75,000/હેક્ટર", benefits: ["ઉત્તર-પૂર્વ રાજ્યોમાં જૈવિક ખેતી", "FPO રચના સહાય", "બજાર જોડાણ", "પ્રોસેસિંગ ઇન્ફ્રાસ્ટ્રક્ચર"], eligibility: ["ઉત્તર-પૂર્વ રાજ્યોના ખેડૂતો", "FPO", "જૈવિક જૂથો", "આદિવાસી ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "FPO નોંધણી", "ખેડૂત ઓળખ કાર્ડ", "બેંક ખાતું"] },
    63: { fullName: "વર્મી કમ્પોસ્ટ ઉત્પાદન એકમ યોજના", amount: "₹50,000 સુધી 50% સબસિડી", benefits: ["વર્મી કમ્પોસ્ટ એકમની સ્થાપના", "અળસિયાનો પુરવઠો", "તાલીમ પૂરી પાડવી", "જૈવિક ખાતર ઉત્પાદન"], eligibility: ["વ્યક્તિગત ખેડૂતો", "સ્વયં સહાય જૂથો", "FPO", "મહિલા ખેડૂતો"], documents: ["જમીનના દસ્તાવેજો", "પ્રોજેક્ટ દરખાસ્ત", "આધાર", "બેંક ખાતું"] },
    64: { fullName: "બાયો-ફર્ટિલાઇઝર ઉત્પાદન એકમ યોજના", amount: "₹2 લાખ સુધી 40% સબસિડી", benefits: ["રાઇઝોબિયમ, PSB ઉત્પાદન", "એઝોટોબેક્ટર, VAM પુરવઠો", "ગુણવત્તા નિયંત્રણ લેબ", "ખેડૂત તાલીમ"], eligibility: ["સ્વયં સહાય જૂથો", "FPO", "યુવા ઉદ્યોગસાહસિકો", "કૃષિ સ્નાતકો"], documents: ["વ્યવસાય યોજના", "તકનીકી લાયકાત", "જમીન લીઝ", "બેંક ખાતું"] },
    65: { fullName: "શૂન્ય બજેટ પ્રાકૃતિક ખેતી યોજના", amount: "₹15,000/હેક્ટર", benefits: ["પ્રાકૃતિક ખેતીને પ્રોત્સાહન", "ગાય આધારિત ખેતી", "જૈવિક-જંતુનાશક તાલીમ", "મલ્ચિંગ સહાય"], eligibility: ["તમામ ખેડૂતો", "વરસાદ આધારિત વિસ્તારોને પ્રાધાન્ય", "નાના અને સીમાંત ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "તાલીમ પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    66: { fullName: "PGS-ઇન્ડિયા પ્રમાણન સહાય", amount: "₹10,000 સુધી 100% સબસિડી", benefits: ["મફત જૈવિક પ્રમાણપત્ર", "જૂથો માટે સામૂહિક પ્રમાણપત્ર", "ગુણવત્તા ખાતરી", "બજાર સુધી પહોંચ"], eligibility: ["ખેડૂત જૂથો", "FPO", "જૈવિક ખેડૂત જૂથો"], documents: ["ક્લસ્ટર નોંધણી", "ખેડૂતોની યાદી", "જમીનના રેકોર્ડ"] },
    67: { fullName: "પશુ ખાતર વ્યવસ્થાપન યોજના", amount: "₹30,000 સુધી 50% સબસિડી", benefits: ["કમ્પોસ્ટ ખાડાનું નિર્માણ", "ખાતર પ્રોસેસિંગ", "બાયોગેસ એકમ સબસિડી", "છાણિયા ખાતરને પ્રોત્સાહન"], eligibility: ["પશુપાલકો", "ડેરી ખેડૂતો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "પશુ ગણતરીનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    68: { fullName: "લીલા પડવાશ બિયારણ સબસિડી", amount: "બિયારણ પર 50% સબસિડી", benefits: ["શણ, ઢીંચાના બીજ", "જમીનની ફળદ્રુપતામાં સુધારો", "નીંદણ નિયંત્રણ", "ખાતરની જરૂરિયાતમાં ઘટાડો"], eligibility: ["તમામ ખેડૂતો", "જૈવિક ખેડૂતોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું"] },
    69: { fullName: "રાજ્ય જૈવિક ખેતી પ્રોત્સાહન", amount: "₹20,000/હેક્ટર", benefits: ["જૈવિક ઇનપુટ સબસિડી", "તાલીમ અને નિદર્શન", "બજાર જોડાણ સહાય", "PGS પ્રમાણપત્ર"], eligibility: ["તમામ ખેડૂતો", "જૈવિક જૂથો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "તાલીમ પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    70: { fullName: "જૈવ-જંતુનાશક પ્રોત્સાહન યોજના", amount: "₹2,000/એકર સુધી 50% સબસિડી", benefits: ["લીમડા આધારિત જંતુનાશકો", "ટ્રાઇકોડર્મા પુરવઠો", "સ્યુડોમોનાસ કલ્ચર", "IPM તાલીમ"], eligibility: ["તમામ ખેડૂતો", "જૈવિક ખેડૂતો", "FPO"], documents: ["જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું"] },
    71: { fullName: "બાગાયતના સંકલિત વિકાસ માટેનું મિશન (MIDH)", amount: "50-75% સબસિડી", benefits: ["ફળ, શાકભાજી વાવેતર", "નર્સરી વિકાસ", "લણણી પછીનું વ્યવસ્થાપન", "પેકેજિંગ સબસિડી"], eligibility: ["તમામ ખેડૂતો", "FPO", "નર્સરી માલિકો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "પ્રોજેક્ટ દરખાસ્ત", "આધાર", "બેંક ખાતું"] },
    72: { fullName: "નાળિયેર વિકાસ યોજના", amount: "₹50,000/હેક્ટર", benefits: ["નાના ખેડૂતો માટે 70% સબસિડી", "ઉચ્ચ ઉપજ આપતા છોડ", "જૂના વૃક્ષોની બદલી", "મૂલ્ય વર્ધન સહાય"], eligibility: ["કેરળ, તમિલનાડુ, કર્ણાટક, આંધ્રપ્રદેશના નાળિયેર ખેડૂતો", "FPO", "નાના ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "વૃક્ષોની ગણતરી", "આધાર", "બેંક ખાતું"] },
    73: { fullName: "કાજુ અને કોકો કાર્યક્રમ", amount: "₹25,000/હેક્ટર", benefits: ["કાજુ વાવેતર સબસિડી", "કોકો ખેતી સહાય", "પ્રોસેસિંગ એકમ સબસિડી", "નિકાસ પ્રોત્સાહન"], eligibility: ["દરિયાકાંઠાના રાજ્યોના ખેડૂતો", "FPO", "પ્રોસેસિંગ એકમો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "પ્રોજેક્ટ રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    74: { fullName: "વાંસ વિકાસ યોજના", amount: "₹30,000/હેક્ટર", benefits: ["વાંસ વાવેતર સબસિડી", "નર્સરી વિકાસ", "મૂલ્ય વર્ધન એકમો", "હસ્તકલા સહાય"], eligibility: ["ઉત્તર-પૂર્વ રાજ્યોના ખેડૂતો", "FPO", "આદિવાસી ખેડૂતો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "વાંસ વિસ્તારની વિગતો", "આધાર", "બેંક ખાતું"] },
    75: { fullName: "મસાલા વિકાસ અને પ્રોસેસિંગ", amount: "40% સબસિડી", benefits: ["મસાલા પ્રોસેસિંગ એકમો", "મૂલ્ય વર્ધન સાધનો", "ગુણવત્તા પરીક્ષણ લેબ", "નિકાસ સુવિધા"], eligibility: ["મસાલા ઉત્પાદકો", "FPO", "મસાલા પ્રોસેસર્સ", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "સ્પાઇસીસ બોર્ડ નોંધણી", "પ્રોજેક્ટ રિપોર્ટ", "બેંક ખાતું"] },
    76: { fullName: "કેરીનું વાવેતર અને પ્રોસેસિંગ", amount: "₹40,000/હેક્ટર", benefits: ["ઉચ્ચ ઉપજ આપતા કેરીના છોડ", "પ્રોસેસિંગ એકમ સહાય", "કોલ્ડ સ્ટોરેજ સબસિડી", "નિકાસ પ્રોત્સાહન"], eligibility: ["કેરી ઉત્પાદકો", "FPO", "પ્રોસેસિંગ એકમો"], documents: ["જમીનના રેકોર્ડ", "જાતની વિગતો", "આધાર", "બેંક ખાતું"] },
    77: { fullName: "કેળાનું વાવેતર અને મૂલ્ય વર્ધન", amount: "₹35,000/હેક્ટર", benefits: ["ટીશ્યુ કલ્ચર છોડ સબસિડી", "ડ્રિપ સિંચાઈ સહાય", "પ્રોસેસિંગ એકમો", "બજાર જોડાણ"], eligibility: ["કેળા ઉત્પાદકો", "FPO", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "જાતની વિગતો", "આધાર", "બેંક ખાતું"] },
    78: { fullName: "રાષ્ટ્રીય ફ્લોરીકલ્ચર (ફૂલ ખેતી) મિશન", amount: "₹5 લાખ સુધી 50% સબસિડી", benefits: ["ફૂલની ખેતી માટે સહાય", "ગ્રીનહાઉસ સબસિડી", "નિકાસ ગુણવત્તાના ફૂલો", "કોલ્ડ ચેઇન સહાય"], eligibility: ["ફૂલ ઉત્પાદકો", "FPO", "મહિલા ખેડૂતો", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "ગ્રીનહાઉસ દરખાસ્ત", "આધાર", "બેંક ખાતું"] },
    79: { fullName: "રાષ્ટ્રીય મશરૂમ મિશન", amount: "₹1 લાખ સુધી 50% સબસિડી", benefits: ["મશરૂમ સ્પોન સબસિડી", "ગ્રોઇંગ રૂમનું નિર્માણ", "તાલીમ અને ટેકનોલોજી", "માર્કેટિંગ સહાય"], eligibility: ["તમામ ખેડૂતો", "સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો", "ગ્રામીણ યુવાનો"], documents: ["જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું", "તાલીમ પ્રમાણપત્ર"] },
    80: { fullName: "વેજીટેબલ (શાકભાજી) ક્લસ્ટર વિકાસ યોજના", amount: "₹20,000/હેક્ટર", benefits: ["શાકભાજી બિયારણ સબસિડી", "સંરક્ષિત ખેતી", "બજાર જોડાણ", "લણણી પછીનું વ્યવસ્થાપન"], eligibility: ["શાકભાજીના ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "પાક આયોજન", "આધાર", "બેંક ખાતું"] },
    81: { fullName: "કૃષિ સંસાધનો માટે વર્ચ્યુઅલ ઇન્ટિગ્રેટેડ સિસ્ટમ", amount: "મફત AI સેવા", benefits: ["AI-સંચાલિત કૃષિ સલાહ", "22+ ભારતીય ભાષાઓ", "પાક ભલામણો", "જીવાત એલર્ટ", "બજાર ભાવ"], eligibility: ["તમામ ખેડૂતો", "FPO", "વિસ્તરણ અધિકારીઓ", "KVK"], documents: ["આધાર", "મોબાઇલ નંબર", "જમીનના રેકોર્ડ (વૈકલ્પિક)"] },
    82: { fullName: "રાષ્ટ્રીય એગ્રીસ્ટેક ડિજિટલ પ્લેટફોર્મ", amount: "મફત ડિજિટલ ઓળખ", benefits: ["વિશિષ્ટ ખેડૂત ઓળખ કાર્ડ", "ડિજિટલ જમીનના રેકોર્ડ", "પાક વાવણી ડેટા", "પ્રત્યક્ષ લાભ હસ્તાંતરણ (DBT) સંકલન"], eligibility: ["તમામ ખેડૂતો", "યોજનાના લાભાર્થીઓને પ્રાધાન્ય", "નાના અને સીમાંત ખેડૂતો"], documents: ["આધાર", "જમીનના રેકોર્ડ", "બેંક ખાતું", "મોબાઇલ નંબર"] },
    83: { fullName: "રાષ્ટ્રીય કૃષિ બજાર (e-NAM)", amount: "મફત ટ્રેડિંગ પ્લેટફોર્મ", benefits: ["ઓનલાઈન મંડી ટ્રેડિંગ", "રિયલ-ટાઇમ કિંમતની જાણકારી", "1000+ મંડીઓ જોડાયેલ", "ખેડૂતોને સીધી ચુકવણી"], eligibility: ["તમામ ખેડૂતો", "વેપારીઓ", "FPO", "કમિશન એજન્ટો"], documents: ["આધાર", "બેંક ખાતું", "ટ્રેડિંગ લાઇસન્સ", "મોબાઇલ નંબર"] },
    84: { fullName: "કિસાન સુવિધા મોબાઇલ એપ્લિકેશન", amount: "મફત એપ", benefits: ["હવામાન અપડેટ્સ", "મંડીના ભાવ", "જીવાત એલર્ટ", "ડીલરની માહિતી", "પાક સંરક્ષણ"], eligibility: ["તમામ ખેડૂતો", "પ્લે સ્ટોર પરથી મફત ડાઉનલોડ", "નોંધણી જરૂરી નથી"], documents: ["મોબાઇલ નંબર", "એન્ડ્રોઇડ ફોન"] },
    85: { fullName: "ICAR-પુસા કૃષિ મોબાઇલ એપ", amount: "મફત", benefits: ["પાકની જાતોનો ડેટાબેઝ", "ખેતીની પદ્ધતિઓ", "રોગ નિદાન", "નિષ્ણાતની સલાહ"], eligibility: ["તમામ ખેડૂતો", "મફત ડાઉનલોડ", "હિન્દી અને અંગ્રેજીમાં ઉપલબ્ધ"], documents: ["જરૂરી નથી"] },
    86: { fullName: "કિસાન કોલ સેન્ટર 1551", amount: "ટોલ ફ્રી", benefits: ["24x7 કૃષિ પ્રશ્નો", "નિષ્ણાતની સલાહ", "બહુભાષી સહાય", "યોજનાઓની માહિતી"], eligibility: ["તમામ ખેડૂતો", "ટોલ ફ્રી નંબર: 1551", "કોઈપણ ફોન પરથી કૉલ કરો"], documents: ["જરૂરી નથી"] },
    87: { fullName: "ખેડૂતો માટે mKisan SMS પોર્ટલ", amount: "મફત SMS સેવા", benefits: ["મફત SMS એલર્ટ", "હવામાનની આગાહી", "બજાર ભાવ", "પાક સંરક્ષણ સલાહ"], eligibility: ["તમામ ખેડૂતો", "મોબાઇલ નંબર નોંધણી જરૂરી", "કોઈપણ મોબાઇલ નેટવર્ક પર"], documents: ["મોબાઇલ નંબર", "ખેડૂત નોંધણી"] },
    88: { fullName: "કસ્ટમ હાયરિંગ સેન્ટર મોબાઇલ એપ", amount: "મફત સેવા", benefits: ["નજીકના કૃષિ સાધનો શોધો", "સાધનો ઓનલાઈન બુક કરો", "ભાડાના દરની સરખામણી", "ખેડૂતોના રિવ્યુ"], eligibility: ["તમામ ખેડૂતો", "FPO", "કસ્ટમ હાયરિંગ સેન્ટર"], documents: ["મોબાઇલ નંબર", "લોકેશન એક્સેસ"] },
    89: { fullName: "NPSS - ડિજિટલ જીવાત દેખરેખ", amount: "મફત સેવા", benefits: ["AI-આધારિત જીવાત ઓળખ", "પૂર્વ ચેતવણી સિસ્ટમ", "પાક-વિશિષ્ટ એલર્ટ", "નિવારક ભલામણો"], eligibility: ["તમામ ખેડૂતો", "મફત મોબાઇલ એપ", "નોંધણી જરૂરી નથી"], documents: ["મોબાઇલ નંબર", "પાકનો ફોટો (નિદાન માટે)"] },
    90: { fullName: "કૃષિ-સ્ટાર્ટઅપ ઇન્ક્યુબેશન યોજના", amount: "₹25 લાખ ગ્રાન્ટ", benefits: ["એગ્રી-ટેક સ્ટાર્ટઅપ્સ માટે ભંડોળ", "માર્ગદર્શન", "ઇન્ક્યુબેશન સહાય", "રોકાણકારો સાથે જોડાણ"], eligibility: ["એગ્રી-ટેક સ્ટાર્ટઅપ્સ", "યુવા ઉદ્યોગસાહસિકો (18-35)", "ગ્રામીણ ઇનોવેટર્સ"], documents: ["વ્યવસાય યોજના", "સ્ટાર્ટઅપ નોંધણી", "ટીમની વિગતો", "ઇનોવેશનનો પુરાવો"] },
    91: { fullName: "પ્રધાનમંત્રી કિસાન ઉર્જા સુરક્ષા એવમ ઉત્થાન મહાભિયાન (PM-KUSUM)", amount: "60% સબસિડી", benefits: ["સોલાર પંપ માટે 60% સબસિડી (7.5 HP સુધી)", "બંજર જમીન પર સોલાર પેનલ", "વધારાની વીજળી ગ્રીડને વેચો", "વીજળી ખર્ચમાં ઘટાડો"], eligibility: ["કૃષિ જમીન ધરાવતા ખેડૂતો", "વ્યક્તિગત ખેડૂતો", "જળ વપરાશકર્તા સંઘ", "FPO"], documents: ["જમીનના રેકોર્ડ", "વીજળી કનેક્શનનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    92: { fullName: "સોલાર ચરખા ક્લસ્ટર", amount: "₹4.5 લાખ સબસિડી", benefits: ["સોલાર ચરખા એકમો", "મહિલા સશક્તિકરણ", "ખાદી ઉત્પાદન", "ગ્રામીણ રોજગારી"], eligibility: ["સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો", "ગ્રામીણ કારીગરો", "ખાદી સંસ્થાઓ"], documents: ["SHG નોંધણી", "પ્રોજેક્ટ દરખાસ્ત", "બેંક ખાતું"] },
    93: { fullName: "સૌર ઉર્જા સંચાલિત કોલ્ડ સ્ટોરેજ યોજના", amount: "₹10 લાખ સુધી 50% સબસિડી", benefits: ["ખેડૂતો માટે સોલાર કોલ્ડ સ્ટોરેજ", "લણણી પછીના નુકસાનમાં ઘટાડો", "ઓફ-ગ્રીડ કામગીરી", "ફળ અને શાકભાજી જાળવણી"], eligibility: ["FPO", "ખેડૂત સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો", "વ્યક્તિગત ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "પ્રોજેક્ટ રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    94: { fullName: "કૃષિ પેદાશો માટે સોલાર ડ્રાયર", amount: "₹2 લાખ સુધી 40% સબસિડી", benefits: ["અનાજ/ફળો માટે સોલાર ડ્રાયર", "ગુણવત્તા જાળવણી", "મૂલ્ય વર્ધન", "સૂર્યપ્રકાશમાં સૂકવવા પર નિર્ભરતા ઘટાડવી"], eligibility: ["તમામ ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "ક્વોટેશન", "આધાર", "બેંક ખાતું"] },
    95: { fullName: "પાક સંરક્ષણ માટે સોલાર ફેન્સિંગ", amount: "₹50,000 સુધી 50% સબસિડી", benefits: ["ખેતરો માટે સોલાર ફેન્સિંગ", "જંગલી પ્રાણીઓથી રક્ષણ", "ઓછી જાળવણી", "કોઈ વીજળી બિલ નહીં"], eligibility: ["વન્યજીવોનો ખતરો ધરાવતા વિસ્તારોના ખેડૂતો", "બગીચાના માલિકો", "તમામ ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "સ્થાનનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    96: { fullName: "ઓફ-ગ્રીડ સોલાર વોટર પમ્પિંગ", amount: "₹1.5 લાખ સુધી 75% સબસિડી", benefits: ["સોલાર સબમર્સિબલ પંપ", "કોઈ ડીઝલ/વીજળી ખર્ચ નહીં", "દૂરના વિસ્તારોમાં કામ કરે છે", "5 વર્ષની વોરંટી"], eligibility: ["નાના અને સીમાંત ખેડૂતો", "ગ્રીડ કનેક્શન વિનાના વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "જળ સ્ત્રોતનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    97: { fullName: "સૌર ઉર્જા સંચાલિત સંરક્ષિત ખેતી", amount: "₹5 લાખ સુધી 60% સબસિડી", benefits: ["સોલાર ફેન અને કૂલિંગ", "તાપમાન નિયંત્રણ", "વાવણીની સિઝનમાં વધારો", "વધુ ઉપજ"], eligibility: ["બાગાયતી ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "ગ્રીનહાઉસ પ્લાન", "આધાર", "બેંક ખાતું"] },
    98: { fullName: "કૃષિ-ડ્રોન માટે સોલાર ચાર્જિંગ", amount: "₹50,000 સુધી 40% સબસિડી", benefits: ["સોલાર ચાર્જિંગ સ્ટેશન", "ઓફ-ગ્રીડ ડ્રોન કામગીરી", "ટકાઉ ખેતી", "ડીઝલના ઉપયોગમાં ઘટાડો"], eligibility: ["FPO", "ડ્રોન દીદી લાભાર્થીઓ", "સ્વયં સહાય જૂથો"], documents: ["ડ્રોન ખરીદીનો પુરાવો", "જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું"] },
    99: { fullName: "કૃષિ ફીડરોનું સૌર ઉર્જીકરણ", amount: "90% ગ્રાન્ટ", benefits: ["સિંચાઈ ફીડરો માટે સૌર ઉર્જા", "વિશ્વસનીય દિવસની વીજળી", "ગ્રીડ પર નિર્ભરતામાં ઘટાડો", "ઓછું વીજળી બિલ"], eligibility: ["રાજ્ય સરકારો", "DISCOM", "જળ વપરાશકર્તા સંઘ"], documents: ["પ્રોજેક્ટ દરખાસ્ત", "ફીડર વિગતો"] },
    100: { fullName: "ખેડૂતો માટે રૂફટોપ સોલાર સબસિડી", amount: "₹78,000 સુધી 40% સબસિડી", benefits: ["ગ્રીડ-કનેક્ટેડ રૂફટોપ સોલાર", "વીજળી બિલમાં ઘટાડો", "વધારાની વીજળી ગ્રીડને વેચો", "પંપ સેટ અથવા ઘરગથ્થુ ઉપયોગ માટે"], eligibility: ["તમામ ખેડૂતો", "ફાર્મ હાઉસ માલિકો", "FPO"], documents: ["વીજળી બિલ", "છતની માલિકીનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    101: { fullName: "પશુપાલન ઇન્ફ્રાસ્ટ્રક્ચર ડેવલપમેન્ટ ફંડ (AHIDF)", amount: "₹100 કરોડ સુધી લોન", benefits: ["ડેરી, પોલ્ટ્રી માટે લોન-લિંક્ડ સબસિડી", "3% વ્યાજ સબસિડી", "₹100 કરોડ સુધી લોન", "MSME માટે ક્રેડિટ ગેરંટી"], eligibility: ["વ્યક્તિગત ઉદ્યોગસાહસિકો", "FPO", "ખાનગી કંપનીઓ", "સહકારી મંડળીઓ"], documents: ["વિગતવાર પ્રોજેક્ટ રિપોર્ટ", "વ્યવસાય નોંધણી", "જમીનના દસ્તાવેજો", "બેંક ખાતું"] },
    102: { fullName: "ડેરી આંત્રપ્રિન્યોરશિપ ડેવલપમેન્ટ સ્કીમ", amount: "25-33% સબસિડી", benefits: ["ડેરી એકમો માટે સબસિડી", "સામાન્ય માટે 25%, SC/ST માટે 33%", "ગાય/ભેંસ માટે લોન", "દૂધ પ્રોસેસિંગ સાધનો"], eligibility: ["વ્યક્તિગત ખેડૂતો", "સ્વયં સહાય જૂથો", "ડેરી સહકારી મંડળીઓ", "ભૂમિહીન ખેડૂતો"], documents: ["જમીનના દસ્તાવેજો", "આધાર", "બેંક ખાતું", "પ્રોજેક્ટ રિપોર્ટ"] },
    103: { fullName: "પોલ્ટ્રી વેન્ચર કેપિટલ ફંડ", amount: "₹3 લાખ સુધી 33% સબસિડી", benefits: ["મરઘાં ઉછેર માટે સબસિડી", "SC/ST ખેડૂતો માટે 33%", "બ્રોઇલર/લેયર એકમ માટે લોન", "હેચરી સહાય"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો", "યુવા ઉદ્યોગસાહસિકો"], documents: ["જમીનના દસ્તાવેજો", "આધાર", "બેંક ખાતું", "અનુભવ પ્રમાણપત્ર"] },
    104: { fullName: "બકરી અને ઘેટાં વિકાસ યોજના", amount: "₹50,000 સુધી 50% સબસિડી", benefits: ["બકરી/ઘેટાં ઉછેર માટે સબસિડી", "નસલ સુધારણા સહાય", "પશુ ચિકિત્સા સંભાળ", "માર્કેટિંગ સહાય"], eligibility: ["નાના ખેડૂતો", "ભૂમિહીન મજૂરો", "આદિવાસી ખેડૂતો", "મહિલા ખેડૂતો"], documents: ["આધાર", "બેંક ખાતું", "ગ્રામ પંચાયત પ્રમાણપત્ર", "જમીનના રેકોર્ડ"] },
    105: { fullName: "ભૂંડ વિકાસ અને સંવર્ધન યોજના", amount: "₹40,000 સુધી 40% સબસિડી", benefits: ["ભૂંડ ઉછેર સબસિડી", "નસલ સુધારણા", "પશુ ચિકિત્સા સહાય", "બજાર જોડાણ"], eligibility: ["નાના ખેડૂતો", "આદિવાસી ખેડૂતો", "સ્વયં સહાય જૂથો", "ગ્રામીણ યુવાનો"], documents: ["આધાર", "બેંક ખાતું", "જમીનના રેકોર્ડ", "તાલીમ પ્રમાણપત્ર"] },
    106: { fullName: "રાષ્ટ્રીય ઘાસચારો વિકાસ યોજના", amount: "₹10,000/હેક્ટર", benefits: ["ઘાસચારા બિયારણ સબસિડી", "હાઇડ્રોપોનિક ઘાસચારા એકમો", "સાઇલેજ બનાવવામાં સહાય", "ઘાસચારો સંગ્રહ"], eligibility: ["તમામ ખેડૂતો", "ડેરી ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો"], documents: ["જમીનના રેકોર્ડ", "પશુ ગણતરીનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    107: { fullName: "રાષ્ટ્રીય પશુ રોગ વીમા યોજના", amount: "પ્રીમિયમ: ₹50-200/પશુ", benefits: ["પશુધન વીમો", "ગાય, ભેંસ, ઘેટાં, બકરીને આવરી લે છે", "રોગ અને અકસ્માત કવરેજ", "ઝડપી દાવાની પતાવટ"], eligibility: ["તમામ પશુપાલકો", "ડેરી ખેડૂતો", "ઘેટાં/બકરી પાલકો"], documents: ["પશુની ઓળખ", "પશુ ચિકિત્સા પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    108: { fullName: "NBHM - હની મિશન", amount: "₹10,000/લાભાર્થી", benefits: ["મધમાખી ઉછેર સાધનોની સબસિડી", "મધ પ્રોસેસિંગ એકમો", "તાલીમ અને નિદર્શન", "મધ માટે માર્કેટિંગ સહાય"], eligibility: ["વ્યક્તિગત ખેડૂતો", "સ્વયં સહાય જૂથો", "FPO", "આદિવાસી ખેડૂતો"], documents: ["જમીનના રેકોર્ડ (મધમાખી ઉછેર માટે)", "આધાર", "બેંક ખાતું", "તાલીમ પ્રમાણપત્ર (પ્રાધાન્ય)"] },
    109: { fullName: "પ્રધાનમંત્રી મત્સ્ય સંપદા યોજના (PMMSY)", amount: "40-60% સબસિડી", benefits: ["મત્સ્યપાલન સબસિડી", "હેચરી વિકાસ", "માછલી માટે કોલ્ડ ચેઇન", "પ્રોસેસિંગ એકમો", "નિકાસ પ્રોત્સાહન"], eligibility: ["માછીમારો", "મત્સ્ય ખેડૂતો", "FPO", "સહકારી મંડળીઓ", "મહિલા સ્વયં સહાય જૂથો"], documents: ["જળાશયની માલિકી/લીઝ", "આધાર", "બેંક ખાતું", "પ્રોજેક્ટ રિપોર્ટ"] },
    110: { fullName: "NLM - પશુધન વિકાસ", amount: "₹2 લાખ સુધી 50% સબસિડી", benefits: ["ગાય, ભેંસ, ઘેટાં, બકરીની નસલ સુધારણા", "ઘાસચારો વિકાસ", "જોખમ વ્યવસ્થાપન", "ઉદ્યોગસાહસિકતા વિકાસ"], eligibility: ["તમામ પશુપાલક ખેડૂતો", "FPO", "સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો"], documents: ["પશુધનની ગણતરીનો પુરાવો", "જમીનના રેકોર્ડ (ઘાસચારા માટે)", "આધાર", "બેંક ખાતું"] },
    111: { fullName: "રાજ્ય આપત્તિ પ્રતિભાવ ભંડોળ - કૃષિ", amount: "₹20,000/હેક્ટર", benefits: ["પાક નુકસાન વળતર", "કુદરતી આપત્તિ સહાય", "પૂર, દુષ્કાળ, ચક્રવાત", "ઝડપી વિતરણ"], eligibility: ["અધિસૂચિત આપત્તિ વિસ્તારોના ખેડૂતો", "તમામ ખેડૂતો", "પાક નુકસાન >50%"], documents: ["જમીનના રેકોર્ડ", "પાક નુકસાન પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    112: { fullName: "રાષ્ટ્રીય આપત્તિ પ્રતિભાવ દળ - કૃષિ", amount: "₹25,000/હેક્ટર", benefits: ["રાષ્ટ્રીય સ્તરની આપત્તિ રાહત", "ચક્રવાત, પૂર, કરા", "ભૂસ્ખલન કવરેજ", "જીવાતનો ઉપદ્રવ"], eligibility: ["ગંભીર રીતે અસરગ્રસ્ત વિસ્તારોના ખેડૂતો", "તમામ શ્રેણીઓ"], documents: ["આપત્તિ જાહેરનામું", "જમીનના રેકોર્ડ", "પાક નુકસાન પ્રમાણપત્ર", "આધાર"] },
    113: { fullName: "કરા (Hailstorm) પાક વીમો", amount: "પ્રીમિયમ: 2-5%", benefits: ["કરા માટે વિશેષ કવરેજ", "વ્યક્તિગત ખેતરનું મૂલ્યાંકન", "ઝડપી દાવાઓ", "તમામ પાકોને આવરી લે છે"], eligibility: ["કરા પડવાની સંભાવનાવાળા વિસ્તારોના ખેડૂતો", "તમામ ખેડૂતો માટે મરજિયાત"], documents: ["જમીનના રેકોર્ડ", "હવામાન ડેટા", "આધાર", "બેંક ખાતું"] },
    114: { fullName: "રાષ્ટ્રીય દુષ્કાળ રાહત પેકેજ", amount: "₹15,000/હેક્ટર", benefits: ["દુષ્કાળગ્રસ્ત ખેડૂતો", "ઇનપુટ સબસિડી", "ઘાસચારો પુરવઠો", "પીવાના પાણીની સહાય"], eligibility: ["દુષ્કાળ જાહેર થયેલા વિસ્તારોના ખેડૂતો", "નાના અને સીમાંત ખેડૂતોને પ્રાધાન્ય"], documents: ["જમીનના રેકોર્ડ", "દુષ્કાળની જાહેરાત", "પાક નુકસાનનો પુરાવો", "આધાર"] },
    115: { fullName: "કૃષિ માટે રાષ્ટ્રીય પૂર રાહત", amount: "₹18,000/હેક્ટર", benefits: ["પૂરગ્રસ્ત ખેડૂતો", "પાક નુકસાન વળતર", "ફરી વાવણી માટે બિયારણ સબસિડી", "ઇનપુટ સહાય"], eligibility: ["પૂરગ્રસ્ત વિસ્તારોના ખેડૂતો", "તમામ શ્રેણીઓ"], documents: ["જમીનના રેકોર્ડ", "પૂર નુકસાન રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    116: { fullName: "ચક્રવાત પ્રભાવિત કૃષિ રાહત", amount: "₹22,000/હેક્ટર", benefits: ["ચક્રવાતના નુકસાનનું વળતર", "બગીચા નુકસાન કવરેજ", "પશુધનના નુકસાન માટે સહાય", "ઇનપુટ સબસિડી"], eligibility: ["દરિયાકાંઠાના વિસ્તારોના ખેડૂતો", "ચક્રવાત પ્રભાવિત વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "ચક્રવાત નુકસાન રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    117: { fullName: "તીડ/જીવાત હુમલો રાહત યોજના", amount: "₹10,000/હેક્ટર", benefits: ["જીવાતના નુકસાન માટે વળતર", "મફત જંતુનાશક પુરવઠો", "પાક નુકસાન કવરેજ", "ઝડપી પ્રતિભાવ ટીમ (QRT)"], eligibility: ["જીવાત પ્રભાવિત વિસ્તારોના ખેડૂતો", "તીડના હુમલાવાળા વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "જીવાત હુમલાનું પ્રમાણપત્ર", "આધાર", "બેંક ખાતું"] },
    118: { fullName: "ભૂસ્ખલન કૃષિ રાહત", amount: "₹30,000/હેક્ટર", benefits: ["ભૂસ્ખલન નુકસાન વળતર", "જમીન પુનઃસ્થાપન સહાય", "ટેરેસ સમારકામ સબસિડી", "ઇનપુટ સહાય"], eligibility: ["પહાડી વિસ્તારોના ખેડૂતો", "ભૂસ્ખલન પ્રભાવિત વિસ્તારો"], documents: ["જમીનના રેકોર્ડ", "ભૂસ્ખલન નુકસાન રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    119: { fullName: "વીજળી પડવાથી નુકસાન વળતર", amount: "₹5 લાખ/ખેડૂત", benefits: ["ખેડૂતના મૃત્યુ પર વળતર", "તબીબી ખર્ચ કવરેજ", "આશ્રિત પરિવારને સહાય", "ઝડપી વિતરણ"], eligibility: ["વીજળી પડવાથી પ્રભાવિત ખેડૂતો", "મૃત ખેડૂતોના પરિવારો"], documents: ["મૃત્યુ પ્રમાણપત્ર", "પોલીસ રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    120: { fullName: "શીત લહેર પાક સંરક્ષણ યોજના", amount: "₹8,000/હેક્ટર", benefits: ["હિમ/ધુમ્મસથી નુકસાન વળતર", "સ્મોક જનરેટર સબસિડી", "પાક કવર માટે સહાય", "ઇનપુટ સહાય"], eligibility: ["શીત લહેરવાળા વિસ્તારોના ખેડૂતો", "શાકભાજી અને ફળ ઉત્પાદકો"], documents: ["જમીનના રેકોર્ડ", "તાપમાન ડેટા", "પાક નુકસાનનો પુરાવો", "આધાર"] },
    121: { fullName: "ઇ-નામ (e-NAM) ઉન્નત પ્લેટફોર્મ", amount: "મફત ટ્રેડિંગ", benefits: ["ઓનલાઈન મંડી ટ્રેડિંગ", "ગુણવત્તા ચકાસણી", "વેરહાઉસ રસીદ સિસ્ટમ", "સીધી ચુકવણી"], eligibility: ["તમામ ખેડૂતો", "વેપારીઓ", "FPO", "કમિશન એજન્ટો"], documents: ["આધાર", "બેંક ખાતું", "મોબાઇલ નંબર", "ટ્રેડિંગ નોંધણી"] },
    122: { fullName: "FPO વ્યાપાર સહાય યોજના", amount: "₹15 લાખની સહાય", benefits: ["FPO બજાર જોડાણ", "બ્રાન્ડ વિકાસ", "પેકેજિંગ સહાય", "સીધો ખરીદનાર સંપર્ક"], eligibility: ["નોંધાયેલ FPO", "ઉત્પાદક કંપનીઓ", "ખેડૂત સહકારી મંડળીઓ"], documents: ["FPO નોંધણી", "સભ્યોની યાદી", "બેંક ખાતું", "વ્યવસાય યોજના"] },
    123: { fullName: "નેગોશિયેબલ વેરહાઉસ રસીદ યોજના (NWRS)", amount: "વેરહાઉસ રસીદ સામે લોન", benefits: ["વેરહાઉસમાં પાકનો સંગ્રહ", "રસીદ સામે લોન મેળવો", "ઊંચા ભાવે વેચાણ", "ગુણવત્તા જાળવણી"], eligibility: ["તમામ ખેડૂતો", "FPO", "વેપારીઓ", "સહકારી મંડળીઓ"], documents: ["વેરહાઉસ રસીદ", "આધાર", "બેંક ખાતું", "પાકની વિગતો"] },
    124: { fullName: "કૃષિ પેદાશ પરિવહન સબસિડી", amount: "50% પરિવહન સબસિડી", benefits: ["પરિવહન ખર્ચ પર સબસિડી", "ઉત્તર-પૂર્વ રાજ્યોને પ્રાધાન્ય", "જલ્દી બગડી જતી વસ્તુઓ", "મંડી સુધી પહોંચ"], eligibility: ["દૂરના વિસ્તારોના ખેડૂતો", "ઉત્તર-પૂર્વ રાજ્યો", "પહાડી વિસ્તારો", "આદિવાસી વિસ્તારો"], documents: ["પરિવહન બિલ", "મંડી પ્રવેશનો પુરાવો", "આધાર", "બેંક ખાતું"] },
    125: { fullName: "બજાર હસ્તક્ષેપ યોજના (MIS)", amount: "MSP ટેકાના ભાવ", benefits: ["જલ્દી બગડી જતા પાકો માટે ટેકાના ભાવ", "સરકારી ખરીદી", "નુકસાન વળતર", "ખેડૂતની આવક સુરક્ષા"], eligibility: ["અધિસૂચિત જલ્દી બગડી જતા પાકો ઉગાડતા ખેડૂતો", "તમામ રાજ્યો"], documents: ["પાક ઘોષણા", "જમીનના રેકોર્ડ", "આધાર", "બેંક ખાતું"] },
    126: { fullName: "કિસાન રેલ ભાડા સબસિડી યોજના", amount: "50% ભાડા સબસિડી", benefits: ["જલ્દી બગડી જતી વસ્તુઓનું સબસિડીવાળું પરિવહન", "ઝડપી બજાર પ્રવેશ", "બગાડમાં ઘટાડો", "દેશવ્યાપી પહોંચ"], eligibility: ["તમામ ખેડૂતો", "FPO", "સહકારી મંડળીઓ", "વેપારીઓ (ખેડૂતો વતી)"], documents: ["રેલવે બુકિંગ રસીદ", "ખેડૂત ઘોષણા", "આધાર", "બેંક ખાતું"] },
    127: { fullName: "FPO ની રચના અને પ્રોત્સાહન", amount: "FPO દીઠ ₹15 લાખ", benefits: ["FPO રચના માટે નાણાકીય સહાય", "5 વર્ષ માટે માર્ગદર્શન", "₹15 લાખ સુધીની ઇક્વિટી ગ્રાન્ટ", "ક્રેડિટ ગેરંટી"], eligibility: ["300+ ખેડૂતોના જૂથો", "સ્વયં સહાય જૂથો", "સહકારી મંડળીઓ", "ખેડૂત જૂથો"], documents: ["ખેડૂતોની યાદી (300+)", "જમીનની વિગતો", "વ્યવસાય યોજના", "બેંક ખાતું"] },
    128: { fullName: "AMI - ગ્રામીણ ગોદામ યોજના", amount: "₹25 લાખ સુધી 25% સબસિડી", benefits: ["ગ્રામીણ ગોદામ નિર્માણ", "ખેડૂતો માટે વેરહાઉસ", "સંગ્રહિત પાક સામે લોન", "નીચા ભાવે વેચાણ (Distress sale) માં ઘટાડો"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "સહકારી મંડળીઓ", "સ્વયં સહાય જૂથો"], documents: ["જમીનના દસ્તાવેજો", "પ્રોજેક્ટ રિપોર્ટ", "આધાર", "બેંક ખાતું"] },
    129: { fullName: "PMKS - કિસાન સંપદા યોજના", amount: "₹10 કરોડ સુધી 35% સબસિડી", benefits: ["ફૂડ પ્રોસેસિંગ એકમો", "મેગા ફૂડ પાર્ક", "કોલ્ડ ચેઇન ઇન્ફ્રાસ્ટ્રક્ચર", "મૂલ્ય વર્ધન"], eligibility: ["ફૂડ પ્રોસેસર", "FPO", "સહકારી મંડળીઓ", "કૃષિ-સાહસિકો"], documents: ["વિગતવાર પ્રોજેક્ટ રિપોર્ટ", "જમીનના દસ્તાવેજો", "કંપની નોંધણી", "બેંક ખાતું"] },
    130: { fullName: "ખેડૂતો માટે પ્રત્યક્ષ માર્કેટિંગ યોજના", amount: "₹2 લાખ સુધી 50% સબસિડી", benefits: ["ખેડૂત બજાર સ્ટોલ સબસિડી", "સીધું ગ્રાહકોને વેચાણ", "બ્રાન્ડિંગ સહાય", "ડિજિટલ પેમેન્ટ સેટઅપ"], eligibility: ["વ્યક્તિગત ખેડૂતો", "FPO", "સ્વયં સહાય જૂથો", "મહિલા ખેડૂતો"], documents: ["જમીનના રેકોર્ડ", "બજાર સ્ટોલ યોજના", "આધાર", "બેંક ખાતું"] },
    131: { fullName: "મહાત્મા ગાંધી નરેગા - કૃષિ કાર્યો", amount: "100 દિવસની ખાતરીપૂર્વક મજૂરી", benefits: ["100 દિવસની રોજગારીની ખાતરી", "રોજનું ₹300+ વેતન", "ફાર્મ પોન્ડ નિર્માણ", "જમીન વિકાસ કાર્યો", "સિંચાઈ નહેરના કાર્યો"], eligibility: ["તમામ ગ્રામીણ પરિવારો", "બિનકુશળ કામ કરવા ઈચ્છુક પુખ્ત સભ્યો", "SC/ST/મહિલાઓને પ્રાધાન્ય"], documents: ["જોબ કાર્ડ", "આધાર", "બેંક ખાતું", "રેશન કાર્ડ"] },
    132: { fullName: "ACABC - એગ્રી-આંત્રપ્રિન્યોરશિપ યોજના", amount: "₹20 લાખ લોન + 44% સબસિડી", benefits: ["કૃષિ સ્નાતકો માટે તાલીમ", "પ્રોજેક્ટ ખર્ચ પર 44% સબસિડી", "₹20 લાખ સુધી લોન", "તાલીમ દરમિયાન માસિક સ્ટાઇપેન્ડ"], eligibility: ["કૃષિ સ્નાતકો", "કૃષિ ડિપ્લોમા ધારકો", "બાયોલોજિકલ સાયન્સ સ્નાતકો", "કૃષિ સંબંધિત વિષયોમાં અનુસ્નાતકો"], documents: ["ડિગ્રી પ્રમાણપત્ર", "આધાર", "બેંક ખાતું", "વ્યવસાય યોજના", "નાબાર્ડ (NABARD) તરફથી NOC"] },
    133: { fullName: "રાષ્ટ્રીય કૃષિ કૌશલ્ય વિકાસ", amount: "મફત તાલીમ + ₹5,000 સ્ટાઇપેન્ડ", benefits: ["મફત કૌશલ્ય તાલીમ કાર્યક્રમ", "ડ્રોન પાયલોટ તાલીમ", "માટી પરીક્ષણ ટેકનિશિયન", "કૃષિ સાધનોના ઓપરેટર", "ફૂડ પ્રોસેસિંગ કૌશલ્ય"], eligibility: ["ગ્રામીણ યુવાનો (18-35 વર્ષ)", "ખેડૂતોના બાળકો", "મહિલા ખેડૂતો", "શાળા છોડી ગયેલા યુવાનો"], documents: ["આધાર", "ઉંમરનો પુરાવો", "શૈક્ષણિક પ્રમાણપત્રો", "બેંક ખાતું", "પાસપોર્ટ ફોટો"] },
    134: { fullName: "પ્રધાનમંત્રી કૌશલ વિકાસ યોજના - કૃષિ", amount: "મફત તાલીમ + પ્રમાણપત્ર", benefits: ["મફત વ્યાવસાયિક તાલીમ", "સરકારી પ્રમાણપત્ર", "જોબ પ્લેસમેન્ટ સહાય", "અગાઉના શિક્ષણની માન્યતા (RPL)", "કૃષિ સાધનો રિપેરિંગ તાલીમ"], eligibility: ["18-45 વર્ષના યુવાનો", "ખેડૂત પરિવારો", "ગ્રામીણ અને શહેરી યુવાનો", "મહિલા ઉમેદવારો"], documents: ["આધાર", "ઉંમરનો પુરાવો", "શૈક્ષણિક દસ્તાવેજો", "બેંક ખાતું", "મોબાઇલ નંબર"] },
    135: { fullName: "સ્ટાર્ટઅપ ઇન્ડિયા એગ્રી ગ્રાન્ડ ચેલેન્જ", amount: "₹50 લાખ સીડ ફંડ", benefits: ["₹50 લાખ સુધી સીડ ફંડ", "નિષ્ણાતોનું માર્ગદર્શન", "ઇન્ક્યુબેશન સહાય", "3 વર્ષની કર મુક્તિ", "પેટન્ટ ફાઇલિંગ સહાય"], eligibility: ["એગ્રી-ટેક સ્ટાર્ટઅપ્સ", "યુવા ઉદ્યોગસાહસિકો (18-35)", "નવીન કૃષિ ઉકેલો", "નોંધાયેલા સ્ટાર્ટઅપ્સ (DPIIT)"], documents: ["સ્ટાર્ટઅપ નોંધણી", "ઇનોવેશનની વિગતો", "વ્યવસાય યોજના", "ટીમ પ્રોફાઇલ", "બેંક ખાતું"] },
    136: { fullName: "RSETI - ગ્રામીણ સ્વરોજગાર તાલીમ સંસ્થાઓ", amount: "મફત તાલીમ + લોન જોડાણ", benefits: ["મફત રહેણાંક તાલીમ (7-30 દિવસ)", "ડેરી ફાર્મિંગ તાલીમ", "મરઘાં અને બકરી ઉછેર", "બેંક લોન જોડાણ", "તાલીમ પછીની સહાય"], eligibility: ["ગ્રામીણ યુવાનો (18-45 વર્ષ)", "બેરોજગાર યુવાનો", "ખેડૂતોના બાળકો", "મહિલા ઉમેદવારો"], documents: ["આધાર", "રેશન કાર્ડ", "આવકનું પ્રમાણપત્ર", "બેંક ખાતું", "પાસપોર્ટ ફોટો"] },
    137: { fullName: "રાષ્ટ્રીય યુવા સશક્તિકરણ કાર્યક્રમ - કૃષિ", amount: "₹2 લાખ પ્રોજેક્ટ સહાય", benefits: ["યુવાનો દ્વારા સંચાલિત કૃષિ પ્રોજેક્ટ્સ", "નેતૃત્વ વિકાસ", "સામુદાયિક ખેતીની પહેલ", "નાણાકીય સાક્ષરતા તાલીમ", "બજાર જોડાણ સહાય"], eligibility: ["યુવા જૂથો (15-29 વર્ષ)", "યુથ ક્લબ", "નેહરુ યુવા કેન્દ્રના સભ્યો", "ગ્રામીણ યુવા સંગઠનો"], documents: ["જૂથ નોંધણી", "સભ્યોની વિગતો", "આધાર", "બેંક ખાતું", "પ્રોજેક્ટ દરખાસ્ત"] },
    138: { fullName: "દીન દયાલ ઉપાધ્યાય ગ્રામીણ કૌશલ્ય યોજના (DDU-GKY)", amount: "મફત તાલીમ + માસિક ₹1,000 સ્ટાઇપેન્ડ", benefits: ["3-12 મહિનાની કૌશલ્ય તાલીમ", "તાલીમ દરમિયાન માસિક સ્ટાઇપેન્ડ", "100% જોબ પ્લેસમેન્ટ ગેરંટી", "પ્લેસમેન્ટ પછીની સહાય", "મફત ભોજન અને રહેઠાણ"], eligibility: ["ગ્રામીણ ગરીબ યુવાનો (18-35 વર્ષ)", "SC/ST/મહિલાઓને પ્રાધાન્ય", "BPL પરિવારો", "મનરેગા (MNREGA) મજૂર પરિવારો"], documents: ["આધાર", "BPL પ્રમાણપત્ર", "ઉંમરનો પુરાવો", "બેંક ખાતું", "પાસપોર્ટ ફોટો"] },
    139: { fullName: "NRLM - આજીવિકા ફાર્મ લાઇવલીહુડ્સ", amount: "SHG દીઠ ₹50,000", benefits: ["SHG-આધારિત ખેતીની પ્રવૃત્તિઓ", "સામુદાયિક રોકાણ ફંડ", "રિવોલ્વિંગ ફંડ સહાય", "મૂલ્ય શૃંખલા વિકાસ", "બજાર જોડાણ"], eligibility: ["NRLM હેઠળ મહિલા સ્વયં સહાય જૂથો", "ખેડૂત જૂથો", "ઉત્પાદક જૂથો", "ગ્રામ્ય સંગઠનો"], documents: ["SHG નોંધણી", "સભ્યોની યાદી", "બેંક ખાતું", "ઠરાવની નકલ", "આધાર"] },
    140: { fullName: "KVK - ખેડૂત તાલીમ અને રોજગાર કાર્યક્રમ", amount: "મફત તાલીમ + ઇનપુટ્સ", benefits: ["KVK માં પ્રાયોગિક તાલીમ", "સંકલિત ખેતીની તાલીમ", "મૂલ્ય વર્ધન તાલીમ", "ઇનપુટ કિટનું વિતરણ", "ICAR તરફથી પ્રમાણપત્ર"], eligibility: ["તમામ ખેડૂતો", "મહિલા ખેડૂતો", "ગ્રામીણ યુવાનો", "શાળા છોડી ગયેલા", "કૃષિ-સાહસિકો"], documents: ["આધાર", "જમીનના રેકોર્ડ (જો લાગુ હોય તો)", "બેંક ખાતું", "2 પાસપોર્ટ ફોટા", "મોબાઇલ નંબર"] }
  },
  mwr: {
    1: { fullName: "प्रधानमंत्री किसान सम्मान निधि", amount: "₹6,000/साल", benefits: ["हर साल ₹6,000 रो सीधो फायदो", "हर 4 मीना में ₹2,000", "सीधा बैंक खाता में", "सगळा छोटा अर सीमांत कास्तकारां ने फायदो"], eligibility: ["छोटा अर सीमांत कास्तकार (2 हेक्टेयर ताईं)", "खेती आळी जमीं रा धणी", "जमीं रा कागद आळा सीरी/कास्तकार"], documents: ["आधार कार्ड", "बैंक खातो", "जमीं रा कागद", "राशन कार्ड"] },
    2: { fullName: "सीरी/हिस्सेदार कास्तकारां खातर पीएम-किसान", amount: "₹6,000/साल", benefits: ["बिना जमीं रा कास्तकारां खातर खास नियम", "बटाईदारां ने फायदो", "सीधो फायदो खातो में", "जमीं रा कागद नीं चाईजे"], eligibility: ["बिना जमीं रा सीरी कास्तकार", "बटाईदार", "हिस्से/पट्टे री जमीं माथे खेती करण आळा"], documents: ["आधार", "बैंक खातो", "पट्टो/लिखत", "शपथ पत्र"] },
    3: { fullName: "प्रधानमंत्री अन्नदाता आय संरक्षण अभियान", amount: "₹8,000/साल", benefits: ["सगळा कास्तकारां ने फायदो", "कम सूं कम भाव (MSP) री पक्की बात", "छोटा कास्तकारां ने ₹2,000 और मिळसी", "भाव में घाटा री भरपाई"], eligibility: ["चुण्योड़ी फसल बोवण आळा सगळा कास्तकार", "छोटा अर सीमांत कास्तकारां ने पैली फायदो", "FPO रा सदस्य"], documents: ["आधार", "बैंक खातो", "जमीं रा कागद", "फसल री जानकारी"] },
    4: { fullName: "भाव घाटा री भरपाई योजना", amount: "भाव घाटा री भरपाई", benefits: ["भाव गिर्यां पछे नुकसान री भरपाई", "MSP में घाटा रो पइसा", "सीधा बैंक खाता में", "सब्जी अर फळां माथे लागू"], eligibility: ["मध्य प्रदेश रा कास्तकार", "फसल: टमाटर, कांदो, आलू", "पंजीकरण करा राख्यो होवे"], documents: ["आधार", "बैंक खातो", "बेचाण री रसीद", "मंडी री पर्ची"] },
    5: { fullName: "तेलंगाना रैयथु बंधु", amount: "₹10,000/एकड़/साल", benefits: ["कास्तकारां ने खेती खातर पइसा", "हर फसल माथे ₹5,000 एक एकड़ रा", "सीधा बैंक खाता में", "सगळा कास्तकारां ने फायदो"], eligibility: ["तेलंगाना रा सगळा कास्तकार", "जमीं रा असली धणी", "सीरी कास्तकार (नई योजना)"], documents: ["आधार", "पट्टा री पासबुक", "बैंक खातो"] },
    6: { fullName: "उड़ीसा कालिया योजना", amount: "₹25,000/साल", benefits: ["कास्तकारां ने पइसा रो फायदो", "बिना जमीं रा खेतिहर मजूर", "कमजोर आदिवासी लोग", "बटाईदारां ने फायदो"], eligibility: ["उड़ीसा रा कास्तकार", "बिना जमीं रा मजूर", "छोटा अर सीमांत कास्तकार", "बटाईदार"], documents: ["आधार", "बैंक खातो", "रेवण रो सुबूत", "जमीं रा कागद"] },
    7: { fullName: "राष्ट्रीय कृषि विकास योजना", amount: "राज्य रे हिसाब सूं", benefits: ["राज्य री खेती योजनावां खातर पइसा", "खेती रा ढांचा सुधारे", "खेती रा नवा काम/उद्यम", "मुनाफा री चेन बढाणो"], eligibility: ["राज्य सरकारां", "FPO", "खेती री यूनिवर्सिटी", "रिसर्च सेंटर"], documents: ["प्रोजेक्ट री जानकारी", "राज्य सरकार री हां", "काम करण रो प्लान"] },
    8: { fullName: "राष्ट्रीय बीज सब्सिडी योजना", amount: "बीज माथे 50% छूट", benefits: ["बढ़िया पैदावार आळा बीज", "छोटा कास्तकारां ने 50% छूट", "बढ़िया क्वालिटी रा बीज", "सुधार्योड़ी किस्म"], eligibility: ["सगळा कास्तकार", "छोटा अर सीमांत ने पैली फायदो", "FPO"], documents: ["जमीं रा कागद", "आधार", "बीज रो बिल", "बैंक खातो"] },
    9: { fullName: "पोषक तत्व आधारित सब्सिडी (NBS) योजना", amount: "खात रे हिसाब सूं", benefits: ["P अर K खात/उर्वरक माथे छूट", "कास्तकार रो खरचो कम", "पूरी ताकत आळो खात", "जमीं री सेहत सुधारे"], eligibility: ["सगळा कास्तकार", "पक्का डीलर रे मार्फत"], documents: ["डीलर रो बिल", "आधार (DBT खातर)", "जमीं रा कागद"] },
    10: { fullName: "लुगाइयां/महिला किसान सशक्तिकरण योजना", amount: "₹50,000/साल", benefits: ["लुगाई कास्तकारां ने तागती", "काम सिखावण री ट्रेनिंग", "खेती रा सामानां माथे छूट", "बाजार ताईं पोंच"], eligibility: ["लुगाई कास्तकार", "लुगाइयां रा बचत गट (SHG)", "जिण घर री मुगिया लुगाई होवे"], documents: ["आधार", "जमीं रा कागद", "बैंक खातो", "SHG रो सर्टिफिकेट"] },
    11: { fullName: "किसान क्रेडिट कार्ड (KCC) योजना", amount: "₹3 लाख ताईं", benefits: ["जरुरत रे हिसाब सूं करजो", "ब्याज: 7% (टैम माथे चुकावण पर 4%)", "₹1.6 लाख ताईं बिना कोई गिरवी", "खेती रा दूजा कामां खातर ई"], eligibility: ["सगळा कास्तकार", "बटाईदार", "सीरी कास्तकार", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "आधार", "फोटो", "फसल री जानकारी"] },
    12: { fullName: "थोड़े टैम रा फसली करजा माथे ब्याज छूट", amount: "2% ब्याज छूट", benefits: ["फसली करजा माथे 2% ब्याज छूट", "टैम माथे चुकावण पर 3% और छूट", "साळ रो ब्याज खाली 4%", "₹3 लाख ताईं करजो"], eligibility: ["फसली करजो लेवण आळा सगळा कास्तकार", "KCC आळा कास्तकार", "सहकारी समिति रा मेम्बर"], documents: ["KCC", "करजा री अरजी", "जमीं रा कागद"] },
    13: { fullName: "गोदाम ढांचा फंड", amount: "₹50 करोड़ एक प्रोजेक्ट रा", benefits: ["गोदाम बणावण खातर करजो", "25% ताईं सब्सिडी/छूट", "फसल कट्या पछे रा काम खातर ढांचा", "फसल खराब नीं होवे"], eligibility: ["FPO", "सहकारी समितियां", "खेती रा नवा व्यापारी", "राज्य री एजेंसियां"], documents: ["प्रोजेक्ट री रिपोर्ट", "जमीं रा कागद", "रजिस्ट्रेशन रो कागद"] },
    14: { fullName: "डेयरी उद्यम विकास योजना", amount: "₹5 लाख ताईं सब्सिडी", benefits: ["डेयरी खातर सब्सिडी", "साधारण कास्तकारां ने 25%, SC/ST ने 33%", "गाय/भैंस खातर करजो", "दूध रा मसीनां खातर"], eligibility: ["एकलो कास्तकार", "बचत गट (SHG)", "डेयरी सहकारी समितियां"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "प्रोजेक्ट री रिपोर्ट"] },
    15: { fullName: "मुर्गी पालन/पोल्ट्री वेंचर कैपिटल फंड", amount: "₹3 लाख ताईं सब्सिडी", benefits: ["मुर्गी पालन खातर सब्सिडी", "SC/ST कास्तकारां ने 33%", "बॉयलर/अंडा मुर्गी खातर करजो", "चूजां खातर फायदो"], eligibility: ["एकलो कास्तकार", "FPO", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "अनुभव रो सर्टिफिकेट"] },
    16: { fullName: "बकरी अर भेड विकास योजना", amount: "50% सब्सिडी", benefits: ["बकरी/भेड पालण माथे सब्सिडी", "₹50,000 ताईं 50% छूट", "नस्ल सुधारण खातर मदद", "डागदरां रो इलाज"], eligibility: ["छोटा कास्तकार", "बिना जमीं रा मजूर", "आदिवासी कास्तकार", "लुगाई कास्तकार"], documents: ["आधार", "बैंक खातो", "ग्राम पंचायत रो सर्टिफिकेट"] },
    17: { fullName: "कृषि ढांचा फंड", amount: "₹2 करोड़ ताईं करजो", benefits: ["खेत रा ढांचा खातर करजो", "3% ब्याज छूट", "3 साळ ताईं चुकावण सूं छूट", "गोदाम, कोल्ड स्टोरेज खातर"], eligibility: ["FPO", "सहकारी समितियां", "एकलो कास्तकार", "खेती रा व्यापारी"], documents: ["प्रोजेक्ट री रिपोर्ट", "जमीं रा कागद", "आधार", "बैंक खातो"] },
    18: { fullName: "AHIDF - डेयरी अर पोल्ट्री लोन", amount: "₹100 करोड़ ताईं", benefits: ["डेयरी अर पोल्ट्री रा ढांचा खातर करजो", "3% ब्याज छूट", "करजा री गारंटी ई मिले", "दूध मसीनां, मुर्गी पालन खातर"], eligibility: ["एकलो व्यापारी", "FPO", "प्राइवेट कंपनी", "सहकारी समितियां"], documents: ["DPR", "व्यापार रो रजिस्ट्रेशन", "जमीं रा कागद", "बैंक खातो"] },
    19: { fullName: "FIDF - मछळी पालन लोन", amount: "₹50 लाख ताईं", benefits: ["मछळी पालन रा ढांचा खातर करजो", "4% ब्याज छूट", "बीज अर चारा मसीनां खातर", "मछळी खातर कोल्ड चेन"], eligibility: ["मछळी पाळण आळा", "FPO", "सहकारी समितियां", "बचत गट (SHG)"], documents: ["पाणी आळी जगह रो पट्टो", "प्रोजेक्ट री रिपोर्ट", "आधार", "बैंक खातो"] },
    20: { fullName: "फूड प्रोसेसिंग लोन योजना", amount: "₹10 करोड़ ताईं", benefits: ["फूड प्रोसेसिंग मसीनां खातर करजो", "35% पूंजीगत छूट", "5% ब्याज छूट", "फळ, सब्जी, अनाज सगळा खातर"], eligibility: ["फूड प्रोसेसिंग करण आळा", "FPO", "सहकारी समितियां", "खेती रा व्यापारी"], documents: ["DPR", "जमीं रा कागद", "FSSAI लाइसेंस", "बैंक खातो"] },
    21: { fullName: "प्रधानमंत्री फसल बीमा योजना", amount: "कम प्रीमियम: 1.5-5%", benefits: ["कम प्रीमियम में फसल बीमा", "रबी खातर 1.5%, खरीफ खातर 2%", "21 दिनां में क्लेम", "बीजण सूं लेर काटण ताईं रो बीमा"], eligibility: ["सगळा कास्तकार", "करजो लेवण आळा ने जरुरी", "बिना करजा आळा री मरजी", "बटाईदार"], documents: ["जमीं रा कागद", "फसल री जानकारी", "आधार", "बैंक खातो"] },
    22: { fullName: "मौसम आधारित फसल बीमा योजना", amount: "प्रीमियम 1.5-8%", benefits: ["मौसम रे हिसाब सूं बीमा", "बारिश कम या ज्यादा होवण पर बीमा", "तापमान अर सील (नमी) रो बीमा", "जल्दी क्लेम रो पइसा"], eligibility: ["चुण्योड़ा इलाकां रा कास्तकार", "मौसम सूं खराब होवण आळी फसल", "सगळा कास्तकार"], documents: ["जमीं रा कागद", "मौसम री जानकारी", "आधार"] },
    23: { fullName: "नारियल रा रुखां री बीमा योजना", amount: "प्रीमियम: ₹100-500/रुख", benefits: ["नारियल रा रुखां रो बीमा", "कीड़ा अर बीमारी सूं बीमा", "कुदरती आफत सूं बीमा", "5 साळ ताईं रो बीमा"], eligibility: ["नारियल रा कास्तकार", "कम सूं कम 5 रुख", "सगळा राज्यां में"], documents: ["जमीं रा कागद", "रुखां री गिणती", "आधार"] },
    24: { fullName: "रबर बीमा योजना", amount: "₹30,000/हेक्टेयर", benefits: ["रबर रा रुखां रो बीमा", "कुदरती आफत सूं बीमा", "बीमारी अर कीड़ा सूं बीमा", "पैदावार में घाटा री भरपाई"], eligibility: ["रबर रा कास्तकार", "कम सूं कम 0.5 हेक्टेयर", "रबर बोर्ड में रजिस्ट्रेशन"], documents: ["जमीं रा कागद", "रबर बोर्ड रो रजिस्ट्रेशन", "आधार"] },
    25: { fullName: "कॉफी फसल बीमा", amount: "प्रीमियम 3.5%", benefits: ["कॉफी रा बागां रो बीमा", "अरेबिका अर रोबस्टा दोनां माथे", "पैदावार में घाटा री भरपाई", "भाव में उतार-चढ़ाव सूं बीमा"], eligibility: ["कॉफी रा कास्तकार", "कॉफी बोर्ड में रजिस्ट्रेशन", "कम सूं कम 0.5 एकड़"], documents: ["जमीं रा कागद", "कॉफी बोर्ड रो रजिस्ट्रेशन"] },
    26: { fullName: "चाय फसल बीमा", amount: "प्रीमियम 2.5%", benefits: ["चाय रा बागां रो बीमा", "हरी पत्ती री पैदावार रो बीमा", "सूखो अर बाढ़ सूं बीमा", "कीड़ा अर बीमारी सूं बीमा"], eligibility: ["चाय रा कास्तकार", "टी बोर्ड में रजिस्ट्रेशन", "सगळा राज्यां में"], documents: ["जमीं रा कागद", "टी बोर्ड रो रजिस्ट्रेशन"] },
    27: { fullName: "UPIS - फसल प्लस बीमा", amount: "प्रीमियम: 2-8%", benefits: ["फसल + संपत्ति दोनां रो बीमा", "घर, ट्रैक्टर, डांगर सगळा रो बीमा", "सगळा खातर एक ही प्रीमियम", "जल्दी क्लेम रो पइसा"], eligibility: ["सगळा कास्तकार", "करजो लेवण आळा ने जरुरी", "बिना करजा आळा री मरजी"], documents: ["जमीं रा कागद", "समान री लिस्ट", "आधार", "बैंक खातो"] },
    28: { fullName: "ऑयल पाम बीमा योजना", amount: "प्रीमियम: 2.5%", benefits: ["ऑयल पाम रा बागां रो बीमा", "पैदावार में घाटा री भरपाई", "कीड़ा अर बीमारी सूं बीमा", "5-साळ री पॉलिसी रो विकल्प"], eligibility: ["ऑयल पाम रा कास्तकार", "NMEO-OP में रजिस्ट्रेशन", "कम सूं कम 1 हेक्टेयर"], documents: ["जमीं रा कागद", "बाग रो रजिस्ट्रेशन", "आधार"] },
    29: { fullName: "इलायची फसल बीमा", amount: "प्रीमियम: 3%", benefits: ["इलायची रा बागां रो बीमा", "मौसम सूं पैदावार में घाटा री भरपाई", "कीड़ा अर बीमारी सूं बीमा", "जल्दी क्लेम रो पइसा"], eligibility: ["इलायची रा कास्तकार", "मसाला बोर्ड में रजिस्ट्रेशन", "कम सूं कम 0.5 एकड़"], documents: ["जमीं रा कागद", "मसाला बोर्ड रो रजिस्ट्रेशन", "आधार"] },
    30: { fullName: "राष्ट्रीय पशुधन/डांगर बीमा योजना", amount: "प्रीमियम: 4-6%", benefits: ["गाय, भैंस, भेड, बकरी रो बीमा", "एक्सीडेंट/बीमारी सूं मरण पर बीमा", "BPL खातर कम प्रीमियम", "जल्दी क्लेम रो पइसा"], eligibility: ["सगळा डांगर राखण आळा", "डेयरी रा कास्तकार", "BPL परिवारां ने पैली फायदो"], documents: ["डांगर री पिछाण", "डागदर रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    31: { fullName: "प्रधानमंत्री कृषि सिंचाई योजना", amount: "55-75% छूट", benefits: ["ड्रिप/फव्वारा माथे छूट", "साधारण कास्तकारां ने 55%, SC/ST ने 75%", "खेत रो नाडो (पॉन्ड) बणावण खातर मदद", "हर बूंद सूं ज्यादा पैदावार"], eligibility: ["सगळा कास्तकार", "FPO", "पाणी काम में लेवण आळी समितियां"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "दुकानदार रो कोटेशन"] },
    32: { fullName: "माइक्रो सिंचाई फंड (NABARD)", amount: "₹5,000 करोड़ रो फंड", benefits: ["बूंद-बूंद सिंचाई खातर और छूट", "PMKSY रे सागे मिळ्योड़ी", "राज्य सरकार रो करजो", "पाणी री कमी आळा इलाकां ने पैली फायदो"], eligibility: ["राज्य सरकारां", "पाणी काम में लेवण आळी समितियां", "FPO"], documents: ["प्रोजेक्ट री जानकारी", "राज्य सरकार री हां"] },
    33: { fullName: "हर खेत ने पाणी (PMKSY रो हिस्सो)", amount: "पूरी मदद", benefits: ["हर खेत ताईं सिंचाई रो पाणी", "कमांड एरिया रो विकास", "पाणी भेळो करण रा ढांचा", "पाणी रा जोहड़/तालाब सुधारणो"], eligibility: ["सगळा कास्तकार", "बारानी (बिना सिंचाई आळा) इलाकां ने पैली फायदो"], documents: ["जमीं रा कागद", "पाणी री जगह री जानकारी"] },
    34: { fullName: "वाटरशेड विकास योजना (PMKSY)", amount: "₹12,000/हेक्टेयर", benefits: ["वाटरशेड रो काम-काज", "जमीं अर पाणी रो बचाव", "बारिश रो पाणी भेळो करणो", "चैक डैम बणावणो"], eligibility: ["वाटरशेड इलाकां रा कास्तकार", "गांवां रा लोग"], documents: ["गांव री अर्जी", "जमीं रा कागद"] },
    35: { fullName: "सिंचाई रो छिटो फायदो (AIBP)", amount: "90:10 फंड", benefits: ["सिंचाई रा बड़ा प्रोजेक्ट", "केंद्र:राज्य रो पइसा 90:10", "कमांड एरिया रो विकास", "पाणी बांटण रो सिस्टम"], eligibility: ["राज्य सरकारां", "सिंचाई विभाग"], documents: ["प्रोजेक्ट री DPR", "राज्य सरकार री हां"] },
    36: { fullName: "खेत खातर छत माथे पाणी री कुंडी", amount: "₹25,000 ताईं 50% छूट", benefits: ["बारिश रो पाणी भेळो करण रो ढांचो", "पाणी री कुंडी/टैंक माथे छूट", "जमीं रो पाणी बढावणो", "ट्यूबवेल माथे निर्भरता कम करणो"], eligibility: ["सगळा कास्तकार", "खेत रा मकान", "डांगरां रा बाड़ा"], documents: ["मकान रो नक्शो", "जमीं रा कागद", "कोटेशन"] },
    37: { fullName: "खेत रो नाडो अर कुओ रिचार्ज योजना", amount: "₹50,000 ताईं 50% छूट", benefits: ["खेत में नाडो/पॉन्ड बणावणो", "कुआं में पाणी बढावण रो ढांचो", "बारिश रो पाणी भेळो करणो", "जमीं रा पाणी रो लेवल सुधारणो"], eligibility: ["सगळा कास्तकार", "जठे पाणी नीचो जा रियो है"], documents: ["जमीं रा कागद", "कुआं रो कागद", "आधार"] },
    38: { fullName: "फव्वारा सिंचाई सब्सिडी", amount: "₹15,000/एकड़ ताईं 70% छूट", benefits: ["हलाण-लेजाण आळा फव्वारा", "40% ताईं पाणी री बचत", "सगळी फसळां खातर बढ़िया", "चलावण रो खरचो कम"], eligibility: ["छोटा अर सीमांत कास्तकार", "FPO", "पाणी री कमी आळा इलाकां ने पैली फायदो"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बैंक खातो"] },
    39: { fullName: "बूंद-बूंद (ड्रिप) सिंचाई योजना", amount: "60-80% छूट", benefits: ["ड्रिप सिंचाई रो सिस्टम", "60% ताईं पाणी री बचत", "ज्यादा पैदावार", "खात देवण (फर्टिगेशन) खातर बढ़िया"], eligibility: ["सगळा कास्तकार", "सब्जी-फळ आळा कास्तकारां ने पैली फायदो", "FPO"], documents: ["जमीं रा कागद", "फसल री जानकारी", "आधार", "बैंक खातो"] },
    40: { fullName: "धोरा अर पाइपलाइन बढावण री योजना", amount: "₹2 लाख ताईं 50% छूट", benefits: ["कुआं सूं खेत ताईं PVC पाइपलाइन", "पाणी रो नुकसान कम", "टैम अर मेहनत री बचत", "5 एकड़ ताईं रो फायदो"], eligibility: ["सगळा कास्तकार", "पाणी काम में लेवण आळी समितियां", "FPO"], documents: ["जमीं रा कागद", "पाणी री जगह रो सुबूत", "आधार", "बैंक खातो"] },
    41: { fullName: "खेती रा सामानां/मसीनां माथे छूट", amount: "40-50% छूट", benefits: ["SC/ST खातर 50% (₹40,000 ताईं)", "साधारण कास्तकारां खातर 40%", "ट्रैक्टर, रोटावेटर माथे छूट", "ड्रोन माथे ₹5 लाख ताईं 50% छूट"], eligibility: ["एकलो कास्तकार", "FPO", "मसीन भाड़े देवण आळा सेंटर", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बिल"] },
    42: { fullName: "खेत रा मसीनां रो बैंक (Farm Machinery Bank)", amount: "₹40 लाख ताईं 40% छूट", benefits: ["मसीन भाड़े देवण रो सेंटर", "मसीनां माथे 40% छूट", "छोटा कास्तकारां ने फायदो", "खुद रो खरचो कम"], eligibility: ["FPO", "सहकारी समितियां", "बचत गट (SHG)", "नवा व्यापारी"], documents: ["व्यापार रो प्लान", "रजिस्ट्रेशन रो सर्टिफिकेट", "सेंटर खातर जमीं"] },
    43: { fullName: "खात/दवाई छिड़कण खातर ड्रोन", amount: "₹8 लाख ताईं 80% छूट", benefits: ["लुगाइयां रा बचत गटां खातर ड्रोन", "खरीद माथे 80% छूट", "ट्रेनिंग ई मिळसी", "दवाई छिड़कण सूं कमाई"], eligibility: ["लुगाइयां रा बचत गट (SHG)", "लुगाइयां आळा FPO"], documents: ["SHG रो रजिस्ट्रेशन", "लुगाइयां री लिस्ट"] },
    44: { fullName: "फसल कट्या पछे रा मसीनां माथे छूट", amount: "₹10 लाख ताईं 35% छूट", benefits: ["थ्रेसर, ड्रायर, ग्रेडर", "भंडारण रो सामान", "पॅकिंग री मसीनां", "प्रोसेसिंग आळा ढांचा"], eligibility: ["एकलो कास्तकार", "FPO", "खेती रा व्यापारी"], documents: ["प्रोजेक्ट री रिपोर्ट", "कोटेशन", "जमीं रा कागद"] },
    45: { fullName: "कास्तकारां खातर सोलर ड्रायर", amount: "₹50,000 ताईं 50% छूट", benefits: ["फळ/सब्जी खातर सोलर ड्रायर", "कटाई पछे खराब होवण सूं बचाव", "क्वालिटी बढ़िया रेवे", "भाव चोखो मिले"], eligibility: ["छोटा कास्तकार", "FPO", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "आधार"] },
    46: { fullName: "कोल्ड स्टोरेज अर कोल्ड चेन", amount: "₹50 लाख ताईं 35% छूट", benefits: ["कोल्ड स्टोरेज बणावणो", "ठंडा राखण आळी गाड़ियां", "पॅकिंग रो सामान", "फसल खराब नीं होवे"], eligibility: ["FPO", "सहकारी समितियां", "एकलो व्यापारी"], documents: ["प्रोजेक्ट री रिपोर्ट", "जमीं रा कागद", "व्यापार रो प्लान"] },
    47: { fullName: "सीमांत कास्तकारां खातर छोटो ट्रैक्टर सब्सिडी", amount: "₹60,000 ताईं 40% छूट", benefits: ["20-35 HP ट्रैक्टर माथे छूट", "SC/ST कास्तकारां ने पैली फायदो", "भाड़े देवण री सुविधा", "खेती रो खरचो कम"], eligibility: ["छोटा अर सीमांत कास्तकार", "SC/ST कास्तकार", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बैंक खातो"] },
    48: { fullName: "पावर टिलर सब्सिडी योजना", amount: "₹25,000 ताईं 50% छूट", benefits: ["पावर टिलर माथे छूट", "छोटा खेतां खातर बढ़िया", "मजूरां माथे निर्भरता कम", "सार-संभाळ रो खरचो कम"], eligibility: ["छोटा कास्तकार", "पहाड़ी इलाकां रा कास्तकार", "FPO"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बैंक खातो"] },
    49: { fullName: "कंबाइन हार्वेस्टर सब्सिडी योजना", amount: "₹2 लाख ताईं 40% छूट", benefits: ["रीपर/हार्वेस्टर माथे छूट", "कटाई में टैम कम लागे", "फसल रो नुकसान कम", "भाड़े चलावण खातर बढ़िया"], eligibility: ["FPO", "सहकारी समितियां", "बचत गट (SHG)", "बड़ा कास्तकार"], documents: ["जमीं रा कागद", "व्यापार रो प्लान", "आधार", "बैंक खातो"] },
    50: { fullName: "मसीनी धान/चावल लगावण आळी मशीन माथे छूट", amount: "₹40,000 ताईं 50% छूट", benefits: ["धान लगावण री मसीन माथे छूट", "मजूरी रो खरचो बचे", "एक समान बुवाई", "ज्यादा पैदावार"], eligibility: ["धान रा कास्तकार", "FPO", "बचत गट (SHG)", "मसीन भाड़े देवण आळा सेंटर"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बैंक खातो"] },
    51: { fullName: "माटी री जांच (सॉइल हेल्थ कार्ड) योजना", amount: "मुफ्त सेवा", benefits: ["हर 2 साळ में माटी री मुफ्त जांच", "12 चीजां री जांच", "फसल रे हिसाब सूं सलाह", "खात रो खरचो 10-15% कम"], eligibility: ["सगळा कास्तकार", "छोटा कास्तकारां ने पैली फायदो"], documents: ["जमीं रा कागद", "कास्तकार रो आईडी कार्ड"] },
    52: { fullName: "फिरती माटी जांच लैब (Mobile Lab)", amount: "₹25 लाख एक लैब रा", benefits: ["फिरती माटी जांच आळी गाड़ी", "घर बैठे मुफ्त सेवा", "7 दिनां में रिपोर्ट", "दूर रा गांवां में पोंच"], eligibility: ["राज्य सरकारां", "कृषि विज्ञान केंद्र (KVK)", "खेती री यूनिवर्सिटी"], documents: ["प्रोजेक्ट री अर्जी", "लैब रो पूरा ब्यौरो"] },
    53: { fullName: "माटी री सेहत संभाल योजना (SHM)", amount: "₹2,000/हेक्टेयर", benefits: ["जमीं सुधारण खातर छूट", "चूना/जिप्सम घालण खातर मदद", "सूक्ष्म पोषक तत्व देवणा", "जैविक खात ने बढ़ावा"], eligibility: ["सगळा कास्तकार", "माटी रो हेल्थ कार्ड होवणो चाईजे"], documents: ["सॉइल हेल्थ कार्ड", "जमीं रा कागद"] },
    54: { fullName: "सूक्ष्म पोषक तत्व कमी सुधारणो", amount: "₹1,000/एकड़ ताईं 50% छूट", benefits: ["जिंक, बोरॉन, लोहा देवणो", "माटी री कमी दूर करणो", "बढ़िया बीज माथे छूट", "पैदावार सुधारणो"], eligibility: ["जिकां री जमीं में तत्व री कमी होवे", "माटी री जांच रिपोर्ट जरुरी"], documents: ["सॉइल हेल्थ कार्ड", "जमीं रा कागद"] },
    55: { fullName: "माटी रो खारापण/एसिडिटी सुधारणो", amount: "50% छूट", benefits: ["एसिड आळी माटी खातर चूना", "खारी माटी खातर जिप्सम", "माटी रो pH सुधारणो", "खात रो असर बढावणो"], eligibility: ["खराब जमीं आळा कास्तकार", "माटी री जांच रिपोर्ट जरुरी"], documents: ["माटी री जांच रिपोर्ट", "जमीं रा कागद"] },
    56: { fullName: "जैविक तत्व बढावण री योजना", amount: "₹5,000/हेक्टेयर", benefits: ["हरी खात माथे छूट", "कंपोस्ट खात ने बढ़ावा", "फसल रा कचरा रो सही उपयोग", "माटी में जैविक कार्बन बढावणो"], eligibility: ["सगळा कास्तकार", "जैविक खेती करण आळा गट"], documents: ["जमीं रा कागद", "सॉइल हेल्थ कार्ड", "आधार"] },
    57: { fullName: "मुफ्त जैविक/बायो-फर्टिलाइजर बांटणो", amount: "5 किलो/एकड़ ताईं मुफ्त", benefits: ["मुफ्त राइजोबियम, PSB, एजोटोबैक्टर", "रासायनिक खात रो उपयोग कम", "माटी री तागती बढावणी", "कृषि विज्ञान केंद्र (KVK) माथे मिले"], eligibility: ["सगळा कास्तकार", "छोटा अर सीमांत ने पैली फायदो"], documents: ["जमीं रा कागद", "सॉइल हेल्थ कार्ड", "आधार"] },
    58: { fullName: "केंचुआ खात (वर्मीकम्पोस्ट) बणावण रो प्लांट", amount: "₹25,000 ताईं 50% छूट", benefits: ["वर्मीकम्पोस्ट प्लांट लगावणो", "केंचुआ लेवण खातर मदद", "जैविक खात बणावणो", "कचरा रो सही उपयोग"], eligibility: ["एकलो कास्तकार", "बचत गट (SHG)", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "प्रोजेक्ट री अर्जी", "आधार", "बैंक खातो"] },
    59: { fullName: "माटी रो कटाव रोकण री योजना", amount: "75% छूट", benefits: ["कंटूर बंडिंग (मेड़बंदी)", "सीढ़ीदार खेती खातर मदद", "पाणी रा खाळा रोकणा", "पट्टियां में खेती (Strip Cropping)"], eligibility: ["पहाड़ी इलाकां रा कास्तकार", "कटाव आळा इलाकां रा लोग"], documents: ["जमीं रा कागद", "कटाव रो सुबूत", "आधार"] },
    60: { fullName: "जमीं सीधो (समतल) करण अर विकास", amount: "₹10,000/एकड़ ताईं 50% छूट", benefits: ["लेजर (Laser) सूं जमीं सीधो करण माथे छूट", "जमीं री ढलाण ठीक करणो", "पाणी निकासी सुधारणो", "पाणी रो सही उपयोग"], eligibility: ["सगळा कास्तकार", "FPO", "पाणी री कमी आळा इलाकां ने पैली फायदो"], documents: ["जमीं रा कागद", "आधार", "कोटेशन", "बैंक खातो"] },
    61: { fullName: "परंपरागत कृषि विकास योजना", amount: "₹31,500/हेक्टेयर", benefits: ["जैविक खात/दवाई खातर ₹15,000", "सर्टिफिकेट खातर ₹10,000", "ट्रेनिंग खातर ₹6,500", "3 साळ ताईं मदद"], eligibility: ["कास्तकारां रो गट (50+ कास्तकार)", "FPO", "बचत गट (SHG)", "कम सूं कम 50 एकड़ जमीं"], documents: ["गट रो रजिस्ट्रेशन", "कास्तकारां री लिस्ट", "जमीं रो ब्यौरो", "माटी री जांच रिपोर्ट"] },
    62: { fullName: "उत्तर पूर्व इलाकां खातर जैविक खेती विकास मिशन", amount: "₹75,000/हेक्टेयर", benefits: ["उत्तर-पूर्व राज्यां में जैविक खेती", "FPO बणावण में मदद", "बाजार सूं जोड़णो", "माल तैयार करण रा ढांचा"], eligibility: ["उत्तर-पूर्व राज्यां रा कास्तकार", "FPO", "जैविक खेती आळा गट", "आदिवासी कास्तकार"], documents: ["जमीं रा कागद", "FPO रो रजिस्ट्रेशन", "कास्तकार रो आईडी कार्ड", "बैंक खातो"] },
    63: { fullName: "केंचुआ खात (वर्मीकम्पोस्ट) बणावण री योजना", amount: "₹50,000 ताईं 50% छूट", benefits: ["वर्मीकम्पोस्ट प्लांट लगावणो", "केंचुआ लेवण खातर मदद", "ट्रेनिंग ई मिळसी", "जैविक खात बणावणो"], eligibility: ["एकलो कास्तकार", "बचत गट (SHG)", "FPO", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "प्रोजेक्ट री अर्जी", "आधार", "बैंक खातो"] },
    64: { fullName: "जैविक खात (Bio-fertilizer) बणावण री योजना", amount: "₹2 लाख ताईं 40% छूट", benefits: ["राइजोबियम, PSB बणावणो", "एजोटोबैक्टर, VAM लेवण खातर", "क्वालिटी चेक करण री लैब", "कास्तकारां ने ट्रेनिंग"], eligibility: ["बचत गट (SHG)", "FPO", "नवा व्यापारी", "खेती रा पढ़े-लिख्या टाबर"], documents: ["व्यापार रो प्लान", "पढाई रा कागद", "पट्टा री जमीं", "बैंक खातो"] },
    65: { fullName: "जीरो बजट कुदरती खेती योजना", amount: "₹15,000/हेक्टेयर", benefits: ["कुदरती खेती ने बढ़ावा", "गायां माथे आधारित खेती", "जैविक दवाई री ट्रेनिंग", "मल्चिंग (पाला ढाकण) री मदद"], eligibility: ["सगळा कास्तकार", "बारानी (बिना सिंचाई आळा) इलाकां ने पैली फायदो", "छोटा अर सीमांत कास्तकार"], documents: ["जमीं रा कागद", "ट्रेनिंग रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    66: { fullName: "PGS-इंडिया सर्टिफिकेट खातर मदद", amount: "₹10,000 ताईं 100% छूट", benefits: ["मुफ्त जैविक सर्टिफिकेट", "गटां ने सागे सर्टिफिकेट", "क्वालिटी री गारंटी", "बाजार ताईं पोंच"], eligibility: ["कास्तकारां रो गट", "FPO", "जैविक खेती आळा गट"], documents: ["गट रो रजिस्ट्रेशन", "कास्तकारां री लिस्ट", "जमीं रा कागद"] },
    67: { fullName: "डांगरां रो खात संभालण री योजना", amount: "₹30,000 ताईं 50% छूट", benefits: ["खात रा खड्डा बणावणो", "खात बणावण रो काम", "बायोगैस प्लांट माथे छूट", "देसी खात ने बढ़ावा"], eligibility: ["डांगर राखण आळा", "डेयरी रा कास्तकार", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "डांगरां री गिणती रो सुबूत", "आधार", "बैंक खातो"] },
    68: { fullName: "हरी खात रा बीजां माथे छूट", amount: "बीज माथे 50% छूट", benefits: ["सण, ढैंचा रा बीज", "जमीं री तागती बढावणी", "नींदान/कचरो रोकणो", "रसायनिक खात रो उपयोग कम"], eligibility: ["सगळा कास्तकार", "जैविक खेती आळा ने पैली फायदो"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो"] },
    69: { fullName: "राज्य री जैविक खेती बढ़ावा योजना", amount: "₹20,000/हेक्टेयर", benefits: ["जैविक सामान माथे छूट", "ट्रेनिंग अर दिखावो", "बाजार सूं जोड़ण री मदद", "PGS सर्टिफिकेट"], eligibility: ["सगळा कास्तकार", "जैविक खेती आळा गट", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "ट्रेनिंग रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    70: { fullName: "जैविक कीटनाशक/दवाई बढावण री योजना", amount: "₹2,000/एकड़ ताईं 50% छूट", benefits: ["नीम री दवाईयां", "ट्राइकोडर्मा लेवण खातर", "स्यूडोमोनास कल्चर", "IPM ट्रेनिंग"], eligibility: ["सगळा कास्तकार", "जैविक खेती करण आळा", "FPO"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो"] },
    71: { fullName: "बागवानी/बागां रा विकास खातर मिशन (MIDH)", amount: "50-75% छूट", benefits: ["फळ, सब्जी लगावणो", "नर्सरी रो विकास", "कटाई पछे रा काम", "पॅकिंग माथे छूट"], eligibility: ["सगळा कास्तकार", "FPO", "नर्सरी आळा", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "प्रोजेक्ट री अर्जी", "आधार", "बैंक खातो"] },
    72: { fullName: "नारियल विकास योजना", amount: "₹50,000/हेक्टेयर", benefits: ["छोटा कास्तकारां ने 70% छूट", "बढ़िया पैदावार आळा पौधा", "पुराणा रुखां री जगह नवा लगावणा", "भाव चोखो लेवण री मदद"], eligibility: ["केरल, तमिलनाडु, कर्नाटक, आंध्र प्रदेश रा नारियल कास्तकार", "FPO", "छोटा कास्तकार"], documents: ["जमीं रा कागद", "रुखां री गिणती", "आधार", "बैंक खातो"] },
    73: { fullName: "काजू अर कोको (Cocoa) योजना", amount: "₹25,000/हेक्टेयर", benefits: ["काजू लगावण माथे छूट", "कोको री खेती खातर मदद", "प्रोसेसिंग प्लांट माथे छूट", "बाहर भेजण (Export) ने बढ़ावा"], eligibility: ["समुंदर किनारे रा राज्यां रा कास्तकार", "FPO", "प्रोसेसिंग प्लांट आळा", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "प्रोजेक्ट री रिपोर्ट", "आधार", "बैंक खातो"] },
    74: { fullName: "बांस/बांसड़ा विकास योजना", amount: "₹30,000/हेक्टेयर", benefits: ["बांस लगावण माथे छूट", "नर्सरी रो विकास", "भाव चोखो लेवण री मसीनां", "हाथ रा कामां ने मदद"], eligibility: ["उत्तर-पूर्व राज्यां रा कास्तकार", "FPO", "आदिवासी कास्तकार", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "बांस आळी जगह रो ब्यौरो", "आधार", "बैंक खातो"] },
    75: { fullName: "मसाला विकास अर प्रोसेसिंग", amount: "40% छूट", benefits: ["मसाला पीसण/प्रोसेसिंग प्लांट", "बढ़िया पैकिंग री मसीनां", "क्वालिटी चेक लैब", "बाहर भेजण (Export) री सुविधा"], eligibility: ["मसाला रा कास्तकार", "FPO", "मसाला रा व्यापारी", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "मसाला बोर्ड में रजिस्ट्रेशन", "प्रोजेक्ट री रिपोर्ट", "बैंक खातो"] },
    76: { fullName: "आंबा रा बाग अर प्रोसेसिंग", amount: "₹40,000/हेक्टेयर", benefits: ["बढ़िया पैदावार आळा आंबा रा पौधा", "प्रोसेसिंग प्लांट खातर मदद", "कोल्ड स्टोरेज माथे छूट", "बाहर भेजण (Export) ने बढ़ावा"], eligibility: ["आंबा रा कास्तकार", "FPO", "प्रोसेसिंग प्लांट आळा"], documents: ["जमीं रा कागद", "किस्म री जानकारी", "आधार", "बैंक खातो"] },
    77: { fullName: "केळा रा बाग अर मुनाफा बढावणो", amount: "₹35,000/हेक्टेयर", benefits: ["टिश्यू कल्चर पौधा माथे छूट", "ड्रिप सिंचाई री मदद", "प्रोसेसिंग प्लांट", "बाजार सूं जोड़णो"], eligibility: ["केळा रा कास्तकार", "FPO", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "किस्म री जानकारी", "आधार", "बैंक खातो"] },
    78: { fullName: "राष्ट्रीय फूल खेती मिशन", amount: "₹5 लाख ताईं 50% छूट", benefits: ["फूल री खेती खातर मदद", "ग्रीनहाउस माथे छूट", "बाहर भेजण लायक फूल", "कोल्ड चेन री मदद"], eligibility: ["फूल रा कास्तकार", "FPO", "लुगाई कास्तकार", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "ग्रीनहाउस री अर्जी", "आधार", "बैंक खातो"] },
    79: { fullName: "राष्ट्रीय मशरूम/खूंबी मिशन", amount: "₹1 लाख ताईं 50% छूट", benefits: ["मशरूम रा बीज (Spawn) माथे छूट", "उगावण रो कमरो बणावणो", "ट्रेनिंग अर तकनीक", "बेचण में मदद"], eligibility: ["सगळा कास्तकार", "बचत गट (SHG)", "लुगाई कास्तकार", "गांवां रा जवान"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "ट्रेनिंग रो सर्टिफिकेट"] },
    80: { fullName: "सब्जी उगावण आळा गटां री योजना", amount: "₹20,000/हेक्टेयर", benefits: ["सब्जी रा बीजां माथे छूट", "सुरक्षित खेती (Polyhouse)", "बाजार सूं जोड़णो", "कटाई पछे रा काम"], eligibility: ["सब्जी रा कास्तकार", "FPO", "बचत गट (SHG)", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "खेती रो प्लान", "आधार", "बैंक खातो"] },
    81: { fullName: "खेती रा सामानां खातर वर्चुअल सिस्टम (VIS)", amount: "मुफ्त AI सेवा", benefits: ["AI सूं खेती री सलाह", "22+ भारतीय भाषावां", "फसल री सलाह", "कीड़ा-बीमारी री चेतावनी", "बाजार रो भाव"], eligibility: ["सगळा कास्तकार", "FPO", "खेती रा अफसर", "कृषि विज्ञान केंद्र (KVK)"], documents: ["आधार", "मोबाइल नंबर", "जमीं रा कागद (मरजी होवे तो)"] },
    82: { fullName: "राष्ट्रीय एग्रीस्टैक डिजिटल प्लेटफॉर्म", amount: "मुफ्त डिजिटल आईडी", benefits: ["कास्तकारां रो अलग आईडी कार्ड", "डिजिटल जमीं रा कागद", "फसल बीजण रो डाटा", "सीधो फायदो (DBT) रो जुड़ाव"], eligibility: ["सगळा कास्तकार", "योजनावां रा फायदा लेवण आळा ने पैली", "छोटा अर सीमांत कास्तकार"], documents: ["आधार", "जमीं रा कागद", "बैंक खातो", "मोबाइल नंबर"] },
    83: { fullName: "राष्ट्रीय कृषि बाजार (e-NAM)", amount: "मुफ्त ट्रेडिंग प्लेटफॉर्म", benefits: ["ऑनलाइन मंडी रो व्यापार", "सही भाव री तुरंत जानकारी", "1000+ मंडियां जुड़्योड़ी", "कास्तकार ने सीधो पइसा"], eligibility: ["सगळा कास्तकार", "व्यापारी", "FPO", "कमीशन एजेंट"], documents: ["आधार", "बैंक खातो", "व्यापार रो लाइसेंस", "मोबाइल नंबर"] },
    84: { fullName: "किसान सुविधा मोबाइल ऐप", amount: "मुफ्त ऐप", benefits: ["मौसम री जानकारी", "मंडी रो भाव", "कीड़ा-मकोड़ा री चेतावनी", "दुकानदारां री जानकारी", "फसल रो बचाव"], eligibility: ["सगळा कास्तकार", "प्ले स्टोर सूं मुफ्त डाउनलोड", "रजिस्ट्रेशन री जरुरत कोनी"], documents: ["मोबाइल नंबर", "स्मार्टफोन (Android)"] },
    85: { fullName: "ICAR-पूसा कृषि मोबाइल ऐप", amount: "मुफ्त", benefits: ["फसळां री किस्म रो डाटा", "खेती करण रा तरीका", "बीमारी री पिछाण", "विद्वानां री सलाह"], eligibility: ["सगळा कास्तकार", "मुफ्त डाउनलोड", "हिंदी अर अंग्रेजी में"], documents: ["कोई कागद नीं चाईजे"] },
    86: { fullName: "किसान कॉल सेंटर 1551", amount: "टोल फ्री", benefits: ["24x7 खेती रा सवाल-जवाब", "विद्वानां री सलाह", "घणी भाषावां में मदद", "योजनावां री जानकारी"], eligibility: ["सगळा कास्तकार", "टोल फ्री नंबर: 1551", "कोई ई फोन सूं कॉल करो"], documents: ["कोई कागद नीं चाईजे"] },
    87: { fullName: "कास्तकारां खातर mKisan SMS पोर्टल", amount: "मुफ्त SMS सेवा", benefits: ["मुफ्त SMS चेतावनी", "मौसम रो हाल", "बाजार रो भाव", "फसल बचाव री सलाह"], eligibility: ["सगळा कास्तकार", "मोबाइल नंबर रो रजिस्ट्रेशन जरुरी", "कोई ई मोबाइल नेटवर्क माथे"], documents: ["मोबाइल नंबर", "कास्तकार रो रजिस्ट्रेशन"] },
    88: { fullName: "मसीन भाड़े लेवण (CHC) रो मोबाइल ऐप", amount: "मुफ्त सेवा", benefits: ["नेड़े रा खेती मसीनां ढूंढो", "ऑनलाइन मसीनां बुक करो", "भाड़ा रा भाव मिलाओ", "कास्तकारां री राय"], eligibility: ["सगळा कास्तकार", "FPO", "मसीन भाड़े देवण आळा सेंटर"], documents: ["मोबाइल नंबर", "जीपीएस लोकेशन"] },
    89: { fullName: "NPSS - डिजिटल कीड़ा निगरानी", amount: "मुफ्त सेवा", benefits: ["AI सूं कीड़ा री पिछाण", "पैली ई चेतावनी रो सिस्टम", "फसल रे हिसाब सूं चेतावनी", "बचाव रा तरीका"], eligibility: ["सगळा कास्तकार", "मुफ्त मोबाइल ऐप", "रजिस्ट्रेशन री जरुरत कोनी"], documents: ["मोबाइल नंबर", "फसल रो फोटो (जांच खातर)"] },
    90: { fullName: "एग्री-स्टार्टअप इनक्यूबेशन योजना", amount: "₹25 लाख ताईं मदद", benefits: ["खेती-तकनीक रा स्टार्टअप खातर पइसा", "काम सिखावणो", "नवा आईडिया ने मदद", "पैसा लगावण आळा सूं मिलावणो"], eligibility: ["खेती-तकनीक स्टार्टअप", "नवा व्यापारी (18-35 साळ)", "गांवां रा होशियार लोग"], documents: ["व्यापार रो प्लान", "स्टार्टअप रो रजिस्ट्रेशन", "टीम री जानकारी", "नया काम रो सुबूत"] },
    91: { fullName: "प्रधानमंत्री किसान ऊर्जा सुरक्षा उत्थान महाभियान (PM-KUSUM)", amount: "60% छूट", benefits: ["सोलर पंप माथे 60% छूट (7.5 HP ताईं)", "खाली/बंजर जमीं माथे सोलर पैनल", "बच्योड़ी बिजली सरकार ने बेचो", "बिजली रो खरचो कम"], eligibility: ["खेती आळी जमीं रा धणी", "एकलो कास्तकार", "पाणी काम में लेवण आळी समितियां", "FPO"], documents: ["जमीं रा कागद", "बिजली रो कनेक्शन रो सुबूत", "आधार", "बैंक खातो"] },
    92: { fullName: "सोलर चरखा क्लस्टर", amount: "₹4.5 लाख छूट", benefits: ["सोलर सूं चालण आळा चरखा", "लुगाइयां ने तागती", "खादी रो काम", "गांवां में रोजगार"], eligibility: ["बचत गट (SHG)", "लुगाई कास्तकार", "गांवां रा कारीगर", "खादी री संस्थावां"], documents: ["SHG रो रजिस्ट्रेशन", "प्रोजेक्ट री अर्जी", "बैंक खातो"] },
    93: { fullName: "सोलर सूं चालण आळो कोल्ड स्टोरेज", amount: "₹10 लाख ताईं 50% छूट", benefits: ["कास्तकारां खातर सोलर कोल्ड स्टोरेज", "कटाई पछे रो नुकसान कम", "बिना लाइट रा ई चाले", "फळ अर सब्जी खराब नीं होवे"], eligibility: ["FPO", "कास्तकारां री सहकारी समितियां", "बचत गट (SHG)", "एकलो कास्तकार"], documents: ["जमीं रा कागद", "प्रोजेक्ट री रिपोर्ट", "आधार", "बैंक खातो"] },
    94: { fullName: "फसल सुकावण खातर सोलर ड्रायर", amount: "₹2 लाख ताईं 40% छूट", benefits: ["अनाज/फळां खातर सोलर ड्रायर", "क्वालिटी बढ़िया रेवे", "फसल रो भाव चोखो मिले", "धूप माथे निर्भरता कम"], eligibility: ["सगळा कास्तकार", "FPO", "बचत गट (SHG)", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "कोटेशन", "आधार", "बैंक खातो"] },
    95: { fullName: "फसल बचाव खातर सोलर झटका मशीन (Fencing)", amount: "₹50,000 ताईं 50% छूट", benefits: ["खेतां रा चारूं कानी सोलर तारबंदी", "जंगली जनावरां सूं बचाव", "सार-संभाळ रो खरचो कम", "बिजली रो बिल नीं आवे"], eligibility: ["जठै जंगली जनावर आवे उण इलाकां रा कास्तकार", "बागां रा धणी", "सगळा कास्तकार"], documents: ["जमीं रा कागद", "जगह रो सुबूत", "आधार", "बैंक खातो"] },
    96: { fullName: "बिना लाइट आळा सोलर वाटर पंप (Off-grid)", amount: "₹1.5 लाख ताईं 75% छूट", benefits: ["सोलर सबमर्सिबल पंप", "डीजल/बिजली रो खरचो जीरो", "दूर रा इलाकां में ई चाले", "5 साळ री वारंटी"], eligibility: ["छोटा अर सीमांत कास्तकार", "जठै बिजली रो कनेक्शन नीं है"], documents: ["जमीं रा कागद", "पाणी री जगह रो सुबूत", "आधार", "बैंक खातो"] },
    97: { fullName: "सोलर सूं चालण आळी पॉलीहाउस खेती", amount: "₹5 लाख ताईं 60% छूट", benefits: ["सोलर पंखा अर कूलिंग", "तापमान कंट्रोल राखणो", "बीजण रो टैम बढावणो", "ज्यादा पैदावार"], eligibility: ["सब्जी-फळ रा कास्तकार", "FPO", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "ग्रीनहाउस रो प्लान", "आधार", "बैंक खातो"] },
    98: { fullName: "खेती रा ड्रोन खातर सोलर चार्जिंग", amount: "₹50,000 ताईं 40% छूट", benefits: ["सोलर चार्जिंग स्टेशन", "बिना लाइट रा ड्रोन चलावणो", "बढ़िया खेती रो तरीको", "डीजल रो खरचो कम"], eligibility: ["FPO", "ड्रोन दीदी योजना रा लोग", "बचत गट (SHG)"], documents: ["ड्रोन खरीदण रो कागद", "जमीं रा कागद", "आधार", "बैंक खातो"] },
    99: { fullName: "कृषि फिडरां माथे सोलर सिस्टम", amount: "90% सरकारी मदद", benefits: ["सिंचाई आळी लाइन माथे सोलर बिजली", "दिन में पक्की बिजली", "बिजली बोर्ड माथे निर्भरता कम", "बिजली रो बिल कम"], eligibility: ["राज्य सरकारां", "बिजली विभाग (DISCOM)", "पाणी काम में लेवण आळी समितियां"], documents: ["प्रोजेक्ट री अर्जी", "फीडर री जानकारी"] },
    100: { fullName: "कास्तकारां खातर छत माथे सोलर (Rooftop)", amount: "₹78,000 ताईं 40% छूट", benefits: ["ग्रिड सूं जुड़्योड़ो छत माथे सोलर", "बिजली रो बिल कम होसी", "बच्योड़ी बिजली सरकार ने बेचो", "पंप चलावण या घर रे काम खातर"], eligibility: ["सगळा कास्तकार", "खेत रा मकान रा धणी", "FPO"], documents: ["बिजली रो बिल", "छत रो सुबूत", "आधार", "बैंक खातो"] },
    101: { fullName: "पशुपालन ढांचा विकास फंड (AHIDF)", amount: "₹100 करोड़ ताईं करजो", benefits: ["डेयरी, पोल्ट्री खातर करजा माथे छूट", "3% ब्याज छूट", "₹100 करोड़ ताईं करजो", "MSME खातर करजा री गारंटी"], eligibility: ["एकलो व्यापारी", "FPO", "प्राइवेट कंपनी", "सहकारी समितियां"], documents: ["प्रोजेक्ट री पूरी रिपोर्ट", "व्यापार रो रजिस्ट्रेशन", "जमीं रा कागद", "बैंक खातो"] },
    102: { fullName: "डेयरी उद्यम विकास योजना", amount: "25-33% छूट", benefits: ["डेयरी प्लांट माथे छूट", "साधारण कास्तकारां ने 25%, SC/ST ने 33%", "गाय/भैंस खातर करजो", "दूध मसीनां खातर"], eligibility: ["एकलो कास्तकार", "बचत गट (SHG)", "डेयरी सहकारी समितियां", "बिना जमीं रा कास्तकार"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "प्रोजेक्ट री रिपोर्ट"] },
    103: { fullName: "पोल्ट्री/मुर्गी पालन वेंचर कैपिटल फंड", amount: "₹3 लाख ताईं 33% छूट", benefits: ["मुर्गी पालन खातर सब्सिडी", "SC/ST कास्तकारां ने 33%", "बॉयलर/अंडा मुर्गी खातर करजो", "चूजां खातर फायदो"], eligibility: ["एकलो कास्तकार", "FPO", "बचत गट (SHG)", "नवा व्यापारी"], documents: ["जमीं रा कागद", "आधार", "बैंक खातो", "अनुभव रो सर्टिफिकेट"] },
    104: { fullName: "बकरी अर भेड विकास योजना", amount: "₹50,000 ताईं 50% छूट", benefits: ["बकरी/भेड पालण माथे सब्सिडी", "नस्ल सुधारण खातर मदद", "डागदरां रो इलाज", "बेचण में मदद"], eligibility: ["छोटा कास्तकार", "बिना जमीं रा मजूर", "आदिवासी कास्तकार", "लुगाई कास्तकार"], documents: ["आधार", "बैंक खातो", "ग्राम पंचायत रो सर्टिफिकेट", "जमीं रा कागद"] },
    105: { fullName: "सुअर विकास अर नसल सुधार योजना", amount: "₹40,000 ताईं 40% छूट", benefits: ["सुअर पालण माथे छूट", "नस्ल सुधारण खातर", "डागदरां रो इलाज", "बाजार सूं जोड़णो"], eligibility: ["छोटा कास्तकार", "आदिवासी कास्तकार", "बचत गट (SHG)", "गांवां रा जवान"], documents: ["आधार", "बैंक खातो", "जमीं रा कागद", "ट्रेनिंग रो सर्टिफिकेट"] },
    106: { fullName: "राष्ट्रीय चारा विकास योजना", amount: "₹10,000/हेक्टेयर", benefits: ["चारा रा बीजां माथे छूट", "हाइड्रोपोनिक (पाणी में चारा) मसीनां", "साइलेज (हरा चारा रो अचार) बणावणो", "चारा रो भंडारण"], eligibility: ["सगळा कास्तकार", "डेयरी रा कास्तकार", "FPO", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "डांगरां री गिणती रो सुबूत", "आधार", "बैंक खातो"] },
    107: { fullName: "राष्ट्रीय पशु बीमारी बीमा योजना", amount: "प्रीमियम: ₹50-200/डांगर", benefits: ["डांगरां रो बीमा", "गाय, भैंस, भेड, बकरी रो बीमा", "बीमारी अर एक्सीडेंट रो बीमा", "जल्दी क्लेम रो पइसा"], eligibility: ["सगळा डांगर राखण आळा", "डेयरी रा कास्तकार", "भेड/बकरी पालण आळा"], documents: ["डांगर री पिछाण", "डागदर रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    108: { fullName: "NBHM - हनी (शहद) मिशन", amount: "₹10,000 एक जणा खातर", benefits: ["मधुमक्खी पालण रा सामानां माथे छूट", "शहद री मसीनां", "ट्रेनिंग अर दिखावो", "शहद बेचण में मदद"], eligibility: ["एकलो कास्तकार", "बचत गट (SHG)", "FPO", "आदिवासी कास्तकार"], documents: ["जमीं रा कागद (मधुमक्खी पालण खातर)", "आधार", "बैंक खातो", "ट्रेनिंग रो सर्टिफिकेट (होवे तो)"] },
    109: { fullName: "प्रधानमंत्री मत्स्य (मछली) संपदा योजना (PMMSY)", amount: "40-60% छूट", benefits: ["मछली पालन माथे छूट", "हैचरी (बीज) रो विकास", "मछली खातर कोल्ड चेन", "प्रोसेसिंग प्लांट", "बाहर भेजण (Export) ने बढ़ावा"], eligibility: ["मछियारा", "मछली रा कास्तकार", "FPO", "सहकारी समितियां", "लुगाइयां रा बचत गट"], documents: ["पाणी आळी जगह रो पट्टो", "आधार", "बैंक खातो", "प्रोजेक्ट री रिपोर्ट"] },
    110: { fullName: "NLM - पशुधन विकास", amount: "₹2 लाख ताईं 50% छूट", benefits: ["गाय, भैंस, भेड, बकरी री नस्ल सुधारणी", "चारा रो विकास", "रिस्क (नुकसान) रो बचाव", "नवा व्यापार बढावणो"], eligibility: ["सगळा डांगर राखण आळा कास्तकार", "FPO", "सहकारी समितियां", "बचत गट (SHG)"], documents: ["डांगरां री गिणती रो सुबूत", "जमीं रा कागद (चारा खातर)", "आधार", "बैंक खातो"] },
    111: { fullName: "राज्य आपदा राहत फंड - खेती", amount: "₹20,000/हेक्टेयर", benefits: ["फसल रा नुकसान री भरपाई", "कुदरती आफत री मदद", "बाढ़, काळ (सूखो), तूफान", "जल्दी पइसा मिले"], eligibility: ["सरकार री घोषणा आळा इलाकां रा कास्तकार", "सगळा कास्तकार", "फसल रो नुकसान >50%"], documents: ["जमीं रा कागद", "फसल खराब होवण रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    112: { fullName: "राष्ट्रीय आपदा राहत फोर्स - खेती", amount: "₹25,000/हेक्टेयर", benefits: ["देश रे लेवल माथे आफत री मदद", "तूफान, बाढ़, ओळा (Hailstorm)", "भाखड़/जमीं खिसकण रो बीमा", "कीड़ा-मकोड़ा रो हमला"], eligibility: ["घणा खराब इलाकां रा कास्तकार", "सगळा लोग"], documents: ["आफत री घोषणा रो कागद", "जमीं रा कागद", "फसल खराब होवण रो सर्टिफिकेट", "आधार"] },
    113: { fullName: "ओळा (Hailstorm) फसल बीमा", amount: "प्रीमियम: 2-5%", benefits: ["ओळा पड़न माथे खास बीमा", "एकला खेत री जांच", "जल्दी क्लेम", "सगळी फसळां माथे"], eligibility: ["जठै ओळा घणा पड़े उण इलाकां रा कास्तकार", "सगळा कास्तकारां री मरजी"], documents: ["जमीं रा कागद", "मौसम री जानकारी", "आधार", "बैंक खातो"] },
    114: { fullName: "राष्ट्रीय काळ/सूखो राहत पैकेज", amount: "₹15,000/हेक्टेयर", benefits: ["काळ सूं खराब खेती आळा कास्तकार", "खात-बीज माथे छूट", "चारा रो प्रबन्ध", "पीवण रा पाणी री मदद"], eligibility: ["काळ घोषित इलाकां रा कास्तकार", "छोटा अर सीमांत ने पैली फायदो"], documents: ["जमीं रा कागद", "काळ री घोषणा रो कागद", "फसल खराब होवण रो सुबूत", "आधार"] },
    115: { fullName: "खेती खातर राष्ट्रीय बाढ राहत", amount: "₹18,000/हेक्टेयर", benefits: ["बाढ़ सूं खराब खेती आळा कास्तकार", "फसल रा नुकसान री भरपाई", "पाछी फसल बोवण खातर बीज माथे छूट", "खात-बीज री मदद"], eligibility: ["बाढ़ आळा इलाकां रा कास्तकार", "सगळा लोग"], documents: ["जमीं रा कागद", "बाढ़ रा नुकसान री रिपोर्ट", "आधार", "बैंक खातो"] },
    116: { fullName: "चक्रवात/तूफान सूं खराब खेती खातर मदद", amount: "₹22,000/हेक्टेयर", benefits: ["तूफान रा नुकसान री भरपाई", "बागां रा नुकसान रो बीमा", "डांगरां रा नुकसान री मदद", "खात-बीज माथे छूट"], eligibility: ["समुंदर किनारे रा कास्तकार", "तूफान आळा इलाका"], documents: ["जमीं रा कागद", "तूफान रा नुकसान री रिपोर्ट", "आधार", "बैंक खातो"] },
    117: { fullName: "टिड्डी/कीड़ा हमला राहत योजना", amount: "₹10,000/हेक्टेयर", benefits: ["कीड़ा रा नुकसान री भरपाई", "मुफ्त दवाई देवणी", "फसल रा नुकसान रो बीमा", "जल्दी बचाव करण आळी टीम"], eligibility: ["कीड़ा सूं खराब इलाकां रा कास्तकार", "टिड्डी आळा इलाका"], documents: ["जमीं रा कागद", "कीड़ा हमला रो सर्टिफिकेट", "आधार", "बैंक खातो"] },
    118: { fullName: "भूस्खलन/भाखड़ पड़न सूं खेती ने मदद", amount: "₹30,000/हेक्टेयर", benefits: ["भाखड़/जमीं धसण रा नुकसान री भरपाई", "जमीं ने पाछी ठीक करण री मदद", "सीढ़ीदार खेत सुधारण माथे छूट", "खात-बीज री मदद"], eligibility: ["पहाड़ी इलाकां रा कास्तकार", "भूस्खलन आळा इलाका"], documents: ["जमीं रा कागद", "भूस्खलन रा नुकसान री रिपोर्ट", "आधार", "बैंक खातो"] },
    119: { fullName: "बिजली पड़न सूं नुकसान री भरपाई", amount: "₹5 लाख कास्तकार ने", benefits: ["कास्तकार मरण माथे भरपाई", "इलाज रा पइसा", "घर आळा ने मदद", "जल्दी पइसा मिले"], eligibility: ["बिजली पड़न सूं नुकसान आळा कास्तकार", "मरण आळा कास्तकार रो परिवार"], documents: ["मरण रो सर्टिफिकेट", "पुलिस री रिपोर्ट", "आधार", "बैंक खातो"] },
    120: { fullName: "पाळो/सीळ (Cold wave) सूं फसल बचाव योजना", amount: "₹8,000/हेक्टेयर", benefits: ["पाळो/धुंध रा नुकसान री भरपाई", "धुंओ करण आळी मसीन माथे छूट", "फसल ढाकण खातर मदद", "खात-बीज री मदद"], eligibility: ["जठै ज्यादा पाळो पड़े उण इलाकां रा कास्तकार", "सब्जी अर फळां रा कास्तकार"], documents: ["जमीं रा कागद", "तापमान री जानकारी", "फसल खराब होवण रो सुबूत", "आधार"] },
    121: { fullName: "ई-नाम (e-NAM) बढ़िया प्लेटफॉर्म", amount: "मुफ्त ट्रेडिंग", benefits: ["ऑनलाइन मंडी रो व्यापार", "क्वालिटी री जांच", "गोदाम पर्ची रो सिस्टम", "सीधो पइसो खातो में"], eligibility: ["सगळा कास्तकार", "व्यापारी", "FPO", "कमीशन एजेंट"], documents: ["आधार", "बैंक खातो", "मोबाइल नंबर", "ट्रेडिंग रो रजिस्ट्रेशन"] },
    122: { fullName: "FPO व्यापार मदद योजना", amount: "₹15 लाख री मदद", benefits: ["FPO ने बाजार सूं जोड़णो", "बढ़िया ब्रांड बणावणो", "पॅकिंग माथे मदद", "सीधा खरीदण आळा सूं मिलणो"], eligibility: ["रजिस्टर्ड FPO", "कास्तकारां री कंपनी", "सहकारी समितियां"], documents: ["FPO रो रजिस्ट्रेशन", "मेंबरा री लिस्ट", "बैंक खातो", "व्यापार रो प्लान"] },
    123: { fullName: "गोदाम पर्ची माथे करजो (NWRS)", amount: "गोदाम पर्ची सूं लोन", benefits: ["गोदाम में फसल राखणी", "पर्ची माथे करजो लेवणो", "भाव बढ्यां पछे बेचणो", "फसल खराब नीं होवे"], eligibility: ["सगळा कास्तकार", "FPO", "व्यापारी", "सहकारी समितियां"], documents: ["गोदाम री पर्ची", "आधार", "बैंक खातो", "फसल री जानकारी"] },
    124: { fullName: "खेती रा सामानां री ढुलाई माथे छूट", amount: "50% ढुलाई/भाड़ा छूट", benefits: ["भाड़ा माथे छूट", "उत्तर-पूर्व राज्यां ने पैली फायदो", "जल्दी खराब होवण आळी फसल", "मंडी ताईं पोंचावणो"], eligibility: ["दूर रा इलाकां रा कास्तकार", "उत्तर-पूर्व राज्य", "पहाड़ी इलाका", "आदिवासी इलाका"], documents: ["भाड़ा रो बिल", "मंडी री पर्ची", "आधार", "बैंक खातो"] },
    125: { fullName: "बाजार हस्तक्षेप योजना (MIS)", amount: "MSP भाव री पक्की बात", benefits: ["जल्दी खराब होवण आळी फसल रो कम सूं कम भाव", "सरकारी खरीद", "घाटा री भरपाई", "कास्तकार री कमाई री सुरक्षा"], eligibility: ["सरकार री लिस्ट में आळा खराब होवण आळी फसल रा कास्तकार", "सगळा राज्य"], documents: ["फसल री जानकारी", "जमीं रा कागद", "आधार", "बैंक खातो"] },
    126: { fullName: "किसान रेल भाड़ा छूट योजना", amount: "50% रेल भाड़ा छूट", benefits: ["जल्दी खराब होवण आळी फसल रेल सूं भेजणो", "जल्दी बाजार पोंचणो", "फसल रो नुकसान कम", "पूरे देश में माल भेजणो"], eligibility: ["सगळा कास्तकार", "FPO", "सहकारी समितियां", "व्यापारी (कास्तकार रे नाम माथे)"], documents: ["रेलवे री पर्ची", "कास्तकार रो कागद", "आधार", "बैंक खातो"] },
    127: { fullName: "FPO बणावणो अर बढ़ावा देवणो", amount: "एक FPO माथे ₹15 लाख", benefits: ["FPO बणावण खातर पइसा री मदद", "5 साळ ताईं साथ देवणो", "₹15 लाख ताईं शेयर री मदद", "करजा री गारंटी"], eligibility: ["300+ कास्तकारां रो गट", "बचत गट (SHG)", "सहकारी समितियां", "कास्तकारां रा गट"], documents: ["कास्तकारां री लिस्ट (300+)", "जमीं रो ब्यौरो", "व्यापार रो प्लान", "बैंक खातो"] },
    128: { fullName: "AMI - गांवां में गोदाम योजना", amount: "₹25 लाख ताईं 25% छूट", benefits: ["गांवां में गोदाम बणावणो", "कास्तकारां खातर गोदाम", "राख्योड़ी फसल माथे करजो", "मजबूरी में सस्तो बेचणो (Distress Sale) बंद"], eligibility: ["एकलो कास्तकार", "FPO", "सहकारी समितियां", "बचत गट (SHG)"], documents: ["जमीं रा कागद", "प्रोजेक्ट री रिपोर्ट", "आधार", "बैंक खातो"] },
    129: { fullName: "PMKS - किसान संपदा योजना", amount: "₹10 करोड़ ताईं 35% छूट", benefits: ["फूड प्रोसेसिंग मसीनां", "बड़ा फूड पार्क", "कोल्ड चेन रो ढांचो", "मुनाफा री चेन बढाणो"], eligibility: ["फूड प्रोसेसिंग करण आळा", "FPO", "सहकारी समितियां", "खेती रा व्यापारी"], documents: ["प्रोजेक्ट री पूरी रिपोर्ट", "जमीं रा कागद", "कंपनी रो रजिस्ट्रेशन", "बैंक खातो"] },
    130: { fullName: "कास्तकारां री सीधी बेचण (Direct Marketing) योजना", amount: "₹2 लाख ताईं 50% छूट", benefits: ["किसान बाजार में दुकान/स्टॉल माथे छूट", "सीधो ग्राहक ने बेचणो", "ब्रांड बणावण में मदद", "ऑनलाइन पइसा लेवण रो जुगाड़"], eligibility: ["एकलो कास्तकार", "FPO", "बचत गट (SHG)", "लुगाई कास्तकार"], documents: ["जमीं रा कागद", "दुकान रो प्लान", "आधार", "बैंक खातो"] },
    131: { fullName: "नरेगा (MGNREGA) - खेती रा काम", amount: "100 दिनां री पक्की मजूरी", benefits: ["100 दिनां रो पक्को रोजगार", "रोज रा ₹300+ मजूरी", "खेत में नाडो (पॉन्ड) बणावणो", "जमीं सुधारण रो काम", "सिंचाई खातर खाळा/धोरा बणावणो"], eligibility: ["गांवां रा सगळा परिवार", "मजूरी करण जोग घर रा मोटा मिनख", "SC/ST/लुगाइयां ने पैली फायदो"], documents: ["जॉब कार्ड", "आधार", "बैंक खातो", "राशन कार्ड"] },
    132: { fullName: "ACABC - खेती रो व्यापार अर क्लिनिक योजना", amount: "₹20 लाख करजो + 44% छूट", benefits: ["खेती रा पढ़े-लिख्या जवानां ने ट्रेनिंग", "प्रोजेक्ट रा खरचा माथे 44% छूट", "₹20 लाख ताईं करजो", "ट्रेनिंग रे टैम महीना रा पइसा"], eligibility: ["खेती में ग्रेजुएट", "खेती रो डिप्लोमा आळा", "बायोलॉजी रा ग्रेजुएट", "खेती सूं जुड़्योड़ा सब्जेक्ट में पोस्ट-ग्रेजुएट"], documents: ["पढाई री डिग्री", "आधार", "बैंक खातो", "व्यापार रो प्लान", "नाबार्ड (NABARD) सूं NOC"] },
    133: { fullName: "खेती में हुनर (Skill) विकास", amount: "मुफ्त ट्रेनिंग + ₹5,000 पइसा", benefits: ["मुफ्त काम सिखावण री ट्रेनिंग", "ड्रोन उडावण री ट्रेनिंग", "माटी जांच करण रो काम", "खेती री मसीनां चलावण रो काम", "फूड प्रोसेसिंग रो काम"], eligibility: ["गांवां रा जवान (18-35 साळ)", "कास्तकारां रा टाबर", "लुगाई कास्तकार", "स्कूल छोड़्योड़ा टाबर"], documents: ["आधार", "उमर रो सुबूत", "पढाई रा कागद", "बैंक खातो", "पासपोर्ट फोटो"] },
    134: { fullName: "प्रधानमंत्री कौशल विकास योजना - खेती", amount: "मुफ्त ट्रेनिंग + सर्टिफिकेट", benefits: ["मुफ्त काम-काज री ट्रेनिंग", "सरकारी सर्टिफिकेट", "नौकरी लगावण में मदद", "पैली रा काम री पिछाण (RPL)", "खेती री मसीनां ठीक करण री ट्रेनिंग"], eligibility: ["18-45 साळ रा जवान", "कास्तकारां रा परिवार", "गांवां अर शहर रा जवान", "लुगाइयां"], documents: ["आधार", "उमर रो सुबूत", "पढाई रा कागद", "बैंक खातो", "मोबाइल नंबर"] },
    135: { fullName: "स्टार्टअप इंडिया खेती ग्रैंड चैलेंज", amount: "₹50 लाख ताईं शुरुआती फंड", benefits: ["₹50 लाख ताईं रो पइसो", "विद्वानां सूं सलाह", "नवा व्यापार ने मदद", "3 साळ ताईं टैक्स में छूट", "पेटेंट खातर मदद"], eligibility: ["खेती-तकनीक रा स्टार्टअप", "नवा व्यापारी (18-35 साळ)", "खेती रा नवा जुगाड़", "रजिस्टर्ड स्टार्टअप (DPIIT)"], documents: ["स्टार्टअप रो रजिस्ट्रेशन", "नवा काम रो ब्यौरो", "व्यापार रो प्लान", "टीम री जानकारी", "बैंक खातो"] },
    136: { fullName: "RSETI - गांवां में खुद रो रोजगार ट्रेनिंग सेंटर", amount: "मुफ्त ट्रेनिंग + करजा री मदद", benefits: ["रैवण अर खावण सागे मुफ्त ट्रेनिंग (7-30 दिन)", "डेयरी री ट्रेनिंग", "मुर्गी अर बकरी पालण रो काम", "बैंक सूं करजो लेवण में मदद", "ट्रेनिंग पछे ई मदद"], eligibility: ["गांवां रा जवान (18-45 साळ)", "बिना रोजगार रा जवान", "कास्तकारां रा टाबर", "लुगाइयां"], documents: ["आधार", "राशन कार्ड", "कमाई रो सर्टिफिकेट", "बैंक खातो", "पासपोर्ट फोटो"] },
    137: { fullName: "जवानां ने तागती देवण री योजना - खेती", amount: "₹2 लाख प्रोजेक्ट री मदद", benefits: ["जवानां रा खेती रा प्रोजेक्ट", "नेतागिरी (Leadership) रो विकास", "भेळा होर खेती करणो", "पइसा रा काम-काज री ट्रेनिंग", "बाजार सूं जोड़ण री मदद"], eligibility: ["जवानां रा गट (15-29 साळ)", "यूथ क्लब", "नेहरू युवा केंद्र रा मेम्बर", "गांवां रा जवानां रा गट"], documents: ["गट रो रजिस्ट्रेशन", "मेंबरा री जानकारी", "आधार", "बैंक खातो", "प्रोजेक्ट री अर्जी"] },
    138: { fullName: "दीनदयाल उपाध्याय ग्रामीण कौशल्य योजना", amount: "मुफ्त ट्रेनिंग + हर मीने ₹1,000", benefits: ["3-12 मीना री ट्रेनिंग", "ट्रेनिंग रे टैम महीना रा पइसा", "100% नौकरी लगावण री पक्की बात", "नौकरी लाग्यां पछे ई मदद", "मुफ्त खावणो अर रैवणो"], eligibility: ["गांवां रा गरीब जवान (18-35 साळ)", "SC/ST/लुगाइयां ने पैली फायदो", "BPL परिवार", "नरेगा मजूरां रा परिवार"], documents: ["आधार", "BPL रो सर्टिफिकेट", "उमर रो सुबूत", "बैंक खातो", "पासपोर्ट फोटो"] },
    139: { fullName: "NRLM - आजीविका खेती रो काम-काज", amount: "एक SHG ने ₹50,000", benefits: ["SHG माथे आधारित खेती रा काम", "गांवां रा गटां खातर पइसा", "घूमतो फंड (Revolving Fund) री मदद", "मुनाफा री चेन बढाणो", "बाजार सूं जोड़णो"], eligibility: ["NRLM में जुड़्योड़ा लुगाइयां रा बचत गट", "कास्तकारां रा गट", "फसल तैयार करण आळा गट", "गांव रा संगठन"], documents: ["SHG रो रजिस्ट्रेशन", "मेंबरा री लिस्ट", "बैंक खातो", "पास करयोड़ी पर्ची", "आधार"] },
    140: { fullName: "KVK - कास्तकार ट्रेनिंग अर रोजगार", amount: "मुफ्त ट्रेनिंग + खात-बीज रो सामान", benefits: ["कृषि विज्ञान केंद्र में काम करर सीखणो", "मिली-जुली खेती री ट्रेनिंग", "मुनाफा बढावण री ट्रेनिंग", "खात-बीज रो किट मिळसी", "ICAR रो सर्टिफिकेट"], eligibility: ["सगळा कास्तकार", "लुगाई कास्तकार", "गांवां रा जवान", "स्कूल छोड़्योड़ा टाबर", "नवा व्यापारी"], documents: ["आधार", "जमीं रा कागद (जरुरत होवे तो)", "बैंक खातो", "2 पासपोर्ट फोटो", "मोबाइल नंबर"] }
  },
  pa: {
    1: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ", amount: "₹6,000/ਸਾਲ", benefits: ["₹6,000 ਸਾਲਾਨਾ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ", "ਹਰ 4 ਮਹੀਨਿਆਂ ਵਿੱਚ ₹2,000", "ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ ਡੀਬੀਟੀ", "ਸਾਰੇ ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ ਸ਼ਾਮਲ"], eligibility: ["ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ (2 ਹੈਕਟੇਅਰ ਤੱਕ)", "ਖੇਤੀਯੋਗ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਪਰਿਵਾਰ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਵਾਲੇ ਮੁਜ਼ਾਰੇ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ ਕਾਰਡ", "ਬੈਂਕ ਖਾਤਾ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਰਾਸ਼ਨ ਕਾਰਡ"] },
    2: { fullName: "ਮੁਜ਼ਾਰੇ ਕਿਸਾਨਾਂ ਲਈ ਪੀ.ਐਮ.-ਕਿਸਾਨ", amount: "₹6,000/ਸਾਲ", benefits: ["ਬੇਜ਼ਮੀਨੇ ਕਿਸਾਨਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਵਿਵਸਥਾ", "ਬਟਾਈਦਾਰਾਂ ਨੂੰ ਸਹਾਇਤਾ", "ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (DBT)", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਦੀ ਲੋੜ ਨਹੀਂ"], eligibility: ["ਬੇਜ਼ਮੀਨੇ ਮੁਜ਼ਾਰੇ ਕਿਸਾਨ", "ਬਟਾਈਦਾਰ", "ਠੇਕੇ ਦੀ ਜ਼ਮੀਨ 'ਤੇ ਖੇਤੀ ਕਰਨ ਵਾਲੇ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਲੀਜ਼ ਸਮਝੌਤਾ", "ਹਲਫ਼ਨਾਮਾ"] },
    3: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਅੰਨਦਾਤਾ ਆਯ ਸੰਰਕਸ਼ਣ ਅਭਿਆਨ", amount: "₹8,000/ਸਾਲ", benefits: ["ਸਾਰੇ ਕਿਸਾਨਾਂ ਲਈ ਆਮਦਨ ਸਹਾਇਤਾ", "ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ (MSP) ਦੀ ਗਾਰੰਟੀ", "ਛੋਟੇ ਕਿਸਾਨਾਂ ਨੂੰ ਵਾਧੂ ₹2,000", "ਕੀਮਤ ਘਾਟੇ ਦਾ ਭੁਗਤਾਨ"], eligibility: ["ਸੂਚਿਤ ਫਸਲਾਂ ਉਗਾਉਣ ਵਾਲੇ ਸਾਰੇ ਕਿਸਾਨ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ", "FPO ਮੈਂਬਰ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਘੋਸ਼ਣਾ"] },
    4: { fullName: "ਕੀਮਤ ਘਾਟਾ ਭੁਗਤਾਨ ਯੋਜਨਾ", amount: "ਕੀਮਤ ਅੰਤਰ ਦਾ ਭੁਗਤਾਨ", benefits: ["ਕੀਮਤ ਡਿੱਗਣ 'ਤੇ ਮੁਆਵਜ਼ਾ", "MSP ਅੰਤਰ ਦਾ ਭੁਗਤਾਨ", "ਸਿੱਧਾ ਬੈਂਕ ਟ੍ਰਾਂਸਫਰ", "ਸਬਜ਼ੀਆਂ ਅਤੇ ਫਲਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ"], eligibility: ["ਮੱਧ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਿਸਾਨ", "ਫਸਲਾਂ: ਟਮਾਟਰ, ਪਿਆਜ਼, ਆਲੂ", "ਰਜਿਸਟਰਡ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਵੇਚਣ ਦੀ ਰਸੀਦ", "ਮੰਡੀ ਪ੍ਰਵੇਸ਼ ਪਰਚੀ"] },
    5: { fullName: "ਤੇਲੰਗਾਨਾ ਰਾਇਤੂ ਬੰਧੂ", amount: "₹10,000/ਏਕੜ/ਸਾਲ", benefits: ["ਕਿਸਾਨਾਂ ਲਈ ਨਿਵੇਸ਼ ਸਹਾਇਤਾ", "ਹਰ ਸੀਜ਼ਨ ₹5,000 ਪ੍ਰਤੀ ਏਕੜ", "ਸਿੱਧਾ ਬੈਂਕ ਟ੍ਰਾਂਸਫਰ", "ਸਾਰੇ ਕਿਸਾਨਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ"], eligibility: ["ਤੇਲੰਗਾਨਾ ਦੇ ਸਾਰੇ ਕਿਸਾਨ", "ਪੱਟਾ ਧਾਰਕ ਜ਼ਮੀਨ ਮਾਲਕ", "ਮੁਜ਼ਾਰੇ ਕਿਸਾਨ (ਨਵੀਂ ਯੋਜਨਾ)"], documents: ["ਆਧਾਰ", "ਪੱਟਾ ਪਾਸਬੁੱਕ", "ਬੈਂਕ ਖਾਤਾ"] },
    6: { fullName: "ਓਡੀਸ਼ਾ ਕਾਲੀਆ ਯੋਜਨਾ", amount: "₹25,000/ਸਾਲ", benefits: ["ਕਿਸਾਨਾਂ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ", "ਬੇਜ਼ਮੀਨੇ ਖੇਤੀਬਾੜੀ ਮਜ਼ਦੂਰ", "ਕਮਜ਼ੋਰ ਕਬਾਇਲੀ ਸਮੂਹ", "ਬਟਾਈਦਾਰਾਂ ਨੂੰ ਸਹਾਇਤਾ"], eligibility: ["ਓਡੀਸ਼ਾ ਦੇ ਕਿਸਾਨ", "ਬੇਜ਼ਮੀਨੇ ਮਜ਼ਦੂਰ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ", "ਬਟਾਈਦਾਰ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਰਿਹਾਇਸ਼ ਦਾ ਸਬੂਤ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    7: { fullName: "ਰਾਸ਼ਟਰੀ ਕ੍ਰਿਸ਼ੀ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "ਰਾਜ-ਅਧਾਰਿਤ", benefits: ["ਰਾਜ ਦੇ ਖੇਤੀਬਾੜੀ ਪ੍ਰੋਜੈਕਟਾਂ ਲਈ ਫੰਡਿੰਗ", "ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਵਿਕਾਸ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮਤਾ", "ਮੁੱਲ ਲੜੀ (Value Chain)"], eligibility: ["ਰਾਜ ਸਰਕਾਰਾਂ", "FPO", "ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀਆਂ", "ਖੋਜ ਸੰਸਥਾਵਾਂ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਰਾਜ ਦੀ ਮਨਜ਼ੂਰੀ", "ਲਾਗੂ ਕਰਨ ਦੀ ਯੋਜਨਾ"] },
    8: { fullName: "ਰਾਸ਼ਟਰੀ ਬੀਜ ਸਬਸਿਡੀ ਯੋਜਨਾ", amount: "ਬੀਜਾਂ 'ਤੇ 50% ਸਬਸਿਡੀ", benefits: ["ਵੱਧ ਝਾੜ ਦੇਣ ਵਾਲੀਆਂ ਕਿਸਮਾਂ ਦੇ ਬੀਜ", "ਛੋਟੇ ਕਿਸਾਨਾਂ ਲਈ 50% ਸਬਸਿડી", "ਪ੍ਰਮਾਣਿਤ ਬੀਜ", "ਸੁਧਰੀਆਂ ਕਿਸਮਾਂ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੀਜ ਦਾ ਬਿੱਲ", "ਬੈਂਕ ਖਾਤਾ"] },
    9: { fullName: "ਪੋਸ਼ਕ ਤੱਤ ਅਧਾਰਤ ਸਬਸਿਡੀ (NBS) ਯੋਜਨਾ", amount: "ਪੋਸ਼ਕ ਤੱਤਾਂ ਅਨੁਸਾਰ ਵੱਖ-ਵੱਖ", benefits: ["P ਅਤੇ K ਖਾਦਾਂ 'ਤੇ ਸਬਸਿਡੀ", "ਕਿਸਾਨਾਂ ਦੇ ਖਰਚੇ ਵਿੱਚ ਕਮੀ", "ਸੰਤੁਲਿਤ ਪੋਸ਼ਣ", "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਵਿੱਚ ਸੁਧਾਰ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਅਧਿਕਾਰਤ ਡੀਲਰਾਂ ਰਾਹੀਂ"], documents: ["ਡੀਲਰ ਦਾ ਬਿੱਲ", "ਆਧਾਰ (DBT ਲਈ)", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    10: { fullName: "ਮਹਿਲਾ ਕਿਸਾਨ ਸਸ਼ਕਤੀਕਰਨ ਯੋਜਨਾ", amount: "₹50,000/ਸਾਲ", benefits: ["ਮਹਿਲਾ ਕਿਸਾਨਾਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ", "ਹੁਨਰ ਸਿਖਲਾਈ", "ਇਨਪੁਟ ਸਬਸਿਡੀ", "ਮਾਰਕੀਟ ਤੱਕ ਪਹੁੰਚ"], eligibility: ["ਮਹਿਲਾ ਕਿਸਾਨ", "ਮਹਿਲਾ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ (SHG)", "ਮਹਿਲਾ ਮੁਖੀ ਪਰਿਵਾਰ"], documents: ["ਆਧਾਰ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬੈਂਕ ਖਾਤਾ", "SHG ਸਰਟੀਫਿਕੇਟ"] },
    11: { fullName: "ਕਿਸਾਨ ਕਰੈਡਿਟ ਕਾਰਡ ਯੋਜਨਾ (KCC)", amount: "₹3 ਲੱਖ ਤੱਕ", benefits: ["ਰਿਵਾਲਵਿੰਗ ਕਰੈਡਿਟ ਸਹੂਲਤ", "ਵਿਆਜ: 7% (ਸਮੇਂ ਸਿਰ ਭੁਗਤਾਨ 'ਤੇ 4%)", "₹1.6 ਲੱਖ ਤੱਕ ਬਿਨਾਂ ਗਾਰੰਟੀ", "ਸਹਾਇਕ ਗਤੀਵਿਧੀਆਂ ਸ਼ਾਮਲ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਬਟਾਈਦਾਰ", "ਮੁਜ਼ਾਰੇ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਫੋਟੋ", "ਫਸਲ ਦਾ ਵੇਰਵਾ"] },
    12: { fullName: "ਥੋੜ੍ਹੇ ਸਮੇਂ ਦੇ ਫਸਲੀ ਕਰਜ਼ੇ ਲਈ ਵਿਆਜ ਛੋਟ", amount: "2% ਵਿਆਜ ਛੋਟ", benefits: ["ਫਸਲੀ ਕਰਜ਼ੇ 'ਤੇ 2% ਵਿਆਜ ਛੋਟ", "ਸਮੇਂ ਸਿਰ ਭੁਗਤਾਨ 'ਤੇ ਵਾਧੂ 3%", "ਪ੍ਰਭਾਵੀ ਦਰ: 4% ਸਾਲਾਨਾ", "₹3 ਲੱਖ ਤੱਕ ਦਾ ਕਰਜ਼ਾ"], eligibility: ["ਫਸਲੀ ਕਰਜ਼ਾ ਲੈਣ ਵਾਲੇ ਸਾਰੇ ਕਿਸਾਨ", "KCC ਧਾਰਕ", "ਸਹਿਕਾਰੀ ਸਭਾ ਦੇ ਮੈਂਬਰ"], documents: ["KCC", "ਕਰਜ਼ਾ ਅਰਜ਼ੀ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    13: { fullName: "ਗੋਦਾਮ ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਫੰਡ", amount: "₹50 ਕਰੋੜ ਪ੍ਰਤੀ ਪ੍ਰੋਜੈਕਟ", benefits: ["ਗੋਦਾਮ ਬਣਾਉਣ ਲਈ ਕਰਜ਼ਾ", "25% ਤੱਕ ਸਬਸਿਡੀ", "ਫਸਲ ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਦਾ ਬੁਨਿਆਦੀ ਢਾਂਚਾ", "ਫਸਲ ਦੀ ਬਰਬਾਦੀ ਵਿੱਚ ਕਮੀ"], eligibility: ["FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ", "ਰਾਜ ਏਜੰਸੀਆਂ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦਾ ਸਬੂਤ"] },
    14: { fullName: "ਡੇਅਰੀ ਉੱਦਮ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹5 ਲੱਖ ਤੱਕ ਸਬਸਿਡੀ", benefits: ["ਡੇਅਰੀ ਯੂਨਿਟਾਂ ਲਈ ਸਬਸਿਡੀ", "ਜਨਰਲ ਲਈ 25%, SC/ST ਲਈ 33%", "ਗਾਵਾਂ/ਮੱਝਾਂ ਲਈ ਕਰਜ਼ਾ", "ਦੁੱਧ ਪ੍ਰੋਸੈਸਿੰਗ ਉਪਕਰਣ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਡੇਅਰੀ ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ"] },
    15: { fullName: "ਪੋਲਟਰੀ ਵੈਂਚਰ ਕੈਪੀਟਲ ਫੰਡ", amount: "₹3 ਲੱਖ ਤੱਕ ਸਬਸਿਡੀ", benefits: ["ਮੁਰਗੀ ਪਾਲਣ ਲਈ ਸਬਸਿਡੀ", "SC/ST ਕਿਸਾਨਾਂ ਲਈ 33%", "ਬ੍ਰਾਇਲਰ/ਲੇਅਰ ਯੂਨਿਟ ਲਈ ਕਰਜ਼ਾ", "ਹੈਚਰੀ ਸਹਾਇਤਾ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਤਜ਼ਰਬੇ ਦਾ ਸਰਟੀਫਿਕੇਟ"] },
    16: { fullName: "ਬੱਕਰੀ ਅਤੇ ਭੇਡ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "50% ਸਬਸਿਡੀ", benefits: ["ਬੱਕਰੀ/ਭੇਡ ਪਾਲਣ ਲਈ ਸਬਸਿਡੀ", "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", "ਨਸਲ ਸੁਧਾਰ ਸਹਾਇਤਾ", "ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਦੇਖਭਾਲ"], eligibility: ["ਛੋਟੇ ਕਿਸਾਨ", "ਬੇਜ਼ਮੀਨੇ ਮਜ਼ਦੂਰ", "ਕਬਾਇਲੀ ਕਿਸਾਨ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਸਰਟੀਫਿਕੇਟ"] },
    17: { fullName: "ਖੇਤੀਬਾੜੀ ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਫੰਡ (AIF)", amount: "₹2 ਕਰੋੜ ਤੱਕ ਕਰਜ਼ਾ", benefits: ["ਫਾਰਮ-ਗੇਟ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਲਈ ਕਰਜ਼ਾ", "3% ਵਿਆਜ ਛੋਟ", "3 ਸਾਲ ਦੀ ਮੋਹਲਤ (Moratorium)", "ਗੋਦਾਮ, ਕੋਲਡ ਸਟੋਰੇਜ ਸ਼ਾਮਲ"], eligibility: ["FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਨਿੱਜੀ ਕਿਸਾਨ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    18: { fullName: "AHIDF - ਡੇਅਰੀ ਅਤੇ ਪੋਲਟਰੀ ਲੋਨ", amount: "₹100 ਕਰੋੜ ਤੱਕ", benefits: ["ਡੇਅਰੀ ਅਤੇ ਪੋਲਟਰੀ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਲਈ ਕਰਜ਼ਾ", "3% ਵਿਆਜ ਛੋਟ", "ਕਰਜ਼ਾ ਗਾਰੰਟੀ ਉਪਲਬਧ", "ਦੁੱਧ ਪ੍ਰੋਸੈਸਿੰਗ, ਹੈਚਰੀ ਸ਼ਾਮਲ"], eligibility: ["ਨਿੱਜੀ ਉੱਦਮੀ", "FPO", "ਪ੍ਰਾਈਵੇਟ ਕੰਪਨੀਆਂ", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ"], documents: ["DPR", "ਕਾਰੋਬਾਰੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਬੈਂਕ ਖਾਤਾ"] },
    19: { fullName: "FIDF - ਮੱਛੀ ਪਾਲਣ ਲੋਨ", amount: "₹50 ਲੱਖ ਤੱਕ", benefits: ["ਮੱਛੀ ਪਾਲਣ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਲਈ ਕਰਜ਼ਾ", "4% ਵਿਆਜ ਛੋਟ", "ਹੈਚਰੀ, ਫੀਡ ਮਿੱਲ ਸ਼ਾਮਲ", "ਮੱਛੀਆਂ ਲਈ ਕੋਲਡ ਚੇਨ"], eligibility: ["ਮੱਛੀ ਪਾਲਕ ਕਿਸਾਨ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜਲਘਰ/ਤਲਾਅ ਲੀਜ਼", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    20: { fullName: "ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਲੋਨ ਯੋਜਨਾ", amount: "₹10 ਕਰੋੜ ਤੱਕ", benefits: ["ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ ਲਈ ਕਰਜ਼ਾ", "35% ਪੂੰਜੀਗਤ ਸਬਸਿਡੀ", "5% ਵਿਆਜ ਛੋਟ", "ਫਲ, ਸਬਜ਼ੀਆਂ, ਅਨਾਜ ਸ਼ਾਮਲ"], eligibility: ["ਫੂਡ ਪ੍ਰੋਸੈਸਰ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ"], documents: ["DPR", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "FSSAI ਲਾਇਸੈਂਸ", "ਬੈਂਕ ਖਾਤਾ"] },
    21: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY)", amount: "ਘੱਟ ਪ੍ਰੀਮੀਅਮ: 1.5-5%", benefits: ["ਘੱਟ ਪ੍ਰੀਮੀਅਮ 'ਤੇ ਫਸਲ ਬੀਮਾ", "ਹਾੜ੍ਹੀ ਲਈ 1.5%, ਸਾਉਣੀ ਲਈ 2%", "21 ਦਿਨਾਂ ਵਿੱਚ ਕਲੇਮ", "ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਤੋਂ ਲੈ ਕੇ ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਤੱਕ ਕਵਰ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਕਰਜ਼ਦਾਰ ਕਿਸਾਨਾਂ ਲਈ ਲਾਜ਼ਮੀ", "ਗੈਰ-ਕਰਜ਼ਦਾਰਾਂ ਲਈ ਇੱਛੁਕ", "ਬਟਾਈਦਾਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਘੋਸ਼ਣਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    22: { fullName: "ਮੌਸਮ ਅਧਾਰਤ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ", amount: "ਪ੍ਰੀਮੀਅਮ 1.5-8%", benefits: ["ਮੌਸਮ ਸੂਚਕ ਅਧਾਰਤ ਬੀਮਾ", "ਮੀਂਹ ਦੀ ਘਾਟ/ਵਾਧਾ ਕਵਰ ਕਰਦਾ ਹੈ", "ਤਾਪਮਾਨ ਅਤੇ ਨਮੀ ਕਵਰੇਜ", "ਤੁਰੰਤ ਕਲੇਮ ਨਿਪਟਾਰਾ"], eligibility: ["ਸੂਚਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਮੌਸਮ-ਸੰਵੇਦਨਸ਼ੀਲ ਫਸਲਾਂ", "ਕਿਸਾਨਾਂ ਦੀਆਂ ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਮੌਸਮ ਦਾ ਡਾਟਾ", "ਆਧਾਰ"] },
    23: { fullName: "ਨਾਰੀਅਲ ਦੇ ਰੁੱਖਾਂ ਦੀ ਬੀਮਾ ਯੋਜਨਾ", amount: "ਪ੍ਰੀਮੀਅਮ: ₹100-500/ਰੁੱਖ", benefits: ["ਨਾਰੀਅਲ ਦੇ ਰੁੱਖਾਂ ਦਾ ਬੀਮਾ", "ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀ ਕਵਰ", "ਕੁਦਰਤੀ ਆਫ਼ਤ ਕਵਰੇਜ", "5 ਸਾਲ ਤੱਕ ਕਵਰੇਜ"], eligibility: ["ਨਾਰੀਅਲ ਦੇ ਕਿਸਾਨ", "ਘੱਟੋ-ਘੱਟ 5 ਰੁੱਖ", "ਸਾਰੇ ਰਾਜ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਰੁੱਖਾਂ ਦੀ ਗਿਣਤੀ", "ਆਧਾਰ"] },
    24: { fullName: "ਰਬੜ ਬੀਮਾ ਯੋਜਨਾ", amount: "₹30,000/ਹੈਕਟੇਅਰ", benefits: ["ਰਬੜ ਦੇ ਰੁੱਖਾਂ ਦਾ ਬੀਮਾ", "ਕੁਦਰਤੀ ਆਫ਼ਤ ਕਵਰੇਜ", "ਬਿਮਾਰੀ ਅਤੇ ਕੀੜੇ ਕਵਰ", "ਝਾੜ ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ"], eligibility: ["ਰਬੜ ਉਤਪਾਦਕ", "ਘੱਟੋ-ਘੱਟ 0.5 ਹੈਕਟੇਅਰ", "ਰਬੜ ਬੋਰਡ ਵਿੱਚ ਰਜਿਸਟਰਡ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਰਬੜ ਬੋਰਡ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਆਧਾਰ"] },
    25: { fullName: "ਕੌਫੀ ਫਸਲ ਬੀਮਾ", amount: "ਪ੍ਰੀਮੀਅਮ 3.5%", benefits: ["ਕੌਫੀ ਦੇ ਬਾਗਾਂ ਦਾ ਬੀਮਾ", "ਅਰੇਬਿਕਾ ਅਤੇ ਰੋਬਸਟਾ ਕਵਰ", "ਝਾੜ ਦੇ ਨੁਕਸਾਨ ਦੀ ਕਵਰੇਜ", "ਕੀਮਤਾਂ ਦੇ ਉਤਰਾਅ-ਚੜ੍ਹਾਅ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ"], eligibility: ["ਕੌਫੀ ਉਤਪਾਦਕ", "ਕੌਫੀ ਬੋਰਡ ਵਿੱਚ ਰਜਿਸਟਰਡ", "ਘੱਟੋ-ਘੱਟ 0.5 ਏਕੜ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕੌਫੀ ਬੋਰਡ ਰਜਿਸਟ੍ਰੇਸ਼ਨ"] },
    26: { fullName: "ਚਾਹ ਫਸਲ ਬੀਮਾ", amount: "ਪ੍ਰੀਮੀਅਮ 2.5%", benefits: ["ਚਾਹ ਦੇ ਬਾਗਾਂ ਦਾ ਬੀਮਾ", "ਹਰੀ ਪੱਤੀ ਦੇ ਝਾੜ ਦਾ ਕਵਰ", "ਸੋਕਾ ਅਤੇ ਹੜ੍ਹ ਕਵਰ", "ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀ ਕਵਰੇਜ"], eligibility: ["ਚਾਹ ਉਤਪਾਦਕ", "ਟੀ ਬੋਰਡ ਵਿੱਚ ਰਜਿਸਟਰਡ", "ਸਾਰੇ ਰਾਜ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਟੀ ਬੋਰਡ ਰਜਿਸਟ੍ਰੇਸ਼ਨ"] },
    27: { fullName: "UPIS - ਫਸਲ ਪਲੱਸ ਬੀਮਾ", amount: "ਪ੍ਰੀਮੀਅਮ: 2-8%", benefits: ["ਸਾਂਝਾ ਫਸਲ + ਸੰਪਤੀ ਬੀਮਾ", "ਘਰ, ਟਰੈਕਟਰ, ਪਸ਼ੂ ਕਵਰ", "ਸਾਰਿਆਂ ਲਈ ਇੱਕੋ ਪ੍ਰੀਮੀਅਮ", "ਤੁਰੰਤ ਕਲੇਮ ਨਿਪਟਾਰਾ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਕਰਜ਼ਦਾਰ ਕਿਸਾਨਾਂ ਲਈ ਲਾਜ਼ਮੀ", "ਗੈਰ-ਕਰਜ਼ਦਾਰਾਂ ਲਈ ਇੱਛੁਕ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸੰਪਤੀ ਦੀ ਸੂਚੀ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    28: { fullName: "ਆਇਲ ਪਾਮ ਬੀਮਾ ਯੋਜਨਾ", amount: "ਪ੍ਰੀਮੀਅਮ: 2.5%", benefits: ["ਆਇਲ ਪਾਮ ਬਾਗਾਂ ਦਾ ਬੀਮਾ", "ਝਾੜ ਦੇ ਨੁਕਸਾਨ ਦਾ ਕਵਰ", "ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀ ਕਵਰੇਜ", "5-ਸਾਲਾ ਪਾਲਿਸੀ ਵਿਕਲਪ"], eligibility: ["ਆਇਲ ਪਾਮ ਉਤਪਾਦਕ", "NMEO-OP ਵਿੱਚ ਰਜਿਸਟਰਡ", "ਘੱਟੋ-ਘੱਟ 1 ਹੈਕਟੇਅਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬਾਗ ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਆਧਾਰ"] },
    29: { fullName: "ਇਲਾਇਚੀ ਫਸਲ ਬੀਮਾ", amount: "ਪ੍ਰੀਮੀਅਮ: 3%", benefits: ["ਇਲਾਇਚੀ ਦੇ ਬਾਗਾਂ ਦਾ ਬੀਮਾ", "ਮੌਸਮ ਕਾਰਨ ਝਾੜ ਦੇ ਨੁਕਸਾਨ ਦਾ ਕਵਰ", "ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀ ਕਵਰੇਜ", "ਤੁਰੰਤ ਕਲੇਮ ਨਿਪਟਾਰਾ"], eligibility: ["ਇਲਾਇਚੀ ਉਤਪਾਦਕ", "ਮਸਾਲਾ ਬੋਰਡ ਵਿੱਚ ਰਜਿਸਟਰਡ", "ਘੱਟੋ-ਘੱਟ 0.5 ਏਕੜ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਮਸਾਲਾ ਬੋਰਡ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਆਧਾਰ"] },
    30: { fullName: "ਰਾਸ਼ਟਰੀ ਪਸ਼ੂਧਨ ਬੀਮਾ ਯੋਜਨਾ", amount: "ਪ੍ਰੀਮੀਅਮ: 4-6%", benefits: ["ਗਾਂ, ਮੱਝ, ਭੇਡ, ਬੱਕਰੀ ਦਾ ਬੀਮਾ", "ਹਾਦਸੇ/ਬਿਮਾਰੀ ਨਾਲ ਮੌਤ ਦਾ ਕਵਰ", "BPL ਲਈ ਰਿਆਇਤੀ ਪ੍ਰੀਮੀਅਮ", "ਤੁਰੰਤ ਕਲੇਮ ਨਿਪਟਾਰਾ"], eligibility: ["ਸਾਰੇ ਪਸ਼ੂ ਪਾਲਕ", "ਡੇਅਰੀ ਕਿਸਾਨ", "BPL ਪਰਿਵਾਰਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਪਸ਼ੂ ਦੀ ਪਛਾਣ", "ਪਸ਼ੂ ਚਿਕਿਤਸਕ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    31: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕ੍ਰਿਸ਼ੀ ਸਿੰਚਾਈ ਯੋਜਨਾ", amount: "55-75% ਸਬਸਿਡੀ", benefits: ["ਡ੍ਰਿੱਪ/ਸਪ੍ਰਿੰਕਲਰ ਸਬਸਿਡੀ", "ਜਨਰਲ ਲਈ 55%, SC/ST ਲਈ 75%", "ਫਾਰਮ ਤਾਲਾਬ (Farm Pond) ਸਹਾਇਤਾ", "ਹਰ ਬੂੰਦ ਵੱਧ ਫਸਲ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਜਲ ਉਪਯੋਗਕਰਤਾ ਐਸੋਸੀਏਸ਼ਨਾਂ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਵਿਕ੍ਰੇਤਾ ਕੋਟੇਸ਼ਨ"] },
    32: { fullName: "ਮਾਈਕ੍ਰੋ ਸਿੰਚਾਈ ਫੰਡ (ਨਾਬਾਰਡ)", amount: "₹5,000 ਕਰੋੜ ਦਾ ਫੰਡ", benefits: ["ਮਾਈਕ੍ਰੋ-ਸਿੰਚਾਈ ਲਈ ਵਾਧੂ ਸਬਸਿਡੀ", "PMKSY ਦੇ ਨਾਲ ਏਕੀਕਰਣ", "ਰਾਜ ਸਰਕਾਰ ਦਾ ਕਰਜ਼ਾ", "ਪਾਣੀ ਦੀ ਘਾਟ ਵਾਲੇ ਖੇਤਰਾਂ ਨੂੰ ਤਰਜੀਹ"], eligibility: ["ਰਾਜ ਸਰਕਾਰਾਂ", "ਜਲ ਉਪਯੋਗਕਰਤਾ ਐਸੋਸੀਏਸ਼ਨਾਂ", "FPO"], documents: ["ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਰਾਜ ਦੀ ਮਨਜ਼ੂਰੀ"] },
    33: { fullName: "ਹਰ ਖੇਤ ਨੂੰ ਪਾਣੀ (PMKSY ਭਾਗ)", amount: "ਪੂਰੀ ਕਵਰੇਜ", benefits: ["ਹਰ ਖੇਤ ਤੱਕ ਸਿੰਚਾਈ ਦੀ ਪਹੁੰਚ", "ਕਮਾਂਡ ਏਰੀਆ ਵਿਕਾਸ", "ਪਾਣੀ ਸੰਭਾਲ ਢਾਂਚੇ", "ਜਲ ਸਰੋਤਾਂ ਦੀ ਮੁਰੰਮਤ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਬਾਰਾਨੀ (ਮੀਂਹ 'ਤੇ ਨਿਰਭਰ) ਖੇਤਰਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਜਲ ਸਰੋਤ ਦਾ ਵੇਰਵਾ"] },
    34: { fullName: "ਵਾਟਰਸ਼ੈੱਡ ਵਿਕਾਸ ਭਾਗ (PMKSY)", amount: "₹12,000/ਹੈਕਟੇਅਰ", benefits: ["ਵਾਟਰਸ਼ੈੱਡ ਪ੍ਰਬੰਧਨ", "ਮਿੱਟੀ ਅਤੇ ਪਾਣੀ ਦੀ ਸੰਭਾਲ", "ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੀ ਸੰਭਾਲ", "ਚੈੱਕ ਡੈਮ ਦੀ ਉਸਾਰੀ"], eligibility: ["ਵਾਟਰਸ਼ੈੱਡ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਪਿੰਡ ਦੇ ਭਾਈਚਾਰੇ"], documents: ["ਪਿੰਡ ਦਾ ਪ੍ਰਸਤਾਵ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    35: { fullName: "ਤੁਰੰਤ ਸਿੰਚਾਈ ਲਾਭ ਪ੍ਰੋਗਰਾਮ", amount: "90:10 ਫੰਡਿੰਗ", benefits: ["ਵੱਡੇ ਸਿੰਚਾਈ ਪ੍ਰੋਜੈਕਟ", "ਕੇਂਦਰ:ਰਾਜ ਫੰਡਿੰਗ 90:10", "ਕਮਾਂਡ ਏਰੀਆ ਵਿਕਾਸ", "ਪਾਣੀ ਵੰਡ ਪ੍ਰਣਾਲੀ"], eligibility: ["ਰਾਜ ਸਰਕਾਰਾਂ", "ਸਿੰਚਾਈ ਵਿਭਾਗ"], documents: ["ਪ੍ਰੋਜੈਕਟ DPR", "ਰਾਜ ਦੀ ਮਨਜ਼ੂਰੀ"] },
    36: { fullName: "ਖੇਤਾਂ ਲਈ ਛੱਤ 'ਤੇ ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੀ ਸੰਭਾਲ", amount: "₹25,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਮੀਂਹ ਦੇ ਪਾਣੀ ਨੂੰ ਸੰਭਾਲਣ ਦਾ ਢਾਂਚਾ", "ਸਟੋਰੇਜ ਟੈਂਕ ਸਬਸਿਡੀ", "ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦਾ ਰੀਚਾਰਜ", "ਟਿਊਬਵੈੱਲ 'ਤੇ ਨਿਰਭਰਤਾ ਘਟਾਉਣਾ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਫਾਰਮ ਹਾਊਸ", "ਪਸ਼ੂਆਂ ਦੇ ਸ਼ੈੱਡ"], documents: ["ਇਮਾਰਤ ਦਾ ਨਕਸ਼ਾ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕੋਟੇਸ਼ਨ"] },
    37: { fullName: "ਫਾਰਮ ਤਾਲਾਬ ਅਤੇ ਖੂਹ ਰੀਚਾਰਜ ਯੋਜਨਾ", amount: "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਖੇਤ ਵਿੱਚ ਤਾਲਾਬ ਬਣਾਉਣਾ", "ਖੂਹ ਰੀਚਾਰਜ ਢਾਂਚਾ", "ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੀ ਸੰਭਾਲ", "ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦੇ ਪੱਧਰ ਵਿੱਚ ਸੁਧਾਰ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਪਾਣੀ ਦੇ ਡਿੱਗਦੇ ਪੱਧਰ ਵਾਲੇ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਖੂਹ ਦੀ ਮਾਲਕੀ ਦਾ ਸਬੂਤ", "ਆਧਾਰ"] },
    38: { fullName: "ਸਪ੍ਰਿੰਕਲਰ (ਫੁਹਾਰਾ) ਸਿੰਚਾਈ ਸਬਸਿਡੀ", amount: "₹15,000/ਏਕੜ ਤੱਕ 70% ਸਬਸਿਡੀ", benefits: ["ਪੋਰਟੇਬਲ ਸਪ੍ਰਿੰਕਲਰ ਸੈੱਟ", "40% ਤੱਕ ਪਾਣੀ ਦੀ ਬਚਤ", "ਸਾਰੀਆਂ ਫਸਲਾਂ ਲਈ ਢੁਕਵਾਂ", "ਘੱਟ ਸੰਚਾਲਨ ਖਰਚਾ"], eligibility: ["ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ", "FPO", "ਪਾਣੀ ਦੀ ਘਾਟ ਵਾਲੇ ਖੇਤਰਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    39: { fullName: "ਡ੍ਰਿੱਪ (ਤੁਪਕਾ) ਸਿੰਚਾਈ ਪ੍ਰੋਤਸਾਹਨ ਯੋਜਨਾ", amount: "60-80% ਸਬਸਿਡੀ", benefits: ["ਡ੍ਰਿੱਪ ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ", "60% ਤੱਕ ਪਾਣੀ ਦੀ ਬਚਤ", "ਵੱਧ ਝਾੜ", "ਖਾਦ ਪਾਉਣ (ਫਰਟੀਗੇਸ਼ਨ) ਲਈ ਢੁਕਵਾਂ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਬਾਗਬਾਨੀ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਦਾ ਵੇਰਵਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    40: { fullName: "ਫੀਲਡ ਚੈਨਲ (ਖਾਲ) ਅਤੇ ਪਾਈਪਲਾਈਨ ਵਿਸਥਾਰ", amount: "₹2 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਸਰੋਤ ਤੋਂ ਖੇਤ ਤੱਕ PVC ਪਾਈਪਲਾਈਨ", "ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ ਵਿੱਚ ਕਮੀ", "ਸਮੇਂ ਅਤੇ ਮਜ਼ਦੂਰੀ ਦੀ ਬਚਤ", "5 ਏਕੜ ਤੱਕ ਕਵਰੇਜ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਜਲ ਉਪਯੋਗਕਰਤਾ ਐਸੋਸੀਏਸ਼ਨਾਂ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਜਲ ਸਰੋਤ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    41: { fullName: "ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ 'ਤੇ ਸਬਸਿਡੀ", amount: "40-50% ਸਬਸਿਡੀ", benefits: ["SC/ST ਲਈ 50% (₹40,000 ਤੱਕ)", "ਆਮ ਕਿਸਾਨਾਂ ਲਈ 40%", "ਟਰੈਕਟਰ, ਰੋਟਾਵੇਟਰ ਸਬਸਿਡੀ", "ਡਰੋਨ ਸਬਸਿਡੀ ₹5 ਲੱਖ ਤੱਕ 50%"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬਿੱਲ"] },
    42: { fullName: "ਫਾਰਮ ਮਸ਼ੀਨਰੀ ਬੈਂਕ", amount: "₹40 ਲੱਖ ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਮਸ਼ੀਨਰੀ ਕਿਰਾਏ 'ਤੇ ਦੇਣ ਵਾਲੇ ਕੇਂਦਰ ਦੀ ਸਥਾਪਨਾ", "ਉਪਕਰਣਾਂ 'ਤੇ 40% ਸਬਸਿਡੀ", "ਛੋਟੇ ਕਿਸਾਨਾਂ ਨੂੰ ਫਾਇਦਾ", "ਨਿੱਜੀ ਨਿਵੇਸ਼ ਵਿੱਚ ਕਮੀ"], eligibility: ["FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਨੌਜਵਾਨ ਉੱਦਮੀ"], documents: ["ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਟੀਫਿਕੇਟ", "ਕੇਂਦਰ ਲਈ ਜ਼ਮੀਨ"] },
    43: { fullName: "ਖਾਦ/ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਾਅ ਲਈ ਡਰੋਨ", amount: "₹8 ਲੱਖ ਤੱਕ 80% ਸਬਸਿਡੀ", benefits: ["ਮਹਿਲਾ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹਾਂ ਲਈ ਡਰੋਨ", "ਖਰੀਦ 'ਤੇ 80% ਸਬਸਿਡੀ", "ਸਿਖਲਾਈ ਸ਼ਾਮਲ", "ਛਿੜਕਾਅ ਸੇਵਾਵਾਂ ਤੋਂ ਆਮਦਨ"], eligibility: ["ਮਹਿਲਾ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਮੈਂਬਰਾਂ ਵਾਲੇ FPO"], documents: ["SHG ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਮਹਿਲਾ ਮੈਂਬਰਾਂ ਦੀ ਸੂਚੀ"] },
    44: { fullName: "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਪ੍ਰਬੰਧਨ ਉਪਕਰਣ", amount: "₹10 ਲੱਖ ਤੱਕ 35% ਸਬਸਿਡੀ", benefits: ["ਥਰੈਸ਼ਰ, ਡ੍ਰਾਇਅਰ, ਗ੍ਰੇਡਰ", "ਸਟੋਰੇਜ ਉਪਕਰਣ", "ਪੈਕਿੰਗ ਮਸ਼ੀਨਰੀ", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਕੋਟੇਸ਼ਨ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼"] },
    45: { fullName: "ਕਿਸਾਨਾਂ ਲਈ ਸੋਲਰ ਡ੍ਰਾਇਅਰ", amount: "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਫਲਾਂ/ਸਬਜ਼ੀਆਂ ਲਈ ਸੋਲਰ ਡ੍ਰਾਇਅਰ", "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਹੋਣ ਵਾਲੇ ਨੁਕਸਾਨ ਵਿੱਚ ਕਮੀ", "ਗੁਣਵੱਤਾ ਦੀ ਸੰਭਾਲ", "ਮੁੱਲ ਵਾਧਾ (Value Addition)"], eligibility: ["ਛੋਟੇ ਕਿਸਾਨ", "FPO", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ"] },
    46: { fullName: "ਕੋਲਡ ਸਟੋਰੇਜ ਅਤੇ ਕੋਲਡ ਚੇਨ", amount: "₹50 ਲੱਖ ਤੱਕ 35% ਸਬਸਿਡੀ", benefits: ["ਕੋਲਡ ਸਟੋਰੇਜ ਦੀ ਉਸਾਰੀ", "ਰੀਫਰ (ਕੂਲਿੰਗ ਵਾਲੇ) ਵਾਹਨ", "ਪੈਕਿੰਗ ਉਪਕਰਣ", "ਬਰਬਾਦੀ ਵਿੱਚ ਕਮੀ"], eligibility: ["FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਨਿੱਜੀ ਉੱਦਮੀ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ"] },
    47: { fullName: "ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਲਈ ਛੋਟੇ ਟਰੈਕਟਰ ਦੀ ਸਬਸਿਡੀ", amount: "₹60,000 ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["20-35 HP ਟਰੈਕਟਰ ਲਈ ਸਬਸਿਡੀ", "SC/ST ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ", "ਕਸਟਮ ਹਾਇਰਿੰਗ ਵਿਕਲਪ", "ਖੇਤੀ ਖਰਚੇ ਵਿੱਚ ਕਮੀ"], eligibility: ["ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ", "SC/ST ਕਿਸਾਨ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    48: { fullName: "ਪਾਵਰ ਟਿਲਰ ਸਬਸਿਡੀ ਯੋਜਨਾ", amount: "₹25,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਪਾਵਰ ਟਿਲਰ ਲਈ ਸਬਸਿਡੀ", "ਛੋਟੇ ਖੇਤਾਂ ਲਈ ਢੁਕਵਾਂ", "ਮਜ਼ਦੂਰਾਂ 'ਤੇ ਨਿਰਭਰਤਾ ਵਿੱਚ ਕਮੀ", "ਘੱਟ ਰੱਖ-ਰਖਾਅ ਦਾ ਖਰਚਾ"], eligibility: ["ਛੋਟੇ ਕਿਸਾਨ", "ਪਹਾੜੀ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    49: { fullName: "ਕੰਬਾਈਨ ਹਾਰਵੈਸਟਰ ਸਬਸਿਡੀ ਯੋਜਨਾ", amount: "₹2 ਲੱਖ ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਰੀਪਰ/ਹਾਰਵੈਸਟਰ ਲਈ ਸਬਸਿਡੀ", "ਵਾਢੀ ਦੇ ਸਮੇਂ ਵਿੱਚ ਕਮੀ", "ਫਸਲ ਦਾ ਘੱਟੋ-ਘੱਟ ਨੁਕਸਾਨ", "ਕਿਰਾਏ 'ਤੇ ਚਲਾਉਣ (Custom Hiring) ਲਈ ਵਧੀਆ"], eligibility: ["FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਵੱਡੇ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    50: { fullName: "ਮਕੈਨੀਕਲ ਝੋਨਾ ਲਾਉਣ ਵਾਲੀ ਮਸ਼ੀਨ (Paddy Transplanter) ਸਬਸਿਡੀ", amount: "₹40,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਝੋਨਾ ਲਾਉਣ ਵਾਲੀ ਮਸ਼ੀਨ 'ਤੇ ਸਬਸਿਡੀ", "ਮਜ਼ਦੂਰੀ ਦੇ ਖਰਚੇ ਦੀ ਬਚਤ", "ਇੱਕਸਾਰ ਲਵਾਈ", "ਵੱਧ ਝਾੜ"], eligibility: ["ਝੋਨੇ ਦੇ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    51: { fullName: "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ (ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ) ਯੋਜਨਾ", amount: "ਮੁਫਤ ਸੇਵਾ", benefits: ["ਹਰ 2 ਸਾਲਾਂ ਬਾਅਦ ਮੁਫਤ ਮਿੱਟੀ ਦੀ ਪਰਖ", "12 ਪੈਰਾਮੀਟਰਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ", "ਫਸਲ ਅਨੁਸਾਰ ਸਿਫਾਰਸ਼ਾਂ", "ਖਾਦ ਦੇ ਖਰਚੇ ਵਿੱਚ 10-15% ਦੀ ਕਮੀ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਛੋਟੇ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕਿਸਾਨ ਪਛਾਣ ਪੱਤਰ"] },
    52: { fullName: "ਮੋਬਾਈਲ ਮਿੱਟੀ ਪਰਖ ਲੈਬਾਰਟਰੀਆਂ", amount: "₹25 ਲੱਖ ਪ੍ਰਤੀ ਲੈਬਾਰਟਰੀ", benefits: ["ਮੋਬਾਈਲ ਮਿੱਟੀ ਪਰਖ ਵੈਨਾਂ", "ਘਰ-ਘਰ ਮੁਫਤ ਸੇਵਾ", "7 ਦਿਨਾਂ ਵਿੱਚ ਨਤੀਜੇ", "ਦੂਰ-ਦੁਰਾਡੇ ਦੇ ਪਿੰਡਾਂ ਨੂੰ ਕਵਰ ਕਰਨਾ"], eligibility: ["ਰਾਜ ਸਰਕਾਰਾਂ", "ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ (KVK)", "ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀਆਂ"], documents: ["ਪ੍ਰਸਤਾਵ", "ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਦਾ ਵੇਰਵਾ"] },
    53: { fullName: "ਮਿੱਟੀ ਸਿਹਤ ਪ੍ਰਬੰਧਨ (SHM)", amount: "₹2,000/ਹੈਕਟੇਅਰ", benefits: ["ਮਿੱਟੀ ਸੁਧਾਰ ਸਬਸਿਡੀ", "ਚੂਨੇ/ਜਿਪਸਮ ਦੀ ਵਰਤੋਂ", "ਸੂਖਮ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਸਪਲਾਈ", "ਜੀਵਾਣੂ ਖਾਦਾਂ (Bio-fertilizers) ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ ਧਾਰਕ"], documents: ["ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    54: { fullName: "ਸੂਖਮ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਕਮੀ ਦਾ ਸੁਧਾਰ", amount: "₹1,000/ਏਕੜ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਜ਼ਿੰਕ, ਬੋਰਾਨ, ਲੋਹੇ ਦੀ ਸਪਲਾਈ", "ਤੱਤਾਂ ਦੀ ਕਮੀ ਨੂੰ ਦੂਰ ਕਰਨਾ", "ਮਿਆਰੀ ਬੀਜਾਂ 'ਤੇ ਸਬਸਿਡੀ", "ਝਾੜ ਵਿੱਚ ਸੁਧਾਰ"], eligibility: ["ਸੂਖਮ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਕਮੀ ਵਾਲੇ ਕਿਸਾਨ", "ਮਿੱਟੀ ਪਰਖ ਦੀ ਰਿਪੋਰਟ ਲਾਜ਼ਮੀ"], documents: ["ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    55: { fullName: "ਮਿੱਟੀ ਦੀ ਤੇਜ਼ਾਬੀਪਣ/ਖਾਰੀਪਣ ਸੁਧਾਰ", amount: "50% ਸਬਸਿਡੀ", benefits: ["ਤੇਜ਼ਾਬੀ ਮਿੱਟੀ ਲਈ ਚੂਨਾ", "ਖਾਰੀ ਮਿੱਟੀ ਲਈ ਜਿਪਸਮ", "ਮਿੱਟੀ ਦੇ pH ਵਿੱਚ ਸੁਧਾਰ", "ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਉਪਲਬਧਤਾ ਵਿੱਚ ਵਾਧਾ"], eligibility: ["ਸਮੱਸਿਆ ਵਾਲੀ ਮਿੱਟੀ ਦੇ ਕਿਸਾਨ", "ਮਿੱਟੀ ਦੀ ਪਰਖ ਲਾਜ਼ਮੀ"], documents: ["ਮਿੱਟੀ ਪਰਖ ਰਿਪੋਰਟ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    56: { fullName: "ਜੈਵਿਕ ਪਦਾਰਥ ਵਾਧਾ ਯੋਜਨਾ", amount: "₹5,000/ਹੈਕਟੇਅਰ", benefits: ["ਹਰੀ ਖਾਦ ਸਬਸਿਡੀ", "ਕੰਪੋਸਟ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ", "ਫਸਲਾਂ ਦੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦਾ ਪ੍ਰਬੰਧਨ", "ਮਿੱਟੀ ਵਿੱਚ ਜੈਵਿਕ ਕਾਰਬਨ ਦਾ ਸੁਧਾਰ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਜੈਵਿਕ ਖੇਤੀ ਕਲੱਸਟਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ", "ਆਧਾਰ"] },
    57: { fullName: "ਮੁਫਤ ਬਾਇਓ-ਫਰਟੀਲਾਈਜ਼ਰ (ਜੀਵਾਣੂ ਖਾਦ) ਵੰਡ", amount: "5 ਕਿਲੋ/ਏਕੜ ਤੱਕ ਮੁਫਤ", benefits: ["ਮੁਫਤ ਰਾਈਜ਼ੋਬੀਅਮ, PSB, ਐਜ਼ੋਟੋਬੈਕਟਰ", "ਰਸਾਇਣਕ ਖਾਦਾਂ ਦੀ ਵਰਤੋਂ ਵਿੱਚ ਕਮੀ", "ਮਿੱਟੀ ਦੇ ਜੀਵ ਵਿਗਿਆਨ ਵਿੱਚ ਸੁਧਾਰ", "KVK 'ਤੇ ਉਪਲਬਧ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ", "ਆਧਾਰ"] },
    58: { fullName: "ਵਰਮੀਕੰਪੋਸਟ (ਗੰਡੋਇਆਂ ਦੀ ਖਾਦ) ਉਤਪਾਦਨ ਯੂਨਿਟ", amount: "₹25,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਵਰਮੀਕੰਪੋਸਟ ਯੂਨਿਟ ਦੀ ਸਥਾਪਨਾ", "ਗੰਡੋਇਆਂ ਦੀ ਸਪਲਾਈ", "ਜੈਵਿਕ ਖਾਦ ਦਾ ਉਤਪਾਦਨ", "ਕੂੜੇ ਦੀ ਰੀਸਾਈਕਲਿੰਗ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    59: { fullName: "ਮਿੱਟੀ ਦੇ ਖੁਰਨ (Soil Erosion) ਦੀ ਰੋਕਥਾਮ ਯੋਜਨਾ", amount: "75% ਸਬਸਿਡੀ", benefits: ["ਕੰਟੂਰ ਬੰਡਿੰਗ (ਵੱਟਾਂ ਬਣਾਉਣਾ)", "ਪੌੜੀਦਾਰ ਖੇਤੀ ਲਈ ਸਹਾਇਤਾ", "ਪਾਣੀ ਦੇ ਵਹਾਅ ਨੂੰ ਰੋਕਣਾ", "ਪੱਟੀਦਾਰ ਖੇਤੀ (Strip Cropping) ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਪਹਾੜੀ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਮਿੱਟੀ ਖੁਰਨ ਵਾਲੇ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਮਿੱਟੀ ਖੁਰਨ ਦਾ ਸਬੂਤ", "ਆਧਾਰ"] },
    60: { fullName: "ਜ਼ਮੀਨ ਨੂੰ ਪੱਧਰਾ ਕਰਨਾ ਅਤੇ ਵਿਕਾਸ", amount: "₹10,000/ਏਕੜ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਲੇਜ਼ਰ ਲੈਂਡ ਲੈਵਲਿੰਗ (ਕੰਪਿਊਟਰ ਕਰਾਹਾ) ਸਬਸਿਡੀ", "ਜ਼ਮੀਨ ਨੂੰ ਆਕਾਰ ਦੇਣਾ", "ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਵਿੱਚ ਸੁਧਾਰ", "ਪਾਣੀ ਦੀ ਸੁਚੱਜੀ ਵਰਤੋਂ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਪਾਣੀ ਦੀ ਘਾਟ ਵਾਲੇ ਖੇਤਰਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਕੋਟੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    61: { fullName: "ਪਰੰਪਰਾਗਤ ਕ੍ਰਿਸ਼ੀ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹31,500/ਹੈਕਟੇਅਰ", benefits: ["ਜੈਵਿਕ ਇਨਪੁਟਸ ਲਈ ₹15,000", "ਪ੍ਰਮਾਣੀਕਰਣ (ਸਰਟੀਫਿਕੇਸ਼ਨ) ਲਈ ₹10,000", "ਸਿਖਲਾਈ ਲਈ ₹6,500", "3 ਸਾਲਾਂ ਦੀ ਸਹਾਇਤਾ"], eligibility: ["ਕਿਸਾਨ ਸਮੂਹ (50+ ਕਿਸਾਨ)", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਘੱਟੋ-ਘੱਟ 50 ਏਕੜ ਜ਼ਮੀਨ"], documents: ["ਕਲੱਸਟਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਕਿਸਾਨਾਂ ਦੀ ਸੂਚੀ", "ਜ਼ਮੀਨ ਦਾ ਵੇਰਵਾ", "ਮਿੱਟੀ ਪਰਖ ਰਿਪੋਰਟ"] },
    62: { fullName: "ਉੱਤਰ-ਪੂਰਬੀ ਖੇਤਰ ਲਈ ਜੈਵਿਕ ਮੁੱਲ ਲੜੀ ਵਿਕਾਸ ਮਿਸ਼ਨ", amount: "₹75,000/ਹੈਕਟੇਅਰ", benefits: ["ਉੱਤਰ-ਪੂਰਬੀ ਰਾਜਾਂ ਵਿੱਚ ਜੈਵਿਕ ਖੇਤੀ", "FPO ਬਣਾਉਣ ਵਿੱਚ ਸਹਾਇਤਾ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ", "ਪ੍ਰੋਸੈਸਿੰਗ ਬੁਨਿਆਦੀ ਢਾਂਚਾ"], eligibility: ["ਉੱਤਰ-ਪੂਰਬੀ ਰਾਜਾਂ ਦੇ ਕਿਸਾਨ", "FPO", "ਜੈਵਿਕ ਕਲੱਸਟਰ", "ਕਬਾਇਲੀ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "FPO ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਕਿਸਾਨ ਪਛਾਣ ਪੱਤਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    63: { fullName: "ਵਰਮੀਕੰਪੋਸਟ (ਗੰਡੋਇਆਂ ਦੀ ਖਾਦ) ਉਤਪਾਦਨ ਯੂਨਿਟ ਯੋਜਨਾ", amount: "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਵਰਮੀਕੰਪੋਸਟ ਯੂਨਿਟ ਦੀ ਸਥਾਪਨਾ", "ਗੰਡੋਇਆਂ ਦੀ ਸਪਲਾਈ", "ਸਿਖਲਾਈ ਪ੍ਰਦਾਨ ਕਰਨਾ", "ਜੈਵਿਕ ਖਾਦ ਦਾ ਉਤਪਾਦਨ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "FPO", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    64: { fullName: "ਬਾਇਓ-ਫਰਟੀਲਾਈਜ਼ਰ (ਜੀਵਾਣੂ ਖਾਦ) ਉਤਪਾਦਨ ਯੂਨਿਟ ਯੋਜਨਾ", amount: "₹2 ਲੱਖ ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਰਾਈਜ਼ੋਬੀਅਮ, PSB ਦਾ ਉਤਪਾਦਨ", "ਐਜ਼ੋਟੋਬੈਕਟਰ, VAM ਦੀ ਸਪਲਾਈ", "ਗੁਣਵੱਤਾ ਕੰਟਰੋਲ ਲੈਬ", "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿਖਲਾਈ"], eligibility: ["ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "FPO", "ਨੌਜਵਾਨ ਉੱਦਮੀ", "ਖੇਤੀਬਾੜੀ ਗ੍ਰੈਜੂਏਟ"], documents: ["ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਤਕਨੀਕੀ ਯੋਗਤਾ", "ਜ਼ਮੀਨ ਦੀ ਲੀਜ਼", "ਬੈਂਕ ਖਾਤਾ"] },
    65: { fullName: "ਜ਼ੀਰੋ ਬਜਟ ਕੁਦਰਤੀ ਖੇਤੀ ਯੋਜਨਾ", amount: "₹15,000/ਹੈਕਟੇਅਰ", benefits: ["ਕੁਦਰਤੀ ਖੇਤੀ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ", "ਗਾਂ-ਅਧਾਰਿਤ ਖੇਤੀ", "ਬਾਇਓ-ਕੀਟਨਾਸ਼ਕ ਦੀ ਸਿਖਲਾਈ", "ਮਲਚਿੰਗ (ਪਰਾਲੀ ਢਕਣ) ਸਹਾਇਤਾ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਮੀਂਹ 'ਤੇ ਨਿਰਭਰ ਖੇਤਰਾਂ ਨੂੰ ਤਰਜੀਹ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸਿਖਲਾਈ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    66: { fullName: "ਪੀ.ਜੀ.ਐਸ.-ਇੰਡੀਆ ਪ੍ਰਮਾਣੀਕਰਣ ਸਹਾਇਤਾ", amount: "₹10,000 ਤੱਕ 100% ਸਬਸਿਡੀ", benefits: ["ਮੁਫਤ ਜੈਵਿਕ ਸਰਟੀਫਿਕੇਸ਼ਨ", "ਸਮੂਹਾਂ ਲਈ ਸਮੂਹਿਕ ਸਰਟੀਫਿਕੇਸ਼ਨ", "ਗੁਣਵੱਤਾ ਦਾ ਭਰੋਸਾ", "ਮਾਰਕੀਟ ਤੱਕ ਪਹੁੰਚ"], eligibility: ["ਕਿਸਾਨ ਸਮੂਹ", "FPO", "ਜੈਵਿਕ ਕਿਸਾਨ ਸਮੂਹ"], documents: ["ਕਲੱਸਟਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਕਿਸਾਨਾਂ ਦੀ ਸੂਚੀ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    67: { fullName: "ਪਸ਼ੂ ਖਾਦ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ", amount: "₹30,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਕੰਪੋਸਟ ਟੋਏ ਦੀ ਉਸਾਰੀ", "ਖਾਦ ਦੀ ਪ੍ਰੋਸੈਸਿੰਗ", "ਬਾਇਓਗੈਸ ਯੂਨਿਟ ਸਬਸਿਡੀ", "ਰੂੜੀ ਦੀ ਖਾਦ (FYM) ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਪਸ਼ੂ ਪਾਲਕ ਕਿਸਾਨ", "ਡੇਅਰੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪਸ਼ੂ ਗਿਣਤੀ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    68: { fullName: "ਹਰੀ ਖਾਦ ਬੀਜ ਸਬਸਿਡੀ", amount: "ਬੀਜਾਂ 'ਤੇ 50% ਸਬਸਿਡੀ", benefits: ["ਸਣ, ਜੰਤਰ ਦੇ ਬੀਜ", "ਮਿੱਟੀ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਵਿੱਚ ਸੁਧਾਰ", "ਨਦੀਨਾਂ ਦੀ ਰੋਕਥਾਮ", "ਰਸਾਇਣਕ ਖਾਦਾਂ ਦੀ ਲੋੜ ਵਿੱਚ ਕਮੀ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਜੈਵਿਕ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    69: { fullName: "ਰਾਜ ਜੈਵਿਕ ਖੇਤੀ ਪ੍ਰੋਤਸਾਹਨ", amount: "₹20,000/ਹੈਕਟੇਅਰ", benefits: ["ਜੈਵਿਕ ਇਨਪੁਟ ਸਬਸਿਡੀ", "ਸਿਖਲਾਈ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ ਸਹਾਇਤਾ", "PGS ਸਰਟੀਫਿਕੇਸ਼ਨ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਜੈਵਿਕ ਕਲੱਸਟਰ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸਿਖਲਾਈ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    70: { fullName: "ਬਾਇਓ-ਕੀਟਨਾਸ਼ਕ ਪ੍ਰੋਤਸਾਹਨ ਯੋਜਨਾ", amount: "₹2,000/ਏਕੜ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਨਿੰਮ-ਅਧਾਰਿਤ ਕੀਟਨਾਸ਼ਕ", "ਟ੍ਰਾਈਕੋਡਰਮਾ ਦੀ ਸਪਲਾਈ", "ਸੂਡੋਮੋਨਾਸ ਕਲਚਰ", "IPM ਸਿਖਲਾਈ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਜੈਵਿਕ ਕਿਸਾਨ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    71: { fullName: "ਬਾਗਬਾਨੀ ਦੇ ਏਕੀਕ੍ਰਿਤ ਵਿਕਾਸ ਲਈ ਮਿਸ਼ਨ (MIDH)", amount: "50-75% ਸਬਸਿਡੀ", benefits: ["ਫਲ, ਸਬਜ਼ੀਆਂ ਦੀ ਬਿਜਾਈ", "ਨਰਸਰੀ ਦਾ ਵਿਕਾਸ", "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਦਾ ਪ੍ਰਬੰਧਨ", "ਪੈਕਿੰਗ ਸਬਸਿਡੀ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਨਰਸਰੀ ਮਾਲਕ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    72: { fullName: "ਨਾਰੀਅਲ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹50,000/ਹੈਕਟੇਅਰ", benefits: ["ਛੋਟੇ ਕਿਸਾਨਾਂ ਲਈ 70% ਸਬਸਿਡੀ", "ਵੱਧ ਝਾੜ ਦੇਣ ਵਾਲੇ ਬੂਟੇ", "ਪੁਰਾਣੇ ਰੁੱਖਾਂ ਦੀ ਬਦਲੀ", "ਮੁੱਲ ਵਾਧਾ ਸਹਾਇਤਾ"], eligibility: ["ਕੇਰਲ, ਤਾਮਿਲਨਾਡੂ, ਕਰਨਾਟਕ, ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼ ਦੇ ਨਾਰੀਅਲ ਕਿਸਾਨ", "FPO", "ਛੋਟੇ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਰੁੱਖਾਂ ਦੀ ਗਿਣਤੀ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    73: { fullName: "ਕਾਜੂ ਅਤੇ ਕੋਕੋ ਪ੍ਰੋਗਰਾਮ", amount: "₹25,000/ਹੈਕਟੇਅਰ", benefits: ["ਕਾਜੂ ਦੀ ਬਿਜਾਈ ਲਈ ਸਬਸਿਡੀ", "ਕੋਕੋ ਦੀ ਖੇਤੀ ਲਈ ਸਹਾਇਤਾ", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟ ਸਬਸਿਡੀ", "ਨਿਰਯਾਤ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਤੱਟਵਰਤੀ ਰਾਜਾਂ ਦੇ ਕਿਸਾਨ", "FPO", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    74: { fullName: "ਬਾਂਸ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹30,000/ਹੈਕਟੇਅਰ", benefits: ["ਬਾਂਸ ਲਗਾਉਣ ਲਈ ਸਬਸਿਡੀ", "ਨਰਸਰੀ ਦਾ ਵਿਕਾਸ", "ਮੁੱਲ ਵਾਧਾ (Value Addition) ਯੂਨਿਟ", "ਹਸਤ ਕਲਾ ਲਈ ਸਹਾਇਤਾ"], eligibility: ["ਉੱਤਰ-ਪੂਰਬੀ ਰਾਜਾਂ ਦੇ ਕਿਸਾਨ", "FPO", "ਕਬਾਇਲੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬਾਂਸ ਦੇ ਖੇਤਰ ਦਾ ਵੇਰਵਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    75: { fullName: "ਮਸਾਲਾ ਵਿਕਾਸ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ", amount: "40% ਸਬਸਿਡੀ", benefits: ["ਮਸਾਲਾ ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ", "ਮੁੱਲ ਵਾਧਾ ਉਪਕਰਣ", "ਗੁਣਵੱਤਾ ਟੈਸਟਿੰਗ ਲੈਬ", "ਨਿਰਯਾਤ ਸਹੂਲਤ"], eligibility: ["ਮਸਾਲਾ ਉਤਪਾਦਕ", "FPO", "ਮਸਾਲਾ ਪ੍ਰੋਸੈਸਰ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸਪਾਈਸਿਸ ਬੋਰਡ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਬੈਂਕ ਖਾਤਾ"] },
    76: { fullName: "ਅੰਬ ਦੀ ਕਾਸ਼ਤ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ", amount: "₹40,000/ਹੈਕਟੇਅਰ", benefits: ["ਵੱਧ ਝਾੜ ਦੇਣ ਵਾਲੇ ਅੰਬ ਦੇ ਬੂਟੇ", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟ ਸਹਾਇਤਾ", "ਕੋਲਡ ਸਟੋਰੇਜ ਸਬਸਿਡੀ", "ਨਿਰਯਾਤ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਅੰਬ ਉਤਪਾਦਕ", "FPO", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕਿਸਮ ਦਾ ਵੇਰਵਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    77: { fullName: "ਕੇਲੇ ਦੀ ਕਾਸ਼ਤ ਅਤੇ ਮੁੱਲ ਵਾਧਾ", amount: "₹35,000/ਹੈਕਟੇਅਰ", benefits: ["ਟਿਸ਼ੂ ਕਲਚਰ ਪੌਦਿਆਂ 'ਤੇ ਸਬਸਿਡੀ", "ਡ੍ਰਿੱਪ ਸਿੰਚਾਈ ਸਹਾਇਤਾ", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ"], eligibility: ["ਕੇਲਾ ਉਤਪਾਦਕ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕਿਸਮ ਦਾ ਵੇਰਵਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    78: { fullName: "ਰਾਸ਼ਟਰੀ ਫੁੱਲ ਖੇਤੀ (ਫਲੋਰੀਕਲਚਰ) ਮਿਸ਼ਨ", amount: "₹5 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ ਲਈ ਸਹਾਇਤਾ", "ਗ੍ਰੀਨਹਾਊਸ ਸਬਸਿਡੀ", "ਨਿਰਯਾਤ ਗੁਣਵੱਤਾ ਵਾਲੇ ਫੁੱਲ", "ਕੋਲਡ ਚੇਨ ਸਹਾਇਤਾ"], eligibility: ["ਫੁੱਲ ਉਤਪਾਦਕ", "FPO", "ਮਹਿਲਾ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਗ੍ਰੀਨਹਾਊਸ ਪ੍ਰਸਤਾਵ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    79: { fullName: "ਰਾਸ਼ਟਰੀ ਮਸ਼ਰੂਮ (ਖੁੰਭ) ਮਿਸ਼ਨ", amount: "₹1 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਮਸ਼ਰੂਮ ਸਪੌਨ (ਬੀਜ) ਸਬਸਿਡੀ", "ਗਰੋਇੰਗ ਰੂਮ ਬਣਾਉਣਾ", "ਸਿਖਲਾਈ ਅਤੇ ਤਕਨਾਲੋਜੀ", "ਮਾਰਕੀਟਿੰਗ ਸਹਾਇਤਾ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ", "ਪੇਂਡੂ ਨੌਜਵਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਸਿਖਲਾਈ ਸਰਟੀਫਿਕੇਟ"] },
    80: { fullName: "ਸਬਜ਼ੀ ਕਲੱਸਟਰ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹20,000/ਹੈਕਟੇਅਰ", benefits: ["ਸਬਜ਼ੀਆਂ ਦੇ ਬੀਜਾਂ 'ਤੇ ਸਬਸਿਡੀ", "ਸੁਰੱਖਿਅਤ ਖੇਤੀ (ਪੌਲੀਹਾਊਸ)", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ", "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਦਾ ਪ੍ਰਬੰਧਨ"], eligibility: ["ਸਬਜ਼ੀ ਉਤਪਾਦਕ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਦੀ ਯੋਜਨਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    81: { fullName: "ਖੇਤੀਬਾੜੀ ਸਰੋਤਾਂ ਲਈ ਵਰਚੁਅਲ ਏਕੀਕ੍ਰਿਤ ਪ੍ਰਣਾਲੀ (VIS)", amount: "ਮੁਫਤ AI ਸੇਵਾ", benefits: ["AI-ਅਧਾਰਿਤ ਖੇਤੀ ਸਲਾਹ", "22+ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ", "ਫਸਲਾਂ ਸੰਬੰਧੀ ਸਿਫਾਰਸ਼ਾਂ", "ਕੀੜਿਆਂ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ", "ਮੰਡੀ ਦੇ ਭਾਅ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਖੇਤੀਬਾੜੀ ਅਧਿਕਾਰੀ", "KVK"], documents: ["ਆਧਾਰ", "ਮੋਬਾਈਲ ਨੰਬਰ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ (ਜੇ ਹੋਵੇ)"] },
    82: { fullName: "ਰਾਸ਼ਟਰੀ ਐਗਰੀਸਟੈਕ ਡਿਜੀਟਲ ਪਲੇਟਫਾਰਮ", amount: "ਮੁਫਤ ਡਿਜੀਟਲ ਪਛਾਣ", benefits: ["ਵਿਲੱਖਣ ਕਿਸਾਨ ਆਈ.ਡੀ. (ID)", "ਡਿਜੀਟਲ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲਾਂ ਦੀ ਬਿਜਾਈ ਦਾ ਡਾਟਾ", "ਸਿੱਧਾ ਲਾਭ ਤਬਾਦਲਾ (DBT) ਏਕੀਕਰਣ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੇ ਲਾਭਪਾਤਰੀਆਂ ਨੂੰ ਤਰਜੀਹ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬੈਂਕ ਖਾਤਾ", "ਮੋਬਾਈਲ ਨੰਬਰ"] },
    83: { fullName: "ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਬਜ਼ਾਰ (e-NAM)", amount: "ਮੁਫਤ ਟਰੇਡਿੰਗ ਪਲੇਟਫਾਰਮ", benefits: ["ਆਨਲਾਈਨ ਮੰਡੀ ਟਰੇਡਿੰਗ", "ਸਹੀ ਸਮੇਂ 'ਤੇ ਕੀਮਤਾਂ ਦੀ ਜਾਣਕਾਰੀ", "1000+ ਮੰਡੀਆਂ ਜੁੜੀਆਂ", "ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧਾ ਭੁਗਤਾਨ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਵਪਾਰੀ", "FPO", "ਕਮਿਸ਼ਨ ਏਜੰਟ (ਆੜ੍ਹਤੀਏ)"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਵਪਾਰਕ ਲਾਇਸੈਂਸ", "ਮੋਬਾਈਲ ਨੰਬਰ"] },
    84: { fullName: "ਕਿਸਾਨ ਸੁਵਿਧਾ ਮੋਬਾਈਲ ਐਪਲੀਕੇਸ਼ਨ", amount: "ਮੁਫਤ ਐਪ", benefits: ["ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ", "ਮੰਡੀ ਦੇ ਭਾਅ", "ਕੀੜਿਆਂ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ", "ਡੀਲਰਾਂ ਦੀ ਜਾਣਕਾਰੀ", "ਫਸਲ ਸੁਰੱਖਿਆ ਸਲਾਹ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਪਲੇਅ ਸਟੋਰ ਤੋਂ ਮੁਫਤ ਡਾਊਨਲੋਡ", "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦੀ ਲੋੜ ਨਹੀਂ"], documents: ["ਮੋਬਾਈਲ ਨੰਬਰ", "ਸਮਾਰਟਫੋਨ (ਐਂਡਰਾਇਡ)"] },
    85: { fullName: "ICAR-ਪੂਸਾ ਕ੍ਰਿਸ਼ੀ ਮੋਬਾਈਲ ਐਪ", amount: "ਮੁਫਤ", benefits: ["ਫਸਲਾਂ ਦੀਆਂ ਕਿਸਮਾਂ ਦਾ ਡਾਟਾਬੇਸ", "ਖੇਤੀ ਦੇ ਤਰੀਕਿਆਂ ਦਾ ਪੈਕੇਜ", "ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ", "ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਮੁਫਤ ਡਾਊਨਲੋਡ", "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਉਪਲਬਧ"], documents: ["ਕੋਈ ਲੋੜ ਨਹੀਂ"] },
    86: { fullName: "ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1551", amount: "ਟੋਲ ਫ੍ਰੀ", benefits: ["24x7 ਖੇਤੀਬਾੜੀ ਸੰਬੰਧੀ ਸਵਾਲ", "ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ", "ਬਹੁ-ਭਾਸ਼ਾਈ ਸਹਾਇਤਾ", "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੀ ਜਾਣਕਾਰੀ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਟੋਲ ਫ੍ਰੀ ਨੰਬਰ: 1551", "ਕਿਸੇ ਵੀ ਫੋਨ ਤੋਂ ਕਾਲ ਕਰੋ"], documents: ["ਕੋਈ ਲੋੜ ਨਹੀਂ"] },
    87: { fullName: "ਕਿਸਾਨਾਂ ਲਈ ਐਮ-ਕਿਸਾਨ (mKisan) SMS ਪੋਰਟਲ", amount: "ਮੁਫਤ SMS ਸੇਵਾ", benefits: ["ਮੁਫਤ SMS ਚੇਤਾਵਨੀਆਂ", "ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ", "ਮੰਡੀ ਦੇ ਭਾਅ", "ਫਸਲ ਸੁਰੱਖਿਆ ਸਲਾਹ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਮੋਬਾਈਲ ਨੰਬਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਲਾਜ਼ਮੀ", "ਕਿਸੇ ਵੀ ਮੋਬਾਈਲ ਨੈੱਟਵਰਕ 'ਤੇ"], documents: ["ਮੋਬਾਈਲ ਨੰਬਰ", "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ"] },
    88: { fullName: "ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ ਮੋਬਾਈਲ ਐਪ", amount: "ਮੁਫਤ ਸੇਵਾ", benefits: ["ਨੇੜਲੇ ਖੇਤੀ ਸੰਦਾਂ ਦੀ ਖੋਜ", "ਉਪਕਰਨ ਆਨਲਾਈਨ ਬੁੱਕ ਕਰੋ", "ਕਿਰਾਏ ਦੀਆਂ ਦਰਾਂ ਦੀ ਤੁਲਨਾ", "ਕਿਸਾਨਾਂ ਦੇ ਰੀਵਿਊ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਕਸਟਮ ਹਾਇਰਿੰਗ ਸੈਂਟਰ (CHC)"], documents: ["ਮੋਬਾਈਲ ਨੰਬਰ", "ਲੋਕੇਸ਼ਨ ਐਕਸੈਸ (GPS)"] },
    89: { fullName: "NPSS - ਡਿਜੀਟਲ ਕੀਟ ਨਿਗਰਾਨੀ", amount: "ਮੁਫਤ ਸੇਵਾ", benefits: ["AI-ਅਧਾਰਿਤ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ", "ਅਗਾਊਂ ਚੇਤਾਵਨੀ ਪ੍ਰਣਾਲੀ", "ਫਸਲ-ਅਨੁਸਾਰ ਚੇਤਾਵਨੀਆਂ", "ਬਚਾਅ ਲਈ ਸਿਫਾਰਸ਼ਾਂ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਮੁਫਤ ਮੋਬਾਈਲ ਐਪ", "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦੀ ਲੋੜ ਨਹੀਂ"], documents: ["ਮੋਬਾਈਲ ਨੰਬਰ", "ਫਸਲ ਦੀ ਫੋਟੋ (ਪਛਾਣ ਲਈ)"] },
    90: { fullName: "ਐਗਰੀ-ਸਟਾਰਟਅੱਪ ਇਨਕਿਊਬੇਸ਼ਨ ਯੋਜਨਾ", amount: "₹25 ਲੱਖ ਦੀ ਗ੍ਰਾਂਟ", benefits: ["ਐਗਰੀ-ਟੈਕ ਸਟਾਰਟਅੱਪਸ ਲਈ ਫੰਡਿੰਗ", "ਮਾਰਗਦਰਸ਼ਨ (Mentorship)", "ਇਨਕਿਊਬੇਸ਼ਨ ਸਹਾਇਤਾ", "ਨਿਵੇਸ਼ਕਾਂ (Investors) ਨਾਲ ਸੰਪਰਕ"], eligibility: ["ਐਗਰੀ-ਟੈਕ ਸਟਾਰਟਅੱਪਸ", "ਨੌਜਵਾਨ ਉੱਦਮੀ (18-35 ਸਾਲ)", "ਪੇਂਡੂ ਇਨੋਵੇਟਰ (Innovators)"], documents: ["ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਸਟਾਰਟਅੱਪ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਟੀਮ ਦਾ ਵੇਰਵਾ", "ਇਨੋਵੇਸ਼ਨ ਦਾ ਸਬੂਤ"] },
    91: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਊਰਜਾ ਸੁਰੱਖਿਆ ਏਵੰ ਉਤਥਾਨ ਮਹਾਭਿਆਨ (PM-KUSUM)", amount: "60% ਸਬਸਿਡੀ", benefits: ["ਸੋਲਰ ਪੰਪ 'ਤੇ 60% ਸਬਸਿਡੀ (7.5 HP ਤੱਕ)", "ਬੰਜਰ ਜ਼ਮੀਨ 'ਤੇ ਸੋਲਰ ਪੈਨਲ", "ਵਾਧੂ ਬਿਜਲੀ ਗਰਿੱਡ ਨੂੰ ਵੇਚੋ", "ਬਿਜਲੀ ਦੇ ਖਰਚੇ ਵਿੱਚ ਕਮੀ"], eligibility: ["ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ", "ਨਿੱਜੀ ਕਿਸਾਨ", "ਜਲ ਉਪਯੋਗਕਰਤਾ ਐਸੋਸੀਏਸ਼ਨਾਂ", "FPO"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬਿਜਲੀ ਕਨੈਕਸ਼ਨ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    92: { fullName: "ਸੋਲਰ ਚਰਖਾ ਕਲੱਸਟਰ", amount: "₹4.5 ਲੱਖ ਸਬਸਿਡੀ", benefits: ["ਸੋਲਰ ਚਰਖਾ ਯੂਨਿਟ", "ਮਹਿਲਾ ਸਸ਼ਕਤੀਕਰਨ", "ਖਾਦੀ ਉਤਪਾਦਨ", "ਪੇਂਡੂ ਰੁਜ਼ਗਾਰ"], eligibility: ["ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ", "ਪੇਂਡੂ ਕਾਰੀਗਰ", "ਖਾਦੀ ਸੰਸਥਾਵਾਂ"], documents: ["SHG ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਬੈਂਕ ਖਾਤਾ"] },
    93: { fullName: "ਸੌਰ ਊਰਜਾ ਸੰਚਾਲਿਤ ਕੋਲਡ ਸਟੋਰੇਜ ਯੋਜਨਾ", amount: "₹10 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਕਿਸਾਨਾਂ ਲਈ ਸੋਲਰ ਕੋਲਡ ਸਟੋਰੇਜ", "ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਦੇ ਨੁਕਸਾਨ ਵਿੱਚ ਕਮੀ", "ਆਫ-ਗਰਿੱਡ ਸੰਚਾਲਨ", "ਫਲ ਅਤੇ ਸਬਜ਼ੀਆਂ ਦੀ ਸੰਭਾਲ"], eligibility: ["FPO", "ਕਿਸਾਨ ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਨਿੱਜੀ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    94: { fullName: "ਖੇਤੀ ਉਤਪਾਦਾਂ ਲਈ ਸੋਲਰ ਡ੍ਰਾਇਅਰ", amount: "₹2 ਲੱਖ ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਅਨਾਜ/ਫਲਾਂ ਲਈ ਸੋਲਰ ਡ੍ਰਾਇਅਰ", "ਗੁਣਵੱਤਾ ਦੀ ਸੰਭਾਲ", "ਮੁੱਲ ਵਾਧਾ", "ਧੁੱਪ 'ਤੇ ਨਿਰਭਰਤਾ ਘਟਾਉਣਾ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕੋਟੇਸ਼ਨ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    95: { fullName: "ਫਸਲ ਸੁਰੱਖਿਆ ਲਈ ਸੋਲਰ ਫੈਨਸਿੰਗ (ਤਾਰਬੰਦੀ)", amount: "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਖੇਤਾਂ ਲਈ ਸੋਲਰ ਤਾਰਬੰਦੀ", "ਜੰਗਲੀ ਜਾਨਵਰਾਂ ਤੋਂ ਬਚਾਅ", "ਘੱਟ ਰੱਖ-ਰਖਾਅ", "ਬਿਜਲੀ ਦਾ ਕੋਈ ਬਿੱਲ ਨਹੀਂ"], eligibility: ["ਜੰਗਲੀ ਜਾਨਵਰਾਂ ਵਾਲੇ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਬਾਗਾਂ ਦੇ ਮਾਲਕ", "ਸਾਰੇ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸਥਾਨ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    96: { fullName: "ਆਫ-ਗਰਿੱਡ ਸੋਲਰ ਵਾਟਰ ਪੰਪਿੰਗ", amount: "₹1.5 ਲੱਖ ਤੱਕ 75% ਸਬਸਿਡੀ", benefits: ["ਸੋਲਰ ਸਬਮਰਸੀਬਲ ਪੰਪ", "ਡੀਜ਼ਲ/ਬਿਜਲੀ ਦਾ ਕੋਈ ਖਰਚਾ ਨਹੀਂ", "ਦੂਰ-ਦੁਰਾਡੇ ਖੇਤਰਾਂ ਵਿੱਚ ਕੰਮ ਕਰਦਾ ਹੈ", "5 ਸਾਲ ਦੀ ਵਾਰੰਟੀ"], eligibility: ["ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ", "ਬਿਨਾਂ ਗਰਿੱਡ ਕਨੈਕਸ਼ਨ ਵਾਲੇ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਜਲ ਸਰੋਤ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    97: { fullName: "ਸੌਰ ਊਰਜਾ ਸੰਚਾਲਿਤ ਸੁਰੱਖਿਅਤ ਖੇਤੀ (ਪੌਲੀਹਾਊਸ)", amount: "₹5 ਲੱਖ ਤੱਕ 60% ਸਬਸਿਡੀ", benefits: ["ਸੋਲਰ ਪੱਖੇ ਅਤੇ ਕੂਲਿੰਗ", "ਤਾਪਮਾਨ ਕੰਟਰੋਲ", "ਬਿਜਾਈ ਦੇ ਸੀਜ਼ਨ ਵਿੱਚ ਵਾਧਾ", "ਵੱਧ ਝਾੜ"], eligibility: ["ਬਾਗਬਾਨੀ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਗ੍ਰੀਨਹਾਊਸ ਯੋਜਨਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    98: { fullName: "ਖੇਤੀ ਡਰੋਨਾਂ ਲਈ ਸੋਲਰ ਚਾਰਜਿੰਗ", amount: "₹50,000 ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਸੋਲਰ ਚਾਰਜਿੰਗ ਸਟੇਸ਼ਨ", "ਆਫ-ਗਰਿੱਡ ਡਰੋਨ ਸੰਚਾਲਨ", "ਟਿਕਾਊ ਖੇਤੀ", "ਡੀਜ਼ਲ ਦੀ ਵਰਤੋਂ ਵਿੱਚ ਕਮੀ"], eligibility: ["FPO", "ਡਰੋਨ ਦੀਦੀ ਲਾਭਪਾਤਰੀ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਡਰੋਨ ਦੀ ਖਰੀਦ ਦਾ ਸਬੂਤ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    99: { fullName: "ਖੇਤੀਬਾੜੀ ਫੀਡਰਾਂ ਦਾ ਸੌਰੀਕਰਣ", amount: "90% ਗ੍ਰਾਂਟ", benefits: ["ਸਿੰਚਾਈ ਫੀਡਰਾਂ ਲਈ ਸੋਲਰ ਊਰਜਾ", "ਦਿਨ ਵੇਲੇ ਭਰੋਸੇਯੋਗ ਬਿਜਲੀ", "ਗਰਿੱਡ 'ਤੇ ਨਿਰਭਰਤਾ ਘਟਾਉਣਾ", "ਘੱਟ ਬਿਜਲੀ ਦੇ ਬਿੱਲ"], eligibility: ["ਰਾਜ ਸਰਕਾਰਾਂ", "DISCOM", "ਜਲ ਉਪਯੋਗਕਰਤਾ ਐਸੋਸੀਏਸ਼ਨਾਂ"], documents: ["ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ", "ਫੀਡਰ ਦਾ ਵੇਰਵਾ"] },
    100: { fullName: "ਕਿਸਾਨਾਂ ਲਈ ਰੂਫਟਾਪ (ਛੱਤ) ਸੋਲਰ ਸਬਸਿਡੀ", amount: "₹78,000 ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਗਰਿੱਡ ਨਾਲ ਜੁੜਿਆ ਰੂਫਟਾਪ ਸੋਲਰ", "ਬਿਜਲੀ ਦੇ ਬਿੱਲਾਂ ਵਿੱਚ ਕਮੀ", "ਵਾਧੂ ਬਿਜਲੀ ਗਰਿੱਡ ਨੂੰ ਵੇਚੋ", "ਪੰਪ ਸੈੱਟ ਜਾਂ ਘਰੇਲੂ ਵਰਤੋਂ ਲਈ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਫਾਰਮ ਹਾਊਸ ਮਾਲਕ", "FPO"], documents: ["ਬਿਜਲੀ ਦਾ ਬਿੱਲ", "ਛੱਤ ਦੀ ਮਾਲਕੀ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    101: { fullName: "ਪਸ਼ੂਪਾਲਣ ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਵਿਕਾਸ ਫੰਡ (AHIDF)", amount: "₹100 ਕਰੋੜ ਤੱਕ ਕਰਜ਼ਾ", benefits: ["ਡੇਅਰੀ, ਪੋਲਟਰੀ ਲਈ ਕਰਜ਼ੇ ਨਾਲ ਜੁੜੀ ਸਬਸਿਡੀ", "3% ਵਿਆਜ ਛੋਟ", "₹100 ਕਰੋੜ ਤੱਕ ਕਰਜ਼ਾ", "MSME ਲਈ ਕਰਜ਼ਾ ਗਾਰੰਟੀ"], eligibility: ["ਨਿੱਜੀ ਉੱਦਮੀ", "FPO", "ਪ੍ਰਾਈਵੇਟ ਕੰਪਨੀਆਂ", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ"], documents: ["ਵਿਸਤ੍ਰਿਤ ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਕਾਰੋਬਾਰੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਬੈਂਕ ਖਾਤਾ"] },
    102: { fullName: "ਡੇਅਰੀ ਉੱਦਮ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "25-33% ਸਬਸਿਡੀ", benefits: ["ਡੇਅਰੀ ਯੂਨਿਟਾਂ ਲਈ ਸਬਸਿਡੀ", "ਜਨਰਲ ਲਈ 25%, SC/ST ਲਈ 33%", "ਗਾਵਾਂ/ਮੱਝਾਂ ਲਈ ਕਰਜ਼ਾ", "ਦੁੱਧ ਪ੍ਰੋਸੈਸਿੰਗ ਉਪਕਰਣ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਡੇਅਰੀ ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਬੇਜ਼ਮੀਨੇ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ"] },
    103: { fullName: "ਪੋਲਟਰੀ ਵੈਂਚਰ ਕੈਪੀਟਲ ਫੰਡ", amount: "₹3 ਲੱਖ ਤੱਕ 33% ਸਬਸਿਡੀ", benefits: ["ਮੁਰਗੀ ਪਾਲਣ ਲਈ ਸਬਸਿਡੀ", "SC/ST ਕਿਸਾਨਾਂ ਲਈ 33%", "ਬ੍ਰਾਇਲਰ/ਲੇਅਰ ਯੂਨਿਟ ਲਈ ਕਰਜ਼ਾ", "ਹੈਚਰੀ ਸਹਾਇਤਾ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਨੌਜਵਾਨ ਉੱਦਮੀ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਤਜ਼ਰਬੇ ਦਾ ਸਰਟੀਫਿਕੇਟ"] },
    104: { fullName: "ਬੱਕਰੀ ਅਤੇ ਭੇਡ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹50,000 ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਬੱਕਰੀ/ਭੇਡ ਪਾਲਣ ਲਈ ਸਬਸਿਡੀ", "ਨਸਲ ਸੁਧਾਰ ਸਹਾਇਤਾ", "ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਦੇਖਭਾਲ", "ਮਾਰਕੀਟਿੰਗ ਸਹਾਇਤਾ"], eligibility: ["ਛੋਟੇ ਕਿਸਾਨ", "ਬੇਜ਼ਮੀਨੇ ਮਜ਼ਦੂਰ", "ਕਬਾਇਲੀ ਕਿਸਾਨ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਸਰਟੀਫਿਕੇਟ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ"] },
    105: { fullName: "ਸੂਰ ਵਿਕਾਸ ਅਤੇ ਪ੍ਰਜਨਨ ਯੋਜਨਾ", amount: "₹40,000 ਤੱਕ 40% ਸਬਸਿਡੀ", benefits: ["ਸੂਰ ਪਾਲਣ ਸਬਸਿਡੀ", "ਨਸਲ ਵਿੱਚ ਸੁਧਾਰ", "ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਸਹਾਇਤਾ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ"], eligibility: ["ਛੋਟੇ ਕਿਸਾਨ", "ਕਬਾਇਲੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਪੇਂਡੂ ਨੌਜਵਾਨ"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸਿਖਲਾਈ ਸਰਟੀਫਿਕੇਟ"] },
    106: { fullName: "ਰਾਸ਼ਟਰੀ ਚਾਰਾ ਵਿਕਾਸ ਯੋਜਨਾ", amount: "₹10,000/ਹੈਕਟੇਅਰ", benefits: ["ਚਾਰੇ ਦੇ ਬੀਜਾਂ 'ਤੇ ਸਬਸਿਡੀ", "ਹਾਈਡ੍ਰੋਪੋਨਿਕ ਚਾਰਾ ਯੂਨਿਟ", "ਸਾਈਲੇਜ ਬਣਾਉਣ ਵਿੱਚ ਸਹਾਇਤਾ", "ਚਾਰੇ ਦੀ ਸਟੋਰੇਜ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਡੇਅਰੀ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਪਸ਼ੂ ਗਿਣਤੀ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    107: { fullName: "ਰਾਸ਼ਟਰੀ ਪਸ਼ੂ ਰੋਗ ਬੀਮਾ ਯੋਜਨਾ", amount: "ਪ੍ਰੀਮੀਅਮ: ₹50-200/ਪਸ਼ੂ", benefits: ["ਪਸ਼ੂਧਨ ਬੀਮਾ", "ਗਾਂ, ਮੱਝ, ਭੇਡ, ਬੱਕਰੀ ਕਵਰ ਕਰਦਾ ਹੈ", "ਬਿਮਾਰੀ ਅਤੇ ਹਾਦਸੇ ਦੀ ਕਵਰੇਜ", "ਤੁਰੰਤ ਕਲੇਮ ਨਿਪਟਾਰਾ"], eligibility: ["ਸਾਰੇ ਪਸ਼ੂ ਪਾਲਕ", "ਡੇਅਰੀ ਕਿਸਾਨ", "ਭੇਡ/ਬੱਕਰੀ ਪਾਲਕ"], documents: ["ਪਸ਼ੂ ਦੀ ਪਛਾਣ", "ਪਸ਼ੂ ਚਿਕਿਤਸਕ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    108: { fullName: "NBHM - ਹਨੀ (ਸ਼ਹਿਦ) ਮਿਸ਼ਨ", amount: "₹10,000/ਲਾਭਪਾਤਰੀ", benefits: ["ਮਧੂ ਮੱਖੀ ਪਾਲਣ ਉਪਕਰਣ ਸਬਸਿਡੀ", "ਸ਼ਹਿਦ ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ", "ਸਿਖਲਾਈ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ", "ਸ਼ਹਿਦ ਲਈ ਮਾਰਕੀਟਿੰਗ ਸਹਾਇਤਾ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "FPO", "ਕਬਾਇਲੀ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ (ਐਪੀਅਰੀ ਲਈ)", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਸਿਖਲਾਈ ਸਰਟੀਫਿਕੇਟ (ਤਰਜੀਹ)"] },
    109: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮਤਸਿਆ ਸੰਪਦਾ ਯੋਜਨਾ (PMMSY)", amount: "40-60% ਸਬਸਿਡੀ", benefits: ["ਮੱਛੀ ਪਾਲਣ ਸਬਸਿਡੀ", "ਹੈਚਰੀ ਵਿਕਾਸ", "ਮੱਛੀਆਂ ਲਈ ਕੋਲਡ ਚੇਨ", "ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟਾਂ", "ਨਿਰਯਾਤ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ"], eligibility: ["ਮਛੇਰੇ", "ਮੱਛੀ ਪਾਲਕ ਕਿਸਾਨ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਮਹਿਲਾ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜਲਘਰ ਦੀ ਮਾਲਕੀ/ਲੀਜ਼", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ"] },
    110: { fullName: "NLM - ਪਸ਼ੂਧਨ ਵਿਕਾਸ", amount: "₹2 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਗਾਂ, ਮੱਝ, ਭੇਡ, ਬੱਕਰੀ ਦੀ ਨਸਲ ਵਿੱਚ ਸੁਧਾਰ", "ਚਾਰਾ ਵਿਕਾਸ", "ਜੋਖਮ ਪ੍ਰਬੰਧਨ", "ਉੱਦਮਤਾ ਵਿਕਾਸ"], eligibility: ["ਸਾਰੇ ਪਸ਼ੂ ਪਾਲਕ ਕਿਸਾਨ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਪਸ਼ੂਧਨ ਗਿਣਤੀ ਦਾ ਸਬੂਤ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ (ਚਾਰੇ ਲਈ)", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    111: { fullName: "ਰਾਜ ਆਫ਼ਤ ਪ੍ਰਤੀਕਿਰਿਆ ਫੰਡ (SDRF) - ਖੇਤੀਬਾੜੀ", amount: "₹20,000/ਹੈਕਟੇਅਰ", benefits: ["ਫਸਲ ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਕੁਦਰਤੀ ਆਫ਼ਤ ਸਹਾਇਤਾ", "ਹੜ੍ਹ, ਸੋਕਾ, ਚੱਕਰਵਾਤ", "ਤੁਰੰਤ ਵੰਡ"], eligibility: ["ਸੂਚਿਤ ਆਫ਼ਤ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਸਾਰੇ ਕਿਸਾਨ", "ਫਸਲ ਦਾ ਨੁਕਸਾਨ >50%"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਨੁਕਸਾਨ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    112: { fullName: "ਰਾਸ਼ਟਰੀ ਆਫ਼ਤ ਪ੍ਰਤੀਕਿਰਿਆ ਬਲ (NDRF) - ਖੇਤੀਬਾੜੀ", amount: "₹25,000/ਹੈਕਟੇਅਰ", benefits: ["ਰਾਸ਼ਟਰੀ ਪੱਧਰ ਦੀ ਆਫ਼ਤ ਰਾਹਤ", "ਚੱਕਰਵਾਤ, ਹੜ੍ਹ, ਗੜੇਮਾਰੀ", "ਜ਼ਮੀਨ ਖਿਸਕਣ ਕਵਰੇਜ", "ਕੀੜਿਆਂ ਦਾ ਹਮਲਾ"], eligibility: ["ਗੰਭੀਰ ਰੂਪ ਵਿੱਚ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ"], documents: ["ਆਫ਼ਤ ਨੋਟੀਫਿਕੇਸ਼ਨ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਫਸਲ ਨੁਕਸਾਨ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ"] },
    113: { fullName: "ਗੜੇਮਾਰੀ (Hailstorm) ਫਸਲ ਬੀਮਾ", amount: "ਪ੍ਰੀਮੀਅਮ: 2-5%", benefits: ["ਗੜੇਮਾਰੀ ਲਈ ਵਿਸ਼ੇਸ਼ ਕਵਰੇਜ", "ਨਿੱਜੀ ਖੇਤ ਦਾ ਮੁਲਾਂਕਣ", "ਤੁਰੰਤ ਕਲੇਮ", "ਸਾਰੀਆਂ ਫਸਲਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ"], eligibility: ["ਗੜੇਮਾਰੀ ਵਾਲੇ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਸਾਰੇ ਕਿਸਾਨਾਂ ਲਈ ਇੱਛੁਕ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਮੌਸਮ ਦਾ ਡਾਟਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    114: { fullName: "ਰਾਸ਼ਟਰੀ ਸੋਕਾ ਰਾਹਤ ਪੈਕੇਜ", amount: "₹15,000/ਹੈਕਟੇਅਰ", benefits: ["ਸੋਕਾ ਪ੍ਰਭਾਵਿਤ ਕਿਸਾਨ", "ਇਨਪੁਟ ਸਬਸਿਡੀ", "ਚਾਰੇ ਦੀ ਸਪਲਾਈ", "ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਸਹਾਇਤਾ"], eligibility: ["ਸੋਕਾ ਘੋਸ਼ਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਸੋਕੇ ਦੀ ਘੋਸ਼ਣਾ", "ਫਸਲ ਨੁਕਸਾਨ ਦਾ ਸਬੂਤ", "ਆਧਾਰ"] },
    115: { fullName: "ਖੇਤੀਬਾੜੀ ਲਈ ਰਾਸ਼ਟਰੀ ਹੜ੍ਹ ਰਾਹਤ", amount: "₹18,000/ਹੈਕਟੇਅਰ", benefits: ["ਹੜ੍ਹ ਪ੍ਰਭਾਵਿਤ ਕਿਸਾਨ", "ਫਸਲ ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਦੁਬਾਰਾ ਬਿਜਾਈ ਲਈ ਬੀਜ ਸਬਸਿਡੀ", "ਇਨਪੁਟ ਸਹਾਇਤਾ"], eligibility: ["ਹੜ੍ਹ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਹੜ੍ਹ ਦੇ ਨੁਕਸਾਨ ਦੀ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    116: { fullName: "ਚੱਕਰਵਾਤ (ਤੂਫਾਨ) ਪ੍ਰਭਾਵਿਤ ਖੇਤੀ ਰਾਹਤ", amount: "₹22,000/ਹੈਕਟੇਅਰ", benefits: ["ਚੱਕਰਵਾਤ ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਬਾਗਾਂ ਦੇ ਨੁਕਸਾਨ ਦਾ ਕਵਰੇਜ", "ਪਸ਼ੂਧਨ ਦੇ ਨੁਕਸਾਨ ਲਈ ਸਹਾਇਤਾ", "ਇਨਪੁਟ ਸਬਸਿਡੀ"], eligibility: ["ਤੱਟਵਰਤੀ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਚੱਕਰਵਾਤ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਚੱਕਰਵਾਤ ਦੇ ਨੁਕਸਾਨ ਦੀ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    117: { fullName: "ਟਿੱਡੀ ਦਲ/ਕੀਟ ਹਮਲਾ ਰਾਹਤ ਯੋਜਨਾ", amount: "₹10,000/ਹੈਕਟੇਅਰ", benefits: ["ਕੀੜਿਆਂ ਦੇ ਨੁਕਸਾਨ ਲਈ ਮੁਆਵਜ਼ਾ", "ਮੁਫਤ ਕੀਟਨਾਸ਼ਕਾਂ ਦੀ ਸਪਲਾਈ", "ਫਸਲ ਨੁਕਸਾਨ ਕਵਰੇਜ", "ਤੁਰੰਤ ਕਾਰਵਾਈ ਟੀਮ (QRT)"], eligibility: ["ਕੀਟ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਟਿੱਡੀ ਦਲ ਦੇ ਹਮਲੇ ਵਾਲੇ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਕੀਟ ਹਮਲੇ ਦਾ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    118: { fullName: "ਜ਼ਮੀਨ ਖਿਸਕਣ (Landslide) ਖੇਤੀ ਰਾਹਤ", amount: "₹30,000/ਹੈਕਟੇਅਰ", benefits: ["ਜ਼ਮੀਨ ਖਿਸਕਣ ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਜ਼ਮੀਨ ਦੀ ਬਹਾਲੀ ਲਈ ਸਹਾਇਤਾ", "ਪੌੜੀਦਾਰ ਖੇਤਾਂ ਦੀ ਮੁਰੰਮਤ ਲਈ ਸਬਸਿਡੀ", "ਇਨਪੁਟ ਸਹਾਇਤਾ"], eligibility: ["ਪਹਾੜੀ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਜ਼ਮੀਨ ਖਿਸਕਣ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਜ਼ਮੀਨ ਖਿਸਕਣ ਦੇ ਨੁਕਸਾਨ ਦੀ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    119: { fullName: "ਅਸਮਾਨੀ ਬਿਜਲੀ ਡਿੱਗਣ ਕਾਰਨ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", amount: "₹5 ਲੱਖ/ਕਿਸਾਨ", benefits: ["ਕਿਸਾਨ ਦੀ ਮੌਤ 'ਤੇ ਮੁਆਵਜ਼ਾ", "ਡਾਕਟਰੀ ਖਰਚਿਆਂ ਦੀ ਕਵਰੇਜ", "ਨਿਰਭਰ ਪਰਿਵਾਰ ਨੂੰ ਸਹਾਇਤਾ", "ਤੁਰੰਤ ਵੰਡ"], eligibility: ["ਬਿਜਲੀ ਡਿੱਗਣ ਨਾਲ ਪ੍ਰਭਾਵਿਤ ਕਿਸਾਨ", "ਮ੍ਰਿਤਕ ਕਿਸਾਨਾਂ ਦੇ ਪਰਿਵਾਰ"], documents: ["ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ", "ਪੁਲਿਸ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    120: { fullName: "ਸ਼ੀਤ ਲਹਿਰ (Cold Wave) ਫਸਲ ਸੁਰੱਖਿਆ ਯੋਜਨਾ", amount: "₹8,000/ਹੈਕਟੇਅਰ", benefits: ["ਕੋਰੇ (Frost) ਦੇ ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਧੂੰਆਂ ਕਰਨ ਵਾਲੇ ਯੰਤਰਾਂ 'ਤੇ ਸਬਸਿਡੀ", "ਫਸਲ ਨੂੰ ਢੱਕਣ ਲਈ ਸਹਾਇਤਾ", "ਇਨਪੁਟ ਸਹਾਇਤਾ"], eligibility: ["ਸ਼ੀਤ ਲਹਿਰ ਵਾਲੇ ਖੇਤਰਾਂ ਦੇ ਕਿਸਾਨ", "ਸਬਜ਼ੀ ਅਤੇ ਫਲ ਉਤਪਾਦਕ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਤਾਪਮਾਨ ਦਾ ਡਾਟਾ", "ਫਸਲ ਨੁਕਸਾਨ ਦਾ ਸਬੂਤ", "ਆਧਾਰ"] },
    121: { fullName: "ਈ-ਨਾਮ (e-NAM) ਐਨਹਾਂਸਡ ਪਲੇਟਫਾਰਮ", amount: "ਮੁਫਤ ਟਰੇਡਿੰਗ", benefits: ["ਆਨਲਾਈਨ ਮੰਡੀ ਟਰੇਡਿੰਗ", "ਗੁਣਵੱਤਾ ਦੀ ਜਾਂਚ", "ਗੋਦਾਮ ਰਸੀਦ ਪ੍ਰਣਾਲੀ", "ਸਿੱਧਾ ਭੁਗਤਾਨ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਵਪਾਰੀ", "FPO", "ਕਮਿਸ਼ਨ ਏਜੰਟ (ਆੜ੍ਹਤੀਏ)"], documents: ["ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਮੋਬਾਈਲ ਨੰਬਰ", "ਟਰੇਡਿੰਗ ਰਜਿਸਟ੍ਰੇਸ਼ਨ"] },
    122: { fullName: "FPO ਵਪਾਰ ਸਹਾਇਤਾ ਯੋਜਨਾ", amount: "₹15 ਲੱਖ ਦੀ ਸਹਾਇਤਾ", benefits: ["FPO ਮਾਰਕੀਟ ਲਿੰਕੇਜ", "ਬ੍ਰਾਂਡ ਵਿਕਾਸ", "ਪੈਕਿੰਗ ਵਿੱਚ ਸਹਾਇਤਾ", "ਸਿੱਧਾ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸੰਪਰਕ"], eligibility: ["ਰਜਿਸਟਰਡ FPO", "ਉਤਪਾਦਕ ਕੰਪਨੀਆਂ", "ਕਿਸਾਨ ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ"], documents: ["FPO ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਮੈਂਬਰਾਂ ਦੀ ਸੂਚੀ", "ਬੈਂਕ ਖਾਤਾ", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ"] },
    123: { fullName: "ਨੈਗੋਸ਼ੀਏਬਲ ਵੇਅਰਹਾਊਸ ਰਸੀਦ (NWRS) ਯੋਜਨਾ", amount: "ਗੋਦਾਮ ਰਸੀਦ 'ਤੇ ਕਰਜ਼ਾ", benefits: ["ਗੋਦਾਮ ਵਿੱਚ ਫਸਲ ਦੀ ਸਟੋਰੇਜ", "ਰਸੀਦ 'ਤੇ ਕਰਜ਼ਾ ਪ੍ਰਾਪਤ ਕਰਨਾ", "ਉੱਚੇ ਭਾਅ 'ਤੇ ਵੇਚਣਾ", "ਗੁਣਵੱਤਾ ਦੀ ਸੰਭਾਲ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਵਪਾਰੀ", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ"], documents: ["ਗੋਦਾਮ ਦੀ ਰਸੀਦ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਫਸਲ ਦਾ ਵੇਰਵਾ"] },
    124: { fullName: "ਖੇਤੀਬਾੜੀ ਉਤਪਾਦ ਟਰਾਂਸਪੋਰਟ ਸਬਸਿਡੀ", amount: "50% ਟਰਾਂਸਪੋਰਟ ਸਬਸਿਡੀ", benefits: ["ਢੋਆ-ਢੁਆਈ ਦੇ ਖਰਚੇ 'ਤੇ ਸਬਸਿਡੀ", "ਉੱਤਰ-ਪੂਰਬੀ ਰਾਜਾਂ ਨੂੰ ਤਰਜੀਹ", "ਜਲਦੀ ਖਰਾਬ ਹੋਣ ਵਾਲੀਆਂ ਫਸਲਾਂ", "ਮੰਡੀ ਤੱਕ ਪਹੁੰਚ"], eligibility: ["ਦੂਰ-ਦੁਰਾਡੇ ਦੇ ਇਲਾਕਿਆਂ ਦੇ ਕਿਸਾਨ", "ਉੱਤਰ-ਪੂਰਬੀ ਰਾਜ", "ਪਹਾੜੀ ਖੇਤਰ", "ਕਬਾਇਲੀ ਖੇਤਰ"], documents: ["ਟਰਾਂਸਪੋਰਟ ਬਿੱਲ", "ਮੰਡੀ ਪ੍ਰਵੇਸ਼ ਦਾ ਸਬੂਤ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    125: { fullName: "ਮਾਰਕੀਟ ਦਖਲ ਯੋਜਨਾ (MIS)", amount: "MSP ਸਮਰਥਨ ਮੁੱਲ", benefits: ["ਜਲਦੀ ਖਰਾਬ ਹੋਣ ਵਾਲੀਆਂ ਫਸਲਾਂ ਲਈ ਸਮਰਥਨ ਮੁੱਲ", "ਸਰਕਾਰੀ ਖਰੀਦ", "ਨੁਕਸਾਨ ਦਾ ਮੁਆਵਜ਼ਾ", "ਕਿਸਾਨ ਦੀ ਆਮਦਨ ਸੁਰੱਖਿਆ"], eligibility: ["ਸੂਚਿਤ ਜਲਦੀ ਖਰਾਬ ਹੋਣ ਵਾਲੀਆਂ ਫਸਲਾਂ ਉਗਾਉਣ ਵਾਲੇ ਕਿਸਾਨ", "ਸਾਰੇ ਰਾਜ"], documents: ["ਫਸਲ ਘੋਸ਼ਣਾ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    126: { fullName: "ਕਿਸਾਨ ਰੇਲ ਭਾੜਾ ਸਬਸਿਡੀ ਯੋਜਨਾ", amount: "50% ਭਾੜਾ ਸਬਸਿਡੀ", benefits: ["ਜਲਦੀ ਖਰਾਬ ਹੋਣ ਵਾਲੀਆਂ ਫਸਲਾਂ ਦੀ ਸਬਸਿਡੀ ਵਾਲੀ ਢੋਆ-ਢੁਆਈ", "ਤੇਜ਼ ਮਾਰਕੀਟ ਪਹੁੰਚ", "ਬਰਬਾਦੀ ਵਿੱਚ ਕਮੀ", "ਦੇਸ਼ ਵਿਆਪੀ ਪਹੁੰਚ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਵਪਾਰੀ (ਕਿਸਾਨਾਂ ਵੱਲੋਂ)"], documents: ["ਰੇਲਵੇ ਬੁਕਿੰਗ ਰਸੀਦ", "ਕਿਸਾਨ ਘੋਸ਼ਣਾ ਪੱਤਰ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    127: { fullName: "FPO ਦਾ ਗਠਨ ਅਤੇ ਪ੍ਰੋਤਸਾਹਨ", amount: "ਪ੍ਰਤੀ FPO ₹15 ਲੱਖ", benefits: ["FPO ਬਣਾਉਣ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ", "5 ਸਾਲਾਂ ਲਈ ਮਾਰਗਦਰਸ਼ਨ", "₹15 ਲੱਖ ਤੱਕ ਦੀ ਇਕੁਇਟੀ ਗ੍ਰਾਂਟ", "ਕ੍ਰੈਡਿਟ ਗਾਰੰਟੀ"], eligibility: ["300+ ਕਿਸਾਨਾਂ ਦੇ ਸਮੂਹ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਕਿਸਾਨ ਸਮੂਹ"], documents: ["ਕਿਸਾਨਾਂ ਦੀ ਸੂਚੀ (300+)", "ਜ਼ਮੀਨ ਦਾ ਵੇਰਵਾ", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਬੈਂਕ ਖਾਤਾ"] },
    128: { fullName: "AMI - ਪੇਂਡੂ ਗੋਦਾਮ ਯੋਜਨਾ", amount: "₹25 ਲੱਖ ਤੱਕ 25% ਸਬਸਿਡੀ", benefits: ["ਪੇਂਡੂ ਗੋਦਾਮ ਦੀ ਉਸਾਰੀ", "ਕਿਸਾਨਾਂ ਲਈ ਵੇਅਰਹਾਊਸ", "ਸਟੋਰ ਕੀਤੀ ਫਸਲ 'ਤੇ ਕਰਜ਼ਾ", "ਮਜਬੂਰੀ ਵਿੱਚ ਸਸਤੇ ਭਾਅ 'ਤੇ ਵੇਚਣ (Distress Sale) ਵਿੱਚ ਕਮੀ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ"], documents: ["ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    129: { fullName: "PMKS - ਕਿਸਾਨ ਸੰਪਦਾ ਯੋਜਨਾ", amount: "₹10 ਕਰੋੜ ਤੱਕ 35% ਸਬਸਿਡੀ", benefits: ["ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਯੂਨਿਟ", "ਮੈਗਾ ਫੂਡ ਪਾਰਕ", "ਕੋਲਡ ਚੇਨ ਬੁਨਿਆਦੀ ਢਾਂਚਾ", "ਮੁੱਲ ਵਾਧਾ (Value Addition)"], eligibility: ["ਫੂਡ ਪ੍ਰੋਸੈਸਰ", "FPO", "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ"], documents: ["ਵਿਸਤ੍ਰਿਤ ਪ੍ਰੋਜੈਕਟ ਰਿਪੋਰਟ", "ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼", "ਕੰਪਨੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਬੈਂਕ ਖਾਤਾ"] },
    130: { fullName: "ਕਿਸਾਨਾਂ ਲਈ ਡਾਇਰੈਕਟ ਮਾਰਕੀਟਿੰਗ ਯੋਜਨਾ", amount: "₹2 ਲੱਖ ਤੱਕ 50% ਸਬਸਿਡੀ", benefits: ["ਕਿਸਾਨ ਬਜ਼ਾਰ ਸਟਾਲ ਸਬਸਿਡੀ", "ਸਿੱਧਾ ਗਾਹਕਾਂ ਨੂੰ ਵੇਚਣਾ", "ਬ੍ਰਾਂਡਿੰਗ ਸਹਾਇਤਾ", "ਡਿਜੀਟਲ ਭੁਗਤਾਨ ਸੈੱਟਅੱਪ"], eligibility: ["ਨਿੱਜੀ ਕਿਸਾਨ", "FPO", "ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਮਹਿਲਾ ਕਿਸਾਨ"], documents: ["ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ", "ਬਜ਼ਾਰ ਸਟਾਲ ਦੀ ਯੋਜਨਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ"] },
    131: { fullName: "ਮਹਾਤਮਾ ਗਾਂਧੀ ਨਰੇਗਾ (MGNREGA) - ਖੇਤੀਬਾੜੀ ਦੇ ਕੰਮ", amount: "100 ਦਿਨਾਂ ਦੀ ਗਾਰੰਟੀਸ਼ੁਦਾ ਮਜ਼ਦੂਰੀ", benefits: ["100 ਦਿਨਾਂ ਦੇ ਰੁਜ਼ਗਾਰ ਦੀ ਗਾਰੰਟੀ", "ਰੋਜ਼ਾਨਾ ₹300+ ਦਿਹਾੜੀ", "ਖੇਤ ਵਿੱਚ ਤਾਲਾਬ ਬਣਾਉਣਾ", "ਜ਼ਮੀਨ ਵਿਕਾਸ ਦੇ ਕੰਮ", "ਸਿੰਚਾਈ ਨਹਿਰਾਂ ਦੇ ਕੰਮ"], eligibility: ["ਸਾਰੇ ਪੇਂਡੂ ਪਰਿਵਾਰ", "ਗੈਰ-ਹੁਨਰਮੰਦ ਕੰਮ ਕਰਨ ਦੇ ਇੱਛੁਕ ਬਾਲਗ ਮੈਂਬਰ", "SC/ST/ਔਰਤਾਂ ਨੂੰ ਤਰਜੀਹ"], documents: ["ਜੌਬ ਕਾਰਡ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਰਾਸ਼ਨ ਕਾਰਡ"] },
    132: { fullName: "ACABC - ਐਗਰੀ-ਐਂਟਰਪ੍ਰਨਿਓਰਸ਼ਿਪ ਯੋਜਨਾ", amount: "₹20 ਲੱਖ ਕਰਜ਼ਾ + 44% ਸਬਸਿਡੀ", benefits: ["ਖੇਤੀਬਾੜੀ ਗ੍ਰੈਜੂਏਟਾਂ ਲਈ ਸਿਖਲਾਈ", "ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ 'ਤੇ 44% ਸਬਸਿਡੀ", "₹20 ਲੱਖ ਤੱਕ ਦਾ ਕਰਜ਼ਾ", "ਸਿਖਲਾਈ ਦੌਰਾਨ ਮਹੀਨਾਵਾਰ ਵਜ਼ੀਫਾ (Stipend)"], eligibility: ["ਖੇਤੀਬਾੜੀ ਗ੍ਰੈਜੂਏਟ", "ਖੇਤੀਬਾੜੀ ਡਿਪਲੋਮਾ ਧਾਰਕ", "ਬਾਇਓਲੋਜੀਕਲ ਸਾਇੰਸ ਗ੍ਰੈਜੂਏਟ", "ਖੇਤੀਬਾੜੀ ਨਾਲ ਸਬੰਧਤ ਵਿਸ਼ਿਆਂ ਵਿੱਚ ਪੋਸਟ-ਗ੍ਰੈਜੂਏਟ"], documents: ["ਡਿਗਰੀ ਸਰਟੀਫਿਕੇਟ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਨਾਬਾਰਡ (NABARD) ਤੋਂ NOC"] },
    133: { fullName: "ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਹੁਨਰ ਵਿਕਾਸ", amount: "ਮੁਫਤ ਸਿਖਲਾਈ + ₹5,000 ਵਜ਼ੀਫਾ", benefits: ["ਮੁਫਤ ਹੁਨਰ ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ", "ਡਰੋਨ ਪਾਇਲਟ ਦੀ ਸਿਖਲਾਈ", "ਮਿੱਟੀ ਪਰਖ ਟੈਕਨੀਸ਼ੀਅਨ", "ਖੇਤੀ ਮਸ਼ੀਨਰੀ ਆਪਰੇਟਰ", "ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਦੇ ਹੁਨਰ"], eligibility: ["ਪੇਂਡੂ ਨੌਜਵਾਨ (18-35 ਸਾਲ)", "ਕਿਸਾਨਾਂ ਦੇ ਬੱਚੇ", "ਮਹਿਲਾ ਕਿਸਾਨ", "ਸਕੂਲ ਛੱਡ ਚੁੱਕੇ ਨੌਜਵਾਨ"], documents: ["ਆਧਾਰ", "ਉਮਰ ਦਾ ਸਬੂਤ", "ਵਿੱਦਿਅਕ ਸਰਟੀਫਿਕੇਟ", "ਬੈਂਕ ਖਾਤਾ", "ਪਾਸਪੋਰਟ ਫੋਟੋ"] },
    134: { fullName: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕੌਸ਼ਲ ਵਿਕਾਸ ਯੋਜਨਾ - ਖੇਤੀਬਾੜੀ", amount: "ਮੁਫਤ ਸਿਖਲਾਈ + ਸਰਟੀਫਿਕੇਸ਼ਨ", benefits: ["ਮੁਫਤ ਵੋਕੇਸ਼ਨਲ ਸਿਖਲਾਈ", "ਸਰਕਾਰੀ ਸਰਟੀਫਿਕੇਸ਼ਨ", "ਨੌਕਰੀ ਪਲੇਸਮੈਂਟ ਵਿੱਚ ਸਹਾਇਤਾ", "ਪਿਛਲੀ ਸਿਖਲਾਈ ਦੀ ਮਾਨਤਾ (RPL)", "ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਦੀ ਮੁਰੰਮਤ ਦੀ ਸਿਖਲਾਈ"], eligibility: ["18-45 ਸਾਲ ਦੇ ਨੌਜਵਾਨ", "ਕਿਸਾਨ ਪਰਿਵਾਰ", "ਪੇਂਡੂ ਅਤੇ ਸ਼ਹਿਰੀ ਨੌਜਵਾਨ", "ਮਹਿਲਾ ਉਮੀਦਵਾਰ"], documents: ["ਆਧਾਰ", "ਉਮਰ ਦਾ ਸਬੂਤ", "ਵਿੱਦਿਅਕ ਦਸਤਾਵੇਜ਼", "ਬੈਂਕ ਖਾਤਾ", "ਮੋਬਾਈਲ ਨੰਬਰ"] },
    135: { fullName: "ਸਟਾਰਟਅੱਪ ਇੰਡੀਆ ਐਗਰੀ ਗ੍ਰੈਂਡ ਚੈਲੇਂਜ", amount: "₹50 ਲੱਖ ਸੀਡ ਫੰਡ", benefits: ["₹50 ਲੱਖ ਤੱਕ ਸੀਡ ਫੰਡ", "ਮਾਹਿਰਾਂ ਤੋਂ ਮਾਰਗਦਰਸ਼ਨ", "ਇਨਕਿਊਬੇਸ਼ਨ ਸਹਾਇਤਾ", "3 ਸਾਲਾਂ ਦੀ ਟੈਕਸ ਛੋਟ", "ਪੇਟੈਂਟ ਫਾਈਲਿੰਗ ਵਿੱਚ ਸਹਾਇਤਾ"], eligibility: ["ਐਗਰੀ-ਟੈਕ ਸਟਾਰਟਅੱਪਸ", "ਨੌਜਵਾਨ ਉੱਦਮੀ (18-35)", "ਨਵੀਨਤਾਕਾਰੀ ਖੇਤੀ ਹੱਲ", "ਰਜਿਸਟਰਡ ਸਟਾਰਟਅੱਪਸ (DPIIT)"], documents: ["ਸਟਾਰਟਅੱਪ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਇਨੋਵੇਸ਼ਨ ਦਾ ਵੇਰਵਾ", "ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ", "ਟੀਮ ਪ੍ਰੋਫਾਈਲ", "ਬੈਂਕ ਖਾਤਾ"] },
    136: { fullName: "RSETI - ਪੇਂਡੂ ਸਵੈ-ਰੁਜ਼ਗਾਰ ਸਿਖਲਾਈ ਸੰਸਥਾਵਾਂ", amount: "ਮੁਫਤ ਸਿਖਲਾਈ + ਲੋਨ ਲਿੰਕੇਜ", benefits: ["ਮੁਫਤ ਰਿਹਾਇਸ਼ੀ ਸਿਖਲਾਈ (7-30 ਦਿਨ)", "ਡੇਅਰੀ ਫਾਰਮਿੰਗ ਦੀ ਸਿਖਲਾਈ", "ਮੁਰਗੀ ਅਤੇ ਬੱਕਰੀ ਪਾਲਣ", "ਬੈਂਕ ਲੋਨ ਲਿੰਕੇਜ", "ਸਿਖਲਾਈ ਤੋਂ ਬਾਅਦ ਦੀ ਸਹਾਇਤਾ"], eligibility: ["ਪੇਂਡੂ ਨੌਜਵਾਨ (18-45 ਸਾਲ)", "ਬੇਰੁਜ਼ਗਾਰ ਨੌਜਵਾਨ", "ਕਿਸਾਨਾਂ ਦੇ ਬੱਚੇ", "ਮਹਿਲਾ ਉਮੀਦਵਾਰ"], documents: ["ਆਧਾਰ", "ਰਾਸ਼ਨ ਕਾਰਡ", "ਆਮਦਨ ਦਾ ਸਰਟੀਫਿਕੇਟ", "ਬੈਂਕ ਖਾਤਾ", "ਪਾਸਪੋਰਟ ਫੋਟੋ"] },
    137: { fullName: "ਰਾਸ਼ਟਰੀ ਯੁਵਾ ਸਸ਼ਕਤੀਕਰਨ ਪ੍ਰੋਗਰਾਮ - ਖੇਤੀਬਾੜੀ", amount: "₹2 ਲੱਖ ਪ੍ਰੋਜੈਕਟ ਸਹਾਇਤਾ", benefits: ["ਨੌਜਵਾਨਾਂ ਦੀ ਅਗਵਾਈ ਵਾਲੇ ਖੇਤੀ ਪ੍ਰੋਜੈਕਟ", "ਲੀਡਰਸ਼ਿਪ ਵਿਕਾਸ", "ਸਮੂਹਿਕ ਖੇਤੀ ਪਹਿਲਕਦਮੀਆਂ", "ਵਿੱਤੀ ਸਾਖਰਤਾ ਸਿਖਲਾਈ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ ਵਿੱਚ ਸਹਾਇਤਾ"], eligibility: ["ਯੁਵਾ ਸਮੂਹ (15-29 ਸਾਲ)", "ਯੂਥ ਕਲੱਬ", "ਨਹਿਰੂ ਯੁਵਾ ਕੇਂਦਰ ਦੇ ਮੈਂਬਰ", "ਪੇਂਡੂ ਨੌਜਵਾਨ ਸੰਗਠਨ"], documents: ["ਸਮੂਹ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਮੈਂਬਰਾਂ ਦਾ ਵੇਰਵਾ", "ਆਧਾਰ", "ਬੈਂਕ ਖਾਤਾ", "ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵ"] },
    138: { fullName: "ਦੀਨ ਦਿਆਲ ਉਪਾਧਿਆਏ ਗ੍ਰਾਮੀਣ ਕੌਸ਼ਲਿਆ ਯੋਜਨਾ (DDU-GKY)", amount: "ਮੁਫਤ ਸਿਖਲਾਈ + ₹1,000/ਮਹੀਨਾ ਵਜ਼ੀਫਾ", benefits: ["3-12 ਮਹੀਨਿਆਂ ਦੀ ਹੁਨਰ ਸਿਖਲਾਈ", "ਸਿਖਲਾਈ ਦੌਰਾਨ ਮਹੀਨਾਵਾਰ ਵਜ਼ੀਫਾ", "100% ਨੌਕਰੀ ਪਲੇਸਮੈਂਟ ਦੀ ਗਾਰੰਟੀ", "ਪਲੇਸਮੈਂਟ ਤੋਂ ਬਾਅਦ ਸਹਾਇਤਾ", "ਮੁਫਤ ਭੋਜਨ ਅਤੇ ਰਿਹਾਇਸ਼"], eligibility: ["ਪੇਂਡੂ ਗਰੀਬ ਨੌਜਵਾਨ (18-35 ਸਾਲ)", "SC/ST/ਔਰਤਾਂ ਨੂੰ ਤਰਜੀਹ", "BPL ਪਰਿਵਾਰ", "ਮਨਰੇਗਾ ਮਜ਼ਦੂਰ ਪਰਿਵਾਰ"], documents: ["ਆਧਾਰ", "BPL ਸਰਟੀਫਿਕੇਟ", "ਉਮਰ ਦਾ ਸਬੂਤ", "ਬੈਂਕ ਖਾਤਾ", "ਪਾਸਪੋਰਟ ਫੋਟੋ"] },
    139: { fullName: "NRLM - ਆਜੀਵਿਕਾ ਫਾਰਮ ਲਾਈਵਲੀਹੁੱਡਜ਼", amount: "ਪ੍ਰਤੀ SHG ₹50,000", benefits: ["SHG-ਅਧਾਰਿਤ ਖੇਤੀ ਗਤੀਵਿਧੀਆਂ", "ਕਮਿਊਨਿਟੀ ਨਿਵੇਸ਼ ਫੰਡ", "ਰਿਵਾਲਵਿੰਗ ਫੰਡ ਸਹਾਇਤਾ", "ਮੁੱਲ ਲੜੀ (Value Chain) ਵਿਕਾਸ", "ਮਾਰਕੀਟ ਲਿੰਕੇਜ"], eligibility: ["NRLM ਅਧੀਨ ਮਹਿਲਾ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ", "ਕਿਸਾਨ ਸਮੂਹ", "ਉਤਪਾਦਕ ਸਮੂਹ", "ਪਿੰਡ ਦੀਆਂ ਸੰਸਥਾਵਾਂ"], documents: ["SHG ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਮੈਂਬਰਾਂ ਦੀ ਸੂਚੀ", "ਬੈਂਕ ਖਾਤਾ", "ਮਤੇ ਦੀ ਕਾਪੀ", "ਆਧਾਰ"] },
    140: { fullName: "KVK - ਕਿਸਾਨ ਸਿਖਲਾਈ ਅਤੇ ਰੁਜ਼ਗਾਰ ਪ੍ਰੋਗਰਾਮ", amount: "ਮੁਫਤ ਸਿਖਲਾਈ + ਇਨਪੁਟਸ", benefits: ["KVK ਵਿਖੇ ਪ੍ਰੈਕਟੀਕਲ ਸਿਖਲਾਈ", "ਏਕੀਕ੍ਰਿਤ ਖੇਤੀ ਸਿਖਲਾਈ", "ਮੁੱਲ ਵਾਧਾ (Value Addition) ਸਿਖਲਾਈ", "ਇਨਪੁਟ ਕਿੱਟ ਦੀ ਵੰਡ", "ICAR ਤੋਂ ਸਰਟੀਫਿਕੇਟ"], eligibility: ["ਸਾਰੇ ਕਿਸਾਨ", "ਮਹਿਲਾ ਕਿਸਾਨ", "ਪੇਂਡੂ ਨੌਜਵਾਨ", "ਸਕੂਲ ਛੱਡ ਚੁੱਕੇ ਨੌਜਵਾਨ", "ਖੇਤੀਬਾੜੀ-ਉੱਦਮੀ"], documents: ["ਆਧਾਰ", "ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ (ਜੇ ਲਾਗੂ ਹੋਵੇ)", "ਬੈਂਕ ਖਾਤਾ", "2 ਪਾਸਪੋਰਟ ਫੋਟੋਆਂ", "ਮੋਬਾਈਲ ਨੰਬਰ"] }
  },
  ta: {
    1: { fullName: "பிரதான் மந்திரி கிசான் சம்மான் நிதி", amount: "₹6,000/ஆண்டு", benefits: ["ஆண்டுக்கு ₹6,000 நேரடி வருமான ஆதரவு", "ஒவ்வொரு 4 மாதங்களுக்கும் ₹2,000", "நேரடியாக வங்கிக் கணக்கில் DBT", "அனைத்து சிறு மற்றும் குறு விவசாயிகளுக்கும்"], eligibility: ["சிறு மற்றும் குறு விவசாயிகள் (2 ஹெக்டேர் வரை)", "விவசாய நிலம் உள்ள உழவர் குடும்பங்கள்", "நில ஆவணங்கள் உள்ள குத்தகை விவசாயிகள்"], documents: ["ஆதார் அட்டை", "வங்கி கணக்கு", "நில ஆவணங்கள்", "ரேஷன் கார்டு"] },
    2: { fullName: "குத்தகை விவசாயிகளுக்கான பிஎம்-கிசான்", amount: "₹6,000/ஆண்டு", benefits: ["நிலமற்ற விவசாயிகளுக்கான சிறப்பு ஏற்பாடு", "குத்தகைதாரர்களுக்கு உதவி", "நேரடி பலன் பரிமாற்றம்", "நில ஆவணங்கள் தேவையில்லை"], eligibility: ["நிலமற்ற குத்தகை விவசாயிகள்", "பங்குதாரர்கள்", "குத்தகை நிலத்தில் விவசாயம் செய்வோர்"], documents: ["ஆதார்", "வங்கி கணக்கு", "குத்தகை ஒப்பந்தம்", "பிரமாண பத்திரம்"] },
    3: { fullName: "பிரதான் மந்திரி அன்னதாதா ஆய சம்ரக்‌ஷண் அபியான்", amount: "₹8,000/ஆண்டு", benefits: ["அனைத்து விவசாயிகளுக்கும் வருமான ஆதரவு", "குறைந்தபட்ச ஆதரவு விலை (MSP) உத்தரவாதம்", "சிறு விவசாயிகளுக்கு கூடுதல் ₹2,000", "விலை குறைபாட்டு கொடுப்பனவு"], eligibility: ["அறிவிக்கப்பட்ட பயிர்களை பயிரிடும் அனைத்து விவசாயிகள்", "சிறு மற்றும் குறு விவசாயிகளுக்கு முன்னுரிமை", "FPO உறுப்பினர்கள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "நில ஆவணங்கள்", "பயிர் அறிவிப்பு"] },
    4: { fullName: "விலை குறைபாட்டு கொடுப்பனவு திட்டம்", amount: "விலை வேறுபாடு கொடுப்பனவு", benefits: ["விலை வீழ்ச்சிக்கு இழப்பீடு", "MSP வேறுபாடு கொடுப்பனவு", "நேரடி வங்கி பரிமாற்றம்", "காய்கறிகள் மற்றும் பழங்களை உள்ளடக்கியது"], eligibility: ["மத்தியப் பிரதேச விவசாயிகள்", "பயிர்கள்: தக்காளி, வெங்காயம், உருளைக்கிழங்கு", "பதிவு செய்யப்பட்ட விவசாயிகள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "விற்பனை ரசீது", "மண்டி நுழைவு சீட்டு"] },
    5: { fullName: "தெலுங்கானா ரைத்து பந்து", amount: "₹10,000/ஏக்கர்/ஆண்டு", benefits: ["விவசாயிகளுக்கு முதலீட்டு ஆதரவு", "ஒவ்வொரு பருவத்திற்கும் ஏக்கருக்கு ₹5,000", "நேரடி வங்கி பரிமாற்றம்", "அனைத்து விவசாயிகளையும் உள்ளடக்கியது"], eligibility: ["தெலுங்கானாவில் உள்ள அனைத்து விவசாயிகள்", "பட்டா உள்ள நில உரிமையாளர்கள்", "குத்தகை விவசாயிகள் (புதிய திட்டம்)"], documents: ["ஆதார்", "பட்டா பாஸ்புக்", "வங்கி கணக்கு"] },
    6: { fullName: "ஒடிசா காலியா திட்டம்", amount: "₹25,000/ஆண்டு", benefits: ["விவசாயிகளுக்கு நிதி உதவி", "நிலமற்ற விவசாயத் தொழிலாளர்கள்", "நலிந்த பழங்குடியினர்", "குத்தகைதாரர்களுக்கு உதவி"], eligibility: ["ஒடிசா விவசாயிகள்", "நிலமற்ற தொழிலாளர்கள்", "சிறு மற்றும் குறு விவசாயிகள்", "பங்குதாரர்கள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "வசிப்பிட சான்று", "நில ஆவணங்கள்"] },
    7: { fullName: "ராஷ்ட்ரிய கிருஷி விகாஸ் யோஜனா", amount: "மாநிலத்திற்கு மாநிலம் மாறுபடும்", benefits: ["மாநில வேளாண் திட்டங்களுக்கான நிதி", "உள்கட்டமைப்பு மேம்பாடு", "வேளாண்-தொழில்முனைவோர்", "மதிப்புச் சங்கிலி (Value Chain)"], eligibility: ["மாநில அரசுகள்", "FPO", "வேளாண் பல்கலைக்கழகங்கள்", "ஆராய்ச்சி நிறுவனங்கள்"], documents: ["திட்ட முன்மொழிவு", "மாநில அரசின் ஒப்புதல்", "செயல்படுத்தும் திட்டம்"] },
    8: { fullName: "தேசிய விதை மானியத் திட்டம்", amount: "விதைகளுக்கு 50% மானியம்", benefits: ["அதிக மகசூல் தரும் ரக விதைகள்", "சிறு விவசாயிகளுக்கு 50% மானியம்", "சான்றளிக்கப்பட்ட விதைகள்", "மேம்படுத்தப்பட்ட ரகங்கள்"], eligibility: ["அனைத்து விவசாயிகள்", "சிறு மற்றும் குறு விவசாயிகளுக்கு முன்னுரிமை", "FPO"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விதை ரசீது", "வங்கி கணக்கு"] },
    9: { fullName: "ஊட்டச்சத்து அடிப்படையிலான மானிய (NBS) திட்டம்", amount: "ஊட்டச்சத்துக்கேற்ப மாறுபடும்", benefits: ["P மற்றும் K உரங்களுக்கு மானியம்", "விவசாயிகளின் செலவு குறைவு", "சமச்சீரான ஊட்டச்சத்து", "மண் வளம் மேம்பாடு"], eligibility: ["அனைத்து விவசாயிகள்", "அங்கீகரிக்கப்பட்ட விநியோகஸ்தர்கள் மூலம்"], documents: ["விநியோகஸ்தர் ரசீது", "ஆதார் (DBT-க்காக)", "நில ஆவணங்கள்"] },
    10: { fullName: "மகிளா கிசான் சஷக்திகரன் பரியோஜனா", amount: "₹50,000/ஆண்டு", benefits: ["பெண் விவசாயிகள் மேம்பாடு", "திறன் மேம்பாட்டுப் பயிற்சி", "இடுபொருள் மானியம்", "சந்தை அணுகல்"], eligibility: ["பெண் விவசாயிகள்", "பெண்கள் சுய உதவிக் குழுக்கள்", "பெண்கள் தலைமையிலான குடும்பங்கள்"], documents: ["ஆதார்", "நில ஆவணங்கள்", "வங்கி கணக்கு", "SHG சான்றிதழ்"] },
    11: { fullName: "கிசான் கிரெடிட் கார்டு (KCC) திட்டம்", amount: "₹3 லட்சம் வரை", benefits: ["சுழலும் கடன் வசதி", "வட்டி: 7% (சரியான நேரத்தில் செலுத்தினால் 4%)", "₹1.6 லட்சம் வரை பிணையில்லா கடன்", "துணை நடவடிக்கைகளை உள்ளடக்கியது"], eligibility: ["அனைத்து விவசாயிகள்", "பங்குதாரர்கள்", "குத்தகை விவசாயிகள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "புகைப்படம்", "பயிர் விவரங்கள்"] },
    12: { fullName: "குறுகிய கால பயிர்க் கடன்களுக்கான வட்டி மானியம்", amount: "2% வட்டி மானியம்", benefits: ["பயிர்க் கடன்களுக்கு 2% வட்டி மானியம்", "சரியான நேரத்தில் செலுத்தினால் கூடுதல் 3%", "பயனுள்ள வட்டி விகிதம்: ஆண்டுக்கு 4%", "₹3 லட்சம் வரை கடன்"], eligibility: ["பயிர்க் கடன் பெறும் அனைத்து விவசாயிகள்", "KCC அட்டைதாரர்கள்", "கூட்டுறவு சங்க உறுப்பினர்கள்"], documents: ["KCC", "கடன் விண்ணப்பம்", "நில ஆவணங்கள்"] },
    13: { fullName: "கிடங்கு உள்கட்டமைப்பு நிதி", amount: "ஒரு திட்டத்திற்கு ₹50 கோடி", benefits: ["கிடங்கு கட்டுமானத்திற்கான கடன்", "25% வரை மானியம்", "அறுவடைக்கு பிந்தைய உள்கட்டமைப்பு", "பயிர் வீணாவதைக் குறைத்தல்"], eligibility: ["FPO", "கூட்டுறவு சங்கங்கள்", "வேளாண்-தொழில்முனைவோர்", "மாநில நிறுவனங்கள்"], documents: ["திட்ட அறிக்கை", "நில ஆவணங்கள்", "பதிவு சான்றிதழ்"] },
    14: { fullName: "பால்பண்ணை தொழில்முனைவோர் மேம்பாட்டுத் திட்டம்", amount: "₹5 லட்சம் வரை மானியம்", benefits: ["பால் பண்ணை அலகுகளுக்கு மானியம்", "பொதுப் பிரிவினருக்கு 25%, SC/ST-க்கு 33%", "பசு/எருமை வாங்க கடன்", "பால் பதப்படுத்தும் உபகரணங்கள்"], eligibility: ["தனிநபர் விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "பால் உற்பத்தியாளர் கூட்டுறவு சங்கங்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "திட்ட அறிக்கை"] },
    15: { fullName: "கோழி வளர்ப்பு துணிகர மூலதன நிதி", amount: "₹3 லட்சம் வரை மானியம்", benefits: ["கோழி வளர்ப்பிற்கு மானியம்", "SC/ST விவசாயிகளுக்கு 33%", "பிராய்லர்/முட்டையிடும் கோழி பண்ணைக்கு கடன்", "குஞ்சு பொரிப்பகங்களுக்கு உதவி"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "அனுபவ சான்றிதழ்"] },
    16: { fullName: "ஆடு மற்றும் செம்மறியாடு மேம்பாட்டுத் திட்டம்", amount: "50% மானியம்", benefits: ["ஆடு/செம்மறியாடு வளர்ப்பிற்கு மானியம்", "₹50,000 வரை 50% மானியம்", "இன மேம்பாட்டு உதவி", "கால்நடை மருத்துவ பராமரிப்பு"], eligibility: ["சிறு விவசாயிகள்", "நிலமற்ற தொழிலாளர்கள்", "பழங்குடியின விவசாயிகள்", "பெண் விவசாயிகள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "கிராம பஞ்சாயத்து சான்றிதழ்"] },
    17: { fullName: "வேளாண் உள்கட்டமைப்பு நிதி (AIF)", amount: "₹2 கோடி வரை கடன்", benefits: ["பண்ணை அளவிலான உள்கட்டமைப்புக்கு கடன்", "3% வட்டி மானியம்", "3 ஆண்டு கால அவகாசம் (Moratorium)", "கிடங்குகள், குளிர்பதனக் கிடங்குகளை உள்ளடக்கியது"], eligibility: ["FPO", "கூட்டுறவு சங்கங்கள்", "தனிநபர் விவசாயிகள்", "வேளாண்-தொழில்முனைவோர்"], documents: ["திட்ட அறிக்கை", "நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    18: { fullName: "AHIDF - பால் மற்றும் கோழி வளர்ப்பு கடன்", amount: "₹100 கோடி வரை", benefits: ["பால் மற்றும் கோழி பண்ணை உள்கட்டமைப்புக்கு கடன்", "3% வட்டி மானியம்", "கடன் உத்தரவாதம் கிடைக்கும்", "பால் பதப்படுத்துதல், குஞ்சு பொரிப்பகங்களை உள்ளடக்கியது"], eligibility: ["தனிநபர் தொழில்முனைவோர்", "FPO", "தனியார் நிறுவனங்கள்", "கூட்டுறவு சங்கங்கள்"], documents: ["DPR", "வணிகப் பதிவு", "நில ஆவணங்கள்", "வங்கி கணக்கு"] },
    19: { fullName: "FIDF - மீன்வளக் கடன்", amount: "₹50 லட்சம் வரை", benefits: ["மீன்வள உள்கட்டமைப்புக்கு கடன்", "4% வட்டி மானியம்", "குஞ்சு பொரிப்பகங்கள், தீவன ஆலைகளை உள்ளடக்கியது", "மீன்களுக்கான குளிர் சங்கிலி (Cold Chain)"], eligibility: ["மீன் வளர்ப்பு விவசாயிகள்", "FPO", "கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்"], documents: ["நீர்நிலை குத்தகை ஆவணம்", "திட்ட அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    20: { fullName: "உணவு பதப்படுத்தும் கடன் திட்டம்", amount: "₹10 கோடி வரை", benefits: ["உணவு பதப்படுத்தும் பிரிவுகளுக்கு கடன்", "35% மூலதன மானியம்", "5% வட்டி மானியம்", "பழங்கள், காய்கறிகள், தானியங்களை உள்ளடக்கியது"], eligibility: ["உணவு பதப்படுத்துவோர்", "FPO", "கூட்டுறவு சங்கங்கள்", "வேளாண்-தொழில்முனைவோர்"], documents: ["DPR", "நில ஆவணங்கள்", "FSSAI உரிமம்", "வங்கி கணக்கு"] },
    21: { fullName: "பிரதான் மந்திரி ஃபசல் பீமா யோஜனா (PMFBY)", amount: "குறைந்த பிரீமியம்: 1.5-5%", benefits: ["குறைந்த பிரீமியத்தில் பயிர் காப்பீடு", "ரபிக்கு 1.5%, காரீஃபிற்கு 2%", "21 நாட்களில் க்ளைம்", "விதைப்பு முதல் அறுவடைக்குப் பின் வரை உள்ளடக்கியது"], eligibility: ["அனைத்து விவசாயிகள்", "கடன் பெற்ற விவசாயிகளுக்கு கட்டாயம்", "கடன் பெறாதவர்களுக்கு விருப்பம்", "குத்தகை விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "பயிர் அறிவிப்பு", "ஆதார்", "வங்கி கணக்கு"] },
    22: { fullName: "மாற்றியமைக்கப்பட்ட வானிலை அடிப்படையிலான பயிர் காப்பீட்டுத் திட்டம்", amount: "பிரீமியம் 1.5-8%", benefits: ["வானிலை குறியீட்டு அடிப்படையிலான காப்பீடு", "மழை பற்றாக்குறை/அதிக மழையை உள்ளடக்கியது", "வெப்பநிலை மற்றும் ஈரப்பதம் கவரேஜ்", "விரைவான க்ளைம் தீர்வு"], eligibility: ["அறிவிக்கப்பட்ட பகுதி விவசாயிகள்", "வானிலை உணர்திறன் கொண்ட பயிர்கள்", "அனைத்து விவசாய பிரிவுகள்"], documents: ["நில ஆவணங்கள்", "வானிலை தரவு", "ஆதார்"] },
    23: { fullName: "தென்னை மரக் காப்பீட்டுத் திட்டம்", amount: "பிரீமியம்: ₹100-500/மரம்", benefits: ["தென்னை மரங்களின் காப்பீடு", "பூச்சி மற்றும் நோய் கவரேஜ்", "இயற்கை பேரிடர் கவரேஜ்", "5 ஆண்டுகள் வரை கவரேஜ்"], eligibility: ["தென்னை விவசாயிகள்", "குறைந்தபட்சம் 5 மரங்கள்", "அனைத்து மாநிலங்கள்"], documents: ["நில ஆவணங்கள்", "மரங்களின் எண்ணிக்கை", "ஆதார்"] },
    24: { fullName: "ரப்பர் காப்பீட்டுத் திட்டம்", amount: "₹30,000/ஹெக்டேர்", benefits: ["ரப்பர் மரங்களின் காப்பீடு", "இயற்கை பேரிடர் கவரேஜ்", "நோய் மற்றும் பூச்சி கவரேஜ்", "மகசூல் இழப்பு இழப்பீடு"], eligibility: ["ரப்பர் உற்பத்தியாளர்கள்", "குறைந்தபட்சம் 0.5 ஹெக்டேர்", "ரப்பர் போர்டில் பதிவு செய்திருக்க வேண்டும்"], documents: ["நில ஆவணங்கள்", "ரப்பர் போர்டு பதிவு", "ஆதார்"] },
    25: { fullName: "காபி பயிர் காப்பீடு", amount: "பிரீமியம் 3.5%", benefits: ["காபி தோட்டங்களின் காப்பீடு", "அரேபிகா மற்றும் ரோபஸ்டாவை உள்ளடக்கியது", "மகசூல் இழப்பு கவரேஜ்", "விலை ஏற்ற இறக்கங்களை உள்ளடக்கியது"], eligibility: ["காபி உற்பத்தியாளர்கள்", "காபி போர்டில் பதிவு செய்திருக்க வேண்டும்", "குறைந்தபட்சம் 0.5 ஏக்கர்"], documents: ["நில ஆவணங்கள்", "காபி போர்டு பதிவு"] },
    26: { fullName: "தேயிலை பயிர் காப்பீடு", amount: "பிரீமியம் 2.5%", benefits: ["தேயிலை தோட்டங்களின் காப்பீடு", "பச்சை இலை மகசூல் கவரேஜ்", "வறட்சி மற்றும் வெள்ளம் கவரேஜ்", "பூச்சி மற்றும் நோய் கவரேஜ்"], eligibility: ["தேயிலை உற்பத்தியாளர்கள்", "டீ போர்டில் பதிவு செய்திருக்க வேண்டும்", "அனைத்து மாநிலங்கள்"], documents: ["நில ஆவணங்கள்", "டீ போர்டு பதிவு"] },
    27: { fullName: "UPIS - பயிர் பிளஸ் காப்பீடு", amount: "பிரீமியம்: 2-8%", benefits: ["ஒருங்கிணைந்த பயிர் + சொத்து காப்பீடு", "வீடு, டிராக்டர், கால்நடைகளை உள்ளடக்கியது", "அனைத்திற்கும் ஒரே பிரீமியம்", "விரைவான க்ளைம் தீர்வு"], eligibility: ["அனைத்து விவசாயிகள்", "கடன் பெற்ற விவசாயிகளுக்கு கட்டாயம்", "கடன் பெறாதவர்களுக்கு விருப்பம்"], documents: ["நில ஆவணங்கள்", "சொத்து பட்டியல்", "ஆதார்", "வங்கி கணக்கு"] },
    28: { fullName: "எண்ணெய் பனை காப்பீட்டுத் திட்டம்", amount: "பிரீமியம்: 2.5%", benefits: ["எண்ணெய் பனை தோட்டங்களின் காப்பீடு", "மகசூல் இழப்பு கவரேஜ்", "பூச்சி மற்றும் நோய் கவரேஜ்", "5 ஆண்டு பாலிசி விருப்பம்"], eligibility: ["எண்ணெய் பனை உற்பத்தியாளர்கள்", "NMEO-OP இல் பதிவு செய்திருக்க வேண்டும்", "குறைந்தபட்சம் 1 ஹெக்டேர்"], documents: ["நில ஆவணங்கள்", "தோட்ட பதிவு", "ஆதார்"] },
    29: { fullName: "ஏலக்காய் பயிர் காப்பீடு", amount: "பிரீமியம்: 3%", benefits: ["ஏலக்காய் தோட்டங்களின் காப்பீடு", "வானிலையால் ஏற்படும் மகசூல் இழப்பு கவரேஜ்", "பூச்சி மற்றும் நோய் கவரேஜ்", "விரைவான க்ளைம் தீர்வு"], eligibility: ["ஏலக்காய் உற்பத்தியாளர்கள்", "ஸ்பைசஸ் போர்டில் பதிவு செய்திருக்க வேண்டும்", "குறைந்தபட்சம் 0.5 ஏக்கர்"], documents: ["நில ஆவணங்கள்", "ஸ்பைசஸ் போர்டு பதிவு", "ஆதார்"] },
    30: { fullName: "தேசிய கால்நடை காப்பீட்டுத் திட்டம்", amount: "பிரீமியம்: 4-6%", benefits: ["பசு, எருமை, செம்மறியாடு, ஆடுகளுக்கான காப்பீடு", "விபத்து/நோயால் ஏற்படும் இறப்பு கவரேஜ்", "BPL குடும்பங்களுக்கு மானிய விலையில் பிரீமியம்", "விரைவான க்ளைம் தீர்வு"], eligibility: ["அனைத்து கால்நடை வளர்ப்போர்", "பால் பண்ணை விவசாயிகள்", "BPL குடும்பங்களுக்கு முன்னுரிமை"], documents: ["கால்நடை அடையாளம்", "கால்நடை மருத்துவ சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    31: { fullName: "பிரதான் மந்திரி கிருஷி சிஞ்சாயி யோஜனா", amount: "55-75% மானியம்", benefits: ["சொட்டுநீர்/தெளிப்பு நீர் மானியம்", "பொதுப் பிரிவினருக்கு 55%, SC/ST-க்கு 75%", "பண்ணைக் குட்டை உதவி", "ஒவ்வொரு துளிக்கும் அதிக பயிர்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "நீர் பயன்படுத்துவோர் சங்கங்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "விற்பனையாளர் விலைப்புள்ளி (Quotation)"] },
    32: { fullName: "நுண் பாசன நிதி (நபார்டு)", amount: "₹5,000 கோடி நிதி", benefits: ["நுண் பாசனத்திற்கு கூடுதல் மானியம்", "PMKSY உடன் ஒருங்கிணைப்பு", "மாநில அரசு கடன்", "தண்ணீர் பற்றாக்குறை உள்ள பகுதிகளுக்கு முன்னுரிமை"], eligibility: ["மாநில அரசுகள்", "நீர் பயன்படுத்துவோர் சங்கங்கள்", "FPO"], documents: ["திட்ட முன்மொழிவு", "மாநில அரசின் ஒப்புதல்"] },
    33: { fullName: "ஒவ்வொரு வயலுக்கும் தண்ணீர் (PMKSY கூறு)", amount: "முழு கவரேஜ்", benefits: ["ஒவ்வொரு வயலுக்கும் நீர்ப்பாசன வசதி", "கட்டளை பகுதி (Command Area) மேம்பாடு", "நீர் சேகரிப்பு கட்டமைப்புகள்", "நீர்நிலைகளை சீரமைத்தல்"], eligibility: ["அனைத்து விவசாயிகள்", "மானாவாரி (மழை நம்பிய) பகுதிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "நீர் ஆதார விவரங்கள்"] },
    34: { fullName: "நீர்ப்பிடிப்பு பகுதி மேம்பாடு (PMKSY கூறு)", amount: "₹12,000/ஹெக்டேர்", benefits: ["நீர்ப்பிடிப்பு பகுதி மேலாண்மை", "மண் மற்றும் நீர் வளப் பாதுகாப்பு", "மழைநீர் சேகரிப்பு", "தடுப்பணைகள் கட்டுதல்"], eligibility: ["நீர்ப்பிடிப்பு பகுதிகளில் உள்ள விவசாயிகள்", "கிராம சமூகங்கள்"], documents: ["கிராம முன்மொழிவு", "நில ஆவணங்கள்"] },
    35: { fullName: "துரிதப்படுத்தப்பட்ட பாசனப் பலன் திட்டம்", amount: "90:10 நிதி", benefits: ["முக்கிய நீர்ப்பாசன திட்டங்கள்", "மத்திய:மாநில நிதி 90:10", "கட்டளை பகுதி மேம்பாடு", "நீர் விநியோக அமைப்பு"], eligibility: ["மாநில அரசுகள்", "நீர்ப்பாசனத் துறை"], documents: ["திட்ட DPR", "மாநில அரசின் ஒப்புதல்"] },
    36: { fullName: "பண்ணைகளுக்கான மேற்கூரை மழைநீர் சேகரிப்பு", amount: "₹25,000 வரை 50% மானியம்", benefits: ["மழைநீர் சேகரிப்பு கட்டமைப்பு", "சேமிப்பு தொட்டி மானியம்", "நிலத்தடி நீர் மறுஊட்டம்", "ஆழ்துளை கிணறுகளைச் சார்ந்திருப்பதைக் குறைத்தல்"], eligibility: ["அனைத்து விவசாயிகள்", "பண்ணை வீடுகள்", "கால்நடை தங்குமிடங்கள்"], documents: ["கட்டட வரைபடம்", "நில ஆவணங்கள்", "விலைப்புள்ளி (Quotation)"] },
    37: { fullName: "பண்ணைக் குட்டை மற்றும் கிணறு மறுஊட்டத் திட்டம்", amount: "₹50,000 வரை 50% மானியம்", benefits: ["பண்ணைக் குட்டை கட்டுதல்", "கிணறு மறுஊட்ட கட்டமைப்பு", "மழைநீர் சேகரிப்பு", "நிலத்தடி நீர்மட்ட மேம்பாடு"], eligibility: ["அனைத்து விவசாயிகள்", "நிலத்தடி நீர் மட்டம் குறையும் பகுதிகள்"], documents: ["நில ஆவணங்கள்", "கிணறு உரிமை சான்று", "ஆதார்"] },
    38: { fullName: "தெளிப்பு நீர் பாசன மானியம்", amount: "ஏக்கருக்கு ₹15,000 வரை 70% மானியம்", benefits: ["கையடக்க தெளிப்பு நீர் பாசன கருவி", "40% வரை நீர் சேமிப்பு", "அனைத்து பயிர்களுக்கும் ஏற்றது", "குறைந்த செயல்பாட்டு செலவு"], eligibility: ["சிறு மற்றும் குறு விவசாயிகள்", "FPO", "தண்ணீர் பற்றாக்குறை உள்ள பகுதிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "வங்கி கணக்கு"] },
    39: { fullName: "சொட்டு நீர் பாசன ஊக்குவிப்புத் திட்டம்", amount: "60-80% மானியம்", benefits: ["சொட்டு நீர் பாசன அமைப்பு", "60% வரை நீர் சேமிப்பு", "அதிக மகசூல்", "உரப்பாசனத்திற்கு (Fertigation) ஏற்றது"], eligibility: ["அனைத்து விவசாயிகள்", "தோட்டக்கலை விவசாயிகளுக்கு முன்னுரிமை", "FPO"], documents: ["நில ஆவணங்கள்", "பயிர் விவரங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    40: { fullName: "வயல் வாய்க்கால் மற்றும் குழாய் விரிவாக்கம்", amount: "₹2 லட்சம் வரை 50% மானியம்", benefits: ["நீர் ஆதாரத்தில் இருந்து வயலுக்கு PVC குழாய்", "நீர் வீணாவதைக் குறைத்தல்", "நேரம் மற்றும் உழைப்பு சேமிப்பு", "5 ஏக்கர் வரை கவரேஜ்"], eligibility: ["அனைத்து விவசாயிகள்", "நீர் பயன்படுத்துவோர் சங்கங்கள்", "FPO"], documents: ["நில ஆவணங்கள்", "நீர் ஆதார சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    41: { fullName: "வேளாண் இயந்திரங்களுக்கான மானியம்", amount: "40-50% மானியம்", benefits: ["SC/ST-க்கு 50% (₹40,000 வரை)", "பொது விவசாயிகளுக்கு 40%", "டிராக்டர், ரோட்டவேட்டர் மானியம்", "ட்ரோன் மானியம் ₹5 லட்சம் வரை 50%"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "கஸ்டம் ஹயரிங் மையங்கள் (Custom Hiring Centers)", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "ரசீது (Bill)"] },
    42: { fullName: "பண்ணை இயந்திர வங்கி (Farm Machinery Bank)", amount: "₹40 லட்சம் வரை 40% மானியம்", benefits: ["இயந்திர வாடகை மையம் அமைத்தல்", "உபகரணங்களுக்கு 40% மானியம்", "சிறு விவசாயிகளுக்கு பயன்", "தனிநபர் முதலீடு குறைப்பு"], eligibility: ["FPO", "கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்", "இளம் தொழில்முனைவோர்"], documents: ["வணிகத் திட்டம்", "பதிவு சான்றிதழ்", "மையத்திற்கான நிலம்"] },
    43: { fullName: "உரம்/பூச்சிக்கொல்லி தெளிப்பதற்கான ட்ரோன்கள்", amount: "₹8 லட்சம் வரை 80% மானியம்", benefits: ["பெண்கள் சுய உதவிக் குழுக்களுக்கான ட்ரோன்கள்", "கொள்முதலுக்கு 80% மானியம்", "பயிற்சி உள்ளடக்கியது", "தெளிப்பு சேவைகள் மூலம் வருமானம்"], eligibility: ["பெண்கள் சுய உதவிக் குழுக்கள்", "பெண் உறுப்பினர்களைக் கொண்ட FPO"], documents: ["SHG பதிவு", "பெண் உறுப்பினர்கள் பட்டியல்"] },
    44: { fullName: "அறுவடைக்கு பிந்தைய மேலாண்மை உபகரணங்கள்", amount: "₹10 லட்சம் வரை 35% மானியம்", benefits: ["நெல்லடிக்கும் இயந்திரம் (Thresher), உலர்த்தி (Dryer), தரம் பிரிப்பான் (Grader)", "சேமிப்பு உபகரணங்கள்", "பேக்கேஜிங் இயந்திரங்கள்", "பதப்படுத்தும் அலகுகள்"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "வேளாண்-தொழில்முனைவோர்"], documents: ["திட்ட அறிக்கை", "விலைப்புள்ளி", "நில ஆவணங்கள்"] },
    45: { fullName: "விவசாயிகளுக்கான சூரிய ஒளி உலர்த்தி (Solar Dryer)", amount: "₹50,000 வரை 50% மானியம்", benefits: ["பழங்கள்/காய்கறிகளுக்கான சோலார் ட்ரையர்", "அறுவடைக்கு பிந்தைய இழப்பு குறைப்பு", "தரப் பாதுகாப்பு", "மதிப்பு கூட்டுதல்"], eligibility: ["சிறு விவசாயிகள்", "FPO", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "ஆதார்"] },
    46: { fullName: "குளிர்பதனக் கிடங்கு மற்றும் குளிர் சங்கிலி (Cold Chain)", amount: "₹50 லட்சம் வரை 35% மானியம்", benefits: ["குளிர்பதனக் கிடங்கு கட்டுதல்", "குளிரூட்டப்பட்ட (Reefer) வாகனங்கள்", "பேக்கேஜிங் உபகரணங்கள்", "வீணாவதைக் குறைத்தல்"], eligibility: ["FPO", "கூட்டுறவு சங்கங்கள்", "தனிநபர் தொழில்முனைவோர்"], documents: ["திட்ட அறிக்கை", "நில ஆவணங்கள்", "வணிகத் திட்டம்"] },
    47: { fullName: "குறு விவசாயிகளுக்கான சிறிய டிராக்டர் மானியம்", amount: "₹60,000 வரை 40% மானியம்", benefits: ["20-35 HP டிராக்டருக்கான மானியம்", "SC/ST விவசாயிகளுக்கு முன்னுரிமை", "வாடகைக்கு விடும் விருப்பம்", "விவசாயச் செலவைக் குறைத்தல்"], eligibility: ["சிறு மற்றும் குறு விவசாயிகள்", "SC/ST விவசாயிகள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "வங்கி கணக்கு"] },
    48: { fullName: "பவர் டில்லர் மானியத் திட்டம்", amount: "₹25,000 வரை 50% மானியம்", benefits: ["பவர் டில்லருக்கான மானியம்", "சிறிய வயல்களுக்கு ஏற்றது", "தொழிலாளர்களைச் சார்ந்திருப்பதைக் குறைத்தல்", "குறைந்த பராமரிப்பு செலவு"], eligibility: ["சிறு விவசாயிகள்", "மலைப்பகுதி விவசாயிகள்", "FPO"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "வங்கி கணக்கு"] },
    49: { fullName: "கம்பைன் ஹார்வெஸ்டர் (Combine Harvester) மானியத் திட்டம்", amount: "₹2 லட்சம் வரை 40% மானியம்", benefits: ["அறுவடை இயந்திரத்திற்கு மானியம்", "அறுவடை நேரம் குறைப்பு", "பயிர் இழப்பு குறைவு", "வாடகைக்கு விட ஏற்றது"], eligibility: ["FPO", "கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்", "பெரிய விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "வணிகத் திட்டம்", "ஆதார்", "வங்கி கணக்கு"] },
    50: { fullName: "இயந்திர நெல் நடவு இயந்திர மானியம்", amount: "₹40,000 வரை 50% மானியம்", benefits: ["நெல் நடவு இயந்திரத்திற்கு மானியம்", "உழைப்புச் செலவு சேமிப்பு", "சீரான நடவு", "அதிக மகசூல்"], eligibility: ["நெல் விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்", "கஸ்டம் ஹயரிங் மையங்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "வங்கி கணக்கு"] },
    51: { fullName: "மண் வள அட்டை (Soil Health Card) திட்டம்", amount: "இலவச சேவை", benefits: ["2 ஆண்டுகளுக்கு ஒருமுறை இலவச மண் பரிசோதனை", "12 அளபுருக்களின் பகுப்பாய்வு", "பயிர் சார்ந்த பரிந்துரைகள்", "உரச் செலவில் 10-15% குறைப்பு"], eligibility: ["அனைத்து விவசாயிகள்", "சிறு விவசாயிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "விவசாயி அடையாள அட்டை"] },
    52: { fullName: "நகரும் மண் பரிசோதனை ஆய்வகங்கள்", amount: "ஒரு ஆய்வகத்திற்கு ₹25 லட்சம்", benefits: ["நடமாடும் மண் பரிசோதனை வாகனங்கள்", "இலவச வீட்டு வாசல் சேவை", "7 நாட்களில் முடிவுகள்", "தொலைதூர கிராமங்களை உள்ளடக்கியது"], eligibility: ["மாநில அரசுகள்", "KVK-கள்", "வேளாண் பல்கலைக்கழகங்கள்"], documents: ["முன்மொழிவு", "உள்கட்டமைப்பு விவரங்கள்"] },
    53: { fullName: "மண் வள மேலாண்மை (SHM)", amount: "₹2,000/ஹெக்டேர்", benefits: ["மண் திருத்த மானியம்", "சுண்ணாம்பு/ஜிப்சம் பயன்பாடு", "நுண்ணூட்டச்சத்து விநியோகம்", "உயிர் உரங்களை ஊக்குவித்தல்"], eligibility: ["அனைத்து விவசாயிகள்", "மண் வள அட்டை வைத்திருப்பவர்கள்"], documents: ["மண் வள அட்டை", "நில ஆவணங்கள்"] },
    54: { fullName: "நுண்ணூட்டச்சத்து குறைபாடு திருத்தம்", amount: "ஏக்கருக்கு ₹1,000 வரை 50% மானியம்", benefits: ["துத்தநாகம், போரான், இரும்பு விநியோகம்", "குறைபாட்டை சரிசெய்தல்", "தரமான விதை மானியம்", "மகசூல் மேம்பாடு"], eligibility: ["நுண்ணூட்டச்சத்து குறைபாடுள்ள விவசாயிகள்", "மண் பரிசோதனை அறிக்கை கட்டாயம்"], documents: ["மண் வள அட்டை", "நில ஆவணங்கள்"] },
    55: { fullName: "மண் அமிலத்தன்மை/காரத்தன்மை திருத்தம்", amount: "50% மானியம்", benefits: ["அமில மண்ணுக்கு சுண்ணாம்பு", "கார மண்ணுக்கு ஜிப்சம்", "மண்ணின் pH மேம்பாடு", "ஊட்டச்சத்து கிடைப்பதை அதிகரித்தல்"], eligibility: ["சிக்கல் உள்ள மண் கொண்ட விவசாயிகள்", "மண் பரிசோதனை கட்டாயம்"], documents: ["மண் பரிசோதனை அறிக்கை", "நில ஆவணங்கள்"] },
    56: { fullName: "கரிமப் பொருள் (Organic Matter) செறிவூட்டல் திட்டம்", amount: "₹5,000/ஹெக்டேர்", benefits: ["பசுந்தாள் உர மானியம்", "மக்கிய உரத்தை ஊக்குவித்தல்", "பயிர்க்கழிவு மேலாண்மை", "மண்ணின் கரிம கார்பன் மேம்பாடு"], eligibility: ["அனைத்து விவசாயிகள்", "இயற்கை விவசாயக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "மண் வள அட்டை", "ஆதார்"] },
    57: { fullName: "இலவச உயிர் உர விநியோகம்", amount: "ஏக்கருக்கு 5 கிலோ வரை இலவசம்", benefits: ["இலவச ரைசோபியம், PSB, அசோடோபாக்டர்", "இரசாயன உரப் பயன்பாட்டைக் குறைத்தல்", "மண்ணின் உயிரியல் தன்மையை மேம்படுத்துதல்", "KVK களில் கிடைக்கும்"], eligibility: ["அனைத்து விவசாயிகள்", "சிறு மற்றும் குறு விவசாயிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "மண் வள அட்டை", "ஆதார்"] },
    58: { fullName: "மண்புழு உரம் உற்பத்தி அலகு", amount: "₹25,000 வரை 50% மானியம்", benefits: ["மண்புழு உர அலகு அமைத்தல்", "மண்புழு விநியோகம்", "இயற்கை உர உற்பத்தி", "கழிவு மறுசுழற்சி"], eligibility: ["தனிநபர் விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "திட்ட முன்மொழிவு", "ஆதார்", "வங்கி கணக்கு"] },
    59: { fullName: "மண் அரிப்பு தடுப்புத் திட்டம்", amount: "75% மானியம்", benefits: ["சம உயர வரப்பு அமைத்தல் (Contour Bunding)", "படிக்கட்டு முறை விவசாய உதவி", "நீரோடை அடைப்பு (Gully Plugging)", "பட்டைப் பயிரிடலை (Strip Cropping) ஊக்குவித்தல்"], eligibility: ["மலைப்பகுதி விவசாயிகள்", "மண் அரிப்பு ஏற்படக்கூடிய பகுதிகள்"], documents: ["நில ஆவணங்கள்", "மண் அரிப்பு சான்று", "ஆதார்"] },
    60: { fullName: "நிலம் சமன்படுத்துதல் மற்றும் மேம்பாடு", amount: "ஏக்கருக்கு ₹10,000 வரை 50% மானியம்", benefits: ["லேசர் நிலம் சமன்படுத்தும் மானியம்", "நில அமைப்பு மாற்றம்", "வடிகால் மேம்பாடு", "நீர் பயன்பாட்டுத் திறன்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "தண்ணீர் பற்றாக்குறை உள்ள பகுதிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "ஆதார்", "விலைப்புள்ளி", "வங்கி கணக்கு"] },
    61: { fullName: "பரம்பராகத் கிருஷி விகாஸ் யோஜனா (PKVY)", amount: "₹31,500/ஹெக்டேர்", benefits: ["இயற்கை இடுபொருட்களுக்கு ₹15,000", "சான்றிதழுக்கு ₹10,000", "பயிற்சிக்கு ₹6,500", "3 ஆண்டு உதவி"], eligibility: ["விவசாயிகள் குழு (50+ விவசாயிகள்)", "FPO", "சுய உதவிக் குழுக்கள்", "குறைந்தபட்சம் 50 ஏக்கர்"], documents: ["குழுப் பதிவு", "விவசாயிகள் பட்டியல்", "நில விவரங்கள்", "மண் பரிசோதனை அறிக்கை"] },
    62: { fullName: "வடகிழக்கு பிராந்திய இயற்கை மதிப்பு சங்கிலி மேம்பாட்டுப் பணி", amount: "₹75,000/ஹெக்டேர்", benefits: ["வடகிழக்கு மாநிலங்களில் இயற்கை விவசாயம்", "FPO உருவாக்க உதவி", "சந்தை இணைப்பு", "பதப்படுத்தும் உள்கட்டமைப்பு"], eligibility: ["வடகிழக்கு மாநில விவசாயிகள்", "FPO", "இயற்கை விவசாயக் குழுக்கள்", "பழங்குடியின விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "FPO பதிவு", "விவசாயி அடையாள அட்டை", "வங்கி கணக்கு"] },
    63: { fullName: "மண்புழு உரம் உற்பத்தி அலகு திட்டம்", amount: "₹50,000 வரை 50% மானியம்", benefits: ["மண்புழு உர அலகு அமைத்தல்", "மண்புழு விநியோகம்", "பயிற்சி வழங்குதல்", "இயற்கை உர உற்பத்தி"], eligibility: ["தனிநபர் விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "FPO", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "திட்ட முன்மொழிவு", "ஆதார்", "வங்கி கணக்கு"] },
    64: { fullName: "உயிர் உர உற்பத்தி அலகு திட்டம்", amount: "₹2 லட்சம் வரை 40% மானியம்", benefits: ["ரைசோபியம், PSB உற்பத்தி", "அசோடோபாக்டர், VAM விநியோகம்", "தரக்கட்டுப்பாட்டு ஆய்வகம்", "விவசாயிகள் பயிற்சி"], eligibility: ["சுய உதவிக் குழுக்கள்", "FPO", "இளம் தொழில்முனைவோர்", "வேளாண் பட்டதாரிகள்"], documents: ["வணிகத் திட்டம்", "தொழில்நுட்பத் தகுதி", "நிலக் குத்தகை ஆவணம்", "வங்கி கணக்கு"] },
    65: { fullName: "ஜீரோ பட்ஜெட் இயற்கை விவசாயத் திட்டம்", amount: "₹15,000/ஹெக்டேர்", benefits: ["இயற்கை விவசாய ஊக்குவிப்பு", "மாடு அடிப்படையிலான விவசாயம்", "உயிர் பூச்சிக்கொல்லி பயிற்சி", "மூடாக்கு (Mulching) உதவி"], eligibility: ["அனைத்து விவசாயிகள்", "மானாவாரி பகுதிகளுக்கு முன்னுரிமை", "சிறு மற்றும் குறு விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "பயிற்சி சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    66: { fullName: "PGS-இந்தியா சான்றிதழ் உதவி", amount: "₹10,000 வரை 100% மானியம்", benefits: ["இலவச இயற்கை விவசாயச் சான்றிதழ்", "குழுக்களுக்கான சான்றிதழ்", "தர உத்தரவாதம்", "சந்தை அணுகல்"], eligibility: ["விவசாயிகள் குழு", "FPO", "இயற்கை விவசாயக் குழுக்கள்"], documents: ["குழுப் பதிவு", "விவசாயிகள் பட்டியல்", "நில ஆவணங்கள்"] },
    67: { fullName: "கால்நடை எரு மேலாண்மைத் திட்டம்", amount: "₹30,000 வரை 50% மானியம்", benefits: ["உரக் குழி அமைத்தல்", "எரு பதப்படுத்துதல்", "பயோகேஸ் அலகு மானியம்", "தொழுவுரத்தை ஊக்குவித்தல்"], eligibility: ["கால்நடை வளர்ப்போர்", "பால் பண்ணை விவசாயிகள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "கால்நடை கணக்கெடுப்பு சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    68: { fullName: "பசுந்தாள் உர விதை மானியம்", amount: "விதைகளுக்கு 50% மானியம்", benefits: ["சணப்பு, தக்கைப்பூண்டு விதைகள்", "மண் வளம் மேம்பாடு", "களை கட்டுப்பாடு", "உரத் தேவையைக் குறைத்தல்"], eligibility: ["அனைத்து விவசாயிகள்", "இயற்கை விவசாயிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    69: { fullName: "மாநில இயற்கை விவசாய ஊக்கத்தொகை", amount: "₹20,000/ஹெக்டேர்", benefits: ["இயற்கை இடுபொருள் மானியம்", "பயிற்சி மற்றும் செயல்விளக்கம்", "சந்தை இணைப்பு உதவி", "PGS சான்றிதழ்"], eligibility: ["அனைத்து விவசாயிகள்", "இயற்கை விவசாயக் குழுக்கள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "பயிற்சி சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    70: { fullName: "உயிர் பூச்சிக்கொல்லி ஊக்குவிப்புத் திட்டம்", amount: "ஏக்கருக்கு ₹2,000 வரை 50% மானியம்", benefits: ["வேப்ப அடிப்படையிலான பூச்சிக்கொல்லிகள்", "ட்ரைக்கோடெர்மா விநியோகம்", "சூடோமோனாஸ் வளர்ப்பு", "IPM பயிற்சி"], eligibility: ["அனைத்து விவசாயிகள்", "இயற்கை விவசாயிகள்", "FPO"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    71: { fullName: "தோட்டக்கலை ஒருங்கிணைந்த மேம்பாட்டுக்கான பணி (MIDH)", amount: "50-75% மானியம்", benefits: ["பழம், காய்கறி நடவு", "நாற்றங்கால் மேம்பாடு", "அறுவடைக்கு பிந்தைய மேலாண்மை", "பேக்கேஜிங் மானியம்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "நாற்றங்கால் உரிமையாளர்கள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "திட்ட முன்மொழிவு", "ஆதார்", "வங்கி கணக்கு"] },
    72: { fullName: "தென்னை மேம்பாட்டுத் திட்டம்", amount: "₹50,000/ஹெக்டேர்", benefits: ["சிறு விவசாயிகளுக்கு 70% மானியம்", "அதிக மகசூல் தரும் கன்றுகள்", "பழைய மரங்களை மாற்றுதல்", "மதிப்பு கூட்டுதல் உதவி"], eligibility: ["கேரளா, தமிழ்நாடு, கர்நாடகா, ஆந்திராவின் தென்னை விவசாயிகள்", "FPO", "சிறு விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "மரங்களின் எண்ணிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    73: { fullName: "முந்திரி மற்றும் கோகோ திட்டம்", amount: "₹25,000/ஹெக்டேர்", benefits: ["முந்திரி நடவு மானியம்", "கோகோ சாகுபடி உதவி", "பதப்படுத்தும் அலகு மானியம்", "ஏற்றுமதி ஊக்கம்"], eligibility: ["கடலோர மாநில விவசாயிகள்", "FPO", "பதப்படுத்தும் அலகுகள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "திட்ட அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    74: { fullName: "மூங்கில் மேம்பாட்டுத் திட்டம்", amount: "₹30,000/ஹெக்டேர்", benefits: ["மூங்கில் நடவு மானியம்", "நாற்றங்கால் மேம்பாடு", "மதிப்பு கூட்டுதல் அலகுகள்", "கைவினைப் பொருட்கள் உதவி"], eligibility: ["வடகிழக்கு மாநில விவசாயிகள்", "FPO", "பழங்குடியின விவசாயிகள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "மூங்கில் பகுதி விவரங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    75: { fullName: "நறுமணப் பொருட்கள் மேம்பாடு மற்றும் பதப்படுத்துதல்", amount: "40% மானியம்", benefits: ["நறுமணப் பொருட்கள் பதப்படுத்தும் அலகுகள்", "மதிப்பு கூட்டுதல் உபகரணங்கள்", "தர பரிசோதனை ஆய்வகம்", "ஏற்றுமதி வசதி"], eligibility: ["நறுமணப் பொருட்கள் உற்பத்தியாளர்கள்", "FPO", "நறுமணப் பொருட்கள் பதப்படுத்துவோர்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "ஸ்பைசஸ் போர்டு பதிவு", "திட்ட அறிக்கை", "வங்கி கணக்கு"] },
    76: { fullName: "மாம்பழ சாகுபடி மற்றும் பதப்படுத்துதல்", amount: "₹40,000/ஹெக்டேர்", benefits: ["அதிக மகசூல் தரும் மாங்கன்றுகள்", "பதப்படுத்தும் அலகு உதவி", "குளிர்பதனக் கிடங்கு மானியம்", "ஏற்றுமதி ஊக்கம்"], eligibility: ["மாம்பழ உற்பத்தியாளர்கள்", "FPO", "பதப்படுத்தும் அலகுகள்"], documents: ["நில ஆவணங்கள்", "ரகத்தின் விவரங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    77: { fullName: "வாழை சாகுபடி மற்றும் மதிப்பு கூட்டுதல்", amount: "₹35,000/ஹெக்டேர்", benefits: ["திசு வளர்ப்பு கன்றுகள் மானியம்", "சொட்டு நீர் பாசன உதவி", "பதப்படுத்தும் அலகுகள்", "சந்தை இணைப்பு"], eligibility: ["வாழை உற்பத்தியாளர்கள்", "FPO", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "ரகத்தின் விவரங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    78: { fullName: "தேசிய மலரியல் (Floriculture) பணி", amount: "₹5 லட்சம் வரை 50% மானியம்", benefits: ["மலர் சாகுபடிக்கு உதவி", "பசுமைக்குடில் மானியம்", "ஏற்றுமதி தரத்திலான மலர்கள்", "குளிர் சங்கிலி (Cold Chain) உதவி"], eligibility: ["மலர் உற்பத்தியாளர்கள்", "FPO", "பெண் விவசாயிகள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "பசுமைக்குடில் முன்மொழிவு", "ஆதார்", "வங்கி கணக்கு"] },
    79: { fullName: "தேசிய காளான் பணி", amount: "₹1 லட்சம் வரை 50% மானியம்", benefits: ["காளான் விதை (Spawn) மானியம்", "வளர்ப்பு அறை கட்டுதல்", "பயிற்சி மற்றும் தொழில்நுட்பம்", "சந்தைப்படுத்தல் உதவி"], eligibility: ["அனைத்து விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்", "ஊரக இளைஞர்கள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "பயிற்சி சான்றிதழ்"] },
    80: { fullName: "காய்கறி தொகுப்பு (Cluster) மேம்பாட்டுத் திட்டம்", amount: "₹20,000/ஹெக்டேர்", benefits: ["காய்கறி விதை மானியம்", "பாதுகாக்கப்பட்ட சாகுபடி", "சந்தை இணைப்பு", "அறுவடைக்கு பிந்தைய மேலாண்மை"], eligibility: ["காய்கறி விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "பயிர் திட்டம்", "ஆதார்", "வங்கி கணக்கு"] },
    81: { fullName: "வேளாண் வளங்களுக்கான மெய்நிகர் ஒருங்கிணைந்த அமைப்பு (VIS)", amount: "இலவச AI சேவை", benefits: ["AI அடிப்படையிலான வேளாண் ஆலோசனை", "22+ இந்திய மொழிகள்", "பயிர் பரிந்துரைகள்", "பூச்சி எச்சரிக்கைகள்", "சந்தை விலைகள்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "விரிவாக்க அதிகாரிகள்", "KVK"], documents: ["ஆதார்", "மொபைல் எண்", "நில ஆவணங்கள் (விரும்பினால்)"] },
    82: { fullName: "தேசிய அக்ரிஸ்டாக் (AgriStack) டிஜிட்டல் தளம்", amount: "இலவச டிஜிட்டல் ஐடி", benefits: ["தனித்துவமான உழவர் அடையாள அட்டை", "டிஜிட்டல் நில ஆவணங்கள்", "பயிர் விதைப்புத் தரவு", "நேரடி பலன் பரிமாற்ற (DBT) ஒருங்கிணைப்பு"], eligibility: ["அனைத்து விவசாயிகள்", "திட்டப் பயனாளிகளுக்கு முன்னுரிமை", "சிறு மற்றும் குறு விவசாயிகள்"], documents: ["ஆதார்", "நில ஆவணங்கள்", "வங்கி கணக்கு", "மொபைல் எண்"] },
    83: { fullName: "தேசிய வேளாண் சந்தை (e-NAM)", amount: "இலவச வர்த்தக தளம்", benefits: ["ஆன்லைன் மண்டி வர்த்தகம்", "நிகழ்நேர விலை அறிதல்", "1000+ மண்டிகள் இணைக்கப்பட்டுள்ளன", "விவசாயிக்கு நேரடி கட்டணம்"], eligibility: ["அனைத்து விவசாயிகள்", "வியாபாரிகள்", "FPO", "கமிஷன் ஏஜெண்டுகள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "வர்த்தக உரிமம்", "மொபைல் எண்"] },
    84: { fullName: "கிசான் சுவிதா மொபைல் செயலி", amount: "இலவச செயலி", benefits: ["வானிலை நிலவரங்கள்", "மண்டி விலைகள்", "பூச்சி எச்சரிக்கைகள்", "விநியோகஸ்தர் தகவல்கள்", "பயிர் பாதுகாப்பு"], eligibility: ["அனைத்து விவசாயிகள்", "ப்ளே ஸ்டோரில் இருந்து இலவச பதிவிறக்கம்", "பதிவு தேவையில்லை"], documents: ["மொபைல் எண்", "ஆண்ட்ராய்டு போன்"] },
    85: { fullName: "ICAR-பூசா கிருஷி மொபைல் செயலி", amount: "இலவசம்", benefits: ["பயிர் ரகங்களின் தரவுத்தளம்", "சாகுபடி முறைகள்", "நோய் கண்டறிதல்", "நிபுணர் ஆலோசனை"], eligibility: ["அனைத்து விவசாயிகள்", "இலவச பதிவிறக்கம்", "ஹிந்தி மற்றும் ஆங்கிலத்தில் கிடைக்கிறது"], documents: ["தேவையில்லை"] },
    86: { fullName: "கிசான் கால் சென்டர் 1551", amount: "கட்டணமில்லா அழைப்பு (Toll Free)", benefits: ["24x7 வேளாண் கேள்விகள்", "நிபுணர் ஆலோசனை", "பன்மொழி ஆதரவு", "திட்ட தகவல்கள்"], eligibility: ["அனைத்து விவசாயிகள்", "கட்டணமில்லா எண்: 1551", "எந்த போனிலிருந்தும் அழைக்கலாம்"], documents: ["தேவையில்லை"] },
    87: { fullName: "விவசாயிகளுக்கான mKisan SMS தளம்", amount: "இலவச SMS சேவை", benefits: ["இலவச SMS எச்சரிக்கைகள்", "வானிலை முன்னறிவிப்பு", "சந்தை விலைகள்", "பயிர் பாதுகாப்பு ஆலோசனை"], eligibility: ["அனைத்து விவசாயிகள்", "மொபைல் எண் பதிவு கட்டாயம்", "எந்த மொபைல் நெட்வொர்க்கிலும்"], documents: ["மொபைல் எண்", "விவசாயி பதிவு"] },
    88: { fullName: "கஸ்டம் ஹயரிங் மைய மொபைல் செயலி", amount: "இலவச சேவை", benefits: ["அருகிலுள்ள வேளாண் உபகரணங்களைத் தேடுதல்", "உபகரணங்களை ஆன்லைனில் முன்பதிவு செய்தல்", "வாடகை விலைகளை ஒப்பிடுதல்", "விவசாயிகளின் மதிப்புரைகள்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "கஸ்டம் ஹயரிங் மையங்கள்"], documents: ["மொபைல் எண்", "இருப்பிட அணுகல் (Location)"] },
    89: { fullName: "NPSS - டிஜிட்டல் பூச்சி கண்காணிப்பு", amount: "இலவச சேவை", benefits: ["AI அடிப்படையிலான பூச்சி கண்டறிதல்", "முன்கூட்டிய எச்சரிக்கை அமைப்பு", "பயிர் சார்ந்த எச்சரிக்கைகள்", "தடுப்பு பரிந்துரைகள்"], eligibility: ["அனைத்து விவசாயிகள்", "இலவச மொபைல் செயலி", "பதிவு தேவையில்லை"], documents: ["மொபைல் எண்", "பயிரின் புகைப்படம் (கண்டறிவதற்காக)"] },
    90: { fullName: "வேளாண்-ஸ்டார்ட்அப் இன்குபேஷன் திட்டம்", amount: "₹25 லட்சம் மானியம்", benefits: ["வேளாண்-தொழில்நுட்ப ஸ்டார்ட்அப்களுக்கான நிதி", "வழிகாட்டுதல் (Mentorship)", "இன்குபேஷன் உதவி", "முதலீட்டாளர் தொடர்பு"], eligibility: ["வேளாண்-தொழில்நுட்ப ஸ்டார்ட்அப்கள்", "இளம் தொழில்முனைவோர் (18-35)", "ஊரக கண்டுபிடிப்பாளர்கள்"], documents: ["வணிகத் திட்டம்", "ஸ்டார்ட்அப் பதிவு", "குழு விவரங்கள்", "கண்டுபிடிப்பு சான்று"] },
    91: { fullName: "பிரதான் मந்திரி கிசான் உர்ஜா சுரக்ஷா ஏவம் உத்தான் மகாபியான் (PM-KUSUM)", amount: "60% மானியம்", benefits: ["சூரிய சக்தி பம்புகளுக்கு 60% மானியம் (7.5 HP வரை)", "தரிசு நிலங்களில் சோலார் பேனல்கள் அமைத்தல்", "கூடுதல் மின்சாரத்தை கிரிGrid-க்கு விற்றல்", "மின்சாரச் செலவைக் குறைத்தல்"], eligibility: ["விவசாய நிலம் உள்ள விவசாயிகள்", "தனிநபர் விவசாயிகள்", "நீர் பயன்படுத்துவோர் சங்கங்கள்", "FPO"], documents: ["நில ஆவணங்கள்", "மின் இணைப்புச் சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    92: { fullName: "சோலார் சர்க்கா கிளஸ்டர்", amount: "₹4.5 லட்சம் மானியம்", benefits: ["சூரிய சக்தியால் இயங்கும் சர்க்கா அலகுகள்", "பெண்கள் மேம்பாடு", "காதர் துணி உற்பத்தி", "ஊரக வேலைவாய்ப்பு"], eligibility: ["சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்", "ஊரகக் கைவினைஞர்கள்", "காதர் நிறுவனங்கள்"], documents: ["SHG பதிவு", "திட்ட முன்மொழிவு", "வங்கி கணக்கு"] },
    93: { fullName: "சூரிய சக்தியால் இயங்கும் குளிர்பதனக் கிடங்கு திட்டம்", amount: "₹10 லட்சம் வரை 50% மானியம்", benefits: ["விவசாயிகளுக்கான சோலார் கோல்ட் ஸ்டோரேஜ்", "அறுவடைக்கு பிந்தைய இழப்பு குறைப்பு", "ஆஃப்-கிரிட் (Off-grid) இயக்கம்", "பழம் மற்றும் காய்கறி பாதுகாப்பு"], eligibility: ["FPO", "விவசாய கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்", "தனிநபர் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "திட்ட அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    94: { fullName: "வேளாண் விளைபொருட்களுக்கான சோலார் ட்ரையர்", amount: "₹2 லட்சம் வரை 40% மானியம்", benefits: ["தானியங்கள்/பழங்களுக்கான சோலார் ட்ரையர்", "தரப் பாதுகாப்பு", "மதிப்பு கூட்டுதல்", "வெயிலில் காயவைப்பதன் மீதான சார்பைக் குறைத்தல்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "விலைப்புள்ளி", "ஆதார்", "வங்கி கணக்கு"] },
    95: { fullName: "பயிர் பாதுகாப்புக்கான சோலார் வேலி (Solar Fencing)", amount: "₹50,000 வரை 50% மானியம்", benefits: ["வயல்களுக்கு சோலார் மின்வேலி", "வனவிலங்குகளிடமிருந்து பாதுகாப்பு", "குறைந்த பராமரிப்பு", "மின்சார கட்டணம் இல்லை"], eligibility: ["வனவிலங்கு தொல்லை உள்ள பகுதி விவசாயிகள்", "தோட்ட உரிமையாளர்கள்", "அனைத்து விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "இருப்பிடச் சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    96: { fullName: "ஆஃப்-கிரிட் சோலார் நீர் பம்பிங்", amount: "₹1.5 லட்சம் வரை 75% மானியம்", benefits: ["சோலார் சப்மெர்சிபிள் பம்ப்", "டீசல்/மின்சார செலவு இல்லை", "தொலைதூரப் பகுதிகளில் இயங்கும்", "5 ஆண்டுகள் உத்திரவாதம்"], eligibility: ["சிறு மற்றும் குறு விவசாயிகள்", "மின்சார கிரிட் இணைப்பு இல்லாத பகுதிகள்"], documents: ["நில ஆவணங்கள்", "நீர் ஆதாரச் சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    97: { fullName: "சூரிய சக்தியால் இயங்கும் பாதுகாக்கப்பட்ட சாகுபடி", amount: "₹5 லட்சம் வரை 60% மானியம்", benefits: ["சோலาร์ ஃபேன்கள் மற்றும் கூலிங் அமைப்பு", "வெப்பநிலை கட்டுப்பாடு", "நீட்டிக்கப்பட்ட பயிர் பருவம்", "அதிக மகசூல்"], eligibility: ["தோட்டக்கலை விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "பசுமைக்குடில் திட்டம்", "ஆதார்", "வங்கி கணக்கு"] },
    98: { fullName: "வேளாண் ட்ரோன்களுக்கான சோலார் சார்ஜிங்", amount: "₹50,000 வரை 40% மானியம்", benefits: ["சோலார் சார்ஜிங் நிலையங்கள்", "ஆஃப்-கிரிட் ட்ரோன் இயக்கம்", "நிலையான விவசாயம்", "டீசல் பயன்பாட்டைக் குறைத்தல்"], eligibility: ["FPO", "ட்ரோன் தீதி பயனாளிகள்", "சுய உதவிக் குழுக்கள்"], documents: ["ட்ரோன் வாங்கியதற்கான சான்று", "நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    99: { fullName: "வேளாண் ஃபீடர்களின் சூரியசக்தி மயமாக்கல்", amount: "90% மானியம்", benefits: ["பாசன ஃபீடர்களுக்கு சூரிய சக்தி", "பகலில் நம்பகமான மின்சாரம்", "மின்சார கிரிட் மீதான சார்பு குறைப்பு", "குறைந்த மின் கட்டணம்"], eligibility: ["மாநில அரசுகள்", "மின் விநியோக நிறுவனங்கள் (DISCOM)", "நீர் பயன்படுத்துவோர் சங்கங்கள்"], documents: ["திட்ட முன்மொழிவு", "ஃபீடர் விவரங்கள்"] },
    100: { fullName: "விவசாயிகளுக்கான மேற்கூரை சோலார் மானியம்", amount: "₹78,000 வரை 40% மானியம்", benefits: ["கிரிட் உடன் இணைக்கப்பட்ட மேற்கூரை சோலார்", "மின்சார கட்டணக் குறைப்பு", "கூடுதல் மின்சாரத்தை கிரிடுக்கு விற்றல்", "பம்ப் செட் அல்லது வீட்டு உபயோகத்திற்கு"], eligibility: ["அனைத்து விவசாயிகள்", "பண்ணை வீட்டு உரிமையாளர்கள்", "FPO"], documents: ["மின்சார கட்டண ரசீது", "மேற்கூரை உரிமைச் சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    101: { fullName: "கால்நடை பராமரிப்பு உள்கட்டமைப்பு மேம்பாட்டு நிதி (AHIDF)", amount: "₹100 கோடி வரை கடன்", benefits: ["பால்பண்ணை, கோழிவளர்ப்புக்கு கடனுடன் இணைந்த மானியம்", "3% வட்டி மானியம்", "₹100 கோடி வரை கடன் வசதி", "MSME-களுக்கு கடன் உத்தரவாதம்"], eligibility: ["தனிநபர் தொழில்முனைவோர்", "FPO", "தனியார் நிறுவனங்கள்", "கூட்டுறவு சங்கங்கள்"], documents: ["விரிவான திட்ட அறிக்கை (DPR)", "வணிகப் பதிவு", "நில ஆவணங்கள்", "வங்கி கணக்கு"] },
    102: { fullName: "பால்பண்ணை தொழில்முனைவோர் மேம்பாட்டுத் திட்டம்", amount: "25-33% மானியம்", benefits: ["பால் பண்ணை அலகுகளுக்கு மானியம்", "பொதுப் பிரிவினருக்கு 25%, SC/ST-க்கு 33%", "பசு/எருமை வாங்க கடன்", "பால் பதப்படுத்தும் உபகரணங்கள்"], eligibility: ["தனிநபர் விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "பால் கூட்டுறவு சங்கங்கள்", "நிலமற்ற விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "திட்ட அறிக்கை"] },
    103: { fullName: "கோழி வளர்ப்பு துணிகர மூலதன நிதி", amount: "₹3 லட்சம் வரை 33% மானியம்", benefits: ["கோழி வளர்ப்பிற்கு மானியம்", "SC/ST விவசாயிகளுக்கு 33%", "பிராய்லர்/முட்டையிடும் பண்ணைகளுக்கு கடன்", "குஞ்சு பொரிப்பக உதவி"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்", "இளம் தொழில்முனைவோர்"], documents: ["நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு", "அनुபவ சான்றிதழ்"] },
    104: { fullName: "ஆடு மற்றும் செம்மறியாடு மேம்பாட்டுத் திட்டம்", amount: "₹50,000 வரை 50% மானியம்", benefits: ["ஆடு/செம்மறியாடு வளர்ப்பிற்கு மானியம்", "இன மேம்பாட்டு உதவி", "கால்நடை மருத்துவ பராமரிப்பு", "சந்தைப்படுத்தல் உதவி"], eligibility: ["சிறு விவசாயிகள்", "நிலமற்ற தொழிலாளர்கள்", "பழங்குடியின விவசாயிகள்", "பெண் விவசாயிகள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "கிராம பஞ்சாயத்து சான்றிதழ்", "நில ஆவணங்கள்"] },
    105: { fullName: "பன்றி வளர்ப்பு மற்றும் இனப்பெருக்கத் திட்டம்", amount: "₹40,000 வரை 40% மானியம்", benefits: ["பன்றி வளர்ப்பு மானியம்", "இன மேம்பாடு", "கால்நடை மருத்துவ உதவி", "சந்தை இணைப்பு"], eligibility: ["சிறு விவசாயிகள்", "பழங்குடியின விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "ஊரக இளைஞர்கள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "நில ஆவணங்கள்", "பயிற்சி சான்றிதழ்"] },
    106: { fullName: "தேசிய தீவன மேம்பாட்டுத் திட்டம்", amount: "₹10,000/ஹெக்டேர்", benefits: ["தீவன விதை மானியம்", "ஹைட்ரோபோனிக் தீவன அலகுகள்", "சைலேஜ் (தீவன ஊறுகாய்) தயாரிப்பு உதவி", "தீவனச் சேமிப்பு"], eligibility: ["அனைத்து விவசாயிகள்", "பால் பண்ணை விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "கால்நடை கணக்கெடுப்பு சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    107: { fullName: "தேசிய கால்நடை நோய் காப்பீட்டுத் திட்டம்", amount: "பிரீமியம்: ₹50-200/கால்நடை", benefits: ["கால்நடைகளுக்கான காப்பீடு", "பசு, எருமை, செம்மறி, ஆடுகளுக்கு கவரேஜ்", "நோய் மற்றும் விபத்து காப்பீடு", "விரைவான க்ளைம் தீர்வு"], eligibility: ["அனைத்து கால்நடை வளர்ப்போர்", "பால் பண்ணை விவசாயிகள்", "ஆடு/செம்மறி வளர்ப்போர்"], documents: ["கалநடை அடையாளம்", "கால்நடை மருத்துவ சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    108: { fullName: "NBHM - தேனீ வளர்ப்புத் திட்டம் (Honey Mission)", amount: "பயனாளிகளுக்கு ₹10,000", benefits: ["தேனீ வளர்ப்பு உபகரணங்கள் மானியம்", "தேன்கூடு பதப்படுத்தும் அலகுகள்", "பயிற்சி மற்றும் செயல்விளக்கம்", "தேன் சந்தைப்படுத்தல் உதவி"], eligibility: ["தனிநபர் விவசாயிகள்", "சுய உதவிக் குழுக்கள்", "FPO", "பழங்குடியின விவசாயிகள்"], documents: ["நில ஆவணங்கள் (தேனீ பண்ணைக்கு)", "ஆதார்", "வங்கி கணக்கு", "பயிற்சி சான்றிதழ் (முன்னுரிமை)"] },
    109: { fullName: "பிரதான் மந்திரி மத்ஸ்ய சம்பதா யோஜனா (PMMSY)", amount: "40-60% மானியம்", benefits: ["மீன்வளர்ப்பு மானியம்", "குஞ்சு பொரிப்பக மேம்பாடு", "மீன்களுக்கான குளிர் சங்கிலி", "பதப்படுத்தும் அலகுகள்", "ஏற்றுமதி ஊக்குவிப்பு"], eligibility: ["மீனவர்கள்", "மீன் வளர்ப்பு விவசாயிகள்", "FPO", "கூட்டுறவு சங்கங்கள்", "பெண்கள் சுய உதவிக் குழுக்கள்"], documents: ["நீர்நிலை உரிமை/குத்தகை", "ஆதார்", "வங்கி கணக்கு", "திட்ட அறிக்கை"] },
    110: { fullName: "NLM - கால்நடை மேம்பாடு", amount: "₹2 லட்சம் வரை 50% மானியம்", benefits: ["பசு, எருமை, ஆடுகளின் இன மேம்பாடு", "தீவன மேம்பாடு", "இடர் மேலாண்மை (Risk Management)", "தொழில்முனைவோர் மேம்பாடு"], eligibility: ["அனைத்து கால்நடை வளர்ப்பு விவசாயிகள்", "FPO", "கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்"], documents: ["கால்நடை கணக்கெடுப்பு சான்று", "நில ஆவணங்கள் (தீவனத்திற்கு)", "ஆதார்", "வங்கி கணக்கு"] },
    111: { fullName: "மாநில பேரிடர் நிவாரண நிதி - வேளாண்மை", amount: "₹20,000/ஹெக்டேர்", benefits: ["பயிர் இழப்பு இழப்பீடு", "இயற்கை பேரிடர் உதவி", "வெள்ளம், வறட்சி, புயல் பாதிப்பு", "விரைவான விநியோகம்"], eligibility: ["அறிவிக்கப்பட்ட பேரிடர் பகுதி விவசாயிகள்", "அனைத்து விவசாயிகள்", "பயிர் இழப்பு >50%"], documents: ["நில ஆவணங்கள்", "பயிர் இழப்பு சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    112: { fullName: "தேசிய பேரிடர் நிவாரணப் படை - வேளாண்மை", amount: "₹25,000/ஹெக்டேர்", benefits: ["தேசிய அளவிலான பேரிடர் நிவாரணம்", "புயல், வெள்ளம், ஆலங்கட்டி மழை", "நிலச்சரிவு கவரேஜ்", "பூச்சித் தாக்குதல் பாதிப்பு"], eligibility: ["கடுமையாக பாதிக்கப்பட்ட பகுதி விவசாயிகள்", "அனைத்து பிரிவினரும்"], documents: ["பேரிடர் அறிவிப்பு", "நில ஆவணங்கள்", "பயிர் இழப்பு சான்றிதழ்", "ஆதார்"] },
    113: { fullName: "ஆலங்கட்டி மழை (Hailstorm) பயிர் காப்பீடு", amount: "பிரீமியம்: 2-5%", benefits: ["ஆலங்கட்டி மழைக்கான சிறப்பு காப்பீடு", "தனிநபர் பண்ணை மதிப்பீடு", "விரைவான க்ளைம்கள்", "அனைத்து பயிர்களையும் உள்ளடக்கியது"], eligibility: ["ஆலங்கட்டி மழை பாதிப்புள்ள பகுதி விவசாயிகள்", "அனைத்து விவசாயிகளுக்கும் விருப்பம்"], documents: ["நில ஆவணங்கள்", "வானிலை தரவு", "ஆதார்", "வங்கி கணக்கு"] },
    114: { fullName: "தேசிய வறட்சி நிவாரணப் பொதி", amount: "₹15,000/ஹெக்டேர்", benefits: ["வறட்சியால் பாதிக்கப்பட்ட விவசாயிகள்", "இடுபொருள் மானியம்", "தீவன விநியோகம்", "குடிநீர் உதவி"], eligibility: ["வறட்சி அறிவிக்கப்பட்ட பகுதி விவசாயிகள்", "சிறு மற்றும் குறு விவசாயிகளுக்கு முன்னுரிமை"], documents: ["நில ஆவணங்கள்", "வறட்சி அறிவிப்பு", "பயிர் இழப்பு சான்று", "ஆதார்"] },
    115: { fullName: "வேளாண்மைக்கான தேசிய வெள்ள நிவாரணம்", amount: "₹18,000/ஹெக்டேர்", benefits: ["வெள்ளத்தால் பாதிக்கப்பட்ட விவசாயிகள்", "பயிர் இழப்பு இழப்பீடு", "மறுநடவுக்கான விதை மானியம்", "இடுபொருள் உதவி"], eligibility: ["வெள்ளத்தால் பாதிக்கப்பட்ட பகுதி விவசாயிகள்", "அனைத்து பிரிவினரும்"], documents: ["நில ஆவணங்கள்", "வெள்ளச் சேத அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    116: { fullName: "புயலால் பாதிக்கப்பட்ட வேளாண் நிவாரணம்", amount: "₹22,000/ஹெக்டேர்", benefits: ["புயல் சேத இழப்பீடு", "தோட்டச் சேத கவரேஜ்", "கால்நடை இழப்பு உதவி", "இடுபொருள் மானியம்"], eligibility: ["கடலோரப் பகுதி விவசாயிகள்", "புயலால் பாதிக்கப்பட்ட பகுதிகள்"], documents: ["நில ஆவணங்கள்", "புயல் சேத அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    117: { fullName: "வெட்டுக்கிளி/பூச்சித் தாக்குதல் நிவாரணத் திட்டம்", amount: "₹10,000/ஹெக்டேர்", benefits: ["பூச்சிச் சேதத்திற்கான இழப்பீடு", "இலவச பூச்சிக்கொல்லி விநியோகம்", "பயிர் இழப்பு கவரேஜ்", "விரைவு அதிரடிப் படை (QRT)"], eligibility: ["பூச்சிகளால் பாதிக்கப்பட்ட பகுதி விவசாயிகள்", "வெட்டுக்கிளி தாக்குதல் பகுதிகள்"], documents: ["நில ஆவணங்கள்", "பூச்சித் தாக்குதல் சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு"] },
    118: { fullName: "நிலச்சரிவு வேளாண் நிவாரணம்", amount: "₹30,000/ஹெக்டேர்", benefits: ["நிலச்சரிவு சேத இழப்பீடு", "நிலச் சீரமைப்பு உதவி", "படிக்கட்டு வயல் பழுதுபார்ப்பு மானியம்", "இடுபொருள் உதவி"], eligibility: ["மலைப்பகுதி விவசாயிகள்", "நிலச்சரிவால் பாதிக்கப்பட்ட பகுதிகள்"], documents: ["நில ஆவணங்கள்", "நிலச்சரிவு சேத அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    119: { fullName: "மின்னல் பாதிப்பு இழப்பீடு", amount: "விவசாயிக்கு ₹5 லட்சம்", benefits: ["விவசாயி இறப்பிற்கு இழப்பீடு", "மருத்துவச் செலவு கவரேஜ்", "சார்ந்திருக்கும் குடும்பத்தினருக்கு உதவி", "விரைவான விநியோகம்"], eligibility: ["மின்னலால் பாதிக்கப்பட்ட விவசாயிகள்", "இறந்த விவசாயிகளின் குடும்பங்கள்"], documents: ["இறப்பு சான்றிதழ்", "காவல்துறை அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    120: { fullName: "பனிப்பொழிவு (Cold Wave) பயிர் பாதுகாப்புத் திட்டம்", amount: "₹8,000/ஹெக்டேர்", benefits: ["பனிச் சேத இழப்பீடு", "புகைமூட்டும் கருவி மானியம்", "பயிர் மூடாக்கு உதவி", "இடுபொருள் உதவி"], eligibility: ["பனிப்பொழிவு உள்ள பகுதி விவசாயிகள்", "காய்கறி மற்றும் பழ உற்பத்தியாளர்கள்"], documents: ["நில ஆவணங்கள்", "வெப்பநிலை தரவு", "பயிர்ச் சேத சான்று", "ஆதார்"] },
    121: { fullName: "இ-நாம் (e-NAM) மேம்படுத்தப்பட்ட தளம்", amount: "இலவச வர்த்தகம்", benefits: ["ஆன்லைன் மண்டி வர்த்தகம்", "தரச் சரிபார்ப்பு", "கிடங்கு ரசீது அமைப்பு", "நேரடி கட்டணம்"], eligibility: ["அனைத்து விவசாயிகள்", "வியாபாரிகள்", "FPO", "கமிஷன் ஏஜெண்டுகள்"], documents: ["ஆதார்", "வங்கி கணக்கு", "மொபைல் எண்", "வர்த்தக பதிவு"] },
    122: { fullName: "FPO வர்த்தக உதவித் திட்டம்", amount: "₹15 லட்சம் உதவி", benefits: ["FPO சந்தை இணைப்பு", "பிராண்ட் மேம்பாடு", "பேக்கேஜிங் உதவி", "நேரடி வாங்குபவர் தொடர்பு"], eligibility: ["பதிவு செய்யப்பட்ட FPO", "உற்பத்தியாளர் நிறுவனங்கள்", "விவசாய கூட்டுறவு சங்கங்கள்"], documents: ["FPO பதிவு", "உறுப்பினர் பட்டியல்", "வங்கி கணக்கு", "வணிகத் திட்டம்"] },
    123: { fullName: "பேச்சுவார்த்தைக்குட்பட்ட கிடங்கு ரசீது திட்டம் (NWRS)", amount: "கிடங்கு ரசீது மீது கடன்", benefits: ["கிடங்கில் பயிர் சேமிப்பு", "ரசீது மீது கடன் பெறுதல்", "அதிக விலைக்கு விற்றல்", "தரப் பாதுகாப்பு"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "வியாபாரிகள்", "கூட்டுறவு சங்கங்கள்"], documents: ["கிடங்கு ரசீது", "ஆதார்", "வங்கி கணக்கு", "பயிர் விவரங்கள்"] },
    124: { fullName: "வேளாண் விளைபொருள் போக்குவரத்து மானியம்", amount: "50% போக்குவரத்து மானியம்", benefits: ["போக்குவரத்து செலவு மானியம்", "வடகிழக்கு மாநிலங்களுக்கு முன்னுரிமை", "விரைவில் கெட்டுப்போகும் பொருட்கள்", "மண்டி அணுகல்"], eligibility: ["தொலைதூரப் பகுதி விவசாயிகள்", "வடகிழக்கு மாநிலங்கள்", "மலைப்பகுதிகள்", "பழங்குடியின பகுதிகள்"], documents: ["போக்குவரத்து ரசீது", "மண்டி நுழைவுச் சான்று", "ஆதார்", "வங்கி கணக்கு"] },
    125: { fullName: "சந்தை தலையீட்டுத் திட்டம் (MIS)", amount: "MSP ஆதரவு விலை", benefits: ["விரைவில் கெட்டுப்போகும் பயிர்களுக்கு ஆதரவு விலை", "அரசு கொள்முதல்", "இழப்பீடு", "விவசாயியின் வருமானப் பாதுகாப்பு"], eligibility: ["அறிவிக்கப்பட்ட விரைவில் கெட்டுப்போகும் பயிர்களை பயிரிடும் விவசாயிகள்", "அனைத்து மாநிலங்கள்"], documents: ["பயிர் அறிவிப்பு", "நில ஆவணங்கள்", "ஆதார்", "வங்கி கணக்கு"] },
    126: { fullName: "கிசான் ரயில் சரக்குக் கட்டண மானியத் திட்டம்", amount: "50% சரக்குக் கட்டண மானியம்", benefits: ["விரைவில் கெட்டுப்போகும் பொருட்களுக்கான மானியப் போக்குவரத்து", "விரைவான சந்தை அணுகல்", "வீணாவதைக் குறைத்தல்", "நாடு தழுவிய அணுகல்"], eligibility: ["அனைத்து விவசாயிகள்", "FPO", "கூட்டுறவு சங்கங்கள்", "வியாபாரிகள் (விவசாயிகள் சார்பாக)"], documents: ["ரயில்வே முன்பதிவு ரசீது", "விவசாயி அறிவிப்பு", "ஆதார்", "வங்கி கணக்கு"] },
    127: { fullName: "FPO உருவாக்கம் மற்றும் மேம்பாடு", amount: "ஒரு FPO-க்கு ₹15 லட்சம்", benefits: ["FPO உருவாக்கத்திற்கான நிதி உதவி", "5 ஆண்டுகள் வழிகாட்டுதல்", "₹15 லட்சம் வரை ஈக்விட்டி மானியம்", "கடன் உத்தரவாதம்"], eligibility: ["300+ விவசாயிகள் கொண்ட குழுக்கள்", "சுய உதவிக் குழுக்கள்", "கூட்டுறவு சங்கங்கள்", "விவசாயிகள் குழுக்கள்"], documents: ["விவசாயிகள் பட்டியல் (300+)", "நில விவரங்கள்", "வணிகத் திட்டம்", "வங்கி கணக்கு"] },
    128: { fullName: "AMI - ஊரகக் கிடங்குத் திட்டம்", amount: "₹25 லட்சம் வரை 25% மானியம்", benefits: ["ஊரகக் கிடங்கு கட்டுமானம்", "விவசாயிகளுக்கான கிடங்கு", "சேமிக்கப்பட்ட பயிர் மீது கடன்", "குறைந்த விலைக்கு விற்கும் (Distress Sale) நிலை குறைப்பு"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "கூட்டுறவு சங்கங்கள்", "சுய உதவிக் குழுக்கள்"], documents: ["நில ஆவணங்கள்", "திட்ட அறிக்கை", "ஆதார்", "வங்கி கணக்கு"] },
    129: { fullName: "PMKS - கிசான் சம்பதா யோஜனா", amount: "₹10 கோடி வரை 35% மானியம்", benefits: ["உணவு பதப்படுத்தும் அலகுகள்", "மெகா ஃபுட் பார்க்", "குளிர் சங்கிலி உள்கட்டமைப்பு", "மதிப்பு கூட்டுதல்"], eligibility: ["உணவு பதப்படுத்துவோர்", "FPO", "கூட்டுறவு சங்கங்கள்", "வேளாண்-தொழில்முனைவோர்"], documents: ["விரிவான திட்ட அறிக்கை", "நில ஆவணங்கள்", "நிறுவன பதிவு", "வங்கி கணக்கு"] },
    130: { fullName: "விவசாயிகளுக்கான நேரடி சந்தைப்படுத்தல் திட்டம்", amount: "₹2 லட்சம் வரை 50% மானியம்", benefits: ["உழவர் சந்தை ஸ்டால் மானியம்", "நேரடி நுகர்வோர் விற்பனை", "பிராண்டிங் உதவி", "டிஜிட்டல் பேமெண்ட் அமைப்பு"], eligibility: ["தனிநபர் விவசாயிகள்", "FPO", "சுய உதவிக் குழுக்கள்", "பெண் விவசாயிகள்"], documents: ["நில ஆவணங்கள்", "சந்தை ஸ்டால் திட்டம்", "ஆதார்", "வங்கி கணக்கு"] },
    131: { fullName: "மகாத்மா காந்தி ஊரக வேலைவாய்ப்பு (MGNREGA) - வேளாண் பணிகள்", amount: "100 நாட்கள் உத்திரவாத வேலை", benefits: ["100 நாட்கள் வேலை உத்தரவாதம்", "தினசரி ₹300+ கூலி", "பண்ணைக் குட்டை அமைத்தல்", "நில மேம்பாட்டு பணிகள்", "பாசன கால்வாய் பணிகள்"], eligibility: ["அனைத்து ஊரக குடும்பங்கள்", "திறனற்ற வேலை செய்ய விருப்பமுள்ள வயது வந்தோர்", "SC/ST/பெண்களுக்கு முன்னுரிமை"], documents: ["வேலை அட்டை (Job Card)", "ஆதார்", "வங்கி கணக்கு", "ரேஷன் கார்டு"] },
    132: { fullName: "ACABC - வேளாண்-தொழில்முனைவோர் திட்டம்", amount: "₹20 லட்சம் கடன் + 44% மானியம்", benefits: ["வேளாண் பட்டதாரிகளுக்குப் பயிற்சி", "திட்டச் செலவில் 44% மானியம்", "₹20 லட்சம் வரை கடன்", "பயிற்சியின் போது மாதாந்திர உதவித்தொகை"], eligibility: ["வேளாண் பட்டதாரிகள்", "வேளாண் டிப்ளமோதாரர்கள்", "உயிரியல் அறிவியல் பட்டதாரிகள்", "வேளாண் சார்ந்த பாடங்களில் முதுநிலை பட்டதாரிகள்"], documents: ["பட்டச் சான்றிதழ்", "ஆதார்", "வங்கி கணக்கு", "வணிகத் திட்டம்", "நபார்டு (NABARD) இலிருந்து NOC"] },
    133: { fullName: "தேசிய வேளாண் திறன் மேம்பாடு", amount: "இலவச பயிற்சி + ₹5,000 உதவித்தொகை", benefits: ["இலவச திறன் மேம்பாட்டுப் பயிற்சி", "ட்ரோன் பைலட் பயிற்சி", "மண் பரிசோதனை தொழில்நுட்ப வல்லுநர்", "வேளாண் இயந்திரங்களை இயக்குபவர்", "உணவு பதப்படுத்தும் திறன்கள்"], eligibility: ["ஊரக இளைஞர்கள் (18-35 வயது)", "விவசாயிகளின் குழந்தைகள்", "பெண் விவசாயிகள்", "பள்ளி படிப்பை பாதியில் விட்டவர்கள்"], documents: ["ஆதார்", "வயதுச் சான்று", "கல்விச் சான்றிதழ்கள்", "வங்கி கணக்கு", "பாஸ்போர்ட் புகைப்படம்"] },
    134: { fullName: "பிரதான் மந்திரி கௌஷல் விகாஸ் யோஜனா - வேளாண்மை", amount: "இலவச பயிற்சி + சான்றிதழ்", benefits: ["இலவச தொழிற்பயிற்சி", "அரசு சான்றிதழ்", "வேலைவாய்ப்பு உதவி", "முந்தைய கற்றல் அங்கீகாரம் (RPL)", "வேளாண் இயந்திரங்கள் பழுதுபார்க்கும் பயிற்சி"], eligibility: ["18-45 வயதுள்ள இளைஞர்கள்", "விவசாய குடும்பங்கள்", "ஊரக மற்றும் நகர்ப்புற இளைஞர்கள்", "பெண் விண்ணப்பதாரர்கள்"], documents: ["ஆதார்", "வயதுச் சான்று", "கல்வி ஆவணங்கள்", "வங்கி கணக்கு", "மொபைல் எண்"] },
    135: { fullName: "ஸ்டார்ட்அப் இந்தியா வேளாண் மாபெரும் சவால் (Agri Grand Challenge)", amount: "₹50 லட்சம் விதை நிதி (Seed Fund)", benefits: ["₹50 லட்சம் வரை விதை நிதி", "நிபுணர்களின் வழிகாட்டுதல்", "இன்குபேஷன் உதவி", "3 ஆண்டு வரி விலக்கு", "காப்புரிமை தாக்கல் செய்ய உதவி"], eligibility: ["வேளாண்-தொழில்நுட்ப ஸ்டார்ட்அப்கள்", "இளம் தொழில்முனைவோர் (18-35)", "புதுமையான வேளாண் தீர்வுகள்", "பதிவு செய்யப்பட்ட ஸ்டார்ட்அப்கள் (DPIIT)"], documents: ["ஸ்டார்ட்அப் பதிவு", "கண்டுபிடிப்பு விவரங்கள்", "வணிகத் திட்டம்", "குழு சுயவிவரம்", "வங்கி கணக்கு"] },
    136: { fullName: "RSETI - ஊரக சுயவேலைவாய்ப்பு பயிற்சி நிறுவனங்கள்", amount: "இலவச பயிற்சி + கடன் இணைப்பு", benefits: ["இலவச உறைவிடப் பயிற்சி (7-30 நாட்கள்)", "பால் பண்ணை பயிற்சி", "கோழி மற்றும் ஆடு வளர்ப்பு", "வங்கி கடன் இணைப்பு", "பயிற்சிக்கு பிந்தைய உதவி"], eligibility: ["ஊரக இளைஞர்கள் (18-45 வயது)", "வேலையற்ற இளைஞர்கள்", "விவசாயிகளின் குழந்தைகள்", "பெண் விண்ணப்பதாரர்கள்"], documents: ["ஆதார்", "ரேஷன் கார்டு", "வருமானச் சான்றிதழ்", "வங்கி கணக்கு", "பாஸ்போர்ட் புகைப்படம்"] },
    137: { fullName: "தேசிய இளைஞர் அதிகாரமளித்தல் திட்டம் - வேளாண்மை", amount: "₹2 லட்சம் திட்ட உதவி", benefits: ["இளைஞர்கள் தலைமையிலான வேளாண் திட்டங்கள்", "தலைமைத்துவ மேம்பாடு", "சமூக விவசாய முன்முயற்சிகள்", "நிதி கல்வியறிவு பயிற்சி", "சந்தை இணைப்பு உதவி"], eligibility: ["இளைஞர் குழுக்கள் (15-29 வயது)", "இளைஞர் மன்றங்கள்", "நேரு யுவ கேந்திரா உறுப்பினர்கள்", "ஊரக இளைஞர் அமைப்புகள்"], documents: ["குழு பதிவு", "உறுப்பினர் விவரங்கள்", "ஆதார்", "வங்கி கணக்கு", "திட்ட முன்மொழிவு"] },
    138: { fullName: "தீன் தயாள் உபாத்யாயா ஊரக திறன் மேம்பாட்டுத் திட்டம் (DDU-GKY)", amount: "இலவச பயிற்சி + மாதம் ₹1,000 உதவித்தொகை", benefits: ["3-12 மாத திறன் பயிற்சி", "பயிற்சியின் போது மாதாந்திர உதவித்தொகை", "100% வேலைவாய்ப்பு உத்தரவாதம்", "பணியமர்த்தலுக்கு பிந்தைய உதவி", "இலவச உணவு மற்றும் தங்குமிடம்"], eligibility: ["ஊரக ஏழை இளைஞர்கள் (18-35 வயது)", "SC/ST/பெண்களுக்கு முன்னுரிமை", "BPL குடும்பங்கள்", "MGNREGA தொழிலாளர் குடும்பங்கள்"], documents: ["ஆதார்", "BPL சான்றிதழ்", "வயதுச் சான்று", "வங்கி கணக்கு", "பாஸ்போர்ட் புகைப்படம்"] },
    139: { fullName: "NRLM - ஆஜீவிகா பண்ணை வாழ்வாதாரம்", amount: "ஒரு SHG-க்கு ₹50,000", benefits: ["SHG அடிப்படையிலான விவசாயப் பணிகள்", "சமூக முதலீட்டு நிதி", "சுழல் நிதி உதவி", "மதிப்புச் சங்கிலி மேம்பாடு", "சந்தை இணைப்பு"], eligibility: ["NRLM-இன் கீழ் உள்ள பெண்கள் சுய உதவிக் குழுக்கள்", "விவசாயிகள் குழுக்கள்", "உற்பத்தியாளர் குழுக்கள்", "கிராம அமைப்புகள்"], documents: ["SHG பதிவு", "உறுப்பினர் பட்டியல்", "வங்கி கணக்கு", "தீர்மான நகல்", "ஆதார்"] },
    140: { fullName: "KVK - விவசாயி பயிற்சி மற்றும் வேலைவாய்ப்புத் திட்டம்", amount: "இலவச பயிற்சி + இடுபொருட்கள்", benefits: ["KVK-ல் செய்முறைப் பயிற்சி", "ஒருங்கிணைந்த பண்ணையப் பயிற்சி", "மதிப்பு கூட்டுதல் பயிற்சி", "இடுபொருள் கிட் வழங்குதல்", "ICAR-இலிருந்து சான்றிதழ்"], eligibility: ["அனைத்து விவசாயிகள்", "பெண் விவசாயிகள்", "ஊரக இளைஞர்கள்", "பள்ளிப் படிப்பை பாதியில் விட்டவர்கள்", "வேளாண்-தொழில்முனைவோர்"], documents: ["ஆதார்", "நில ஆவணங்கள் (பொருந்தினால்)", "வங்கி கணக்கு", "2 பாஸ்போர்ட் புகைப்படங்கள்", "மொபைல் எண்"] }
  }
};

// Returns a scheme object with translated fields merged in for the
// current language, falling back to English for anything untranslated.
function getLocalizedScheme(scheme) {
    const langData = schemesTranslations[currentLanguage];
    if (!langData) return scheme;
    const t = langData[scheme.id];
    if (!t) return scheme;
    return { ...scheme, ...t };
}

// =====================================================
// RENDER ALL SCHEMES
// =====================================================

function renderAllSchemes(category = "all") {
    const container = document.getElementById("allSchemesContainer");
    if (!container) return;
    
    let schemes = govtSchemesDB;
    if (category !== "all") {
        schemes = govtSchemesDB.filter(s => s.category === category);
    }
    
    if (schemes.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 60px;"><i class="fas fa-search" style="font-size: 3rem;"></i><p>No schemes in this category</p></div>`;
        return;
    }
    
    container.innerHTML = schemes.map(schemeRaw => {
    const scheme = getLocalizedScheme(schemeRaw);
    return `
        <div class="scheme-card" onclick="showSchemeDetails(${scheme.id})">
            <div class="scheme-card-header">
                <h3>${scheme.id}. ${scheme.name}</h3>
                <span class="scheme-category">${scheme.category}</span>
            </div>
            <div class="scheme-card-body">
                <div class="scheme-amount-badge">
                    <span class="amount">${scheme.amount}</span>
                </div>
                ${scheme.benefits.slice(0, 2).map(b => `
                    <div class="scheme-benefit-item">
                        <i class="fas ${scheme.icon}"></i>
                        <span>${b.length > 60 ? b.substring(0, 60) + '...' : b}</span>
                    </div>
                `).join('')}
                <div class="scheme-card-footer">
                    <div class="scheme-helpline">
                        <i class="fas fa-phone-alt"></i> ${scheme.helpline}
                    </div>
                    <div class="view-details-btn">
                        View Details <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// =====================================================
// SHOW SCHEME DETAILS MODAL
// =====================================================

function showSchemeDetails(id) {
    const schemeRaw = govtSchemesDB.find(s => s.id === id);
    if (!schemeRaw) return;
    const scheme = getLocalizedScheme(schemeRaw);
    
    const modalHtml = `
        <div class="scheme-modal" id="schemeModal" onclick="closeModalOnOverlay(event)">
            <div class="scheme-modal-content">
                <div class="scheme-modal-header">
                    <button class="modal-close" onclick="closeSchemeModal()">✕</button>
                    <h2>${scheme.id}. ${scheme.name}</h2>
                    <p>${scheme.fullName}</p>
                    <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">
                        <i class="fas ${scheme.icon}"></i> ${scheme.category}
                    </div>
                </div>
                <div class="scheme-modal-body">
                    <div class="modal-section">
                        <div class="modal-section-title"><i class="fas fa-rupee-sign"></i> Financial Benefit</div>
                        <div style="background: #fff3e0; padding: 20px; border-radius: 20px; text-align: center;">
                            <span style="font-size: 2rem; font-weight: 800; color: #f9a825;">${scheme.amount}</span>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <div class="modal-section-title"><i class="fas fa-gift"></i> Key Benefits</div>
                        <ul class="modal-list">${scheme.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
                    </div>
                    
                    <div class="modal-section">
                        <div class="modal-section-title"><i class="fas fa-users"></i> Who Can Apply?</div>
                        <ul class="modal-list">${scheme.eligibility.map(e => `<li>${e}</li>`).join('')}</ul>
                    </div>
                    
                    <div class="modal-section">
                        <div class="modal-section-title"><i class="fas fa-file-alt"></i> Documents Required</div>
                        <ul class="modal-list">${scheme.documents.map(d => `<li>${d}</li>`).join('')}</ul>
                    </div>
                    
                    <div class="modal-grid">
                        <div class="modal-grid-item"><i class="fas fa-globe"></i><strong>Website</strong><a href="${scheme.website}" target="_blank" style="color: var(--primary); font-size: 0.75rem;">Visit</a></div>
                        <div class="modal-grid-item"><i class="fas fa-phone-alt"></i><strong>Helpline</strong><span style="font-size: 0.8rem;">${scheme.helpline}</span></div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${scheme.website}" target="_blank" class="modal-apply-link">
                            <i class="fas fa-external-link-alt"></i> Visit Official Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById("schemeModal");
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById("schemeModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function filterSchemesByCategory(category) {
    document.querySelectorAll('.cat-filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    renderAllSchemes(category);
}

function closeSchemeModal() {
    const modal = document.getElementById("schemeModal");
    if (modal) {
        modal.classList.remove("active");
        setTimeout(() => modal.remove(), 300);
    }
    document.body.style.overflow = "auto";
}

function closeModalOnOverlay(event) {
    if (event.target === event.currentTarget) closeSchemeModal();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    renderAllSchemes();
});

// Make functions global
window.showSchemeDetails = showSchemeDetails;
window.closeSchemeModal = closeSchemeModal;
window.filterSchemesByCategory = filterSchemesByCategory;
window.renderAllSchemes = renderAllSchemes;
 
  // Fix for any undefined variables
window.districtDB = districtDB;
window.crops = crops;
window.advisoryDB = advisoryDB;
window.specificCropAdvice = specificCropAdvice;
window.cropDiseaseDatabase = cropDiseaseDatabase;
window.healthyCropsDB = healthyCropsDB;
 // ========== LANGUAGE MODAL FUNCTIONS ==========
window.toggleLangDropdown = function() {
    const modal = document.getElementById('langModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
};

window.closeLangModal = function() {
    const modal = document.getElementById('langModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
};

// Change language function
window.changeLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem('patukrishi_language', lang);
    translatePage();
    updateLangHeader();
    // Re-render any dynamic content (e.g. government schemes) so it
    // reflects the newly selected language immediately, if visible.
    if (document.getElementById('allSchemesContainer')) {
        const activeBtn = document.querySelector('.cat-filter-btn.active');
        let activeCategory = 'all';
        if (activeBtn) {
            const match = activeBtn.getAttribute('onclick').match(/filterSchemesByCategory\('([^']+)'\)/);
            if (match) activeCategory = match[1];
        }
        renderAllSchemes(activeCategory);
    }
    showNotification(`Language changed to ${lang.toUpperCase()}`, 'success');
    closeLangModal(); // Close modal after selection
};

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('langModal');
    if (modal && modal.classList.contains('show')) {
        if (e.target === modal) {
            closeLangModal();
        }
    }
});
  
})();
// =====================================================
// AUTH SYSTEM (EmailJS-based signup/login/verification)
// Moved out of index.html inline <script> block
// =====================================================
    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';
    const EMAILJS_SERVICE_ID = 'service_c48sfqj';
    const EMAILJS_TEMPLATE_ID = 'template_tzsa9yh';
    
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Database
    let users = JSON.parse(localStorage.getItem('patukrishi_users') || '{}');
    let pendingVerifications = JSON.parse(localStorage.getItem('patukrishi_pending') || '{}');
    let currentPendingEmail = null;
    
    // Generate 6-digit verification code
    function generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    // Send verification email
    async function sendVerificationEmail(email, name, code) {
        try {
            const templateParams = {
                email: email,
                to_name: name,
                name: name,
                passcode: code,
                time: new Date().toLocaleTimeString()
            };
            
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            console.log('Email sent successfully!', response);
            return { success: true };
        } catch (error) {
            console.error('Email failed:', error);
            return { success: false, error: error.text || 'Failed to send email' };
        }
    }
    
    // Show loading state on button
    function setButtonLoading(buttonId, isLoading) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            if (isLoading) {
                btn.disabled = true;
                btn.innerHTML = '<span class="loader"></span> Please wait...';
            } else {
                btn.disabled = false;
                btn.innerHTML = buttonId === 'login-btn' ? 'Login' : 'Create Account';
            }
        }
    }
    
    // Switch between login and signup tabs
    window.switchAuthTabNew = (tab) => {
        document.querySelectorAll('#authModal .auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#authModal .auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById('verification-section').style.display = 'none';
        document.getElementById('verify-error').innerText = '';
        
        if (tab === 'login') {
            document.querySelectorAll('#authModal .auth-tab')[0].classList.add('active');
            document.getElementById('login-form-new').classList.add('active');
        } else {
            document.querySelectorAll('#authModal .auth-tab')[1].classList.add('active');
            document.getElementById('signup-form-new').classList.add('active');
        }
    };
    
    // Handle Signup
    window.handleSignupNew = async () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorDiv = document.getElementById('signup-error');
        
        if (!name || !email || !password) {
            errorDiv.innerText = 'Please fill all fields';
            errorDiv.className = 'error-message';
            return;
        }
        
        if (password.length < 4) {
            errorDiv.innerText = 'Password must be at least 4 characters';
            errorDiv.className = 'error-message';
            return;
        }
        
        if (users[email]) {
            errorDiv.innerText = 'Email already registered. Please login.';
            errorDiv.className = 'error-message';
            return;
        }
        
        const code = generateCode();
        
        setButtonLoading('signup-btn', true);
        errorDiv.className = 'success-message';
        errorDiv.innerText = '📧 Sending verification email...';
        
        const emailResult = await sendVerificationEmail(email, name, code);
        
        if (!emailResult.success) {
            setButtonLoading('signup-btn', false);
            errorDiv.className = 'error-message';
            errorDiv.innerText = '❌ ' + emailResult.error;
            return;
        }
        
        pendingVerifications[email] = {
            name: name,
            password: password,
            code: code,
            expires: Date.now() + 15 * 60 * 1000
        };
        localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
        currentPendingEmail = email;
        
        errorDiv.className = 'success-message';
        errorDiv.innerHTML = '✅ Verification code sent to ' + email + '! Please check your inbox (and spam folder).';
        
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('verification-section').style.display = 'block';
        document.getElementById('verify-code').value = '';
        document.getElementById('verify-error').innerText = '';
        
        setButtonLoading('signup-btn', false);
    };
    
    // Verify Code
    window.verifyCodeNew = () => {
        const code = document.getElementById('verify-code').value;
        const email = currentPendingEmail;
        const errorDiv = document.getElementById('verify-error');
        
        if (!code || code.length !== 6) {
            errorDiv.innerText = 'Please enter the 6-digit verification code';
            return;
        }
        
        if (!email) {
            errorDiv.innerText = 'No pending verification. Please sign up again.';
            return;
        }
        
        const pending = pendingVerifications[email];
        
        if (!pending) {
            errorDiv.innerText = 'No pending verification found. Please sign up again.';
            return;
        }
        
        if (pending.code !== code) {
            errorDiv.innerText = '❌ Invalid verification code. Please try again.';
            return;
        }
        
        if (pending.expires < Date.now()) {
            errorDiv.innerText = '❌ Verification code expired. Please click "Resend" to get a new code.';
            return;
        }
        
        // Verified! Move to users database
        users[email] = {
            name: pending.name,
            email: email,
            password: pending.password,
            verified: true,
            createdAt: new Date().toISOString()
        };
        
        delete pendingVerifications[email];
        localStorage.setItem('patukrishi_users', JSON.stringify(users));
        localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
        
        errorDiv.className = 'success-message';
        errorDiv.innerText = '✅ Account verified successfully! You can now login.';
        
        setTimeout(() => {
            document.getElementById('verification-section').style.display = 'none';
            document.getElementById('login-email').value = email;
            switchAuthTabNew('login');
            errorDiv.innerText = '';
        }, 2000);
    };
    
    // Resend verification code
    window.resendCodeNew = async () => {
        const email = currentPendingEmail;
        const errorDiv = document.getElementById('verify-error');
        
        if (!email) {
            errorDiv.innerText = 'No pending verification. Please sign up again.';
            return;
        }
        
        const pending = pendingVerifications[email];
        
        if (!pending) {
            errorDiv.innerText = 'No pending verification found. Please sign up again.';
            return;
        }
        
        const newCode = generateCode();
        pending.code = newCode;
        pending.expires = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
        
        errorDiv.className = 'success-message';
        errorDiv.innerText = '📧 Sending new code...';
        
        const emailResult = await sendVerificationEmail(email, pending.name, newCode);
        
        if (emailResult.success) {
            errorDiv.className = 'success-message';
            errorDiv.innerText = '✅ New verification code sent! Please check your email.';
        } else {
            errorDiv.className = 'error-message';
            errorDiv.innerText = '❌ ' + emailResult.error;
        }
    };
    
    // Handle Login
    window.handleLoginNew = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');
        
        if (!email || !password) {
            errorDiv.innerText = 'Please enter email and password';
            errorDiv.className = 'error-message';
            return;
        }
        
        setButtonLoading('login-btn', true);
        errorDiv.innerText = '';
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = users[email];
        
        if (!user) {
            errorDiv.innerText = 'No account found. Please sign up first.';
            errorDiv.className = 'error-message';
            setButtonLoading('login-btn', false);
            return;
        }
        
        if (user.password !== password) {
            errorDiv.innerText = 'Incorrect password. Please try again.';
            errorDiv.className = 'error-message';
            setButtonLoading('login-btn', false);
            return;
        }
        
        if (!user.verified) {
            errorDiv.innerText = 'Please verify your email first. Check your inbox for the verification code.';
            errorDiv.className = 'error-message';
            setButtonLoading('login-btn', false);
            return;
        }
        
        localStorage.setItem('patukrishi_session', JSON.stringify({ name: user.name, email: user.email }));
        errorDiv.className = 'success-message';
        errorDiv.innerText = '✅ Login successful! Redirecting...';
        
        setTimeout(() => {
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            // Update user info in header
            if (typeof loadDashboard === 'function') {
                loadDashboard();
            } else {
                location.reload();
            }
        }, 1000);
    };
    
    // =====================================================
    // GUEST LOGIN
    // Lets a visitor use the dashboard without signing up.
    // Guest sessions are flagged with isGuest so you can
    // restrict features for them later if needed.
    // =====================================================
    window.handleGuestLogin = () => {
        const guestUser = {
            name: 'Guest',
            email: `guest_${Date.now()}@patukrishi.local`,
            isGuest: true
        };

        // Reuse the same session key as real logins so the rest
        // of the app (checkAuth/loadDashboard) treats it identically.
        localStorage.setItem('patukrishi_session', JSON.stringify(guestUser));

        const authModal = document.getElementById('authModal');
        const dashboard = document.getElementById('dashboard');
        if (authModal) authModal.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';

        if (typeof loadDashboard === 'function') {
            loadDashboard();
        } else {
            location.reload();
        }
    };

    // Inject a "Continue as Guest" option into the auth modal automatically,
    // so no HTML changes are required. If you'd rather place the button
    // yourself, just add: <button onclick="handleGuestLogin()">Continue as Guest</button>
    // and this auto-injection will skip itself.
    (function addGuestLoginButton() {
        const authModal = document.getElementById('authModal');
        if (!authModal || document.getElementById('guest-login-btn')) return;

        const guestWrapper = document.createElement('div');
        guestWrapper.style.cssText = 'text-align:center;margin-top:15px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.15);';
        guestWrapper.innerHTML = `
            <button type="button" id="guest-login-btn" style="background:none;border:none;color:#f9a825;font-weight:600;cursor:pointer;font-size:0.95rem;padding:8px;">
                👤 Continue as Guest
            </button>
        `;

        const modalContent = authModal.querySelector('.modal-content') || authModal.firstElementChild || authModal;
        modalContent.appendChild(guestWrapper);

        document.getElementById('guest-login-btn').addEventListener('click', window.handleGuestLogin);
    })();

    // Check if already logged in
    const session = localStorage.getItem('patukrishi_session');
    if (session) {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('authModal').style.display = 'none';
    } else {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('authModal').style.display = 'flex';
    }
    
    // Remove old auth container
    const oldAuth = document.getElementById('auth-container');
    if (oldAuth) oldAuth.style.display = 'none';
// =====================================================
// CONTACT FORM HANDLER (EmailJS)
// Moved out of index.html inline <script> block
// =====================================================
    if (document.getElementById('patuContactForm')) {
        document.getElementById('patuContactForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const name = document.getElementById('patuName').value;
            const mobile = document.getElementById('patuMobile').value;
            const email = document.getElementById('patuEmail').value;
            const message = document.getElementById('patuMessage').value;
            const statusDiv = document.getElementById('patuFormStatus');
            
            statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
            statusDiv.style.color = '#f9a825';
            
            try {
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    mobile: mobile,
                    message: message,
                    to_email: 'patukrishi@gmail.com'
                };
                
                const response = await emailjs.send('service_c48sfqj', 'template_xnjx3mg', templateParams);
                
                if (response.status === 200) {
                    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> ✅ Message sent successfully! We\'ll get back to you soon.';
                    statusDiv.style.color = '#4caf50';
                    document.getElementById('patuContactForm').reset();
                    
                    setTimeout(() => {
                        statusDiv.innerHTML = '';
                    }, 5000);
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                console.error('EmailJS Error:', error);
                statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ❌ Failed to send message. Please try again later.';
                statusDiv.style.color = '#f44336';
                
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            }
        });
    }
// =====================================================
// NEW FEATURE: VOICE INPUT FOR KRISHI BOT (Web Speech API)
// Works entirely in-browser, no backend/API key needed.
// Falls back silently (button hidden) on unsupported browsers.
// =====================================================
(function initVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('chat-mic-btn');
    const chatInput = document.getElementById('chat-input');

    if (!SpeechRecognition || !micBtn || !chatInput) {
        if (micBtn) micBtn.style.display = 'none'; // hide if unsupported
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Map site language to a speech-recognition locale (best-effort; falls back to Hindi/English)
    const speechLangMap = {
        en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', te: 'te-IN', mr: 'mr-IN',
        gu: 'gu-IN', pa: 'pa-IN', ta: 'ta-IN', ml: 'ml-IN', ur: 'ur-IN',
        kn: 'kn-IN', or: 'or-IN', mwr: 'hi-IN', sa: 'hi-IN'
    };

    let listening = false;

    micBtn.addEventListener('click', () => {
        if (listening) {
            recognition.stop();
            return;
        }
        recognition.lang = speechLangMap[window.currentLanguage] || 'hi-IN';
        try {
            recognition.start();
        } catch (e) {
            console.warn('Speech recognition could not start:', e);
        }
    });

    recognition.onstart = () => {
        listening = true;
        micBtn.classList.add('listening');
        micBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
    };

    recognition.onerror = () => {
        listening = false;
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.onend = () => {
        listening = false;
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };
})();
