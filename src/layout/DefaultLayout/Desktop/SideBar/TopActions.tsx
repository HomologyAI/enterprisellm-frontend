import {ActionIcon, FluentEmoji, } from '@lobehub/ui';
import Link from 'next/link';
import { memo } from 'react';

import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';
import {Flexbox} from "react-layout-kit";
import {useStyles} from "@/layout/DefaultLayout/Desktop/SideBar/styles";
import {useAppsStore} from "@/store/apps";
import {useRouter} from "next/navigation";

export interface TopActionProps {
  collapse: boolean;
}

const TopActions = memo<TopActionProps>(({ collapse }) => {
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);
  const { styles, cx } = useStyles();

  const [apps, activeId, updateActiveAppId] = useAppsStore(s =>
    [s.apps, s.activeId, s.updateActiveAppId]
  );

  const router = useRouter();

  return apps.map((item, index) => {
    const isActive = activeId === item.appId;

    return (
      <Link
        href={`/chat?app=${item.appId}`}
        onClick={(e) => {
          // updateActiveAppId(item.appId);
          // switchBackToChat(useSessionStore.getState().activeId);
        }}
        className={cx(styles.item, isActive && styles.activeItem )}
      >
        <Flexbox
          align={'center'}
          gap={0}
          horizontal
          justify={'flex-start'}
        >
          <FluentEmoji emoji={item.icon} size={24} type={'pure'} /> {
        }
          <Flexbox className={cx(styles.iconName, collapse && styles.collapseItem)}>
            <span className={styles.itemText}>{item.name}</span>
          </Flexbox>
        </Flexbox>
      </Link>
    )
  });
});

export default TopActions;
