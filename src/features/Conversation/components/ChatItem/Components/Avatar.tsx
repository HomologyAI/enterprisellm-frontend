import { Avatar } from "antd";
import React from "react";

const UserAvatar = React.memo(() => {
  return (
    <Avatar style={{ backgroundColor: 'rgba(202, 150, 92, 1)', color: 'rgba(255, 255, 255, 1)' }} size={60}>
      尚
    </Avatar>
  )
});

export default UserAvatar;