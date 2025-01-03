'use client';

import { RoutinesProvider } from "@/app/contexts/routines/RoutinesContext";
import { DetailedRoutine } from "@/components/self-defined/types";
import RoutinesPageHeader from "./RoutinesPageHeader";
import UncheckedRoutines from "./UncheckedRoutines";
import LatestRoutineRecords from "./LatestRoutineRecords";
import AllRoutines from "./AllRoutines";

interface RoutinesContainerProp {
    routines: DetailedRoutine[];
}

export default function RoutinesContainer(prop: RoutinesContainerProp) {
    return (
        <RoutinesProvider initialRoutines={prop.routines}>
            <div className="p-6 space-y-6">
                <RoutinesPageHeader />

                <div className="flex flex-col gap-5">
                    <UncheckedRoutines />
                    <LatestRoutineRecords />
                    <AllRoutines />
                </div>
            </div>
        </RoutinesProvider>
    );
}