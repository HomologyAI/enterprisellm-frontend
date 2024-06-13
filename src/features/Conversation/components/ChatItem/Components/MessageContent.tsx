import { useResponsive } from 'antd-style';
import { type ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from './type';
import {EditableMessage} from '@lobehub/ui';

import { useStyles } from './styles';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';
import { CustomTokenMap } from '@/const/theme';

export interface MessageContentProps {
  editing?: ChatItemProps['editing'];
  fontSize?: number;
  message?: ReactNode;
  messageExtra?: ChatItemProps['messageExtra'];
  onChange?: ChatItemProps['onChange'];
  onDoubleClick?: ChatItemProps['onDoubleClick'];
  onEditingChange?: ChatItemProps['onEditingChange'];
  placement?: ChatItemProps['placement'];
  primary?: ChatItemProps['primary'];
  renderMessage?: ChatItemProps['renderMessage'];
  text?: ChatItemProps['text'];
  type?: ChatItemProps['type'];
}

const MessageContent = memo<MessageContentProps>(
  ({
     editing,
     onChange,
     onEditingChange,
     text,
     message,
     placement,
     messageExtra,
     renderMessage,
     type,
     primary,
     onDoubleClick,
     fontSize,
   }) => {
    console.log(message,placement,type, primary)
    const { cx, styles } = useStyles({ editing, placement, primary, type });
    const { mobile } = useResponsive();

    const content = (
      <EditableMessage
        classNames={{ input: styles.editingInput }}
        editButtonSize={'small'}
        editing={editing}
        fontSize={fontSize}
        fullFeaturedCodeBlock
        onChange={onChange}
        onEditingChange={onEditingChange}
        openModal={mobile ? editing : undefined}
        text={text}
        value={message ? String(message).trim() : ''}
      />
    );
    const messageContent = renderMessage ? renderMessage(content) : content;

    const [primaryColor] = useUserStore((s) => [
      settingsSelectors.currentSettings(s).primaryColor
    ]);

    return (
      <Flexbox
        className={cx(styles.message, editing && styles.editingContainer)}
        onDoubleClick={onDoubleClick}
        style={
          placement === 'right' ?
            {
              backgroundColor: CustomTokenMap[primaryColor!].colorPrimary,
              color: primaryColor === 'common' ? 'black' : 'white'
            } :
            {
              backgroundColor: 'rgba(249, 249, 248, 1)', border: '1px solid rgba(240,240,243,1)',
            }
        }
      >
        {messageContent}
        {messageExtra && !editing ? (
          <div className={styles.messageExtra}>{messageExtra}</div>
        ) : null}
      </Flexbox>
    );
  },
);

export default MessageContent;
