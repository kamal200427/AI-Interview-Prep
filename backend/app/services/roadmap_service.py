from sqlalchemy.orm import Session

from models.profession import Profession
from models.profession import (
    Profession,
    RoadmapSubject,
    UserRoadmap
)


from services.roadmap_logic import (roadmap_generator)


def get_or_create_roadmap(
    email: str,
    role: str,
    db: Session
):
    user_roadmap = (
    db.query(UserRoadmap)
    .filter(
        UserRoadmap.email == email
    )
    .first()
    )

    if user_roadmap:

        user_roadmap.profession = role

    else:

        user_roadmap = UserRoadmap(
        email=email,
        profession=role
        )

    db.add(user_roadmap)
    db.commit()
    
    profession = (
        db.query(Profession)
        .filter(
            Profession.name == role
        )
        .first()
    )

    # Profession Exists
    if profession:

        subjects = (
            db.query(RoadmapSubject)
            .filter(
                RoadmapSubject.profession_id
                == profession.id
            )
            .order_by(
                RoadmapSubject.order_no
            )
            .all()
        )

        if len(subjects) > 0:

            return {
    "profession": role,
    "subjects": [
        subject.title
        for subject in subjects
            ]
        }

    # Generate Roadmap
    generated_subjects = roadmap_generator(
        role=role
    )

    # Create Profession
    if not profession:

        profession = Profession(
            name=role
        )

        db.add(profession)
        db.commit()
        db.refresh(profession)

    # Store Subjects
    for index, title in enumerate(
        generated_subjects,
        start=1
    ):

        roadmap_subject = RoadmapSubject(
            profession_id=profession.id,
            title=title,
            order_no=index,
            state="locked"
        )

        db.add(roadmap_subject)

    db.commit()

    return {
    "profession": role,
    "subjects": generated_subjects
    }
    
#roadmap data will remain

def get_user_selected_roadmap(
    email: str,
    db: Session
):

    user = (
        db.query(UserRoadmap)
        .filter(
            UserRoadmap.email == email
        )
        .first()
    )

    if (not user or
        not user.profession
        or
        user.profession.strip() == ""):

        return {
            "profession": None,
            "subjects": []
        }

    profession = (
        db.query(Profession)
        .filter(
            Profession.name ==
            user.profession
        )
        .first()
    )

    if not profession:

        return {
            "profession": None,
            "subjects": []
        }

    subjects = (
        db.query(RoadmapSubject)
        .filter(
            RoadmapSubject.profession_id
            == profession.id
        )
        .order_by(
            RoadmapSubject.order_no
        )
        .all()
    )

    return {
        "profession":
        user.profession,

        "subjects": [
            s.title
            for s in subjects
        ]
    }