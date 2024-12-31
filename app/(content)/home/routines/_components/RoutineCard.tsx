'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DetailedRoutine } from "@/components/self-defined/types";
import { Check, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastDone, ToastError } from "@/components/self-defined/toast-object";
import { useRouter } from "next/navigation";

interface RoutineCardProps {
    routine: DetailedRoutine;
}

export default function RoutineCard({ routine }: RoutineCardProps) {
    const router = useRouter();
    const lastRecord = routine.RoutineCheckRecord.findLast(record => record.checkAt);
    const handleCheck = async () => {
        try {
            const response = await axios.post(`/api/routine/${routine.id}/check`);
            if (response.status === 200) {
                toast(ToastDone);
                router.refresh();
            }
        } catch (error) {
            toast(ToastError);
        }
    };

    return (
        <Card className="hover:bg-slate-100">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{routine.title}</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                    {routine.intervalInDays} {routine.intervalInDays === 1 ? 'day' : 'days'}
                                </Badge>
                                {routine.targetCount && (
                                    <Badge variant="outline">
                                        {routine.RoutineCheckRecord.length}/{routine.targetCount} times
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                            {routine.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {routine.endDate && (
                                <span>
                                    End: {format(new Date(routine.endDate), 'MMM dd, yyyy')}
                                </span>
                            )}

                            {
                                lastRecord && (
                                    <span>
                                        Last checked: {format(new Date(lastRecord.checkAt), 'MMM dd, yyyy - HH:mm')}
                                    </span>
                                )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={handleCheck}
                            className={cn(
                                "transition-colors",
                                "hover:bg-green-100 hover:text-green-700"
                            )}
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => router.push(`/home/routines/${routine.id}`)}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 