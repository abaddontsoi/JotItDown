'use client';

import { RoutineProvider, useRoutineContext } from "@/app/contexts/routines/RoutinesContext";
import RoutineCreateHeader from "./RoutineCreateHeader";
import RoutineCreateBody from "./RoutineCreateBody";
import { Toaster } from "@/components/ui/toaster";

export default function RoutineCreateContainer() {
    return (
        <RoutineProvider>
            <div className="p-6 space-y-6">
                <RoutineCreateHeader />
                <RoutineCreateBody />
            </div>
            <Toaster />
        </RoutineProvider>
    );
}