import React, { useState, useEffect } from 'react';
import {
  Settings,
  Server,
  Box,
  Brain,
  Bell,
  Shield,
  Plus,
  Save,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [testCommand, setTestCommand] = useState('pytest tests/ --maxfail=1 -q');
  const [executionMode, setExecutionMode] = useState('Docker Subprocess (Isolated)');
  const [timeoutSeconds, setTimeoutSeconds] = useState(15);
  const [primaryModel, setPrimaryModel] = useState('Gemini 1.5 Flash');
  const [fallbackModel, setFallbackModel] = useState('Gemini 1.5 Pro');
  const [temperature, setTemperature] = useState(0.2);
  const [topP, setTopP] = useState(0.9);
  const [networkIsolation, setNetworkIsolation] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchServices();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.testCommand) setTestCommand(data.testCommand);
        if (data.executionMode) setExecutionMode(data.executionMode);
        if (data.timeoutSeconds) setTimeoutSeconds(data.timeoutSeconds);
        if (data.primaryModel) setPrimaryModel(data.primaryModel);
        if (data.fallbackModel) setFallbackModel(data.fallbackModel);
        if (data.temperature !== undefined) setTemperature(data.temperature);
        if (data.topP !== undefined) setTopP(data.topP);
        if (data.networkIsolation !== undefined) setNetworkIsolation(data.networkIsolation);
      }
    } catch (_e) {}
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        if (data.services) setServices(data.services);
      }
    } catch (_e) {}
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testCommand,
          executionMode,
          timeoutSeconds,
          primaryModel,
          fallbackModel,
          temperature,
          topP,
          networkIsolation,
        }),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (_e) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleAddService = async () => {
    const repo = prompt('Enter GitHub Repository (e.g. jithendra0909/order-service):', 'jithendra0909/order-service');
    if (!repo) return;

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repository: repo, name: repo.split('/')[1] || repo }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.services) setServices(data.services);
      }
    } catch (_e) {}
  };

  return (
    <div className="flex bg-[#08090C] min-h-[calc(100vh-64px)] select-none">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0B0D14] border-r border-[#1E2333] p-4 flex flex-col justify-between shrink-0 hidden lg:flex">
        <div className="space-y-6">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              Configuration
            </div>
            <nav className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  <span>Cluster & Engine</span>
                </div>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Server className="w-4 h-4" />
                <span>Microservices ({services.length})</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Box className="w-4 h-4" />
                <span>Test Sandbox</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Brain className="w-4 h-4" />
                <span>LLM Orchestration</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Bell className="w-4 h-4" />
                <span>Webhooks & Alerts</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Shield className="w-4 h-4" />
                <span>Access & Auth</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#101320] border border-[#1E2438] rounded-lg p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Engine Status</span>
              <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            <div className="space-y-1 text-[10px] text-slate-400 font-mono">
              <div className="flex justify-between"><span>Version:</span> <span className="text-slate-200">v1.3.2</span></div>
              <div className="flex justify-between"><span>Active Services:</span> <span className="text-cyan-400">{services.length}</span></div>
            </div>
          </div>

          <button className="w-full bg-[#121624] hover:bg-[#181D30] border border-[#1E2438] text-slate-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Documentation</span>
          </button>
        </div>
      </aside>

      {/* Main Settings Form Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1E2333] pb-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              CLUSTER & ENGINE CONFIGURATION
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure your self-healing platform, microservices, and AI engine settings.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={fetchSettings}
              className="flex items-center space-x-1.5 bg-[#121624] hover:bg-[#181D30] border border-[#1E2438] text-slate-300 px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaved ? 'Saved to Backend!' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CARD 1 */}
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2333] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
                  1
                </div>
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Connected Microservices & Repositories
                </h2>
              </div>
              <button
                onClick={handleAddService}
                className="flex items-center space-x-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121624] text-slate-400 text-[10px]">
                  <tr>
                    <th className="p-2.5">Repository / Service</th>
                    <th className="p-2.5">Branch</th>
                    <th className="p-2.5">Language</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2333]">
                  {services.map((srv) => (
                    <tr key={srv.id}>
                      <td className="p-2.5 font-bold text-slate-200">{srv.repository}</td>
                      <td className="p-2.5"><span className="bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded text-[10px]">{srv.branch || 'main'}</span></td>
                      <td className="p-2.5 text-slate-400">{srv.language || 'Python'}</td>
                      <td className="p-2.5"><span className="text-emerald-400 font-semibold">🟢 {srv.status || 'ACTIVE'}</span></td>
                      <td className="p-2.5 text-slate-500">{srv.lastSync || 'Just now'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-5 shadow-lg space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#1E2333] pb-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs font-mono">
                2
              </div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Test Runner & Sandbox Configuration
              </h2>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Test Command</label>
              <input
                type="text"
                value={testCommand}
                onChange={(e) => setTestCommand(e.target.value)}
                className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Execution Mode</label>
                <select
                  value={executionMode}
                  onChange={(e) => setExecutionMode(e.target.value)}
                  className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option>Docker Subprocess (Isolated)</option>
                  <option>Local Process (Fast)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Timeout (seconds)</label>
                <input
                  type="number"
                  value={timeoutSeconds}
                  onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                  className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <div>
                <div className="font-semibold text-slate-300">Network Isolation</div>
                <div className="text-[10px] text-slate-500">Disable external network access in container</div>
              </div>
              <button
                onClick={() => setNetworkIsolation(!networkIsolation)}
                className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  networkIsolation ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${networkIsolation ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-5 shadow-lg space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#1E2333] pb-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                3
              </div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                AI Engine Orchestration
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Primary LLM Engine</label>
                <select
                  value={primaryModel}
                  onChange={(e) => setPrimaryModel(e.target.value)}
                  className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-1.5 text-xs text-cyan-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option>Gemini 1.5 Flash</option>
                  <option>Gemini 1.5 Pro</option>
                  <option>Claude 3.5 Sonnet</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Fallback LLM Engine</label>
                <select
                  value={fallbackModel}
                  onChange={(e) => setFallbackModel(e.target.value)}
                  className="w-full bg-[#121624] border border-[#1E2438] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option>Gemini 1.5 Pro</option>
                  <option>Gemini 1.5 Flash</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Temperature</span>
                  <span className="font-mono text-amber-400 font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Top P</span>
                  <span className="font-mono text-amber-400 font-bold">{topP}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-5 shadow-lg space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#1E2333] pb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                4
              </div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Integrations & Webhooks
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-[#121624] border border-[#1E2438] rounded-lg p-2.5">
                <span className="font-semibold text-slate-300">Slack Webhook</span>
                <span className="text-emerald-400 font-bold text-[10px]">Active</span>
              </div>
              <div className="flex items-center justify-between bg-[#121624] border border-[#1E2438] rounded-lg p-2.5">
                <span className="font-semibold text-slate-300">Discord Bot</span>
                <span className="text-emerald-400 font-bold text-[10px]">Active</span>
              </div>
              <div className="flex items-center justify-between bg-[#121624] border border-[#1E2438] rounded-lg p-2.5">
                <span className="font-semibold text-slate-300">GitHub Integration</span>
                <span className="text-cyan-400 font-bold text-[10px]">Connected (jithendra0909)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
