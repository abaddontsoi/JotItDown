'use client';

import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";

export default function StatisticsPageHeader() {

    const context = useStatistics();

    return (
        <div className="w-full px-4 py-2">
            <h1 className="text-5xl">{context.pageTitle}</h1>
        </div>
    )
}