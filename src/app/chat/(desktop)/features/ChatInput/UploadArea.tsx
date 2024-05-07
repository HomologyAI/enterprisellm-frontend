import {memo, useMemo, useState} from 'react';
import { Flexbox } from 'react-layout-kit';
import {createStyles} from "antd-style";
import UploadFileItem from "./UploadFileItem";
import {LocalFiles} from "@/app/chat/(desktop)/features/ChatInput/Footer/LocalFiles";
import {useFileStore} from "@/store/file";

const useStyles = createStyles(({ css }) => {
  return {
    container: css`
      padding: 15px;
      border-top: #EBEBEB 1px solid;
      background-color: #FFFFFF;
    `,
    textareaContainer: css`
      position: relative;
      flex: 1;
    `,
  };
});


const UploadArea = memo(() => {
  const { styles } = useStyles();
  const fileList = useFileStore((s) => s.fileList);

  const renderList = useMemo(() => {
    return fileList.map((file) => {
      return (
        <UploadFileItem
          {...file}
        />
      )
    })
  }, [fileList]);

  return fileList.length && (
    <Flexbox
      className={styles.container}
      gap={12}
      horizontal
    >
      {renderList}
    </Flexbox>
  ) || null;
});

export default UploadArea;
