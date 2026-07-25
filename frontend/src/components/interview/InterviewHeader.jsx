import "./interview.css";
import {
  Bot,
  Briefcase,
  Gauge,
  Clock3,
} from "lucide-react";

export default function InterviewHeader({
  interviewConfig,
  currentQuestion = 1,
  totalQuestions = 5,
}) {

  const progress =
    (currentQuestion / totalQuestions) * 100;

  return (

    <header className="interview-header">

      {/* Left */}

      <div className="header-left">

        <div className="header-logo">

          <Bot size={28} />

        </div>

        <div>

          <h2>AI Mock Interview</h2>

          <p>
            Professional AI Interview Platform
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="header-right">

        <div className="header-chip">

          <Briefcase size={15}/>

          {interviewConfig.role}

        </div>

        <div className="header-chip">

          <Bot size={15}/>

          {interviewConfig.mode}

        </div>

        <div className="header-chip">

          <Gauge size={15}/>

          {interviewConfig.difficulty}

        </div>

        <div className="header-chip">

          <Clock3 size={15}/>

          {interviewConfig.duration || 15} min

        </div>

      </div>

      {/* Bottom */}

      <div className="header-bottom">

        <div>

          Question

          <strong>

            {currentQuestion}/{totalQuestions}

          </strong>

        </div>

        <div>

          {Math.round(progress)}%

        </div>

      </div>

      <div className="header-progress">

        <div

          className="header-progress-fill"

          style={{

            width:`${progress}%`

          }}

        />

      </div>

    </header>

  );

}