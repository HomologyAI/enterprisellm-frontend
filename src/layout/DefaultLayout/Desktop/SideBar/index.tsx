import {DraggablePanel} from '@lobehub/ui';
import { memo } from 'react';

import { SidebarTabKey } from '@/store/global/initialState';

import Avatar from './Avatar';
import BottomActions from './BottomActions';
import TopActions from './TopActions';
import {CHAT_TEXTAREA_HEIGHT, CHAT_TEXTAREA_MAX_HEIGHT, HEADER_HEIGHT} from "@/const/layoutTokens";
import {Flexbox} from "react-layout-kit";
import SideNav from "./SideNav";

interface Props {
  sidebarKey?: SidebarTabKey;
}

export default memo<Props>(({ sidebarKey }) => {

  return (
    <SideNav
      avatar={<Avatar />}
      style={{ height: '100%' }}
      topActions={<TopActions tab={sidebarKey} />}
    />
  );


  return (
    <DraggablePanel
      maxWidth={162}
      minWidth={64}
      onSizeChange={(_, size) => {
        // if (!size) return;
        // updatePreference({
        //   inputHeight: typeof size.height === 'string' ? Number.parseInt(size.height) : size.height,
        // });
      }}
      placement="left"
      size={{ height: '100%' }}
      style={{ zIndex: 10, backgroundColor: '#000' }}
      expandable={false}
    >

      <Flexbox
        horizontal
        style={{ height: 72, padding: 10 }}
      >
        <Avatar />
      </Flexbox>

      <Flexbox>
        <TopActions tab={sidebarKey} />
      </Flexbox>
    </DraggablePanel>
  );
});
