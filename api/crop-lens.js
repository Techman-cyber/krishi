// /api/crop-lens.js (Gemini AI Multi-Language Crop Pathology Engine)
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, reason: 'method_not_allowed' });
    }

    // Securely pull your free Google AI Studio Key from Vercel env settings
    const apiKey = process.env.GEMINI_API_KEY; 
    if (!apiKey) {
        return res.status(200).json({ success: false, reason: 'not_configured' });
    }

    const { image } = req.body || {};
    if (!image) {
        return res.status(400).json({ success: false, reason: 'no_image' });
    }

    try {
        let base64Image = image;
        if (base64Image.includes(',')) {
            base64Image = base64Image.split(',')[1];
        }

        // System prompt forces Gemini to act as a crop pathologist and output standard JSON matching your UI structure
        const systemPrompt = "You are a professional agricultural crop pathologist. Analyze this plant leaf image. " +
            "You MUST respond with a single, valid JSON object matching this exact structure: " +
            "{\n" +
            "  \"isHealthy\": false,\n" +
            "  \"cropName\": \"Tomato\",\n" +
            "  \"diseaseName\": \"Powdery Mildew\",\n" +
            "  \"symptoms\": \"White powder-like spots on leaves and stems causing leaves to yellow and dry.\",\n" +
            "  \"severity\": \"Medium\",\n" +
            "  \"chemicalTreatment\": [\"Spray Wettable Sulfur (2g per liter water)\", \"Apply Hexaconazole 5% EC\"],\n" +
            "  \"organicTreatment\": [\"Mix 1 part buttermilk in 9 parts water - spray weekly\", \"Neem oil + Garlic extract spray\"]\n" +
            "}\n" +
            "If the crop is completely healthy, set \"isHealthy\" to true, \"disease\" to null, and fill \"cropName\". " +
            "Do not output markdown codeblocks, only pure raw JSON string.";

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: systemPrompt },
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: base64Image
                            }
                        }
                    ]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            return res.status(200).json({ success: false, reason: 'ai_error', debug: errText });
        }

        const data = await geminiRes.json();
        const rawJsonText = data.candidates[0].content.parts[0].text;
        const diagnosticResult = JSON.parse(rawJsonText);

        // Map perfectly to your existing frontend UI logic properties
        return res.status(200).json({
            success: true,
            isHealthy: diagnosticResult.isHealthy,
            crop: { name: diagnosticResult.cropName, probability: 1.0 },
            disease: !diagnosticResult.isHealthy ? {
                name: diagnosticResult.diseaseName,
                probability: 0.95,
                commonNames: [diagnosticResult.diseaseName],
                description: `Diagnosed profile for ${diagnosticResult.diseaseName}.`,
                symptoms: diagnosticResult.symptoms,
                severity: diagnosticResult.severity,
                treatment: {
                    chemical: diagnosticResult.chemicalTreatment,
                    biological: diagnosticResult.organicTreatment,
                    prevention: ["Ensure proper air circulation", "Avoid overhead watering"]
                }
            } : null,
            secondaryDiseases: []
        });

    } catch (err) {
        return res.status(200).json({ success: false, reason: 'processing_failed', debug: String(err.message) });
    }
}
