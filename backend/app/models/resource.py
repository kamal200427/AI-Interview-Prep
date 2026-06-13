from sqlalchemy import Column,Integer,String
from database.database import Base

class Resource(Base):

    __tablename__="resources"

    id=Column(Integer,primary_key=True,index=True)

    user_id=Column(String,nullable=False)

    subject=Column(String,nullable=False)

    resource_type=Column(String,nullable=False)
    # youtube / pdf

    title=Column(String,nullable=False)

    link=Column(String,nullable=False)

    thumbnail=Column(String,nullable=True)

    channel_name=Column(String,nullable=True)

    author=Column(String,nullable=True)