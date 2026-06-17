from sqlalchemy import Column,Integer,String,ForeignKey
from database.database import Base

class Profession(Base):

    __tablename__ = "professions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        nullable=False
    )
 

class RoadmapSubject(Base):

    __tablename__ = "roadmap_subjects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    profession_id = Column(
        Integer,
        ForeignKey("professions.id")
    )

    title = Column(
        String,
        nullable=False
    )

    state = Column(
        String,
        default="locked"
    )

    order_no = Column(
        Integer
    )

 

class UserRoadmap(Base):

    __tablename__ = "user_roadmap"

    id = Column(
        Integer,
        primary_key=True
    )

    email = Column(
        String,
        unique=True
    )

    profession = Column(
        String
    )