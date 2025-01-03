'use client';

import { useRoutinesContext } from "@/app/contexts/routines/RoutinesContext";
import RoutineCreateForm from "../../_components/RoutinesCreateForm";

export default function RoutineCreateBody() {
    const ctx = useRoutinesContext();

    return (
        <div className="p-6">
            <RoutineCreateForm />
        </div>
    );
} 