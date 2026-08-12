import React, { useState, useEffect } from 'react';
import { Clock, BarChart2, CheckCircle2, ChevronRight } from 'lucide-react';
import { api } from '../../services/api/client';

export const FooterBar: React.FC = () => {
  const [health, setHealth] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const h = await api.getHealth();
        setHealth(h);
      } catch (_e) {
        setHealth(null);
      }
      try {
        const s = await api.getAnalyticsSummary();
        setSummary(s);
      } catch (_e) {
        setSummary(null);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const isConnected = health?.status === 'ok' || health?.status === 'degraded';

  return (
    <footer className="h-9 bg-[#090B10] border-t border-[#1E2333] px-4 flex items-center justify-between text-xs text-slate-400 font-mono select-none sticky bottom-0 z-40">
      <div className="flex items-center space-x-6">
        {/* System Status */}
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-slate-300 font-sans font-medium text-[11px]">Backend:</span>
          <span className={`font-semibold text-[11px] ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <span className="text-slate-700">|</span>

        {/* Uptime */}
        <div className="flex items-center space-x-1.5 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">Uptime:</span>
          <span className="text-slate-200 font-bold">{formatUptime(health?.uptime)}</span>
        </div>

        <span className="text-slate-700">|</span>

        {/* MTTR */}
        <div className="flex items-center space-x-1.5 text-[11px]">
          <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">MTTR:</span>
          <span className="text-cyan-400 font-bold">{summary?.averageMttr || '0s'}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-[11px]">
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Incidents:</span>
          <span className="text-slate-200 font-medium">{summary?.totalIncidents ?? 0}</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400">DB:</span>
          <span className={`font-medium ${health?.database === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>
            {health?.database === 'connected' ? '● Connected' : '● Disconnected'}
          </span>
        </div>
      </div>
    </footer>
  );
};
