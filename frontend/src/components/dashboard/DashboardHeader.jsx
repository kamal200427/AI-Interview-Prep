import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Bell,
  Download,
  Share2,
  Search,
} from "lucide-react";

import Button from "../common/Button";
import "./DashbordComponent.css";
import { useNavigate } from "react-router-dom";
import { getNotificationCount } from "../../services/NotificationApi";

const DashboardHeader = ({ 
  header,
  searchText,
    setSearchText,
  onExport,
    onShare }) => {
  const today = new Date();
const [notificationCount, setNotificationCount] = useState(0);

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const loadNotificationCount = async () => {
    try {

        const response = await getNotificationCount(user.email);

        setNotificationCount(response.count);

    } catch (error) {

        console.error(error);

    }
};

useEffect(() => {

    if (user) {

        loadNotificationCount();

    }

}, [user]);
  return (
    <header className="dashboard-header">

      {/* Left Section */}
      <div className="dashboard-header-left">

        <div className="dashboard-title-group">
          <h1 className="dashboard-title">
            {header?.title || "Dashboard"}
          </h1>

          <p className="dashboard-subtitle">
            {header?.subtitle ||
              "Track your interview preparation and learning progress."}
          </p>
        </div>

      </div>

      {/* Right Section */}

      <div className="dashboard-header-right">

        {/* Search */}

        <div className="dashboard-search">

          <Search size={18} />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}

            placeholder="Search..."
          />
          {searchText && (

        <button
            className="search-clear"
            onClick={() =>
                setSearchText("")
            }
        >
            ✕
        </button>

    )}
        </div>

        {/* Date */}

        <div className="dashboard-date">

          <CalendarDays size={18} />

          <span>{formattedDate}</span>

        </div>

        {/* Notification */}

        <div
    className="notification-bell"
    onClick={() => navigate("/notifications")}
>

    <Bell size={22} />

    {notificationCount > 0 && (

        <span className="notification-badge">

            {notificationCount}

        </span>

    )}

</div>

        {/* Export */}

        <Button
            className="dashboard-export-btn"
          variant="secondary"
          icon={<Download size={18} />}
              onClick={onExport}

        >
          Export
        </Button>

        {/* Share */}

        <Button
            className="dashboard-share-btn"
          variant="primary"
          icon={<Share2 size={18} />}
              onClick={onShare}

        >
          Share
        </Button>

      </div>

    </header>
  );
};

export default DashboardHeader;