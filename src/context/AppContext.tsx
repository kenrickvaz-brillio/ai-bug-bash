
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BugBashSession, Story } from '../lib/types';
import { DEFAULT_STORY } from '../lib/mockData';
import { simulateAgentRun } from '../lib/simulation';

interface AppContextType {
    isExecView: boolean;
    setIsExecView: (val: boolean) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    session: BugBashSession | null;
    currentStory: Story;
    setCurrentStory: (story: Story) => void;
    runSimulation: () => Promise<void>;
    resetSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isExecView, setIsExecView] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [session, setSession] = useState<BugBashSession | null>(null);
    const [currentStory, setCurrentStory] = useState<Story>(DEFAULT_STORY);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    const runSimulation = useCallback(async () => {
        const mockSession = simulateAgentRun(currentStory);

        setSession({ ...mockSession, status: 'Running', results: [], issues: [], fixProposals: [] });

        await new Promise(r => setTimeout(r, 2000));
        setSession({ ...mockSession, status: 'Analyzing', results: mockSession.results, issues: [], fixProposals: [] });

        await new Promise(r => setTimeout(r, 2000));
        setSession({ ...mockSession, status: 'Proposing Fixes', issues: mockSession.issues });

        await new Promise(r => setTimeout(r, 1500));
        setSession(mockSession);
    }, [currentStory]);

    const resetSession = useCallback(() => {
        setSession(null);
    }, []);

    return (
        <AppContext.Provider value={{
            isExecView,
            setIsExecView,
            theme,
            toggleTheme,
            session,
            currentStory,
            setCurrentStory,
            runSimulation,
            resetSession
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
