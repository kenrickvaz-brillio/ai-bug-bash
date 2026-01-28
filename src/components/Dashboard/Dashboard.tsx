
"use client";

import { useApp } from '@/context/AppContext';
import { Target, Layers, FileCode, AlertTriangle, Play, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { StoriesList } from './StoriesList';
import styles from './Dashboard.module.css';

export function Dashboard() {
    const { session, runSimulation, resetSession, isExecView } = useApp();

    if (!session) {
        return (
            <div className={styles.empty}>
                <div className={styles.heroText}>
                    <h2 className="gradient-text">Launch Autonomous Bug Bash</h2>
                    <p>Deploy AI agents to stress-test your feature and generate actionable insights in minutes.</p>
                </div>
                <button className={styles.runButton} onClick={runSimulation}>
                    <Play size={20} fill="currentColor" />
                    Run Autonomous Bug Bash
                </button>
                <StoriesList />
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.dashHeader}>
                <div>
                    <h2>Autonomous Session Dashboard</h2>
                    <p>Session ID: {session.id}</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.secondaryButton}>View Artifacts</button>
                    <button className={styles.primaryButton} onClick={runSimulation}>
                        <RefreshCw size={16} />
                        Re-run Session
                    </button>
                </div>
            </header>

            <div className={styles.statsGrid}>
                {isExecView ? (
                    <>
                        <StatCard
                            label="Release Readiness"
                            value={`${session.stats.readinessScore}%`}
                            sub="Engineering Signal"
                            trend="Green"
                            icon={<Target />}
                            isScore
                        />
                        <StatCard
                            label="Manual QA Avoided"
                            value="120 hrs"
                            sub="Resource Efficiency"
                            trend="+63%"
                            icon={<Layers />}
                        />
                        <StatCard
                            label="Cycle Time Saved"
                            value="2.5 days"
                            sub="Speed to Market"
                            trend="Instant"
                            icon={<Zap />}
                        />
                        <StatCard
                            label="Defect Risk"
                            value="Low"
                            sub="Based on Fix Confidence"
                            trend="Decreased"
                            icon={<ShieldAlert />}
                        />
                    </>
                ) : (
                    <>
                        <StatCard label="Total Detections" value={session.stats.totalDetections} icon={<Target />} />
                        <StatCard label="Unique Issues" value={session.stats.uniqueIssues} icon={<Layers />} />
                        <StatCard label="Duplicates" value={session.stats.duplicatesCollapsed} icon={<FileCode />} />
                        <StatCard label="Critical Open" value={session.stats.criticalOpen} icon={<AlertTriangle />} severity="critical" />
                        <StatCard label="Fix Proposals" value={session.stats.fixProposalsReady} icon={<Zap />} />
                    </>
                )}
            </div>

            <div className={styles.agentStatus}>
                <div className={styles.statusLabel}>AI AGENT STATUS</div>
                <div className={styles.statusValue}>
                    {session.status === 'Ready'
                        ? <span className={styles.success}>● READY - ALL ARTIFACTS GENERATED</span>
                        : <span className={styles.active}>● {session.status.toUpperCase()}...</span>
                    }
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, sub, trend, icon, severity, isScore }: any) {
    return (
        <div className={`${styles.statCard} glass`}>
            <div className={styles.statIcon} data-severity={severity}>
                {icon}
            </div>
            <div className={styles.statInfo}>
                <span className={styles.statLabel}>{label}</span>
                <div className={styles.statMain}>
                    <h3 className={isScore ? styles.scoreValue : ''}>{value}</h3>
                    {trend && <span className={styles.trend} data-trend={trend === 'Green' ? 'positive' : ''}>{trend}</span>}
                </div>
                {sub && <p className={styles.statSub}>{sub}</p>}
            </div>
        </div>
    );
}
