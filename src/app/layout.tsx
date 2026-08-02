import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://kingrealty.lk'),
  title: 'KING Realty | Ultra-Luxury Real Estate Advisory Sri Lanka',
  description: 'Colombo’s premier independent luxury real estate advisory. Exclusive apartments in Colombo 3 & 7, colonial bungalows, beachfront villas, and high-yield commercial land.',
  keywords: ['Sri Lanka Real Estate', 'Colombo Apartments', 'Luxury Property Colombo', 'Cinnamon Gardens Bungalow', 'Mirissa Villa', 'Galle Fort Property', 'KING Realty'],
  openGraph: {
    title: 'KING Realty | Premium Real Estate Platform for Sri Lanka',
    description: 'Versatile Properties. Seamless Solutions. Independent real estate advisory in Colombo, Sri Lanka.',
    url: 'https://kingrealty.lk',
    siteName: 'KING Realty',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'KING Realty Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0B0B0C] text-slate-100 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <CurrencyProvider>
            <FavoritesProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppButton />
            </FavoritesProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
