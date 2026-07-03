from sqlalchemy import Column,Integer,String,ForeignKey
from database.database import Base
class ExamQuestion(Base):

    __tablename__ = "exam_questions"

    id = Column(Integer, primary_key=True)

    subject = Column(String)

    question = Column(String)

    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)

    answer = Column(String)

    difficulty = Column(String)

    generated_by = Column(
        String,
        default="huggingface"
    )



class ExamSession(Base):

    __tablename__ = "exam_sessions"

    id = Column(Integer, primary_key=True)

    user_id = Column(String)

    subject = Column(String)

    score = Column(Integer)

    total_questions = Column(Integer)

    created_at = Column(String)
    
    
class ExamAnswer(Base):

    __tablename__ = "exam_answers"

    id = Column(Integer, primary_key=True)

    session_id = Column(Integer)

    question_id = Column(Integer)

    selected_answer = Column(String)

    is_correct = Column(Integer)