import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import SignIn from "./pages/SignIn.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Courses from "./pages/Courses.jsx";
import CourseModules from "./pages/CourseModules.jsx";
import Roadmaps from "./pages/Roadmaps.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Library from "./pages/Library.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import Exam from "./pages/Exam.jsx";
import ChatBoard from "./pages/Chatboard.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import MoodleTest from "./pages/MoodleTest.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />}/>

      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course" element={<CourseModules />} />
      <Route path="/roadmaps" element={<Roadmaps />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/interview" element={<MockInterview />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/moodletest" element={<MoodleTest />} />

      <Route path="/chat" element={<ChatBoard />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
