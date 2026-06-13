from fastapi import FastAPI,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers.question import router as question_router
from routers.auth_route import auth_router
from routers.otp_route import otp_router
from database.database import engine
from models.user_model import UserDB
from routers.chatbot import router as chatbot_router
from routers.genrel_chatbot import router as genrel_chatbot
from routers.search_resource import router as search_router
from routers.roadmap import router as roadmap_router
app=FastAPI()
UserDB.metadata.create_all(bind=engine)

router_list=[question_router,auth_router,otp_router,chatbot_router,genrel_chatbot,search_router,roadmap_router]

for router in router_list:
    app.include_router(router)

# Allow React to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://127.0.0.1:5173"],  # React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return "api is running "