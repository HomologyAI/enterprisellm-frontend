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
  inputs: any;
  query: string;
  user: User;
  stream?: boolean;
  conversation_id?: string | null;
  files?: File[] | null;
  dataset_ids?: string[];
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

  messageFeedback(message_id: string, rating: number, user: User): Promise<any>;

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
}

export interface DifyDataset {
  id: string;
  name: string;
  description: string;
  permission: string;
  data_source_type: string;
  indexing_technique: string;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  isChecked: boolean;
}

export interface GetDatasetsResp {
  data: DifyDataset[];
  has_more: boolean;
  limit: number;
  total: number;
  page: number;
}

export interface GetDatasetsParams {
  page: number;
  limit: number;
}

export declare class DatasetsClient extends DifyClient {
  getDatasets(params: GetDatasetsParams): Promise<AxiosResponse<GetDatasetsResp>>;
}

export interface UploadFileParams {
  user: string;
  file: File;
}

export interface UploadFileResp {
  id: string;
  name: string;
  size: number;
  extension: string;
  mime_type: string;
  created_by: string;
  created_at: number;
}

export declare class FileClient extends DifyClient {
  upload(params: UploadFileParams): Promise<AxiosResponse<UploadFileResp>>;
}