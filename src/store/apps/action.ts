import useSWR, { SWRResponse } from 'swr';
import type { StateCreator } from 'zustand/vanilla';

import {DifyApp, FetchDifyAppsResp} from '@/types/dify';

import type { Store } from './store';
import {API_ENDPOINTS} from "@/services/_url";
import {useClientDataSWR} from "@/libs/swr";
import {GetDatasetsResp} from "@/libs/difyClient";
import {difyService} from "@/services/dify";

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
    useClientDataSWR('fetchDifyApps', () => {
      return difyService.getApps();
    }, {
      onSuccess: (resp: DifyApp[]) => {
        console.log('session', resp);
        set({ apps: resp, fetchingState: 'success' }, false);

        if (!resp || !resp.length) {
          set({ fetchingState: 'error' }, false);
        }
      },
      onError: () => {
        set({ fetchingState: 'error' }, false);
      },
  })
});
