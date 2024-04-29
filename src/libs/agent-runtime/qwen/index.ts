import { ClientOptions } from 'openai';

import { LobeRuntimeAI } from '../BaseAI';
import { AgentRuntimeErrorType } from '../error';
import {
  ChatCompetitionOptions,
  ChatStreamDifyPayLoad, ChatStreamPayload,
  ModelProvider,
} from '../types';
import { AgentRuntimeError } from '../utils/createError';
import { handleOpenAIError } from '../utils/handleOpenAIError';
import {ChatClient, ChatMessageConfig} from 'dify-client'
import {OpenAIStream, StreamingTextResponse} from "ai";
import {debugStream} from "@/libs/agent-runtime/utils/debugStream";

const DEFAULT_BASE_URL = 'http://221.208.57.26:25001/v1';

export class QwenAI implements LobeRuntimeAI {
  private client: ChatClient;

  baseURL: string;

  constructor({ apiKey, baseURL }: ClientOptions) {
    if (!apiKey) throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidQwenAPIKey);
    baseURL = baseURL || DEFAULT_BASE_URL;
    this.client = new ChatClient(apiKey, baseURL);
    this.baseURL = baseURL;
  }

  async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions) {
    const { difyPayload } = payload;

    const {
      inputs = null,
      stream = true,
      conversation_id = '',
      user = null,
      query = '',
      files = null,
    } = difyPayload;

    try {
      const response = await this.client.createChatMessage({
        inputs,
        query,
        user,
        stream,
        conversation_id,
        files,
      });
      const [prod, debug] = response.tee();

      if (process.env.DEBUG_MOONSHOT_CHAT_COMPLETION === '1') {
        debugStream(debug.toReadableStream()).catch(console.error);
      }

      return new StreamingTextResponse(OpenAIStream(prod, options?.callback), {
        headers: options?.headers,
      });
    } catch (error) {
      let desensitizedEndpoint = this.baseURL;
      if ('status' in (error as any)) {
        switch ((error as Response).status) {
          case 401: {
            throw AgentRuntimeError.chat({
              endpoint: desensitizedEndpoint,
              error: error as any,
              errorType: AgentRuntimeErrorType.InvalidQwenAPIKey,
              provider: ModelProvider.Qwen,
            });
          }

          default: {
            break;
          }
        }
      }

      const { errorResult, RuntimeError } = handleOpenAIError(error);

      const errorType = RuntimeError || AgentRuntimeErrorType.MoonshotBizError;

      throw AgentRuntimeError.chat({
        endpoint: desensitizedEndpoint,
        error: errorResult,
        errorType,
        provider: ModelProvider.Moonshot,
      });
    }
  }
}

export default QwenAI;
