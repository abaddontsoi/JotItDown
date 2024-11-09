'use client';

import { Settings, Trash, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { DetailedGroup, DialogModes } from "./types";
import Link from "next/link";

interface GroupCardProp {
    group: DetailedGroup;
    setMode: (mdoe: DialogModes) => void;
    setGroup: (gp: DetailedGroup) => void;
}

export default function GroupCard(
    {
        group,
        setMode,
        setGroup,
    }: GroupCardProp
) {
    return (
        <Card className="w-fit transition hover:scale-[1.01] duration-500 hover:border-slate-700 max-w-[350px]" draggable>
            <CardHeader className="flex flex-row items-center justify-between gap-10">
                <div>
                    <div className="text-xl font-bold">
                        <Link href={`groups/${group.id}`} className="hover:underline">
                            {group.name}
                        </Link>
                    </div>
                    <CardDescription className="max-w-[200px] truncate">{group.description}</CardDescription>
                </div>

                {/* button groups */}
                <div>
                    <Button 
                    variant={'ghost'} 
                    className="w-fit"
                    onClick={() => {
                        // open the group setting panel 
                        setGroup(group);
                        setMode('Edit');
                    }}
                    >
                        <Settings />
                    </Button>

                    {/* <Button 
                    variant={'ghost'} 
                    className="w-fit"
                    onClick={() => {
                        // open the add user panel  
                    }}
                    >
                        <UserPlus />
                    </Button> */}

                </div>
            </CardHeader>

            <CardContent>
            </CardContent>
        </Card>
    )
}