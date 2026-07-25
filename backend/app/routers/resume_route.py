from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from database.database import get_db

from models.resume_model import ResumeDB
from models.user_model import UserDB

from schemas.resume_schema import ResumeCreate

import json

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)
@router.get("/{user_id}")

def get_resume(user_id: str, db: Session = Depends(get_db)):

    user = db.query(UserDB).filter(UserDB.email == user_id).first()

    if not user:
        raise HTTPException(404, "User not found")

    resume = db.query(ResumeDB).filter(
        ResumeDB.user_id == user_id
    ).first()

    if not resume:

        return {

            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "location": user.location,
            "github": user.github,
            "linkedin": user.linkedin,
            "role": user.role,
            "picture": user.picture,

            "summary": "",

            "programming": [],
            "web": [],
            "database": [],
            "machineLearning": [],

            "education": [],
            "projects": [],
            "internships": [],
            "certificates": [],
            "achievements": [],
            "hobbies": [],

            "template": "modern"

        }

    return {

        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "location": user.location,
        "github": user.github,
        "linkedin": user.linkedin,
        "role": user.role,
        "picture": user.picture,

        "summary": resume.summary,

        "programming": json.loads(resume.programming),

        "web": json.loads(resume.web),

        "database": json.loads(resume.database),

        "machineLearning": json.loads(
            resume.machine_learning
        ),

        "education": json.loads(resume.education),

        "projects": json.loads(resume.projects),

        "internships": json.loads(
            resume.internships
        ),

        "certificates": json.loads(
            resume.certificates
        ),

        "achievements": json.loads(
            resume.achievements
        ),

        "hobbies": json.loads(
            resume.hobbies
        ),

        "template": resume.template

    }

@router.post("/{user_id}")

def create_resume(
        user_id: str,
        data: ResumeCreate,
        db: Session = Depends(get_db)
):

    resume = db.query(ResumeDB).filter(
        ResumeDB.user_id == user_id
    ).first()

    if resume:

        raise HTTPException(
            400,
            "Resume already exists"
        )

    resume = ResumeDB(

        user_id=user_id,

        summary=data.summary,

        programming=json.dumps(data.programming),

        web=json.dumps(data.web),

        database=json.dumps(data.database),

        machine_learning=json.dumps(
            data.machineLearning
        ),

        education=json.dumps(data.education),

        projects=json.dumps(data.projects),

        internships=json.dumps(data.internships),

        certificates=json.dumps(
            data.certificates
        ),

        achievements=json.dumps(
            data.achievements
        ),

        hobbies=json.dumps(data.hobbies),

        template=data.template

    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return {

        "message": "Resume Created Successfully"

    }
@router.put("/{user_id}")
def update_resume(
    user_id: str,
    data: ResumeCreate,
    db: Session = Depends(get_db)
):
    # Find existing resume
    resume = db.query(ResumeDB).filter(
        ResumeDB.user_id == user_id
    ).first()

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Convert Pydantic model to dictionary
    resume_data = data.model_dump()  # Use data.dict() if using Pydantic v1

    # Update all fields
    for key, value in resume_data.items():

        # Convert list fields to JSON before storing
        if key in [
            "programming",
            "web",
            "database",
            "machineLearning",
            "education",
            "projects",
            "internships",
            "certificates",
            "achievements",
            "hobbies"
        ]:
            value = json.dumps(value)

        # Database column is machine_learning, not machineLearning
        if key == "machineLearning":
            setattr(resume, "machine_learning", value)
        else:
            setattr(resume, key, value)

    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume Updated Successfully",
        "resume": resume
    }
    
@router.delete("/{user_id}")
def delete_resume(user_id: str, db: Session = Depends(get_db)):

    print("Email received:", user_id)

    resumes = db.query(ResumeDB).all()
    print("Total resume",len(resumes))
    for r in resumes:
        print("Resume user_id:", r.user_id)

    resume = db.query(ResumeDB).filter(
        ResumeDB.user_id == user_id
    ).first()

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    db.delete(resume)
    db.commit()

    return {"message": "Resume deleted successfully"}