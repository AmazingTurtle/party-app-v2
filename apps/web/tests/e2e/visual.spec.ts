import { expect, test, type Page } from '@playwright/test';

type ExplicitTheme = 'light' | 'dark';

async function useExplicitTheme(page: Page, theme: ExplicitTheme) {
  await page.addInitScript((selectedTheme) => {
    window.localStorage.setItem('theme', selectedTheme);
  }, theme);
}

async function waitForLocalFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test('matches the desktop launcher in light mode', async ({ page }) => {
  await useExplicitTheme(page, 'light');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await waitForLocalFonts(page);

  await expect(page).toHaveScreenshot('launcher-desktop-light.png', {
    animations: 'disabled',
    fullPage: true,
  });
});

test('matches the desktop launcher in dark mode', async ({ page }) => {
  await useExplicitTheme(page, 'dark');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await waitForLocalFonts(page);

  await expect(page).toHaveScreenshot('launcher-desktop-dark.png', {
    animations: 'disabled',
    fullPage: true,
  });
});

test('matches the mobile launcher', async ({ page }) => {
  await useExplicitTheme(page, 'light');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await waitForLocalFonts(page);

  await expect(page).toHaveScreenshot('launcher-mobile-light.png', {
    animations: 'disabled',
    fullPage: true,
  });
});

test('matches the fixed Kings Cup mobile stage', async ({ page }) => {
  await useExplicitTheme(page, 'dark');
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/games/big-kings-cup');
  await page
    .getByRole('button', {
      name: 'Nächste Karte ziehen. Aktuelle Karte: Ass Kreuz',
    })
    .click();
  await expect(
    page.getByRole('button', {
      name: 'Nächste Karte ziehen. Aktuelle Karte: König Pik',
    }),
  ).toBeVisible();
  await waitForLocalFonts(page);

  await expect(page).toHaveScreenshot('kings-cup-mobile-dark.png', {
    animations: 'disabled',
  });
});
