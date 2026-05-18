'use client';

import { useMemo } from 'react';
import { DocumentReference, Query } from 'firebase/firestore';

/**
 * A custom hook to stabilize a Firestore DocumentReference or Query.
 */
export function useMemoFirebase<T extends DocumentReference<any> | Query<any> | null>(
  factory: () => T,
  dependencies: any[]
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, dependencies);
}
