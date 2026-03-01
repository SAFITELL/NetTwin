# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import db
from datetime import datetime
import json

router = APIRouter()

class UpdateStatusPayload(BaseModel):
    tower_id: str
    is_sleeping: bool

@router.get("/status")
async def get_energy_status():
    """Returns the current energy savings based on how many towers are asleep."""
    try:
        sleeping_towers_count = await db.tower.count(where={"status": "SLEEP"})
        
        # In a real scenario, this is derived from wattage * time in sleep mode
        # Here we do a simple estimate: 1.2 kW/h saved per sleeping tower
        total_savings = sleeping_towers_count * 1.2
        
        # Get list of sleeping towers
        sleeping_towers = await db.tower.find_many(where={"status": "SLEEP"})
        
        # Find candidates for sleep (low utilization)
        # For demo, just picking stable online ones
        candidates = await db.tower.find_many(
            where={"status": "ACTIVE"},
            take=3
        )

        return {
            "total_savings_kwh": round(total_savings, 2),
            "sleeping_count": sleeping_towers_count,
            "sleeping_nodes": [{"id": t.id, "name": t.name} for t in sleeping_towers],
            "candidates": [{"id": c.id, "name": c.name} for c in candidates]
        }
    except Exception as e:
        print(f"Energy Route DB Error: {e}")
        return {"total_savings_kwh": 0, "sleeping_count": 0, "sleeping_nodes": [], "candidates": []}

@router.post("/toggle")
async def toggle_sleep_state(payload: UpdateStatusPayload):
    """Toggles a tower's power state in the database."""
    try:
        new_status = "SLEEP" if payload.is_sleeping else "ACTIVE"
        
        updated = await db.tower.update(
            where={"id": payload.tower_id},
            data={"status": new_status, "isActive": not payload.is_sleeping}
        )
        return {"status": "success", "tower_id": updated.id, "new_state": updated.status}
    except Exception as e:
        print(f"Energy Toggle Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update tower state")
