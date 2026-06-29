from pydantic import BaseModel
from typing import List


class SingleExamRequest(BaseModel):

    user_id: str
    subject: str


class MultiExamRequest(BaseModel):

    user_id: str
    subjects: List[str]


class SaveAnswerRequest(BaseModel):

    session_id: int

    question_id: int

    selected_answer: str


class FinishExamRequest(BaseModel):

    session_id: int

class ExamSessionCreate(BaseModel):

    user_id:str

    subject:str

    total_questions:int


class ExamSessionFinish(BaseModel):

    session_id:int

    score:int