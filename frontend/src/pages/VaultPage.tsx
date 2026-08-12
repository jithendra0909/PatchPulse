import React, { useState } from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Server,
  Layers,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  X,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const chartData = [
  { time: 'May 17', traffic: 900, errors: 300, resolved: 280 },
  { time: 'May 18', traffic: 1100, errors: 450, resolved: 430 },
  { time: 'May 19', traffic: 950, errors: 320, resolved: 310 },
  { time: 'May 20', traffic: 1300, errors: 520, resolved: 500 },
  { time: 'May 21', traffic: 1050, errors: 380, resolved: 370 },
  { time: 'May 22', traffic: 1250, errors: 490, resolved: 475 },
  { time: 'May 23', traffic: 1000, errors: 340, resolved: 330 },
  { time: 'May 24', traffic: 1400, errors: 550, resolved: 540 },
];

const incidentsList = [
  { id: '#INC-94', time: '2 mins ago', service: 'Payment Service', endpoint: 'POST /checkout', error: 'SchemaDriftKeyError', mttr: '6.4s', status: 'Healed', pr: 'PR #104' },
  { id: '#INC-93', time: '1 hour ago', service: 'User Service', endpoint: 'GET /user/profile', error: 'NullPointerExpression', mttr: '7.1s', status: 'Healed', pr: 'PR #103' },
  { id: '#INC-92', time: '3 hours ago', service: 'Order Service', endpoint: 'POST /orders', error: 'TypeMismatchError', mttr: '8.3s', status: 'Healed', pr: 'PR #102' },
  { id: '#INC-91', time: '5 hours ago', service: 'Inventory Service', endpoint: 'GET /inventory', error: 'DatabaseTimeoutError', mttr: '9.2s', status: 'Healed', pr: 'PR #101' },
  { id: '#INC-90', time: 'Yesterday', service: 'Auth Service', endpoint: 'POST /login', error: 'InvalidTokenError', mttr: '5.6s', status: 'Healed', pr: 'PR #100' },
  { id: '#INC-89', time: '2 days ago', service: 'Catalog Service', endpoint: 'GET /products', error: 'KeyError', mttr: '6.9s', status: 'Healed', pr: 'PR #099' },
  { id: '#INC-88', time: '3 days ago', service: 'Payment Service', endpoint: 'POST /refund', error: 'ValueError', mttr: '7.4s', status: 'Healed', pr: 'PR #098' },
  { id: '#INC-87', time: '3 days ago', service: 'Notification Service', endpoint: 'POST /notify', error: 'ConnectionRefusedError', mttr: '11.2s', status: 'Partially Healed', pr: 'PR #097' },
];

export const VaultPage: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<typeof incidentsList[0] | null>(incidentsList[0]);
  const [searchQuery, setSearchQuery] = useState('');

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
                <span>Incidents</span>
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

          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              Analysis
            </div>
            <nav className="space-y-1 text-xs text-slate-400">
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Error Signatures</button>
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Root Causes</button>
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Trends</button>
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">MTTR Analysis</button>
            </nav>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              Reports
            </div>
            <nav className="space-y-1 text-xs text-slate-400">
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Daily Reports</button>
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Weekly Reports</button>
              <button className="w-full text-left px-3 py-1.5 hover:text-slate-200 cursor-pointer">Export Data</button>
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
            📈 ~~~~~~~~~~~~ 99.9%
          </div>

          <div className="space-y-1 text-[10px] text-slate-400 font-mono">
            <div className="flex justify-between"><span>Uptime:</span> <span className="text-slate-200">7d 14h 32m</span></div>
            <div className="flex justify-between"><span>Incidents Healed:</span> <span className="text-emerald-400">142</span></div>
            <div className="flex justify-between"><span>MTTR (avg):</span> <span className="text-cyan-400">6.8s</span></div>
          </div>

          <button className="w-full mt-3 text-cyan-400 text-[10px] font-semibold hover:underline flex items-center justify-center cursor-pointer">
            <span>View System Status</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
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
              <span>May 17 - May 24, 2025</span>
            </div>
            <select className="bg-[#121624] border border-[#1E2438] text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer">
              <option>All Services</option>
              <option>Payment Service</option>
              <option>User Service</option>
            </select>
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
              <div className="text-2xl font-black text-white font-mono tracking-tight">98.4%</div>
              <div className="text-xs text-slate-400 font-medium">Auto-Healed Success Rate</div>
            </div>
            <div className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 3.2% vs last 7 days</span>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">6.8s</div>
              <div className="text-xs text-slate-400 font-medium">Average MTTR</div>
            </div>
            <div className="mt-2 text-[10px] text-cyan-400 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 rotate-180" />
              <span>↓ 87% vs human (45m)</span>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">142</div>
              <div className="text-xs text-slate-400 font-medium">Total Incidents Resolved</div>
            </div>
            <div className="mt-2 text-[10px] text-purple-400 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 18 vs last 7 days</span>
            </div>
          </div>

          <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">185.5</div>
              <div className="text-xs text-slate-400 font-medium">Engineering Hours Saved</div>
            </div>
            <div className="mt-2 text-[10px] text-amber-400 font-semibold flex items-center space-x-1">
              <span>↑ $22,260 in dev time</span>
            </div>
          </div>
        </div>

        {/* System Traffic & Repair Area Chart */}
        <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                System Traffic & Repair Over Time
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /><span className="text-slate-400">API Traffic</span></div>
              <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-slate-400">Intercepted Errors</span></div>
              <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-slate-400">Resolved Patches</span></div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#121624', borderColor: '#1E2438', fontSize: '11px' }} />
                <Area type="monotone" dataKey="traffic" stroke="#00F0FF" fillOpacity={1} fill="url(#cyanGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="errors" stroke="#EF4444" fillOpacity={1} fill="url(#redGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="#10B981" fillOpacity={1} fill="url(#greenGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Searchable Incident Audit Table */}
        <div className="bg-[#0D0F17] border border-[#1E2333] rounded-lg overflow-hidden shadow-lg">
          <div className="p-3 border-b border-[#1E2333] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121624] border border-[#1E2438] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto text-xs">
              <select className="bg-[#121624] border border-[#1E2438] text-slate-300 px-2.5 py-1.5 rounded-lg cursor-pointer">
                <option>All Status</option>
                <option>Healed</option>
                <option>Partially Healed</option>
              </select>
              <select className="bg-[#121624] border border-[#1E2438] text-slate-300 px-2.5 py-1.5 rounded-lg cursor-pointer">
                <option>All Error Types</option>
                <option>SchemaDriftKeyError</option>
                <option>NullPointerExpression</option>
              </select>
              <button className="flex items-center space-x-1.5 bg-[#121624] border border-[#1E2438] px-3 py-1.5 rounded-lg text-slate-300 hover:text-white cursor-pointer">
                <Filter className="w-3.5 h-3.5" />
                <span>Advanced Filters</span>
              </button>
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
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2333]">
                {incidentsList.map((inc) => (
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
                    <td className="p-3 text-right">
                      <button className="text-slate-500 hover:text-slate-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Right Slide-over Autopsy Drawer */}
      {selectedIncident && (
        <aside className="w-96 bg-[#0D0F17] border-l border-[#1E2333] p-5 flex flex-col justify-between shrink-0 shadow-2xl overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-[#1E2333] pb-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white font-mono">{selectedIncident.id}</h2>
                  <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Healed
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-[#1E2333] mb-4 text-xs font-semibold text-slate-400 space-x-4">
              <button className="text-cyan-400 border-b-2 border-cyan-400 pb-2 cursor-pointer">Autopsy</button>
              <button className="hover:text-white pb-2 cursor-pointer">Diff</button>
              <button className="hover:text-white pb-2 cursor-pointer">Tests</button>
              <button className="hover:text-white pb-2 cursor-pointer">Logs</button>
              <button className="hover:text-white pb-2 cursor-pointer">Metadata</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                  Incident Summary
                </div>
                <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-3 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between"><span className="text-slate-400">Endpoint</span><span className="text-cyan-400 font-bold">{selectedIncident.endpoint}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Service</span><span className="text-slate-200">{selectedIncident.service}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Error Type</span><span className="text-red-400">{selectedIncident.error}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Detected At</span><span className="text-slate-300">May 24, 2025 10:24:31 AM</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">MTTR</span><span className="text-emerald-400 font-bold">{selectedIncident.mttr}</span></div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                  Error Summary
                </div>
                <div className="bg-red-950/30 border border-red-500/40 rounded-lg p-3 font-mono text-[11px] text-red-300">
                  <div className="font-bold text-red-400 mb-1">500 Internal Server Error</div>
                  <div>Key 'amount' not found in request payload at checkout_controller.py:42</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                  Root Cause (AI Analysis)
                </div>
                <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-3 text-slate-300 text-xs">
                  Schema drift detected. Field 'amount' was missing in payload validation.
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                  API Replay Result
                </div>
                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="bg-red-950/30 border border-red-500/40 p-2 rounded">
                    <span className="text-[10px] text-red-400 block">BEFORE (Failed)</span>
                    <span className="text-lg font-bold text-red-500">500</span>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-500/40 p-2 rounded">
                    <span className="text-[10px] text-emerald-400 block">AFTER (Replayed)</span>
                    <span className="text-lg font-bold text-emerald-400">200 OK</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                  GitHub PR
                </div>
                <div className="bg-[#121624] border border-[#1E2438] rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-cyan-400">{selectedIncident.pr}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Branch: auto-fix/checkout-null</div>
                  </div>
                  <button className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 cursor-pointer">
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
