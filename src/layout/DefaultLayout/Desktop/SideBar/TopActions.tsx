import {ActionIcon, Icon} from '@lobehub/ui';
import { Compass, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { useSessionStore } from '@/store/session';
import {Flexbox} from "react-layout-kit";
import {useStyles} from "@/layout/DefaultLayout/Desktop/SideBar/styles";

export interface TopActionProps {
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab }) => {
  const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);
  const { styles, cx } = useStyles();

  return (
    <>
      <Link
        aria-label={t('tab.chat')}
        href={'/chat'}
        onClick={(e) => {
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
        className={styles.item}
      >
        <Flexbox
          horizontal
          align={"space-between"}
        >
          <Icon icon={MessageSquare} size="40" ></Icon>
          <span className={styles.itemText}>AI聊天助手</span>
        </Flexbox>
      </Link>
      {/*<Link aria-label={t('tab.market')} href={'/market'}>*/}
      {/*  <ActionIcon*/}
      {/*    active={tab === SidebarTabKey.Market}*/}
      {/*    icon={Compass}*/}
      {/*    placement={'right'}*/}
      {/*    size="large"*/}
      {/*    title={t('tab.market')}*/}
      {/*  />*/}
      {/*</Link>*/}
    </>
  );
});

export default TopActions;
