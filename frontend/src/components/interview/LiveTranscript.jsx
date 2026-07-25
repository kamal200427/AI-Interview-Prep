import "./interview.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  FileText,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

export default function LiveTranscript({
  transcript = "",
  isRecording = false,
  isProcessing = false,
  interimTranscript = "",
}) {
  const fullTranscript =
    transcript +
    (interimTranscript
      ? " " + interimTranscript
      : "");

  return (
    <div className="live-transcript-card">

      {/* Header */}

      <div className="transcript-header">

        <div className="transcript-title">

          <FileText size={20} />

          <h3>Live Transcript</h3>

        </div>

        <div
          className={`transcript-status ${
            isRecording
              ? "recording"
              : isProcessing
              ? "processing"
              : "finished"
          }`}
        >
          {isRecording ? (
            <>
              <Mic size={15} />

              Recording
            </>
          ) : isProcessing ? (
            <>
              <LoaderCircle
                size={15}
                className="spin"
              />

              Processing
            </>
          ) : (
            <>
              <CheckCircle2 size={15} />

              Completed
            </>
          )}
        </div>

      </div>

      {/* Recording Indicator */}

      {isRecording && (
        <motion.div
          className="recording-indicator"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
        >
          <span className="record-dot" />

          Listening...

        </motion.div>
      )}

      {/* Transcript Box */}
      <div className="transcript-container">
      <div className="transcript-body">

        <AnimatePresence mode="wait">

          {fullTranscript ? (
            <motion.p
              key={fullTranscript}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="transcript-text"
            >
              {transcript}

              {interimTranscript && (
                <span className="interim-text">
                  {" "}
                  {interimTranscript}
                </span>
              )}
            </motion.p>
          ) : (
            <motion.div
              className="empty-transcript"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              {isRecording ? (
                <>
                  <Mic size={45} />

                  <p>
                    Start speaking...
                  </p>
                </>
              ) : (
                <>
                  <MicOff size={45} />

                  <p>
                    Transcript will appear here.
                  </p>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>

      </div>
</div>
      {/* Footer */}

      <div className="transcript-footer">

        <div>

          Characters

          <strong>
            {fullTranscript.length}
          </strong>

        </div>

        <div>

          Words

          <strong>
            {fullTranscript.trim()
              ? fullTranscript
                  .trim()
                  .split(/\s+/).length
              : 0}
          </strong>

        </div>

      </div>

    </div>
  );
}