'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  whatsapp?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '🙏 Namaste! I\'m KOF AI Assistant.\n\nI can help with product info, pricing, orders, and more. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [prices, setPrices] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetch('/api/public/pricing').then(r => r.json()).then(d => setPrices(d.prices || [])).catch(() => {});
  }, []);

  const getResponse = (input: string): Message => {
    const lower = input.toLowerCase();

    // Dynamic pricing response
    if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('how much') || lower.includes('kitna')) {
      if (prices.length > 0) {
        const priceList = prices.map(p => `• ${p.product_name}: ₹${p.retail_price}/L (Bulk: ₹${p.bulk_price}/L, 15L Tin: ₹${p.tin_price})`).join('\n');
        
        for (const p of prices) {
          if (lower.includes('sunflower') && p.product_id.includes('sunflower')) return { role: 'bot', text: `🌻 ${p.product_name}\n\n• Retail: ₹${p.retail_price}/litre\n• Bulk (50L+): ₹${p.bulk_price}/litre\n• 15L Tin: ₹${p.tin_price}\n\nAGMARK certified, double filtered. Want to order?`, whatsapp: `Hi, I want to order ${p.product_name}. Current price ₹${p.retail_price}/L` };
          if (lower.includes('groundnut') && p.product_id.includes('groundnut')) return { role: 'bot', text: `🥜 ${p.product_name}\n\n• Retail: ₹${p.retail_price}/litre\n• Bulk (50L+): ₹${p.bulk_price}/litre\n• 15L Tin: ₹${p.tin_price}\n\nCold pressed, farm fresh. Want to order?`, whatsapp: `Hi, I want to order ${p.product_name}` };
          if (lower.includes('palm') && p.product_id.includes('palm')) return { role: 'bot', text: `🌴 ${p.product_name}\n\n• Retail: ₹${p.retail_price}/litre\n• Bulk: ₹${p.bulk_price}/litre\n• 15L Tin: ₹${p.tin_price}`, whatsapp: `Hi, I want ${p.product_name}` };
          if (lower.includes('soya') && p.product_id.includes('soya')) return { role: 'bot', text: `🫘 ${p.product_name}\n\n• Retail: ₹${p.retail_price}/litre\n• Bulk: ₹${p.bulk_price}/litre\n• 15L Tin: ₹${p.tin_price}`, whatsapp: `Hi, I want ${p.product_name}` };
          if ((lower.includes('rice') || lower.includes('bran')) && p.product_id.includes('ricebran')) return { role: 'bot', text: `🌾 ${p.product_name}\n\n• Retail: ₹${p.retail_price}/litre\n• Bulk: ₹${p.bulk_price}/litre\n• 15L Tin: ₹${p.tin_price}`, whatsapp: `Hi, I want ${p.product_name}` };
        }
        return { role: 'bot', text: `🛢️ Today's Rates (updated live):\n\n${priceList}\n\nWhich product would you like to order?`, whatsapp: 'Hi, I want to know today\'s oil prices' };
      }
      return { role: 'bot', text: '🛢️ Please contact us for latest prices.\nCall: +91 6366975382', whatsapp: 'Hi, what are today\'s oil prices?' };
    }

    if (lower.includes('order') || lower.includes('buy') || lower.includes('purchase') || lower.includes('kharid')) {
      return { role: 'bot', text: '🛒 To place an order:\n\n1. Click WhatsApp button below\n2. Tell us product & quantity\n3. We confirm availability & price\n4. Delivery in 2-3 days!\n\nMin order: 5L. Free delivery above ₹2,000.', whatsapp: 'Hi, I want to place an order for KOF oil' };
    }

    if (lower.includes('delivery') || lower.includes('area') || lower.includes('district') || lower.includes('shipping')) {
      return { role: 'bot', text: '🚚 Delivery Areas:\n\n• Chitradurga (Same day)\n• Davangere (1-2 days)\n• Shimoga (2-3 days)\n• Haveri (2-3 days)\n\n50km radius coverage. Free delivery on ₹2,000+!', whatsapp: 'Hi, do you deliver to my area?' };
    }

    if (lower.includes('distributor') || lower.includes('dealer') || lower.includes('business') || lower.includes('franchise')) {
      return { role: 'bot', text: '🤝 KOF Distributor Program:\n\n• Investment: ₹2-5 Lakhs\n• Margin: 20-25%\n• Exclusive 50km territory\n• Full marketing support\n• Training provided\n\nSerious applicants only.', whatsapp: 'Hi, I am interested in KOF distributorship. Please share details.' };
    }

    if (lower.includes('product') || lower.includes('oil') || lower.includes('what do you sell')) {
      return { role: 'bot', text: '🛢️ Our Premium Range:\n\n1. 🌻 Sungold Sunflower Oil\n2. 🥜 Safal Groundnut Oil\n3. 🌴 Safal Palmolein Oil\n4. 🫘 Safal Soyabean Oil\n5. 🌾 Safal Rice Bran Oil\n6. 📦 De-oiled Cake (cattle feed)\n\nAll AGMARK certified! Ask for any specific product price.' };
    }

    if (lower.includes('quality') || lower.includes('agmark') || lower.includes('pure') || lower.includes('certified')) {
      return { role: 'bot', text: '✅ Quality Guarantee:\n\n• AGMARK certified (Govt. of India)\n• Double filtered process\n• In-house quality lab\n• No adulteration - 100% pure\n• Regular third-party testing\n• ISO standard packing unit\n\nTrusted by 1000+ families!' };
    }

    if (lower.includes('about') || lower.includes('who') || lower.includes('kof') || lower.includes('company')) {
      return { role: 'bot', text: '🏢 KOF Chitradurga:\n\n• Est. 1984 (40+ years)\n• Farmer-owned cooperative\n• 22+ dedicated employees\n• 6,198 MT oil packed\n• 4 district coverage\n• Modern packing unit since 2006\n\nAnand Model cooperative!' };
    }

    if (lower.includes('contact') || lower.includes('phone') || lower.includes('address') || lower.includes('call') || lower.includes('where')) {
      return { role: 'bot', text: '📞 Contact:\n\n• Phone: +91 6366975382\n• Email: kofcta2@gmail.com\n• Address: KOF Complex, Chitradurga - 577501\n• Hours: Mon-Sat, 9AM-6PM\n\nInstant response on WhatsApp!', whatsapp: 'Hi, I need to contact KOF' };
    }

    if (lower.includes('bulk') || lower.includes('wholesale') || lower.includes('hotel') || lower.includes('restaurant') || lower.includes('tin')) {
      return { role: 'bot', text: '🏨 Bulk/Wholesale:\n\n• Hotels, restaurants, caterers\n• Sweet shops, bakeries\n• Govt. supply orders\n• 15L & 50L tins available\n• Up to 15% discount on bulk!\n• Min: 50 litres', whatsapp: 'Hi, I need bulk oil pricing for my business' };
    }

    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('namaste') || lower.includes('start')) {
      return { role: 'bot', text: '🙏 Namaste! Welcome to KOF Chitradurga.\n\nI can help with:\n• 📊 Live product prices\n• 🛒 Place orders\n• 🚚 Check delivery area\n• 🤝 Distributorship info\n• ✅ Quality details\n\nJust ask naturally!' };
    }

    return { role: 'bot', text: 'I understand! Let me help you:\n\n• "Sunflower oil price?" → Latest rates\n• "I want to buy" → Order process\n• "Delivery area?" → Coverage info\n• "Distributor" → Business opportunity\n\nOr contact us directly:', whatsapp: 'Hi, I have a query about KOF products' };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const botResponse = getResponse(input);
    setMessages(prev => [...prev, userMsg, botResponse]);
    setInput('');
  };

  return (
    <>
      {/* Toggle */}
      <button onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600'}`}>
        {isOpen ? <X size={24} className="text-white" /> : <Bot size={28} className="text-white" />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[520px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="gradient-primary p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">KOF AI Assistant</h3>
              <p className="text-xs text-green-100">Live prices • Orders • Info</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-green-700 text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm'}`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  {msg.whatsapp && msg.role === 'bot' && (
                    <a href={`https://wa.me/916366975382?text=${encodeURIComponent(msg.whatsapp)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-green-200">
                      <Phone size={12} /> WhatsApp Order
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about prices, products..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              <button onClick={handleSend} className="bg-green-700 hover:bg-green-600 text-white p-3 rounded-xl transition-colors">
                <Send size={18} />
              </button>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {['Today\'s Prices', 'Order Now', 'Delivery Areas', 'Products'].map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(handleSend, 50); }}
                  className="text-xs bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors border border-gray-200">
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
