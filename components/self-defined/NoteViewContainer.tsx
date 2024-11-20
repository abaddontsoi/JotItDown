import { Suspense } from "react";
import ContextCardFallBack from "./ContextCardFallBack";
import { DetailedNote } from "./types";
import NoteView from "./NoteView";
import { Toaster } from "../ui/toaster";
import { Group } from "@prisma/client";

interface NoteViewContainerProp {
    PromiseNote: Promise<DetailedNote | null>;
    PromiseGroups: Promise<Group[]>;
}

const NoteViewContainer = async ({
    PromiseNote,
    PromiseGroups,
}: NoteViewContainerProp) => {
    const note = await PromiseNote;
    const groups = await PromiseGroups;
    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <NoteView note={note} groups={groups} />
            <Toaster />
        </Suspense>
    )
}

export default NoteViewContainer;