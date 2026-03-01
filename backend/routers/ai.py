# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from services.mistral_service import analyze_network_state, chat_with_noc
import json

router = APIRouter()

class TelemetryPayload(BaseModel):
    tower_id: str
    region: str
    utilization_pct: float
    latency_ms: float
    packet_loss_pct: float
    status: str

class ChatMessagePayload(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    history: List[ChatMessagePayload]
    new_message: str

@router.post("/analyze")
async def trigger_ai_analysis(telemetry: TelemetryPayload):
    """
    Sends a specific tower's telemetry payload to Mistral AI for anomaly detection
    and load balancing recommendations.
    """
    try:
        # Convert Pydantic model to dict for the service prompt
        payload_dict = telemetry.model_dump()
        analysis_result = analyze_network_state(payload_dict)
        
        return {
            "status": "success",
            "tower_id": telemetry.tower_id,
            "mistral_recommendation": analysis_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def ask_mistral(request: ChatRequest):
    """
    Conversational interface for NOC engineers to ask Mistral about network state.
    """
    try:
        # Convert list of Pydantic models to list of dicts
        history_dicts = [msg.model_dump() for msg in request.history]
        response_text = chat_with_noc(history_dicts, request.new_message)
        
        return {
            "role": "assistant",
            "content": response_text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
