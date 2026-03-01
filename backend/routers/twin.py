# Production of Samuel.M.K also know as T756-Tech
from fastapi import APIRouter
from services.simulator import NetworkSimulator

router = APIRouter()
simulator = NetworkSimulator()

@router.get("/status")
async def get_network_status():
    """Returns the current network state array containing telemetry for all towers."""
    data = await simulator.generate_telemetry_tick()
    return data

@router.post("/trigger/{event}")
async def trigger_event(event: str):
    """Triggers an artificial simulation event (like a load spike)."""
    data = await simulator.generate_telemetry_tick(simulate_event=event)
    return {"message": f"Event {event} triggered", "data": data}
