import { ActionIcon, Icon } from '@lobehub/ui';
import { App, Dropdown, type MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import {
  Check,
  HardDriveDownload,
  ListTree,
  LucideCopy,
  LucidePlus,
  MoreVertical,
  Pin,
  PinOff,
  Trash,
  Edit,
} from 'lucide-react';
import {memo, useMemo, useRef} from 'react';
import { useTranslation } from 'react-i18next';

import { configService } from '@/services/config';
import { useSessionStore } from '@/store/session';
import { sessionHelpers } from '@/store/session/helpers';
import {sessionGroupSelectors, sessionMetaSelectors, sessionSelectors} from '@/store/session/selectors';
import { SessionDefaultGroup } from '@/types/session';
import EditNameModalContent from "@/app/chat/features/SessionListContent/List/Item/EditNameModalContent";
import {API_ENDPOINTS} from "@/services/_url";

const useStyles = createStyles(({ css }) => ({
  modalRoot: css`
    z-index: 2000;
  `,
}));

interface ActionProps {
  group: string | undefined;
  id: string;
  openCreateGroupModal: () => void;
  setOpen: (open: boolean) => void;
}

const Actions = memo<ActionProps>(({ group, id, openCreateGroupModal, setOpen }) => {
  const { styles } = useStyles();
  const { t } = useTranslation('chat');

  const [pin, removeSession, renameConversation, title, conversationId] = useSessionStore(
    (s) => {
      const session = sessionSelectors.getSessionById(id)(s);

      const meta = session.meta;
      const title = sessionMetaSelectors.getTitle(meta);
      const conversationId = session.conversation_id;

      return [
        sessionHelpers.getSessionPinned(session),
        s.removeSession,
        s.renameConversation,
        title,
        conversationId,
      ];
    },
  );

  const { modal, message } = App.useApp();

  const isDefault = group === SessionDefaultGroup.Default;
  // const hasDivider = !isDefault || Object.keys(sessionByGroup).length > 0;
  const titleRef = useRef(title);

  const items: MenuProps['items'] = useMemo(
    () => {
      const res = [
        {
          danger: true,
          icon: <Icon icon={Trash} />,
          key: 'delete',
          label: '删除对话',
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            modal.confirm({
              centered: true,
              okButtonProps: { danger: true },
              onOk: async () => {
                await removeSession(id);
                message.success(t('confirmRemoveSessionSuccess'));
              },
              rootClassName: styles.modalRoot,
              title: t('confirmRemoveSessionItemAlert'),
            });
          },
        },
      ];
      if (conversationId) {
        res.push(
          {
            danger: false,
            icon: <Icon icon={Edit} />,
            key: 'edit',
            label: '编辑对话标题',
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();

              modal.confirm({
                centered: true,
                okButtonProps: { danger: false },
                content: (
                  <EditNameModalContent
                    title={title}
                    onChanged={(e) => {
                      titleRef.current = e.target.value;
                    }}
                  />
                ),
                title: '编辑对话标题',
                onOk: async () => {
                  const res = await renameConversation(titleRef.current);

                  if (res) {
                    message.success(t('编辑对话标题成功'));
                  } else {
                    message.error(t('编辑对话标题失败'));
                  }
                },
                // rootClassName: styles.modalRoot,
              });
            },
          },
        )
      }

      return res;
    },
    [id, pin, title, conversationId],
  );

  return (
    <Dropdown
      arrow={false}
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      onOpenChange={setOpen}
      trigger={['click']}
    >
      <ActionIcon
        icon={MoreVertical}
        size={{
          blockSize: 28,
          fontSize: 16,
        }}
      />
    </Dropdown>
  );
});

export default Actions;
