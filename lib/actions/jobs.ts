export interface JobFormData {
    id?: string
    _id?: string
    title: string
    jobTitle?: string
    companyName: string
    company?: string
    category: string
    department?: string
    jobType: string
    type?: string
    isRemote: boolean
    location: string
    deadline: string
    currency: string
    minSalary: string | number
    maxSalary: string | number
    frequency: string
    responsibilities?: string
    requirements?: string
    status?: "Active" | "Expired" | "Draft"
    applicantsCount?: number
    postedAt?: string
    [key: string]: unknown
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

        export const createJob = async (data: JobFormData): Promise<JobFormData> => {
            const jobWithMeta: JobFormData = {
                ...data,
                id: data.id || `job-${Date.now()}`,
                status: data.status || "Active",
                applicantsCount: data.applicantsCount ?? 0,
                postedAt: data.postedAt || "Just now",
            }

            // 1. Save directly to MongoDB via internal /api/jobs
            try {
                const res = await fetch("/api/jobs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jobWithMeta),
                })
                if (res.ok) {
                    const saved = await res.json()
                    if (saved._id) jobWithMeta._id = saved._id
                }
                } catch {
                    // Fallback to Express backend if /api/jobs not reached directly
                    try {
                        const res = await fetch(`${BASE_URL}/jobs`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(jobWithMeta),
                        })
                        if (res.ok) {
                            const saved = await res.json()
                            if (saved._id) jobWithMeta._id = saved._id
                        }
                    } catch {
                        console.warn("Backend API offline. Job stored locally.")
                    }
                }

                    // 2. Persist to local client storage so jobs display immediately across the dashboard
                    if (typeof window !== "undefined") {
                        try {
                            const raw = localStorage.getItem("hireloop_custom_jobs")
                            const existing: JobFormData[] = raw ? JSON.parse(raw) : []
                            // Deduplicate if already present
                            const filtered = existing.filter(
                                (item) => item.id !== jobWithMeta.id && (!jobWithMeta._id || item._id !== jobWithMeta._id)
                            )
                            localStorage.setItem(
                                "hireloop_custom_jobs",
                                JSON.stringify([jobWithMeta, ...filtered])
                            )
                        } catch (e) {
                            console.error("Failed to save to localStorage:", e)
                        }
                    }

    return jobWithMeta
        }