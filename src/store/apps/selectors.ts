import type { Store } from './store';

const currentApp = (s: Store) => {
  const activeId = s.activeId;
  console.log('currentApp', s.apps);
  return s.apps.find((app) => app.appId === activeId);
}

const currentAppId = (s: Store) => {
  const app = currentApp(s);
  return app?.appId || '';
}

export const appsSelectors = {
  currentApp,
  currentAppId,
};
