import { Sprout, Factory, Truck, FlaskConical, Users, BookOpen } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Activities</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            From seed procurement to oil marketing - our complete value chain for farmers and consumers
          </p>
        </div>
      </section>

      {/* Main Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-12">
            {/* Procurement */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Sprout size={24} className="text-green-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Oilseed Procurement</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>
                    The union procures groundnut and sunflower seeds from Oilseeds Growers 
                    Cooperative Societies (OGCS), various APMC market yards, and through mill 
                    gate delivery as per the procurement policy decided by the Board.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Direct procurement from village-level cooperative societies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Fair pricing based on MSP and market rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Coverage across Chitradurga, Davangere, Shimoga & Haveri districts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Transparent weighing and quality assessment</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
                <div className="text-center">
                  <Sprout size={80} className="text-green-600 mx-auto mb-4" />
                  <p className="text-green-800 font-bold text-lg">Farmer-First Procurement</p>
                  <p className="text-green-600 text-sm mt-1">From OGCS & APMC Markets</p>
                </div>
              </div>
            </div>

            {/* Processing */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
                <div className="text-center">
                  <Factory size={80} className="text-amber-600 mx-auto mb-4" />
                  <p className="text-amber-800 font-bold text-lg">Modern Processing Unit</p>
                  <p className="text-amber-600 text-sm mt-1">Double Filtered Technology</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Factory size={24} className="text-amber-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Oil Processing & Packing</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>
                    The modern packing unit in Chitradurga, started in November 2006, uses 
                    state-of-the-art technology for oil extraction, refining, and packing 
                    in various sizes from sachets to bulk containers.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Modern solvent extraction plant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Double filtration and refining process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Automated sachet and pouch packing machines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Over 6,198 MT packed since inception</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Marketing */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Truck size={24} className="text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Marketing & Distribution</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Oils are marketed under the Safal and Sungold brands across 4 districts 
                    within a 50km radius through a network of distributors, retail stores, 
                    and direct-to-consumer channels.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Sungold & Safal brand marketing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Distributor network across 4 districts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Online price comparison with Flipkart & Amazon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Digital marketing via Instagram & Facebook</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
                <div className="text-center">
                  <Truck size={80} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800 font-bold text-lg">4 District Distribution</p>
                  <p className="text-blue-600 text-sm mt-1">50km Radius Coverage</p>
                </div>
              </div>
            </div>

            {/* Research */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
                <div className="text-center">
                  <FlaskConical size={80} className="text-purple-600 mx-auto mb-4" />
                  <p className="text-purple-800 font-bold text-lg">AATC Research Center</p>
                  <p className="text-purple-600 text-sm mt-1">Haveri, Karnataka</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FlaskConical size={24} className="text-purple-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Research & Development</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>
                    KOF operates the Area Agronomic Training Center (AATC) at Haveri for 
                    applied research and multiplication of improved oilseed varieties for 
                    better yields and quality.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Improved variety development and seed multiplication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Applied research in oilseed agronomy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Farmer training and education programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Quality testing laboratory</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farmer Support Programs</h2>
            <p className="text-gray-600">Comprehensive support to oilseed growers across the region</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Cooperative Formation', desc: 'Helping farmers form and strengthen primary cooperative societies at village level' },
              { icon: BookOpen, title: 'Training Programs', desc: 'Regular training on best practices, new varieties, and sustainable farming methods' },
              { icon: Sprout, title: 'Seed Distribution', desc: 'Distribution of improved certified seed varieties for better yields and oil content' },
            ].map((item, idx) => (
              <div key={idx} className="card p-8 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon size={32} className="text-green-700" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
