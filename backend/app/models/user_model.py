from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from database.database import Base

class UserDB(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    login_type = Column(String)

    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    role = Column(String)

    picture = Column(String)

    google_id = Column(String)
    
    phone = Column(String, nullable=True)

    college = Column(String, nullable=True)

    degree = Column(String, nullable=True)

    graduation_year = Column(String, nullable=True)

    github = Column(String, nullable=True)

    linkedin = Column(String, nullable=True)

    location = Column(String, nullable=True)

    bio = Column(String, nullable=True)

