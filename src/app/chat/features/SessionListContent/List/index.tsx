import { Empty } from 'antd';
import { createStyles, useResponsive } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center } from 'react-layout-kit';
import LazyLoad from 'react-lazy-load';

import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { LobeAgentSession } from '@/types/session';

import SkeletonList from '../SkeletonList';
import AddButton from './AddButton';
import SessionItem from './Item';
import {useAppsStore} from "@/store/apps";

const useStyles = createStyles(
  ({ css, token }) => {
    return {
      lazyLoad: css`
        min-height: 70px;
        margin-bottom: 10px;
      `,
      sessionList: css`
        padding: 0 20px;
      `
    }
  }
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
  const { styles, cx } = useStyles();

  const { mobile } = useResponsive();
  const appId = useAppsStore(s => s.activeId);

  const isEmpty = !dataSource || dataSource.length === 0;
  return !isInit ? (
    <SkeletonList />
  ) : !isEmpty ? (
    <div className={cx(styles.sessionList)}>
    {
      dataSource.map(({ id }) => (
        <LazyLoad className={styles.lazyLoad} key={id}>
          <SessionItem id={id} />
        </LazyLoad>
      ))
    }
    </div>
  ) : showCreateSession ? (
    showAddButton && <AddButton groupId={groupId} />
  ) : (
    <Center>
      <Empty description={t('emptyAgent')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Center>
  );
});

export default SessionList;
