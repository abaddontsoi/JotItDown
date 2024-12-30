'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";

export default function AllRoutines() {
    const ctx = useRoutineContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Routines</CardTitle>
                <CardDescription>Manage your routines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Content will be added later */}
            </CardContent>
        </Card>
    );
} 