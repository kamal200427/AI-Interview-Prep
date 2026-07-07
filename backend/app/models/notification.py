from sqlalchemy import Column,Integer,String,ForeignKey,Boolean,DateTime
from database.database import Base
from datetime import datetime
class Notification(Base):

    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    user_id = Column(String, nullable=False, index=True)

    title = Column(String)

    message = Column(String)

    type = Column(String)
    # roadmap
    # course
    # exam
    # interview
    # resume
    # achievement

    icon = Column(String)

    route = Column(String)

    is_read = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)