import { AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Trash2Icon, X } from "lucide-react";

interface ConfirmDeleteModalProp {
    children: React.ReactNode;
    deleteDescription?: string;
    onConfirmDelete?: () => void;
}

export default function ConfirmDeleteModal(prop: ConfirmDeleteModalProp) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {prop.children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    {
                        prop.deleteDescription && (
                            <AlertDialogDescription>
                                {prop.deleteDescription}
                            </AlertDialogDescription>
                        )
                    }
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="flex items-center gap-1">
                        <X className="w-4 h-4" /> Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={prop.onConfirmDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-1"
                    >
                        <Trash2Icon className="w-4 h-4" /> 
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}