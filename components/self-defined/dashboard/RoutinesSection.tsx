import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Routine } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

interface RoutinesSectionProp {
    routines: Promise<Routine[]>;
}

export default async function RoutinesSection({ routines }: RoutinesSectionProp) {
    const data = await routines;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link href="/home/routines" className="hover:underline">
                        Routines
                    </Link>
                </CardTitle>
                <CardDescription>
                    {format(new Date(), 'MMMM yyyy')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-2xl font-bold">
                    {data.length} in Total
                </div>

                <div className="space-y-2">
                    {
                        data.map((routine) => (
                            <div key={routine.id}>
                                {routine.title}
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
}