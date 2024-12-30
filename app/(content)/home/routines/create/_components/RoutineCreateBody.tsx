'use client';

import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import RoutineCreateForm from "./RoutineCreateForm";

export default function RoutineCreateBody() {
    const ctx = useRoutineContext();

    return (
        <div className="p-6">
            <RoutineCreateForm />
        </div>
    );
} 