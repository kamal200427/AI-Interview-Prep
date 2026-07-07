from fastapi import APIRouter
#from services.llm import model
from services.question_generator import question
from schemas.question_structure import MultiSubjectRequest
import json
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from services.notification_service import create_notification
from schemas.notification_schema import NotificationCreate
from models.Exam_table import ExamQuestion
from sqlalchemy import desc
from fastapi import HTTPException
import random
from models.Exam_table import (
    ExamQuestion,
    ExamSession,
    ExamAnswer
)

from schemas.exam_schema import (
    SingleExamRequest,
    MultiExamRequest,
    SaveAnswerRequest,
    FinishExamRequest,
    ExamSessionCreate
)
from datetime import datetime
from models.Exam_table import ExamSession

router=APIRouter()


@router.post("/question/{topic}")
def get_single_exam(
        topic: str,
    db: Session = Depends(get_db)
):
    
    try:
        # Step 1 : Check database
        db_questions = (
        db.query(ExamQuestion)
        .filter(ExamQuestion.subject == topic)
        .all()
    )

    # Step 2 : If enough questions already exist
        if len(db_questions) >= 20:

            selected = random.sample(db_questions, 20)

            return {
            "source": "database",
            "quiz": [
                {
                    "id": q.id,
                    "subject": q.subject,
                    "question": q.question,
                    "options": [
                        q.option_a,
                        q.option_b,
                        q.option_c,
                        q.option_d
                    ],
                "answer":q.answer,
                "correct_option": [
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d
            ].index(q.answer)
                }
                for q in selected
            ]
        }

    # Step 3 : Generate using LLM
        result = question(topic=topic)

        generated_questions = []

        for item in result.quiz:

            exam = ExamQuestion(
            subject=topic,
            question=item.question,
            option_a=item.options[0],
            option_b=item.options[1],
            option_c=item.options[2],
            option_d=item.options[3],
            answer=item.options[item.correct_option],
            difficulty="Medium",
            generated_by="Gemini"
        )

            db.add(exam)
            generated_questions.append(exam)

        db.commit()

    # Refresh to get IDs
        for q in generated_questions:
            db.refresh(q)

    # Fetch all questions again
        all_questions = (
        db.query(ExamQuestion)
        .filter(ExamQuestion.subject == topic)
        .all()
    )

        selected = random.sample(
        all_questions,
        min(20, len(all_questions))
    )

        return {
        "source": "generated",
        "quiz": [
            {
                "id": q.id,
                "subject": q.subject,
                "question": q.question,
                "options": [
                    q.option_a,
                    q.option_b,
                    q.option_c,
                    q.option_d
                ],
                "answer":q.answer,
                "correct_option": [
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d
            ].index(q.answer)
            }
            for q in selected
        ]
    }
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/exam/questions")
def get_multiple_exam(

    request: MultiSubjectRequest,

    db: Session = Depends(get_db)

):

    quiz = []

    for subject in request.subjects:

        questions = (

            db.query(ExamQuestion)

            .filter(

                ExamQuestion.subject == subject

            )

            .order_by(

                desc(ExamQuestion.id)

            )

            .limit(20)

            .all()

        )

        for q in questions:

            quiz.append({

                "id": q.id,

                "subject": q.subject,

                "question": q.question,

                "options": [

                    q.option_a,

                    q.option_b,

                    q.option_c,

                    q.option_d

                ],

                "correct_option":

                [

                    q.option_a,

                    q.option_b,

                    q.option_c,

                    q.option_d

                ].index(

                    q.answer

                )

            })

    # random.shuffle(quiz)

    return {

        "quiz": quiz

    }

@router.post("/save-answer")
def save_answer(

    request: SaveAnswerRequest,

    db: Session = Depends(get_db)

):

    question = (

        db.query(ExamQuestion)

        .filter(
            ExamQuestion.id == request.question_id
        )

        .first()

    )

    correct = (

        request.selected_answer ==

        question.answer

    )

    db.add(

        ExamAnswer(

            session_id=request.session_id,

            question_id=request.question_id,

            selected_answer=request.selected_answer,

            is_correct=1 if correct else 0

        )

    )

    db.commit()

    return {

        "correct": correct

    }

@router.post("/finish-exam")
def finish_exam(

    request: FinishExamRequest,

    db: Session = Depends(get_db)

):

    session = (
        db.query(ExamSession)

        .filter(
            ExamSession.id == request.session_id
        )

        .first()  
    )
    score = (

        db.query(ExamAnswer)

        .filter(

            ExamAnswer.session_id == request.session_id,

            ExamAnswer.is_correct == 1

        )

        .count()

    )
    print(score)
    session.score = score

    db.commit()
    
    percentage = round((score / session.total_questions) * 100, 2)

    create_notification(
    db,
    NotificationCreate(
        user_id=session.user_id,
        title=f"{session.subject} Test Completed",
        message=f"You scored {score}/{session.total_questions} ({percentage}%).",
        type="exam",
        icon="📝",
        route="/exam-result"
        )
    )
    return {

        "score": score,

        "total": session.total_questions

    }

@router.post("/exam/session")

def create_session(

    request:ExamSessionCreate,

    db:Session=Depends(get_db)

):

    session=ExamSession(

        user_id=request.user_id,

        subject=request.subject,

        score=0,

        total_questions=request.total_questions,

        created_at=str(datetime.now())

    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return{

        "session_id":session.id

    }

 
  
@router.get("/exam/review/{session_id}")
def review_exam(
    session_id: int,
    db: Session = Depends(get_db)
):

    # Check session exists
    session = (
        db.query(ExamSession)
        .filter(ExamSession.id == session_id)
        .first()
    )
    print("it is checking",session)
    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Exam session not found"
        )

    # Get all submitted answers
    answers = (
        db.query(ExamAnswer)
        .filter(
            ExamAnswer.session_id == session_id
        )
        .all()
    )
    print(answers)
    review = []

    for ans in answers:

        question = (
            db.query(ExamQuestion)
            .filter(
                ExamQuestion.id == ans.question_id
            )
            .first()
        )

        if question is None:
            continue

        review.append({

            "question_id": question.id,

            "subject": question.subject,

            "question": question.question,

            "difficulty": question.difficulty,

            "options": [

                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d

            ],

            "selected_answer": ans.selected_answer,

            "correct_answer": question.answer,

            "correct_option": [

                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d

            ].index(question.answer),

            "selected_option": [

                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d

            ].index(ans.selected_answer)
            if ans.selected_answer in [

                question.option_a,
                question.option_b,
                question.option_c,
                question.option_d

            ] else None,

            "is_correct": bool(ans.is_correct)

        })
    print("hi",review)
    return {

        "session_id": session_id,

        "subject": session.subject,

        "score": session.score,

        "total_questions": session.total_questions,

        "questions": review

    }