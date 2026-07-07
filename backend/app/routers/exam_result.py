from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.Exam_table import ExamSession

router = APIRouter()

@router.get("/exam-results/{user_id}")
def get_exam_results(user_id: str, db: Session = Depends(get_db)):
    sessions = (
        db.query(ExamSession)
        .filter(ExamSession.user_id == user_id)
        .order_by(ExamSession.created_at.desc())
        .all()
    )

    if not sessions:
        raise HTTPException(
            status_code=404,
            detail="No exam records found."
        )
    latest_subjects = {}

    for session in sessions:
        # Because sessions are sorted by newest first,
        # the first occurrence of each subject is the latest.
        if session.subject not in latest_subjects:
            latest_subjects[session.subject] = {
                "subject": session.subject,
                "score": session.score,
                "total_questions": session.total_questions,
                "created_at": session.created_at,
            }

    return list(latest_subjects.values())

     