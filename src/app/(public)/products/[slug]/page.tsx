'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Star, ShoppingCart, Share2, Check, Package,
  Clock, Shield, Info, Heart, Leaf, ChevronRight
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import Product3D from '@/components/products/Product3D';

interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  short_description?: string;
  sizes: string[];
  features: string[];
  images: string[];
  certifications: string[];
  health_benefits: string[];
  nutrition_vitamins: Array<string | { name: string; amount?: string; dv?: string }>;
  nutrition_minerals: Array<string | { name: string; amount?: string; dv?: string }>;
  retail_price?: number;
  bulk_price?: number;
  tin_price?: number;
  weight?: string;
  packaging?: string;
  packaging_type?: string;
  shelf_life?: string;
  manufacturer?: string;
  sku?: string;
  storage_info?: string;
  storage_instructions?: string;
  usage_info?: string;
  stock_status?: string;
  nutrition_calories?: string | number;
  nutrition_fat?: string | number;
  nutrition_total_fat?: string | number;
  nutrition_saturated_fat?: string | number;
  nutrition_trans_fat?: string | number;
  nutrition_cholesterol?: string | number;
  nutrition_protein?: string | number;
  nutrition_carbs?: string | number;
  nutrition_carbohydrates?: string | number;
  nutrition_fiber?: string | number;
  nutrition_sodium?: string | number;
  ingredients?: string;
  published: number;
  sort_order: number;
  created_at: string;
}


interface Testimonial {
  id: number;
  name: string;
  location?: string;
  rating: number;
  message: string;
  product_id?: number;
}

const typeMap: Record<string, 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled'> = {
  'sungold-sunflower-oil': 'sunflower',
  'safal-groundnut-oil': 'groundnut',
  'safal-palmolein-oil': 'palmolein',
  'safal-soyabean-oil': 'soyabean',
  'safal-rice-bran-oil': 'ricebran',
  'kof-deoiled-cake': 'deoiled',
};

function get3DType(slug: string): 'sunflower' | 'groundnut' | 'palmolein' | 'soyabean' | 'ricebran' | 'deoiled' {
  if (typeMap[slug]) return typeMap[slug];
  if (slug.includes('sunflower')) return 'sunflower';
  if (slug.includes('groundnut')) return 'groundnut';
  if (slug.includes('palmolein')) return 'palmolein';
  if (slug.includes('soyabean')) return 'soyabean';
  if (slug.includes('rice-bran') || slug.includes('ricebran')) return 'ricebran';
  if (slug.includes('deoiled') || slug.includes('cake')) return 'deoiled';
  return 'sunflower';
}


export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/public/products/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
          // Fetch related products
          const allRes = await fetch('/api/public/products');
          const allData = await allRes.json();
          if (allData.products) {
            const related = allData.products.filter(
              (p: Product) => p.slug !== slug
            );
            setRelatedProducts(related.slice(0, 4));
          }
          // Fetch testimonials
          const testRes = await fetch('/api/public/testimonials');
          const testData = await testRes.json();
          if (testData.testimonials) {
            setTestimonials(testData.testimonials);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.short_description || product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--kof-warm-gray)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[var(--kof-forest)]/20 border-t-[var(--kof-forest)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading product...</p>
        </motion.div>
      </div>
    );
  }

  // 404 state
  if (notFound || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--kof-warm-gray)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center card-premium p-12 rounded-3xl max-w-md mx-4"
        >
          <Package size={64} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--kof-charcoal)] mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </motion.div>
      </div>
    );
  }


  const productType = get3DType(product.slug);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="bg-[var(--kof-warm-gray)] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[var(--kof-forest)] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[var(--kof-forest)] transition-colors">Products</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--kof-charcoal)] font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-12 lg:py-20 bg-[var(--kof-warm-gray)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-premium rounded-3xl p-8 lg:p-12 sticky top-28">
                <div className="relative h-80 sm:h-96 lg:h-[450px] bg-gradient-to-br from-[var(--kof-cream)] via-white to-emerald-50/30 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0E5A3A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <Product3D type={productType} className="w-44 h-64 sm:w-52 sm:h-72 lg:w-60 lg:h-80" />
                </div>
              </div>
            </motion.div>


            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category & AGMARK Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[var(--kof-forest)]/10 text-[var(--kof-forest)] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5 gradient-gold text-[var(--kof-charcoal)] text-xs font-bold px-3 py-1.5 rounded-full">
                  <Star size={12} className="fill-current" /> AGMARK Certified
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--kof-charcoal)] font-[family-name:var(--font-poppins)] leading-tight">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.short_description || product.description}
              </p>

              {/* Price - LIVE from admin DB */}
              {(product.retail_price || product.bulk_price) && (
                <div className="bg-[var(--kof-forest)]/5 rounded-2xl p-5 border border-[var(--kof-forest)]/10">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Live Pricing</p>
                  <div className="flex flex-wrap items-baseline gap-4">
                    {product.retail_price ? (
                      <div>
                        <p className="text-3xl font-black text-[var(--kof-forest)] font-[family-name:var(--font-poppins)]">
                          ₹{product.retail_price}<span className="text-base font-semibold text-gray-500">/L</span>
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Retail</p>
                      </div>
                    ) : null}
                    {product.bulk_price ? (
                      <div>
                        <p className="text-xl font-bold text-emerald-700">
                          ₹{product.bulk_price}<span className="text-sm font-medium text-gray-500">/L</span>
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Bulk</p>
                      </div>
                    ) : null}
                    {product.tin_price ? (
                      <div>
                        <p className="text-xl font-bold text-amber-700">
                          ₹{product.tin_price}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">15L Tin</p>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">*Prices updated live by KOF admin</p>
                </div>
              )}


              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <span
                        key={size}
                        className="text-sm bg-white border-2 border-[var(--kof-forest)]/15 text-[var(--kof-forest)] px-4 py-2 rounded-xl font-semibold hover:border-[var(--kof-forest)] hover:bg-[var(--kof-forest)]/5 transition-all cursor-default"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-700">
                  {product.stock_status || 'In Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`https://wa.me/916366975382?text=Hi, I want to order ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-base"
                >
                  <ShoppingCart size={18} /> Order on WhatsApp
                </a>
                <button
                  onClick={handleShare}
                  className="btn-gold flex items-center gap-2 text-base"
                >
                  <Share2 size={18} /> Share
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Tabs Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Tabs.Root defaultValue="overview">
            <Tabs.List className="flex flex-wrap gap-1 bg-gray-100 p-1.5 rounded-2xl mb-10">
              {[
                { value: 'overview', label: 'Overview', icon: <Info size={16} /> },
                { value: 'nutrition', label: 'Nutrition', icon: <Leaf size={16} /> },
                { value: 'benefits', label: 'Benefits', icon: <Heart size={16} /> },
                { value: 'reviews', label: 'Reviews', icon: <Star size={16} /> },
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-[var(--kof-forest)] data-[state=active]:shadow-sm"
                >
                  {tab.icon} {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>


            {/* Overview Tab */}
            <Tabs.Content value="overview">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-10"
              >
                {/* Description & Features */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">
                      About This Product
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">
                        Key Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {product.features.map((feature: string, idx: number) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 bg-[var(--kof-forest)]/5 rounded-xl p-3"
                          >
                            <Check size={16} className="text-[var(--kof-forest)] flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">
                    Specifications
                  </h3>
                  <div className="card-premium rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {[
                          { label: 'Weight/Volume', value: product.weight, icon: <Package size={14} /> },
                          { label: 'Packaging', value: product.packaging || product.packaging_type, icon: <Package size={14} /> },
                          { label: 'Shelf Life', value: product.shelf_life, icon: <Clock size={14} /> },
                          { label: 'Ingredients', value: product.ingredients, icon: <Leaf size={14} /> },
                          { label: 'Manufacturer', value: product.manufacturer || 'KOF Chitradurga', icon: <Shield size={14} /> },
                          { label: 'SKU', value: product.sku, icon: <Info size={14} /> },
                          { label: 'Storage', value: product.storage_info || product.storage_instructions || 'Store in a cool, dry place away from direct sunlight', icon: <Package size={14} /> },
                          { label: 'Usage', value: product.usage_info || 'Suitable for cooking, frying, and seasoning', icon: <Info size={14} /> },
                        ].filter(spec => spec.value).map((spec, idx) => (
                          <tr key={spec.label} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                            <td className="px-5 py-3.5 text-sm font-semibold text-gray-600 flex items-center gap-2">
                              <span className="text-[var(--kof-forest)]">{spec.icon}</span>
                              {spec.label}
                            </td>
                            <td className="px-5 py-3.5 text-sm text-gray-800">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>


            {/* Nutrition Tab */}
            <Tabs.Content value="nutrition">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Nutrition Table */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-4 font-[family-name:var(--font-poppins)]">
                    Nutritional Information
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Per 100ml / 100g serving</p>
                  <div className="card-premium rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[var(--kof-forest)]/5">
                          <th className="px-5 py-3 text-left text-xs font-bold text-[var(--kof-forest)] uppercase tracking-wider">Nutrient</th>
                          <th className="px-5 py-3 text-right text-xs font-bold text-[var(--kof-forest)] uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label: 'Calories', value: product.nutrition_calories ? `${product.nutrition_calories} kcal` : '884 kcal' },
                          { label: 'Total Fat', value: product.nutrition_total_fat ? `${product.nutrition_total_fat}g` : (product.nutrition_fat ? `${product.nutrition_fat}g` : '100g') },
                          { label: 'Saturated Fat', value: product.nutrition_saturated_fat ? `${product.nutrition_saturated_fat}g` : '12g' },
                          { label: 'Trans Fat', value: product.nutrition_trans_fat ? `${product.nutrition_trans_fat}g` : '0g' },
                          { label: 'Cholesterol', value: product.nutrition_cholesterol ? `${product.nutrition_cholesterol}mg` : '0mg' },
                          { label: 'Protein', value: product.nutrition_protein ? `${product.nutrition_protein}g` : '0g' },
                          { label: 'Carbohydrates', value: product.nutrition_carbohydrates ? `${product.nutrition_carbohydrates}g` : (product.nutrition_carbs ? `${product.nutrition_carbs}g` : '0g') },
                          { label: 'Sodium', value: product.nutrition_sodium ? `${product.nutrition_sodium}mg` : '0mg' },
                        ].map((row, idx) => (
                          <tr key={row.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                            <td className="px-5 py-3 text-sm font-medium text-gray-700">{row.label}</td>
                            <td className="px-5 py-3 text-sm text-gray-800 text-right font-semibold">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>


                {/* Vitamins & Minerals */}
                <div className="space-y-6">
                  {product.nutrition_vitamins && product.nutrition_vitamins.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-[var(--kof-charcoal)] mb-3 font-[family-name:var(--font-poppins)]">
                        Vitamins
                      </h4>
                      <div className="space-y-2">
                        {product.nutrition_vitamins.map((vitamin, vIdx) => {
                          const v = typeof vitamin === 'string' ? { name: vitamin } : vitamin;
                          return (
                          <div key={`${v.name}-${vIdx}`} className="flex items-center justify-between gap-2 bg-amber-50 rounded-xl px-4 py-2.5 border border-amber-100">
                            <div className="flex items-center gap-2">
                              <Leaf size={14} className="text-amber-600 flex-shrink-0" />
                              <span className="text-sm font-medium text-amber-800">{v.name}</span>
                            </div>
                            {v.amount && <span className="text-xs text-amber-700 font-semibold">{v.amount}</span>}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {product.nutrition_minerals && product.nutrition_minerals.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-[var(--kof-charcoal)] mb-3 font-[family-name:var(--font-poppins)]">
                        Minerals
                      </h4>
                      <div className="space-y-2">
                        {product.nutrition_minerals.map((mineral, mIdx) => {
                          const m = typeof mineral === 'string' ? { name: mineral } : mineral;
                          return (
                          <div key={`${m.name}-${mIdx}`} className="flex items-center justify-between gap-2 bg-emerald-50 rounded-xl px-4 py-2.5 border border-emerald-100">
                            <div className="flex items-center gap-2">
                              <Shield size={14} className="text-emerald-600 flex-shrink-0" />
                              <span className="text-sm font-medium text-emerald-800">{m.name}</span>
                            </div>
                            {m.amount && <span className="text-xs text-emerald-700 font-semibold">{m.amount}</span>}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(!product.nutrition_vitamins || product.nutrition_vitamins.length === 0) &&
                   (!product.nutrition_minerals || product.nutrition_minerals.length === 0) && (
                    <div className="card-premium rounded-2xl p-6 text-center">
                      <Leaf size={32} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Detailed vitamin and mineral information coming soon.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </Tabs.Content>


            {/* Benefits Tab */}
            <Tabs.Content value="benefits">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-6 font-[family-name:var(--font-poppins)]">
                  Health Benefits
                </h3>
                {product.health_benefits && product.health_benefits.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.health_benefits.map((benefit: string, idx: number) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="card-premium rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300"
                      >
                        <div className="w-10 h-10 bg-[var(--kof-forest)]/10 rounded-xl flex items-center justify-center mb-3">
                          <Check size={20} className="text-[var(--kof-forest)]" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-relaxed">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="card-premium rounded-2xl p-10 text-center">
                    <Heart size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Health benefit details will be available soon.</p>
                  </div>
                )}
              </motion.div>
            </Tabs.Content>


            {/* Reviews Tab */}
            <Tabs.Content value="reviews">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold text-[var(--kof-charcoal)] mb-6 font-[family-name:var(--font-poppins)]">
                  Customer Reviews
                </h3>
                {testimonials.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-5 mb-8">
                    {testimonials.map((testimonial, idx) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="card-premium rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{testimonial.message}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[var(--kof-forest)]/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-[var(--kof-forest)]">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--kof-charcoal)]">{testimonial.name}</p>
                            {testimonial.location && (
                              <p className="text-xs text-gray-400">{testimonial.location}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="card-premium rounded-2xl p-8 text-center mb-8">
                    <Star size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}


                {/* CTA to leave review */}
                <div className="card-premium rounded-2xl p-6 bg-gradient-to-r from-[var(--kof-forest)]/5 to-emerald-50 border border-[var(--kof-forest)]/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-[var(--kof-charcoal)] font-[family-name:var(--font-poppins)]">
                        Love this product?
                      </h4>
                      <p className="text-sm text-gray-500">Share your experience with us on WhatsApp</p>
                    </div>
                    <a
                      href={`https://wa.me/916366975382?text=Hi, I want to leave a review for ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap"
                    >
                      <Star size={14} /> Leave a Review
                    </a>
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>


      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-20 bg-[var(--kof-warm-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--kof-charcoal)] mb-8 font-[family-name:var(--font-poppins)]">
              Related Products
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {relatedProducts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="min-w-[280px] sm:min-w-[320px] snap-start"
                >
                  <Link href={`/products/${related.slug}`}>
                    <div className="card-premium group h-full hover:-translate-y-1 transition-transform duration-300 rounded-2xl overflow-hidden">
                      <div className="relative h-48 bg-gradient-to-br from-[var(--kof-cream)] via-white to-emerald-50/30 flex items-center justify-center overflow-hidden">
                        <Product3D type={get3DType(related.slug)} className="w-24 h-36 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-[var(--kof-forest)] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {related.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-[var(--kof-charcoal)] mb-1 group-hover:text-[var(--kof-forest)] transition-colors font-[family-name:var(--font-poppins)]">
                          {related.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{related.short_description || related.description}</p>
                        {related.retail_price ? (
                          <p className="text-lg font-bold text-[var(--kof-forest)] mt-2">₹{related.retail_price}/L</p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
