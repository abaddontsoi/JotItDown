import { Suspense } from "react";
import { DetailedNote, PromiseOverduedTasksInfos, UrgentTasks } from "./types";
import TasksMainPage from "./TasksMainPage";
import ContextCardFallBack from "./ContextCardFallBack";
interface TaskMainPageContainerProp {
    allNotes: Promise<DetailedNote[]>,
    fiveMostUrgentTaskInfo: Promise<UrgentTasks[]>,
    overduedTasksInfo?: PromiseOverduedTasksInfos
}
const TaskMainPageContainer = async (
    {
        allNotes,
        fiveMostUrgentTaskInfo,
        overduedTasksInfo
    }: TaskMainPageContainerProp
) => {
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <TasksMainPage
                allNotes={await allNotes}
                fiveMostUrgentTaskInfo={await fiveMostUrgentTaskInfo}
                overduedTasksInfo={await overduedTasksInfo}
            />
        </Suspense>
    )
}

export default TaskMainPageContainer;