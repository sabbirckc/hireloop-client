"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { JOB_CATEGORIES } from "@/types/job"

export interface JobFilterSidebarProps {
    selectedJobType?: string | null
    selectedJobTypes?: string[]
    onJobTypeSelect: (jobType: string | null) => void
    onJobTypeToggle?: (jobType: string) => void
    isRemoteFilter?: boolean | null
    onRemoteToggle: (remote: boolean | null) => void
    selectedCategory?: string | null
    onCategorySelect: (category: string | null) => void
    counts?: {
        fullTime?: number | string
        contract?: number | string
        partTime?: number | string
        internship?: number | string
        remote?: number | string
        [key: string]: number | string | undefined
    }
    onClearAll?: () => void
    className?: string
}

const JOB_TYPE_OPTIONS = [
    { id: "Full-time", label: "Full-time", defaultCount: "1.2k" },
    { id: "Contract", label: "Contract", defaultCount: "432" },
    { id: "Part-time", label: "Freelance / Part-time", defaultCount: "156" },
    { id: "Internship", label: "Internship", defaultCount: "48" },
]

export function JobFilterSidebar({
    selectedJobType,
    selectedJobTypes,
    onJobTypeSelect,
    onJobTypeToggle,
    isRemoteFilter,
    onRemoteToggle,
    selectedCategory,
    onCategorySelect,
    counts,
    onClearAll,
    className = "",
}: JobFilterSidebarProps) {
    // Only one job type can be selected at a time
    const activeJobType = selectedJobType !== undefined
        ? selectedJobType
        : (selectedJobTypes && selectedJobTypes.length > 0 ? selectedJobTypes[0] : null)

    const hasActiveFilters =
        Boolean(activeJobType) ||
        (isRemoteFilter !== null && isRemoteFilter !== undefined) ||
        Boolean(selectedCategory)

    return (
        <aside
            className={`w-full lg:w-64 bg-[#10131B] border border-zinc-800/80 rounded-2xl p-5 space-y-6 ${className}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800/60">
                <h3 className="text-base font-semibold text-white tracking-tight">Filters</h3>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Job Type Section - Single Selection */}
            <div>
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Job Type
                </h4>
                <div className="space-y-2.5">
                    {JOB_TYPE_OPTIONS.map((option) => {
                        const isChecked = activeJobType?.toLowerCase() === option.id.toLowerCase()
                        const count = counts?.[option.id] ?? option.defaultCount

                        const handleSelect = (e: React.MouseEvent) => {
                            e.preventDefault()
                            const nextValue = isChecked ? null : option.id
                            if (onJobTypeSelect) {
                                onJobTypeSelect(nextValue)
                            } else if (onJobTypeToggle) {
                                onJobTypeToggle(option.id)
                            }
                        }

                        return (
                            <label
                                key={option.id}
                                onClick={handleSelect}
                                className="group flex items-center justify-between text-sm text-zinc-300 hover:text-white cursor-pointer select-none transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${isChecked
                                                ? "bg-white border-white text-zinc-950"
                                                : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                                            }`}
                                    >
                                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                        <span className="text-xs sm:text-sm font-normal">
                                            {option.label}
                                        </span>
                                </div>
                                <span className="text-xs text-zinc-500 font-mono">
                                    {count}
                                </span>
                            </label>
                        )
                    })}
                </div>
            </div>

            {/* Workplace / Remote Section */}
            <div className="pt-2 border-t border-zinc-800/60">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Workplace
                </h4>
                <div className="space-y-2.5">
                    <label
                        className="group flex items-center justify-between text-sm text-zinc-300 hover:text-white cursor-pointer select-none transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => onRemoteToggle(isRemoteFilter === true ? null : true)}
                                className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${isRemoteFilter === true
                                        ? "bg-white border-white text-zinc-950"
                                        : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                                    }`}
                            >
                                {isRemoteFilter === true && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                                onClick={() => onRemoteToggle(isRemoteFilter === true ? null : true)}
                                className="text-xs sm:text-sm font-normal"
                            >
                                Remote Only
                            </span>
                        </div>
                    </label>

                    <label
                        className="group flex items-center justify-between text-sm text-zinc-300 hover:text-white cursor-pointer select-none transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => onRemoteToggle(isRemoteFilter === false ? null : false)}
                                className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${isRemoteFilter === false
                                        ? "bg-white border-white text-zinc-950"
                                        : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                                    }`}
                            >
                                {isRemoteFilter === false && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                                onClick={() => onRemoteToggle(isRemoteFilter === false ? null : false)}
                                className="text-xs sm:text-sm font-normal"
                            >
                                On-site / Office
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Department / Category Section */}
            <div className="pt-2 border-t border-zinc-800/60">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Category
                </h4>
                <div className="space-y-2">
                    {JOB_CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory?.toLowerCase() === cat.toLowerCase()
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => onCategorySelect(isSelected ? null : cat)}
                                className={`w-full text-left text-xs sm:text-sm py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${isSelected
                                        ? "bg-zinc-800 text-white font-medium"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                                    }`}
                            >
                                <span className="truncate">{cat}</span>
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}
