'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";

export default function RoutinePageViewContent() {
    const ctx = useRoutineContext();
    const routine = ctx.routine;

    if (!routine) {
        return null;
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {routine.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {routine.description}
            </CardContent>
        </Card>
    );
}