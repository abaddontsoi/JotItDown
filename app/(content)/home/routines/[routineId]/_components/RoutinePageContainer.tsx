'use client';

import RoutinePage from "./RoutinePage";
import { RoutineProvider } from "@/app/contexts/routines/routine/RoutineContext";
import { DetailedRoutine } from "@/components/self-defined/types";

interface RoutinePageContainerProp {
    routine: DetailedRoutine
}

export default function RoutinePageContainer({ routine }: RoutinePageContainerProp) {
    if (!routine) {
        return null;
    }

    return (
        <RoutineProvider initialRoutine={routine}>
            <RoutinePage />
        </RoutineProvider>
    );
}