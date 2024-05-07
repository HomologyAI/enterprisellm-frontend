import {DifyDataset} from "@/libs/difyClient";

export enum DifyMessageType {
  Datasets ='Datasets', // 知识库
  Alert = 'Alert', // 通知，提示之类的组件
  Editor = 'Editor', // 文书助手
}

export interface DifyMessageBase<T> {
  msgType: DifyMessageType;
  data: T;
}

export interface DifyDatasetsMessageData {
  datasets: Partial<DifyDataset[]>;
}

export interface DifyDatasetsMessage extends DifyMessageBase<DifyDatasetsMessageData> {
  msgType: DifyMessageType.Datasets,
}


export interface DifyAlertMessageData {
  content: string;
  type: 'success' | 'error' | 'info';
  msgId: string;
  ids: string[];
}

export interface DifyAlertMessage extends DifyMessageBase<DifyAlertMessageData> {
  msgType: DifyMessageType.Alert;
  data: DifyAlertMessageData;
}

export type DifyMessage =
  DifyDatasetsMessage
  | DifyAlertMessage;

