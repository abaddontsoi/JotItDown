'use client';

import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Note } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

const NoteDialog = ({existingNote, mode, setMode }: {
    existingNote?: Note, 
    mode: 'Edit' | 'Create' | 'Close'
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>
}) => {
    return (
        <Dialog open={mode != 'Close'} onOpenChange={() => {
            setMode('Close');
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {mode.toWellFormed()} Note
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default NoteDialog;