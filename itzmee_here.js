// ============================================================================
// PATUKRISHI APP SCRIPT
// ----------------------------------------------------------------------------
// Fix applied in this pass: updateTipOfTheDay() referenced an undefined
// variable `farmingTips[currentLanguage]`. The array actually defined in this
// file is `gardeningTips` (a flat array, not keyed by language). That
// ReferenceError was thrown uncaught inside the window 'load' handler, which
// silently killed everything queued after it in that callback (including
// translatePage()). Fixed updateTipOfTheDay() to read from `gardeningTips`
// directly. No other logic in this file was changed.
// ============================================================================
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

(function () {
    // ==================== SWIPER INITIALIZATION ====================
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
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

   
    const EMAILJS_SERVICE_ID = 'service_c48sfqj';
    const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';
    const EMAILJS_TEMPLATE_ID_WEATHER_CONTACT = 'template_xnjx3mg'; // used by contact form
    const EMAILJS_TEMPLATE_ID_VERIFY = 'template_tzsa9yh';          // used by signup verification

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // ==================== TIP OF THE DAY DATA ====================
    const gardeningTips = [
        "Always test your soil before sowing for better yield.",
        "Add organic matter like compost annually to improve soil structure.",
        "Turn your compost pile weekly to speed up the decomposition process.",
        "Avoid stepping on garden beds to prevent soil compaction.",
        "Use organic mulch to retain soil moisture and suppress weed growth.",
        "Encourage earthworms in your garden; they naturally aerate the soil.",
        "Leave autumn leaves on empty garden beds as a natural winter protectant.",
        "Test soil drainage by digging a hole, filling it with water, and timing it.",
        "Mix used coffee grounds into your soil in moderation to add nitrogen.",
        "Crush clean eggshells and bury them near plants for a calcium boost.",
        "Grow cover crops like clover or vetch in the off-season to fix nitrogen.",
        "Avoid over-tilling, as it can disrupt beneficial soil microbiomes.",
        "Keep your compost pile as damp as a wrung-out sponge for optimal breakdown.",
        "Use well-rotted manure instead of fresh to avoid burning plant roots.",
        "Maintain a balanced mix of 'green' (nitrogen) and 'brown' (carbon) compost materials.",
        "Add wood ash sparingly to raise soil pH if your ground is too acidic.",
        "Press a finger an inch into the soil to check moisture before adding water.",
        "Build Hugelkultur beds (buried logs) to establish long-term soil fertility.",
        "Use liquid seaweed spray for quick, direct micronutrient absorption.",
        "Keep bare soil covered at all times to prevent erosion from wind and rain.",
        "Water deeply and less frequently to encourage deep root systems.",
        "Water your garden early in the morning to minimize evaporation and fungal growth.",
        "Aim your watering can at the base of the plant rather than wetting the foliage.",
        "Install drip irrigation to deliver water efficiently right where it is needed.",
        "Set up a rain barrel to collect natural, chlorine-free water for your crops.",
        "Group plants with similar water needs together to optimize irrigation.",
        "Adjust your watering routines dynamically based on seasonal changes.",
        "Monitor container plants closely; they dry out much faster than garden beds.",
        "Use self-watering pots for thirsty crops like tomatoes and cucumbers.",
        "Always check the local weather forecast before running automatic sprinklers.",
        "Apply thick mulch in summer to cut soil water evaporation by up to 70%.",
        "Avoid watering during the peak heat of the day to prevent water waste.",
        "Try using buried clay pots (ollas) for highly efficient, low-tech irrigation.",
        "Double-check that all pots have adequate drainage holes to prevent root rot.",
        "Water fragile seedlings using a gentle mist setting or a fine-rose watering can.",
        "Check your soil after a heavy storm to ensure nutrients haven't washed away.",
        "Gradually reduce watering in late autumn as perennial plants go dormant.",
        "Divert safe household greywater only to non-edible landscape plants.",
        "Regularly inspect your hoses and outdoor spigots for hidden leaks.",
        "Let the top inch of houseplant soil dry completely before watering again.",
        "Plant seeds at a depth roughly equal to two or three times their width.",
        "Start warm-season seeds indoors to give them a head start before spring.",
        "Harden off indoor seedlings by exposing them to the outdoors gradually.",
        "Plant marigolds next to tomatoes to naturally deter harmful nematodes.",
        "Thin out dense seedlings early so the remaining plants have room to grow.",
        "Always plan your planting schedule around local average frost dates.",
        "Label your garden rows and nursery pots immediately after sowing.",
        "Soak large, tough seeds like beans or peas overnight to speed up germination.",
        "Choose native plant varieties to support local wildlife and reduce upkeep.",
        "Rotate your vegetable families every year to prevent specific soil depletion.",
        "Space your plants according to their mature size to ensure good airflow.",
        "Interplant bright flowers with crops to attract essential pollinators.",
        "Use biodegradable peat or paper pots to minimize transplant shock.",
        "Practice succession planting every two weeks for a continuous harvest.",
        "Test old seed viability by wrapping a few in a damp paper towel for a week.",
        "Grow vining crops vertically on trellises to save valuable ground space.",
        "Keep newly sown seedbeds consistently moist until sprouts appear.",
        "Prioritize disease-resistant plant varieties when shopping at the nursery.",
        "Sketch out your garden layout on paper before buying any plants.",
        "Gently loosen bound roots before placing a nursery plant into the ground.",
        "Prune away dead, damaged, or diseased branches as soon as you spot them.",
        "Deadhead spent flowers regularly to encourage a second flush of blooms.",
        "Stake tall plants like dahlias or tomatoes early before they begin to lean.",
        "Pull weeds while they are young and before they have a chance to set seed.",
        "Pinch back the growing tips of herbs like basil to encourage bushier growth.",
        "Sanitize your gardening tools with rubbing alcohol to prevent spreading disease.",
        "Keep your pruners sharp; clean cuts heal much faster than ragged tears.",
        "Use shade cloths to protect sensitive cool-season crops during sudden heatwaves.",
        "Aerate your lawn in the autumn to let oxygen and nutrients reach the roots.",
        "Harvest ripe fruits and vegetables promptly to stimulate more production.",
        "Set your lawnmower blade higher in summer to help shade the grass roots.",
        "Opt for slow-release organic fertilizers over harsh chemical alternatives.",
        "Stop fertilizing perennials in late summer to let them prepare for winter.",
        "Prop up heavily laden fruit tree branches to keep them from snapping.",
        "Gently brush indoor seedlings with your hand daily to strengthen their stems.",
        "Rotate your indoor houseplants a quarter turn weekly for balanced growth.",
        "Wipe dust off large houseplant leaves to improve their sun absorption.",
        "Top-dress the base of perennial beds with fresh compost every spring.",
        "Prune spring-blooming shrubs right after they finish flowering.",
        "Wrap young tree trunks with guards to protect them from winter rodents.",
        "Inspect the undersides of leaves weekly for hidden pests or insect eggs.",
        "Attract beneficial insects like ladybugs to naturally manage aphid outbreaks.",
        "Handpick larger pests like hornworms or beetles and drop them in soapy water.",
        "Use mild insecticidal soaps or neem oil for gentle, organic pest control.",
        "Space plants generously to maximize airflow and prevent powdery mildew.",
        "Throw diseased plant debris in the trash—never add it to your compost bin.",
        "Use lightweight floating row covers to shield vulnerable crops from pests.",
        "Apply organic copper fungicide early if you expect tomato or potato blight.",
        "Set out shallow dishes of beer to trap troublesome slugs and snails overnight.",
        "Install bird baths to welcome insect-eating birds into your garden space.",
        "Avoid overhead sprinkling to prevent wet leaves from spreading fungal spores.",
        "Plant pungent herbs like chives or mint to confuse and deter hungry pests.",
        "Keep new plants isolated for a week before adding them to your collection.",
        "Hang yellow sticky traps to catch and monitor flying pests like gnats.",
        "Use beneficial nematodes in the soil to target destructive lawn grubs.",
        "Clean up fallen fruit and leaves to eliminate pest overwintering spots.",
        "Correctly identify an insect before treating it to avoid harming pollinators.",
        "Grow a few sacrificial 'trap crops' to draw bugs away from your main harvest.",
        "Protect ripening berries from hungry birds using lightweight fruit netting.",
        "Remember that a few bugs are normal; a healthy ecosystem balances itself!"
    ];

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

   // ==================== REAL MANDI API FUNCTION (via serverless proxy) ====================
    async function fetchRealMandiPricesFromAPI(state, district, commodity) {
        try {
            const url = `/api/mandi?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&commodity=${encodeURIComponent(commodity)}`;
            const response = await fetch(url);
            const data = await response.json();
            return (data.success && data.records && data.records.length > 0) ? data.records : null;
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
            if (typeof translations !== 'undefined' && translations[currentLanguage] && translations[currentLanguage][t]) {
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
        if (typeof AOS !== 'undefined') AOS.init();
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    checkAuth();
                    updateTime();
                    setInterval(updateTime, 1000);
                    updateTipOfTheDay();
                    translatePage();
                    if (typeof updateLangHeader === 'function') updateLangHeader();
                }, 500);
            }
        }, 2000);
    });

    function updateTime() {
        const e = new Date();
        const timeElement = document.getElementById('current-time');
        if (timeElement) timeElement.textContent = e.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // FIXED: previously referenced the undefined variable
    // `farmingTips[currentLanguage]`. This file only defines `gardeningTips`
    // (a flat array). Reading from it directly here.
    function updateTipOfTheDay() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
        const tipIndex = dayOfYear % gardeningTips.length;

        const tipElement = document.getElementById('tip-of-the-day');
        const tipNumberElement = document.getElementById('tip-number');
        if (tipElement) tipElement.textContent = gardeningTips[tipIndex];
        if (tipNumberElement) tipNumberElement.textContent = `#${String(tipIndex + 1).padStart(2, '0')}`;
    }

    function checkAuth() {
        let e = localStorage.getItem('patukrishi_session');
        e ? (currentUser = JSON.parse(e), loadDashboard()) : document.getElementById('auth-container') && (document.getElementById('auth-container').style.display = 'flex');
    }

    // ==================== AUTH (BASIC) ====================
    // NOTE: There is a second, email-verified auth flow further down
    // (handleLoginNew / handleSignupNew / handleGuestLogin) that reads and
    // writes the SAME localStorage keys ('patukrishi_users', 'patukrishi_session').
    // Wire your HTML forms to ONE of these two flows, not both.
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
        if (dashboard) dashboard.style.display = 'block';
        const welcomeName = document.getElementById('welcome-name');
        if (welcomeName) welcomeName.innerText = currentUser.name.split(' ')[0];
        const headerName = document.getElementById('header-name');
        if (headerName) headerName.innerText = currentUser.name;
        const headerAvatar = document.getElementById('header-avatar');
        if (headerAvatar) headerAvatar.innerText = currentUser.name.charAt(0).toUpperCase();

        let e = Object.keys(districtDB).sort();
        let t = document.getElementById('mandiStateSelect');
        let n = document.getElementById('advisoryStateSelect');
        if (t && n) {
            t.innerHTML = n.innerHTML = '';
            e.forEach(e => {
                t.add(new Option(e, e));
                n.add(new Option(e, e));
            });
        }

        let o = document.getElementById('mandiCropSelect');
        if (o) {
            o.innerHTML = '';
            crops.forEach(e => o.add(new Option(e.name, e.name)));
        }

        let l = document.getElementById('specificCropSelect');
        if (l) {
            l.innerHTML = '';
            Object.keys(specificCropAdvice).forEach(e => l.add(new Option(e, e)));
        }

        let calSel = document.getElementById('calendarCropSelect');
        if (calSel) {
            calSel.innerHTML = '';
            if (typeof cropDurations !== 'undefined') {
                Object.keys(cropDurations).forEach(e => calSel.add(new Option(e, e)));
            }
        }
        if (typeof renderCropCalendar === 'function') renderCropCalendar();

        updateDistrictDropdown();
        initAnalyticsCharts();
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    window.updateDistrictDropdown = () => {
        let e = document.getElementById('mandiStateSelect');
        let t = document.getElementById('mandiDistrictSelect');
        if (e && t) {
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

    // ==================== NEWS SECTION ====================
    let currentNewsCategory = 'agri';

window.loadNewsSection = async function (category = 'agri') {
    window.currentNewsCategory = category; // Store globally
    const container = document.getElementById('news-container');
    
    // Fix tab button highlighting
    document.querySelectorAll('.news-tabs button').forEach(btn => {
        // Check if the button's onclick contains the category
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`'${category}'`)) {
            btn.classList.add('active-tab');
        } else {
            btn.classList.remove('active-tab');
        }
    });
    
    if (!container) return;

    container.innerHTML = '<div style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-pulse fa-2x"></i> Loading news...</div>';

    try {
        const res = await fetch(`/api/news?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        
        if (!data.success || !data.articles || data.articles.length === 0) {
            container.innerHTML = `<p style="text-align:center;padding:20px;">${data.reason || 'No news available right now.'}</p>`;
            return;
        }
        
        container.innerHTML = data.articles.map(a => `
            <a href="${a.url}" target="_blank" rel="noopener" class="news-card">
                ${a.image ? `<img src="${a.image}" alt="" loading="lazy" onerror="this.style.display='none'">` : ''}
                <div class="news-card-text">
                    <h4>${a.title}</h4>
                    <span class="news-source-link">${a.source || 'News Source'}</span>
                </div>
            </a>
        `).join('');
    } catch (e) {
        console.error('News load error:', e);
        container.innerHTML = `<p style="text-align:center;padding:20px;">Failed to load news. Please try again later.</p>`;
    }
};
    
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
    window.analyzeCropImage = async function () {
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

        reader.onload = async function (event) {
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

        reader.onerror = function () {
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
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
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
        if (e === 'general') {
            if (generalInputs) generalInputs.style.display = 'block';
            if (specificInputs) specificInputs.style.display = 'none';
            if (generalBtn) generalBtn.style.background = 'linear-gradient(145deg,var(--primary),var(--primary-dark))';
            if (specificBtn) specificBtn.style.background = '#f9a825';
        } else {
            if (generalInputs) generalInputs.style.display = 'none';
            if (specificInputs) specificInputs.style.display = 'block';
            if (specificBtn) specificBtn.style.background = 'linear-gradient(145deg,var(--primary),var(--primary-dark))';
            if (generalBtn) generalBtn.style.background = '#f9a825';
        }
    };

    window.showGeneralAdvisory = () => {
        let e = document.getElementById('advisoryStateSelect');
        let t = document.getElementById('advisorySeasonSelect');
        let container = document.getElementById('generalAdvisoryContent');
        if (e && t && container) {
            let state = e.value;
            let season = t.value;
            let n = advisoryDB[state]?.[season] || 'No detailed advisory for this state/season';
            container.innerHTML = `<h3>${state} - ${season}</h3><p class="big-friendly">${n.replace(/\n/g, '<br>')}</p>`;
        }
    };

    window.showSpecificAdvisory = () => {
        let e = document.getElementById('specificCropSelect');
        let container = document.getElementById('specificAdvisoryContent');
        if (e && container) {
            let crop = e.value;
            let t = specificCropAdvice[crop] || 'Guide not available';
            container.innerHTML = `<h3>${crop} – 3-Step Guide</h3><p class="big-friendly" style="white-space:pre-line;">${t}</p>`;
        }
    };
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

    // ==================== ANALYTICS GRAPH GENERATORS ====================
    function initAnalyticsCharts() {
        if (typeof Chart === 'undefined') return;
        const priceChart = document.getElementById('priceTrendChart')?.getContext('2d');
        if (priceChart) {
            new Chart(priceChart, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        { label: 'Wheat (₹/q)', data: [2250, 2300, 2380, 2420, 2400, 2450], borderColor: '#2e7d32', tension: .4, fill: true },
                        { label: 'Rice (₹/q)', data: [2000, 2050, 2100, 2150, 2120, 2150], borderColor: '#f9a825', tension: .4, fill: true }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
        const cropChart = document.getElementById('cropDistributionChart')?.getContext('2d');
        if (cropChart) {
            new Chart(cropChart, {
                type: 'doughnut',
                data: {
                    labels: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Other'],
                    datasets: [{ data: [38, 32, 14, 10, 6], backgroundColor: ['#2e7d32', '#f9a825', '#d32f2f', '#4caf50', '#9c27b0'] }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
    }

    window.calculateProfit = function () {
        const cropSelect = document.getElementById('profit-crop');
        const areaInput = document.getElementById('profit-area');
        const resultDiv = document.getElementById('profit-result');
        if (!cropSelect || !areaInput || !resultDiv) return;
        const e = cropSelect.value;
        const t = parseFloat(areaInput.value) || 1;
        const n = {
            wheat: { yield: 48, price: 2450, cost: 37000 },
            rice: { yield: 58, price: 2150, cost: 42000 },
            cotton: { yield: 24, price: 7200, cost: 58000 },
            sugarcane: { yield: 780, price: 380, cost: 85000 },
            potato: { yield: 265, price: 2850, cost: 47000 }
        };
        const o = n[e];
        if (!o) return;
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
        if (chatWindow) chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    };

    window.sendMessage = async () => {
        let e = document.getElementById('chat-input');
        if (!e) return;
        let originalText = e.value.trim();
        let t = originalText.toLowerCase();
        if (!t) return;
        let n = document.getElementById('chat-messages');
        if (n) n.innerHTML += `<div class="message msg-user">${originalText}</div>`;
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
            let e = (typeof botResponses !== 'undefined' && (botResponses[currentLanguage] || botResponses.en)) || {
                mandi: "Ask me about mandi prices.", weather: "Ask me about the weather.",
                lens: "Try Crop Lens for disease detection.", advisory: "Ask me for crop advisory.",
                about: "PatuKrishi helps Indian farmers.", analytics: "Check the Analytics section.",
                hello: "Namaste! How can I help?", default: "I'm still learning — try asking about mandi, weather, or crop advisory."
            };
            let o = "";
            if (t.includes('mandi') || t.includes('मंडी') || t.includes('price')) o = e.mandi;
            else if (t.includes('weather') || t.includes('mausam') || t.includes('मौसम')) o = e.weather;
            else if (t.includes('lens') || t.includes('crop') || t.includes('क्रॉप')) o = e.lens;
            else if (t.includes('advisory') || t.includes('salah') || t.includes('सलाह')) o = e.advisory;
            else if (t.includes('about')) o = e.about;
            else if (t.includes('analytics')) o = e.analytics;
            else if (t.includes('hello') || t.includes('hi')) o = e.hello;
            else o = e.default;
            if (n) n.innerHTML += `<div class="message msg-bot">${o}</div>`;
            if (n) n.scrollTop = n.scrollHeight;
        }, 600);
    };

    // ==================== USER PROFILE SYSTEMS ====================
    window.toggleUserDropdown = () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) dropdown.classList.toggle('show');
    };

    window.openProfileModal = () => {
        const modal = document.getElementById('profile-modal');
        const editName = document.getElementById('edit-name');
        if (modal) modal.classList.add('show');
        toggleUserDropdown();
        if (editName && currentUser) editName.value = currentUser.name;
    };

    window.closeProfileModal = () => {
        const modal = document.getElementById('profile-modal');
        if (modal) modal.classList.remove('show');
    };

    window.saveProfile = () => {
        let e = document.getElementById('edit-name');
        if (e && e.value && currentUser) {
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
        if (container) container.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
    window.showNotification = showNotification;

window.switchSection = function(e) {
    // Update navigation items
    document.querySelectorAll('.nav-item').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-section') === e);
    });
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(t => t.classList.remove('active'));
    const section = document.getElementById(e + '-section');
    if (section) section.classList.add('active');
    
    window.scrollTo(0, 0);
    
    // Load news when switching to news section
    if (e === 'news') {
        // Make sure currentNewsCategory is defined globally
        if (typeof currentNewsCategory === 'undefined') {
            window.currentNewsCategory = 'agri';
        }
        loadNewsSection(window.currentNewsCategory);
    }
};

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let e = document.querySelector('#theme-toggle i');
            if (e) {
                e.classList.toggle('fa-moon');
                e.classList.toggle('fa-sun');
            }
        });
    }

    // ==================== GOVERNMENT CENTRIC SCHEMES ENGINE ====================
    function renderAllSchemes(category = "all") {
        const container = document.getElementById("allSchemesContainer");
        if (!container) return;

        if (typeof govtSchemesDB === 'undefined') {
            container.innerHTML = '<p style="padding:20px; text-align:center;">Scheme data not loaded.</p>';
            return;
        }

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
    window.toggleLangDropdown = function () {
        const modal = document.getElementById('langModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
        }
    };

    window.closeLangModal = function () {
        const modal = document.getElementById('langModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
    };

    window.changeLanguage = function (lang) {
        currentLanguage = lang;
        localStorage.setItem('patukrishi_language', lang);
        translatePage();
        if (typeof updateLangHeader === 'function') updateLangHeader();
        showNotification(`Language changed to ${lang.toUpperCase()}`, 'success');
        window.closeLangModal();
    };

    document.addEventListener('click', function (e) {
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

// ==================== EMAILJS SECURE AUTH SYSTEMS (email-verified signup) ====================
(function initEmailJSAuth() {
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
            const response = await emailjs.send('service_c48sfqj', 'template_tzsa9yh', templateParams);
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
        if (!pending) {
            errorDiv.innerText = '❌ No pending verification found. Please sign up again.';
            return;
        }
        if (Date.now() > pending.expires) {
            errorDiv.innerText = '❌ Code expired. Please sign up again.';
            delete pendingVerifications[email];
            localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
            return;
        }
        if (pending.code === code) {
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
        contactForm.addEventListener('submit', async function (event) {
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
    // --- Major Scheduled Languages ---
    en: 'en-IN',   // Indian English
    hi: 'hi-IN',   // Hindi
    bn: 'bn-IN',   // Bengali
    te: 'te-IN',   // Telugu
    mr: 'mr-IN',   // Marathi
    gu: 'gu-IN',   // Gujarati
    pa: 'pa-IN',   // Punjabi
    ta: 'ta-IN',   // Tamil
    ml: 'ml-IN',   // Malayalam
    kn: 'kn-IN',   // Kannada
    or: 'or-IN',   // Odia (Oriya)
    ur: 'ur-IN',   // Urdu
    as: 'as-IN',   // Assamese

    // --- Additional Scheduled & Minor/Regional Languages ---
    bho: 'bho-IN', // Bhojpuri
    mai: 'mai-IN', // Maithili
    sat: 'sat-IN', // Santali
    ks: 'ks-IN',   // Kashmiri
    ne: 'ne-IN',   // Nepali (Spoken in Sikkim/North Bengal)
    kok: 'kok-IN', // Konkani (Goa/Coastal Karnataka)
    sd: 'sd-IN',   // Sindhi
    doi: 'doi-IN', // Dogri
    mni: 'mni-IN', // Manipuri / Meitei
    sa: 'sa-IN',   // Sanskrit
    brx: 'brx-IN', // Bodo
    
    // --- Highly Localized / Minority Dialects ---
    tcy: 'tcy-IN', // Tulu (Spoken in coastal Karnataka/Kerala)
    kha: 'kha-IN', // Khasi (Spoken in Meghalaya)
    mzo: 'mzo-IN', // Mizo (Spoken in Mizoram)
    mwr: 'mwr-IN', // Marwari (Spoken in Rajasthan)
    awa: 'awa-IN', // Awadhi (Spoken in Uttar Pradesh)
    bgc: 'bgc-IN'  // Haryanvi (Spoken in Haryana)
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
            console.warn('Speech recognition failed to start:', e);
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

    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mainNav = document.getElementById('mainNav');
        const overlay = document.getElementById('mobileNavOverlay');
        if (hamburgerBtn && mainNav && overlay) {
            document.body.classList.add('has-mobile-menu');
        }
    });
})();
