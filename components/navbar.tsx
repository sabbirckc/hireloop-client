"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Briefcase,
  Building2,
  CreditCard,
  Bookmark,
  LogOut,
  User,
  Settings,
  Menu,
  ChevronDown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession, signOut } from "@/lib/auth-client"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Browse Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Companies",
    href: "/companies",
    icon: Building2,
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/")
            router.refresh()
          },
        },
      })
    } catch {
      // Fallback redirect
      router.push("/")
    }
  }

  const user = session?.user
  const userInitials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : user?.email
      ? user.email[0].toUpperCase()
      : "U"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Image
              src="/images/logo.png"
              alt="Hireloop"
              width={140}
              height={38}
              priority
              className="h-8 w-auto object-contain dark:brightness-110"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/70 font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: Actions, Auth, Theme & Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          {/* Desktop Auth State */}
          <div className="hidden items-center gap-2.5 md:flex">
            {isPending ? (
              <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full p-1 text-sm font-medium transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    />
                  }
                >
                  <Avatar size="sm" className="ring-1 ring-border">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-foreground lg:inline-block">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-1.5">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="truncate text-sm leading-none font-medium text-foreground">
                        {user.name ?? "Hireloop User"}
                      </p>
                      <p className="truncate text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      render={
                        <Link
                          href="/profile"
                          className="flex w-full cursor-pointer items-center gap-2"
                        />
                      }
                    >
                      <User className="size-4 text-muted-foreground" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      render={
                        <Link
                          href="/saved-jobs"
                          className="flex w-full cursor-pointer items-center gap-2"
                        />
                      }
                    >
                      <Bookmark className="size-4 text-muted-foreground" />
                      <span>Saved Jobs</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      render={
                        <Link
                          href="/settings"
                          className="flex w-full cursor-pointer items-center gap-2"
                        />
                      }
                    >
                      <Settings className="size-4 text-muted-foreground" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                    className="cursor-pointer gap-2"
                  >
                    <LogOut className="size-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  render={
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    />
                  }
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-primary font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                  render={<Link href="/sign-up" />}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger & Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[300px] flex-col justify-between p-6 sm:w-[350px]"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src="/images/logo.png"
                        alt="Hireloop"
                        width={120}
                        height={32}
                        className="h-7 w-auto object-contain dark:brightness-110"
                      />
                    </Link>
                  </div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation List */}
                <nav
                  aria-label="Mobile Navigation"
                  className="flex flex-col gap-1.5"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-accent font-semibold text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}

                  {user && (
                    <Link
                      href="/saved-jobs"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === "/saved-jobs"
                          ? "bg-accent font-semibold text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <Bookmark className="size-4 shrink-0 text-muted-foreground" />
                      <span>Saved Jobs</span>
                    </Link>
                  )}
                </nav>
              </div>

              {/* Mobile Auth / Profile Section */}
              <div className="mt-auto border-t border-border/50 pt-5">
                {isPending ? (
                  <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                ) : user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-1">
                      <Avatar size="sm" className="ring-1 ring-border">
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={user.name ?? "User"}
                        />
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">
                          {user.name ?? "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2">
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <User className="size-4" />
                        <span>Profile & Account</span>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setMobileOpen(false)
                          handleSignOut()
                        }}
                        className="w-full justify-center gap-2 border-border/60 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <LogOut className="size-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Button
                      variant="outline"
                      className="w-full justify-center font-medium"
                      onClick={() => setMobileOpen(false)}
                      render={<Link href="/sign-in" />}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full justify-center bg-primary font-medium text-primary-foreground hover:bg-primary/90"
                      onClick={() => setMobileOpen(false)}
                      render={<Link href="/sign-up" />}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}