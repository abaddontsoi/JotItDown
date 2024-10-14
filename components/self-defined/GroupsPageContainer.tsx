import GroupCard from "./GroupCard";
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
            {/* Dialogs */}
            
            {/* Header block */}

            {/* Page content */}
            {
                groups.map(group => {
                    return (
                        <GroupCard group={group}/>
                    )
                })
            }
        </>
    )
}