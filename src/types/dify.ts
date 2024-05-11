
export interface DifyApp {
  appId: string,
  icon: string,
  name: string,
  appKey: string,
  datasetsAppKey: string,
}

export interface FetchDifyAppsResp {
  apps: DifyApp[];
}