import { RequestHandler } from "express";

// Dialogflow API endpoint - you'll need to set up your Dialogflow agent
// For now, we'll create a local intent matcher that mimics Dialogflow responses

interface DialogflowRequest {
  query: string;
  sessionId: string;
}

interface DialogflowResponse {
  response: string;
  intent: string;
  confidence: number;
  action?: string;
}

// Intent definitions for eco Yatra
const intents: Record<string, { patterns: RegExp[]; responses: string[] }> = {
  "find_green_route": {
    patterns: [
      /find.*route/i,
      /green route/i,
      /best.*route/i,
      /eco.*route/i,
      /show.*route/i,
      /navigate/i,
      /where.*go/i,
      /how to go/i,
      /travel/i,
      /go.*destination/i,
    ],
    responses: [
      "I can help you find a green route! Click 'Find Green Route' to enter your source and destination. I'll show you the most eco-friendly path with real-time pollution and traffic data.",
      "Looking for a sustainable commute? Use the Green Route finder to compare normal routes vs green routes. See the difference in pollution levels and travel time!",
      "Want to reduce your carbon footprint? I'll find you routes with the best air quality. You'll earn Eco Coins for every green route you take!",
      "Let me find the greenest route for you! The route comparison shows PM2.5 levels, CO₂ impact, and health benefits for each option.",
      "I've found several green routes for you! Routes are ranked by air quality, traffic, and environmental impact. Pick the one that works best for you.",
      "Green routes save you from pollution and help you earn Eco Coins! Let me find the best path with the lowest pollution exposure.",
    ],
  },
  "check_air_quality": {
    patterns: [
      /air quality/i,
      /pollution/i,
      /pm2\.5/i,
      /aqi/i,
      /smog/i,
      /breathe/i,
      /health.*impact/i,
      /air.*data/i,
      /quality.*area/i,
      /pollut/i,
    ],
    responses: [
      "Air quality is measured using PM2.5 (fine particles), NO₂, and AQI indices. Our live maps show real-time pollution levels in your area - updated every 15 minutes!",
      "High PM2.5 levels? Avoid heavy traffic areas! Use the Impact Route Analyzer to see live air quality heatmaps across the city.",
      "Air quality varies by location and time. Morning routes often have better air quality than evening commutes. Check the forecast to plan ahead!",
      "PM2.5 above 100 is unhealthy. Use health-personalized routes if you have asthma or allergies. Your lungs will thank you!",
      "Real-time AQI data shows air quality on a scale: Good (0-50), Moderate (51-100), Unhealthy (100+). Green routes prioritize low-pollution areas.",
      "Current air quality in your area: Check the live air quality maps on the Impact Route Analyzer dashboard. Worst areas are shown in red, best areas in green!",
    ],
  },
  "eco_coins_redeem": {
    patterns: [
      /eco coins/i,
      /redeem/i,
      /voucher/i,
      /reward/i,
      /tree.*plant/i,
      /donation/i,
      /green.*initiative/i,
      /collect/i,
      /earn.*coin/i,
      /gift.*card/i,
    ],
    responses: [
      "Every green route earns you Eco Coins! Redeem vouchers in the Eco Coins hub to support government tree planting. You get gift vouchers as rewards!",
      "Eco Coins are earned from green routes - 1 km of green route = 50-100 coins depending on pollution avoided. Redeem them to plant trees across India!",
      "Here's the flow: Take green routes → Earn Eco Coins → Collect vouchers → Redeem vouchers → Your coins go to tree plantation → Get gift vouchers!",
      "Your redeemed Eco Coins directly support environmental initiatives. For every 500 coins redeemed, 25 trees are planted! See your impact in real-time.",
      "Eco Coins are separate from donations. Coins are earned from routes, donations are direct contributions. Both help the environment differently!",
      "Redeem your vouchers now! Each voucher can be converted to gift cards (Amazon, CCD, Flipkart) worth ₹500-1000. Your environmental contribution earns rewards!",
    ],
  },
  "health_personalization": {
    patterns: [
      /health/i,
      /asthma/i,
      /allerg/i,
      /medical/i,
      /condition/i,
      /personali/i,
      /my needs/i,
      /wheelchair/i,
      /mobility/i,
      /heart.*health/i,
    ],
    responses: [
      "Health-personalized routes consider your conditions - asthma, allergies, heart health, mobility needs. Enable your health profile to get safer routes!",
      "Have asthma? Routes avoid high-pollution areas and traffic-congested zones. The app predicts health impact for each route!",
      "Allergies? We track pollen counts and air quality together. Green routes with good air quality = healthier journey for you.",
      "Wheelchair accessibility? Our routes show accessible paths with minimal hills and proper infrastructure. Mobility matters!",
      "Heart conditions? We recommend routes with moderate activity levels and good air quality. Your cardiac health is our priority.",
      "Set your health preferences in your profile! We'll tailor every route recommendation to keep you healthy and safe. No more risky routes!",
    ],
  },
  "donate": {
    patterns: [
      /donate/i,
      /give/i,
      /support/i,
      /green.*donation/i,
      /qr.*code/i,
      /payment/i,
      /contribute/i,
      /help.*environment/i,
      /fund/i,
      /money.*green/i,
    ],
    responses: [
      "Donations are separate from Eco Coins. Go to the Donate page to give any amount via secure QR payment. 90% goes to environmental projects!",
      "Scan the QR code to donate via UPI. Your donation supports urban greening, pollution reduction, and clean air initiatives in Indian cities.",
      "Every rupee donated plants seeds of change. Get a tax certificate and see your impact immediately - trees planted, CO₂ reduced, people helped!",
      "Donate ₹100, ₹250, ₹500, ₹1000 or any custom amount. Your contribution creates lasting environmental impact across India!",
      "Your donation + tax benefits! You'll receive a detailed impact report showing exactly how many trees were planted because of your generosity.",
      "Want to help the environment? Donate through our secure QR system. No hidden fees - pure environmental action. Thank you for caring! 🌱",
    ],
  },
  "predictive_analytics": {
    patterns: [
      /analytic/i,
      /predict/i,
      /impact/i,
      /health.*impact/i,
      /forecast/i,
      /ers.*score/i,
      /score/i,
      /dashboard/i,
      /data/i,
      /metrics/i,
    ],
    responses: [
      "Predictive Analytics shows health impact for every route - predicted PM2.5 exposure, CO₂ saved, calories burned, health improvement score!",
      "ERS (Environmental Route Score) ranks routes 0-100. Higher score = better air quality + lower pollution = healthier journey. Aim for 80+!",
      "Our AI predicts weather, traffic, and air quality for your route. You'll know health impact before you travel!",
      "Route comparison shows: Normal route vs Green route side-by-side with pollution levels, health impact, CO₂ savings, and time difference.",
      "Traffic forecast + air quality forecast = perfect route selection. Real-time TomTom maps show live traffic and weather overlays.",
      "See detailed predictions: Trees that will be planted (from your routes), CO₂ you'll offset, people you'll help with cleaner air!",
    ],
  },
  "voice_assistant": {
    patterns: [
      /voice assistant/i,
      /help/i,
      /how.*use/i,
      /feature/i,
      /what.*can/i,
      /guide/i,
      /talk/i,
      /listen/i,
      /speak/i,
      /ask.*me/i,
    ],
    responses: [
      "I'm your eco Yatra AI assistant! Click 'Talk' to speak naturally. I'll listen, understand, and respond to your questions about routes, health, impact, and donations.",
      "Use voice OR text - both work great! Click 'Talk' to start speaking. I'll automatically transcribe and respond. Click 'Listen' to hear my answer!",
      "Ask me anything! I can help with: finding green routes, checking air quality, earning Eco Coins, making donations, tracking your impact, and health info.",
      "I speak your language! Use natural speech like 'Find me a green route to the airport' or 'How do eco coins work?' and I'll help instantly.",
      "Real voice recognition - no typing needed! Just click Talk and speak. I understand Indian English, technical terms, and eco-friendly keywords.",
      "Not sure what to ask? Try: 'Show me green routes', 'What's the air quality?', 'How do I redeem vouchers?', 'Tell me my impact', 'Help me donate'",
    ],
  },
  "route_history": {
    patterns: [
      /history/i,
      /my.*route/i,
      /past/i,
      /previous/i,
      /track/i,
      /statistics/i,
      /contribution/i,
      /total/i,
      /how much/i,
      /saved/i,
    ],
    responses: [
      "Your Route History shows every green route with: coins earned, CO₂ saved, time taken, pollution avoided. See your total environmental impact!",
      "Track your journey! View past routes with detailed metrics - trees planted equivalent, CO₂ offset, people helped with clean air.",
      "Total stats: X routes taken, Y Eco Coins earned, Z kg CO₂ saved, W trees planted equivalent. You're making a real difference!",
      "Each route shows: departure time, destination, pollution levels, coins earned, health impact. Build your eco-journey story!",
      "Your contribution so far: Trees planted (X), CO₂ offset (Y kg), People helped (Z). Keep taking green routes to increase your impact!",
      "Route statistics are categorized: Weekly, Monthly, All-time. See trends in your eco-consciousness and how much greener you're traveling!",
    ],
  },
  "get_started": {
    patterns: [
      /start/i,
      /begin/i,
      /signup/i,
      /new user/i,
      /account/i,
      /register/i,
      /onboard/i,
      /first time/i,
      /create.*account/i,
      /join/i,
    ],
    responses: [
      "Welcome to eco Yatra! Click 'Get Started' to sign up with email. Set your health preferences and you're ready to take green routes!",
      "New here? Sign up, set your health profile (asthma, allergies, heart conditions), and start earning Eco Coins from day one!",
      "Getting started is easy: Sign up → Set health preferences → Find first green route → Start earning Eco Coins! Welcome aboard! 🌱",
      "Join thousands of eco-conscious travelers! Sign up now and get bonus 100 Eco Coins for your first route. Start making a difference!",
      "Sign up takes 2 minutes. We'll ask for health info (optional) to give you personalized, safe routes. Your privacy is protected!",
      "Ready to travel sustainably? Create your eco Yatra account and begin your journey towards cleaner air and a greener India!",
    ],
  },
  "route_comparison": {
    patterns: [
      /compare/i,
      /normal.*green/i,
      /difference/i,
      /faster/i,
      /shorter/i,
      /cleaner/i,
      /safer/i,
      /pollution.*difference/i,
      /time.*difference/i,
      /vs\s/i,
    ],
    responses: [
      "Route comparison shows 2 options side-by-side: Normal route (fast but polluted) vs Green route (slightly longer but healthy). You choose!",
      "Green routes are usually 5-15 minutes longer but reduce pollution exposure by 40-80%. Is cleaner air worth 10 extra minutes? Usually YES!",
      "Time vs Health: Normal route = faster but PM2.5 spike. Green route = steady pace with clean air. Which matters more to you?",
      "Both routes shown with: Time, Distance, PM2.5 levels, CO₂ impact, Eco Coins earned, health score. Make informed choices!",
      "Green routes avoid high-traffic zones and industrial areas. Slower maybe, but your lungs get a break and you earn coins!",
      "See the health prediction for each route. Green route might add 5 mins but saves 1kg CO₂ and earns you 75 Eco Coins!",
    ],
  },
  "eco_impact": {
    patterns: [
      /impact/i,
      /environment/i,
      /tree/i,
      /carbon/i,
      /co2/i,
      /offset/i,
      /green/i,
      /initiative/i,
      /planet/i,
      /earth/i,
    ],
    responses: [
      "Your environmental impact: X trees planted (from routes), Y kg CO₂ offset, Z people helped with clean air initiatives!",
      "Every green route = 1-2 trees planted equivalent. 50 green routes = forest! Your impact compounds with every journey!",
      "CO₂ offset is real: 1 km green route = 50g CO₂ saved. 200 km green = 10kg CO₂ offset = 1 tree's annual absorption!",
      "You've helped plant X trees, offset Y kg CO₂, and contributed to Z environmental projects. You're an eco-warrior!",
      "Track your environmental journey: This week (A), This month (B), All-time (C). See your growing contribution to a cleaner India!",
      "Your impact multiplied: If everyone used green routes like you, India would reduce urban pollution by 30% and plant 1 billion trees!",
    ],
  },
  "government_initiative": {
    patterns: [
      /government/i,
      /initiative/i,
      /policy/i,
      /program/i,
      /nation/i,
      /india/i,
      /state/i,
      /urban/i,
      /city.*green/i,
      /public/i,
    ],
    responses: [
      "eco Yatra partners with government urban greening programs. Your redeemed Eco Coins go directly to verified tree-planting initiatives!",
      "Government initiative: For every ₹100 donated/redeemed, 10 trees planted in public spaces. Transparent, trackable, impactful!",
      "Your contributions fund: Tree planting in parks, pollution reduction programs, clean air zones, and cycling infrastructure in cities!",
      "All donations are government-verified and tax-deductible. You receive a certificate showing trees planted and CO₂ offset in your name!",
      "National impact: Eco Coins redeemed across India = nationwide tree planting. Help plant 1 million trees across Indian cities!",
      "Government partnerships ensure your eco coins create real, measurable environmental change. Transparency is our commitment!",
    ],
  },
  "payment_qr": {
    patterns: [
      /payment/i,
      /qr.*code/i,
      /upi/i,
      /pay/i,
      /scan/i,
      /secure/i,
      /transaction/i,
      /method/i,
      /card/i,
      /digital/i,
    ],
    responses: [
      "Donations via secure QR code + UPI. Scan with any UPI app - instant payment, instant verification. No hidden charges!",
      "QR payment is the safest way. Your donation goes directly to verified environmental projects. Receive instant receipt!",
      "Multiple payment options: UPI (via QR), Card, Net Banking. All transactions are 256-bit encrypted and completely secure!",
      "Secure QR code ensures: Direct transfer to environment fund, Tax certificate generation, Impact report in real-time!",
      "Payment receipt includes: Donation amount, Trees planted (equivalent), Tax benefits, Donation ID for tracking!",
      "Every donation 100% transparent. Track where your money goes: X% to tree planting, Y% to clean air programs, Z% to education!",
    ],
  },
  "app_features": {
    patterns: [
      /feature/i,
      /what.*have/i,
      /capability/i,
      /tool/i,
      /function/i,
      /available/i,
      /service/i,
      /offer/i,
      /provide/i,
      /include/i,
    ],
    responses: [
      "eco Yatra features: Green route finder, live air quality maps, health-personalized routes, predictive analytics, Eco Coins, donations, voice assistant!",
      "Cool features: Real-time TomTom maps, ERS scoring, health impact predictions, route history, voucher redemption, gift rewards!",
      "Advanced tools: AI voice assistant, traffic forecasts, air quality heatmaps, carbon calculator, tree planting tracker!",
      "Unique features: Health-personalized routing, environmental impact predictions, gamified rewards system, government partnership transparency!",
      "You can: Find routes, donate, earn coins, redeem vouchers, track impact, talk to AI assistant, view health metrics!",
      "Interactive features: Route comparison, live maps, impact dashboard, detailed analytics, personal statistics, community leaderboard!",
    ],
  },
  "default": {
    patterns: [],
    responses: [
      "That's a great question! I'm here to help with green routes, air quality, Eco Coins, donations, health tracking, and environmental impact. What would you like to know?",
      "I can help you with: finding sustainable routes, understanding air quality, earning and redeeming Eco Coins, donating to environmental projects, or tracking your impact!",
      "Let me help! Ask me about green routes, health-personalized navigation, eco coins rewards, donation options, or your environmental contribution!",
      "I'm learning! Try asking about finding green routes, checking pollution levels, earning Eco Coins, making donations, or your environmental impact!",
      "Not sure what to ask? Try: 'Find me a green route', 'What's the air quality?', 'How do I earn coins?', 'Help me donate', 'Show my impact'",
      "I'm your eco companion! Ask me anything about sustainable travel, environmental initiatives, rewards system, or how to make a difference!",
    ],
  },
};

// Function to detect intent from user query
function detectIntent(query: string): { intent: string; confidence: number } {
  let bestMatch = { intent: "default", confidence: 0 };

  for (const [intentName, intentData] of Object.entries(intents)) {
    for (const pattern of intentData.patterns) {
      if (pattern.test(query)) {
        const confidence = 0.95; // High confidence for pattern match
        if (confidence > bestMatch.confidence) {
          bestMatch = { intent: intentName, confidence };
        }
      }
    }
  }

  return bestMatch;
}

// Function to get random response for intent
function getResponse(intent: string): string {
  const intentData = intents[intent] || intents.default;
  const responses = intentData.responses;
  return responses[Math.floor(Math.random() * responses.length)];
}

export const handleDialogflow: RequestHandler = (req, res) => {
  try {
    const { query, sessionId } = req.body as DialogflowRequest;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Detect intent
    const { intent, confidence } = detectIntent(query);

    // Get response for detected intent
    const response = getResponse(intent);

    // Return Dialogflow-compatible response
    const dialogflowResponse: DialogflowResponse = {
      response,
      intent,
      confidence,
      action: intent,
    };

    res.json(dialogflowResponse);
  } catch (error) {
    console.error("Dialogflow error:", error);
    res.status(500).json({
      error: "Failed to process request",
      response: "I encountered an error. Please try again.",
    });
  }
};

export default handleDialogflow;
