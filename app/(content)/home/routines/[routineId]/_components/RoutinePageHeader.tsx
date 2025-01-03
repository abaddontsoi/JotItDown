'use client';

import { Button } from "@/components/ui/button";
import { Icon, Pen, Save, X } from "lucide-react";
import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";

export default function RoutinePageHeader() {
    const ctx = useRoutineContext();
    const routine = ctx.routine;
    const isEditing = ctx.isEditing;
    const setIsEditing = ctx.setIsEditing;

    if (!routine) {
        return null;
    }

    const handleSetIsEditing = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className="flex justify-between">
            <h1 className="text-5xl">{routine?.title}</h1>
            <div className="flex flex-row gap-2">
                {!isEditing &&
                    <Button
                        className="flex flex-row gap-2 items-center"
                        onClick={handleSetIsEditing}
                    >
                        <Pen className="w-4 h-4" /> Edit
                    </Button>
                }
                {
                    isEditing &&
                    <Button
                        className="flex flex-row gap-2 items-center"
                        onClick={handleSetIsEditing}
                        variant='cancel'
                    >
                        <X className="w-4 h-4" /> Cancel
                    </Button>
                }
            </div>
        </div>
    );
}