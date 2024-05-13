'use client';

import {ReactNode, memo, useState, useMemo} from 'react';
import { Flexbox } from 'react-layout-kit';

import {DivProps, FluentEmoji} from '@lobehub/ui';

import { useStyles } from './styles';
import {Button, ConfigProvider, Menu} from "antd";
import {Layout} from 'antd';
import {DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined} from "@ant-design/icons";
import {useAppsStore} from "@/store/apps";

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

  const [collapse, setCollapse] = useState(false);

  const [apps, activeId, updateActiveAppId] = useAppsStore(s =>
    [s.apps, s.activeId, s.updateActiveAppId]
  );

  console.log('activeIdactiveId', activeId);

  const items = apps.map((item) => {
    // const isActive = activeId === item.appId;

    return {
      key: item.appId,
      icon: <FluentEmoji emoji={item.icon} size={24} type={'pure'} />,
      label: item.name,
    }
  });

  const defaultSelectedKeys = useMemo(() => {
    if (activeId) {
      return [activeId];
    }
    return [];
  }, [activeId]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemMarginBlock: 8,
            itemMarginInline: 8,
          }
        }
      }}
    >
      {
        !!apps.length && activeId &&
        <Sider
          collapsible
          collapsed={collapse}
          onCollapse={(value) => setCollapse(value)}
          style={{ background: '#FFFFFF' }}
          trigger={null}
          className={styles.sider}
          width={200}
          collapsedWidth={77}
        >
          <Flexbox
            direction="vertical"
            justify={'space-between'}
            className={styles.container}
          >
            {avatar}
            <Menu
              className={cx(styles.menu)}
              defaultSelectedKeys={[activeId]}
              mode="inline"
              items={items}
              onSelect={(e) => {
                updateActiveAppId(e.key);
              }}
              inlineIndent={16}
            />
            <Button
              type="text"
              icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapse(!collapse)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                alignSelf: "center",
              }}
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