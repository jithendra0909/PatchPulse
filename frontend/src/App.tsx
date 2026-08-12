import { useState } from 'react';
import { Header } from './components/layout/Header';
import { FooterBar } from './components/layout/FooterBar';
import { StudioPage } from './pages/StudioPage';
import { VaultPage } from './pages/VaultPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'vault' | 'settings'>('studio');

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

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
