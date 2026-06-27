"""
Health check endpoints
"""

from fastapi import APIRouter, status
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str

@router.get("/health", response_model=HealthResponse, status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint
    Returns the current status of the API
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        version="1.0.0"
    )

@router.get("/status")
async def get_status():
    """
    Get detailed status information
    """
    return {
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "components": {
            "api": "healthy",
            "voice_processing": "ready",
            "ai_engine": "ready",
            "system_control": "ready"
        }
    }
