import TaskInfoForm from "@/components/self-defined/taskInfo/TaskInfoForm";
import { Toaster } from "@/components/ui/toaster";
import CreateTaskPageContainer from "./_component/CreateTaskPageContainer";

export default function CreateTaskPage() {
    return (
        <div className="px-[20px] py-4 flex flex-col justify-between">
            <span className="font-normal text-5xl ">Create Tasks</span>

            <CreateTaskPageContainer />
            <Toaster />
        </div>
    )
}   