# Production of Samuel.M.K also know as T756-Tech
from prisma import Prisma

db = Prisma()

async def seed_database():
    import random
    
    # Check if org exists
    org = await db.organization.find_first(where={"name": "NetTwin Demo Org"})
    if not org:
        org = await db.organization.create(data={
            "name": "NetTwin Demo Org"
        })
        
    # Check if network exists
    net = await db.network.find_first(where={"name": "Global Demo Network"})
    if not net:
        net = await db.network.create(data={
            "name": "Global Demo Network",
            "region": "Global",
            "organizationId": org.id
        })
        
    # Check if towers exist
    towers_count = await db.tower.count()
    if towers_count == 0:
        # Create 50 towers matching our simulation
        for i in range(50):
            tower_id = f"TWR-{i:03d}"
            lat = 37.7749 + random.uniform(-0.1, 0.1)
            lng = -122.4194 + random.uniform(-0.1, 0.1)
            await db.tower.create(data={
                "id": tower_id,
                "networkId": net.id,
                "name": f"Tower {tower_id}",
                "lat": lat,
                "lng": lng,
                "capacity": float(random.randint(500, 2000)),
                "status": "ACTIVE",
                "isActive": True
            })
