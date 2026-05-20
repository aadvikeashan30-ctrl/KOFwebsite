'use client';

import { useEffect, useState } from 'react';
import { Calendar, Plus, X, Clock, Check, XCircle } from 'lucide-react';

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    leave_type: '', start_date: '', end_date: '', reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    fetch('/api/employee/leaves')
      .then(r => r.json())
      .then(data => {
        setLeaves(data.leaves || []);
        setLeaveBalance(data.leaveBalance);
      })
      .finally(() => setLoading(false));
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/employee/leaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Leave application submitted successfully!');
      setShowModal(false);
      setForm({ leave_type: '', start_date: '', end_date: '', reason: '' });
      fetchLeaves();
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leaves</h1>
          <p className="text-gray-600 mt-1">Apply for leave and track your balance</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Apply Leave
        </button>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')}><X size={16} /></button>
        </div>
      )}

      {/* Leave Balance */}
      {leaveBalance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Casual Leave</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">CL</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {leaveBalance.casual - leaveBalance.used.casual}
              <span className="text-lg text-gray-400 font-normal">/{leaveBalance.casual}</span>
            </p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${((leaveBalance.casual - leaveBalance.used.casual) / leaveBalance.casual) * 100}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Sick Leave</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">SL</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {leaveBalance.sick - leaveBalance.used.sick}
              <span className="text-lg text-gray-400 font-normal">/{leaveBalance.sick}</span>
            </p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" 
                style={{ width: `${((leaveBalance.sick - leaveBalance.used.sick) / leaveBalance.sick) * 100}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Earned Leave</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">EL</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {leaveBalance.earned - leaveBalance.used.earned}
              <span className="text-lg text-gray-400 font-normal">/{leaveBalance.earned}</span>
            </p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" 
                style={{ width: `${((leaveBalance.earned - leaveBalance.used.earned) / leaveBalance.earned) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Leave History */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Leave History</h3>
        {loading ? (
          <div className="text-center py-8"><div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : leaves.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No leave records found</p>
        ) : (
          <div className="space-y-3">
            {leaves.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    leave.status === 'approved' ? 'bg-green-100' :
                    leave.status === 'rejected' ? 'bg-red-100' :
                    'bg-amber-100'
                  }`}>
                    {leave.status === 'approved' ? <Check size={20} className="text-green-700" /> :
                     leave.status === 'rejected' ? <XCircle size={20} className="text-red-700" /> :
                     <Clock size={20} className="text-amber-700" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1)} Leave
                    </p>
                    <p className="text-xs text-gray-500">
                      {leave.start_date} to {leave.end_date} ({leave.days} days)
                    </p>
                    {leave.reason && <p className="text-xs text-gray-500 mt-0.5">Reason: {leave.reason}</p>}
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                  leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                  leave.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Apply for Leave</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
            </div>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type *</label>
                <select required value={form.leave_type} onChange={(e) => setForm({...form, leave_type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="">Select Type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date *</label>
                  <input type="date" required value={form.start_date} onChange={(e) => setForm({...form, start_date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date *</label>
                  <input type="date" required value={form.end_date} onChange={(e) => setForm({...form, end_date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea rows={3} value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                  placeholder="Reason for leave..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
