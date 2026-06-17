from sqlalchemy import Column,Integer,String
from database.database import Base

class SubjectProgress(Base):

    __tablename__ = "subject_progress"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    subject = Column(String)

    progress = Column(Integer, default=0)

    status = Column(
        String,
        default="learning"
    )