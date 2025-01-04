'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { ToastDone, ToastError } from "@/components/self-defined/toast-object";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DetailedRoutine } from "@/components/self-defined/types";
import ConfirmDeleteModal from "@/components/self-defined/modal/confirm-delete-modal";

interface DeleteRoutineDialogProps {
    routine: DetailedRoutine;
    children: React.ReactNode;
}

export default function DeleteRoutineDialog({ routine, children }: DeleteRoutineDialogProps) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/routine/${routine.id}`);
            if (response.status === 200) {
                toast(ToastDone);
                router.push('/home/routines');
                router.refresh();
            }
        } catch (error) {
            toast(ToastError);
        }
    };
    const deleteDescription = `This action cannot be undone. This will permanently delete the routine
                        ${`\"${routine.title}\"`} and all its check records.`
    return (
        <ConfirmDeleteModal
            deleteDescription={deleteDescription}
            onConfirmDelete={handleDelete}
        >
            {children}
        </ConfirmDeleteModal>   
    );
} 