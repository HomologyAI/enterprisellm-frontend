import { IPluginErrorType } from '@lobehub/chat-plugin-sdk';

import { ILobeAgentRuntimeErrorType } from '@/libs/agent-runtime';
import { ErrorType } from '@/types/fetch';

import { LLMRoleType } from '../llm';
import { BaseDataModel } from '../meta';
import { ChatPluginPayload } from './tools';
import { Translate } from './translate';
import {DifyMessage} from "@/types/message/dify";

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any;
  message: string;
  type: ErrorType | IPluginErrorType | ILobeAgentRuntimeErrorType;
}

export interface ChatTranslate extends Translate {
  content?: string;
}

export interface ChatTTS {
  contentMd5?: string;
  file?: string;
  voice?: string;
}

export interface RetrieverResourceItem {
  content: string, // 引用内容
  data_source_type: string,
  dataset_id: string, // 知识库id
  dataset_name: string, // 知识库名称
  document_id: string, // 文档id
  document_name: string, // 文档名称
  position: number,
  retriever_from: string,
  score: number,
  segment_id: string
}

export type RetrieverResources = RetrieverResourceItem[]

export * from './dify';
export * from './tools';

export interface ChatMessage extends BaseDataModel {
  // 后端返回的消息id
  backendMessageId?: string,
  content: string;
  /**
   * dify message
   */
  difyMsg?: DifyMessage;
  error?: ChatMessageError;

  // 扩展字段
  extra?: {
    fromModel?: string;
    fromProvider?: string;
    // 翻译
    translate?: ChatTranslate | false;
    // TTS
    tts?: ChatTTS;
  } & Record<string, any>;
  /**
   * 点赞、点踩
   */
  feedback?: 'like' | 'dislike',
  fileInfoList? : any,
  files?: string[];

  /**
   * observation id
   */
  observationId?: string;
  /**
   * parent message id
   */
  parentId?: string;
  plugin?: ChatPluginPayload;
  pluginState?: any;

  /**
   * quoted other message's id
   */
  quotaId?: string;

  /**
   * 引用文件的信息
   */
  retrieverResources?: RetrieverResources,

  /**
   * message role type
   */
  role: LLMRoleType;
  sessionId?: string;


  /**
   * 保存到主题的消息
   */
  topicId?: string;

  /**
   * 观测链路 id
   */
  traceId?: string;
}

export type ChatMessageMap = Record<string, ChatMessage>;
