import { Mansalva } from 'next/font/google';
import './globals.scss';
import ThemeProvider from '@/contexts/theme/ThemeProvider';

import ClientThemeWrapper from '@/components/ClientThemeWrapper/ClientThemeWrapper';
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
          <ClientThemeWrapper>
            <Header />
            {children}
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
