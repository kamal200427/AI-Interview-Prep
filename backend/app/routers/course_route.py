from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.course_schema import CompletionUpdate
from models.resource import Resource

router=APIRouter()
@router.get(
    "/course/{user_id}"
)
def get_course_resources(
    user_id: str,
    db: Session = Depends(get_db)
):

    resources = (
        db.query(Resource)
        .filter(
            Resource.user_id == user_id
        )
        .all()
    )

    result = {}

    for item in resources:

        if item.subject not in result:

            result[item.subject] = {
                "youtube": [],
                "pdf": []
            }

        if item.resource_type == "youtube":

            result[item.subject][
                "youtube"
            ].append(item)

        else:

            result[item.subject][
                "pdf"
            ].append(item)

    return result



@router.put(
    "/course/completion"
)
def update_completion(
    request: CompletionUpdate,
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

    if not resource:

        return {
            "success": False
        }

    resource.completion = (
        request.completion
    )

    db.commit()

    return {
        "success": True
    }
    
    
@router.put(
    "/subject/complete"
)
def complete_subject(
    user_id: str,
    subject: str,
    db: Session = Depends(get_db)
):

    resources = (
        db.query(Resource)
        .filter(
            Resource.user_id == user_id,
            Resource.subject == subject
        )
        .all()
    )

    for resource in resources:

        resource.completion = 100

    db.commit()

    return {
        "message":
        "Subject Completed"
    }