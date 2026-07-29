import { createSerwistRoute } from '@serwist/turbopack';

const revision =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  'local-development';

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    additionalPrecacheEntries: [{ url: '/~offline', revision }],
    globIgnores: [
      '**/node_modules/**/*',
      'public/cards/**/*',
      'public/sounds/**/*',
    ],
    swSrc: 'src/app/sw.ts',
    useNativeEsbuild: true,
  });
