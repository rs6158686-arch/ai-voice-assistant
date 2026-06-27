"""
Chat and AI response endpoints
Handles natural language processing and AI responses
"""

import logging
import os
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import openai

logger = logging.getLogger(__name__)
router = APIRouter()

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Message]] = None
    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7
    max_tokens: int = 500

class ChatResponse(BaseModel):
    response: str
    timestamp: str
    model: str
    tokens_used: Optional[dict] = None

# Store conversation history (in-memory, use database for production)
conversation_histories = {}

@router.post("/message", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    """
    Send a message and get AI response
    
    Args:
        message: User message
        conversation_history: Previous messages for context
        model: AI model to use
        temperature: Creativity level (0-1)
        max_tokens: Maximum response length
    
    Returns:
        AI response with metadata
    """
    try:
        if not openai.api_key:
            logger.error("OpenAI API key not configured")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="AI service not configured"
            )
        
        # Prepare messages for API
        messages = []
        
        if request.conversation_history:
            for msg in request.conversation_history:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        
        ai_message = response.choices[0].message.content
        
        logger.info(f"Generated response: {ai_message[:100]}...")
        
        return ChatResponse(
            response=ai_message,
            timestamp=datetime.now().isoformat(),
            model=request.model,
            tokens_used={
                "prompt": response.usage.prompt_tokens,
                "completion": response.usage.completion_tokens,
                "total": response.usage.total_tokens
            }
        )
    
    except openai.error.AuthenticationError:
        logger.error("Invalid OpenAI API key")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API credentials"
        )
    except openai.error.RateLimitError:
        logger.error("OpenAI rate limit exceeded")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded"
        )
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error generating response"
        )

@router.post("/conversation/start")
async def start_conversation():
    """
    Start a new conversation session
    """
    from uuid import uuid4
    session_id = str(uuid4())
    conversation_histories[session_id] = []
    
    return {
        "session_id": session_id,
        "created_at": datetime.now().isoformat()
    }

@router.post("/conversation/{session_id}/message")
async def send_conversation_message(session_id: str, request: ChatRequest):
    """
    Send message in an existing conversation
    """
    if session_id not in conversation_histories:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation session not found"
        )
    
    # Add to conversation history
    history = conversation_histories[session_id]
    history.append(Message(role="user", content=request.message))
    
    # Get AI response
    response = await send_message(request)
    
    # Add AI response to history
    history.append(Message(role="assistant", content=response.response))
    
    return response

@router.get("/conversation/{session_id}/history")
async def get_conversation_history(session_id: str):
    """
    Get conversation history
    """
    if session_id not in conversation_histories:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation session not found"
        )
    
    return {
        "session_id": session_id,
        "messages": conversation_histories[session_id]
    }

@router.delete("/conversation/{session_id}")
async def delete_conversation(session_id: str):
    """
    Delete a conversation session
    """
    if session_id not in conversation_histories:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation session not found"
        )
    
    del conversation_histories[session_id]
    
    return {"status": "deleted", "session_id": session_id}

@router.get("/models")
async def get_available_models():
    """
    Get list of available AI models
    """
    return {
        "models": [
            {"id": "gpt-4", "name": "GPT-4", "description": "Most capable model"},
            {"id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo", "description": "Fast and efficient"},
        ]
    }
