'use client';

import { useTheme } from 'antd-style';
import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ClientResponsiveLayout from '@/components/client/ClientResponsiveLayout';
import { useIsPWA } from '@/hooks/useIsPWA';

import SideBar from './SideBar';
import {useAppsStore} from "@/store/apps";
import FullscreenLoading from "@/components/FullscreenLoading";
import {Layout} from "antd";

const Desktop = memo<PropsWithChildren>(({ children }) => {
  const isPWA = useIsPWA();
  const theme = useTheme();

  const apps = useAppsStore(s => s.apps);
  console.log('Desktop apps', apps);

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
