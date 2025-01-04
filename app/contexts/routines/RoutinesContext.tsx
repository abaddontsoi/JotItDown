'use client';

import { DetailedRoutine } from "@/components/self-defined/types";
import { createContext, useContext, useEffect, useState } from "react";

type RoutinesContextType = {
    routines: DetailedRoutine[];
    setRoutines: (routines: DetailedRoutine[]) => void;
    pageTitle: string;
    addRoutine: (routine: DetailedRoutine) => void;
    updateRoutine: (id: string, updatedRoutine: DetailedRoutine) => void;
    deleteRoutine: (id: string) => void;
};

const defaultValues: RoutinesContextType = {
    routines: [],
    setRoutines: () => {},
    pageTitle: 'Routines',
    addRoutine: () => {},
    updateRoutine: () => {},
    deleteRoutine: () => {},
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

    const addRoutine = (routine: DetailedRoutine) => {
        setRoutines(prev => [...prev, routine]);
    };

    const updateRoutine = (id: string, updatedRoutine: DetailedRoutine) => {
        setRoutines(prev => 
            prev.map(routine => 
                routine.id === id ? updatedRoutine : routine
            )
        );
    };

    const deleteRoutine = (id: string) => {
        setRoutines(prev => prev.filter(routine => routine.id !== id));
    };

    const value = {
        routines: initialRoutines || routines,
        setRoutines,
        pageTitle: 'Routines',
        addRoutine,
        updateRoutine,
        deleteRoutine,
    };

    useEffect(() => {
        setRoutines(initialRoutines);
    }, [initialRoutines]);

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