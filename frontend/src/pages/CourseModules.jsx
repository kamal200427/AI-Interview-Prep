import Sidebar from "../components/Sidebar.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Database,
  Box,
  Code2,
  Hexagon,
  Network,
  TerminalSquare,
  Zap,
  Map,
  ChevronDown,
} from "lucide-react";
import FloatingAIBot from "../components/FloatingAIBot.jsx";
import { useEffect, useState } from "react";

 import { getCourseResources,markSubjectComplete,updateCompletion } from "../services/CourseModuleApi.jsx";
 import { getSavedRoadmap } from "../services/RoadmapApi.jsx";
 import "../static/CourseModule.css"

const INSTRUCTOR =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces";

export default function CourseModules() {
const navigate = useNavigate();

  const [profession,setProfession] =
useState("");
  const [subjects,setSubjects] =
useState([]);
const [openSubject, setOpenSubject] =
  useState(null);
const totalResources =
subjects.reduce(
(acc,s) =>
acc +
s.youtube.length +
s.pdf.length,
0
);

const completedResources =
subjects.reduce(
(acc,s) =>
acc +
[
...s.youtube,
...s.pdf
].filter(
r =>
r.completion === 100
).length,
0
);

const overallProgress =
totalResources === 0
? 0
: Math.round(
(completedResources /
totalResources)
* 100
);
const loadResources = async () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const data =
    await getCourseResources(
      user.email
    );

  const sub =
    await getSavedRoadmap(
      user.email
    );

  setProfession(
    sub.profession
  );

  const formatted =
    Object.entries(data).map(
      ([subject,value]) => ({
        name: subject,
        youtube:
          value.youtube || [],
        pdf:
          value.pdf || []
      })
    );

  setSubjects(formatted);
};

useEffect(() => {
  loadResources();
}, []);
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <p className="muted" style={{ fontSize: 14 }}>
          career Path
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: "6px 0 8px" }}>
          {profession}
        </h1>
        <p className="muted" style={{ maxWidth: 540, marginBottom: 28 }}>
          Deep dive into memory management, functional programming patterns, and
          high-performance execution.
        </p>

        <div className="course-layout">
          {/* Subjects */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>All Subjects</h3>
              
              {subjects.map((subject) => {
                const totalResources =
  subject.youtube.length +
  subject.pdf.length;

const completedResources =
  [
    ...subject.youtube,
    ...subject.pdf
  ].filter(
    resource =>
      resource.completion === 100
  ).length;

const completed =
  totalResources > 0 &&
  completedResources === totalResources;
             return (

<div
className={`subject-accordion ${
  completed
    ? "completed-subject"
    : ""
}`}
>
  <div
    className="subject-header"
    onClick={() =>
      setOpenSubject(
        openSubject === subject.name
          ? null
          : subject.name
      )
    }
  >
    {
completed && (

<span
className="completed-badge"
>

✅ Completed

</span>

)
}
<button
className="complete-subject-btn"
onClick={async (e)=>{

  e.stopPropagation();

  const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  await markSubjectComplete(
    user.email,
    subject.name
  );

  loadResources();

}}
>

✓ Mark As Completed

</button>
    <div>

      <h2>
        {subject.name}
      </h2>

      <span>
        {subject.youtube.length}
        Videos •
        {" "}
        {subject.pdf.length}
        PDFs
      </span>

    </div>

    <ChevronDown
      className={
        openSubject === subject.name
          ? "rotate"
          : ""
      }
    />

  </div>

  {openSubject === subject.name && (

    <div className="subject-content">

      {/* Youtube Section */}

      <div className="resource-block">

        <h3>
          🎥 YouTube Playlists
        </h3>

        {subject.youtube.map(
          (video) => (

          <div
            key={video.link}
            className="resource-row card"
          >

            <a
              href={video.link}
              target="_blank"
              rel="noreferrer"
            >
              {video.title}
            </a>

            <div className="progress-area">

              <input
                type="range"
                min="0"
                max="100"
                value={
                  video.completion || 0
                }
                 onChange={(e) => {

  const value =
    Number(e.target.value);

  setSubjects(prev =>
    prev.map(s =>
      s.name === subject.name
        ? {
            ...s,
            youtube: s.youtube.map(v =>
              v.link === video.link
                ? {
                    ...v,
                    completion: value
                  }
                : v
            )
          }
        : s
    )
  );
}
                 }
                 onMouseUp={async (e) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  await updateCompletion(
    user.email,
    video.link,
    e.target.value
  );

}}
              />

              <span>
                {video.completion || 0}%
              </span>

            </div>

          </div>

        ))}
      </div>

      {/* PDF Section */}

      <div className="resource-block">

        <h3>
          📄 PDF Resources
        </h3>

        {subject.pdf.map(
          (pdf) => (

          <div
            key={pdf.link}
            className="resource-row card"
          >

            <a
              href={pdf.link}
              target="_blank"
              rel="noreferrer"
            >
              {pdf.title}
            </a>

            <div className="progress-area">

              <input
                type="range"
                min="0"
                max="100"
                value={
                  pdf.completion || 0
                }
                 onChange={(e) => {

  const value =
    Number(e.target.value);

  setSubjects(prev =>
    prev.map(s =>
      s.name === subject.name
        ? {
            ...s,
            pdf: s.pdf.map(p =>
              p.link === pdf.link
                ? {
                    ...p,
                    completion: value
                  }
                : p
            )
          }
        : s
    )
  );
}}
onMouseUp={async (e) => {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  await updateCompletion(
    user.email,
    pdf.link,
    e.target.value
  );

}}
              />

              <span>
                {pdf.completion || 0}%
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  )}

</div>

)})}
                </div>
          {/* Right rail */}
        </div>
        <div className="page-navigation">

    <button
        className="nav-btn previous-btn"
        onClick={() => navigate("/library")}
    >
        ← Previous
    </button>

    <button
        className="nav-btn next-btn"
        onClick={() => navigate("/moodletest")}
    >
        Next →
    </button>

</div>
      </main>
      <FloatingAIBot />
    </div>
  );
}
