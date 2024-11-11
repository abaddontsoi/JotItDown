'use client';

import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";

export default function StatisticsPageHeader() {

    const context = useStatistics();

    return (
        <div>
            <h1 className="text-5xl">{context.pageTitle}</h1>
        </div>
    )
}