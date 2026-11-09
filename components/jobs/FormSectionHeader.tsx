import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormSectionHeaderProps {
    step: string | number
    title: string
    className?: string
}

export function FormSectionHeader({ step, title, className }: FormSectionHeaderProps) {
    return (
        <div className={cn("flex items-center gap-2 text-sm font-semibold text-white", className)}>
            <span className="size-2 rounded-full bg-[#5B50FF]" />
            <span>{step}. {title}</span>
        </div>
    )
}

