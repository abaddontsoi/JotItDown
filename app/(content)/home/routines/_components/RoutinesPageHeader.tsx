import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RoutinesPageHeader() {
    const ctx = useRoutineContext();
    const router = useRouter();
    const handleCreateRoutine = () => {
        router.push('/home/routines/create');
    }
    return (
        <div className="flex flex-row text-5xl items-end justify-between px-[20px] sticky top-0">
            <h1>{ctx.pageTitle}</h1>
            <Button className="gap-1 items-center" onClick={handleCreateRoutine}>
                <Plus className="w-5 h-5"/> Routine
            </Button>
        </div>
    )
}