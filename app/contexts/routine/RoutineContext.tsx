import { DetailedRoutine } from "@/components/self-defined/types";
import { createContext, useContext } from "react";

type RoutineContextType = {
    pageTitle: string;
    createPageTitle: string;
    routines: DetailedRoutine[];
    selectedRoutine?: DetailedRoutine;
}

const defaultValues: RoutineContextType = {
    pageTitle: "Routines",
    createPageTitle: "Create Routine",
    routines: [],
};

export const RoutineContext = createContext<RoutineContextType>(defaultValues);

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoutineContext.Provider value={defaultValues}>
            {children}
        </RoutineContext.Provider>
    );
};

export const useRoutineContext = () => {
    const ctx = useContext(RoutineContext);
    if (!ctx) {
        throw new Error("useRoutineContext must be used within a RoutineProvider");
    }
    return ctx;
};