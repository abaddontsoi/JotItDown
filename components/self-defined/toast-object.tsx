import { Check, LoaderCircle, X } from "lucide-react"

export const ToastLoading = {
    description: (
        <div className="flex flex-row items-center gap-1">
            <LoaderCircle className="animate-spin w-4 h-4" />
            {'Saving your changes, please wait ...'}
        </div>
    )
}

export const ToastDone = {
    description: (
        <div className="flex flex-row items-center gap-1">
            <Check className="transition ease-in-out  w-4 h-4" />
            {'Done !'}
        </div>
    )
}

export const ToastError = {
    description: (
        <div className="flex flex-row items-center gap-1">
            <X className="transition ease-in-out  w-4 h-4" />
            {'Something went wrong'}
        </div>
    )
}

export const ToastErrorWithMessage = (message: string) => ({
    title: "Error",
    description: message || "Failed to disable account",
})