'use client';

import { DetailedContentBlock, DetailedNote } from "./types";
import ContentBlockViewContent from "./ContentBlockViewContent";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import ContentBlockDialog from "./ContentBlockDialog";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import TaskInfoDialog from "./TaskInfoDialog";
import { TaskInfo } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
import { useRouter } from "next/navigation";

const NoteView = ({ note }:
    {
        note: DetailedNote | null,
    }
) => {
    const [contentBlockDialogMode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [taskInfoDialogMode, setTaskInfoDialogMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [selectedContentBlock, setSelectedContentBlock] = useState<DetailedContentBlock>();
    const [targetTaskInfo, setTargetTaskInfo] = useState<TaskInfo | undefined>();

    const router = useRouter();

    const confirmDelete = async (noteId: string) => {
        try {
            axios.delete('/api/note', {
                data: {
                    target: noteId,
                }
            }).then(response => {
                if (response.status == 200) {
                    toast(ToastConfirm);
                    router.back();
                }
            }).catch(error => {
                toast(ToastError);
            });
            toast(ToastLoading);
        } catch (error) {
            toast(ToastError);
        }
    }
    if (note != null) {
        return (
            <>
                {/* hidden content block adder dialog */}
                <ContentBlockDialog
                    mode={contentBlockDialogMode}
                    existingContentBlock={selectedContentBlock}
                    defaultParentNodeId={note.id}
                    setMode={setMode}
                    setContentBlock={setSelectedContentBlock}
                />

                {/* Task dialog */}
                <TaskInfoDialog
                    parentContentBlockid={selectedContentBlock?.id}
                    mode={taskInfoDialogMode}
                    existingTaskInfo={targetTaskInfo}
                    setMode={setTaskInfoDialogMode}
                    setTargetTaskInfo={setTargetTaskInfo}
                />


                {/* Title */}
                <div className="flex flex-row justify-between">
                    <p className="text-6xl font-bold font-mono">
                        {note.title || 'No title'}
                    </p>

                    <div className="flex flex-row gap-2 items-center">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant={'ghost'}
                                    className="w-fit"
                                >
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogDescription>
                                    This note will be <span className="inline text-red-400">DELETED</span>
                                </AlertDialogDescription>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                    onClick={() => confirmDelete(note.id)}
                                    >Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button
                            onClick={() => {
                                setMode('Create');
                            }}
                            className="flex flex-row items-center gap-1">
                            <Plus className="w-5 h-5" />
                            Content Block
                        </Button>
                    </div>
                </div>


                <ScrollArea className="h-[800px] mt-4">
                    {/* Content Blocks */}
                    <div className="flex flex-col gap-2 p-4">
                        {
                            note.contentBlocks?.map(block => {
                                return (
                                    <ContentBlockViewContent
                                        key={block.id}
                                        contentBlock={block}
                                        setMode={setMode}
                                        setTaskInfoDialogMode={setTaskInfoDialogMode}
                                        setContentBlock={setSelectedContentBlock}
                                    />
                                )
                            })
                        }
                    </div>
                </ScrollArea>
            </>
        )
    }
}

export default NoteView;
