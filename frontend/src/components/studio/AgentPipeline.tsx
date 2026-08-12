import React from 'react';
import { Target, Brain, Wrench, FlaskConical, Rocket, CheckCircle2 } from 'lucide-react';
import type { AgentState } from '../../../../shared/types/telemetry';

interface AgentPipelineProps {
  currentStage: AgentState;
  nodeTimings?: {
    detect?: string;
    understand?: string;
    repair?: string;
    verify?: string;
    ship?: string;
  };
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({
  currentStage,
  nodeTimings = {
    detect: '1.23s',
    understand: '2.84s',
    repair: '4.15s',
    verify: '6.48s',
    ship: 'PR #104',
  },
}) => {
  const isDetectDone = currentStage !== 'IDLE' && currentStage !== 'INCIDENT_DETECTED';
  const isUnderstandDone = ['PATCH_GENERATING', 'PATCH_VALIDATING', 'SANDBOX_TESTING', 'REGRESSION_TESTING', 'API_REPLAY', 'SAFETY_ANALYSIS', 'AWAITING_APPROVAL', 'PR_CREATING', 'HEALED'].includes(currentStage);
  const isRepairDone = ['SANDBOX_TESTING', 'REGRESSION_TESTING', 'API_REPLAY', 'SAFETY_ANALYSIS', 'AWAITING_APPROVAL', 'PR_CREATING', 'HEALED'].includes(currentStage);
  const isVerifyDone = ['SAFETY_ANALYSIS', 'AWAITING_APPROVAL', 'PR_CREATING', 'HEALED'].includes(currentStage);
  const isShipDone = currentStage === 'HEALED';

  const isDetectActive = currentStage === 'INCIDENT_DETECTED' || currentStage === 'REPRODUCING';
  const isUnderstandActive = currentStage === 'DIAGNOSING' || currentStage === 'LOCALIZING' || currentStage === 'CONTEXT_GATHERING';
  const isRepairActive = currentStage === 'PATCH_GENERATING' || currentStage === 'PATCH_VALIDATING' || currentStage === 'REFLECTION';
  const isVerifyActive = currentStage === 'SANDBOX_TESTING' || currentStage === 'REGRESSION_TESTING' || currentStage === 'API_REPLAY' || currentStage === 'SAFETY_ANALYSIS';
  const isShipActive = currentStage === 'AWAITING_APPROVAL' || currentStage === 'PR_CREATING';

  return (
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-3 select-none shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
          Agent Pipeline (Live)
        </span>
        <div className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Live</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-1 relative">
        <div className="absolute top-8 left-12 right-12 h-0.5 bg-[#1E2438] -z-0" />

        {/* Node 1: DETECT */}
        <div className="flex flex-col items-center z-10 group">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isDetectDone
                  ? 'bg-[#181119] border-red-500/80 text-red-400 shadow-lg shadow-red-950/50'
                  : isDetectActive
                  ? 'bg-red-900/40 border-red-400 text-red-300 animate-pulse shadow-xl shadow-red-500/30'
                  : 'bg-[#121624] border-[#22293E] text-slate-500'
              }`}
            >
              <Target className="w-6 h-6" />
            </div>
            {isDetectDone && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 fill-black text-emerald-500" />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-white tracking-tight">1. DETECT</div>
            <div className="text-[10px] text-slate-400 max-w-[110px] leading-tight">
              Captures 500 error & stack trace
            </div>
            <div className="text-[10px] font-mono text-red-400 mt-1">{nodeTimings.detect}</div>
          </div>
        </div>

        {/* Node 2: UNDERSTAND */}
        <div className="flex flex-col items-center z-10 group">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isUnderstandDone
                  ? 'bg-[#1A1811] border-amber-500/80 text-amber-400 shadow-lg shadow-amber-950/50'
                  : isUnderstandActive
                  ? 'bg-amber-900/40 border-amber-400 text-amber-300 animate-pulse shadow-xl shadow-amber-500/30'
                  : 'bg-[#121624] border-[#22293E] text-slate-500'
              }`}
            >
              <Brain className="w-6 h-6" />
            </div>
            {isUnderstandDone && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 fill-black text-emerald-500" />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-white tracking-tight">2. UNDERSTAND</div>
            <div className="text-[10px] text-slate-400 max-w-[120px] leading-tight">
              Tree-sitter AST parses & localizes function
            </div>
            <div className="text-[10px] font-mono text-amber-400 mt-1">{nodeTimings.understand}</div>
          </div>
        </div>

        {/* Node 3: REPAIR */}
        <div className="flex flex-col items-center z-10 group">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isRepairDone
                  ? 'bg-[#111922] border-cyan-500/80 text-cyan-400 shadow-lg shadow-cyan-950/50'
                  : isRepairActive
                  ? 'bg-cyan-900/40 border-cyan-400 text-cyan-300 animate-pulse shadow-xl shadow-cyan-500/30'
                  : 'bg-[#121624] border-[#22293E] text-slate-500'
              }`}
            >
              <Wrench className="w-6 h-6" />
            </div>
            {isRepairDone && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 fill-black text-emerald-500" />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-white tracking-tight">3. REPAIR</div>
            <div className="text-[10px] text-slate-400 max-w-[110px] leading-tight">
              Gemini synthesizes code diff
            </div>
            <div className="text-[10px] font-mono text-cyan-400 mt-1">{nodeTimings.repair}</div>
          </div>
        </div>

        {/* Node 4: VERIFY */}
        <div className="flex flex-col items-center z-10 group">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isVerifyDone
                  ? 'bg-[#181122] border-purple-500/80 text-purple-400 shadow-lg shadow-purple-950/50'
                  : isVerifyActive
                  ? 'bg-purple-900/40 border-purple-400 text-purple-300 animate-pulse shadow-xl shadow-purple-500/30'
                  : 'bg-[#121624] border-[#22293E] text-slate-500'
              }`}
            >
              <FlaskConical className="w-6 h-6" />
            </div>
            {isVerifyDone && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 fill-black text-emerald-500" />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-white tracking-tight">4. VERIFY</div>
            <div className="text-[10px] text-slate-400 max-w-[110px] leading-tight">
              Docker runs pytest + API Replay
            </div>
            <div className="text-[10px] font-mono text-purple-400 mt-1">{nodeTimings.verify}</div>
          </div>
        </div>

        {/* Node 5: SHIP */}
        <div className="flex flex-col items-center z-10 group">
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isShipDone
                  ? 'bg-[#111F18] border-emerald-500/80 text-emerald-400 shadow-lg shadow-emerald-950/50'
                  : isShipActive
                  ? 'bg-emerald-900/40 border-emerald-400 text-emerald-300 animate-pulse shadow-xl shadow-emerald-500/30'
                  : 'bg-[#121624] border-[#22293E] text-slate-500'
              }`}
            >
              <Rocket className="w-6 h-6" />
            </div>
            {isShipDone && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 fill-black text-emerald-500" />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-white tracking-tight">5. SHIP</div>
            <div className="text-[10px] text-slate-400 max-w-[110px] leading-tight">
              Creates GitHub Pull Request
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">{nodeTimings.ship}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
