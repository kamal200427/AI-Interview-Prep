from pydantic import BaseModel,Field
from typing import List

class Skills(BaseModel):
    required_skills:List[str]=Field(description="Required skills,technologies, libraries, frameworks,")
from pydantic import BaseModel


class ProfessionSelect(BaseModel):

    email: str

    profession: str
