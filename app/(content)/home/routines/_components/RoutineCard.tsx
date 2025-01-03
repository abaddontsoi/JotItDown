'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DetailedRoutine } from "@/components/self-defined/types";
import { Check, ChevronRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastDone, ToastError } from "@/components/self-defined/toast-object";
import { useRouter } from "next/navigation";

interface RoutineCardProps {
    routine: DetailedRoutine;
    option?: {
        showCheckButton?: boolean;
    }
}

export default function RoutineCard({ routine, option }: RoutineCardProps) {
    const router = useRouter();
    const lastRecord = routine.RoutineCheckRecord.findLast(record => record.checkAt);
    
    const handleCheck = async () => {
        try {
            const response = await axios.post(`/api/routine/${routine.id}/check`);
            if (response.status === 200) {
                toast(ToastDone);
                router.push(`/home/routines`);
                router.refresh();
            }
        } catch (error) {
            toast(ToastError);
        }
    };

    // Calculate completion percentage
    const completionPercentage = routine.targetCount 
        ? Math.round((routine.RoutineCheckRecord.length / routine.targetCount) * 100)
        : null;

    return (
        <Card className="transition-all duration-200 hover:bg-slate-100 hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        {/* Header Section */}
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{routine.title}</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {routine.intervalInDays} {routine.intervalInDays === 1 ? 'day' : 'days'}
                                </Badge>
                                {completionPercentage !== null && (
                                    <Badge 
                                        variant="outline"
                                        className={cn(
                                            completionPercentage === 100 && "bg-green-100 text-green-800"
                                        )}
                                    >
                                        {routine.RoutineCheckRecord.length}/{routine.targetCount} times
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        {routine.description && (
                            <p className="text-sm text-muted-foreground">
                                {routine.description}
                            </p>
                        )}

                        {/* Timeline Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {routine.endDate && (
                                <span className="flex items-center gap-1">
                                    Ends: {format(new Date(routine.endDate), 'MMM dd, yyyy')}
                                </span>
                            )}
                            {lastRecord && (
                                <span className="flex items-center gap-1">
                                    Last check: {format(new Date(lastRecord.checkAt), 'MMM dd, yyyy - HH:mm')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {option?.showCheckButton && (
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={handleCheck}
                                className={cn(
                                    "transition-colors",
                                    "hover:bg-green-100 hover:text-green-700",
                                    "focus:ring-2 focus:ring-green-500"
                                )}
                            >
                                <Check className="w-4 h-4" />
                            </Button>
                        )}
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => router.push(`/home/routines/${routine.id}`)}
                            className="focus:ring-2 focus:ring-primary"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 