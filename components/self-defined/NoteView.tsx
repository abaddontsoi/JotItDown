'use client';

import { DetailedContentBlock, DetailedNote, Modes } from "./types";
import ContentBlockViewContent from "./ContentBlockViewContent";
import { Button } from "../ui/button";
import { Plus, Share, Trash, Download } from "lucide-react";
import ContentBlockDialog from "./ContentBlockDialog";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import TaskInfoDialog from "./TaskInfoDialog";
import { Group, TaskInfo } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { useRouter } from "next/navigation";
import NoteShareDialog from "./NoteShareDialog";

const NoteView = ({ note, groups }:
    {
        note: DetailedNote | null,
        groups: Group[],
    }
) => {
    const [contentBlockDialogMode, setMode] = useState<Modes>('Close');
    const [taskInfoDialogMode, setTaskInfoDialogMode] = useState<Modes>('Close');
    const [noteShareMode, setNoteShareMode] = useState<Modes>('Close');
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
                    toast(ToastDone);
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

    const handleDownload = async () => {
        try {
            const response = await axios.post('/api/note/download/pdf', {
                noteId: note?.id
            }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${note?.title || 'Note'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast(ToastError);
        }
    };

    if (note != null) {
        return (
            <div className="w-full">
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

                {/* Share note dialog */}
                <NoteShareDialog
                    note={note}
                    groups={groups}
                    mode={noteShareMode}
                    setMode={setNoteShareMode}
                />

                {/* Title */}
                <div className="flex flex-row justify-between sticky top-0 bg-slate-100 w-full p-[20px]">
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
                            variant={'ghost'}
                            className="w-fit"
                            onClick={() => setNoteShareMode('Create')}
                        >
                            <Share />
                        </Button>

                        <Button
                            variant={'ghost'}
                            className="w-fit"
                            onClick={handleDownload}
                        >
                            <Download />
                        </Button>

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

                {/* Content Blocks */}
                <div className="flex flex-row flex-wrap gap-2 p-[40px] mt-4">
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
            </div>
        )
    } else {
        return (
            <>
                No such note
            </>
        )
    }
}

export default NoteView;
