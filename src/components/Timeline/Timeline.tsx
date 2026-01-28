
"use client";

import { useApp } from '@/context/AppContext';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import styles from './Timeline.module.css';

export function Timeline() {
    const { session, isExecView } = useApp();

    if (!session || isExecView) return null;

    return (
        <div className={`${styles.timelineWrapper} animate-fade-in`}>
            <h3 className={styles.title}>Autonomous Run Timeline</h3>
            <div className={styles.timeline}>
                {session.timeline.map((event, idx) => {
                    const isLast = idx === session.timeline.length - 1;
                    const isPending = session.status === 'Running' && idx > 1; // Simplified

                    return (
                        <div key={event.id} className={styles.event}>
                            <div className={styles.indicatorCol}>
                                <div className={`${styles.dot} ${isPending ? styles.pending : styles.completed}`}>
                                    {isPending ? <Clock size={14} /> : <CheckCircle2 size={16} />}
                                </div>
                                {!isLast && <div className={styles.connector} />}
                            </div>
                            <div className={styles.contentCol}>
                                <div className={styles.eventHeader}>
                                    <span className={styles.stage}>{event.stage}</span>
                                    <span className={styles.timestamp}>{event.timestamp}</span>
                                </div>
                                <p className={styles.message}>{event.message}</p>
                                <div className={styles.logs}>
                                    {event.logs.map((log, i) => (
                                        <div key={i} className={styles.logLine}>
                                            <span className={styles.logArrow}>›</span> {log}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
