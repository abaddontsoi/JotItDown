'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutinesContext } from "@/app/contexts/routines/RoutinesContext";
import RoutineCard from "./RoutineCard";

export default function AllRoutines() {
    const { routines } = useRoutinesContext();
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