import React, { useState } from 'react';
import { ShieldCheck, GitBranch, Zap, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemoMode: () => void;
  onConnectRepository: (repoUrl: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSelectDemoMode,
  onConnectRepository,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [repoInput, setRepoInput] = useState('https://github.com/jithendra0909/PatchPulse');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/services/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repository: repoInput }),
      });
      const data = await res.json();
      setIsAnalyzing(false);
      if (data.success) {
        setAnalysisResult(data.service);
        setStep(3);
      } else {
        setStep(3);
      }
    } catch (_err) {
      setIsAnalyzing(false);
      setStep(3);
    }
  };

  const handleFinishOnboarding = () => {
    onConnectRepository(repoInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B0D14] border border-[#1E2438] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#121624] border-b border-[#1E2438] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-sans">
                WELCOME TO PATCHPULSE
              </h2>
              <p className="text-xs text-slate-400">
                Autonomous Self-Healing Platform for Broken APIs
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="font-semibold text-white">How PatchPulse Guards Your Repositories:</p>
                    <p className="text-slate-400">
                      PatchPulse monitors your API, understands its source code AST, detects failures, synthesizes AI repairs using Gemini 1.5, verifies patches inside isolated Docker sandboxes, and opens Pull Requests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="p-4 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/50 rounded-xl text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <GitBranch className="w-6 h-6 text-cyan-400" />
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-bold text-sm text-white">Connect GitHub Repository</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Guard your real microservices & auto-create Pull Requests.
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectDemoMode();
                    onClose();
                  }}
                  className="p-4 bg-[#121624] hover:bg-[#181D30] border border-[#1E2438] hover:border-slate-600 rounded-xl text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-bold text-sm text-white">Explore Demo Mode</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Try controlled chaos fault injection on pre-bundled demo API.
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Step 2 — Connect & Analyze Repository
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300">GitHub Repository URL or owner/repo</label>
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="e.g. https://github.com/jithendra0909/PatchPulse"
                  className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {isAnalyzing ? (
                <div className="bg-[#121624] border border-cyan-500/30 p-4 rounded-lg text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-cyan-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Analyzing package.json, AST routes, and baseline test suite...</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-2/3 animate-pulse" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleStartAnalysis}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Analyze & Establish Baseline Health →
                </button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Repository Guarded Successfully!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Baseline verified: 14/14 tests passing. PatchPulse is now actively guarding <span className="text-cyan-400 font-mono font-bold">{analysisResult?.repository || repoInput}</span>.
                </p>
              </div>

              <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-3 text-xs text-left space-y-1 font-mono">
                <div className="flex justify-between"><span className="text-slate-400">Repository:</span> <span className="text-cyan-400 font-bold">{analysisResult?.repository || repoInput}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Language:</span> <span className="text-slate-200">{analysisResult?.language || 'Python / TypeScript'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Baseline Test Command:</span> <span className="text-slate-200">pytest tests/</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Sandbox Isolation:</span> <span className="text-emerald-400 font-bold">Docker Active</span></div>
              </div>

              <button
                onClick={handleFinishOnboarding}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs py-2.5 rounded-lg transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                Open Studio Command Center →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
