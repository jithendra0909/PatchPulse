import React from 'react';
import { AlertCircle, FileSearch, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { AgentState } from '../../types/telemetry';

interface AgentPipelineProps {
  currentStage: AgentState;
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({ currentStage }) => {
  const stages: { state: AgentState; label: string; sub: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { state: 'INCIDENT_DETECTED', label: '1. DETECT', sub: 'Captures 500 error & stack trace', icon: AlertCircle, color: 'red' },
    { state: 'LOCALIZING', label: '2. UNDERSTAND', sub: 'Tree-sitter AST parses & localizes function', icon: FileSearch, color: 'yellow' },
    { state: 'PATCH_GENERATING', label: '3. REPAIR', sub: 'Gemini synthesizes code diff', icon: Wrench, color: 'cyan' },
    { state: 'SANDBOX_TESTING', label: '4. VERIFY', sub: 'Docker runs pytest + API Replay', icon: ShieldCheck, color: 'purple' },
    { state: 'HEALED', label: '5. SHIP', sub: 'Creates GitHub Pull Request (PR #104)', icon: CheckCircle2, color: 'emerald' },
  ];

  const getStageIndex = (state: AgentState): number => {
    switch (state) {
      case 'INCIDENT_DETECTED': return 0;
      case 'LOCALIZING': return 1;
      case 'PATCH_GENERATING': return 2;
      case 'SANDBOX_TESTING': return 3;
      case 'HEALED': return 4;
      default: return -1;
    }
  };

  const activeIndex = getStageIndex(currentStage);

  return (
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Agent Pipeline (Live Telemetry)
          </span>
          <span className="flex items-center space-x-1 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Active</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeIndex;
          const isPassed = idx < activeIndex || activeIndex === 4;

          return (
            <div
              key={stage.state}
              className={`p-2.5 rounded-lg border transition-all duration-300 relative flex flex-col justify-between ${
                isActive
                  ? 'bg-[#151928] border-cyan-400/80 shadow-lg glow-cyan scale-[1.02]'
                  : isPassed
                  ? 'bg-[#101320] border-emerald-500/40 text-slate-300'
                  : 'bg-[#0B0D14] border-[#1C2133] text-slate-500 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isPassed && (
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">
                    ✓
                  </span>
                )}
              </div>

              <div>
                <div className={`text-xs font-bold font-mono ${isActive ? 'text-cyan-400' : isPassed ? 'text-slate-200' : 'text-slate-500'}`}>
                  {stage.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight line-clamp-2">
                  {stage.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
