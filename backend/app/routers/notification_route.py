from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from schemas.notification_schema import (
    NotificationCreate,
    NotificationResponse,
    NotificationCount,
    NotificationMessage,
)

from services.notification_service import (
    create_notification,
    get_all_notifications,
    get_latest_notifications,
    get_unread_notifications,
    get_unread_count,
    mark_as_read,
    mark_all_as_read,
    delete_notification,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


# ==========================================================
# Create Notification
# ==========================================================
@router.post(
    "/",
    response_model=NotificationResponse
)
def create_new_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db)
):

    return create_notification(db, notification)


# ==========================================================
# Get All Notifications
# ==========================================================
@router.get(
    "/{user_id}",
    response_model=list[NotificationResponse]
)
def get_notifications(
    user_id: str,
    db: Session = Depends(get_db)
):

    return get_all_notifications(db, user_id)


# ==========================================================
# Latest 7 Notifications
# ==========================================================
@router.get(
    "/latest/{user_id}",
    response_model=list[NotificationResponse]
)
def latest_notifications(
    user_id: str,
    db: Session = Depends(get_db)
):

    return get_latest_notifications(db, user_id)


# ==========================================================
# Unread Notifications
# ==========================================================
@router.get(
    "/unread/{user_id}",
    response_model=list[NotificationResponse]
)
def unread_notifications(
    user_id: str,
    db: Session = Depends(get_db)
):

    return get_unread_notifications(db, user_id)


# ==========================================================
# Notification Count
# ==========================================================
@router.get(
    "/count/{user_id}",
    response_model=NotificationCount
)
def notification_count(
    user_id: str,
    db: Session = Depends(get_db)
):

    count = get_unread_count(db, user_id)

    return {
        "count": count
    }


# ==========================================================
# Mark One Read
# ==========================================================
@router.put(
    "/read/{notification_id}",
    response_model=NotificationMessage
)
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):

    notification = mark_as_read(db, notification_id)

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "message": "Notification marked as read"
    }


# ==========================================================
# Mark All Read
# ==========================================================
@router.put(
    "/read-all/{user_id}",
    response_model=NotificationMessage
)
def read_all_notifications(
    user_id: str,
    db: Session = Depends(get_db)
):

    mark_all_as_read(db, user_id)

    return {
        "message": "All notifications marked as read"
    }


# ==========================================================
# Delete Notification
# ==========================================================
@router.delete(
    "/{notification_id}",
    response_model=NotificationMessage
)
def remove_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):

    deleted = delete_notification(db, notification_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "message": "Notification deleted successfully"
    }