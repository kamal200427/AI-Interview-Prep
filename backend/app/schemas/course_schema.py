from pydantic import BaseModel, Field, conlist

class CompletionUpdate(
    BaseModel
):
    user_id: str
    link: str
    completion: int