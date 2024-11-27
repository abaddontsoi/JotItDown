'use client';

import { DetailedTaskInfo } from "@/components/self-defined/types";

interface TaskInfoPageProp {
    task: DetailedTaskInfo | null
}

export default function TaskInfoPage(
    {
        task
    }: TaskInfoPageProp
) {

    if (task == null) {
        return (
            <>
                Task cannot be found
            </>
        )
    }

    return (
        <div>
            {/* Title */}
            <div>
                {task.title}
            </div>
            
            {/* Location */}
            <div>
                {task.parentContentBlock?.parentNote?.title} \ {task.parentContentBlock?.title}
            </div>
            
            {/* Description */}
            <div>
                {task.description}
            </div>

            {/* Status */}
            <div>
                {task.status}
            </div>

            {/* Belong to */}
            <div>
                {task.belongTo?.name}
            </div>

            {/* Deadline */}
            <div>
                {task.deadline.toDateString()}
            </div>
        </div>
    )
}