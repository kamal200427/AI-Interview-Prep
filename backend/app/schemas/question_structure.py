from pydantic import BaseModel, Field, conlist
from typing import List

class Question(BaseModel):
    question: str = Field(description="Question according to the topic")

    options: conlist(str, min_length=4, max_length=4) = Field(
        description="Exactly 4 options for each question"
    )

    correct_option: int = Field(
        description="Index of correct option (0-3)",
        ge=0,
        le=3
    )


class Quiz(BaseModel):
    quiz: List[Question] = Field(description="All generated questions")
    

class MultiSubjectRequest(BaseModel):

    subjects: list[str]