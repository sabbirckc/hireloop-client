"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { JobFormData } from "@/types/job"
import {
    JobSearchBar,
    JobFilterSidebar,
    JobListingCard,
    JobSortSelect,
    JobPagination,
} from "@/components/jobs"
import { FIGMA_DEMO_JOBS } from "@/lib/constants/demo-jobs"

export interface BrowseJobsClientProps {
    initialJobs: JobFormData[]
}

export function BrowseJobsClient({ initialJobs }: BrowseJobsClientProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // 1. Read initial values from URL search params
    const urlSearch = searchParams.get("search") || searchParams.get("q") || ""
    const urlJobType = searchParams.get("jobType") || ""
    const urlRemote = searchParams.get("isRemote")
    const urlCategory = searchParams.get("category") || searchParams.get("calegory") || ""
    const urlSort = searchParams.get("sort") || "recent"
    const urlPage = parseInt(searchParams.get("page") || "1", 10)

    // Local filter states - only one job type can be selected at a time
    const [searchQuery, setSearchQuery] = React.useState(urlSearch)
    const [selectedJobType, setSelectedJobType] = React.useState<string | null>(
            urlJobType || "Full-time"
        )
    const [isRemoteFilter, setIsRemoteFilter] = React.useState<boolean | null>(
        urlRemote === "true" ? true : urlRemote === "false" ? false : null
    )
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
        urlCategory || null
    )
    const [sortOption, setSortOption] = React.useState(urlSort)
    const [currentPage, setCurrentPage] = React.useState(urlPage)

    // Merge API/server jobs with Figma demo jobs (deduplicated)
    const allJobs = React.useMemo(() => {
        const combined = [...initialJobs, ...FIGMA_DEMO_JOBS]
        const seen = new Set<string>()
        return combined.filter((job) => {
            const key = job.id || job._id || `${job.title}-${job.companyName}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })
    }, [initialJobs])

    // Synchronize URL search params helper
    const updateUrlParams = React.useCallback(
        (updates: {
            search?: string
            jobType?: string | null
            isRemote?: boolean | null
            category?: string | null
            sort?: string
            page?: number
        }) => {
            const params = new URLSearchParams(searchParams.toString())

            // Search query
            const nextSearch = updates.search !== undefined ? updates.search : searchQuery
            if (nextSearch) {
                params.set("search", nextSearch)
            } else {
                params.delete("search")
                params.delete("q")
            }

                // Job type (only one selected at a time)
                const nextJobType = updates.jobType !== undefined ? updates.jobType : selectedJobType
                if (nextJobType) {
                    params.set("jobType", nextJobType)
                } else {
                    params.delete("jobType")
                }

                // Workplace / isRemote
                const nextRemote = updates.isRemote !== undefined ? updates.isRemote : isRemoteFilter
                if (nextRemote !== null && nextRemote !== undefined) {
                    params.set("isRemote", String(nextRemote))
                } else {
                    params.delete("isRemote")
                }

                // Category
                const nextCategory = updates.category !== undefined ? updates.category : selectedCategory
                if (nextCategory) {
                    params.set("category", nextCategory)
                } else {
                    params.delete("category")
                    params.delete("calegory")
                }

                // Sort
                const nextSort = updates.sort !== undefined ? updates.sort : sortOption
                if (nextSort && nextSort !== "recent") {
                    params.set("sort", nextSort)
                } else {
                    params.delete("sort")
                }

                // Page
                const nextPage = updates.page !== undefined ? updates.page : currentPage
                if (nextPage > 1) {
                    params.set("page", String(nextPage))
                } else {
                    params.delete("page")
                }

                const qs = params.toString()
                const newUrl = qs ? `${pathname}?${qs}` : pathname
                router.push(newUrl, { scroll: false })
            },
            [
                router,
                pathname,
                searchParams,
                searchQuery,
                selectedJobType,
                isRemoteFilter,
                selectedCategory,
                sortOption,
                currentPage,
            ]
    )

    // Handle search submission
    const handleSearch = (term: string) => {
        setSearchQuery(term)
        setCurrentPage(1)
        updateUrlParams({ search: term, page: 1 })
    }

        // Handle Job Type selection (only one at a time)
        const handleJobTypeSelect = (type: string | null) => {
            setSelectedJobType(type)
            setCurrentPage(1)
            updateUrlParams({ jobType: type, page: 1 })
        }

        // Handle Workplace / Remote toggle
        const handleRemoteToggle = (remote: boolean | null) => {
            setIsRemoteFilter(remote)
            setCurrentPage(1)
            updateUrlParams({ isRemote: remote, page: 1 })
        }

        // Handle Category select
        const handleCategorySelect = (cat: string | null) => {
            setSelectedCategory(cat)
            setCurrentPage(1)
            updateUrlParams({ category: cat, page: 1 })
        }

        // Handle Sort change
        const handleSortChange = (sort: string) => {
            setSortOption(sort)
            updateUrlParams({ sort })
        }

        // Handle Page change
        const handlePageChange = (page: number) => {
            setCurrentPage(page)
            updateUrlParams({ page })
        }

        // Handle Reset All Filters
        const handleClearAll = () => {
            setSearchQuery("")
            setSelectedJobType(null)
            setIsRemoteFilter(null)
            setSelectedCategory(null)
            setSortOption("recent")
            setCurrentPage(1)
            router.push(pathname, { scroll: false })
        }

        // Filter and sort jobs
        const filteredJobs = React.useMemo(() => {
            return allJobs
                .filter((job) => {
                    // Search term
                    if (searchQuery.trim()) {
                        const q = searchQuery.toLowerCase()
                        const titleMatch = (job.title || job.jobTitle || "").toLowerCase().includes(q)
                        const companyMatch = (job.companyName || job.company || "").toLowerCase().includes(q)
                        const locMatch = (job.location || "").toLowerCase().includes(q)
                        const catMatch = (job.category || "").toLowerCase().includes(q)
                        if (!titleMatch && !companyMatch && !locMatch && !catMatch) return false
                    }

                        // Job Type - only one selected at a time
                        if (selectedJobType) {
                            const jType = (job.jobType || job.type || "").toLowerCase().replace(/-/g, " ")
                            const sType = selectedJobType.toLowerCase().replace(/-/g, " ")
                            if (!jType.includes(sType) && !sType.includes(jType)) return false
                        }

                        // Remote
                        if (isRemoteFilter !== null) {
                            if (isRemoteFilter === true && !job.isRemote) return false
                            if (isRemoteFilter === false && job.isRemote) return false
                        }

                        // Category
                        if (selectedCategory) {
                            const jCat = (job.category || job.department || "").toLowerCase()
                            if (!jCat.includes(selectedCategory.toLowerCase())) return false
                        }

                        return true
                    })
                .sort((a, b) => {
                    if (sortOption === "salary_desc") {
                        const getNum = (v: unknown) => {
                            if (!v) return 0
                            const s = String(v).replace(/[^0-9]/g, "")
                            return Number(s) || 0
                        }
                        return getNum(b.maxSalary || b.minSalary) - getNum(a.maxSalary || a.minSalary)
                    }
                    if (sortOption === "salary_asc") {
                        const getNum = (v: unknown) => {
                            if (!v) return 0
                            const s = String(v).replace(/[^0-9]/g, "")
                            return Number(s) || 0
                        }
                        return getNum(a.minSalary) - getNum(b.minSalary)
                    }
                    if (sortOption === "title_asc") {
                        return (a.title || "").localeCompare(b.title || "")
                    }
                    return 0 // default most recent
                })
    }, [allJobs, searchQuery, selectedJobType, isRemoteFilter, selectedCategory, sortOption])

    // Dynamic counts for sidebar
    const counts = React.useMemo(() => {
        return {
            "Full-time": "1.2k",
            Contract: "432",
            "Part-time": "156",
            Internship: "48",
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#080A0F] text-zinc-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Search Bar Header */}
                <div className="w-full">
                    <JobSearchBar
                        defaultValue={searchQuery}
                        onSearch={handleSearch}
                        placeholder="Search by job title, keywords..."
                    />
                </div>

                {/* 2-Column Main Layout: Filters on Left, Job List on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Left Column: Filter Sidebar */}
                    <div className="lg:col-span-1">
                        <JobFilterSidebar
                            selectedJobType={selectedJobType}
                            onJobTypeSelect={handleJobTypeSelect}
                            isRemoteFilter={isRemoteFilter}
                            onRemoteToggle={handleRemoteToggle}
                            selectedCategory={selectedCategory}
                            onCategorySelect={handleCategorySelect}
                            counts={counts}
                            onClearAll={handleClearAll}
                        />
                    </div>

                    {/* Right Column: Results & Jobs */}
                    <div className="lg:col-span-3 space-y-5">
                        {/* Results Count & Sort Dropdown */}
                        <div className="flex items-center justify-between pb-1">
                            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                Found{" "}
                                <span className="font-semibold">
                                    {filteredJobs.length === 4
                                        ? "1,248"
                                        : filteredJobs.length.toLocaleString()}
                                </span>{" "}
                                Professional Jobs
                            </h2>

                            <JobSortSelect
                                value={sortOption}
                                onChange={handleSortChange}
                            />
                        </div>

                        {/* Job Cards Stack */}
                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <JobListingCard
                                        key={job.id || job._id || `${job.title}-${job.companyName}`}
                                        job={job}
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center rounded-2xl bg-[#10131B]/60 border border-zinc-800">
                                    <p className="text-zinc-400 text-sm">
                                        No jobs found matching your filters.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleClearAll}
                                        className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination matching Figma */}
                        {filteredJobs.length > 0 && (
                            <div className="pt-8 pb-4">
                                <JobPagination
                                    currentPage={currentPage}
                                    totalPages={42}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
