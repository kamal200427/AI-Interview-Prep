from services.llm import model
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from schemas.roadmap_schema import Skills

parser=PydanticOutputParser(pydantic_object=Skills)

prompt=PromptTemplate(template=""" User Input: {user_input}

    Extract the required technologies, libraries, frameworks, and skills.

    IMPORTANT:
    - Return ONLY a valid JSON object.
    - Do NOT use markdown.
    - Do NOT use ```json.
    - Do NOT provide explanations.
    - Do NOT provide additional text.

    {format_instruction}
""",input_variables=["user_input"], partial_variables={
        "format_instruction": parser.get_format_instructions()
    })

def roadmap_generator(role:str):
    chian=prompt | model
    output=chian.invoke({"user_input":role})
    skill_list=parser.parse(output.content).required_skills
    return skill_list 