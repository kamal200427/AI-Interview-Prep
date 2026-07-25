import { useEffect, useState } from "react";
import "./interview.css";
import {
  Bot,
  Briefcase,
  Gauge,
  Clock3,
  PlayCircle,
  Layers,
} from "lucide-react";
 import Sidebar from "../Sidebar";
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

const INTERVIEW_TYPES = [
  "Technical",
  "HR",
  "Coding",
  "System Design",
  "Custom Interview",
];

const EXPERIENCES = [
  "Fresher",
  "0-1 Years",
  "1-3 Years",
  "3-5 Years",
  "5+ Years",
];

const DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
];

const DURATIONS = [10, 15, 20, 30];
const experienceMap = {
    "Fresher": 0,
    "0-1 Years": 1,
    "1-3 Years": 3,
    "3-5 Years": 5,
    "5+ Years": 6,
};


export default function InterviewSetup({
  profession = "",
  onStart,
}) {
  const [interviewType, setInterviewType] = useState("Technical");
  const [selectedProfession, setSelectedProfession] = useState(profession);
  const [experience, setExperience] = useState("Fresher");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState(15);
  const [sidebarOpen, setSidebarOpen] = useState(true);

const user = JSON.parse(localStorage.getItem("user"));

 
const [customProfession, setCustomProfession] =
  useState("");


  useEffect(() => {
    if (profession) {
      setSelectedProfession(profession);
    }
  }, [profession]);

  const handleSubmit = () => {

  const finalProfession =
    selectedProfession === "Not In List"
      ? customProfession
      : selectedProfession;

  if (!finalProfession.trim()) {
    alert("Please select your profession.");
    return;
  }

  onStart?.({
    mode: interviewType,
    difficulty:
        difficulty === "Easy"
            ? "easy"
            : difficulty === "Medium"
            ? "moderate"
            : "hard",

    role: finalProfession,

    experience_years: experienceMap[experience]
});

};
 


  return (
    <div className="app-shell">
          <Sidebar sidebarOpen={sidebarOpen} />
    
          <main className="app-main">
    <div className="interview-setup-card">

      <div className="setup-header">

        <div className="setup-icon">
          <Bot size={40} />
        </div>

        <h2>AI Mock Interview</h2>

        <p>
          Configure your interview and let the AI interviewer
          assess your knowledge through a realistic interview.
        </p>

      </div>

      {/* Interview Type */}

      <div className="setup-group">

        <label>
          <Layers size={18} />
          Interview Type
        </label>

        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
        >
          {INTERVIEW_TYPES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Profession */}

      <div className="setup-group">

        <label>
          <Briefcase size={18} />
          Profession
        </label>

        <select
    value={selectedProfession}
    onChange={(e) =>
        setSelectedProfession(e.target.value)
    }
>
    {professionOptions.map((profession) => (
        <option
            key={profession}
            value={profession}
        >
            {profession}
        </option>
    ))}
</select>
{selectedProfession === "Not In List" && (
    <input
        type="text"
        placeholder="Enter your profession"
        value={customProfession}
        onChange={(e) =>
            setCustomProfession(e.target.value)
        }
    />
)}

      </div>

      {/* Experience */}

      <div className="setup-group">

        <label>
          <Briefcase size={18} />
          Experience
        </label>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          {EXPERIENCES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Difficulty */}

      <div className="setup-group">

        <label>
          <Gauge size={18} />
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {DIFFICULTIES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Duration */}

      <div className="setup-group">

        <label>
          <Clock3 size={18} />
          Duration
        </label>

        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          {DURATIONS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item} Minutes
            </option>
          ))}
        </select>

      </div>

      {/* Summary */}

      <div className="setup-summary">

        <h4>Interview Summary</h4>

        <div className="summary-grid">

          <div>
            <span>Type</span>
            <strong>{interviewType}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{selectedProfession}</strong>
          </div>

          <div>
            <span>Experience</span>
            <strong>{experience}</strong>
          </div>

          <div>
            <span>Difficulty</span>
            <strong>{difficulty}</strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>{duration} min</strong>
          </div>

          <div>
            <span>Questions</span>
            <strong>Maximum 5</strong>
          </div>

        </div>

      </div>

      <button
        className="start-interview-btn"
        onClick={handleSubmit}
      >
        <PlayCircle size={20} />
        Start AI Interview
      </button>

    </div>
    </main>
    </div>
  );
}