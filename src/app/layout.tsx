import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { classNames } from 'party/utils/class-names';
import 'src/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Party App',
  description: 'Eine Party App für die Party People',
  manifest: '/site.webmanifest',
  icons: ['/logo-1024x1024.png'],
  themeColor: '#0A1012',
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className={classNames(inter.className, 'relative')}>
        {children}
      </body>
    </html>
  );
}
