import { ListItemProps } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { FullToken, createStyles, useResponsive } from 'antd-style';
import { memo, useMemo, useRef } from 'react';
import {Flexbox} from "react-layout-kit";
import SessionListItem from "@/app/chat/features/SessionListContent/List/SessionListItem";
import { CustomTokenType } from '@/const/theme';

const useStyles = createStyles(({ css, token, responsive }) => {
  return {
    active: css`
      background: ${(token as FullToken & CustomTokenType).colorConversationItemActive};
    `,
    container: css`
      position: relative;
      margin-block: 0;
      padding-inline: 12px;
      height: 75px;
      border-radius: 12px;
      background: ${(token as FullToken & CustomTokenType).colorConversationItemCommon};

      &:hover, &:active {
        background: ${(token as FullToken & CustomTokenType).colorConversationItemHover};
      }

      // ${responsive.mobile} {
      //   margin-block: 0;
      //   padding-left: 12px;
      //   border-radius: 0;
      // }
    `
  };
});

const ListItem = memo<ListItemProps & { avatar: string; avatarBackground?: string }>(
  ({ avatar, avatarBackground, active, showAction, actions, ...props }) => {
    const ref = useRef(null);
    const isHovering = useHover(ref);
    const { mobile } = useResponsive();
    const { styles, cx } = useStyles({ active });

    const avatarRender = useMemo(
      () => (<Flexbox height={0}/>),
      [],
    );

    return (
      <SessionListItem
        actions={actions}
        active={mobile ? false : active}
        avatar={avatarRender}
        className={cx(styles.container, active && styles.active)}
        ref={ref}
        showAction={actions && (isHovering || showAction)}
        {...(props as any)}
      />
    );
  },
);

export default ListItem;
