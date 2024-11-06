'use client';

import { TaskInfo } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CalendarFold, Eye, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { DetailedTaskInfo } from "./types";
import { Badge } from "../ui/badge";

interface TaskCardProp {
    task: DetailedTaskInfo
    setTaskInfoInView?: (task: DetailedTaskInfo | undefined) => void
}

const TaskCard = (
    {
        task,
        setTaskInfoInView
    }: TaskCardProp
) => {
    const router = useRouter();
    return (
        <>
            <Card className="w-fit transition duration-200 hover:scale-[1.02]">
                {/* list out task title, description and deadline, click to access that note */}
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="flex flex-row items-center gap-1">
                            {task.title}
                            <Badge
                                variant={'outline'}
                            >
                                {task.status}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="flex flex-row gap-1 items-center">
                            <CalendarFold />
                            {task.deadline.toDateString()}
                        </CardDescription>
                    </div>
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            if (setTaskInfoInView)
                                setTaskInfoInView(task);
                        }}
                    >
                        <Eye />
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-2">
                    <CardDescription className="min-w-[200px] max-w-[250px] truncate">
                        {task.description}
                    </CardDescription>
                    <Button
                        variant={'link'}
                        onClick={() => {
                            router.push('/home/notes/' + task.parentContentBlock?.parentNote?.id.toString());
                        }}
                        className="underline flex flex-row gap-1"
                    >
                        {task.parentContentBlock?.parentNote?.title}
                        <MoveRight className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default TaskCard;