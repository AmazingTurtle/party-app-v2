import { useMemo } from 'react';

export type RandomSource = () => number;

export function createRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
  random: RandomSource = Math.random,
): () => T {
  if (poolItems.length === 0) {
    throw new Error('A random pool requires at least one item.');
  }

  let remainingItems: T[] = [];
  let previousItem: T | undefined;

  return function nextItem() {
    if (remainingItems.length === 0) {
      remainingItems = [...poolItems];
    }

    const randomValue = random();

    if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
      throw new Error('The random source must return a number from 0 up to 1.');
    }

    let index = Math.floor(randomValue * remainingItems.length);

    if (
      remainingItems.length > 1 &&
      previousItem !== undefined &&
      remainingItems[index] === previousItem
    ) {
      index = (index + 1) % remainingItems.length;
    }

    const item = remainingItems[index];

    if (item === undefined) {
      throw new Error('The random pool reached an invalid state.');
    }

    const lastItem = remainingItems.pop();

    if (lastItem !== undefined && index < remainingItems.length) {
      remainingItems[index] = lastItem;
    }

    previousItem = item;
    return item;
  };
}

export function useRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
): () => T {
  return useMemo(() => createRandomPool(poolItems), [poolItems]);
}
