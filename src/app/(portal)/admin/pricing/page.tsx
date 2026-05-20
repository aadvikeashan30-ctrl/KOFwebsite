'use client';

import { useEffect, useState } from 'react';
import { IndianRupee, Save, RefreshCw } from 'lucide-react';

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
    if (res.ok) setMessage(`${price.product_name} price updated!`);
    setSaving(null);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateField = (id: string, field: string, value: number) => {
    setPrices(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Pricing</h1>
          <p className="text-gray-600 mt-1">Update oil prices — changes reflect immediately on website</p>
        </div>
        <button onClick={fetchPrices} className="p-2 rounded-lg hover:bg-gray-100"><RefreshCw size={20} /></button>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm font-medium">{message}</div>
      )}

      {loading ? (
        <div className="text-center py-12"><div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : (
        <div className="grid gap-4">
          {prices.map((price) => (
            <div key={price.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{price.product_name}</h3>
                  <p className="text-xs text-gray-400">Last updated: {price.updated_at || 'Never'}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Retail (₹/L)</label>
                    <input type="number" value={price.retail_price} onChange={(e) => updateField(price.id, 'retail_price', +e.target.value)}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm font-bold text-green-700 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Bulk (₹/L)</label>
                    <input type="number" value={price.bulk_price} onChange={(e) => updateField(price.id, 'bulk_price', +e.target.value)}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm font-bold text-blue-700 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">15L Tin (₹)</label>
                    <input type="number" value={price.tin_price} onChange={(e) => updateField(price.id, 'tin_price', +e.target.value)}
                      className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm font-bold text-amber-700 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <button onClick={() => handleUpdate(price)} disabled={saving === price.id}
                    className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 disabled:opacity-50 mt-4 md:mt-0">
                    {saving === price.id ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="text-sm text-amber-800 font-medium">💡 Prices update in real-time on the public website and AI chatbot responses.</p>
      </div>
    </div>
  );
}
