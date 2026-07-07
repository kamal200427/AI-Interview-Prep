import React from "react";
import {
  BookOpen,
  Target,
  Trophy,
  Flame,
  ArrowUpRight,
} from "lucide-react";

import Card from "../common/Card";
import "./DashbordComponent.css";
const iconMap = {
  study: <BookOpen size={24} />,
  target: <Target size={24} />,
  trophy: <Trophy size={24} />,
  streak: <Flame size={24} />,
};

const KPICards = ({ kpis = [] }) => {
  return (
    <section className="kpi-section">
      <div className="kpi-grid">
        {kpis.map((item) => (
          <Card
            key={item.id}
            className="kpi-card"
          >
            <div className="kpi-top">

              <div
                className={`kpi-icon ${item.color}`}
              >
                {iconMap[item.icon]}
              </div>

              <div className="kpi-trend">
                <ArrowUpRight size={16} />
                <span>{item.change}</span>
              </div>

            </div>

            <div className="kpi-body">

              <h2 className="kpi-value">
                {item.value}
              </h2>

              <p className="kpi-title">
                {item.title}
              </p>

              <p className="kpi-description">
                {item.description}
              </p>

            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default KPICards;