import {memo, useCallback, useMemo} from 'react';
import { Flexbox } from 'react-layout-kit';
import {createStyles} from "antd-style";
import { Spin, Result, Image } from "antd";
import {Trash} from "lucide-react";
import {ActionIcon} from "@lobehub/ui";
import {LocalUploadFile} from "@/types/session";
import {useSessionStore} from "@/store/session";
import { LoadingOutlined } from '@ant-design/icons';

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

const getFileExtension = (filename: string) => {
  const regex = /(?:\.([^.]+))?$/;
  const match = filename.match(regex);
  return match && match[1] ? match[1] : '';
};

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
    return status === 'uploading' ? '上传中...' : status === 'error' ? '文件上传失败' : `${type?.replace('application/', '').toLocaleUpperCase()} ${(size! / 1204 / 1024).toFixed(2)}MB`;
  }, [status]);

  const deleteSessionFile = useSessionStore(s => s.deleteSessionFile);

  const handleRemoveFile = useCallback(() => {
    deleteSessionFile(localId);
  }, [localId]);

  return (
    <Flexbox align="center" className={styles.container} horizontal>
      { status === 'uploading' ?
        (<Spin indicator={<LoadingOutlined spin style={{ fontSize: 32 }} />} />) :
          status === 'error' ?
            <Result status="error"></Result> :
            <Image
              alt="/file-icon/pdf.png"
              height={45}
              key="localId"
              src={(() => {
                const fileExtension = getFileExtension(name);

                if (fileExtension.includes('pdf')) {
                  return '/file-icon/pdf.png';
                } else if (fileExtension.includes('ppt')) {
                  return '/file-icon/ppt.png';
                } else if (fileExtension.includes('doc')) {
                  return '/file-icon/word.png';
                } else if (
                  fileExtension.includes('md') ||
                  fileExtension.includes('markdown')
                ) {
                  return '/file-icon/markdown.png';
                } else {
                  return '/file-icon/other.png';
                }
              })()}
              style={{ marginRight: '5px' }}
              width={35}
            ></Image>
      }
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
