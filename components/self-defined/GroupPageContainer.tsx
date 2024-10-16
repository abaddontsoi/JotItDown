import { Suspense } from "react";
import { Toaster } from "../ui/toaster";
import GroupNotesContainer from "./GroupNotesContainer";
import GroupPageHeader from "./GroupPageHeader";
import GroupTasksContainer from "./GroupTasksContainer";
import GroupTrashCanContainer from "./GroupTrashCanContainer";
import { DetailedGroup, DetailedNote, DetailedTaskInfo, PromiseDetailedGroup } from "./types";
import ContextCardFallBack from "./ContextCardFallBack";

interface GroupPageContainerProps {
    groupData: Promise<DetailedGroup & {
        Note: DetailedNote[],
        TaskInfo: DetailedTaskInfo[],
    } | null>;
}

export default async function GroupPageContainer(
    {
        groupData
    }: GroupPageContainerProps
) {
    const group = await groupData;

    return (
        <>
            <Suspense fallback={<ContextCardFallBack />}>
                {
                    group &&
                    <div className="flex flex-col gap-5">
                        {/* Dialogs */}

                        {/* Header block */}
                        <GroupPageHeader groupData={group} />

                        {/* Page content */}
                        <div className="flex flex-col gap-5">

                            {/* Group Notes */}
                            <GroupNotesContainer
                                notes={group.Note}
                                groupId={group.id}
                            />

                            {/* Group Tasks */}
                            <GroupTasksContainer
                                groupId={group.id}
                                tasks={group.TaskInfo}
                            />

                            {/* Group Trash Can */}
                            <GroupTrashCanContainer />
                        </div>
                    </div>
                }
            </Suspense>
            <Toaster />
        </>
    )
}