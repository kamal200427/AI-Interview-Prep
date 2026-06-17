from sqlalchemy import Column,Integer,String,ForeignKey
from database.database import Base
class InterviewResult(Base):

    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    role = Column(String)

    score = Column(Integer)

    feedback = Column(String)

    strengths = Column(String)

    weaknesses = Column(String)

    created_at = Column(String)