'use client';

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import GroupForm from "./GroupForm";
import { DetailedGroup, DialogModes } from "./types";

interface GroupDialogProp {
    mode: DialogModes;
    existingGroup?: DetailedGroup;
    setMode: (mode: DialogModes) => void;
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