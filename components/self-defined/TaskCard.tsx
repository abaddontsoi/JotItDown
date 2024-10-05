'use client';

import { TaskInfo } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CalendarFold, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { DetailedTaskInfo } from "./types";

interface TaskCardProp {
    task: DetailedTaskInfo
}

const TaskCard = (
    {
        task
    }: TaskCardProp
) => {
    const router = useRouter();
    return (
        <>
            <Card className="w-fit transition duration-200 hover:scale-[1.2]">
                {/* list out task title, description and deadline, click to access that note */}
                <CardHeader>
                    <CardTitle>
                        {task.title}
                    </CardTitle>
                    <CardDescription className="flex flex-row gap-1 items-center">
                        <CalendarFold />
                        {task.deadline.toDateString()}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-2">
                    <CardDescription className="min-w-[200px] max-w-[250px] truncate">
                        {task.description}
                    </CardDescription>
                    <Button
                        variant={'link'}
                        onClick={() => {
                            router.push('/home/notes/' + task.parentContentBlock.parentNote?.id.toString());
                        }}
                        className="underline flex flex-row gap-1"
                    >
                        {task.parentContentBlock.parentNote?.title}
                        <MoveRight className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default TaskCard;