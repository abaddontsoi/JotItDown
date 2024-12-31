'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import RoutineCard from "./RoutineCard";

export default function UncheckedRoutines() {
    const ctx = useRoutineContext();
    const routines = ctx.routines;

    const filteredRoutines = routines.filter(routine => {
        const lastRecord = routine.RoutineCheckRecord.findLast(record => record.checkAt);
        if (!lastRecord) return true;

        // Check whether routine end date is less or equal than today
        const now = new Date();
        const withinPeriod = routine.startDate <= now && (!routine.endDate || now <= routine.endDate);

        // Check whether routine is checked targetCount times
        const checkedCount = routine.RoutineCheckRecord.length;
        const notMeetTarget = !routine.targetCount || checkedCount < routine.targetCount;
        
        // Check whether day difference between last record and today is less than interval
        const lastRecordDate = lastRecord?.checkAt;
        const dayDifference = (now.getTime() - lastRecordDate.getTime()) / (1000 * 60 * 60 * 24);
        const greaterThanInterval = !routine.intervalInDays || dayDifference >= routine.intervalInDays;

        return withinPeriod && notMeetTarget && greaterThanInterval;
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Unchecked Routines</CardTitle>
                <CardDescription>Routines you haven't checked today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredRoutines.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        No unchecked routines
                    </p>
                ) : (
                    filteredRoutines.map(routine => (
                        <RoutineCard key={routine.id} routine={routine} />
                    ))
                )}
            </CardContent>
        </Card>
    );
} 