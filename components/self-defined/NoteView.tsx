'use client';

import { DetailedContentBlock, DetailedNote } from "./types";
import ContentBlockViewContent from "./ContentBlockViewContent";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ContentBlockDialog from "./ContentBlockDialog";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import TaskInfoDialog from "./TaskInfoDialog";
import { TaskInfo } from "@prisma/client";
import toast from "react-hot-toast";

const NoteView = ({ note }:
    {
        note: DetailedNote | null,
    }
) => {
    const [contentBlockDialogMode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [taskInfoDialogMode, setTaskInfoDialogMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [selectedContentBlock, setSelectedContentBlock] = useState<DetailedContentBlock>();
    const [targetTaskInfo, setTargetTaskInfo] = useState<TaskInfo | undefined>();
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
                    <p className=" text-6xl font-bold font-mono">
                        {note.title || 'No title'}
                    </p>
    
                    <Button
                        onClick={() => {
                            setMode('Create');
                            // toast.success('create Content Block');
                            // toast('create Content Block');
                        }}
                        className="flex flex-row items-center gap-1">
                        <Plus className="w-5 h-5" />
                        Content Block
                    </Button>
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
