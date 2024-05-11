import {API_ENDPOINTS} from "@/services/_url";
import {DifyApp} from "@/types/dify";

export interface DifyServiceBaseData {
  conversation_id: string;
  userId: string;
}

export interface DifyServicePayload<T> {
  app: DifyApp;
  data?: DifyServiceBaseData & T;
}

export interface DifyServiceRenamePayload {
  name: string;
  // userId: string;
  // conversation_id: string;
}

export interface DifyServiceResp {
  succ: 0 | 1;
  body: any;
}

class DifyService {
  fetchData<T>(url: string, payload: DifyServicePayload<T>) {
    const {
      app,
      data,
    } = payload;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app,
        ...data,
      })
    }).then(async (resp) => {
      const data = (await resp.json()) as DifyServiceResp;
      if (data?.succ === 1) {
        return data.body;
      }
      return null;
    })
  }

  renameConversation (data: DifyServicePayload<DifyServiceRenamePayload>) {
    return this.fetchData<DifyServiceRenamePayload>(API_ENDPOINTS.difyRename, data);
  }

  getDatasets (payload: DifyServicePayload<never>) {
    return this.fetchData<DifyServicePayload<never>>(API_ENDPOINTS.difyDatasets, payload);
  }
}

export const difyService = new DifyService();


