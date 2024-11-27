'use client';

import { DetailedTaskInfo } from "@/components/self-defined/types";
import TaskInfoDisplay from "./TaskInfoPage";
import { TaskInfoProvider } from "@/app/contexts/taskinfo/TaskInfoContext";
import { Toaster } from "@/components/ui/toaster";

interface TaskInfoContextPageProp {
    task: DetailedTaskInfo | null;
}

export default function TaskInfoContextPage({
    task
}: TaskInfoContextPageProp) {
    if (task == null) {
        return (
            <div className="flex items-center justify-center h-screen text-lg text-gray-500">
                Task cannot be found
            </div>
        );
    }

    return (
        <TaskInfoProvider>
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <TaskInfoDisplay task={task} />
            </div>
            <Toaster />
        </TaskInfoProvider>
    );
}