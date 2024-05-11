import {DifyApp} from "@/types/dify";

export interface StoreState {
  apps: DifyApp[];
  activeIdx: number;
  fetchingState: 'error' | 'success' | 'loading';
  activeId: string;
}

export const initialState: StoreState = {
  apps: [],
  activeIdx: 0,
  fetchingState: 'loading',
  activeId: '',
};
