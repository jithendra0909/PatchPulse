import React from 'react';
import { FileCode, ExternalLink, MoreVertical, Info } from 'lucide-react';

interface CodeDiffViewerProps {
  filePath?: string;
  deletionsCount?: number;
  additionsCount?: number;
  unchangedCount?: number;
  linesChangedCount?: number;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({
  filePath = 'services/checkout_controller.py',
  deletionsCount = 2,
  additionsCount = 6,
  unchangedCount = 0,
  linesChangedCount = 8,
}) => {
  return (
    <div className="bg-[#0B0D14] border border-[#1E2333] rounded-lg overflow-hidden flex flex-col h-full shadow-xl">
      {/* Header Bar */}
      <div className="bg-[#121624] border-b border-[#1E2333] px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Python Icon badge */}
          <div className="w-5 h-5 rounded bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <FileCode className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-200">{filePath}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1.5 bg-[#1A2035] hover:bg-[#222B48] border border-[#283250] text-cyan-400 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors">
            <ExternalLink className="w-3 h-3" />
            <span>Open in VS Code</span>
          </button>
          <button className="text-slate-400 hover:text-white p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side-by-Side Column Headers */}
      <div className="grid grid-cols-2 bg-[#0F121C] border-b border-[#1E2333] text-[11px] font-mono font-bold">
        <div className="px-4 py-1.5 text-red-400 bg-red-950/20 border-r border-[#1E2333]">
          BEFORE (Broken Code)
        </div>
        <div className="px-4 py-1.5 text-emerald-400 bg-emerald-950/20">
          AFTER (Patched Code)
        </div>
      </div>

      {/* Code Display Area (Scrollable Side-by-Side) */}
      <div className="flex-1 overflow-auto font-mono text-[11px] leading-relaxed bg-[#08090C] divide-x divide-[#1E2333] grid grid-cols-2">
        {/* BEFORE COLUMN */}
        <div className="py-2">
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">87</span>
            <span className="text-slate-300">
              <span className="text-purple-400">def</span> <span className="text-blue-400">process_payment</span>(payload):
            </span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">88</span>
            <span className="text-slate-500 italic">    """Process payment for the order"""</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">89</span>
            <span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">90</span>
            <span className="text-slate-300">    user_id = payload.get(<span className="text-emerald-300">"user_id"</span>)</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">91</span>
            <span className="text-slate-300">    amount = payload.get(<span className="text-emerald-300">"amount"</span>)</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">92</span>
            <span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">93</span>
            <span className="text-slate-300">    user = db.query(User).filter(</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">94</span>
            <span className="text-slate-300">        User.id == user_id</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">95</span>
            <span className="text-slate-300">    ).first()</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">96</span>
            <span></span>
          </div>

          {/* DELETED LINES (Red Highlighted) */}
          <div className="flex px-2 py-0.5 bg-red-950/40 text-red-200 border-l-2 border-red-500">
            <span className="w-8 text-right pr-3 select-none text-red-400/60">96</span>
            <span className="pr-2 text-red-400 select-none">-</span>
            <span>    <span className="text-purple-300">if</span> user.status != <span className="text-emerald-300">"active"</span>:</span>
          </div>
          <div className="flex px-2 py-0.5 bg-red-950/40 text-red-200 border-l-2 border-red-500">
            <span className="w-8 text-right pr-3 select-none text-red-400/60">97</span>
            <span className="pr-2 text-red-400 select-none">-</span>
            <span>        <span className="text-purple-300">raise</span> <span className="text-amber-300">Exception</span>(<span className="text-emerald-300">"User inactive"</span>)</span>
          </div>

          <div className="flex px-2 py-0.5 text-slate-500 mt-2">
            <span className="w-8 text-right pr-3 select-none text-slate-600">98</span>
            <span className="text-slate-300">    payment = Payment(</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">99</span>
            <span className="text-slate-300">        user_id=user_id,</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">100</span>
            <span className="text-slate-300">        amount=amount,</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">101</span>
            <span className="text-slate-300">        status=<span className="text-emerald-300">"INITIATED"</span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">102</span>
            <span className="text-slate-300">    )</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">103</span>
            <span className="text-slate-300">    db.add(payment)</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">104</span>
            <span className="text-slate-300">    db.commit()</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">105</span>
            <span className="text-slate-300">    <span className="text-purple-400">return</span> &#123;<span className="text-emerald-300">"status"</span>: <span className="text-emerald-300">"success"</span>, <span className="text-emerald-300">"id"</span>: payment.id&#125;</span>
          </div>
        </div>

        {/* AFTER COLUMN */}
        <div className="py-2">
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">87</span>
            <span className="text-slate-300">
              <span className="text-purple-400">def</span> <span className="text-blue-400">process_payment</span>(payload=<span className="text-amber-400">None</span>):
            </span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">88</span>
            <span className="text-slate-500 italic">    """Process payment for the order"""</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">89</span>
            <span></span>
          </div>

          {/* ADDED LINES (Green Highlighted) */}
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">90</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>    <span className="text-purple-300">if not</span> payload:</span>
          </div>
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">91</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>        <span className="text-purple-300">return</span> &#123;<span className="text-emerald-300">"error"</span>: <span className="text-emerald-300">"Invalid payload"</span>&#125;</span>
          </div>

          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">92</span>
            <span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">93</span>
            <span className="text-slate-300">    user_id = payload.get(<span className="text-emerald-300">"user_id"</span>)</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">94</span>
            <span className="text-slate-300">    amount = payload.get(<span className="text-emerald-300">"amount"</span>)</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">95</span>
            <span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">96</span>
            <span className="text-slate-300">    user = db.query(User).filter(</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">97</span>
            <span className="text-slate-300">        User.id == user_id</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">98</span>
            <span className="text-slate-300">    ).first()</span>
          </div>

          {/* MORE ADDED LINES (Green Highlighted) */}
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">99</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>    <span className="text-purple-300">if not</span> user:</span>
          </div>
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">100</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>        <span className="text-purple-300">return</span> &#123;<span className="text-emerald-300">"error"</span>: <span className="text-emerald-300">"User not found"</span>&#125;</span>
          </div>
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">101</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>    <span className="text-purple-300">if</span> user.status != <span className="text-emerald-300">"active"</span>:</span>
          </div>
          <div className="flex px-2 py-0.5 bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500">
            <span className="w-8 text-right pr-3 select-none text-emerald-400/60">102</span>
            <span className="pr-2 text-emerald-400 select-none">+</span>
            <span>        <span className="text-purple-300">return</span> &#123;<span className="text-emerald-300">"error"</span>: <span className="text-emerald-300">"User inactive"</span>&#125;</span>
          </div>

          <div className="flex px-2 py-0.5 text-slate-500 mt-2">
            <span className="w-8 text-right pr-3 select-none text-slate-600">103</span>
            <span className="text-slate-300">    payment = Payment(</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">104</span>
            <span className="text-slate-300">        user_id=user_id,</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">105</span>
            <span className="text-slate-300">        amount=amount,</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">106</span>
            <span className="text-slate-300">        status=<span className="text-emerald-300">"INITIATED"</span></span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">107</span>
            <span className="text-slate-300">    )</span>
          </div>
          <div className="flex px-2 py-0.5 text-slate-500">
            <span className="w-8 text-right pr-3 select-none text-slate-600">108</span>
            <span className="text-slate-300">    db.add(payment)</span>
          </div>
        </div>
      </div>

      {/* Footer Diff Stats Bar */}
      <div className="bg-[#121624] border-t border-[#1E2333] px-3.5 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-red-400 font-bold">- {deletionsCount} deletions</span>
          <span className="text-emerald-400 font-bold">+ {additionsCount} additions</span>
          <span className="text-slate-500">{unchangedCount} unchanged</span>
        </div>
        <div className="flex items-center space-x-1 text-slate-400">
          <span>Lines changed: {linesChangedCount}</span>
          <Info className="w-3.5 h-3.5 text-slate-500 ml-1" />
        </div>
      </div>
    </div>
  );
};
