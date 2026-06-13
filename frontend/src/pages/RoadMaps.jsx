import { useEffect, useState } from "react";
import FloatingAIBot from "../components/FloatingAIBot.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Check, Code2, Lock, Server, Gauge, Flag, Users } from "lucide-react";
import { getRoadmap } from "../services/RoadmapApi";
const nodes = [
  { state: "done", icon: <Check size={26} />, t: "HTML Basics", s: "Completed" },
  { state: "active", icon: <Code2 size={26} />, t: "JavaScript Fundamentals", s: "In Progress · 66%" },
  { state: "locked", icon: <Lock size={24} />, t: "React & State Management", s: "Locked" },
  { state: "locked", icon: <Server size={24} />, t: "Node.js Backend", s: "Locked" },
];

const info = [
  {
    icon: <Gauge size={18} />,
    t: "Learning Velocity",
    d: "You're progressing 20% faster than the average student. Keep it up!",
  },
  {
    icon: <Flag size={18} />,
    t: "Next Milestone",
    d: 'Finish JavaScript Fundamentals to earn your "Scripting Novice" badge.',
  },
  {
    icon: <Users size={18} />,
    t: "Community",
    d: "42,000+ others are currently on this path. Join the discussion.",
  },
];

export default function Roadmaps() {
  const [professions, setProfessions] = useState([]);

const [selectedProfession,setSelectedProfession] = useState("");

const [nodes, setNodes] =useState([]);

const loadRoadmap = async () => {
  try {
    const user = JSON.parse(
  localStorage.getItem("user")
);
    console.log(user);
    
    const email=user.email;
    const data = await getRoadmap(email);

    setNodes(data.nodes);

    setSelectedProfession(
      data.profession
    );
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {

  loadRoadmap();

}, []);

const handleProfessionChange =
async (e) => {

  const profession =
    e.target.value;

  setSelectedProfession(
    profession
  );

  await saveProfession(
    email,
    profession
  );

  loadRoadmap();
};
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Visual Career Path</h1>
        <p className="muted" style={{ maxWidth: 560, marginTop: 6 }}>
          Master the modern web stack with our guided, structured learning path. Track
          your progress, unlock new tiers, and build a portfolio-ready skillset from
          scratch.
        </p>
        <div className="profession-box">

  <label>
    Career Path
  </label>

  <select
    value={selectedProfession}
    onChange={handleProfessionChange}
  >
    {professions.map((job) => (
      <option
        key={job}
        value={job}
      >
        {job}
      </option>
    ))}
  </select>

</div>
        <div className="roadmap">
          {nodes.map((n, i) => (
            <div key={n.t} style={{ display: "contents" }}>
              <div className={`road-node ${n.state}`}>
                <div className="node-ic">{n.icon}</div>
                <div className="node-t">{n.t}</div>
                <div className="node-s">{n.s}</div>
              </div>
              {i < nodes.length - 1 && (
                <div className={`road-line ${n.state === "done" ? "done" : ""}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-3" style={{ marginTop: 30 }}>
          {info.map((c) => (
            <div key={c.t} className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span className="icon-box" style={{ width: 36, height: 36 }}>
                  {c.icon}
                </span>
                <h4 style={{ fontSize: 15, fontWeight: 700 }}>{c.t}</h4>
              </div>
              <p className="muted" style={{ fontSize: 13.5 }}>
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </main>
      <FloatingAIBot />
    </div>
  );
}

