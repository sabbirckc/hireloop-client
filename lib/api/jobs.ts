import type { JobFormData } from "@/lib/actions/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getDeletedJobIds = (): Set<string> => {
    if (typeof window === "undefined") return new Set()
    try {
        const raw = localStorage.getItem("hireloop_deleted_job_ids")
        if (raw) {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
                return new Set(parsed)
            }
        }
    } catch {
        // Ignore JSON error
    }
    return new Set()
}

export const saveDeletedJobId = (id: string, mongoId?: string) => {
    if (typeof window === "undefined") return
    try {
        const existing = getDeletedJobIds()
        if (id) existing.add(id)
        if (mongoId) existing.add(mongoId)
        localStorage.setItem("hireloop_deleted_job_ids", JSON.stringify(Array.from(existing)))
    } catch {
        // Ignore storage error
    }
}

export const getJobs = async (): Promise<JobFormData[]> => {
    let apiJobs: JobFormData[] = []

    // 1. Try to fetch from Next.js internal API first (direct MongoDB connection)
    try {
                const res = await fetch(`/api/jobs?t=${Date.now()}`, {
                    cache: "no-store",
                    headers: {
                        "Pragma": "no-cache",
                        "Cache-Control": "no-cache",
                    },
                })
        if(res.ok) {
                    const data = await res.json()
            if (Array.isArray(data)) {
                apiJobs = data
            }
        }
    } catch {
        // Fallback to Express backend if Next.js internal API didn't answer (e.g. during SSR)
        try {
            const res = await fetch(`${BASE_URL}/jobs?t=${Date.now()}`, {
                cache: "no-store",
                headers: {
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache",
                },
            })
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) {
                    apiJobs = data
                }
            }
        } catch {
            // Both servers offline, will rely on client storage
        }
    }

// 2. Load custom jobs created from the frontend
let localJobs: JobFormData[] = []
if (typeof window !== "undefined") {
    try {
        const raw = localStorage.getItem("hireloop_custom_jobs")
        if (raw) {
            localJobs = JSON.parse(raw)
        }
    } catch (err) {
        console.error("Error reading jobs from localStorage:", err)
    }
}

// 3. Get list of permanently deleted IDs
const deletedIds = getDeletedJobIds()

// 4. Combine: new custom jobs first, then API jobs (deduplicated by ID)
const combined = [...localJobs, ...apiJobs]
const seen = new Set<string>()

return combined.filter((job) => {
    // Exclude permanently deleted jobs
    if (job.id && deletedIds.has(job.id)) return false
    if (job._id && deletedIds.has(job._id)) return false

    const key = job._id || job.id || `${job.title}-${job.companyName}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
})
}

/**
 * Delete a job permanently both from MongoDB and client localStorage
 */
export const deleteJob = async (id: string, mongoId?: string): Promise<boolean> => {
    // 1. Mark permanently deleted in client storage
    saveDeletedJobId(id, mongoId)

    // 2. Remove from client local storage
    if (typeof window !== "undefined") {
        try {
            const raw = localStorage.getItem("hireloop_custom_jobs")
            if (raw) {
                const parsed: JobFormData[] = JSON.parse(raw)
                const filtered = parsed.filter(
                    (item) =>
                        item.id !== id &&
                        item._id !== id &&
                        (!mongoId || (item.id !== mongoId && item._id !== mongoId))
                )
                localStorage.setItem("hireloop_custom_jobs", JSON.stringify(filtered))
            }
        } catch (err) {
            console.error("Error removing job from localStorage:", err)
        }
    }

    // 3. Delete from MongoDB via Next.js direct API route
    const targetId = mongoId || id
    let deleted = false

    try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(targetId)}`, {
            method: "DELETE",
        })
        if (res.ok) {
            deleted = true
        }
    } catch {
        // Ignore and attempt Express server
    }

    // If targetId was mongoId and differed from id, also attempt id
    if (!deleted && mongoId && mongoId !== id) {
        try {
            const res = await fetch(`/api/jobs/${encodeURIComponent(id)}`, {
                method: "DELETE",
            })
            if (res.ok) {
                deleted = true
            }
        } catch {
            // Ignore
        }
    }

    // 4. Also notify Express backend if running
    try {
        await fetch(`${BASE_URL}/jobs/${encodeURIComponent(targetId)}`, {
            method: "DELETE",
        })
    } catch {
        // Express backend may be offline
    }

    return true
}