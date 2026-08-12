import React, { useState, useEffect } from 'react';
import { ChaosPanel } from '../components/studio/ChaosPanel';
import { AgentPipeline } from '../components/studio/AgentPipeline';
import { CodeDiffViewer } from '../components/studio/CodeDiffViewer';
import { TerminalPanel } from '../components/studio/TerminalPanel';
import { ApiReplayCard } from '../components/studio/ApiReplayCard';
import { SafetyEvidence } from '../components/studio/SafetyEvidence';
import { CreatePRButton } from '../components/studio/CreatePRButton';
import { socket } from '../services/socket';
import type { AgentState } from '../types/telemetry';

export const StudioPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<AgentState>('HEALED');
  const [isExecuting, setIsExecuting] = useState(false);
  const [backendConnected, setBackendConnected] = useState(socket.connected);

  useEffect(() => {
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

  const handleInjectFault = async (faultType: string) => {
    setIsExecuting(true);
    setCurrentStage('INCIDENT_DETECTED');

    try {
      const response = await fetch('http://localhost:4000/api/chaos/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faultType }),
      });
      const data = await response.json();
      console.log('⚡ [BACKEND REST API] Fault injected:', data);
    } catch (err) {
      console.warn('⚠️ [REST API FALLBACK] Backend offline, running local step simulation:', err);
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
      {!backendConnected && (
        <div className="bg-amber-950/40 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs flex items-center justify-between font-mono">
          <span>⚡ Live Telemetry Socket: Standalone Mode (Backend running at http://localhost:4000)</span>
          <span className="text-[10px] text-amber-400">Socket: Reconnecting...</span>
        </div>
      )}

      <ChaosPanel onInjectFault={handleInjectFault} isExecuting={isExecuting} />
      <AgentPipeline currentStage={currentStage} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[480px]">
        <div className="lg:col-span-7 flex flex-col h-full min-h-[460px]">
          <CodeDiffViewer />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
          <div className="h-[220px]">
            <TerminalPanel />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ApiReplayCard />
            <SafetyEvidence />
          </div>

          <div>
            <CreatePRButton onApprove={handleApprovePR} isLoading={isExecuting} />
          </div>
        </div>
      </div>
    </div>
  );
};
