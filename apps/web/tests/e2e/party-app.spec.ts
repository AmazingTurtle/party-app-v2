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

test('keeps prompt history across reloads and route navigation', async ({
  page,
}) => {
  await page.goto('/games/never-have-i-ever');
  const nextButton = page.getByRole('button', { name: 'Weiter' });
  await expect(nextButton).toBeEnabled();
  const firstPrompt = await page.locator('main').textContent();

  await page.reload();
  await expect(nextButton).toBeEnabled();
  const secondPrompt = await page.locator('main').textContent();
  expect(secondPrompt).not.toBe(firstPrompt);

  await page.goto('/');
  await page.getByRole('link', { name: /Ich hab noch nie/i }).click();
  await expect(nextButton).toBeEnabled();
  const thirdPrompt = await page.locator('main').textContent();

  expect(thirdPrompt).not.toBe(firstPrompt);
  expect(thirdPrompt).not.toBe(secondPrompt);
});

test('persists explicit themes and follows System color changes', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const root = page.locator('html');
  const themeButton = page.getByRole('button', {
    name: 'Farbschema ändern',
  });
  await expect(root).toHaveClass('light');
  await themeButton.click();
  await expect(page.getByRole('button', { name: 'System' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await page.getByRole('button', { name: 'Dunkel' }).click();
  await expect(root).toHaveClass('dark');

  await page.reload();
  await expect(root).toHaveClass('dark');

  await themeButton.click();
  await page.getByRole('button', { name: 'Hell' }).click();
  await expect(root).toHaveClass('light');

  await page.emulateMedia({ colorScheme: 'dark' });
  await themeButton.click();
  await page.getByRole('button', { name: 'System' }).click();
  await expect(root).toHaveClass('dark');

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(root).toHaveClass('light');
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

  await page.goto('/');
  await expect(page.getByRole('link', { name: /Gigalo/i })).toHaveCount(0);

  await page.goto('/games/gigalo');
  await expect(
    page.getByText('Das Spiel Gigalo gibt es leider noch nicht.'),
  ).toBeVisible();

  await page.goto('/games');
  await expect(page).toHaveURL('/');
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
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight <= window.innerHeight + 1,
    ),
  ).toBe(true);
});

test('keeps the Kings Cup card and long rule inside a mobile stage', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/games/big-kings-cup');

  const firstCard = page.getByRole('button', {
    name: 'Nächste Karte ziehen. Aktuelle Karte: Ass Kreuz',
  });
  await expect(firstCard).toBeVisible();
  const firstCardTop = (await firstCard.boundingBox())?.y;
  await firstCard.click();

  const kingCard = page.getByRole('button', {
    name: 'Nächste Karte ziehen. Aktuelle Karte: König Pik',
  });
  await expect(kingCard).toBeVisible();
  await expect(page.getByRole('heading', { name: "King's Cup" })).toBeVisible();
  await expect(page.getByText('Karte antippen')).toBeVisible();
  const kingCardTop = (await kingCard.boundingBox())?.y;
  expect(firstCardTop).toBeDefined();
  expect(kingCardTop).toBeCloseTo(firstCardTop ?? 0, 0);

  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight <= window.innerHeight + 1,
    ),
  ).toBe(true);

  const ruleText = page.locator('.kings-rule p');
  expect(
    await ruleText.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);

  await kingCard.focus();
  await page.keyboard.press('Enter');
  await expect(kingCard).toHaveCount(0);
});

test('publishes route-specific titles, canonicals, and no-index metadata', async ({
  page,
}) => {
  await page.goto('/games/truth-or-dare');
  await expect(page).toHaveTitle('Wahrheit oder Pflicht | The Party App');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://new.thepartyapp.xyz/games/truth-or-dare',
  );

  await page.goto('/games/gigalo');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('card routes request only cards that become visible without a service worker', async ({
  browser,
}) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const requestedCards: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/cards/')) {
      requestedCards.push(new URL(request.url()).pathname);
    }
  });

  try {
    await page.goto('/games/big-kings-cup');
    await expect(page.locator('img[src*="/cards/"]')).toBeVisible();
    await expect.poll(() => new Set(requestedCards).size).toBe(1);

    await page.goto('/games/bus-driver');
    requestedCards.length = 0;
    await page.getByRole('button', { name: 'Nächste Karte aufdecken' }).click();
    const revealedCard = page.locator('img[src*="/cards/"]');
    await expect(revealedCard).toBeVisible();
    expect(
      await revealedCard.evaluate((image) => {
        const cardFace = image.parentElement;
        return cardFace === null
          ? null
          : {
              borderRadius: getComputedStyle(cardFace).borderRadius,
              overflow: getComputedStyle(cardFace).overflow,
            };
      }),
    ).toStrictEqual({ borderRadius: '8px', overflow: 'hidden' });
    await expect.poll(() => new Set(requestedCards).size).toBe(1);
  } finally {
    await context.close();
  }
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

  const workerResponse = await page.request.get('/serwist/sw.js');
  expect(workerResponse.ok()).toBe(true);
  const workerSource = await workerResponse.text();
  expect(workerSource).not.toContain('/cards/1c.svg');
  expect(workerSource).not.toContain('/sounds/clock-ticking.mp3');

  await expect
    .poll(async () =>
      page.evaluate(async () => {
        const card = await caches.match('/cards/13s.svg');
        const sound = await caches.match('/sounds/clock-ticking.mp3');
        return card !== undefined && sound !== undefined;
      }),
    )
    .toBe(true);

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
