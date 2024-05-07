'use client';

import { useResponsive } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

// import Actions from './components/Actions';
import Avatar from './Avatar';
import ErrorContent from './ErrorContent';
import MessageContent from './MessageContent';
import Title from './Title';
import { useStyles } from './styles';
import type { ChatItemProps } from './type';

const MOBILE_AVATAR_SIZE = 32;

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

    return (
      <Flexbox
        className={cx(styles.container, className)}
        direction={placement === 'left' ? 'horizontal' : 'horizontal-reverse'}
        gap={mobile ? 6 : 20}
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
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ChatItem;

export type { ChatItemProps } from './type';