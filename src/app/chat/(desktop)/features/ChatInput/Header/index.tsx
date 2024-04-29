import {ActionIcon, Icon} from '@lobehub/ui';
import {ChevronUp, CornerDownLeft, LucideCommand, Maximize2, Minimize2} from 'lucide-react';
import { memo } from 'react';

import ActionBar from '@/features/ChatInput/ActionBar';
import {useTranslation} from "react-i18next";
import {useChatStore} from "@/store/chat";
import {useAgentStore} from "@/store/agent";
import {agentSelectors} from "@/store/agent/slices/chat";
import {useUserStore} from "@/store/user";
import {preferenceSelectors} from "@/store/user/slices/preference/selectors";
import {modelProviderSelectors} from "@/store/user/slices/settings/selectors";
import {useSendMessage} from "@/features/ChatInput/useSend";
import {Center, Flexbox} from "react-layout-kit";
import DragUpload from "@/app/chat/(desktop)/features/ChatInput/Footer/DragUpload";
import {LocalFiles} from "@/app/chat/(desktop)/features/ChatInput/Footer/LocalFiles";
import {Button, Space} from "antd";
import StopLoadingIcon from "@/components/StopLoading";
import SendMore from "@/app/chat/(desktop)/features/ChatInput/Footer/SendMore";

interface HeaderProps {
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const Header = memo<HeaderProps>(({ expand, setExpand }) => (
  <ActionBar
    rightAreaEndRender={
      <ActionIcon
        icon={expand ? Minimize2 : Maximize2}
        onClick={() => {
          setExpand(!expand);
        }}
      />
    }
  />
));

export default Header;
