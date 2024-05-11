'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { messageService } from '@/services/message';
import { sessionService } from '@/services/session';
import {useAppsStore} from "@/store/apps";

const checkHasConversation = async () => {
  const hasMessages = await messageService.hasMessages();
  const hasAgents = await sessionService.hasSessions();
  return hasMessages || hasAgents;
};

const Redirect = memo(() => {
  const router = useRouter();

  const apps = useAppsStore(s => s.apps);
  console.log('Redirect apps', apps);

  useEffect(() => {
    // checkHasConversation().then((hasData) => {
    //   if (hasData) {
    //     router.replace('/chat');
    //   } else {
    //     router.replace('/welcome');
    //   }
    // });
    if (apps?.length) {
      router.replace('/chat');
    }
  }, [apps]);

  return null;
});

export default Redirect;
