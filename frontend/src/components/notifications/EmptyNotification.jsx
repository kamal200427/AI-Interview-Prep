import React from "react";
import { BellOff, BookOpen, ClipboardCheck, Map } from "lucide-react";

const EmptyNotification = () => {
  return (
    <div className="empty-notification">

      <div className="empty-icon">
        <BellOff size={70} />
      </div>

      <h2>No Notifications Yet</h2>

      <p>
        Your recent activities will appear here.
        Start learning and completing tasks to
        receive notifications.
      </p>

      <div className="empty-tips">

        <div className="empty-tip">
          <Map size={18} />
          <span>Create your roadmap</span>
        </div>

        <div className="empty-tip">
          <BookOpen size={18} />
          <span>Complete learning modules</span>
        </div>

        <div className="empty-tip">
          <ClipboardCheck size={18} />
          <span>Take Moodle tests</span>
        </div>

      </div>

    </div>
  );
};

export default EmptyNotification;