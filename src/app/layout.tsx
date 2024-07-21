import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BackgroundGradientAnimation } from '@/components/background-gradient-animation';
import Navbar from '@/components/Navbar';
import DnDWrapper from '@/components/DnDWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cryptonite',
  description: 'Track Cryptocurrency Prices and Market Data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-screen ${inter.className}`}>
        <DnDWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BackgroundGradientAnimation>
              <div className="absolute z-50 overflow-auto h-screen">
                <Navbar />
                {children}
              </div>
            </BackgroundGradientAnimation>
          </ThemeProvider>
        </DnDWrapper>
      </body>
    </html>
  );
}
