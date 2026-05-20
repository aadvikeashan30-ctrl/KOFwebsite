'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Leaf, LayoutDashboard, Users, FileText, Calendar, ShoppingCart, 
  LogOut, Menu, X, Bell, User, ChevronDown, Settings
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
      .then(res => {
        if (!res.ok) throw new Error('Not auth');
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const navItems = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Employees', href: '/admin/employees', icon: Users },
        { name: 'Payslips', href: '/admin/payslips', icon: FileText },
        { name: 'Leaves', href: '/admin/leaves', icon: Calendar },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Pricing', href: '/admin/pricing', icon: Settings },
        { name: 'Recruitments', href: '/admin/recruitments', icon: Users },
        { name: 'Announcements', href: '/admin/announcements', icon: Bell },
      ]
    : [
        { name: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
        { name: 'Attendance', href: '/employee/attendance', icon: Settings },
        { name: 'Payslips', href: '/employee/payslips', icon: FileText },
        { name: 'Leaves', href: '/employee/leaves', icon: Calendar },
        { name: 'Profile', href: '/employee/profile', icon: User },
      ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">KOF Chitradurga</h1>
              <p className="text-xs text-gray-500">{isAdmin ? 'Admin Panel' : 'Employee Portal'}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <User size={18} className="text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.emp_id}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <User size={16} className="text-green-700" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
