import { useCallback, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getSessionRandomPoolStorageKey,
  useSessionRandomPool,
} from './use-session-random-pool';

interface PoolHarnessProps {
  items?: readonly string[];
}

function getStringKey(value: string) {
  return value;
}

function PoolHarness({
  items = ['first', 'second', 'third'],
}: PoolHarnessProps) {
  const draw = useSessionRandomPool(items, {
    getKey: getStringKey,
    id: 'five-seconds/questions',
  });
  const [item, setItem] = useState('none');
  const handleDraw = useCallback(() => {
    if (draw !== undefined) {
      setItem(draw());
    }
  }, [draw]);

  return (
    <>
      <output aria-label="Drawn item">{item}</output>
      <button type="button" disabled={draw === undefined} onClick={handleDraw}>
        Draw
      </button>
    </>
  );
}

describe('useSessionRandomPool', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('resumes a cycle after the component remounts', async () => {
    const user = userEvent.setup();
    const firstRender = render(<PoolHarness />);

    await user.click(await screen.findByRole('button', { name: 'Draw' }));
    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('first');

    firstRender.unmount();
    render(<PoolHarness />);
    await user.click(await screen.findByRole('button', { name: 'Draw' }));

    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).not.toHaveTextContent('first');
  });

  it('discards malformed stored state', async () => {
    const storageKey = getSessionRandomPoolStorageKey('five-seconds/questions');
    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        version: 1,
        drawnKeys: ['first', 'first'],
        lastDrawnKey: 'first',
      }),
    );
    const user = userEvent.setup();

    render(<PoolHarness />);
    await user.click(await screen.findByRole('button', { name: 'Draw' }));

    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('first');
  });

  it('ignores removed keys and makes new keys eligible', async () => {
    const storageKey = getSessionRandomPoolStorageKey('five-seconds/questions');
    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        version: 1,
        drawnKeys: ['existing', 'removed'],
        lastDrawnKey: 'removed',
      }),
    );
    const user = userEvent.setup();

    render(<PoolHarness items={['existing', 'new']} />);
    await user.click(await screen.findByRole('button', { name: 'Draw' }));

    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('new');
  });

  it('continues the in-memory cycle after a storage write fails', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is unavailable.');
    });
    const user = userEvent.setup();

    render(<PoolHarness items={['first', 'second']} />);
    const drawButton = await screen.findByRole('button', { name: 'Draw' });
    await user.click(drawButton);
    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('first');

    await user.click(drawButton);
    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('second');
  });

  it('starts a fresh in-memory cycle when storage cannot be read', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage is unavailable.');
    });
    const user = userEvent.setup();

    render(<PoolHarness items={['first', 'second']} />);
    await user.click(await screen.findByRole('button', { name: 'Draw' }));

    expect(
      screen.getByRole('status', { name: 'Drawn item' }),
    ).toHaveTextContent('first');
  });
});
