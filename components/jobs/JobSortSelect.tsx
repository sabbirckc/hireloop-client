"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

export interface JobSortSelectProps {
    value?: string
    onChange?: (sort: string) => void
    className?: string
}

const SORT_OPTIONS = [
    { value: "recent", label: "Most Recent" },
    { value: "salary_desc", label: "Highest Salary" },
    { value: "salary_asc", label: "Lowest Salary" },
    { value: "title_asc", label: "Title (A-Z)" },
]

export function JobSortSelect({
    value = "recent",
    onChange,
    className = "",
}: JobSortSelectProps) {
    const [open, setOpen] = React.useState(false)
    const selectRef = React.useRef<HTMLDivElement>(null)

    const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0]

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={selectRef} className={`relative flex items-center gap-2 text-xs ${className}`}>
            <span className="text-zinc-400 select-none">Sort by:</span>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="bg-[#10131B] hover:bg-zinc-800/80 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
                <span>{selectedOption.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1.5 z-20 w-36 bg-[#12151E] border border-zinc-800 rounded-xl py-1 shadow-xl">
                    {SORT_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange?.(opt.value)
                                setOpen(false)
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                                opt.value === value
                                    ? "bg-zinc-800/80 text-white font-medium"
                                    : "text-zinc-300 hover:text-white hover:bg-zinc-850"
                            }`}
                        >
                            <span>{opt.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

