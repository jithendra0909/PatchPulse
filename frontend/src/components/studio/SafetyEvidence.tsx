import React from 'react';
import { Info, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

interface SafetyEvidenceProps {
  score?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  regressionsCount?: number;
  testsPassed?: number;
  testsTotal?: number;
  filesChanged?: number;
  linesModified?: number;
}

export const SafetyEvidence: React.FC<SafetyEvidenceProps> = ({
  score = 98,
  riskLevel = 'LOW',
  regressionsCount = 0,
  testsPassed = 14,
  testsTotal = 14,
  filesChanged = 1,
  linesModified = 8,
}) => {
  return (
    <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-3 flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase tracking-wider">Evidence Verification Score</span>
          <Info className="w-3 h-3 text-slate-500 cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center my-1">
        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center relative p-1">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="38"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-800"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="38"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - score / 100)}
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-1000 ease-out"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white font-mono tracking-tight">{score}%</span>
            <span className="text-[9px] text-slate-400 font-medium">Verification Score</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 mt-1">Very High Confidence</span>
        </div>

        {/* Right Metrics Stack */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between bg-[#121624] px-2.5 py-1 rounded border border-[#1E2438]">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Risk Level</span>
            </div>
            <span className="font-bold text-emerald-400 text-[11px]">{riskLevel}</span>
          </div>

          <div className="flex items-center justify-between bg-[#121624] px-2.5 py-1 rounded border border-[#1E2438]">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Regressions</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white text-[11px]">{regressionsCount}</span>
              <span className="text-[9px] text-slate-500 block leading-tight">No new failures</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#121624] px-2.5 py-1 rounded border border-[#1E2438]">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tests Passed</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-400 text-[11px]">
                {testsPassed} / {testsTotal}
              </span>
              <span className="text-[9px] text-emerald-500 block leading-tight">All green</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#121624] px-2.5 py-1 rounded border border-[#1E2438]">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Files Changed</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white text-[11px]">{filesChanged} file</span>
              <span className="text-[9px] text-slate-500 block leading-tight">
                {linesModified} lines modified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
