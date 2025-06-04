import { db } from "@/db/index";
import { applications } from "@/db/drizzle/schema";
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
    const allApps = db.select().from(applications);
    return NextResponse.json(allApps);
}

export async function POST(request: Request) {

}

export async function PATCH(request: Request) {

}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return new NextResponse(JSON.stringify({ error: 'Missing ID' }), { status: 400 })
        }
        await db.delete(applications).where(eq(applications.id, body.id));

        return new NextResponse(JSON.stringify({ message: 'Application Deleted Successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ error: 'Server Error', details: err }), { status: 500 })
    }
}