import sys
from pathlib import Path

sys.path.append(
    str(Path(__file__).resolve().parent.parent)
)
from database.database import Base, engine

# import ALL models
from models.profession import Profession
from models.profession import RoadmapSubject
from models.profession import UserRoadmap

Base.metadata.create_all(bind=engine)

print("Tables created successfully")