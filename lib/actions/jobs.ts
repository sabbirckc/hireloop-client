export interface JobFormData {
    id?: string
    title: string
    companyName: string
    category: string
    jobType: string
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

    export const createJob = async (data: JobFormData) => {
        const res = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error(`Failed to create job: ${res.statusText}`)
        }

    return await res.json()
}