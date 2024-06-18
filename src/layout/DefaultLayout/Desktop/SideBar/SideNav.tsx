'use client';

import {ReactNode, memo, useState} from 'react';
import { Flexbox } from 'react-layout-kit';

import {DivProps, FluentEmoji} from '@lobehub/ui';

import { useStyles } from './styles';
import {Button, ConfigProvider, Menu,Layout} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined} from "@ant-design/icons";
import {useAppsStore} from "@/store/apps";
import {useGlobalStore} from "@/store/global";
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

export interface SideNavProps extends DivProps {
  /**
   * @description Avatar to be displayed at the top of the sidenav
   */
  avatar?: ReactNode;
  /**
   * @description Actions to be displayed at the bottom of the sidenav
   */
  bottomActions: ReactNode;
  /**
   * @description Actions to be displayed below the avatar
   */
  topActions?: ReactNode;
}

const SideNav = memo<SideNavProps>(({ className, avatar, topActions, bottomActions, ...rest }) => {
  const { styles, cx } = useStyles();
  const router = useRouter()
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);

  const [collapse, setCollapse] = useState(false);

  const [apps, activeId, updateActiveAppId] = useAppsStore(s =>
    [s.apps, s.activeId, s.updateActiveAppId]
  );

  console.log('activeIdactiveId', activeId);

  const items = apps.map((item) => {
    // const isActive = activeId === item.appId;
    // eslint-disable-next-line no-misleading-character-class
    const isEmoji = /[|\uD83C-\uD83E][\uDC00-\uDFFF][|\u200D\uFE0F]|[|\uD83C-\uD83E][\uDC00-\uDFFF]|[\d#*|]\uFE0F\u20E3|[\d#|]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[9ae|]\u3030|ua9|uae|\u3030/gi.test(item.icon)

    return {
      icon: <FluentEmoji emoji={isEmoji ? item.icon : '📄'} size={24} type={'pure'} />,
      key: item.appId,
      label: item.name,
    }
  });

  const onClickSetting = () => {
    router.push('/settings/common')
  }

  return (
    <ConfigProvider>
      {
        !!apps.length &&
        <Sider
          collapsed={collapse}
          collapsedWidth={77}
          collapsible
          onCollapse={(value) => setCollapse(value)}
          style={{background: 'none'}}
          trigger={null}
          width={200}
        >
          <Flexbox
            className={styles.container}
            direction="vertical"
            justify={'space-between'}
            style={{background: 'none'}}
          >
            {avatar}
            <Menu
              className={cx(styles.menu)}
              defaultSelectedKeys={[activeId]}
              inlineIndent={16}
              items={activeId ? items : []}
              mode="inline"
              onSelect={(e) => {
                // updateActiveAppId(e.key);
                const nextAppId = e.key;
                switchBackToChat(nextAppId);
              }}
              style={{background: 'none'}}
            />
            <Button
                icon={<SettingOutlined />}
                onClick={() => onClickSetting()}
              style={{
                alignSelf: "center",
                fontSize: '16px',
                height: 64,
                width: 64,
              }}
              type="text"></Button>
            <Button
              icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapse(!collapse)}
              style={{
                alignSelf: "center",
                fontSize: '16px',
                height: 64,
                width: 64,
              }}
              type="text"
            />
          </Flexbox>
        </Sider>
      }
    </ConfigProvider>
  )

  // return (
  //   <Flexbox
  //     align={'flex-start'}
  //     className={cx(styles.container, !open && styles.container2)}
  //     flex={'none'}
  //     direction="vertical"
  //   >
  //     {avatar}
  //     <Flexbox
  //       align="center" direction="vertical" gap={8}
  //       className={styles.items}
  //     >
  //       <Button onClick={() => {
  //         setCollapse(false);
  //       }}>展开</Button>
  //       <Button onClick={() => {
  //         setCollapse(true);
  //       }}>收起</Button>
  //
  //       <TopActions collapse={collapse}/>
  //     </Flexbox>
  //   </Flexbox>
  // );
});

export default SideNav;
