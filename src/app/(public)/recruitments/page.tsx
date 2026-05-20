'use client';

import { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, Send, Users, CheckCircle, IndianRupee, Loader2 } from 'lucide-react';

export default function RecruitmentsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/recruitments')
      .then(r => r.json())
      .then(data => setJobs(data.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Briefcase size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Career Opportunities</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">Recruitments</h1>
          <p className="text-xl text-green-100/80 max-w-3xl mx-auto">
            Join the KOF family - build your career while empowering Karnataka&apos;s farmers
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Why Join KOF?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Stable Career', desc: 'Government-backed cooperative with 40+ years of legacy' },
              { icon: IndianRupee, title: 'Good Benefits', desc: 'PF, gratuity, medical benefits, and annual increments' },
              { icon: CheckCircle, title: 'Work-Life Balance', desc: '6-day week with all government holidays' },
              { icon: Briefcase, title: 'Growth Path', desc: 'Internal promotions and skill development programs' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-green-50 border border-green-100">
                <item.icon size={32} className="text-green-700 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Current Openings</h2>
          <p className="text-gray-500 mb-10">Positions posted by KOF administration</p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="text-green-700 animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
              <Briefcase size={56} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Open Positions Currently</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We don&apos;t have any openings right now. Follow us on social media or check back later for new opportunities.
              </p>
              <a href="mailto:kofcta2@gmail.com" className="inline-block mt-6 text-green-700 font-semibold hover:underline">
                Send your resume to kofcta2@gmail.com
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-gray-100 hover:border-green-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-bold text-xl text-gray-900">{job.title}</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{job.type}</span>
                      </div>
                      {job.description && <p className="text-sm text-gray-600 mb-3">{job.description}</p>}
                      {job.requirements && <p className="text-xs text-gray-500 mb-3">Requirements: {job.requirements}</p>}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        {job.salary_range && <span className="flex items-center gap-1"><IndianRupee size={14} /> {job.salary_range}</span>}
                        {job.deadline && <span className="flex items-center gap-1"><Clock size={14} /> Deadline: {job.deadline}</span>}
                      </div>
                    </div>
                    <a href={`https://wa.me/916366975382?text=Hi, I want to apply for: ${job.title} at ${job.location}`}
                       target="_blank" rel="noopener noreferrer"
                       className="flex-shrink-0 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg">
                      <Send size={14} /> Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-amber-50 rounded-2xl p-8 border border-amber-200 text-center">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Interested in working with us?</h3>
            <p className="text-gray-600 mb-4">Send your resume to <strong>kofcta2@gmail.com</strong> — we reach out when suitable positions open.</p>
          </div>
        </div>
      </section>
    </>
  );
}
