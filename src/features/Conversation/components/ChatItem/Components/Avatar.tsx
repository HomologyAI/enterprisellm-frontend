import { Avatar } from "antd";
import React from "react";
import config from "@/config/config.json";

const UserAvatar = React.memo(() => {
  return (
    <Avatar style={{ backgroundColor: 'rgba(202, 150, 92, 1)', color: 'rgba(255, 255, 255, 1)' }} size={60}>
      {config.companyName || '同调'}
    </Avatar>
  )
});

export default UserAvatar;
