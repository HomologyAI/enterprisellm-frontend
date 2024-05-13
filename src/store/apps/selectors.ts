import type { Store } from './store';

const currentApp = (s: Store) => {
  const activeId = s.activeId;
  return s.apps.find((app) => app.appId === activeId);
}

const currentAppId = (s: Store) => {
  const app = currentApp(s);
  return app?.appId || '';
}

const currentAppDatasets = (s: Store) => {
  const app = currentApp(s);
  return app?.datasets || [];
}


export const appsSelectors = {
  currentApp,
  currentAppId,
  currentAppDatasets,
};
