// contexts/theme/ThemeContext.tsx
'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

// type Theme = 'light' | 'dark'
// type ThemeContextType = {
//   theme: Theme
//   toggleTheme: () => void
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light')

//   return (
//     <ThemeContext.Provider value={{
//       theme,
//       toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
//     }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// export function useTheme() {
//   const context = useContext(ThemeContext)
//   if (context === undefined) {
//     throw new Error('useTheme must be used within ThemeProvider')
//   }
//   return context
// }

// Define context type, they can be variables and functions
type StatisticsContextType = {
    pageTitle: string
}

// Create the context
const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

// Set up provider and set default values, elements inside the provider are consumers 
// they can access those values in context
export function StatisticsProvider(
    {
        children
    }: {
        children: React.ReactNode
    }
) {
    return (
        <StatisticsContext.Provider
            value={
                {
                    pageTitle: 'Statistics'
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