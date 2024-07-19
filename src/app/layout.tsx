import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { BackgroundGradientAnimation } from '@/components/background-gradient-animation';
import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
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
      <body className={inter.className}>
        <ClerkProvider>
          <DnDWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <BackgroundGradientAnimation>
                <div className="absolute z-50">
                  <Navbar />
                  {children}
                </div>
              </BackgroundGradientAnimation>
            </ThemeProvider>
          </DnDWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
