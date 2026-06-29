from fastapi import APIRouter
#from services.llm import model
from services.question_generator import question
from schemas.question_structure import MultiSubjectRequest
import json
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from models.Exam_table import ExamQuestion
from sqlalchemy import desc
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
    ExamSessionCreate,
    ExamSessionFinish
)
from datetime import datetime
from models.Exam_table import ExamSession

router=APIRouter()

@router.get("/question/{topic}")
def specefic_question(topic:str,
            db: Session = Depends(get_db)
                      ):
    topic=topic
    result=question(topic=topic)
    for item in result.quiz:
        db.add(

            ExamQuestion(

                subject=topic,

                question=item.question,

                option_a=item.options[0],

                option_b=item.options[1],

                option_c=item.options[2],

                option_d=item.options[3],

                answer=item.options[
                    item.correct_option
                ],

                difficulty="Medium",

                generated_by="LLM"

            )

        )

    db.commit()

    quiz = []

    for item in result.quiz:

        quiz.append({

            "subject": topic,

            "question": item.question,

            "options": item.options,

            "correct_option": item.correct_option

        })

    return {

        "quiz": quiz

    }
    
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

    session.score = score

    db.commit()

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

@router.put("/exam/session")

def finish_session(

    request:ExamSessionFinish,

    db:Session=Depends(get_db)

):

    session=(

        db.query(ExamSession)

        .filter(

            ExamSession.id==request.session_id

        )

        .first()

    )

    session.score=request.score

    db.commit()

    return{

        "message":"Exam Finished"

    }
  