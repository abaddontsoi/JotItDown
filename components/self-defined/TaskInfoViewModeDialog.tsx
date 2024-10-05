'use client';

import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { DetailedTaskInfo } from "./types";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Combobox } from "../ui/combobox";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, Save } from "lucide-react";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
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
    const statusOptions: string[] = Object.values(TaskInfoStatus);
    const [taskStatus, setNewTaskStatus] = useState<string | undefined>(task?.status || TaskInfoStatus.Draft);

    const handleSave = async (taskStatus: string | undefined, taskId: string) => {
        try {
            const value = {
                id: taskId,
                status: taskStatus
            }
            axios.patch('/api/task', value).then(response => {
                if (response.status == 200) {
                    toast(ToastConfirm);
                    router.refresh();
                    setTaskInfoInView(undefined);
                    setNewTaskStatus(undefined);
                }
            }).catch(error => {
                toast(ToastError);
            })
            toast(ToastLoading);
        } catch (error) {
            toast(ToastError);
        }
    }
    return (
        <>
            <Dialog open={task != undefined} onOpenChange={() => setTaskInfoInView(undefined)}>
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

                    <div className="flex flex-row items-center">
                    {
                        statusOptions.map(
                            option => (
                                <Button key={option} variant={'ghost'} className={clsx(
                                    "w-full flex flex-row items-center gap-1",
                                    {
                                        "border-2 border-gray-900": option == taskStatus
                                    }
                                )}
                                type="button"
                                onClick={() => {
                                    setNewTaskStatus(option);
                                }}
                                >
                                    {
                                        option == taskStatus && <Check className="w-5 h-5"/>
                                    }
                                    {option.toUpperCase()}
                                </Button>
                            )
                        )
                    }
                    </div>

                    <div className="w-full flex flex-row items-center gap-1">
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
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TaskInfoViewModeDialog;