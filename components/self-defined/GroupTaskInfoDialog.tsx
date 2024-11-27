'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskInfoForm from "./TaskInfoForm";
import { DetailedTaskInfo, Modes } from "./types";

interface GroupTaskInfoDialogProp {
    existingTaskInfo?: DetailedTaskInfo;
    mode: 'Edit' | 'Create' | 'Close',
    parentContentBlockid?: string,
    groupId?: string,
    setTargetTaskInfo: (task?: DetailedTaskInfo) => void;
    setMode: (mode: Modes) => void;
}

const GroupTaskInfoDialog = ({
    mode,
    existingTaskInfo,
    parentContentBlockid,
    groupId,
    setMode,
    setTargetTaskInfo
}: GroupTaskInfoDialogProp) => {
    return (
        <Dialog open={mode != 'Close'}
            onOpenChange={() => {
                setMode('Close');
                setTargetTaskInfo();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode} Task
                    </DialogTitle>
                </DialogHeader>

                <TaskInfoForm
                    mode={mode}
                    existingTaskInfo={existingTaskInfo}
                    parentContentBlockid={parentContentBlockid}
                    groupId={groupId}
                    setTargetTaskInfo={setTargetTaskInfo}
                    setMode={setMode}
                />
            </DialogContent>
        </Dialog>
    )
}

export default GroupTaskInfoDialog;