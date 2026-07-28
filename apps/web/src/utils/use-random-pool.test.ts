import { describe, expect, it, vi } from 'vitest';
import { createRandomPool } from './use-random-pool';

describe('createRandomPool', () => {
  it('returns every item exactly once before starting a new cycle', () => {
    const nextItem = createRandomPool(['first', 'second', 'third'], () => 0);

    expect([nextItem(), nextItem(), nextItem()]).toStrictEqual([
      'first',
      'second',
      'third',
    ]);
    expect(nextItem()).toBe('first');
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
});
