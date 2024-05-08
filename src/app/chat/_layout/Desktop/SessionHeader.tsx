import { ActionIcon, Logo } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { MessageSquarePlus } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import SyncStatusTag from '@/features/SyncStatusInspector';
import { useActionSWR } from '@/libs/swr';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';

import SessionSearchBar from '../../features/SessionSearchBar';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
    padding: 24px 24px 0 24px;
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('chat');
  const [createSession] = useSessionStore((s) => [s.createSession]);
  const { enableWebrtc, showCreateSession } = useServerConfigStore(featureFlagsSelectors);

  const { mutate, isValidating } = useActionSWR('session.createSession', () => createSession());

  return (
    <Flexbox className={styles.top} gap={16} >
      <SessionSearchBar />
    </Flexbox>
  );
});

export default Header;
