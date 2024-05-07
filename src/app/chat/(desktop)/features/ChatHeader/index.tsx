import { ChatHeader } from '@lobehub/ui';
import { memo } from 'react';

import HeaderAction from './HeaderAction';
import Main from './Main';
import {createStyles} from "antd-style";

const useStyles = createStyles(
  ({ css, token }) => css`
    height: 100px;
    padding: 40px 0;
  `,
);

const Header = memo(() => {
  const { styles } = useStyles();

  return (
    <ChatHeader
      left={<Main />}
      className={styles}
    />
  );
});

export default Header;
