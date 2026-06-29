from langchain_core.prompts import PromptTemplate
from schemas.question_structure import Quiz
from langchain_core.output_parsers import PydanticOutputParser
from services.llm import model

def question(topic:str):
    prompt = PromptTemplate(
    template="""
        You are an expert MCQ generator.

        Generate exactly 20 MCQs for topic: {topic}

        Rules:
        - Output ONLY valid JSON
        - No explanation
        - No markdown

        Return format:

        {{
        "quiz": [
            {{
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correct_option": 0
            }}
        ]
        }}
        """,
            input_variables=["topic"]
        )
    parser=PydanticOutputParser(pydantic_object=Quiz)

    chain=prompt|model|parser

    result=chain.invoke({"topic":topic})
    
    return result

