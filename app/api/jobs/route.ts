import { NextResponse } from "next/server"
import type { Filter, Document } from "mongodb"
import { getJobsCollection } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

    export async function GET(request: Request) {
        try {
            const { searchParams } = new URL(request.url)
            const jobType = searchParams.get("jobType")
            const isRemote = searchParams.get("isRemote")
            const category = searchParams.get("category") || searchParams.get("calegory")
            const search = searchParams.get("search") || searchParams.get("q")

            const query: Filter<Document> = {}

            // Filter by jobType (case-insensitive, e.g. "part-time" matches "Part-time")
            if (jobType) {
                const sanitizedJobType = jobType.replace(/-/g, '[-\\s]')
                query.jobType = { $regex: new RegExp(`^${sanitizedJobType}$`, "i") }
            }

            // Filter by remote status
            if (isRemote !== null && isRemote !== undefined) {
                if (isRemote === "true") query.isRemote = true
                else if (isRemote === "false") query.isRemote = false
            }

            // Filter by category
            if (category) {
                query.category = { $regex: new RegExp(category, "i") }
            }

            // Search text across title, company, requirements, etc.
            if (search) {
                const searchRegex = { $regex: search, $options: "i" }
                query.$or = [
                    { title: searchRegex },
                    { jobTitle: searchRegex },
                    { companyName: searchRegex },
                    { company: searchRegex },
                    { location: searchRegex },
                    { category: searchRegex },
                    { responsibilities: searchRegex },
                    { requirements: searchRegex },
                ]
            }

            const collection = await getJobsCollection()
            const jobs = await collection.find(query).toArray()
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
