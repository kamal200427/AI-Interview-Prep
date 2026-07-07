import React from "react";
import { Trophy, TrendingUp, Star } from "lucide-react";

import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import "./DashbordComponent.css";

const StrongSubjects = ({ subjects = [] }) => {
  return (
    <Card
      title="Strong Subjects"
      subtitle="Your best performing subjects"
      icon={<Trophy size={22} />}
      className="strong-subjects-card"
    >
      <div className="subjects-list">
        {
        subjects.length === 0 ? (
    <div className="py-8 text-center text-slate-500">
      No strong subjects yet.
    </div>
  ) :subjects.map((subject) => (
          <div
            className="subject-item"
            key={subject.id}
          >
            <div className="subject-header">

              <div className="subject-info">

                <div
                  className={`subject-icon ${subject.color}`}
                >
                  <Star size={16} />
                </div>

                <div>

                  <h4>{subject.name}</h4>

                  {/* <p>
                    {subject.completed} Modules Completed
                  </p> */}

                </div>

              </div>

              <div className="subject-score">
                {subject.score}%
              </div>

            </div>

            <ProgressBar
              value={subject.score}
              color={subject.progressColor}
              showPercentage={false}
            />

            <div className="subject-footer">

              <span className="subject-rank">
                <TrendingUp size={14} />
                {subject.rank}
              </span>

              <span className="subject-status">
                Excellent
              </span>

            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};

export default StrongSubjects;