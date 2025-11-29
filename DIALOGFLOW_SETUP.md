# Dialogflow Integration Guide

## Overview
The eco Yatra voice assistant now uses a Dialogflow-style intent matching system with Q&A specific to the eco Yatra application.

## Features

### Intents Available

1. **find_green_route** - Help users find eco-friendly routes
   - Patterns: "find route", "green route", "best route", "navigate", etc.
   - Response: Offers assistance in finding green routes

2. **check_air_quality** - Information about air quality
   - Patterns: "air quality", "pollution", "PM2.5", "AQI", "smog", etc.
   - Response: Provides air quality data and recommendations

3. **eco_coins_redeem** - Eco Coins and voucher redemption
   - Patterns: "eco coins", "redeem", "voucher", "reward", "tree plant", etc.
   - Response: Explains Eco Coins system and redemption process

4. **health_personalization** - Health-based route customization
   - Patterns: "health", "asthma", "allergy", "medical", "personalize", etc.
   - Response: Recommends health-personalized routes

5. **donate** - Donation information
   - Patterns: "donate", "give", "support", "QR code", "payment", etc.
   - Response: Guides users through donation process

6. **predictive_analytics** - Route analytics and predictions
   - Patterns: "analytics", "predict", "impact", "forecast", "ERS score", etc.
   - Response: Explains Predictive Analytics features

7. **voice_assistant** - Help and guidance
   - Patterns: "voice assistant", "help", "how to use", "feature", "guide", etc.
   - Response: Explains assistant capabilities

8. **route_history** - Route tracking and history
   - Patterns: "history", "my route", "past", "track", "statistics", etc.
   - Response: Shows how to view route history

9. **get_started** - Onboarding information
   - Patterns: "start", "signup", "new user", "account", "register", etc.
   - Response: Guides new users through signup

## API Endpoint

**POST** `/api/dialogflow`

### Request Format
```json
{
  "query": "Find me a green route",
  "sessionId": "unique-session-id"
}
```

### Response Format
```json
{
  "response": "I can help you find a green route! Would you like to search from your current location or a specific address?",
  "intent": "find_green_route",
  "confidence": 0.95,
  "action": "find_green_route"
}
```

## How It Works

1. User sends a message via the voice assistant chat
2. Message is sent to `/api/dialogflow` endpoint
3. Server analyzes the query using pattern matching
4. Detects the intent based on keywords
5. Returns an appropriate response from the intent's response pool
6. Response is displayed in the chat

## Integration in Frontend

The VoiceAssistant component handles:
- Message sending to the API
- Loading states while waiting for response
- Error handling with fallback responses
- Session management for conversation context
- Text and voice input options

## Adding New Intents

To add new intents, edit `/server/routes/dialogflow.ts`:

```typescript
"your_intent_name": {
  patterns: [
    /pattern1/i,
    /pattern2/i,
    /another pattern/i,
  ],
  responses: [
    "Response 1",
    "Response 2",
    "Response 3",
  ],
}
```

## Future Enhancements

- Integrate with real Google Dialogflow CX/ES API
- Add sentiment analysis
- Implement context preservation across messages
- Add action triggers (e.g., open route finder, navigate to page)
- Multi-language support
- Advanced NLP with entity extraction
- User preference learning
- Integration with backend services (actual route finding, user data)

## Testing

Try these queries in the chat:
- "Find me a green route"
- "What's the air quality?"
- "How do eco coins work?"
- "I have asthma, help me find safe routes"
- "I want to donate"
- "Show me my impact"
- "How do I get started?"
