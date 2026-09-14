import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NavigationDrawer from "@/components/layout/NavigationDrawer";
import CartDrawer from "@/components/layout/CartDrawer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Bharati Kitchenware',
    default: 'Bharati Kitchenware | Premium Indian Cookware',
  },
  description: "High-quality, durable, and traditional Indian cookware including pressure cookers, kadhais, and daily essential utensils.",
  openGraph: {
    title: 'Bharati Kitchenware | Premium Indian Cookware',
    description: 'High-quality, durable, and traditional Indian cookware including pressure cookers, kadhais, and daily essential utensils.',
    url: 'https://bharatikitchen.com',
    siteName: 'Bharati Kitchenware',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556910103-1c02745a8050?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Bharati Kitchenware',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <NavigationDrawer />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
        </Providers>
      </body>
    </html>
  );
}
