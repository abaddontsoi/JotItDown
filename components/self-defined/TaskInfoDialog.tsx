'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskInfo } from "@prisma/client";
import TaskInfoForm from "./TaskInfoForm";
import { DetailedTaskInfo } from "./types";

interface TaskInfoDialogProp {
    existingTaskInfo?: TaskInfo,
    mode: 'Edit' | 'Create' | 'Close',
    parentContentBlockid?: string,
    setTargetTaskInfo: (taskInfo: DetailedTaskInfo | undefined) => void,
    setMode: (mode: 'Edit' | 'Create' | 'Close') => void,
}

const TaskInfoDialog = ({
    mode,
    existingTaskInfo,
    parentContentBlockid,
    setMode,
    setTargetTaskInfo
}: TaskInfoDialogProp) => {
    return (
        <Dialog open={mode != 'Close'}
            onOpenChange={() => {
                setMode('Close');
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
                    setMode={setMode}
                    setTargetTaskInfo={setTargetTaskInfo}
                />
            </DialogContent>
        </Dialog>
    )
}

export default TaskInfoDialog;