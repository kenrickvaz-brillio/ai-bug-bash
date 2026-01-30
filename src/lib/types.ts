
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export interface TestScenario {
    id: string;
    name: string;
    description: string;
    category: string;
    storyId?: string; // Links scenario to a specific story
}

export interface TestResult {
    scenarioId: string;
    status: 'Pass' | 'Fail';
    flakiness: number;
    confidence: number;
    steps: string[];
    expected: string;
    actual: string;
    screenshots: string[];
    diagnosis: string;
    rationale: string;
}

export interface Issue {
    id: string;
    title: string;
    description: string;
    severity: Severity;
    priority: Priority;
    status: 'New' | 'Accepted' | 'Fix Proposed' | 'Fixed' | 'Won\'t Fix';
    clusterId?: string;
    clusterConfidence?: number;
    impactedComponents: string[];
    evidenceCount: number;
    fixProposed: boolean;
    reproSteps: string[];
    ticketPayload?: any;
}

export interface FixProposal {
    issueId: string;
    rootCause: string;
    suggestedFix: string;
    codeDiff: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    confidence: number;
}

export interface TimelineEvent {
    id: string;
    stage: string;
    message: string;
    timestamp: string;
    duration: number;
    logs: string[];
}

export interface BugBashSession {
    id: string;
    storyId: string;
    status: 'Idle' | 'Running' | 'Analyzing' | 'Proposing Fixes' | 'Ready';
    results: TestResult[];
    issues: Issue[];
    fixProposals: FixProposal[];
    timeline: TimelineEvent[];
    stats: {
        totalDetections: number;
        uniqueIssues: number;
        duplicatesCollapsed: number;
        criticalOpen: number;
        fixProposalsReady: number;
        readinessScore: number;
    };
}

export interface Story {
    id: string;
    title: string;
    description: string;
    value: string;
    acceptanceCriteria: string[];
    components: string[];
    risks: string[];
}
