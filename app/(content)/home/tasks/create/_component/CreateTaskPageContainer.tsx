// 'use client';

import { PromiseDetailedNotes } from "@/components/self-defined/types";
import TaskInfoBatchCreate from "./TaskInfoBatchCreate";
import { Group } from "@prisma/client";

interface CreateTaskPageContainerProp {
    notes: PromiseDetailedNotes;
    groups: Promise<Group[]>;
}

export default async function CreateTaskPageContainer({ notes, groups }: CreateTaskPageContainerProp) {
    return (
        <div className="flex flex-col gap-2">
            <TaskInfoBatchCreate notes={await notes} groups={await groups} />
        </div>
    )
}