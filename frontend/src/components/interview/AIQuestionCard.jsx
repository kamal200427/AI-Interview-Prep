import { Clock, FileQuestion, Sparkles } from "lucide-react";

export default function AIQuestionCard({
  questionNumber = 1,
  totalQuestions = 5,
  question = "",
  category = "Technical",
  difficulty = "Medium",
  countdown = 10,
  phase = "prepare",
}) {
  const getStatus = () => {
    switch (phase) {
      case "prepare":
        return {
          title: "Prepare Your Answer",
          description: "Think before answering. Recording will begin automatically.",
          color: "#3b82f6",
        };

      case "recording":
        return {
          title: "Your Turn",
          description: "Speak naturally. Your answer is being recorded.",
          color: "#10b981",
        };

      case "thinking":
        return {
          title: "AI is Analyzing",
          description: "Evaluating your answer...",
          color: "#f59e0b",
        };

      case "feedback":
        return {
          title: "Feedback",
          description: "Review your performance before the next question.",
          color: "#8b5cf6",
        };

      default:
        return {
          title: "Interview",
          description: "",
          color: "#64748b",
        };
    }
  };

  const status = getStatus();

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="ai-question-card">
      {/* Header */}

      <div className="question-header">
        <div>
          <h3>Interview Question</h3>

          <p>
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>

        <div className="difficulty-badge">
          {difficulty}
        </div>
      </div>

      {/* Progress */}

      <div className="progress-wrapper">

        <div className="progress-top">

          <span>Progress</span>

          <span>{Math.round(progress)}%</span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Category */}

      <div className="category-row">

        <Sparkles size={16} />

        <span>{category}</span>

      </div>

      {/* Question */}

      <div className="question-box">

        <div className="question-icon">

          <FileQuestion size={26} />

        </div>

        <div className="question-content">

          <div className="question-label">
            AI Interview Question
          </div>

          <div className="question-text">
            {question}
          </div>

        </div>

      </div>

      {/* Status */}

      <div
        className="phase-card"
        style={{
          borderColor: status.color,
        }}
      >
        <h4
          style={{
            color: status.color,
          }}
        >
          {status.title}
        </h4>

        <p>{status.description}</p>
      </div>

      {/* Countdown */}

      {(phase === "prepare" || phase === "recording") && (
        <div className="countdown-section">

          <div className="countdown-icon">

            <Clock size={20} />

          </div>

          <div>

            <div className="countdown-title">

              {phase === "prepare"
                ? "Recording starts in"
                : "Time Remaining"}

            </div>

            <div className="countdown-number">

              {countdown}s

            </div>

          </div>

        </div>
      )}
    </div>
  );
}