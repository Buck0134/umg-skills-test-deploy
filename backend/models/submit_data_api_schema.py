# part 2

from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class SubmissionData(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    favorite_genre: Optional[str] = Field(default="Unknown", max_length=25)
    monthly_music_hours: Optional[int] = Field(
        default=None,
        ge=0,
        le=720,
        description="Estimated number of hours spent listening to music per month"
    )