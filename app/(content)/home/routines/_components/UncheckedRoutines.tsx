'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";

export default function UncheckedRoutines() {
    const ctx = useRoutineContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Unchecked Routines</CardTitle>
                <CardDescription>Routines you haven't checked today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Content will be added later */}
            </CardContent>
        </Card>
    );
} 