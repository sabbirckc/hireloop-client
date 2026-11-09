"use client"

import * as React from "react"
import { Bookmark, Clock, Banknote, Zap, Flame, Sparkles, Building2 } from "lucide-react"
import type { JobFormData } from "@/types/job"

export interface JobListingCardProps {
    job: JobFormData
    onBookmarkToggle?: (jobId: string, isBookmarked: boolean) => void
    isBookmarked?: boolean
    className?: string
}

export function JobListingCard({
    job,
    onBookmarkToggle,
    isBookmarked = false,
    className = "",
}: JobListingCardProps) {
    const [bookmarked, setBookmarked] = React.useState(isBookmarked)

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        const next = !bookmarked
        setBookmarked(next)
        onBookmarkToggle?.(job.id || job._id || "", next)
    }

    // Format salary display nicely
    const formatSalary = () => {
        if (!job.minSalary && !job.maxSalary) return null
        const currency = job.currency || "$"
        let min = String(job.minSalary || "")
        let max = String(job.maxSalary || "")

        // Normalize if it's raw numbers vs '140k'
        if (min && !min.includes("k") && Number(min) >= 1000) {
            min = `${Math.round(Number(min) / 1000)}k`
        }
        if (max && !max.includes("k") && Number(max) >= 1000) {
            max = `${Math.round(Number(max) / 1000)}k`
        }

        if (min && max) return `${currency}${min} - ${currency}${max}`
        if (min) return `From ${currency}${min}`
        if (max) return `Up to ${currency}${max}`
        return null
    }

    const salaryString = formatSalary()
    const company = job.companyName || job.company || "Company"
    let locationText = job.location || "Remote"
    if (job.isRemote && !locationText.toLowerCase().includes("remote")) {
        locationText = `${locationText} (Remote)`
    }

    // Render tag badge (Easy Apply, Hot Job, Hybrid, Senior, etc.)
    const renderTagBadge = () => {
        const tagText = job.tag || (job.experienceLevel ? `${job.experienceLevel}` : null)
        if (!tagText) return null

        const lower = tagText.toLowerCase()
        if (lower.includes("easy apply")) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    {tagText}
                </span>
            )
        }

        if (lower.includes("hot")) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/60 text-amber-400 border border-amber-800/40">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {tagText}
                </span>
            )
        }

        if (lower.includes("hybrid") || lower.includes("senior")) {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    {tagText}
                </span>
            )
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                {tagText}
            </span>
        )
    }

    return (
        <div
            className={`group bg-[#10131B]/90 hover:bg-[#131722] border border-zinc-800/70 hover:border-zinc-700/90 rounded-2xl p-5 transition-all duration-200 shadow-sm ${className}`}
        >
            <div className="flex items-start justify-between gap-4">
                {/* Logo and details */}
                <div className="flex items-start gap-4">
                    {/* Logo container matching Figma */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900 border border-zinc-700/50 p-2 flex items-center justify-center text-zinc-300 shrink-0 shadow-inner group-hover:border-zinc-600 transition-colors">
                        {job.companyLogo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={job.companyLogo}
                                alt={company}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        ) : (
                            <Building2 className="w-6 h-6 text-zinc-400" />
                        )}
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors cursor-pointer">
                            {job.title || job.jobTitle}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1">
                            <span>{company}</span>
                            <span className="mx-1.5 text-zinc-600">•</span>
                            <span>{locationText}</span>
                        </p>
                    </div>
                </div>

                {/* Bookmark button */}
                <button
                    type="button"
                    onClick={handleBookmarkClick}
                    title={bookmarked ? "Remove bookmark" : "Bookmark job"}
                    className="p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/50"
                >
                    <Bookmark
                        className={`w-5 h-5 transition-colors ${
                            bookmarked ? "fill-white text-white" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Badges footer */}
            <div className="mt-4 pt-2 flex flex-wrap items-center gap-2.5">
                {/* Salary badge */}
                {salaryString && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                        <Banknote className="w-3.5 h-3.5 text-zinc-400" />
                        {salaryString}
                    </span>
                )}

                {/* Job type badge */}
                {(job.jobType || job.type) && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {job.jobType || job.type}
                    </span>
                )}

                {/* Extra tag badge (e.g. Easy Apply, Hybrid, Hot Job) */}
                {renderTagBadge()}
            </div>
        </div>
    )
}

