import React, { Suspense } from "react"
import { getJobs } from "@/lib/api/jobs"
import { BrowseJobsClient } from "@/components/jobs/BrowseJobsClient"
import type { JobFormData } from "@/types/job"

export const dynamic = "force-dynamic"

export default async function BrowseJobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams
    const searchEntries: [string, string][] = []

    if (resolvedParams) {
        Object.entries(resolvedParams).forEach(([key, value]) => {
            if (typeof value === "string") {
                searchEntries.push([key, value])
            } else if (Array.isArray(value)) {
                value.forEach((v) => searchEntries.push([key, v]))
            }
        })
    }

    const query = new URLSearchParams(searchEntries).toString()

    let initialJobs: JobFormData[] = []
    try {
        initialJobs = await getJobs(query)
    } catch (err) {
        console.error("BrowseJobsPage getJobs error:", err)
    }

    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#080A0F] flex items-center justify-center text-zinc-400">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
                </div>
            }
        >
            <BrowseJobsClient initialJobs={initialJobs} />
        </Suspense>
    )
}
