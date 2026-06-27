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
import os

logger = logging.getLogger(__name__)
router = APIRouter()

class TranscribeRequest(BaseModel):
    language: str = "hi-IN"
    timeout: int = 10

class TranscribeResponse(BaseModel):
    text: str
    confidence: float
    language: str

# Default language from environment
DEFAULT_LANGUAGE = os.getenv("DEFAULT_LANGUAGE", "hi-IN")

@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(
    file: UploadFile = File(...),
    language: str = DEFAULT_LANGUAGE
):
    """
    Transcribe audio file to text using Google Speech Recognition
    
    Args:
        file: Audio file (WAV, MP3, FLAC supported)
        language: Language code (default: hi-IN for Hindi)
    
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
        
        # Perform transcription in specified language
        try:
            text = recognizer.recognize_google(audio, language=language)
            
            logger.info(f"Successfully transcribed audio in {language}: {text}")
            
            return TranscribeResponse(
                text=text,
                confidence=0.95,
                language=language
            )
        except sr.UnknownValueError:
            logger.warning("Could not understand audio")
            if language.startswith('hi'):
                detail = "आवाज़ को समझ नहीं सके। कृपया दोबारा कोशिश करें।"
            else:
                detail = "Could not understand audio content"
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=detail
            )
        except sr.RequestError as e:
            logger.error(f"Speech recognition error: {str(e)}")
            if language.startswith('hi'):
                detail = "Speech recognition सेवा उपलब्ध नहीं है"
            else:
                detail = "Speech recognition service unavailable"
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=detail
            )
    
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}")
        if language.startswith('hi'):
            detail = "Audio को process करने में error आई"
        else:
            detail = "Error processing audio file"
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail
        )

@router.post("/stream")
async def stream_audio(
    file: UploadFile = File(...),
    language: str = DEFAULT_LANGUAGE
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
            {"code": "hi-IN", "name": "🇮🇳 हिंदी (Hindi)", "flag": "🇮🇳"},
            {"code": "en-US", "name": "🇺🇸 English (US)", "flag": "🇺🇸"},
            {"code": "en-GB", "name": "🇬🇧 English (UK)", "flag": "🇬🇧"},
            {"code": "es-ES", "name": "🇪🇸 Spanish", "flag": "🇪🇸"},
            {"code": "fr-FR", "name": "🇫🇷 French", "flag": "🇫🇷"},
            {"code": "de-DE", "name": "🇩🇪 German", "flag": "🇩🇪"},
            {"code": "it-IT", "name": "🇮🇹 Italian", "flag": "🇮🇹"},
            {"code": "ja-JP", "name": "🇯🇵 Japanese", "flag": "🇯🇵"},
            {"code": "zh-CN", "name": "🇨🇳 Chinese (Simplified)", "flag": "🇨🇳"},
            {"code": "pt-BR", "name": "🇧🇷 Portuguese (Brazil)", "flag": "🇧🇷"},
            {"code": "ru-RU", "name": "🇷🇺 Russian", "flag": "🇷🇺"},
        ]
    }
