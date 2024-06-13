import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';



import { createStyles } from 'antd-style';

import Footer from './Footer';
import TextArea from './TextArea';
import UploadArea from "./UploadArea";

const useStyles = createStyles(({token, css}) => {
  return {
    container: css`
      padding: 20px 20px;
    `,
    inputAreaContainer: css`
      border: 1px solid #366EFF;
      border-radius: 32px;
      width: 100%;
      min-height: 64px;
      position: relative;
      padding-right: 60px;
      padding-left: 16px;
      padding-top: 12px;
      padding-bottom: 12px;
    `
  }
})

const ChatInput = memo(() => {
  const { styles, cx } = useStyles()
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <UploadArea />
      <Flexbox
        align='center'
        className={styles.inputAreaContainer}
        direction='horizontal'
      >
        {/*<Header expand={expand} setExpand={setExpand} />*/}
        <TextArea setExpand={setExpand} />
        <Footer setExpand={setExpand} />
      </Flexbox>
    </div>
  );
});

export default ChatInput;
