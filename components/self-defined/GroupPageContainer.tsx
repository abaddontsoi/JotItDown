import GroupPageHeader from "./GroupPageHeader";
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
                    <div className="flex gap-5">

                        {/* Group Notes */}

                        {/* Group Tasks */}

                        {/* Group Trash Can */}
                    </div>
                </div>
            }
        </>
    )
}