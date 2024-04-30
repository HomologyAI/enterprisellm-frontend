import { memo } from 'react';

import AvatarWithUpload from '@/features/AvatarWithUpload';
import {Flexbox} from "react-layout-kit";
import {useStyles} from "@/layout/DefaultLayout/Desktop/SideBar/styles";
import BotAvatar from "@/features/Avatar/BotAvatar";
import UserAvatar from "@/features/Avatar/UserAvatar";


const Avatar = memo(() => {
  const { styles, cx } = useStyles();

  return (
    <Flexbox
      className={styles.header}
    >
      <UserAvatar shape="square" size={40}/>
    </Flexbox>
  )
});

Avatar.displayName = 'Avatar';

export default Avatar;
