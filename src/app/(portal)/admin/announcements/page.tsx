'use client';

import { useEffect, useState } from 'react';
import { Megaphone, Plus, X, Trash2, AlertTriangle, Newspaper, Bell } from 'lucide-react';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ title: '', content: '', type: 'general', target: 'all' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = () => {
    fetch('/api/admin/announcements').then(r => r.json())
      .then(data => setAnnouncements(data.announcements || []))
      .finally(() => setLoading(false));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Announcement published!');
      setShowModal(false);
      setForm({ title: '', content: '', type: 'general', target: 'all' });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const typeIcon = (type: string) => {
    switch(type) {
      case 'tender': return <Newspaper size={18} className="text-blue-600" />;
      case 'urgent': return <AlertTriangle size={18} className="text-red-600" />;
      case 'news': return <Megaphone size={18} className="text-green-600" />;
      default: return <Bell size={18} className="text-gray-600" />;
    }
  };

  const typeColor = (type: string) => {
    switch(type) {
      case 'tender': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'urgent': return 'bg-red-50 border-red-200 text-red-700';
      case 'news': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements & Tenders</h1>
          <p className="text-gray-600 mt-1">Post updates, tenders, and news for employees and public</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Announcement
        </button>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')}><X size={16} /></button>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">No announcements yet</div>
        ) : (
          announcements.map((ann) => (
            <div key={ann.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor(ann.type).split(' ')[0]}`}>
                    {typeIcon(ann.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{ann.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor(ann.type)}`}>
                        {ann.type}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                        {ann.target}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ann.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{ann.created_at}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(ann.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Announcement</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Announcement title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea required rows={4} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Detailed announcement content..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="general">General</option>
                    <option value="tender">Tender</option>
                    <option value="news">News</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                  <select value={form.target} onChange={(e) => setForm({...form, target: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="all">Everyone</option>
                    <option value="employees">Employees Only</option>
                    <option value="public">Public Website</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
