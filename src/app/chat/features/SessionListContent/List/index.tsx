import { Empty } from 'antd';
import { createStyles, useResponsive } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center } from 'react-layout-kit';
import LazyLoad from 'react-lazy-load';

import { SESSION_CHAT_URL } from '@/const/url';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { LobeAgentSession } from '@/types/session';

import SkeletonList from '../SkeletonList';
import AddButton from './AddButton';
import SessionItem from './Item';
import {useAppsStore} from "@/store/apps";

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  dataSource?: LobeAgentSession[];
  groupId?: string;
  showAddButton?: boolean;
}
const SessionList = memo<SessionListProps>(({ dataSource, groupId, showAddButton = true }) => {
  const { t } = useTranslation('chat');
  const isInit = useSessionStore((s) => sessionSelectors.isSessionListInit(s));
  const { showCreateSession } = useServerConfigStore(featureFlagsSelectors);
  const { styles } = useStyles();

  const { mobile } = useResponsive();
  const appId = useAppsStore(s => s.activeId);

  const isEmpty = !dataSource || dataSource.length === 0;
  return !isInit ? (
    <SkeletonList />
  ) : !isEmpty ? (
    dataSource.map(({ id }) => (
      <LazyLoad className={styles} key={id}>
        <SessionItem id={id} />
      </LazyLoad>
    ))
  ) : showCreateSession ? (
    showAddButton && <AddButton groupId={groupId} />
  ) : (
    <Center>
      <Empty description={t('emptyAgent')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Center>
  );
});

export default SessionList;
