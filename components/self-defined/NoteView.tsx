'use client';

import { DetailedNote } from "./types";
import ContentBlockView from "./ContentBlockView";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateContentBlockDialog from "./CreateContentBlockDialog";
import { useState } from "react";

const NoteView = ({ note }:
    {
        note: DetailedNote,
    }
) => {
    const [contentBlockDialogMode, setMode] = useState<'Edit'|'Create'|'Close'>('Close');

    return (
        <>
            {/* hidden content block adder dialog */}
            <CreateContentBlockDialog 
            mode={contentBlockDialogMode}
            setMode={setMode}
            />

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
                    <Plus className="w-5 h-5"/>
                    Content Block
                </Button>
            </div>

            {/* Content Blocks */}
            {
                note.contentBlocks?.map(block => {
                    return (
                        <ContentBlockView contentBlock={block} />
                    )
                })
            }
        </>
    )
}

export default NoteView;
