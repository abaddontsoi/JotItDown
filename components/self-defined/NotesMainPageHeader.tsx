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
            <div className="flex flex-row text-5xl items-end justify-between">
                Notes

                <Button className="" onClick={() => {
                    setMode('Create');
                }}>
                    <Plus></Plus>
                    Create new
                </Button>
            </div>
        </>

    )
}

export default NotesMainPageHeader;