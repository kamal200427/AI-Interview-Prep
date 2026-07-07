from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.database import SessionLocal
from services.email_service import send_email_otp
from models.Otp_model import OTP
from models.user_model import UserDB

import random

otp_router = APIRouter()


@otp_router.post("/auth/send-otp")
def send_otp(data: dict):

    db: Session = SessionLocal()

    email = data["email"]
    # ------------------------------------------------
    # Check whether the user is registered
    # ------------------------------------------------
    user = (
        db.query(UserDB)
        .filter(UserDB.email == email)
        .first()
    )

    if not user:
        db.close()

        return {
            "success": False,
            "message": "User is not registered. Please sign up first."
        }


    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    existing = db.query(
        OTP
    ).filter(
        OTP.email == email
    ).first()

    if existing:

        existing.otp = otp

    else:

        new_otp = OTP(
            email=email,
            otp=otp
        )

        db.add(new_otp)

    db.commit()

    send_email_otp(
        email,
        otp
    )

    return {
        "success": True,
        "message":
        "OTP sent successfully"
    }
    
    
@otp_router.post(
    "/auth/verify-otp"
)
def verify_otp(data: dict):

    db: Session = SessionLocal()

    email = data["email"]

    otp = data["otp"]

    record = db.query(
        OTP
    ).filter(
        OTP.email == email
    ).first()

    if not record:

        return {
            "success": False,
            "message": "OTP not found"
        }

    if record.otp != otp:

        return {
            "success": False,
            "message": "Invalid OTP"
        }

    db.delete(record)

    db.commit()

    return {
        "success": True,
        "message":
        "Login successful"
    }