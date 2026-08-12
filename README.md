# ⚡ PatchPulse — Autonomous Self-Healing Platform for Broken APIs

> **PS-04**: AI Agent for Repairing Broken APIs  
> **Live Demo**: [https://patchpulse-five.vercel.app](https://patchpulse-five.vercel.app)  
> **GitHub Repository**: [https://github.com/jithendra0909/PatchPulse](https://github.com/jithendra0909/PatchPulse)

---

## 🌟 Overview
PatchPulse is an autonomous, closed-loop API self-healing platform that detects API crashes, localizes exact code failures using AST parsing, synthesizes AI hotfixes using Gemini 1.5, verifies patches inside isolated sandboxes, and automatically opens Pull Requests on GitHub.

```
API Failure ➔ Detect ➔ Reproduce ➔ Diagnose ➔ Localize ➔ Generate Patch ➔ Sandbox Test ➔ Replay Request ➔ Calculate Safety ➔ GitHub PR
```

---

## 📸 Key Features & Pages

1. **⚡ Studio Page (`/studio`)**:
   - **Chaos Control Panel**: Inject schema drifts, null pointer crashes, type mismatches, and edge-case errors.
   - **Agent Pipeline Visualizer**: 5 connected glowing stage nodes (`DETECT` ➔ `UNDERSTAND` ➔ `REPAIR` ➔ `VERIFY` ➔ `SHIP`) with live telemetry.
   - **Monaco Code Diff Viewer**: Side-by-side view of original vs repaired code.
   - **Sandbox Docker Terminal**: Streaming pytest test runner logs.
   - **API Replay Card**: Before (500 Error) vs After (200 OK) request replay comparison.
   - **Safety Evidence Card**: 98% Verification Score with risk assessment.
   - **Approve PR Action**: Opens real Pull Requests on GitHub.

2. **📊 Vault Page (`/vault`)**:
   - Hero KPI cards (MTTR: 6.8s, Auto-Healed Rate: 98.4%, 142 total incidents).
   - Recharts system traffic vs error repair graph over time.
   - Searchable incident audit table with side-drawer autopsy forensics.

3. **⚙️ Settings Page (`/settings`)**:
   - Connected microservice repos, Docker sandbox parameters, Gemini LLM model parameters, and webhook triggers.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Environment Variables (`backend/.env`)
```env
PORT=4000
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
MONGODB_URI=mongodb://localhost:27017/patchpulse
```

### 3. Run Development Servers
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:4000`

---

## 🏆 Built for Hackathons
Powered by React 19, Vite, Tailwind CSS v4, Express, Socket.IO, Google Gemini 1.5 API, and GitHub REST API.
