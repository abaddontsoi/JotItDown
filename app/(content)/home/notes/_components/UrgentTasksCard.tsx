'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TaskInfo } from "@prisma/client";

const UrgentTasksCard = (
    { urgentTasks }: {
        urgentTasks: TaskInfo[]
    }
) => {
    return (
        <Card>
            <CardHeader>
                {
                    urgentTasks.length > 0 ?
                    `Your top ${urgentTasks.length} urgent tasks`: 
                    'Nothing urgent, Yeah!!'
                }
            </CardHeader>

            {
                urgentTasks.length > 0 && (
                    <CardContent>
                        
                    </CardContent>
                )
            }
        </Card>
    )
}

export default UrgentTasksCard;