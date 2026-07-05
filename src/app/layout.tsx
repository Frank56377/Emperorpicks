import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Emperor Picks - Smart Football Predictions',
  description: 'Smart Football Predictions & Accumulators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A1428] text-white antialiased">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}