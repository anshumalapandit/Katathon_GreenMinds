import { RequestHandler } from "express";
import * as dialogflow from "@google-cloud/dialogflow";

// Initialize Dialogflow client with credentials from environment
const initializeDialogflowClient = () => {
  try {
    const projectId = process.env.DIALOGFLOW_PROJECT_ID;
    
    if (!projectId) {
      throw new Error("DIALOGFLOW_PROJECT_ID not configured");
    }

    // Create credentials object
    const credentials = {
      type: "service_account" as const,
      project_id: projectId,
      private_key_id: process.env.DIALOGFLOW_PRIVATE_KEY_ID,
      private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
      client_id: process.env.DIALOGFLOW_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      universe_domain: "googleapis.com",
    };

    const sessionClient = new dialogflow.SessionsClient({
      credentials: credentials as any,
    });

    return { sessionClient, projectId };
  } catch (error) {
    console.error("Failed to initialize Dialogflow client:", error);
    return null;
  }
};

// Fallback responses if Dialogflow fails
const fallbackResponses: Record<string, string[]> = {
  find_green_route: [
    "Use our app to enter your source and destination. We'll show you the healthiest route with the lowest air pollution and traffic.",
    "Green routes minimize air pollution exposure and avoid high-traffic areas, considering your personal health needs.",
  ],
  check_air_quality: [
    "Check our live air quality map showing AQI, PM2.5, NO₂ levels. You can see pollution hotspots and plan routes accordingly.",
    "PM2.5 is particulate matter (harmful dust). AQI (0-500) rates overall air quality. Higher means worse air.",
  ],
  eco_coins_redeem: [
    "Every green route earns you Eco Coins based on CO₂ saved. Redeem vouchers to support environmental projects!",
    "Go to Eco Coins section and click Redeem to get a voucher code for partner stores.",
  ],
  default: [
    "I can help with route planning, air quality, eco coins, donations, health tips, and more. What would you like to know?",
    "Ask me about green routes, checking air quality, earning Eco Coins, making donations, or tracking your environmental impact!",
  ],
};

export const handleDialogflowAPI: RequestHandler = async (req, res) => {
  try {
    const { query, sessionId } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required and must be a string" });
    }

    // Initialize client
    const dialogflowClient = initializeDialogflowClient();
    if (!dialogflowClient) {
      throw new Error("Could not initialize Dialogflow client");
    }

    const { sessionClient, projectId } = dialogflowClient;
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId || `session-${Date.now()}`
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: "en-IN",
        },
      },
    };

    // Call Dialogflow API
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (!result) {
      return res.json({
        response: "I couldn't understand that. Please try again.",
        intent: "unknown",
        confidence: 0,
        source: "fallback",
      });
    }

    const intentName = result.intent?.displayName || "unknown";
    const responseText = result.fulfillmentText || "I'm not sure how to respond to that.";
    const confidence = result.intentDetectionConfidence || 0;

    res.json({
      response: responseText,
      intent: intentName,
      confidence: confidence > 0 ? Math.round(confidence * 100) / 100 : 0,
      action: intentName,
      source: "dialogflow",
      parameters: result.parameters || {},
      sessionId: sessionId,
    });
  } catch (error) {
    console.error("Dialogflow API error:", error);

    // Return fallback response on error
    const fallbacks = fallbackResponses.default;
    const fallbackResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];

    res.json({
      response: fallbackResponse,
      intent: "fallback",
      confidence: 0,
      source: "fallback",
      error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
    });
  }
};

export default handleDialogflowAPI;
