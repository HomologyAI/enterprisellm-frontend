'use client';

import { PropsWithChildren, memo } from 'react';
import ClientResponsiveLayout from '@/components/client/ClientResponsiveLayout';

import SideBar from './SideBar';
import {useAppsStore} from "@/store/apps";
import FullscreenLoading from "@/components/FullscreenLoading";
import {Button, Layout, Result} from "antd";
import {Center, Flexbox} from "react-layout-kit";

const Desktop = memo<PropsWithChildren>(({ children }) => {
  const apps = useAppsStore(s => s.apps);
  const fetchingState = useAppsStore(s => s.fetchingState);
  console.log('Desktop apps', apps);

  if (fetchingState === 'error') {
    return (
      <Flexbox height={'100%'} style={{ userSelect: 'none' }} width={'100%'}>
        <Center flex={1} gap={12} width={'100%'}>
          <Center gap={16} horizontal>
            <Result
              status="500"
              title="500"
              subTitle="加载失败."
              extra={
                (
                  <Button
                    onClick={() => {
                      location.reload();
                    }}
                    type="primary">重新加载</Button>
                )}
            />
          </Center>
        </Center>
      </Flexbox>
    )
  }

  return apps?.length ? (
    <Layout
      style={{ width: '100%', height: '100%' }}
    >
      <SideBar />
      {children}
    </Layout>
  ) : <FullscreenLoading title="尚书大模型启动中，请稍等"/>;
});

export default ClientResponsiveLayout({ Desktop, Mobile: () => import('../Mobile') });
