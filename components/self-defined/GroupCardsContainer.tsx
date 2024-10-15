'use client';

import GroupCard from "./GroupCard";
import { DetailedGroup } from "./types";

interface GroupCardsContainerProp {
    groups: DetailedGroup[]
}

export default function GroupCardsContainer(
    {
        groups
    }: GroupCardsContainerProp
) {
    return (
        <div>
            {
                groups.map(group => {
                    return (
                        <GroupCard group={group} />
                    )
                })
            }
        </div>

    )
}