import { Suspense } from "react";
import { DetailedNote, PromiseOverduedTasksInfos, DetailedTaskInfo } from "./types";
import TasksMainPage from "./TasksMainPage";
import ContextCardFallBack from "./ContextCardFallBack";
interface TaskMainPageContainerProp {
    allNotes: Promise<DetailedNote[]>,
    allTasks: Promise<DetailedTaskInfo[]>,
    fiveMostUrgentTaskInfo: Promise<DetailedTaskInfo[]>,
    overduedTasksInfo?: PromiseOverduedTasksInfos
}
const TaskMainPageContainer = async (
    {
        allNotes,
        allTasks,
        fiveMostUrgentTaskInfo,
        overduedTasksInfo
    }: TaskMainPageContainerProp
) => {
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <TasksMainPage
                allNotes={await allNotes}
                allTasks={await allTasks}
                fiveMostUrgentTaskInfo={await fiveMostUrgentTaskInfo}
                overduedTasksInfo={await overduedTasksInfo}
            />
        </Suspense>
    )
}

export default TaskMainPageContainer;