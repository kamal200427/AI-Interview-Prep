from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from database.database import get_db

from models.resource import Resource

from schemas.resource_schema import ResourceCreate

router=APIRouter(prefix="/resource")


@router.post("/select")
def select_resource(
    resource:ResourceCreate,
    db:Session=Depends(get_db)
):

    new_resource=Resource(

        user_id=resource.user_id,

        subject=resource.subject,

        resource_type=resource.resource_type,

        title=resource.title,

        link=resource.link,

        thumbnail=resource.thumbnail,

        channel_name=resource.channel_name,

        author=resource.author
    )

    db.add(new_resource)

    db.commit()

    db.refresh(new_resource)

    return {
        "message":"Resource Added Successfully"
    }
    
    
@router.get("/user/{user_id}")
def get_resources(
    user_id:str,
    db:Session=Depends(get_db)
):

    resources=db.query(Resource).filter(
        Resource.user_id==user_id
    ).all()

    return resources