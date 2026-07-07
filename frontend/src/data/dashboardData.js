import {
  BookOpen,
  Mic,
  Route,
  FileText,
  Bot,
  Flame,
  BarChart3,
  Award,
  Trophy,
  CheckCircle2,
  Star,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

const dashboardData = {
  // ==========================================
  // Dashboard Header
  // ==========================================
 header: {
    title: "Welcome Back, Kamal 👋",
    subtitle:
        "Continue your AI Interview preparation journey.",
},
  // ==========================================
  // Quick Actions
  // ==========================================
   quickActions: [

{
    id:1,
    title:"Continue Learning",
    description:"Resume your AI learning roadmap.",
    icon:"learn",
    color:"blue",
    path:"/course"
},

{
    id:2,
    title:"Take Mock Test",
    description:"Practice subject-wise interview questions.",
    icon:"exam",
    color:"green",
    path:"/moodletest"
},

{
    id:3,
    title:"AI Interview",
    description:"Start a mock AI interview session.",
    icon:"interview",
    color:"purple",
    path:"/interview"
},

{
    id:4,
    title:"Ask AI Tutor",
    description:"Resolve concepts instantly using AI.",
    icon:"ai",
    color:"orange",
    path:"/chat"
},

{
    id:6,
    title:"Resume Builder",
    description:"Build your professional ATS resume.",
    icon:"resume",
    color:"teal",
    path:"/resume"
},

],
  // ==========================================
  // KPI Cards
  // ==========================================
    kpis: [
  {
    id: 1,
    title: "Completed Modules",
    description: "Modules completed this month",
    icon: "study",
    color: "blue",
  },
  {
    id: 2,
    title: "Interview Readiness",
    description: "Overall AI assessment score",
    icon: "target",
    color: "green",
  },
  {
    id: 3,
    title: "MoodleTest",
    description: "Completed Moodle Test",
    icon: "trophy",
    color: "orange",
  },
  {
    id: 4,
    title: "Current Streak",
    description: "Keep learning every day",
    icon: "streak",
    color: "purple",
  },
],

// ==========================================
  // Statistics
  // ==========================================
   statistics: [

{
    id:1,
    title:"Average Accuracy",
    value:"92%",
    progress:92,
    change:"+6%",
    icon:"accuracy",
    color:"blue",
},

{
    id:2,
    title:"Highest Score",
    value:"98%",
    progress:98,
    change:"+4%",
    icon:"score",
    color:"green",
},

{
    id:3,
    title:"Study Hours",
    value:"145h",
    progress:78,
    change:"+12%",
    icon:"hours",
    color:"orange",
},

{
    id:4,
    title:"Overall Growth",
    value:"87%",
    progress:87,
    change:"+9%",
    icon:"growth",
    color:"purple",
},

],
};

export default dashboardData;