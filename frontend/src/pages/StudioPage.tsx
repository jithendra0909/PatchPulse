import { useState, useEffect } from 'react';
import { ChaosPanel } from '../components/studio/ChaosPanel';
import { AgentPipeline } from '../components/studio/AgentPipeline';
import { CodeDiffViewer } from '../components/studio/CodeDiffViewer';
import { TerminalPanel } from '../components/studio/TerminalPanel';
import { ApiReplayCard } from '../components/studio/ApiReplayCard';
import { SafetyEvidence } from '../components/studio/SafetyEvidence';
import { CreatePRButton } from '../components/studio/CreatePRButton';
import { socket } from '../services/socket';
import { api } from '../services/api/client';
import type { AgentState } from '../types/telemetry';

export function StudioPage() {
  const [currentStage, setCurrentStage] = useState<AgentState>('IDLE');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [createdPrUrl, setCreatedPrUrl] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(socket.connected);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleStage = (data: any) => {
      if (data.currentState) {
        setCurrentStage(data.currentState as AgentState);
        if (data.currentState === 'HEALED' || data.currentState === 'FAILED') {
          setIsExecuting(false);
        }
      }
    };

    const handleLog = (data: any) => {
      if (data.log) {
        setTerminalLogs(prev => [...prev, data.log]);
      }
    };

    const handleConnect = () => setSocketConnected(true);
    const handleDisconnect = () => setSocketConnected(false);

    socket.on('agent:stage', handleStage);
    socket.on('verification:log', handleLog);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('agent:stage', handleStage);
      socket.off('verification:log', handleLog);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const handleInjectFault = async (faultType: string) => {
    setIsExecuting(true);
    setCreatedPrUrl(null);
    setTerminalLogs([]);
    setCurrentStage('INCIDENT_DETECTED');

    try {
      await api.injectChaos(faultType);
      // Pipeline state driven entirely by Socket.IO events — no setTimeout
    } catch (err: any) {
      setIsExecuting(false);
      setCurrentStage('FAILED');
      setTerminalLogs(prev => [...prev, `[ERROR] Backend request failed: ${err.message}`]);
    }
  };

  const handleCreatePR = async () => {
    setIsCreatingPR(true);
    try {
      const data = await api.createPullRequest({
        repoOwner: 'jithendra0909',
        repoName: 'PatchPulse',
        filePath: 'services/checkout_controller.py',
        title: '⚡ PatchPulse Auto-Repair',
      });
      setIsCreatingPR(false);
      if (data.prUrl) {
        setCreatedPrUrl(data.prUrl);
        window.open(data.prUrl, '_blank');
      }
    } catch (err: any) {
      setIsCreatingPR(false);
      setTerminalLogs(prev => [...prev, `[ERROR] PR creation failed: ${err.message}`]);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-[1700px] mx-auto min-h-[calc(100vh-64px-36px)] justify-between select-none">
      {/* Real Socket.IO Connection Status */}
      <div className={`bg-[#101422] border ${socketConnected ? 'border-emerald-500/30' : 'border-red-500/30'} text-slate-300 px-3 py-1.5 rounded-lg text-xs flex items-center justify-between font-mono`}>
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
          <span>
            {socketConnected
              ? '⚡ Live Telemetry Socket: Connected (Agent Listening)'
              : '⚠️ Socket Disconnected — Attempting to reconnect...'}
          </span>
        </div>
        <span className={`text-[10px] ${socketConnected ? 'text-cyan-400' : 'text-red-400'}`}>
          WebSocket: {socketConnected ? 'Active' : 'Disconnected'}
        </span>
      </div>

      {createdPrUrl && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 px-4 py-2 rounded-lg text-xs flex items-center justify-between font-mono shadow-lg">
          <span>🎉 Live GitHub PR Created Successfully!</span>
          <a
            href={createdPrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-black px-3 py-1 rounded font-bold hover:bg-emerald-400 underline"
          >
            View Live Pull Request on GitHub →
          </a>
        </div>
      )}

      <ChaosPanel onInjectFault={handleInjectFault} isExecuting={isExecuting} />
      <AgentPipeline currentStage={currentStage} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[480px]">
        <div className="lg:col-span-7 flex flex-col h-full min-h-[460px]">
          <CodeDiffViewer />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 h-full">
          <TerminalPanel logs={terminalLogs} />
          <ApiReplayCard />
          <SafetyEvidence />
          <CreatePRButton onApprove={handleCreatePR} isLoading={isCreatingPR} />
        </div>
      </div>
    </div>
  );
}

export default StudioPage;
