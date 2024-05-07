import { LobeAgentConfig } from '@/types/agent';

import { BaseDataModel, MetaData } from './meta';
import {DifyDataset} from "@/libs/difyClient";
import {UploadFile} from "antd/es/upload/interface";
import {z} from "zod";

export enum LobeSessionType {
  Agent = 'agent',
  Group = 'group',
}

export type SessionGroupId = SessionDefaultGroup | string;

export enum SessionDefaultGroup {
  Default = 'default',
  Pinned = 'pinned',
}

export interface SessionGroupItem {
  createdAt: number;
  id: string;
  name: string;
  sort?: number;
  updatedAt: number;
}

export type SessionGroups = SessionGroupItem[];

/**
 * Lobe Agent
 */

export type LocalUploadFile = UploadFile<{
  id: string;
  localId: string;
  extension: string;
  type: string;
}>

export interface LobeAgentSession extends BaseDataModel {
  config: LobeAgentConfig;
  group?: SessionGroupId;
  model: string;
  pinned?: boolean;
  type: LobeSessionType.Agent;
}

export interface LobeAgentSettings {
  /**
   * 语言模型角色设定
   */
  config: LobeAgentConfig;
  meta: MetaData;
}

export type LobeSessions = LobeAgentSession[];

export interface CustomSessionGroup extends SessionGroupItem {
  children: LobeSessions;
}

export type LobeSessionGroups = SessionGroupItem[];

export interface ChatSessionList {
  sessionGroups: LobeSessionGroups;
  sessions: LobeSessions;
}
