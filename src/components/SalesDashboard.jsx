import React, { useState } from 'react';
import { DollarSign, Download, TrendingUp, CreditCard, Banknote, X, Calendar, UserCheck } from 'lucide-react';

export default function SalesDashboard({ marginPercent, setMarginPercent, newCost, handleCostChange, calcPrice }) {
  const [activeModal, setActiveModal] = useState(null); // 'sales' | 'profit' | 'credit' | 'stock'

  // ডেট-ওয়াইজ বিস্তারিত হিসাব ডাটা
  const salesHistory = [
    { id: 'INV-1001', date: '2026-08-07', customer: 'রয়্যাল স্টেশনার্স', item: 'IK Copy Paper (15 Cartons)', amount: 3900, mode: 'Credit (বাকি)', status: 'Pending Due' },
    { id: 'INV-1002', date: '2026-08-06', customer: 'মা তাড়া জেরক্স', item: 'ITC Exxact Premium (10 Cartons)', amount: 2850, mode: 'Online UPI', status: 'Paid Complete' },
    { id: 'INV-1003', date: '2026-08-05', customer: 'ডিজিটাল প্রিন্টিং প্রেস', item: 'Color Xerox Machine', amount: 85000, mode: 'Online Bank Transfer', status: 'Paid Complete' }
  ];

  return (
    <div className="space-y-8">
      
      {/* 💡 Top Clickable Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total Sales Box */}
        <div 
          onClick={() => setActiveModal('sales')}
          className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-amber-400"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Total Revenue (Click for Chart)</span>
            <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">₹৪,৮৫,০০০</div>
          <span className="text-xs text-emerald-600 font-bold mt-2 block">↑ ১৮% সেলস বৃদ্ধি (বিস্তারিত দেখুন →)</span>
        </div>

        {/* Net Profit Box */}
        <div 
          onClick={() => setActiveModal('profit')}
          className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-emerald-400"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Net Profit Margin</span>
            <DollarSign className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">₹৬৪,২০০</div>
          <span className="text-xs text-indigo-600 font-bold mt-2 block">গড় মার্জিন: ১৫.২% (বিস্তারিত দেখুন →)</span>
        </div>

        {/* Online UPI Payments Box */}
        <div 
          onClick={() => setActiveModal('sales')}
          className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-indigo-400"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Online Payments (UPI)</span>
            <CreditCard className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-indigo-600 mt-2">₹৩,২০,০০০</div>
          <span className="text-xs text-slate-500 font-medium mt-2 block">অফিশিয়াল ব্যাংকে জমা</span>
        </div>

        {/* Customer Credit / Remaining Due Box */}
        <div 
          onClick={() => setActiveModal('credit')}
          className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-rose-400"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Credit Ledger (বাকি অ্যাকাউন্ট)</span>
            <Banknote className="w-4 h-4 text-rose-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-3xl font-black text-rose-600 mt-2">₹১,৬৫,০০০</div>
          <span className="text-xs text-rose-500 font-bold mt-2 block">৩ জনের বাকি রয়েছে (খাতা দেখুন →)</span>
        </div>

      </div>

      {/* Auto Margin Price Calculator */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber-500" /> Dynamic Auto Margin Pricing
        </h3>
        <p className="text-xs text-slate-500 mb-6">নতুন প্রোডাক্ট কেনা দাম ইনপুট দিন, সেট করা মার্জিন অনুযায়ী নিজে বিক্রি দাম সেট হয়ে যাবে।</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">মার্জিন সেট করুন (%)</label>
            <input 
              type="number" 
              value={marginPercent} 
              onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">প্রোডাক্টের কেনা দাম (Cost Price)</label>
            <input 
              type="number" 
              placeholder="যেমন: 200" 
              value={newCost}
              onChange={handleCostChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">অটোমেটিক বিক্রয় মূল্য (Selling Price)</label>
            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xl font-black text-emerald-700">
              ₹{calcPrice}
            </div>
          </div>
        </div>
      </div>

      {/* 📊 POPUP MODAL (When clicking boxes for detail chart & dates) */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {activeModal === 'sales' && 'সম্পূর্ণ সেলস ও তারিখ অনুযায়ী লেনদেনের রিপোর্ট'}
                  {activeModal === 'credit' && 'কাস্টমার ক্রেডিট / বাকি খাতা ও অটো হোয়াটসঅ্যাপ রিমাইন্ডার'}
                  {activeModal === 'profit' && 'নিট প্রফিট ও মার্জিন এনালাইসিস'}
                </h3>
                <p className="text-xs text-slate-500">কোন কাস্টমার কত তারিখে কত টাকা দিল বা বাকি রাখল তা নিচে বিস্তারিত দেওয়া হলো</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Visual Bar Chart Representation */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-3">সেলস ট্রেন্ড ভিজ্যুয়াল চার্ট (গত ১ মাস)</span>
              <div className="flex items-end gap-3 h-32 pt-4 border-b border-slate-300">
                <div className="flex-1 bg-amber-400 h-[40%] rounded-t-lg flex items-center justify-center text-[10px] font-bold text-slate-900">wk 1</div>
                <div className="flex-1 bg-amber-500 h-[65%] rounded-t-lg flex items-center justify-center text-[10px] font-bold text-white">wk 2</div>
                <div className="flex-1 bg-emerald-500 h-[85%] rounded-t-lg flex items-center justify-center text-[10px] font-bold text-white">wk 3</div>
                <div className="flex-1 bg-indigo-600 h-[100%] rounded-t-lg flex items-center justify-center text-[10px] font-bold text-white">wk 4</div>
              </div>
            </div>

            {/* Date-wise Detailed Table */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-800">তারিখ অনুযায়ী খাতার স্টেটমেন্ট</h4>
              <div className="divide-y divide-slate-100 border rounded-2xl overflow-hidden">
                {salesHistory.map((row) => (
                  <div key={row.id} className="p-4 flex justify-between items-center bg-white hover:bg-slate-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-slate-900">{row.customer}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 font-bold">{row.date}</span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">{row.item}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-slate-900 block">₹{row.amount}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.status.includes('Paid') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {row.mode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}