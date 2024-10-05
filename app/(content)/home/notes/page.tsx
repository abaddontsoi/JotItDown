import { db } from "@/lib/db";
import { TaskInfoStatus } from "@prisma/client";
import NotesMainPage from "../../../../components/self-defined/NotesMainPage";
import { DetailedNote, DetailedTaskInfo } from "../../../../components/self-defined/types";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StaredNotesContextCard from "@/components/self-defined/StaredNotesContextCard";
import HighestViewCountNotesContextCard from "@/components/self-defined/HighestViewCountNotesContextCard";
import AllNotes from "@/components/self-defined/AllNotes";
import NotesMainPageHeader from "@/components/self-defined/NotesMainPageHeader";
import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import { Toaster } from "@/components/ui/toaster";

const NotesPage = async () => {

    const allNotes: Promise<DetailedNote[]> = db.note.findMany({
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
            <Suspense fallback={<ContextCardFallBack />}>
                <NotesMainPageHeader />
                <Toaster />
                <div className="flex flex-col gap-4 mt-4">

                    <Suspense fallback={<ContextCardFallBack />}>
                        {/* Display Newest Star Notes * 5 */}
                        <StaredNotesContextCard notes={await allNotes} />
                    </Suspense>

                    <Suspense fallback={<ContextCardFallBack />}>
                        {/* Display Highest Viewcout Notes * 5 */}
                        <HighestViewCountNotesContextCard notes={await allNotes} />
                    </Suspense>

                    <Suspense fallback={<ContextCardFallBack />}>
                        {/* Display Highest Viewcout Notes * 5 */}
                        <AllNotes notes={await allNotes} />
                    </Suspense>
                </div>

            </Suspense>
        </>
    )
}

// const FallBack = () => {
//     return (
//         <div>
//             Loading
//         </div>
//     )
// }
export const dynamic = 'force-dynamic';
export default NotesPage;