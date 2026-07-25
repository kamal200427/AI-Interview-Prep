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
        "question_count": 1,
        "confidence_score":[],
        "technical_accuracy":[],
        "completeness":[],
        "grammar_and_language":[],
        "communication_clarity":[],
        "logical_reasoning": []
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
    print("the interview answer is=",answer)
    config[uid]["history"].append({"user":answer})
    config[uid]["question_count"] = config[uid].get("question_count", 1) + 1
    if config[uid]["question_count"] > 5:
        return {
        "completed": True,
        "feedback": "Interview completed.",
        "next_question": None
        }
    interviewer_model=model.with_structured_output(AnswerEval)
    prompt=interview_chat_prompt.invoke({
        "mode":config[uid]["mode"],"role":config[uid]["role"],"difficulty":config[uid]["difficulty"],"experience_years":config[uid]["experience_years"],"history":config[uid]["history"]
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
    config[uid]["confidence_score"].append(result.confidence_score)
    config[uid]["technical_accuracy"].append(result.technical_accuracy)
    config[uid]["completeness"].append(result.completeness)
    config[uid]["grammar_and_language"].append(result.grammar_and_language)
    config[uid]["communication_clarity"].append(result.communication_clarity)
    config[uid]["logical_reasoning"].append(result.logical_reasoning)
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
    
@router.get("/result/{uid}")
def get_result(uid: str):

    data = config[uid]

    def avg(lst):
        return round(sum(lst) / len(lst)) if lst else 0

    confidence = avg(data["confidence_score"])
    technical = avg(data["technical_accuracy"])
    communication = avg(data["communication_clarity"])

    overall = round(
        (
            confidence +
            technical +
            communication +
            avg(data["completeness"]) +
            avg(data["grammar_and_language"]) +
            avg(data["logical_reasoning"])
        ) / 6
    )

    question_scores = []

    total = len(data["confidence_score"])

    for i in range(total):

        score = round(
            (
                data["confidence_score"][i] +
                data["technical_accuracy"][i] +
                data["communication_clarity"][i] +
                data["completeness"][i] +
                data["grammar_and_language"][i] +
                data["logical_reasoning"][i]
            ) / 6
        )

        question_scores.append({
            "question": i + 1,
            "score": score
        })
    strengths = []

    if technical >= 80:
        strengths.append("Strong technical knowledge")

    if confidence >= 80:
        strengths.append("Confident communication")

    if communication >= 80:
        strengths.append("Clear communication")
    improvements = []

    if technical < 70:
        improvements.append("Improve technical accuracy")

    if communication < 70:
        improvements.append("Improve communication skills")

    if confidence < 70:
        improvements.append("Build confidence while answering")

    return {
        "overall_score": overall,
        "technical_score": technical,
        "communication_score": communication,
        "confidence_score": confidence,
        "questions_answered": total,
        "total_questions": 5,
        "duration": "--",
        "recommendation": "Keep practicing technical interviews.",
        "strengths": strengths,
        "improvements": improvements,
        "question_scores": question_scores
    }