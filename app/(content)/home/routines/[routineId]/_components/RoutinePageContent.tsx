'use client';

import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";
import RoutinePageViewContent from "./RoutinePageViewContent";
import RoutinePageEditContent from "./RoutinePageEditContent";

export default function RoutinePageContent() {
    const ctx = useRoutineContext();
    const isEditing = ctx.isEditing;
    const routine = ctx.routine;

    if (!routine) {
        return null;
    }

    return (
        <>
            {
                isEditing ? 
                <RoutinePageEditContent/> :
                <RoutinePageViewContent />
            }
        </>
    );
}