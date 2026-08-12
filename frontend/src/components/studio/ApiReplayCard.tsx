import React from 'react';
import { ArrowRight, Copy, RotateCw } from 'lucide-react';

interface ApiReplayCardProps {
  endpoint?: string;
  beforeStatus?: number;
  beforeTime?: string;
  afterStatus?: number;
  afterTime?: string;
  payloadStr?: string;
}

export const ApiReplayCard: React.FC<ApiReplayCardProps> = ({
  endpoint = 'POST /checkout',
  beforeStatus = 500,
  beforeTime = '2.34s',
  afterStatus = 200,
  afterTime = '213ms',
  payloadStr = '{ user_id: 1, amount: 1000, currency: "USD" }',
}) => {
  return (
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-3 flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
          <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider">API Replay (Original Failed Request)</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center my-1">
        {/* BEFORE BOX */}
        <div className="bg-red-950/30 border border-red-500/40 rounded-lg p-2.5 text-center flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-red-400 tracking-wide mb-1">
            BEFORE (Failed)
          </span>
          <div className="text-2xl font-black text-red-500 font-mono tracking-tight">
            {beforeStatus}
          </div>
          <span className="text-[10px] text-red-300 font-medium">Internal Server Error</span>
          <span className="text-[10px] text-slate-500 font-mono mt-1">Time: {beforeTime}</span>
        </div>

        <div className="flex justify-center text-slate-500">
          <ArrowRight className="w-5 h-5 text-slate-400" />
        </div>

        {/* AFTER BOX */}
        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-lg p-2.5 text-center flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wide mb-1">
            AFTER (Replayed)
          </span>
          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
            {afterStatus}
          </div>
          <span className="text-[10px] text-emerald-300 font-medium">OK</span>
          <span className="text-[10px] text-slate-500 font-mono mt-1">Time: {afterTime}</span>
        </div>
      </div>

      <div className="mt-2 bg-[#121624] border border-[#1E2438] rounded px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="truncate mr-2">
          <span className="text-slate-500 font-sans">Endpoint:</span>{' '}
          <span className="text-cyan-400 font-bold">{endpoint}</span>
          <span className="mx-2 text-slate-600">|</span>
          <span className="text-slate-500 font-sans">Payload:</span>{' '}
          <span className="text-slate-300 truncate">{payloadStr}</span>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
