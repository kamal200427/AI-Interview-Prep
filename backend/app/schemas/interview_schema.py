from pydantic import BaseModel,Field
from typing import Literal

from typing import Literal
from pydantic import BaseModel, Field

class InterviewConfig(BaseModel):
    mode: Literal["HR", "Technical", "Behavioral", "Coding"] = Field(
        description="Type of interview."
    )

    difficulty: Literal["easy", "moderate", "hard"] = Field(
        description="Difficulty level of the interview."
    )

    experience_years: float = Field(
        description="Candidate's years of experience."
    )

    role: str = Field(
        description="Target job role, e.g. Machine Learning Engineer, Backend Developer, Data Scientist."
    )


class Interview_chat_schema(BaseModel):
    uid:str
    answer:str


#Structure output schema for interview model
class AnswerEval(BaseModel):
    feedback: str = Field(
        description="Constructive feedback on the candidate's latest answer."
    )

    next_question: str = Field(
        description="The next interview question based on the conversation history."
    )

    confidence_score: int = Field(
        ge=0,
        le=10,
        description="Rate how confident the candidate appeared in the answer. Consider hesitation, uncertainty, and confidence in the explanation."
    )

    technical_accuracy: int = Field(
        ge=0,
        le=10,
        description="Rate the technical correctness of the answer.If there is another round where technical questions are not there, just give 10 marks in this field"
    )

    completeness: int = Field(
        ge=0,
        le=10,
        description="Rate how completely the candidate answered the question."
    )

    grammar_and_language: int = Field(
        ge=0,
        le=10,
        description="Rate the grammar, vocabulary, and sentence structure."
    )

    communication_clarity: int = Field(
        ge=0,
        le=10,
        description="Rate how clearly and effectively the candidate communicated their answer."
    )

    logical_reasoning: int = Field(
        ge=0,
        le=10,
        description="Rate how logical, organized, and coherent the candidate's reasoning was."
    )