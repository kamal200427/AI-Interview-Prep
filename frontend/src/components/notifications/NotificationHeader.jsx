import { Bell, CheckCheck } from "lucide-react";

const NotificationHeader = ({
  notifications = [],
  onMarkAllRead,
}) => {

  const unreadCount = notifications.filter(
    (item) => !item.is_read
  ).length;

  return (
    <div className="notification-header">

      <div className="notification-header-left">

        <div className="notification-title-wrapper">

          <Bell
            size={28}
            className="notification-header-icon"
          />

          <div>

            <h1 className="notification-title">
              Notifications
            </h1>

            <p className="notification-subtitle">

              {unreadCount} Unread Notification
              {unreadCount !== 1 ? "s" : ""}

            </p>

          </div>

        </div>

      </div>

      <button
        className="mark-all-read-btn"
        onClick={onMarkAllRead}
        disabled={unreadCount === 0}
      >

        <CheckCheck size={18} />

        Mark All Read

      </button>

    </div>
  );
};

export default NotificationHeader;