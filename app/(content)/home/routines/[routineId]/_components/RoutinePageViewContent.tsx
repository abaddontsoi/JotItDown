'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Calendar, CheckCircle2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoutinePageViewContent() {
    const { routine } = useRoutineContext();

    if (!routine) {
        return null;
    }

    const lastRecord = routine.RoutineCheckRecord.findLast(record => record.checkAt);
    const completionPercentage = routine.targetCount 
        ? Math.round((routine.RoutineCheckRecord.length / routine.targetCount) * 100)
        : null;
    
    return (
        <div className="space-y-6">
            {/* Main Info Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-muted-foreground">
                                {routine.description}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {routine.intervalInDays} {routine.intervalInDays === 1 ? 'day' : 'days'}
                            </Badge>
                            {completionPercentage !== null && (
                                <Badge 
                                    variant="outline"
                                    className={cn(
                                        "flex items-center gap-1",
                                        completionPercentage === 100 && "bg-green-100 text-green-800"
                                    )}
                                >
                                    <Target className="w-3 h-3" />
                                    {routine.RoutineCheckRecord.length}/{routine.targetCount}
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Timeline Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Started: {format(new Date(routine.startDate), 'MMM dd, yyyy')}</span>
                        </div>
                        {routine.endDate && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Ends: {format(new Date(routine.endDate), 'MMM dd, yyyy')}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Check Records Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Check Records</CardTitle>
                </CardHeader>
                <CardContent>
                    {routine.RoutineCheckRecord.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                            No check records yet
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {routine.RoutineCheckRecord
                                .sort((a, b) => new Date(b.checkAt).getTime() - new Date(a.checkAt).getTime())
                                .map((record, index) => (
                                    <div 
                                        key={record.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">
                                                    Check #{routine.RoutineCheckRecord.length - index}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(new Date(record.checkAt), 'MMM dd, yyyy - HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                        {record.checkBy && (
                                            <Badge variant="secondary">
                                                Checked by: {record.checkBy.name}
                                            </Badge>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}