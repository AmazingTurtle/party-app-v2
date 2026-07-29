import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/_components/app-providers';
import { SiteFooter } from '@/_components/shell/site-footer';
import { SiteHeader } from '@/_components/shell/site-header';
import '@/styles/content.css';
import '@/styles/foundation.css';
import '@/styles/game-stage.css';
import '@/styles/launcher.css';
import '@/styles/theme-control.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://new.thepartyapp.xyz'),
  applicationName: 'The Party App',
  title: {
    default: 'The Party App',
    template: '%s | The Party App',
  },
  description: 'Eine Party App für die Party People',
  icons: ['/logo-1024x1024.png'],
  appleWebApp: {
    title: 'Party App',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: '/logo-1024x1024.png',
  },
  openGraph: {
    title: 'Party App',
    description: 'Eine Party App für die Party People',
    type: 'website',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1118' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
        <AppProviders>
          <div className="site-shell">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
