'use client';

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Toaster } from "../ui/toaster";
import GroupForm from "./GroupForm";
import GroupInviteForm from "./GroupInviteForm";
import { DetailedGroup, DialogModes } from "./types";

interface GroupDialogProp {
    mode: DialogModes;
    existingGroup: DetailedGroup;
    setMode: (mode: DialogModes) => void;
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