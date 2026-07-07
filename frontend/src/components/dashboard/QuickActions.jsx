import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ClipboardCheck,
  Brain,
  MessageSquare,
  Code2,
  FileText,
  ArrowRight,
} from "lucide-react";

import Card from "../common/Card";
import "./DashbordComponent.css";

const iconMap = {
  learn: <BookOpen size={28} />,
  exam: <ClipboardCheck size={28} />,
  interview: <Brain size={28} />,
  ai: <MessageSquare size={28} />,
  coding: <Code2 size={28} />,
  resume: <FileText size={28} />,
};

const QuickActions = ({ actions = [] }) => {
  const navigate = useNavigate();

  return (
    <Card
      title="Quick Actions"
      subtitle="Continue your interview preparation"
      className="quick-actions-card"
    >
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <div
            key={action.id}
            className="quick-action-item"
            onClick={() => navigate(action.path)}
          >
            <div className={`quick-action-icon ${action.color}`}>
              {iconMap[action.icon]}
            </div>

            <div className="quick-action-content">
              <h3>{action.title}</h3>

              <p>{action.description}</p>
            </div>

            <ArrowRight
              size={18}
              className="quick-action-arrow"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;