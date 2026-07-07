import React from "react";
import {
  AlertTriangle,
  TrendingDown,
  BookOpen,
} from "lucide-react";

import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import "./DashbordComponent.css";

const WeakSubjects = ({ subjects = [] }) => {
  return (
    <Card
      title="Weak Subjects"
      subtitle="Subjects that need more attention"
      icon={<AlertTriangle size={22} />}
      className="weak-subjects-card"
    >
      <div className="subjects-list">
        {
        subjects.length === 0 ? (
    <div className="py-8 text-center text-slate-500">
      No strong subjects yet.
    </div>
  ) :subjects.map((subject) => (
          <div
            className="subject-item weak"
            key={subject.id}
          >
            <div className="subject-header">

              <div className="subject-info">

                <div
                  className={`subject-icon ${subject.color}`}
                >
                  <BookOpen size={16} />
                </div>

                <div>

                  <h4>{subject.name}</h4>

                  {/* <p>
                    {subject.completed} Modules Completed
                  </p> */}

                </div>

              </div>

              <div className="subject-score weak-score">
                {subject.score}%
              </div>

            </div>

            <ProgressBar
              value={subject.score}
              color={subject.progressColor}
              showPercentage={false}
            />

            <div className="subject-footer">

              <span className="subject-rank weak-rank">
                <TrendingDown size={14} />
                {subject.rank}
              </span>

              <span className="subject-status weak-status">
                Needs Practice
              </span>

            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeakSubjects;