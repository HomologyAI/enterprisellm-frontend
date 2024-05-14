import {PersistOptions, devtools, persist, subscribeWithSelector} from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { StateCreator } from 'zustand/vanilla';

import { createHyperStorage } from '@/store/middleware/createHyperStorage';
import { isDev } from '@/utils/env';

import { type StoreAction, createAppsAction } from './action';
import { type StoreState, initialState } from './initialState';

export type Store = StoreAction & StoreState;

const LOBE_AGENT_APPS = 'LOBE_AGENT_APPS';

const persistOptions: PersistOptions<Store> = {
  name: LOBE_AGENT_APPS,

  skipHydration: true,

  storage: createHyperStorage({
    localStorage: {
      dbName: 'LobeHub',
      selectors: ['agentMap'],
    },
    url: {
      mode: 'search',
      selectors: [
        // map state key to storage key
        { currentIdentifier: 'agent' },
      ],
    },
  }),

  version: 0,
};

const createStore: StateCreator<Store, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createAppsAction(...parameters),
});

export const useAppsStore = createWithEqualityFn<Store>()(
  subscribeWithSelector(
    devtools(createStore, {
      name: LOBE_AGENT_APPS + (isDev ? '_DEV' : ''),
    }),
  ),
  shallow,
);


