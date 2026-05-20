'use client';

import { MapPin, Phone, Clock, Building2, Globe } from 'lucide-react';

const offices = [
  { name: 'Head Office - Chitradurga', type: 'Head Office', address: 'KOF Complex, Near APMC Yard, Chitradurga - 577501', phone: '+91 6366975382', email: 'kofcta2@gmail.com', hours: 'Mon-Sat: 9:00 AM - 6:00 PM', services: ['Administration', 'Packing Unit', 'Quality Lab', 'Dispatch'] },
  { name: 'Davangere Branch', type: 'District Office', address: 'KOF Branch Office, APMC Road, Davangere - 577002', phone: '+91 8192-234567', email: 'kof.dvg@gmail.com', hours: 'Mon-Sat: 9:30 AM - 5:30 PM', services: ['Procurement', 'Distribution', 'Farmer Services'] },
  { name: 'Shimoga Branch', type: 'District Office', address: 'KOF District Office, Market Area, Shimoga - 577201', phone: '+91 8182-245678', email: 'kof.smg@gmail.com', hours: 'Mon-Sat: 9:30 AM - 5:30 PM', services: ['Procurement', 'Distribution', 'Sales Counter'] },
  { name: 'Haveri Branch', type: 'District Office', address: 'KOF Office, Near Bus Stand, Haveri - 581110', phone: '+91 8375-256789', email: 'kof.hvr@gmail.com', hours: 'Mon-Sat: 9:30 AM - 5:30 PM', services: ['AATC Research Center', 'Farmer Training', 'Seed Distribution'] },
  { name: 'KOF Federation - Bangalore', type: 'State Office', address: 'Karnataka Co-operative Oilseeds Federation, Rajajinagar, Bangalore - 560010', phone: '+91 80-23456789', email: 'kof.blr@gmail.com', hours: 'Mon-Fri: 10:00 AM - 5:00 PM', services: ['Policy & Planning', 'State Coordination', 'Government Liaison'] },
];

export default function OfficesPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Building2 size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Our Locations</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">Our Offices</h1>
          <p className="text-xl text-green-100/80 max-w-3xl mx-auto">
            Strategically located across 4 districts for maximum farmer and customer reach
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 hover:border-green-200 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        office.type === 'Head Office' ? 'bg-green-100 text-green-800' :
                        office.type === 'State Office' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {office.type}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4">{office.name}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{office.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">{office.phone}</p>
                          <p className="text-sm text-gray-600">{office.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{office.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-72">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Services Available</p>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((s) => (
                        <span key={s} className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium border border-green-100">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
