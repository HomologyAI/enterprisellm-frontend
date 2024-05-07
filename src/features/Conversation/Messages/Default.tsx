import { ReactNode, memo } from 'react';

import { LOADING_FLAT } from '@/const/message';
import { ChatMessage } from '@/types/message';

import BubblesLoading from '../components/BubblesLoading';
import {DifyMessage} from "./DifyMessage";

export const DefaultMessage = memo<
  ChatMessage & {
    editableContent: ReactNode;
  }
>((msg) => {
  const { id, editableContent, content, difyMsg } = msg;
  if (content === LOADING_FLAT) return <BubblesLoading />;

  if (difyMsg) {
    return <DifyMessage {...msg} />
  }

  return <div id={id}>{editableContent}</div>;
});
