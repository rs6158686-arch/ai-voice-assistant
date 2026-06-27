"""
System control endpoints
Handles system commands and application launching
"""

import logging
import os
import subprocess
import platform
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

logger = logging.getLogger(__name__)
router = APIRouter()

class CommandRequest(BaseModel):
    command: str
    args: Optional[List[str]] = None

class CommandResponse(BaseModel):
    status: str
    output: Optional[str] = None
    error: Optional[str] = None

ALLOWED_APPS = os.getenv("ALLOWED_APPS", "").split(",")
ALLOW_SYSTEM_COMMANDS = os.getenv("ALLOW_SYSTEM_COMMANDS", "false").lower() == "true"

# App shortcuts
APP_SHORTCUTS = {
    "notepad": ("notepad.exe" if platform.system() == "Windows" else "gedit"),
    "calculator": ("calc.exe" if platform.system() == "Windows" else "gnome-calculator"),
    "chrome": ("chrome" if platform.system() == "Windows" else "google-chrome"),
    "firefox": "firefox",
    "vscode": ("code" if platform.system() != "Windows" else "code.cmd"),
    "terminal": ("cmd.exe" if platform.system() == "Windows" else "gnome-terminal"),
    "settings": ("ms-settings:" if platform.system() == "Windows" else "gnome-control-center"),
}

@router.post("/command", response_model=CommandResponse)
async def execute_command(request: CommandRequest):
    """
    Execute a system command
    
    Args:
        command: Command to execute
        args: Command arguments
    
    Returns:
        Command output or error
    """
    if not ALLOW_SYSTEM_COMMANDS:
        logger.warning(f"System commands disabled. Attempted: {request.command}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="System commands are disabled"
        )
    
    try:
        # Build full command
        cmd = [request.command]
        if request.args:
            cmd.extend(request.args)
        
        logger.info(f"Executing command: {' '.join(cmd)}")
        
        # Execute command
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        return CommandResponse(
            status="success",
            output=result.stdout if result.stdout else None,
            error=result.stderr if result.stderr else None
        )
    
    except subprocess.TimeoutExpired:
        logger.error(f"Command timeout: {request.command}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Command execution timeout"
        )
    except Exception as e:
        logger.error(f"Error executing command: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error executing command: {str(e)}"
        )

@router.post("/open-app")
async def open_application(app_name: str):
    """
    Open an application
    
    Args:
        app_name: Name of the application to open
    
    Returns:
        Status of application launch
    """
    app_name_lower = app_name.lower().strip()
    
    if app_name_lower not in APP_SHORTCUTS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Application '{app_name}' not supported"
        )
    
    try:
        app_path = APP_SHORTCUTS[app_name_lower]
        
        logger.info(f"Opening application: {app_name}")
        
        if platform.system() == "Windows":
            os.startfile(app_path)
        else:
            subprocess.Popen(app_path)
        
        return {
            "status": "success",
            "message": f"Opening {app_name}",
            "app": app_name
        }
    
    except Exception as e:
        logger.error(f"Error opening app: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error opening application: {str(e)}"
        )

@router.get("/apps")
async def get_supported_apps():
    """
    Get list of supported applications
    """
    return {
        "apps": [
            {"name": "notepad", "description": "Text editor"},
            {"name": "calculator", "description": "Calculator app"},
            {"name": "chrome", "description": "Google Chrome"},
            {"name": "firefox", "description": "Firefox browser"},
            {"name": "vscode", "description": "Visual Studio Code"},
            {"name": "terminal", "description": "System terminal"},
            {"name": "settings", "description": "System settings"},
        ]
    }

@router.post("/file/open")
async def open_file(file_path: str):
    """
    Open a file with default application
    
    Args:
        file_path: Path to file
    
    Returns:
        Status of file open
    """
    try:
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
        
        logger.info(f"Opening file: {file_path}")
        
        if platform.system() == "Windows":
            os.startfile(file_path)
        elif platform.system() == "Darwin":
            subprocess.Popen(["open", file_path])
        else:
            subprocess.Popen(["xdg-open", file_path])
        
        return {
            "status": "success",
            "message": "File opened",
            "path": file_path
        }
    
    except Exception as e:
        logger.error(f"Error opening file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/system-info")
async def get_system_info():
    """
    Get system information
    """
    import psutil
    
    return {
        "os": platform.system(),
        "platform": platform.platform(),
        "processor": platform.processor(),
        "cpu_percent": psutil.cpu_percent(interval=1),
        "memory": {
            "total": psutil.virtual_memory().total,
            "available": psutil.virtual_memory().available,
            "percent": psutil.virtual_memory().percent
        }
    }
