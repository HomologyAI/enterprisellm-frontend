import {DifyDataset} from "@/libs/difyClient";

export interface DifyApp {
  appId: string,
  appKey: string,
  datasets: DifyDataset[];
  datasetsAppKey: string,
  icon: string,
  name: string,
  opening_statement: string // 开场白
}

export interface FetchDifyAppsResp {
  apps: DifyApp[];
}
