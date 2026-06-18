from sqlalchemy import Column,Integer,String,ForeignKey
from database.database import Base
from sqlalchemy import Integer,Column,DateTime
from sqlalchemy.sql import func

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
    description = Column(
        String,
        nullable=True
    )
 

class UserRoadmap(Base):

    __tablename__ = "user_roadmap"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    profession = Column(
        String,
        nullable=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )