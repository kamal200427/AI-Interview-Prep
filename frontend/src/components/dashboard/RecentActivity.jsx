import React from "react";
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  CheckCircle,
  Map,
  FileText,
  Award,
  Bell,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


import Card from "../common/Card";
import "./DashbordComponent.css";

const iconMap = {
  roadmap: <Map size={18} />,
  course: <BookOpen size={18} />,
  exam: <ClipboardCheck size={18} />,
  interview: <Brain size={18} />,
  resume: <FileText size={18} />,
  achievement: <Award size={18} />,
  certificate: <Award size={18} />,
  notification: <Bell size={18} />,
};
const RecentActivity = ({ activities = [] }) => {
const navigate = useNavigate();

  const formatTime = (date) => {

  const seconds =
    (new Date() - new Date(date)) / 1000;

  if (seconds < 60)
    return "Just now";

  if (seconds < 3600)
    return `${Math.floor(seconds / 60)} min ago`;

  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)} hr ago`;

  return `${Math.floor(seconds / 86400)} day ago`;
};
  return (
    <Card
      title="Recent Activity"
      subtitle="Your latest learning activities"
      className="recent-activity-card"
    >
      <div className="recent-activity-list">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-item"
                onClick={() => navigate(activity.route)}
          >
            <div className={`activity-icon ${activity.color}`}>
          {iconMap[activity.type] || <Bell size={18} />}           
           </div>

            <div className="activity-content">
              <h4>{activity.title}</h4>

              <p>{activity.message}</p>

              <div className="activity-time">
                <Clock size={14} />
                    {formatTime(activity.created_at)}
               </div>
            </div>

            <ArrowRight
              size={18}
              className="activity-arrow"
            />
            
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;