'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import UrgentTaskCard from "./UrgentTaskCard";
import { DetailedTaskInfo } from "./types";
import TaskCard from "./TaskCard";

const UrgentTasksContextCard = (
    { urgentTasks, allNotes }: {
        urgentTasks: DetailedTaskInfo[],
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
                    <CardContent className="flex flex-row gap-4 flex-wrap">
                        {
                            urgentTasks.map(uC => {
                                return (
                                    <TaskCard key={uC.parentContentBlock.parentNote?.id} task={uC}  />
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