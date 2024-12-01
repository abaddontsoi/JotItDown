'use client';

import { DetailedNote } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";

export const NotesSection = async ({ notes }: { notes: Promise<DetailedNote[]> }) => {
    const data = await notes;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
                <CardDescription>Your latest notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map(note => (
                    <Link 
                        key={note.id} 
                        href={`/home/notes/${note.id}`}
                        className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{note.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(note.updatedAt), 'MMM dd, yyyy')}
                                </p>
                            </div>
                            {note.category && (
                                <Badge variant="secondary">{note.category.name}</Badge>
                            )}
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}; 