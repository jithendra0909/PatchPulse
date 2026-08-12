import React from 'react';
import { Trash2, Maximize2, Box } from 'lucide-react';

interface TerminalPanelProps {
  logs?: string[];
  passedCount?: number;
  totalDuration?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  passedCount = 14,
  totalDuration = '0.42s',
}) => {
  const defaultLogs = [
    '$ pytest tests/test_checkout.py -q --disable-warnings',
    '============================= test session starts =============================',
    'platform linux -- Python 3.11.7, pytest-7.4.4, pluggy-1.3.0',
    'rootdir: /app',
    'collected 14 items',
    '',
    'tests/test_checkout.py::test_null_payload                    PASSED [100%]',
    'tests/test_checkout.py::test_invalid_user                    PASSED [100%]',
    'tests/test_checkout.py::test_user_not_found                  PASSED [100%]',
    'tests/test_checkout.py::test_inactive_user                   PASSED [100%]',
    'tests/test_checkout.py::test_successful_payment              PASSED [100%]',
    'tests/test_checkout.py::test_amount_validation              PASSED [100%]',
    'tests/test_checkout.py::test_payment_recorded               PASSED [100%]',
    'tests/test_checkout.py::test_currency_validation             PASSED [100%]',
    'tests/test_checkout.py::test_schema_drift                    PASSED [100%]',
    'tests/test_checkout.py::test_edge_case_large_amount          PASSED [100%]',
    '...',
    '',
    `======================== ${passedCount} passed in ${totalDuration} ========================`,
  ];

  return (
    <div className="bg-[#0B0D14] border border-[#1E2333] rounded-lg overflow-hidden flex flex-col h-full shadow-xl">
      <div className="bg-[#121624] border-b border-[#1E2333] px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Box className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            SANDBOX: DOCKER SUBPROCESS
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            (pytest tests/)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#06070A] p-3 font-mono text-[11px] text-slate-300 overflow-auto space-y-1 select-text">
        {defaultLogs.map((log, index) => {
          if (log.startsWith('$')) {
            return (
              <div key={index} className="text-cyan-400 font-bold flex items-center space-x-1">
                <span>{log}</span>
              </div>
            );
          }
          if (log.includes('PASSED')) {
            const [testName, result] = log.split('PASSED');
            return (
              <div key={index} className="flex justify-between items-center py-0.5">
                <span className="text-slate-300">{testName}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">PASSED</span>
                  <span className="text-emerald-400/70">{result}</span>
                </div>
              </div>
            );
          }
          if (log.includes('passed in')) {
            return (
              <div key={index} className="text-emerald-400 font-bold text-center py-2 border-t border-b border-emerald-500/20 my-2">
                {log}
              </div>
            );
          }
          return (
            <div key={index} className="text-slate-400">
              {log}
            </div>
          );
        })}
      </div>
    </div>
  );
};
