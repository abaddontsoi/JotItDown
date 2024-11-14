'use client';

import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";

export default function StatisticsPageBody() {
    const ctx = useStatistics();

    return (
        <div>
            {
                ctx.transactions && ctx.transactions.map(t => {
                    return (
                        <div key={t.id}>
                            {t.remark || 'No remark'}
                        </div>
                    )
                })
            }
        </div>
    )
}