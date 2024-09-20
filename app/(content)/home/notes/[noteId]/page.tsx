import { DetailedNote } from "../../../../../components/self-defined/types";
import { db } from "@/lib/db";
import { Suspense } from "react";
import NoteView from "../../../../../components/self-defined/NoteView";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";

const NoteViewPage = async ({ params }: {
    params: {
        noteId: string
    }
}) => {
    const note: Promise<DetailedNote | null> = db.note.findFirst({
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

    // move to client component using API ?
    // if (note != null) {
    //     db.note.update({
    //         where: {
    //             id: params.noteId,
    //         },
    //         data: {
    //             readCount: {
    //                 increment: 1
    //             }
    //         }
    //     });
    // }

    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <NoteView note={await note} />
        </Suspense>
    )
}

export default NoteViewPage;