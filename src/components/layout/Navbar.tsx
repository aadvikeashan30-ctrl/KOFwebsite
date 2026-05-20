'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf, Phone, Mail } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Activities', href: '/activities' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-green-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={14} />
              +91 6366975382
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} />
              kofcta2@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-amber-300 transition-colors font-medium">
              Employee Login
            </Link>
            <Link href="/login?role=admin" className="hover:text-amber-300 transition-colors font-medium">
              Admin Login
            </Link>
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
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/login" className="btn-primary ml-4 text-sm py-2">
                Portal Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/login" className="btn-primary text-center text-sm">
                Employee Login
              </Link>
              <Link href="/login?role=admin" className="btn-secondary text-center text-sm">
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
