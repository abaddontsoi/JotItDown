'use client';

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import GroupForm from "./GroupForm";
import { DetailedGroup, Modes } from "./types";

interface GroupDialogProp {
    mode: Modes;
    existingGroup?: DetailedGroup;
    setMode: (mode: Modes) => void;
    setGroup: (group?: DetailedGroup) => void;
}

export default function GroupDialog(
    {
        mode,
        existingGroup,
        setMode,
        setGroup,
    }: GroupDialogProp
) {
    return (
        <Dialog 
            open={mode != 'Close'} 
            onOpenChange={() => {
                setMode('Close');
                setGroup(undefined);
            }}
        >
            <DialogContent>
                <DialogTitle>
                    {mode} Group
                </DialogTitle>

                <GroupForm 
                    mode={mode}
                    existingGroup={existingGroup}
                    setMode={setMode}
                    setGroup={setGroup}
                />
            </DialogContent>
        </Dialog>
    )
}