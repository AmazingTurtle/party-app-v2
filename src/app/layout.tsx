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
  themeColor: '#0A1012',
  appleWebApp: {
    title: 'Party App',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: '/logo-1024x1024.png',
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
