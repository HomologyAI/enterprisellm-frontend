import {DifyDataset} from "@/libs/difyClient";

export interface DifyApp {
  appId: string,
  icon: string,
  name: string,
  appKey: string,
  datasetsAppKey: string,
  datasets: DifyDataset[];
}

export interface FetchDifyAppsResp {
  apps: DifyApp[];
}