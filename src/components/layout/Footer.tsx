'use client';

import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, MessageCircle, Globe, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="text-amber-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">KOF Chitradurga</h3>
                <p className="text-xs text-green-200">Since 1984</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Regional Oilseeds Growers&apos; Co-operative Society Union Ltd., 
              committed to empowering farmers and delivering pure, quality edible oils.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://wa.me/916366975382" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-all">
                <MessageCircle size={20} />
              </a>
              <a href="https://facebook.com/kofchitradurga" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all">
                <Globe size={20} />
              </a>
              <a href="https://instagram.com/kofchitradurga" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all">
                <Camera size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Products', href: '/products' },
                { name: 'Activities', href: '/activities' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-green-200 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-amber-400">Our Products</h4>
            <ul className="space-y-3">
              {[
                'Sungold Sunflower Oil',
                'Safal Groundnut Oil',
                'Safal Palmolein Oil',
                'Safal Soyabean Oil',
                'Rice Bran Oil',
                'De-oiled Cake',
              ].map((product) => (
                <li key={product}>
                  <span className="text-green-200 text-sm">{product}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-amber-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-green-200 text-sm">KOF Complex, Chitradurga, Karnataka - 577501</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <p className="text-green-200 text-sm">+91 6366975382</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <p className="text-green-200 text-sm">kofcta2@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-300 text-sm">
            &copy; {new Date().getFullYear()} KOF Chitradurga. All rights reserved.
          </p>
          <p className="text-green-400 text-xs">
            Farmer&apos;s Oriented | 2 Months Delivery | 4 Districts Coverage
          </p>
        </div>
      </div>
    </footer>
  );
}
