import GroupCard from "./GroupCard";
import GroupCardsContainer from "./GroupCardsContainer";
import GroupsPageHeader from "./GroupsPageHeader";
import { PromiseDetailedGroup } from "./types"

interface GroupsPageContainerProp {
    userGroups: PromiseDetailedGroup
}

export default async function GroupsPageContainer(
    {
        userGroups
    }: GroupsPageContainerProp
) {
    const groups = await userGroups;

    return (
        <>
            <div className="flex flex-col gap-5">
                {/* Dialogs */}

                {/* Header block */}
                <GroupsPageHeader />

                {/* Page content */}
                <GroupCardsContainer groups={groups} />
            </div>
        </>
    )
}