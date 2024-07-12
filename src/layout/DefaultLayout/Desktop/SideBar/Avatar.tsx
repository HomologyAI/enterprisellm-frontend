import { memo } from 'react';

import AvatarWithUpload from '@/features/AvatarWithUpload';
import { Flexbox } from "react-layout-kit";
import { useStyles } from "@/layout/DefaultLayout/Desktop/SideBar/styles";
import BotAvatar from "@/features/Avatar/BotAvatar";
import UserAvatar from "@/features/Avatar/UserAvatar";
import config from '@/config/config.json';

const Avatar = memo(() => {
  const { styles, cx } = useStyles();

  return (
    <Flexbox
      className={styles.header}
    >
      <BotAvatar shape="square" size={40} />
      <span className={styles.headerName}>
        {config.companyName}AI助手
      </span>
    </Flexbox>
  )
});

Avatar.displayName = 'Avatar';

export default Avatar;
