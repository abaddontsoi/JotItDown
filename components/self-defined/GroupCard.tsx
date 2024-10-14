'use client';

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
        <Card>
            <CardHeader>
                <div className="text-xl font-bold">
                    {group.name}
                </div>
                <CardDescription>{group.description}</CardDescription>
            </CardHeader>

            <CardContent>
            </CardContent>
        </Card>
    )
}