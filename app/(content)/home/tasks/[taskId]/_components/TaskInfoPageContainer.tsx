import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import { DetailedTaskInfo } from "@/components/self-defined/types"
import { Suspense } from "react"
import TaskInfoPage from "./TaskInfoPage"

interface TaskInfoPageContainerProp {
    task: Promise<DetailedTaskInfo | null>
}

export default async function TaskInfoPageContainer(
    {
        task
    }: TaskInfoPageContainerProp
) {
    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                <TaskInfoPage task={await task} />
            </Suspense>
        </>
    )
}