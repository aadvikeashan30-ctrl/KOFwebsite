'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf, Phone, Mail, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about', children: [
      { name: 'About KOF', href: '/about' },
      { name: 'Management', href: '/management' },
      { name: 'Our Offices', href: '/offices' },
    ]},
    { name: 'Products', href: '/products' },
    { name: 'Marketing', href: '/marketing' },
    { name: 'Activities', href: '/activities' },
    { name: 'Recruitments', href: '/recruitments' },
    { name: 'Tenders', href: '/tenders' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-green-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> +91 6366975382</span>
            <span className="flex items-center gap-1"><Mail size={14} /> kofcta2@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-amber-300 transition-colors font-medium">Employee Portal</Link>
            <Link href="/login?role=admin" className="hover:text-amber-300 transition-colors font-medium">Admin Login</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                <Leaf className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800 leading-tight">KOF</h1>
                <p className="text-xs text-gray-500 leading-tight">Chitradurga</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.name} className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.name)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="px-3 py-2 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all font-medium text-sm flex items-center gap-1">
                    {link.name}
                    {link.children && <ChevronDown size={14} />}
                  </Link>
                  {link.children && dropdown === link.name && (
                    <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 z-50">
                      {link.children.map((child) => (
                        <Link key={child.name} href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/login" className="btn-primary ml-3 text-xs py-2 px-4">
                Portal Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link href={link.href} onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium">
                  {link.name}
                </Link>
                {link.children?.map((child) => (
                  <Link key={child.name} href={child.href} onClick={() => setIsOpen(false)}
                    className="block py-2 px-8 text-sm text-gray-500 hover:text-green-700">
                    → {child.name}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm">
                Employee Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
