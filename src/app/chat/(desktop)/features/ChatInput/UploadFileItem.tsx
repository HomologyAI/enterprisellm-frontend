import {memo, useCallback, useMemo, useState} from 'react';
import { Flexbox } from 'react-layout-kit';
import {createStyles} from "antd-style";
import {UploadFile} from "antd/es/upload/interface";
import {Button, Progress} from "antd";
import {Trash} from "lucide-react";
import {ActionIcon} from "@lobehub/ui";
import {LocalUploadFile} from "@/types/session";
import {useSessionStore} from "@/store/session";

const useStyles = createStyles(({ css }) => {
  return {
    container: css`
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 14px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      height: 72px;
      border: 1px #EBEBEB solid;
      padding: 0 15px;
    `,
    desc: css`
      margin: 0 14px;
      
      p {
        font-size: 14px;
        font-weight: 600;
      }
      
      span {
        color: #BFBFBF;
        font-size: 12px;
        font-weight: 400;
      }
    `,
  };
});

const UploadFileItem = memo((props: LocalUploadFile) => {
  const { styles } = useStyles();
  const {
    name,
    percent,
    status,
    type,
    size,
    localId,
  } = props;

  const desc = useMemo(() => {
    return status === 'uploading' ? '上传中...' : status === 'error' ? '文件上传失败' : `${type} ${size}`;
  }, [status]);

  const deleteSessionFile = useSessionStore(s => s.deleteSessionFile);

  const handleRemoveFile = useCallback(() => {
    deleteSessionFile(localId);
  }, [localId]);

  return (
    <Flexbox horizontal className={styles.container} align="center">
      <Progress
        type="circle"
        trailColor="#e6f4ff"
        percent={percent}
        strokeWidth={20}
        size={27}
        showInfo={false}
      />
      <Flexbox className={styles.desc} gap={4}>
        <p>{name}</p>
        <span>{desc}</span>
      </Flexbox>
      <ActionIcon
        className={styles.deleteButton}
        glass
        icon={Trash}
        onClick={handleRemoveFile}
        size={'small'}
      />
    </Flexbox>
  );
});

export default UploadFileItem;
