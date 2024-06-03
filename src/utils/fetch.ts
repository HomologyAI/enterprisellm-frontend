import { t } from 'i18next';

import { LOBE_CHAT_OBSERVATION_ID, LOBE_CHAT_TRACE_ID } from '@/const/trace';
import { ErrorResponse, ErrorType } from '@/types/fetch';
import { ChatMessageError, RetrieverResources } from '@/types/message';

export const getMessageError = async (response: Response) => {
  let chatMessageError: ChatMessageError;

  // 尝试取一波业务错误语义
  try {
    const data = (await response.json()) as ErrorResponse;
    chatMessageError = {
      body: data.body,
      message: t(`response.${data.errorType}` as any, { ns: 'error' }),
      type: data.errorType,
    };
  } catch {
    // 如果无法正常返回，说明是常规报错
    chatMessageError = {
      message: t(`response.${response.status}` as any, { ns: 'error' }),
      type: response.status as ErrorType,
    };
  }

  return chatMessageError;
};

type SSEFinishType = 'done' | 'error' | 'abort';

export type OnFinishHandler = (
  text: string,
  context: {
    conversation_id?: string;
    message_id?: string;
    observationId?: string | null;
    retrieverResources?: RetrieverResources,
    traceId?: string | null;
    type?: SSEFinishType;
  },
) => Promise<void>;

export interface FetchSSEOptions {
  onAbort?: (text: string) => Promise<void>;
  onErrorHandle?: (error: ChatMessageError) => void;
  onFinish?: OnFinishHandler;
  onMessageHandle?: (text: string) => void;
}

/**
 * Fetch data using stream method
 */
export const fetchSSE = async (fetchFn: () => Promise<Response>, options: FetchSSEOptions = {}) => {
  const response = await fetchFn();

  // 如果不 ok 说明有请求错误
  if (!response.ok) {
    const chatMessageError = await getMessageError(response);

    options.onErrorHandle?.(chatMessageError);
    return;
  }

  const returnRes = response.clone();

  const data = response.body;

  if (!data) return;
  let output = '';
  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;
  let finishedType: SSEFinishType = 'done';

  while (!done) {
    try {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: true });

      output += chunkValue;
      options.onMessageHandle?.(chunkValue);
    } catch (error) {
      done = true;

      if ((error as TypeError).name === 'AbortError') {
        finishedType = 'abort';
        options?.onAbort?.(output);
      } else {
        finishedType = 'error';
        console.error(error);
      }
    }
  }

  const traceId = response.headers.get(LOBE_CHAT_TRACE_ID);
  const observationId = response.headers.get(LOBE_CHAT_OBSERVATION_ID);
  await options?.onFinish?.(output, { observationId, traceId, type: finishedType });

  return returnRes;
};

function unicodeToChar(text: string) {
  return text.replaceAll(/\\u[\da-f]{4}/g, (_match, p1) => {
    return String.fromCharCode(parseInt(p1, 16))
  })
}
export const fetchSSEDify = async (fetchFn: () => Promise<Response>, options: FetchSSEOptions = {}) => {
  const response = await fetchFn();

  // 如果不 ok 说明有请求错误
  if (!response.ok) {
    const chatMessageError = await getMessageError(response);

    options.onErrorHandle?.(chatMessageError);
    return;
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  let bufferObj: Record<string, any>
  let isFirstMessage = true
  let res = '';
  let finishedType: SSEFinishType = 'done';
  const traceId = response.headers.get(LOBE_CHAT_TRACE_ID);
  const observationId = response.headers.get(LOBE_CHAT_OBSERVATION_ID);
  let conversation_id = '';
  let message_id = '';
  let retrieverResources: undefined = undefined;

  function read() {
    let hasError = false
    reader?.read().then((result: any) => {
      if (result.done) {

        options?.onFinish?.(res, {
          conversation_id,
          message_id,
          observationId,
          retrieverResources,
          traceId,
          type: finishedType
        });
        return
      }
      buffer += decoder.decode(result.value, { stream: true })
      const lines = buffer.split('\n')
      try {
        lines.forEach((message) => {
          if (message.startsWith('data: ')) { // check if it starts with data:
            try {
              bufferObj = JSON.parse(message.slice(6)) as Record<string, any>// remove data: and parse as json
            }
            catch {
              // mute handle message cut off

              finishedType = 'abort';
              options?.onAbort?.(res);
              return
            }
            if (bufferObj.status === 400 || !bufferObj.event) {
              hasError = true
              finishedType = 'abort';
              options?.onAbort?.(res);
              return
            }
            switch (bufferObj.event) {
            case 'message':
            case 'agent_message': {
              // can not use format here. Because message is splited.
              const lineMsg = unicodeToChar(bufferObj.answer);
              options?.onMessageHandle?.(lineMsg);
              res += lineMsg;
              if (isFirstMessage) {
                conversation_id = bufferObj?.conversation_id;
                message_id = bufferObj?.message_id;
              }
              isFirstMessage = false;

            break;
            }
            case 'agent_thought': {
            //   onThought?.(bufferObj as ThoughtItem)

            break;
            }
            case 'message_file': {
            //   onFile?.(bufferObj as VisionFile)

            break;
            }
            case 'message_end': {
            //   onMessageEnd?.(bufferObj as MessageEnd)
            const _retrieverResources = bufferObj?.metadata?.retriever_resources
            console.log('_retrieverResources', _retrieverResources)
            if (_retrieverResources) {
              retrieverResources = _retrieverResources || undefined
            }
            break;
            }
            case 'message_replace': {
            //   onMessageReplace?.(bufferObj as MessageReplace)

            break;
            }
            case 'workflow_started': {
            //   onWorkflowStarted?.(bufferObj as WorkflowStartedResponse)

            break;
            }
            case 'workflow_finished': {
            //   onWorkflowFinished?.(bufferObj as WorkflowFinishedResponse)

            break;
            }
            case 'node_started': {
            //   onNodeStarted?.(bufferObj as NodeStartedResponse)

            break;
            }
            case 'node_finished': {
            //   onNodeFinished?.(bufferObj as NodeFinishedResponse)

            break;
            }
            // No default
            }
          }
        })
        buffer = lines.at(-1)
      }
      catch {
        hasError = true
        return
      }
      if (!hasError)
        read()
      else {
        options?.onFinish?.(res, {
          conversation_id,
          message_id,
          observationId,
          retrieverResources,
          traceId,
          type: finishedType
        });
      }
    })
  }
  read()
};
