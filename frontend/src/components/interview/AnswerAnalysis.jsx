import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Trophy,
  BrainCircuit,
  Mic,
  Smile,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnswerAnalysis({
  visible = false,
  analysis = null,
  nextQuestionIn = 30,
}) {
  if (!visible || !analysis) return null;

  const {
    overall_score = 0,
    technical_score = 0,
    communication_score = 0,
    confidence_score = 0,
    strengths = [],
    improvements = [],
    feedback = "",
  } = analysis;

  const getScoreColor = (score) => {
    if (score >= 85) return "#10b981";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const ScoreCard = ({ icon: Icon, title, value }) => (
    <motion.div
      className="analysis-score-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="analysis-score-icon"
        style={{
          background: `${getScoreColor(value)}20`,
          color: getScoreColor(value),
        }}
      >
        <Icon size={20} />
      </div>

      <div className="analysis-score-content">
        <span>{title}</span>

        <strong
          style={{
            color: getScoreColor(value),
          }}
        >
          {value}/100
        </strong>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="answer-analysis-card"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header */}

      <div className="analysis-header">
        <div className="analysis-title">
          <BrainCircuit size={22} />

          <h2>AI Answer Analysis</h2>
        </div>

        <div className="overall-score">
          <Trophy size={18} />

          Overall {overall_score}/100
        </div>
      </div>

      {/* Score Grid */}

      <div className="analysis-grid">
        <ScoreCard
          icon={BrainCircuit}
          title="Technical"
          value={technical_score}
        />

        <ScoreCard
          icon={Mic}
          title="Communication"
          value={communication_score}
        />

        <ScoreCard
          icon={Smile}
          title="Confidence"
          value={confidence_score}
        />
      </div>

      {/* Feedback */}

      <div className="analysis-feedback">
        <div className="section-title">
          <MessageSquare size={18} />

          AI Feedback
        </div>

        <p>{feedback}</p>
      </div>

      {/* Strengths */}

      <div className="analysis-section">
        <div className="section-title success">
          <CheckCircle2 size={18} />

          Strengths
        </div>

        {strengths.length === 0 ? (
          <p>No strengths returned.</p>
        ) : (
          <ul>
            {strengths.map((item, index) => (
              <li key={index}>
                <CheckCircle2 size={15} />

                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Improvements */}

      <div className="analysis-section">
        <div className="section-title warning">
          <AlertCircle size={18} />

          Areas for Improvement
        </div>

        {improvements.length === 0 ? (
          <p>No suggestions.</p>
        ) : (
          <ul>
            {improvements.map((item, index) => (
              <li key={index}>
                <AlertCircle size={15} />

                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Next Question */}

      <motion.div
        className="next-question-banner"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Next question starts in{" "}
        <strong>{nextQuestionIn}</strong> seconds...
      </motion.div>
    </motion.div>
  );
}