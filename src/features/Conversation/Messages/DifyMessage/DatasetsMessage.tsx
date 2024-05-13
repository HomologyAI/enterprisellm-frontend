import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Flexbox} from 'react-layout-kit';
import {
  DifyAlertMessage,
  DifyAlertMessageData,
  DifyDatasetsMessage,
  DifyMessageBase,
  DifyMessageType
} from '@/types/message';
import {Button, Checkbox} from "antd";
import {createStyles} from "antd-style";
import {DifyDataset} from "@/libs/difyClient";
import {useChatStore} from "@/store/chat";
import {useSessionStore} from "@/store/session";
import {sessionDifySelectors, sessionSelectors} from "@/store/session/slices/session/selectors";
import isEqual from "fast-deep-equal";
import BubblesLoading from "@/features/Conversation/components/BubblesLoading";
import {appsSelectors, useAppsStore} from "@/store/apps";

const useStyles = createStyles(
  ({ css, token }) => {
    return {
      container: css`
        max-width: 411px;
        padding: 4px 0;
      `,
      main: css`
        padding: 8px 0;
      `,
      item: css`
        color: rgba(89, 89, 89, 1);
      `,
      footer: css`
        margin-right: 6px;
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
  const { styles } = useStyles();
  const datasets = useSessionStore(sessionDifySelectors.currentDifyDatasets, isEqual) as DifyDataset[];
  const initDatasets = useAppsStore(appsSelectors.currentAppDatasets, isEqual) as DifyDataset[];

  const [checkedIds, setCheckedIds] = useState([]);
  const datasetsIds = useMemo(() => datasets.map((item) => item.id), [datasets]);

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
    if (datasets.length) {
      const ids = datasets.filter((item) => {
        return Boolean(item?.isChecked);
      }).map((item) => {
        return item.id;
      });

      setCheckedIds(ids);
    }
  }, [datasets]);

  const handleConfirm = useCallback(async () => {
    const computedCheckedTitle = () => {
      const names = checkedIds.map((id) => {
        return `【${datasets.find((item) => item.id === id)?.name}】`;
      });

      if (!checkedIds.length) {
        return '您已取消所有选择';
      }
      return `您已选中知识库${names}！下文回答数据都来自于知识库内。`;
    }

    const message: DifyAlertMessage = {
      msgType: DifyMessageType.Alert,
      data: {
        type: 'success',
        content: computedCheckedTitle(),
        msgId: id,
        ids: checkedIds,
      },
    } as DifyAlertMessage

    const newData = datasets.map((item) => {
      return {
        ...item,
        isChecked: checkedIds.includes(item.id),
      }
    });

    await updateSessionDatasets(newData);
    addDifyMessage(message);
  }, [checkedIds, datasets, id]);

  const checkAll = useCallback(() => {
    setCheckedIds(datasetsIds);
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
          key={item.id}
          className={styles.item}
          checked={isChecked}
          onChange={(e) => {
            setCheckedIds((prev) => {
              if (!prev.includes(item.id)) {
                return [...prev, item.id];
              }
              return prev.filter((id) => id !== item.id);
            });
          }}
        >
          {item.name}
        </Checkbox>
      )
    });
  }, [displayDatasets, checkedIds]);

  return !displayDatasets.length ? <BubblesLoading /> : (
    <Flexbox className={styles.container} >
      <p>欢迎使用尚书AI大模型聊天助手</p>
      <br/>
      <p>请选择以下知识库，回答都将来自于知识库内。</p>
      <Flexbox className={styles.main} gap={8}>
        {RenderList}
      </Flexbox>
      <Flexbox className={styles.footer} gap={12} horizontal justify="flex-end">
        <Button onClick={checkAll} type="link" style={{padding: 0}}>全选</Button>
        <Button onClick={unCheckAll} type="link" style={{padding: 0}}>取消选择</Button>
        <Button onClick={handleConfirm} type="primary" >确定</Button>
      </Flexbox>
    </Flexbox>
  );
});
