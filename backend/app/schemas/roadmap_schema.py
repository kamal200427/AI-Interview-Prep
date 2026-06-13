from pydantic import BaseModel


class ProfessionSelect(BaseModel):

    user_id: str

    profession: str