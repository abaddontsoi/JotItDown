'use client';

import { DetailedTaskInfo, Modes } from "@/components/self-defined/types";
import { createContext, useContext, useEffect, useState } from "react";

type TaskInfoContextType = {
    task?: DetailedTaskInfo
    mode: Modes;

    setMode: (mode: Modes) => void;
    setTask: (task?: DetailedTaskInfo) => void;
}

export const TaskInfoContext = createContext<TaskInfoContextType | undefined>(undefined);

export function TaskInfoProvider(
    {
        children,
        initialTask
    }: {
        children: React.ReactNode,
        initialTask?: DetailedTaskInfo
    }
) {
    const [mode, setMode] = useState<Modes>('Close');
    const [task, setTask] = useState<DetailedTaskInfo | undefined>(initialTask);
    useEffect(() => {
        setTask(initialTask);
    }, [initialTask]);
    
    return (
        <TaskInfoContext.Provider
            value={{
                mode: mode,
                task: task,
                setMode: setMode,
                setTask: setTask,
            }}
        >
            {children}
        </TaskInfoContext.Provider>
    )
}

export function useTaskInfo() {
    const context = useContext(TaskInfoContext);
    if (!context) {
        throw new Error('useTaskInfo must be used within TaskInfoContext');
    }
    return context; 
}