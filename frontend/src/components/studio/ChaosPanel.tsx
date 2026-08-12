import React, { useState } from 'react';
import { Zap, Link as LinkIcon, Code2, Clock, Settings, ChevronRight } from 'lucide-react';

interface ChaosPanelProps {
  onInjectFault: (faultType: 'schema_drift' | 'null_pointer' | 'type_mismatch' | 'edge_case') => void;
  isExecuting?: boolean;
}

export const ChaosPanel: React.FC<ChaosPanelProps> = ({
  onInjectFault,
  isExecuting = false,
}) => {
  const [autoMode, setAutoMode] = useState(false);

  return (
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-3 shadow-lg select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
          <span className="text-xs font-bold tracking-wider text-slate-300 uppercase font-sans">
            Chaos Control / Fault Injection
          </span>
        </div>

        {/* Auto Mode Control */}
        <div className="flex items-center space-x-4 bg-[#121624] border border-[#1E2438] px-3 py-1 rounded-md text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[11px] font-medium">Auto Mode</span>
            <span className={`font-bold text-[11px] ${autoMode ? 'text-cyan-400' : 'text-slate-500'}`}>
              {autoMode ? 'ON' : 'OFF'}
            </span>
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                autoMode ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  autoMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
            <span>Interval: 60s</span>
            <Settings className="w-3 h-3 hover:text-white cursor-pointer ml-1 transition-colors" />
          </div>
        </div>
      </div>

      {/* 4 Chaos Control Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Button 1: Schema Drift */}
        <button
          disabled={isExecuting}
          onClick={() => onInjectFault('schema_drift')}
          className="group relative bg-gradient-to-r from-red-950/40 to-[#161219] hover:from-red-900/60 hover:to-[#221724] border border-red-500/30 hover:border-red-500/60 rounded-lg p-2.5 text-left transition-all flex items-center justify-between shadow-md hover:shadow-red-950/40 disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-red-200 transition-colors">
                Inject Schema Drift
              </div>
              <div className="text-[10px] text-slate-400">Break response schema</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400/50 group-hover:text-red-300 group-hover:translate-x-0.5 transition-all" />
        </button>

        {/* Button 2: Null Pointer */}
        <button
          disabled={isExecuting}
          onClick={() => onInjectFault('null_pointer')}
          className="group relative bg-gradient-to-r from-amber-950/40 to-[#191612] hover:from-amber-900/60 hover:to-[#241F16] border border-amber-500/30 hover:border-amber-500/60 rounded-lg p-2.5 text-left transition-all flex items-center justify-between shadow-md hover:shadow-amber-950/40 disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                Inject Null Pointer
              </div>
              <div className="text-[10px] text-slate-400">Trigger null reference</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
        </button>

        {/* Button 3: Type Mismatch */}
        <button
          disabled={isExecuting}
          onClick={() => onInjectFault('type_mismatch')}
          className="group relative bg-gradient-to-r from-cyan-950/40 to-[#121820] hover:from-cyan-900/60 hover:to-[#172230] border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg p-2.5 text-left transition-all flex items-center justify-between shadow-md hover:shadow-cyan-950/40 disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                Inject Type Mismatch
              </div>
              <div className="text-[10px] text-slate-400">Cause type validation error</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
        </button>

        {/* Button 4: Edge Case Crash */}
        <button
          disabled={isExecuting}
          onClick={() => onInjectFault('edge_case')}
          className="group relative bg-gradient-to-r from-purple-950/40 to-[#171220] hover:from-purple-900/60 hover:to-[#221830] border border-purple-500/30 hover:border-purple-500/60 rounded-lg p-2.5 text-left transition-all flex items-center justify-between shadow-md hover:shadow-purple-950/40 disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                Inject Edge-Case Crash
              </div>
              <div className="text-[10px] text-slate-400">Trigger unhandled edge case</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-400/50 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
