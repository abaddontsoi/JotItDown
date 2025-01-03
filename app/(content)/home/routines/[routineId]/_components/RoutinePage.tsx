'use client';

import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";
import { DetailedRoutine } from "@/components/self-defined/types";
import RoutinePageContent from "./RoutinePageContent";
import RoutinePageHeader from "./RoutinePageHeader";

interface RoutinePageProp {
    routine: DetailedRoutine
}

export default function RoutinePage(prop: RoutinePageProp) {
    const routine = prop.routine;
    if (!routine) {
        return null;
    }
    const ctx = useRoutineContext();
    ctx.setRoutine(routine);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <RoutinePageHeader />

            {/* Content */}
            <RoutinePageContent />
        </div>
    );
}