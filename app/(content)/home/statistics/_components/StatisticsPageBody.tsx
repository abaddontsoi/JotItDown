'use client';

import { useState } from "react";
import { useStatistics } from "@/app/contexts/statistics/StatisticsContext";
import { DetailedTransaction } from "@/components/self-defined/types";
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
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { StatisticsCard } from './StatisticsCard';

interface StatisticsPageBodyProp {
    transactions: DetailedTransaction[];
}

export default function StatisticsPageBody({ transactions }: StatisticsPageBodyProp) {
    const ctx = useStatistics();

    // Calculate statistics
    const totalSpendingValue = transactions
        .filter(t => t.from.account?.isPersonalSpending)
        .reduce((sum, t) => sum + t.from.value, 0);

    const dailyAverage = totalSpendingValue / new Date().getDate(); // Average per day this month

    const findMaxValueTransaction = () => {
        if (transactions.length === 0) return null;
        const personalTransactions = transactions.filter(t => t.from.account?.isPersonalSpending);
        if (personalTransactions.length === 0) return null;
        return personalTransactions.reduce((max, t) => t.from.value > max.from.value ? t : max, personalTransactions[0]);
    }

    const maxTransaction = findMaxValueTransaction();

    // Define cards data
    const initialCards = [
        {
            id: 'total-transactions',
            title: 'Monthly Transactions',
            content: transactions.length.toString(),
        },
        {
            id: 'total-spending',
            title: 'Monthly Spending',
            content: `$${totalSpendingValue.toFixed(2)}`,
        },
        {
            id: 'daily-average',
            title: 'Daily Average',
            content: `$${dailyAverage.toFixed(2)}`,
        },
        {
            id: 'max-transaction',
            title: 'Largest Transaction',
            content: maxTransaction ? `$${maxTransaction.from.value.toFixed(2)}` : 'N/A',
            subContent: maxTransaction ? `${maxTransaction.from.account?.title} → ${maxTransaction.to.account?.title}` : undefined,
        },
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

    return (
        <div className="space-y-6 px-4 md:px-6 py-4">
            <div className="grid gap-6">
                {/* Overview Cards */}
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

                {/* Recent Transactions Component */}
                <RecentTransactions transactions={transactions} />
            </div>
        </div>
    );
}