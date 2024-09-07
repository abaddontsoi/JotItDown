'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentBlock, TaskInfo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MessageSquareDiff, Pen, PenLine } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DetailedContentBlock } from "./types";

const ContentBlockView = (
    { contentBlock, setMode, setContentBlock }: {
        contentBlock: DetailedContentBlock,
        setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
        setContentBlock: Dispatch<SetStateAction<DetailedContentBlock | undefined>>
    }
) => {
    const router = useRouter();
    const tasks: TaskInfo[] | undefined = contentBlock.taskInfo;

    return (
        <Card className="hover:bg-slate-200 duration-1000">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    {
                        contentBlock.title
                    }

                    <div className="flex flex-row">
                        {/* click this button to edit the content block */}
                        <Button
                            onClick={() => {
                                setMode('Edit');
                                setContentBlock(contentBlock);
                            }}
                            variant={'ghost'}>
                            <PenLine />
                        </Button>

                        {/* click this button to add a new task */}
                        <Button
                            onClick={() => {

                            }}
                            variant={'ghost'}>
                            <MessageSquareDiff />
                        </Button>
                    </div>
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
                        tasks.length > 0 &&
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