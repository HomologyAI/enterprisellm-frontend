'use client';

import { App, Button, Card, Popover, Tag } from 'antd';
import { createStyles, useResponsive } from 'antd-style';
import Image from 'next/image';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { RetrieverResourceItem } from '@/types/message';

import Actions from './Actions';
import ErrorContent from './ErrorContent';
import MessageContent from './MessageContent';
import Title from './Title';
import { useStyles } from './styles';
import type { ChatItemProps } from './type';

interface RetrieverItem {
  document_id: string;
  document_name: string;
  resources: RetrieverResourceItem[];
}

type Retriever = RetrieverItem[];

const useFileItemStyles = createStyles(({ css }) => {
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

const ChatItem = memo<ChatItemProps>(
  ({
    avatarAddon,
    onAvatarClick,
    avatarProps,
    actions,
    className,
    primary,
    loading,
    message,
    retrieverResources,
    fileInfoList,
    placement = 'left',
    type = 'block',
    avatar,
    error,
    showTitle,
    time,
    editing,
    onChange,
    onEditingChange,
    messageExtra,
    renderMessage,
    text,
    errorMessage,
    onDoubleClick,
    fontSize,
    renderAvatar = null,
    ...rest
  }) => {
    const { mobile } = useResponsive();

    const { message: messageApi } = App.useApp();
    const { styles: fileItemstyles } = useFileItemStyles()

    const { cx, styles } = useStyles({
      editing,
      placement,
      primary,
      showTitle,
      time,
      title: '',
      type,
    });

    const [getFile] = useChatStore((s) => [s.getFile]);

    const getRetrieverResources = (): Retriever | undefined => {
      const temp: { [key: string]: RetrieverItem } = {};
      retrieverResources?.forEach((resource) => {
        if (temp[resource.document_id]) {
          temp[resource.document_id].resources.push(resource);
        } else {
          temp[resource.document_id] = {
            document_id: resource.document_id,
            document_name: resource.document_name,
            resources: [resource],
          };
        }
      });

      const result = Object.values(temp);
      return result.length > 0 ? result : undefined;
    };

    /**
     * 下载引用文件的回调函数
     */
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleDownLoadRetrieverResources = (retriever: RetrieverItem) => {
      const key = retriever.document_id + Math.random();
      messageApi.open({
        content: `文件下载中，请稍后...`,
        duration: 0,
        key,
        type: 'loading',
      });
      getFile(retriever.document_id).then(async (res) => {
        const contentDisposition = res.headers.get('Content-Disposition');
        const match = contentDisposition.match(
          /filename\*?=["']?(?:UTF-\d["']*)?([^\n\r"';]*)["']?;?/g,
        );
        // 文件名称
        const fileName = decodeURIComponent(match[1].replace(/^filename\*=UTF-8''/, ''));
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.setAttribute('style', 'display: none;');
        document.body.append(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        messageApi.open({
          content: `【${fileName}】下载完成！`,
          key,
          type: 'success',
        });
      }).catch((err) => {
        messageApi.open({
          content: `文件下载失败！请联系开发人员！`,
          key,
          type: 'error'
        })
        console.error(err)
      })
    };

    const getFileExtension = (filename: string) => {
      const regex = /(?:\.([^.]+))?$/;
      const match = filename.match(regex);
      return match && match[1] ? match[1] : '';
    };

    return (
      <Flexbox
        className={cx(styles.container, className)}
        direction={placement === 'left' ? 'horizontal' : 'horizontal-reverse'}
        gap={mobile ? 6 : 12}
        {...rest}
      >
        {renderAvatar}
        <Flexbox
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={styles.messageContainer}
        >
          <Title avatar={avatar} placement={placement} showTitle={showTitle} time={time} />
          <Flexbox
            align={placement === 'left' ? 'flex-start' : 'flex-end'}
            className={styles.messageContent}
            direction={
              type === 'block'
                ? placement === 'left'
                  ? 'horizontal'
                  : 'horizontal-reverse'
                : 'vertical'
            }
            gap={8}
          >
            {error ? (
              <ErrorContent error={error} message={errorMessage} placement={placement} />
            ) : (
              <MessageContent
                editing={editing}
                fontSize={fontSize}
                message={message}
                messageExtra={messageExtra}
                onChange={onChange}
                onDoubleClick={onDoubleClick}
                onEditingChange={onEditingChange}
                placement={placement}
                primary={primary}
                renderMessage={renderMessage}
                text={text}
                type={type}
              />
            )}
            <Actions actions={actions} editing={editing} placement={placement} type={type} />
          </Flexbox>
          {retrieverResources && (
            <Flexbox
              align="start"
              className={styles.messageRetrieverContainer}
              gap={8}
              horizontal
              justify="start"
              wrap="wrap"
            >
              {getRetrieverResources()?.map((resource, index) => (
                <Flexbox key={index}>
                  <Popover
                    arrow={false}
                    content={() => (
                      <Flexbox>
                        {resource.resources.map((item, index) => {
                          const { content, position } = item;

                          return (
                            // <Flexbox key={index}>{item.position + item.content}</Flexbox>
                            <Card
                              hoverable
                              key={index}
                              onClick={() => handleDownLoadRetrieverResources(resource)}
                              size="small"
                              style={{
                                marginTop: index > 0 ? 10 : 0,
                                maxWidth: 350,
                              }}
                            >
                              <Flexbox align="start" justify="start" wrap="wrap">
                                <Tag
                                  color="processing"
                                  style={{
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                    flex: 'none',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {'引用 ' + position}
                                </Tag>
                                <div
                                  style={{
                                    maxWidth: '350px',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                  }}
                                >
                                  {content}
                                </div>
                              </Flexbox>
                            </Card>
                          );
                        })}
                      </Flexbox>
                    )}
                    placement="topLeft"
                    trigger={'hover'}
                  >
                    <Button
                      className={styles.messageRetrieverButton}
                      onClick={() => handleDownLoadRetrieverResources(resource)}
                    >
                      <Image
                        alt="/file-icon/pdf.png"
                        height={16}
                        src={(() => {
                          const fileExtension = getFileExtension(resource.document_name);

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
                        width={13}
                      ></Image>
                      <div style={{ color: '#424B57' }}>{resource.document_name}</div>
                    </Button>
                  </Popover>
                </Flexbox>
              ))}
            </Flexbox>
          )}

          {fileInfoList && fileInfoList.length > 0 && (
            <Flexbox
              align="start"
              className={styles.messageRetrieverContainer}
              gap={8}
              horizontal
              justify="start"
              wrap="wrap"
            >
              {fileInfoList.map((file: any) => {
                const {
                  name,
                  percent,
                  status,
                  type,
                  size,
                } = file;
                const desc = status === 'uploading' ? '上传中...' : status === 'error' ? '文件上传失败' : `${(size! / 1204 / 1024).toFixed(2)}MB`;


                return (
                  <Flexbox align="center" className={fileItemstyles.container} horizontal key={file.id} style={{justifyContent: 'flex-end'}}>
                      <Image
                        alt="/file-icon/pdf.png"
                        height={45}
                        src={(() => {
                          const fileExtension = getFileExtension(file.name);

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
                    <Flexbox className={fileItemstyles.desc} gap={4}>
                      <p>{name}</p>
                      <span>{desc}</span>
                    </Flexbox>
                  </Flexbox>
                )
              })}
            </Flexbox>
          )}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ChatItem;

export type { ChatItemProps } from './type';
