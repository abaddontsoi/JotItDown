import { db } from "@/lib/db";
import { TaskInfoStatus } from "@prisma/client";
import NotesMainPage from "../../../../components/self-defined/NotesMainPage";
import { DetailedNote, UrgentTasks } from "../../../../components/self-defined/types";
import { Suspense } from "react";

const NotesPage = async () => {
    const allNotes: DetailedNote[] = await db.note.findMany({
        include: {
            category: true,
            parentNote: {
                include: {
                    category: true,
                }
            },
            childrenNotes: {
                include: {
                    category: true,
                }
            },
            contentBlocks: {
                include: {
                    taskInfo: true
                }
            }
        }
    });


    return (
        <>
            <Suspense fallback={<Fallback />}>
                <NotesMainPage allNotes={allNotes} />
            </Suspense>
        </>
    )
}

const Fallback = () => {
    return (
        <div>
            Loading
        </div>
    )
}

export default NotesPage;