import { memo } from 'react';

import { useSessionStore } from '@/store/session';

import SessionList from './List';
import SkeletonList from './SkeletonList';
import {Empty} from "antd";

const SessionListContent = memo(() => {
  const [sessionSearchKeywords, useSearchSessions] = useSessionStore((s) => [
    s.sessionSearchKeywords,
    s.useSearchSessions,
  ]);

  const { data, isLoading } = useSearchSessions(sessionSearchKeywords);

  return isLoading ?
    <SkeletonList /> :
     data?.length ? <SessionList dataSource={data} showAddButton={false} /> : <Empty description={"未找到相关对话"} />
    ;
});

export default SessionListContent;
