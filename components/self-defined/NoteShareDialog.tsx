'use client';

import { Group, Note } from "@prisma/client";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import NoteShareForm from "./NoteShareForm";
import { Modes } from "./types";

interface NoteShareDialogProp {
    note: Note;
    mode: Modes;
    groups: Group[];
    setMode: (mode: Modes) => void;
}

export default function NoteShareDialog(
    {
        note,
        mode,
        groups,
        setMode,
    }: NoteShareDialogProp
) {
    return (
        <Dialog open={mode != 'Close'}>
            <DialogContent>
                <DialogTitle>Share note to group</DialogTitle>
                <NoteShareForm
                    note={note}
                    groups={groups}
                    setMode={setMode}
                />
            </DialogContent>
        </Dialog>
    )
}