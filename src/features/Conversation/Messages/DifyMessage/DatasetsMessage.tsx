/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import {
  DifyAlertMessage,
  DifyDatasetsMessage,
  DifyMessageType
} from '@/types/message';
import { Button, Checkbox } from "antd";
import { createStyles } from "antd-style";
import { DifyDataset } from "@/libs/difyClient";
import { useChatStore } from "@/store/chat";
import { useSessionStore } from "@/store/session";
import { sessionDifySelectors } from "@/store/session/slices/session/selectors";
import isEqual from "fast-deep-equal";
import { appsSelectors, useAppsStore } from "@/store/apps";
import { EditableMessage } from '@lobehub/ui';
import config from '@/config/config.json';

const useStyles = createStyles(
  ({ css, token }) => {
    return {
      container: css`
        max-width: 411px;
        padding: 4px 0;
      `,
      footer: css`
        margin-right: 6px;
      `,
      item: css`
        color: rgba(89, 89, 89, 1);
      `,
      main: css`
        padding: 8px 0;
      `,
    }
  }
);

export const DatasetsMessage = memo<
  DifyDatasetsMessage & {
    id: string;
  }
>((msg) => {
  const { id } = msg;
  const { styles, cx } = useStyles();
  const datasets = useSessionStore(sessionDifySelectors.currentDifyDatasets, isEqual) as DifyDataset[];
  const initDatasets = useAppsStore(appsSelectors.currentAppDatasets, isEqual) as DifyDataset[];
  const getApp = () => appsSelectors.currentApp(useAppsStore.getState());
  const app = getApp()

  const [checkedIds, setCheckedIds] = useState([]);

  const [
    addDifyMessage,
  ] = useChatStore(state => [
    state.addDifyMessage,
  ]);

  const [
    useFetchDatasets,
    updateSessionDatasets
  ] = useSessionStore(state => [
    state.useFetchDatasets,
    state.updateSessionDatasets,
  ]);

  // const { isLoading } = (useFetchDatasets as () => SWRResponse<DatasetsData[]>)();

  const displayDatasets = useMemo(() => {
    if (datasets?.length) return datasets;
    return initDatasets;
  }, [datasets, initDatasets]);

  useEffect(() => {
    if (displayDatasets.length) {
      const ids = displayDatasets.filter((item) => {
        return Boolean(item?.isChecked);
      }).map((item) => {
        return item.id;
      });

      setCheckedIds(ids as never[]);
    }
  }, [displayDatasets]);

  const datasetsIds = useMemo(() => displayDatasets.map((item) => item.id), [displayDatasets]);

  const handleConfirm = useCallback(async () => {
    const computedCheckedTitle = () => {
      const names = checkedIds.map((id) => {
        return `【${displayDatasets.find((item) => item.id === id)?.name}】`;
      });

      if (!checkedIds.length) {
        return '您已取消所有选择';
      }
      return `您已选中知识库${names}！下文回答数据都来自于知识库内。`;
    }

    const message: DifyAlertMessage = {
      data: {
        content: computedCheckedTitle(),
        ids: checkedIds,
        msgId: id,
        type: 'success',
      },
      msgType: DifyMessageType.Alert,
    } as DifyAlertMessage

    const newData = displayDatasets.map((item) => {
      return {
        ...item,
        isChecked: checkedIds.includes(item.id as never),
      }
    });

    await updateSessionDatasets(newData);
    addDifyMessage(message);
  }, [checkedIds, displayDatasets, id]);

  const checkAll = useCallback(() => {
    setCheckedIds(datasetsIds as any);
  }, [datasetsIds]);

  const unCheckAll = useCallback(() => {
    setCheckedIds([]);
  }, []);

  const RenderList = useMemo(() => {
    return displayDatasets?.map((item) => {
      const isChecked = checkedIds.find((id) => {
        return id === item.id;
      });

      return (
        <Checkbox
          checked={isChecked}
          className={styles.item}
          key={item.id}
          onChange={(e) => {
            setCheckedIds((prev: any) => {
              if (!prev.includes(item.id)) {
                return [...prev, item.id];
              }
              return prev.filter((id: any) => id !== item.id);
            });
          }}
        >
          {item.name}
        </Checkbox>
      )
    });
  }, [displayDatasets, checkedIds]);

  return !displayDatasets.length ? (<EditableMessage className={styles.container} value={app?.opening_statement || `欢迎使用${config.companyName}AI聊天助手`}></EditableMessage>) : (
    <Flexbox className={styles.container} >
      <p>欢迎使用{config.companyName}AI聊天助手</p>
      <br />
      <p>请选择以下知识库，回答都将来自于知识库内。</p>
      <Flexbox className={styles.main} gap={8}>
        {RenderList}
      </Flexbox>
      <Flexbox className={styles.footer} gap={12} horizontal justify="flex-end">
        <Button onClick={checkAll} style={{ padding: 0 }} type="link">全选</Button>
        <Button onClick={unCheckAll} style={{ padding: 0 }} type="link">取消选择</Button>
        <Button onClick={handleConfirm} type="primary">确定</Button>
      </Flexbox>
    </Flexbox>
  );
});
