import React from 'react';
import { Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OrderForm({ 
  customerName, setCustomerName, 
  brand, setBrand, 
  gsm, setGsm, 
  quantity, setQuantity, 
  isPaid, setIsPaid, 
  handleOrderSubmit 
}) {

  const products = [
    {
      id: 'IK Copy',
      name: 'IK Copy Paper',
      badge: 'Best Seller',
      badgeColor: 'bg-emerald-500',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=400&q=80',
      desc: 'High brightness, jamming-free smooth paper'
    },
    {
      id: 'ITC Exxact',
      name: 'ITC Exxact Premium',
      badge: 'Top Rated',
      badgeColor: 'bg-amber-500',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      desc: 'Super white, high opacity multi-purpose copier'
    },
    {
      id: 'B2B Copier',
      name: 'B2B Copier Paper',
      badge: 'Value Pack',
      badgeColor: 'bg-indigo-500',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
      desc: 'Cost-effective bulk solution for commercial print'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-indigo-950/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-lg shadow-indigo-500/30">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-wide">নতুন অর্ডার এন্ট্রি</h2>
          <p className="text-xs text-slate-400">প্রোডাক্ট সিলেক্ট করে নতুন ইনভয়েস তৈরি করুন</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-3">
            ১. ব্র্যান্ড প্রোডাক্ট নির্বাচন করুন (Select Product)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((item) => (
              <div 
                key={item.id}
                onClick={() => setBrand(item.id)}
                className={`relative rounded-2xl border-2 p-3 cursor-pointer transition-all duration-300 overflow-hidden ${
                  brand === item.id 
                    ? 'border-indigo-500 bg-slate-800/90 shadow-xl shadow-indigo-500/10 scale-[1.02]' 
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                {brand === item.id && (
                  <div className="absolute top-2 right-2 z-10 bg-indigo-500 text-white rounded-full p-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                <span className={`absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-24 object-cover rounded-xl mt-4 mb-2"
                />
                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">
            ২. পেপার GSM নির্বাচন করুন
          </label>
          <div className="flex gap-4">
            {['70 GSM', '75 GSM', '80 GSM'].map((itemGsm) => (
              <button
                key={itemGsm}
                type="button"
                onClick={() => setGsm(itemGsm)}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all ${
                  gsm === itemGsm 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400' 
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {itemGsm}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              কাস্টমারের নাম
            </label>
            <input 
              type="text" 
              placeholder="যেমন: রয়্যাল স্টেশনার্স" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              কার্টন সংখ্যা (Quantity)
            </label>
            <input 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className={isPaid ? "text-emerald-400" : "text-amber-400"} />
            <div>
              <div className="text-sm font-bold text-white">পেমেন্ট স্টেটাস</div>
              <div className="text-xs text-slate-400">{isPaid ? 'নগদ টাকা জমা হয়েছে' : 'বাকি (Due Order) হিসেবে থাকবে'}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPaid(!isPaid)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isPaid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isPaid ? 'PAID (নগদ)' : 'DUE (বাকি)'}
          </button>
        </div>

        <button 
          onClick={handleOrderSubmit}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          অর্ডার কনফার্ম করুন (Confirm Order)
        </button>
      </div>
    </div>
  );
}