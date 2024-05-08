import {ChatClient, DatasetsClient, FileClient} from "@/libs/difyClient";
import {getServerConfig} from "@/config/server";

const {
  DIFY_PROXY_URL,
  DIFY_CHAT_API_KEY,
  DIFY_DATASETS_API_KEY,
} = getServerConfig();

export const chatClient = new ChatClient(DIFY_CHAT_API_KEY, DIFY_PROXY_URL);
export const datasetsClient = new DatasetsClient(DIFY_DATASETS_API_KEY, DIFY_PROXY_URL);
export const uploadClient = new FileClient(DIFY_CHAT_API_KEY, DIFY_PROXY_URL);