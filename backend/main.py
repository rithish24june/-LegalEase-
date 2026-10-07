from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import generate, documents, export

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="LegalEase AI Document Generator API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routes
app.include_router(generate.router)
app.include_router(documents.router)
app.include_router(export.router)

@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "gemini_configured": bool(settings.GEMINI_API_KEY)
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "legalease-backend"}
