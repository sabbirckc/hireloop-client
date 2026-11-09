import * as React from "react"
import { cn } from "@/lib/utils"

export interface JobTypeBadgeProps {
    type?: string | null
    className?: string
}

export function JobTypeBadge({ type, className }: JobTypeBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-zinc-300",
                className
            )}
        >
            {type || "Full-time"}
        </span>
    )
}

