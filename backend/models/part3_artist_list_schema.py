from pydantic import BaseModel, HttpUrl, validator

class CreateListRequest(BaseModel):
    list_id: str
    list_name: str
    created_by: str

class ArtistPayload(BaseModel):
    artist_id: str
    first_name: str
    last_name: str
    profile_url: HttpUrl
    list_id: str
    added_by: str = "unknown"
    primary_genre_name: str = "unknown"

    @validator("artist_id", pre=True, always=True)
    def convert_artist_id_to_str(cls, v):
        return str(v)
    
    class Config:
        json_encoders = {
            HttpUrl: str
        }