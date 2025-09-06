from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
import os

class MongoSettings(BaseSettings):
    uri: str = f"mongodb://user:password@localhost:27017"

class MongoClientManager:
    def __init__(self, settings: MongoSettings):
        self.settings = settings
        self.client = None

    async def connect(self):
        self.client = AsyncIOMotorClient(self.settings.uri)

    async def get_client(self):
        if self.client is None:
            await self.connect()
        return self.client
