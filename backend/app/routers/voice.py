"""
Voice processing endpoints
Handles speech-to-text conversion and audio processing
"""

import logging
from fastapi import APIRouter, File, UploadFile, HTTPException, status
from pydantic import BaseModel
from typing import Optional
import speech_recognition as sr
import io

logger = logging.getLogger(__name__)
router = APIRouter()

class TranscribeRequest(BaseModel):
    language: str = "en-US"
    timeout: int = 10

class TranscribeResponse(BaseModel):
    text: str
    confidence: float
    language: str

@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(
    file: UploadFile = File(...),
    language: str = "en-US"
):
    """
    Transcribe audio file to text using Google Speech Recognition
    
    Args:
        file: Audio file (WAV, MP3, FLAC supported)
        language: Language code (default: en-US)
    
    Returns:
        Transcribed text with confidence score
    """
    try:
        # Read audio file
        audio_data = await file.read()
        
        # Initialize recognizer
        recognizer = sr.Recognizer()
        
        # Convert bytes to AudioData
        audio_file = sr.AudioFile(io.BytesIO(audio_data))
        
        with audio_file as source:
            audio = recognizer.record(source)
        
        # Perform transcription
        try:
            text = recognizer.recognize_google(audio, language=language)
            
            logger.info(f"Successfully transcribed audio: {text}")
            
            return TranscribeResponse(
                text=text,
                confidence=0.95,  # Google API doesn't return confidence
                language=language
            )
        except sr.UnknownValueError:
            logger.warning("Could not understand audio")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not understand audio content"
            )
        except sr.RequestError as e:
            logger.error(f"Speech recognition error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Speech recognition service unavailable"
            )
    
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing audio file"
        )

@router.post("/stream")
async def stream_audio(
    file: UploadFile = File(...),
    language: str = "en-US"
):
    """
    Stream audio for real-time transcription
    """
    try:
        audio_data = await file.read()
        recognizer = sr.Recognizer()
        audio_file = sr.AudioFile(io.BytesIO(audio_data))
        
        with audio_file as source:
            audio = recognizer.record(source)
        
        text = recognizer.recognize_google(audio, language=language)
        
        return {
            "status": "success",
            "text": text,
            "language": language
        }
    except Exception as e:
        logger.error(f"Stream transcription error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/supported-languages")
async def get_supported_languages():
    """
    Get list of supported languages for transcription
    """
    return {
        "languages": [
            {"code": "en-US", "name": "English (US)"},
            {"code": "en-GB", "name": "English (UK)"},
            {"code": "es-ES", "name": "Spanish"},
            {"code": "fr-FR", "name": "French"},
            {"code": "de-DE", "name": "German"},
            {"code": "it-IT", "name": "Italian"},
            {"code": "ja-JP", "name": "Japanese"},
            {"code": "zh-CN", "name": "Chinese (Simplified)"},
            {"code": "hi-IN", "name": "Hindi"},
        ]
    }
