import { memo } from 'react';
import { createStyles } from 'antd-style';

import RawConversation from '@/features/Conversation';

import TelemetryNotification from '../../features/TelemetryNotification';
import ChatInput from './ChatInput';
import HotKeys from './HotKeys';
import { Flexbox } from 'react-layout-kit';


const useStyles = createStyles(({token, css, isDarkMode}) => {
  return {
    conversation: css`
      width: 100%;
      background-color: ${isDarkMode ? '#1D1D1D' : 'rgba(255, 255, 255, 0.8)'};
      border-radius: 16px;
    `
  }
})

const Conversation = memo(() => {
  const {styles} = useStyles()
  return (
    <Flexbox className={styles.conversation}>
      <RawConversation chatInput={<ChatInput />} />
      <HotKeys />
      <TelemetryNotification />
    </Flexbox>
  );
});

export default Conversation;
