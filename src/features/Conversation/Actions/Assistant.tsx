import { ActionIconGroup } from '@lobehub/ui';
import { memo } from 'react';

import { useChatListActionsBar } from '../hooks/useChatListActionsBar';
import { RenderAction } from '../types';
import { ErrorActionsBar } from './Error';
import { useCustomActions } from './customAction';

export const AssistantActionsBar: RenderAction = memo(({ id, onActionClick, error }) => {
  const { like, unLike } = useChatListActionsBar();

  if (id === 'default') return;

  if (error) return <ErrorActionsBar onActionClick={onActionClick} />;

  return (
    <ActionIconGroup
      items={[like, unLike]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
