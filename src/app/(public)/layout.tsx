import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatbot from '@/components/ui/AIChatbot';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BackToTop from '@/components/ui/BackToTop';
import StructuredData from '@/components/SEO/StructuredData';
import LocaleProvider from '@/components/providers/LocaleProvider';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <StructuredData />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <AIChatbot />
    </LocaleProvider>
  );
}
