import { memo } from 'react';

import { SidebarTabKey } from '@/store/global/initialState';

import Avatar from './Avatar';

import SideNav from "./SideNav";
import BottomActions from './BottomActions';

interface Props {
  sidebarKey?: SidebarTabKey;
}

export default memo<Props>(({ sidebarKey }) => {

  return (
    <SideNav
      avatar={<Avatar />}
      bottomActions={<BottomActions tab={sidebarKey} />}
    />
  );
});
