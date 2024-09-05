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
            <CardHeader className="flex flex-row gap-4 justify-between text-nowrap items-center">
                <CardTitle className="flex flex-row items-center">
                    <Button
                        className="text-2xl font-bold p-0"
                        onClick={() => {
                            router.push('/home/notes/' + note.id);
                        }}
                        variant={'link'}>
                        {note.title}
                    </Button>
                </CardTitle>
                <CardDescription>Created at {note.createdAt.toDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                {/* display maximum 4 categories here */}

                {
                    note.contentBlocks?.map(cB => (
                        // should be short, perheps only content blocks title?
                        <ContentBlockDisplay key={cB.id} contentBlock={cB} />
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default NoteDisplay;