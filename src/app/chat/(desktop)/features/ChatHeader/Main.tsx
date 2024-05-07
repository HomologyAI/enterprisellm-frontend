import { Avatar, ChatHeaderTitle } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useSessionStore } from '@/store/session';
import { sessionMetaSelectors, sessionSelectors } from '@/store/session/selectors';

import BotAvatar from "@/features/Avatar/BotAvatar";
import {createStyles} from "antd-style";

const useStyles = createStyles(
  ({ css, token }) => css`
    margin-left: 40px;
    //margin-top: 28px;
  `,
);

const Main = memo(() => {
  const { t } = useTranslation('chat');

  const router = useRouter();
  const { styles } = useStyles();

  const [init, isInbox, title, description, avatar, backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    sessionSelectors.isInboxSession(s),
    sessionMetaSelectors.currentAgentTitle(s),
    sessionMetaSelectors.currentAgentDescription(s),
    sessionMetaSelectors.currentAgentAvatar(s),
    sessionMetaSelectors.currentAgentBackgroundColor(s),
  ]);

  const displayTitle = isInbox ? t('inbox.title') : title;
  const displayDesc = isInbox ? t('inbox.desc') : description;

  return !init ? (
    <Flexbox horizontal>
      <Skeleton
        active
        avatar={{ shape: 'circle', size: 'default' }}
        paragraph={false}
        title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
      />
    </Flexbox>
  ) : (
    <Flexbox align="center" horizontal gap={20} className={styles}>
      <BotAvatar size={60} />
      <ChatHeaderTitle desc={displayDesc} title={displayTitle} />
    </Flexbox>
  );
});

export default Main;
