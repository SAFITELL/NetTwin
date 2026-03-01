// Production of Samuel.M.K also know as T756-Tech
import { NextRequest, NextResponse } from "next/server";
import { withApiAuth } from "../../../../../lib/apiAuth";
import prisma from "../../../../../lib/prisma";

export async function GET(request: NextRequest) {
    // We wrap the actual logic inside the `withApiAuth` gateway.
    // It verifies the Bearer token and returns the organization ID.
    return withApiAuth(request, async (req, orgId) => {

        // Fetch the real digital twin topology for this specific organization from the database.
        const networkNodes = await prisma.tower.findMany({
            where: { network: { organizationId: orgId } }
        });

        if (!networkNodes || networkNodes.length === 0) {
            return NextResponse.json({ message: "No network data found for this organization." }, { status: 404 });
        }

        return NextResponse.json({ data: networkNodes });
    });
}
