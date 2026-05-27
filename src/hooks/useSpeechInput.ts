import { useEffect, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface UseSpeechInputOptions {
  onTranscript: (value: string) => void;
  maxLength?: number;
  lang?: string;
}

interface UseSpeechInputReturn {
  isListening: boolean;
  isSupported: boolean;
  toggleListening: () => void;
  stopListening: () => void;
}

export const useSpeechInput = ({
  onTranscript,
  maxLength,
  lang = 'es-MX',
}: UseSpeechInputOptions): UseSpeechInputReturn => {
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const limited = maxLength ? transcript.slice(0, maxLength) : transcript;
      onTranscript(limited);
    }
  }, [transcript, maxLength, onTranscript]);

  // Detener el micrófono al desmontar el componente (navegación entre páginas)
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: lang });
    }
  }, [listening, lang, resetTranscript]);

  return {
    isListening: listening,
    isSupported: browserSupportsSpeechRecognition,
    toggleListening,
    stopListening,
  };
};
