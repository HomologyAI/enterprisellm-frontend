import { Avatar } from "antd";
import React from "react";
import {createStyles} from "antd-style";

interface Props {
  shape?: 'circle' | 'square';
  size?: number;
  style?: React.CSSProperties;
}

const useStyles = createStyles(
  ({ css, token }) => {
    return {
      avatar: css`
        background-color: ${token.colorPrimary};
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        font-weight: bold;
        border-radius: 16px !important;
      `,
    }
  }
);

const UserAvatar = React.memo((props: Props) => {
  const {
    size = 48,
    shape = 'circle',
    style,
  } = props;

  const {styles} = useStyles();

  return (
    <Avatar
      className={styles.avatar}
      shape={shape}
      size={size}
      style={style}
    >
      交
    </Avatar>
  )
});

export default UserAvatar;
