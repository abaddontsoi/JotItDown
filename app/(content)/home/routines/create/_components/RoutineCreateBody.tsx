'use client';

import { useRoutineContext } from "@/app/contexts/routines/RoutinesContext";
import RoutineCreateForm from "../../_components/RoutinesCreateForm";

export default function RoutineCreateBody() {
    const ctx = useRoutineContext();

    return (
        <div className="p-6">
            <RoutineCreateForm />
        </div>
    );
} 