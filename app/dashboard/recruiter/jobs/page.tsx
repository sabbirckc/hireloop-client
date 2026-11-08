"use client"

    import * as React from "react"
    import Link from "next/link"
    import {
        Plus,
        Globe,
        MapPin,
        Users,
        Pencil,
        Trash2,
        MoreVertical,
        Code2,
        Palette,
        Server,
        Megaphone,
        CheckCircle2,
        type LucideIcon,
    } from "lucide-react"
    import type { JobFormData } from "@/lib/actions/jobs"

    interface ExtendedJob extends JobFormData {
        id: string
        icon: LucideIcon
        iconColor: string
        iconBg: string
        categoryColor: string
        postedTimeAgo: string
    }

    // Dummy data matching the Figma Manage Job Posts screen exactly
    const INITIAL_JOBS: ExtendedJob[] = [
        {
            id: "job-1",
            title: "Frontend Developer",
            category: "Engineering",
            categoryColor: "text-sky-400",
            companyName: "HirePulse Network",
            location: "Remote (New York, USA)",
            isRemote: true,
            jobType: "Full-time",
            currency: "€",
            minSalary: "25",
            maxSalary: "40",
            frequency: "hr",
            applicantsCount: 34,
            status: "Active",
            deadline: "May 30, 2025",
            postedTimeAgo: "Posted 4d ago",
            icon: Code2,
            iconColor: "text-sky-400",
            iconBg: "bg-sky-500/10 border-sky-500/20",
        },
        {
            id: "job-2",
            title: "Senior Product Designer",
            category: "Design",
            categoryColor: "text-amber-500",
            companyName: "HirePulse Labs",
            location: "London, UK (Hybrid)",
            isRemote: false,
            jobType: "Full-time",
            currency: "€",
            minSalary: "90k",
            maxSalary: "115k",
            frequency: "yr",
            applicantsCount: 19,
            status: "Active",
            deadline: "Jun 14, 2025",
            postedTimeAgo: "Posted 1w ago",
            icon: Palette,
            iconColor: "text-amber-400",
            iconBg: "bg-amber-500/10 border-amber-500/20",
        },
        {
            id: "job-3",
            title: "DevOps Specialist",
            category: "Infrastructure",
            categoryColor: "text-cyan-400",
            companyName: "HirePulse Platform",
            location: "Berlin, Germany",
            isRemote: false,
            jobType: "Full-time",
            currency: "€",
            minSalary: "95k",
            maxSalary: "120k",
            frequency: "yr",
            applicantsCount: 12,
            status: "Active",
            deadline: "Jun 30, 2025",
            postedTimeAgo: "Posted 2w ago",
            icon: Server,
            iconColor: "text-cyan-400",
            iconBg: "bg-cyan-500/10 border-cyan-500/20",
        },
        {
            id: "job-4",
            title: "Product Marketing Lead",
            category: "Marketing",
            categoryColor: "text-pink-400",
            companyName: "HirePulse Network",
            location: "Remote (EU/US)",
            isRemote: true,
            jobType: "Full-time",
            currency: "€",
            minSalary: "80k",
            maxSalary: "105k",
            frequency: "yr",
            applicantsCount: 27,
            status: "Active",
            deadline: "Jul 15, 2025",
            postedTimeAgo: "Posted 5d ago",
            icon: Megaphone,
            iconColor: "text-pink-400",
            iconBg: "bg-pink-500/10 border-pink-500/20",
        },
        {
            id: "job-5",
            title: "QA Automation Engineer",
            category: "Quality",
            categoryColor: "text-indigo-400",
            companyName: "HirePulse Platform",
            location: "Dublin, Ireland (Hybrid)",
            isRemote: false,
            jobType: "Part-time",
            currency: "€",
            minSalary: "35",
            maxSalary: "50",
            frequency: "hr",
            applicantsCount: 8,
            status: "Expired",
            deadline: "May 01, 2025",
            postedTimeAgo: "Closed",
            icon: CheckCircle2,
            iconColor: "text-indigo-400",
            iconBg: "bg-indigo-500/10 border-indigo-500/20",
        },
    ]

    export default function ManageJobsPage() {
        const [jobs, setJobs] = React.useState<ExtendedJob[]>(INITIAL_JOBS)

        const handleDeleteJob = (id: string) => {
            setJobs((prev) => prev.filter((job) => job.id !== id))
        }

        return (
            <div className="mx-auto max-w-7xl space-y-6 pb-16 text-zinc-100">
                {/* Top Header Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                            <span>Manage Jobs</span>
                            <span>&gt;</span>
                            <span className="text-zinc-200">Job Listings & Postings</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Manage Job Posts
                        </h1>
                        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                            Review live listings, monitor applicants, and update job details across your organization.
                        </p>
                    </div>

                    {/* Top Right: ++ New Job Post Button */}
                    <Link
                        href="/dashboard/recruiter/jobs/new"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#5B50FF] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-[#4E43E8] transition-all"
                    >
                        <span className="text-base font-bold">+</span>
                        <Plus className="size-4 -ml-1" />
                        <span>New Job Post</span>
                    </Link>
                </div>

                {/* Responsive Table Wrapper */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0E111A]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-zinc-800/80 bg-[#121520]/70 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                                    <th scope="col" className="py-4 pl-6 pr-4">
                                        Job Title & Dept
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Company & Location
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Type
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Compensation
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Applicants
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Status
                                    </th>
                                    <th scope="col" className="py-4 px-4">
                                        Deadline
                                    </th>
                                    <th scope="col" className="py-4 pl-4 pr-6 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-zinc-800/50">
                                {jobs.map((job) => {
                                    const Icon = job.icon
                                    const isActive = job.status === "Active"

                                    return (
                                        <tr
                                            key={job.id}
                                            className="group transition-colors hover:bg-zinc-800/30"
                                        >
                                            {/* Job Title & Dept */}
                                            <td className="py-4 pl-6 pr-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${job.iconBg}`}
                                                    >
                                                        <Icon className={`size-5 ${job.iconColor}`} />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-semibold text-white truncate group-hover:text-[#8E86FF] transition-colors">
                                                            {job.title}
                                                        </span>
                                                        <span className={`text-xs font-medium ${job.categoryColor}`}>
                                                            {job.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Company & Location */}
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-medium text-zinc-200">
                                                        {job.companyName}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                                        {job.isRemote ? (
                                                            <Globe className="size-3.5 shrink-0 text-zinc-500" />
                                                        ) : (
                                                            <MapPin className="size-3.5 shrink-0 text-zinc-500" />
                                                        )}
                                                        <span className="truncate">{job.location}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="py-4 px-4">
                                                <span className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-zinc-300">
                                                    {job.jobType}
                                                </span>
                                            </td>

                                            {/* Compensation */}
                                            <td className="py-4 px-4 font-medium text-zinc-200 whitespace-nowrap">
                                                {job.currency}
                                                {job.minSalary} – {job.currency}
                                                {job.maxSalary} / {job.frequency}
                                            </td>

                                            {/* Applicants */}
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-zinc-200">
                                                    <Users className="size-4 text-[#8E86FF]" />
                                                    <span className="text-sm font-medium">
                                                        {job.applicantsCount} Candidates
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {isActive ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                                                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                                                        <span className="size-1.5 rounded-full bg-zinc-500" />
                                                        Expired
                                                    </span>
                                                )}
                                            </td>

                                            {/* Deadline */}
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-200 font-medium">
                                                        {job.deadline}
                                                    </span>
                                                    <span className="text-[11px] text-zinc-500">
                                                        {job.postedTimeAgo}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* Update Button */}
                                                    <Link
                                                        href={`/dashboard/recruiter/jobs/new?edit=${job.id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#5B50FF]/40 bg-[#5B50FF]/15 px-3 py-1.5 text-xs font-medium text-[#A59FFF] hover:bg-[#5B50FF]/25 hover:border-[#5B50FF] transition-all"
                                                    >
                                                        <Pencil className="size-3.5" />
                                                        <span>Update</span>
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteJob(job.id)}
                                                        aria-label="Delete job"
                                                        className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </button>

                                                    {/* More Button */}
                                                    <button
                                                        type="button"
                                                        aria-label="More options"
                                                        className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                                                    >
                                                        <MoreVertical className="size-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {jobs.length === 0 && (
                        <div className="py-16 text-center text-zinc-400">
                            <p className="text-sm">No job posts found.</p>
                            <Link
                                href="/dashboard/recruiter/jobs/new"
                                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#5B50FF] px-4 py-2 text-xs font-medium text-white hover:bg-[#4E43E8] transition-colors"
                            >
                                <Plus className="size-4" />
                                Create your first job post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }