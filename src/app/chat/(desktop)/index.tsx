'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import ClientResponsiveContent from '@/components/client/ClientResponsiveContent';
import Conversation from './features/Conversation';

const Desktop = memo(() => {
  return (
    <>
      {/*<ChatHeader />*/}
      <Flexbox flex={1} height={'calc(100% - 200px)'} horizontal style={{padding: '20px 20px 20px 10px'}}>
        <Conversation />
        {/*<SideBar />*/}
      </Flexbox>
    </>
  )
});

export default ClientResponsiveContent({ Desktop, Mobile: () => import('../(mobile)') });
