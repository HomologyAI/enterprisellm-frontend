'use client';

import { DraggablePanelBody } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import FolderPanel from '@/features/FolderPanel';

import SessionListContent from '../../features/SessionListContent';
import Header from './SessionHeader';

const useStyles = createStyles(({ stylish, css, cx }) => {
  return {
    draggablePanelBody: cx(
        stylish.noScrollbar,
        css`
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 33px 0px 0;
        `,
      ),
  }
});

const Sessions = memo(() => {
  const { styles, cx } = useStyles();

  return (
    <FolderPanel>
      <Header />
      <DraggablePanelBody className={styles.draggablePanelBody}>
        <SessionListContent />
      </DraggablePanelBody>
    </FolderPanel>
  );
});

Sessions.displayName = 'SessionsList';

export default Sessions;
