// ============================================
// SpeechManager.js
// Professional Speech Synthesis Utility
// ============================================

class SpeechManager {

    constructor() {

        this.synth = window.speechSynthesis;

        this.voices = [];

        this.currentUtterance = null;

        this.initialized = false;

    }

    // ==========================================
    // Load Available Voices
    // ==========================================

    async init() {

        if (this.initialized) return;

        await new Promise((resolve) => {

            const loadVoices = () => {

                this.voices = this.synth.getVoices();

                if (this.voices.length > 0) {

                    this.initialized = true;

                    resolve();

                }

            };

            loadVoices();

            if (!this.voices.length) {

                window.speechSynthesis.onvoiceschanged = loadVoices;

            }

        });

    }

    // ==========================================
    // Select Best English Voice
    // ==========================================

    getBestVoice() {

        if (!this.voices.length) return null;

        return (

            this.voices.find(

                voice =>

                    voice.lang === "en-US" &&

                    voice.name.toLowerCase().includes("google")

            )

            ||

            this.voices.find(

                voice =>

                    voice.lang === "en-US"

            )

            ||

            this.voices.find(

                voice =>

                    voice.lang.startsWith("en")

            )

            ||

            this.voices[0]

        );

    }

    // ==========================================
    // Speak Text
    // ==========================================

    async speak(

        text,

        {

            rate = 0.95,

            pitch = 1,

            volume = 1,

            onStart,

            onEnd,

            onError,

            onBoundary,

        } = {}

    ) {

        if (!text) return;

        await this.init();

        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = rate;

        utterance.pitch = pitch;

        utterance.volume = volume;

        const voice = this.getBestVoice();

        if (voice) {

            utterance.voice = voice;

        }

        utterance.onstart = () => {

            onStart?.();

        };

        utterance.onend = () => {

            this.currentUtterance = null;

            onEnd?.();

        };

        utterance.onerror = (event) => {

            this.currentUtterance = null;

            onError?.(event);

        };

        utterance.onboundary = (event) => {

            onBoundary?.(event);

        };

        this.currentUtterance = utterance;

        this.synth.speak(utterance);

    }

    // ==========================================
    // Stop Speaking
    // ==========================================

    stop() {

        if (this.synth.speaking) {

            this.synth.cancel();

        }

        this.currentUtterance = null;

    }

    // ==========================================
    // Pause
    // ==========================================

    pause() {

        if (this.synth.speaking) {

            this.synth.pause();

        }

    }

    // ==========================================
    // Resume
    // ==========================================

    resume() {

        if (this.synth.paused) {

            this.synth.resume();

        }

    }

    // ==========================================
    // Status
    // ==========================================

    isSpeaking() {

        return this.synth.speaking;

    }

    isPaused() {

        return this.synth.paused;

    }

    // ==========================================
    // Cleanup
    // ==========================================

    destroy() {

        this.stop();

        window.speechSynthesis.onvoiceschanged = null;

    }

}

// Singleton Instance

const speechManager = new SpeechManager();

export default speechManager;