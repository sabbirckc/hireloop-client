"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Building2,
    MapPin,
    Calendar,
    Globe2,
    ChevronDown,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Sparkles,
    Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product Management",
    "Marketing & Sales",
    "Data & Analytics",
    "Finance & Operations",
    "Customer Support",
]

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const FREQUENCIES = ["per hour", "per month", "per year"]

export default function NewJobPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    // Form state matching the Figma UI exactly
    const [formData, setFormData] = React.useState({
        title: "Frontend Developer",
        companyName: "HirePulse Network",
        category: "Engineering & Tech",
        jobType: "Full-time",
        isRemote: true,
        location: "New York, USA",
        deadline: "2025-05-30",
        currency: "€",
        minSalary: "25",
        maxSalary: "40",
        frequency: "per hour",
        responsibilities:
            "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products.",
        requirements:
            "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers",
    })

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const setJobType = (type: string) => {
        setFormData((prev) => ({ ...prev, jobType: type }))
    }

    const toggleRemote = () => {
        setFormData((prev) => ({ ...prev, isRemote: !prev.isRemote }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        console.log("Publishing Job Listing:", formData)

        // Simulate API request
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="mx-auto max-w-2xl py-12">
                <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-[#11141F] p-8 text-center shadow-2xl sm:p-12">
                    <div className="flex size-16 items-center justify-center rounded-full bg-[#5B50FF]/20 text-[#5B50FF] ring-8 ring-[#5B50FF]/10">
                        <CheckCircle2 className="size-8" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Job Published Successfully!
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        &ldquo;{formData.title}&rdquo; is now live and published under {formData.companyName}.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsSubmitted(false)}
                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800 transition-colors"
                        >
                            <Sparkles className="size-4" />
                            Post Another Job
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/dashboard/recruiter/jobs")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#5B50FF] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-[#4E43E8] transition-colors"
                        >
                            <Briefcase className="size-4" />
                            View Manage Jobs
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8 pb-16 text-zinc-100">
            {/* Top Header Bar */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                            <Link
                                href="/dashboard/recruiter/jobs"
                                className="hover:text-zinc-200 transition-colors"
                            >
                                Manage Jobs
                            </Link>
                            <span>&gt;</span>
                            <span className="text-zinc-200">Create New Listing</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Post a New Job
                        </h1>
                        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                            Fill in the position specifications to attract qualified talent across our network.
                        </p>
                    </div>
                </div>

                {/* SECTION 1: 1. Basic Information */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="size-2 rounded-full bg-[#5B50FF]" />
                        <span>1. Basic Information</span>
                    </div>

                    {/* Job Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                            Job Title <span className="text-[#5B50FF]">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Frontend Developer"
                            className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] px-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF]"
                        />
                    </div>

                    {/* Company Name & Job Category */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Company Name <span className="text-[#5B50FF]">*</span>
                            </label>
                            <div className="relative">
                                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="HirePulse Network"
                                    className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Job Category <span className="text-[#5B50FF]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="h-11 w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#12151F] px-4 pr-10 text-sm text-zinc-100 outline-none transition-colors focus:border-[#5B50FF] cursor-pointer"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[#12151F] text-zinc-200">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                            </div>
                        </div>
                    </div>

                    {/* Job Type Segmented Toggle */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                            Job Type <span className="text-[#5B50FF]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 rounded-xl border border-zinc-800/80 bg-[#12151F] p-1.5">
                            {JOB_TYPES.map((type) => {
                                const isActive = formData.jobType === type
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setJobType(type)}
                                        className={cn(
                                            "h-9 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                            isActive
                                                ? "bg-[#1E2335] text-white border border-[#4F5985]/60 shadow-xs"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                                        )}
                                    >
                                        {type}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* SECTION 2: 2. Location, Compensation & Timeline */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="size-2 rounded-full bg-[#5B50FF]" />
                        <span>2. Location, Compensation & Timeline</span>
                    </div>

                    {/* Remote Work Allowed Banner */}
                    <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-[#12151F] p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-800/60 text-[#8E86FF]">
                                <Globe2 className="size-5" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-zinc-200">
                                    Remote Work Allowed (isRemote)
                                </p>
                                <p className="text-[11px] sm:text-xs text-zinc-500">
                                    Enable worldwide or distributed candidate applications
                                </p>
                            </div>
                        </div>

                        {/* Switch Toggle */}
                        <button
                            type="button"
                            role="switch"
                            aria-checked={formData.isRemote}
                            onClick={toggleRemote}
                            className={cn(
                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                                formData.isRemote ? "bg-white" : "bg-zinc-700"
                            )}
                        >
                            <span
                                className={cn(
                                    "pointer-events-none inline-block size-5 transform rounded-full shadow-md ring-0 transition duration-200 ease-in-out",
                                    formData.isRemote
                                        ? "translate-x-5 bg-[#12151F]"
                                        : "translate-x-0 bg-white"
                                )}
                            />
                        </button>
                    </div>

                    {/* Job Location & Application Deadline */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-zinc-300">
                                    Job Location (location)
                                </label>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                    Required
                                </span>
                            </div>
                            <div className="relative">
                                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="New York, USA"
                                    className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Application Deadline (deadline)
                            </label>
                            <div className="relative">
                                <Calendar className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="date"
                                    name="deadline"
                                    required
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] pl-10 pr-4 text-sm text-zinc-100 outline-none transition-colors focus:border-[#5B50FF] [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Min Salary, Max Salary, Frequency */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Min Salary / Rate
                            </label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                                    {formData.currency}
                                </span>
                                <input
                                    type="text"
                                    name="minSalary"
                                    value={formData.minSalary}
                                    onChange={handleChange}
                                    placeholder="25"
                                    className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] pl-8 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Max Salary / Rate
                            </label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                                    {formData.currency}
                                </span>
                                <input
                                    type="text"
                                    name="maxSalary"
                                    value={formData.maxSalary}
                                    onChange={handleChange}
                                    placeholder="40"
                                    className="h-11 w-full rounded-xl border border-zinc-800/80 bg-[#12151F] pl-8 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">
                                Frequency
                            </label>
                            <div className="relative">
                                <select
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    className="h-11 w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#12151F] px-4 pr-10 text-sm text-zinc-100 outline-none transition-colors focus:border-[#5B50FF] cursor-pointer"
                                >
                                    {FREQUENCIES.map((freq) => (
                                        <option key={freq} value={freq} className="bg-[#12151F] text-zinc-200">
                                            {freq}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: 3. Responsibilities & Requirements */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="size-2 rounded-full bg-[#5B50FF]" />
                        <span>3. Responsibilities & Requirements</span>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                            Key Responsibilities <span className="text-[#5B50FF]">*</span>
                        </label>
                        <textarea
                            name="responsibilities"
                            required
                            rows={4}
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-zinc-800/80 bg-[#12151F] p-4 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF] resize-y"
                        />
                    </div>

                    {/* Qualifications & Requirements */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                            Qualifications & Requirements <span className="text-[#5B50FF]">*</span>
                        </label>
                        <textarea
                            name="requirements"
                            required
                            rows={4}
                            value={formData.requirements}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-zinc-800/80 bg-[#12151F] p-4 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#5B50FF] resize-y"
                        />
                    </div>
                </div>

                {/* Bottom Publish Button on mobile */}
                <div className="pt-4 sm:hidden">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B50FF] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-[#4E43E8] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <span>Publish Job</span>
                                <ArrowRight className="size-4" />
                            </>
                        )}
                    </button>
                </div>
                <section>
                    {/* Top Right Action Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B50FF] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-[#4E43E8] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <span>Publish Job</span>
                                <ArrowRight className="size-4" />
                            </>
                        )}
                    </button>
                </section>
            </form>
        </div>
    )
}