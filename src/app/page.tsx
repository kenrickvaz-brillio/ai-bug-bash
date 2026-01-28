
"use client";

import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header/Header';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { Timeline } from '@/components/Timeline/Timeline';
import { TestSuite } from '@/components/TestSuite/TestSuite';
import { IssuesFeed } from '@/components/Issues/IssuesFeed';
import { Summary } from '@/components/Summary/Summary';
import { ChevronRight, ChevronLeft, Play, Info } from 'lucide-react';
import styles from './page.module.css';

function MainContent() {
  const { isExecView, session } = useApp();
  const [isDemoScriptOpen, setIsDemoScriptOpen] = useState(true);

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.container}>
        <Dashboard />

        {session && (
          <div className="animate-fade-in">
            <Timeline />
            <TestSuite />
            <IssuesFeed />
            <Summary />
          </div>
        )}
      </div>

      {/* Demo Script Panel */}
      <div className={`${styles.demoScript} ${isDemoScriptOpen ? styles.open : ''} glass`}>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsDemoScriptOpen(!isDemoScriptOpen)}
        >
          {isDemoScriptOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>

        <div className={styles.scriptContent}>
          <h3>Demo Walkthrough</h3>
          <ol className={styles.steps}>
            <li>
              <strong>Initial State:</strong>
              <p>Explore the "Map-List Sync" story context. Note the zero-config setup.</p>
            </li>
            <li>
              <strong>Launch Agent:</strong>
              <p>Click "Run Autonomous Bug Bash" to deploy AI agents.</p>
            </li>
            <li>
              <strong>Observe Simulation:</strong>
              <p>Watch the timeline execute scenarios, capture screenshots, and detect failures.</p>
            </li>
            <li>
              <strong>Technical Triage:</strong>
              <p>Explore Scenarios, Results, and Detected Issues. Review AI-generated fix proposals.</p>
            </li>
            <li>
              <strong>Executive Lens:</strong>
              <p>Toggle "Executive View" to see release readiness and risk-based metrics.</p>
            </li>
            <li>
              <strong>Decision:</strong>
              <p>Review the AI-generated Release Summary and make a final go/no-go decision.</p>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
