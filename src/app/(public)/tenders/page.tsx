'use client';

import { useEffect, useState } from 'react';
import { FileText, Calendar, AlertTriangle, Download, ExternalLink } from 'lucide-react';

export default function TendersPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/announcements')
      .then(r => r.json())
      .then(data => setAnnouncements(data.announcements || []))
      .finally(() => setLoading(false));
  }, []);

  const tenders = announcements.filter(a => a.type === 'tender');
  const news = announcements.filter(a => a.type !== 'tender');

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <FileText size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Official Notices</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">Tenders & Notices</h1>
          <p className="text-xl text-green-100/80 max-w-3xl mx-auto">
            Latest procurement tenders, notices, and announcements from KOF Chitradurga
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tenders */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <FileText size={24} className="text-green-700" /> Active Tenders
                </h2>
                {tenders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                    <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No active tenders at the moment. Check back later.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tenders.map((tender) => (
                      <div key={tender.id} className="bg-white rounded-2xl border border-gray-100 hover:border-green-200 p-6 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">TENDER</span>
                              <span className="text-xs text-gray-400">{tender.created_at}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{tender.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{tender.content}</p>
                          </div>
                          <a href="https://wa.me/916366975382?text=Hi, I want details about the tender: " target="_blank" rel="noopener noreferrer"
                             className="flex-shrink-0 p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700">
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* News & Updates */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <AlertTriangle size={24} className="text-amber-600" /> News & Updates
                </h2>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className={`rounded-xl p-5 border ${
                      item.type === 'urgent' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-100'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === 'urgent' && <AlertTriangle size={14} className="text-red-600" />}
                        <span className="text-xs font-bold text-gray-500 uppercase">{item.type}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-3">{item.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{item.created_at}</p>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                      <p className="text-gray-500 text-sm">No news updates</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
