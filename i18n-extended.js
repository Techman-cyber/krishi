// ============================================================
// EXTENDED TRANSLATIONS — dynamic data content
// Covers: weather condition text, farming advice alerts,
// mandi crop & market names, healthy-crop names/stages.
// Languages match the existing UI `translations` object:
// en, hi, bn, te, mr, gu, mwr, pa, ta, ml, ur, kn, or, sa
// ============================================================

// ---------- 1. WEATHER CONDITION TEXT ----------
// Keys match the `main` classification returned by getWeatherDesc()
const weatherDescTranslations = {
    en: { Clear: "Clear Sky", Clouds: "Partly Cloudy", Fog: "Foggy Conditions", Rain: "Rain Showers", Snow: "Snowfall", HeavyRain: "Heavy Downpour", Thunderstorm: "Thunderstorm Alerts", Default: "Stable Conditions" },
    hi: { Clear: "साफ आसमान", Clouds: "आंशिक बादल", Fog: "कोहरा", Rain: "बारिश", Snow: "हिमपात", HeavyRain: "भारी बारिश", Thunderstorm: "तूफान चेतावनी", Default: "सामान्य मौसम" },
    bn: { Clear: "পরিষ্কার আকাশ", Clouds: "আংশিক মেঘলা", Fog: "কুয়াশা", Rain: "বৃষ্টি", Snow: "তুষারপাত", HeavyRain: "ভারী বর্ষণ", Thunderstorm: "বজ্রঝড় সতর্কতা", Default: "স্থিতিশীল অবস্থা" },
    te: { Clear: "నిర్మలమైన ఆకాశం", Clouds: "పాక్షిక మేఘావృతం", Fog: "పొగమంచు", Rain: "వర్షం", Snow: "మంచు కురుస్తుంది", HeavyRain: "భారీ వర్షం", Thunderstorm: "ఉరుములతో తుఫాను హెచ్చరిక", Default: "స్థిరమైన పరిస్థితులు" },
    mr: { Clear: "निरभ्र आकाश", Clouds: "अंशतः ढगाळ", Fog: "धुके", Rain: "पाऊस", Snow: "हिमवर्षाव", HeavyRain: "मुसळधार पाऊस", Thunderstorm: "वादळाचा इशारा", Default: "स्थिर हवामान" },
    gu: { Clear: "ચોખ્ખું આકાશ", Clouds: "આંશિક વાદળછાયું", Fog: "ધુમ્મસ", Rain: "વરસાદ", Snow: "હિમવર્ષા", HeavyRain: "ભારે વરસાદ", Thunderstorm: "વાવાઝોડાની ચેતવણી", Default: "સ્થિર સ્થિતિ" },
    mwr: { Clear: "साफ आभा", Clouds: "कीं बादळ", Fog: "धुंध", Rain: "मीह", Snow: "बर्फ पड़णो", HeavyRain: "भारी मीह", Thunderstorm: "तूफान री चेतावनी", Default: "सामान्य मौसम" },
    pa: { Clear: "ਸਾਫ਼ ਅਸਮਾਨ", Clouds: "ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ", Fog: "ਧੁੰਦ", Rain: "ਮੀਂਹ", Snow: "ਬਰਫ਼ਬਾਰੀ", HeavyRain: "ਭਾਰੀ ਮੀਂਹ", Thunderstorm: "ਤੂਫ਼ਾਨ ਦੀ ਚੇਤਾਵਨੀ", Default: "ਸਥਿਰ ਮੌਸਮ" },
    ta: { Clear: "தெளிவான வானம்", Clouds: "ஓரளவு மேகமூட்டம்", Fog: "பனிமூட்டம்", Rain: "மழை", Snow: "பனிப்பொழிவு", HeavyRain: "கனமழை", Thunderstorm: "இடிமின்னல் புயல் எச்சரிக்கை", Default: "நிலையான வானிலை" },
    ml: { Clear: "തെളിഞ്ഞ ആകാശം", Clouds: "ഭാഗികമായി മേഘാവൃതം", Fog: "മൂടൽമഞ്ഞ്", Rain: "മഴ", Snow: "മഞ്ഞുവീഴ്ച", HeavyRain: "കനത്ത മഴ", Thunderstorm: "ഇടിമിന്നൽ മുന്നറിയിപ്പ്", Default: "സ്ഥിരതയുള്ള കാലാവസ്ഥ" },
    ur: { Clear: "صاف آسمان", Clouds: "جزوی بادل", Fog: "دھند", Rain: "بارش", Snow: "برف باری", HeavyRain: "موسلادھار بارش", Thunderstorm: "طوفانی وارننگ", Default: "مستحکم موسم" },
    kn: { Clear: "ಸ್ವಚ್ಛ ಆಕಾಶ", Clouds: "ಭಾಗಶಃ ಮೋಡ", Fog: "ಮಂಜು", Rain: "ಮಳೆ", Snow: "ಹಿಮಪಾತ", HeavyRain: "ಭಾರೀ ಮಳೆ", Thunderstorm: "ಗುಡುಗು ಸಿಡಿಲಿನ ಎಚ್ಚರಿಕೆ", Default: "ಸ್ಥಿರ ಹವಾಮಾನ" },
    or: { Clear: "ସ୍ୱଚ୍ଛ ଆକାଶ", Clouds: "ଆଂଶିକ ମେଘୁଆ", Fog: "କୁହୁଡ଼ି", Rain: "ବର୍ଷା", Snow: "ହିମପାତ", HeavyRain: "ପ୍ରବଳ ବର୍ଷା", Thunderstorm: "ବଜ୍ରପାତ ସହ ଝଡ଼ ଚେତାବନୀ", Default: "ସ୍ଥିର ପାଣିପାଗ" },
    sa: { Clear: "निर्मलं गगनम्", Clouds: "आंशिकमेघाच्छन्नम्", Fog: "कुहेटिका", Rain: "वृष्टिः", Snow: "हिमपातः", HeavyRain: "प्रबलवृष्टिः", Thunderstorm: "वज्रवात-चेतावनी", Default: "स्थिरं वातावरणम्" }
};

function translateWeatherDesc(mainKey, fallbackText, lang) {
    lang = lang || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'en');
    const dict = weatherDescTranslations[lang] || weatherDescTranslations.en;
    return dict[mainKey] || fallbackText;
}

// ---------- 2. FARMING ADVICE ALERTS ----------
const farmingAdviceTranslations = {
    en: { rain: { title: "🌧️ Rain Alert:", body: "Avoid spraying pesticides. Check for waterlogging in fields. Good for irrigation." }, heat: { title: "☀️ Heat Alert:", body: "Increase irrigation frequency. Provide shade for sensitive crops. Best time for harvesting." }, clear: { title: "🌾 Good Farming Weather:", body: "Ideal for spraying, weeding, and harvesting activities." }, cloud: { title: "☁️ Cloudy Day:", body: "Good for transplanting seedlings. Monitor for pest activity in humid conditions." }, storm: { title: "⛈️ Storm Alert:", body: "Secure farm equipment. Avoid field work. Ensure proper drainage." }, tip: { title: "🌱 Farming Tip:", body: "Check soil moisture regularly. Maintain proper irrigation schedule." } },
    hi: { rain: { title: "🌧️ बारिश चेतावनी:", body: "कीटनाशक छिड़कने से बचें। खेतों में जलभराव की जांच करें। सिंचाई के लिए अच्छा समय।" }, heat: { title: "☀️ गर्मी चेतावनी:", body: "सिंचाई की आवृत्ति बढ़ाएं। संवेदनशील फसलों को छाया दें। कटाई के लिए सबसे अच्छा समय।" }, clear: { title: "🌾 अच्छा कृषि मौसम:", body: "छिड़काव, निराई और कटाई के कार्यों के लिए आदर्श।" }, cloud: { title: "☁️ बादल वाला दिन:", body: "पौध रोपण के लिए अच्छा। नमी वाली स्थिति में कीट गतिविधि पर नज़र रखें।" }, storm: { title: "⛈️ तूफान चेतावनी:", body: "खेती के उपकरण सुरक्षित करें। खेत में काम करने से बचें। उचित जल निकासी सुनिश्चित करें।" }, tip: { title: "🌱 खेती टिप:", body: "मिट्टी की नमी नियमित रूप से जांचें। उचित सिंचाई अनुसूची बनाए रखें।" } },
    bn: { rain: { title: "🌧️ বৃষ্টি সতর্কতা:", body: "কীটনাশক স্প্রে করা এড়িয়ে চলুন। ক্ষেতে জলাবদ্ধতা পরীক্ষা করুন। সেচের জন্য ভালো সময়।" }, heat: { title: "☀️ তাপ সতর্কতা:", body: "সেচের ঘনত্ব বাড়ান। সংবেদনশীল ফসলের জন্য ছায়া দিন। ফসল কাটার সেরা সময়।" }, clear: { title: "🌾 ভালো কৃষি আবহাওয়া:", body: "স্প্রে, আগাছা পরিষ্কার এবং ফসল কাটার জন্য আদর্শ।" }, cloud: { title: "☁️ মেঘলা দিন:", body: "চারা রোপণের জন্য ভালো। আর্দ্র পরিস্থিতিতে পোকার কার্যকলাপ পর্যবেক্ষণ করুন।" }, storm: { title: "⛈️ ঝড় সতর্কতা:", body: "কৃষি সরঞ্জাম সুরক্ষিত করুন। মাঠের কাজ এড়িয়ে চলুন। যথাযথ নিষ্কাশন নিশ্চিত করুন।" }, tip: { title: "🌱 কৃষি টিপ:", body: "নিয়মিত মাটির আর্দ্রতা পরীক্ষা করুন। সঠিক সেচ সময়সূচী বজায় রাখুন।" } },
    te: { rain: { title: "🌧️ వర్ష హెచ్చరిక:", body: "పురుగుమందులు పిచికారీ చేయవద్దు. పొలాల్లో నీరు నిలవడం చూడండి. నీటిపారుదలకు మంచి సమయం." }, heat: { title: "☀️ వేడి హెచ్చరిక:", body: "నీటిపారుదల తరచుగా చేయండి. సున్నితమైన పంటలకు నీడ కల్పించండి. కోతకు ఉత్తమ సమయం." }, clear: { title: "🌾 మంచి వ్యవసాయ వాతావరణం:", body: "పిచికారీ, కలుపు తీయడం మరియు కోతకు అనువైనది." }, cloud: { title: "☁️ మేఘావృత దినం:", body: "నారు నాటడానికి మంచిది. తేమతో కూడిన పరిస్థితుల్లో పురుగుల కార్యకలాపాన్ని గమనించండి." }, storm: { title: "⛈️ తుఫాను హెచ్చరిక:", body: "వ్యవసాయ పరికరాలను భద్రపరచండి. పొలం పనులు మానుకోండి. సరైన నీటి పారుదల ఉండేలా చూసుకోండి." }, tip: { title: "🌱 వ్యవసాయ చిట్కా:", body: "నేల తేమను క్రమం తప్పకుండా తనిఖీ చేయండి. సరైన నీటిపారుదల షెడ్యూల్‌ను పాటించండి." } },
    mr: { rain: { title: "🌧️ पाऊस इशारा:", body: "कीटकनाशक फवारणी टाळा. शेतात पाणी साचले आहे का ते तपासा. सिंचनासाठी चांगला काळ." }, heat: { title: "☀️ उष्णता इशारा:", body: "सिंचनाची वारंवारता वाढवा. संवेदनशील पिकांना सावली द्या. काढणीसाठी उत्तम वेळ." }, clear: { title: "🌾 चांगले शेती हवामान:", body: "फवारणी, खुरपणी आणि काढणीसाठी योग्य." }, cloud: { title: "☁️ ढगाळ दिवस:", body: "रोपांची पुनर्लागवड करण्यासाठी चांगले. दमट स्थितीत किडींच्या हालचालींवर लक्ष ठेवा." }, storm: { title: "⛈️ वादळ इशारा:", body: "शेती उपकरणे सुरक्षित करा. शेतातील काम टाळा. योग्य निचरा सुनिश्चित करा." }, tip: { title: "🌱 शेती टीप:", body: "मातीतील ओलावा नियमित तपासा. योग्य सिंचन वेळापत्रक पाळा." } },
    gu: { rain: { title: "🌧️ વરસાદ ચેતવણી:", body: "જંતુનાશક છંટકાવ ટાળો. ખેતરોમાં પાણી ભરાયું છે કે નહીં તપાસો. સિંચાઈ માટે સારો સમય." }, heat: { title: "☀️ ગરમી ચેતવણી:", body: "સિંચાઈની આવૃત્તિ વધારો. સંવેદનશીલ પાકોને છાયો આપો. લણણી માટે શ્રેષ્ઠ સમય." }, clear: { title: "🌾 સારું ખેતી હવામાન:", body: "છંટકાવ, નિંદામણ અને લણણી માટે આદર્શ." }, cloud: { title: "☁️ વાદળછાયો દિવસ:", body: "રોપા વાવવા માટે સારું. ભેજવાળી સ્થિતિમાં જીવાતોની પ્રવૃત્તિ પર નજર રાખો." }, storm: { title: "⛈️ તોફાન ચેતવણી:", body: "ખેતીના સાધનો સુરક્ષિત કરો. ખેતરનું કામ ટાળો. યોગ્ય ડ્રેનેજ સુનિશ્ચિત કરો." }, tip: { title: "🌱 ખેતી ટિપ:", body: "જમીનની ભેજ નિયમિત તપાસો. યોગ્ય સિંચાઈ સમયપત્રક જાળવો." } },
    mwr: { rain: { title: "🌧️ मीह री चेतावणी:", body: "कीटनाशक छिड़कणों टाळो। खेतां में पाणी भरयोड़ो चेक करो। सिंचाई खातर आछो टेम।" }, heat: { title: "☀️ गरमी री चेतावणी:", body: "सिंचाई ज्यादा बार करो। नाजुक फसलां नै छाया देवो। कटाई खातर आछो टेम।" }, clear: { title: "🌾 आछो खेती मौसम:", body: "छिड़काव, निंदाई अर कटाई खातर आदर्श।" }, cloud: { title: "☁️ बादळ वाळो दिन:", body: "पौध रोपण खातर आछो। नमी में कीड़ां पर नजर राखो।" }, storm: { title: "⛈️ तूफान चेतावणी:", body: "खेती री मशीनां सुरक्षित करो। खेत रो काम टाळो। पाणी निकासी ठीक राखो।" }, tip: { title: "🌱 खेती टिप:", body: "माटी री नमी नियमित चेक करो। सिंचाई रो सही समय राखो।" } },
    pa: { rain: { title: "🌧️ ਮੀਂਹ ਚੇਤਾਵਨੀ:", body: "ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਣ ਤੋਂ ਬਚੋ। ਖੇਤਾਂ ਵਿੱਚ ਪਾਣੀ ਭਰਨ ਦੀ ਜਾਂਚ ਕਰੋ। ਸਿੰਚਾਈ ਲਈ ਵਧੀਆ ਸਮਾਂ।" }, heat: { title: "☀️ ਗਰਮੀ ਚੇਤਾਵਨੀ:", body: "ਸਿੰਚਾਈ ਦੀ ਵਾਰਵਾਰਤਾ ਵਧਾਓ। ਸੰਵੇਦਨਸ਼ੀਲ ਫਸਲਾਂ ਨੂੰ ਛਾਂ ਦਿਓ। ਵਾਢੀ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ।" }, clear: { title: "🌾 ਵਧੀਆ ਖੇਤੀ ਮੌਸਮ:", body: "ਛਿੜਕਾਅ, ਗੋਡੀ ਅਤੇ ਵਾਢੀ ਲਈ ਆਦਰਸ਼।" }, cloud: { title: "☁️ ਬੱਦਲਵਾਈ ਵਾਲਾ ਦਿਨ:", body: "ਪਨੀਰੀ ਲਾਉਣ ਲਈ ਵਧੀਆ। ਸਿੱਲ੍ਹੇ ਹਾਲਾਤਾਂ ਵਿੱਚ ਕੀੜਿਆਂ ਦੀ ਗਤੀਵਿਧੀ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ।" }, storm: { title: "⛈️ ਤੂਫ਼ਾਨ ਚੇਤਾਵਨੀ:", body: "ਖੇਤੀ ਸੰਦ ਸੁਰੱਖਿਅਤ ਕਰੋ। ਖੇਤ ਦਾ ਕੰਮ ਟਾਲੋ। ਸਹੀ ਨਿਕਾਸੀ ਯਕੀਨੀ ਬਣਾਓ।" }, tip: { title: "🌱 ਖੇਤੀ ਟਿੱਪ:", body: "ਮਿੱਟੀ ਦੀ ਨਮੀ ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਜਾਂਚੋ। ਸਹੀ ਸਿੰਚਾਈ ਸਮਾਂ-ਸਾਰਣੀ ਬਣਾਈ ਰੱਖੋ।" } },
    ta: { rain: { title: "🌧️ மழை எச்சரிக்கை:", body: "பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும். வயல்களில் நீர் தேங்குவதைச் சரிபார்க்கவும். நீர்ப்பாசனத்திற்கு ஏற்ற நேரம்." }, heat: { title: "☀️ வெப்ப எச்சரிக்கை:", body: "நீர்ப்பாசன அதிர்வெண்ணை அதிகரிக்கவும். உணர்திறன் பயிர்களுக்கு நிழல் அளிக்கவும். அறுவடைக்கு சிறந்த நேரம்." }, clear: { title: "🌾 நல்ல விவசாய வானிலை:", body: "தெளித்தல், களை எடுத்தல் மற்றும் அறுவடைக்கு ஏற்றது." }, cloud: { title: "☁️ மேகமூட்ட நாள்:", body: "நாற்று நடவுக்கு நல்லது. ஈரப்பதமான நிலைமைகளில் பூச்சி செயல்பாட்டைக் கண்காணிக்கவும்." }, storm: { title: "⛈️ புயல் எச்சரிக்கை:", body: "பண்ணை உபகரணங்களைப் பாதுகாக்கவும். வயல் வேலையைத் தவிர்க்கவும். சரியான வடிகால் உறுதி செய்யவும்." }, tip: { title: "🌱 விவசாய குறிப்பு:", body: "மண் ஈரப்பதத்தை தவறாமல் சரிபார்க்கவும். சரியான நீர்ப்பாசன அட்டவணையை பராமரிக்கவும்." } },
    ml: { rain: { title: "🌧️ മഴ മുന്നറിയിപ്പ്:", body: "കീടനാശിനി തളിക്കുന്നത് ഒഴിവാക്കുക. വയലുകളിൽ വെള്ളം കെട്ടിനിൽക്കുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക. ജലസേചനത്തിന് നല്ല സമയം." }, heat: { title: "☀️ ചൂട് മുന്നറിയിപ്പ്:", body: "ജലസേചന ആവൃത്തി വർദ്ധിപ്പിക്കുക. സെൻസിറ്റീവ് വിളകൾക്ക് തണൽ നൽകുക. വിളവെടുപ്പിന് ഏറ്റവും നല്ല സമയം." }, clear: { title: "🌾 നല്ല കൃഷി കാലാവസ്ഥ:", body: "തളിക്കൽ, കള പറിക്കൽ, വിളവെടുപ്പ് എന്നിവയ്ക്ക് അനുയോജ്യം." }, cloud: { title: "☁️ മേഘാവൃതമായ ദിവസം:", body: "തൈകൾ പറിച്ചുനടാൻ നല്ലത്. ഈർപ്പമുള്ള സാഹചര്യങ്ങളിൽ കീടബാധ നിരീക്ഷിക്കുക." }, storm: { title: "⛈️ കൊടുങ്കാറ്റ് മുന്നറിയിപ്പ്:", body: "കൃഷി ഉപകരണങ്ങൾ സുരക്ഷിതമാക്കുക. വയൽ ജോലി ഒഴിവാക്കുക. ശരിയായ ഡ്രെയിനേജ് ഉറപ്പാക്കുക." }, tip: { title: "🌱 കൃഷി ടിപ്പ്:", body: "മണ്ണിലെ ഈർപ്പം പതിവായി പരിശോധിക്കുക. ശരിയായ ജലസേചന ഷെഡ്യൂൾ പാലിക്കുക." } },
    ur: { rain: { title: "🌧️ بارش وارننگ:", body: "کیڑے مار ادویات کے چھڑکاؤ سے گریز کریں۔ کھیتوں میں پانی جمع ہونے کی جانچ کریں۔ آبپاشی کے لیے اچھا وقت۔" }, heat: { title: "☀️ گرمی وارننگ:", body: "آبپاشی کی تعدد بڑھائیں۔ حساس فصلوں کو سایہ فراہم کریں۔ کٹائی کا بہترین وقت۔" }, clear: { title: "🌾 اچھا زرعی موسم:", body: "چھڑکاؤ، گوڈی اور کٹائی کے لیے مثالی۔" }, cloud: { title: "☁️ ابر آلود دن:", body: "پنیری لگانے کے لیے اچھا۔ نم حالات میں کیڑوں کی سرگرمی پر نظر رکھیں۔" }, storm: { title: "⛈️ طوفان وارننگ:", body: "زرعی آلات کو محفوظ کریں۔ کھیت کا کام نہ کریں۔ مناسب نکاسی آب یقینی بنائیں۔" }, tip: { title: "🌱 زرعی ٹپ:", body: "مٹی کی نمی باقاعدگی سے چیک کریں۔ مناسب آبپاشی شیڈول برقرار رکھیں۔" } },
    kn: { rain: { title: "🌧️ ಮಳೆ ಎಚ್ಚರಿಕೆ:", body: "ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ತಪ್ಪಿಸಿ. ಹೊಲಗಳಲ್ಲಿ ನೀರು ನಿಲ್ಲುವುದನ್ನು ಪರಿಶೀಲಿಸಿ. ನೀರಾವರಿಗೆ ಉತ್ತಮ ಸಮಯ." }, heat: { title: "☀️ ಶಾಖ ಎಚ್ಚರಿಕೆ:", body: "ನೀರಾವರಿ ಆವರ್ತನೆ ಹೆಚ್ಚಿಸಿ. ಸೂಕ್ಷ್ಮ ಬೆಳೆಗಳಿಗೆ ನೆರಳು ನೀಡಿ. ಕೊಯ್ಲಿಗೆ ಉತ್ತಮ ಸಮಯ." }, clear: { title: "🌾 ಉತ್ತಮ ಕೃಷಿ ಹವಾಮಾನ:", body: "ಸಿಂಪಡಣೆ, ಕಳೆ ತೆಗೆಯುವಿಕೆ ಮತ್ತು ಕೊಯ್ಲಿಗೆ ಸೂಕ್ತ." }, cloud: { title: "☁️ ಮೋಡ ಕವಿದ ದಿನ:", body: "ಸಸಿ ನಾಟಿಗೆ ಉತ್ತಮ. ಆರ್ದ್ರ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ಕೀಟ ಚಟುವಟಿಕೆ ಗಮನಿಸಿ." }, storm: { title: "⛈️ ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆ:", body: "ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ. ಹೊಲದ ಕೆಲಸ ತಪ್ಪಿಸಿ. ಸರಿಯಾದ ಒಳಚರಂಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ." }, tip: { title: "🌱 ಕೃಷಿ ಸಲಹೆ:", body: "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ. ಸರಿಯಾದ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ ಕಾಪಾಡಿಕೊಳ್ಳಿ." } },
    or: { rain: { title: "🌧️ ବର୍ଷା ଚେତାବନୀ:", body: "କୀଟନାଶକ ସ୍ପ୍ରେ କରିବାରୁ ବିରତ ରୁହନ୍ତୁ। କ୍ଷେତରେ ପାଣି ଜମା ହେଉଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ। ଜଳସେଚନ ପାଇଁ ଭଲ ସମୟ।" }, heat: { title: "☀️ ଗରମ ଚେତାବନୀ:", body: "ଜଳସେଚନ ଫ୍ରିକ୍ୱେନ୍ସି ବଢ଼ାନ୍ତୁ। ସମ୍ବେଦନଶୀଳ ଫସଲକୁ ଛାଇ ଦିଅନ୍ତୁ। ଅମଳ ପାଇଁ ସର୍ବୋତ୍ତମ ସମୟ।" }, clear: { title: "🌾 ଭଲ କୃଷି ପାଣିପାଗ:", body: "ସ୍ପ୍ରେ, ଘାସ ପରିଷ୍କାର ଏବଂ ଅମଳ ପାଇଁ ଆଦର୍ଶ।" }, cloud: { title: "☁️ ମେଘୁଆ ଦିନ:", body: "ଚାରା ରୋପଣ ପାଇଁ ଭଲ। ଆର୍ଦ୍ର ପରିସ୍ଥିତିରେ ପୋକ କାର୍ଯ୍ୟକଳାପ ଉପରେ ନଜର ରଖନ୍ତୁ।" }, storm: { title: "⛈️ ଝଡ଼ ଚେତାବନୀ:", body: "କୃଷି ଉପକରଣ ସୁରକ୍ଷିତ କରନ୍ତୁ। କ୍ଷେତ କାର୍ଯ୍ୟ ଏଡ଼ାନ୍ତୁ। ସଠିକ ଡ୍ରେନେଜ୍ ନିଶ୍ଚିତ କରନ୍ତୁ।" }, tip: { title: "🌱 କୃଷି ଟିପ୍:", body: "ମାଟିର ଆର୍ଦ୍ରତା ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ। ସଠିକ ଜଳସେଚନ ସୂଚୀ ବଜାୟ ରଖନ୍ତୁ।" } },
    sa: { rain: { title: "🌧️ वृष्टि-चेतावनी:", body: "कीटनाशकसेचनं वर्जयत। क्षेत्रेषु जलावरोधं परीक्षध्वम्। सिञ्चनार्थं उत्तमः समयः।" }, heat: { title: "☀️ उष्णता-चेतावनी:", body: "सिञ्चनस्य आवृत्तिं वर्धयत। संवेदनशील-सस्येभ्यः छायां ददातु। कर्तनाय उत्तमः समयः।" }, clear: { title: "🌾 शुभं कृषि-वातावरणम्:", body: "सेचन-निर्वालन-कर्तन-कार्येभ्यः आदर्शम्।" }, cloud: { title: "☁️ मेघाच्छन्नः दिवसः:", body: "रोपण-कार्याय शुभम्। आर्द्रावस्थायां कीट-सक्रियतां निरीक्षयत।" }, storm: { title: "⛈️ वात्या-चेतावनी:", body: "कृषि-उपकरणानि सुरक्षितानि कुरुत। क्षेत्र-कार्यं वर्जयत। सम्यक् जलनिष्कासनं सुनिश्चितं कुरुत।" }, tip: { title: "🌱 कृषि-सूचना:", body: "मृदायाः आर्द्रतां नियमितं परीक्षध्वम्। सम्यक् सिञ्चन-कालक्रमं पालयत।" } }
};

function getFarmingAdviceTranslated(kind, lang) {
    lang = lang || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'en');
    const dict = farmingAdviceTranslations[lang] || farmingAdviceTranslations.en;
    const entry = dict[kind] || farmingAdviceTranslations.en[kind];
    return `<div style="margin-top:25px;padding:20px;background:linear-gradient(135deg,#2e7d32,#f9a825);border-radius:25px;color:white;">
        <strong>${entry.title}</strong> ${entry.body}
    </div>`;
}

// ---------- 3. MANDI CROP & MARKET NAME TRANSLATIONS ----------
const cropNameTranslations = {
    en: { Wheat: "Wheat", Rice: "Rice", Tomato: "Tomato", Potato: "Potato", Onion: "Onion", Cotton: "Cotton", Maize: "Maize", Sugarcane: "Sugarcane" },
    hi: { Wheat: "गेहूं", Rice: "चावल", Tomato: "टमाटर", Potato: "आलू", Onion: "प्याज", Cotton: "कपास", Maize: "मक्का", Sugarcane: "गन्ना" },
    bn: { Wheat: "গম", Rice: "চাল", Tomato: "টমেটো", Potato: "আলু", Onion: "পেঁয়াজ", Cotton: "তুলা", Maize: "ভুট্টা", Sugarcane: "আখ" },
    te: { Wheat: "గోధుమ", Rice: "బియ్యం", Tomato: "టమోటా", Potato: "బంగాళదుంప", Onion: "ఉల్లిపాయ", Cotton: "పత్తి", Maize: "మొక్కజొన్న", Sugarcane: "చెరకు" },
    mr: { Wheat: "गहू", Rice: "तांदूळ", Tomato: "टोमॅटो", Potato: "बटाटा", Onion: "कांदा", Cotton: "कापूस", Maize: "मका", Sugarcane: "ऊस" },
    gu: { Wheat: "ઘઉં", Rice: "ચોખા", Tomato: "ટામેટા", Potato: "બટાકા", Onion: "ડુંગળી", Cotton: "કપાસ", Maize: "મકાઈ", Sugarcane: "શેરડી" },
    mwr: { Wheat: "गेहूं", Rice: "चावळ", Tomato: "टमाटर", Potato: "आलू", Onion: "प्याज", Cotton: "कपास", Maize: "मक्का", Sugarcane: "गन्नो" },
    pa: { Wheat: "ਕਣਕ", Rice: "ਚੌਲ", Tomato: "ਟਮਾਟਰ", Potato: "ਆਲੂ", Onion: "ਪਿਆਜ਼", Cotton: "ਕਪਾਹ", Maize: "ਮੱਕੀ", Sugarcane: "ਗੰਨਾ" },
    ta: { Wheat: "கோதுமை", Rice: "அரிசி", Tomato: "தக்காளி", Potato: "உருளைக்கிழங்கு", Onion: "வெங்காயம்", Cotton: "பருத்தி", Maize: "சோளம்", Sugarcane: "கரும்பு" },
    ml: { Wheat: "ഗോതമ്പ്", Rice: "അരി", Tomato: "തക്കാളി", Potato: "ഉരുളക്കിഴങ്ങ്", Onion: "ഉള്ളി", Cotton: "പരുത്തി", Maize: "ചോളം", Sugarcane: "കരിമ്പ്" },
    ur: { Wheat: "گندم", Rice: "چاول", Tomato: "ٹماٹر", Potato: "آلو", Onion: "پیاز", Cotton: "کپاس", Maize: "مکئی", Sugarcane: "گنا" },
    kn: { Wheat: "ಗೋಧಿ", Rice: "ಅಕ್ಕಿ", Tomato: "ಟೊಮ್ಯಾಟೊ", Potato: "ಆಲೂಗಡ್ಡೆ", Onion: "ಈರುಳ್ಳಿ", Cotton: "ಹತ್ತಿ", Maize: "ಜೋಳ", Sugarcane: "ಕಬ್ಬು" },
    or: { Wheat: "ଗହମ", Rice: "ଚାଉଳ", Tomato: "ଟମାଟୋ", Potato: "ଆଳୁ", Onion: "ପିଆଜ", Cotton: "କପା", Maize: "ମକା", Sugarcane: "ଆଖୁ" },
    sa: { Wheat: "गोधूमः", Rice: "तण्डुलः", Tomato: "रक्ताम्लः", Potato: "आलुकम्", Onion: "पलाण्डुः", Cotton: "कार्पासः", Maize: "मक्काभिन्नम्", Sugarcane: "इक्षुः" }
};

const marketNameTranslations = {
    en: { "APMC Main Yard": "APMC Main Yard", "Grain Market": "Grain Market", "Kisan Mandi": "Kisan Mandi", "Wholesale Market": "Wholesale Market", "Rice Millers Association": "Rice Millers Association", "APMC Yard": "APMC Yard", "Farmers Market": "Farmers Market", "Vegetable Market": "Vegetable Market", "Wholesale Mandi": "Wholesale Mandi", "Retail Hub": "Retail Hub", "Cold Storage Hub": "Cold Storage Hub", "APMC Market": "APMC Market", "Farmers Mandi": "Farmers Mandi", "Wholesale Center": "Wholesale Center", "Lasalgaon Market": "Lasalgaon Market", "Wholesale Hub": "Wholesale Hub", "Cotton Mandi": "Cotton Mandi", "Ginning Mill Hub": "Ginning Mill Hub", "Sugar Mill Gate": "Sugar Mill Gate", "Cooperative Society": "Cooperative Society", "Main Market": "Main Market", "Local Mandi": "Local Mandi" },
    hi: { "APMC Main Yard": "एपीएमसी मुख्य यार्ड", "Grain Market": "अनाज बाजार", "Kisan Mandi": "किसान मंडी", "Wholesale Market": "थोक बाजार", "Rice Millers Association": "चावल मिलर्स एसोसिएशन", "APMC Yard": "एपीएमसी यार्ड", "Farmers Market": "किसान बाजार", "Vegetable Market": "सब्ज़ी मंडी", "Wholesale Mandi": "थोक मंडी", "Retail Hub": "खुदरा केंद्र", "Cold Storage Hub": "कोल्ड स्टोरेज केंद्र", "APMC Market": "एपीएमसी बाजार", "Farmers Mandi": "किसान मंडी", "Wholesale Center": "थोक केंद्र", "Lasalgaon Market": "लासलगांव बाजार", "Wholesale Hub": "थोक केंद्र", "Cotton Mandi": "कपास मंडी", "Ginning Mill Hub": "जिनिंग मिल केंद्र", "Sugar Mill Gate": "चीनी मिल गेट", "Cooperative Society": "सहकारी समिति", "Main Market": "मुख्य बाजार", "Local Mandi": "स्थानीय मंडी" }
    // Additional languages (bn, te, mr, gu, mwr, pa, ta, ml, ur, kn, or, sa) to follow —
    // falls back to English market names until added, which is safe (proper nouns/place-like labels)
};

function translateCropName(cropKey, lang) {
    lang = lang || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'en');
    const dict = cropNameTranslations[lang] || cropNameTranslations.en;
    return dict[cropKey] || cropKey;
}

function translateMarketName(marketKey, lang) {
    lang = lang || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'en');
    const dict = marketNameTranslations[lang] || marketNameTranslations.en;
    return dict[marketKey] || marketKey;
}
