import { useMemo } from 'react';

export type RandomSource = () => number;

export function createRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
  random: RandomSource = Math.random,
): () => T {
  if (poolItems.length === 0) {
    throw new Error('A random pool requires at least one item.');
  }

  let remainingItems: readonly T[] = [];

  return function nextItem() {
    if (remainingItems.length === 0) {
      remainingItems = [...poolItems];
    }

    const randomValue = random();

    if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
      throw new Error('The random source must return a number from 0 up to 1.');
    }

    const index = Math.floor(randomValue * remainingItems.length);
    const item = remainingItems[index];

    if (item === undefined) {
      throw new Error('The random pool reached an invalid state.');
    }

    remainingItems = [
      ...remainingItems.slice(0, index),
      ...remainingItems.slice(index + 1),
    ];

    return item;
  };
}

export function useRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
): readonly [nextItem: () => T] {
  const nextItem = useMemo(() => createRandomPool(poolItems), [poolItems]);

  return [nextItem];
}
