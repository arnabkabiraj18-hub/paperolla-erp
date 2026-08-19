import React from 'react';
import { Receipt, TrendingUp, Sparkles, Check } from 'lucide-react';

export default function PriceSummary({ 
  brand, gsm, currentSell, 
  totalRevenue, totalCost, 
  netProfit, profitMargin 
}) {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700">
          <Receipt className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">লাইভ বিল হিসাব (Price Breakdown)</h3>
          <p className="text-xs text-slate-400">রিয়েল-টাইম মার্জিন ক্যালকুলেশন</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">নির্বাচিত আইটেম</span>
            <span className="font-bold text-indigo-300">{brand} ({gsm})</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">প্রতি কার্টন বিক্রয় মূল্য</span>
            <span className="font-bold text-slate-200">₹{currentSell}</span>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-emerald-950/30 rounded-2xl border border-indigo-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> নিট প্রফিট (Net Profit)
            </span>
            <span className="text-xs font-black px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
              +{profitMargin}% মার্জিন
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-400 tracking-tight">
            ₹{netProfit.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> কেনা দামের ওপর লাভ নিশ্চিত করা হয়েছে
          </div>
        </div>

        <div className="p-5 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/20 flex justify-between items-center">
          <div>
            <div className="text-xs text-indigo-200 font-medium">মোট বিক্রেয় মূল্য (Total Bill)</div>
            <div className="text-2xl font-black">₹{totalRevenue.toLocaleString()}</div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}