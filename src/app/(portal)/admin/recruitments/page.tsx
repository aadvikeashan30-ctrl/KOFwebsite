'use client';

import { useEffect, useState } from 'react';
import { Briefcase, Plus, X, Trash2 } from 'lucide-react';

export default function AdminRecruitments() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salary_range: '', deadline: '' });

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = () => {
    fetch('/api/admin/recruitments').then(r => r.json())
      .then(data => setJobs(data.jobs || []))
      .finally(() => setLoading(false));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/recruitments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setMessage('Job posted!'); setShowModal(false); setForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salary_range: '', deadline: '' }); fetchJobs(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job posting?')) return;
    await fetch(`/api/admin/recruitments?id=${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Recruitments</h1>
          <p className="text-gray-600 mt-1">Post and manage job openings on the website</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2"><Plus size={18} /> Post New Job</button>
      </div>

      {message && <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex justify-between"><span>{message}</span><button onClick={() => setMessage('')}><X size={16} /></button></div>}

      {loading ? (
        <div className="text-center py-12"><div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
          <Briefcase size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No job postings yet. Click &quot;Post New Job&quot; to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{job.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{job.status}</span>
                </div>
                <p className="text-sm text-gray-500">{job.department} • {job.location} • {job.type}</p>
                {job.deadline && <p className="text-xs text-red-500 mt-1">Deadline: {job.deadline}</p>}
              </div>
              <button onClick={() => handleDelete(job.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Post New Job</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. District Marketing Officer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input required value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Marketing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input required value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Chitradurga" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Job description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <input value={form.salary_range} onChange={(e) => setForm({...form, salary_range: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="₹30,000 - ₹45,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({...form, deadline: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-800/50">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
