from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db

from schemas.roadmap_schema import (
    ProfessionSelect
)

from services.roadmap_service import (
    get_or_create_roadmap,get_user_selected_roadmap
)

router = APIRouter(
    prefix="/home"
)


@router.post("/roadmap")
def road_map(
    request: ProfessionSelect,
    db: Session = Depends(get_db)
):

    roadmap = get_or_create_roadmap(
        email=request.email,
        role=request.profession,
        db=db
    )

    return roadmap

@router.get("/roadmap/user/{email}")
def get_user_roadmap(
    email: str,
    db: Session = Depends(get_db)
):

    roadmap = get_user_selected_roadmap(
        email=email,
        db=db
    )

    return roadmap