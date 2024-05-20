import { Icon } from '@lobehub/ui';
import {Button, Space, Upload} from 'antd';
import { createStyles } from 'antd-style';
import { ChevronUp, CornerDownLeft, LucideCommand } from 'lucide-react';
import { rgba } from 'polished';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import SaveTopic from '@/features/ChatInput/Topic';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/slices/chat';
import { useChatStore } from '@/store/chat';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors, preferenceSelectors } from '@/store/user/selectors';
import { isMacOS } from '@/utils/platform';

import DragUpload from './DragUpload';
import { LocalFiles } from './LocalFiles';
import SendMore from './SendMore';
import {CloudUploadOutlined} from "@ant-design/icons";
import UploadButton from "@/app/chat/(desktop)/features/ChatInput/Footer/UploadButton";

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
      right: 24px;
      
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
  };
});

const isMac = isMacOS();

interface FooterProps {
  setExpand?: (expand: boolean) => void;
}

const Footer = memo<FooterProps>(({ setExpand }) => {
  const { t } = useTranslation('chat');

  const { theme, styles } = useStyles();

  const [loading, stopGenerateMessage] = useChatStore((s) => [
    !!s.chatLoadingId,
    s.stopGenerateMessage,
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
            >
              {t('input.stop')}
            </Button>
          ) : (
            <Space.Compact>
              <Button
                onClick={() => {
                  sendMessage();
                  setExpand?.(false);
                }}
                type={'primary'}
                style={{
                  width: 74,
                  height: 32,
                }}
              >
                {t('input.send')}
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
