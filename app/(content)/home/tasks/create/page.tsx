import TaskInfoForm from "@/components/self-defined/taskInfo/TaskInfoForm";
import { Toaster } from "@/components/ui/toaster";
import CreateTaskPageContainer from "./_component/CreateTaskPageContainer";
import { db } from "@/lib/db";

export default function CreateTaskPage() {

    const notes = db.note.findMany({
        include: {
            category: true,
            contentBlocks: {
                include: {
                    taskInfo: true,
                }
            },
        }
    });

    const groups = db.group.findMany();
    
    return (
        <div className="px-[20px] py-4 flex flex-col justify-between">
            <span className="font-normal text-5xl ">Create Tasks</span>

            <CreateTaskPageContainer notes={notes} groups={groups} />
            <Toaster />
        </div>
    )
}   