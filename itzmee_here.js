// ============================================================================
// PATUKRISHI APP SCRIPT — CLEANED & CONSOLIDATED
// ============================================================================

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

    // ==================== STABLE API CONFIGURATION ====================
    const MANDI_API_URL = 'https://api.ceda.ashoka.edu.in/v1/agmarknet/prices';
    const MANDI_API_KEY = ''; // Add your AGMARKNET API key here if available
    const EMAILJS_SERVICE_ID = 'service_c48sfqj';
    const EMAILJS_PUBLIC_KEY = 'QA0QL3SJlJH2VL0y3';
    const EMAILJS_TEMPLATE_ID_WEATHER_CONTACT = 'template_xnjx3mg'; 
    const EMAILJS_TEMPLATE_ID_VERIFY = 'template_tzsa9yh';          

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // ==================== GARDENING TIPS DATA (100 DAYS) ====================
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

    // ==================== REAL MANDI API FUNCTION ====================
    async function fetchRealMandiPricesFromAPI(state, district, commodity) {
        if (!MANDI_API_KEY) {
            console.warn('MANDI_API_KEY is not set — skipping live API call and using mock data.');
            return null;
        }
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
        // Fallback for missing elements translation handling context
        updateTipOfTheDay();
    }

    // ==================== REALTIME SYSTEMS WIDGET ENGINE ====================
    window.updateWidget = () => {
        const now = new Date();

        // 1. Live unified clock display runner
        const timeString = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const timeElement = document.getElementById('current-time');
        if (timeElement) timeElement.textContent = timeString;

        // 2. Reliable 24-Hour cyclic structural index shifts
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const tipIndex = dayOfYear % gardeningTips.length;
        
        // 3. Update active DOM interface containers
        const displayNumber = String(tipIndex + 1).padStart(2, '0');
        const tipNumberElement = document.getElementById('tip-number');
        const tipTextElement = document.getElementById('tip-of-the-day');
        
        if (tipNumberElement) tipNumberElement.textContent = `#${displayNumber}`;
        if (tipTextElement) tipTextElement.textContent = gardeningTips[tipIndex];
    };

    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') AOS.init();
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    checkAuth();
                    window.updateWidget();
                    setInterval(window.updateWidget, 1000);
                    translatePage();
                }, 500);
            }
        }, 2000);
    });

    function updateTipOfTheDay() {
        window.updateWidget();
    }

    function checkAuth() {
        let session = localStorage.getItem('patukrishi_session');
        if (session) {
            currentUser = JSON.parse(session);
            const modal = document.getElementById('authModal');
            if (modal) modal.style.display = 'none';
            loadDashboard();
        } else {
            const modal = document.getElementById('authModal');
            if (modal) modal.style.display = 'flex';
        }
    }

    window.logout = () => {
        localStorage.removeItem('patukrishi_session');
        location.reload();
    };

    // ==================== DASHBOARD LOADING LAYOUTS ====================
    function loadDashboard() {
        const dashboard = document.getElementById('dashboard');
        if (dashboard) dashboard.style.display = 'block';
        
        if (currentUser) {
            const welcomeName = document.getElementById('welcome-name');
            if (welcomeName) welcomeName.innerText = currentUser.name.split(' ')[0];
            const headerName = document.getElementById('header-name');
            if (headerName) headerName.innerText = currentUser.name;
            const headerAvatar = document.getElementById('header-avatar');
            if (headerAvatar) headerAvatar.innerText = currentUser.name.charAt(0).toUpperCase();
        }

        let states = Object.keys(districtDB).sort();
        let t = document.getElementById('mandiStateSelect');
        let n = document.getElementById('advisoryStateSelect');
        if (t && n) {
            t.innerHTML = n.innerHTML = '';
            states.forEach(state => {
                t.add(new Option(state, state));
                n.add(new Option(state, state));
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
        }
    };

    // Healthy crops database with care tips
    const healthyCropsDB = [
        { name: "Wheat (Gehu)", emoji: "🌾", stage: "Flowering", tip: "Continue irrigation every 10–12 days. Watch for rust in humid conditions. Apply 2nd dose of urea (45–50 kg/ha)." },
        { name: "Rice (Dhan/Chawal)", emoji: "🍚", stage: "Tillering", tip: "Maintain 5 cm water level. Apply zinc sulphate (25 kg/ha). Monitor for stem borer and leaf folder." },
        { name: "Maize (Makka/Bhutta)", emoji: "🌽", stage: "Silking", tip: "Apply urea top dressing (60 kg/ha). Ensure irrigation during tasseling. Watch for fall armyworm." },
        { name: "Cotton (Kapas)", emoji: "🧶", stage: "Boll formation", tip: "Install pheromone traps (10/acre). Spray NSKE for pest control. Pick bolls when fully opened." },
        { name: "Potato (Aloo)", emoji: "🥔", stage: "Tuber formation", tip: "Earth up soil around plants. Stop irrigation 15 days before harvest. Watch for late blight in cool weather." }
    ];

    // ML Model Simulation - Advanced disease detection
    class CropLensAI {
        analyzeImage(imageData) {
            const diseases = Object.keys(cropDiseaseDatabase);
            const probabilities = [];

            diseases.forEach(disease => {
                let probability = Math.random() * 0.8;
                probabilities.push({ disease, probability: Math.min(probability, 0.95) });
            });

            probabilities.sort((a, b) => b.probability - a.probability);
            const isHealthy = Math.random() < 0.35;

            return {
                isHealthy: isHealthy,
                disease: isHealthy ? null : probabilities[0].disease,
                confidence: isHealthy ? 0.85 + (Math.random() * 0.1) : probabilities[0].probability
            };
        }

        getRecommendation(diseaseName) {
            if (!diseaseName) return null;
            return cropDiseaseDatabase[diseaseName] || cropDiseaseDatabase["Late Blight"];
        }
    }

    const cropLensAI = new CropLensAI();
    let imageHistory = [];
    let currentAnalysis = null;

    window.analyzeCropImage = async function () {
        const fileInput = document.getElementById('crop-image');
        const resultDiv = document.getElementById('lens-result');
        const previewDiv = document.getElementById('image-preview');

        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            showLensMessage('❌ Please select an image first. Click "Choose Image" to upload a crop photo.', 'error');
            return;
        }

        const file = fileInput.files[0];
        showLensLoading();
        const reader = new FileReader();

        reader.onload = async function (event) {
            const imageData = event.target.result;
            if (previewDiv) {
                previewDiv.innerHTML = `<img src="${imageData}" style="max-width: 100%; max-height: 300px; border-radius: 15px; border: 3px solid #f9a825;">`;
            }

            await new Promise(resolve => setTimeout(resolve, 1500));
            const analysis = cropLensAI.analyzeImage(imageData);
            currentAnalysis = analysis;

            imageHistory.unshift({ id: Date.now(), imageData, analysis, timestamp: new Date().toISOString() });

            if (analysis.isHealthy) {
                displayHealthyResult(analysis);
            } else {
                displayDiseaseResult(analysis);
            }
            displayActionButtons();
        };
        reader.readAsDataURL(file);
    };

    function displayHealthyResult(analysis) {
        const resultDiv = document.getElementById('lens-result');
        const randomCrop = healthyCropsDB[Math.floor(Math.random() * healthyCropsDB.length)];
        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #2e7d32, #1b5e20); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
                <h3>✅ Crop is Healthy!</h3>
                <p><strong>🌾 Crop Identified:</strong> ${randomCrop.name} (${randomCrop.emoji})</p>
                <p><strong>🌱 Current Care Tip:</strong> ${randomCrop.tip}</p>
            </div>
        `;
    }

    function displayDiseaseResult(analysis) {
        const resultDiv = document.getElementById('lens-result');
        const diseaseInfo = cropLensAI.getRecommendation(analysis.disease);
        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #c62828, #8e0000); border-radius: 25px; padding: 25px; color: white; margin-top: 20px;">
                <h3>⚠️ Diagnostic Alert: ${analysis.disease}</h3>
                <p><strong>📝 Symptoms:</strong> ${diseaseInfo.symptoms}</p>
                <p><strong>🩺 Chemical Treatment:</strong> ${diseaseInfo.chemicalRemedies.join('<br>')}</p>
                <p><strong>🌿 Organic Alternative:</strong> ${diseaseInfo.organicRemedies.join('<br>')}</p>
            </div>
        `;
    }

    function showLensLoading() {
        const resultDiv = document.getElementById('lens-result');
        if (resultDiv) {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<p style="text-align:center; padding:20px;">🔬 Processing micro-leaf features...</p>';
        }
    }

    function showLensMessage(message, type = 'info') {
        const resultDiv = document.getElementById('lens-result');
        if (resultDiv) {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<div style="padding:15px; border-radius:15px; text-align:center; background: #2196f3; color:white;">${message}</div>`;
        }
    }

    function displayActionButtons() {
        const resultDiv = document.getElementById('lens-result');
        if (resultDiv && !resultDiv.innerHTML.includes('resetCropLens')) {
            const btnWrap = document.createElement('div');
            btnWrap.style.marginTop = '15px';
            btnWrap.innerHTML = `<button onclick="resetCropLens()" style="background:#666; color:white; padding:10px 20px; border:none; border-radius:20px; cursor:pointer;">🔄 Reset Lens</button>`;
            resultDiv.appendChild(btnWrap);
        }
    }

    window.resetCropLens = () => {
        document.getElementById('crop-image').value = '';
        document.getElementById('lens-result').style.display = 'none';
        document.getElementById('image-preview').innerHTML = '';
        currentAnalysis = null;
    };

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
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Kurnool"],
        "Assam": ["Guwahati", "Barpeta", "Bongaigaon", "Dibrugarh"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
        "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
        "Himachal Pradesh": ["Shimla", "Kangra", "Mandi"],
        "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur"],
        "Karnataka": ["Bengaluru Urban", "Mysuru", "Hubballi", "Mangaluru"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
        "Maharashtra": ["Mumbai City", "Pune", "Nagpur", "Nashik"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
        "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Hooghly"]
    };
    
    const crops = [
        { name: 'Wheat', basePrice: 2450 }, { name: 'Rice', basePrice: 2150 }, { name: 'Tomato', basePrice: 45 },
        { name: 'Potato', basePrice: 2850 }, { name: 'Onion', basePrice: 3900 }, { name: 'Cotton', basePrice: 7200 }
    ];
    
    const advisoryDB = {
        "Punjab": { Rabi: "🌾 Wheat: Sow Oct 25 - Nov 15. NPK 120:60:40 kg/ha. Apply first water at crown root initiation.", Kharif: "🌧️ Paddy: Transplant seedlings in June. Maintain 5 cm standing layer." },
        "Uttar Pradesh": { Rabi: "🌾 Wheat/Potato: High fertilizer responsive arrays. Watch out for winter aphids.", Kharif: "🌧️ Rice: Apply zinc sulphate (25 kg/ha) against khaira disease complexes." }
    };

    const specificCropAdvice = {
        "Wheat (Gehu)": `🌾 Sowing: Oct-Nov | Seed: 120 kg/ha | Water: 5-6 cycles. Apply first irrigation exactly 21 days after sowing.`,
        "Rice (Dhan/Chawal)": `🍚 Nursery: May-June | Spacing: 20x15 cm | Water: Maintain standing water until grain hardens.`
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
                        { label: 'Wheat (₹/q)', data: [2250, 2300, 2380, 2420, 2400, 2450], borderColor: '#2e7d32', tension: .4 },
                        { label: 'Rice (₹/q)', data: [2000, 2050, 2100, 2150, 2120, 2150], borderColor: '#f9a825', tension: .4 }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    }

    // ==================== CHATBOT LOGIC ROUTER ====================
    window.toggleChatbot = () => {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    };

    window.sendMessage = () => {
        let e = document.getElementById('chat-input');
        if (!e || !e.value.trim()) return;
        let msg = e.value.trim();
        let n = document.getElementById('chat-messages');
        if (n) n.innerHTML += `<div class="message msg-user">${msg}</div>`;
        e.value = '';
        
        setTimeout(() => {
            if (n) {
                n.innerHTML += `<div class="message msg-bot">I have received your crop request query regarding "${msg}". Our agri-advisory network is analyzing details.</div>`;
                n.scrollTop = n.scrollHeight;
            }
        }, 800);
    };

    // ==================== USER PROFILE MODALS ====================
    window.toggleUserDropdown = () => {
        document.getElementById('user-dropdown')?.classList.toggle('show');
    };

    window.openProfileModal = () => {
        const modal = document.getElementById('profile-modal');
        if (modal) modal.classList.add('show');
        window.toggleUserDropdown();
        if (currentUser) document.getElementById('edit-name').value = currentUser.name;
    };

    window.closeProfileModal = () => {
        document.getElementById('profile-modal')?.classList.remove('show');
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

    function showNotification(msg) {
        let n = document.createElement('div');
        n.style = `background:var(--card-bg); padding:12px 20px; border-radius:40px; margin-bottom:10px; border-left:4px solid #2e7d32; box-shadow:var(--shadow);`;
        n.innerText = msg;
        document.getElementById('notification-container')?.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
    window.showNotification = showNotification;

    window.switchSection = e => {
        document.querySelectorAll('.nav-item').forEach(t => {
            t.classList.toggle('active', t.getAttribute('onclick')?.includes(e));
        });
        document.querySelectorAll('.content-section').forEach(t => t.classList.remove('active'));
        document.getElementById(e + '-section')?.classList.add('active');
        window.scrollTo(0, 0);
    };

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // ==================== GOVERNMENT SCHEMES ENGINE ====================
    function renderAllSchemes(category = "all") {
        const container = document.getElementById("allSchemesContainer");
        if (!container) return;
        
        if (typeof govtSchemesDB === 'undefined') {
            container.innerHTML = '<p style="padding:20px; text-align:center;">Database loading dynamically via storage pipeline arrays...</p>';
            return;
        }
        
        let schemes = (category === "all") ? govtSchemesDB : govtSchemesDB.filter(s => s.category === category);
        container.innerHTML = schemes.map(scheme => `
            <div class="scheme-card" onclick="showSchemeDetails(${scheme.id})">
                <h3>${scheme.id}. ${scheme.name}</h3>
                <span class="scheme-category">${scheme.category}</span>
                <p><strong>Benefit:</strong> ${scheme.amount}</p>
            </div>
        `).join('');
    }

    window.filterSchemesByCategory = (category) => {
        renderAllSchemes(category);
    };

    // Global mapping extensions
    window.districtDB = districtDB;
    window.crops = crops;
    window.advisoryDB = advisoryDB;
    window.specificCropAdvice = specificCropAdvice;
    window.cropDiseaseDatabase = cropDiseaseDatabase;
    window.healthyCropsDB = healthyCropsDB;

})();

// ==================== EMAILJS SECURE AUTH ENGINE ====================
(function initEmailJSAuth() {
    let users = JSON.parse(localStorage.getItem('patukrishi_users') || '{}');
    let pendingVerifications = {};
    let currentPendingEmail = null;

    window.switchAuthTab = (tab) => {
        document.getElementById('login-form-new')?.classList.toggle('active', tab === 'login');
        document.getElementById('signup-form-new')?.classList.toggle('active', tab === 'signup');
        document.getElementById('tab-login-trigger')?.classList.toggle('active', tab === 'login');
        document.getElementById('tab-signup-trigger')?.classList.toggle('active', tab === 'signup');
    };

    window.handleSignup = async () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorDiv = document.getElementById('signup-error');

        if (!name || !email || !password) {
            errorDiv.innerText = 'Please fill all fields';
            return;
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        errorDiv.innerText = '📧 Dispatching secure EmailJS validation token...';

        try {
            await emailjs.send('service_c48sfqj', 'template_tzsa9yh', {
                email: email, to_name: name, passcode: code
            });
            pendingVerifications[email] = { name, password, code, expires: Date.now() + 15 * 60 * 1000 };
            currentPendingEmail = email;
            errorDiv.innerText = 'Verification code transmitted successfully!';
            document.getElementById('verification-section').style.display = 'block';
        } catch (err) {
            errorDiv.innerText = '❌ Failed to forward passcode routing channels.';
        }
    };

    window.verifyPasscode = () => {
        const code = document.getElementById('verify-code').value;
        const errorDiv = document.getElementById('verify-error');
        const pending = pendingVerifications[currentPendingEmail];

        if (pending && pending.code === code) {
            users[currentPendingEmail] = { name: pending.name, email: currentPendingEmail, password: pending.password };
            localStorage.setItem('patukrishi_users', JSON.stringify(users));
            localStorage.setItem('patukrishi_session', JSON.stringify({ name: pending.name, email: currentPendingEmail }));
            location.reload();
        } else {
            errorDiv.innerText = '❌ Code mismatch exception profiles.';
        }
    };

    window.handleLogin = () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');

        const user = users[email];
        if (user && user.password === password) {
            localStorage.setItem('patukrishi_session', JSON.stringify({ name: user.name, email: user.email }));
            location.reload();
        } else {
            if (errorDiv) errorDiv.innerText = 'Invalid email credentials context routing patterns.';
        }
    };
})();

// ==================== SECURE CONTACT FORM SUBSYSTEMS ====================
(function initContactForm() {
    document.getElementById('patuContactForm')?.addEventListener('submit', async function (event) {
        event.preventDefault();
        const statusDiv = document.getElementById('patuFormStatus');
        statusDiv.innerHTML = 'Sending message channels...';

        try {
            await emailjs.send('service_c48sfqj', 'template_xnjx3mg', {
                from_name: document.getElementById('patuName').value,
                from_email: document.getElementById('patuEmail').value,
                mobile: document.getElementById('patuMobile').value,
                message: document.getElementById('patuMessage').value
            });
            statusDiv.innerHTML = '✅ Message delivered successfully!';
            this.reset();
        } catch (error) {
            statusDiv.innerHTML = '❌ Transmission context failure parameters.';
        }
    });
})();

// ==================== BROWSER NATURAL SPEECH ENGINE ====================
(function initVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('chat-mic-btn');
    if (!SpeechRecognition || !micBtn) return;

    const recognition = new SpeechRecognition();
    micBtn.addEventListener('click', () => {
        try { recognition.start(); } catch(e) {}
    });

    recognition.onresult = (event) => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.value = event.results[0][0].transcript;
    };
})();
