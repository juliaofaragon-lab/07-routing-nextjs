import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import 'modern-normalize/modern-normalize.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple application for managing personal notes.',
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
