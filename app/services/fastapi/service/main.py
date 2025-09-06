from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
from pathlib import Path
from typing import Optional, Dict, Any
from fastapi import Depends
from config.mongodb import MongoClientManager, MongoSettings
from pydantic import BaseModel


app = FastAPI()

# CORS for local dev (React dev server)
frontend_port = os.getenv("FRONTEND_PORT", "3000")
frontend_host = os.getenv("FRONTEND_HOST", "localhost")
origins = [
    f"http://{frontend_host}:{frontend_port}",
    f"http://127.0.0.1:{frontend_port}",
    f"http://localhost:{frontend_port}",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NotebookRequest(BaseModel):
    name: str
@app.post("/api/notebooks/")
async def get_notebook(
    request: NotebookRequest,
    client_manager: MongoClientManager = Depends(lambda: MongoClientManager(MongoSettings()))
):
    client = await client_manager.get_client()

    # Access the specific database and collection
    database = client['filesdb']  # Replace 'database_name' with your actual database name
    collection = database['fs.files']   # Access the specific collection
    file = await collection.find_one({"filename": f"/notebooks/{request.name}"})
    if not file:
        raise HTTPException(status_code=404, detail="Notebook not found")

    return file

@app.get("/api/notebook_names/")
async def get_notebook_names(
    client_manager: MongoClientManager = Depends(lambda: MongoClientManager(MongoSettings()))
):
    client = await client_manager.get_client()

    database = client['filesdb']
    # collection = database['fs.files']

    print(database)

    # Access the specific database and collection
    # database = client['filesdb']
    # collection = database['fs.files']

    # # Find all files in the /notebooks directory
    # cursor = collection.find({})
    
    # filenames = []
    # async for document in cursor:
    #     filenames.append(document.get("filename", ""))

    # return list(filter(lambda x: x.startswith("/notebooks/"), filenames))
    