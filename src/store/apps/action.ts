import useSWR, { SWRResponse } from 'swr';
import type { StateCreator } from 'zustand/vanilla';

import { FetchDifyAppsResp } from '@/types/dify';

import type { Store } from './store';
import {API_ENDPOINTS} from "@/services/_url";
import {useClientDataSWR} from "@/libs/swr";
import {GetDatasetsResp} from "@/libs/difyClient";

export interface StoreAction {
  useFetchApps: () => SWRResponse<FetchDifyAppsResp>;
  updateActiveAppId: (id: string) => void;
}

export const createAppsAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set, get) => ({
  updateActiveAppId: (activeId) => {
    set({ activeId: activeId }, false);
  },
  useFetchApps: () =>
    useSWR('fetchDifyApps', async () => {
      return fetch(API_ENDPOINTS.difyApps, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then((resp) => {
        return resp.json();
      });
    }, {
      dedupingInterval: 0,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (resp: GetDatasetsResp) => {
        console.log('session', resp);
        set({ apps: resp, fetchingState: 'success' }, false);
      },
      onError: () => {
        set({ fetchingState: 'error' }, false);
      },
  })
});
