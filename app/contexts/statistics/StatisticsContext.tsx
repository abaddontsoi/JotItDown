// contexts/theme/ThemeContext.tsx
'use client'

import { DetailedTransaction, DialogModes } from '@/components/self-defined/types';
import { createContext, ReactNode, useContext, useState } from 'react'

// Define context type, they can be variables and functions
type StatisticsContextType = {
    pageTitle: string;
    dialogMode: DialogModes;
    transactions?: DetailedTransaction[];

    setDialogMode: (mode: DialogModes) => void;
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
    const [mode, setMode] = useState<DialogModes>('Close');
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