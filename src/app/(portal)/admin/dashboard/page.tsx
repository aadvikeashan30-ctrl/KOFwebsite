'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IndianRupee, ShoppingCart, Megaphone, Briefcase, TrendingUp, Eye, ArrowUpRight, Activity, RefreshCw, Globe, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockChartData = [
  { month: 'Jan', revenue: 45000, orders: 12 },
  { month: 'Feb', revenue: 52000, orders: 15 },
  { month: 'Mar', revenue: 61000, orders: 18 },
  { month: 'Apr', revenue: 48000, orders: 14 },
  { month: 'May', revenue: 72000, orders: 22 },
  { month: 'Jun', revenue: 85000, orders: 28 },
];

const productSales = [
  { name: 'Sunflower', sales: 42 },
  { name: 'Groundnut', sales: 28 },
  { name: 'Palmolein', sales: 18 },
  { name: 'Soyabean', sales: 15 },
  { name: 'Rice Bran', sales: 12 },
];

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
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { title: 'Total Orders', value: data?.stats?.totalOrders || 0, icon: ShoppingCart, change: '+12%', gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
    { title: 'Revenue', value: `₹${((data?.stats?.totalRevenue || 0) / 1000).toFixed(0)}K`, icon: TrendingUp, change: '+8%', gradient: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-500/20' },
    { title: 'Announcements', value: data?.stats?.totalAnnouncements || 0, icon: Megaphone, change: 'Active', gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
    { title: 'Active Jobs', value: data?.stats?.activeJobs || 0, icon: Briefcase, change: 'Posted', gradient: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-500/20' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-8 lg:p-10"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#D4A017]/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
            <span className="text-emerald-100 text-sm font-medium">Website Control Center</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2 font-[family-name:var(--font-poppins)]">
            Welcome, Admin
          </h1>
          <p className="text-emerald-100/70 text-lg mb-6">All changes reflect instantly on your live website</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/pricing" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <IndianRupee size={14} /> Update Prices
            </Link>
            <Link href="/admin/announcements" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <Megaphone size={14} /> Post Tender
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className="bg-[#D4A017]/20 hover:bg-[#D4A017]/30 border border-[#D4A017]/30 text-[#D4A017] font-semibold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2">
              <Globe size={14} /> View Live Site
            </a>
          </div>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
            className={`bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 ${stat.shadow}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-black text-white font-[family-name:var(--font-poppins)]">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-white text-lg font-[family-name:var(--font-poppins)]">Revenue Overview</h3>
              <p className="text-gray-500 text-xs mt-0.5">Monthly performance trend</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <TrendingUp size={12} /> +18% this quarter
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}K`} />
                <Tooltip
                  contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Product Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="font-bold text-white text-lg mb-1 font-[family-name:var(--font-poppins)]">Product Sales</h3>
          <p className="text-gray-500 text-xs mb-6">Orders by product type</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSales} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} width={70} />
                <Tooltip
                  contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#D4A017" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions + Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="font-bold text-white text-lg mb-5 font-[family-name:var(--font-poppins)]">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Update Prices', href: '/admin/pricing', icon: IndianRupee, gradient: 'from-emerald-500 to-green-600' },
              { title: 'New Order', href: '/admin/orders', icon: ShoppingCart, gradient: 'from-blue-500 to-indigo-600' },
              { title: 'Post Tender', href: '/admin/announcements', icon: Megaphone, gradient: 'from-amber-500 to-orange-600' },
              { title: 'Post Job', href: '/admin/recruitments', icon: Briefcase, gradient: 'from-purple-500 to-violet-600' },
            ].map((action, idx) => (
              <Link key={idx} href={action.href}
                className="group bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 rounded-xl p-4 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <action.icon size={18} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-white">{action.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">Reflects live →</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white text-lg font-[family-name:var(--font-poppins)]">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">View All →</Link>
          </div>
          {(!data?.recentOrders || data.recentOrders.length === 0) ? (
            <div className="text-center py-12">
              <ShoppingCart size={36} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No orders yet</p>
              <p className="text-gray-600 text-xs mt-1">Orders from WhatsApp will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentOrders.slice(0, 4).map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-xl border border-gray-800/50 hover:border-gray-700 transition-all">
                  <div>
                    <p className="font-medium text-white text-sm">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400 text-sm">₹{order.total_amount?.toLocaleString()}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      order.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
                      order.status === 'dispatched' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                      'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Activity size={14} className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-white font-[family-name:var(--font-poppins)]">System Status</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">All Systems Operational</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Website', status: 'Online', icon: Globe, color: 'emerald' },
            { label: 'AI Chatbot', status: 'Active', icon: Zap, color: 'amber' },
            { label: 'WhatsApp', status: 'Connected', icon: Activity, color: 'blue' },
          ].map((s, idx) => (
            <div key={idx} className="bg-gray-800/40 rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-${s.color}-500/10 border border-${s.color}-500/20 flex items-center justify-center`}>
                  <s.icon size={14} className={`text-${s.color}-400`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className={`text-xs text-${s.color}-400 font-medium`}>● {s.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
