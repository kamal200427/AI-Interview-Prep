from fastapi import APIRouter
from services.roadmap_logic import roadmap_generator

router=APIRouter(prefix="/home")

@router.get("/roadmap/{role}")
def road_map(role:str):
    roadmaps = {
    "AI Engineer": [
        "Python",
        "Statistics",
        "Linear Algebra",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "NLP",
        "LLMs",
        "RAG",
        "Agentic AI",
        "Deployment"
    ],

    "Machine Learning Engineer": [
        "Python",
        "Statistics",
        "Machine Learning",
        "Feature Engineering",
        "Model Evaluation",
        "Deep Learning",
        "MLOps",
        "Deployment"
    ],

    "Data Scientist": [
        "Python",
        "Statistics",
        "Data Analysis",
        "Data Visualization",
        "Machine Learning",
        "Experimentation",
        "Storytelling"
    ],

    "Data Analyst": [
        "Excel",
        "SQL",
        "Python",
        "Data Cleaning",
        "EDA",
        "Power BI",
        "Tableau"
    ],

    "GenAI Engineer": [
        "Python",
        "Deep Learning",
        "Transformers",
        "LLMs",
        "Prompt Engineering",
        "RAG",
        "LangChain",
        "LangGraph",
        "Agentic AI",
        "Deployment"
    ],

    "MLOps Engineer": [
        "Linux",
        "Git",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "MLflow",
        "Cloud",
        "Monitoring"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript"
    ],

    "Backend Developer": [
        "Python",
        "FastAPI",
        "Django",
        "SQL",
        "Databases",
        "REST APIs",
        "Docker"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Python",
        "FastAPI",
        "SQL",
        "Docker"
    ],

    "DevOps Engineer": [
        "Linux",
        "Networking",
        "Git",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Cloud",
        "Monitoring"
    ],

    "Cybersecurity Engineer": [
        "Networking",
        "Linux",
        "Security Fundamentals",
        "Ethical Hacking",
        "Web Security",
        "Cloud Security",
        "Incident Response"
    ],

    "Mobile App Developer": [
        "Programming Basics",
        "Flutter",
        "Dart",
        "State Management",
        "APIs",
        "Firebase",
        "App Deployment"
    ]
}
    role=role
    
    if role in roadmaps:
        return {"response":roadmaps[role]}
    else :
        skills=roadmap_generator(role=role)
        return {"response":skills}
