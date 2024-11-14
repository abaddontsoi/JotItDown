'use client';

import { Plus, Settings, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import GroupDialog from "./GroupDialog";
import { useState } from "react";
import { DetailedGroup, DialogModes } from "./types";
import GroupInviteDialog from "./GroupInviteDialog";

interface GroupsPageHeaderProp {
    groupData: DetailedGroup
}

export default function GroupPageHeader(
    {
        groupData
    }: GroupsPageHeaderProp
) {
    const [mode, setMode] = useState<DialogModes>('Close');
    const [inviteMode, setInviteMode] = useState<DialogModes>('Close');
    const [group, setGroup] = useState<DetailedGroup>();

    return (
        <>
            <GroupDialog
                mode={mode}
                setMode={setMode}
                existingGroup={group}
                setGroup={setGroup}
            />
            <GroupInviteDialog
                mode={inviteMode}
                existingGroup={groupData}
                setMode={setInviteMode}
            />
            <div className="flex flex-row items-center justify-between px-4 py-4 sticky wi-full">
                <div className="font-bold text-6xl">
                    {groupData.name}
                    <div className="text-gray-500 text-sm font-normal w-[200px] truncate">
                        {groupData.description}
                    </div>
                </div>
                <div className="flex items-center">
                    {/* Edit group button */}
                    <Button className="flex flex-row gap-1 items-center w-fit"
                        onClick={() => {
                            setGroup(groupData);
                            setMode('Edit');
                        }}
                        variant={'ghost'}
                    >
                        <Settings />
                    </Button>

                    {/* Invitation Button */}
                    <Button className="flex flex-row gap-1 items-center w-fit"
                        onClick={() => {
                            // open user invitation panel
                            setInviteMode('Create');
                        }}
                        variant={'ghost'}
                    >
                        <UserPlus />
                    </Button>
                </div>
            </div>

        </>
    )
}