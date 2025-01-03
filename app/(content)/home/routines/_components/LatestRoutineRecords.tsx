'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routine/RoutineContext";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LatestRoutineRecords() {
    const ctx = useRoutineContext();
    const routines = ctx.routines;
    const [open, setOpen] = useState(true);

    const latestRecords = routines
        .map(routine => ({
            routine,
            lastRecord: routine.RoutineCheckRecord.findLast(record => record.checkAt)
        }))
        .sort((a, b) => {
            if (!a.lastRecord) return 1;
            if (!b.lastRecord) return -1;
            return new Date(b.lastRecord.checkAt).getTime() - new Date(a.lastRecord.checkAt).getTime();
        });

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Latest Records</CardTitle>
                    <CardDescription>Your recent routine completions</CardDescription>
                </div>

                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
            </CardHeader>
            {open && (
                <CardContent className="space-y-4">
                    {latestRecords.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                            No records yet
                        </p>
                    ) : (
                        latestRecords.map(({ routine, lastRecord }) => (
                            <div 
                                key={routine.id} 
                                className="flex flex-row justify-between items-center p-3 rounded-lg hover:bg-slate-100"
                            >
                                <div className="flex flex-col">
                                    <h3 className="font-medium">{routine.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {routine.description}
                                    </p>
                                </div>
                                <div className={cn(
                                    "text-sm",
                                    lastRecord ? "text-muted-foreground" : "text-red-500 italic"
                                )}>
                                    {lastRecord 
                                        ? format(new Date(lastRecord.checkAt), 'MMM dd, yyyy - HH:mm')
                                        : 'Never checked'
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            )}
        </Card>
    );
} 