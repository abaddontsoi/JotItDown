'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailedNote } from "./types";
import ContentBlockDisplay from "./ContentBlockDisplay";

const NoteDisplay = ({ note }: {
    note: DetailedNote
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>Created at {note.createdAt.toDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                {
                    note.contentBlocks?.map(cB => (
                        <ContentBlockDisplay contentBlock={cB} />
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default NoteDisplay;