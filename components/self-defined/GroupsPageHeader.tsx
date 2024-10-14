'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface GroupsPageHeaderProp {

}

export default function GroupsPageHeader (
    {}: GroupsPageHeaderProp
) {
    return (
        <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-6xl">Groups</p>

            {/* Create group button */}
            <Button className="flex flex-row gap-1 items-center">
                <Plus /> Group
            </Button>
        </div>
    )
}