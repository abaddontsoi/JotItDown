'use client';

import { TaskInfoStatus } from "@prisma/client";
import { Combobox } from "../ui/combobox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Input } from "../ui/input";

const TaskInfoContent = ({ task }: {
    task: {
        title?: string,
        description: string,
        status: TaskInfoStatus,
        deadline: Date
    }
}) => {

    const statuses = Object.entries(TaskInfoStatus).map((key, value) => ({
        value: key[0],
        label: key[0]
    }));
    const [status, setStatus] = useState<string | undefined>(TaskInfoStatus.Draft);

    return (
        <>
            <div className="flex flex-col gap-1">
                <Label>Task Title</Label>
                <Input
                    defaultValue={task.title}
                />
            </div>
            <div className="flex flex-row items-center gap-1 my-2">
                {/* status combo box */}
                <div className="flex flex-col gap-1 basis-1/2">
                    <Label>Stauts</Label>
                    <Combobox
                        value={status}
                        options={
                            statuses
                        }
                        onChange={(value) => {
                            setStatus(Object.entries(TaskInfoStatus).find(s => s[0] == value)?.[0]);
                        }}
                    />
                </div>

                {/* date picker */}
                <div className="flex flex-col gap-1 basis-1/2">
                    <Label>Deadline</Label>
                    {/* Use date picker */}
                </div>
            </div>

            <div className="my-2">
                <Label>Task Description</Label>
                <Textarea
                    className=""
                    defaultValue={task.description}
                ></Textarea>
            </div>
        </>
    )
}

export default TaskInfoContent;