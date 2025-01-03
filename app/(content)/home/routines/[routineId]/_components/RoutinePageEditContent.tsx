'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";
import RoutineEditFormSingle from "../../_components/RoutineEditFormSingle";

interface RoutinePageEditContentProp {
}

export default function RoutinePageEditContent(prop: RoutinePageEditContentProp) {
    const ctx = useRoutineContext();
    const routine = ctx.routine;

    if (!routine) {
        return null;
    }

    return (
        <Card>
            <CardContent className="py-5">
                <RoutineEditFormSingle />
            </CardContent>
        </Card>
    );
}