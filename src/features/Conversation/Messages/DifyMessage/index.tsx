import {ReactNode, memo, useMemo} from 'react';
import { Flexbox } from 'react-layout-kit';
import {ChatMessage, DifyMessageType} from '@/types/message';
import {DatasetsMessage} from "./DatasetsMessage";
import {AlertMessage} from "./AlertMessage";

export const DifyMessage = memo<
  ChatMessage & {
  editableContent: ReactNode;
}
>((msg) => {
  const { id, difyMsg } = msg;
  const {
    msgType,
  } = difyMsg;

  const renderer = useMemo(() => {
    if (msgType === DifyMessageType.Datasets) {
      return <DatasetsMessage {...difyMsg} />;
    }
    if (msgType === DifyMessageType.Alert) {
      return <AlertMessage {...difyMsg} />;
    }
    return null;
  }, []);

  return renderer && (
    <Flexbox gap={8} id={id}>
      {renderer}
    </Flexbox>
  );
});
