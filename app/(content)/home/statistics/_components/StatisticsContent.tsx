'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import { StatisticsCard } from './StatisticsCard';
import RecentTransactions from "./RecentTransactions";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMonthName } from "@/app/lib/date-utils";
import { useRouter } from "next/navigation";

interface StatisticsContentProps {
    transactions: DetailedTransaction[];
    selectedYear?: number;
    selectedMonth?: number;
    overall?: boolean;
}

export function StatisticsContent({
    transactions,
    selectedYear,
    selectedMonth,
    overall,
}: StatisticsContentProps) {

    // Router
    const router = useRouter();

    // Get dates
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter transactions (for both overall and selected period)
    const lastMonthTransactions = transactions.filter(t => {
        const date = t.recordDate || t.createdAt;
        return date >= lastMonth && date <= lastMonthEnd;
    });

    const currentMonthTransactions = transactions.filter(t => {
        const date = t.recordDate || t.createdAt;
        return date >= currentMonthStart;
    });

    const selectedPeriodTransactions = transactions
        .filter(t => {
            // If selectedYear or selectedMonth are not provided, return all transactions
            if (!selectedYear || !selectedMonth) return true;
            const date = t.recordDate || t.createdAt;
            const selectedMonthStart = new Date(selectedYear, selectedMonth - 1, 1);
            const selectedMonthEnd = new Date(selectedYear, selectedMonth, 0);

            return date >= selectedMonthStart && date <= selectedMonthEnd;
        });

    // Calculate statistics for both overall and selected period

    // Calculate statistics for selected period 
    const selectedPeriodSpending = selectedPeriodTransactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0); 
    
    const selectedPeriodTotalTransactions = selectedPeriodTransactions.length;

    const selectedPeriodMaxTransaction = selectedPeriodTransactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((max, t) => t.from.value > max.from.value ? t : max, selectedPeriodTransactions[0]);    

    const selectedPeriodDailyAverage = selectedPeriodSpending / new Date(selectedYear || now.getFullYear(), (selectedMonth || now.getMonth() + 1), 0).getDate();

    // Calculate statistics for overall
    const lastMonthSpending = lastMonthTransactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0);

    const currentMonthSpending = currentMonthTransactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0);

    const overallTotalSpending = transactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0);

    const overalTotalTransaction = transactions.length;

    // Define cards based on view type
    const initialCards = overall ? [
        {
            id: 'last-month-spending',
            title: `Last Month (${lastMonth.toLocaleString('default', { month: 'short' })})`,
            content: `$${lastMonthSpending.toFixed(2)}`,
        },
        {
            id: 'current-month-spending',
            title: `This Month (${now.toLocaleString('default', { month: 'short' })})`,
            content: `$${currentMonthSpending.toFixed(2)}`,
        },
        {
            id: 'total-transactions',
            title: 'Total Transactions',
            content: overalTotalTransaction.toString(),
        },
        {
            id: 'total-spending',
            title: 'Total Spending',
            content: `$${overallTotalSpending.toFixed(2)}`,
        },

    ] : [
        {
            id: 'current-month-spending',
            title: `This Month`,
            content: `$${selectedPeriodSpending.toFixed(2)}`,
        },
        {
            id: 'total-transactions',
            title: 'Total Transactions',
            content: selectedPeriodTotalTransactions.toString(),
        },
        {
            id: 'max-transaction',
            title: 'Transaction with largest amount',
            content: selectedPeriodMaxTransaction ? `$${selectedPeriodMaxTransaction.from.value.toFixed(2)}` : 'N/A',
            subContent: selectedPeriodMaxTransaction ? `${selectedPeriodMaxTransaction.from.account?.title} → ${selectedPeriodMaxTransaction.to.account?.title}` : undefined,
        },
        {
            id: 'daily-average',
            title: `Daily Average (for ${new Date(selectedYear || now.getFullYear(), (selectedMonth || now.getMonth() + 1), 0).getDate()} days)`,
            content: `$${selectedPeriodDailyAverage.toFixed(2)}`,
        }
    ];

    const [cards, setCards] = useState(initialCards);
    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCards((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const [year, setYear] = useState<number | undefined>(selectedYear || new Date().getFullYear());
    const [month, setMonth] = useState<number | undefined>(selectedMonth);
    const goToStatistics = () => {
        router.push(`/home/statistics/${year}/${month}`);
    }

    return (
        <div className="grid gap-6">
            <div className="w-full grid grid-cols-3 gap-4">
                {/* Select month and year */}
                <Select
                    value={year?.toString()}
                    onValueChange={(value) => setYear(parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => {
                            const year = 1975 + i;
                            return (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Select
                    value={month?.toString()}
                    onValueChange={(value) => setMonth(parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                            const monthIndex = i;
                            const monthNumber = monthIndex + 1;
                            return (
                                <SelectItem
                                    key={monthNumber}
                                    value={monthNumber.toString()}
                                >
                                    {getMonthName(monthIndex)}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Button
                    disabled={!year || !month}
                    onClick={goToStatistics}
                >
                    {
                        year && month ?
                            `Check ${year}/${month}` :
                            'Select month and year'
                    }
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cards}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {cards.map((card) => (
                            <StatisticsCard
                                key={card.id}
                                id={card.id}
                                title={card.title}
                                content={card.content}
                                subContent={card.subContent}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <RecentTransactions transactions={transactions} />
        </div>
    );
} 