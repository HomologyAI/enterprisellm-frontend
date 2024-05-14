import { z } from 'zod';

export const LobeMetaDataSchema = z.object({
  /**
   * 角色头像
   */
  avatar: z.string().optional(),
  /**
   *  背景色
   */
  backgroundColor: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  /**
   * 名称
   */
  title: z.string().optional(),
});

export const DatasetsDataSchema = z.array(z.object({
  isChecked: z.boolean().optional(),
  id: z.string(),
  name: z.string(),
}));

/**
 * 这些字段是要存在db里的
 */
export const FilesDataSchema = z.array(z.object({
  size: z.number(),
  name: z.string(),
  status: z.string(),
  // 后端id，这个不一定会有，比如上传失败
  id: z.string().optional(),
  extension: z.string().optional(),
  type: z.string(),
  // 前端id
  localId: z.string(),
  percent: z.number().optional(),
}));


export type MetaData = z.infer<typeof LobeMetaDataSchema>;
export type DatasetsData = z.infer<typeof DatasetsDataSchema>;
export type FilesData = z.infer<typeof FilesDataSchema>;

export interface BaseDataModel {
  /**
   * @deprecated
   */
  createAt?: number;

  createdAt: number;

  id: string;
  meta: MetaData;

  /**
   * @deprecated
   */
  updateAt?: number;
  updatedAt: number;
  /**
   * 自定义 新增数据结构
   */
  datasets: DatasetsData;
  files: FilesData;
  conversation_id?: string;
  userId: string;
  appId: string;
}
