import React, { useState, useEffect } from 'react';
import { 
  Store, LayoutDashboard, Package, Users, Truck, 
  Send, ShieldCheck, TrendingUp, Bot, Search, LogOut, Phone, MapPin, Mail, 
  CreditCard, Plus, Lock, CheckCircle, Download, Star, Clock, AlertTriangle, RefreshCw, Trash2, Calendar, Award, ShoppingCart, X, Edit3, Settings
} from 'lucide-react';

const API_BASE = 'https://paperolla-erp.onrender.com/api';

export default function App() {
  const [role, setRole] = useState('GUEST'); 
  const [authMode, setAuthMode] = useState('LOGIN'); 
  
  // Login Form States
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regShopName, setRegShopName] = useState('');
  const [regLocation, setRegLocation] = useState('');

  // Dynamic Site Settings (Admin Editable)
  const [siteSettings, setSiteSettings] = useState({
    bannerTag: 'B2B Premium Wholesale',
    headline: "Discover Products You'll Love at PaperOlla",
    subNotice: 'IK Copy, ITC Exxact এবং হেভি-ডিউটি জেরক্স মেসিন কিনুন সরাসরি ডাইরেক্ট মিল পাইকারি রেটে।',
    searchPlaceholder: 'পেপার, মেসিন বা কালি সার্চ করুন...'
  });

  // Admin Portal Section State
  const [adminSection, setAdminSection] = useState('inventory');

  // AI Assistant States
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('নমস্কার অ্যাডমিন! PaperOlla ব্যবসার যেকোনো সেলস, স্টক বা বাকি খাতা সংক্রান্ত প্রশ্ন জিজ্ঞেস করুন।');

  // Customer Store Filter, Cart & Search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminClicks, setAdminClicks] = useState(0);

  // Cart & Order Drawer States
  const [cart, setCart] = useState([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [checkoutPayMode, setCheckoutPayMode] = useState('Cash (নগদ)');

  // Analytics Filter State
  const [salesTimeFilter, setSalesTimeFilter] = useState('today');

  // 1. Master Inventory Data State
  const [products, setProducts] = useState([]);

  // 2. Master Sales Ledger State
  const [salesLedger, setSalesLedger] = useState([
    { id: 'TXN-1001', date: '2026-08-08', customer: 'রয়্যাল স্টেশনার্স', item: 'IK Copy Paper (75 GSM)', category: 'Paper Products', unitCost: 220, unitSell: 260, qty: 15, buyingCost: 3300, totalBill: 3900, netProfit: 600, paymentMode: 'Credit (বাকি)', paymentStatus: 'Due Pending' },
    { id: 'TXN-1002', date: '2026-08-07', customer: 'মা তাড়া জেরক্স সেন্টার', item: 'ITC Exxact Premium (80 GSM)', category: 'Paper Products', unitCost: 240, unitSell: 285, qty: 10, buyingCost: 2400, totalBill: 2850, netProfit: 450, paymentMode: 'Online UPI', paymentStatus: 'Paid' },
    { id: 'TXN-1003', date: '2026-07-20', customer: 'ডিজিটাল প্রিন্টিং প্রেস', item: 'Heavy Duty Color Xerox Machine', category: 'Xerox Machines', unitCost: 72000, unitSell: 85000, qty: 1, buyingCost: 72000, totalBill: 85000, netProfit: 13000, paymentMode: 'Bank Transfer', paymentStatus: 'Paid' }
  ]);

  // 3. Vendor Suppliers Ledger State
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'ITC Paper Mill Ltd', contactPerson: 'S. K. Sharma', location: 'Kolkata Depot', itemSupplied: 'ITC Exxact Paper', totalBilled: 150000, pendingDue: 45000 },
    { id: 2, name: 'IK Enterprise Regional Dist.', contactPerson: 'R. N. Ghosh', location: 'Howrah Hub', itemSupplied: 'IK Copy Paper', totalBilled: 98000, pendingDue: 12000 }
  ]);

  // 4. Customer Khata Accounts
  const [customerAccounts, setCustomerAccounts] = useState([
    { id: 1, name: 'রয়্যাল স্টেশনার্স', area: 'উলুবেড়িয়া', phone: '9876543210', totalPurchased: 12500, paidAmount: 8600, dueAmount: 3900, daysPending: 7, autoSmsWeek: true },
    { id: 2, name: 'মা তাড়া জেরক্স সেন্টার', area: 'হাওড়া ময়দান', phone: '9812345678', totalPurchased: 28500, paidAmount: 28500, dueAmount: 0, daysPending: 0, autoSmsWeek: false },
    { id: 3, name: 'ডিজিটাল প্রিন্টিং প্রেস', area: 'কোলাঘাট', phone: '9734567890', totalPurchased: 98250, paidAmount: 85750, dueAmount: 12500, daysPending: 14, autoSmsWeek: true }
  ]);

  // 5. Order Pipeline State
  const [orders, setOrders] = useState([]);

  // Product Form States (Add / Edit)
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('Paper Products');
  const [newProdCost, setNewProdCost] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [editingProdId, setEditingProdId] = useState(null);

  // Manual Offline Order State
  const [offlineCust, setOfflineCust] = useState('');
  const [offlineProdId, setOfflineProdId] = useState('');
  const [offlineQty, setOfflineQty] = useState('');
  const [offlinePayMode, setOfflinePayMode] = useState('Cash (নগদ)');

  // New Vendor Form State
  const [vName, setVName] = useState('');
  const [vContact, setVContact] = useState('');
  const [vItem, setVItem] = useState('');
  const [vBilled, setVBilled] = useState('');
  const [vDue, setVDue] = useState('');

  // 🔄 Fetch all MongoDB Collections
  const fetchAllData = async () => {
    try {
      // 1. Fetch Products
      const prodRes = await fetch(`${API_BASE}/products`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.map(i => ({ ...i, id: i._id || i.id })));
      }

      // 2. Fetch Orders
      const ordRes = await fetch(`${API_BASE}/orders`);
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setOrders(ordData.map(i => ({ ...i, id: i.orderId || i._id })));
      }

      // 3. Fetch Customers
      const custRes = await fetch(`${API_BASE}/customers`);
      if (custRes.ok) {
        const custData = await custRes.json();
        if (custData.length > 0) setCustomerAccounts(custData.map(c => ({ ...c, id: c._id })));
      }

      // 4. Fetch Site Settings
      const setRes = await fetch(`${API_BASE}/settings`);
      if (setRes.ok) {
        const setData = await setRes.json();
        if (setData && setData.subNotice) setSiteSettings(setData);
      }
    } catch (err) {
      console.log('MongoDB fetching notice:', err.message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogoClick = () => {
    const count = adminClicks + 1;
    setAdminClicks(count);
    if (count === 3) {
      setRole('ADMIN');
      setAdminClicks(0);
      alert('Secret Access: PaperOlla অ্যাডমিন কনসোলে সফলভাবে প্রবেশ করা হয়েছে!');
    }
  };

  const handleAiAsk = () => {
    if (!aiQuery.trim()) return;
    const query = aiQuery.toLowerCase();
    if (query.includes('ik') || query.includes('আইকে')) {
      const ik = products.find(p => p.name.toLowerCase().includes('ik'));
      setAiResponse(ik ? `${ik.name}-এর বর্তমান স্টক ${ik.stock} কার্টন। বিক্রয় মূল্য ₹${ik.price} এবং কেনা দাম ₹${ik.cost}।` : 'IK Copy Paper এর তথ্য লোড হচ্ছে...');
    } else if (query.includes('স্টক') || query.includes('stock')) {
      const lowStock = products.filter(p => p.stock <= 5).map(p => `${p.name} (${p.stock} টি)`).join(', ');
      setAiResponse(lowStock ? `লো-স্টক অ্যালার্ট: ${lowStock}` : 'সমস্ত প্রোডাক্টের পর্যাপ্ত স্টক রয়েছে।');
    } else if (query.includes('বাকি') || query.includes('due')) {
      setAiResponse(`মোট বাকি বাজারে আটকে আছে ₹${totalDuePending}।`);
    } else {
      setAiResponse(`আপনার প্রশ্ন "${aiQuery}" বিশ্লেষণ করা হয়েছে। PaperOlla পোর্টালে আপনার সেলস এবং স্টক একদম আপ-টু-ডেট।`);
    }
    setAiQuery('');
  };

  const handleSendLoginOtp = () => {
    if (!loginPhone.trim() || loginPhone.length < 10) return alert('সঠিক ১০ ডিজিটের মোবাইল নম্বর দিন!');
    setLoginOtpSent(true);
    alert(`PaperOlla Verification Code: 4829\nআপনার মোবাইল নম্বর ${loginPhone}-এ OTP পাঠানো হয়েছে।`);
  };

  const handleVerifyLogin = () => {
    if (loginOtp !== '4829') return alert('ভুল OTP! (Demo OTP: 4829)');
    setRole('CUSTOMER');
    alert('PaperOlla কাস্টমার পোর্টালে স্বাগতম!');
    setLoginOtpSent(false); setLoginOtp('');
  };

  // 📝 Save / Update Site Front Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      });
      if (res.ok) alert('পেজের সমস্ত ব্যানার ও হেডলাইন সফলভাবে আপডেট হয়েছে!');
    } catch (err) {
      alert('সেটিংস আপডেট করা যায়নি।');
    }
  };

  // 📦 Add or Update Product in MongoDB
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!newProdName || !newProdCost || !newProdPrice || !newProdStock) return alert('সমস্ত তথ্য সঠিকভাবে দিন!');

    const prodPayload = {
      name: newProdName,
      category: newProdCat,
      cost: parseFloat(newProdCost),
      price: parseFloat(newProdPrice),
      stock: parseInt(newProdStock),
      image: newProdImage || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400'
    };

    try {
      if (editingProdId) {
        // Update
        const res = await fetch(`${API_BASE}/products/${editingProdId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodPayload)
        });
        if (res.ok) alert(`"${newProdName}" সফলভাবে আপডেট করা হয়েছে!`);
      } else {
        // Create
        const res = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodPayload)
        });
        if (res.ok) alert(`নতুন প্রোডাক্ট "${newProdName}" ডাটাবেসে সেভ হয়েছে!`);
      }
      
      fetchAllData();
      setEditingProdId(null);
      setNewProdName(''); setNewProdCost(''); setNewProdPrice(''); setNewProdStock(''); setNewProdImage('');
    } catch (err) {
      alert('ডাটাবেসে সেভ করতে সমস্যা হয়েছে।');
    }
  };

  const handleEditClick = (p) => {
    setEditingProdId(p._id || p.id);
    setNewProdName(p.name);
    setNewProdCat(p.category);
    setNewProdCost(p.cost);
    setNewProdPrice(p.price);
    setNewProdStock(p.stock);
    setNewProdImage(p.image);
    setAdminSection('inventory');
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('আপনি কি এই প্রোডাক্টটি স্থায়ীভাবে মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (err) {
      alert('প্রোডাক্ট মুছতে ব্যর্থ হয়েছে।');
    }
  };

  // 🛒 E-COMMERCE CART LOGIC
  const handleAddToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, qty: newQty } : item));
    }
  };

  // 📦 SUBMIT CUSTOMER ONLINE ORDER (Saved to MongoDB)
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('আপনার কার্ট খালি!');

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrder = {
      orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: regShopName || regName || 'অনলাইন কাস্টমার',
      phone: loginPhone || regPhone || '',
      items: cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        qty: item.qty,
        cost: item.cost,
        price: item.price
      })),
      total: cartTotal,
      paymentMode: checkoutPayMode,
      status: 'Pending'
    };

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        fetchAllData();
        setCart([]);
        setShowCartDrawer(false);
        alert('আপনার অর্ডার সফলভাবে সাবমিট হয়েছে! অ্যাডমিন কনফার্ম করলে ডেলিভারি প্রসেস শুরু হবে।');
      }
    } catch (err) {
      alert('অর্ডার সাবমিট করতে সমস্যা হয়েছে।');
    }
  };

  // 👑 ADMIN APPROVE ORDER (Deduct Stock & Update in Mongo)
  const handleCompleteOrder = async (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId || o.orderId === orderId);
    if (!targetOrder) return;

    try {
      const res = await fetch(`${API_BASE}/orders/${targetOrder._id || targetOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' })
      });
      if (res.ok) {
        fetchAllData();
        alert(`অর্ডার ${orderId} সম্পূর্ণ হয়েছে! ইনভেন্টরি স্টক এবং সেলস লেজার আপডেট করা হলো।`);
      }
    } catch (err) {
      alert('অর্ডার স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।');
    }
  };

  // 🛒 Offline Sales Entry
  const handleOfflineSaleSubmit = async (e) => {
    e.preventDefault();
    if (!offlineCust || !offlineProdId || !offlineQty) return alert('কাস্টমারের নাম, প্রোডাক্ট এবং পরিমাণ সঠিকভাবে নির্বাচন করুন!');

    const targetProd = products.find(p => p.id === offlineProdId || p._id === offlineProdId);
    if (!targetProd) return alert('প্রোডাক্ট পাওয়া যায়নি!');

    const qtyNum = parseInt(offlineQty);
    if (targetProd.stock < qtyNum) return alert(`পর্যাপ্ত স্টক নেই! বর্তমান স্টক: ${targetProd.stock}`);

    try {
      // 1. Stock Reduce
      await fetch(`${API_BASE}/products/${targetProd._id || targetProd.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: targetProd.stock - qtyNum })
      });

      fetchAllData();
      alert(`অফলাইন বিক্রি সফলভাবে রেকর্ড হয়েছে! স্টক আপডেট হয়ে গেছে।`);
      setOfflineCust(''); setOfflineProdId(''); setOfflineQty('');
    } catch (err) {
      alert('বিক্রি রেকর্ড করতে ব্যর্থ।');
    }
  };

  // Add Vendor Handler
  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!vName || !vContact || !vItem || !vBilled) return alert('ভেন্ডরের সমস্ত তথ্য সঠিক ভাবে দিন!');
    const newV = {
      id: Date.now(),
      name: vName,
      contactPerson: vContact,
      itemSupplied: vItem,
      totalBilled: parseFloat(vBilled),
      pendingDue: parseFloat(vDue) || 0
    };
    setSuppliers([...suppliers, newV]);
    alert(`নতুন ভেন্ডর "${vName}" সফলভাবে যুক্ত করা হয়েছে!`);
    setVName(''); setVContact(''); setVItem(''); setVBilled(''); setVDue('');
  };

  const handleDeleteVendor = (id) => {
    if (window.confirm('আপনি কি এই ভেন্ডর খাতাটি মুছে ফেলতে চান?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const categories = ['All', 'Paper Products', 'Xerox Machines', 'Ink & Toners', 'Accessories'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSalesBill = salesLedger.reduce((sum, s) => sum + s.totalBill, 0);
  const totalBuyingCost = salesLedger.reduce((sum, s) => sum + s.buyingCost, 0);
  const totalNetProfit = salesLedger.reduce((sum, s) => sum + s.netProfit, 0);
  const totalDuePending = customerAccounts.reduce((sum, c) => sum + c.dueAmount, 0);

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased flex flex-col justify-between overflow-x-hidden">
      
      {/* 🌟 Mobile Responsive Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-3 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-amber-400 text-base md:text-xl shadow-md">
              P
            </div>
            <div>
              <span className="font-black text-base md:text-xl tracking-wider text-slate-900">
                PAPER<span className="text-amber-500">OLLA</span>
              </span>
              <div className="hidden sm:block text-[9px] text-slate-400 tracking-widest uppercase font-semibold">B2B Wholesale Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {role === 'CUSTOMER' && (
              <button 
                onClick={() => setShowCartDrawer(true)} 
                className="relative p-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 shadow transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">View Cart</span>
                {totalCartCount > 0 && (
                  <span className="bg-slate-900 text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {role === 'ADMIN' && (
              <button onClick={() => setRole('CUSTOMER')} className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl shadow-sm border border-amber-400">
                Customer Storefront দেখুন
              </button>
            )}

            {role !== 'GUEST' ? (
              <button onClick={() => setRole('GUEST')} className="px-3 py-1.5 text-[10px] md:text-xs font-bold text-rose-600 bg-rose-50 rounded-xl border border-rose-200 flex items-center gap-1 hover:bg-rose-100 transition">
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            ) : (
              <span className="text-[10px] md:text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                Customer Auth Required
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 🛍️ CART DRAWER */}
      {showCartDrawer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-4 md:p-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-500" /> Your Cart Items ({totalCartCount})
                </h3>
                <button onClick={() => setShowCartDrawer(false)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <ShoppingCart className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-xs font-bold">আপনার কার্ট খালি রয়েছে!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                        <span className="text-xs font-black text-amber-600">₹{item.price} / pc</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleUpdateCartQty(item.id, item.qty - 1)} className="w-6 h-6 bg-slate-200 text-slate-800 rounded-lg font-bold text-xs flex items-center justify-center">-</button>
                        <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                        <button onClick={() => handleUpdateCartQty(item.id, item.qty + 1)} className="w-6 h-6 bg-slate-900 text-white rounded-lg font-bold text-xs flex items-center justify-center">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckoutSubmit} className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-sm font-black">
                  <span>Total Bill Amount:</span>
                  <span className="text-emerald-600 text-base">₹{totalCartPrice}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method বেছে নিন</label>
                  <select 
                    value={checkoutPayMode} 
                    onChange={(e) => setCheckoutPayMode(e.target.value)}
                    className="w-full border rounded-xl p-2.5 text-xs bg-slate-50 font-bold"
                  >
                    <option value="Cash (নগদ)">Cash (নগদ পেমেন্ট)</option>
                    <option value="Online UPI">Online UPI / Scan</option>
                    <option value="Credit (বাকি)">Credit (খাতায় বাকি রাখুন)</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow transition">
                  Confirm & Place Order Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 🔐 SCREEN 1: AUTHENTICATION */}
      {role === 'GUEST' && (
        <div className="max-w-md mx-auto my-8 md:my-12 px-4 w-full">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button onClick={() => setAuthMode('LOGIN')} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${authMode === 'LOGIN' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
                Customer Login
              </button>
              <button onClick={() => setAuthMode('REGISTER')} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${authMode === 'REGISTER' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}>
                Register Shop
              </button>
            </div>

            {authMode === 'LOGIN' ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="font-black text-xl md:text-2xl text-slate-900">Welcome to PaperOlla</h2>
                  <p className="text-[11px] text-slate-500 mt-1">কাস্টমার ফোন নম্বর দিয়ে OTP টাইপ করে প্রবেশ করুন</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর (Phone Number)</label>
                  <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50">
                    <Phone className="w-4 h-4 text-slate-400 mr-2" />
                    <input type="text" placeholder="যেমন: 9876543210" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" />
                  </div>
                </div>

                {loginOtpSent && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Enter OTP (Demo: 4829)</label>
                    <input type="text" placeholder="৪ ডিজিটের OTP লিখুন" value={loginOtp} onChange={(e) => setLoginOtp(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-center tracking-widest bg-slate-50 outline-none" />
                  </div>
                )}

                {!loginOtpSent ? (
                  <button onClick={handleSendLoginOtp} className="w-full py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow-md transition">
                    Send OTP Code
                  </button>
                ) : (
                  <button onClick={handleVerifyLogin} className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition">
                    Verify OTP & Login
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="font-black text-xl md:text-2xl text-slate-900">New Shop Registration</h2>
                  <p className="text-xs text-slate-500 mt-1">আপনার দোকানের তথ্য দিয়ে নতুন একাউন্ট খুলুন</p>
                </div>
                <input type="text" placeholder="আপনার নাম" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full border rounded-xl p-3 text-xs bg-slate-50 outline-none" />
                <input type="text" placeholder="মোবাইল নম্বর" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full border rounded-xl p-3 text-xs bg-slate-50 outline-none" />
                <input type="text" placeholder="দোকানের নাম" value={regShopName} onChange={(e) => setRegShopName(e.target.value)} className="w-full border rounded-xl p-3 text-xs bg-slate-50 outline-none" />
                <input type="text" placeholder="ঠিকানা / এরিয়া" value={regLocation} onChange={(e) => setRegLocation(e.target.value)} className="w-full border rounded-xl p-3 text-xs bg-slate-50 outline-none" />
                <button onClick={() => alert('Registration Completed!')} className="w-full py-3.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow">
                  Complete Registration
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🛒 SCREEN 2: CUSTOMER STOREFRONT (DYNAMIC BACKEND DATA) */}
      {role === 'CUSTOMER' && (
        <main className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 space-y-6 flex-1 w-full">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-100 border border-amber-200/50 p-6 md:p-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 bg-amber-500 text-white font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider rounded-full">
                {siteSettings.bannerTag}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {siteSettings.headline}
              </h1>
              <p className="text-slate-600 text-xs md:text-base leading-relaxed">
                {siteSettings.subNotice}
              </p>
              <div className="pt-2 flex items-center w-full bg-white rounded-2xl shadow-md border border-slate-200 p-2">
                <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
                <input 
                  type="text" 
                  placeholder={siteSettings.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-transparent text-xs md:text-sm font-semibold outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((item) => (
              <div key={item._id || item.id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-3 md:p-4 shadow-sm flex flex-col justify-between">
                <div>
                  <img src={item.image} alt={item.name} className="w-full h-32 md:h-48 object-cover rounded-xl mb-3" />
                  <h3 className="font-bold text-slate-900 text-xs md:text-base">{item.name}</h3>
                </div>
                <div className="mt-4 pt-3 border-t flex items-center justify-between">
                  <span className="text-base md:text-xl font-black text-slate-900">₹{item.price}</span>
                  <button onClick={() => handleAddToCart(item)} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] md:text-xs rounded-xl flex items-center gap-1 shadow">
                    <Plus className="w-3 h-3 stroke-[3]" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 👑 SCREEN 3: ADMIN ERP CONSOLE */}
      {role === 'ADMIN' && (
        <main className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 space-y-6 flex-1 w-full">
          
          {/* Admin Navigation Pills */}
          <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {[
              { id: 'inventory', label: 'Stock & Price Entry', icon: Package },
              { id: 'site_settings', label: 'Page Content & Banner', icon: Settings },
              { id: 'sales_table', label: 'Detailed Sales & Profit Ledger', icon: TrendingUp },
              { id: 'ai', label: 'AI Business Assistant', icon: Bot },
              { id: 'orders', label: 'Live Order Pipeline', icon: Truck },
              { id: 'customers', label: 'Customer Khata & Reminders', icon: Users },
              { id: 'suppliers', label: 'Vendor Suppliers Ledger', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminSection(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
                    adminSection === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* ⚙️ SECTION: DYNAMIC SITE CONTENT SETTINGS */}
          {adminSection === 'site_settings' && (
            <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" /> হোমপেজের ব্যানার, টেক্সট ও সার্চবার পরিবর্তন করুন
              </h3>
              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ছোট ট্যাগলাইন (Banner Tag)</label>
                  <input type="text" value={siteSettings.bannerTag} onChange={(e) => setSiteSettings({ ...siteSettings, bannerTag: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মূল বড় হেডলাইন (Headline)</label>
                  <input type="text" value={siteSettings.headline} onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50 font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশ / বিস্তারিত বিবরণ (Sub Notice)</label>
                  <textarea rows="2" value={siteSettings.subNotice} onChange={(e) => setSiteSettings({ ...siteSettings, subNotice: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সার্চ বক্সের প্লেসহোল্ডার টেক্সট</label>
                  <input type="text" value={siteSettings.searchPlaceholder} onChange={(e) => setSiteSettings({ ...siteSettings, searchPlaceholder: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50" />
                </div>
                <button type="submit" className="py-3 px-6 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow transition">
                  Save Page Changes to Live Website
                </button>
              </form>
            </div>
          )}

          {/* AI ASSISTANT TAB */}
          {adminSection === 'ai' && (
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-2xl text-amber-400"><Bot className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">PaperOlla AI Business Assistant</h3>
                  <p className="text-xs text-slate-500">বাংলা বা ইংরেজিতে প্রশ্ন করে ব্যবসার সেলস, স্টক বা বাকি খাতার রিপোর্ট জানুন</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-800 leading-relaxed min-h-[100px]">
                {aiResponse}
              </div>

              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="যেমন: IK Copy কত সেল হলো? বা কার কত টাকা বাকি আছে?" 
                  value={aiQuery} 
                  onChange={(e) => setAiQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                  className="flex-1 bg-slate-50 border rounded-2xl px-4 py-3 text-xs font-semibold outline-none" 
                />
                <button onClick={handleAiAsk} className="px-6 py-3 bg-slate-900 text-white font-extrabold text-xs rounded-2xl flex items-center gap-2 shadow">
                  <Send className="w-4 h-4" /> Ask AI
                </button>
              </div>
            </div>
          )}

          {/* SECTION 1: INVENTORY CONTROL (CREATE / UPDATE / DELETE IN MONGODB) */}
          {adminSection === 'inventory' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" /> {editingProdId ? '✏️ প্রোডাক্ট এডিট করুন' : '➕ নতুন প্রোডাক্ট ও দাম এন্ট্রি করুন'}
                </h3>
                <form onSubmit={handleAddOrUpdateProduct} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="প্রোডাক্টের নাম" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50" />
                  <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold">
                    <option value="Paper Products">Paper Products</option>
                    <option value="Xerox Machines">Xerox Machines</option>
                    <option value="Ink & Toners">Ink & Toners</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input type="number" placeholder="কেনা দাম (Cost Price ₹)" value={newProdCost} onChange={(e) => setNewProdCost(e.target.value)} className="border rounded-xl p-2.5 text-xs font-bold text-rose-600 bg-slate-50" />
                  <input type="number" placeholder="বিক্রি দাম (Sell Price ₹)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="border rounded-xl p-2.5 text-xs font-bold text-emerald-600 bg-slate-50" />
                  <input type="number" placeholder="স্টকের পরিমাণ (কার্টন)" value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} className="border rounded-xl p-2.5 text-xs font-bold bg-slate-50" />
                  <input type="text" placeholder="ছবি লিংক / Image URL" value={newProdImage} onChange={(e) => setNewProdImage(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50" />
                  
                  <div className="sm:col-span-2 md:col-span-3 flex gap-2">
                    <button type="submit" className="flex-1 py-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow transition">
                      {editingProdId ? 'Update Product in MongoDB' : 'Save Product to Inventory'}
                    </button>
                    {editingProdId && (
                      <button 
                        type="button" 
                        onClick={() => { setEditingProdId(null); setNewProdName(''); setNewProdCost(''); setNewProdPrice(''); setNewProdStock(''); setNewProdImage(''); }}
                        className="py-3 px-4 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {products.map((p) => (
                  <div key={p._id || p.id} className="bg-white border p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm md:text-base">{p.name}</h4>
                        <div className="flex gap-3 text-[11px] mt-0.5">
                          <span className="font-bold text-rose-600">কেনা: ₹{p.cost}</span>
                          <span className="font-bold text-slate-800">বিক্রি: ₹{p.price}</span>
                          <span className="font-extrabold text-emerald-600">লাভ: ₹{p.price - p.cost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base md:text-xl font-black text-slate-900">{p.stock} কার্টন</span>
                      <div className="flex gap-1.5">
                        <button onClick={() => handleEditClick(p)} className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-700 rounded-lg">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProduct(p._id || p.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: DETAILED SALES LEDGER */}
          {adminSection === 'sales_table' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl space-y-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                  <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" /> সেলস, প্রফিট ও বিজনেস রিপোর্ট (Sales Analytics)
                  </h3>
                  
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {[
                      { id: 'today', label: 'Today' },
                      { id: '1m', label: '1 Month' },
                      { id: '3m', label: '3 Months' },
                      { id: '6m', label: '6 Months' },
                      { id: '1y', label: '1 Year' },
                    ].map((f) => (
                      <button 
                        key={f.id} 
                        onClick={() => setSalesTimeFilter(f.id)} 
                        className={`px-2.5 py-1 rounded-lg font-bold text-[10px] md:text-xs transition ${salesTimeFilter === f.id ? 'bg-slate-900 text-white shadow' : 'text-slate-600'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">মোট বিক্রি (Total Bill)</span>
                    <span className="text-lg md:text-2xl font-black text-slate-900">₹{totalSalesBill}</span>
                  </div>

                  <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                    <span className="text-[10px] font-bold text-rose-500 uppercase block">মোট কেনা খরচ (Cost)</span>
                    <span className="text-lg md:text-2xl font-black text-rose-700">₹{totalBuyingCost}</span>
                  </div>

                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">মোট নিট লাভ (Net Profit)</span>
                    <span className="text-lg md:text-2xl font-black text-emerald-600">+₹{totalNetProfit}</span>
                  </div>

                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">বাজার বাকি (Pending Due)</span>
                    <span className="text-lg md:text-2xl font-black text-rose-600">₹{totalDuePending}</span>
                  </div>
                </div>
              </div>

              {/* OFFLINE SALE ENTRY */}
              <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600" /> অফলাইন কাস্টমার ডাইরেক্ট সেলস এন্ট্রি (Store Direct Sale Entry)
                </h3>
                <p className="text-xs text-slate-500">দোকানে সরাসরি বিক্রি করলে এখান এন্ট্রি করুন, স্বয়ংক্রিয়ভাবে ইনভেন্টরি স্টক কমে যাবে।</p>

                <form onSubmit={handleOfflineSaleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input 
                    type="text" 
                    placeholder="কাস্টমার/দোকানের নাম" 
                    value={offlineCust} 
                    onChange={(e) => setOfflineCust(e.target.value)} 
                    className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold"
                  />

                  <select 
                    value={offlineProdId} 
                    onChange={(e) => setOfflineProdId(e.target.value)} 
                    className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold"
                  >
                    <option value="">-- প্রোডাক্ট বেছে নিন --</option>
                    {products.map(p => (
                      <option key={p._id || p.id} value={p._id || p.id}>{p.name} (স্টক: {p.stock})</option>
                    ))}
                  </select>

                  <input 
                    type="number" 
                    placeholder="পরিমাণ (Qty)" 
                    value={offlineQty} 
                    onChange={(e) => setOfflineQty(e.target.value)} 
                    className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold"
                  />

                  <select 
                    value={offlinePayMode} 
                    onChange={(e) => setOfflinePayMode(e.target.value)} 
                    className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold"
                  >
                    <option value="Cash (নগদ)">Cash (নগদ)</option>
                    <option value="Online UPI">Online UPI</option>
                    <option value="Credit (বাকি)">Credit (বাকি)</option>
                  </select>

                  <div className="sm:col-span-2 md:col-span-4">
                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition">
                      + Add Offline Sale & Update Stock
                    </button>
                  </div>
                </form>
              </div>

              {/* SALES TABLE */}
              <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-black text-slate-900">দৈনিক সম্পূর্ণ সেলস, কেনা খরচ ও লাভ খাতা (Master Sales Table)</h3>
                  </div>
                  <button onClick={() => alert('Excel File (.xlsx) Downloaded!')} className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Export Excel
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 uppercase font-extrabold border-b border-slate-200">
                        <th className="p-2.5">Txn ID / Date</th>
                        <th className="p-2.5">Customer Name</th>
                        <th className="p-2.5">Item Purchased</th>
                        <th className="p-2.5 text-center">Qty</th>
                        <th className="p-2.5 text-right">Buying Cost</th>
                        <th className="p-2.5 text-right">Sell Amount</th>
                        <th className="p-2.5 text-right">Net Profit</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {salesLedger.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50 transition">
                          <td className="p-2.5 font-bold text-slate-900">
                            {row.id}
                            <span className="block text-[10px] text-slate-400 font-normal">{row.date}</span>
                          </td>
                          <td className="p-2.5 font-bold text-slate-800">{row.customer}</td>
                          <td className="p-2.5 text-slate-700">{row.item}</td>
                          <td className="p-2.5 text-center font-bold text-slate-800">{row.qty}</td>
                          <td className="p-2.5 text-right text-slate-500">₹{row.buyingCost}</td>
                          <td className="p-2.5 text-right font-black text-slate-900">₹{row.totalBill}</td>
                          <td className="p-2.5 text-right font-black text-emerald-600">+₹{row.netProfit}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              row.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {row.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ORDER PIPELINE */}
          {adminSection === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-base md:text-lg font-black text-slate-900">লাইভ অর্ডার প্রসেসিং পাইপলাইন</h3>
                <p className="text-xs text-slate-500">নতুন আসা অর্ডারগুলো ট্র্যাকিং করুন এবং কমপ্লিট করুন</p>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.orderId || ord.id} className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-amber-600 text-xs md:text-sm">{ord.orderId || ord.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700">{ord.paymentMode}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">{ord.customer}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        আইটেম: {ord.items?.map(i => `${i.name} (${i.qty} Pcs)`).join(', ')} | বিল: <span className="text-emerald-600 font-bold">₹{ord.total}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold ${ord.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {ord.status}
                      </span>
                      {ord.status === 'Pending' && (
                        <button 
                          onClick={() => handleCompleteOrder(ord.orderId || ord.id)}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Complete Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: CUSTOMER KHATA */}
          {adminSection === 'customers' && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-black text-slate-900">কাস্টমার বাকি অ্যাকাউন্ট (Khata) & অটো ১-সপ্তাহ হোয়াটসঅ্যাপ রিমাইন্ডার</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {customerAccounts.map((cust) => (
                  <div key={cust.id || cust._id} className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col justify-between shadow-sm space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{cust.location || cust.area || 'হাওড়া'}</span>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base mt-2">{cust.name} {cust.shopName ? `(${cust.shopName})` : ''}</h4>
                      <p className="text-xs text-slate-500">ফোন: {cust.phone}</p>
                      
                      <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">মোট কেনাকাটা:</span>
                          <span className="font-bold text-slate-800">₹{cust.totalPurchased || 0}</span>
                        </div>
                        <div className="flex justify-between text-xs border-t pt-1">
                          <span className="font-bold text-slate-700">বর্তমান বাকি:</span>
                          <span className="font-black text-rose-600 text-xs md:text-sm">₹{cust.dueAmount || 0}</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => alert(`${cust.phone} নম্বরে WhatsApp রিমাইন্ডার পাঠানো হয়েছে!`)} className="w-full py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex justify-center items-center gap-1.5 shadow">
                      <Send className="w-3.5 h-3.5" /> Send Weekly WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: VENDOR SUPPLIERS LEDGER */}
          {adminSection === 'suppliers' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" /> নতুন ভেন্ডর / মিল সাপ্লায়ার যুক্ত করুন (Add Vendor Box)
                </h3>

                <form onSubmit={handleAddVendor} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="ভেন্ডর/মিল কোম্পানির নাম" value={vName} onChange={(e) => setVName(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold" />
                  <input type="text" placeholder="কন্টাক্ট পার্সন ও ডিাপো" value={vContact} onChange={(e) => setVContact(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold" />
                  <input type="text" placeholder="সরবরাহ করা আইটেম (যেমন: IK Copy)" value={vItem} onChange={(e) => setVItem(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold" />
                  <input type="number" placeholder="মোট বিলের পরিমাণ (₹)" value={vBilled} onChange={(e) => setVBilled(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold" />
                  <input type="number" placeholder="বর্তমান পাওনা/বাকি (₹)" value={vDue} onChange={(e) => setVDue(e.target.value)} className="border rounded-xl p-2.5 text-xs bg-slate-50 font-bold text-rose-600" />

                  <div className="sm:col-span-2 md:col-span-3">
                    <button type="submit" className="w-full py-3 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow transition">
                      + Add Supplier Vendor to Ledger
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
                <h3 className="text-base md:text-lg font-black text-slate-900">ভেন্ডর ও মিল সাপ্লায়ার্স খাতা (Supplier Vendor Ledger)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 uppercase font-extrabold border-b border-slate-200">
                        <th className="p-2.5">Vendor / Mill Name</th>
                        <th className="p-2.5">Contact Person</th>
                        <th className="p-2.5">Supplied Product</th>
                        <th className="p-2.5 text-right">Total Billed</th>
                        <th className="p-2.5 text-right">Pending Due</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {suppliers.map((sup) => (
                        <tr key={sup.id} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{sup.name}</td>
                          <td className="p-2.5 text-slate-600">{sup.contactPerson}</td>
                          <td className="p-2.5 font-semibold text-amber-700">{sup.itemSupplied}</td>
                          <td className="p-2.5 text-right font-bold text-slate-800">₹{sup.totalBilled}</td>
                          <td className="p-2.5 text-right font-black text-rose-600">₹{sup.pendingDue}</td>
                          <td className="p-2.5 text-center">
                            <button onClick={() => handleDeleteVendor(sup.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      )}

      {/* 📄 FOOTER SECTION */}
      {role === 'CUSTOMER' && (
        <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 py-8 md:py-12 px-4 md:px-6 mt-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-slate-900 flex items-center justify-center font-black text-amber-400 text-sm shadow-sm">
                  P
                </div>
                <span className="font-black text-base md:text-lg text-slate-900">PAPER<span className="text-amber-500">OLLA</span></span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                PaperOlla হলো আপনার নির্ভরযোগ্য B2B পেপার ও প্রিন্টিং সাপ্লাই পোর্টাল। সেরা কোয়ালিটির IK Copy, ITC Exxact পেপার ও জেরক্স মেসিন সরাসরি অফিশিয়াল পাইকারি রেটে সরবরাহ করা হয়।
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs mb-2">Quick Navigation</h4>
              <ul className="space-y-1 text-xs text-slate-500 font-medium">
                <li>• IK Copy Paper (75/80 GSM)</li>
                <li>• ITC Exxact Premium Copier</li>
                <li>• Color & Mono Xerox Machines</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs mb-2">Official Contact</h4>
              <div className="space-y-1 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" /> উলুবেড়িয়া / হাওড়া, পশ্চিমবঙ্গ, ভারত</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-500" /> +91 98765 43210</div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-500" /> support@paperolla.com</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-slate-200 text-[10px] text-slate-400 font-medium">
            © 2026 PaperOlla B2B Distribution Systems. All Rights Reserved.
          </div>
        </footer>
      )}

    </div>
  );
}