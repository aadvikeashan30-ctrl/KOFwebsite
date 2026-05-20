'use client';

import { Crown, Users, Award, Building2, Star } from 'lucide-react';

const boardMembers = [
  { name: 'Sri B. Mallikarjuna Reddy', designation: 'President', department: 'Board of Directors', experience: '15+ years in cooperative management' },
  { name: 'Sri Rangaswamy K', designation: 'Vice President', department: 'Board of Directors', experience: '12+ years in oilseed industry' },
  { name: 'Sri Basavaraj H', designation: 'Managing Director', department: 'Operations', experience: '20+ years in cooperative administration' },
  { name: 'Smt. Shanthamma R', designation: 'Director - Finance', department: 'Finance & Accounts', experience: '10+ years in financial management' },
  { name: 'Sri Thimmappa N', designation: 'Director - Production', department: 'Production & Quality', experience: '18+ years in oil processing' },
  { name: 'Sri Hanumanthappa G', designation: 'Director - Procurement', department: 'Farmer Relations', experience: '14+ years in agricultural procurement' },
  { name: 'Sri Veerabhadrappa M', designation: 'Director - Marketing', department: 'Sales & Distribution', experience: '11+ years in FMCG marketing' },
  { name: 'Smt. Lakshmidevi K', designation: 'Director - Women Welfare', department: 'Social Development', experience: '8+ years in cooperative welfare' },
];

const committees = [
  { name: 'Executive Committee', members: 5, role: 'Day-to-day operations and policy implementation' },
  { name: 'Finance Committee', members: 3, role: 'Budget allocation, audit oversight, financial planning' },
  { name: 'Procurement Committee', members: 4, role: 'Oilseed procurement pricing and vendor management' },
  { name: 'Marketing Committee', members: 3, role: 'Brand strategy, distribution, and promotional activities' },
  { name: 'HR & Welfare Committee', members: 3, role: 'Employee welfare, recruitment, and training programs' },
];

export default function ManagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 border border-white/20">
            <Crown size={16} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Leadership Team</span>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">Our Management</h1>
          <p className="text-xl text-green-100/80 max-w-3xl mx-auto">
            Dedicated leaders driving KOF&apos;s mission of empowering farmers and delivering quality to every household
          </p>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Board of Directors</h2>
            <p className="text-gray-500">Elected representatives guiding KOF&apos;s cooperative vision</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="group bg-white rounded-3xl border border-gray-100 hover:border-green-200 p-6 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 hover:-translate-y-2 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl font-black">{member.name.split(' ').pop()?.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-green-700 font-semibold text-sm mt-1">{member.designation}</p>
                <p className="text-gray-500 text-xs mt-1">{member.department}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Standing Committees</h2>
            <p className="text-gray-500">Specialized committees ensuring efficient governance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center">
                    <Users size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{committee.name}</h3>
                    <p className="text-xs text-green-700 font-medium">{committee.members} Members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{committee.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Values */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12">Our Governance Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Transparency', desc: 'All financial decisions and procurement processes are conducted with full transparency and accountability' },
              { icon: Users, title: 'Democratic', desc: 'Board elected by member societies following cooperative principles of one-member-one-vote' },
              { icon: Star, title: 'Farmer Welfare', desc: 'Every decision prioritizes the welfare and fair compensation of oilseed growing farmers' },
            ].map((val, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <val.icon size={36} className="text-amber-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-green-200/70 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
