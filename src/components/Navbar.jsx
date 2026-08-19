import React from 'react';
import { ShoppingBag, LayoutDashboard } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
            P
          </div>
          <div>
            <span className="font-black text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              PAPERFLOW <span className="text-indigo-400">AI</span>
            </span>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">Paper Reselling Portal</div>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('order')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'order'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> নতুন অর্ডার
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'admin'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
          </button>
        </div>
      </div>
    </nav>
  );
}