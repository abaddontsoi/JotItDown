import { DetailedNote } from "../../../../../components/self-defined/types";
import { db } from "@/lib/db";
import { Suspense } from "react";
import NoteView from "../../../../../components/self-defined/NoteView";

const FallBack = () => {
    return (
        <div>Loading</div>
    )
}

const NoteViewPage = async ({ params }: {
    params: {
        noteId: string
    }
}) => {
    const note: DetailedNote | null = await db.note.findFirst({
        where: {
            id: params.noteId
        },
        include: {
            category: true,
            parentNote: {
                include: {
                    category: true
                }
            },
            contentBlocks: {
                include: {
                    taskInfo: true
                }
            }
        }
    });

    if (note != null) {
        await db.note.update({
            where: {
                id: params.noteId,
            },
            data: {
                readCount: {
                    increment: 1
                }
            }
        });
    }

    return (
        <Suspense fallback={<FallBack />}>
            {
                note &&
                <NoteView note={note} />
            }
        </Suspense>
    )
}

export default NoteViewPage;