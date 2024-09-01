'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Note } from "@prisma/client";
import { UrgentTasks } from "../../notes/_components/types";
import { useRouter } from "next/navigation";
import UrgentTaskCard from "../../notes/_components/UrgentTaskCard";

const UrgentTasksContextCard = (
    { urgentTasks, allNotes }: {
        urgentTasks: UrgentTasks[],
        allNotes?: Note[],
    }
) => {
    const router = useRouter();
    const urgentCards = urgentTasks.map(uT => {
        return {
            title: uT.title,
            description: uT.description,
            deadline: uT.deadline,
            parentNote: uT.parentContentBlock.parentNote
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {
                        urgentTasks.length > 0 ?
                            `Your top ${urgentTasks.length} urgent task(s)` :
                            'Nothing urgent, Yeah!!'
                    }
                </CardTitle>
            </CardHeader>

            {
                urgentCards.length > 0 && (
                    <CardContent className="flex flex-row gap-4">
                        {
                            urgentCards.map(uC => {
                                return (
                                    <UrgentTaskCard key={uC.parentNote.id} urgentCard={uC}  />
                                )
                            })
                        }
                    </CardContent>
                )
            }
        </Card>
    )
}

export default UrgentTasksContextCard;