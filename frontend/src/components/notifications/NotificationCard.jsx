import React from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  ClipboardCheck,
  Brain,
  Map,
  FileText,
  Award,
  Bell,
  Check,
  Clock,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  roadmap: <Map size={22} />,
  course: <BookOpen size={22} />,
  exam: <ClipboardCheck size={22} />,
  interview: <Brain size={22} />,
  resume: <FileText size={22} />,
  achievement: <Award size={22} />,
  certificate: <Award size={22} />,
};

const NotificationCard = ({
  notification,
  onMarkRead,
}) => {

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

    if (seconds < 172800)
      return "Yesterday";

    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const handleNavigate = () => {

    if (notification.route) {

      navigate(notification.route);

    }

  };

  return (

    <div
      className={
        notification.is_read
          ? "notification-card"
          : "notification-card unread"
      }
    >

      {/* Left */}

      <div
        className="notification-icon"
        onClick={handleNavigate}
      >

        {iconMap[notification.type] ||
          <Bell size={22} />}

      </div>

      {/* Middle */}

      <div
        className="notification-content"
        onClick={handleNavigate}
      >

        <h3>

          {notification.title}

        </h3>

        <p>

          {notification.message}

        </p>

        <div className="notification-time">

          <Clock size={14} />

          {formatTime(
            notification.created_at
          )}

        </div>

      </div>

      {/* Right */}

      <div className="notification-actions">

        {!notification.is_read && (

          <button

            className="mark-read-btn"

            onClick={() =>
              onMarkRead(notification.id)
            }

          >

            <Check size={16} />

            Mark Read

          </button>

        )}

        <ArrowRight
          size={18}
          className="notification-arrow"
        />

      </div>

    </div>

  );
};

export default NotificationCard;