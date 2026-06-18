from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db

from models.profession import UserRoadmap,Profession, RoadmapSubject

from schemas.roadmap_schema import ProfessionSelect

router = APIRouter(prefix="/roadmap")

@router.post("/select")
def select_profession(
    data: ProfessionSelect,
    db: Session = Depends(get_db)
):

    existing = db.query(
        UserRoadmap
    ).filter(
        UserRoadmap.email == data.email
    ).first()

    if existing:

        existing.profession = data.profession

    else:

        db.add(
            UserRoadmap(
                email=data.email,
                profession=data.profession
            )
        )

    db.commit()

    return {
        "message": "Saved"
    }

# @router.get("/{email}")
# def get_roadmap(
#     user_id:str,
#     db:Session = Depends(get_db)
# ):
# 
#     user = db.query(
#         UserRoadmap
#     ).filter(
#         UserRoadmap.email == email
#     ).first()
# 
#     if not user:
#         return {
#             "profession": None,
#             "nodes": []
#         }
# 
#     profession = db.query(
#         Profession
#     ).filter(
#         Profession.name ==
#         user.profession
#     ).first()
# 
#     nodes = db.query(
#         RoadmapSubject
#     ).filter(
#         RoadmapSubject.profession_id ==
#         profession.id
#     ).order_by(
#         RoadmapSubject.order_no
#     ).all()
# 
#     return {
#         "profession": user.profession,
# 
#         "nodes": [
#             {
#                 "state": n.state,
#                 "title": n.title
#             }
#             for n in nodes
#         ]
#     }