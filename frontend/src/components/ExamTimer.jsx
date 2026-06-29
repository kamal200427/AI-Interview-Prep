import { Clock } from "lucide-react";
import "../static/ExamTimer.css";

export default function ExamTimer({ timeLeft }) {

  const formatTime = (seconds) => {

    const minutes =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${minutes}:${
      secs < 10
        ? "0" + secs
        : secs
    }`;

  };

  const isWarning =
    timeLeft <= 300;

  return (

    <div
      className={`exam-timer ${
        isWarning
          ? "warning"
          : ""
      }`}
    >

      <Clock size={20} />

      <div>

        <span className="timer-label">

          Time Remaining

        </span>

        <h2>

          {formatTime(timeLeft)}

        </h2>

      </div>

    </div>

  );

}