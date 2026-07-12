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

// ==================== REALTIME SYSTEMS WIDGET ENGINE ====================
window.updateWidget = () => {
    const now = new Date();

    // 1. Live clock display
    const timeString = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const timeElement = document.getElementById('current-time');
    if (timeElement) timeElement.textContent = timeString;

    // 2. Pick the tip for today (rotates once per calendar day)
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const tipIndex = dayOfYear % gardeningTips.length;

    // 3. Update the DOM
    const displayNumber = String(tipIndex + 1).padStart(2, '0');
    const tipNumberElement = document.getElementById('tip-number');
    const tipTextElement = document.getElementById('tip-of-the-day');

    if (tipNumberElement) tipNumberElement.textContent = `#${displayNumber}`;
    if (tipTextElement) tipTextElement.textContent = gardeningTips[tipIndex];
};

// Kick it off once on load, then keep the clock ticking every second
window.addEventListener('load', () => {
    window.updateWidget();
    setInterval(window.updateWidget, 1000);
});
