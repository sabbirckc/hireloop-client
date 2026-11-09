import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { ObjectId, type Filter, type Document } from "mongodb"
import { getJobsCollection } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const collection = await getJobsCollection()

        const query: Filter<Document> = ObjectId.isValid(id)
            ? {
                  $or: [
            { _id: new ObjectId(id) },
            { id: id },
        ],
              }
            : {
    id: id,
              }

const result = await collection.deleteOne(query)
console.log(`Deleted job ${id} from MongoDB, deletedCount: ${result.deletedCount}`)

revalidatePath("/dashboard/recruiter/jobs")
revalidatePath("/api/jobs")

return NextResponse.json({ success: true, deletedCount: result.deletedCount })
    } catch (error) {
    console.error("DELETE /api/jobs/[id] error:", error)
    return NextResponse.json(
        { error: "Failed to delete job from MongoDB" },
        { status: 500 }
    )
}
}
