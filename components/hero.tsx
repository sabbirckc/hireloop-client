"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.6L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="12" width="4" height="8" rx="1" />
        <rect x="10" y="6" width="4" height="14" rx="1" />
        <rect x="17" y="10" width="4" height="10" rx="1" />
      </svg>
    ),
    value: "12K",
    label: "Companies",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <circle cx="11" cy="9.5" r="2" />
        <path d="M7.5 15a3.5 3.5 0 0 1 7 0" />
      </svg>
    ),
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    value: "97%",
    label: "Satisfaction Rate",
  },
]

export function Hero() {
  const router = useRouter()
  const [keyword, setKeyword] = React.useState("")
  const [location, setLocation] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set("q", keyword.trim())
    if (location.trim()) params.set("location", location.trim())

    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
      <section className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col justify-between overflow-hidden bg-[#07080B] text-white pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
        {/* Background Globe Illustration: Full viewport coverage with center alignment */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative h-full w-full max-w-[1600px]">
            <Image
              src="/images/globe.png"
              alt=""
              fill
              priority
              className="select-none pointer-events-none object-cover object-[center_42%] opacity-90"
            />
          </div>
        </div>

            {/* Top Black Gradient: Completely masks the top magenta artifact from globe.png */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-48 sm:h-64 bg-gradient-to-b from-[#07080B] via-[#07080B]/85 to-transparent z-1"
            />

            {/* Bottom Black Gradient: Subtle fade into the footer or next section */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080B] to-transparent z-1"
            />

            {/* Main Content Container: Stretches cleanly across the viewport */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 sm:px-6 lg:px-8">
              {/* Top Hero Block: 784px Frame */}
              <div className="mx-auto flex w-full max-w-[784px] flex-col items-center text-center">
                {/* Top Pill: 💼 50,000+ NEW JOBS THIS MONTH */}
                <div className="flex w-full items-center justify-center gap-3">
                  <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent via-white/10 to-white/20" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121319]/80 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-300 uppercase shadow-lg shadow-black/40 backdrop-blur-md">
                    <span className="text-sm">💼</span>
                    <span className="font-bold text-white">50,000+</span>
                    <span className="tracking-[0.16em] text-zinc-400">NEW JOBS THIS MONTH</span>
                  </div>
                  <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent via-white/10 to-white/20" />
                </div>

                  {/* Headline */}
                  <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                    Find Your Dream Job Today
                  </h1>

                  {/* Sub-headline */}
                  <p className="mt-2.5 sm:mt-3 max-w-[620px] text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                    HireLoop connects top talent with world-class companies. Browse thousands of
                    curated opportunities and land your next role — faster.
                  </p>

                  {/* Search Bar Pill */}
                  <form
                    onSubmit={handleSearch}
                    className="mt-5 sm:mt-6 flex w-full max-w-[720px] items-center rounded-full border border-white/10 bg-[#121319]/90 p-1.5 sm:p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {/* Keyword / Skill Input */}
                    <div className="relative flex flex-1 items-center pl-3">
                      <Search className="size-4 shrink-0 text-zinc-400" />
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                      />
                    </div>

                  {/* Vertical Divider */}
                  <div className="hidden h-5 sm:h-6 w-px bg-white/15 sm:block mx-1" />

              {/* Location Input */}
              <div className="relative flex flex-1 items-center pl-3">
                <MapPin className="size-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location or Remote"
                  className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                aria-label="Search"
                className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-[#5B50FF] text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-[#4E43E8] active:scale-95"
              >
                <Search className="size-4 stroke-[2.2]" />
              </button>
            </form>

              {/* Trending Positions Row */}
              <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-zinc-400 font-medium text-[11px] sm:text-xs">
                  Trending Position
                </span>
                {trendingPositions.map((tag) => (
                  <Link
                    key={tag}
                    href={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Lower Hero Block: Globe Horizon Heading & 4 Cards */}
            <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center">
              {/* Globe Horizon Heading */}
              <h2 className="text-center text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-normal tracking-tight text-white/95 max-w-xl mx-auto leading-snug px-4">
                Assisting over <span className="font-semibold text-white">15,000 job seekers</span>
                <br />
                find their dream positions.
              </h2>

                {/* The 4 Metrics Cards */}
                <div className="mt-5 sm:mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full max-w-[1040px] mx-auto px-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="group relative rounded-2xl border border-white/[0.08] bg-[#0C0D12]/95 p-4 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#101117] min-h-[140px] sm:min-h-[160px] flex flex-col justify-between"
                    >
                      <div className="flex size-7 items-center justify-center text-zinc-400">
                        {stat.icon}
                      </div>
                          <div className="mt-4 sm:mt-6">
                            <div className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-none">
                              {stat.value}
                            </div>
                              <div className="mt-1.5 text-[11px] sm:text-xs font-medium text-zinc-400">
                                {stat.label}
                              </div>
                            </div>
                          </div>
            ))}
                      </div>
        </div>
              </div>
            </section>
            )
}
