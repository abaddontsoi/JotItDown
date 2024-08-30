'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UrgentTasksContextCard from "./UrgentTasksContextCard";
import { Note } from "@prisma/client";
import { UrgentTasks } from "./types";
import NoteDialog from "./NoteDialog";
import { useState } from "react";

const NotesMainPage = ({ allNotes, fiveMostUrgentTaskInfo }: {
    allNotes: Note[],
    fiveMostUrgentTaskInfo: UrgentTasks[],
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

                {/* First list out 5 most urgent tasks */}
                <UrgentTasksContextCard allNotes={allNotes} urgentTasks={fiveMostUrgentTaskInfo} />
            </div>
        </>
    )
}

export default NotesMainPage;