import { Avatar, List, ListItemProps } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { createStyles, useResponsive } from 'antd-style';
import { memo, useMemo, useRef } from 'react';
import BotAvatar from "@/features/Avatar/BotAvatar";

const { Item } = List;

const useStyles = createStyles(({ css, token, responsive }) => {
  return {
    container: css`
      position: relative;

      margin-block: 2px;
      padding-right: 24px;
      padding-left: 24px;
      background-color: #FAFAFA;

      border-radius: 0;
      ${responsive.mobile} {
        margin-block: 0;
        padding-left: 12px;
        border-radius: 0;
      }
    `,
    active: css`
      background-color: rgba(230, 244, 255, 1);
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
      () => (
        <BotAvatar />
      ),
      [isHovering, avatar, avatarBackground],
    );

    return (
      <Item
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
