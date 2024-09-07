'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DetailedNote, UrgentTasks } from "./types";
import { useRouter } from "next/navigation";
import NoteDisplay from "./NoteDisplay";
import { Suspense, useState } from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { ArrowDown, ArrowUp } from "lucide-react";

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
    notes?.sort((a, b) => {
        return a.readCount - b.readCount;
    })

    return (
        <>
            <Card>
                <Accordion value={[accordionOpen ? 'list': '']} type="multiple">
                    <AccordionItem value="list">
                        <AccordionTrigger className="w-full" onClick={() => setOpen(!accordionOpen)}>
                            <CardHeader>
                                <CardTitle className="flex flex-row items-center justify-between">
                                    Viewed Frequently
                                    {
                                        accordionOpen ? (
                                            <ArrowUp></ArrowUp>
                                        ): (
                                            <ArrowDown></ArrowDown>
                                        )
                                    }
                                </CardTitle>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                            <CardContent className="flex flex-row gap-2 flex-wrap">
                                {
                                    notes?.filter(n => n.stared && !n.hidden).map(n => (
                                        <Suspense key={n.id} fallback={<FallBack />}>
                                            <NoteDisplay key={n.id} note={n}></NoteDisplay>
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

export default HighestViewCountNotesContextCard;