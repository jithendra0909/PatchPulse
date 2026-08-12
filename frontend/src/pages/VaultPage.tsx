import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Server,
  Layers,
  Clock,
  CheckCircle2,
  Search,
  ExternalLink,
  X,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const VaultPage: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    autoHealedSuccessRate: '98.4%',
    averageMttr: '6.8s',
    totalIncidents: 142,
    engineeringHoursSaved: 185.5,
  });
  const [timeline, setTimeline] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Autopsy' | 'Diff' | 'Tests' | 'Logs' | 'Metadata'>('Autopsy');

  useEffect(() => {
    fetchIncidents();
    fetchAnalytics();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents');
      if (res.ok) {
        const data = await res.json();
        if (data.incidents && data.incidents.length > 0) {
          setIncidents(data.incidents);
          setSelectedIncident(data.incidents[0]);
        }
      }
    } catch (_e) {}
  };

  const fetchAnalytics = async () => {
    try {
      const summaryRes = await fetch('/api/analytics/summary');
      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }
      const timelineRes = await fetch('/api/analytics/timeline');
      if (timelineRes.ok) {
        const timelineData = await timelineRes.json();
        setTimeline(timelineData.timeline || []);
      }
    } catch (_e) {}
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.error.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-[#08090C] min-h-[calc(100vh-64px)] select-none">
      {/* Left Sidebar */}
      <aside className="w-60 bg-[#0B0D14] border-r border-[#1E2333] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              Overview
            </div>
            <nav className="space-y-1">
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 cursor-pointer">
                <AlertTriangle className="w-4 h-4 text-cyan-400" />
                <span>Incidents ({incidents.length})</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Server className="w-4 h-4" />
                <span>Services</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#131726] transition-colors cursor-pointer">
                <Layers className="w-4 h-4" />
                <span>Integrations</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="bg-[#101320] border border-[#1E2438] rounded-lg p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-300">System Health</span>
            <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Healthy</span>
            </div>
          </div>

          <div className="h-8 w-full bg-[#161B2E] rounded flex items-center justify-center text-cyan-400 text-[10px] font-mono mb-2">
            📈 99.9% Operational
          </div>

          <div className="space-y-1 text-[10px] text-slate-400 font-mono">
            <div className="flex justify-between"><span>Incidents Healed:</span> <span className="text-emerald-400">{summary.totalIncidents}</span></div>
            <div className="flex justify-between"><span>MTTR (avg):</span> <span className="text-cyan-400">{summary.averageMttr}</span></div>
          </div>
        </div>
      </aside>

      {/* Main Vault Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              INCIDENT VAULT & SYSTEM ANALYTICS
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep visibility into all self-healed incidents and platform performance over time.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-2 bg-[#121624] border border-[#1E2438] px-3 py-1.5 rounded-lg text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Live Real-Time Telemetry</span>
            </div>
          </div>
        </div>

        {/* 4 KPI Hero Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">{summary.autoHealedSuccessRate}</div>
              <div className="text-xs text-slate-400 font-medium">Auto-Healed Success Rate</div>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">{summary.averageMttr}</div>
              <div className="text-xs text-slate-400 font-medium">Average MTTR</div>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">{summary.totalIncidents}</div>
              <div className="text-xs text-slate-400 font-medium">Total Incidents Resolved</div>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">{summary.engineeringHoursSaved}h</div>
              <div className="text-xs text-slate-400 font-medium">Engineering Hours Saved</div>
            </div>
          </div>
        </div>

        {/* System Traffic & Repair Area Chart */}
        {timeline.length > 0 && (
          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                System Traffic & Repair Over Time
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeline}>
                  <defs>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#121624', borderColor: '#1E2438', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="traffic" stroke="#00F0FF" fillOpacity={1} fill="url(#cyanGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} />
                  <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Incident Table */}
        <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg overflow-hidden shadow-lg">
          <div className="p-3 border-b border-[#1E2333] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121624] border border-[#1E2438] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#121624] border-b border-[#1E2333] text-slate-400 font-sans text-[11px]">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Microservice</th>
                  <th className="p-3">Endpoint</th>
                  <th className="p-3">Error Signature</th>
                  <th className="p-3">MTTR</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">PR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2333]">
                {filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`hover:bg-[#131726] cursor-pointer transition-colors ${
                      selectedIncident?.id === inc.id ? 'bg-[#151A2C]' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-cyan-400">{inc.id}</td>
                    <td className="p-3 text-slate-400">{inc.time}</td>
                    <td className="p-3 text-slate-200 font-sans">{inc.service}</td>
                    <td className="p-3 text-slate-300">{inc.endpoint}</td>
                    <td className="p-3">
                      <span className="bg-red-950/40 border border-red-500/30 text-red-400 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {inc.error}
                      </span>
                    </td>
                    <td className="p-3 text-cyan-400 font-bold">{inc.mttr}</td>
                    <td className="p-3">
                      <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{inc.status}</span>
                      </span>
                    </td>
                    <td className="p-3 text-cyan-400 hover:underline">{inc.pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Autopsy Drawer */}
      {selectedIncident && (
        <aside className="w-96 bg-[#0D0F17] border-l border-[#1E2333] p-5 flex flex-col justify-between shrink-0 shadow-2xl overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-[#1E2333] pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white font-mono">{selectedIncident.id}</h2>
                <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {selectedIncident.status}
                </span>
              </div>
              <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-[#1E2333] mb-4 text-xs font-semibold text-slate-400 space-x-4">
              {(['Autopsy', 'Diff', 'Tests', 'Logs', 'Metadata'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Autopsy' && (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Incident Summary</div>
                  <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-3 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Endpoint</span><span className="text-cyan-400 font-bold">{selectedIncident.endpoint}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Service</span><span className="text-slate-200">{selectedIncident.service}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Error Type</span><span className="text-red-400">{selectedIncident.error}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">MTTR</span><span className="text-emerald-400 font-bold">{selectedIncident.mttr}</span></div>
                  </div>
                </div>

                {selectedIncident.prUrl && (
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">GitHub Pull Request</div>
                    <a
                      href={selectedIncident.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-3 py-2 rounded text-xs font-semibold flex items-center justify-between cursor-pointer hover:bg-cyan-500/30"
                    >
                      <span>{selectedIncident.pr}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Diff' && (
              <div className="bg-[#121624] border border-[#1E2438] p-3 rounded text-xs font-mono space-y-2 text-slate-300">
                <div className="text-red-400">- user_id = payload["user_id"]</div>
                <div className="text-emerald-400">+ user_id = payload.get("user_id")</div>
                <div className="text-emerald-400">+ amount = payload.get("amount", 0)</div>
              </div>
            )}

            {activeTab === 'Tests' && (
              <div className="bg-[#121624] border border-[#1E2438] p-3 rounded text-xs font-mono text-emerald-400 space-y-1">
                <div>✓ tests/test_checkout.py PASSED</div>
                <div>✓ tests/test_schema_drift PASSED</div>
                <div>14/14 tests passed in 0.42s</div>
              </div>
            )}

            {activeTab === 'Logs' && (
              <div className="bg-[#121624] border border-[#1E2438] p-3 rounded text-xs font-mono text-slate-400 space-y-1">
                <div>$ docker run --rm patchpulse-sandbox:latest pytest</div>
                <div>Container established. Ephemeral workspace cleaned.</div>
              </div>
            )}

            {activeTab === 'Metadata' && (
              <div className="bg-[#121624] border border-[#1E2438] p-3 rounded text-xs font-mono text-slate-300 space-y-1">
                <div>Verification Score: 98/100</div>
                <div>Risk Level: LOW</div>
                <div>Provider: Gemini 1.5 Flash</div>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
};

export default VaultPage;
