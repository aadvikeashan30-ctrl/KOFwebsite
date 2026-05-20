'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, Camera, Send, Navigation, PhoneCall } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast('success', 'Thank you! Your message has been sent successfully. We\'ll contact you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const data = await res.json().catch(() => null);
        showToast('error', data?.error || 'Failed to send message. Please try again.');
      }
    } catch {
      showToast('error', 'Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        icon={Phone}
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Get in touch with us for orders, distributorship, or any queries"
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2">
          <div className={`px-5 py-4 rounded-xl shadow-lg border ${
            toast.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      <section className="py-16 bg-[var(--kof-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">#29/1, KIADB Industrial Area, Kelagote, Old Bangalore Rd, Industrial Area, Chitradurga, Karnataka 577501</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">+91 6366975382</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">kofcta2@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Working Hours</p>
                      <p className="text-sm text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Section */}
              <div className="card p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Working Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Monday - Saturday</span>
                    <span className="text-sm text-green-700 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Sunday</span>
                    <span className="text-sm text-red-600 font-semibold">Closed</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                    <MessageCircle size={16} className="text-green-600" />
                    <p className="text-xs text-green-800 font-medium">Available on WhatsApp 24/7</p>
                  </div>
                </div>
              </div>

              {/* Quick Connect */}
              <div className="card p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Connect</h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/916366975382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                  >
                    <MessageCircle size={24} />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+916366975382"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                  >
                    <PhoneCall size={24} />
                    Call Now
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="card p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  <a href="https://wa.me/916366975382" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-green-700">WhatsApp</p>
                      <p className="text-xs text-gray-500">Chat with us instantly</p>
                    </div>
                  </a>
                  <a href="https://facebook.com/kofchitradurga" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Globe size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-700">Facebook</p>
                      <p className="text-xs text-gray-500">Follow our updates</p>
                    </div>
                  </a>
                  <a href="https://instagram.com/kofchitradurga" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                      <Camera size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-pink-700">Instagram</p>
                      <p className="text-xs text-gray-500">Photos & reels</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Send us a Message</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select subject</option>
                        <option value="order">Product Order</option>
                        <option value="bulk">Bulk Order Inquiry</option>
                        <option value="distributor">Distributorship</option>
                        <option value="farmer">Farmer Registration</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your requirement..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-gray-200">
            <iframe
              src="https://www.google.com/maps?q=KIADB+Industrial+Area,+Kelagote,+Old+Bangalore+Road,+Chitradurga,+Karnataka+577501&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KOF Chitradurga Location - KIADB Industrial Area, Kelagote"
            />
          </div>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-700 font-medium">
              📍 #29/1, KIADB Industrial Area, Kelagote, Old Bangalore Rd, Industrial Area, Chitradurga, Karnataka 577501
            </p>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/search/KIADB+Industrial+Area+Kelagote+Old+Bangalore+Road+Chitradurga+Karnataka+577501"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Navigation size={20} />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
