import { DetailedRoutine } from "@/components/self-defined/types";
import { createContext, useContext } from "react";

type RoutinesContextType = {
    pageTitle: string;
    createPageTitle: string;
    routines: DetailedRoutine[];
    selectedRoutine?: DetailedRoutine;
}

const defaultValues: RoutinesContextType = {
    pageTitle: "Routines",
    createPageTitle: "Create Routine",
    routines: [],
};

export const RoutinesContext = createContext<RoutinesContextType>(defaultValues);

export const RoutinesProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoutinesContext.Provider value={defaultValues}>
            {children}
        </RoutinesContext.Provider>
    );
};

export const useRoutinesContext = () => {
    const ctx = useContext(RoutinesContext);
    if (!ctx) {
        throw new Error("useRoutinesContext must be used within a RoutinesProvider");
    }
    return ctx;
};