# 🤖 Autonomous AI Bug Bash
### Next-Gen Quality Governance Demo

**Autonomous AI Bug Bash** is a high-fidelity, frontend-only demo that showcases a state-of-the-art AI agent designed for autonomous software testing, failure analysis, and patch generation. It simulates a complete quality governance lifecycle—from story analysis to final release approval—within a premium, interactive dashboard.

---

## 🚀 Key Features

### 1. Autonomous Run Simulation
- **Zero-Config Deployment**: Deploy AI agents to any active Jira story or feature branch with one click.
- **Dynamic Timeline**: Watch the agent progress through real-time stages: Test Plan Generation, Multi-Device Execution, Root Cause Analysis, and Fix Proposing.
- **Technical Logs**: Expandable pseudo-technical logs for deep visibility into agent decision-making.

### 2. Dual-Perspective Dashboard
- **Technical View**: Real-time test suite results, failure clustering, and technical issue previews with engineering context.
- **Executive Lens**: High-level risk assessment, business impact summaries, and release readiness scores.

### 3. AI-Driven Remediation
- **Smart Issue Templates**: Submit known edge cases for AI deep-diving using technical preview templates.
- **Automated Fix Proposals**: View AI-generated code diffs (e.g., race condition fixes) with associated confidence scores.
- **Patch Simulation**: Verify and apply fixes directly within the dashboard through an interactive verification lifecycle.

### 4. Premium DX & UX
- **Theme Switching**: Seamless transition between a "Deep Space" Dark Mode and a high-contrast Light Mode.
- **Glassmorphism Design**: Modern, premium aesthetic using backdrop blurs, gradients, and subtle micro-animations.
- **Demo Walkthrough**: Built-in guidance panel to ensure a perfect presentation flow.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Aesthetics**: Vanilla CSS Modules (Glassmorphism architecture)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Context**: React Context for robust state simulation

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm (or yarn / pnpm)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### Development
```bash
# Start the local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📽️ Demo Script

1. **Initial State**: Show the "Map-List Sync" story context and the zero-config setup.
2. **Launch Agent**: Click "Run Autonomous Bug Bash" to deploy the simulation.
3. **Observe Simulation**: Watch the timeline execute scenarios, capture evidence, and detect failures.
4. **Technical Triage**: Explore Scenarios and Detected Issues. Review an AI-generated fix proposal diff.
5. **Executive Lens**: Toggle "Executive View" to see release readiness and risk-based metrics.
6. **Decision**: Review the AI-generated Release Summary and make a final go/no-go decision.
7. **Reset**: Click the "Autonomous AI Bug Bash" logo in the header to restart the demo at any time.

---

## 🧩 Architectural Highlights

- **React Portals**: Robust modal positioning that bypasses parent layout transforms.
- **Deterministic Simulation**: A custom hashing engine in `simulation.ts` ensures consistent, high-quality mock data for every run.
- **Body Scroll-Locking**: Standardized UX for modal interactions.
- **Theming Sync**: `data-theme` attribute management for instant global visual swaps.

---

Created with ❤️ by the **Antigravity AI Agent**.
