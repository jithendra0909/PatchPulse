import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  AlertTriangle,
  Settings as SettingsIcon,
  Zap,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (tab: 'studio' | 'vault' | 'settings') => void;
  onInjectFault?: (type: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onInjectFault,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'studio',
      title: 'Go to 1. STUDIO Page',
      subtitle: 'Main live telemetry command center',
      icon: LayoutDashboard,
      action: () => { onNavigate?.('studio'); onClose(); },
    },
    {
      id: 'vault',
      title: 'Go to 2. VAULT Page',
      subtitle: 'Incident history & system analytics',
      icon: AlertTriangle,
      action: () => { onNavigate?.('vault'); onClose(); },
    },
    {
      id: 'settings',
      title: 'Go to 3. SETTINGS Page',
      subtitle: 'Cluster, LLM & Microservice configuration',
      icon: SettingsIcon,
      action: () => { onNavigate?.('settings'); onClose(); },
    },
    {
      id: 'schema_drift',
      title: 'Inject Schema Drift Fault',
      subtitle: 'Trigger missing payload key error',
      icon: Zap,
      action: () => { onInjectFault?.('schema_drift'); onClose(); },
    },
    {
      id: 'null_pointer',
      title: 'Inject Null Pointer Fault',
      subtitle: 'Trigger unhandled null reference',
      icon: Zap,
      action: () => { onInjectFault?.('null_pointer'); onClose(); },
    },
    {
      id: 'type_mismatch',
      title: 'Inject Type Mismatch Fault',
      subtitle: 'Trigger string/int validation crash',
      icon: Zap,
      action: () => { onInjectFault?.('type_mismatch'); onClose(); },
    },
    {
      id: 'create_pr',
      title: 'Approve & Create GitHub PR',
      subtitle: 'Open live Pull Request on GitHub repository',
      icon: CheckCircle2,
      action: () => {
        alert('🚀 Creating Pull Request #104 on branch auto-fix/checkout-null...');
        onClose();
      },
    },
  ];

  const filtered = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div className="bg-[#0B0D14] border border-[#1E2438] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Input Bar */}
        <div className="p-3 border-b border-[#1E2438] flex items-center space-x-3 bg-[#111422]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search (e.g. Studio, Vault, Schema Drift)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands found
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-[#151928] group transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#151928] group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 font-mono">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400">
                    ↵ Select
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-2 bg-[#08090C] border-t border-[#1E2438] flex items-center justify-between text-[10px] text-slate-500 font-mono px-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>PatchPulse Command Palette</span>
          </div>
          <div>Press <kbd className="px-1.5 py-0.5 bg-[#151928] rounded border border-[#252B3E] text-slate-300">ESC</kbd> to exit</div>
        </div>
      </div>
    </div>
  );
};
