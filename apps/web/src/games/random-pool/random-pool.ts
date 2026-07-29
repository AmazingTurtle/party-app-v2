export type RandomSource = () => number;

export interface RandomPoolState {
  drawnKeys: readonly string[];
  lastDrawnKey: string | null;
}

export interface RandomPool<T> {
  draw: () => T;
  getState: () => RandomPoolState;
}

export interface CreateRandomPoolOptions<T> {
  getKey: (item: T) => string;
  initialState?: RandomPoolState;
  random?: RandomSource;
}

function readRandomIndex(length: number, random: RandomSource) {
  const randomValue = random();

  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
    throw new Error('The random source must return a number from 0 up to 1.');
  }

  return Math.floor(randomValue * length);
}

function shuffle<T>(items: readonly T[], random: RandomSource) {
  const shuffledItems = [...items];

  for (let endIndex = shuffledItems.length - 1; endIndex > 0; endIndex -= 1) {
    const randomIndex = readRandomIndex(endIndex + 1, random);
    const endItem = shuffledItems[endIndex];
    const randomItem = shuffledItems[randomIndex];

    if (endItem === undefined || randomItem === undefined) {
      throw new Error('The random pool reached an invalid state.');
    }

    shuffledItems[endIndex] = randomItem;
    shuffledItems[randomIndex] = endItem;
  }

  return shuffledItems;
}

export function getCaseInsensitiveContentKey(value: string) {
  return value.toLocaleLowerCase('de-DE');
}

export function createRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
  {
    getKey,
    initialState = { drawnKeys: [], lastDrawnKey: null },
    random = Math.random,
  }: CreateRandomPoolOptions<T>,
): RandomPool<T> {
  if (poolItems.length === 0) {
    throw new Error('A random pool requires at least one item.');
  }

  const itemsByKey = new Map<string, T>();

  for (const item of poolItems) {
    const key = getKey(item);

    if (itemsByKey.has(key)) {
      throw new Error(`A random pool contains the duplicate key "${key}".`);
    }

    itemsByKey.set(key, item);
  }

  let drawnKeys = new Set(
    initialState.drawnKeys.filter((key) => itemsByKey.has(key)),
  );
  let lastDrawnKey =
    initialState.lastDrawnKey !== null &&
    itemsByKey.has(initialState.lastDrawnKey)
      ? initialState.lastDrawnKey
      : null;
  let remainingItems: T[] = [];

  function startCycle() {
    drawnKeys = new Set();
    remainingItems = shuffle(poolItems, random);
    const nextItem = remainingItems.at(-1);

    if (nextItem === undefined) {
      throw new Error('The random pool reached an invalid state.');
    }

    if (
      remainingItems.length > 1 &&
      lastDrawnKey !== null &&
      getKey(nextItem) === lastDrawnKey
    ) {
      const firstItem = remainingItems[0];
      const lastIndex = remainingItems.length - 1;
      const lastItem = remainingItems[lastIndex];

      if (firstItem === undefined || lastItem === undefined) {
        throw new Error('The random pool reached an invalid state.');
      }

      remainingItems[0] = lastItem;
      remainingItems[lastIndex] = firstItem;
    }
  }

  remainingItems = shuffle(
    poolItems.filter((item) => !drawnKeys.has(getKey(item))),
    random,
  );

  if (remainingItems.length === 0) {
    startCycle();
  }

  return {
    draw() {
      if (remainingItems.length === 0) {
        startCycle();
      }

      const item = remainingItems.pop();

      if (item === undefined) {
        throw new Error('The random pool reached an invalid state.');
      }

      const key = getKey(item);
      drawnKeys = new Set(drawnKeys).add(key);
      lastDrawnKey = key;

      return item;
    },
    getState() {
      return {
        drawnKeys: [...drawnKeys],
        lastDrawnKey,
      };
    },
  };
}
