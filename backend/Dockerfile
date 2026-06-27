FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    portaudio19-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY .env.example .env

EXPOSE 8000

CMD ["python", "main.py"]