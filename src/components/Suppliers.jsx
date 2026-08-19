import React from 'react';
import { Building } from 'lucide-react';

export default function Suppliers({ suppliers }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-lg font-black text-white">ভেন্ডর ও পেপার মিল সাপ্লায়ার্স</h3>
        <p className="text-xs text-slate-400">যেসব কোম্পানি বা ডিপো থেকে আপনি পাইকারি মাল কেনেন তাদের ডাটা ও বকেয়া বিলের হিসাব</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((sup) => (
          <div key={sup.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-white text-base">{sup.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mt-2">লোকেশন / কন্টাক্ট: {sup.contact}</p>
              <p className="text-xs text-indigo-400 font-bold mt-1">সরবরাহ করা আইটেম: {sup.itemSupplied}</p>
            </div>

            <div className="text-right bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">বকেয়া দেনা (Pending Due)</span>
              <span className="text-xl font-black text-rose-400">₹{sup.pendingPayment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}