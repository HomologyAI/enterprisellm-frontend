import {ActionIcon} from '@lobehub/ui';
import {memo, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useSessionStore } from '@/store/session';
import {Flexbox} from "react-layout-kit";
import {Plus} from "lucide-react";
import {createStyles} from "antd-style";
import SearchBar from './SearchBar';
import {useAppsStore} from "@/store/apps";

const useStyles = createStyles(
  ({ css, prefixCls, }) => {
    return {
      search: css`
        width: 100%;
        flex-shrink: 1;
        margin-right: 16px;

        &.${prefixCls}-input {
          padding-inline: 16px;
        }
      `,
      icon: css`
        background-color: #F0F0F0;
      `,
    }
  }
);

const SessionSearchBar = memo<{ mobile?: boolean }>(({ mobile: controlledMobile }) => {
  const { t } = useTranslation('chat');

  const [keywords, useSearchSessions, updateSearchKeywords] = useSessionStore((s) => [
    s.sessionSearchKeywords,
    s.useSearchSessions,
    s.updateSearchKeywords,
  ]);

  const [createSession] = useSessionStore(s => [s.createSession]);

  const { isValidating } = useSearchSessions(keywords);

  const isMobile = useIsMobile();
  const mobile = controlledMobile ?? isMobile;
  const {styles} = useStyles();

  useEffect(() => {
   const removeSub = useAppsStore.subscribe((state) => state.activeId, (activeId) => {
     updateSearchKeywords('');
   });

   return () => {
     removeSub();
   };
  }, []);

  return (
    <Flexbox horizontal align={'space-between'} style={{width: '100%'}}>
      <SearchBar
        allowClear
        enableShortKey={!mobile}
        loading={isValidating}
        onChange={(e) => {
          updateSearchKeywords(e.target.value);
        }}
        placeholder={"搜索"}
        shortKey={'k'}
        spotlight={!mobile}
        type={mobile ? 'block' : 'ghost'}
        value={keywords}
        className={styles.search}
        enableShortKey={false}
      />
      <ActionIcon
        className={styles.icon}
        icon={Plus}
        onClick={() => createSession()}
        size={{
          blockSize: 40,
        }}
        style={{ flex: 'none' }}
        title={t('newAgent')}
      />
    </Flexbox>
  );
});

export default SessionSearchBar;
