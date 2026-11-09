import { NextResponse } from "next/server"
import { getJobsCollection } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
    try {
        const collection = await getJobsCollection()
        const jobs = await collection.find({}).toArray()
        const formatted = jobs.map((doc) => ({
            ...doc,
            id: doc.id || doc._id.toString(),
            _id: doc._id.toString(),
        }))
        return NextResponse.json(formatted, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            },
        })
    } catch (error) {
        console.error("GET /api/jobs error:", error)
        return NextResponse.json(
            { error: "Failed to fetch jobs from MongoDB" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const collection = await getJobsCollection()
        const result = await collection.insertOne(body)
        return NextResponse.json({
            ...body,
            _id: result.insertedId.toString(),
            id: body.id || result.insertedId.toString(),
        })
    } catch (error) {
        console.error("POST /api/jobs error:", error)
        return NextResponse.json(
            { error: "Failed to create job in MongoDB" },
            { status: 500 }
        )
    }
}
