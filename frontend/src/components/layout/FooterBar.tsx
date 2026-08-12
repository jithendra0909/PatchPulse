import React from 'react';
import { Clock, BarChart2, CheckCircle2, ChevronRight } from 'lucide-react';

export const FooterBar: React.FC = () => {
  return (
    <footer className="h-9 bg-[#090B10] border-t border-[#1E2333] px-4 flex items-center justify-between text-xs text-slate-400 font-mono select-none sticky bottom-0 z-40">
      <div className="flex items-center space-x-6">
        {/* System Status */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300 font-sans font-medium text-[11px]">System Status:</span>
          <span className="text-emerald-400 font-semibold text-[11px]">All Systems Operational</span>
        </div>

        <span className="text-slate-700">|</span>

        {/* Uptime */}
        <div className="flex items-center space-x-1.5 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">Uptime:</span>
          <span className="text-slate-200 font-bold">7d 14h 32m</span>
        </div>

        <span className="text-slate-700">|</span>

        {/* MTTR */}
        <div className="flex items-center space-x-1.5 text-[11px]">
          <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">MTTR (avg):</span>
          <span className="text-cyan-400 font-bold">8.4s</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-[11px]">
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Last Incident Healed:</span>
          <span className="text-slate-200 font-medium">2m 13s ago</span>
        </div>

        <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors font-sans text-xs cursor-pointer">
          <span>View Timeline</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
