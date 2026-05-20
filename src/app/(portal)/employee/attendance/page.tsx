'use client';

import { useEffect, useState } from 'react';
import { Clock, LogIn, LogOut, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function EmployeeAttendance() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [todayStatus, setTodayStatus] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = () => {
    fetch('/api/employee/attendance').then(r => r.json())
      .then(data => {
        setAttendance(data.attendance || []);
        setStats(data.stats);
        const today = new Date().toISOString().split('T')[0];
        const todayRec = (data.attendance || []).find((a: any) => a.date === today);
        setTodayStatus(todayRec);
      })
      .finally(() => setLoading(false));
  };

  const handleAction = async (action: string) => {
    const res = await fetch('/api/employee/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`${action === 'check_in' ? 'Checked In' : 'Checked Out'} at ${data.time}`);
      fetchData();
    } else {
      setMessage(data.error);
    }
  };

  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">Track your daily attendance and working hours</p>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
          {message}
        </div>
      )}

      {/* Today's Card */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-green-100 text-sm font-medium">{currentDate}</p>
            <p className="text-4xl font-black mt-2">{currentTime}</p>
            <div className="flex items-center gap-2 mt-3">
              {todayStatus ? (
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium">
                  <CheckCircle size={14} /> Checked In: {todayStatus.check_in}
                  {todayStatus.check_out && <> | Out: {todayStatus.check_out}</>}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
                  <Clock size={14} /> Not checked in yet
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {!todayStatus ? (
              <button onClick={() => handleAction('check_in')}
                className="flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all shadow-lg">
                <LogIn size={20} /> Check In
              </button>
            ) : !todayStatus.check_out ? (
              <button onClick={() => handleAction('check_out')}
                className="flex items-center gap-2 bg-white text-red-700 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-all shadow-lg">
                <LogOut size={20} /> Check Out
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <CheckCircle size={20} />
                <span className="font-medium">Day Complete</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stats.present}</p>
            <p className="text-xs text-gray-400 mt-1">days this month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <XCircle size={18} className="text-red-600" />
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stats.absent}</p>
            <p className="text-xs text-gray-400 mt-1">days this month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-amber-600" />
              <span className="text-sm text-gray-600">Half Day</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stats.half_day}</p>
            <p className="text-xs text-gray-400 mt-1">days this month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-purple-600" />
              <span className="text-sm text-gray-600">On Leave</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stats.on_leave}</p>
            <p className="text-xs text-gray-400 mt-1">days this month</p>
          </div>
        </div>
      )}

      {/* Attendance Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">This Month&apos;s Log</h3>
        {loading ? (
          <div className="text-center py-8"><div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
            ))}
            {attendance.map((record) => {
              const day = parseInt(record.date.split('-')[2]);
              return (
                <div key={record.id} className={`text-center py-3 rounded-xl text-sm font-medium ${
                  record.status === 'present' ? 'bg-green-50 text-green-700 border border-green-200' :
                  record.status === 'absent' ? 'bg-red-50 text-red-700 border border-red-200' :
                  record.status === 'half_day' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  <p className="font-bold">{day}</p>
                  <p className="text-[10px] mt-0.5">
                    {record.check_in || '—'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
