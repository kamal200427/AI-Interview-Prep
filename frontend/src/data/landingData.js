import {
  Brain,
  Route,
  BookOpen,
  Bot,
  FileText,
  Mic,
  BarChart3,
  Target,
  Bell,
} from "lucide-react";

const landingData = {
  hero: {
    badge: "AI Powered Interview Preparation Platform",

    title1: "Prepare Smarter.",

    title2: "Crack Every Interview.",

    description:
      "An all-in-one AI platform that helps students prepare for technical interviews through personalized roadmaps, AI tutoring, mock interviews, resume optimization, coding practice, and performance analytics.",

    primaryButton: "Start Learning",

    secondaryButton: "Watch Demo",

    image:
      "/images/landing-hero.png",

    stats: [
      {
        number: "20+",
        label: "Technical Subjects",
      },
      {
        number: "500+",
        label: "Interview Questions",
      },
      {
        number: "95%",
        label: "Interview Readiness",
      },
    ],
  },

  features: [
    {
      id: 1,
      icon: Route,
      title: "AI Career Roadmap",
      description:
        "Generate personalized career roadmaps based on your dream job and current skills.",
      meta: "Personalized Learning",
    },

    {
      id: 2,
      icon: BookOpen,
      title: "Learning Hub",
      description:
        "Access curated YouTube videos, PDFs, articles and learning resources in one place.",
      meta: "Smart Resources",
    },

    {
      id: 3,
      icon: Bot,
      title: "AI Tutor",
      description:
        "Ask technical questions anytime and receive AI-powered explanations.",
      meta: "24/7 Mentor",
    },

    {
      id: 4,
      icon: Mic,
      title: "AI Mock Interview",
      description:
        "Practice HR and technical interviews with intelligent AI feedback.",
      meta: "Real Interview Experience",
    },

    {
      id: 5,
      icon: FileText,
      title: "Resume Builder",
      description:
        "Build ATS-friendly resumes and improve your resume score instantly.",
      meta: "ATS Optimized",
    },

    {
      id: 6,
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Track strong subjects, weak subjects, interview readiness, and learning progress.",
      meta: "Detailed Dashboard",
    },

    {
      id: 7,
      icon: Target,
      title: "Technical Assessments",
      description:
        "Practice subject-wise MCQs with detailed performance analysis.",
      meta: "Adaptive Tests",
    },

    {
      id: 8,
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Receive reminders for roadmap progress, completed modules, tests, and interviews.",
      meta: "Stay Updated",
    },

    {
      id: 9,
      icon: Brain,
      title: "AI Recommendations",
      description:
        "Get personalized recommendations based on your learning history and exam performance.",
      meta: "AI Driven",
    },
  ],

  statistics: [
    {
      number: "20+",
      title: "Interview Subjects",
    },

    {
      number: "1000+",
      title: "Learning Resources",
    },

    {
      number: "50+",
      title: "Mock Interviews",
    },

    {
      number: "95%",
      title: "Placement Readiness",
    },
  ],

  cta: {
    title: "Ready to Ace Your Dream Job?",

    description:
      "Start your personalized interview preparation journey today with AI-powered learning, mock interviews, resume optimization, and career roadmaps.",

    primaryButton: "Get Started",

    secondaryButton: "Explore Features",
  },
};

export default landingData;