"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface JobPaginationProps {
    currentPage?: number
    totalPages?: number
    onPageChange?: (page: number) => void
    className?: string
}

export function JobPagination({
    currentPage = 1,
    totalPages = 42,
    onPageChange,
    className = "",
}: JobPaginationProps) {
    const pages = [1, 2, 3]

    return (
        <nav
            aria-label="Pagination"
            className={`flex items-center justify-center gap-1.5 select-none ${className}`}
        >
            {/* Prev button */}
            <button
                type="button"
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#10131B] hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Main pages */}
            {pages.map((p) => {
                const isActive = p === currentPage
                return (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onPageChange?.(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isActive
                                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        }`}
                    >
                        {p}
                    </button>
                )
            })}

            {/* Ellipsis */}
            {totalPages > 4 && (
                <span className="w-6 text-center text-xs text-zinc-500 font-mono">...</span>
            )}

            {/* Last page */}
            {totalPages > 3 && (
                <button
                    type="button"
                    onClick={() => onPageChange?.(totalPages)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
                        currentPage === totalPages
                            ? "bg-white text-zinc-950 font-semibold shadow-sm"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                    }`}
                >
                    {totalPages}
                </button>
            )}

            {/* Next button */}
            <button
                type="button"
                onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#10131B] hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    )
}

