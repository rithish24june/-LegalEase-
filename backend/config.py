import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "LegalEase AI Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = ""
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()
