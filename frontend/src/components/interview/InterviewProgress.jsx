import "./interview.css";
import { CheckCircle2, Clock3, Flag, Target } from "lucide-react";

export default function InterviewProgress({
  currentQuestion = 1,
  totalQuestions = 5,
  elapsedTime = "00:00",
  currentPhase = "Speaking",
}) {
  const progress = (currentQuestion / totalQuestions) * 100;

  const phases = [
    "Speaking",
    "Prepare",
    "Recording",
    "Analysis",
    "Feedback",
  ];

  return (
    <div className="interview-progress-card">

      {/* Header */}

      <div className="interview-progress-header">

        <h3>Interview Progress</h3>

        <div className="progress-percent">
          {Math.round(progress)}%
        </div>

      </div>

      {/* Progress Bar */}

      <div className="interview-progress-bar">

        <div
          className="interview-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Statistics */}

      <div className="interview-progress-stats">

        <div className="progress-stat">

          <Target size={18} />

          <div>

            <span className="stat-label">
              Question
            </span>

            <strong>
              {currentQuestion} / {totalQuestions}
            </strong>

          </div>

        </div>

        <div className="progress-stat">

          <Clock3 size={18} />

          <div>

            <span className="stat-label">
              Elapsed
            </span>

            <strong>
              {elapsedTime}
            </strong>

          </div>

        </div>

      </div>

      {/* Current Phase */}

      <div className="phase-section">

        <div className="phase-title">
          <Flag size={18} />
          Current Stage
        </div>

        <div className="phase-list">

          {phases.map((phase) => {
            const active = phase === currentPhase;

            return (
              <div
                key={phase}
                className={`phase-item ${
                  active ? "active" : ""
                }`}
              >
                <CheckCircle2 size={16} />

                <span>{phase}</span>

              </div>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="interview-progress-footer">

        {currentQuestion < totalQuestions ? (
          <>
            Next Question: <strong>{currentQuestion + 1}</strong>
          </>
        ) : (
          <>
            <strong>Final Question</strong>
          </>
        )}

      </div>

    </div>
  );
}