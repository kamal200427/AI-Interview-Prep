from fastapi import APIRouter,Form
from schemas.chatbot_schema import Question
router=APIRouter()

@router.post("/subject/{subject}")
def chatbot(query:str,subject:str):
    pass
