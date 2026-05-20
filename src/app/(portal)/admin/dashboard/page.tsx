'use client';

import { useEffect, useState } from 'react';
import { Users, ShoppingCart, Calendar, IndianRupee, TrendingUp, Clock } from 'lucide-react';

interface DashboardData {
  stats: {
    totalEmployees: number;
    totalOrders: number;
    pendingLeaves: number;
    totalRevenue: number;
  };
  recentOrders: any[];
  recentLeaves: any[];
  departmentStats: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return <p>Failed to load dashboard</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here&apos;s an overview of KOF operations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Employees', value: data.stats.totalEmployees, icon: Users, color: 'bg-blue-50 text-blue-700', iconBg: 'bg-blue-100' },
          { title: 'Total Orders', value: data.stats.totalOrders, icon: ShoppingCart, color: 'bg-green-50 text-green-700', iconBg: 'bg-green-100' },
          { title: 'Pending Leaves', value: data.stats.pendingLeaves, icon: Calendar, color: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-100' },
          { title: 'Total Revenue', value: `₹${(data.stats.totalRevenue / 1000).toFixed(0)}K`, icon: IndianRupee, color: 'bg-purple-50 text-purple-700', iconBg: 'bg-purple-100' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon size={24} className={stat.color.split(' ')[1]} />
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leaves */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Recent Leave Requests</h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
              {data.stats.pendingLeaves} pending
            </span>
          </div>
          <div className="space-y-4">
            {data.recentLeaves.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No leave requests yet</p>
            ) : (
              data.recentLeaves.map((leave: any) => (
                <div key={leave.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{leave.employee_name}</p>
                    <p className="text-xs text-gray-500">{leave.leave_type} - {leave.days} days</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                    leave.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Department Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Department Overview</h3>
          <div className="space-y-4">
            {data.departmentStats.map((dept: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{dept.department}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${(dept.count / data.stats.totalEmployees) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{dept.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <a href="/admin/orders" className="text-sm text-green-700 hover:text-green-800 font-medium">View All →</a>
        </div>
        {data.recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No orders yet. Create your first order!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Order #</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{order.order_number}</td>
                    <td className="py-3 px-2 text-gray-700">{order.customer_name}</td>
                    <td className="py-3 px-2 text-gray-700">{order.product}</td>
                    <td className="py-3 px-2 text-gray-900 font-medium">₹{order.total_amount.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'dispatched' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
