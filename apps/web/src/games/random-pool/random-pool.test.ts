import { describe, expect, it, vi } from 'vitest';
import { createRandomPool, getCaseInsensitiveContentKey } from './random-pool';

function getStringKey(value: string) {
  return value;
}

describe('createRandomPool', () => {
  it('returns every item exactly once before starting a new cycle', () => {
    const pool = createRandomPool(['first', 'second', 'third'], {
      getKey: getStringKey,
      random: () => 0,
    });
    const firstCycle = [pool.draw(), pool.draw(), pool.draw()];

    expect(new Set(firstCycle)).toStrictEqual(
      new Set(['first', 'second', 'third']),
    );
    expect(firstCycle).toHaveLength(3);
  });

  it('reshuffles after exhaustion without repeating the boundary item', () => {
    const pool = createRandomPool(['first', 'second'], {
      getKey: getStringKey,
      random: () => 0,
    });

    pool.draw();
    const finalItem = pool.draw();

    expect(pool.draw()).not.toBe(finalItem);
  });

  it('resumes without returning keys already drawn in the current cycle', () => {
    const pool = createRandomPool(['first', 'second', 'third'], {
      getKey: getStringKey,
      initialState: {
        drawnKeys: ['first', 'removed'],
        lastDrawnKey: 'removed',
      },
      random: () => 0,
    });

    expect(pool.draw()).toBe('second');
    expect(pool.getState()).toStrictEqual({
      drawnKeys: ['first', 'second'],
      lastDrawnKey: 'second',
    });
  });

  it('makes newly added keys eligible when resuming a cycle', () => {
    const pool = createRandomPool(['existing', 'new'], {
      getKey: getStringKey,
      initialState: {
        drawnKeys: ['existing'],
        lastDrawnKey: 'existing',
      },
      random: () => 0,
    });

    expect(pool.draw()).toBe('new');
  });

  it('returns the only item on every cycle', () => {
    const pool = createRandomPool(['only'], {
      getKey: getStringKey,
      random: () => 0,
    });

    expect([pool.draw(), pool.draw()]).toStrictEqual(['only', 'only']);
  });

  it('does not mutate the source collection or exposed state', () => {
    const sourceItems = Object.freeze(['first', 'second', 'third']);
    const pool = createRandomPool(sourceItems, {
      getKey: getStringKey,
      random: () => 0.5,
    });

    pool.draw();
    const state = pool.getState();

    expect(sourceItems).toStrictEqual(['first', 'second', 'third']);
    expect(state.drawnKeys).not.toBe(pool.getState().drawnKeys);
  });

  it('rejects an empty pool before it can return an invalid item', () => {
    expect(() =>
      createRandomPool([], {
        getKey: getStringKey,
      }),
    ).toThrow('A random pool requires at least one item.');
  });

  it('rejects duplicate canonical keys', () => {
    expect(() =>
      createRandomPool(['Frage', 'frage'], {
        getKey: getCaseInsensitiveContentKey,
      }),
    ).toThrow('A random pool contains the duplicate key "frage".');
  });

  it.each([Number.NaN, Number.NEGATIVE_INFINITY, -0.1, 1])(
    'rejects an invalid random value of %s',
    (randomValue) => {
      const random = vi.fn(() => randomValue);

      expect(() =>
        createRandomPool(['first', 'second'], {
          getKey: getStringKey,
          random,
        }),
      ).toThrow('The random source must return a number from 0 up to 1.');
    },
  );

  it('draws a large cycle without losing or duplicating items', () => {
    const sourceItems = Array.from({ length: 10_000 }, (_, index) => index);
    const pool = createRandomPool(sourceItems, {
      getKey: String,
      random: () => 0.42,
    });
    const drawnItems = Array.from({ length: sourceItems.length }, pool.draw);

    expect(new Set(drawnItems).size).toBe(sourceItems.length);
    expect(sourceItems[0]).toBe(0);
    expect(sourceItems.at(-1)).toBe(9_999);
  });
});
