import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import { DetailedNote, DetailedTaskInfo } from "@/components/self-defined/types"
import { Suspense } from "react"
import TaskInfoContextPage from "./TaskInfoContextPage"
import { Group } from "@prisma/client"

interface TaskInfoPageContainerProp {
    task: Promise<DetailedTaskInfo | null>
    notes: DetailedNote[]
    groups: Group[] 
}

export default async function TaskInfoPageContainer(
    {
        task,
        notes,
        groups
    }: TaskInfoPageContainerProp
) {
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <TaskInfoContextPage task={await task} notes={notes} groups={groups} />
        </Suspense>
    )
}