'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DetailedNote, UrgentTasks } from "./types";
import { useRouter } from "next/navigation";
import NoteDisplay from "./NoteDisplay";
import { Suspense, useState } from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { ArrowDown, ArrowUp } from "lucide-react";
import NoteDialog from "./NoteDialog";

const FallBack = () => {
    return (
        <div>
            Loading
        </div>
    )
}



const HighestViewCountNotesContextCard = (
    { notes }: {
        notes?: DetailedNote[],
    }
) => {
    const router = useRouter();
    const [accordionOpen, setOpen] = useState<boolean>(true);

    // sort notes by read count
    notes = notes?.filter(n => !n.hidden).sort((a, b) => {
        return b.readCount - a.readCount;
    }).filter((_, index) => index < 5);

    const [mode, setMode] = useState<'Edit' | 'Create' | 'Close'>('Close');
    const [targetNote, setTargetNote] = useState<DetailedNote | undefined>();

    return (
        <>
            <NoteDialog
                mode={mode}
                setMode={setMode}
                existingNote={targetNote}
            />
            <Card>
                <Accordion value={[accordionOpen ? 'list' : '']} type="multiple">
                    <AccordionItem value="list">
                        <AccordionTrigger className="w-full" onClick={() => setOpen(!accordionOpen)}>
                            <CardHeader>
                                <CardTitle className="flex flex-row items-center justify-between">
                                    Viewed Frequently
                                    {
                                        accordionOpen ? (
                                            <ArrowUp></ArrowUp>
                                        ) : (
                                            <ArrowDown></ArrowDown>
                                        )
                                    }
                                </CardTitle>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                            <CardContent className="flex flex-row gap-2 flex-wrap">
                                {
                                    notes?.map(n => (
                                        <NoteDisplay 
                                        key={n.id} note={n}
                                        setNote={setTargetNote}
                                        setMode={setMode}
                                        />
                                    ))
                                }
                            </CardContent>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </>
    )
}

export default HighestViewCountNotesContextCard;