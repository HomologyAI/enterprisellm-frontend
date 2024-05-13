'use client';

import { useRouter } from 'next/navigation';
import {memo, useEffect, useLayoutEffect} from 'react';

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

  useLayoutEffect(() => {
    // checkHasConversation().then((hasData) => {
    //   if (hasData) {
    //     router.replace('/chat');
    //   } else {
    //     router.replace('/welcome');
    //   }
    // });
    router.replace('/chat');
  }, []);

  return null;
});

export default Redirect;
