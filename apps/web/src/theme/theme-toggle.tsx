'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import { Check, Monitor, MoonStar, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

export type ThemePreference = 'system' | 'light' | 'dark';

const popoverId = 'theme-popover';

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}

function subscribeToHydration() {
  return () => undefined;
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

function getOptionClassName(isActive: boolean) {
  return isActive ? 'theme-option theme-option--active' : 'theme-option';
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const popoverRef = useRef<HTMLDivElement>(null);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const selectedTheme =
    isHydrated && isThemePreference(theme) ? theme : 'system';

  const closePopover = useCallback(() => {
    popoverRef.current?.hidePopover();
  }, []);
  const handleSystemTheme = useCallback(() => {
    setTheme('system');
    closePopover();
  }, [closePopover, setTheme]);
  const handleLightTheme = useCallback(() => {
    setTheme('light');
    closePopover();
  }, [closePopover, setTheme]);
  const handleDarkTheme = useCallback(() => {
    setTheme('dark');
    closePopover();
  }, [closePopover, setTheme]);

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        aria-label="Farbschema ändern"
        className="theme-floater"
      >
        <SunMoon aria-hidden="true" />
      </button>

      <div
        ref={popoverRef}
        id={popoverId}
        popover="auto"
        role="dialog"
        aria-label="Farbschema"
        className="theme-popover"
      >
        <div className="theme-popover__options">
          <button
            type="button"
            className={getOptionClassName(selectedTheme === 'system')}
            aria-pressed={selectedTheme === 'system'}
            onClick={handleSystemTheme}
          >
            <Monitor aria-hidden="true" />
            <span>System</span>
            {selectedTheme === 'system' && (
              <Check aria-hidden="true" className="theme-option__check" />
            )}
          </button>
          <button
            type="button"
            className={getOptionClassName(selectedTheme === 'light')}
            aria-pressed={selectedTheme === 'light'}
            onClick={handleLightTheme}
          >
            <Sun aria-hidden="true" />
            <span>Hell</span>
            {selectedTheme === 'light' && (
              <Check aria-hidden="true" className="theme-option__check" />
            )}
          </button>
          <button
            type="button"
            className={getOptionClassName(selectedTheme === 'dark')}
            aria-pressed={selectedTheme === 'dark'}
            onClick={handleDarkTheme}
          >
            <MoonStar aria-hidden="true" />
            <span>Dunkel</span>
            {selectedTheme === 'dark' && (
              <Check aria-hidden="true" className="theme-option__check" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
