'use client';

import { useEffect, useState } from 'react';
import { Calendar, Check, X as XIcon, Filter } from 'lucide-react';

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeaves();
  }, [filter]);

  const fetchLeaves = () => {
    const url = filter === 'all' ? '/api/admin/leaves' : `/api/admin/leaves?status=${filter}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setLeaves(data.leaves || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    await fetch('/api/admin/leaves', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchLeaves();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Review and approve employee leave requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaves List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : leaves.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
            No leave requests found
          </div>
        ) : (
          leaves.map((leave) => (
            <div key={leave.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    leave.leave_type === 'casual' ? 'bg-blue-100' :
                    leave.leave_type === 'sick' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    <Calendar size={24} className={
                      leave.leave_type === 'casual' ? 'text-blue-700' :
                      leave.leave_type === 'sick' ? 'text-red-700' :
                      'text-purple-700'
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{leave.employee_name}</p>
                      <span className="text-xs text-gray-500">({leave.emp_id})</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1)} Leave - {leave.days} day(s)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {leave.start_date} to {leave.end_date} | Dept: {leave.department}
                    </p>
                    {leave.reason && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 px-3 py-2 rounded-lg">
                        Reason: {leave.reason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                    leave.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>

                  {leave.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(leave.id, 'approved')}
                        className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, 'rejected')}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                        title="Reject"
                      >
                        <XIcon size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
