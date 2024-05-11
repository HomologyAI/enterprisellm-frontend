'use client';

import { useResponsive } from 'antd-style';
import { useQueryState } from 'nuqs';
import { parseAsString } from 'nuqs/server';
import { memo, useEffect } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useSessionStore } from '@/store/session';

// sync outside state to useSessionStore
const SessionHydration = memo(() => {
  const useStoreUpdater = createStoreUpdater(useSessionStore);

  const [activeSession, sessions] = useSessionStore(s => [
    s.activeSession,
    s.sessions,
  ]);

  const { mobile } = useResponsive();
  useStoreUpdater('isMobile', mobile);

  // two-way bindings the url and session store
  const [querySessionId, setSession] = useQueryState(
    'session',
    parseAsString.withDefault('inbox').withOptions({ history: 'replace', throttleMs: 500 }),
  );

  useEffect(() => {
    console.log('hasSession', querySessionId);

    if (querySessionId === 'inbox') {
      activeSession(querySessionId);
    } else if (sessions.length) {
      const hasSession= sessions.find((s) => s.id === querySessionId);

      if (hasSession) {
        activeSession(querySessionId);
      }
    }
  }, [querySessionId, sessions]);

  useEffect(() => {
    const unsubscribe = useSessionStore.subscribe(
      (s) => s.activeId,
      (state) => setSession(state),
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
});

export default SessionHydration;
