import { useState } from 'react';
import { Header } from './components/layout/Header';
import { FooterBar } from './components/layout/FooterBar';
import { StudioPage } from './pages/StudioPage';
import { VaultPage } from './pages/VaultPage';
import { SettingsPage } from './pages/SettingsPage';
import { CommandPalette } from './components/CommandPalette';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'vault' | 'settings'>('studio');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSelectDemoMode={() => setIsDemoMode(true)}
        onConnectRepository={(_repo) => {
          setIsDemoMode(false);
          alert('🚀 Service connected and baseline verified!');
        }}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Demo Mode Notification Banner */}
      {isDemoMode && (
        <div className="bg-[#101422] border-b border-amber-500/30 px-4 py-1.5 text-xs flex items-center justify-between text-amber-300 font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold">⚡ DEMO MODE ACTIVE</span>
            <span className="text-slate-400">| Guarding Bundled Demo Microservice (jithendra0909/PatchPulse)</span>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="text-cyan-400 hover:underline font-semibold cursor-pointer"
          >
            Connect Own GitHub Repo →
          </button>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1">
        {activeTab === 'studio' && <StudioPage />}
        {activeTab === 'vault' && <VaultPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      {/* Global Footer */}
      <FooterBar />
    </div>
  );
}

export default App;
