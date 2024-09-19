import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskInfo } from "@prisma/client";
import TaskInfoForm from "./TaskInfoForm";

interface TaskInfoDialogProp {
    existingTaskInfo?: TaskInfo,
    mode: 'Edit' | 'Create' | 'Close',
    parentContentBlockid?: string,
    setTargetTaskInfo?: Dispatch<SetStateAction<TaskInfo>>,
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
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