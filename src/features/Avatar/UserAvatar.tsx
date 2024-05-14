import { Avatar } from "antd";
import React from "react";
import {createStyles} from "antd-style";

interface Props {
  size?: number;
  shape?: 'circle' | 'square';
  style?: React.CSSProperties;
}

const useStyles = createStyles(
  ({ css }) => {
    return {
      avatar: css`
        background-color: rgba(0, 102, 255, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        font-weight: bold;
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
      size={size}
      shape={shape}
      className={styles.avatar}
      style={style}
    >
      交
    </Avatar>
  )
});

export default UserAvatar;