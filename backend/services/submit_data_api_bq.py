# part 2

from models.submit_data_api_schema import SubmissionData
from google.cloud import bigquery
from dotenv import load_dotenv
import os
import uuid
import datetime

# Load credentials from .env
load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# should be in env file
PROJECT_ID = "tonal-premise-454821-k0"
DATASET_ID = "umg_data"
TABLE_ID = "music_profiles"

def write_to_bigquery(data: SubmissionData):
    client = bigquery.Client()

    table_ref = f"{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}"

    row = {
        "id": str(uuid.uuid4()),
        "full_name": data.full_name,
        "email": data.email,
        "favorite_genre": data.favorite_genre,
        "monthly_music_hours": data.monthly_music_hours,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

    errors = client.insert_rows_json(table_ref, [row])

    if errors:
        return {
            "status": "error",
            "message": "Failed to write to BigQuery",
            "errors": errors,
            "submitted": row
        }

    return {
        "status": "success",
        "message": "Data written to BigQuery",
        "submitted": row
    }


def fetch_recent_submissions(limit: int = 10):
    client = bigquery.Client()
    query = f"""
        SELECT full_name, email, favorite_genre, monthly_music_hours, timestamp
        FROM `{"tonal-premise-454821-k0"}.umg_data.music_profiles`
        ORDER BY timestamp DESC
        LIMIT {limit}
    """
    query_job = client.query(query)
    results = query_job.result()
    return [dict(row) for row in results]