from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from database.database import Base


class ResumeDB(Base):
    __tablename__ = "resume"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String, ForeignKey("users.email"), unique=True)

    summary = Column(Text)

    programming = Column(Text)
    web = Column(Text)
    database = Column(Text)
    machine_learning = Column(Text)

    education = Column(Text)

    projects = Column(Text)

    internships = Column(Text)

    certificates = Column(Text)

    achievements = Column(Text)

    hobbies = Column(Text)

    template = Column(String, default="modern")

    user = relationship("UserDB")