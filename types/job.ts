import type { LucideIcon } from "lucide-react"

export type JobStatus = "Active" | "Expired" | "Draft" | string
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | string

export interface JobFormData {
    id?: string
    _id?: string
    title: string
    jobTitle?: string
    companyName: string
    company?: string
    category: string
    department?: string
    jobType: string
    type?: string
    isRemote: boolean
    location: string
    deadline?: string
    currency: string
    minSalary: string | number
    maxSalary: string | number
    frequency: string
    responsibilities?: string
    requirements?: string
    status?: JobStatus
    applicantsCount?: number
    postedAt?: string
    tag?: string
    tagVariant?: "emerald" | "amber" | "zinc" | "blue" | string
    companyLogo?: string
    experienceLevel?: string
    [key: string]: unknown
}

export interface ExtendedJob extends JobFormData {
    id: string
    icon?: LucideIcon
    iconColor?: string
    iconBg?: string
    categoryColor?: string
    postedTimeAgo?: string
}

export const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product Management",
    "Marketing & Sales",
    "Data & Analytics",
    "Finance & Operations",
    "Customer Support",
] as const

export const JOB_TYPES_LIST = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
] as const

export const SALARY_FREQUENCIES = [
    "per hour",
    "per month",
    "per year",
] as const

