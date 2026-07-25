import { useCallback, useEffect, useRef, useState } from "react";

export default function useSpeechSynthesis({
  defaultLang = "en-US",
  defaultRate = 1,
  defaultPitch = 1,
  defaultVolume = 1,
} = {}) {
  const synthRef = useRef(window.speechSynthesis);

  const [supported, setSupported] = useState(true);

  const [voices, setVoices] = useState([]);

  const [speaking, setSpeaking] = useState(false);

  const [paused, setPaused] = useState(false);

  const [currentText, setCurrentText] = useState("");

  //----------------------------------------------------
  // Load Voices
  //----------------------------------------------------

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const voiceList = synthRef.current.getVoices();
      setVoices(voiceList);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  //----------------------------------------------------
  // Speak
  //----------------------------------------------------

  const speak = useCallback(
    (
      text,
      {
        lang = defaultLang,
        rate = defaultRate,
        pitch = defaultPitch,
        volume = defaultVolume,
        voiceName = null,
        onStart,
        onEnd,
        onError,
      } = {}
    ) => {
      if (!supported) return;

      if (!text) return;

      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      if (voiceName) {
        const voice = voices.find(
          (v) => v.name === voiceName
        );

        if (voice) {
          utterance.voice = voice;
        }
      } else {
        const english =
          voices.find((v) => v.lang === lang) ||
          voices.find((v) =>
            v.lang.startsWith(lang.substring(0, 2))
          );

        if (english) {
          utterance.voice = english;
        }
      }

      utterance.onstart = () => {
        setSpeaking(true);
        setPaused(false);
        setCurrentText(text);

        onStart?.();
      };

      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);

        onEnd?.();
      };

      utterance.onerror = (event) => {
        setSpeaking(false);
        setPaused(false);

        onError?.(event);
      };

      synthRef.current.speak(utterance);
    },
    [
      supported,
      voices,
      defaultLang,
      defaultRate,
      defaultPitch,
      defaultVolume,
    ]
  );

  //----------------------------------------------------
  // Pause
  //----------------------------------------------------

  const pause = useCallback(() => {
    if (!synthRef.current.speaking) return;

    synthRef.current.pause();

    setPaused(true);
  }, []);

  //----------------------------------------------------
  // Resume
  //----------------------------------------------------

  const resume = useCallback(() => {
    synthRef.current.resume();

    setPaused(false);
  }, []);

  //----------------------------------------------------
  // Stop
  //----------------------------------------------------

  const stop = useCallback(() => {
    synthRef.current.cancel();

    setSpeaking(false);

    setPaused(false);

    setCurrentText("");
  }, []);

  //----------------------------------------------------

  return {
    supported,

    voices,

    speaking,

    paused,

    currentText,

    speak,

    pause,

    resume,

    stop,
  };
}