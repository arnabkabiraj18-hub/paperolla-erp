import React, { useState } from 'react';
import { Search, Plus, Star, ShieldCheck, Truck, RotateCcw, Clock, CreditCard } from 'lucide-react';

export default function CustomerStore({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Paper Products', 'Xerox Machines', 'Ink & Toners', 'Accessories'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF9F6] text-slate-900 min-h-screen -mt-8 -mx-6 p-6 space-y-8">
      
      {/* 🚀 NovaTrend Style Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-100 border border-amber-200/50 p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block px-3 py-1 bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full">
            B2B Premium Wholesale
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Discover Quality Paper & Printing Supplies
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            IK Copy, ITC Exxact এবং হেভি-ডিউটি জেরক্স মেসিন কিনুন সরাসরি ডাইরেক্ট মিল পাইকারি রেটে।
          </p>

          {/* Search Box */}
          <div className="pt-2 flex items-center max-w-lg bg-white rounded-2xl shadow-lg border border-slate-200 p-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
            <input 
              type="text" 
              placeholder="পেপার, জেরক্স মেসিন বা কালি সার্চ করুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <Truck className="w-5 h-5 text-amber-500" />
          <div>
            <h5 className="font-bold text-xs text-slate-800">Fast Delivery</h5>
            <p className="text-[10px] text-slate-400">২৪-৪৮ ঘণ্টার মধ্যে পরিবহন</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <div>
            <h5 className="font-bold text-xs text-slate-800">100% Authentic</h5>
            <p className="text-[10px] text-slate-400">অরিজিনাল পেপার মিল স্টক</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <CreditCard className="w-5 h-5 text-indigo-500" />
          <div>
            <h5 className="font-bold text-xs text-slate-800">Credit / Khata Facility</h5>
            <p className="text-[10px] text-slate-400">বাকি পেমেন্টের সুবিধা</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <Clock className="w-5 h-5 text-orange-500" />
          <div>
            <h5 className="font-bold text-xs text-slate-800">24/7 B2B Support</h5>
            <p className="text-[10px] text-slate-400">সরাসরি সহায়তা পাবেন</p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-slate-50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 bg-white/90 text-slate-900 rounded-lg shadow-sm border border-slate-100">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-xs font-bold text-slate-800">4.9</span>
                <span className="text-[10px] text-slate-400">(Wholesale Pack)</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-amber-600 transition-colors">
                {item.name}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Wholesale Price</span>
                <span className="text-xl font-black text-slate-900">₹{item.price}</span>
              </div>

              <button className="px-5 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-2xl transition-all flex items-center gap-1.5 shadow-md">
                <Plus className="w-4 h-4 stroke-[3]" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}