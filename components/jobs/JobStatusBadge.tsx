import * as React from "react"
import { cn } from "@/lib/utils"

export interface JobStatusBadgeProps {
    status?: string | null
    className?: string
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
    const isActive = (status || "").toLowerCase() === "active"

    if (isActive) {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400",
                    className
                )}
            >
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
            </span>
        )
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-zinc-400",
                className
            )}
        >
            <span className="size-1.5 rounded-full bg-zinc-500" />
            {status || "Expired"}
        </span>
    )
}

