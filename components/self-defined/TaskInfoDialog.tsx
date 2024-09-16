import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { TaskInfo } from "@prisma/client";

interface TaskInfoDialogProp {
    existingTaskInfo?: TaskInfo,
    mode: 'Edit' | 'Create' | 'Close', 
    setTargetTaskInfo?: Dispatch<SetStateAction<TaskInfo>>,
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
}

const TaskInfoDialog = ({
    mode,
    setMode
}: TaskInfoDialogProp) => {
    return (
        <Dialog open={mode != 'Close'}
        onOpenChange={() => {
            setMode('Close');
        }}
        >
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}

export default TaskInfoDialog;