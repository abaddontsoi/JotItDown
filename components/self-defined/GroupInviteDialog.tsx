'use client';

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Toaster } from "../ui/toaster";
import GroupForm from "./GroupForm";
import GroupInviteForm from "./GroupInviteForm";
import { DetailedGroup, Modes } from "./types";

interface GroupDialogProp {
    mode: Modes;
    existingGroup: DetailedGroup;
    setMode: (mode: Modes) => void;
    // setGroup: (group?: DetailedGroup) => void;
}

export default function GroupInviteDialog(
    {
        mode,
        existingGroup,
        setMode,
        // setGroup,
    }: GroupDialogProp
) {
    return (
        <Dialog
            open={mode != 'Close'}
            onOpenChange={() => {
                setMode('Close');
                // setGroup(undefined);
            }}
        >
            <DialogContent>
                <DialogTitle>
                    Invite Group Member
                </DialogTitle>

                <GroupInviteForm
                    mode={mode}
                    existingGroup={existingGroup}
                    setMode={setMode}
                />
            </DialogContent>
        </Dialog>
    )
}