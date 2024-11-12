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
import { Dispatch, SetStateAction } from "react";
import NoteForm from "./NoteForm";
import { DetailedNote } from "./types";

interface NoteDialogProp {
    existingNote?: DetailedNote;
    mode: 'Edit' | 'Create' | 'Close';
    groupId?: string;
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>;
}

const NoteDialog = ({
    existingNote,
    mode,
    groupId,
    setMode
}: NoteDialogProp) => {
    return (
        <Dialog open={mode != 'Close'} onOpenChange={() => {
            // setMode('Close');
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {mode} Note
                    </DialogTitle>
                </DialogHeader>

                <NoteForm
                    existingNote={existingNote}
                    mode={mode}
                    setMode={setMode}
                    groupId={groupId}
                ></NoteForm>
            </DialogContent>
        </Dialog>
    )
}

export default NoteDialog;