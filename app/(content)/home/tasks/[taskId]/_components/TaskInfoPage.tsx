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
        <>
        </>
    )
}