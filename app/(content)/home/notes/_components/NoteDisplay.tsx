'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailedNote } from "./types";
import ContentBlockDisplay from "./ContentBlockDisplay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NoteDisplay = ({ note }: {
    note: DetailedNote
}) => {

    const router = useRouter();

    return (
        <Card className="max-w-[500px] hover:scale-[1.1] duration-200">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="flex flex-row gap-1 items-baseline">
                    {note.title}
                    <Button
                        onClick={() => {
                            router.push('/home/notes/' + note.id);
                        }}
                        variant={'link'}>
                        Details
                    </Button>
                </CardTitle>
                <CardDescription>Created at {note.createdAt.toDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                {
                    note.contentBlocks?.map(cB => (
                        <ContentBlockDisplay key={cB.id} contentBlock={cB} />
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default NoteDisplay;