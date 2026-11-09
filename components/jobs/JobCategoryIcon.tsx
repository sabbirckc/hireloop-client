import * as React from "react"
import { Code2, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface JobCategoryIconProps {
    icon?: LucideIcon
    iconColor?: string
    iconBg?: string
    className?: string
}

export function JobCategoryIcon({
    icon: Icon = Code2,
    iconColor = "text-sky-400",
    iconBg = "bg-sky-500/10 border-sky-500/20",
    className,
}: JobCategoryIconProps) {
    return (
        <div
            className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                iconBg,
                className
            )}
        >
            <Icon className={cn("size-5", iconColor)} />
        </div>
    )
}

