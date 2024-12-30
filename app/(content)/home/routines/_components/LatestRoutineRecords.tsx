'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";

export default function LatestRoutineRecords() {
    const ctx = useRoutineContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Records</CardTitle>
                <CardDescription>Your recent routine completions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Content will be added later */}
            </CardContent>
        </Card>
    );
} 