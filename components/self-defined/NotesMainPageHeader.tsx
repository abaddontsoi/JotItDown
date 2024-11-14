'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import NoteDialog from "./NoteDialog";
import { useState } from "react";

const NotesMainPageHeader = () => {
    const [mode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');

    return (
        <>
            <NoteDialog mode={mode} setMode={setMode} />
            <div className="flex flex-row text-5xl items-end justify-between px-[20px] sticky top-0">
                Notes

                <Button className="gap-1 items-center" onClick={() => {
                    setMode('Create');
                }}>
                    <Plus className="w-5 h-5"/> Note
                </Button>
            </div>
        </>

    )
}

export default NotesMainPageHeader;