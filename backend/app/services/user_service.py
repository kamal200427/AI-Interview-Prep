from sqlalchemy.orm import Session

from models.user_model import UserDB

from schemas.auth_schema import (
    UserUpdateSchema
)


def update_user_profile(
    data: UserUpdateSchema,
    db: Session
):

    user = (
        db.query(UserDB)
        .filter(
            UserDB.email ==
            data.email
        )
        .first()
    )

    if not user:

        return {
            "success": False,
            "message":
            "User not found"
        }

    user.phone = data.phone

    user.college = data.college

    user.degree = data.degree

    user.graduation_year = (
        data.graduation_year
    )

    user.github = data.github

    user.linkedin = (
        data.linkedin
    )

    user.bio = data.bio

    db.commit()

    db.refresh(user)

    return {
        "success": True,
        "message":
        "Profile updated successfully"
    }