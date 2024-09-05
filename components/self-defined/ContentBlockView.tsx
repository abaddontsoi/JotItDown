'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentBlock, TaskInfo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Pen, PenLine } from "lucide-react";

const ContentBlockView = (
    { contentBlock }: {
        contentBlock: ContentBlock & {
            taskInfo?: TaskInfo[]
        },
    }
) => {
    const router = useRouter();
    const tasks: TaskInfo[] | undefined = contentBlock.taskInfo;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    {
                        contentBlock.title
                    }

                    {/* click this button to edit the content block */}
                    <Button variant={'ghost'}>
                        <PenLine />
                    </Button>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="">
                    {
                        contentBlock.content.split('\n').map(
                            s => (
                                <p key={s}>
                                    {s}
                                </p>
                            )
                        )
                    }
                </div>

                <div className="flex flex-row justify-end">
                    {
                        tasks &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'link'}>
                                    Tasks
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    tasks.map(task => (
                                        <DropdownMenuItem key={task.id}>
                                            <Button variant={'link'}
                                                onClick={() => {
                                                    router.push('/home/tasks/' + task.id);
                                                }}
                                            >
                                                {task.title}
                                            </Button>
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default ContentBlockView;