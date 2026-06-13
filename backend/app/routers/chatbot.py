from fastapi import APIRouter
from langchain_core.runnables import RunnableLambda,RunnableParallel,RunnablePassthrough
from langchain_core.output_parsers  import StrOutputParser
from schemas.chatbot_schema import Question
from services.retriver_logic import db_retriver
from services.chatbot import query_prompt,query_dict
from services.llm import model

router=APIRouter(prefix="/content")


@router.post("/{subject}")
def chatbot(subject: str, question: Question):

    retriever = db_retriver(subject=subject)

    query = question.query

    docs = retriever.invoke(query)
    context = "\n\n".join(doc.page_content for doc in docs)

    chain = query_prompt() | model | StrOutputParser()

    result = chain.invoke({
        "subject": subject,
        "question": query,
        "context": context
    })

    return {"response": result}
 

