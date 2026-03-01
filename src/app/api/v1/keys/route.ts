// Production of Samuel.M.K also know as T756-Tech
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // In a fully authenticated session, we'd grab the organizationId from the user session.
        // For demonstration of the fully connected backend, we query all keys or a default org.

        // Use a default org ID since NextAuth isn't fully protecting pages yet, but we are querying real DB
        const orgId = "1"; // Placeholder for demo until NextAuth hooks into the DB

        const keys = await prisma.apiKey.findMany();

        // Alternatively, if the table is empty (because the user just created the DB and it has nothing)
        // we return an empty array, which is accurate production behavior.
        return NextResponse.json({ keys }, { status: 200 });

    } catch (error) {
        console.error("Database connection failed or table does not exist yet:", error);
        // This handles cases where the user hasn't successfully pushed Prisma yet, preventing 500 crashes
        return NextResponse.json({
            error: "Database connection failed.",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 503 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name } = body;

        // Ensure there is at least a dummy organization to attach to if setting up fresh
        let devOrg = await prisma.organization.findFirst();
        if (!devOrg) {
            devOrg = await prisma.organization.create({
                data: { name: "Default Telecom" }
            });
        }

        // Generate a random secure key
        const newKeyString = "nt_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const newKey = await prisma.apiKey.create({
            data: {
                name: name || "Production API Key",
                key: newKeyString,
                organizationId: devOrg.id
            }
        });

        return NextResponse.json({ key: newKey }, { status: 201 });
    } catch (error) {
        console.error("Failed to generate key:", error);
        return NextResponse.json({ error: "Failed to create API key." }, { status: 500 });
    }
}
