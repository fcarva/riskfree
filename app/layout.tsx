import '@total-typescript/ts-reset';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'RiskManager Pro',
  description:
    'RiskManager Pro ajuda consultores da IJS Engenharia a conduzir apreciações de risco NR-12 e workflows correlatos.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontSans.variable} min-h-screen bg-slate-50 font-sans text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
