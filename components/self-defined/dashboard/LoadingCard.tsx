'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingCard = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="p-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-24 mt-2" />
                </div>
            ))}
        </CardContent>
    </Card>
); 