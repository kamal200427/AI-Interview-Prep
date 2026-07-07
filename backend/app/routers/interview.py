from fastapi import APIRouter,Request
from schemas.interview_schema import InterviewConfig,Interview_chat_schema
from services.interview_prompt import interview_start_prompt,interview_chat_prompt
from services.llm import model
from schemas.interview_schema import AnswerEval
import uuid

router=APIRouter(prefix="/interview")
config={}
@router.post("/start")
def interview_start(data:InterviewConfig):
    id=uuid.uuid4()
    uid=str(id)
    config[uid]={
        "mode":data.mode,
        "difficulty":data.difficulty,
        "role":data.role,
        "experience_years":data.experience_years,
        "history":[],
        "confidence_score":[],
        "technical_accuracy":[],
        "completeness":[],
        "grammar_and_language":[],
        "communication_clarity":[],
        "logic":[]
    }
    prompt=interview_start_prompt.invoke({"mode":data.mode,"difficulty":data.difficulty,"role":data.role,"experience_years":data.experience_years})

    result=model.invoke(prompt)
    config[uid]["history"].append({"AI":result.content})

    return {"uid":uid,
            "response":result.content}


@router.post("/chat")
def interview_chat(data:Interview_chat_schema):
    uid=data.uid
    answer=data.answer
    config[uid]["history"].append({"user":answer})
    interviewer_model=model.with_structured_output(AnswerEval)
    prompt=interview_chat_prompt.invoke({
        "mode":config[uid]["mode"],"role":config[uid]["role"],"difficulty":config[uid]["difficulty"],"experience_years":config[uid]["experience_years"],"history":["history"]
    })
    result=interviewer_model.invoke(prompt)
    
    # confidence_score=result.confidence_score
    # technical_accuracy=result.technical_accuracy
    # completeness=result.completeness
    # grammar_and_language=result.grammar_and_language
    # communication_clarity=result.communication_clarity
    # logic=result.logical_reasoning
    # next_question=result.next_question
    # feedback=result.feedback

    #update config
    config[uid]["history"].append({
    "role": "user",
    "content": data.answer,
    "evaluation": {
        "confidence_score": result.confidence_score,
        "technical_accuracy": result.technical_accuracy,
        "completeness": result.completeness,
        "grammar_and_language": result.grammar_and_language,
        "communication_clarity": result.communication_clarity,
        "logical_reasoning": result.logical_reasoning,
        "feedback": result.feedback
        }
    })
    return {
    "next_question": result.next_question,
    "feedback": result.feedback,
    "scores": {
        "confidence": config[uid]["confidence_score"],
        "technical_accuracy": config[uid]["technical_accuracy"],
        "completeness": config[uid]["completeness"],
        "grammar_and_language": config[uid]["grammar_and_language"],
        "communication_clarity": config[uid]["communication_clarity"],
        "logical_reasoning": config[uid]["logical_reasoning"],
        }
    }