"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    Search,
    CreditCard,
    User,
    Settings,
    PlusCircle,
    Users,
    Building2,
    FileText,
    type LucideIcon,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export type Role = "seeker" | "recruiter" | "admin"

export interface MenuItem {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export type MenuItemByRole = Record<Role, MenuItem[]>

export const menuItemByRole: MenuItemByRole = {
    seeker: [
        {
            id: "seeker-dashboard",
            name: "Dashboard",
            url: "/dashboard/seeker",
            icon: LayoutDashboard,
        },
        {
            id: "seeker-jobs",
            name: "Browse & Apply",
            url: "/dashboard/seeker/jobs",
            icon: Search,
        },
        {
            id: "seeker-applications",
            name: "My Applications",
            url: "/dashboard/seeker/applications",
            icon: FileText,
        },
        {
            id: "seeker-saved",
            name: "Saved Jobs",
            url: "/dashboard/seeker/saved",
            icon: Bookmark,
        },
        {
            id: "seeker-billing",
            name: "Subscription & Billing",
            url: "/dashboard/seeker/billing",
            icon: CreditCard,
        },
        {
            id: "seeker-profile",
            name: "Profile",
            url: "/dashboard/seeker/profile",
            icon: User,
        },
        {
            id: "seeker-settings",
            name: "Settings",
            url: "/dashboard/seeker/settings",
            icon: Settings,
        },
    ],
    recruiter: [
        {
            id: "recruiter-dashboard",
            name: "Dashboard",
            url: "/dashboard/recruiter",
            icon: LayoutDashboard,
        },
        {
            id: "add-jobs",
            name: "Add Job",
            url: "/dashboard/recruiter/jobs/new",
            icon: PlusCircle,
        },
        {
            id: "recruiter-jobs",
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: Briefcase,
        },
        {
            id: "recruiter-applications",
            name: "Applications",
            url: "/dashboard/recruiter/applications",
            icon: FileText,
        },
        {
            id: "recruiter-settings",
            name: "Settings",
            url: "/dashboard/recruiter/settings",
            icon: Settings,
        },
    ],
    admin: [
        {
            id: "admin-dashboard",
            name: "Dashboard",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            id: "admin-users",
            name: "Manage Users",
            url: "/dashboard/admin/users",
            icon: Users,
        },
        {
            id: "admin-companies",
            name: "Manage Companies",
            url: "/dashboard/admin/companies",
            icon: Building2,
        },
        {
            id: "admin-jobs",
            name: "Manage Jobs",
            url: "/dashboard/admin/jobs",
            icon: Briefcase,
        },
        {
            id: "admin-payments",
            name: "Payment & Subscriptions",
            url: "/dashboard/admin/payments",
            icon: CreditCard,
        },
        {
            id: "admin-settings",
            name: "Settings",
            url: "/dashboard/admin/settings",
            icon: Settings,
        },
    ],
}

export function DashboardSidebar() {
    const { data: session } = useSession()
    const pathname = usePathname()

    const pathRole: Role | null = pathname.startsWith("/dashboard/recruiter")
            ? "recruiter"
            : pathname.startsWith("/dashboard/admin")
                ? "admin"
                : pathname.startsWith("/dashboard/seeker")
                        ? "seeker"
                        : null

    const sessionRole = session?.user?.role as Role | undefined
    const role: Role = pathRole || sessionRole || "seeker"
    const currentMenuItems = menuItemByRole[role] || menuItemByRole.seeker

                        const userName = session?.user?.name || (role === "recruiter" ? "Alex Sterling" : "User")
                        const initials = userName
                        .split(" ")
        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()

                        return (
                        <Sidebar className="border-r border-zinc-800/80 bg-[#0A0C14] text-zinc-200">
                            {/* Logo */}
                            <SidebarHeader className="px-5 pt-5 pb-3">
                                <Link href="/" className="flex items-center gap-2">
                                    <span className="text-xl font-bold tracking-tight text-white">
                                        hirel<span className="text-[#F59E0B]">∞</span>p
                                    </span>
                                </Link>

                                {/* Recruiter / User Profile Card */}
                                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-zinc-800/90 bg-[#121520] p-3">
                                    <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1F2436] text-xs font-semibold text-white ring-1 ring-white/10">
                                        {session?.user?.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={session.user.image}
                                                alt={userName}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <span>{initials}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold text-white truncate">
                                            {userName}
                                        </span>
                                        <span className="text-xs text-zinc-400 capitalize">
                                            {role}
                                        </span>
                                        <span className="mt-1 inline-flex w-fit items-center rounded-full border border-[#5B50FF]/40 bg-[#5B50FF]/15 px-2 py-0.5 text-[10px] font-medium text-[#A29CFF]">
                                            Premium account
                                        </span>
                                    </div>
                                </div>
                    </SidebarHeader>

            {/* Navigation Menu */}
                <SidebarContent className="px-3 pt-2">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1.5">
                                {currentMenuItems.map((item) => {
                                    const isActive = pathname === item.url
                                    return (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                render={<Link href={item.url} />}
                                                className={cn(
                                                    "h-10 rounded-xl px-3 text-sm font-medium transition-all",
                                                    isActive
                                                        ? "bg-[#161A2B] text-white border border-[#485280]/60 shadow-xs"
                                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                                                )}
                                            >
                                                <item.icon className="size-4 shrink-0" />
                                                <span>{item.name}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter />
        </Sidebar>
    )
}