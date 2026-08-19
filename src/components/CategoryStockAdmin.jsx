import React from 'react';
import { AlertTriangle, RefreshCw, Upload, Package } from 'lucide-react';

export default function CategoryStockAdmin({ products }) {
  const categories = ['Paper Products', 'Xerox Machines', 'Ink & Toners', 'Accessories'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h3 className="text-lg font-black text-slate-900">ক্যাটাগরি-ওয়াইজ স্টক ইনভেন্টরি</h3>
          <p className="text-xs text-slate-500">স্টক কম থাকলে লাল ওয়ার্নিং দেখাবে, এক ক্লিকে স্টক রিনিউ করতে পারবেন</p>
        </div>
        <button className="px-5 py-3 bg-slate-900 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-md">
          <Upload className="w-4 h-4" /> Add New Item Image
        </button>
      </div>

      {categories.map((cat) => {
        const categoryProducts = products.filter(p => p.category === cat);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={cat} className="space-y-4">
            <h4 className="font-black text-base text-slate-800 flex items-center gap-2 border-b pb-2">
              <Package className="w-5 h-5 text-amber-500" /> {cat}
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {categoryProducts.map((item) => {
                const isLowStock = item.stock <= item.minAlert;
                return (
                  <div 
                    key={item.id} 
                    className={`p-5 rounded-2xl border flex items-center justify-between transition ${
                      isLowStock 
                        ? 'bg-rose-50/50 border-rose-300 shadow-sm' 
                        : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div>
                        <h5 className="font-bold text-slate-900 text-base">{item.name}</h5>
                        <div className="flex gap-4 text-xs text-slate-500 mt-1">
                          <span>কেনা দাম: ₹{item.cost}</span>
                          <span>বিক্রি দাম: ₹{item.price}</span>
                          <span className="text-emerald-600 font-bold">লাভ: ₹{item.price - item.cost}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block font-bold">বর্তমান স্টক</span>
                        <span className={`text-xl font-black ${isLowStock ? 'text-rose-600' : 'text-slate-900'}`}>
                          {item.stock} কার্টন
                        </span>
                        {isLowStock && (
                          <span className="flex items-center gap-1 text-[10px] text-rose-600 font-bold mt-0.5">
                            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Warning!
                          </span>
                        )}
                      </div>

                      <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 border">
                        <RefreshCw className="w-3.5 h-3.5" /> Renew Stock
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}