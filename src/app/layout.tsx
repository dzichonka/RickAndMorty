import { Mansalva } from 'next/font/google';
import './globals.scss';

const mansalva = Mansalva({ subsets: ['latin'], weight: '400' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mansalva} antialiased`}>
        <div id="root" className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
