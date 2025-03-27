# part 3

from google.cloud import bigquery
from datetime import datetime
import os

# Setup BigQuery client
client = bigquery.Client()

# Constants
PROJECT_ID = "tonal-premise-454821-k0"
DATASET_ID = "umg_part_3"

def table_ref(table_name):
    return f"{PROJECT_ID}.{DATASET_ID}.{table_name}"

# Artist Table (Create + ReadALL + ReadByID)
def insert_artist(artist_id, first_name, last_name, profile_url, primary_genre_name):
    table = table_ref("artists")
    rows = [{
        "artist_id": artist_id,
        "first_name": first_name,
        "last_name": last_name,
        "profile_url": str(profile_url),
        "primary_genre_name": primary_genre_name
    }]
    errors = client.insert_rows_json(table, rows)
    return {"status": "ok" if not errors else "error", "details": errors or rows}

def get_artist_by_id(artist_id: str):
    query = f"""
        SELECT artist_id, first_name, last_name, profile_url, primary_genre_name
        FROM `{table_ref("artists")}`
        WHERE artist_id = @artist_id
        LIMIT 1
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("artist_id", "STRING", artist_id)
        ]
    )
    results = client.query(query, job_config=job_config).result()
    rows = [dict(row) for row in results]
    return rows[0] if rows else None

def get_all_artists():
    query = f"""
        SELECT artist_id, first_name, last_name, profile_url
        FROM `{table_ref("artists")}`
        ORDER BY last_name ASC, first_name ASC
    """
    results = client.query(query).result()
    return [dict(row) for row in results]

# List Table (Create + Read)
def insert_list(list_id, name, created_by):
    table = table_ref("lists")
    now = datetime.utcnow().isoformat()
    rows = [{
        "list_id": list_id,
        "name": name,
        "created_by": created_by,
        "created_at": now,
        "updated_at": now
    }]
    errors = client.insert_rows_json(table, rows)
    return {"status": "ok" if not errors else "error", "details": errors or rows}

def get_all_lists():
    query = f"""
        SELECT * FROM `{table_ref("lists")}`
        ORDER BY updated_at DESC
    """
    return [dict(row) for row in client.query(query).result()]

# Artist In List (Create + Delete + Read)
def add_artist_to_list(list_id, artist_id, added_by_user):
    table = table_ref("artist_in_list")
    rows = [{
        "list_id": list_id,
        "artist_id": artist_id,
        "added_by_user": added_by_user,
        "added_at": datetime.utcnow().isoformat()
    }]
    errors = client.insert_rows_json(table, rows)
    return {"status": "ok" if not errors else "error", "details": errors or rows}

def remove_artist_from_list(list_id, artist_id):
    query = f"""
        DELETE FROM `{table_ref("artist_in_list")}`
        WHERE list_id = @list_id AND artist_id = @artist_id
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("list_id", "STRING", list_id),
            bigquery.ScalarQueryParameter("artist_id", "STRING", artist_id),
        ]
    )
    job = client.query(query, job_config=job_config)
    job.result()
    return {"status": "ok", "message": f"Artist {artist_id} removed from list {list_id}"}

def get_artists_in_list(list_id):
    print(list_id)
    query = f"""
        SELECT a.artist_id, a.first_name, a.last_name, a.profile_url, l.added_at, l.added_by_user, a.primary_genre_name
        FROM `{table_ref("artist_in_list")}` l
        JOIN `{table_ref("artists")}` a ON a.artist_id = l.artist_id
        WHERE l.list_id = @list_id
        ORDER BY l.added_at DESC
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("list_id", "STRING", list_id),
        ]
    )
    return [dict(row) for row in client.query(query, job_config=job_config).result()]


# User Table

def fetch_all_users():
    query = f"""
        SELECT user_id, name
        FROM `{table_ref("users")}`
        ORDER BY name
    """
    results = client.query(query).result()
    return [dict(row) for row in results]