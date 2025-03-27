# part 2

from fastapi import APIRouter, HTTPException
from models.submit_data_api_schema import SubmissionData
from services.submit_data_api_bq import write_to_bigquery, fetch_recent_submissions

router = APIRouter()

@router.post("/")
async def submit_form(data: SubmissionData):
    try:
        result = write_to_bigquery(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    


@router.get("/submissions")
def get_recent_submissions(limit: int = 10):
    return fetch_recent_submissions(limit)