import {memo, useCallback, useMemo} from 'react';
import {
  DifyAlertMessage, DifyMessageType,
} from '@/types/message';
import {Alert, Button} from "antd";
import {createStyles} from "antd-style";
import {useChatStore} from "@/store/chat";
import {useSessionStore} from "@/store/session";
import {sessionDifySelectors} from "@/store/session/slices/session/selectors";
import isEqual from "fast-deep-equal";
import {DifyDataset} from "@/libs/difyClient";

const useStyles = createStyles(
  ({ css, token }) => {
    return {
      container: css`
        min-width: 60%;
        margin: 6px 0;
        align-self: center;
        height: 34px;
      `,
    }
  }
);

export const AlertMessage = memo<
  DifyAlertMessage
>((msg) => {
  const { data } = msg;
  const { styles } = useStyles();
  const datasets = useSessionStore(sessionDifySelectors.currentDifyDatasets, isEqual) as DifyDataset[];

  const [
    addDifyMessage
  ] = useChatStore(state => [
    state.addDifyMessage,
  ])

  const [
    updateSessionDatasets
  ] = useSessionStore(state => [
    state.updateSessionDatasets,
  ]);

  const handleCancel = useCallback(() => {
    const checkedIds = data?.ids || [];

    const computedCheckedTitle = () => {
      const names = checkedIds.map((id) => {
        return `【${datasets.find((item) => item.id === id)?.name}】`;
      });

      return `您已取消选择知识库${names}`;
    }

    const message: DifyAlertMessage = {
      msgType: DifyMessageType.Alert,
      data: {
        type: 'info',
        content: computedCheckedTitle(),
        msgId: data.msgId,
      },
    } as DifyAlertMessage

    const newData = datasets.map((item) => {
      return {
        ...item,
        isChecked: checkedIds.includes(item.id) ? false : item.isChecked,
      }
    });

    addDifyMessage(message);
    updateSessionDatasets(newData);
  }, [datasets, data]);

  const renderCancelAction = useMemo(() => {
    if (data.type !== 'success') {
      return null;
    }

    return (
      <Button type="text" size="small" ghost onClick={() => {
        handleCancel();
      }} type="link">
        取消选择
      </Button>
    );
  }, [data?.type, handleCancel]);

  return (
    <Alert
      className={styles.container}
      showIcon
      message={data.content}
      type={data.type}
      action={renderCancelAction}
    />
  );
});
