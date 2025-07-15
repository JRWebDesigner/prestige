import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PerfumeHub - Catálogo de Perfumes en Bolivia',
  description: 'Descubre una amplia selección de perfumes originales de las mejores marcas del mundo. Precios en bolivianos, envío a toda Bolivia.',
  keywords: 'perfumes, fragancias, Bolivia, catálogo, Dior, Chanel, Calvin Klein, originales',
  authors: [{ name: 'PerfumeHub' }],
  openGraph: {
    title: 'Prestige - Catálogo de Perfumes en Bolivia',
    description: 'Descubre una amplia selección de perfumes originales de las mejores marcas del mundo.',
    type: 'website',
    locale: 'es_BO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
