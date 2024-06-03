// Types.d.ts
import {AxiosResponse} from "axios";

export const BASE_URL: string;

export type RequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface Params {
  [key: string]: any;
}

interface HeaderParams {
  [key: string]: string;
}

interface User {
}

interface ChatMessageConfig {
  conversation_id?: string | null;
  dataset_ids?: string[];
  files?: File[] | null;
  inputs: any;
  query: string;
  stream?: boolean;
  user: User;
}

export declare class DifyClient {
  constructor(apiKey: string, baseUrl?: string);

  updateApiKey(apiKey: string): void;

  sendRequest(
    method: RequestMethods,
    endpoint: string,
    data?: any,
    params?: Params,
    stream?: boolean,
    headerParams?: HeaderParams
  ): Promise<any>;

  messageFeedback(message_id: string, rating: 'like' | 'dislike', user: string): Promise<any>;

  getFile(document_id: string): Promise<any>;

  getApplicationParameters(user: User): Promise<any>;

  fileUpload(data: FormData): Promise<any>;
}

export declare class CompletionClient extends DifyClient {
  createCompletionMessage(
    inputs: any,
    user: User,
    stream?: boolean,
    files?: File[] | null
  ): Promise<any>;
}

export declare class ChatClient extends DifyClient {
  createChatMessage(config: ChatMessageConfig): Promise<any>;

  getConversationMessages(
    user: User,
    conversation_id?: string,
    first_id?: string | null,
    limit?: number | null
  ): Promise<any>;

  getConversations(user: User, first_id?: string | null, limit?: number | null, pinned?: boolean | null): Promise<any>;

  renameConversation(conversation_id: string, name: string, user: User): Promise<any>;

  deleteConversation(conversation_id: string, user: User): Promise<any>;

  getConversationName(conversation_id: string, user: User): Promise<any>;

  getApps(): Promise<any>;
}

export interface DifyDataset {
  app_count: number;
  created_at: string;
  created_by: string;
  data_source_type: string;
  description: string;
  document_count: number;
  id: string;
  indexing_technique: string;
  isChecked: boolean;
  name: string;
  permission: string;
  updated_at: string;
  updated_by: string;
  word_count: number;
}

export interface GetDatasetsResp {
  data: DifyDataset[];
  has_more: boolean;
  limit: number;
  page: number;
  total: number;
}

export interface DifyRawApp {
  datasets: string[][];
  icon: string,
  icon_background: string;
  id: string;
  mode: string;
  name: string;
  token: string;
}

export type GetAppResp = DifyRawApp[];

export interface GetDatasetsParams {
  limit: number;
  page: number;
}

export declare class DatasetsClient extends DifyClient {
  getDatasets(params: GetDatasetsParams): Promise<AxiosResponse<GetDatasetsResp>>;
}

export interface UploadFileParams {
  file: File;
  user: string;
}

export interface UploadFileResp {
  created_at: number;
  created_by: string;
  extension: string;
  id: string;
  mime_type: string;
  name: string;
  size: number;
}

export declare class FileClient extends DifyClient {
  upload(params: UploadFileParams): Promise<AxiosResponse<UploadFileResp>>;
}
