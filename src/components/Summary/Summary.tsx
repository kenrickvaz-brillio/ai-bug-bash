
"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { GitBranch, Check, ShieldCheck, Zap, ArrowRight, BarChart3, Loader2, Save } from 'lucide-react';
import { Modal } from '@/components/Modal/Modal';
import { FixProposal } from '@/lib/types';
import styles from './Summary.module.css';

export function Summary() {
    const { session, isExecView } = useApp();
    const [selectedFix, setSelectedFix] = useState<FixProposal | null>(null);
    const [applyState, setApplyState] = useState<'idle' | 'verifying' | 'applying' | 'success'>('idle');

    if (!session) return null;

    const handleApply = () => {
        setApplyState('verifying');
        setTimeout(() => {
            setApplyState('applying');
            setTimeout(() => {
                setApplyState('success');
            }, 2000);
        }, 1500);
    };

    const handleClose = () => {
        setSelectedFix(null);
        setApplyState('idle');
    };

    return (
        <div className={styles.container}>
            <section className={styles.fixSection}>
                <div className={styles.sectionHeader}>
                    <h3>AI Fix Proposals</h3>
                    <p>Automated patch generation for unique issues</p>
                </div>

                <div className={styles.fixList}>
                    {session.fixProposals.map(fix => (
                        <div key={fix.issueId} className={`${styles.fixCard} glass`}>
                            <div className={styles.fixMeta}>
                                <div className={styles.fixTitle}>
                                    <GitBranch size={16} />
                                    <span>Fix for #{fix.issueId}</span>
                                </div>
                                <div className={styles.riskBadge} data-risk={fix.riskLevel.toLowerCase()}>
                                    Risk: {fix.riskLevel}
                                </div>
                            </div>

                            <div className={styles.cause}>
                                <strong>Root Cause:</strong> {fix.rootCause}
                            </div>

                            <div className={styles.diffBlock}>
                                <pre><code>{fix.codeDiff}</code></pre>
                            </div>

                            <button className={styles.applyBtn} onClick={() => setSelectedFix(fix)}>
                                Verify & Apply Patch <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Modal
                isOpen={!!selectedFix}
                onClose={handleClose}
                title="Patch Verification & Deployment"
            >
                {selectedFix && (
                    <div className={styles.patchModalBody}>
                        <div className={styles.patchModalHeader}>
                            <div className={styles.patchInfo}>
                                <GitBranch size={20} className={styles.patchIcon} />
                                <div>
                                    <h4>{selectedFix.issueId} - Patch Preview</h4>
                                    <p>Confidence: {(selectedFix.confidence * 100).toFixed(0)}% • Risk: {selectedFix.riskLevel}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalDiff}>
                            <pre><code>{selectedFix.codeDiff}</code></pre>
                        </div>

                        <div className={styles.statusSection}>
                            {applyState === 'idle' && (
                                <p>Ready to verify patch against codebase benchmarks.</p>
                            )}
                            {applyState === 'verifying' && (
                                <div className={styles.statusLine}>
                                    <Loader2 className={styles.spin} size={18} />
                                    <span>Verifying patch compatibility with Map synchronization layer...</span>
                                </div>
                            )}
                            {applyState === 'applying' && (
                                <div className={styles.statusLine}>
                                    <Loader2 className={styles.spin} size={18} />
                                    <span>Applying patch and re-running impacted visibility tests...</span>
                                </div>
                            )}
                            {applyState === 'success' && (
                                <div className={styles.successLine}>
                                    <Check className={styles.checkIcon} size={18} />
                                    <span>Patch successfully deployed. Stability score improved by +12%.</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.modalActions}>
                            {applyState === 'idle' ? (
                                <button className={styles.modalApplyBtn} onClick={handleApply}>
                                    Proceed with Verification
                                </button>
                            ) : applyState === 'success' ? (
                                <button className={styles.modalCloseBtn} onClick={handleClose}>
                                    Close & Update Dashboard
                                </button>
                            ) : (
                                <button className={styles.modalApplyBtn} disabled>
                                    <Loader2 className={styles.spin} size={16} /> Processing...
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            <section className={styles.finalSummary}>
                <div className={`${styles.summaryCard} glass`}>
                    <div className={styles.summaryHeader}>
                        <BarChart3 size={32} className={styles.summaryIcon} />
                        <div>
                            <h3>Session Summary & Release Readiness</h3>
                            <p>AI-Generated Release Recommendation</p>
                        </div>
                    </div>

                    <div className={styles.summaryContent}>
                        <p className={styles.summaryText}>
                            {isExecView ? (
                                "The autonomous bug bash evaluated the map–list synchronization feature across desktop and mobile scenarios. The system identified four unique customer-impacting issues, two of which are critical and related to state synchronization during rapid interactions. Automated fix proposals address 80% of detected risk. Based on current confidence, the release is RECOMMENDED WITH FIXES applied."
                            ) : (
                                "Session complete. 7 scenarios executed with 2 failures. AI clustered failures into 2 unique issues. 1 fix proposal generated with 92% confidence. Code coverage breadth: 88%. Regression risk: Low."
                            )}
                        </p>

                        <div className={styles.decisionGroup}>
                            <button className={styles.approveBtn}>
                                <Check size={18} /> Approve Release
                            </button>
                            <button className={styles.conditionalBtn}>
                                <ShieldCheck size={18} /> Approve with Fixes
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
