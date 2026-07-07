from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# -----------------------------
# Create Notification
# -----------------------------
class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str
    icon: Optional[str] = None
    route: Optional[str] = None


# -----------------------------
# Response Schema
# -----------------------------
class NotificationResponse(BaseModel):
    id: int
    user_id: str
    title: str
    message: str
    type: str
    icon: Optional[str]
    route: Optional[str]
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# Notification Count
# -----------------------------
class NotificationCount(BaseModel):
    count: int


# -----------------------------
# Mark Read Response
# -----------------------------
class NotificationMessage(BaseModel):
    message: str