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
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

    export type Role = "seeker" | "recruiter" | "admin"

export interface MenuItem {
        id: string
    name: string
    url: string
    icon: LucideIcon
    }

export type MenuItemByRole = Record<Role, MenuItem[]>

const menuItemByRole: MenuItemByRole = {
    seeker: [
        {
            id: "seeker-dashboard",
            name: "Overview",
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
            name: "Overview",
            url: "/dashboard/recruiter",
            icon: LayoutDashboard,
        },
        {
            id: "recruiter-company",
            name: "My Company",
            url: "/dashboard/recruiter/company",
            icon: Building2,
        },
        {
            id: "recruiter-jobs",
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: Briefcase,
        },
        {
            id: "recruiter-post-job",
            name: "Post a Job",
            url: "/dashboard/recruiter/jobs/new",
            icon: PlusCircle,
        },
        {
            id: "recruiter-billing",
            name: "Subscription & Billing",
            url: "/dashboard/recruiter/billing",
            icon: CreditCard,
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
        name: "Overview",
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
    const role = (session?.user?.role as Role) || "seeker"
    const currentMenuItems = menuItemByRole[role] || menuItemByRole.seeker

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                        Hire<span className="text-[#5B50FF]">Loop</span>
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="capitalize">{role} Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {currentMenuItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        render={<Link href={item.url} />}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}