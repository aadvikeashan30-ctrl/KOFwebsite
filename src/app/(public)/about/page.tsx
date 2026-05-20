import { Award, Users, Factory, Truck, Target, Eye, Leaf, Calendar, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About KOF Chitradurga</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Regional Oilseeds Growers&apos; Co-operative Society Union Ltd. - 
            Empowering farmers and producing quality edible oils since 1984
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-green-700 mb-4">
                <Calendar size={20} />
                <span className="font-semibold">Our History</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Established on Anand Model</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Karnataka Co-operative Oilseeds Growers&apos; Federation Limited, Bangalore was 
                  registered on 26th October, 1984 to implement the project &ldquo;Restructuring of 
                  Edible Oil and Oilseeds Production and Marketing in Karnataka.&rdquo;
                </p>
                <p>
                  The project was structured on the Anand Model of Milk Co-operatives, creating a 
                  two-tier structure with primary oilseed growers&apos; cooperative societies at the 
                  village level affiliated with the Federation at the state level.
                </p>
                <p>
                  The Regional Oilseeds Growers Co-operative Society Union (ROGCSU) Ltd., Chitradurga 
                  is one of the key units implementing this vision, procuring groundnut and sunflower 
                  seeds from cooperative societies across multiple districts.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-3xl p-8">
              <div className="space-y-6">
                {[
                  { year: '1984', event: 'KOF Federation Registered in Bangalore' },
                  { year: '1990', event: 'Chitradurga ROGCSU established' },
                  { year: '2006', event: 'Modern packing unit inaugurated' },
                  { year: '2010', event: 'Sungold brand launched with AGMARK' },
                  { year: '2015', event: 'Expanded to 4 district coverage' },
                  { year: '2024', event: 'Digital transformation & modernization' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-16 h-8 bg-green-700 text-white text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.year}
                    </div>
                    <p className="text-gray-700 text-sm pt-1">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={28} className="text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading cooperative oilseeds federation in South India, empowering every 
                farmer with fair prices and providing every household with pure, certified edible oils 
                at affordable rates.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} className="text-amber-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide better services to oilseed growers, create sustainable markets for edible 
                oils and by-products, and ensure quality at every step from farm to family through 
                cooperative principles and modern technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Highlights</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '40+', label: 'Years of Service', color: 'text-green-700 bg-green-50' },
              { icon: Factory, value: '6,198+', label: 'MT Oil Packed', color: 'text-blue-700 bg-blue-50' },
              { icon: Users, value: '22+', label: 'Team Members', color: 'text-amber-700 bg-amber-50' },
              { icon: Truck, value: '50km', label: 'Delivery Radius', color: 'text-purple-700 bg-purple-50' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={32} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Organization Structure</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Following the Anand Model cooperative structure for maximum farmer benefit
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Top level */}
              <div className="text-center mb-8">
                <div className="inline-block bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                  KOF Federation (State Level)
                </div>
              </div>
              <div className="w-0.5 h-8 bg-green-300 mx-auto" />
              {/* Mid level */}
              <div className="text-center mb-8">
                <div className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                  ROGCSU Chitradurga (District Union)
                </div>
              </div>
              <div className="w-0.5 h-8 bg-green-300 mx-auto" />
              {/* Bottom level */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-amber-50 border-2 border-amber-200 px-4 py-3 rounded-xl text-center font-medium text-amber-800">
                  Oilseed Growers Societies
                </div>
                <div className="bg-amber-50 border-2 border-amber-200 px-4 py-3 rounded-xl text-center font-medium text-amber-800">
                  APMC Market Yards
                </div>
                <div className="bg-amber-50 border-2 border-amber-200 px-4 py-3 rounded-xl text-center font-medium text-amber-800">
                  Farmer Direct Purchase
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Production', icon: Factory },
              { name: 'Marketing', icon: TrendingUp },
              { name: 'Procurement', icon: Leaf },
              { name: 'Quality', icon: Award },
              { name: 'Distribution', icon: Truck },
            ].map((dept) => (
              <div key={dept.name} className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
                <dept.icon size={28} className="text-green-700 mx-auto mb-3" />
                <p className="font-semibold text-gray-800 text-sm">{dept.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
