import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOF Chitradurga | Regional Oilseeds Growers' Co-operative Society Union Ltd.",
  description: "Karnataka Co-operative Oilseeds Growers' Federation - Premium AGMARK certified edible oils since 1984. Sungold Sunflower Oil, Safal Groundnut Oil - Pure Oil, Pure Trust.",
  keywords: "KOF, Chitradurga, edible oil, sunflower oil, groundnut oil, cooperative, Karnataka, Safal, Sungold, AGMARK, palmolein, soyabean oil, rice bran oil",
  authors: [{ name: "KOF Chitradurga" }],
  openGraph: {
    title: "KOF Chitradurga - Pure Oil, Pure Trust Since 1984",
    description: "Karnataka's most trusted cooperative delivering premium AGMARK-certified edible oils from farm to family.",
    url: "https://kofchitradurga.com",
    siteName: "KOF Chitradurga",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KOF Chitradurga - Premium Edible Oils",
    description: "40+ years of pure, AGMARK certified edible oils for Karnataka families.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0E5A3A" />
      </head>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
