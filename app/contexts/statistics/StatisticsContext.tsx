// contexts/theme/ThemeContext.tsx
'use client'

import { DetailedTransaction, Modes } from '@/components/self-defined/types';
import { createContext, ReactNode, useContext, useState } from 'react'

// Define context type, they can be variables and functions
type StatisticsContextType = {
    pageTitle: string;
    dialogMode: Modes;
    transactions?: DetailedTransaction[];

    setDialogMode: (mode: Modes) => void;
    setTransactions: (transactions?: DetailedTransaction[]) => void;
}

// Create the context
export const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

// Set up provider and set default values, elements inside the provider are consumers 
// they can access those values in context
export function StatisticsProvider(
    {
        children
    }: {
        children: React.ReactNode
    }
) {
    const [mode, setMode] = useState<Modes>('Close');
    const [transactions, setTransactions] = useState<DetailedTransaction[]>();

    return (
        <StatisticsContext.Provider
            value={
                {
                    pageTitle: 'Statistics',
                    dialogMode: mode,
                    transactions: transactions,

                    setDialogMode: setMode,
                    setTransactions: setTransactions,
                }
            }
        >
            {children}
        </StatisticsContext.Provider>
    )
}

// a function that allows consumers to obtain values in context easily
// usage: const {values in context} = useStatistics()
export function useStatistics() {
    const context = useContext(StatisticsContext);
    if (context === undefined) {
        throw new Error('useStatistics must be used within StatisticsProvider');
    }
    return context;
}