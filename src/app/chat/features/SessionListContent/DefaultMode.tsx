import isEqual from 'fast-deep-equal';
import {memo, useEffect, useRef} from 'react';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

import SessionList from './List';

const SessionDefaultMode = memo(() => {

  const [
    init,
    useFetchSessions,
    sessions,
    createSession,
    activeSession,
  ] = useSessionStore((s) => [
    s.isSessionsFirstFetchFinished,
    s.useFetchSessions,
    s.sessions,
    s.createSession,
    s.activeSession,
  ]);

  useFetchSessions();

  const didInit = useRef(false);

  useEffect(() => {
    if (init && !didInit.current) {
      didInit.current = true;

      if (sessions.length) {
        // 切换到第一个session
        activeSession(sessions[0].id);
      } else {
        createSession()
      }
    }
  }, [init, sessions]);

  const defaultSessions = useSessionStore(sessionSelectors.defaultSessions, isEqual);

  return (
    <SessionList dataSource={defaultSessions || []} />
  );
});

SessionDefaultMode.displayName = 'SessionDefaultMode';

export default SessionDefaultMode;
