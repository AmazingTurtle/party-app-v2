import { act } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './theme-toggle';

const theme = vi.hoisted(() => ({
  getPreference: vi.fn(() => 'system'),
  hidePopover: vi.fn(),
  setTheme: vi.fn(),
}));

Object.defineProperty(HTMLDivElement.prototype, 'hidePopover', {
  configurable: true,
  value: theme.hidePopover,
});

vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: theme.setTheme,
    theme: theme.getPreference(),
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    theme.getPreference.mockReset();
    theme.getPreference.mockReturnValue('system');
    theme.hidePopover.mockClear();
    theme.setTheme.mockClear();
  });

  it('exposes System, light, and dark preferences', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    expect(
      screen.getByRole('button', { name: 'Farbschema ändern' }),
    ).toBeInTheDocument();

    const systemButton = screen.getByRole('button', {
      name: 'System',
      hidden: true,
    });
    const lightButton = screen.getByRole('button', {
      name: 'Hell',
      hidden: true,
    });
    const darkButton = screen.getByRole('button', {
      name: 'Dunkel',
      hidden: true,
    });

    expect(systemButton).toHaveAttribute('aria-pressed', 'true');
    expect(lightButton).toHaveAttribute('aria-pressed', 'false');
    expect(darkButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(lightButton);
    await user.click(darkButton);
    await user.click(systemButton);

    expect(theme.setTheme).toHaveBeenNthCalledWith(1, 'light');
    expect(theme.setTheme).toHaveBeenNthCalledWith(2, 'dark');
    expect(theme.setTheme).toHaveBeenNthCalledWith(3, 'system');
    expect(theme.hidePopover).toHaveBeenCalledTimes(3);
  });

  it('keeps the server preference stable through hydration', async () => {
    theme.getPreference.mockReturnValue('light');
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const container = document.createElement('div');
    container.innerHTML = renderToString(<ThemeToggle />);

    const renderedPopover = within(container);
    expect(
      renderedPopover.getByRole('button', {
        name: 'System',
        hidden: true,
      }),
    ).toHaveAttribute('aria-pressed', 'true');

    const root = hydrateRoot(container, <ThemeToggle />);

    await waitFor(() =>
      expect(
        renderedPopover.getByRole('button', {
          name: 'Hell',
          hidden: true,
        }),
      ).toHaveAttribute('aria-pressed', 'true'),
    );
    expect(consoleError).not.toHaveBeenCalled();

    act(() => {
      root.unmount();
    });
  });
});
