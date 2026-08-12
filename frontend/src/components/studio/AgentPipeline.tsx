import React from 'react';
import { AlertCircle, FileSearch, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { AgentState } from '../../types/telemetry';

interface AgentPipelineProps {
  currentStage: AgentState;
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({ currentStage }) => {
  const stages: { state: AgentState; label: string; sub: string; icon: React.FC<{ className?: string }>; color: string; duration: string }[] = [
    { state: 'INCIDENT_DETECTED', label: '1. DETECT', sub: 'Captures 500 error & stack trace', icon: AlertCircle, color: 'red', duration: '1.23s' },
    { state: 'LOCALIZING', label: '2. UNDERSTAND', sub: 'Tree-sitter AST parses & localizes function', icon: FileSearch, color: 'yellow', duration: '2.84s' },
    { state: 'PATCH_GENERATING', label: '3. REPAIR', sub: 'Gemini synthesizes code diff', icon: Wrench, color: 'cyan', duration: '4.15s' },
    { state: 'SANDBOX_TESTING', label: '4. VERIFY', sub: 'Docker runs pytest + API Replay', icon: ShieldCheck, color: 'purple', duration: '6.48s' },
    { state: 'HEALED', label: '5. SHIP', sub: 'Creates GitHub Pull Request (PR #104)', icon: CheckCircle2, color: 'emerald', duration: 'DONE' },
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
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Agent Pipeline (Live Telemetry)
          </span>
          <span className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Active</span>
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Stage: <span className="text-cyan-400 font-bold">{currentStage}</span>
        </div>
      </div>

      {/* Connected Nodes & Connector Line Container */}
      <div className="relative flex items-start justify-between px-6 pt-2">
        {/* Horizontal Background Connecting Line */}
        <div className="absolute top-[28px] left-[60px] right-[60px] h-[3px] bg-[#1A1F30] -z-0" />
        
        {/* Active Progress Connector Line */}
        <div
          className="absolute top-[28px] left-[60px] h-[3px] bg-gradient-to-r from-red-500 via-cyan-400 to-emerald-400 transition-all duration-500 -z-0"
          style={{
            width: activeIndex <= 0 ? '0%' : `${(activeIndex / 4) * 82}%`,
          }}
        />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeIndex;
          const isPassed = idx <= activeIndex || activeIndex === 4;

          return (
            <div key={stage.state} className="flex flex-col items-center text-center z-10 w-44">
              {/* Circular Stage Node */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#151928] border-cyan-400 text-cyan-400 shadow-lg glow-cyan scale-110'
                    : isPassed
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-md'
                    : 'bg-[#0D0F17] border-[#252B3E] text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Timing Badge */}
              <span
                className={`mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                    : isPassed
                    ? 'bg-emerald-950 text-emerald-400 font-semibold'
                    : 'bg-slate-900 text-slate-600'
                }`}
              >
                {stage.duration}
              </span>

              {/* Stage Title & Description */}
              <div className="mt-1.5">
                <div
                  className={`text-xs font-bold font-mono tracking-tight ${
                    isActive
                      ? 'text-cyan-400'
                      : isPassed
                      ? 'text-slate-200'
                      : 'text-slate-500'
                  }`}
                >
                  {stage.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
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
