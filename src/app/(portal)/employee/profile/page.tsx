'use client';

import { useEffect, useState } from 'react';
import { User, Mail, Phone, Building, Briefcase, Calendar, IndianRupee, Shield } from 'lucide-react';

export default function EmployeeProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/employee/profile')
      .then(r => r.json())
      .then(data => setProfile(data.profile))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) return <p>Failed to load profile</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="gradient-primary p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <User size={40} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-green-100">{profile.designation}</p>
              <p className="text-green-200 text-sm mt-1">{profile.department} Department</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Employee ID</p>
                <p className="font-bold text-gray-900 font-mono">{profile.emp_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{profile.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{profile.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Designation</p>
                <p className="font-medium text-gray-900">{profile.designation}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-teal-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date of Joining</p>
                <p className="font-medium text-gray-900">{profile.join_date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Salary</p>
                <p className="font-bold text-green-700">₹{profile.salary?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                profile.status === 'active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <User size={20} className={profile.status === 'active' ? 'text-green-700' : 'text-red-700'} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className={`font-medium ${profile.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                  {profile.status?.charAt(0).toUpperCase() + profile.status?.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Rules */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h3 className="font-bold text-xl text-gray-900 mb-6">Service Rules & Policies</h3>
        <div className="space-y-4">
          {[
            { title: 'Working Hours', content: 'Monday to Saturday, 9:00 AM to 6:00 PM. Sunday is a weekly off. National holidays as per Karnataka Government calendar.' },
            { title: 'Leave Policy', content: 'Casual Leave: 12 days/year, Sick Leave: 12 days/year, Earned Leave: 15 days/year (accumulative up to 30 days). Leave applications must be submitted at least 3 days in advance for planned leave.' },
            { title: 'Salary Structure', content: 'Monthly salary includes Basic + HRA (20%) + DA (10%) + TA (₹2,000). Deductions include PF (12% of basic) and TDS as applicable. Salary is credited on the last working day of each month.' },
            { title: 'Code of Conduct', content: 'All employees must maintain professional conduct, follow cooperative principles, and represent KOF values in all business dealings. Disciplinary action for misconduct as per cooperative society rules.' },
            { title: 'Probation Period', content: 'New employees serve a 6-month probation period. Performance review conducted at the end of probation for confirmation.' },
            { title: 'Grievance Redressal', content: 'Employees can raise grievances to their department head or HR. Unresolved issues can be escalated to the Managing Director. All grievances will be addressed within 15 working days.' },
          ].map((rule, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h4 className="font-semibold text-gray-900 mb-1">{rule.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{rule.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
