import { useEffect, useState } from "react";
import FloatingAIBot from "../components/FloatingAIBot.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Gauge,
  Flag,
  Users
} from "lucide-react";

import { getRoadmap,getSavedRoadmap } from "../services/RoadmapApi";
import "../static/Roadmap.css"

const info = [
  {
    icon: <Gauge size={18} />,
    t: "Learning Velocity",
    d: "You're progressing faster than average learners.",
  },
  {
    icon: <Flag size={18} />,
    t: "Next Milestone",
    d: "Complete your current subject to unlock the next one.",
  },
  {
    icon: <Users size={18} />,
    t: "Community",
    d: "Connect with other learners following this roadmap.",
  },
];

const professionOptions = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "Mobile App Developer",
  "Not In List",
];

export default function Roadmaps() {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] =
    useState("");

  const [customProfession, setCustomProfession] =
    useState("");

  const [showCustomInput, setShowCustomInput] =
    useState(false);

  const [nodes, setNodes] = useState([]);


  const generateRoadmap = async (
    profession
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const data = await getRoadmap(
        user.email,
        profession
      );
      console.log("FULL RESPONSE:", data);
      console.log("TYPE:", typeof data);
      console.log("IS ARRAY:", Array.isArray(data));
      
      const subjects =
  data.subjects || [];

      setNodes(
        subjects.map(
          (subject, index) => ({
            t: subject,

            s:
              index === 0
                ? "In Progress"
                : "Locked",

            state:
              index === 0
                ? "active"
                : "locked",

            icon: (
              <Code2 size={24} />
            ),
          })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfessionChange =
    async (e) => {
      const profession =
        e.target.value;

      setSelectedProfession(
        profession
      );

      if (
        profession ===
        "Not In List"
      ) {
        setShowCustomInput(true);
        return;
      }

      setShowCustomInput(false);

      await generateRoadmap(
        profession
      );
    };

  const handleCustomProfession =
    async () => {
      if (
        !customProfession.trim()
      )
        return;

      setSelectedProfession(
        customProfession
      );

      await generateRoadmap(
        customProfession
      );
    };
useEffect(() => {

  const loadSavedRoadmap =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (!user) return;

        const data =
          await getSavedRoadmap(
            user.email
          );
          console.log("save roadmap",data);
          console.log("subjects",data.subjects);
          
        // if (
        //   !data.profession
        // )
        //   return;
        if (
    !data ||
    !data.profession ||
    !Array.isArray(data.subjects)
){
    setSelectedProfession("");
    setNodes([]);
    return;
}

        setSelectedProfession(
          data.profession
        );

        setNodes(
          data.subjects.map(
            (
              subject,
              index
            ) => ({
              t: subject,

              s:
                index === 0
                  ? "In Progress"
                  : "Locked",

              state:
                index === 0
                  ? "active"
                  : "locked",

              icon:
                <Code2 size={24} />
            })
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  loadSavedRoadmap();

}, []);
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <h1 className="page-title">
          Visual Career Path
        </h1>

        <p className="page-desc">
          Master the modern web stack
          with our guided, structured
          learning path. Track your
          progress, unlock new tiers,
          and build a portfolio-ready
          skillset from scratch.
        </p>

        <div className="profession-box">

          <label>
            Career Path
          </label>

          <select
            value={
              selectedProfession
            }
            onChange={
              handleProfessionChange
            }
          >
            <option value="">
              Select Profession
            </option>

            {professionOptions.map(
              (job) => (
                <option
                  key={job}
                  value={job}
                >
                  {job}
                </option>
              )
            )}
          </select>

          {showCustomInput && (
            <div className="custom-profession">

              <input
                type="text"
                placeholder="Enter Profession..."
                value={
                  customProfession
                }
                onChange={(e) =>
                  setCustomProfession(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary"
                onClick={
                  handleCustomProfession
                }
              >
                Generate Roadmap
              </button>

            </div>
          )}
        </div>

        {nodes.length === 0 ? (
          <div className="empty-roadmap">
            Select a profession to
            generate your roadmap.
          </div>
        ) : (
          <div className="roadmap">

            {nodes.map(
              (n, i) => (
                <div
                  key={n.t}
                  style={{
                    display:
                      "contents",
                  }}
                >
                  <div
                    className={`road-node ${n.state}`}
                  >
                    <div className="node-ic">
                      {n.icon}
                    </div>

                    <div className="node-t">
                      {n.t}
                    </div>

                    <div className="node-s">
                      {n.s}
                    </div>
                  </div>

                  {i <
                    nodes.length -
                      1 && (
                    <div
                      className={`road-line`}
                    />
                  )}
                </div>
              )
            )}

          </div>
        )}

        <div
          className="grid grid-3"
          style={{
            marginTop: 30,
          }}
        >
          {info.map((c) => (
            <div
              key={c.t}
              className="card"
            >
              <div className="info-header">
                <span className="icon-box">
                  {c.icon}
                </span>

                <h4>{c.t}</h4>
              </div>

              <p className="muted">
                {c.d}
              </p>
            </div>
          ))}
        </div>
          <div className="page-navigation">

    <button
        className="nav-btn previous-btn"
        onClick={() => navigate("/dashboard")}
    >
        ← Previous
    </button>

    <button
        className="nav-btn next-btn"
        onClick={() => navigate("/library")}
    >
        Next →
    </button>

</div>
      </main>

      <FloatingAIBot />
      
    </div>
  );
}