// Production of Samuel.M.K also know as T756-Tech
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prisma";

/**
 * Validates a Bearer Token (API Key) against the database.
 * If valid, returns the organization ID associated with the token.
 * If invalid, returns null.
 */
export async function validateApiKey(request: NextRequest): Promise<string | null> {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.substring(7);

    // Query the database for the active API Key
    const keyRecord = await prisma.apiKey.findUnique({ where: { key: token } });
    if (!keyRecord || !keyRecord.isActive) {
        return null;
    }

    return keyRecord.organizationId;
}

/**
 * Standardized API Wrapper to enforce security across all endpoints.
 */
export async function withApiAuth(
    request: NextRequest,
    handler: (req: NextRequest, orgId: string) => Promise<NextResponse>
) {
    // 1. Validate API Key
    const orgId = await validateApiKey(request);

    if (!orgId) {
        return NextResponse.json(
            { error: "Unauthorized. Invalid or missing API Key." },
            { status: 401 }
        );
    }

    // 2. Execute Handler
    try {
        return await handler(request, orgId);
    } catch (error: any) {
        console.error("API Error: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
