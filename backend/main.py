# Production of Samuel.M.K also know as T756-Tech
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db, seed_database
from routers import twin, ai, analytics, actions, energy, planning, predictions

app = FastAPI(
    title="NetTwin AI Backend",
    description="API for telecom network simulation and Mistral AI reasoning",
    version="0.1.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(twin.router, prefix="/api/v1/twin", tags=["Digital Twin"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Operations"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(actions.router, prefix="/api/v1/actions", tags=["Actions"])
app.include_router(energy.router, prefix="/api/v1/energy", tags=["Energy"])
app.include_router(planning.router, prefix="/api/v1/planning", tags=["Planning"])
app.include_router(predictions.router, prefix="/api/v1/predictions", tags=["Predictions"])

@app.on_event("startup")
async def startup():
    await db.connect()
    try:
        await seed_database()
        print("Database connected and seeded.")
    except Exception as e:
        print(f"Error seeding database: {e}")

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "nettwin-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
