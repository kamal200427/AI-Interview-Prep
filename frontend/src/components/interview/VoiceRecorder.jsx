import { useEffect, useRef, useState } from "react";
import "./interview.css";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Square,
  AlertTriangle,
} from "lucide-react";

export default function VoiceRecorder({
  recording = false,
  language = "en-US",
  autoStop = false,
  autoStopSeconds = 60,
  onTranscriptChange,
  onTranscriptComplete,
  onRecordingChange,
}) {
  const recognitionRef = useRef(null);
  const stopTimerRef = useRef(null);
const transcriptRef = useRef("");
const interimRef = useRef("");
  const [supported, setSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  //--------------------------------------------------
  // Initialize SpeechRecognition
  //--------------------------------------------------

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
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      onRecordingChange?.(true);
    };
recognition.onend = () => {

    setIsListening(false);

    onRecordingChange?.(false);

    const answer = (
        transcriptRef.current +
        " " +
        interimRef.current
    ).trim();

    console.log("FINAL ANSWER:", answer);

    if (answer !== "") {

        onTranscriptComplete?.(answer);

    }

};
     

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
      onRecordingChange?.(false);
    };

     recognition.onresult = (event) => {

    let finalText = "";
    let interimText = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {

        const result = event.results[i];

        if (result.isFinal) {

            finalText += result[0].transcript + " ";

        } else {

            interimText += result[0].transcript;

        }

    }

    if (finalText) {

        transcriptRef.current += finalText;

        setTranscript(transcriptRef.current);

    }

    interimRef.current = interimText;

    setInterimTranscript(interimText);

    onTranscriptChange?.(
        transcriptRef.current+
        interimText
    );

};
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language]);

  //--------------------------------------------------
  // Start / Stop from parent
  //--------------------------------------------------

  useEffect(() => {
    if (!supported) return;

    if (recording) {
      setTranscript("");
      setInterimTranscript("");

      recognitionRef.current?.start();

      if (autoStop) {
        stopTimerRef.current = setTimeout(() => {
          stopRecording();
        }, autoStopSeconds * 1000);
      }
    } else {
      stopRecording();
    }

    return () => {
      clearTimeout(stopTimerRef.current);
    };
  }, [recording]);

  //--------------------------------------------------

  const stopRecording = () => {
    clearTimeout(stopTimerRef.current);

    recognitionRef.current?.stop();

    setIsListening(false);

    // onTranscriptComplete?.(
    //   transcript + " " + interimTranscript
    // );
  };

  //--------------------------------------------------

  if (!supported) {
    return (
      <div className="voice-recorder-card unsupported">

        <AlertTriangle size={50} />

        <h3>Speech Recognition Unsupported</h3>

        <p>
          Your browser does not support the Web Speech API.
          Please use Google Chrome or Microsoft Edge.
        </p>

      </div>
    );
  }

  //--------------------------------------------------
return(
  <div className="voice-recorder-card">

    <div className="voice-header">

    </div>

    <div className="voice-body">

        <motion.div className="microphone-button">

        </motion.div>

        <p className="voice-message">

            Listening to your answer...

        </p>

        <div className="voice-wave">

        </div>

    </div>

    <div className="voice-preview">

    </div>

    <div className="voice-controls">

    </div>

</div>
)
}