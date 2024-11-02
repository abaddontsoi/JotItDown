'use client';

import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { DetailedTaskInfo } from "./types";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Combobox } from "../ui/combobox";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, Save } from "lucide-react";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import axios from "axios";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface TaskInfoViewModeDialogProp {
    task?: DetailedTaskInfo;
    setTaskInfoInView: (task: DetailedTaskInfo | undefined) => void;
}

const TaskInfoViewModeDialog = (
    {
        task,
        setTaskInfoInView,
    }: TaskInfoViewModeDialogProp
) => {
    const router = useRouter();
    // const statusOptions: string[] = Object.values(TaskInfoStatus);
    const [taskStatus, setNewTaskStatus] = useState<TaskInfoStatus | undefined>(task?.status);

    const handleSave = async (taskStatus: string | undefined, taskId: string | undefined) => {
        try {
            const value = {
                id: taskId,
                status: taskStatus
            }
            axios.patch('/api/task', value).then(response => {
                if (response.status == 200) {
                    toast(ToastDone);
                    router.refresh();
                    // setTaskInfoInView(undefined);
                    // setNewTaskStatus(undefined);
                }
            }).catch(error => {
                toast(ToastError);
            })
            toast(ToastLoading);
        } catch (error) {
            toast(ToastError);
        }
    }

    const onOpenChange = () => {
        setTaskInfoInView(undefined);
        setNewTaskStatus(undefined);
    }

    return (
        <>
            <Dialog open={task != undefined} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {task?.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div>
                        {
                            task?.description
                        }
                    </div>

                    {/* <div>
                        <Label>Task Status</Label>
                        <Combobox
                            value={taskStatus}
                            onChange={(value) => {
                                console.log(value);
                                setNewTaskStatus(value);
                            }}
                            options={
                                statusOptions.map(
                                    item =>
                                    (
                                        {
                                            value: item,
                                            label: item,
                                        }
                                    )
                                )
                            }
                        />
                    </div> */}

                    <div>
                        <Label>Set to</Label>
                        <div className="flex flex-row items-center gap-2">
                            {
                                Object.values(TaskInfoStatus).map(
                                    option => (
                                        <Button key={option} variant={'outline'} className={clsx(
                                            "w-full flex flex-row items-center gap-1",
                                        )}
                                            type="button"
                                            onClick={() => {
                                                setNewTaskStatus(option);
                                                handleSave(option, task?.id);
                                            }}
                                        >
                                            {
                                                (option == taskStatus) && <Check className="w-5 h-5" />
                                            }
                                            {option.toUpperCase()}
                                        </Button>
                                    )
                                )
                            }
                        </div>
                    </div>

                    {/* <div className="w-full flex flex-row items-center gap-1">
                        <Button
                            type='button'
                            variant={'ghost'}
                            className="basis-1/2"
                            onClick={() => {
                                setTaskInfoInView(undefined);
                                setNewTaskStatus(undefined);
                            }}
                        >
                            Close
                        </Button>
                        <Button className="basis-1/2 flex flex-row gap-1" onClick={() => handleSave(taskStatus, task?.id || '')}>
                            Save <Save className="w-5 h-5" />
                        </Button>
                    </div> */}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TaskInfoViewModeDialog;