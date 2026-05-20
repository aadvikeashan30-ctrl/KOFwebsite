'use client';

import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, MessageCircle, Globe, Camera, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="gradient-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 relative">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[var(--kof-gold)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/3 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  <Leaf className="text-[var(--kof-gold)]" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-[family-name:var(--font-poppins)]">KOF Chitradurga</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Since 1984</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Regional Oilseeds Growers&apos; Co-operative Society Union Ltd. — empowering farmers, delivering pure quality edible oils to Karnataka families.
              </p>
              <div className="flex gap-2.5">
                {[
                  { href: 'https://wa.me/916366975382', icon: MessageCircle, hover: 'hover:bg-green-500' },
                  { href: 'https://facebook.com/kofchitradurga', icon: Globe, hover: 'hover:bg-blue-600' },
                  { href: 'https://instagram.com/kofchitradurga', icon: Camera, hover: 'hover:bg-pink-600' },
                ].map((social) => (
                  <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 ${social.hover} flex items-center justify-center transition-all duration-300 hover:border-transparent hover:scale-110`}>
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-5 text-[var(--kof-gold)] uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Products', href: '/products' },
                  { name: 'Marketing', href: '/marketing' },
                  { name: 'Activities', href: '/activities' },
                  { name: 'Contact Us', href: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-5 text-[var(--kof-gold)] uppercase tracking-wider">Our Products</h4>
              <ul className="space-y-3">
                {['Sungold Sunflower Oil', 'Safal Groundnut Oil', 'Safal Palmolein Oil', 'Safal Soyabean Oil', 'Rice Bran Oil', 'De-oiled Cake'].map((product) => (
                  <li key={product}><span className="text-white/50 text-sm">{product}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-5 text-[var(--kof-gold)] uppercase tracking-wider">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-[var(--kof-gold)]" />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">KOF Complex, Chitradurga, Karnataka - 577501</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[var(--kof-gold)]" />
                  </div>
                  <p className="text-white/50 text-sm">+91 6366975382</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-[var(--kof-gold)]" />
                  </div>
                  <p className="text-white/50 text-sm">kofcta2@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--kof-forest-deep)] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} KOF Chitradurga. All rights reserved.</p>
          <p className="text-white/30 text-[11px] uppercase tracking-wider font-medium">
            Farmer&apos;s Oriented • 4 Districts • 50km Radius • AGMARK Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
