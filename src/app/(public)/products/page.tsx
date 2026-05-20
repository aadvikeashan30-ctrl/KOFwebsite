import { Droplets, Check, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Premium quality edible oils - AGMARK certified, double filtered, 
            and packed with modern technology in our Chitradurga unit
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="card group hover:-translate-y-2 transition-all duration-300">
                <div className="h-56 bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <Droplets size={64} className="text-green-600 mx-auto group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-green-800 font-bold mt-2 text-center">{product.name.split(' ')[0]}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-600 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span key={size} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-green-700 font-bold text-lg">{product.price_range}</span>
                    <a
                      href={`https://wa.me/916366975382?text=Hi, I want to enquire about ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      <ShoppingCart size={16} />
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Orders */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bulk Orders & Distributorship</h2>
          <p className="text-gray-600 mb-8">
            Looking for bulk orders for hotels, restaurants, or retail? Want to become a KOF distributor? 
            Contact us today for special pricing and partnership opportunities.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <p className="font-bold text-green-800 mb-2">Hotels & Restaurants</p>
              <p className="text-sm text-gray-600">Special bulk pricing for HoReCa segment</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6">
              <p className="font-bold text-amber-800 mb-2">Retail Stores</p>
              <p className="text-sm text-gray-600">Become an authorized KOF retailer</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="font-bold text-blue-800 mb-2">Distributors</p>
              <p className="text-sm text-gray-600">District-level distribution opportunities</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
