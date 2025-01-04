'use client';

import { useTaskInfo } from "@/app/contexts/taskinfo/TaskInfoContext";
import { DetailedNote, DetailedTaskInfo, Modes } from "@/components/self-defined/types";
import { Button } from "@/components/ui/button";
import { Group, TaskInfoStatus } from "@prisma/client";
import { Pen } from "lucide-react";
import TaskInfoDisplay from "./TaskInfoDisplay";
import TaskInfoForm from "@/components/self-defined/taskInfo/TaskInfoForm";

interface TaskInfoPageProps {
    task?: DetailedTaskInfo;
    notes: DetailedNote[];
    groups: Group[];
}

export default function TaskInfoPage({
    task,
    notes,
    groups
}: TaskInfoPageProps) {

    // use context to set task
    const ctx = useTaskInfo();

    if (!ctx.task) {
        return (
            <div>
                Task not found
            </div>
        )
    }

    return (
        <div className="w-full">
            {
                ctx.mode == 'Close' && (
                    <TaskInfoDisplay task={ctx.task} />
                )
            }
            {
                ctx.mode == 'Edit' && (
                    <TaskInfoForm
                        mode={ctx.mode}
                        setTargetTaskInfo={ctx.setTask}
                        setMode={ctx.setMode}
                        existingTaskInfo={ctx.task}
                        notes={notes}
                        groups={groups}
                    />
                )
            }
        </div>
    );
}
