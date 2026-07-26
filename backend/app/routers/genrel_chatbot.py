from fastapi import APIRouter
from services.retriver_logic import embedding_model
from services.llm import model
from schemas.chatbot_schema import Question
from services.retriver_logic import genrel_retriver
from services.chatbot import genrel_prompt
from langchain_core.output_parsers import StrOutputParser

router=APIRouter(prefix="/overview")


retriver=genrel_retriver()
prompt=genrel_prompt()
parser=StrOutputParser()
chain=prompt | model | parser 

@router.post("/chatbot")
def chatbot(question:Question):
    query=question.query
    # retriver=genrel_retriver()
    # prompt=genrel_prompt()
    # parser=StrOutputParser()
    docs=retriver.invoke(query)
    context= "\n\n".join(doc.page_content for doc in docs)
    # chain=prompt | model | parser 
    result=chain.invoke({"context":context,"question":query})
    return {"response":result}