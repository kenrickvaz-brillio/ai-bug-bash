
import { Story, TestScenario } from './types';

export const DEFAULT_STORY: Story = {
    id: 'map-list-sync',
    title: 'Map–List Synchronization with Draw-to-Search',
    description: 'When a user draws an area on a map, the results list updates instantly. Selecting a map pin highlights the matching list item and opens a preview.',
    value: 'End-user value: Instant visual feedback and seamless navigation between spatial and list-based search results.',
    acceptanceCriteria: [
        'Drawing an area updates results within 2 seconds',
        'Selecting a map pin highlights the corresponding list item',
        'Applying filters preserves the drawn area',
        'No duplicate or ghost results during rapid pan/zoom',
        'Mobile: map interactions don’t freeze the page',
        'Keyboard navigation and focus remain intact'
    ],
    components: [
        'Search Results Page',
        'Map Layer',
        'Results List',
        'Filters Panel',
        'State Synchronization Layer',
        'Mobile Layout',
        'Accessibility Layer'
    ],
    risks: [
        'Race conditions between map and filters',
        'Stale state / cache invalidation',
        'UI jank during rapid interactions',
        'Mobile performance regressions',
        'Focus traps and keyboard navigation bugs'
    ]
};

export const OTHER_STORIES: Story[] = [
    {
        id: 'saved-search-alerts',
        title: 'Saved Search Alerts',
        description: 'Users can save searches and receive push/email notifications when new results match their criteria.',
        value: 'Retention: Increases user engagement by bringing them back when relevant new items appear.',
        acceptanceCriteria: [], components: [], risks: []
    },
    {
        id: 'appointment-scheduling',
        title: 'Appointment Scheduling',
        description: 'A calendar-based interface for booking property viewings or consultations.',
        value: 'Conversion: Simplifies the booking funnel for higher lead generation.',
        acceptanceCriteria: [], components: [], risks: []
    },
    {
        id: 'price-comparison-widget',
        title: 'Price Comparison Widget',
        description: 'Compare selected items side-by-side with historical price trends.',
        value: 'Trust: Helps users make informed financial decisions with transparency.',
        acceptanceCriteria: [], components: [], risks: []
    },
    {
        id: 'neighborhood-insights',
        title: 'Neighborhood Insights Filters',
        description: 'Layering demographic, school, and safety data on top of map results.',
        value: 'Context: Provides deeper value beyond simple listing data.',
        acceptanceCriteria: [], components: [], risks: []
    }
];

export const TEST_SCENARIOS: TestScenario[] = [
    {
        id: 'ts-1',
        category: 'Functionality',
        name: 'Draw area updates results',
        description: 'Verify that drawing a polygon on the map triggers a search update within 2s.'
    },
    {
        id: 'ts-2',
        category: 'Functionality',
        name: 'Pin ↔ list sync',
        description: 'Verify selecting a map pin scrolls to and highlights the list item.'
    },
    {
        id: 'ts-3',
        category: 'Stability',
        name: 'Rapid pan/zoom ghost items',
        description: 'Stress test map movement to ensure no stale results disappear or linger.'
    },
    {
        id: 'ts-4',
        category: 'State',
        name: 'Filters preserve draw area',
        description: 'Ensure changing a price filter does not clear the polygon search area.'
    },
    {
        id: 'ts-5',
        category: 'Performance',
        name: 'Slow network mode',
        description: 'Verify loading states and race condition handling under high latency.'
    },
    {
        id: 'ts-6',
        category: 'Mobile',
        name: 'Mobile pan stability',
        description: 'Verify map pan interactions do not freeze the UI thread on mobile viewports.'
    },
    {
        id: 'ts-7',
        category: 'Accessibility',
        name: 'Keyboard navigation',
        description: 'Verify focus can move from map markers to list items via Tab key.'
    }
];

export const TEAMS = [
    'Search Platform',
    'Map UX',
    'Filters',
    'Mobile Web',
    'Accessibility'
];

export const PARTICIPANTS = [
    { name: 'Sarah', role: 'PM' },
    { name: 'Marcus', role: 'QA Lead' },
    { name: 'Elena', role: 'Dev' },
    { name: 'Jin', role: 'Dev' },
    { name: 'Clara', role: 'Designer' },
    { name: 'Alex', role: 'SRE' },
    { name: 'David', role: 'Analyst' }
];
