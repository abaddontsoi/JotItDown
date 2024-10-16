import { Toaster } from "../ui/toaster";
import GroupNotesContainer from "./GroupNotesContainer";
import GroupPageHeader from "./GroupPageHeader";
import GroupTasksContainer from "./GroupTasksContainer";
import GroupTrashCanContainer from "./GroupTrashCanContainer";
import { DetailedGroup, PromiseDetailedGroup } from "./types";

interface GroupPageContainerProps {
    groupData: Promise<DetailedGroup | null>;
}

export default async function GroupPageContainer(
    {
        groupData
    }: GroupPageContainerProps
) {
    const group = await groupData;

    return (
        <>
            {
                group &&
                <div className="flex flex-col gap-5">
                    {/* Dialogs */}

                    {/* Header block */}
                    <GroupPageHeader groupData={group} />

                    {/* Page content */}
                    <div className="flex flex-col gap-5">

                        {/* Group Notes */}
                        <GroupNotesContainer />

                        {/* Group Tasks */}
                        <GroupTasksContainer />

                        {/* Group Trash Can */}
                        <GroupTrashCanContainer />
                    </div>
                </div>
            }
            <Toaster />
        </>
    )
}