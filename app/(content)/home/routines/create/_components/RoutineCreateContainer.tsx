'use client';

import { RoutineProvider, useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import RoutineCreateHeader from "./RoutineCreateHeader";
import RoutineCreateBody from "./RoutineCreateBody";

export default function RoutineCreateContainer() {
    return (
        <RoutineProvider>
            <div className="p-6 space-y-6">
                <RoutineCreateHeader />
                <RoutineCreateBody />
            </div>
        </RoutineProvider>
    );
}