'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskCard from "./TaskCard";
import { DetailedTaskInfo } from "./types";

interface AllTasksContextCardProp {
    tasks: DetailedTaskInfo[];
    setTaskInfoInView?: (task: DetailedTaskInfo | undefined) => void;
}

export default function AllTasksContextCard(
    {
        tasks,
        setTaskInfoInView,
    }: AllTasksContextCardProp
) {
    return (
        <Card>
            <CardHeader>
                {/* Title */}
                <CardTitle>
                    {"All tasks"}
                </CardTitle>

                {/* Filter */}
            </CardHeader>

            <CardContent>
                {/* Filtered tasks */}
                <CardContent>
                    {
                        tasks.map(task => (
                            <TaskCard 
                                key={task.id}
                                task={task}
                                setTaskInfoInView={setTaskInfoInView}
                            />
                        ))
                    }
                </CardContent>
            </CardContent>
        </Card>
    )
}