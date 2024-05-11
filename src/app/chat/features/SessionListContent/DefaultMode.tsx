import isEqual from 'fast-deep-equal';
import {memo, useEffect, useRef} from 'react';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

import SessionList from './List';
import {useUserStore} from "@/store/user";
import {appsSelectors, useAppsStore} from "@/store/apps";

const SessionDefaultMode = memo(() => {

  const [
    init,
    useFetchSessions,
    sessions,
    createSession,
    activeSession,
    activeId,
  ] = useSessionStore((s) => [
    s.isSessionsFirstFetchFinished,
    s.useFetchSessions,
    s.sessions,
    s.createSession,
    s.activeSession,
    s.activeId,
  ]);

  const userId = useUserStore(s => s.userId);
  const appId = useAppsStore(appsSelectors.currentAppId, isEqual);

  useFetchSessions({ userId, appId });

  const didInit = useRef(false);

  useEffect(() => {
    if (init && !didInit.current && !activeId) {
      didInit.current = true;

      if (sessions.length) {
        // 切换到第一个session
        activeSession(sessions[0].id);
      } else {
        createSession()
      }
    }
  }, [init, sessions, activeId]);

  useEffect(() => {

  }, [appId]);

  const defaultSessions = useSessionStore(sessionSelectors.defaultSessions, isEqual);

  return (
    <SessionList dataSource={defaultSessions || []} />
  );
});

SessionDefaultMode.displayName = 'SessionDefaultMode';

export default SessionDefaultMode;
