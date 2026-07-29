import { describe, expect, it, vi } from 'vitest';
import { createRandomPool } from './use-random-pool';

describe('createRandomPool', () => {
  it('returns every item exactly once before starting a new cycle', () => {
    const nextItem = createRandomPool(['first', 'second', 'third'], () => 0);
    const firstCycle = [nextItem(), nextItem(), nextItem()];

    expect(new Set(firstCycle)).toStrictEqual(
      new Set(['first', 'second', 'third']),
    );
    expect(firstCycle).toHaveLength(3);
  });

  it('does not repeat the final item when a new cycle starts', () => {
    const randomValues = [0, 0, 0, 0.5];
    const nextItem = createRandomPool(
      ['first', 'second', 'third'],
      () => randomValues.shift() ?? 0,
    );

    nextItem();
    nextItem();
    const finalItem = nextItem();

    expect(nextItem()).not.toBe(finalItem);
  });

  it('does not mutate the source collection', () => {
    const sourceItems = Object.freeze(['first', 'second', 'third']);
    const nextItem = createRandomPool(sourceItems, () => 0.5);

    nextItem();

    expect(sourceItems).toStrictEqual(['first', 'second', 'third']);
  });

  it('rejects an empty pool before it can return an invalid item', () => {
    expect(() => createRandomPool([])).toThrow(
      'A random pool requires at least one item.',
    );
  });

  it.each([Number.NaN, Number.NEGATIVE_INFINITY, -0.1, 1])(
    'rejects an invalid random value of %s',
    (randomValue) => {
      const random = vi.fn(() => randomValue);
      const nextItem = createRandomPool(['item'], random);

      expect(() => nextItem()).toThrow(
        'The random source must return a number from 0 up to 1.',
      );
    },
  );

  it('draws a large cycle without losing or duplicating items', () => {
    const sourceItems = Array.from({ length: 10_000 }, (_, index) => index);
    const nextItem = createRandomPool(sourceItems, () => 0.42);
    const drawnItems = Array.from({ length: sourceItems.length }, nextItem);

    expect(new Set(drawnItems).size).toBe(sourceItems.length);
    expect(sourceItems[0]).toBe(0);
    expect(sourceItems.at(-1)).toBe(9_999);
  });
});
