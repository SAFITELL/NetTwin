# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter
from pydantic import BaseModel
import random
from services.mistral_service import MistralService

router = APIRouter()
mistral = MistralService()

class PlanningPayload(BaseModel):
    new_towers_count: int
    region: str

@router.post("/roi")
async def calculate_roi(payload: PlanningPayload):
    """
    Calculates the ROI of adding new towers to a region.
    Uses Mistral AI to evaluate the network state and propose a plan.
    """
    try:
        # 1. Base math calculation
        cost_per_tower = 45000
        total_capex = payload.new_towers_count * cost_per_tower
        
        # Simulate latency drop based on density increase
        latency_reduction_pct = min(payload.new_towers_count * 1.5, 12.0) 
        
        # 2. Get AI Analysis
        prompt = f"We are a telecom operator planning to add {payload.new_towers_count} new 5G small cells in the '{payload.region}' region. Total CapEx is ${total_capex:,}. In 3 sentences, provide an executive summary of the expected ROI, capacity improvements, and strategic value of this deployment."
        
        ai_analysis = await mistral.analyze_network_state(prompt)

        return {
            "capex": total_capex,
            "latency_reduction_pct": latency_reduction_pct,
            "payback_months": random.randint(12, 24),
            "ai_summary": ai_analysis
        }
    except Exception as e:
        print(f"Planning Route Error: {e}")
        return {
            "capex": payload.new_towers_count * 45000,
            "latency_reduction_pct": 5.0,
            "payback_months": 18,
            "ai_summary": "Added capacity will improve user experience and reduce congestion in peak hours."
        }
