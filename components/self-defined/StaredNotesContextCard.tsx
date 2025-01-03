'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DetailedNote, DetailedTaskInfo } from "./types";
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



const StaredNotesContextCard = (
    { notes }: {
        notes?: DetailedNote[],
    }
) => {
    const router = useRouter();
    const [accordionOpen, setOpen] = useState<boolean>(true);

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
                <Accordion type="multiple" value={[accordionOpen ? 'list' : '']}>
                    <AccordionItem value="list">
                        <AccordionTrigger className="w-full" onClick={() => setOpen(!accordionOpen)}>
                            <CardHeader>
                                <CardTitle className="flex flex-row items-center justify-between">
                                    Stared Notes
                                    {
                                        accordionOpen && (
                                            <ArrowUp></ArrowUp>
                                        )
                                    }
                                    {
                                        !accordionOpen && (
                                            <ArrowDown></ArrowDown>
                                        )
                                    }
                                </CardTitle>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                            <CardContent className="flex flex-row gap-2 flex-wrap">
                                {
                                    notes?.filter(n => n.stared && !n.hidden).map(n => (
                                        <Suspense key={n.id} fallback={<FallBack />}>
                                            <NoteDisplay 
                                            key={n.id} note={n}
                                            setMode={setMode}
                                            setNote={setTargetNote}
                                            ></NoteDisplay>
                                        </Suspense>
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

export default StaredNotesContextCard;