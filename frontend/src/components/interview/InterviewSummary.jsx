import { useNavigate } from "react-router-dom";
import "./interview.css";
import {
  Trophy,
  BrainCircuit,
  Mic,
  Smile,
  Clock3,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  LayoutDashboard,
  Download,
} from "lucide-react";

export default function InterviewSummary({
  report = {},
  onRetry,
  onDashboard,
  onDownload,
}) {
  if (!report) return null;

  const {
    overall_score = 0,
    technical_score = 0,
    communication_score = 0,
    confidence_score = 0,
    questions_answered = 0,
    total_questions = 5,
    duration = "--",
    recommendation = "",
    strengths = [],
    improvements = [],
    question_scores = [],
  } = report;

  const scoreColor = (score) => {
    if (score >= 85) return "#10b981";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const MetricCard = ({ icon: Icon, title, value }) => (
    <div className="summary-metric-card">
      <div
        className="summary-metric-icon"
        style={{
          background: `${scoreColor(value)}20`,
          color: scoreColor(value),
        }}
      >
        <Icon size={22} />
      </div>

      <div>
        <div className="summary-label">{title}</div>
        <div
          className="summary-value"
          style={{ color: scoreColor(value) }}
        >
          {value}/100
        </div>
      </div>
    </div>
  );

  return (
    <div className="interview-summary-card">

      {/* Header */}

      <div className="summary-header">

        <div className="summary-trophy">
          <Trophy size={55} />
        </div>

        <h2>Interview Completed</h2>

        <p>
          Congratulations! Your AI interview has been completed.
        </p>

        <div
          className="overall-score-badge"
          style={{
            background: `${scoreColor(overall_score)}20`,
            color: scoreColor(overall_score),
          }}
        >
          Overall Score : {overall_score}/100
        </div>

      </div>

      {/* Metrics */}

      <div className="summary-metrics">

        <MetricCard
          icon={BrainCircuit}
          title="Technical"
          value={technical_score}
        />

        <MetricCard
          icon={Mic}
          title="Communication"
          value={communication_score}
        />

        <MetricCard
          icon={Smile}
          title="Confidence"
          value={confidence_score}
        />

      </div>

      {/* Interview Info */}

      <div className="summary-info">

        <div>

          <Clock3 size={18} />

          Duration

          <strong>{duration}</strong>

        </div>

        <div>

          <CheckCircle2 size={18} />

          Questions

          <strong>
            {questions_answered}/{total_questions}
          </strong>

        </div>

      </div>

      {/* Question Scores */}

      <div className="summary-section">

        <h3>Question-wise Scores</h3>

        <div className="question-score-list">

          {question_scores.map((item) => (

            <div
              key={item.question}
              className="question-score-item"
            >

              <span>
                Question {item.question}
              </span>

              <strong
                style={{
                  color: scoreColor(item.score),
                }}
              >
                {item.score}/100
              </strong>

            </div>

          ))}

        </div>

      </div>

      {/* Strengths */}

      <div className="summary-section">

        <h3>
          <CheckCircle2 size={18} />
          Strengths
        </h3>

        <ul>

          {strengths.map((item, index) => (

            <li key={index}>
              <CheckCircle2 size={15} />
              {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Improvements */}

      <div className="summary-section">

        <h3>
          <AlertCircle size={18} />
          Areas for Improvement
        </h3>

        <ul>

          {improvements.map((item, index) => (

            <li key={index}>
              <AlertCircle size={15} />
              {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Recommendation */}

      <div className="summary-recommendation">

        <h3>AI Recommendation</h3>

        <p>{recommendation}</p>

      </div>

      {/* Buttons */}

      <div className="summary-actions">

        <button
          className="summary-btn primary"
          onClick={onRetry}
        >
          <RotateCcw size={18} />
          Retry Interview
        </button>

        <button
          className="summary-btn secondary"
          onClick={onDownload}
        >
          <Download size={18} />
          Download Report
        </button>

        <button
          className="summary-btn outline"
          onClick={onDashboard}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

      </div>

    </div>
  );
}