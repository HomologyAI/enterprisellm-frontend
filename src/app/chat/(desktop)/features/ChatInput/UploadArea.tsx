import {memo, useMemo} from 'react';
import { Flexbox } from 'react-layout-kit';
import {createStyles} from "antd-style";
import UploadFileItem from "./UploadFileItem";
import {useSessionStore} from "@/store/session";
import {sessionDifySelectors} from "@/store/session/slices/session/selectors";
import isEqual from "fast-deep-equal";

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
  // const fileList = useFileStore((s) => s.fileList);
  const fileList = useSessionStore(sessionDifySelectors.currentSessionFiles, isEqual);

  const renderList = useMemo(() => {
    return fileList.map((file) => {
      return (
        <UploadFileItem
          key={file.localId}
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
      wrap="wrap"
    >
      {renderList}
    </Flexbox>
  ) || null;
});

export default UploadArea;
