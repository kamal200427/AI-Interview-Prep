import React from "react";
import {
  TrendingUp,
  Award,
  Target,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import Card from "../common/Card";
import "./DashbordComponent.css";

const iconMap = {
  accuracy: <Target size={22} />,
  score: <Award size={22} />,
  hours: <Clock size={22} />,
  growth: <TrendingUp size={22} />,
};

const Statistics = ({ statistics = [] }) => {
  return (
    <Card
      title="Statistics"
      subtitle="Overall learning performance"
      className="statistics-card"
    >
      <div className="statistics-grid">
        {statistics.map((item) => (
          <div
            className="statistics-item"
            key={item.id}
          >
            <div className="statistics-top">

              <div
                className={`statistics-icon ${item.color}`}
              >
                {iconMap[item.icon]}
              </div>

              <div className="statistics-trend">
                <ArrowUpRight size={14} />
                {item.change}
              </div>

            </div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

            <div className="statistics-progress">
              <div
                className={`statistics-progress-fill ${item.color}`}
                style={{
                  width: `${item.progress}%`,
                }}
              ></div>
            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};

export default Statistics;