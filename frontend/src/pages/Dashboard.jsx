import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import Sidebar from "../components/Sidebar";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickActions from "../components/dashboard/QuickActions";
import KPICards from "../components/dashboard/KPICards";
import SubjectProgress from "../components/dashboard/SubjectProgress";
import RecentActivity from "../components/dashboard/RecentActivity";
import StrongSubjects from "../components/dashboard/StrongSubjects";
import WeakSubjects from "../components/dashboard/WeakSubjects";
import Statistics from "../components/dashboard/Statistics";

import dashboardData from "../data/dashboardData";
import { useEffect, useState } from "react";
import { getExamResults } from "../services/DashboardApi";
import { getCourseResources } from "../services/CourseModuleApi";
import {
    getNotificationCount,
    getLatestNotifications
} from "../services/NotificationApi";
import "../static/Dashboard.css";

const Dashboard = () => {
const dashboardRef = useRef(null);
const [shareOpen, setShareOpen] = useState(false);
const [strongSubjects, setStrongSubjects] = useState([]);
const [weakSubjects, setWeakSubjects] = useState([]);
const [continueLearningData, setContinueLearningData] = useState([]);
const [kpis, setKpis] = useState(dashboardData.kpis);
const [notificationCount, setNotificationCount] = useState(0);
const [latestNotifications, setLatestNotifications] = useState([]);
const [resourceData, setResourceData] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(true);
const [searchText, setSearchText] = useState("");


const user = JSON.parse(localStorage.getItem("user"));
console.log(user.email);

const userID=user.email;
const filteredSubjects = continueLearningData.filter(item =>
    item.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
);
const filteredNotifications = latestNotifications.filter(item => {

    const query = searchText.toLowerCase();

    return (
        item.title?.toLowerCase().includes(query) ||
        item.message?.toLowerCase().includes(query) ||
        item.type?.toLowerCase().includes(query)
    );

});

const filteredStrongSubjects = strongSubjects.filter(item =>
    item.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
);
const filteredWeakSubjects = weakSubjects.filter(item =>
    item.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
);
const filteredQuickActions = dashboardData.quickActions.filter(action =>
    action.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

    action.description
        .toLowerCase()
        .includes(searchText.toLowerCase())
);

const loadNotifications = async () => {

    if (!user?.email) return;

    try {

        const countResponse =
            await getNotificationCount(userID);
            console.log("Count API:", countResponse);

        setNotificationCount(countResponse.count);

        const latestResponse =
            await getLatestNotifications(userID);
        console.log("Latest API:", latestResponse);

        setLatestNotifications(latestResponse);

    }

    catch (error) {

        console.log(error);

    }

};
useEffect(() => {

    loadNotifications();

}, [userID]);
useEffect(() => {

    const loadDashboard = async () => {

        if (!user?.email) return;

        // Resources
        const resources = await getCourseResources(userID);
        setResourceData(resources);
        console.log(resources);
        
        // Exam Results
        const exams = await getExamResults(userID);
        console.log("First Exam Result API",exams);
        
        // Calculate completed resources
        let totalCompleted = 0;
        let totalResources = 0;

        Object.values(resources).forEach(subject => {

            const all = [
                ...(subject.youtube || []),
                ...(subject.pdf || [])
            ];

            totalResources += all.length;

            totalCompleted += all.filter(
                r => r.completion == 100
            ).length;

        });

        // Interview Readiness
        let readiness = 0;

        if (exams.length > 0) {

            const totalPercentage =
                exams.reduce((sum, exam) => {

                    return (
                        sum +
                        (exam.score /
                            exam.total_questions) *
                            100
                    );

                }, 0);

            readiness = Math.round(
                totalPercentage / exams.length
            );

        }

        const updated = dashboardData.kpis.map(card => {

            switch (card.id) {

                case 1:

                    return {

                        ...card,

                        value: totalCompleted,

                    };

                case 2:

                    return {

                        ...card,

                        value: `${readiness}%`,

                    };

                case 3:

                    return {

                        ...card,

                        value: exams.length,

                    };

                case 4:

                    return {

                        ...card,

                        value: "15 Days", // replace with backend later

                    };

                default:

                    return card;

            }

        });

        setKpis(updated);

    };

    loadDashboard();

}, []);
useEffect(() => {

    const loadResources = async () => {

        try {

            if (!user?.email) return;

            const data = await getCourseResources(userID);
             setResourceData(data);
            const colors = [
                {
                    color: "blue",
                    progressColor:
                        "linear-gradient(90deg,#3b82f6,#2563eb)",
                },
                {
                    color: "green",
                    progressColor:
                        "linear-gradient(90deg,#22c55e,#16a34a)",
                },
                {
                    color: "purple",
                    progressColor:
                        "linear-gradient(90deg,#8b5cf6,#7c3aed)",
                },
                {
                    color: "orange",
                    progressColor:
                        "linear-gradient(90deg,#f97316,#ea580c)",
                },
            ];

            const subjects = [];

            Object.entries(data).forEach(
                ([subject, resources], index) => {

                    const youtube =
                        resources.youtube || [];

                    const pdf =
                        resources.pdf || [];

                    const allResources = [
                        ...youtube,
                        ...pdf,
                    ];

                    const total =
                        allResources.length;

                    const completed =
                        allResources.filter(
                            (item) =>
                                item.completion == 100
                        ).length;

                    const progress =
                        total === 0
                            ? 0
                            : Math.round(
                                  (completed / total) *
                                      100
                              );

                    if (progress < 100) {

                        const theme =
                            colors[
                                index %
                                    colors.length
                            ];

                        subjects.push({
                            id: index + 1,

                            name: subject,

                            completed,

                            total,

                            progress,

                            color: theme.color,

                            progressColor:
                                theme.progressColor,

                            status:
                                progress >= 90
                                    ? "Completed"
                                    : "In Progress",
                        });
                    }
                }
            );

            subjects.sort(
                (a, b) =>
                    b.progress - a.progress
            );

            setContinueLearningData(subjects);

        } catch (err) {

            console.log(err);

        }
    };

    loadResources();

}, [user?.email]);

 useEffect(() => {
  const loadExamResults = async () => {
    try {
      if (!user?.email) return;
      
      const results = await getExamResults(userID);
        console.log("Last Exam Result API",results);
        
      const strong = [];
      const weak = [];

      const colors = [
        {
          icon: "bg-blue-600",
          progress: "linear-gradient(90deg,#2563eb,#3b82f6)",
        },
        {
          icon: "bg-emerald-500",
          progress: "linear-gradient(90deg,#22c55e,#4ade80)",
        },
        {
          icon: "bg-violet-600",
          progress: "linear-gradient(90deg,#7c3aed,#a855f7)",
        },
        {
          icon: "bg-orange-500",
          progress: "linear-gradient(90deg,#f97316,#fb923c)",
        },
      ];

      results.forEach((item, index) => {
        const percentage = Math.round(
          (item.score / item.total_questions) * 100
        );

        const color = colors[index % colors.length];

        const subject = {
          id: index + 1,
          name: item.subject,
          score: percentage,
          completed: item.score,
          total: item.total_questions,
          color: color.icon,
          progressColor: color.progress,
          rank: percentage >= 90 ? "Top 5%" : "Top 15%",
        };

        if (percentage >= 60) {
          strong.push(subject);
        } else {
          weak.push(subject);
        }
      });

      setStrongSubjects(strong);
      setWeakSubjects(weak);
    } catch (err) {
      console.error(err);
    }
  };

  loadExamResults();
}, [user?.email]);

const exportDashboard = async () => {
         

    if (!dashboardRef.current) return;
    try{

    const dataUrl = await htmlToImage.toPng(
        dashboardRef.current,
        {
            pixelRatio: 2,
            cacheBust: true
        }
    );

 
    const link = document.createElement("a");

    link.download = "SpeechX Dashboard.png";

    link.href = dataUrl;

    link.click();
}catch (error) {

        console.error(error);

    }
};
const copyLink = async () => {

    await navigator.clipboard.writeText(
        window.location.href
    );

    alert("Dashboard link copied!");
};

const shareTo = (platform) => {

    const url = encodeURIComponent(
        window.location.href
    );

    const text = encodeURIComponent(
        "Check my AI Interview Preparation Dashboard!"
    );

    switch (platform) {

        case "whatsapp":

            window.open(
                `https://wa.me/?text=${text}%20${url}`,
                "_blank"
            );

            break;

        case "facebook":

            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                "_blank"
            );

            break;

        case "linkedin":

            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                "_blank"
            );

            break;

        case "twitter":

            window.open(
                `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                "_blank"
            );

            break;

        default:

            break;
    }

};
const shareDashboard = async () => {

    const shareUrl = window.location.href;

    const shareData = {
        title: "SpeechX Dashboard",
        text: "Check out my AI Interview Preparation Dashboard.",
        url: shareUrl,
    };

    try {

        if (navigator.share) {

            await navigator.share(shareData);

        } else {

            await navigator.clipboard.writeText(shareUrl);

            alert("Dashboard link copied to clipboard.");

        }

    } catch (error) {

        console.log(error);

    }

};

  return (
    <div className="app-shell ">

      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="app-main " ref={dashboardRef}>

        <div     
 className="dashboard-container">

          {/* Header */}

          <DashboardHeader
            header={dashboardData.header}
            notificationCount={notificationCount}
            searchText={searchText}
            setSearchText={setSearchText}
                onExport={exportDashboard}
                onShare={() => setShareOpen(true)}

          />

          {/* Quick Actions */}

          <QuickActions
            actions={filteredQuickActions}
          />

          {/* KPI Cards */}

          <KPICards
            kpis={kpis}
          />

          {/* Middle Section */}

          <section className="dashboard-row dashboard-row-two">

            <div className="dashboard-left">

              <SubjectProgress
                     subjects={filteredSubjects}
              />

            </div>

            <div className="dashboard-right">

              <RecentActivity
                activities={filteredNotifications}
              />

            </div>

          </section>

          {/* Bottom Section */}

          <section className="dashboard-row dashboard-row-three">

            <div>

              <StrongSubjects
                subjects={filteredStrongSubjects}
              />

            </div>

            <div>

              <WeakSubjects
                subjects={filteredWeakSubjects}
              />

            </div>

            <div>

              <Statistics
                statistics={dashboardData.statistics}
              />

            </div>

          </section>

        </div>
        {shareOpen && (

<div className="share-overlay">

    <div className="share-modal">

        <h2>

            Share Dashboard

        </h2>

        <button
            onClick={() => shareTo("whatsapp")}
        >
            WhatsApp
        </button>

        <button
            onClick={() => shareTo("facebook")}
        >
            Facebook
        </button>

        <button
            onClick={() => shareTo("linkedin")}
        >
            LinkedIn
        </button>

        <button
            onClick={() => shareTo("twitter")}
        >
            X
        </button>

        <button
            onClick={copyLink}
        >
            Copy Link
        </button>

        <button
            className="close-share"
            onClick={() => setShareOpen(false)}
        >
            Close
        </button>

    </div>

</div>

)}

      </main>

    </div>
  );
};

export default Dashboard;