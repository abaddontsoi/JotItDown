'use client';

import { DetailedRoutine } from "@/components/self-defined/types";
import { createContext, useContext, useState } from "react";

type RoutinesContextType = {
    routines: DetailedRoutine[];
    setRoutines: (routines: DetailedRoutine[]) => void;
    pageTitle: string;
}

const defaultValues: RoutinesContextType = {
    routines: [],
    setRoutines: () => {},
    pageTitle: 'Routines',
};

const RoutinesContext = createContext<RoutinesContextType>(defaultValues);

export const RoutinesProvider = ({ 
    children,
    initialRoutines = []
}: { 
    children: React.ReactNode;
    initialRoutines?: DetailedRoutine[];
}) => {
    const [routines, setRoutines] = useState<DetailedRoutine[]>(initialRoutines);

    const value = {
        routines,
        setRoutines,
        pageTitle: 'Routines',
    };

    return (
        <RoutinesContext.Provider value={value}>
            {children}
        </RoutinesContext.Provider>
    );
};

export const useRoutinesContext = () => {
    const context = useContext(RoutinesContext);
    
    if (!context) {
        throw new Error("useRoutinesContext must be used within a RoutinesProvider");
    }
    
    return context;
};