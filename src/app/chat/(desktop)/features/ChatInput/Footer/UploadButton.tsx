import { Icon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { FileImage, FileText, FileUpIcon } from 'lucide-react';
import { rgba } from 'polished';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { useFileStore } from '@/store/file';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';
import {CloudUploadOutlined} from "@ant-design/icons";
import {Button, Upload, UploadProps} from "antd";
import {UploadChangeParam, UploadFile} from "antd/es/upload/interface";

const useStyles = createStyles(({ css, token, stylish }) => {
  return {
    container: css`
      width: 300px;
      height: 300px;
      padding: 16px;

      color: ${token.colorWhite};

      background: ${token.geekblue};
      border-radius: 16px;
      box-shadow:
        ${rgba(token.geekblue, 0.1)} 0 1px 1px 0 inset,
        ${rgba(token.geekblue, 0.1)} 0 50px 100px -20px,
        ${rgba(token.geekblue, 0.3)} 0 30px 60px -30px;
    `,
    content: css`
      width: 100%;
      height: 100%;
      padding: 16px;

      border: 2px dashed ${token.colorWhite};
      border-radius: 12px;
    `,
    desc: css`
      color: ${rgba(token.colorTextLightSolid, 0.6)};
    `,
    title: css`
      font-size: 24px;
      font-weight: bold;
    `,
    wrapper: css`
      position: fixed;
      z-index: 10000000;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      transition: all 0.3s ease-in-out;

      background: ${token.colorBgMask};
      ${stylish.blur};
    `,
  };
});

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const UploadButton = memo(() => {
  const { styles } = useStyles();

  const uploadFile = useFileStore((s) => s.uploadFile);
  const fileList = useFileStore((s) => s.fileList);
  const updateFileList = useFileStore((s) => s.updateFileList);

  const model = useAgentStore(agentSelectors.currentAgentModel);

  const enabledFiles = useUserStore(modelProviderSelectors.isModelEnabledFiles(model));

  const uploadImages = async (fileList: FileList | undefined) => {
    if (!fileList || fileList.length === 0) return;

    const pools = Array.from(fileList).map(async (file) => {
      // skip none-file items
      if (!file.type.startsWith('image') && !enabledFiles) return;
      await uploadFile(file);
    });

    await Promise.all(pools);
  };

  const handleUploadStatusChanged: UploadProps['onChange'] = (info) => {
    console.log('handleUploadStatusChanged', info);
    let newFileList = [...info.fileList];

    updateFileList(newFileList);
  };

  return (
    <Upload
      showUploadList={false}
      onChange={handleUploadStatusChanged}
      fileList={fileList}
      multiple
    >
      <Button type="text">
        <CloudUploadOutlined />
      </Button>
      {/*<input accept="" type="file" style="display: none;" />*/}
    </Upload>
  );
});

export default UploadButton;
