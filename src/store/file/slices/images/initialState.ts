import { FilePreview } from '@/types/files';
import {UploadFile} from "antd/es/upload/interface";

export interface ImageFileState {
  imagesMap: Record<string, FilePreview>;
  inputFilesList: string[];
  fileList: UploadFile[];
}

export const initialImageFileState: ImageFileState = {
  imagesMap: {},
  inputFilesList: [],
  fileList: [],
};
