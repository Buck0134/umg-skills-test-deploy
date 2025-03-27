from fastapi import APIRouter, HTTPException
from services.bigquery_artist_list import (
    insert_artist,
    insert_list,
    add_artist_to_list,
    remove_artist_from_list,
    get_artists_in_list,
    get_artist_by_id,
    fetch_all_users,
    get_all_lists
)

from models.part3_artist_list_schema import CreateListRequest, ArtistPayload

from datetime import datetime

router = APIRouter()


@router.post("/artist")
def create_artist(artist_id: str, first_name: str, last_name: str, profile_url: str):
    try:
        insert_artist(artist_id, first_name, last_name, profile_url)
        return {"message": "Artist added successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add artist: {str(e)}")


@router.post("/list")
def create_list(payload: CreateListRequest):
    try:
        print(payload)
        insert_list(payload.list_id, payload.list_name, payload.created_by)
        return {"message": "List created successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create list: {str(e)}")


@router.post("/list/add-artist")
def add_artist_to_list_endpoint(payload: ArtistPayload):
    try:
        # Use the list_id from the payload
        list_id = payload.list_id
        
        # Check if the artist already exists in our database
        existing_artist = get_artist_by_id(payload.artist_id)
        if not existing_artist:
            # Insert the artist into the artists table
            insert_result = insert_artist(
                payload.artist_id,
                payload.first_name,
                payload.last_name,
                payload.profile_url,
                payload.primary_genre_name
            )
            if insert_result.get("status") != "ok":
                raise Exception(f"Insert artist failed: {insert_result.get('details')}")
        
        # Add the artist to the list
        list_result = add_artist_to_list(
            list_id, payload.artist_id, payload.added_by
        )
        if list_result.get("status") != "ok":
            raise Exception(f"Adding artist to list failed: {list_result.get('details')}")
        
        # Return the artist details back to the frontend.
        return {
            "artist_id": payload.artist_id,
            "first_name": payload.first_name,
            "last_name": payload.last_name,
            "profile_url": payload.profile_url,
            "primary_genre_name": payload.primary_genre_name,
            "added_by_user": payload.added_by,
            "added_at": datetime.now()
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Failed to add artist: {str(e)}")


@router.delete("/list/remove-artist")
def remove_from_list(list_id: str, artist_id: str):
    try:
        remove_artist_from_list(list_id, artist_id)
        return {"message": "Artist removed from list successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove artist from list: {str(e)}")


@router.get("/list/{list_id}/artists")
def get_artists(list_id: str):
    try:
        return get_artists_in_list(list_id)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch artists: {str(e)}")


@router.get("/")
def get_lists():
    try:
        return get_all_lists()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch all artists: {str(e)}")


@router.get("/artist/{artist_id}")
def get_artist(artist_id: str):
    try:
        artist = get_artist_by_id(artist_id)
        if not artist:
            raise HTTPException(status_code=404, detail="Artist not found")
        return artist
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch artist: {str(e)}")
    
@router.get("/users")
def get_all_users():
    try:
        return fetch_all_users()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch users: {str(e)}")