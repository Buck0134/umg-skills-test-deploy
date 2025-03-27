from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from routers import submit_data_api, custom_artist_list
from routers import submit_data_api
from routers import part3_artist_list_routes

app = FastAPI(title="UMG Skills Test Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(submit_data_api.router, prefix="/submit", tags=["Submit Data API"])
app.include_router(part3_artist_list_routes.router, prefix="/lists", tags=["Custom Artist List API"])

# heatkh check!
@app.get("/")
def read_root():
    return {"message": "UMG Backend API is running"}