# Plan: Enable "Saved Search Alerts" Demo

The goal is to allow the "saved search alerts" story to be the active subject of the Autonomous AI Bug Bash simulation. This involves populating the story's data, allowing users to switch the active story, and ensuring the simulation runs with relevant test scenarios.

## User Review Required
> [!IMPORTANT]
> This change will modifying the `simulateAgentRun` logic to filter test scenarios by story. This ensures that "Saved Search" scenarios don't run for the "Map-List" story and vice versa.

## Proposed Changes

### Data & Simulation Layer

#### [MODIFY] [mockData.ts](file:///Users/kenrickvaz/Projects/personal/ai-bug-bash/src/lib/mockData.ts)
- Update `Story` and `TestScenario` interfaces (in `types.ts` effectively, or just usage here) to link scenarios to stories.
- Populate `saved-search-alerts` story with:
  - **Acceptance Criteria**: e.g. "Alert sent within 5 mins", "Email format correct".
  - **Components**: e.g. "Notification Service", "Search Indexer", "User Preferences".
  - **Risks**: e.g. "Email delivery latency", "Spam filter triggers".
- Add new `TEST_SCENARIOS` specific to "Saved Search Alerts" (e.g. "Trigger Alert", "Unsubscribe Flow").
- Add `storyId` or `category` tag to `TestScenario` to associate them with specific stories.

#### [MODIFY] [types.ts](file:///Users/kenrickvaz/Projects/personal/ai-bug-bash/src/lib/types.ts)
- Update `TestScenario` interface to include an optional `storyId` or `referencingTags` to link it to a story.

#### [MODIFY] [simulation.ts](file:///Users/kenrickvaz/Projects/personal/ai-bug-bash/src/lib/simulation.ts)
- Update `simulateAgentRun` to filter `TEST_SCENARIOS` based on the `story.id`.
- Ensure generated issues and fix proposals are relevant to the new components.

### State Management

#### [MODIFY] [AppContext.tsx](file:///Users/kenrickvaz/Projects/personal/ai-bug-bash/src/context/AppContext.tsx)
- Add `setCurrentStory` to `AppContextType`.
- expose `setCurrentStory` from `useApp`.

### UI Components

#### [MODIFY] [StoriesList.tsx](file:///Users/kenrickvaz/Projects/personal/ai-bug-bash/src/components/Dashboard/StoriesList.tsx)
- Make "Queued" story cards clickable.
- On click, call `setCurrentStory(story)` to promote it to the active view.
- Visual feedback for hover/selection.

## Verification Plan

### Manual Verification
1. Open the application.
2. Verify "Saved Search Alerts" appears in the "Queued" list.
3. Click on "Saved Search Alerts".
   - **Expectation**: It moves to the "Active Story" slot. The previous active story moves to the queue.
4. Click "Run Autonomous Bug Bash" (trigger via Header or Dashboard action).
   - **Expectation**: The timeline starts. Log messages reference "Saved Search Alerts" components.
   - **Expectation**: Scenarios executed match the new "Saved Search" scenarios (e.g. "Trigger Alert").
5. Wait for completion.
   - **Expectation**: Issues found are related to "Notification Service" or similar, not "Map Layer".
