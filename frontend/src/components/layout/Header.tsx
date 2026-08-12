import React from 'react';
import { Zap, Command } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'vault' | 'settings';
  setActiveTab: (tab: 'studio' | 'vault' | 'settings') => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCommandPalette,
}) => {
  return (
    <header className="h-16 bg-[#0B0D14] border-b border-[#1E2333] px-5 flex items-center justify-between select-none sticky top-0 z-50">
      {/* Left Branding */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                PatchPulse
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              The Autonomous Self-Healing Platform for Broken APIs
            </p>
          </div>
        </div>

        {/* System Health Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-[#121624] border border-[#1E2438] px-3 py-1.5 rounded-full text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-white font-semibold">System Active</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">3 Microservices Guarded</span>
        </div>
      </div>

      {/* Center Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full bg-[#121624] hover:bg-[#181D30] border border-[#1E2438] hover:border-[#2A324B] text-slate-400 px-3.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all group cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Command className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="group-hover:text-slate-300">Command Palette...</span>
          </div>
          <kbd className="bg-[#1A2035] border border-[#27304B] text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right Navigation Tabs & User */}
      <div className="flex items-center space-x-4">
        <nav className="flex items-center space-x-1 bg-[#121624] p-1 rounded-lg border border-[#1E2438]">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'studio'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#1A2033]'
            }`}
          >
            1. STUDIO
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#1A2033]'
            }`}
          >
            2. VAULT
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#1A2033]'
            }`}
          >
            3. SETTINGS
          </button>
        </nav>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 overflow-hidden flex items-center justify-center text-white font-bold text-xs shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
