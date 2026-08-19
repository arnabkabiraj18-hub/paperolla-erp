import React from 'react';
import { Bell } from 'lucide-react';

export default function DueReminder() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-white">সাপ্তাহিক বাকি নোটিফিকেশন</h3>
        </div>
        <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold">Auto-Sync</span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-white">রয়্যাল স্টেশনার্স</div>
            <div className="text-xs text-slate-400">বাকি: ₹৬,৫০০ • ৭ দিন ধরে পেন্ডিং</div>
          </div>
          <button 
            onClick={() => alert('WhatsApp রিমাইন্ডার পাঠানো হয়েছে!')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
          >
            Send WhatsApp
          </button>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <div className="font-bold text-white">গুপ্তা জেরক্স সেন্টার</div>
            <div className="text-xs text-slate-400">বাকি: ₹৫,৯০০ • ৩ দিন ধরে পেন্ডিং</div>
          </div>
          <button 
            onClick={() => alert('WhatsApp রিমাইন্ডার পাঠানো হয়েছে!')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
          >
            Send WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}