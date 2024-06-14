import { Icon } from '@lobehub/ui';
import {Button, Space, message } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronUp, CornerDownLeft, LucideCommand, Send } from 'lucide-react';
import { rgba } from 'polished';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/slices/chat';
import { useChatStore } from '@/store/chat';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors, preferenceSelectors } from '@/store/user/selectors';
import { isMacOS } from '@/utils/platform';

const useStyles = createStyles(({ css, prefixCls, token }) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px;
      }
    `,
    loadingButton: css`
      display: flex;
      align-items: center;
    `,
    overrideAntdIcon: css`
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);

      .${prefixCls}-btn.${prefixCls}-btn-icon-only {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${prefixCls}-btn.${prefixCls}-dropdown-trigger {
        &::before {
          background-color: ${rgba(token.colorBgLayout, 0.1)} !important;
        }
      }
    `,
    sendButton: css`
      width: 32px !important;
      height: 32px !important;
      min-width: 0 !important;
      padding: 0;
      display: flex;
      justify-content: center;
      align-item: center
    `
  };
});

const isMac = isMacOS();

interface FooterProps {
  setExpand?: (expand: boolean) => void;
}

const Footer = memo<FooterProps>(({ setExpand }) => {
  const { t } = useTranslation('chat');

  const { theme, styles } = useStyles();

  const [loading, stopGenerateMessage, inputValue] = useChatStore((s) => [
    !!s.chatLoadingId,
    s.stopGenerateMessage,
    s.inputMessage
  ]);

  const model = useAgentStore(agentSelectors.currentAgentModel);

  const [useCmdEnterToSend, canUpload] = useUserStore((s) => [
    preferenceSelectors.useCmdEnterToSend(s),
    modelProviderSelectors.isModelEnabledUpload(model)(s),
  ]);

  const sendMessage = useSendMessage();

  const cmdEnter = (
    <Flexbox gap={2} horizontal>
      <Icon icon={isMac ? LucideCommand : ChevronUp} />
      <Icon icon={CornerDownLeft} />
    </Flexbox>
  );

  const enter = (
    <Center>
      <Icon icon={CornerDownLeft} />
    </Center>
  );

  const sendShortcut = useCmdEnterToSend ? cmdEnter : enter;

  const wrapperShortcut = useCmdEnterToSend ? enter : cmdEnter;

  return (
    <Flexbox
      align={'end'}
      className={styles.overrideAntdIcon}
      distribution={'flex-end'}
      flex={'none'}
      gap={8}
      horizontal
      padding={'0 0px'}
    >
      <Flexbox align={'center'} gap={0} horizontal>

        {/*<UploadButton />*/}

        <Flexbox >
          {loading ? (
            <Button
              className={styles.loadingButton}
              icon={<StopLoadingIcon />}
              onClick={stopGenerateMessage}
              shape="circle"
            >
            </Button>
          ) : (
            <Space.Compact>
              <Button
                className={styles.sendButton}
                icon={<Icon color='white' icon={Send}></Icon>}
                onClick={() => {
                  if (inputValue.length >= 15_000) {
                    message.warning('提问内容超过最大长度限制，请修改提问内容。')
                    return
                  }
                  sendMessage();
                  setExpand?.(false);
                }}
                shape="circle"
                type={'primary'}
              >
              </Button>
            </Space.Compact>
          )}
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

Footer.displayName = 'Footer';

export default Footer;
