from pydantic import BaseModel

class User(BaseModel):

    login_type: str

    name: str

    email: str

    role: str

    picture: str | None = None

    google_id: str | None = None

from pydantic import BaseModel


class UserUpdateSchema(
    BaseModel
):

    email: str

    phone: str | None = None

    college: str | None = None

    degree: str | None = None

    graduation_year: str | None = None

    github: str | None = None

    linkedin: str | None = None

    bio: str | None = None