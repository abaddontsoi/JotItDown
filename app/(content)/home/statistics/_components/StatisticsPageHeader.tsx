'use client';

import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StatisticsPageHeader() {
    const context = useStatistics();
    const pathname = usePathname();
    const isMonthly = pathname.includes('/thismonth');
    
    const title = isMonthly 
        ? `Statistics for ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
        : 'Overall Statistics';

    return (
        <div className="w-full px-4 md:px-6 py-4">
            <h1 className="text-5xl">{title}</h1>
            <Link
                className="text-sm text-muted-foreground hover:underline"
                href={isMonthly ? '/home/statistics' : '/home/statistics/thismonth'}
            >
                {isMonthly ? 'View Overall Statistics' : "This Month's Statistics"}
            </Link>
        </div>
    )
}