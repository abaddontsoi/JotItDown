'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarFold, MoveRight, Target } from "lucide-react";
import { UrgentCard } from "./types";
import { useRouter } from "next/navigation";


const UrgentTaskCard = (
    {urgentCard}: {
        urgentCard: UrgentCard
    }
) => {

    const router = useRouter();
    return (
        <Card className="w-fit transition duration-200 hover:scale-[1.2]">
            {/* list out task title, description and deadline, click to access that note */}
            <CardHeader>
                <CardTitle>
                    {urgentCard.title}
                </CardTitle>
                <CardDescription className="flex flex-row gap-1 items-center">
                    <CalendarFold />
                    {urgentCard.deadline.toDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center gap-2">
                <CardDescription className="min-w-[200px] max-w-[250px] truncate">
                    {urgentCard.description}
                </CardDescription>
                <Button
                    variant={'link'}
                    onClick={() => {
                        router.push('/home/notes/' + urgentCard.parentNote?.id.toString());
                    }}
                    className="underline flex flex-row gap-1"
                >
                    {urgentCard.parentNote?.title}
                    <MoveRight className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    )
}

export default UrgentTaskCard;