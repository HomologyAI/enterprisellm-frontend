'use client';

import { useQueryState } from 'nuqs';
import { parseAsString } from 'nuqs/server';
import {memo, useEffect, useMemo} from 'react';
import { createStoreUpdater } from 'zustand-utils';

import {useAppsStore} from "@/store/apps";
import {usePathname} from "next/navigation";

// sync outside state to useSessionStore
const AppsInitialization = memo(() => {
  const useStoreUpdater = createStoreUpdater(useAppsStore);
  const apps = useAppsStore(s => s.apps);
  const activeId = useAppsStore(s => s.activeId);
  const updateActiveAppId = useAppsStore(s => s.updateActiveAppId);
  const useFetchApps = useAppsStore(s => s.useFetchApps);

  // two-way bindings the url and session store
  const [queryAppId, setQueryAppId] = useQueryState(
    'app',
    parseAsString.withDefault('').withOptions({ history: 'replace', throttleMs: 500 }),
  );

  useStoreUpdater('activeId', queryAppId);

  useFetchApps();

  const pathName = usePathname();

  useEffect(() => {
    console.log('activeId', activeId)
    if (apps.length) {
      const app = apps.find((app) => {
        return app.appId === activeId;
      });

      if (!app && pathName === '/chat') {
        updateActiveAppId(apps[0].appId);
      }
    }
  }, [activeId, apps, pathName]);

  useEffect(() => {
    const unsubscribe = useAppsStore.subscribe(
      (s) => s.activeId,
      (state) => setQueryAppId(state),
    );

    return () => {
      unsubscribe();
    };
  }, []);
});

export default AppsInitialization;
