import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export default function AiAssistant() {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('নমস্কার অ্যাডমিন! আপনার ব্যবসার যেকোনো সেলস বা স্টক সংক্রান্ত প্রশ্ন করতে পারেন।');

  const handleAiAsk = () => {
    if (!aiQuery.trim()) return;
    
    if (aiQuery.toLowerCase().includes('ik')) {
      setAiResponse('এই মাসে IK Copy Paper মোট ১৮০ কার্টন বিক্রি হয়েছে। যার থেকে মোট উপার্জন ₹৪৬,৮০০ টাকা এবং নিট প্রফিট ₹৭,২০০ টাকা।');
    } else if (aiQuery.includes('স্টক') || aiQuery.toLowerCase().includes('stock')) {
      setAiResponse('বর্তমানে ২টি আইটেমের স্টক কম রয়েছে: Printer Ink (স্টক: ০) এবং IK Copy (স্টক: ৪)। দ্রুত রিনিউ করার পরামর্শ দেওয়া হচ্ছে।');
    } else {
      setAiResponse(`আপনার প্রশ্নটি রেকর্ড করা হয়েছে। বিশ্লেষণ অনুযায়ী এই সপ্তাহে মোট অনলাইন পেমেন্ট সংগৃহীত হয়েছে ₹৬৫,০০০ এবং ক্যাশ ₹২৫,০০০।`);
    }
    setAiQuery('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-600/30">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-black text-white">PaperFlow AI Business Assistant</h3>
          <p className="text-xs text-slate-400">যেকোনো ভাষায় প্রশ্ন করে ব্যবসার রিপোর্ট জেনে নিন</p>
        </div>
      </div>

      <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-sm text-slate-200 leading-relaxed min-h-[120px]">
        {aiResponse}
      </div>

      <div className="flex gap-3">
        <input 
          type="text" 
          placeholder="যেমন: এই মাসে IK Copy কত সেল হয়েছে? বা কম স্টকের লিস্ট দাও..." 
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <button 
          onClick={handleAiAsk}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition"
        >
          <Send className="w-4 h-4" /> Ask AI
        </button>
      </div>
    </div>
  );
}