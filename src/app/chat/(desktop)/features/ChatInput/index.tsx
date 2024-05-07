import {DraggablePanel} from '@lobehub/ui';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import {
  CHAT_TEXTAREA_HEIGHT,
  CHAT_TEXTAREA_MAX_HEIGHT,
  HEADER_HEIGHT,
} from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';

import Footer from './Footer';
import TextArea from './TextArea';
import UploadArea from "./UploadArea";

const ChatInput = memo(() => {
  const [expand, setExpand] = useState<boolean>(false);

  const [inputHeight, setInputHeight] = useState(CHAT_TEXTAREA_HEIGHT);

  return (
    <>
      <UploadArea />
      <DraggablePanel
        fullscreen={expand}
        // headerHeight={HEADER_HEIGHT}
        maxHeight={CHAT_TEXTAREA_MAX_HEIGHT}
        minHeight={CHAT_TEXTAREA_HEIGHT}
        onSizeChange={(_, size) => {
          if (!size) return;

          // updatePreference({
          //   inputHeight: typeof size.height === 'string' ? Number.parseInt(size.height) : size.height,
          // });
          setInputHeight(typeof size.height === 'string' ? Number.parseInt(size.height) : size.height);
        }}
        placement="bottom"
        size={{ height: inputHeight, width: '100%' }}
        style={{ zIndex: 10 }}
        expandable={false}
      >
        <Flexbox
          gap={8}
          height={'100%'}
          padding={'12px 0 16px'}
          style={{
            minHeight: CHAT_TEXTAREA_HEIGHT,
            position: 'relative',
            background: '#FFF',
          }}
        >
          {/*<Header expand={expand} setExpand={setExpand} />*/}
          <TextArea setExpand={setExpand} />
          <Footer setExpand={setExpand} />
        </Flexbox>
      </DraggablePanel>
    </>
  );
});

export default ChatInput;
