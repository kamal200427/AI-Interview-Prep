import React from "react";
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import "./DashbordComponent.css";

const SubjectProgress = ({ subjects = [] }) => {
const navigate = useNavigate();
console.log(subjects);

  return (
    <Card
      title="Subject Progress"
      subtitle="Track your learning progress across all subjects"
      className="subject-progress-card"
    >
      <div className="subject-progress-list">
        {subjects.map((subject) => (
          <div
            className="subject-progress-item"
            key={subject.name}
          >
            {/* Left */}

            <div className="subject-progress-left">

              <div
                className={`subject-progress-icon ${subject.color}`}
              >
                <BookOpen size={22} />
              </div>

              <div className="subject-progress-info">

                <h3>{subject.name}</h3>

                <p>
                  {subject.completed} / {subject.total} Modules
                </p>

                <ProgressBar
                  value={subject.progress}
                  color={subject.progressColor}
                  showPercentage={false}
                />

              </div>

            </div>

            {/* Right */}

            <div className="subject-progress-right">

              <div className="subject-progress-percentage">
                {subject.progress}%
              </div>

              <div
                className={`subject-status ${subject.status.toLowerCase()}`}
              >
                {subject.status === "Completed" ? (
                  <CheckCircle size={15} />
                ) : (
                  <Clock size={15} />
                )}

                <span>{subject.status}</span>
              </div>

              <Button
          variant="outline"
          size="small"
          onClick={() =>
        navigate("/course", {
            state: {
                subject: subject.name,
            },
        })
    }
        >
    Continue
    <ArrowRight size={16} />
        </Button>
            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};

export default SubjectProgress;