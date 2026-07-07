import React from "react";

const NotificationTabs = ({
  activeTab,
  setActiveTab,
  notifications = [],
}) => {

  const totalCount = notifications.length;

  const unreadCount = notifications.filter(
    (item) => !item.is_read
  ).length;

  const readCount = notifications.filter(
    (item) => item.is_read
  ).length;

  return (
    <div className="notification-tabs">

      <button
        className={
          activeTab === "all"
            ? "notification-tab active"
            : "notification-tab"
        }
        onClick={() => setActiveTab("all")}
      >
        All
        <span>{totalCount}</span>
      </button>

      <button
        className={
          activeTab === "unread"
            ? "notification-tab active"
            : "notification-tab"
        }
        onClick={() => setActiveTab("unread")}
      >
        Unread
        <span>{unreadCount}</span>
      </button>

      <button
        className={
          activeTab === "read"
            ? "notification-tab active"
            : "notification-tab"
        }
        onClick={() => setActiveTab("read")}
      >
        Read
        <span>{readCount}</span>
      </button>

    </div>
  );
};

export default NotificationTabs;