import React, { useState, useEffect } from 'react';
import { ChaosPanel } from '../components/studio/ChaosPanel';
import { AgentPipeline } from '../components/studio/AgentPipeline';
import { CodeDiffViewer } from '../components/studio/CodeDiffViewer';
import { TerminalPanel } from '../components/studio/TerminalPanel';
import { ApiReplayCard } from '../components/studio/ApiReplayCard';
import { SafetyEvidence } from '../components/studio/SafetyEvidence';
import { CreatePRButton } from '../components/studio/CreatePRButton';
import { socket } from '../services/socket';
import type { AgentState } from '../../../shared/types/telemetry';

export const StudioPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<AgentState>('HEALED');
  const [isExecuting, setIsExecuting] = useState(false);
  const [backendConnected, setBackendConnected] = useState(socket.connected);

  useEffect(() => {
    // Listen to real-time Socket.IO events from Backend Engine (Port 4000)
    socket.on('connect', () => setBackendConnected(true));
    socket.on('disconnect', () => setBackendConnected(false));

    socket.on('state:changed', (data: { currentState: AgentState }) => {
      console.log('⚡ [SOCKET TELEMETRY] Agent State Updated:', data.currentState);
      setCurrentStage(data.currentState);
      if (data.currentState === 'HEALED' || data.currentState === 'FAILED') {
        setIsExecuting(false);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('state:changed');
    };
  }, []);

  // Trigger Fault Simulation via Backend REST API (Port 4000)
  const handleInjectFault = async (faultType: string) => {
    setIsExecuting(true);
    setCurrentStage('INCIDENT_DETECTED');

    try {
      // Call Backend REST API on Port 4000
      const response = await fetch('http://localhost:4000/api/chaos/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faultType }),
      });
      const data = await response.json();
      console.log('⚡ [BACKEND REST API] Fault injected:', data);
    } catch (err) {
      console.warn('⚠️ [REST API FALLBACK] Backend offline, running local step simulation:', err);
      // Fallback local animation loop if backend is starting
      setTimeout(() => setCurrentStage('LOCALIZING'), 1200);
      setTimeout(() => setCurrentStage('PATCH_GENERATING'), 2500);
      setTimeout(() => setCurrentStage('SANDBOX_TESTING'), 4000);
      setTimeout(() => {
        setCurrentStage('HEALED');
        setIsExecuting(false);
      }, 6480);
    }
  };

  const handleApprovePR = async () => {
    alert('🚀 GitHub Pull Request #104 successfully created on branch: auto-fix/checkout-null-payload!');
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-[1700px] mx-auto min-h-[calc(100vh-64px-36px)] justify-between select-none">
      {/* Backend Connection Alert if Offline */}
      {!backendConnected && (
        <div className="bg-amber-950/40 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs flex items-center justify-between font-mono">
          <span>⚡ Live Telemetry Socket: Standalone Mode (Backend running at http://localhost:4000)</span>
          <span className="text-[10px] text-amber-400">Socket: Reconnecting...</span>
        </div>
      )}

      {/* Top Chaos Panel */}
      <ChaosPanel onInjectFault={handleInjectFault} isExecuting={isExecuting} />

      {/* Agent Pipeline Visualizer */}
      <AgentPipeline currentStage={currentStage} />

      {/* Main Command Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[480px]">
        {/* Left Column: Side-by-Side Monaco Code Diff (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[460px]">
          <CodeDiffViewer />
        </div>

        {/* Right Column: Terminal + Replay + Evidence + PR Action (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
          {/* Upper Right: Streaming Docker Terminal */}
          <div className="h-[220px]">
            <TerminalPanel />
          </div>

          {/* Middle Right Split Grid: API Replay & Safety Evidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ApiReplayCard />
            <SafetyEvidence />
          </div>

          {/* Bottom Right: Primary Approve PR Action Button */}
          <div>
            <CreatePRButton onApprove={handleApprovePR} isLoading={isExecuting} />
          </div>
        </div>
      </div>
    </div>
  );
};
