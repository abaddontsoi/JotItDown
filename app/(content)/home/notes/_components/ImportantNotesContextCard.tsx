'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Note } from "@prisma/client";
import { DetailedNote, UrgentTasks } from "./types";
import { useRouter } from "next/navigation";
import NoteDisplay from "./NoteDisplay";

const ImportantNotesContextCard = (
    { notes }: {
        notes?: DetailedNote[],
    }
) => {
    const router = useRouter();
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    notes?.filter( n => n.stared).map( n => (
                        <NoteDisplay note={n}></NoteDisplay>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default ImportantNotesContextCard;