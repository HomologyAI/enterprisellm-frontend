'use client';

import { useResponsive } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Actions from './Actions';
import ErrorContent from './ErrorContent';
import MessageContent from './MessageContent';
import Title from './Title';
import { useStyles } from './styles';
import type { ChatItemProps } from './type';
import { Button, Popover } from 'antd'
import { RetrieverResourceItem } from '@/types/message';
import { useChatStore } from '@/store/chat';

interface RetrieverItem {
  document_id: string,
  document_name: string,
  resources: RetrieverResourceItem[]
}

type Retriever = RetrieverItem[]

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

    const { cx, styles } = useStyles({
      editing,
      placement,
      primary,
      showTitle,
      time,
      title: '',
      type,
    });

    const [getFile] = useChatStore((s) => [s.getFile])

    const getRetrieverResources = (): Retriever | undefined => {
      const temp: { [key: string]: RetrieverItem } = {}
      retrieverResources?.forEach((resource) => {
        if (temp[resource.document_id]) {
          temp[resource.document_id].resources.push(resource)
        } else {
          temp[resource.document_id] = {
            document_id: resource.document_id,
            document_name: resource.document_name,
            resources: [resource]
          }
        }
      })

      const result = Object.values(temp)
      return result.length > 0 ? result : undefined
    }

    /**
     * 下载引用文件的回调函数
     */
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleDownLoadRetrieverResources = (retriever: RetrieverItem) => {
      console.log('Retriever', retriever)
      getFile(retriever.document_id).then(async (res) => {
        const contentDisposition = res.headers.get('Content-Disposition')
        const fileName = decodeURIComponent(contentDisposition.match(/filename\*?=["']?(?:UTF-\d["']*)?([^\n\r"';]*)["']?;?/g)[1].slice(17))
        const blob = await res.blob()
        console.log(blob, res)
        console.log(fileName, blob)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.setAttribute('style', 'display: none;')
        document.body.append(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      })
    }

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
          {retrieverResources &&
            <Flexbox
              align='start'
              className={styles.messageRetrieverContainer}
              gap={8}
              horizontal
              justify='start'
              wrap='wrap'
            >
              {getRetrieverResources()?.map((resource, index) => (
                <Flexbox key={index}>
                  <Popover
                    arrow={false}
                    content={() => (
                      <Flexbox>
                        {
                          resource.resources.map((item, index) => (
                            <Flexbox key={index}>
                              {item.position + item.content}
                            </Flexbox>
                          ))
                        }
                      </Flexbox>
                    )}
                    placement='topLeft'
                    trigger={'hover'}
                  >
                    <Button
                      onClick={() => handleDownLoadRetrieverResources(resource)}>
                        {resource.document_name}
                    </Button>
                  </Popover>
                </Flexbox>
              ))}
            </Flexbox>}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ChatItem;

export type { ChatItemProps } from './type';
