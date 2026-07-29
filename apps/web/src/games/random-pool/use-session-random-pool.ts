'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import {
  createRandomPool,
  type RandomPool,
  type RandomPoolState,
} from '@/games/random-pool/random-pool';

export type SessionRandomPoolId =
  | 'big-kings-cup/cards'
  | 'bus-driver/cards'
  | 'five-seconds/questions'
  | 'never-have-i-ever/questions'
  | 'truth-or-dare/dare'
  | 'truth-or-dare/truth';

export interface UseSessionRandomPoolOptions<T> {
  getKey: (item: T) => string;
  id: SessionRandomPoolId;
}

interface StoredRandomPoolState {
  version: 1;
  drawnKeys: string[];
  lastDrawnKey: string | null;
}

const storageKeyPrefix = 'party-app.random-pool.v1';

function subscribeToHydration() {
  return () => undefined;
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => typeof item === 'string')
  );
}

function parseStoredState(value: unknown): RandomPoolState | undefined {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    !isStringArray(value.drawnKeys) ||
    new Set(value.drawnKeys).size !== value.drawnKeys.length ||
    (value.lastDrawnKey !== null && typeof value.lastDrawnKey !== 'string') ||
    (value.drawnKeys.length === 0
      ? value.lastDrawnKey !== null
      : typeof value.lastDrawnKey !== 'string' ||
        !value.drawnKeys.includes(value.lastDrawnKey))
  ) {
    return undefined;
  }

  return {
    drawnKeys: value.drawnKeys,
    lastDrawnKey: value.lastDrawnKey,
  };
}

function readStoredState(
  storage: Storage,
  storageKey: string,
): RandomPoolState | undefined {
  try {
    const serializedState = storage.getItem(storageKey);

    if (serializedState === null) {
      return undefined;
    }

    return parseStoredState(JSON.parse(serializedState));
  } catch {
    return undefined;
  }
}

function serializeState(state: RandomPoolState): StoredRandomPoolState {
  return {
    version: 1,
    drawnKeys: [...state.drawnKeys],
    lastDrawnKey: state.lastDrawnKey,
  };
}

function getSessionStorage(): Storage | undefined {
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
}

export function getSessionRandomPoolStorageKey(id: SessionRandomPoolId) {
  return `${storageKeyPrefix}.${id}`;
}

export function useSessionRandomPool<T extends NonNullable<unknown>>(
  poolItems: readonly T[],
  { getKey, id }: UseSessionRandomPoolOptions<T>,
): (() => T) | undefined {
  const poolRef = useRef<RandomPool<T>>(undefined);
  const storageRef = useRef<Storage>(undefined);
  const canPersistRef = useRef(true);
  const configurationRef = useRef<{
    getKey: (item: T) => string;
    poolItems: readonly T[];
    storageKey: string;
  }>(undefined);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const storageKey = getSessionRandomPoolStorageKey(id);

  const draw = useCallback(() => {
    const currentConfiguration = configurationRef.current;
    let pool = poolRef.current;

    if (
      pool === undefined ||
      currentConfiguration?.getKey !== getKey ||
      currentConfiguration.poolItems !== poolItems ||
      currentConfiguration.storageKey !== storageKey
    ) {
      const storage = getSessionStorage();
      const initialState =
        storage === undefined
          ? undefined
          : readStoredState(storage, storageKey);

      storageRef.current = storage;
      canPersistRef.current = storage !== undefined;
      pool = createRandomPool(poolItems, {
        getKey,
        ...(initialState === undefined ? {} : { initialState }),
      });
      poolRef.current = pool;
      configurationRef.current = { getKey, poolItems, storageKey };
    }

    const item = pool.draw();
    const storage = storageRef.current;

    if (storage !== undefined && canPersistRef.current) {
      try {
        storage.setItem(
          storageKey,
          JSON.stringify(serializeState(pool.getState())),
        );
      } catch {
        canPersistRef.current = false;
      }
    }

    return item;
  }, [getKey, poolItems, storageKey]);

  return isHydrated ? draw : undefined;
}
