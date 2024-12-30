'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoutineCreateHeader() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-5xl font-normal">Create New Routine</h1>
                    <p className="text-muted-foreground">
                        Set up a new routine to track
                    </p>
                </div>
            </div>
        </div>
    );
} 