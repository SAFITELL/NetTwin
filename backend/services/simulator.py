# Production of Samuel.M.K also know as T756-Tech
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
from database import db

class NetworkSimulator:
    def __init__(self, num_towers: int = 50):
        self.num_towers = num_towers
        self.towers = self._initialize_towers()
        self.current_time = datetime.now()
        
    def _initialize_towers(self) -> pd.DataFrame:
        """
        Creates synthetic tower locations and baseline capacities.
        """
        data = {
            "tower_id": [f"TWR-{i:03d}" for i in range(self.num_towers)],
            "region": [random.choice(["Downtown", "Suburbs", "Industrial", "Stadium"]) for _ in range(self.num_towers)],
            "max_bandwidth_mbps": [random.randint(500, 2000) for _ in range(self.num_towers)],
            "lat": [37.7749 + random.uniform(-0.1, 0.1) for _ in range(self.num_towers)],
            "lng": [-122.4194 + random.uniform(-0.1, 0.1) for _ in range(self.num_towers)],
            "status": ["ACTIVE"] * self.num_towers
        }
        return pd.DataFrame(data)

    async def generate_telemetry_tick(self, simulate_event: str = None) -> list[dict]:
        """
        Generates realistic metrics for one 'tick' of time across all towers.
        Now async and persists tick data to PostgreSQL Database using Prisma.
        """
        self.current_time += timedelta(minutes=5)
        
        utilization = np.random.normal(loc=40.0, scale=10.0, size=self.num_towers)
        
        if simulate_event == "STADIUM_MATCH":
            stadium_mask = self.towers["region"] == "Stadium"
            utilization[stadium_mask] = np.random.normal(loc=85.0, scale=5.0, size=stadium_mask.sum())
            
        elif simulate_event == "PAYDAY":
            utilization += 30.0

        utilization = np.clip(utilization, 5.0, 100.0)
        latency_ms = 10.0 + (np.exp(utilization / 20.0))
        packet_loss_pct = np.clip((utilization - 80) * 0.2, 0.0, 10.0)

        tick_data = []
        for i in range(self.num_towers):
            row = self.towers.iloc[i]
            util_val = round(float(utilization[i]), 2)
            lat_val = round(float(latency_ms[i]), 2)
            loss_val = round(float(packet_loss_pct[i]), 2)
            status_val = "CRITICAL" if util_val > 85 else ("WARNING" if util_val > 70 else "NORMAL")
            
            tick_data.append({
                "timestamp": self.current_time,
                "tower_id": row["tower_id"],
                "region": row["region"],
                "utilization_pct": util_val,
                "latency_ms": lat_val,
                "packet_loss_pct": loss_val,
                "status": status_val
            })

        # Persist full telemetry tick to the PostgreSQL 'NetworkMetrics' table
        try:
            await db.networkmetrics.create_many(
                data=[
                    {
                        "towerId": t["tower_id"],
                        "timestamp": t["timestamp"],
                        "utilizationPct": t["utilization_pct"],
                        "latencyMs": t["latency_ms"],
                        "packetLossPct": t["packet_loss_pct"],
                        "status": t["status"]
                    }
                    for t in tick_data
                ]
            )
        except Exception as e:
            print(f"PostgreSQL logging skip (run prisma generate!): {e}")

        # Stringify timestamps for JSON response to frontend
        for t in tick_data:
            t["timestamp"] = t["timestamp"].isoformat()

        return tick_data
