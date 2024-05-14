'use client';

import { useResponsive } from 'antd-style';
import { useQueryState } from 'nuqs';
import { parseAsString } from 'nuqs/server';
import { memo, useEffect } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useSessionStore } from '@/store/session';
import {INBOX_SESSION_ID} from "@/const/session";

// sync outside state to useSessionStore
const SessionHydration = memo(() => {
  const useStoreUpdater = createStoreUpdater(useSessionStore);

  const [activeId, sessions, activeSession, createSession, initSessions, updateQueryId] = useSessionStore(s => [
    s.activeId,
    s.sessions,
    s.activeSession,
    s.createSession,
    s.initSessions,
    s.updateQueryId
  ]);

  const { mobile } = useResponsive();
  useStoreUpdater('isMobile', mobile);

  // two-way bindings the url and session store
  const [querySessionId, setSession] = useQueryState(
    'session',
    parseAsString.withDefault('inbox').withOptions({ history: 'replace', throttleMs: 500 }),
  );

  useEffect(() => {
    console.log('querySessionId', querySessionId, sessions);
    initSessions(querySessionId);

    // if (querySessionId === INBOX_SESSION_ID) {
    //   if (sessions.length) {
    //     activeSession(sessions[0].id);
    //   } else {
    //     createSession();
    //   }
    // } else if (sessions.length) {
    //   const hasSession = sessions.find((s) => s.id === querySessionId);
    //
    //   if (hasSession && activeId !== querySessionId) {
    //     activeSession(querySessionId);
    //   } else {
    //     activeSession(sessions[0].id);
    //   }
    // } else {
    //   createSession();
    // }
    updateQueryId(querySessionId);
  }, [querySessionId]);

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
