import {ActionIcon, SearchBar} from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useSessionStore } from '@/store/session';
import {Flexbox} from "react-layout-kit";
import {Plus} from "lucide-react";
import {DESKTOP_HEADER_ICON_SIZE} from "@/const/layoutTokens";
import {createStyles} from "antd-style";

const useStyles = createStyles(
  ({ css }) => {
    return {
      search: css`
        width: 100%;
        flex-shrink: 1;
        margin-right: 8px;
      `,
      icon: css`
        
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
      />
      <ActionIcon
        className={styles.icon}
        icon={Plus}
        onClick={() => createSession()}
        size={40}
        style={{ flex: 'none' }}
        title={t('newAgent')}
      />
    </Flexbox>
  );
});

export default SessionSearchBar;
