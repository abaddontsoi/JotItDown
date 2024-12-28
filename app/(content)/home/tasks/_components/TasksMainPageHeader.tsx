import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { File, Files, PlusIcon } from "lucide-react";

interface TasksMainPageHeaderProp {
    onAddOneTask?: () => void;
    onAddMultipleTasks?: () => void;
}

export default function TasksMainPageHeader({
    onAddOneTask,
    onAddMultipleTasks
}: TasksMainPageHeaderProp) {

    const handleAddOneTask = () => {
        onAddOneTask?.() ?? null;
    }

    const handleAddMultipleTasks = () => {
        onAddMultipleTasks?.() ?? null;
    }

    return (
        <div className="text-5xl px-[20px] py-4 flex justify-between">
            <span className="font-normal">Tasks</span>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-1 px-6">
                        <PlusIcon className="w-4 h-4" />
                        Task
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center gap-1" onClick={handleAddOneTask}>
                        <File className="w-4 h-4" /> Add One
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-1" onClick={handleAddMultipleTasks}>
                        <Files className="w-4 h-4" /> Add Multiple
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}