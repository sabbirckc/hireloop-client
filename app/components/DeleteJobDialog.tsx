"use client"

import * as React from "react"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface DeleteJobDialogProps {
    job?: {
        id: string
        _id?: string
        title?: string
        jobTitle?: string
        [key: string]: unknown
    } | null
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onDelete?: (id: string, mongoId?: string) => void | Promise<void>
    trigger?: React.ReactElement
}

export function DeleteJobDialog({
    job,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    onDelete,
    trigger,
}: DeleteJobDialogProps) {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen

    const handleOpenChange = (newOpen: boolean) => {
        if (!isDeleting) {
            if (isControlled) {
                setControlledOpen?.(newOpen)
            } else {
                setInternalOpen(newOpen)
            }
        }
    }

    const handleClose = () => {
        if (isControlled) {
            setControlledOpen?.(false)
        } else {
            setInternalOpen(false)
        }
    }

    const jobTitle = job?.title || job?.jobTitle || "this job"

    const handleDelete = async () => {
        if (!job) return
        try {
            setIsDeleting(true)
            await onDelete?.(job.id, (job._id as string) || undefined)
            toast.add({
                title: "Job deleted",
                description: "The Job has been Permanently Deleted",
            })
        } catch (error) {
            console.error("Failed to delete job:", error)
        } finally {
            setIsDeleting(false)
            handleClose()
        }
    }

    // When controlled and not open with no job, do not render content
    if (!job && isControlled && !isOpen) {
        return null
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && <AlertDialogTrigger render={trigger} />}
            {!trigger && !isControlled && (
                <AlertDialogTrigger
                    render={
                        <button
                            type="button"
                            aria-label={`Delete job ${jobTitle}`}
                            className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        >
                            <Trash2 className="size-3.5" />
                        </button>
                    }
                />
            )}
            <AlertDialogContent
                size="sm"
                className="bg-[#121520] border-zinc-800 text-zinc-100 shadow-2xl"
            >
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-red-500/10 text-red-400 border border-red-500/20">
                        <Trash2 className="size-5" />
                    </AlertDialogMedia>
                    <AlertDialogTitle className="text-white text-base font-semibold">
                        Delete Job Post?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400 text-xs leading-relaxed">
                        Are you sure you want to delete <span className="font-medium text-white">&quot;{jobTitle}&quot;</span>? This action cannot be undone and will permanently remove this job listing from MongoDB and your active dashboard.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="border-t border-zinc-800/80 bg-[#0E111A]/80 px-4 py-3">
                    <AlertDialogCancel
                        variant="outline"
                        disabled={isDeleting}
                        onClick={handleClose}
                        className="border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white text-xs h-8"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isDeleting}
                        className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 text-xs h-8 inline-flex items-center gap-1.5"
                        onClick={handleDelete}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="size-3.5 animate-spin" />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            <span>Delete Post</span>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}
