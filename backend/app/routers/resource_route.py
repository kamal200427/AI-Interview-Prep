from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from database.database import get_db

from models.resource import Resource

from schemas.resource_schema import ResourceCreate
from schemas.resource_schema import ResourceCheck

router=APIRouter(prefix="/resource")


@router.post("/select")
def save_resource(
    item: ResourceCreate,
    db: Session = Depends(get_db)
):

    existing = (
        db.query(Resource)
        .filter(
            Resource.user_id == item.user_id,
            Resource.link == item.link
        )
        .first()
    )

    if not existing:

        db.add(
            Resource(
                user_id=item.user_id,
                subject=item.subject,
                resource_type=item.resource_type,
                title=item.title,
                link=item.link,
                thumbnail=item.thumbnail,
                channel_name=item.channel_name,
                author=item.author
            )
        )

        db.commit()

    return {
        "message":
        "Resource Added Successfully"
    }
    

@router.delete("/remove")
def remove_resource(
    user_id: str,
    link: str,
    db: Session = Depends(get_db)
):

    resource = (
        db.query(Resource)
        .filter(
            Resource.user_id == user_id,
            Resource.link == link
        )
        .first()
    )

    if resource:

        db.delete(resource)
        db.commit()

    return {
        "message":
        "Resource Removed"
    }
    
@router.post(
    "/check"
)
def check_resource(
    request: ResourceCheck,
    db: Session = Depends(get_db)
):

    resource = (
        db.query(Resource)
        .filter(
            Resource.user_id ==
            request.user_id,

            Resource.link ==
            request.link
        )
        .first()
    )

    return {
        "saved":
        resource is not None
    }