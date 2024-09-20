import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DetailedNote } from "./types";
import NoteDialog from "./NoteDialog";
import { Suspense, useEffect, useState } from "react";
import StaredNotesContextCard from "./StaredNotesContextCard";
import HighestViewCountNotesContextCard from "./HighestViewCountNotesContextCard";
import AllNotes from "./AllNotes";

const FallBack = () => {
    return (
        <div>
            Loading
        </div>
    )
}

const NotesMainPage = ({ PromiseAllNotes }: {
    PromiseAllNotes: Promise<DetailedNote[]>,
}) => {
    const [mode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');

    useEffect(() => {}, [PromiseAllNotes]);

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
                

                <Suspense fallback={<FallBack />}>
                    {/* Display Newest Star Notes * 5 */}
                    {/* <StaredNotesContextCard PromiseAllNotes={PromiseAllNotes} /> */}
                </Suspense>

                <Suspense fallback={<FallBack />}>
                    {/* Display Highest Viewcout Notes * 5 */}
                    {/* <HighestViewCountNotesContextCard notes={PromiseAllNotes} /> */}
                </Suspense>

                <Suspense fallback={<FallBack />}>
                    {/* Display Highest Viewcout Notes * 5 */}
                    {/* <AllNotes notes={PromiseAllNotes} /> */}
                </Suspense>
            </div>
        </>
    )
}

export default NotesMainPage;