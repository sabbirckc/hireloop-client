import { getJobs } from "@/lib/api/jobs"
import React from "react"

export default async function BrowseJobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const search = await searchParams
    const urlSearch = new URLSearchParams(search as Record<string, string>)
    const query = urlSearch.toString()
    console.log('search params:', query)
    const jobs = await getJobs(query)
    return (
        <div>
            <h1>Browser Jobs</h1>
            <ul>
                {jobs.map((job) => (

                    <li key={job._id}>{job.title}</li>
                ))}
            </ul>
        </div >
    )
}