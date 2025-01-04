'use client';

import { DetailedNote, DetailedTaskInfo } from "@/components/self-defined/types";
import TaskInfoDisplay from "./TaskInfoPage";
import { TaskInfoProvider } from "@/app/contexts/taskinfo/TaskInfoContext";
import { Toaster } from "@/components/ui/toaster";
import { Group } from "@prisma/client";

interface TaskInfoContextPageProp {
    task: DetailedTaskInfo | null;
    notes: DetailedNote[];
    groups: Group[];
}

export default function TaskInfoContextPage({
    task,
    notes,
    groups
}: TaskInfoContextPageProp) {
    if (task == null) {
        return (
            <div className="flex items-center justify-center h-screen text-lg text-gray-500">
                Task cannot be found
            </div>
        );
    }

    return (
        <TaskInfoProvider initialTask={task}>
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <TaskInfoDisplay
                    notes={notes}
                    groups={groups}
                />
            </div>
            <Toaster />
        </TaskInfoProvider>
    );
}