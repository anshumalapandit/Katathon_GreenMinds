import { useState, useRef, useEffect } from "react";
import { Mic, X, Send, Volume2, MessageSquare, AlertCircle, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceRecognizer, TextToSpeech, isVoiceRecognitionSupported, isTextToSpeechSupported } from "@/lib/voiceUtils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! 👋 I'm your eco Yatra assistant. Ask me to find green routes, check air quality, or track your impact. Click 'Talk' to use voice!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(String(Date.now()));
  const voiceRecognizerRef = useRef<VoiceRecognizer | null>(null);
  const textToSpeechRef = useRef<TextToSpeech | null>(null);
  const voiceRecognitionSupportedRef = useRef(isVoiceRecognitionSupported());
  const textToSpeechSupportedRef = useRef(isTextToSpeechSupported());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Voice Recognizer and Text-to-Speech on mount
  useEffect(() => {
    if (voiceRecognitionSupportedRef.current && !voiceRecognizerRef.current) {
      voiceRecognizerRef.current = new VoiceRecognizer(
        (text, isFinal) => {
          setInterimTranscript(text);
          if (isFinal) {
            setInputValue(text);
            setInterimTranscript("");
            // Auto-submit the voice input
            setTimeout(() => {
              handleSendVoiceMessage(text);
            }, 100);
          }
        },
        (error) => {
          setVoiceError(error);
          setIsListening(false);
        }
      );
    }

    if (textToSpeechSupportedRef.current && !textToSpeechRef.current) {
      textToSpeechRef.current = new TextToSpeech();
    }
  }, []);

  // Sample responses for demo
  const getSampleResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("route")) {
      return "I found a green route to your destination. It's 5 minutes longer but reduces your PM2.5 exposure by 60%. Would you like me to show it on the map?";
    } else if (lowerInput.includes("air quality")) {
      return "Current air quality in your area: PM2.5 is 58 µg/m³ (Moderate). Avoid strenuous outdoor activity.";
    } else if (lowerInput.includes("health")) {
      return "Your health profile shows asthma sensitivity. I'll prioritize low-pollution routes for you.";
    } else if (lowerInput.includes("impact") || lowerInput.includes("donate")) {
      return "You've donated $45 to green initiatives and helped plant 45 trees! Keep up the great work.";
    } else if (lowerInput.includes("report")) {
      return "I can help you report pollution hotspots. What issue did you observe?";
    }

    return "That's a great question! I'm still learning. Try asking about routes, air quality, health profiles, or donations.";
  };

  // Get response from Dialogflow API
  const getDialogflowResponse = async (query: string): Promise<string> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/dialogflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Dialogflow");
      }

      const data = await response.json();
      setIsLoading(false);
      return data.response || "I'm not sure about that. Can you try rephrasing?";
    } catch (error) {
      console.error("Dialogflow API error:", error);
      setIsLoading(false);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  const handleSendVoiceMessage = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: String(Date.now()),
      type: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Get response from Dialogflow API
    const response = await getDialogflowResponse(query);

    const assistantMessage: Message = {
      id: String(Date.now() + 1),
      type: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Auto-play response if text-to-speech is supported
    if (textToSpeechSupportedRef.current && textToSpeechRef.current) {
      textToSpeechRef.current.speak(response);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: String(Date.now()),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = inputValue;
    setInputValue("");

    // Get response from Dialogflow API
    getDialogflowResponse(query).then((response) => {
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    });
  };

  const handleVoiceInput = () => {
    if (!voiceRecognitionSupportedRef.current) {
      setVoiceError("Voice recognition is not supported on this device or browser.");
      return;
    }

    if (isListening) {
      // Stop listening
      voiceRecognizerRef.current?.stop();
      setIsListening(false);
      setInterimTranscript("");
    } else {
      // Start listening
      setVoiceError(null);
      setInterimTranscript("");
      voiceRecognizerRef.current?.start();
      setIsListening(true);
    }
  };

  const playTextToSpeech = (text: string) => {
    if (!textToSpeechSupportedRef.current) {
      alert("Text-to-speech is not supported on this device.");
      return;
    }

    textToSpeechRef.current?.speak(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full",
          "flex items-center justify-center text-white font-semibold transition-all",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-eco-teal focus-visible:ring-offset-4",
          "hover:scale-110 shadow-soft-lg",
          isOpen
            ? "bg-eco-green hover:bg-eco-teal"
            : "bg-gradient-to-br from-eco-teal to-eco-green hover:shadow-soft-lg"
        )}
        title="Open eco Yatra Assistant (Ctrl+M)"
        aria-label="Open voice assistant"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-40 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-slide-up flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-eco-teal to-eco-green p-4 text-white">
            <h3 className="font-bold text-lg">eco Yatra Assistant</h3>
            <p className="text-sm opacity-90">Ask for routes, air quality, or impact</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold",
                    message.type === "user"
                      ? "bg-eco-green text-white"
                      : "bg-eco-mint text-eco-green"
                  )}
                >
                  {message.type === "user" ? "👤" : "🤖"}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "max-w-xs rounded-lg px-4 py-3 text-sm",
                    message.type === "user"
                      ? "bg-eco-green text-white rounded-br-none"
                      : "bg-eco-mint/30 text-foreground rounded-bl-none border border-eco-mint"
                  )}
                >
                  {message.content}

                  {/* TTS Button for Assistant Messages */}
                  {message.type === "assistant" && textToSpeechSupportedRef.current && (
                    <button
                      className="mt-2 inline-flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity"
                      onClick={() => playTextToSpeech(message.content)}
                      aria-label="Play message with text-to-speech"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-white space-y-3">
            {/* Error Message */}
            {voiceError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{voiceError}</span>
                <button
                  onClick={() => setVoiceError(null)}
                  className="ml-auto text-red-700 hover:text-red-900"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Voice Input Button */}
            <button
              onClick={handleVoiceInput}
              disabled={!voiceRecognitionSupportedRef.current}
              className={cn(
                "w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                isListening
                  ? "bg-red-50 text-red-600 border border-red-200 animate-pulse"
                  : voiceRecognitionSupportedRef.current
                    ? "bg-eco-mint text-eco-green border border-eco-mint hover:border-eco-teal cursor-pointer"
                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              )}
              title={voiceRecognitionSupportedRef.current ? "Click to start listening" : "Voice recognition not supported"}
            >
              <Mic className={cn("w-4 h-4", isListening && "animate-pulse")} />
              {isListening ? "🎤 Listening..." : "🎤 Talk"}
            </button>

            {/* Interim Transcript Display */}
            {interimTranscript && (
              <div className="p-2 bg-eco-mint/20 rounded-lg border border-eco-mint text-sm text-eco-green">
                <p className="italic">"{interimTranscript}..."</p>
              </div>
            )}

            {/* Text Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type or use voice..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal disabled:bg-gray-50 disabled:text-gray-400"
                aria-label="Assistant input message"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  "px-3 py-2 rounded-lg transition-all flex items-center justify-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                  inputValue.trim() && !isLoading
                    ? "bg-eco-green text-white hover:bg-eco-teal cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-xs text-foreground/50 text-center">
              💡 Tip: Click 'Talk' and speak naturally • Click 'Listen' to hear responses
            </p>
          </div>
        </div>
      )}

      {/* Keyboard Shortcut Handler */}
      <div style={{ display: "none" }} role="region" aria-live="polite" aria-atomic="true">
        {isListening && "Voice assistant is listening"}
      </div>
    </>
  );
}
