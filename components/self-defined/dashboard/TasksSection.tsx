'use client';

import { DetailedTaskInfo } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const statusColors = {
    'Pending': 'bg-yellow-200 hover:bg-yellow-300',
    'Running': 'bg-blue-200 hover:bg-blue-300',
    'Done': 'bg-green-200 hover:bg-green-300',
    'Draft': 'bg-gray-200 hover:bg-gray-300'
};

export const TasksSection = async ({ tasks }: { tasks: Promise<DetailedTaskInfo[]> }) => {
    const data = await tasks;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map(task => (
                    <div key={task.id} className="p-3 rounded-lg hover:bg-slate-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{task.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Due: {format(new Date(task.deadline), 'MMM dd, yyyy')}
                                </p>
                            </div>
                            <Badge 
                                className={cn(
                                    statusColors[task.status as keyof typeof statusColors]
                                )}
                            >
                                {task.status}
                            </Badge>
                        </div>
                        {task.parentContentBlock?.parentNote && (
                            <Link 
                                href={`/home/notes/${task.parentContentBlock.parentNote.id}`}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                View in note
                            </Link>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}; 