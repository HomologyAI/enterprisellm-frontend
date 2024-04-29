import {ActionIcon, SearchBar} from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useSessionStore } from '@/store/session';
import {Flexbox} from "react-layout-kit";
import {MessageSquarePlus} from "lucide-react";
import {DESKTOP_HEADER_ICON_SIZE} from "@/const/layoutTokens";

const SessionSearchBar = memo<{ mobile?: boolean }>(({ mobile: controlledMobile }) => {
  const { t } = useTranslation('chat');

  const [keywords, useSearchSessions, updateSearchKeywords] = useSessionStore((s) => [
    s.sessionSearchKeywords,
    s.useSearchSessions,
    s.updateSearchKeywords,
  ]);

  const { isValidating } = useSearchSessions(keywords);

  const isMobile = useIsMobile();
  const mobile = controlledMobile ?? isMobile;

  return (
    <Flexbox horizontal align={'space-between'} >
      <SearchBar
        allowClear
        enableShortKey={!mobile}
        loading={isValidating}
        onChange={(e) => {
          updateSearchKeywords(e.target.value);
        }}
        placeholder={t('searchAgentPlaceholder')}
        shortKey={'k'}
        spotlight={!mobile}
        type={mobile ? 'block' : 'ghost'}
        value={keywords}
      />
      <ActionIcon
        icon={MessageSquarePlus}
        onClick={() => createSession()}
        size={DESKTOP_HEADER_ICON_SIZE}
        style={{ flex: 'none' }}
        title={t('newAgent')}
      />
    </Flexbox>
  );
});

export default SessionSearchBar;
