'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Leaf, LayoutDashboard, ShoppingCart, IndianRupee, Briefcase, 
  Megaphone, Image as ImageIcon, LogOut, Menu, X, User, Globe
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
  emp_id: string;
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => { if (!res.ok) throw new Error('Not auth'); return res.json(); })
      .then(data => { setUser(data.user); setLoading(false); })
      .catch(() => { router.push('/login'); });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') return null;

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pricing', href: '/admin/pricing', icon: IndianRupee },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Recruitments', href: '/admin/recruitments', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar - Dark Glass */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-500 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-800">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Leaf className="text-white" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">KOF Admin</h1>
              <p className="text-xs text-emerald-400">Website Control Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">Website Management</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}>
                  <item.icon size={20} />
                  {item.name}
                  {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                </Link>
              );
            })}

            <div className="my-6 border-t border-gray-800" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">Quick Links</p>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
              <Globe size={20} /> View Website
            </a>
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-800/50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <header className="h-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-800 text-gray-400">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="hidden lg:block">
            <h2 className="text-lg font-bold text-white">{navItems.find(n => n.href === pathname)?.name || 'Admin'}</h2>
            <p className="text-xs text-gray-500">Manage your website content</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-400">● LIVE</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
