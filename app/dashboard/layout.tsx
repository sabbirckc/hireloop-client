import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { Toaster } from "@/components/ui/toast"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="bg-[#0B0D13] text-zinc-100 min-h-screen">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b border-zinc-800/80 px-4 md:px-6">
                    <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
                </header>
                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    )
}
