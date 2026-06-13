from pydantic import BaseModel
from typing import Optional

class ResourceCreate(BaseModel):

    user_id: str

    subject: str

    resource_type: str

    title: str

    link: str

    thumbnail: Optional[str] = None

    channel_name: Optional[str] = None

    author: Optional[str] = None