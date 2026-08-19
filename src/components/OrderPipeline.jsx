import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export default function OrderPipeline({ orders, markOrderComplete }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-lg font-black text-white">লাইভ অর্ডার ম্যানেজমেন্ট পাইপলাইন</h3>
        <p className="text-xs text-slate-400">নতুন আসা অর্ডারগুলো ট্র্যাকিং করুন এবং ডেলিভারি শেষে কমপ্লিট করুন</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-black text-indigo-400 text-sm">{ord.id}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 font-bold text-slate-300">{ord.paymentMode}</span>
              </div>
              <h4 className="font-bold text-white text-base">{ord.customer}</h4>
              <p className="text-xs text-slate-400 mt-1">আইটেম: {ord.items} | মোট বিল: <span className="text-emerald-400 font-bold">₹{ord.total}</span></p>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${ord.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {ord.status === 'Completed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {ord.status}
              </span>

              {ord.status !== 'Completed' && (
                <button 
                  onClick={() => markOrderComplete(ord.id)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
                >
                  <CheckCircle className="w-4 h-4" /> Complete Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}