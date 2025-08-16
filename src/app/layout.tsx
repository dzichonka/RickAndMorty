import { Mansalva } from 'next/font/google';
import './globals.scss';
import ThemeProvider from '@/contexts/theme/ThemeProvider';
import '../styles/base.scss';

import ClientWrapper from '@/components/ClientWrapper/ClientWrapper';
import { Header } from '@/components/Header/Header';

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-main',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mansalva.className} antialiased`}>
        <ThemeProvider>
          <ClientWrapper>
            <Header />
            {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
