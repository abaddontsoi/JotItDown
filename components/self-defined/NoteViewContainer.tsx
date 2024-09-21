import { Suspense } from "react";
import ContextCardFallBack from "./ContextCardFallBack";
import { DetailedNote } from "./types";
import NoteView from "./NoteView";

interface NoteViewContainerProp {
    PromiseNote: Promise<DetailedNote | null>
}

const NoteViewContainer = async ({
    PromiseNote
}: NoteViewContainerProp) => {
    const note = await PromiseNote;
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <NoteView note={note} />
        </Suspense>
    )
}

export default NoteViewContainer;