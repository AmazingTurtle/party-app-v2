import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SerwistProvider } from '@serwist/turbopack/react';
import { classNames } from '@/utils/class-names';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'The Party App',
  title: 'The Party App',
  description: 'Eine Party App für die Party People',
  icons: ['/logo-1024x1024.png'],
  appleWebApp: {
    title: 'Party App',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: '/logo-1024x1024.png',
  },
  alternates: {
    canonical: 'https://new.thepartyapp.xyz/',
  },
  openGraph: {
    title: 'Party App',
    description: 'Eine Party App für die Party People',
    type: 'website',
    url: 'https://new.thepartyapp.xyz/',
    images: [
      {
        type: 'image/png',
        width: 1024,
        height: 1024,
        url: 'https://new.thepartyapp.xyz/logo-1024x1024.png',
      },
      {
        type: 'image/png',
        width: 512,
        height: 512,
        url: 'https://new.thepartyapp.xyz/logo-512x512.png',
      },
      {
        type: 'image/png',
        width: 192,
        height: 192,
        url: 'https://new.thepartyapp.xyz/logo-192x192.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1012',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className={classNames(inter.className, 'relative')}>
        <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
      </body>
    </html>
  );
}
