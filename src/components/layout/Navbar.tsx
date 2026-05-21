'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf, Phone, Mail, ChevronDown } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useTranslation } from '@/components/providers/LocaleProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about', children: [
      { name: t('nav.aboutKof'), href: '/about' },
      { name: t('nav.management'), href: '/management' },
      { name: t('nav.offices'), href: '/offices' },
    ]},
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.marketing'), href: '/marketing' },
    { name: t('nav.activities'), href: '/activities' },
    { name: t('nav.recruitments'), href: '/recruitments' },
    { name: t('nav.tenders'), href: '/tenders' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--kof-forest-deep)] text-white text-sm py-2.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <Phone size={13} /> +91 6366975382
            </span>
            <span className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <Mail size={13} /> kofcta2@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link href="/login" className="text-[var(--kof-gold-light)] hover:text-[var(--kof-gold)] transition-colors font-medium text-xs uppercase tracking-wider">
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-[var(--kof-forest)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl gradient-forest flex items-center justify-center shadow-lg shadow-[var(--kof-forest)]/20 group-hover:shadow-[var(--kof-forest)]/40 transition-shadow">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-black text-[var(--kof-forest)] leading-tight font-[family-name:var(--font-poppins)]">KOF</h1>
                <p className="text-[10px] text-gray-400 leading-tight font-medium uppercase tracking-wider">Chitradurga</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.name} className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.name)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="px-3 py-2 rounded-xl text-[var(--kof-slate)] hover:text-[var(--kof-forest)] hover:bg-[var(--kof-forest)]/5 transition-all duration-300 font-medium text-[13px] flex items-center gap-1">
                    {link.name}
                    {link.children && <ChevronDown size={13} className="opacity-50" />}
                  </Link>
                  {link.children && dropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 py-2.5 w-52 z-[60] animate-scale-in">
                      {link.children.map((child) => (
                        <Link key={child.name} href={child.href}
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-[var(--kof-forest)]/5 hover:text-[var(--kof-forest)] transition-all font-medium">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/login" className="ml-4 bg-[var(--kof-forest)] hover:bg-[var(--kof-forest-light)] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-[var(--kof-forest)]/20 hover:shadow-[var(--kof-forest)]/40 hover:-translate-y-0.5">
                {t('nav.admin')}
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link href={link.href} onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 rounded-xl text-[var(--kof-slate)] hover:bg-[var(--kof-forest)]/5 hover:text-[var(--kof-forest)] font-medium transition-all">
                  {link.name}
                </Link>
                {link.children?.map((child) => (
                  <Link key={child.name} href={child.href} onClick={() => setIsOpen(false)}
                    className="block py-2 px-8 text-sm text-gray-400 hover:text-[var(--kof-forest)]">
                    → {child.name}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <LanguageToggle />
              <Link href="/login" onClick={() => setIsOpen(false)} className="btn-primary text-sm">
                {t('nav.admin')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
