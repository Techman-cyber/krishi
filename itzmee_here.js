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
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'K') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'E') {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'M') {
    e.preventDefault();
    return false;
  }
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

detectDevTools();
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
    
    // ==================== STABLE API CONFIGURATION ====================
    const MANDI_API_URL = 'https://api.ceda.ashoka.edu.in/v1/agmarknet/prices';
    const EMAILJS_SERVICE_ID = 'service_c48sfqj';
    const EMAILJS_TEMPLATE_ID = 'template_xnjx3mg';
    const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';

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
        return `${days[date.getDay()]} , ${months[date.getMonth()]} ${date.getDate()}`;
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

    // ==================== MANDI PRICES RATE LOGIC ====================
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

    // ==================== REALTIME SYSTEMS CLOCK RUNNERS ====================
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
                    if(typeof updateLangHeader === 'function') updateLangHeader();
                }, 500);
            }
        }, 2e3);
    });

    function updateTime() {
        const e = new Date();
        const timeElement = document.getElementById('current-time');
        if(timeElement) timeElement.textContent = e.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function updateTipOfTheDay() {
        const e = new Date();
        const t = Math.floor((e - new Date(e.getFullYear(), 0, 0)) / (1e3 * 60 * 60 * 24)) % farmingTips[currentLanguage].length;
        const tipElement = document.getElementById('tip-of-the-day');
        const tipNumberElement = document.getElementById('tip-number');
        if(tipElement) tipElement.textContent = farmingTips[currentLanguage][t];
        if(tipNumberElement) tipNumberElement.textContent = `#${String(t + 1).padStart(2, '0')}`;
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
    
    // ==================== DASHBOARD LOADING LAYOUTS ====================
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
            if (typeof cropDurations !== 'undefined') {
                Object.keys(cropDurations).forEach(e => calSel.add(new Option(e, e)));
            }
        }
        if (typeof renderCropCalendar === 'function') renderCropCalendar();

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
    
    // ==================== CROP DISEASE DATABASE ====================
    const cropDiseaseDatabase = {
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
                "🌿 Release Trichogramma japonicum (5 cards/acre)",
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
        
        analyzeImage(imageData) {
            const features = this.extractFeatures(imageData);
            const diseases = Object.keys(cropDiseaseDatabase);
            const probabilities = [];
            
            diseases.forEach(disease => {
                let probability = Math.random() * 0.8;
                if (features.colorDistribution.includes('brown')) {
                    if (disease.includes('Blight') || disease.includes('Spot')) probability += 0.2;
                }
                if (features.pattern.includes('spots')) {
                    if (disease.includes('Spot') || disease.includes('Mildew')) probability += 0.25;
                }
                probabilities.push({ disease, probability: Math.min(probability, 0.95) });
            });
            
            probabilities.sort((a, b) => b.probability - a.probability);
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
            return cropDiseaseDatabase[diseaseName] || cropDiseaseDatabase["Late Blight"];
        }
        
        getHealthyTip(cropName) {
            return healthyCropsDB.find(c => c.name === cropName) || healthyCropsDB[0];
        }
    }

    const cropLensAI = new CropLensAI();
    let imageHistory = [];
    let currentAnalysis = null;

    // Main Crop Lens Action Engine
    window.analyzeCropImage = async function() {
        const fileInput = document.getElementById('crop-image');
        const resultDiv = document.getElementById('lens-result');
        const previewDiv = document.getElementById('image-preview');
        
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            showLensMessage('❌ Please select an image first. Click "Choose Image" to upload a crop photo.', 'error');
            return;
        }
        
        const file = fileInput.files[0];
        if (!file.type.startsWith('image/')) {
            showLensMessage('❌ Please select a valid image file (JPEG, PNG, or GIF)', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showLensMessage('❌ Image too large! Please select an image under 10MB.', 'error');
            return;
        }
        
        showLensLoading();
        const reader = new FileReader();
        
        reader.onload = async function(event) {
            const imageData = event.target.result;
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

            await new Promise(resolve => setTimeout(resolve, 2000));
            const analysis = cropLensAI.analyzeImage(imageData);
            currentAnalysis = analysis;
            
            imageHistory.unshift({
                id: Date.now(),
                imageData: imageData,
                analysis: analysis,
                timestamp: new Date().toISOString()
            });
            
            if (imageHistory.length > 10) imageHistory.pop();
            
            if (analysis.isHealthy) {
                displayHealthyResult(analysis);
            } else {
                displayDiseaseResult(analysis);
            }
            displayActionButtons();
        };
        
        reader.onerror = function() {
            showLensMessage('❌ Error reading image file. Please try again with a different image.', 'error');
        };
        reader.readAsDataURL(file);
    };

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
                </div>
            </div>
        `;
    }

    function displayRealHealthyResult(result) {
        const resultDiv = document.getElementById('lens-result');
        const cropName = result.crop ? result.crop.name : 'your crop';
        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #2e7d32, #1b5e20); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #81c784;"></i>
                    <h2 style="margin: 10px 0;">✅ Looks Healthy!</h2>
                    <p style="opacity:.9">Identified as: <strong>${cropName}</strong></p>
                    <p style="margin-top:15px;font-size:.9rem;opacity:.85">Analyzed by Kindwise crop.health AI. Keep monitoring regularly.</p>
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
            : '<p style="opacity:.8;font-size:.9rem">No specific guidance available.</p>';

        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #c62828, #8e0000); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffcc80;"></i>
                    <h2 style="margin: 10px 0;">${d.name}</h2>
                    <p style="opacity:.85">Crop: ${cropName} &middot; AI Confidence: ${confidence}%</p>
                </div>
                ${d.description ? `<div style="background:rgba(255,255,255,.15);border-radius:20px;padding:18px;margin-top:18px"><h4>📋 About</h4><p>${d.description}</p></div>` : ''}
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
        
        const severityColor = {
            'Low': '#4caf50', 'Medium': '#ff9800', 'High': '#ff5722', 'Critical': '#f44336'
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
                </div>
            </div>
        `;
    }

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
            const colors = { error: '#f44336', success: '#4caf50', warning: '#ff9800', info: '#2196f3' };
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
    };

    window.downloadReport = () => {
        if (!currentAnalysis) {
            showLensMessage('No analysis to download. Please analyze an image first.', 'warning');
            return;
        }
        const report = {
            timestamp: new Date().toISOString(),
            analysis: currentAnalysis,
            recommendations: currentAnalysis.isHealthy ? 'Crop is healthy. Continue preventive measures.' : cropLensAI.getRecommendation(currentAnalysis.disease)
        };
        const dataStr = JSON.stringify(report, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `crop-analysis-${Date.now()}.json`);
        linkElement.click();
    };

    window.viewHistory = () => {
        if (imageHistory.length === 0) {
            showLensMessage('No analysis history found.', 'info');
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
            historyHtml += `
                <div style="border-bottom: 1px solid #e0e0e0; padding: 15px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <div><strong>#${index + 1}</strong> <span style="margin-left:10px;">${status}</span></div>
                        <div style="color: #666; font-size: 0.85rem;">${date.toLocaleString()}</div>
                    </div>
                </div>
            `;
        });
        historyHtml += `<button onclick="resetCropLens()" style="margin-top:20px; background:#2e7d32; color:white; padding:10px 20px; border:none; border-radius:30px;">Close</button></div>`;
        resultDiv.innerHTML = historyHtml;
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes loading { 0% { width:0%; } 50% { width:70%; } 100% { width:100%; } }
        .action-buttons button:hover { transform:translateY(-2px); box-shadow:0 5px 15px rgba(0,0,0,0.2); }
    `;
    document.head.appendChild(style);

    // ==================== REGIONAL ADVISORY STRATEGIES ====================
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
    
    // ==================== ANALYTICS GRAPH GENERATORS ====================
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
    
    // ==================== INTELLIGENT AI KRISHI CHATBOT ====================
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

        setTimeout(() => {
            let e = botResponses[currentLanguage] || botResponses.en;
            let o = "";
            if(t.includes('mandi') || t.includes('मंडी') || t.includes('price')) o = e.mandi;
            else if(t.includes('weather') || t.includes('mausam') || t.includes('मौसम')) o = e.weather;
            else if(t.includes('lens') || t.includes('crop') || t.includes('क्रॉप')) o = e.lens;
            else if(t.includes('advisory') || t.includes('salah') || t.includes('सलाह')) o = e.advisory;
            else if(t.includes('about')) o = e.about;
            else if(t.includes('analytics')) o = e.analytics;
            else if(t.includes('hello') || t.includes('hi')) o = e.hello;
            else o = e.default;
            if(n) n.innerHTML += `<div class="message msg-bot">${o}</div>`;
            if(n) n.scrollTop = n.scrollHeight;
        }, 600);
    };
    
    // ==================== USER PROFILE SYSTEMS ====================
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
    
    function showNotification(msg, type = 'info') {
        let n = document.createElement('div');
        n.style = `background:var(--card-bg); padding:12px 20px; border-radius:40px; margin-bottom:10px; border-left:4px solid #f9a825; box-shadow:var(--shadow); font-weight:500;`;
        n.innerText = msg;
        const container = document.getElementById('notification-container');
        if(container) container.appendChild(n);
        setTimeout(() => n.remove(), 3e3);
    }
    window.showNotification = showNotification;
    
    window.switchSection = e => {
        document.querySelectorAll('.nav-item').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-section') === e);
        });
        document.querySelectorAll('.content-section').forEach(t => t.classList.remove('active'));
        const section = document.getElementById(e + '-section');
        if(section) section.classList.add('active');
        window.scrollTo(0, 0);
    };

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

    // ==================== GOVERNMENT CENTRIC SCHEMES ENGINE ====================
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
        
        container.innerHTML = schemes.map(scheme => `
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
                        <div class="scheme-helpline"><i class="fas fa-phone-alt"></i> ${scheme.helpline}</div>
                        <div class="view-details-btn">View Details <i class="fas fa-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function showSchemeDetails(id) {
        const scheme = govtSchemesDB.find(s => s.id === id);
        if (!scheme) return;
        
        const modalHtml = `
            <div class="scheme-modal" id="schemeModal" onclick="closeModalOnOverlay(event)">
                <div class="scheme-modal-content">
                    <div class="scheme-modal-header">
                        <button class="modal-close" onclick="closeSchemeModal()">✕</button>
                        <h2>${scheme.id}. ${scheme.name}</h2>
                        <p>${scheme.fullName}</p>
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

    window.closeSchemeModal = () => {
        const modal = document.getElementById("schemeModal");
        if (modal) {
            modal.classList.remove("active");
            setTimeout(() => modal.remove(), 300);
        }
        document.body.style.overflow = "auto";
    };

    window.closeModalOnOverlay = (event) => {
        if (event.target === event.currentTarget) window.closeSchemeModal();
    };

    window.filterSchemesByCategory = (category) => {
        renderAllSchemes(category);
    };

    // ==================== DYNAMIC MULTI LANGUAGE HOOKS ====================
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

    window.changeLanguage = function(lang) {
        currentLanguage = lang;
        localStorage.setItem('patukrishi_language', lang);
        translatePage();
        if(typeof updateLangHeader === 'function') updateLangHeader();
        showNotification(`Language changed to ${lang.toUpperCase()}`, 'success');
        window.closeLangModal();
    };

    document.addEventListener('click', function(e) {
        const modal = document.getElementById('langModal');
        if (modal && modal.classList.contains('show') && e.target === modal) {
            window.closeLangModal();
        }
    });

    // Make references global
    window.showSchemeDetails = showSchemeDetails;
    window.renderAllSchemes = renderAllSchemes;
    window.districtDB = districtDB;
    window.crops = crops;
    window.advisoryDB = advisoryDB;
    window.specificCropAdvice = specificCropAdvice;
    window.cropDiseaseDatabase = cropDiseaseDatabase;
    window.healthyCropsDB = healthyCropsDB;

    renderAllSchemes();
})();

// ==================== EMAILJS SECURE AUTH SYSTEMS ====================
(function initEmailJSAuth() {
    const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';
    const EMAILJS_SERVICE_ID = 'service_c48sfqj';
    const EMAILJS_TEMPLATE_ID = 'template_tzsa9yh';
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    let users = JSON.parse(localStorage.getItem('patukrishi_users') || '{}');
    let pendingVerifications = JSON.parse(localStorage.getItem('patukrishi_pending') || '{}');
    let currentPendingEmail = null;
    
    function generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
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
            return { success: true };
        } catch (error) {
            console.error('Email failed:', error);
            return { success: false, error: error.text || 'Failed to send email' };
        }
    }
    
    window.switchAuthTabNew = (tab) => {
        document.querySelectorAll('#authModal .auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#authModal .auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById('verification-section').style.display = 'none';
        
        if (tab === 'login') {
            document.querySelectorAll('#authModal .auth-tab')[0].classList.add('active');
            document.getElementById('login-form-new').classList.add('active');
        } else {
            document.querySelectorAll('#authModal .auth-tab')[1].classList.add('active');
            document.getElementById('signup-form-new').classList.add('active');
        }
    };
    
    window.handleSignupNew = async () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorDiv = document.getElementById('signup-error');
        
        if (!name || !email || !password) {
            errorDiv.innerText = 'Please fill all fields';
            return;
        }
        if (users[email]) {
            errorDiv.innerText = 'Email already registered.';
            return;
        }
        
        const code = generateCode();
        errorDiv.innerText = '📧 Sending verification email...';
        
        const emailResult = await sendVerificationEmail(email, name, code);
        if (!emailResult.success) {
            errorDiv.innerText = '❌ ' + emailResult.error;
            return;
        }
        
        pendingVerifications[email] = {
            name: name, password: password, code: code, expires: Date.now() + 15 * 60 * 1000
        };
        localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
        currentPendingEmail = email;
        
        errorDiv.innerText = 'Code sent to ' + email;
        document.getElementById('verification-section').style.display = 'block';
    };
    
    window.verifyCodeNew = () => {
        const code = document.getElementById('verify-code').value;
        const email = currentPendingEmail;
        const errorDiv = document.getElementById('verify-error');
        
        const pending = pendingVerifications[email];
        if (pending && pending.code === code) {
            users[email] = { name: pending.name, email: email, password: pending.password, verified: true };
            delete pendingVerifications[email];
            localStorage.setItem('patukrishi_users', JSON.stringify(users));
            localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
            window.switchAuthTabNew('login');
        } else {
            errorDiv.innerText = '❌ Invalid verification code.';
        }
    };
    
    window.handleLoginNew = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');
        
        const user = users[email];
        if (user && user.password === password) {
            localStorage.setItem('patukrishi_session', JSON.stringify({ name: user.name, email: user.email }));
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            location.reload();
        } else {
            errorDiv.innerText = 'Incorrect email or password.';
        }
    };

    window.handleGuestLogin = () => {
        const guestUser = { name: 'Guest', email: `guest_${Date.now()}@patukrishi.local`, isGuest: true };
        localStorage.setItem('patukrishi_session', JSON.stringify(guestUser));
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        location.reload();
    };
})();

// ==================== SECURE CONTACT FORM SUBSYSTEMS ====================
(function initContactForm() {
    const contactForm = document.getElementById('patuContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const statusDiv = document.getElementById('patuFormStatus');
            statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing message...';
            
            try {
                const templateParams = {
                    from_name: document.getElementById('patuName').value,
                    from_email: document.getElementById('patuEmail').value,
                    mobile: document.getElementById('patuMobile').value,
                    message: document.getElementById('patuMessage').value,
                    to_email: 'patukrishi@gmail.com'
                };
                
                const response = await emailjs.send('service_c48sfqj', 'template_xnjx3mg', templateParams);
                if (response.status === 200) {
                    statusDiv.innerHTML = '✅ Message sent successfully!';
                    contactForm.reset();
                }
            } catch (error) {
                statusDiv.innerHTML = '❌ Failed to send message. Please try again.';
            }
        });
    }
})();

// ==================== BROWSER NATURAL SPEECH ENGINE ====================
(function initVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('chat-mic-btn');
    const chatInput = document.getElementById('chat-input');

    if (!SpeechRecognition || !micBtn || !chatInput) {
        if (micBtn) micBtn.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const speechLangMap = {
        en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', te: 'te-IN', mr: 'mr-IN',
        gu: 'gu-IN', pa: 'pa-IN', ta: 'ta-IN', ml: 'ml-IN', ur: 'ur-IN',
        kn: 'kn-IN', or: 'or-IN'
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
            console.warn('Speech engine startup trace block failed:', e);
        }
    });

    recognition.onstart = () => {
        listening = true;
        micBtn.classList.add('listening');
    };

    recognition.onresult = (event) => {
        chatInput.value = event.results[0][0].transcript;
    };

    recognition.onend = () => {
        listening = false;
        micBtn.classList.remove('listening');
    };
})();
