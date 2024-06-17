'use client';

import { PropsWithChildren, memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import SafeSpacing from '@/components/SafeSpacing';
import ClientResponsiveLayout from '@/components/client/ClientResponsiveLayout';

import Header from './Header';

const Desktop = memo<PropsWithChildren>(({ children }) => (
  <Flexbox flex={1} height={'100%'} style={{ padding: '20px',position: 'relative' }}>
    <Flexbox flex={1} height={'100%'} style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', padding: '20px',position: 'relative' }}>
      <Header />
      <Flexbox align={'center'} flex={1} padding={24} style={{ overflowY: 'scroll' }}>
        <SafeSpacing />
        <Center gap={16} style={{alignItems: 'flex-start', }} width={'100%'}>
          {children}
        </Center>
      </Flexbox>
    </Flexbox>
  </Flexbox>
));

export default ClientResponsiveLayout({ Desktop, Mobile: () => import('../Mobile') });
