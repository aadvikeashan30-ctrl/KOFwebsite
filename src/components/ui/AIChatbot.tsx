'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  whatsapp?: string;
}

const productKB: Record<string, string> = {
  sunflower: 'Sungold Refined Sunflower Oil - AGMARK certified, double filtered. Available in 500ml (₹85), 1L (₹155), 2L (₹305), 5L (₹750), 15L tin (₹7,250). No cholesterol, reusable quality. Best for daily cooking.',
  groundnut: 'Safal Groundnut Oil - Cold pressed, farm fresh. Available in 500ml (₹120), 1L (₹190), 2L (₹375), 5L (₹920), 15L tin (₹9,000). Rich aroma, traditional taste. Perfect for South Indian cooking.',
  palmolein: 'Safal Palmolein Oil - High smoke point, ideal for deep frying. Available in 1L (₹110), 2L (₹215), 5L (₹530), 15L tin (₹5,000). Economical choice for commercial kitchens.',
  soyabean: 'Safal Soyabean Oil - Omega-3 rich, heart healthy. Available in 1L (₹140), 2L (₹275), 5L (₹680), 15L tin (₹6,500). Light texture, versatile for all cooking.',
  ricebran: 'Safal Rice Bran Oil - Rich in Oryzanol, low absorption. Available in 1L (₹165), 2L (₹325), 5L (₹800). Heart friendly, ideal for health-conscious families.',
  deoiled: 'KOF De-oiled Cake (DOC) - High protein cattle feed from oilseed extraction. Available in 25kg (₹800) and 50kg (₹1,500) bags. Excellent for dairy and poultry farms.',
};

function getAIResponse(input: string): Message {
  const lower = input.toLowerCase();

  if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('how much')) {
    if (lower.includes('sunflower') || lower.includes('sungold')) return { role: 'bot', text: productKB.sunflower + '\n\nWould you like to order? I can connect you to our team on WhatsApp.', whatsapp: 'Hi, I want to know the price of Sungold Sunflower Oil' };
    if (lower.includes('groundnut') || lower.includes('peanut')) return { role: 'bot', text: productKB.groundnut + '\n\nWant to place an order?', whatsapp: 'Hi, I want to order Safal Groundnut Oil' };
    if (lower.includes('palm')) return { role: 'bot', text: productKB.palmolein, whatsapp: 'Hi, I want to order Safal Palmolein Oil' };
    if (lower.includes('soya')) return { role: 'bot', text: productKB.soyabean, whatsapp: 'Hi, I want to order Safal Soyabean Oil' };
    if (lower.includes('rice') || lower.includes('bran')) return { role: 'bot', text: productKB.ricebran, whatsapp: 'Hi, I want to order Safal Rice Bran Oil' };
    return { role: 'bot', text: '🛢️ Our oil prices (per litre):\n• Sunflower: ₹155\n• Groundnut: ₹190\n• Palmolein: ₹110\n• Soyabean: ₹140\n• Rice Bran: ₹165\n\nBulk discounts available for 15L+ orders! Which product interests you?', whatsapp: 'Hi, I want to know the latest oil prices' };
  }

  if (lower.includes('order') || lower.includes('buy') || lower.includes('purchase') || lower.includes('kharid')) {
    return { role: 'bot', text: '🛒 Great! To place an order, I can connect you directly to our sales team on WhatsApp. They will confirm availability, delivery time, and process your order.\n\nClick the button below to order via WhatsApp!', whatsapp: 'Hi, I want to place an order for KOF products' };
  }

  if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('area') || lower.includes('district')) {
    return { role: 'bot', text: '🚚 We deliver across 4 districts within 50km radius:\n• Chitradurga (Head Office)\n• Davangere\n• Shimoga\n• Haveri\n\nDelivery within 2-3 business days. Free delivery on orders above ₹2,000!' };
  }

  if (lower.includes('distributor') || lower.includes('dealership') || lower.includes('business')) {
    return { role: 'bot', text: '🤝 Interested in becoming a KOF distributor?\n\n• Min investment: ₹2 Lakhs\n• Margin: 20-25%\n• Exclusive 50km territory\n• Full brand support\n\nContact us to apply!', whatsapp: 'Hi, I am interested in becoming a KOF distributor' };
  }

  if (lower.includes('product') || lower.includes('oil') || lower.includes('what do you sell')) {
    return { role: 'bot', text: '🛢️ Our product range:\n\n1. Sungold Sunflower Oil (AGMARK)\n2. Safal Groundnut Oil\n3. Safal Palmolein Oil\n4. Safal Soyabean Oil\n5. Safal Rice Bran Oil\n6. De-oiled Cake (cattle feed)\n\nAll oils are double-filtered and AGMARK certified. Ask me about any specific product!' };
  }

  if (lower.includes('agmark') || lower.includes('quality') || lower.includes('certification')) {
    return { role: 'bot', text: '✅ All our oils carry AGMARK certification from the Government of India. This guarantees:\n• Purity standards\n• No adulteration\n• Safe packaging\n• Regular lab testing\n\nWe also have an in-house quality lab at our Chitradurga unit.' };
  }

  if (lower.includes('about') || lower.includes('who') || lower.includes('kof')) {
    return { role: 'bot', text: '🏢 KOF (Karnataka Co-operative Oilseeds Growers\' Federation) was established in 1984 on the Anand Model. Our Chitradurga unit (ROGCSU) has:\n\n• 40+ years of legacy\n• 22+ employees\n• Modern packing unit (since 2006)\n• 6,198+ MT oil packed\n• 4 district coverage\n\nWe are a farmer-owned cooperative!' };
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('address') || lower.includes('call')) {
    return { role: 'bot', text: '📞 Contact Info:\n• Phone: +91 6366975382\n• Email: kofcta2@gmail.com\n• Address: KOF Complex, Chitradurga - 577501\n• Hours: Mon-Sat, 9AM-6PM\n\nOr message us on WhatsApp for instant response!', whatsapp: 'Hi, I need to contact KOF regarding...' };
  }

  if (lower.includes('bulk') || lower.includes('wholesale') || lower.includes('hotel') || lower.includes('restaurant')) {
    return { role: 'bot', text: '🏨 Bulk/Wholesale Orders:\n\nWe offer special pricing for:\n• Hotels & Restaurants\n• Canteens & Caterers\n• Sweet shops & Bakeries\n• Government supply\n\nMin order: 50L. Discounts up to 15% on bulk!', whatsapp: 'Hi, I need bulk oil pricing for my business' };
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('namaste')) {
    return { role: 'bot', text: '🙏 Namaste! Welcome to KOF Chitradurga.\n\nI can help you with:\n• Product information & prices\n• Place an order\n• Find nearest store\n• Bulk/wholesale enquiry\n• Distributorship details\n\nWhat would you like to know?' };
  }

  return { role: 'bot', text: 'I can help you with:\n• 🛢️ Product info & prices\n• 🛒 Placing orders\n• 🚚 Delivery areas\n• 🤝 Distributorship\n• 📞 Contact info\n\nTry asking: "What is the price of sunflower oil?" or "I want to buy groundnut oil"', whatsapp: 'Hi, I have a query about KOF products' };
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '🙏 Namaste! I\'m KOF Assistant.\n\nI can help with product info, pricing, orders, and more. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const botResponse = getAIResponse(input);
    setMessages(prev => [...prev, userMsg, botResponse]);
    setInput('');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600'
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <Bot size={28} className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="gradient-primary p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm">KOF AI Assistant</h3>
              <p className="text-xs text-green-100">Ask about products, prices & orders</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-green-700 text-white rounded-br-md' 
                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'
                }`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  {msg.whatsapp && msg.role === 'bot' && (
                    <a
                      href={`https://wa.me/916366975382?text=${encodeURIComponent(msg.whatsapp)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-green-200"
                    >
                      <Phone size={12} /> Contact on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about prices, products..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button onClick={handleSend}
                className="bg-green-700 hover:bg-green-600 text-white p-3 rounded-xl transition-colors">
                <Send size={18} />
              </button>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {['Prices', 'Order', 'Products', 'Delivery'].map(q => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="text-xs bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
