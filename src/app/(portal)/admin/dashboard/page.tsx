'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IndianRupee, ShoppingCart, Megaphone, Briefcase, TrendingUp, Eye, ArrowUpRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-8 lg:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">Website Control Center</h1>
          <p className="text-emerald-100 text-lg">All changes here reflect instantly on your live website</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/admin/pricing" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <IndianRupee size={16} /> Update Prices
            </Link>
            <Link href="/admin/announcements" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <Megaphone size={16} /> Post Announcement
            </Link>
            <a href="/" target="_blank" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <Eye size={16} /> View Live Site
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Orders', value: data?.stats?.totalOrders || 0, icon: ShoppingCart, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { title: 'Revenue', value: `₹${((data?.stats?.totalRevenue || 0) / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { title: 'Active Tenders', value: data?.stats?.pendingLeaves || 0, icon: Megaphone, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { title: 'Active Jobs', value: 0, icon: Briefcase, color: 'from-purple-500 to-violet-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} border ${stat.border} rounded-2xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <ArrowUpRight size={16} className="text-gray-500" />
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Update Oil Prices', desc: 'Change retail, bulk & tin prices instantly', href: '/admin/pricing', icon: IndianRupee, gradient: 'from-emerald-500 to-green-600' },
          { title: 'Manage Orders', desc: 'View and process customer orders', href: '/admin/orders', icon: ShoppingCart, gradient: 'from-blue-500 to-indigo-600' },
          { title: 'Post Tender/News', desc: 'Publish announcements to website', href: '/admin/announcements', icon: Megaphone, gradient: 'from-amber-500 to-orange-600' },
          { title: 'Post Job Opening', desc: 'Add recruitment to careers page', href: '/admin/recruitments', icon: Briefcase, gradient: 'from-purple-500 to-violet-600' },
          { title: 'View Live Website', desc: 'See how your changes look', href: '/', icon: Eye, gradient: 'from-teal-500 to-cyan-600' },
          { title: 'Activity Monitor', desc: 'Real-time website interactions', href: '/admin/dashboard', icon: Activity, gradient: 'from-rose-500 to-pink-600' },
        ].map((action, idx) => (
          <Link key={idx} href={action.href} target={action.href === '/' ? '_blank' : undefined}
            className="group bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <action.icon size={22} className="text-white" />
            </div>
            <h3 className="font-bold text-white text-lg mb-1">{action.title}</h3>
            <p className="text-sm text-gray-500">{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white text-lg">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">View All →</Link>
        </div>
        {(!data?.recentOrders || data.recentOrders.length === 0) ? (
          <div className="text-center py-10">
            <ShoppingCart size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet. They will appear here when customers order via WhatsApp.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.recentOrders.slice(0, 5).map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                <div>
                  <p className="font-medium text-white text-sm">{order.customer_name}</p>
                  <p className="text-xs text-gray-500">{order.product} • {order.quantity} {order.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">₹{order.total_amount?.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                    order.status === 'dispatched' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
