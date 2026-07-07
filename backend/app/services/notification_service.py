from sqlalchemy.orm import Session
from sqlalchemy import desc

from models.notification import Notification
from schemas.notification_schema import NotificationCreate


# ==========================================================
# Create Notification
# ==========================================================
def create_notification(
    db: Session,
    notification: NotificationCreate
):

    new_notification = Notification(
        user_id=notification.user_id,
        title=notification.title,
        message=notification.message,
        type=notification.type,
        icon=notification.icon,
        route=notification.route,
        is_read=False
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)

    return new_notification


# ==========================================================
# Get All Notifications
# ==========================================================
def get_all_notifications(
    db: Session,
    user_id: str
):

    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(desc(Notification.created_at))
        .all()
    )


# ==========================================================
# Latest Notifications
# ==========================================================
def get_latest_notifications(
    db: Session,
    user_id: str,
    limit: int = 7
):

    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(desc(Notification.created_at))
        .limit(limit)
        .all()
    )


# ==========================================================
# Unread Notifications
# ==========================================================
def get_unread_notifications(
    db: Session,
    user_id: str
):

    return (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .order_by(desc(Notification.created_at))
        .all()
    )


# ==========================================================
# Notification Count
# ==========================================================
def get_unread_count(
    db: Session,
    user_id: str
):

    return (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .count()
    )


# ==========================================================
# Mark Single Notification Read
# ==========================================================
def mark_as_read(
    db: Session,
    notification_id: int
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        return None

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return notification


# ==========================================================
# Mark All Read
# ==========================================================
def mark_all_as_read(
    db: Session,
    user_id: str
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = True

    db.commit()

    return True


# ==========================================================
# Delete Notification
# ==========================================================
def delete_notification(
    db: Session,
    notification_id: int
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        return False

    db.delete(notification)
    db.commit()

    return True