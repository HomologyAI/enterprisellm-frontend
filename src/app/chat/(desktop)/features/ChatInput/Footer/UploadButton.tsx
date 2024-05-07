import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { memo, useEffect, useRef, useState } from 'react';
import { useFileStore } from '@/store/file';
import {CloudUploadOutlined} from "@ant-design/icons";
import {Button, Upload, UploadProps} from "antd";
import {useSessionStore} from "@/store/session";
import {sessionDifySelectors} from "@/store/session/slices/session/selectors";
import isEqual from "fast-deep-equal";
import {useServerConfigStore} from "@/store/serverConfig";
import {API_ENDPOINTS} from "@/services/_url";

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

  const fileList = useSessionStore(sessionDifySelectors.currentSessionFiles, isEqual);
  const updateSessionFiles = useSessionStore(s => s.updateSessionFiles);
  // const [fileList, setFileList] = useState([]);

  const handleUploadStatusChanged: UploadProps['onChange'] = (info) => {
    console.log('handleUploadStatusChanged', info);
    let newFileList = [...info.fileList];
    // 需要将本地数据和新上传的数据做一个merge

    updateSessionFiles(newFileList);
  };

  return (
    <Upload
      action={API_ENDPOINTS.upload}
      showUploadList={false}
      onChange={handleUploadStatusChanged}
      // fileList={fileList}
      multiple
      method="POST"
      accept=".doc,.docx,.pdf"
    >
      <Button type="text">
        <CloudUploadOutlined />
      </Button>
    </Upload>
  );
});

export default UploadButton;
