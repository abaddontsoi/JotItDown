'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentBlock, TaskInfo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MessageSquareDiff, Pen, PenLine, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { DetailedContentBlock } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import axios from "axios";

const ContentBlockViewContent = (
    { contentBlock, setMode, setTaskInfoDialogMode, setContentBlock }: {
        contentBlock: DetailedContentBlock,
        setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
        setTaskInfoDialogMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
        setContentBlock: Dispatch<SetStateAction<DetailedContentBlock | undefined>>
    }
) => {
    const router = useRouter();
    const tasks: TaskInfo[] | undefined = contentBlock.taskInfo;

    const confirmDelete = async (blkId: string) => {
        try {
            const data = {
                target: blkId
            }
            const respose = await axios.delete('/api/content-block', {
                data: data
            });
            console.log(respose);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card className="hover:bg-gray-100 
            duration-200 
            hover:border-gray-800 
            hover:border-2
            hover:-translate-x-2
            hover:scale-[1.01]
            "
            >
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
                                    setTaskInfoDialogMode('Create');
                                }}
                                variant={'ghost'}>
                                <MessageSquareDiff />
                            </Button>

                            {/* Delete button, shows an alert dialog, directly delete the content block when confirmed */}

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant={'ghost'}>
                                        <X />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <div>
                                        You are going to delete content block:
                                    </div>
                                    <div>
                                        {contentBlock.title || 'No title'}
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={async () => {
                                                await confirmDelete(contentBlock.id);
                                            }}
                                        >Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
        </>
    )
}

export default ContentBlockViewContent;