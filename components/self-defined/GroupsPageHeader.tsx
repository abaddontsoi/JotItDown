'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import GroupDialog from "./GroupDialog";
import { useState } from "react";
import { DetailedGroup, Modes } from "./types";

interface GroupsPageHeaderProp {

}

export default function GroupsPageHeader(
    { }: GroupsPageHeaderProp
) {
    const [mode, setMode] = useState<Modes>('Close');
    const [group, setGroup] = useState<DetailedGroup>();

    return (
        <>
            <GroupDialog 
            mode={mode}
            setMode={setMode}
            existingGroup={group}
            setGroup={setGroup}
            />
            <div className="flex flex-row items-center justify-between p-4 sticky w-full">
                <p className="text-5xl">Groups</p>

                {/* Create group button */}
                <Button className="flex flex-row gap-1 items-center"
                onClick={() => {
                    setMode('Create');
                    setGroup(undefined);
                }}>
                    <Plus /> Group
                </Button>
            </div>
        </>
    )
}