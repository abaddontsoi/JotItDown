'use client';

import { DetailedRoutine } from "@/components/self-defined/types";
import { createContext, useContext, useState } from "react";

type RoutineContextType = {
    routine?: DetailedRoutine;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    setRoutine: (routine?: DetailedRoutine) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
    const [routine, setRoutine] = useState<DetailedRoutine | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    const value: RoutineContextType = {
        routine,
        isEditing,
        setIsEditing,
        setRoutine,
    };

    return (
        <RoutineContext.Provider value={value}>
            {children}
        </RoutineContext.Provider>
    );
};

export const useRoutineContext = () => {
    const context = useContext(RoutineContext);
    
    if (!context) {
        throw new Error("useRoutineContext must be used within a RoutineProvider");
    }
    
    return context;
};