// Web Speech API utilities for voice recognition and text-to-speech

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  isFinal: boolean;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

// Type augmentation for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class VoiceRecognizer {
  private recognition: any;
  private isListening = false;
  private transcript = "";

  constructor(onResult: (text: string, isFinal: boolean) => void, onError: (error: string) => void) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported");
      return;
    }

    this.recognition = new SpeechRecognition();

    // Configuration
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.language = "en-IN"; // Indian English
    this.recognition.maxAlternatives = 1;

    // Event handlers
    this.recognition.onstart = () => {
      this.isListening = true;
      this.transcript = "";
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      this.transcript = "";
      let isFinal = false;

      for (let i = event.results.length - 1; i >= 0; --i) {
        if (event.results[i].isFinal) {
          isFinal = true;
        }

        this.transcript += event.results[i][0].transcript;
      }

      onResult(this.transcript, isFinal);
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessage = this.getErrorMessage(event.error);
      onError(errorMessage);
      this.stop();
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  start() {
    if (!this.isListening && this.recognition) {
      this.transcript = "";
      this.recognition.start();
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  abort() {
    if (this.recognition) {
      this.recognition.abort();
      this.isListening = false;
    }
  }

  getListeningStatus() {
    return this.isListening;
  }

  private getErrorMessage(error: string): string {
    const errorMessages: Record<string, string> = {
      "no-speech": "No speech detected. Please try again.",
      "audio-capture": "No microphone found. Please check permissions.",
      "network": "Network error. Please check your connection.",
      "permission-denied": "Microphone permission denied. Please enable it in settings.",
    };

    return errorMessages[error] || `Error: ${error}. Please try again.`;
  }
}

export class TextToSpeech {
  private synthesis: SpeechSynthesis;
  private isSpeaking = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  speak(text: string, onStart?: () => void, onEnd?: () => void): void {
    if (!this.synthesis) {
      console.error("Text-to-Speech not supported");
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configuration
    utterance.rate = 1; // Speed
    utterance.pitch = 1; // Pitch
    utterance.volume = 1; // Volume
    utterance.lang = "en-IN"; // Indian English

    // Event handlers
    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      onEnd?.();
    };

    utterance.onerror = (event: any) => {
      console.error("Speech synthesis error:", event.error);
      this.isSpeaking = false;
      onEnd?.();
    };

    this.synthesis.speak(utterance);
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  isSpeakingNow(): boolean {
    return this.isSpeaking;
  }

  isSupported(): boolean {
    return !!this.synthesis;
  }
}

export function isVoiceRecognitionSupported(): boolean {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isTextToSpeechSupported(): boolean {
  return !!window.speechSynthesis;
}
