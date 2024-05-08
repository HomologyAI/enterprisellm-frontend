import { memo } from 'react';

import Main from './Main';
import {createStyles} from "antd-style";
import {Flexbox} from "react-layout-kit";

const useStyles = createStyles(
  ({ css, token }) => css`
    border-bottom: #EBEBEB 1px solid;
    margin: 0 20px;
    padding: 28px 0 12px 0;
    position: absolute;
    top: 0;
    background-color: #FFF;
    z-index: 999;
    right: 0;
    left: 0;
  `,
);

const Header = memo(() => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles}>
      <Main />
    </Flexbox>
  );
});

export default Header;
