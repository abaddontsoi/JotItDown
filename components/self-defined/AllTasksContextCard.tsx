'use client';

import { Card, CardContent, CardHeader } from "../ui/card";
import { DetailedTaskInfo } from "./types";

interface AllTasksContextCardProp {
    tasks: DetailedTaskInfo[];
}

export default function AllTasksContextCard(
    {
        tasks
    }: AllTasksContextCardProp
) {
    return (
        <Card>
            <CardHeader>
                {/* Title */}

                {/* Filter */}
            </CardHeader>

            <CardContent>
                {/* Filtered tasks */}
            </CardContent>
        </Card>
    )
}