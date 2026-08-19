import React from 'react';
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';
import LowStockAlert from './LowStockAlert';
import DueReminder from './DueReminder';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 mt-4">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 text-sm font-medium">মোট বিক্রি (Revenue)</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white">₹১,৮৫,০০০</div>
          <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">↑ ১২% বিগত সপ্তাহের থেকে</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 text-sm font-medium">নিট প্রফিট (%)</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white">₹২৮,৫০০</div>
          <span className="text-xs text-blue-400 font-bold mt-2 inline-block">গড় মার্জিন: ১৫.৪%</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 text-sm font-medium">বর্তমান স্টক (Stock)</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Package className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white">৩২০ কার্টন</div>
          <span className="text-xs text-amber-400 font-medium mt-2 inline-block">২টি ব্র্যান্ডের স্টক কম</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 text-sm font-medium">মোট বাকি (Due Amount)</span>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-extrabold text-white">₹১২,৪০০</div>
          <span className="text-xs text-rose-400 font-medium mt-2 inline-block">৩ জন কাস্টমারের বাকি</span>
        </div>
      </div>

      {/* Smart Alerts & Dues Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LowStockAlert />
        <DueReminder />
      </div>
    </div>
  );
}