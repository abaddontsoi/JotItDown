import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import { DetailedTaskInfo } from "@/components/self-defined/types"
import { Suspense } from "react"
import TaskInfoContextPage from "./TaskInfoContextPage"

interface TaskInfoPageContainerProp {
    task: Promise<DetailedTaskInfo | null>
}

export default async function TaskInfoPageContainer(
    {
        task
    }: TaskInfoPageContainerProp
) {
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <TaskInfoContextPage task={await task} />
        </Suspense>
    )
}