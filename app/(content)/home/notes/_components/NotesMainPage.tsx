'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DetailedNote } from "./types";
import NoteDialog from "./NoteDialog";
import { useState } from "react";
import ImportantNotesContextCard from "./ImportantNotesContextCard";

const NotesMainPage = ({ allNotes }: {
    allNotes: DetailedNote[],
}) => {
    const [mode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');

    return (
        <>
            <NoteDialog mode={mode} setMode={setMode} />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row text-5xl items-end justify-between">
                    Notes

                    <Button className="" onClick={() => {
                        setMode('Create');
                    }}>
                        <Plus></Plus>
                        Create new
                    </Button>
                </div>

                {/* Display Newest Star Notes * 5 */}
                <ImportantNotesContextCard notes={allNotes} />
            </div>
        </>
    )
}

export default NotesMainPage;