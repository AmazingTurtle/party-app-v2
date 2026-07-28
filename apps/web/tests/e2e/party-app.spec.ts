import { expect, test } from '@playwright/test';

test('navigates from the home page into a playable game', async ({ page }) => {
  await page.goto('/');

  const gameLink = page.getByRole('link', { name: /Ich hab noch nie/i });
  await expect(gameLink).toBeVisible();
  await gameLink.click();

  const promptBefore = await page.locator('main').textContent();
  await page.getByRole('button', { name: 'Weiter' }).click();

  await expect
    .poll(async () => page.locator('main').textContent())
    .not.toBe(promptBefore);
});

test('renders legal content and unknown-game fallback routes', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Imprint' })).toHaveAttribute(
    'href',
    '/imprint',
  );
  await expect(
    page.getByRole('link', { name: 'Privacy Policy' }),
  ).toHaveAttribute('href', '/privacy');
  await expect(page.getByText(/App by/i)).toHaveCount(0);

  await page.goto('/privacy');
  await expect(
    page.getByRole('heading', { name: 'Privacy Policy', exact: true }),
  ).toBeVisible();

  await page.goto('/imprint');
  await expect(
    page.getByRole('heading', { name: 'Imprint', exact: true }),
  ).toBeVisible();

  await page.goto('/games/not-yet-built');
  await expect(
    page.getByText('Das Spiel not-yet-built gibt es leider noch nicht.'),
  ).toBeVisible();
});

test('keeps the five-second game and its start control inside the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 2_048, height: 948 });
  await page.goto('/games/five-seconds');

  await expect(
    page.getByText('Drücke auf Start wenn du bereit bist'),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Starten' })).toBeInViewport();
});

test('exposes install metadata and serves visited content offline', async ({
  context,
  page,
}) => {
  const manifestResponse = await page.request.get('/manifest.webmanifest');
  expect(manifestResponse.ok()).toBe(true);
  await expect(manifestResponse.json()).resolves.toMatchObject({
    name: 'Party App',
    display: 'standalone',
  });

  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.goto('/games/never-have-i-ever');
  await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();

  await context.setOffline(true);

  try {
    await page.reload();
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();

    await page.goto('/not-previously-visited');
    await expect(
      page.getByRole('heading', { name: 'Du bist gerade offline' }),
    ).toBeVisible();
  } finally {
    await context.setOffline(false);
  }
});
