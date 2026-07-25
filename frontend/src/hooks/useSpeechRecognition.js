import { useCallback, useEffect, useRef, useState } from "react";

export default function useSpeechRecognition({
  language = "en-US",
  continuous = true,
  interimResults = true,
} = {}) {
  const recognitionRef = useRef(null);

  const finalTranscriptRef = useRef("");

  const [supported, setSupported] = useState(true);

  const [listening, setListening] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [interimTranscript, setInterimTranscript] = useState("");

  const [error, setError] = useState("");

  //--------------------------------------------------------
  // Initialize
  //--------------------------------------------------------

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;

    recognition.continuous = continuous;

    recognition.interimResults = interimResults;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setError(event.error);
    };

    recognition.onresult = (event) => {
      let finalText = "";

      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const result = event.results[i];

        if (result.isFinal) {
          finalText += result[0].transcript + " ";
        } else {
          interimText += result[0].transcript;
        }
      }

      if (finalText) {
        finalTranscriptRef.current += finalText;
      }

      setTranscript(finalTranscriptRef.current.trim());

      setInterimTranscript(interimText);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language, continuous, interimResults]);

  //--------------------------------------------------------
  // Start
  //--------------------------------------------------------

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    finalTranscriptRef.current = "";

    setTranscript("");

    setInterimTranscript("");

    setError("");

    recognitionRef.current.start();
  }, []);

  //--------------------------------------------------------
  // Stop
  //--------------------------------------------------------

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  //--------------------------------------------------------
  // Reset
  //--------------------------------------------------------

  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = "";

    setTranscript("");

    setInterimTranscript("");
  }, []);

  //--------------------------------------------------------

  return {
    supported,

    listening,

    transcript,

    interimTranscript,

    error,

    startListening,

    stopListening,

    resetTranscript,
  };
}