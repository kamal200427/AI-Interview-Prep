import { useEffect, useMemo, useState } from "react";

import speechManager from "./SpeechManager";
import AvatarCamera from "./AvatarCamera";
import AvatarStatus from "./AvatarStatus";
import AudioVisualizer from "./AudioVisualizer";

import "./AIAvatar.css";

export default function AIAvatar({

    status = "idle",

    questionText = "",

    userTranscript = "",

    onSpeechEnd,

}) {

    //------------------------------------------
    // Avatar Expression
    //------------------------------------------

    const expression = useMemo(() => {

        switch (status) {

            case "speaking":
                return "happy";
            case "recording":
                return "neutral";
            case "thinking":
                return "thinking";
            case "prepare":
                return "thinking";
            case "listening":
                return "neutral";

            default:
                return "neutral";
        }

    }, [status]);

    //------------------------------------------
    // Avatar Animation States
    //------------------------------------------

    const [speaking, setSpeaking] = useState(false);

    const [listening, setListening] = useState(false);

    const [thinking, setThinking] = useState(false);

    //------------------------------------------
    // Update Animation States
    //------------------------------------------

    useEffect(() => {

        setSpeaking(status === "speaking");

        setListening(status === "recording");

        setThinking(status === "prepare"||status==="thinking");

    }, [status]);

    //------------------------------------------
    // Speak Interview Question
    //------------------------------------------

    useEffect(() => {

        if (status !== "speaking") {

            speechManager.stop();

            return;

        }

        if (!questionText?.trim()) return;
const timer = setTimeout(() => {
        speechManager.speak(questionText, {

            rate: 0.95,

            pitch: 1,

            volume: 1,

            onStart: () => {

                setSpeaking(true);

            },

            onEnd: () => {

                setSpeaking(false);

                onSpeechEnd?.();

            },

            onError: () => {

                setSpeaking(false);

                onSpeechEnd?.();

            },

        });
    },300);

        return () => {
                clearTimeout(timer);
            speechManager.stop();

        };

    }, [

        status,

        questionText,

        onSpeechEnd,

    ]);

    //------------------------------------------
    // Cleanup
    //------------------------------------------

    useEffect(() => {

        return () => {

            speechManager.destroy();

        };

    }, []);
        //------------------------------------------
    // Render
    //------------------------------------------

    return (

        <div className="ai-avatar-container">

            {/* Status Badge */}

            <AvatarStatus

                status={status}

            />

            {/* Camera + Avatar */}

            <AvatarCamera

                status={status}

                expression={expression}

                speaking={speaking}

                listening={listening}

                thinking={thinking}

            />

            {/* Audio Visualizer */}

            <AudioVisualizer

                status={status}

            />

            {/* Live Transcript */}

            <div className="avatar-transcript">

                <div className="transcript-header">

                    <span className="transcript-dot" />

                    <span>

                        {status === "recording"
                            ? "Listening..."
                            : status === "thinking"
                            ? "Analyzing..."
                            : status === "speaking"
                            ? "Speaking..."
                            : "Ready"}

                    </span>

                </div>

                <div className="transcript-body">

                    {status === "thinking" ? (

                        <div className="thinking-loader">

                            <span />

                            <span />

                            <span />

                        </div>

                    ) : (

                        <p>

                            {userTranscript?.trim()

                                ? userTranscript

                                : status === "speaking"

                                ? questionText

                                : "Waiting for response..."}

                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}