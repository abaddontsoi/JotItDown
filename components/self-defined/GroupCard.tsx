'use client';

import { Settings, Trash, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { DetailedGroup } from "./types";

interface GroupCardProp {
    group: DetailedGroup
}

export default function GroupCard(
    {
        group,
    }: GroupCardProp
) {
    return (
        <Card className="w-fit">
            <CardHeader className="flex flex-row items-center justify-between gap-10">
                <div>
                    <div className="text-xl font-bold">
                        {group.name}
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                </div>

                {/* button groups */}
                <div>
                    <Button 
                    variant={'ghost'} 
                    className="w-fit"
                    onClick={() => {
                        // open the group setting panel  
                    }}
                    >
                        <Settings />
                    </Button>

                    <Button 
                    variant={'ghost'} 
                    className="w-fit"
                    onClick={() => {
                        // open the add user panel  
                    }}
                    >
                        <UserPlus />
                    </Button>

                </div>
            </CardHeader>

            <CardContent>
            </CardContent>
        </Card>
    )
}