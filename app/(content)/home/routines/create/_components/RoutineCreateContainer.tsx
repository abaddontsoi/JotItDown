'use client';

import { RoutinesProvider } from "@/app/contexts/routines/RoutinesContext";
import RoutineCreateHeader from "./RoutineCreateHeader";
import RoutineCreateBody from "./RoutineCreateBody";
import { Toaster } from "@/components/ui/toaster";

export default function RoutineCreateContainer() {
    return (
        <RoutinesProvider>
            <div className="p-6 space-y-6">
                <RoutineCreateHeader />
                <RoutineCreateBody />
            </div>
            <Toaster />
        </RoutinesProvider>
    );
}