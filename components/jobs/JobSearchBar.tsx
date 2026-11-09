"use client"

import * as React from "react"
import { Search } from "lucide-react"

export interface JobSearchBarProps {
    value?: string
    defaultValue?: string
    placeholder?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    className?: string
}

export function JobSearchBar({
    value,
    defaultValue = "",
    placeholder = "Search by job title, keywords...",
    onChange,
    onSearch,
    className = "",
}: JobSearchBarProps) {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const searchTerm = isControlled ? value : internalValue

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (!isControlled) {
            setInternalValue(val)
        }
        onChange?.(val)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(searchTerm.trim())
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full bg-[#10131B] border border-zinc-800/90 rounded-2xl p-2.5 flex items-center gap-3 transition-colors focus-within:border-zinc-700 shadow-sm ${className}`}
        >
            <div className="flex items-center gap-3 flex-1 pl-3">
                <Search className="w-5 h-5 text-zinc-400 shrink-0" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className="bg-white hover:bg-zinc-100 active:scale-[0.98] text-zinc-950 font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-150 shrink-0 cursor-pointer shadow-sm"
            >
                Search Jobs
            </button>
        </form>
    )
}
