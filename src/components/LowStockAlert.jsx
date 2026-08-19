import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function LowStockAlert() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-amber-400 w-5 h-5" />
        <h3 className="text-lg font-bold text-white">Low Stock Warning (স্টক অ্যালার্ট)</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 flex justify-between items-center">
          <div>
            <div className="font-bold text-white">ITC Exxact (75 GSM)</div>
            <div className="text-xs text-slate-400">অবশিষ্ট স্টক: মাত্র ১৫ কার্টন</div>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20">
            Re-order Soon
          </span>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-white">IK Copy (80 GSM)</div>
            <div className="text-xs text-slate-400">অবশিষ্ট স্টক: ২৫ কার্টন</div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg">
            Sufficient
          </span>
        </div>
      </div>
    </div>
  );
}