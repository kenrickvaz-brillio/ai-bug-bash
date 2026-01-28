
"use client";

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TEST_SCENARIOS } from '@/lib/mockData';
import { Beaker, CheckCircle, XCircle, AlertCircle, Image as ImageIcon, FileText } from 'lucide-react';
import styles from './TestSuite.module.css';

export function TestSuite() {
    const { session, isExecView } = useApp();
    const [activeTab, setActiveTab] = useState<'scenarios' | 'results' | 'artifacts'>('scenarios');

    if (!session || isExecView) return null;

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'scenarios' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('scenarios')}
                >
                    <Beaker size={16} /> Scenarios
                </button>
                <button
                    className={activeTab === 'results' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('results')}
                >
                    <CheckCircle size={16} /> Run Results
                </button>
                <button
                    className={activeTab === 'artifacts' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('artifacts')}
                >
                    <ImageIcon size={16} /> Artifacts
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'scenarios' && (
                    <div className={styles.grid}>
                        {TEST_SCENARIOS.map(s => (
                            <div key={s.id} className={`${styles.card} glass`}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.category}>{s.category}</span>
                                </div>
                                <h4>{s.name}</h4>
                                <p>{s.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'results' && (
                    <div className={styles.resultsList}>
                        {session.results.map(r => {
                            const scenario = TEST_SCENARIOS.find(ts => ts.id === r.scenarioId)!;
                            return (
                                <div key={r.scenarioId} className={`${styles.resultRow} glass`}>
                                    <div className={styles.resultStatus}>
                                        {r.status === 'Pass' ? <CheckCircle className={styles.pass} /> : <XCircle className={styles.fail} />}
                                    </div>
                                    <div className={styles.resultInfo}>
                                        <h4>{scenario.name}</h4>
                                        <p>{r.actual}</p>
                                    </div>
                                    <div className={styles.resultMetrics}>
                                        <div>
                                            <span>Flakiness</span>
                                            <p>{r.flakiness}%</p>
                                        </div>
                                        <div>
                                            <span>Confidence</span>
                                            <p>{r.confidence}%</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'artifacts' && (
                    <div className={styles.artifactsGrid}>
                        <div className={styles.artifactCard}>
                            <ImageIcon size={48} />
                            <p>Execution Screenshots (14)</p>
                        </div>
                        <div className={styles.artifactCard}>
                            <FileText size={48} />
                            <p>Console Logs (242 lines)</p>
                        </div>
                        <div className={styles.artifactCard}>
                            <AlertCircle size={48} />
                            <p>Performance Traces (8)</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
