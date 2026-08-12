import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { FooterBar } from './components/layout/FooterBar';
import { StudioPage } from './pages/StudioPage';
import { VaultPage } from './pages/VaultPage';
import { SettingsPage } from './pages/SettingsPage';
import { CommandPalette } from './components/CommandPalette';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { api } from './services/api/client';

export function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'vault' | 'settings'>('studio');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [backendHealth, setBackendHealth] = useState<any>(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const data = await api.getHealth();
      setBackendHealth(data);
    } catch (_err) {
      setBackendHealth({ status: 'error', message: 'Backend Disconnected' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSelectDemoMode={() => setIsOnboardingOpen(false)}
        onConnectRepository={async (repo) => {
          try {
            await api.connectRepository(repo);
            checkHealth();
          } catch (_e) {}
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

      {/* Real Backend Connection Status Pill */}
      {backendHealth?.status === 'error' && (
        <div className="bg-red-950/80 border-b border-red-500/50 px-4 py-2 text-xs flex items-center justify-between text-red-300 font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">⚠️ BACKEND DISCONNECTED</span>
            <span>— Unable to establish HTTP/Socket connection to PatchPulse Engine</span>
          </div>
          <button
            onClick={checkHealth}
            className="bg-red-500 hover:bg-red-400 text-white font-bold px-3 py-1 rounded cursor-pointer"
          >
            Retry Connection
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
