import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KOF Chitradurga | Regional Oilseeds Growers' Co-operative Society Union Ltd.",
  description: "Karnataka Co-operative Oilseeds Growers' Federation - Pure Oil, Pure Trust since 1984. Sungold Sunflower Oil, Safal Groundnut Oil and more.",
  keywords: "KOF, Chitradurga, edible oil, sunflower oil, groundnut oil, cooperative, Karnataka, Safal, Sungold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
