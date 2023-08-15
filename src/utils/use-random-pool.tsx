import { useCallback, useState } from 'react';

export function useRandomPool<T>(poolItems: Array<T>): [nextItem: () => T] {
  console.assert(poolItems.length > 0, 'poolItems must not be empty');
  const [pool, setPool] = useState<Array<T>>([]);
  const randomizePool = useCallback(() => {
    // setPool with random order poolItems
    return poolItems.slice().sort(() => Math.random() - 0.5);
  }, [poolItems]);
  const nextItem = useCallback(() => {
    if (pool.length === 0) {
      const randomPool = randomizePool();
      const item = randomPool.pop()!;
      setPool(randomPool);
      return item;
    }
    return pool.pop()!;
  }, [pool, randomizePool]);
  return [nextItem];
}
