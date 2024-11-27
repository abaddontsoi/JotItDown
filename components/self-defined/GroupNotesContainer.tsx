'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DetailedNote, Modes } from "./types";
import { SetStateAction, useState } from "react";
import NoteDialog from "./NoteDialog";
import AllNotes from "./AllNotes";

interface GroupNotesContainerProp {
    notes: DetailedNote[];
    groupId: string;
}

export default function GroupNotesContainer(
    {
        notes,
        groupId,
    }: GroupNotesContainerProp
) {
    const [mode, setMode] = useState<Modes>('Close');

    return (
        <>
            {/* Place the dialog here */}
            <NoteDialog
                mode={mode}
                groupId={groupId}
                setMode={setMode}
            />

            {/* Can group to another component, but optional */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Notes</h2>

                <div>
                    <Button variant={'ghost'} type="button" className="flex gap-1 items-center"
                    onClick={() => {
                        setMode('Create');
                    }}
                    >
                        <Plus />
                        <p>
                            Note
                        </p>
                    </Button>
                </div>
            </div>

            {/* Display notes here */}
            <AllNotes
                notes={notes}
            />
        </>
    );
}