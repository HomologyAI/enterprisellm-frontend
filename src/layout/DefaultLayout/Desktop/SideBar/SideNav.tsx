'use client';

import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { DivProps } from '@lobehub/ui';

import { useStyles } from './styles';

export interface SideNavProps extends DivProps {
  /**
   * @description Avatar to be displayed at the top of the sidenav
   */
  avatar?: ReactNode;
  /**
   * @description Actions to be displayed at the bottom of the sidenav
   */
  bottomActions: ReactNode;
  /**
   * @description Actions to be displayed below the avatar
   */
  topActions?: ReactNode;
}

const SideNav = memo<SideNavProps>(({ className, avatar, topActions, bottomActions, ...rest }) => {
  const { styles, cx } = useStyles();
  return (
    <Flexbox
      align={'flex-start'}
      className={cx(styles.container, className)}
      flex={'none'}
      direction="vertical"
      {...rest}
    >
      {avatar}
      <Flexbox
        align="center" direction="vertical" gap={8}
        className={styles.items}
      >
        {topActions}
      </Flexbox>
    </Flexbox>
  );
});

export default SideNav;