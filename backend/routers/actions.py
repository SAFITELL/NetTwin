# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
from database import db

router = APIRouter()

class ExecuteActionPayload(BaseModel):
    tower_id: str
    recommendation: str

class DecisionLogEntry(BaseModel):
    id: int
    timestamp: str
    action_taken: str
    target: str
    confidence: float

@router.post("/execute", response_model=DecisionLogEntry)
async def execute_ai_strategy(payload: ExecuteActionPayload):
    """
    Executes the optimization strategy recommended by Mistral AI.
    Logs the action firmly into the PostgreSQL database.
    """
    try:
        # Save real action to PostgreSQL Database
        new_log = await db.decisionlog.create(
            data={
                "actionTaken": payload.recommendation[:250],
                "target": f"Tower {payload.tower_id}",
                "confidence": 0.94
            }
        )
        
        return DecisionLogEntry(
            id=new_log.id,
            timestamp=new_log.timestamp.isoformat(),
            action_taken=new_log.actionTaken,
            target=new_log.target,
            confidence=new_log.confidence
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Database write failed. Ensure Prisma DB is pushed.")

@router.get("/log", response_model=List[DecisionLogEntry])
async def get_decision_log():
    """
    Retrieves the decision audit log securely from PostgreSQL Database.
    """
    try:
        logs = await db.decisionlog.find_many(
            order={"timestamp": "desc"},
            take=50
        )
        
        return [
            DecisionLogEntry(
                id=log.id,
                timestamp=log.timestamp.isoformat(),
                action_taken=log.actionTaken,
                target=log.target,
                confidence=log.confidence
            )
            for log in logs
        ]
    except Exception as e:
        print(e)
        return [] # Return empty if db not initialized
