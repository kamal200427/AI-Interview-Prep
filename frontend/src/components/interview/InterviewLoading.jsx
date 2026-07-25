import "./interview.css";
import { motion } from "framer-motion";
import { Bot, BrainCircuit, LoaderCircle } from "lucide-react";

const LOADING_MESSAGES = {
  starting: {
    title: "Preparing Your Interview",
    description:
      "Our AI interviewer is setting up your personalized interview session.",
  },

  generating: {
    title: "Generating Question",
    description:
      "Creating the next interview question based on your selected profession.",
  },

  analyzing: {
    title: "Analyzing Your Answer",
    description:
      "The AI is evaluating your technical knowledge, communication skills, and confidence.",
  },

  report: {
    title: "Preparing Final Report",
    description:
      "Generating your interview summary and personalized feedback.",
  },
};

export default function InterviewLoading({
  type = "starting",
}) {
  const loading = LOADING_MESSAGES[type] || LOADING_MESSAGES.starting;

  return (
    <motion.div
      className="interview-loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="interview-loading-card"
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {/* AI Avatar */}

        <motion.div
          className="loading-avatar"
          animate={{
            rotate: [0, 6, -6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <Bot size={70} />
        </motion.div>

        {/* Spinner */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        >
          <LoaderCircle
            size={34}
            className="loading-spinner"
          />
        </motion.div>

        {/* Title */}

        <h2 className="loading-title">
          {loading.title}
        </h2>

        {/* Description */}

        <p className="loading-description">
          {loading.description}
        </p>

        {/* Animated Dots */}

        <div className="loading-dots">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: 0,
            }}
          />

          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: 0.2,
            }}
          />

          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: 0.4,
            }}
          />
        </div>

        {/* Processing Steps */}

        <div className="loading-steps">

          <div className="loading-step">
            <BrainCircuit size={18} />
            AI Processing
          </div>

          <div className="loading-step">
            <LoaderCircle size={18} />
            Please Wait
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}