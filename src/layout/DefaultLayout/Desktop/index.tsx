'use client';

import { PropsWithChildren, memo } from 'react';
import ClientResponsiveLayout from '@/components/client/ClientResponsiveLayout';

import SideBar from './SideBar';
import {useAppsStore} from "@/store/apps";
import FullscreenLoading from "@/components/FullscreenLoading";
import {Button, Layout, Result} from "antd";
import {Center, Flexbox} from "react-layout-kit";
import { CustomTokenType } from '@/const/theme';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      background-color: ${(token as CustomTokenType).colorAppBg};
      background-image: url('${(token as CustomTokenType).appBgImage}');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: auto;
    `
  };
});

const Desktop = memo<PropsWithChildren>(({ children }) => {
  const apps = useAppsStore(s => s.apps);
  const fetchingState = useAppsStore(s => s.fetchingState);
  const { styles } = useStyles()
  console.log('Desktop apps', apps);

  if (fetchingState === 'error') {
    return (
      <Flexbox height={'100%'} style={{ userSelect: 'none' }} width={'100%'}>
        <Center flex={1} gap={12} width={'100%'}>
          <Center gap={16} horizontal>
            <Result
              extra={
                (
                  <Button
                    onClick={() => {
                      location.reload();
                    }}
                    type="primary">重新加载</Button>
                )}
              status="500"
              subTitle="加载失败."
              title="500"
            />
          </Center>
        </Center>
      </Flexbox>
    )
  }

  return apps?.length ? (
    <Layout
      className={styles.container}
      style={{ height: '100%', width: '100%' }}
    >
      <SideBar />
      {children}
    </Layout>
  ) : <FullscreenLoading title="交投AI启动中，请稍等"/>;
});

export default ClientResponsiveLayout({ Desktop, Mobile: () => import('../Mobile') });
