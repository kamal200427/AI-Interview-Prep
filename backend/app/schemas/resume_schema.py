from pydantic import BaseModel, Field
from typing import List


class ResumeCreate(BaseModel):

    summary: str

    programming: list = Field(default_factory=list)
    web: list = Field(default_factory=list)
    database: list = Field(default_factory=list)
    machineLearning: list = Field(default_factory=list)

    education: list = Field(default_factory=list)
    projects: list = Field(default_factory=list)
    internships: list = Field(default_factory=list)

    certificates: list = Field(default_factory=list)
    achievements: list = Field(default_factory=list)
    hobbies: list = Field(default_factory=list)

    template: str = "modern"


class ResumeResponse(ResumeCreate):

    id: int

    user_id: int

    class Config:
        from_attributes = True