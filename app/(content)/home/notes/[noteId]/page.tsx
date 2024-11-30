import { DetailedNote } from "../../../../../components/self-defined/types";
import { db } from "@/lib/db";
import { Suspense } from "react";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import NoteViewContainer from "@/components/self-defined/NoteViewContainer";
import { getUser } from "@/lib/getUser";
import Link from "next/link";
import { Group } from "@prisma/client";

const NoteViewPage = async ({ params }: {
    params: {
        noteId: string
    }
}) => {

    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>
                    Sign in
                </Link>
            </>
        )
    }


    const note: Promise<DetailedNote | null> = db.note.findFirst({
        where: {
            id: params.noteId,
            belongToId: user.id,
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

    const groups: Promise<Group[]> = db.group.findMany({
        where: {
            GroupUser: {
                some: {
                    userId: user.id
                }
            }
        }
    });

    return (
        <Suspense fallback={<ContextCardFallBack />}>
            <NoteViewContainer PromiseNote={note} PromiseGroups={groups}/>
        </Suspense>
    )
}

export default NoteViewPage;