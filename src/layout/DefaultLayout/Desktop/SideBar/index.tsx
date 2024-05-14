import { memo } from 'react';

import { SidebarTabKey } from '@/store/global/initialState';

import Avatar from './Avatar';

import SideNav from "./SideNav";

interface Props {
  sidebarKey?: SidebarTabKey;
}

export default memo<Props>(({ sidebarKey }) => {

  return (
    <SideNav
      avatar={<Avatar />}
    />
  );
});
