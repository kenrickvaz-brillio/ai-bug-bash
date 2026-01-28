
import { Issue, FixProposal, TestResult, TimelineEvent, BugBashSession, Story, Severity, Priority } from './types';
import { TEST_SCENARIOS } from './mockData';

// Simple deterministic hash function
const hash = (str: string) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
};

const getStatus = (h: number): 'Pass' | 'Fail' => (h % 3 === 0 ? 'Fail' : 'Pass');

const getSeverity = (h: number): Severity => {
    const mod = h % 4;
    if (mod === 0) return 'Critical';
    if (mod === 1) return 'High';
    if (mod === 2) return 'Medium';
    return 'Low';
};

const getPriority = (h: number): Priority => {
    const mod = h % 4;
    return `P${mod}` as Priority;
};

export const simulateAgentRun = (story: Story): BugBashSession => {
    const results: TestResult[] = TEST_SCENARIOS.map(scenario => {
        const h = hash(scenario.id + story.id);
        const status = getStatus(h);

        return {
            scenarioId: scenario.id,
            status,
            flakiness: (h % 15),
            confidence: 85 + (h % 15),
            steps: [
                'Initialize map layer',
                `Prepare ${scenario.category} test environment`,
                'Perform interaction: ' + scenario.name,
                'Wait for state synchronization'
            ],
            expected: 'System state should remain consistent and performant.',
            actual: status === 'Pass'
                ? 'State synchronized successfully.'
                : `Detected inconsistency in ${scenario.category} layer. Expected response within 200ms, got ${400 + (h % 1000)}ms.`,
            screenshots: [
                `https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=300&h=200`,
                `https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=300&h=200`
            ],
            diagnosis: status === 'Pass' ? 'No issues found.' : `AI detected a potential race condition in the ${story.components[h % story.components.length]}.`,
            rationale: `Pattern analysis suggests that rapid ${scenario.category} triggers may lead to stale state in high-concurrency environments.`
        };
    });

    const failedScenarios = results.filter(r => r.status === 'Fail');

    // Group failures into issues (some may be duplicates)
    const issues: Issue[] = failedScenarios.map((r, i) => {
        const h = hash(r.scenarioId + 'issue');
        const isDuplicate = h % 2 === 0 && i > 0;
        const scenario = TEST_SCENARIOS.find(ts => ts.id === r.scenarioId)!;

        return {
            id: `iss-${h}`,
            title: `${scenario.name} Failure`,
            description: `The AI detected a failure during the ${scenario.name} test scenario. ${r.diagnosis}`,
            severity: getSeverity(h),
            priority: getPriority(h),
            status: 'New',
            clusterId: isDuplicate ? `cluster-${hash(scenario.category)}` : undefined,
            clusterConfidence: isDuplicate ? 0.85 + (h % 15) / 100 : undefined,
            impactedComponents: [story.components[h % story.components.length]],
            evidenceCount: 3 + (h % 5),
            fixProposed: (h % 2 === 0),
            reproSteps: r.steps,
            ticketPayload: {
                title: `[AI BUG BASH] ${scenario.name} - ${getSeverity(h)}`,
                description: r.diagnosis,
                labels: ['ai-detected', scenario.category.toLowerCase()]
            }
        };
    });

    const fixProposals: FixProposal[] = issues
        .filter(iss => iss.fixProposed)
        .map(iss => ({
            issueId: iss.id,
            rootCause: `Race condition in ${iss.impactedComponents[0]} during concurrent state updates.`,
            suggestedFix: `Implement a debounced synchronization hook to ensure the last action takes precedence.`,
            codeDiff: `
- useEffect(() => {
-   syncData(mapState);
- }, [mapState]);
+ useEffect(() => {
+   const timer = setTimeout(() => syncData(mapState), 150);
+   return () => clearTimeout(timer);
+ }, [mapState]);`,
            riskLevel: hash(iss.id) % 3 === 0 ? 'Medium' : 'Low',
            confidence: 0.92
        }));

    const timeline: TimelineEvent[] = [
        { id: 't1', stage: 'Generate Test Plan', message: 'Analyzing acceptance criteria and story context...', timestamp: '10:00:01', duration: 1200, logs: ['Parsed AC: 6 items', 'Mapping components: 7 layers'] },
        { id: 't2', stage: 'Execute Tests', message: 'Running 7 scenarios across desktop and mobile...', timestamp: '10:00:03', duration: 4500, logs: ['Scenario 1: Pass', 'Scenario 2: Fail', 'Scenario 6: Fail (Mobile)'] },
        { id: 't3', stage: 'Analyze Failures', message: 'Analyzing 2 failures for root causes...', timestamp: '10:00:08', duration: 2200, logs: ['Correlating logs with performance metrics', 'Detected state mismatch'] },
        { id: 't4', stage: 'Deduplicate + Triage', message: 'Clustering issues and assigning severity...', timestamp: '10:00:10', duration: 1500, logs: ['Found 1 duplicate', 'Triaged as P0-High'] },
        { id: 't5', stage: 'Propose Fixes', message: 'Generating patch previews for unique issues...', timestamp: '10:00:12', duration: 3000, logs: ['Fix generated for Issue #iss-123'] },
        { id: 't6', stage: 'Draft Tickets', message: 'Finalizing ticket payloads and summaries...', timestamp: '10:00:15', duration: 800, logs: ['Jira payload ready', 'Readiness score: 72%'] }
    ];

    return {
        id: `session-${Date.now()}`,
        storyId: story.id,
        status: 'Ready',
        results,
        issues,
        fixProposals,
        timeline,
        stats: {
            totalDetections: failedScenarios.length,
            uniqueIssues: issues.filter(iss => !iss.clusterId || iss.status === 'New').length,
            duplicatesCollapsed: issues.filter(iss => iss.clusterId).length,
            criticalOpen: issues.filter(iss => iss.severity === 'Critical').length,
            fixProposalsReady: fixProposals.length,
            readinessScore: 100 - (failedScenarios.length * 5) - (issues.filter(iss => iss.severity === 'Critical').length * 10)
        }
    };
};
