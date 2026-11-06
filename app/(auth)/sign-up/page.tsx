"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [authError, setAuthError] = React.useState<string | null>(null)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })
    const [submittedData, setSubmittedData] = React.useState<typeof formData | null>(null)
    const [passwordError, setPasswordError] = React.useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        if (passwordError) setPasswordError(null)
        if (authError) setAuthError(null)
    }

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (formData.password !== formData.confirmPassword) {
                setPasswordError("Passwords do not match")
                return
            }

            setIsLoading(true)
            setPasswordError(null)
            setAuthError(null)
            console.log("Sign Up Form Data Collected:", formData)
            setSubmittedData(formData)

            const { data, error } = await authClient.signUp.email({
                name: formData.name, // required, The name of the user.
                email: formData.email, // required, The email address of the user.
                password: formData.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
                image: "https://example.com/image.png", // An optional profile image of the user.
                callbackURL: "/", // An optional URL to redirect to after the user signs up.
            })

            setIsLoading(false)

            if (error) {
                setAuthError(error.message || "Something went wrong during sign up")
                return
            }

            if (data) {
                router.push("/")
            }
        }

            const handleGoogleSignUp = async () => {
                console.log("Sign Up with Google triggered")
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                })
            }

            return (
                <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    {/* Background ambient gradient glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
                    >
                        <div className="h-[480px] w-[580px] rounded-full bg-[#5B50FF]/15 blur-[120px] dark:bg-[#5B50FF]/20" />
                    </div>

                    <div className="w-full max-w-md space-y-6">
                        {/* Card Container */}
                        <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-zinc-950/70">

                            {/* Header & Logo */}
                            <div className="flex flex-col items-center text-center">
                                <Link
                                    href="/"
                                    className="mb-4 inline-flex items-center gap-2 rounded-lg transition-transform hover:scale-105"
                                >
                                    <Image
                                        src="/images/logo.png"
                                        alt="Hireloop"
                                        width={130}
                                        height={34}
                                        priority
                                        className="h-7 w-auto object-contain dark:brightness-110"
                                    />
                                </Link>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Create an account
                                </h1>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Join HireLoop to discover top jobs or recruit talent
                                </p>
                            </div>

                            {/* Page Toggle Tabs */}
                            <div className="mt-6 grid grid-cols-2 rounded-xl bg-muted/60 p-1 text-center text-sm font-medium dark:bg-zinc-900/80">
                                <Link
                                    href="/sign-in"
                                    className="rounded-lg py-2 text-muted-foreground transition-all hover:text-foreground"
                                >
                                    Sign In
                                </Link>
                                <span
                                    className="rounded-lg bg-background py-2 text-foreground shadow-sm transition-all dark:bg-zinc-800"
                                >
                                    Sign Up
                                </span>
                            </div>

                            {/* Social Sign-Up Button */}
                            <div className="mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleGoogleSignUp}
                                    className="w-full h-11 justify-center gap-3 rounded-xl border-border/80 bg-background/60 hover:bg-muted/80 text-foreground transition-all"
                                >
                                    <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        />
                                    </svg>
                                    <span>Sign up with Google</span>
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/80" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-3 text-muted-foreground dark:bg-zinc-950">
                                        Or sign up with email
                                    </span>
                                </div>
                            </div>

                            {/* Sign Up Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {authError && (
                                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive font-medium">
                                        {authError}
                                    </div>
                                )}

                                {/* Full Name Field */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="signup-name">Full name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="signup-name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            placeholder="Jane Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="pl-10 h-11"
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="signup-email">Email address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="signup-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pl-10 h-11"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="signup-password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            required
                                            minLength={8}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10 pr-10 h-11"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">
                                        Must be at least 8 characters long
                                    </p>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="signup-confirmPassword">Confirm password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="signup-confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            required
                                            placeholder="Re-enter your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="pl-10 pr-10 h-11"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    {passwordError && (
                                        <p className="text-xs text-destructive font-medium">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions Checkbox */}
                                <div className="flex items-start space-x-2 pt-1">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        required
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="mt-0.5 size-4 rounded border-border text-[#5B50FF] focus:ring-[#5B50FF] focus:ring-offset-0 bg-background"
                                    />
                                    <Label
                                        htmlFor="agreeToTerms"
                                        className="text-xs text-muted-foreground font-normal leading-relaxed cursor-pointer"
                                    >
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-[#5B50FF] hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-[#5B50FF] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 rounded-xl bg-[#5B50FF] text-white hover:bg-[#4E43E8] shadow-md shadow-indigo-600/25 font-semibold transition-all group disabled:opacity-60"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Debug Display of collected data (can be removed upon full auth integration) */}
                            {submittedData && (
                                <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                                    <p className="font-semibold">Form data collected:</p>
                                    <pre className="mt-1 overflow-x-auto">
                                        {JSON.stringify(
                                            { ...submittedData, password: "••••••••", confirmPassword: "••••••••" },
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            )}

                            {/* Toggle / Switch to Sign In */}
                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="font-semibold text-[#5B50FF] hover:underline"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }