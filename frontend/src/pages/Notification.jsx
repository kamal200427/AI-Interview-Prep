import { useEffect, useMemo, useState } from "react";
import {
  getAllNotifications,
  markAsRead,
  markAllRead,
} from "../services/NotificationApi";

import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationTabs from "../components/notifications/NotificationTabs";
import NotificationCard from "../components/notifications/NotificationCard";
import EmptyNotification from "../components/notifications/EmptyNotification";
import Sidebar from "../components/Sidebar";
import "../static/Notification.css";

const Notification = () => {
const user = JSON.parse(localStorage.getItem("user"));
const userId=user.email;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // ==========================================
  // Load Notifications
  // ==========================================

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await getAllNotifications(userId);

      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadNotifications();
    }
  }, [userId]);

  // ==========================================
  // Mark One Read
  // ==========================================

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_read: true }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // Mark All Read
  // ==========================================

  const handleMarkAllRead = async () => {
    try {
      await markAllRead(userId);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // Filter
  // ==========================================

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(
          (item) => !item.is_read
        );

      case "read":
        return notifications.filter(
          (item) => item.is_read
        );

      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  // ==========================================
  // Group By Date
  // ==========================================

  const groupedNotifications = useMemo(() => {
    const today = [];
    const yesterday = [];
    const older = [];

    const now = new Date();

    filteredNotifications.forEach((item) => {
      const date = new Date(item.created_at);

      const diff =
        (now - date) / (1000 * 60 * 60 * 24);

      if (diff < 1) {
        today.push(item);
      } else if (diff < 2) {
        yesterday.push(item);
      } else {
        older.push(item);
      }
    });

    return {
      today,
      yesterday,
      older,
    };
  }, [filteredNotifications]);

  // ==========================================
  // Loading
  // ==========================================

//   if (loading) {
//     return (
//       <div className="notification-loading">
//         Loading...
//       </div>
//     );
//   }

  return (
     <div className="app-shell">
    
                <Sidebar />
    
                <main className="app-main">
    <div className="notification-page">

      <NotificationHeader
        onMarkAllRead={handleMarkAllRead}
        notifications={notifications}
      />

      <NotificationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}

      />

      {filteredNotifications.length === 0 ? (
        <EmptyNotification />
      ) : (
        <>

          {groupedNotifications.today.length > 0 && (
            <>
              <h3 className="notification-group-title">
                Today
              </h3>

              {groupedNotifications.today.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                  onMarkRead={handleMarkRead}
                />
              ))}
            </>
          )}

          {groupedNotifications.yesterday.length >
            0 && (
            <>
              <h3 className="notification-group-title">
                Yesterday
              </h3>

              {groupedNotifications.yesterday.map(
                (item) => (
                  <NotificationCard
                    key={item.id}
                    notification={item}
                    onMarkRead={handleMarkRead}
                  />
                )
              )}
            </>
          )}

          {groupedNotifications.older.length > 0 && (
            <>
              <h3 className="notification-group-title">
                Older
              </h3>

              {groupedNotifications.older.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                  onMarkRead={handleMarkRead}
                />
              ))}
            </>
          )}

        </>
      )}
    </div>
    </main>
    </div>
  );
};

export default Notification;