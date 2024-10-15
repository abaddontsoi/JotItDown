'use client';

import { useState } from "react";
import GroupCard from "./GroupCard";
import { DetailedGroup, DialogModes } from "./types";
import GroupDialog from "./GroupDialog";

interface GroupCardsContainerProp {
    groups: DetailedGroup[]
}

export default function GroupCardsContainer(
    {
        groups
    }: GroupCardsContainerProp
) {
    const [mode, setMode] = useState<DialogModes>('Close');
    const [group, setGroup] = useState<DetailedGroup>();

    return (
        <>
            <GroupDialog
                mode={mode}
                existingGroup={group}
                setMode={setMode}
                setGroup={setGroup}
            />
            <div className="flex items-center gap-3 flex-wrap">
                {
                    groups.map(group => {
                        return (
                            <GroupCard
                                group={group}
                                setMode={setMode}
                                setGroup={setGroup}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}