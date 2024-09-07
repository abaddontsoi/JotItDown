'use client';

import { DetailedContentBlock, DetailedNote } from "./types";
import ContentBlockView from "./ContentBlockView";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ContentBlockDialog from "./ContentBlockDialog";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const NoteView = ({ note }:
    {
        note: DetailedNote,
    }
) => {
    const [contentBlockDialogMode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [selectedContentBlock, setSelectedContentBlock] = useState<DetailedContentBlock>();

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

            {/* Title */}
            <div className="flex flex-row justify-between">
                <p className=" text-6xl font-bold font-mono">
                    {note.title || 'No title'}
                </p>

                <Button
                    onClick={() => {
                        setMode('Create');
                    }}
                    className="flex flex-row items-center gap-1">
                    <Plus className="w-5 h-5" />
                    Content Block
                </Button>
            </div>


            <ScrollArea className="h-[1000px] mt-4">
                {/* Content Blocks */}
                <div className="flex flex-col gap-2">
                    {
                        note.contentBlocks?.map(block => {
                            return (
                                <ContentBlockView
                                    key={block.id}
                                    contentBlock={block}
                                    setMode={setMode}
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

export default NoteView;
