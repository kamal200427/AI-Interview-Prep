import sys
from pathlib import Path

sys.path.append(
    str(Path(__file__).resolve().parent.parent)
)
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.profession import Profession
from models.profession import RoadmapSubject


db: Session = SessionLocal()

roadmaps = {

    "Software Engineer": [
        "DSA",
        "OOPS",
        "DBMS",
        "Operating System",
        "Computer Network",
        "System Design",
        "Java"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
        "TypeScript",
        "Frontend System Design"
    ],

    "Backend Developer": [
        "Python",
        "DBMS",
        "Operating System",
        "Computer Network",
        "API Development",
        "System Design",
        "Microservices"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "NodeJS",
        "DBMS",
        "System Design"
    ],

    "AI Engineer": [
        "Python",
        "Statistics",
        "Linear Algebra",
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "MLOps",
        "Generative AI"
    ],

    "Machine Learning Engineer": [
        "Python",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "Feature Engineering",
        "MLOps"
    ],

    "Data Scientist": [
        "Python",
        "Statistics",
        "Machine Learning",
        "Data Analysis",
        "SQL",
        "Data Visualization"
    ],

    "Data Engineer": [
        "Python",
        "SQL",
        "Data Warehousing",
        "ETL",
        "Apache Spark",
        "Big Data"
    ],

    "Cloud Engineer": [
        "Linux",
        "Networking",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes"
    ],

    "DevOps Engineer": [
        "Linux",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "AWS",
        "Terraform"
    ],

    "Cyber Security Engineer": [
        "Networking",
        "Operating System",
        "Cryptography",
        "Ethical Hacking",
        "Web Security",
        "Penetration Testing"
    ],

    "Mobile App Developer": [
        "Java",
        "Kotlin",
        "Android",
        "Flutter",
        "React Native",
        "Mobile Architecture"
    ],

    "Android Developer": [
        "Java",
        "Kotlin",
        "Android SDK",
        "Jetpack Compose",
        "Firebase"
    ],

    "Java Developer": [
        "Java",
        "Spring Boot",
        "DBMS",
        "OOPS",
        "Microservices",
        "System Design"
    ],

    "Python Developer": [
        "Python",
        "Django",
        "FastAPI",
        "DBMS",
        "REST API",
        "System Design"
    ],

    "Game Developer": [
        "C++",
        "DSA",
        "Game Physics",
        "Unity",
        "Unreal Engine"
    ],

    "Blockchain Developer": [
        "Cryptography",
        "Solidity",
        "Ethereum",
        "Smart Contracts",
        "Web3"
    ],

    "Site Reliability Engineer": [
        "Linux",
        "Networking",
        "AWS",
        "Monitoring",
        "Docker",
        "Kubernetes"
    ],

    "QA Engineer": [
        "Testing",
        "Automation Testing",
        "Selenium",
        "API Testing",
        "Performance Testing"
    ],

    "Database Administrator": [
        "SQL",
        "DBMS",
        "Database Tuning",
        "Backup & Recovery",
        "Database Security"
    ]
}


for profession_name, subjects in roadmaps.items():

    profession = Profession(
        name=profession_name
    )

    db.add(profession)
    db.commit()
    db.refresh(profession)

    for index, subject in enumerate(subjects):

        db.add(
            RoadmapSubject(
                profession_id=profession.id,
                subject=subject,
                order_no=index + 1
            )
        )

    db.commit()

print("Roadmaps inserted successfully")