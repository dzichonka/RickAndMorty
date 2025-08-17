import { setRequestLocale } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Mansalva } from 'next/font/google';
import ThemeProvider from '@/contexts/theme/ThemeProvider';

import ClientWrapper from '@/components/ClientWrapper/ClientWrapper';
import { Header } from '@/components/Header/Header';

const mansalva = Mansalva({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-main',
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${mansalva.className} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider>
            <ClientWrapper>
              <Header />
              {children}
            </ClientWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
