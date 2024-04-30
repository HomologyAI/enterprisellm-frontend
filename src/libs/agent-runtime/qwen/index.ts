import { ClientOptions } from 'openai';

import { LobeRuntimeAI } from '../BaseAI';
import { AgentRuntimeErrorType } from '../error';
import {
  ChatCompetitionOptions,
  ChatStreamPayload,
  ModelProvider,
} from '../types';
import { AgentRuntimeError } from '../utils/createError';
import {ChatClient} from 'dify-client'

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
      inputs = {},
      stream = true,
      conversation_id = '',
      user = "",
      query = '',
      files = null,
    } = difyPayload;

    // inputs,
    //  query,
    //  user,
    //  stream = false,
    //  conversation_id = null,
    //  files = null

    try {
      const response = await this.client.createChatMessage(
        inputs,
        query,
        user,
        stream,
        conversation_id,
        files,
      );

      return new Response(response.data);
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

      const errorResult = {
        cause: error.data,
        message: error.message,
        name: error.name,
        stack: error.stack,
      };

      const errorType = AgentRuntimeErrorType.QwenBizError;

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
