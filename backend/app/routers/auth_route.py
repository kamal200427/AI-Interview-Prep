from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal

from schemas.auth_schema import User

from models.user_model import UserDB
from database.database import get_db
from schemas.auth_schema import (
    UserUpdateSchema
)

from services.user_service import (
    update_user_profile
)


auth_router = APIRouter()

@auth_router.post("/user/register")
def register_user(user: User):

    db = SessionLocal()

    existing_user = (
        db.query(UserDB)
        .filter(UserDB.email == user.email)
        .first()
    )

    if existing_user:

        db.close()

        return {
            "message": "User already exists"
        }

    new_user = UserDB(
        login_type=user.login_type,
        name=user.name,
        email=user.email,
        role=user.role,
        picture=user.picture,
        google_id=user.google_id
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    db.close()

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }
 

@auth_router.get("/user/{email}")
def get_user(
    email: str,
    db: Session = Depends(get_db)
):

    user = (
        db.query(UserDB)
        .filter(
            UserDB.email == email
        )
        .first()
    )

    if not user:

        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,

        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "picture": user.picture,
            "role": user.role,
            "login_type": user.login_type,
            "google_id": user.google_id,

            "phone": getattr(
                user,
                "phone",
                None
            ),

            "college": getattr(
                user,
                "college",
                None
            ),

            "degree": getattr(
                user,
                "degree",
                None
            ),

            "graduation_year": getattr(
                user,
                "graduation_year",
                None
            ),

            "github": getattr(
                user,
                "github",
                None
            ),

            "linkedin": getattr(
                user,
                "linkedin",
                None
            ),

            "location": getattr(
                user,
                "location",
                None
            ),

            "bio": getattr(
                user,
                "bio",
                None
            )
        }
    }
    
@auth_router.put("/user/update")
def update_user(
    request: UserUpdateSchema,
    db: Session = Depends(get_db)
):

    return update_user_profile(
        data=request,
        db=db
    )