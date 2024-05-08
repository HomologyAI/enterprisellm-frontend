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
  ({ css, token }) => {
    return {
      container: css`
        margin-left: 20px;
      `,
      title: css`
        font-size: 24px;
      `,
    }
  }
);

const Main = memo(() => {

  const { styles } = useStyles();

  const [init, isInbox, title, description, avatar, backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    sessionSelectors.isInboxSession(s),
    sessionMetaSelectors.currentAgentTitle(s),
    sessionMetaSelectors.currentAgentDescription(s),
    sessionMetaSelectors.currentAgentAvatar(s),
    sessionMetaSelectors.currentAgentBackgroundColor(s),
  ]);

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
    <Flexbox align="center" horizontal gap={20} className={styles.container}>
      <BotAvatar size={60} />
      <p className={styles.title}>{title}</p>
    </Flexbox>
  );
});

export default Main;
