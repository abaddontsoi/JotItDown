'use client';

import { DetailedNote, DetailedTaskInfo, DetailedTransaction, DetailedCashFlowRecord } from "./types";
import { Suspense } from "react";
import { LoadingCard } from "./dashboard/LoadingCard";
import { NotesSection } from "./dashboard/NotesSection";
import { TasksSection } from "./dashboard/TasksSection";
import { TransactionsSection } from "./dashboard/TransactionsSection";
import { ExpensesSection } from "./dashboard/ExpensesSection";

interface DashboardContainerProps {
    recentNotes: Promise<DetailedNote[]>;
    upcomingTasks: Promise<DetailedTaskInfo[]>;
    recentTransactions: Promise<DetailedTransaction[]>;
    monthlyExpenses: Promise<DetailedTransaction[]>;
}

export default function DashboardContainer({
    recentNotes,
    upcomingTasks,
    recentTransactions,
    monthlyExpenses
}: DashboardContainerProps) {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense fallback={<LoadingCard />}>
                    <ExpensesSection expenses={monthlyExpenses} />
                </Suspense>

                <Suspense fallback={<LoadingCard />}>
                    <NotesSection notes={recentNotes} />
                </Suspense>

                <Suspense fallback={<LoadingCard />}>
                    <TasksSection tasks={upcomingTasks} />
                </Suspense>

                <Suspense fallback={<LoadingCard />}>
                    <TransactionsSection transactions={recentTransactions} />
                </Suspense>
            </div>
        </div>
    );
} 