import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AlertCircle, FileJson, GitPullRequest, Bookmark, Share2, ClipboardList, Info } from 'lucide-react';
import { Modal } from '@/components/Modal/Modal';
import styles from './Issues.module.css';

export function IssuesFeed() {
    const { session, isExecView } = useApp();

    if (!session) return null;

    const displayIssues = isExecView
        ? session.issues.filter(i => i.severity === 'Critical' || i.severity === 'High')
        : session.issues;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>{isExecView ? 'Risk Hotspots' : 'Detected Issues'}</h3>
                <div className={styles.filters}>
                    <span>Sources: Detected by AI, Template Submissions</span>
                </div>
            </div>

            <div className={styles.grid}>
                {displayIssues.map(issue => (
                    <div key={issue.id} className={`${styles.issueCard} glass`}>
                        <div className={styles.issueHeader}>
                            <div className={styles.badges}>
                                <span className={styles.severity} data-severity={issue.severity.toLowerCase()}>
                                    {issue.severity}
                                </span>
                                <span className={styles.priority}>{issue.priority}</span>
                            </div>
                            <div className={styles.id}>{issue.id}</div>
                        </div>

                        <h4 className={styles.title}>{issue.title}</h4>
                        <p className={styles.desc}>{issue.description}</p>

                        <div className={styles.components}>
                            {issue.impactedComponents.map(c => (
                                <span key={c} className={styles.compBadge}>{c}</span>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.evidence}>
                                <AlertCircle size={14} /> {issue.evidenceCount} evidences
                            </div>
                            {issue.fixProposed && (
                                <div className={styles.fixBadge}>
                                    <GitPullRequest size={14} /> Fix Proposed
                                </div>
                            )}
                        </div>

                        {isExecView && (
                            <div className={styles.execFooter}>
                                <strong>Exec Signal:</strong> This defect directly impacts {issue.impactedComponents[0]} Conversion Path.
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!isExecView && <IssueTemplates />}
        </div>
    );
}

function IssueTemplates() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const templates = [
        {
            id: 't-1',
            title: "Map pins don’t match list",
            details: "User reports that after selecting Pin #42, the list highlights Item #43. This suggests an off-by-one error in the index mapping between the map layer and the list view.",
            impact: "High - Breaks the core synchronization value prop.",
            context: "Affects both desktop and tablet viewports."
        },
        {
            id: 't-2',
            title: "Filters reset drawn area",
            details: "Applying a price filter clears the current polygon drawn by the user. Expected behavior: filters should apply within the drawn area.",
            impact: "Medium - Causes user frustration and repetitive work.",
            context: "State management layer is overwriting spatial bounds on filter update."
        },
        {
            id: 't-3',
            title: "Ghost or duplicate results",
            details: "During rapid pan/zoom, items remain visible that are clearly outside the current viewport. These 'ghost' items eventually disappear after 3-5 seconds.",
            impact: "High - Performance jank and data inaccuracy.",
            context: "Cache invalidation logic in the MapView hook is lagging behind UI thread."
        },
        {
            id: 't-4',
            title: "Mobile freeze during map interaction",
            details: "The main thread locks up for ~800ms when a user initiates a multi-touch zoom on mobile devices.",
            impact: "Critical - Severe UX regression on mobile.",
            context: "Heavy re-rendering of the entire list results list on every zoom step."
        },
        {
            id: 't-5',
            title: "Accessibility: focus lost or trapped",
            details: "Tabbing through map markers often traps the focus within the map container with no way to exit back to the filters or header.",
            impact: "Medium - High impact for keyboard-only users.",
            context: "FocusTrap library configuration needs adjustment for spatial elements."
        }
    ];

    const activeTemplate = templates.find(t => t.title === selectedTemplate);

    return (
        <div className={styles.templates}>
            <h4>Submit Known Issue (Templates)</h4>
            <div className={styles.templateGrid}>
                {templates.map(t => (
                    <button
                        key={t.id}
                        className={styles.templateBtn}
                        onClick={() => setSelectedTemplate(t.title)}
                    >
                        {t.title}
                    </button>
                ))}
            </div>

            <Modal
                isOpen={!!selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                title="Issue Template Preview"
            >
                {activeTemplate && (
                    <div className={styles.modalBody}>
                        <div className={styles.modalSection}>
                            <div className={styles.modalLabel}>
                                <ClipboardList size={16} /> Summary
                            </div>
                            <h4>{activeTemplate.title}</h4>
                            <p>{activeTemplate.details}</p>
                        </div>

                        <div className={styles.modalSection}>
                            <div className={styles.modalLabel}>
                                <AlertCircle size={16} /> Impact
                            </div>
                            <p>{activeTemplate.impact}</p>
                        </div>

                        <div className={styles.modalSection}>
                            <div className={styles.modalLabel}>
                                <Info size={16} /> Engineering Context
                            </div>
                            <p>{activeTemplate.context}</p>
                        </div>

                        <button className={styles.submitBtn} onClick={() => setSelectedTemplate(null)}>
                            Submit Issue for AI Enrichment
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
