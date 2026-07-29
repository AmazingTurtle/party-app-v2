import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Party App',
    short_name: 'Party App',
    description: 'Eine Party App für die Party People',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1118',
    theme_color: '#0b1118',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-1024x1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
