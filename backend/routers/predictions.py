# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter
from pydantic import BaseModel
from services.mistral_service import MistralService
import json

router = APIRouter()
mistral = MistralService()

class PredictionPayload(BaseModel):
    event_type: str
    target_region: str
    severity: int

@router.post("/simulate")
async def run_scenario(payload: PredictionPayload):
    """
    Runs a prediction scenario using Mistral AI to forecast network load
    and recommend infrastructure changes.
    """
    try:
        # Construct prompt for the AI
        prompt = f"""
We are running a simulated disaster scenario on our 5G telecom network.
Context:
- Event: {payload.event_type}
- Affected Region: {payload.target_region}
- Severity (1-5): {payload.severity}

Please provide a json response predicting the impact. The format must be exactly:
{{
    "predicted_downtime_minutes": <number>,
    "affected_users": <number roughly scaled to severity and region size>,
    "critical_failures": [<array of string names of simulated towers likely to fail, e.g. "TWR-014", "TWR-022">],
    "ai_analysis": "<2 sentence explanation of the cascading failure mode>"
}}
"""
        # Call Mistral to generate the prediction matrix
        ai_response = await mistral.analyze_network_state(prompt)
        
        # Parse the JSON response directly from the LLM
        try:
            # Mistral might wrap the json in backticks
            cleaned = ai_response.replace('```json', '').replace('```', '').strip()
            prediction_data = json.loads(cleaned)
        except Exception:
            # Fallback if AI fails to use strict JSON
            prediction_data = {
                "predicted_downtime_minutes": payload.severity * 45,
                "affected_users": payload.severity * 15000,
                "critical_failures": ["TWR-012", "TWR-044", "TWR-029"],
                "ai_analysis": ai_response
            }

        return prediction_data
        
    except Exception as e:
        print(f"Prediction Route Error: {e}")
        return {
            "predicted_downtime_minutes": 120,
            "affected_users": 45000,
            "critical_failures": ["TWR-XYZ"],
            "ai_analysis": "Simulated fallback response."
        }
