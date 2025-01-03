'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import RoutineCard from "./RoutineCard";

export default function AllRoutines() {
    const ctx = useRoutineContext();
    const routines = ctx.routines;
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Routines</CardTitle>
                <CardDescription>Manage your routines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {routines.map(routine => (
                    <RoutineCard key={routine.id} routine={routine} />
                ))}
            </CardContent>
        </Card>
    );
} 