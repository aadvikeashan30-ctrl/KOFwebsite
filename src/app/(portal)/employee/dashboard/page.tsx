'use client';

import { useEffect, useState } from 'react';
import { FileText, Calendar, User, IndianRupee, Clock, CheckCircle, Bell, Megaphone, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [payslips, setPayslips] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>({ notifications: [], announcements: [], unreadCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/employee/profile').then(r => r.json()),
      fetch('/api/employee/payslips').then(r => r.json()),
      fetch('/api/employee/leaves').then(r => r.json()),
      fetch('/api/employee/notifications').then(r => r.json()),
    ]).then(([profData, payData, leaveData, notifData]) => {
      setProfile(profData.profile);
      setPayslips(payData.payslips || []);
      setLeaves(leaveData);
      setNotifications(notifData);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const latestPayslip = payslips[0];
  const leaveBalance = leaves?.leaveBalance;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, {profile?.name?.split(' ')[0]}!</h1>
        <p className="text-green-100 mt-2">
          {profile?.designation} | {profile?.department} Department
        </p>
        <div className="flex flex-wrap gap-6 mt-6">
          <div>
            <p className="text-green-200 text-xs">Employee ID</p>
            <p className="font-mono font-bold">{profile?.emp_id}</p>
          </div>
          <div>
            <p className="text-green-200 text-xs">Joining Date</p>
            <p className="font-bold">{profile?.join_date}</p>
          </div>
          <div>
            <p className="text-green-200 text-xs">Email</p>
            <p className="font-bold">{profile?.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <IndianRupee size={20} className="text-green-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Last Salary</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {latestPayslip ? `₹${latestPayslip.net_salary?.toLocaleString()}` : 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {latestPayslip ? `${latestPayslip.month} ${latestPayslip.year}` : 'No payslips yet'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-blue-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Casual Leave</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {leaveBalance ? `${leaveBalance.casual - leaveBalance.used.casual}` : '12'}
          </p>
          <p className="text-xs text-gray-500 mt-1">of 12 remaining</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-red-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Sick Leave</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {leaveBalance ? `${leaveBalance.sick - leaveBalance.used.sick}` : '12'}
          </p>
          <p className="text-xs text-gray-500 mt-1">of 12 remaining</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-purple-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total Payslips</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{payslips.length}</p>
          <p className="text-xs text-gray-500 mt-1">Generated this year</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/employee/payslips" className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow group">
          <FileText size={32} className="text-green-700 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 mb-1">View Payslips</h3>
          <p className="text-sm text-gray-600">Download your monthly salary slips</p>
        </Link>
        <Link href="/employee/leaves" className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow group">
          <Calendar size={32} className="text-blue-700 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 mb-1">Apply for Leave</h3>
          <p className="text-sm text-gray-600">Submit leave requests and check balance</p>
        </Link>
        <Link href="/employee/profile" className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow group">
          <User size={32} className="text-purple-700 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 mb-1">My Profile</h3>
          <p className="text-sm text-gray-600">View your employment details</p>
        </Link>
      </div>

      {/* Recent Payslips */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Recent Payslips</h3>
        <div className="space-y-3">
          {payslips.slice(0, 3).map((ps) => (
            <div key={ps.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-green-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{ps.month} {ps.year}</p>
                  <p className="text-xs text-gray-500">Generated: {ps.generated_date?.split('T')[0]}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">₹{ps.net_salary?.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  ps.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {ps.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Rules Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Service Rules - Quick Reference</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Working Hours', desc: 'Monday to Saturday, 9:00 AM - 6:00 PM' },
            { title: 'Casual Leave', desc: '12 days per year (non-accumulative)' },
            { title: 'Sick Leave', desc: '12 days per year (with medical certificate for 3+ days)' },
            { title: 'Earned Leave', desc: '15 days per year (accumulative up to 30 days)' },
            { title: 'Provident Fund', desc: '12% of basic salary deducted monthly' },
            { title: 'Salary Day', desc: 'Last working day of every month' },
          ].map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{rule.title}</p>
                <p className="text-xs text-gray-600">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications & Announcements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Bell size={18} className="text-amber-600" /> Notifications
            </h3>
            {notifications.unreadCount > 0 && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                {notifications.unreadCount} new
              </span>
            )}
          </div>
          <div className="space-y-3">
            {(notifications.notifications || []).slice(0, 4).map((notif: any) => (
              <div key={notif.id} className={`p-3 rounded-xl border ${notif.read ? 'bg-gray-50 border-gray-100' : 'bg-amber-50 border-amber-100'}`}>
                <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.created_at}</p>
              </div>
            ))}
            {(notifications.notifications || []).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Megaphone size={18} className="text-green-600" /> Announcements
          </h3>
          <div className="space-y-3">
            {(notifications.announcements || []).slice(0, 4).map((ann: any) => (
              <div key={ann.id} className="p-3 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-2">
                  {ann.type === 'urgent' && <AlertTriangle size={14} className="text-red-600" />}
                  <p className="text-sm font-bold text-gray-900">{ann.title}</p>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-1">{ann.created_at}</p>
              </div>
            ))}
            {(notifications.announcements || []).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No announcements</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
