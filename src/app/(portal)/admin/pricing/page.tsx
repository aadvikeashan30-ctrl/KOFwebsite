'use client';

import { useEffect, useState } from 'react';
import { IndianRupee, Save, RefreshCw, Check, AlertCircle } from 'lucide-react';

export default function AdminPricing() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchPrices(); }, []);

  const fetchPrices = () => {
    fetch('/api/admin/pricing').then(r => r.json())
      .then(data => setPrices(data.prices || []))
      .finally(() => setLoading(false));
  };

  const handleUpdate = async (price: any) => {
    setSaving(price.id);
    const res = await fetch('/api/admin/pricing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: price.id, retail_price: price.retail_price, bulk_price: price.bulk_price, tin_price: price.tin_price }),
    });
    if (res.ok) setMessage(`✓ ${price.product_name} updated!`);
    setSaving(null);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateField = (id: string, field: string, value: number) => {
    setPrices(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Daily Pricing</h1>
          <p className="text-gray-400 mt-1">Changes reflect <span className="text-emerald-400 font-semibold">instantly</span> on website & AI chatbot</p>
        </div>
        <button onClick={fetchPrices} className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all border border-gray-700">
          <RefreshCw size={18} />
        </button>
      </div>

      {message && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium animate-scale-in">
          <Check size={16} /> {message}
        </div>
      )}

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-amber-300 font-medium">How pricing works</p>
          <p className="text-xs text-gray-400 mt-0.5">Update any price below → Click Save → Price changes on public website homepage, products page, and AI chatbot responses immediately.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : (
        <div className="grid gap-4">
          {prices.map((price, idx) => (
            <div key={price.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{price.product_name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Last updated: {price.updated_at || 'Just now'}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Retail (₹/L)</label>
                    <input type="number" value={price.retail_price} onChange={(e) => updateField(price.id, 'retail_price', +e.target.value)}
                      className="w-28 px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Bulk (₹/L)</label>
                    <input type="number" value={price.bulk_price} onChange={(e) => updateField(price.id, 'bulk_price', +e.target.value)}
                      className="w-28 px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm font-bold text-blue-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">15L Tin (₹)</label>
                    <input type="number" value={price.tin_price} onChange={(e) => updateField(price.id, 'tin_price', +e.target.value)}
                      className="w-32 px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm font-bold text-amber-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <button onClick={() => handleUpdate(price)} disabled={saving === price.id}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 mt-5 lg:mt-0">
                    {saving === price.id ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
