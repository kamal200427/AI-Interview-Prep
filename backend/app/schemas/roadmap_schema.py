from pydantic import BaseModel,Field
from typing import List

class Skills(BaseModel):
    required_skills:List[str]=Field(description="Required skills,technologies, libraries, frameworks,")