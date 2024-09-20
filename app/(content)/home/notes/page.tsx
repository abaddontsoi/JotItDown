import { db } from "@/lib/db";
import { TaskInfoStatus } from "@prisma/client";
import NotesMainPage from "../../../../components/self-defined/NotesMainPage";
import { DetailedNote, UrgentTasks } from "../../../../components/self-defined/types";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StaredNotesContextCard from "@/components/self-defined/StaredNotesContextCard";
import HighestViewCountNotesContextCard from "@/components/self-defined/HighestViewCountNotesContextCard";
import AllNotes from "@/components/self-defined/AllNotes";

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
            <Suspense fallback={<FallBack />}>
                {/* <NotesMainPage PromiseAllNotes={allNotes} /> */}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row text-5xl items-end justify-between">
                        Notes

                        {/* <Button className="" onClick={() => {
                            setMode('Create');
                        }}>
                            <Plus></Plus>
                            Create new
                        </Button> */}
                    </div>


                    <Suspense fallback={<FallBack />}>
                        {/* Display Newest Star Notes * 5 */}
                        <StaredNotesContextCard notes={await allNotes} />
                    </Suspense>

                    <Suspense fallback={<FallBack />}>
                        {/* Display Highest Viewcout Notes * 5 */}
                        <HighestViewCountNotesContextCard notes={await allNotes} />
                    </Suspense>

                    <Suspense fallback={<FallBack />}>
                        {/* Display Highest Viewcout Notes * 5 */}
                        <AllNotes notes={await allNotes} />
                    </Suspense>
                </div>

            </Suspense>
        </>
    )
}

const FallBack = () => {
    return (
        <div>
            Loading
        </div>
    )
}
export const dynamic = 'force-dynamic';
export default NotesPage;